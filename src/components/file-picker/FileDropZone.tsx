import { useRef, useState } from "react";
import { FileUp } from "lucide-react";
import clsx from "clsx";

import { FileDropZoneProps } from "@/components/file-picker/types";

export default function FileDropZone({
  config,
  disabled = false,
  onFilesSelected,
}: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  function openPicker() {
    if (disabled) return;

    inputRef.current?.click();
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;

    onFilesSelected(Array.from(files));
  }

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept={config.accept}
        multiple={config.multiple}
        onChange={(event) => handleFiles(event.target.files)}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={openPicker}
        onDragOver={(event) => {
          event.preventDefault();

          if (!disabled) {
            setDragging(true);
          }
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();

          setDragging(false);

          if (disabled) return;

          handleFiles(event.dataTransfer.files);
        }}
        className={clsx(
          "flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-14 transition-all duration-200",
          dragging
            ? "border-green-500 bg-green-50"
            : "border-slate-300 hover:border-green-500 hover:bg-slate-50",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <FileUp className="h-8 w-8 text-green-600" />
        </div>

        <h3 className="mt-6 text-xl font-semibold text-slate-900">
          {config.title}
        </h3>

        <p className="mt-3 max-w-2xl text-center text-sm leading-6 text-slate-500">
          {config.description}
        </p>

        <span className="mt-8 rounded-xl bg-green-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-green-700">
          {config.browseLabel ?? "Browse Files"}
        </span>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span>{config.supportedText}</span>

          {config.maxFileSize && (
            <>
              <span>•</span>
              <span>Max {Math.round(config.maxFileSize / 1024 / 1024)} MB</span>
            </>
          )}

          {config.maxFiles && (
            <>
              <span>•</span>
              <span>
                Up to {config.maxFiles} file
                {config.maxFiles > 1 ? "s" : ""}
              </span>
            </>
          )}
        </div>
      </button>
    </>
  );
}
