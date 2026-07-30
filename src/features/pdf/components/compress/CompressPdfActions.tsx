"use client";

import { useState } from "react";
import { Zap, Check, Loader2, Minimize2, Info } from "lucide-react";
import { CompressionLevel } from "@/features/pdf/components/compress/compressPdf";

interface CompressPdfActionsProps {
  disabled?: boolean;
  loading?: boolean;
  progress?: number;
  originalSize?: number;
  onCompress: (level: CompressionLevel) => void;
}

export default function CompressPdfActions({
  disabled = false,
  loading = false,
  progress = 0,
  onCompress,
}: CompressPdfActionsProps) {
  const [level, setLevel] = useState<CompressionLevel>("recommended");

  const PRESETS: {
    id: CompressionLevel;
    title: string;
    description: string;
    estRatio: string;
  }[] = [
    {
      id: "extreme",
      title: "Extreme Compression",
      description: "Maximum size reduction, lower image resolution.",
      estRatio: "~70-80% smaller",
    },
    {
      id: "recommended",
      title: "Recommended Compression",
      description: "Best balance between file size and visual quality.",
      estRatio: "~40-60% smaller",
    },
    {
      id: "low",
      title: "Less Compression",
      description: "High visual fidelity with modest file size savings.",
      estRatio: "~20-30% smaller",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Minimize2 className="h-5 w-5 text-green-600" />
            <span>Compression Level</span>
          </h2>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Choose a compression profile to balance quality and file size.
        </p>
      </div>

      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        {PRESETS.map((preset) => {
          const isSelected = level === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled || loading}
              onClick={() => setLevel(preset.id)}
              className={`w-full flex items-start gap-3 rounded-xl border p-3.5 text-left transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                isSelected
                  ? "border-green-500 bg-green-50/50 text-slate-900 ring-1 ring-green-500"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <div className="mt-0.5">
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-900">
                    {preset.title}
                  </p>
                  <span className="text-[10px] font-medium text-green-700 bg-green-100/80 px-2 py-0.5 rounded-full">
                    {preset.estRatio}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                  {preset.description}
                </p>
              </div>
            </button>
          );
        })}

        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-2 text-[11px] text-slate-500 border border-slate-100">
          <Info className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span>Image-heavy PDFs yield the highest compression gains.</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onCompress(level)}
        disabled={disabled || loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing ({progress}%)...</span>
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            <span>Compress PDF</span>
          </>
        )}
      </button>
    </div>
  );
}
