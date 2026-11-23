"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  type SyntheticEvent,
} from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";

interface FilePreviewProps {
  isOpen: boolean;
  previewUrl: string | null;
  rotation: number;
  onClose: () => void;
}

interface Point {
  x: number;
  y: number;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;
const DOUBLE_CLICK_ZOOM = 2;
const ORIGIN: Point = { x: 0, y: 0 };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const iconButtonClass = [
  "flex items-center justify-center rounded-xl p-2.5",
  "text-white/80 transition-all duration-200",
  "hover:bg-white/15 hover:text-white",
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-white/60",
  "disabled:pointer-events-none disabled:opacity-30",
].join(" ");

const stopPropagation = (event: SyntheticEvent) => {
  event.stopPropagation();
};

export default function FilePreview({
  isOpen,
  previewUrl,
  rotation,
  onClose,
}: FilePreviewProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<Point>(ORIGIN);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const dragStart = useRef<{
    pointer: Point;
    offset: Point;
  } | null>(null);

  const onCloseRef = useRef(onClose);

  const changeZoom = useCallback((updater: (prev: number) => number) => {
    setZoom((prev) => {
      const next = clamp(updater(prev), MIN_ZOOM, MAX_ZOOM);

      if (next <= 1) {
        setOffset(ORIGIN);
      }

      return next;
    });
  }, []);

  const zoomIn = useCallback(
    () => changeZoom((prev) => prev + ZOOM_STEP),
    [changeZoom],
  );

  const zoomOut = useCallback(
    () => changeZoom((prev) => prev - ZOOM_STEP),
    [changeZoom],
  );

  const resetView = useCallback(() => {
    setZoom(1);
    setOffset(ORIGIN);
    dragStart.current = null;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    Promise.resolve().then(() => {
      setZoom(1);
      setOffset(ORIGIN);
      setIsDragging(false);
      setIsLoading(true);
      setHasError(false);
      dragStart.current = null;
    });
  }, [isOpen, previewUrl]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          onCloseRef.current();
          break;

        case "+":
        case "=":
          event.preventDefault();
          zoomIn();
          break;

        case "-":
          event.preventDefault();
          zoomOut();
          break;

        case "0":
          event.preventDefault();
          resetView();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, zoomIn, zoomOut, resetView]);

  const handleTrapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    );

    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (hasError) return;

    changeZoom((prev) => prev + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
  };

  const handleDoubleClick = () => {
    if (zoom === 1) {
      changeZoom(() => DOUBLE_CLICK_ZOOM);
    } else {
      resetView();
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (zoom <= 1 || event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    dragStart.current = {
      pointer: {
        x: event.clientX,
        y: event.clientY,
      },
      offset,
    };

    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLImageElement>) => {
    const start = dragStart.current;

    if (!start) return;

    setOffset({
      x: start.offset.x + event.clientX - start.pointer.x,
      y: start.offset.y + event.clientY - start.pointer.y,
    });
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (!dragStart.current) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStart.current = null;
    setIsDragging(false);
  };

  const handleDownload = () => {
    if (!previewUrl || hasError) return;

    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = "Flagsdev Image Preview";
    link.click();
  };

  if (!isOpen || !previewUrl || typeof document === "undefined") {
    return null;
  }

  const cursorClass =
    zoom > 1
      ? isDragging
        ? "cursor-grabbing"
        : "cursor-grab"
      : "cursor-zoom-in";

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="
                fixed inset-0 z-[100]
                flex flex-col
                bg-black/65
                backdrop-blur-[3px]
                animate-in fade-in duration-200
                file-reorder-animation
            "
      onKeyDown={handleTrapFocus}
      onClick={stopPropagation}
      onDoubleClick={stopPropagation}
      onPointerDown={stopPropagation}
      onPointerMove={stopPropagation}
      onPointerUp={stopPropagation}
      onPointerCancel={stopPropagation}
      onMouseDown={stopPropagation}
      onMouseUp={stopPropagation}
      onTouchStart={stopPropagation}
      onTouchMove={stopPropagation}
      onTouchEnd={stopPropagation}
      onDragStart={stopPropagation}
    >
      <header
        className="
                    absolute right-4 top-4 z-10
                    flex items-center gap-2
                    sm:right-6 sm:top-6
                "
      >
        <button
          type="button"
          onClick={handleDownload}
          title="Download image"
          aria-label="Download image"
          disabled={hasError}
          className={iconButtonClass}
        >
          <Download size={20} />
        </button>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => onClose()}
          title="Close preview (Esc)"
          aria-label="Close preview"
          className={`
                        ${iconButtonClass}
                        bg-white/10
                        ring-1 ring-white/10
                    `}
        >
          <X size={23} />
        </button>
      </header>

      <main
        className="
                    relative flex min-h-0 flex-1
                    items-center justify-center
                    overflow-hidden
                    p-4 sm:p-10
                "
        onWheel={handleWheel}
      >
        {isLoading && !hasError && (
          <div
            className="absolute z-10"
            role="status"
            aria-label="Loading image"
          >
            <div
              className="
                            h-8 w-8 animate-spin
                            rounded-full border-2
                            border-white/20 border-t-white
                        "
            />
          </div>
        )}

        {hasError ? (
          <div
            className="flex flex-col items-center gap-3 text-center text-white/70"
            role="alert"
          >
            <Download size={36} className="opacity-40" />
            <p className="text-sm">Unable to preview this image.</p>
          </div>
        ) : (
          <div
            className="relative h-full w-full"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <Image
              src={previewUrl}
              alt="Image preview"
              fill
              unoptimized
              priority
              sizes="100vw"
              draggable={false}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              onDoubleClick={handleDoubleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              className={`
                                select-none object-contain
                                touch-none
                                ${cursorClass}
                                ${isDragging ? "" : "transition-transform duration-200"}
                            `}
              style={{
                transform: `
                                    translate(${offset.x}px, ${offset.y}px)
                                    scale(${zoom})
                                `,
                visibility: isLoading ? "hidden" : "visible",
              }}
            />
          </div>
        )}
      </main>

      <footer
        className="
                    absolute bottom-5 left-1/2 z-10
                    flex -translate-x-1/2 items-center gap-1
                    rounded-2xl border border-white/10
                    bg-black/45 p-1.5
                    shadow-2xl backdrop-blur-xl
                    sm:bottom-7
                "
      >
        <button
          type="button"
          onClick={zoomOut}
          disabled={zoom <= MIN_ZOOM || hasError}
          title="Zoom out (-)"
          aria-label="Zoom out"
          className={iconButtonClass}
        >
          <ZoomOut size={19} />
        </button>

        <span
          className="
                        min-w-14 text-center
                        text-xs font-medium
                        tabular-nums text-white/80
                    "
          aria-live="polite"
        >
          {Math.round(zoom * 100)}%
        </span>

        <button
          type="button"
          onClick={zoomIn}
          disabled={zoom >= MAX_ZOOM || hasError}
          title="Zoom in (+)"
          aria-label="Zoom in"
          className={iconButtonClass}
        >
          <ZoomIn size={19} />
        </button>

        <div className="mx-1 h-5 w-px bg-white/15" aria-hidden="true" />

        <button
          type="button"
          onClick={resetView}
          disabled={hasError}
          title="Reset view (0)"
          aria-label="Reset zoom"
          className={iconButtonClass}
        >
          <RotateCcw size={17} />
        </button>
      </footer>
    </div>,
    document.body,
  );
}
