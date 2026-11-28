import { RecorderSnapshot } from "./types";

export const CHUNK_MS = 1000;
export const TICK_MS = 500;
export const MIN_FREE_BYTES = 200 * 1024 * 1024;
export const SPACE_CHECK_MS = 10_000;
export const USE_WORKER_MIXER = true;
export const FALLBACK_MIME_TYPES = [
  "video/webm;codecs=vp8,opus",
  "video/webm",
  "video/mp4",
];

export const DIRECTORY = "recordings";
export const LOCK_PREFIX = "Flagsdev-recording:";
export const MAX_PENDING_BYTES = 256 * 1024 * 1024;
export const MAX_MEMORY_BYTES = 1024 * 1024 * 1024;
export const HEAD_BYTES = 64 * 1024;
export const MAX_TAIL_BYTES = 64 * 1024 * 1024;
export const EXTENSION = /\.(webm|mp4)$/i;

export const FLUSH_INTERVAL_MS = 5000;

export const INITIAL_SNAPSHOT: RecorderSnapshot = {
  phase: "idle",
  durationMs: 0,
  bytes: 0,
  warnings: [],
  error: null,
  result: null,
};
