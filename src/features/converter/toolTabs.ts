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
  },
  {
    id: "audio-convert",
    label: "Audio Converter",
    icon: Music,
  },
  {
    id: "video-to-gif",
    label: "Video → GIF",
    icon: Film,
  },
  {
    id: "image-convert",
    label: "Image Converter",
    icon: ImageIcon,
  },
  {
    id: "heic-convert",
    label: "HEIC → JPG/PNG",
    icon: Smartphone,
  },
  {
    id: "compress-image",
    label: "Compress Image",
    icon: Minimize,
  },
  {
    id: "strip-exif",
    label: "Strip EXIF",
    icon: ShieldOff,
  },
  {
    id: "vector-raster",
    label: "SVG → Raster",
    icon: Layers,
  },
  {
    id: "archive-zip",
    label: "Zip / Unzip",
    icon: FolderArchive,
  },
  {
    id: "data-convert",
    label: "JSON / CSV",
    icon: FileCode,
  },
  {
    id: "batch-convert",
    label: "Batch Converter",
    icon: Files,
  },
];
