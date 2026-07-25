import MergePdf from "@/features/pdf/components/merge/MergePdf";
import ImageToPdf from "@/features/pdf/components/image-to-pdf/ImageToPdf";
import ReorderPdf from "@/features/pdf/components/reorder-pages/ReorderPdf";
import DeletePdf from "@/features/pdf/components/delete-pages/DeletePdf";
import PdfToImage from "@/features/pdf/components/pdf-to-image/PdfToImage";

export const PDF_TOOL_VIEWS = {
  merge: MergePdf,
  "image-to-pdf": ImageToPdf,
  reorder: ReorderPdf,
  delete: DeletePdf,
  "pdf-to-image": PdfToImage,
} as const;
