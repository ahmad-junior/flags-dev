import { PDFDocument } from "pdf-lib";

import { AppFile } from "@/components/file-picker/types";

export async function mergePdf(files: AppFile[]): Promise<Blob> {
  if (files.length < 2) {
    throw new Error("At least two PDF files are required.");
  }

  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

    pages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const pdfBytes = await mergedPdf.save();
  const buffer = pdfBytes.slice().buffer;

  return new Blob([buffer], {
    type: "application/pdf",
  });
}
