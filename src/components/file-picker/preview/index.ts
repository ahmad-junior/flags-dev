import { createImagePreview } from "@/components/file-picker/preview/image";
import { createPdfPreview } from "@/components/file-picker/preview/pdf";

import { PreviewResult } from "@/components/file-picker/preview/types";

type PreviewHandler = (file: File) => Promise<PreviewResult>;

const handlers: Record<string, PreviewHandler> = {
  image: createImagePreview,
  pdf: createPdfPreview,
};

function getHandler(file: File): PreviewHandler | null {
  if (file.type.startsWith("image/")) {
    return handlers.image;
  }

  if (file.type === "application/pdf") {
    return handlers.pdf;
  }

  return null;
}

export async function createPreview(file: File): Promise<PreviewResult> {
  const handler = getHandler(file);

  if (!handler) {
    return {};
  }

  try {
    return await handler(file);
  } catch (error) {
    console.error("Preview generation failed:", error);

    return {};
  }
}
