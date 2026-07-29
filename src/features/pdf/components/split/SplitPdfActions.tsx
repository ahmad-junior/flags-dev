"use client";

import { useState } from "react";
import { Scissors, Layers, Loader2, FileCheck, Split } from "lucide-react";

export type SplitMode = "extract_all" | "custom_range";

interface SplitPdfActionsProps {
  disabled?: boolean;
  loading?: boolean;
  totalPages?: number;
  onSplitModeChange?: (mode: SplitMode, rangeText?: string) => void;
  onApplySplit: () => void;
}

export default function SplitPdfActions({
  disabled = false,
  loading = false,
  totalPages = 0,
  onSplitModeChange,
  onApplySplit,
}: SplitPdfActionsProps) {
  const [splitMode, setSplitMode] = useState<SplitMode>("extract_all");
  const [pageRange, setPageRange] = useState("");

  const handleModeChange = (mode: SplitMode) => {
    setSplitMode(mode);
    onSplitModeChange?.(mode, pageRange);
  };

  const handleRangeTextChange = (value: string) => {
    setPageRange(value);
    onSplitModeChange?.(splitMode, value);
  };

  const isButtonDisabled =
    disabled ||
    loading ||
    totalPages === 0 ||
    (splitMode === "custom_range" && !pageRange.trim());

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Scissors className="h-5 w-5 text-green-600" />
            <span>Split Settings</span>
          </h2>
          {totalPages > 0 && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {totalPages} {totalPages === 1 ? "page" : "pages"}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Extract every page into individual PDFs or specify target page ranges.
        </p>
      </div>

      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-slate-400" />
          <span>Split Method</span>
        </label>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleModeChange("extract_all")}
            disabled={disabled}
            className={`w-full flex items-start gap-3 rounded-xl border p-3 text-left transition cursor-pointer ${
              splitMode === "extract_all"
                ? "border-green-500 bg-green-50/50 text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <div className="mt-0.5">
              <Split
                className={`h-4 w-4 ${splitMode === "extract_all" ? "text-green-600" : "text-slate-400"}`}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">
                Extract All Pages
              </p>
              <p className="text-[11px] text-slate-500">
                Separate every page into its own individual PDF document.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("custom_range")}
            disabled={disabled}
            className={`w-full flex items-start gap-3 rounded-xl border p-3 text-left transition cursor-pointer ${
              splitMode === "custom_range"
                ? "border-green-500 bg-green-50/50 text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <div className="mt-0.5">
              <Scissors
                className={`h-4 w-4 ${splitMode === "custom_range" ? "text-green-600" : "text-slate-400"}`}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">
                Custom Page Ranges
              </p>
              <p className="text-[11px] text-slate-500">
                Extract specific pages or page intervals into a new single PDF.
              </p>
            </div>
          </button>
        </div>

        {splitMode === "custom_range" && (
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-medium text-slate-700">
              Page Range
            </label>
            <input
              type="text"
              placeholder="e.g. 1-3, 5, 7-9"
              value={pageRange}
              onChange={(e) => handleRangeTextChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <p className="text-[11px] text-slate-400">
              Enter page numbers or ranges separated by commas.
            </p>
            <div className="mt-2.5 flex flex-col items-center justify-center rounded-xl bg-slate-50/80 px-3 py-2 text-[11px] text-slate-500 border border-slate-200/60 backdrop-blur-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Live Sync Active</span>
              </div>
              <span className="text-slate-400">
                Auto-filters on complete range
              </span>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onApplySplit}
        disabled={isButtonDisabled}
        aria-busy={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Splitting PDF...</span>
          </>
        ) : (
          <>
            <FileCheck className="h-4 w-4" />
            <span>
              {splitMode === "extract_all"
                ? "Split All & Download (ZIP)"
                : "Split Selected PDF"}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
