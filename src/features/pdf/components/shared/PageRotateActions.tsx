"use client";

import { RotateCcw, RotateCw } from "lucide-react";

interface FileRotateActionsProps {
  fileId: string;
  onRotateLeft: (fileId: string) => void;
  onRotateRight: (fileId: string) => void;
}

export default function FileRotateActions({
  fileId,
  onRotateLeft,
  onRotateRight,
}: FileRotateActionsProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRotateLeft(fileId);
        }}
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-xs border border-slate-200/60 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
      >
        <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRotateRight(fileId);
        }}
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-xs border border-slate-200/60 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
      >
        <RotateCw className="h-3.5 w-3.5 text-slate-500" />
      </button>
    </div>
  );
}
