import { Camera, Globe, LockKeyhole, Mic, Monitor, Video } from "lucide-react";

import {
  valueLabel,
  defaultSettingInterface,
  RecordingSourceCard,
} from "@/features/recorder/types";

import { CheckStatus, CheckMeta, CardPhase } from "@/features/recorder/types";

export const recordingSourceCards: RecordingSourceCard[] = [
  {
    id: "screen" as const,
    title: "Screen",
    description: "Record your screen or application",
    icon: Monitor,
  },
  {
    id: "microphone" as const,
    title: "Microphone",
    description: "Capture your voice with high quality",
    icon: Mic,
  },
  {
    id: "camera" as const,
    title: "Camera",
    description: "Record yourself with webcam",
    icon: Camera,
  },
];

export const audioOptions: valueLabel[] = [
  { value: "microphone", label: "Microphone" },
  { value: "system", label: "System / tab audio" },
  { value: "both", label: "Microphone + system audio" },
  { value: "none", label: "No audio" },
];

export const advancedFPSOptions: valueLabel[] = [
  { value: "15", label: "15 FPS" },
  { value: "24", label: "24 FPS" },
  { value: "30", label: "30 FPS" },
  { value: "60", label: "60 FPS" },
];

export const defaultSettings: defaultSettingInterface = {
  sources: ["screen"],
  quality: "1080p",
  fps: "30",
  audio: "microphone",
  format: "webm",
  advanced: false,
  notice: "",
};

export type OutputFormat = "webm" | "mp4";

export const OUTPUT_FORMATS: {
  value: OutputFormat;
  label: string;
  mimeTypes: string[];
}[] = [
  {
    value: "webm",
    label: "WebM",
    mimeTypes: [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
    ],
  },
  {
    value: "mp4",
    label: "MP4",
    mimeTypes: [
      "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
      "video/mp4;codecs=avc1,mp4a",
      "video/mp4",
    ],
  },
];

export type Quality = "auto" | "2160p" | "1440p" | "1080p" | "720p";

export const QUALITY_PRESETS: {
  value: Quality;
  label: string;
  height?: number;
  bitrate: number;
}[] = [
  { value: "auto", label: "Auto (source)", bitrate: 8_000_000 },
  { value: "2160p", label: "4K (2160p)", height: 2160, bitrate: 20_000_000 },
  { value: "1440p", label: "2K (1440p)", height: 1440, bitrate: 12_000_000 },
  {
    value: "1080p",
    label: "Full HD (1080p)",
    height: 1080,
    bitrate: 8_000_000,
  },
  { value: "720p", label: "HD (720p)", height: 720, bitrate: 5_000_000 },
];

// preflight
export const AUTO_CONTINUE_SECONDS = 3;
export const CHECK_STEP_MS = 100;

export const statusStyles: Record<CheckStatus, string> = {
  ready: "bg-emerald-50 text-emerald-700 border-emerald-200",
  prompt: "bg-blue-50 text-blue-700 border-blue-200",
  denied: "bg-amber-50 text-amber-700 border-amber-200",
  unavailable: "bg-slate-100 text-slate-600 border-slate-200",
  unknown: "bg-slate-100 text-slate-600 border-slate-200",
  error: "bg-red-50 text-red-700 border-red-200",
};

export const statusLabels: Record<CheckStatus, string> = {
  ready: "Ready",
  prompt: "Not requested",
  denied: "Blocked",
  unavailable: "Unavailable",
  unknown: "Unknown",
  error: "Failed",
};

// Display order: checks are revealed from top to bottom.
export const CHECKS: CheckMeta[] = [
  {
    id: "secure",
    title: "Secure connection",
    icon: LockKeyhole,
    required: true,
  },
  { id: "screen", title: "Screen capture", icon: Monitor, required: true },
  { id: "recorder", title: "Video recording", icon: Video, required: true },
  { id: "codec", title: "Recording format", icon: Globe, required: true },
  { id: "microphone", title: "Microphone", icon: Mic, required: false },
  { id: "camera", title: "Camera", icon: Camera, required: false },
];

export const REQUIRED_COUNT = CHECKS.filter((check) => check.required).length;

export const primaryButton =
  "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none";

export const secondaryButton =
  "flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50";

export const cardStyles: Record<CardPhase, string> = {
  waiting: "border-slate-200 opacity-50",
  checking:
    "border-indigo-400 shadow-lg shadow-indigo-100 ring-4 ring-indigo-50",
  done: "border-slate-200 shadow-sm",
};
