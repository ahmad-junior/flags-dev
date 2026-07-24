export interface PreviewMetadata {
  pages?: number;
  width?: number;
  height?: number;
}

export interface PreviewResult {
  previewUrl?: string;
  metadata?: PreviewMetadata;
}
