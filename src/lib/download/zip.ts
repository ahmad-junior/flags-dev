import JSZip from "jszip";

interface AppFileLike {
  file: File | Blob;
  name?: string;
}

interface DownloadZipOptions {
  files: AppFileLike[];
  zipFilename: string;
  /**
   * Optional custom naming callback for individual files inside the ZIP.
   * Defaults to: `page_01.png`, `page_02.png`, etc.
   */
  getFileEntryName?: (index: number) => string;
}

export async function downloadFilesAsZip({
  files,
  zipFilename,
  getFileEntryName,
}: DownloadZipOptions): Promise<void> {
  if (files.length === 0) return;

  const zip = new JSZip();

  files.forEach((item, index) => {
    const entryName = getFileEntryName
      ? getFileEntryName(index)
      : item.name || `file_${String(index + 1).padStart(2, "0")}`;

    zip.file(entryName, item.file);
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = zipFilename.endsWith(".zip")
    ? zipFilename
    : `${zipFilename}.zip`;

  document.body.appendChild(link);
  link.click();

  link.remove();
  URL.revokeObjectURL(url);
}
