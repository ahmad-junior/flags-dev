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

  onRemove(id: string): void;

  actions?: React.ReactNode;

  footer?: React.ReactNode;

  dragHandle?: {
    attributes: DraggableAttributes;
    listeners?: SyntheticListenerMap;
  };
}

export default function FileCard({
  file,
  onRemove,
  actions,
  footer,
  dragHandle,
}: FileCardProps) {
  const config = getFileTypeConfig(file.type);

  const Icon = config.icon;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-green-500 hover:shadow-lg">
      {/* Preview */}

      <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-100 bg-slate-50">
        {file.previewUrl ? (
          <Image
            src={file.previewUrl}
            alt={file.name}
            fill
            unoptimized
            draggable={false}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div
              className={clsx(
                "flex h-20 w-20 items-center justify-center rounded-2xl",
                config.backgroundClassName,
              )}
            >
              <Icon className={clsx("h-10 w-10", config.iconClassName)} />
            </div>
          </div>
        )}

        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onRemove(file.id)}
          className="cursor-pointer absolute right-3 top-3 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-slate-600 shadow backdrop-blur transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-5 w-5 shrink-0" />

          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-200 group-hover:max-w-24 group-hover:opacity-100">
            Remove
          </span>
        </button>

        {dragHandle && (
          <button
            type="button"
            {...dragHandle.attributes}
            {...dragHandle.listeners}
            className="absolute left-3 top-3 rounded-xl bg-white/90 p-2 text-slate-500 shadow backdrop-blur transition hover:bg-slate-100 hover:text-slate-700 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5" />
          </button>
        )}
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
          </div>
        </div>

        {footer && (
          <div className="border-t border-slate-100 pt-4">{footer}</div>
        )}

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </article>
  );
}
