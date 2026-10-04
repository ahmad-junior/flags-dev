import {
  Video,
  Music,
  Film,
  Image as ImageIcon,
  Smartphone,
  Minimize,
  ShieldOff,
  Layers,
  FolderArchive,
  FileCode,
  Files,
} from "lucide-react";

import { ToolTab } from "@/components/tool-layout/types";

export const converterToolTabs: ToolTab[] = [
  {
    id: "video-transcode",
    label: "Video Transcoder",
    icon: Video,
    href: "",
    description:
      "Convert videos between popular formats with control over codecs, resolution, and quality.",
  },
  {
    id: "audio-convert",
    label: "Audio Converter",
    icon: Music,
    href: "",
    description:
      "Convert audio files between popular formats while controlling quality and output settings.",
  },
  {
    id: "video-to-gif",
    label: "Video → GIF",
    icon: Film,
    href: "",
    description:
      "Convert video clips into lightweight animated GIFs with customizable output settings.",
  },
  {
    id: "image-convert",
    label: "Image Converter",
    icon: ImageIcon,
    href: "",
    description:
      "Convert images between popular formats while preserving quality and controlling output settings.",
  },
  {
    id: "heic-convert",
    label: "HEIC → JPG/PNG",
    icon: Smartphone,
    href: "",
    description:
      "Convert HEIC and HEIF images to widely supported JPG or PNG formats directly in your browser.",
  },
  {
    id: "compress-image",
    label: "Compress Image",
    icon: Minimize,
    href: "",
    description:
      "Reduce image file sizes while balancing compression, quality, and visual fidelity.",
  },
  {
    id: "strip-exif",
    label: "Strip EXIF",
    icon: ShieldOff,
    href: "",
    description:
      "Remove EXIF and other embedded metadata from images to help protect your privacy.",
  },
  {
    id: "vector-raster",
    label: "SVG → Raster",
    icon: Layers,
    href: "",
    description:
      "Convert SVG vector graphics into raster image formats such as PNG and JPG.",
  },
  {
    id: "archive-zip",
    label: "Zip / Unzip",
    icon: FolderArchive,
    href: "",
    description:
      "Create and extract ZIP archives directly in your browser without uploading your files.",
  },
  {
    id: "data-convert",
    label: "JSON / CSV",
    icon: FileCode,
    href: "",
    description:
      "Convert structured data between JSON and CSV formats for development and data workflows.",
  },
  {
    id: "batch-convert",
    label: "Batch Converter",
    icon: Files,
    href: "",
    description:
      "Convert multiple files at once with a streamlined workflow for batch processing.",
  },
];
