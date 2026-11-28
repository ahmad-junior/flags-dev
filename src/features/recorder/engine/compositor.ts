import { drawFrame, even } from "./drawFrame";
import { withTimeout } from "./session";
import { CompositorOptions, Compositor } from "./types";

function createVideo(track: MediaStreamTrack) {
  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.srcObject = new MediaStream([track]);
  return video;
}

/** Main-thread fallback for browsers without worker video processing. */
export function createCompositor(
  screen: MediaStreamTrack,
  camera: MediaStreamTrack,
  { frameRate, maxHeight }: CompositorOptions,
): Compositor {
  const screenVideo = createVideo(screen);
  const cameraVideo = createVideo(camera);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false });
  const interval = 1000 / frameRate;

  let ticker: Worker | null = null;
  let fallback: ReturnType<typeof setInterval> | undefined;
  let output: MediaStreamTrack | null = null;
  let lastDraw = 0;
  let disposed = false;

  const draw = () => {
    if (!context || disposed) return;

    const now = performance.now();
    if (now - lastDraw < interval * 0.5) return;
    lastDraw = now;

    const sw = screenVideo.videoWidth;
    const sh = screenVideo.videoHeight;
    if (!sw || !sh) return;

    const cw = cameraVideo.videoWidth;
    const ch = cameraVideo.videoHeight;

    drawFrame(
      context,
      { image: screenVideo, width: sw, height: sh },
      camera.readyState === "live" && cw && ch
        ? { image: cameraVideo, width: cw, height: ch }
        : null,
    );
  };

  const fallbackToTimer = () => {
    ticker?.terminate();
    ticker = null;
    fallback ??= setInterval(draw, interval);
  };

  const setPaused = (paused: boolean) => {
    if (ticker) ticker.postMessage(paused ? 0 : interval);
    else {
      clearInterval(fallback);
      fallback = paused ? undefined : setInterval(draw, interval);
    }
  };

  const start = async () => {
    if (!context) throw new Error("Canvas is not supported.");

    await withTimeout(
      Promise.all([screenVideo.play(), cameraVideo.play()]),
      10_000,
      "Video preview",
    );
    if (disposed) return;

    const { videoWidth, videoHeight } = screenVideo;
    if (!videoWidth || !videoHeight) {
      throw new Error("The shared screen produced no video.");
    }

    const scale = maxHeight ? Math.min(1, maxHeight / videoHeight) : 1;
    canvas.width = even(videoWidth * scale);
    canvas.height = even(videoHeight * scale);
    draw();

    output = canvas.captureStream(frameRate).getVideoTracks()[0];

    try {
      ticker = new Worker(new URL("./ticker.worker.ts", import.meta.url), {
        type: "module",
      });
      ticker.onmessage = draw;
      ticker.onerror = fallbackToTimer;
      ticker.postMessage(interval);
    } catch {
      fallbackToTimer();
    }
  };

  return {
    ready: start(),
    get track() {
      if (!output) throw new Error("Compositor is not ready.");
      return output;
    },
    setPaused,
    dispose() {
      disposed = true;
      ticker?.terminate();
      clearInterval(fallback);
      output?.stop();
      screenVideo.srcObject = null;
      cameraVideo.srcObject = null;
      canvas.width = canvas.height = 0;
    },
  };
}
