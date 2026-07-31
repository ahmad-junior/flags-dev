import { ComingSoonLayout } from "@/components/layout/ComingSoonLayout";
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

export const CONVERTER_TOOL_VIEWS = {
  "video-transcode": (
    <ComingSoonLayout
      toolName="Video Transcoder"
      toolIcon={Video}
      description="Transcode large videos between MP4, MOV, AVI, and MKV formats directly inside your browser using multi-threaded FFmpeg WebAssembly."
      keyFeatures={[
        "FFmpeg WASM hardware acceleration",
        "Zero file size limits & complete offline privacy",
        "Custom resolution, frame rate, and bitrate settings",
      ]}
    />
  ),
  "audio-convert": (
    <ComingSoonLayout
      toolName="Audio Converter"
      toolIcon={Music}
      description="Extract audio tracks from videos or convert local audio files between MP3, WAV, AAC, OGG, and FLAC formats."
      keyFeatures={[
        "Batch audio conversion and extraction",
        "Adjustable audio bitrate and channel options",
        "100% browser-based audio transcoding",
      ]}
    />
  ),
  "video-to-gif": (
    <ComingSoonLayout
      toolName="Video to GIF Converter"
      toolIcon={Film}
      description="Trim video clips and turn your favorite moments into lightweight, high-quality animated GIFs."
      keyFeatures={[
        "Precise start and end time trimming",
        "FPS and dimensions adjustment",
        "Instant local preview before export",
      ]}
    />
  ),
  "image-convert": (
    <ComingSoonLayout
      toolName="Image Format Converter"
      toolIcon={ImageIcon}
      description="Convert images instantly between PNG, JPG, WebP, AVIF, and BMP without uploading them to external servers."
      keyFeatures={[
        "Native Canvas API acceleration",
        "Lossless & lossy compression options",
        "Drag-and-drop batch format transformation",
      ]}
    />
  ),
  "heic-convert": (
    <ComingSoonLayout
      toolName="HEIC to JPG/PNG"
      toolIcon={Smartphone}
      description="Convert Apple iPhone HEIC/HEIF photos into standard JPG or PNG images with zero quality degradation."
      keyFeatures={[
        "Instant browser decoding via libheif / WASM",
        "Preserves photo quality and original dimensions",
        "Bulk conversion for high-volume uploads",
      ]}
    />
  ),
  "compress-image": (
    <ComingSoonLayout
      toolName="Image Compressor"
      toolIcon={Minimize}
      description="Shrink image file sizes for web applications and forms while maintaining crisp visual quality."
      keyFeatures={[
        "Side-by-side quality comparison preview",
        "Target file size limit selection",
        "Bulk zip download for processed images",
      ]}
    />
  ),
  "strip-exif": (
    <ComingSoonLayout
      toolName="EXIF Metadata Stripper"
      toolIcon={ShieldOff}
      description="Protect your privacy by removing GPS coordinates, device information, and creation timestamps from your photos."
      keyFeatures={[
        "Inspect hidden EXIF/IPTC metadata before wiping",
        "One-click photo sanitization",
        "Zero server touch guarantee",
      ]}
    />
  ),
  "vector-raster": (
    <ComingSoonLayout
      toolName="SVG to Raster Converter"
      toolIcon={Layers}
      description="Rasterize scalable SVG vector files into ultra high-resolution PNG, JPG, or PDF graphics."
      keyFeatures={[
        "Custom DPI and dimension rendering",
        "Transparent or solid background selection",
        "Live SVG canvas rendering preview",
      ]}
    />
  ),
  "archive-zip": (
    <ComingSoonLayout
      toolName="Zip & Archive Tool"
      toolIcon={FolderArchive}
      description="Compress multiple files into encrypted ZIP archives or extract contents from existing ZIP, TAR, and GZ files."
      keyFeatures={[
        "JSZip in-memory archive extraction",
        "Password-protected zip archive creation",
        "Selective single-file extraction",
      ]}
    />
  ),
  "data-convert": (
    <ComingSoonLayout
      toolName="JSON / CSV / Data Formatter"
      toolIcon={FileCode}
      description="Parse, clean, validate, and convert data structures seamlessly between JSON, CSV, YAML, and XML formats."
      keyFeatures={[
        "Monaco editor integration with live syntax validation",
        "Automatic schema and type detection",
        "One-click formatting and minification",
      ]}
    />
  ),
  "batch-convert": (
    <ComingSoonLayout
      toolName="Batch Media Converter"
      toolIcon={Files}
      description="Queue multiple mixed media files for simultaneous parallel processing using local Web Workers."
      keyFeatures={[
        "Multi-threaded concurrent conversions",
        "Overall queue progress tracking",
        "Single-click bulk zip download",
      ]}
    />
  ),
} as const;
