import { Session } from "./session";

export type RecorderPhase =
  | "idle"
  | "starting"
  | "recording"
  | "paused"
  | "stopping"
  | "finished"
  | "error";

export interface RecordingOptions {
  mimeType?: string;
  /** Maximum capture height; leave undefined to keep the source size */
  maxHeight?: number;
  frameRate: number;
  videoBitsPerSecond: number;
  microphone: boolean;
  camera: boolean;
  systemAudio: boolean;
}

export interface RecordingResult {
  url: string;
  fileName: string;
  size: number;
  durationMs: number;
  mimeType: string;
}

export interface RecorderSnapshot {
  phase: RecorderPhase;
  durationMs: number;
  bytes: number;
  warnings: string[];
  error: string | null;
  result: RecordingResult | null;
}

export interface ActiveRecording {
  session: Session;
  recorder: MediaRecorder;
  sink: RecordingSink;
  stopped: Promise<void>;
  compositor: Compositor | null;
  fileName: string;
  startedAt: number;
  pausedAt: number | null;
  pausedTotal: number;
  spaceCheckedAt: number;
  timer?: ReturnType<typeof setInterval>;
}

export interface CompositorOptions {
  frameRate: number;
  maxHeight?: number;
}

export interface Compositor {
  ready: Promise<void>;
  readonly track: MediaStreamTrack;
  setPaused(paused: boolean): void;
  dispose(): void;
}

export interface Picture {
  image: CanvasImageSource;
  width: number;
  height: number;
}

export interface SinkEvents {
  onBytes(total: number): void;
  /** Called once, when the recording must be stopped */
  onFull(message: string): void;
}

export interface RecordingSink {
  readonly persistent: boolean;
  write(chunk: Blob): void;
  /** Finishes writing and returns the recording */
  close(): Promise<Blob>;
  /** Frees the file for the saved list; keeps the data */
  release(): void;
  /** Deletes the data */
  remove(): Promise<void>;
}

export interface SavedRecording {
  name: string;
  size: number;
  lastModified: number;
}

export interface SyncHandle {
  write(data: ArrayBuffer, options: { at: number }): number;
  truncate(size: number): void;
  flush(): void;
  close(): void;
}

export type StorageRequest =
  | { type: "open"; directory: string; name: string }
  | { type: "write"; chunk: Blob }
  | { type: "close" };

export type StorageResponse =
  | { type: "opened" }
  | { type: "written"; size: number; total: number }
  | { type: "closed" }
  | { type: "write-failed"; message: string }
  | { type: "failed"; message: string };
