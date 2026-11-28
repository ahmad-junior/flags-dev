"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Download, Film, Loader2, Video, X } from "lucide-react";
import { toast } from "sonner";

import ConfirmDeleteDialog from "@/features/recorder/components/ConfirmDeleteDialog";
import Modal from "@/features/recorder/components/Modal";
import RecordingCard from "@/features/recorder/components/RecordingCard";
import {
  deleteSavedRecording,
  listSavedRecordings,
} from "@/features/recorder/engine/storage";
import type { SavedRecording } from "@/features/recorder/engine/types";
import {
  downloadSavedRecording,
  getPreview,
  openSavedRecording,
  renameRecording,
  splitName,
  validateName,
  type Preview,
} from "@/features/recorder/lib/library";

interface Editing {
  name: string;
  base: string;
  extension: string;
}

export default function SavedRecordings({ hasResult }: { hasResult: boolean }) {
  const [items, setItems] = useState<SavedRecording[]>([]);
  const [previews, setPreviews] = useState<Record<string, Preview>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [opening, setOpening] = useState<string | null>(null);
  const [selected, setSelected] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    void listSavedRecordings().then((recordings) => {
      if (!mounted.current) return;
      setItems(recordings);
      setLoading(false);
    });
    return () => {
      mounted.current = false;
    };
  }, []);

  // One at a time, so decoding never overloads the device
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      for (const item of items) {
        const preview = await getPreview(item);
        if (cancelled) return;
        setPreviews((current) => ({ ...current, [item.name]: preview }));
      }
    };
    void load();

    return () => {
      cancelled = true;
    };
  }, [items]);

  // Free the player's URL when it closes or changes
  useEffect(() => {
    if (!selected) return;
    return () => URL.revokeObjectURL(selected.url);
  }, [selected]);

  const play = async (name: string) => {
    setOpening(name);
    setError("");

    try {
      const { blob } = await openSavedRecording(name);
      if (mounted.current) {
        setSelected({ name, url: URL.createObjectURL(blob) });
      }
    } catch {
      setError(
        `Unable to open ${name}. The recording may no longer be available.`,
      );
    } finally {
      setOpening(null);
    }
  };

  const download = async (name: string) => {
    try {
      await downloadSavedRecording(name);
    } catch {
      setError(`Unable to download ${name}. Please try again.`);
    }
  };

  const remove = async (name: string) => {
    setDeleting(true);
    setError("");

    try {
      await deleteSavedRecording(name);
      setItems((current) => current.filter((item) => item.name !== name));
      toast.success(`"${name}" deleted.`);
    } catch {
      setError(`Unable to delete ${name}. Please try again.`);
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  const startRename = async (name: string) => {
    try {
      const [base, extension] = await splitName(name);
      setEditing({ name, base, extension });
    } catch {
      toast.error("This recording can no longer be opened.");
    }
  };

  const rename = async () => {
    if (!editing || renaming) return;

    const { name, extension } = editing;
    const base = editing.base.trim();
    const problem = validateName(base);
    if (problem) {
      toast.error(problem);
      return;
    }

    const next = base + extension;
    if (next === name) {
      setEditing(null);
      return;
    }

    setRenaming(true);
    try {
      await renameRecording(name, next);
      setPreviews((current) => ({ ...current, [next]: current[name] }));
      setItems((current) =>
        current.map((item) =>
          item.name === name ? { ...item, name: next } : item,
        ),
      );
      setEditing(null);
      toast.success("Recording renamed.");
    } catch (reason) {
      toast.error(
        reason instanceof Error ? reason.message : "Failed to rename.",
      );
    } finally {
      setRenaming(false);
    }
  };

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Film className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Your recordings</h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Videos saved on this device
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              {items.length} {items.length === 1 ? "recording" : "recordings"}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Local storage
            </span>
          </div>
        </div>

        <div className="p-5">
          {error && (
            <div
              role="alert"
              className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
              <button
                type="button"
                className="ml-auto text-xs font-semibold underline"
                onClick={() => setError("")}
              >
                Dismiss
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-7 w-7 animate-spin text-green-600" />
              <p className="mt-3 text-sm text-slate-500">
                Loading your recordings...
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Video className="h-7 w-7 text-slate-400" />
              </div>

              <h4 className="mt-4 font-semibold text-slate-800">
                {hasResult ? "No other recordings" : "No saved recordings yet"}
              </h4>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Your completed recordings will appear here. Everything stays on
                this device.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <RecordingCard
                  key={item.name}
                  item={item}
                  preview={previews[item.name]}
                  editing={editing?.name === item.name ? editing : null}
                  renaming={renaming}
                  opening={opening === item.name}
                  busy={opening !== null}
                  onPlay={() => void play(item.name)}
                  onDownload={() => void download(item.name)}
                  onDelete={() => setToDelete(item.name)}
                  onEditStart={() => void startRename(item.name)}
                  onEditChange={(base) =>
                    setEditing((current) => current && { ...current, base })
                  }
                  onEditCancel={() => setEditing(null)}
                  onRename={() => void rename()}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {toDelete && (
        <ConfirmDeleteDialog
          name={toDelete}
          busy={deleting}
          onCancel={() => setToDelete(null)}
          onConfirm={() => void remove(toDelete)}
        />
      )}

      {selected && (
        <Modal
          label={`Playing ${selected.name}`}
          onClose={() => setSelected(null)}
          className="max-w-5xl border border-white/10 bg-slate-900"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/15 text-green-400">
                <Video className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white">
                  {selected.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Saved recording · This device
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Close video player"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="bg-black">
            <video
              key={selected.url}
              src={selected.url}
              controls
              autoPlay
              playsInline
              className="max-h-[72vh] w-full object-contain"
            >
              Your browser does not support video playback.
            </video>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <p className="min-w-0 truncate text-xs text-slate-400">
              {selected.name}
            </p>

            <button
              type="button"
              onClick={() => void download(selected.name)}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
