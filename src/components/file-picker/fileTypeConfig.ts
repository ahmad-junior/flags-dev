import { File, FileImage, FileText, LucideIcon } from "lucide-react";

export interface FileTypeConfig {
  icon: LucideIcon;
  iconClassName: string;
  backgroundClassName: string;
}

const DEFAULT_CONFIG: FileTypeConfig = {
  icon: File,
  iconClassName: "text-slate-600",
  backgroundClassName: "bg-slate-100",
};

const FILE_TYPE_CONFIG: Record<string, FileTypeConfig> = {
  "application/pdf": {
    icon: FileText,
    iconClassName: "text-red-600",
    backgroundClassName: "bg-red-100",
  },
  "text/": {
    icon: FileText,
    iconClassName: "text-slate-700",
    backgroundClassName: "bg-slate-100",
  },

  "image/": {
    icon: FileImage,
    iconClassName: "text-blue-600",
    backgroundClassName: "bg-blue-100",
  },
};

export function getFileTypeConfig(mimeType: string): FileTypeConfig {
  const entry = Object.entries(FILE_TYPE_CONFIG).find(([key]) =>
    mimeType.startsWith(key),
  );

  return entry?.[1] ?? DEFAULT_CONFIG;
}
