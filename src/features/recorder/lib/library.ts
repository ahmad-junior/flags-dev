import { readSavedRecording } from "@/features/recorder/engine/storage";
import type { SavedRecording, Preview } from "@/features/recorder/engine/types";
import {
  fixWebmDuration,
  readWebmDuration,
} from "@/features/recorder/engine/webm";
import { DIRECTORY, EXTENSION } from "@/features/recorder/engine/constants";

export async function openSavedRecording(name: string) {
  const file = await readSavedRecording(name);

  try {
    const durationMs = await readWebmDuration(file);
    if (durationMs) {
      const typed = file.slice(0, file.size, "video/webm");
      return {
        blob: await fixWebmDuration(typed, durationMs),
        durationMs,
      };
    }
  } catch (error) {
    console.warn(`Could not read the duration of ${name}`, error);
  }

  return { blob: file as Blob, durationMs: 0 };
}

export async function downloadSavedRecording(name: string) {
  const { blob } = await openSavedRecording(name);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export async function splitName(name: string): Promise<[string, string]> {
  const extension = name.match(EXTENSION)?.[0];
  if (extension) return [name.slice(0, -extension.length), extension];

  const file = await readSavedRecording(name);
  const [first] = new Uint8Array(await file.slice(0, 1).arrayBuffer());
  return [name, first === 0x1a ? ".webm" : ".mp4"];
}

export function validateName(base: string) {
  if (!base) return "Please enter a recording name.";
  if (base.length > 100) return "Use 100 characters or fewer.";
  if (/[\\/:*?"<>|\u0000-\u001f]/.test(base)) {
    return 'A name cannot contain \\ / : * ? " < > |';
  }
  if (base.startsWith(".")) return "A name cannot start with a dot.";
  return null;
}

export async function renameRecording(from: string, to: string) {
  if (from === to) return;

  const root = await navigator.storage.getDirectory();
  const directory = await root.getDirectoryHandle(DIRECTORY);

  const taken = await directory.getFileHandle(to).then(
    () => true,
    (error: DOMException) => error.name !== "NotFoundError",
  );
  if (taken) throw new Error("A recording with this name already exists.");

  const source = await directory.getFileHandle(from);
  const movable = source as FileSystemFileHandle & {
    move?: (name: string) => Promise<void>;
  };

  if (movable.move) {
    await movable.move(to);
    return;
  }

  const target = await directory.getFileHandle(to, { create: true });
  try {
    const writable = await target.createWritable();
    await (await source.getFile()).stream().pipeTo(writable);
  } catch (error) {
    await directory.removeEntry(to).catch(() => {});
    throw error;
  }
  await directory.removeEntry(from);
}

function waitFor(video: HTMLVideoElement, event: string, timeout = 5000) {
  return new Promise<void>((resolve, reject) => {
    const finish = (error?: Error) => {
      window.clearTimeout(timer);
      video.removeEventListener(event, onSuccess);
      video.removeEventListener("error", onError);
      if (error) reject(error);
      else resolve();
    };
    const onSuccess = () => finish();
    const onError = () => finish(new Error("Video loading failed."));
    const timer = window.setTimeout(
      () => finish(new Error(`Video ${event} timed out.`)),
      timeout,
    );

    video.addEventListener(event, onSuccess);
    video.addEventListener("error", onError);
  });
}

async function createPreview(name: string): Promise<Preview> {
  const video = document.createElement("video");
  let url = "";
  let durationMs = 0;

  try {
    const recording = await openSavedRecording(name);
    durationMs = recording.durationMs;
    url = URL.createObjectURL(recording.blob);

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const loaded = waitFor(video, "loadeddata");
    video.src = url;
    await loaded;

    if (!durationMs && Number.isFinite(video.duration)) {
      durationMs = video.duration * 1000;
    }

    if (durationMs > 1000) {
      const seeked = waitFor(video, "seeked");
      video.currentTime = 1;
      await seeked.catch(() => {});
    }

    const canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 270;
    const context = canvas.getContext("2d");
    const { videoWidth, videoHeight } = video;

    if (!context || !videoWidth || !videoHeight) {
      return { thumbnail: null, durationMs };
    }

    const scale = Math.max(
      canvas.width / videoWidth,
      canvas.height / videoHeight,
    );
    context.drawImage(
      video,
      (canvas.width - videoWidth * scale) / 2,
      (canvas.height - videoHeight * scale) / 2,
      videoWidth * scale,
      videoHeight * scale,
    );

    return { thumbnail: canvas.toDataURL("image/jpeg", 0.8), durationMs };
  } catch (error) {
    console.warn(`No preview for ${name}`, error);
    return { thumbnail: null, durationMs };
  } finally {
    video.removeAttribute("src");
    video.load();
    if (url) URL.revokeObjectURL(url);
  }
}

const previews = new Map<string, Promise<Preview>>();

export function getPreview({ name, size, lastModified }: SavedRecording) {
  const key = `${name}:${size}:${lastModified}`;
  let preview = previews.get(key);

  if (!preview) {
    preview = createPreview(name);
    previews.set(key, preview);
  }
  return preview;
}
