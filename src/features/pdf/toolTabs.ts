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
import { PUBLIC_PATHS } from "@/routes";

export const pdfToolTabs: ToolTab[] = [
  {
    id: "merge",
    label: "Merge",
    icon: Combine,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToMerge}`,
      label: "Learn more about merging PDFs",
    },
  },
  {
    id: "split",
    label: "Split",
    icon: Scissors,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToSplit}`,
      label: "Learn more about splitting PDFs",
    },
  },
  {
    id: "compress",
    label: "Compress",
    icon: Minimize2,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToCompress}`,
      label: "Learn more about compressing PDFs",
    },
  },
  {
    id: "reorder",
    label: "Reorder",
    icon: ArrowUpDown,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToReorder}`,
      label: "Learn more about reordering PDF pages",
    },
  },
  {
    id: "rotate",
    label: "Rotate",
    icon: RotateCw,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToRotate}`,
      label: "Learn more about rotating PDF pages",
    },
  },
  {
    id: "delete",
    label: "Delete Pages",
    icon: Trash2,
    help: {
      href: `${PUBLIC_PATHS.pdfHowToDeletePages}`,
      label: "Learn more about deleting PDF pages",
    },
  },
  {
    id: "extract",
    label: "Extract",
    icon: FileOutput,
    // help: {
    //   href: `${PUBLIC_PATHS.pdfHowToExtract}`,
    //   label: "Learn more about extracting PDF pages",
    // },
  },
  {
    id: "protect",
    label: "Protect",
    icon: Lock,
    // help: {
    //   href: `${PUBLIC_PATHS.pdfHowToProtect}`,
    //   label: "Learn more about password-protecting PDFs",
    // },
  },
  {
    id: "unlock",
    label: "Unlock",
    icon: LockOpen,
    // help: {
    //   href: `${PUBLIC_PATHS.pdfHowToUnlock}`,
    //   label: "Learn more about unlocking PDFs",
    // },
  },
  {
    id: "pdf-to-image",
    label: "PDF → Image",
    icon: FileImage,
    // help: {
    //   href: `${PUBLIC_PATHS.pdfHowToPdfToImage}`,
    //   label: "Learn more about converting PDF to Images",
    // },
  },
  {
    id: "image-to-pdf",
    label: "Image → PDF",
    icon: Images,
    // help: {
    //   href: `${PUBLIC_PATHS.pdfHowToImageToPdf}`,
    //   label: "Learn more about converting Images to PDF",
    // },
  },
];
