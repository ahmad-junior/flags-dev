import { PreviewResult } from "@/components/file-picker/preview/types";

export function createImagePreview(file: File): Promise<PreviewResult> {
  return new Promise((resolve) => {
    const previewUrl = URL.createObjectURL(file);

    const image = new Image();

    image.onload = () => {
      resolve({
        previewUrl,

        metadata: {
          width: image.naturalWidth,
          height: image.naturalHeight,
        },
      });
    };

    image.onerror = () => {
      resolve({
        previewUrl,
      });
    };

    image.src = previewUrl;
  });
}
