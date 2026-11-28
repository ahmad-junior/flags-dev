// Mixes screen and camera frames completely off the main thread.
import { drawFrame, even } from "./drawFrame";

export type CompositorRequest =
  | {
      type: "start";
      screen: ReadableStream<VideoFrame>;
      camera: ReadableStream<VideoFrame>;
      output: WritableStream<VideoFrame>;
      frameRate: number;
      maxHeight?: number;
    }
  | { type: "pause"; paused: boolean }
  | { type: "stop" };

export type CompositorResponse =
  | { type: "ready" }
  | { type: "failed"; message: string };

type Start = Extract<CompositorRequest, { type: "start" }>;

// Only the newest frame of each source is kept, so memory cannot grow
let screenFrame: VideoFrame | null = null;
let cameraFrame: VideoFrame | null = null;
let context: OffscreenCanvasRenderingContext2D | null = null;
let writer: WritableStreamDefaultWriter<VideoFrame> | null = null;
let timer: ReturnType<typeof setInterval> | undefined;
let interval = 1000 / 30;
let running = true;
let paused = false;
const readers: ReadableStreamDefaultReader<VideoFrame>[] = [];

const reply = (message: CompositorResponse) => self.postMessage(message);

function fail(error: unknown) {
  if (!running) return;
  reply({
    type: "failed",
    message: error instanceof Error ? error.message : "Video mixing failed.",
  });
  stop();
}

function render() {
  if (!context || !writer || !screenFrame) return;
  if ((writer.desiredSize ?? 1) <= 0) return;

  try {
    drawFrame(
      context,
      {
        image: screenFrame,
        width: screenFrame.displayWidth,
        height: screenFrame.displayHeight,
      },
      cameraFrame && {
        image: cameraFrame,
        width: cameraFrame.displayWidth,
        height: cameraFrame.displayHeight,
      },
    );

    const frame = new VideoFrame(context.canvas, {
      timestamp: Math.round(performance.now() * 1000),
    });
    writer.write(frame).catch((error) => {
      frame.close();
      fail(error);
    });
  } catch (error) {
    fail(error);
  }
}

function schedule() {
  clearInterval(timer);
  if (running && !paused && context) timer = setInterval(render, interval);
}

async function read(
  stream: ReadableStream<VideoFrame>,
  onFrame: (frame: VideoFrame) => void,
) {
  const reader = stream.getReader();
  readers.push(reader);

  while (running) {
    const { value, done } = await reader.read();
    if (done) break;
    if (running) onFrame(value);
    else value.close();
  }
}

function begin({ screen, camera, output, frameRate, maxHeight }: Start) {
  interval = 1000 / frameRate;
  writer = output.getWriter();

  read(screen, (frame) => {
    screenFrame?.close();
    screenFrame = frame;

    if (!context) {
      const scale = maxHeight
        ? Math.min(1, maxHeight / frame.displayHeight)
        : 1;
      context = new OffscreenCanvas(
        even(frame.displayWidth * scale),
        even(frame.displayHeight * scale),
      ).getContext("2d", { alpha: false });

      if (!context) return fail(new Error("Canvas is not supported."));
      render();
      schedule();
      reply({ type: "ready" });
    }
  }).catch(fail);

  read(camera, (frame) => {
    cameraFrame?.close();
    cameraFrame = frame;
  })
    .then(() => {
      // Camera unplugged: remove it from the picture
      cameraFrame?.close();
      cameraFrame = null;
    })
    .catch(fail);
}

function stop() {
  running = false;
  clearInterval(timer);
  readers.forEach((reader) => void reader.cancel().catch(() => {}));
  screenFrame?.close();
  cameraFrame?.close();
  screenFrame = cameraFrame = null;
  void writer?.close().catch(() => {});
  self.close();
}

self.onmessage = ({ data }: MessageEvent<CompositorRequest>) => {
  try {
    if (data.type === "start") begin(data);
    else if (data.type === "pause") {
      paused = data.paused;
      schedule();
    } else stop();
  } catch (error) {
    fail(error);
  }
};
