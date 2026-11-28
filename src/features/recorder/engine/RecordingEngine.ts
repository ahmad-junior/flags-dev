import { createAudioMixer } from "./audio";
import { createCompositor } from "./compositor";
import { CancelledError, Session, stopTracks, withTimeout } from "./session";
import { createSink, getFreeSpace } from "./storage";
import type {
  RecorderSnapshot,
  RecordingOptions,
  ActiveRecording,
  CompositorOptions,
  Compositor,
  RecordingSink,
} from "./types";
import { fixWebmDuration } from "./webm";
import {
  createWorkerCompositor,
  isWorkerCompositorSupported,
} from "./workerCompositor";
import {
  CHUNK_MS,
  TICK_MS,
  MIN_FREE_BYTES,
  SPACE_CHECK_MS,
  USE_WORKER_MIXER,
  FALLBACK_MIME_TYPES,
  INITIAL_SNAPSHOT,
} from "./constants";

const elapsed = (active: ActiveRecording) =>
  (active.pausedAt ?? performance.now()) -
  active.startedAt -
  active.pausedTotal;

const errorName = (error: unknown) =>
  error instanceof Error || error instanceof DOMException ? error.name : "";

const errorMessage = (error: unknown) =>
  error instanceof Error || error instanceof DOMException
    ? error.message
    : "Recording failed.";

function requestScreen(options: RecordingOptions) {
  return navigator.mediaDevices.getDisplayMedia({
    video: {
      frameRate: { ideal: options.frameRate, max: options.frameRate },
      ...(options.maxHeight ? { height: { max: options.maxHeight } } : {}),
    },
    audio: options.systemAudio,
    // (TypeScript version or Browsers) knows yet
    selfBrowserSurface: "exclude",
    surfaceSwitching: "include",
    systemAudio: options.systemAudio ? "include" : "exclude",
  } as DisplayMediaStreamOptions);
}

async function requestDevice(
  constraints: MediaStreamConstraints,
  label: string,
) {
  try {
    return await withTimeout(
      navigator.mediaDevices.getUserMedia(constraints),
      30_000,
      label,
      stopTracks,
    );
  } catch (error) {
    throw new Error(`${label} could not start: ${errorMessage(error)}`);
  }
}

function createFileName(mimeType: string) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 23);
  const extension = mimeType.includes("mp4") ? "mp4" : "webm";
  return `Flagsdev-recording-${stamp}.${extension}`;
}

/**
 * idle > starting > recording <> paused > stopping > finished | error
 * Framework independent; React reads it through subscribe/getSnapshot.
 */
export class RecordingEngine {
  private snapshot = INITIAL_SNAPSHOT;
  private listeners = new Set<() => void>();
  private session: Session | null = null;
  private active: ActiveRecording | null = null;
  private stopTask: Promise<void> | null = null;
  private resultSink: RecordingSink | null = null;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.snapshot;

  private update(patch: Partial<RecorderSnapshot>) {
    this.snapshot = { ...this.snapshot, ...patch };
    this.listeners.forEach((listener) => listener());
  }

  private warn(message: string) {
    if (this.snapshot.warnings.includes(message)) return;
    this.update({ warnings: [...this.snapshot.warnings, message] });
  }

  /** Must be called directly from a click handler. */
  start = async (options: RecordingOptions): Promise<void> => {
    if (!["idle", "finished", "error"].includes(this.snapshot.phase)) return;

    this.clearResult();
    const session = new Session();
    this.session = session;
    this.update({ ...INITIAL_SNAPSHOT, phase: "starting" });

    let sink: RecordingSink | null = null;
    let screenGranted = false;

    try {
      if (
        !navigator.mediaDevices?.getDisplayMedia ||
        typeof MediaRecorder === "undefined"
      ) {
        throw new Error("This browser does not support screen recording.");
      }

      // First request: it needs the click's user activation
      const screen = session.addStream(await requestScreen(options));
      screenGranted = true;
      const [screenTrack] = screen.getVideoTracks();

      const microphone = options.microphone
        ? session.addStream(
            await requestDevice(
              { audio: { echoCancellation: true, noiseSuppression: true } },
              "Microphone",
            ),
          )
        : null;

      const camera = options.camera
        ? session.addStream(
            await requestDevice(
              {
                video: {
                  width: { ideal: 640 },
                  height: { ideal: 480 },
                  frameRate: { ideal: Math.min(options.frameRate, 30) },
                },
              },
              "Camera",
            ),
          )
        : null;

      // Audio
      const systemTracks = options.systemAudio ? screen.getAudioTracks() : [];
      if (options.systemAudio && !systemTracks.length) {
        this.warn(
          "No system audio was received. Firefox does not support it; in Chrome or Edge, turn on audio sharing in the share window.",
        );
      }

      const audioTracks = [
        ...systemTracks,
        ...(microphone?.getAudioTracks() ?? []),
      ];
      let audio: MediaStreamTrack | undefined = audioTracks[0];

      if (audioTracks.length > 1) {
        const mixer = createAudioMixer(audioTracks);
        session.defer(mixer.dispose);
        await mixer.ready;
        session.assertOpen();
        audio = mixer.track;
      }

      // Video: record the screen directly unless the camera is on
      let video = screenTrack;
      let compositor: ActiveRecording["compositor"] = null;

      if (camera) {
        const cameraCompositor = await this.startCompositor(
          session,
          screenTrack,
          camera.getVideoTracks()[0],
          options,
        );
        compositor = cameraCompositor;
        video = cameraCompositor.track;
      }

      const { recorder, mimeType } = this.createRecorder(
        new MediaStream(audio ? [video, audio] : [video]),
        options,
      );
      const fileName = createFileName(mimeType);

      const free = await getFreeSpace();
      session.assertOpen();

      sink = await createSink(fileName, mimeType, {
        onBytes: (bytes) => this.update({ bytes }),
        onFull: (message) => {
          this.warn(`${message} Recording was stopped.`);
          void this.stop();
        },
      });
      session.assertOpen();

      if (sink.persistent && free !== null && free < MIN_FREE_BYTES) {
        throw new Error(
          "Not enough free browser storage. Delete saved recordings or free disk space.",
        );
      }
      if (!sink.persistent) {
        this.warn("Disk storage is unavailable; keep this recording short.");
      }
      if (screenTrack.readyState === "ended") {
        throw new Error("Screen sharing stopped before recording began.");
      }

      const target = sink;
      const stopped = new Promise<void>((resolve) => {
        recorder.onstop = () => {
          resolve();
          // The browser may stop the recorder on its own  --- Hint for (ahmad-junior)
          if (this.active?.recorder === recorder) void this.stop();
        };
      });
      recorder.ondataavailable = ({ data }) => {
        if (data.size) target.write(data);
      };
      recorder.onerror = (event) => {
        const { error } = event as Event & { error?: DOMException };
        this.warn(
          `The encoder failed${error ? `: ${error.message}` : "."} Try a lower quality or another format.`,
        );
        void this.stop();
      };

      screenTrack.addEventListener("ended", () => void this.stop());
      microphone?.getAudioTracks()[0].addEventListener("ended", () => {
        this.warn("The microphone was disconnected.");
      });
      camera?.getVideoTracks()[0].addEventListener("ended", () => {
        this.warn("The camera was disconnected.");
      });

      recorder.start(CHUNK_MS);

      const active: ActiveRecording = {
        session,
        recorder,
        sink,
        stopped,
        compositor,
        fileName,
        startedAt: performance.now(),
        pausedAt: null,
        pausedTotal: 0,
        spaceCheckedAt: performance.now(),
      };
      active.timer = setInterval(() => this.tick(active), TICK_MS);
      this.active = active;
      this.update({ phase: "recording" });
    } catch (error) {
      session.close();
      await sink?.remove();

      if (this.session !== session || error instanceof CancelledError) return;

      if (!screenGranted && errorName(error) === "NotAllowedError") {
        this.update({
          ...INITIAL_SNAPSHOT,
          warnings: ["Screen sharing was cancelled or blocked."],
        });
      } else {
        this.update({ phase: "error", error: errorMessage(error) });
      }
    }
  };

  /** Uses the worker where supported, otherwise the canvas fallback. */
  private async startCompositor(
    session: Session,
    screen: MediaStreamTrack,
    camera: MediaStreamTrack,
    options: CompositorOptions,
  ) {
    if (USE_WORKER_MIXER && isWorkerCompositorSupported()) {
      let compositor: Compositor | null = null;

      try {
        const workerCompositor = createWorkerCompositor(
          screen,
          camera,
          options,
          (message) => {
            this.warn(`${message} Recording was stopped.`);
            void this.stop();
          },
        );
        compositor = workerCompositor;
        session.defer(workerCompositor.dispose);
        await workerCompositor.ready;
        session.assertOpen();
        return workerCompositor;
      } catch (error) {
        session.assertOpen();
        compositor?.dispose();
        console.warn("Worker video mixing unavailable", error);
      }
    }

    const compositor = createCompositor(screen, camera, options);
    session.defer(compositor.dispose);
    await compositor.ready;
    session.assertOpen();
    return compositor;
  }

  private createRecorder(stream: MediaStream, options: RecordingOptions) {
    // Firefox Fix --- Hint for (ahmad-junior)
    const hasAudio = stream.getAudioTracks().length > 0;
    const matchTracks = (type: string) =>
      hasAudio ? type : type.replace(/,\s*(opus|mp4a[.\w]*)/i, "");

    const requested = options.mimeType && matchTracks(options.mimeType);
    const candidates = [requested, ...FALLBACK_MIME_TYPES.map(matchTracks)]
      .filter((type): type is string => Boolean(type))
      .filter((type) => MediaRecorder.isTypeSupported(type));

    for (const mimeType of candidates) {
      try {
        const recorder = new MediaRecorder(stream, {
          mimeType,
          videoBitsPerSecond: options.videoBitsPerSecond,
          audioBitsPerSecond: 128_000,
        });
        if (requested && mimeType !== requested) {
          this.warn(`The selected format failed; recording as ${mimeType}.`);
        }
        return { recorder, mimeType };
      } catch (error) {
        console.warn(`Could not use ${mimeType}`, error);
      }
    }

    throw new Error("No supported recording format was found.");
  }

  private tick(active: ActiveRecording) {
    const durationMs = elapsed(active);

    if (
      Math.floor(durationMs / 1000) !==
      Math.floor(this.snapshot.durationMs / 1000)
    ) {
      this.update({ durationMs });
    }

    const now = performance.now();
    if (
      active.sink.persistent &&
      now - active.spaceCheckedAt > SPACE_CHECK_MS
    ) {
      active.spaceCheckedAt = now;
      void getFreeSpace().then((free) => {
        if (this.active !== active || free === null) return;
        if (free < MIN_FREE_BYTES) {
          this.warn("Storage is almost full. Recording was stopped.");
          void this.stop();
        }
      });
    }
  }

  pause = () => {
    const { active } = this;
    if (!active || this.stopTask || active.recorder.state !== "recording") {
      return;
    }

    active.recorder.pause();
    active.compositor?.setPaused(true);
    active.pausedAt = performance.now();
    this.update({ phase: "paused", durationMs: elapsed(active) });
  };

  resume = () => {
    const { active } = this;
    if (!active || this.stopTask || active.pausedAt === null) return;

    active.pausedTotal += performance.now() - active.pausedAt;
    active.pausedAt = null;
    active.compositor?.setPaused(false);
    active.recorder.resume();
    this.update({ phase: "recording" });
  };

  stop = (): Promise<void> => {
    if (this.stopTask) return this.stopTask;

    const { active } = this;
    if (!active) return Promise.resolve();

    this.stopTask = Promise.resolve()
      .then(() => this.finish(active))
      .finally(() => {
        this.stopTask = null;
      });
    return this.stopTask;
  };

  private async finish(active: ActiveRecording) {
    const durationMs = elapsed(active);
    clearInterval(active.timer);
    this.update({ phase: "stopping", durationMs });

    try {
      if (active.recorder.state !== "inactive") active.recorder.stop();

      await withTimeout(active.stopped, 10_000, "Stopping the recorder").catch(
        (error) => this.warn(errorMessage(error)),
      );
      active.recorder.ondataavailable = null;
      active.session.close();

      let blob = await active.sink.close();
      if (!blob.size) {
        await active.sink.remove();
        throw new Error("Nothing was recorded.");
      }

      if (blob.type.includes("webm")) {
        const original = blob;
        blob = await fixWebmDuration(original, durationMs).catch(
          () => original,
        );
      }

      this.resultSink = active.sink;
      this.update({
        phase: "finished",
        bytes: blob.size,
        result: {
          url: URL.createObjectURL(blob),
          fileName: active.fileName,
          size: blob.size,
          durationMs,
          mimeType: blob.type,
        },
      });
    } catch (error) {
      active.session.close();
      active.sink.release();
      this.update({ phase: "error", error: errorMessage(error) });
    } finally {
      this.active = null;
    }
  }

  cancel = () => {
    if (this.snapshot.phase !== "starting") return;

    this.session?.close();
    this.session = null;
    this.update(INITIAL_SNAPSHOT);
  };

  private clearResult() {
    if (this.snapshot.result) URL.revokeObjectURL(this.snapshot.result.url);
    this.resultSink?.release();
    this.resultSink = null;
  }

  dismiss = () => {
    if (!["finished", "error"].includes(this.snapshot.phase)) return;

    this.clearResult();
    this.update(INITIAL_SNAPSHOT);
  };

  discard = async () => {
    const sink = this.resultSink;
    if (this.snapshot.phase !== "finished" || !sink) return;

    this.resultSink = null;
    this.clearResult();
    this.update({ ...INITIAL_SNAPSHOT, phase: "stopping" });
    await sink.remove();
    this.update(INITIAL_SNAPSHOT);
  };

  release = async () => {
    this.cancel();
    await this.stop();
    this.dismiss();
  };
}
