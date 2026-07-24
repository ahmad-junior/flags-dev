import { Trash2 } from "lucide-react";
import clsx from "clsx";

import { AppFile } from "@/components/file-picker/types";
import { formatBytes } from "@/components/file-picker/utils";
import { getFileTypeConfig } from "@/components/file-picker/fileTypeConfig";
import Image from "next/image";

interface FileCardProps {
  file: AppFile;

  onRemove(id: string): void;

  actions?: React.ReactNode;

  footer?: React.ReactNode;
}

export default function FileCard({
  file,
  onRemove,
  actions,
  footer,
}: FileCardProps) {
  const config = getFileTypeConfig(file.type);

  const Icon = config.icon;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-green-500 hover:shadow-lg">
      <div className="relative flex aspect-[4/3] items-center justify-center border-b border-slate-100 bg-slate-50">
        {file.previewUrl ? (
          <Image
            src={file.previewUrl}
            alt={file.name}
            fill
            unoptimized
            className="object-cover rounded-t-xl"
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

        <button
          onClick={() => onRemove(file.id)}
          className="absolute right-3 top-3 rounded-xl bg-white/90 p-2 text-slate-600 shadow transition hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-5 w-5 cursor-pointer" />
        </button>
      </div>

      <div className="space-y-3 p-4">
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
          <div className="border-t border-slate-100 pt-3">{footer}</div>
        )}

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
