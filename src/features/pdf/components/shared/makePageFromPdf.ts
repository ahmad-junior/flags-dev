import { AppFile } from "@/components/file-picker/types";

export interface MakePagesOptions {
  dpi?: string;
  format?: "png" | "jpg" | "webp";
  transparentBg?: boolean;
  pageIndices?: number[];
}

export async function makePagesFromPdf(
  file: File,
  options: MakePagesOptions = {},
): Promise<AppFile[]> {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const bytes = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: bytes,
  }).promise;

  const targetDpi = parseInt(options.dpi || "150", 10);
  const scale = targetDpi / 72;

  const format = options.format || "png";
  const mimeType = format === "jpg" ? "image/jpeg" : `image/${format}`;
  const transparentBg =
    format === "jpg" ? false : (options.transparentBg ?? false);

  const pages: AppFile[] = [];

  let targetPages: number[] = [];
  if (options.pageIndices && options.pageIndices.length > 0) {
    targetPages = options.pageIndices
      .map((idx) => idx + 1)
      .filter((p) => p >= 1 && p <= pdf.numPages);
  } else {
    for (let i = 1; i <= pdf.numPages; i++) {
      targetPages.push(i);
    }
  }

  for (const pageNumber of targetPages) {
    const page = await pdf.getPage(pageNumber);

    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to create canvas context.");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (!transparentBg) {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    await page.render({
      canvas,
      canvasContext: context,
      viewport,
    }).promise;

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create page image."));
            return;
          }
          resolve(blob);
        },
        mimeType,
        0.92,
      );
    });

    const fileName = `page-${pageNumber}.${format}`;
    const imageFile = new File([blob], fileName, { type: mimeType });
    const preview = URL.createObjectURL(blob);

    pages.push({
      id: crypto.randomUUID(),
      file: imageFile,
      name: imageFile.name,
      size: imageFile.size,
      type: imageFile.type,
      extension: format,
      previewUrl: preview,
    });
  }

  return pages;
}
