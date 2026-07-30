import { PDFDocument } from "pdf-lib";
import type * as PdfJsTypes from "pdfjs-dist";

export type CompressionLevel = "extreme" | "recommended" | "low";

interface CompressionConfig {
  scale: number;
  quality: number;
}

const COMPRESSION_PRESETS: Record<CompressionLevel, CompressionConfig> = {
  extreme: { scale: 0.7, quality: 0.35 },
  recommended: { scale: 0.85, quality: 0.55 },
  low: { scale: 1.0, quality: 0.75 },
};

export async function compressPdfFile(
  file: File,
  level: CompressionLevel = "recommended",
  onProgress?: (progress: number) => void,
): Promise<Blob> {
  if (typeof window === "undefined") {
    throw new Error(
      "compressPdfFile can only be executed in a browser environment.",
    );
  }

  const pdfjsLib: typeof PdfJsTypes = await import("pdfjs-dist");

  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }

  const { scale, quality } = COMPRESSION_PRESETS[level];
  const fileArrayBuffer = await file.arrayBuffer();

  const pdfjsDoc = await pdfjsLib.getDocument({ data: fileArrayBuffer })
    .promise;
  const numPages = pdfjsDoc.numPages;

  const outputPdfDoc = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfjsDoc.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (!context) {
      throw new Error("Failed to initialize canvas context");
    }

    await page.render({
      canvas,
      canvasContext: context,
      viewport,
    }).promise;

    const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
    const image = await outputPdfDoc.embedJpg(jpegDataUrl);

    const unscaledViewport = page.getViewport({ scale: 1.0 });
    const newPage = outputPdfDoc.addPage([
      unscaledViewport.width,
      unscaledViewport.height,
    ]);

    newPage.drawImage(image, {
      x: 0,
      y: 0,
      width: unscaledViewport.width,
      height: unscaledViewport.height,
    });

    // Clean up canvas memory
    canvas.width = 0;
    canvas.height = 0;

    if (onProgress) {
      onProgress(Math.round((i / numPages) * 100));
    }
  }

  const pdfBytes = await outputPdfDoc.save({ useObjectStreams: true });
  const safeBytes = new Uint8Array(pdfBytes);
  const compressedBlob = new Blob([safeBytes], { type: "application/pdf" });

  if (compressedBlob.size >= file.size) {
    return file;
  }

  return compressedBlob;
}
