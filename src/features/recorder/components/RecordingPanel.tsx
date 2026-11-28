"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Download,
  Loader2,
  Pause,
  Play,
  Square,
  Trash2,
  Film,
  X,
  Clock3,
  HardDrive,
  Video,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

import type { RecordingEngine } from "@/features/recorder/engine/RecordingEngine";
import type { RecorderSnapshot } from "@/features/recorder/engine/types";
import {
  deleteSavedRecording,
  listSavedRecordings,
  readSavedRecording,
  type SavedRecording,
} from "@/features/recorder/engine/storage";

const button =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50";

const stopButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700";

function formatTime(ms: number) {
  const total = Math.floor(ms / 1000);

  return [Math.floor(total / 3600), Math.floor(total / 60) % 60, total % 60]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

const formatSize = (bytes: number) =>
  bytes < 1024 ** 3
    ? `${(bytes / 1024 ** 2).toFixed(1)} MB`
    : `${(bytes / 1024 ** 3).toFixed(2)} GB`;

function formatDuration(seconds: number) {
  return formatTime(seconds * 1000);
}

function getFormat(name: string) {
  return name.split(".").pop()?.toUpperCase() || "VIDEO";
}

type VideoPreview = {
  thumbnail: string | null;
  duration: number;
};

function waitForVideoEvent(
  video: HTMLVideoElement,
  event: string,
  timeout = 10000,
): Promise<void> {
  if (
    event === "loadedmetadata" &&
    video.readyState >= HTMLMediaElement.HAVE_METADATA
  ) {
    return Promise.resolve();
  }

  if (
    event === "loadeddata" &&
    video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
  ) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      video.removeEventListener(event, onSuccess);
      video.removeEventListener("error", onError);
      window.clearTimeout(timer);
    };

    const onSuccess = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error("Video loading failed."));
    };

    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error(`Video ${event} timed out.`));
    }, timeout);

    video.addEventListener(event, onSuccess, { once: true });
    video.addEventListener("error", onError, { once: true });
  });
}

async function generateThumbnail(blob: Blob): Promise<VideoPreview> {
  const url = URL.createObjectURL(blob);
  const video = document.createElement("video");

  try {
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.src = url;

    await waitForVideoEvent(video, "loadedmetadata");

    let duration = video.duration;

    // MediaRecorder WebM files can initially report Infinity.
    if (!Number.isFinite(duration) || duration <= 0) {
      try {
        const durationUpdated = new Promise<void>((resolve) => {
          const checkDuration = () => {
            if (Number.isFinite(video.duration) && video.duration > 0) {
              video.removeEventListener("durationchange", checkDuration);
              video.removeEventListener("timeupdate", checkDuration);
              resolve();
            }
          };

          video.addEventListener("durationchange", checkDuration);
          video.addEventListener("timeupdate", checkDuration);

          window.setTimeout(() => {
            video.removeEventListener("durationchange", checkDuration);
            video.removeEventListener("timeupdate", checkDuration);
            resolve();
          }, 3000);
        });

        video.currentTime = 1e101;
        await durationUpdated;

        duration = video.duration;

        if (Number.isFinite(duration) && duration > 0) {
          await new Promise<void>((resolve) => {
            video.addEventListener("seeked", () => resolve(), {
              once: true,
            });
            video.currentTime = 0;
          });
        }
      } catch {
        duration = 0;
      }
    }

    // Wait for an actual decoded frame.
    await waitForVideoEvent(video, "loadeddata");

    if (!video.videoWidth || !video.videoHeight) {
      return { thumbnail: null, duration };
    }

    if (Number.isFinite(duration) && duration > 1) {
      try {
        const seekTime = Math.min(1, duration / 2);

        await new Promise<void>((resolve, reject) => {
          const timer = window.setTimeout(() => {
            video.removeEventListener("seeked", onSeeked);
            reject(new Error("Video seeking timed out."));
          }, 5000);

          const onSeeked = () => {
            window.clearTimeout(timer);
            resolve();
          };

          video.addEventListener("seeked", onSeeked, {
            once: true,
          });

          video.currentTime = seekTime;
        });
      } catch {
        // Keep the first decoded frame as fallback.
      }
    }

    // Give the browser time to present the decoded frame.
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });

    const canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 270;

    const context = canvas.getContext("2d");

    if (!context) {
      return { thumbnail: null, duration };
    }

    const scale = Math.max(
      canvas.width / video.videoWidth,
      canvas.height / video.videoHeight,
    );

    const width = video.videoWidth * scale;
    const height = video.videoHeight * scale;

    context.fillStyle = "#0f172a";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      video,
      (canvas.width - width) / 2,
      (canvas.height - height) / 2,
      width,
      height,
    );

    return {
      thumbnail: canvas.toDataURL("image/jpeg", 0.8),
      duration,
    };
  } catch (error) {
    console.error("Thumbnail generation failed:", error);

    return {
      thumbnail: null,
      duration: 0,
    };
  } finally {
    video.pause();
    video.removeAttribute("src");
    video.load();
    URL.revokeObjectURL(url);
  }
}

function SavedRecordings() {
  const [items, setItems] = useState<SavedRecording[]>([]);
  const [previews, setPreviews] = useState<Record<string, VideoPreview>>({});
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selected, setSelected] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const recordings = await listSavedRecordings();

      setItems(recordings);
      setPreviews({});
    } catch {
      setError("Unable to load your saved recordings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      void refresh();
    });
  }, [refresh]);

  useEffect(() => {
    let cancelled = false;

    async function loadPreviews() {
      for (const item of items) {
        if (cancelled) return;

        try {
          const blob = await readSavedRecording(item.name);
          const preview = await generateThumbnail(blob);

          if (cancelled) return;

          setPreviews((previous) => ({
            ...previous,
            [item.name]: preview,
          }));
        } catch {
          if (!cancelled) {
            setPreviews((previous) => ({
              ...previous,
              [item.name]: { thumbnail: null, duration: 0 },
            }));
          }
        }
      }
    }

    if (items.length) {
      void loadPreviews();
    }

    return () => {
      cancelled = true;
    };
  }, [items]);

  useEffect(() => {
    return () => {
      if (selected?.url) {
        URL.revokeObjectURL(selected.url);
      }
    };
  }, [selected?.url]);

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  const play = async (name: string) => {
    setOpening(name);
    setError("");

    try {
      const blob = await readSavedRecording(name);
      const url = URL.createObjectURL(blob);

      setSelected({ name, url });
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
      const blob = await readSavedRecording(name);
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = name;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      setError(`Unable to download ${name}. Please try again.`);
    }
  };

  const remove = async (name: string) => {
    if (!window.confirm(`Delete "${name}" permanently from this device?`)) {
      return;
    }

    setDeleting(name);
    setError("");

    try {
      await deleteSavedRecording(name);

      if (selected?.name === name) {
        setSelected(null);
      }

      setItems((previous) => previous.filter((item) => item.name !== name));

      setPreviews((previous) => {
        const next = { ...previous };
        delete next[name];
        return next;
      });
    } catch {
      setError(`Unable to delete ${name}. Please try again.`);
    } finally {
      setDeleting(null);
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
                No saved recordings yet
              </h4>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Your completed recordings will appear here. Everything stays on
                this device.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => {
                const preview = previews[item.name];

                return (
                  <article
                    key={item.name}
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-green-200 hover:shadow-md"
                  >
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
                          onClick={() => void play(item.name)}
                          disabled={opening !== null}
                          aria-label={`Play ${item.name}`}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-green-600 opacity-0 shadow-lg transition hover:scale-110 group-hover:opacity-100 focus:opacity-100 disabled:opacity-50"
                        >
                          {opening === item.name ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Play className="ml-0.5 h-5 w-5 fill-current" />
                          )}
                        </button>
                      </div>

                      <span className="absolute bottom-2 right-2 rounded-md bg-black/75 px-2 py-1 text-[11px] font-semibold text-white">
                        {preview?.duration
                          ? formatDuration(preview.duration)
                          : getFormat(item.name)}
                      </span>
                    </div>

                    <div className="p-3.5">
                      <h4
                        className="truncate text-sm font-semibold text-slate-800"
                        title={item.name}
                      >
                        {item.name}
                      </h4>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <HardDrive className="h-3.5 w-3.5" />
                          {formatSize(item.size)}
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {preview?.duration
                            ? formatDuration(preview.duration)
                            : "Duration unavailable"}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                        <button
                          type="button"
                          onClick={() => void play(item.name)}
                          disabled={opening !== null}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                        >
                          {opening === item.name ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Play className="h-3.5 w-3.5 fill-current" />
                          )}
                          Play
                        </button>

                        <button
                          type="button"
                          onClick={() => void download(item.name)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-green-600"
                          aria-label={`Download ${item.name}`}
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => void remove(item.name)}
                          disabled={deleting === item.name}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                          aria-label={`Delete ${item.name}`}
                          title="Delete"
                        >
                          {deleting === item.name ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
          }}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Playing ${selected.name}`}
            className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
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
          </div>
        </div>
      )}
    </>
  );
}

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
              Close
            </button>

            <button
              type="button"
              className={button}
              onClick={() => {
                if (window.confirm("Delete this recording?")) {
                  void engine.discard();
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}

      {settled && <SavedRecordings key={phase} />}
    </div>
  );
}
