import { OUTPUT_FORMATS, OutputFormat } from "@/features/recorder/constants";

export function getSupportedMimeType(format: OutputFormat) {
  if (typeof MediaRecorder === "undefined") return undefined;

  return OUTPUT_FORMATS.find((f) => f.value === format)?.mimeTypes.find(
    (type) => MediaRecorder.isTypeSupported(type),
  );
}

export function getOutputFormatOptions() {
  return OUTPUT_FORMATS.filter((f) => getSupportedMimeType(f.value)).map(
    ({ value, label }) => ({ value, label }),
  );
}

export function formatTime(ms: number) {
  const total = Math.floor(ms / 1000);

  return [Math.floor(total / 3600), Math.floor(total / 60) % 60, total % 60]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

export const formatSize = (bytes: number) =>
  bytes < 1024 ** 3
    ? `${(bytes / 1024 ** 2).toFixed(1)} MB`
    : `${(bytes / 1024 ** 3).toFixed(2)} GB`;
