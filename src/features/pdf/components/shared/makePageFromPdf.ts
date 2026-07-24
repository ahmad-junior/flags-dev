import { AppFile } from "@/components/file-picker/types";

export async function makePagesFromPdf(file: File): Promise<AppFile[]> {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const bytes = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: bytes,
  }).promise;

  const pages: AppFile[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);

    const viewport = page.getViewport({
      scale: 2,
    });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to create canvas context.");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvas,
      canvasContext: context,
      viewport,
    }).promise;

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to create page image."));
          return;
        }

        resolve(blob);
      }, "image/png");
    });

    const imageFile = new File([blob], `page-${pageNumber}.png`, {
      type: "image/png",
    });
    const preview = URL.createObjectURL(blob);

    pages.push({
      id: crypto.randomUUID(),
      file: imageFile,
      name: imageFile.name,
      size: imageFile.size,
      type: imageFile.type,
      extension: "png",
      previewUrl: preview,
    });
  }

  return pages;
}
