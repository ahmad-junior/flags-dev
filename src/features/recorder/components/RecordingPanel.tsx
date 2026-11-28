"use client";

import { useState } from "react";
import { Download, Loader2, Pause, Play, Square, Trash2 } from "lucide-react";

import ConfirmDeleteDialog from "@/features/recorder/components/ConfirmDeleteDialog";
import SavedRecordings from "@/features/recorder/components/SavedRecordings";
import type { RecordingEngine } from "@/features/recorder/engine/RecordingEngine";
import type { RecorderSnapshot } from "@/features/recorder/engine/types";
import { formatSize, formatTime } from "@/features/recorder/lib/formats";

const button =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50";

const stopButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700";

export default function RecordingPanel({
  engine,
  snapshot,
}: {
  engine: RecordingEngine;
  snapshot: RecorderSnapshot;
}) {
  const { phase, result, warnings, error } = snapshot;
  const live = phase === "recording" || phase === "paused";
  const settled = ["idle", "finished", "error"].includes(phase);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="mt-6 space-y-4">
      {(phase === "starting" || phase === "stopping") && (
        <div
          role="status"
          className="flex items-center justify-center gap-3 text-sm text-slate-600"
        >
          <Loader2 className="h-5 w-5 animate-spin text-green-600" />

          {phase === "starting" ? "Waiting for your browser..." : "Saving..."}

          {phase === "starting" && (
            <button type="button" className={button} onClick={engine.cancel}>
              Cancel
            </button>
          )}
        </div>
      )}

      {live && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <span
              className={`h-3 w-3 rounded-full ${
                phase === "paused" ? "bg-amber-500" : "animate-pulse bg-red-600"
              }`}
            />

            <span className="font-mono text-2xl font-bold text-slate-900">
              {formatTime(snapshot.durationMs)}
            </span>

            <span className="text-sm text-slate-500">
              {phase === "paused" ? "Paused" : "Recording"} ·{" "}
              {formatSize(snapshot.bytes)}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className={button}
              onClick={phase === "paused" ? engine.resume : engine.pause}
            >
              {phase === "paused" ? (
                <Play className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
              {phase === "paused" ? "Resume" : "Pause"}
            </button>

            <button
              type="button"
              className={stopButton}
              onClick={() => void engine.stop()}
            >
              <Square className="h-4 w-4 fill-current" />
              Stop
            </button>
          </div>
        </div>
      )}

      {warnings.map((warning) => (
        <p
          key={warning}
          role="status"
          className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
        >
          {warning}
        </p>
      ))}

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {result && (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
          <video
            src={result.url}
            controls
            playsInline
            className="max-h-[60vh] w-full rounded-xl bg-black"
          />

          <p className="text-sm text-slate-500">
            {formatTime(result.durationMs)} · {formatSize(result.size)}
          </p>

          <div className="flex flex-wrap gap-2">
            <a href={result.url} download={result.fileName} className={button}>
              <Download className="h-4 w-4" />
              Download
            </a>

            <button type="button" className={button} onClick={engine.dismiss}>
              Save to library
            </button>

            <button
              type="button"
              className={button}
              onClick={() => setConfirmDelete(true)}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}

      {result && confirmDelete && (
        <ConfirmDeleteDialog
          name={result.fileName}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            setConfirmDelete(false);
            void engine.discard();
          }}
        />
      )}

      {/* Hidden while recording; remounting refreshes the list */}
      {settled && <SavedRecordings key={phase} hasResult={Boolean(result)} />}
    </div>
  );
}
