import {
  Combine,
  Scissors,
  Minimize2,
  ArrowUpDown,
  RotateCw,
  Trash2,
  FileOutput,
  Lock,
  LockOpen,
  FileImage,
  Images,
} from "lucide-react";
import { ToolTab } from "@/components/tool-layout/types";
import { PUBLIC_PATHS, PDF_TOOL_URLS } from "@/routes";

export const pdfToolTabs: ToolTab[] = [
  {
    id: "merge",
    label: "Merge",
    description: "Combine multiple PDF files into one document.",
    href: PDF_TOOL_URLS.merge,
    icon: Combine,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToMerge}`,
      label: "Learn more about merging PDFs",
    },
  },
  {
    id: "split",
    label: "Split",
    description: "Split a PDF into separate files or selected pages.",
    href: PDF_TOOL_URLS.split,
    icon: Scissors,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToSplit}`,
      label: "Learn more about splitting PDFs",
    },
  },
  {
    id: "compress",
    label: "Compress",
    description: "Reduce PDF file size while keeping your document usable.",
    href: PDF_TOOL_URLS.compress,
    icon: Minimize2,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToCompress}`,
      label: "Learn more about compressing PDFs",
    },
  },
  {
    id: "reorder",
    label: "Reorder",
    description: "Rearrange PDF pages into the order you need.",
    href: PDF_TOOL_URLS.reorder,
    icon: ArrowUpDown,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToReorder}`,
      label: "Learn more about reordering PDF pages",
    },
  },
  {
    id: "rotate",
    label: "Rotate",
    description: "Rotate individual pages or your entire PDF.",
    href: PDF_TOOL_URLS.rotate,
    icon: RotateCw,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToRotate}`,
      label: "Learn more about rotating PDF pages",
    },
  },
  {
    id: "delete",
    label: "Delete Pages",
    description: "Remove unwanted pages from a PDF document.",
    href: PDF_TOOL_URLS.deletePages,
    icon: Trash2,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToDeletePages}`,
      label: "Learn more about deleting PDF pages",
    },
  },
  {
    id: "extract",
    label: "Extract",
    description: "Extract selected pages from a PDF into a new file.",
    href: PDF_TOOL_URLS.extract,
    icon: FileOutput,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToExtract}`,
      label: "Learn more about extracting PDF pages",
    },
  },
  {
    id: "protect",
    label: "Protect",
    description: "Protect your PDF with a password and encryption.",
    href: PDF_TOOL_URLS.protect,
    icon: Lock,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToProtect}`,
      label: "Learn more about password-protecting PDFs",
    },
  },
  {
    id: "unlock",
    label: "Unlock",
    description: "Remove password protection from a PDF you can access.",
    href: PDF_TOOL_URLS.unlock,
    icon: LockOpen,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToUnlock}`,
      label: "Learn more about unlocking PDFs",
    },
  },
  {
    id: "pdf-to-image",
    label: "PDF → Image",
    description: "Convert PDF pages into high-quality images.",
    href: PDF_TOOL_URLS.pdfToImage,
    icon: FileImage,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToPdfToImage}`,
      label: "Learn more about converting PDFs to images",
    },
  },
  {
    id: "image-to-pdf",
    label: "Image → PDF",
    description: "Convert one or more images into a PDF document.",
    href: PDF_TOOL_URLS.imageToPdf,
    icon: Images,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToImageToPdf}`,
      label: "Learn more about converting images to PDF",
    },
  },
];
