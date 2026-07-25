"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import FilePicker from "@/components/file-picker/FilePicker";
import { PDF_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";

import PdfToImageActions, {
  ConvertSettings,
} from "@/features/pdf/components/pdf-to-image/PdfToImageActions";

import { makePagesFromPdf } from "@/features/pdf/components/shared/makePageFromPdf";
import { downloadFilesAsZip } from "@/lib/download/zip";
import { parsePageRange } from "@/features/pdf/components/shared/parsePageRange";

export default function PdfToImage() {
  const [pdf, setPdf] = useState<AppFile[]>([]);

  const [sourcePdfFile, setSourcePdfFile] = useState<File | null>(null);

  const [originalPages, setOriginalPages] = useState<AppFile[]>([]);
  const [pages, setPages] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);

  const canConvert = useMemo(
    () => pages.length > 0 && !loading,
    [pages.length, loading],
  );

  async function handlePdfChange(files: AppFile[]) {
    setPdf(files);

    if (files.length === 0) {
      setSourcePdfFile(null);
      setOriginalPages([]);
      setPages([]);
      return;
    }

    try {
      setLoading(true);
      const rawFile = files[0].file;
      setSourcePdfFile(rawFile);

      const result = await makePagesFromPdf(rawFile, { dpi: "150" });
      setOriginalPages(result);
      setPages(result);
      setPdf([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load PDF.");
    } finally {
      setLoading(false);
    }
  }

  function handleRangeChange(mode: "all" | "range", pageRange?: string) {
    if (originalPages.length === 0) {
      setPages([]);
      return;
    }

    if (mode === "all" || !pageRange?.trim()) {
      setPages(originalPages);
      return;
    }

    const targetIndices = parsePageRange(pageRange, originalPages.length);
    if (targetIndices.length > 0) {
      const filtered = targetIndices.map((idx) => originalPages[idx]);
      setPages(filtered);
    } else {
      setPages([]);
    }
  }

  async function handleConvert(settings: ConvertSettings) {
    if (!canConvert || !sourcePdfFile) return;

    try {
      setLoading(true);

      const { format, mode, pageRange, dpi, transparentBg } = settings;

      let targetIndices: number[] = [];
      if (mode === "range" && pageRange) {
        targetIndices = parsePageRange(pageRange, originalPages.length);
        if (targetIndices.length === 0) {
          toast.error("Invalid page range specified.");
          return;
        }
      } else {
        targetIndices = originalPages.map((_, i) => i);
      }

      const freshRenderedPages = await makePagesFromPdf(sourcePdfFile, {
        dpi,
        format,
        transparentBg,
        pageIndices: targetIndices,
      });

      if (freshRenderedPages.length === 0) {
        toast.error("No pages rendered.");
        return;
      }

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .replace("T", "_")
        .slice(0, 19);

      if (freshRenderedPages.length === 1) {
        const file = freshRenderedPages[0].file;
        const link = document.createElement("a");
        const url = URL.createObjectURL(file);

        link.href = url;
        link.download = `FlagsDev.com_page_1_${dpi}dpi_${timestamp}.${format}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        toast.success(
          `Image converted to ${format.toUpperCase()} (${dpi} DPI) successfully.`,
        );
        return;
      }

      await downloadFilesAsZip({
        files: freshRenderedPages,
        zipFilename: `FlagsDev.com_images_${dpi}dpi_${timestamp}.zip`,
        getFileEntryName: (index) =>
          `page_${String(index + 1).padStart(2, "0")}.${format}`,
      });

      toast.success(
        `Exported ${freshRenderedPages.length} pages as ${format.toUpperCase()} (${dpi} DPI).`,
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to convert PDF pages to images.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        {originalPages.length === 0 || pages.length === 0 ? (
          <FilePicker
            files={pdf}
            onChange={handlePdfChange}
            config={{
              ...PDF_PICKER,
              multiple: false,
            }}
          />
        ) : (
          <FilePicker
            files={pages}
            onChange={setPages}
            config={{
              ...PDF_PICKER,
              multiple: false,
            }}
          />
        )}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <PdfToImageActions
          disabled={!canConvert}
          loading={loading}
          totalPages={originalPages.length}
          onRangeChange={handleRangeChange}
          onConvert={handleConvert}
        />
      </aside>
    </div>
  );
}
