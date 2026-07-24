import { Loader2, Merge } from "lucide-react";

interface MergePdfActionsProps {
  disabled: boolean;
  loading: boolean;

  onMerge(): void;
}

export default function MergePdfActions({
  disabled,
  loading,
  onMerge,
}: MergePdfActionsProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <button
        type="button"
        disabled={disabled}
        onClick={onMerge}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Merging PDFs...
          </>
        ) : (
          <>
            <Merge className="h-5 w-5" />
            Merge PDFs
          </>
        )}
      </button>

      <p className="mt-3 text-center text-sm text-slate-500">
        Choose two or more PDF files to merge into a single document.
      </p>

      <p className="mt-1 text-center text-sm text-slate-500">
        Select multiple files in the file picker or drag and drop them together.
      </p>
    </div>
  );
}
