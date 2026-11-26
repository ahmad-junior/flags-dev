import { Monitor, Mic, Camera } from "lucide-react";

import { valueLabel, defaultSettingInterface } from "@/features/recorder/types";

export const recordingSourceCards = [
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

export const videoQualityOptions: valueLabel[] = [
  { value: "source", label: "Original source" },
  { value: "1080p", label: "1080p" },
  { value: "720p", label: "720p" },
  { value: "480p", label: "480p" },
];

export const audioOptions: valueLabel[] = [
  { value: "microphone", label: "Microphone" },
  { value: "system", label: "System / tab audio" },
  { value: "both", label: "Microphone + system audio" },
  { value: "none", label: "No audio" },
];

export const outputFormatOptions: valueLabel[] = [
  { value: "webm", label: "WebM" },
  { value: "mp4", label: "MP4 (if supported)" },
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
