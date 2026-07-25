"use client";

import { FaFilePdf } from "react-icons/fa";
import { Loader2 } from "lucide-react";

interface DeletePdfActionsProps {
  disabled?: boolean;
  loading?: boolean;
  onSave: () => void;
}

export default function DeletePdfActions({
  disabled = false,
  loading = false,
  onSave,
}: DeletePdfActionsProps) {
  const isButtonDisabled = disabled || loading;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold text-slate-900">Delete Pages</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Click the trash icon on any page card to remove it. When you&apos;re
          done, click below to generate your updated PDF.
        </p>
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={isButtonDisabled}
        aria-busy={loading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <FaFilePdf className="h-4 w-4" />
            <span>Save New PDF</span>
          </>
        )}
      </button>
    </div>
  );
}
