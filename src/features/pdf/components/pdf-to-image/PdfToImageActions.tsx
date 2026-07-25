"use client";

import { useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { Loader2, Sparkles, Layers, ListOrdered } from "lucide-react";

export type ImageFormat = "png" | "jpg" | "webp";
export type ImageDpi = "72" | "150" | "300";
export type ConversionMode = "all" | "range";

export interface ConvertSettings {
  format: ImageFormat;
  dpi: ImageDpi;
  mode: ConversionMode;
  pageRange?: string;
  transparentBg?: boolean;
}

interface PdfToImageActionsProps {
  disabled?: boolean;
  loading?: boolean;
  totalPages?: number;
  onRangeChange?: (mode: ConversionMode, range?: string) => void;
  onConvert: (settings: ConvertSettings) => void;
}

export default function PdfToImageActions({
  disabled = false,
  loading = false,
  totalPages = 0,
  onRangeChange,
  onConvert,
}: PdfToImageActionsProps) {
  const [format, setFormat] = useState<ImageFormat>("png");
  const [dpi, setDpi] = useState<ImageDpi>("150");
  const [mode, setMode] = useState<ConversionMode>("all");
  const [pageRange, setPageRange] = useState("");
  const [transparentBg, setTransparentBg] = useState(false);

  const isButtonDisabled =
    disabled || loading || (mode === "range" && !pageRange.trim());

  const handleConvert = () => {
    onConvert({
      format,
      dpi,
      mode,
      pageRange: mode === "range" ? pageRange : undefined,
      transparentBg:
        format === "png" || format === "webp" ? transparentBg : false,
    });
  };

  const handleModeSelect = (newMode: ConversionMode) => {
    setMode(newMode);
    if (onRangeChange) {
      onRangeChange(newMode, newMode === "range" ? pageRange : undefined);
    }
  };

  const handleRangeInputChange = (value: string) => {
    setPageRange(value);
    if (onRangeChange && mode === "range") {
      onRangeChange("range", value);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            Pdf to Image
          </h2>
          {totalPages > 0 && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {totalPages} {totalPages === 1 ? "page" : "pages"} loaded
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Configure format and resolution before generating image files.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          Extraction Scope
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleModeSelect("all")}
            disabled={disabled}
            className={`cursor-pointer flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-medium border transition ${
              mode === "all"
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            All Pages
          </button>
          <button
            type="button"
            onClick={() => handleModeSelect("range")}
            disabled={disabled}
            className={`cursor-pointer flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-medium border transition ${
              mode === "range"
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ListOrdered className="h-3.5 w-3.5" />
            Specific Range
          </button>
        </div>

        {mode === "range" && (
          <div className="pt-1">
            <input
              type="text"
              placeholder="e.g. 1-3, 5, 8"
              value={pageRange}
              onChange={(e) => handleRangeInputChange(e.target.value)}
              disabled={disabled}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Separate page numbers with commas or ranges with hyphens.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          Output Format
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["png", "jpg", "webp"] as ImageFormat[]).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setFormat(fmt)}
              disabled={disabled}
              className={`cursor-pointer rounded-xl py-2 px-3 text-center transition border text-xs uppercase font-semibold ${
                format === fmt
                  ? "border-green-600 bg-green-600 text-white shadow-xs"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Resolution / Quality
          </label>
          <span className="text-[11px] font-medium text-slate-500">
            {dpi === "72" && "Fast / Small Size"}
            {dpi === "150" && "Balanced / Web"}
            {dpi === "300" && "Ultra HD / Print"}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "72 DPI", val: "72" },
            { label: "150 DPI", val: "150" },
            { label: "300 DPI", val: "300" },
          ].map((item) => (
            <button
              key={item.val}
              type="button"
              onClick={() => setDpi(item.val as ImageDpi)}
              disabled={disabled}
              className={`cursor-pointer rounded-xl py-2 px-2 text-center transition border text-xs font-medium ${
                dpi === item.val
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {(format === "png" || format === "webp") && (
        <label className="flex items-center justify-between cursor-pointer rounded-xl bg-slate-50 border border-slate-200 p-3">
          <span className="text-xs font-medium text-slate-700">
            Preserve Transparent Background
          </span>
          <input
            type="checkbox"
            checked={transparentBg}
            onChange={(e) => setTransparentBg(e.target.checked)}
            disabled={disabled}
            className="h-4 w-4 rounded-sm border-slate-300 text-green-600 focus:ring-green-500"
          />
        </label>
      )}

      <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 flex items-center justify-between text-xs text-slate-600">
        <span className="flex items-center gap-1.5 font-medium text-slate-700">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Export Profile
        </span>
        <span className="font-mono font-medium text-slate-900 uppercase">
          {format} • {dpi} DPI
        </span>
      </div>

      <button
        type="button"
        onClick={handleConvert}
        disabled={isButtonDisabled}
        aria-busy={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing Images...</span>
          </>
        ) : (
          <>
            <FaFileImage className="h-4 w-4" />
            <span>Convert to {format.toUpperCase()}</span>
          </>
        )}
      </button>
    </div>
  );
}
