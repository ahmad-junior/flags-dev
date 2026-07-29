import { PDFDocument } from "pdf-lib";
import { downloadFilesAsZip } from "@/lib/download/zip";

interface SplitOptions {
  mode: "extract_all" | "custom_range";
  pageIndices?: number[];
}

export async function splitPdfFile(
  file: File,
  options: SplitOptions,
  zipFilename: string = "split_pages.zip",
): Promise<Blob | void> {
  const fileArrayBuffer = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(fileArrayBuffer);
  const totalPages = srcDoc.getPageCount();

  if (options.mode === "custom_range" && options.pageIndices) {
    const newDoc = await PDFDocument.create();
    const copiedPages = await newDoc.copyPages(srcDoc, options.pageIndices);
    copiedPages.forEach((page) => newDoc.addPage(page));

    const pdfBytes = await newDoc.save();

    const safeBytes = new Uint8Array(pdfBytes);

    return new Blob([safeBytes], { type: "application/pdf" });
  }

  const singlePdfFiles: { file: Blob; name: string }[] = [];

  for (let i = 0; i < totalPages; i++) {
    const singleDoc = await PDFDocument.create();
    const [page] = await singleDoc.copyPages(srcDoc, [i]);
    singleDoc.addPage(page);

    const pdfBytes = await singleDoc.save();

    const safeBytes = new Uint8Array(pdfBytes);

    const pageNum = String(i + 1).padStart(3, "0");
    const pageBlob = new Blob([safeBytes], { type: "application/pdf" });

    singlePdfFiles.push({
      file: pageBlob,
      name: `page_${pageNum}.pdf`,
    });
  }

  await downloadFilesAsZip({
    files: singlePdfFiles,
    zipFilename,
  });
}
