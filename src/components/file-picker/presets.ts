export const PDF_PICKER = {
  accept: ".pdf",
  title: "Select PDF Files",
  description: "Upload one or more PDF files from your device.",
  emptyStateLabel: "PDF files",
  supportedText: "Supports PDF • Maximum 100 MB",
  browseLabel: "Browse PDFs",
  multiple: true,
  maxFileSize: 100 * 1024 * 1024,
};

export const IMAGE_PICKER = {
  accept: "image/*",
  title: "Select Images",
  description: "Upload PNG, JPG, SVG, GIF or WebP images.",
  emptyStateLabel: "images",
  supportedText: "PNG • JPG • SVG • GIF • WebP",
  browseLabel: "Browse Images",
  multiple: true,
  maxFileSize: 25 * 1024 * 1024,
};

export const HEIC_PICKER = {
  accept: ".heic,.heif,image/heic,image/heif",
  title: "Select HEIC Images",
  description: "Upload one or more HEIC images from your device.",
  emptyStateLabel: "HEIC images",
  supportedText: "Supports HEIC • Maximum 25 MB",
  browseLabel: "Browse HEIC Images",
  multiple: true,
  maxFileSize: 25 * 1024 * 1024,
};

export const ALL_FILE_PICKER = {
  accept: "*/*",
  title: "Select a File",
  description: "Upload any file to generate its cryptographic hashes.",
  emptyStateLabel: "file",
  supportedText: "All file types",
  browseLabel: "Browse File",
  multiple: false,
  maxFileSize: 100 * 1024 * 1024,
};
