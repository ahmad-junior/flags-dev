import {
  Combine,
  // Scissors,
  // Minimize2,
  // ArrowUpDown,
  // RotateCw,
  // Trash2,
  // FileOutput,
  // Lock,
  // LockOpen,
  // FileImage,
  Images,
} from "lucide-react";
import { ToolTab } from "@/components/tool-layout/types";

export const pdfToolTabs: ToolTab[] = [
  {
    id: "merge",
    label: "Merge",
    icon: Combine,
  },
  // {
  //     id: "split",
  //     label: "Split",
  //     icon: Scissors,
  // },
  // {
  //     id: "compress",
  //     label: "Compress",
  //     icon: Minimize2,
  // },
  // {
  //     id: "reorder",
  //     label: "Reorder",
  //     icon: ArrowUpDown,
  // },
  // {
  //     id: "rotate",
  //     label: "Rotate",
  //     icon: RotateCw,
  // },
  // {
  //     id: "delete",
  //     label: "Delete Pages",
  //     icon: Trash2,
  // },
  // {
  //     id: "extract",
  //     label: "Extract",
  //     icon: FileOutput,
  // },
  // {
  //     id: "protect",
  //     label: "Protect",
  //     icon: Lock,
  // },
  // {
  //     id: "unlock",
  //     label: "Unlock",
  //     icon: LockOpen,
  // },
  // {
  //     id: "pdf-to-image",
  //     label: "PDF → Image",
  //     icon: FileImage,
  // },
  {
    id: "image-to-pdf",
    label: "Image → PDF",
    icon: Images,
  },
];
