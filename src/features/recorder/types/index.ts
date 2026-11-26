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

// Preflight
export type CheckStatus =
  | "ready"
  | "prompt"
  | "denied"
  | "unavailable"
  | "unknown"
  | "error";

export type CheckId =
  | "secure"
  | "screen"
  | "recorder"
  | "codec"
  | "microphone"
  | "camera";

export interface CheckItem {
  id: CheckId;
  title: string;
  description: string;
  status: CheckStatus;
  required: boolean;
}

export interface PreflightResult {
  checks: CheckItem[];
  canContinue: boolean;
}

export interface RecorderPreflightProps {
  onContinue: () => void;
}

export interface CheckMeta {
  id: CheckId;
  title: string;
  icon: LucideIcon;
  required: boolean;
}

export type CardPhase = "waiting" | "checking" | "done";
export type DeviceId = "microphone" | "camera";
