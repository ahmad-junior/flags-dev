"use client";

import Image from "next/image";
import {
  Check,
  Clock3,
  Download,
  HardDrive,
  Loader2,
  Pencil,
  Play,
  Trash2,
  Video,
  X,
} from "lucide-react";

import type { SavedRecording, Preview } from "@/features/recorder/engine/types";
import { formatSize, formatTime } from "@/features/recorder/lib/formats";

export default function RecordingCard({
  item,
  preview,
  editing,
  renaming,
  opening,
  busy,
  onPlay,
  onDownload,
  onDelete,
  onEditStart,
  onEditChange,
  onEditCancel,
  onRename,
}: {
  item: SavedRecording;
  preview?: Preview;
  editing: { base: string; extension: string } | null;
  renaming: boolean;
  opening: boolean;
  busy: boolean;
  onPlay: () => void;
  onDownload: () => void;
  onDelete: () => void;
  onEditStart: () => void;
  onEditChange: (base: string) => void;
  onEditCancel: () => void;
  onRename: () => void;
}) {
  const format = item.name.split(".").pop()?.toUpperCase() || "VIDEO";

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-green-200 hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {preview?.thumbnail ? (
          <Image
            src={preview.thumbnail}
            alt={`Preview of ${item.name}`}
            width={480}
            height={270}
            unoptimized
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {preview ? (
              <Video className="h-10 w-10 text-slate-500" />
            ) : (
              <Loader2 className="h-7 w-7 animate-spin text-slate-500" />
            )}
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/25">
          <button
            type="button"
            onClick={onPlay}
            disabled={busy}
            aria-label={`Play ${item.name}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-green-600 opacity-0 shadow-lg transition hover:scale-110 group-hover:opacity-100 focus:opacity-100 disabled:opacity-50"
          >
            {opening ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            )}
          </button>
        </div>

        <span className="absolute bottom-2 right-2 rounded-md bg-black/75 px-2 py-1 text-[11px] font-semibold text-white">
          {preview?.durationMs ? formatTime(preview.durationMs) : format}
        </span>
      </div>

      <div className="p-3.5">
        {editing ? (
          <form
            className="flex min-w-0 items-center gap-1.5"
            onSubmit={(event) => {
              event.preventDefault();
              onRename();
            }}
          >
            <input
              autoFocus
              onFocus={(event) => event.target.select()}
              value={editing.base}
              maxLength={100}
              onChange={(event) => onEditChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") onEditCancel();
              }}
              disabled={renaming}
              aria-label="Recording name"
              className="min-w-0 flex-1 rounded-lg border border-green-300 px-2.5 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-100 disabled:opacity-50"
            />
            <span className="text-xs text-slate-400">{editing.extension}</span>
            <button
              type="submit"
              disabled={renaming || !editing.base.trim()}
              className="rounded-lg p-2 text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Save recording name"
              title="Save"
            >
              {renaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={onEditCancel}
              disabled={renaming}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
              aria-label="Cancel renaming"
              title="Cancel"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <div className="flex min-w-0 items-center gap-2">
            <h4
              className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800"
              title={item.name}
            >
              {item.name}
            </h4>
            <button
              type="button"
              onClick={onEditStart}
              className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-green-600"
              aria-label={`Rename ${item.name}`}
              title="Rename recording"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <HardDrive className="h-3.5 w-3.5" />
            {formatSize(item.size)}
          </span>

          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" />
            {preview?.durationMs
              ? formatTime(preview.durationMs)
              : "Duration unavailable"}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onPlay}
            disabled={busy}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {opening ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-current" />
            )}
            Play
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-green-600"
            aria-label={`Download ${item.name}`}
            title="Download"
          >
            <Download className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`Delete ${item.name}`}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
