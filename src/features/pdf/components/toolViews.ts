import MergePdf from "@/features/pdf/components/merge/MergePdf";
import ImageToPdf from "@/features/pdf/components/image-to-pdf/ImageToPdf";

export const PDF_TOOL_VIEWS = {
  merge: MergePdf,
  "image-to-pdf": ImageToPdf,
} as const;
