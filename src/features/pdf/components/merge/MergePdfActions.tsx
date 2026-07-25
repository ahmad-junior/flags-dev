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
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Merge PDFs</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 text-justify">
            Choose two or more PDF files to merge into a single document.
          </p>
          <p className="text-sm leading-6 text-slate-600 text-justify">
            Select multiple files in the file picker or drag and drop them
            together.
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={onMerge}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
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
    </div>
  );
}
