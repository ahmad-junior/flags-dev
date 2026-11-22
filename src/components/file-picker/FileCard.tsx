"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { GripVertical, Trash2, Eye, RotateCw } from "lucide-react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import { AppFile } from "@/components/file-picker/types";
import { formatBytes } from "@/components/file-picker/utils";
import { getFileTypeConfig } from "@/components/file-picker/fileTypeConfig";
import FilePreview from "@/components/file-picker/preview/FilePreview";

interface FileCardProps {
  file: AppFile;
  onRemove?: (id: string) => void;
  topRightControl?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  dragHandle?: {
    attributes: DraggableAttributes;
    listeners?: SyntheticListenerMap;
  };
  onClick?: () => void;
  isSelected?: boolean;
}

export default function FileCard({
  file,
  onRemove,
  topRightControl,
  actions,
  footer,
  dragHandle,
  onClick,
  isSelected,
}: FileCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const config = getFileTypeConfig(file.type);
  const Icon = config.icon;

  const rotation = (file.metadata as { rotation?: number })?.rotation || 0;

  const stopInteraction = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        onClick={onClick}
        aria-selected={isSelected}
        className={clsx(
          "group relative overflow-hidden rounded-2xl border bg-white",
          "transition-all duration-200 ease-out",
          "hover:-translate-y-0.5 hover:shadow-lg",
          onClick && "cursor-pointer",
          isSelected === true &&
            "border-green-500 bg-green-50/30 ring-2 ring-green-500/15 shadow-sm",
          isSelected === false && "border-slate-200 hover:border-slate-300",
          isSelected === undefined && "border-slate-200 hover:border-slate-300",
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100/70">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(#64748b 0.8px, transparent 0.8px)",
              backgroundSize: "14px 14px",
            }}
          />

          <div className="absolute inset-3 flex items-center justify-center">
            <div
              className="relative h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {file.previewUrl ? (
                <Image
                  src={file.previewUrl}
                  alt={file.name}
                  fill
                  unoptimized
                  draggable={false}
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="pointer-events-none select-none object-contain drop-shadow-sm"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div
                    className={clsx(
                      "flex h-20 w-20 items-center justify-center",
                      "rounded-2xl border border-white/80 shadow-sm",
                      config.backgroundClassName,
                    )}
                  >
                    <Icon className={clsx("h-10 w-10", config.iconClassName)} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between">
            {dragHandle ? (
              <button
                type="button"
                {...dragHandle.attributes}
                {...dragHandle.listeners}
                onClick={stopInteraction}
                className={clsx(
                  "touch-none cursor-grab active:cursor-grabbing",
                  "rounded-xl border border-white/80 bg-white/90 p-2",
                  "text-slate-500 shadow-sm backdrop-blur-md",
                  "transition hover:bg-white hover:text-slate-800",
                )}
                aria-label="Drag to reorder"
                title="Drag to reorder"
              >
                <GripVertical className="h-4 w-4" />
              </button>
            ) : (
              <span />
            )}
          </div>

          {rotation !== 0 && (
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-lg border border-white/80 bg-white/90 px-2.5 py-1.5 text-xs font-medium text-amber-700 shadow-sm backdrop-blur-md">
              <RotateCw className="h-3.5 w-3.5" />
              {rotation}°
            </div>
          )}

          {isSelected === true && (
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-lg bg-green-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Selected
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-3 py-2.5">
          {topRightControl ? (
            <div
              onPointerDown={stopInteraction}
              onMouseDown={stopInteraction}
              onTouchStart={stopInteraction}
              className="flex flex-1 items-center gap-2"
            >
              {topRightControl}
            </div>
          ) : (
            <>
              <button
                type="button"
                onPointerDown={stopInteraction}
                onMouseDown={stopInteraction}
                onTouchStart={stopInteraction}
                onClick={(e) => {
                  e.stopPropagation();
                  if (file.previewUrl) setPreviewUrl(file.previewUrl);
                }}
                disabled={!file.previewUrl}
                aria-label={`Preview ${file.name}`}
                title="Preview image"
                className={clsx(
                  "group/preview flex h-9 flex-1 items-center justify-center gap-2",
                  "rounded-lg border border-slate-200 bg-slate-50",
                  "text-xs font-semibold text-slate-600",
                  "transition-all duration-200",
                  "hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
                  "active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30",
                  "disabled:cursor-not-allowed disabled:opacity-40",
                )}
              >
                <Eye className="h-4 w-4 transition-transform duration-200 group-hover/preview:scale-110" />
                Preview
              </button>

              {onRemove && (
                <button
                  type="button"
                  onPointerDown={stopInteraction}
                  onMouseDown={stopInteraction}
                  onTouchStart={stopInteraction}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(file.id);
                  }}
                  aria-label={`Remove ${file.name}`}
                  title="Remove file"
                  className={clsx(
                    "flex h-9 w-9 shrink-0 items-center justify-center",
                    "rounded-lg border border-slate-200 bg-white",
                    "text-slate-500 transition-all duration-200",
                    "hover:border-red-200 hover:bg-red-50 hover:text-red-600",
                    "active:scale-95",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30",
                  )}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </div>

        <div className="space-y-3 p-4">
          <div className="min-w-0">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <h3
                  title={file.name}
                  className="line-clamp-2 break-all text-sm font-semibold leading-5 text-slate-800"
                >
                  {file.name}
                </h3>
              </div>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-slate-500">
              <span className="font-medium">{formatBytes(file.size)}</span>

              <span className="text-slate-300">•</span>

              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium uppercase tracking-wide text-slate-600">
                {file.extension}
              </span>
            </div>
          </div>

          {actions && (
            <div
              onPointerDown={stopInteraction}
              onMouseDown={stopInteraction}
              onTouchStart={stopInteraction}
              className="flex flex-wrap items-center gap-2"
            >
              {actions}
            </div>
          )}

          {footer && (
            <div className="border-t border-slate-100 pt-3">{footer}</div>
          )}
        </div>
      </div>

      <FilePreview
        isOpen={!!previewUrl}
        previewUrl={previewUrl}
        rotation={rotation}
        onClose={() => setPreviewUrl(null)}
      />
    </>
  );
}
