"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import FilePicker from "@/components/file-picker/FilePicker";
import { PDF_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";

import SplitPdfActions, {
  SplitMode,
} from "@/features/pdf/components/split/SplitPdfActions";

import { makePagesFromPdf } from "@/features/pdf/components/shared/makePageFromPdf";
import { parsePageRange } from "@/features/pdf/components/shared/parsePageRange";
import { splitPdfFile } from "@/features/pdf/components/split/splitPdf";

export default function SplitPdf() {
  const [pdf, setPdf] = useState<AppFile[]>([]);
  const [sourcePdfFile, setSourcePdfFile] = useState<File | null>(null);

  const [originalPages, setOriginalPages] = useState<AppFile[]>([]);
  const [displayPages, setDisplayPages] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);

  const [splitMode, setSplitMode] = useState<SplitMode>("extract_all");
  const [customRangeText, setCustomRangeText] = useState("");

  const canSplit = useMemo(
    () => originalPages.length > 0 && !loading,
    [originalPages.length, loading],
  );

  async function handlePdfChange(files: AppFile[]) {
    setPdf(files);

    if (files.length === 0) {
      setSourcePdfFile(null);
      setOriginalPages([]);
      setDisplayPages([]);
      return;
    }

    try {
      setLoading(true);
      const rawFile = files[0].file;
      setSourcePdfFile(rawFile);

      const result = await makePagesFromPdf(rawFile);
      setOriginalPages(result);
      setDisplayPages(result);
      setPdf([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load PDF.");
    } finally {
      setLoading(false);
    }
  }

  function handleSplitModeChange(mode: SplitMode, rangeText?: string) {
    setSplitMode(mode);
    const text = rangeText ?? customRangeText;
    setCustomRangeText(text);

    if (originalPages.length === 0) {
      setDisplayPages([]);
      return;
    }

    if (mode === "extract_all" || !text.trim()) {
      setDisplayPages(originalPages);
      return;
    }

    const targetIndices = parsePageRange(text, originalPages.length);
    if (targetIndices.length > 0) {
      const filtered = targetIndices.map((idx) => originalPages[idx]);
      setDisplayPages(filtered);
    } else {
      setDisplayPages(originalPages);
    }
  }

  async function handleApplySplit() {
    if (!canSplit || !sourcePdfFile) return;

    try {
      setLoading(true);

      let targetIndices: number[] = [];
      if (splitMode === "custom_range") {
        targetIndices = parsePageRange(customRangeText, originalPages.length);
        if (targetIndices.length === 0) {
          toast.error("Please enter a valid page range.");
          return;
        }
      }

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .replace("T", "_")
        .slice(0, 19);

      const zipFilename = `FlagsDev.com_split_pages_${timestamp}.zip`;

      const resultBlob = await splitPdfFile(
        sourcePdfFile,
        {
          mode: splitMode,
          pageIndices: targetIndices,
        },
        zipFilename,
      );

      if (resultBlob instanceof Blob) {
        const fileName = `FlagsDev.com_split_${timestamp}.pdf`;
        const link = document.createElement("a");
        const url = URL.createObjectURL(resultBlob);

        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        toast.success("PDF pages extracted successfully.");
      } else {
        toast.success("PDF pages split and archived into ZIP successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to split PDF.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        {originalPages.length === 0 || displayPages.length === 0 ? (
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
            files={displayPages}
            onChange={setDisplayPages}
            config={{
              ...PDF_PICKER,
              multiple: false,
            }}
          />
        )}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <SplitPdfActions
          disabled={!canSplit}
          loading={loading}
          totalPages={originalPages.length}
          onSplitModeChange={handleSplitModeChange}
          onApplySplit={handleApplySplit}
        />
      </aside>
    </div>
  );
}
