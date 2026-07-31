import { PDFDocument } from "pdf-lib";

export async function extractPdfPages(
  originalFile: File,
  targetIndices: number[],
): Promise<Blob> {
  if (targetIndices.length === 0) {
    throw new Error("No pages selected for extraction.");
  }

  const arrayBuffer = await originalFile.arrayBuffer();
  const srcDoc = await PDFDocument.load(arrayBuffer);
  const outDoc = await PDFDocument.create();

  const copiedPages = await outDoc.copyPages(srcDoc, targetIndices);
  copiedPages.forEach((page) => outDoc.addPage(page));

  const pdfBytes = await outDoc.save({ useObjectStreams: true });
  const safeBytes = new Uint8Array(pdfBytes);

  return new Blob([safeBytes], { type: "application/pdf" });
}
