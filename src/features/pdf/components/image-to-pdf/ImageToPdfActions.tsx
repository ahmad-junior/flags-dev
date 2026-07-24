"use client";

import { FaFilePdf, FaSpinner } from "react-icons/fa";

interface ImageToPdfActionsProps {
  disabled: boolean;
  loading: boolean;
  onConvert: () => void;
}

export default function ImageToPdfActions({
  disabled,
  loading,
  onConvert,
}: ImageToPdfActionsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Convert to PDF</h2>

        <p className="text-sm text-slate-600 text-justify">
          You can change the order by drag and drop images.
        </p>
        <p className="text-sm text-slate-600 text-justify">
          Combine all selected images into a single PDF document. The images
          will appear in the same order as shown.
        </p>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={onConvert}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <>
            <FaSpinner className="h-4 w-4 animate-spin" />
            Creating PDF...
          </>
        ) : (
          <>
            <FaFilePdf className="h-4 w-4" />
            Convert to PDF
          </>
        )}
      </button>
    </div>
  );
}
