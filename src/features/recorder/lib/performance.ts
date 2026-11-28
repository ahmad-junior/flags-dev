import { getSupportedMimeType } from "@/features/recorder/lib/formats";
import type { OutputFormat } from "@/features/recorder/constants";

const TIERS = {
  low: { height: 720, fps: 30 },
  mid: { height: 1080, fps: 30 },
  high: { height: 2160, fps: 60 },
};

const AUTO_MAX_HEIGHT = 1080;

function getDeviceTier() {
  const cores = navigator.hardwareConcurrency || 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

  if (cores <= 4 || memory <= 4) return "low";
  return cores <= 8 ? "mid" : "high";
}

const maxBitrate = (height: number) =>
  height <= 720
    ? 5_000_000
    : height <= 1080
      ? 8_000_000
      : height <= 1440
        ? 12_000_000
        : 20_000_000;

export function getSafeCaptureSettings(requested: {
  height?: number;
  frameRate: number;
  bitrate: number;
  camera: boolean;
}) {
  const limit = TIERS[getDeviceTier()];

  const heightLimit = requested.camera
    ? Math.min(limit.height, 1080)
    : limit.height;
  const fpsLimit = requested.camera ? 30 : limit.fps;

  const maxHeight = Math.min(requested.height ?? AUTO_MAX_HEIGHT, heightLimit);
  const frameRate = Math.min(requested.frameRate, fpsLimit);

  return {
    maxHeight,
    frameRate,
    videoBitsPerSecond: Math.min(requested.bitrate, maxBitrate(maxHeight)),
    limited:
      (requested.height ?? 0) > maxHeight || requested.frameRate > frameRate,
  };
}

export function getLightMimeType(format: OutputFormat) {
  const vp8 = "video/webm;codecs=vp8,opus";

  return format === "webm" && MediaRecorder.isTypeSupported(vp8)
    ? vp8
    : getSupportedMimeType(format);
}
