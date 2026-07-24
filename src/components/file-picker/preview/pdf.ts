import { PreviewResult } from "@/components/file-picker/preview/types";

export async function createPdfPreview(file: File): Promise<PreviewResult> {
  if (typeof window === "undefined") {
    return {};
  }

  const pdfjs = await import("pdfjs-dist");

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const buffer = await file.arrayBuffer();

  const pdf = await pdfjs.getDocument({
    data: buffer,
  }).promise;

  const page = await pdf.getPage(1);

  const viewport = page.getViewport({
    scale: 1.2,
  });

  const canvas = document.createElement("canvas");

  const context = canvas.getContext("2d");

  if (!context) {
    return {
      metadata: {
        pages: pdf.numPages,
      },
    };
  }

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({
    canvas,
    canvasContext: context,
    viewport,
  }).promise;

  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/png", 0.95),
  );

  return {
    previewUrl: URL.createObjectURL(blob),

    metadata: {
      pages: pdf.numPages,
      width: canvas.width,
      height: canvas.height,
    },
  };
}
