import { useMemo } from "react";

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
  async function addFiles(selected: File[]) {
    const result = validateFiles(selected, config);

    result.errors.forEach((error) => toast.error(error));

    if (!result.valid.length) {
      return;
    }

    const mapped = await createFiles(result.valid);

    if (!config.multiple) {
      onChange(mapped.slice(0, 1));
      return;
    }

    const unique = removeDuplicates(files, mapped);

    onChange([...files, ...unique]);
  }

  function removeFile(id: string) {
    const file = files.find((file) => file.id === id);

    if (file) {
      revokePreview(file);
    }

    onChange(files.filter((file) => file.id !== id));
  }

  function clearFiles() {
    onChange([]);
  }

  const totalSize = useMemo(() => getTotalSize(files), [files]);

  return (
    <div className="space-y-6">
      <FileDropZone config={config} onFilesSelected={addFiles} />

      {files.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <span className="text-sm text-slate-600">
            <strong>{files.length}</strong> file
            {files.length > 1 && "s"}
          </span>

          <span className="text-sm text-slate-600">
            {formatBytes(totalSize)}
          </span>

          <button
            onClick={clearFiles}
            className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      <FileList
        files={files}
        emptyLabel={config.emptyStateLabel}
        onRemove={removeFile}
      />
    </div>
  );
}
