import { decryptPDF } from "@pdfsmaller/pdf-decrypt";

export interface UnprotectPdfOptions {
  password: string;
}

export async function unprotectPdfFile(
  file: File,
  options: UnprotectPdfOptions,
): Promise<File> {
  const { password } = options;

  if (!password.trim()) {
    throw new Error("A password is required to unlock the PDF.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const inputBytes = new Uint8Array(arrayBuffer);

  try {
    const decryptedBytes = await decryptPDF(inputBytes, password);

    const cleanName = file.name.replace(/(_protected)?\.pdf$/i, "");
    const fileName = `${cleanName}_unlocked.pdf`;

    const safeBytes = new Uint8Array(decryptedBytes);
    const blob = new Blob([safeBytes], { type: "application/pdf" });

    return new File([blob], fileName, {
      type: "application/pdf",
    });
  } catch {
    throw new Error("Incorrect password. Unable to decrypt PDF.");
  }
}
