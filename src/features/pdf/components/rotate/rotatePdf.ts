import { PDFDocument, degrees } from "pdf-lib";

export interface RotatePdfPageItem {
  pageIndex: number;
  rotation: number;
}

export interface RotatePdfOptions {
  rotations: Record<number, number>;
}

export async function rotatePdfFile(
  file: File,
  options: RotatePdfOptions,
): Promise<File> {
  const { rotations } = options;
  const arrayBuffer = await file.arrayBuffer();

  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    const addedRotation = rotations[index] || 0;
    if (addedRotation !== 0) {
      const currentRotation = page.getRotation().angle;
      const newAngle = (currentRotation + addedRotation) % 360;
      page.setRotation(degrees(newAngle));
    }
  });

  const pdfBytes = await pdfDoc.save();
  const cleanName = file.name.replace(/\.pdf$/i, "");
  const fileName = `${cleanName}_rotated.pdf`;

  const safeBytes = new Uint8Array(pdfBytes);
  const blob = new Blob([safeBytes], { type: "application/pdf" });

  return new File([blob], fileName, {
    type: "application/pdf",
  });
}
