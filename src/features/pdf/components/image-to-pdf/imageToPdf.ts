import { PDFDocument } from "pdf-lib";

import { AppFile } from "@/components/file-picker/types";

export async function imageToPdf(files: AppFile[]): Promise<Blob> {
  if (files.length === 0) {
    throw new Error("Please select at least one image.");
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.file.arrayBuffer();

    let image;

    if (file.file.type === "image/png") {
      image = await pdfDoc.embedPng(bytes);
    } else if (
      file.file.type === "image/jpeg" ||
      file.file.type === "image/jpg"
    ) {
      image = await pdfDoc.embedJpg(bytes);
    } else {
      throw new Error(`${file.file.name} is not a supported image.`);
    }

    const { width, height } = image.scale(1);

    const page = pdfDoc.addPage([width, height]);

    page.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const buffer = pdfBytes.slice().buffer;

  return new Blob([buffer], {
    type: "application/pdf",
  });
}
