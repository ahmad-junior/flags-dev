import { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

import { AppFile, FilePickerProps } from "@/components/file-picker/types";

import { SortOption } from "@/components/file-picker/types";

import { ArrowUpDown, ChevronDown, Check, Plus } from "lucide-react";

const sortOptions = [
  { value: null, label: "Custom" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "largest", label: "Largest first" },
  { value: "smallest", label: "Smallest first" },
] as const;

export default function FilePicker({
  files,
  config,
  onChange,
  renderActions,
}: FilePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [sortOption, setSortOption] = useState<SortOption | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [sortPosition, setSortPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

  const updateSortPosition = useCallback(() => {
    const rect = sortButtonRef.current?.getBoundingClientRect();

    if (!rect) return;

    const menuWidth = 224;
    const gap = 8;

    setSortPosition({
      top: rect.bottom + gap,
      left: Math.max(
        8,
        Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8),
      ),
      width: menuWidth,
    });
  }, []);

  useEffect(() => {
    if (!isSortOpen) return;

    updateSortPosition();

    const handleScroll = () => {
      setIsSortOpen(false);
    };

    window.addEventListener("resize", updateSortPosition);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateSortPosition);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSortOpen, updateSortPosition]);

  const sortFiles = (
    option: SortOption | null,
    filesToSort: AppFile[],
  ): AppFile[] => {
    const sorted = [...filesToSort];

    switch (option ?? "name-asc") {
      case "name-asc":
        return sorted.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: "base",
          }),
        );

      case "name-desc":
        return sorted.sort((a, b) =>
          b.name.localeCompare(a.name, undefined, {
            numeric: true,
            sensitivity: "base",
          }),
        );

      case "largest":
        return sorted.sort((a, b) => b.size - a.size);

      case "smallest":
        return sorted.sort((a, b) => a.size - b.size);

      default:
        return sorted;
    }
  };

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
              {`Remove ${files.length} ${files.length === 1 ? "file" : "files"}`}
            </button>
          </div>
          <div>
            <button
              ref={sortButtonRef}
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              aria-expanded={isSortOpen}
              aria-haspopup="listbox"
              className="
      inline-flex items-center gap-2 rounded-lg
      border border-zinc-200 bg-white px-3 py-2
      text-xs font-medium text-zinc-700 shadow-sm
      transition-all duration-200
      hover:border-blue-300 hover:bg-blue-50
      focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-blue-500/30
      active:scale-[0.98] cursor-pointer
    "
            >
              <ArrowUpDown size={14} />
              Sort:{" "}
              {sortOptions.find((option) => option.value === sortOption)?.label}
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {mounted &&
            isSortOpen &&
            createPortal(
              <>
                <div
                  className="fixed inset-0 z-[9998]"
                  onMouseDown={() => setIsSortOpen(false)}
                />

                <div
                  ref={sortMenuRef}
                  role="listbox"
                  aria-label="Sort files"
                  style={{
                    position: "fixed",
                    top: sortPosition.top,
                    left: Math.max(8, sortPosition.left),
                    width: sortPosition.width,
                  }}
                  className="
          z-[9999] rounded-xl border border-zinc-200
          bg-white p-1.5 shadow-xl shadow-zinc-900/10
          animate-in fade-in zoom-in-95 slide-in-from-top-2
          duration-150
        "
                >
                  <p className="px-2.5 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Sort files by
                  </p>

                  {sortOptions.map((option) => {
                    const selected = sortOption === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => {
                          sortFiles(option.value, files);
                          setSortOption(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`
                flex w-full items-center justify-between
                rounded-lg px-2.5 py-2.5 text-left text-xs
                transition-colors duration-150 cursor-pointer
                ${
                  selected
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                }
              `}
                      >
                        {option.label}

                        {selected && (
                          <Check size={14} className="text-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>,
              document.body,
            )}
        </div>
      )}

      <FileList
        files={sortOption ? sortFiles(sortOption, files) : files}
        emptyLabel={config.emptyStateLabel}
        onRemove={removeFile}
        onReorder={onChange}
        actions={renderActions}
        onSortOptionChange={setSortOption}
      />
    </div>
  );
}
