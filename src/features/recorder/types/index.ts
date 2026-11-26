export type RecordingSource = "screen" | "microphone" | "camera";

export interface valueLabel {
  value: string;
  label: string;
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
