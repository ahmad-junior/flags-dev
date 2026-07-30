"use client";

import { useState } from "react";
import {
  RotateCcw,
  RotateCw,
  RefreshCw,
  Loader2,
  FileCheck,
  Layers,
} from "lucide-react";

interface RotatePdfActionsProps {
  disabled?: boolean;
  loading?: boolean;
  totalPages?: number;
  totalRotationCount?: number;
  onRangeChange?: (mode: "all" | "range", pageRange?: string) => void;
  onRotateAllLeft: () => void;
  onRotateAllRight: () => void;
  onResetRotations: () => void;
  onApplyRotate: () => void;
}

export default function RotatePdfActions({
  disabled = false,
  loading = false,
  totalPages = 0,
  totalRotationCount = 0,
  onRangeChange,
  onRotateAllLeft,
  onRotateAllRight,
  onResetRotations,
  onApplyRotate,
}: RotatePdfActionsProps) {
  const [rangeMode, setRangeMode] = useState<"all" | "range">("all");
  const [pageRange, setPageRange] = useState("");

  const handleModeChange = (mode: "all" | "range") => {
    setRangeMode(mode);
    onRangeChange?.(mode, pageRange);
  };

  const handleRangeTextChange = (value: string) => {
    setPageRange(value);
    onRangeChange?.(rangeMode, value);
  };

  const isButtonDisabled = disabled || loading || totalPages === 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            Rotate Pdfs
          </h2>
          {totalPages > 0 && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {totalPages} {totalPages === 1 ? "page" : "pages"}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Rotate individual page cards or apply global orientation controls.
        </p>
      </div>

      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-slate-400" />
          <span>Pages to Display</span>
        </label>

        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100">
          <button
            type="button"
            onClick={() => handleModeChange("all")}
            disabled={disabled}
            className={`rounded-lg py-1.5 text-xs font-medium transition cursor-pointer ${
              rangeMode === "all"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Pages
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("range")}
            disabled={disabled}
            className={`rounded-lg py-1.5 text-xs font-medium transition cursor-pointer ${
              rangeMode === "range"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Custom Range
          </button>
        </div>

        {rangeMode === "range" && (
          <div className="space-y-1">
            <input
              type="text"
              placeholder="e.g. 1-3, 5, 7-9"
              value={pageRange}
              onChange={(e) => handleRangeTextChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <p className="text-[11px] text-slate-400">
              Enter page numbers separated by commas or hyphens.
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

      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
            Bulk Rotations
          </label>
          {totalRotationCount > 0 && (
            <span className="text-[11px] font-medium text-amber-600">
              {totalRotationCount} {totalRotationCount === 1 ? "page" : "pages"}{" "}
              rotated
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={disabled || loading}
            onClick={onRotateAllLeft}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            <span>Rotate All Left</span>
          </button>
          <button
            type="button"
            disabled={disabled || loading}
            onClick={onRotateAllRight}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCw className="h-3.5 w-3.5 text-slate-500" />
            <span>Rotate All Right</span>
          </button>
        </div>

        {totalRotationCount > 0 && (
          <button
            type="button"
            onClick={onResetRotations}
            disabled={disabled || loading}
            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset all rotations</span>
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onApplyRotate}
        disabled={isButtonDisabled}
        aria-busy={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing PDF...</span>
          </>
        ) : (
          <>
            <FileCheck className="h-4 w-4" />
            <span>Save & Download PDF</span>
          </>
        )}
      </button>
    </div>
  );
}
