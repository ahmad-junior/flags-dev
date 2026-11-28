import type { Compositor, CompositorOptions } from "./types";
import type {
  CompositorRequest,
  CompositorResponse,
} from "./compositor.worker";
import { withTimeout } from "./session";

interface InsertableStreams {
  MediaStreamTrackProcessor?: new (init: {
    track: MediaStreamTrack;
    maxBufferSize?: number;
  }) => { readable: ReadableStream<VideoFrame> };
  MediaStreamTrackGenerator?: new (init: {
    kind: "video";
  }) => MediaStreamTrack & { writable: WritableStream<VideoFrame> };
}

const api = () => globalThis as unknown as InsertableStreams;

export function isWorkerCompositorSupported() {
  return Boolean(
    api().MediaStreamTrackProcessor &&
    api().MediaStreamTrackGenerator &&
    typeof OffscreenCanvas !== "undefined",
  );
}

export function createWorkerCompositor(
  screen: MediaStreamTrack,
  camera: MediaStreamTrack,
  { frameRate, maxHeight }: CompositorOptions,
  onError: (message: string) => void,
): Compositor {
  const Processor = api().MediaStreamTrackProcessor!;
  const Generator = api().MediaStreamTrackGenerator!;

  const worker = new Worker(
    new URL("./compositor.worker.ts", import.meta.url),
    { type: "module" },
  );
  let output: (MediaStreamTrack & { writable: WritableStream }) | null = null;
  let disposed = false;

  const send = (message: CompositorRequest, transfer: Transferable[] = []) =>
    worker.postMessage(message, transfer);

  const start = () =>
    new Promise<void>((resolve, reject) => {
      let started = false;
      const failed = (message: string) => {
        if (disposed) return;
        if (started) onError(message);
        else reject(new Error(message));
      };

      worker.onmessage = ({ data }: MessageEvent<CompositorResponse>) => {
        if (data.type === "ready") {
          started = true;
          resolve();
        } else failed(data.message);
      };
      worker.onerror = () => failed("The video worker crashed.");

      output = new Generator({ kind: "video" });
      const source = new Processor({ track: screen, maxBufferSize: 1 });
      const overlay = new Processor({ track: camera, maxBufferSize: 1 });

      send(
        {
          type: "start",
          screen: source.readable,
          camera: overlay.readable,
          output: output.writable,
          frameRate,
          maxHeight,
        },
        [
          source.readable,
          overlay.readable,
          output.writable,
        ] as unknown as Transferable[],
      );
    });

  return {
    ready: withTimeout(start(), 5000, "Video worker"),
    get track() {
      if (!output) throw new Error("Compositor is not ready.");
      return output;
    },
    setPaused: (paused) => send({ type: "pause", paused }),
    dispose() {
      if (disposed) return;
      disposed = true;
      send({ type: "stop" });
      setTimeout(() => worker.terminate(), 1000);
      output?.stop();
    },
  };
}
