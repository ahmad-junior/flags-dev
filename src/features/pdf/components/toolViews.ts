import MergePdf from "@/features/pdf/components/merge/MergePdf";
import ImageToPdf from "@/features/pdf/components/image-to-pdf/ImageToPdf";
import ReorderPdf from "@/features/pdf/components/reorder-pages/ReorderPdf";
import DeletePdf from "@/features/pdf/components/delete-pages/DeletePdf";
import PdfToImage from "@/features/pdf/components/pdf-to-image/PdfToImage";
import ProtectPdf from "@/features/pdf/components/protect/ProtectPdf";
import UnprotectPdf from "@/features/pdf/components/unprotect/UnprotedPdf";
import RotatePdf from "@/features/pdf/components/rotate/RotatePdf";
import SplitPdf from "@/features/pdf/components/split/SplitPdf";
import CompressPdf from "@/features/pdf/components/compress/CompressPdf";
import ExtractPdf from "@/features/pdf/components/extract/ExtractPdf";

export const PDF_TOOL_VIEWS = {
  merge: MergePdf,
  "image-to-pdf": ImageToPdf,
  reorder: ReorderPdf,
  delete: DeletePdf,
  "pdf-to-image": PdfToImage,
  protect: ProtectPdf,
  unlock: UnprotectPdf,
  rotate: RotatePdf,
  split: SplitPdf,
  compress: CompressPdf,
  extract: ExtractPdf,
} as const;
