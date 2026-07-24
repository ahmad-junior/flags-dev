export interface AppFile<T = unknown> {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  extension: string;
  previewUrl?: string;
  metadata?: T;
}

export interface ValidationResult {
  valid: File[];
  errors: string[];
}

export interface FilePickerConfig {
  accept: string;
  title: string;
  description: string;
  emptyStateLabel: string;
  supportedText: string;
  browseLabel?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
}

export interface FileDropZoneProps {
  config: FilePickerConfig;
  disabled?: boolean;
  onFilesSelected(files: File[]): void;
}

export interface FilePickerProps {
  files: AppFile[];
  config: FilePickerConfig;
  onChange(files: AppFile[]): void;
}
