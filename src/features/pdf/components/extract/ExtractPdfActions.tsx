"use client";

import { useState } from "react";
import { FileOutput, Loader2, CheckSquare, Info } from "lucide-react";
import clsx from "clsx";

interface ExtractPdfActionsProps {
  disabled?: boolean;
  loading?: boolean;
  totalPages: number;
  selectedIndices: number[];
  onSelectAll: () => void;
  onSelectOdd: () => void;
  onSelectEven: () => void;
  onClearAll: () => void;
  onRangeInput: (rangeText: string) => void;
  onExtract: () => void;
}

export default function ExtractPdfActions({
  disabled = false,
  loading = false,
  totalPages = 0,
  selectedIndices = [],
  onSelectAll,
  onSelectOdd,
  onSelectEven,
  onClearAll,
  onRangeInput,
  onExtract,
}: ExtractPdfActionsProps) {
  const [rangeText, setRangeText] = useState("");

  const handleRangeChange = (val: string) => {
    setRangeText(val);
    onRangeInput(val);
  };

  const handleClearAll = () => {
    setRangeText("");
    onClearAll();
  };

  const handleSelectAll = () => {
    setRangeText("");
    onSelectAll();
  };

  const handleSelectOdd = () => {
    setRangeText("");
    onSelectOdd();
  };

  const handleSelectEven = () => {
    setRangeText("");
    onSelectEven();
  };

  const selectedCount = selectedIndices.length;
  const isControlsDisabled = (disabled && loading) || totalPages === 0;
  const isButtonDisabled = isControlsDisabled || selectedCount === 0;

  const isAllSelected = totalPages > 0 && selectedCount === totalPages;
  const isNoneSelected = selectedCount === 0;

  const isOddSelected =
    totalPages > 0 &&
    selectedIndices.length === Math.ceil(totalPages / 2) &&
    selectedIndices.every((idx) => idx % 2 === 0);

  const isEvenSelected =
    totalPages > 0 &&
    selectedIndices.length === Math.floor(totalPages / 2) &&
    selectedIndices.every((idx) => idx % 2 !== 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <span>Extract Pages</span>
          </h2>
          {totalPages > 0 && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {selectedCount} of {totalPages} selected
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
          Select individual pages to pull out into a brand new PDF document.
        </p>
      </div>

      {totalPages > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <CheckSquare className="h-3.5 w-3.5 text-slate-400" />
            <span>Quick Select</span>
          </label>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={isControlsDisabled || isAllSelected}
              onClick={handleSelectAll}
              className={clsx(
                "rounded-xl border px-3 py-2 text-xs font-medium transition cursor-pointer disabled:cursor-not-allowed",
                isAllSelected
                  ? "border-green-500 bg-green-50 text-green-700 font-semibold opacity-80"
                  : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-white hover:border-slate-300 disabled:opacity-50",
              )}
            >
              Select All
            </button>

            <button
              type="button"
              disabled={isControlsDisabled || isNoneSelected}
              onClick={handleClearAll}
              className={clsx(
                "rounded-xl border px-3 py-2 text-xs font-medium transition cursor-pointer disabled:cursor-not-allowed",
                isNoneSelected
                  ? "border-slate-200 bg-slate-100 text-slate-400 font-semibold opacity-80"
                  : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-white hover:border-slate-300 disabled:opacity-50",
              )}
            >
              Clear Selection
            </button>

            <button
              type="button"
              disabled={isControlsDisabled || isOddSelected}
              onClick={handleSelectOdd}
              className={clsx(
                "rounded-xl border px-3 py-2 text-xs font-medium transition cursor-pointer disabled:cursor-not-allowed",
                isOddSelected
                  ? "border-green-500 bg-green-50 text-green-700 font-semibold opacity-80"
                  : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-white hover:border-slate-300 disabled:opacity-50",
              )}
            >
              Odd Pages
            </button>

            <button
              type="button"
              disabled={isControlsDisabled || isEvenSelected}
              onClick={handleSelectEven}
              className={clsx(
                "rounded-xl border px-3 py-2 text-xs font-medium transition cursor-pointer disabled:cursor-not-allowed",
                isEvenSelected
                  ? "border-green-500 bg-green-50 text-green-700 font-semibold opacity-80"
                  : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-white hover:border-slate-300 disabled:opacity-50",
              )}
            >
              Even Pages
            </button>
          </div>
        </div>
      )}

      {totalPages > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <label className="text-xs font-medium text-slate-700">
            Page Range Expression
          </label>
          <input
            type="text"
            placeholder="e.g. 1-3, 5, 8-10"
            value={rangeText}
            disabled={isControlsDisabled}
            onChange={(e) => handleRangeChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
          />
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-500 border border-slate-100">
            <Info className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span>Selection syncs automatically as you type.</span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onExtract}
        disabled={isButtonDisabled}
        aria-busy={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Extracting Pages...</span>
          </>
        ) : (
          <>
            <FileOutput className="h-4 w-4" />
            <span>
              {selectedCount === 0
                ? "Select Pages to Extract"
                : `Extract ${selectedCount} ${
                    selectedCount === 1 ? "Page" : "Pages"
                  }`}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
