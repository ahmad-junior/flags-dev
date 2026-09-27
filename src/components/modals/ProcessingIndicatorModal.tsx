"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ShieldCheck, Sparkles } from "lucide-react";

interface ProcessingIndicatorModalProps {
  isOpen: boolean;
  text?: string;
  slogans?: string[];
}

const DEFAULT_SLOGANS = [
  "Processing securely on your device...",
  "Your files never leave your device.",
  "No server uploads. No tracking.",
  "Keeping your data private by design.",
  "Almost ready...",
];

export default function ProcessingIndicatorModal({
  isOpen,
  text = "We're working on it...",
  slogans = DEFAULT_SLOGANS,
}: ProcessingIndicatorModalProps) {
  const safeSlogans = useMemo(
    () => (slogans.length > 0 ? slogans : DEFAULT_SLOGANS),
    [slogans],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const charIndexRef = useRef(0);
  const deletingRef = useRef(false);
  const pauseRef = useRef(false);
  const pauseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    charIndexRef.current = 0;
    deletingRef.current = false;
    pauseRef.current = false;

    const message = safeSlogans[currentIndex];

    const interval = window.setInterval(() => {
      if (pauseRef.current) return;

      if (!deletingRef.current) {
        charIndexRef.current += 1;

        setDisplayedText(message.slice(0, charIndexRef.current));

        if (charIndexRef.current >= message.length) {
          pauseRef.current = true;

          pauseTimeoutRef.current = window.setTimeout(() => {
            pauseRef.current = false;
            deletingRef.current = true;
          }, 1400);
        }

        return;
      }

      charIndexRef.current -= 1;

      setDisplayedText(message.slice(0, charIndexRef.current));

      if (charIndexRef.current <= 0) {
        deletingRef.current = false;
        pauseRef.current = true;

        pauseTimeoutRef.current = window.setTimeout(() => {
          pauseRef.current = false;

          setCurrentIndex((previous) => (previous + 1) % safeSlogans.length);
        }, 250);
      }
    }, 38);

    return () => {
      window.clearInterval(interval);

      if (pauseTimeoutRef.current !== null) {
        window.clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    };
  }, [isOpen, currentIndex, safeSlogans]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-md animate-in fade-in duration-300 motion-reduce:animate-none" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div
        className="
                    relative
                    w-full
                    max-w-sm
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/80
                    bg-white
                    px-7
                    py-8
                    text-center
                    shadow-2xl
                    shadow-slate-950/25
                    animate-in
                    zoom-in-95
                    fade-in
                    duration-300
                    motion-reduce:animate-none
                "
      >
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-xl" />

          <div className="absolute inset-1 rounded-full border border-emerald-100" />

          <div
            className="
                            absolute
                            inset-1
                            rounded-full
                            border-[3px]
                            border-transparent
                            border-t-emerald-500
                            border-r-emerald-400
                            animate-spin
                            motion-reduce:animate-none
                        "
          />

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 shadow-sm">
            <ShieldCheck className="h-6 w-6 text-emerald-600" strokeWidth={2} />
          </div>

          <Sparkles
            className="
                            absolute
                            -right-1
                            top-2
                            h-4
                            w-4
                            text-emerald-500
                            animate-pulse
                            motion-reduce:animate-none
                        "
          />
        </div>

        <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950">
          {text}
        </h3>

        <div className="mt-2 flex h-10 items-center justify-center px-2">
          <p className="text-sm leading-6 text-slate-500">
            {displayedText}
            <span
              className="
                                ml-0.5
                                inline-block
                                h-4
                                w-px
                                translate-y-0.5
                                bg-emerald-500
                                animate-pulse
                                motion-reduce:animate-none
                            "
              aria-hidden="true"
            />
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="text-xs font-semibold text-emerald-700">
              Processing locally
            </span>
          </div>

          <p className="mt-1 text-[11px] text-emerald-700/70">
            Nothing is uploaded to our servers.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <span className="font-semibold tracking-tight text-slate-500">
            FlagsDev
          </span>
          <span className="text-slate-300">·</span>
          <span>Privacy first by design</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
