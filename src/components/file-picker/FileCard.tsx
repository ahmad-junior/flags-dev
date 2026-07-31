"use client";

import Image from "next/image";
import clsx from "clsx";
import { GripVertical, Trash2 } from "lucide-react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import { AppFile } from "@/components/file-picker/types";
import { formatBytes } from "@/components/file-picker/utils";
import { getFileTypeConfig } from "@/components/file-picker/fileTypeConfig";

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
  const config = getFileTypeConfig(file.type);
  const Icon = config.icon;

  const rotation = (file.metadata as { rotation?: number })?.rotation || 0;

  return (
    <article
      onClick={onClick}
      className={clsx(
        "group overflow-hidden rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg select-none",
        onClick && "cursor-pointer",
        isSelected === true &&
          "border-green-500 ring-2 ring-green-500/20 bg-green-50/10",
        isSelected === false && "border-slate-200 opacity-60 hover:opacity-100",
        isSelected === undefined && "border-slate-200 hover:border-green-500",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-100 bg-slate-50 p-3 flex items-center justify-center">
        <div
          className="relative h-full w-full flex items-center justify-center transition-transform duration-300 ease-in-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {file.previewUrl ? (
            <Image
              src={file.previewUrl}
              alt={file.name}
              fill
              unoptimized
              draggable={false}
              className="object-contain"
            />
          ) : (
            <div
              className={clsx(
                "flex h-20 w-20 items-center justify-center rounded-2xl",
                config.backgroundClassName,
              )}
            >
              <Icon className={clsx("h-10 w-10", config.iconClassName)} />
            </div>
          )}
        </div>

        <div className="absolute inset-0 pointer-events-none p-3 flex justify-between items-start z-10">
          {dragHandle ? (
            <button
              type="button"
              {...dragHandle.attributes}
              {...dragHandle.listeners}
              className="pointer-events-auto touch-none rounded-xl bg-white/90 p-2.5 text-slate-500 shadow-md backdrop-blur transition hover:bg-slate-100 hover:text-slate-700 cursor-grab active:cursor-grabbing"
              aria-label="Drag to reorder page"
            >
              <GripVertical className="h-5 w-5" />
            </button>
          ) : (
            <div />
          )}

          {topRightControl ? (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="pointer-events-auto"
            >
              {topRightControl}
            </div>
          ) : onRemove ? (
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(file.id);
              }}
              className="pointer-events-auto cursor-pointer flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-slate-600 shadow-md backdrop-blur transition-all duration-200 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 shrink-0" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 transition-all duration-200 group-hover:max-w-24 group-hover:opacity-100">
                Remove
              </span>
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h3
            title={file.name}
            className="line-clamp-2 text-sm font-semibold text-slate-900"
          >
            {file.name}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>{formatBytes(file.size)}</span>
            <span>•</span>
            <span className="uppercase">{file.extension}</span>
            {rotation !== 0 && (
              <>
                <span>•</span>
                <span className="font-medium text-amber-600">{rotation}°</span>
              </>
            )}
          </div>
        </div>

        {footer && (
          <div className="border-t border-slate-100 pt-4">{footer}</div>
        )}

        {actions && (
          <div
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="flex items-center gap-2"
          >
            {actions}
          </div>
        )}
      </div>
    </article>
  );
}
