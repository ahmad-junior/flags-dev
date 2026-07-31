import { FaExchangeAlt } from "react-icons/fa";

export const converterTools = {
  slug: "converter",
  title: "File Converters",
  description:
    "Fast, private file conversion tools powered by WebAssembly and browser APIs. Transcode videos, convert audio, compress images, extract archives, and convert documents locally without uploading your files.",

  category: "Converter",

  icon: FaExchangeAlt,

  badges: [
    "Open Source",
    "Privacy First",
    "WASM Powered",
    "No Uploads",
    "NO Servers",
    "Free Forever",
  ],

  features: [
    {
      title: "Video Transcoder",
      description:
        "Convert MP4, MOV, AVI, and MKV files locally using FFmpeg WebAssembly.",
    },
    {
      title: "Audio Converter",
      description:
        "Extract audio or convert between MP3, WAV, AAC, OGG, and FLAC formats.",
    },
    {
      title: "Video to GIF",
      description:
        "Trim clips and convert video segments into lightweight animated GIFs.",
    },
    {
      title: "Image Format Converter",
      description:
        "Instantly convert PNG, JPG, WebP, AVIF, and BMP images right in your browser.",
    },
    {
      title: "HEIC to JPG/PNG",
      description:
        "Convert iPhone HEIC photos to standard JPG or PNG files with zero quality loss.",
    },
    {
      title: "Image Compressor",
      description:
        "Reduce image file sizes with adjustable quality controls before downloading.",
    },
    {
      title: "EXIF & Metadata Stripper",
      description:
        "Remove sensitive location, camera info, and timestamp metadata from photos.",
    },
    {
      title: "Vector to Raster",
      description:
        "Rasterize SVG vector graphics into high-resolution PNG or JPG images.",
    },
    {
      title: "Archive Zipper & Unzipper",
      description:
        "Compress files into ZIP archives or extract contents without third-party software.",
    },
    {
      title: "JSON & Data Formatter",
      description:
        "Convert between JSON, CSV, YAML, and XML data structures instantly.",
    },
    {
      title: "Batch Processing",
      description:
        "Queue and convert multiple files simultaneously using multi-threaded web workers.",
    },
    {
      title: "Local Media Export",
      description:
        "Preview converted media and download generated outputs directly to your disk.",
    },
  ],

  faqs: [
    {
      question: "Are my media files uploaded to any external server?",
      answer:
        "No. All video, audio, and image conversions happen directly in your browser using local CPU/GPU hardware.",
    },
    {
      question: "Is there any file size limit for video or audio conversions?",
      answer:
        "Because operations run locally on your device, file size limits are only bound by your computer's RAM and available disk space.",
    },
    {
      question: "How are video and audio processed in the browser?",
      answer:
        "We use FFmpeg compiled to WebAssembly (WASM), allowing your browser to execute native media processing code safely.",
    },
    {
      question: "Does converting images compromise my privacy?",
      answer:
        "Not at all. Image operations use the native HTML5 Canvas API and WebAssembly decoders completely offline inside your browser.",
    },
    {
      question: "Can I use these converter tools offline?",
      answer:
        "Yes. Once the web application loads, all core conversion engines work without an active internet connection.",
    },
    {
      question: "Is the project open source?",
      answer:
        "Yes. The source code is publicly available so anyone can inspect, verify, or contribute to the repository.",
    },
  ],

  lastUpdated: "1 August 2026",

  openSource: true,

  contributors: [
    {
      name: "Muhammad Ahmad",
      role: "Founder & Maintainer",
      email: "muhammadahmadkon@gmail.com",
    },
  ],
};
