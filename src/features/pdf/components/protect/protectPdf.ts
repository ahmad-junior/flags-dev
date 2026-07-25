import { encryptPDF } from "@pdfsmaller/pdf-encrypt";

export interface ProtectPdfOptions {
  password: string;
}

export async function protectPdfFile(
  file: File,
  options: ProtectPdfOptions,
): Promise<File> {
  const { password } = options;

  if (!password.trim()) {
    throw new Error("A password is required to protect the PDF.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const inputBytes = new Uint8Array(arrayBuffer);

  const encryptedBytes = await encryptPDF(inputBytes, password, {
    ownerPassword: password,
  });

  const cleanName = file.name.replace(/\.pdf$/i, "");
  const fileName = `FlagsDev.com_${cleanName}_protected by FlagsDev.pdf`;

  const safeBytes = new Uint8Array(encryptedBytes);
  const blob = new Blob([safeBytes], { type: "application/pdf" });

  return new File([blob], fileName, {
    type: "application/pdf",
  });
}
