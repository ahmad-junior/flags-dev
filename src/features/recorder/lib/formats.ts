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
