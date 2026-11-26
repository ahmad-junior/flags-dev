import type { LucideIcon } from "lucide-react";

export type RecordingSource = "screen" | "microphone" | "camera";

export interface valueLabel {
  value: string;
  label: string;
}

export interface RecordingSourceCard {
  id: RecordingSource;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface defaultSettingInterface {
  sources: RecordingSource[];
  quality: string;
  fps: string;
  audio: string;
  format: string;
  advanced: boolean;
  notice: string;
}
