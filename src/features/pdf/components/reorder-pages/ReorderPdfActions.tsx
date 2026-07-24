"use client";

import { FaFilePdf } from "react-icons/fa";
import { Loader2 } from "lucide-react";

interface ReorderPdfActionsProps {
  disabled: boolean;
  loading: boolean;
  onSave: () => void;
}

export default function ReorderPdfActions({
  disabled,
  loading,
  onSave,
}: ReorderPdfActionsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Reorder Pages
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 text-justify">
            Drag and drop pages to arrange them in the desired order. When
            you&apos;re satisfied, click the button below to generate a new PDF.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={disabled}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <FaFilePdf className="h-4 w-4" />
            Save Reordered PDF
          </>
        )}
      </button>
    </div>
  );
}
