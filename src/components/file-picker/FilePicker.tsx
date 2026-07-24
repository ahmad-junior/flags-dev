import { useMemo, useRef, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import FileDropZone from "@/components/file-picker/FileDropZone";
import FileList from "@/components/file-picker/FileList";

import {
  createFiles,
  formatBytes,
  getTotalSize,
  removeDuplicates,
  validateFiles,
  revokePreview,
} from "@/components/file-picker/utils";

import { FilePickerProps } from "@/components/file-picker/types";

export default function FilePicker({
  files,
  config,
  onChange,
}: FilePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const addFiles = useCallback(
    async (selected: File[]) => {
      if (!selected.length) return;

      const result = validateFiles(selected, config);

      result.errors.forEach((error) => toast.error(error));

      if (!result.valid.length) return;

      const mapped = await createFiles(result.valid);

      if (!config.multiple) {
        files.forEach(revokePreview);
        onChange(mapped.slice(0, 1));
        return;
      }

      const unique = removeDuplicates(files, mapped);

      const uniqueIds = new Set(unique.map((f) => f.id));
      mapped.forEach((f) => {
        if (!uniqueIds.has(f.id)) revokePreview(f);
      });

      onChange([...files, ...unique]);
    },
    [config, files, onChange],
  );

  const removeFile = useCallback(
    (id: string) => {
      const targetFile = files.find((file) => file.id === id);
      if (targetFile) {
        revokePreview(targetFile);
      }
      onChange(files.filter((file) => file.id !== id));
    },
    [files, onChange],
  );

  const clearFiles = useCallback(() => {
    files.forEach(revokePreview);
    onChange([]);
  }, [files, onChange]);

  const totalSize = useMemo(() => getTotalSize(files), [files]);

  return (
    <div className="w-full space-y-4">
      <input
        ref={inputRef}
        type="file"
        aria-label="Upload files"
        className="sr-only"
        multiple={config.multiple}
        accept={config.accept}
        onChange={(e) => {
          addFiles(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />

      {files.length === 0 && (
        <FileDropZone config={config} onFilesSelected={addFiles} />
      )}

      {files.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 shadow-xs backdrop-blur-xs">
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span className="font-medium">
              <strong className="font-semibold text-slate-900">
                {files.length}
              </strong>{" "}
              {files.length === 1 ? "file" : "files"}
            </span>

            <span className="h-4 w-px bg-slate-200" aria-hidden="true" />

            <span className="font-mono text-xs font-medium text-slate-500">
              {formatBytes(totalSize)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {config.multiple && (
              <button
                type="button"
                onClick={openFilePicker}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-2xs transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:scale-[0.98]"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Files
              </button>
            )}

            <button
              type="button"
              onClick={clearFiles}
              className="cursor-pointer rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow-2xs transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 active:scale-[0.98]"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      <FileList
        files={files}
        emptyLabel={config.emptyStateLabel}
        onRemove={removeFile}
        onReorder={onChange}
      />
    </div>
  );
}
