"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";

import FilePicker from "@/components/file-picker/FilePicker";
import FileCard from "@/components/file-picker/FileCard";
import { PDF_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";

import ExtractPdfActions from "@/features/pdf/components/extract/ExtractPdfActions";
import { extractPdfPages } from "@/features/pdf/components/extract/extractPdfPages";
import { makePagesFromPdf } from "@/features/pdf/components/shared/makePageFromPdf";

export default function ExtractPdf() {
  const [pdfFiles, setPdfFiles] = useState<AppFile[]>([]);
  const [pages, setPages] = useState<AppFile[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const totalPages = pages.length;
  const canExtract = totalPages > 0 && selectedIndices.length > 0 && !loading;

  async function handlePdfChange(files: AppFile[]) {
    setPdfFiles(files);

    if (files.length === 0) {
      setPages([]);
      setSelectedIndices([]);
      setOriginalFile(null);
      return;
    }

    try {
      setLoading(true);
      const file = files[0].file;
      setOriginalFile(file);

      const generatedPages = await makePagesFromPdf(file);
      setPages(generatedPages);

      const allIndices = generatedPages.map((_, i) => i);
      setSelectedIndices(allIndices);
      setPdfFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load PDF pages.");
    } finally {
      setLoading(false);
    }
  }

  const togglePageSelection = (index: number) => {
    setSelectedIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index].sort((a, b) => a - b),
    );
  };

  const handleSelectAll = () => setSelectedIndices(pages.map((_, i) => i));
  const handleClearAll = () => setSelectedIndices([]);
  const handleSelectOdd = () =>
    setSelectedIndices(pages.map((_, i) => i).filter((i) => i % 2 === 0));
  const handleSelectEven = () =>
    setSelectedIndices(pages.map((_, i) => i).filter((i) => i % 2 !== 0));

  const handleRangeInput = (rangeText: string) => {
    const trimmed = rangeText.trim();
    if (!trimmed || /[-,\s]$/.test(trimmed)) return;

    const parts = trimmed.split(",");
    const indices: number[] = [];

    parts.forEach((part) => {
      const p = part.trim();
      if (p.includes("-")) {
        const [start, end] = p.split("-").map((num) => parseInt(num, 10));
        if (!isNaN(start) && !isNaN(end)) {
          const min = Math.max(1, Math.min(start, end));
          const max = Math.min(totalPages, Math.max(start, end));
          for (let i = min; i <= max; i++) {
            indices.push(i - 1);
          }
        }
      } else {
        const pageNum = parseInt(p, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          indices.push(pageNum - 1);
        }
      }
    });

    if (indices.length > 0) {
      setSelectedIndices(Array.from(new Set(indices)).sort((a, b) => a - b));
    }
  };

  async function handleExtract() {
    if (!canExtract || !originalFile) return;

    try {
      setLoading(true);

      const blob = await extractPdfPages(originalFile, selectedIndices);

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .replace("T", "_")
        .slice(0, 19);

      const filename = `FlagsDev.com_extracted_${timestamp}.pdf`;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success(
        `Successfully extracted ${selectedIndices.length} ${
          selectedIndices.length === 1 ? "page" : "pages"
        }!`,
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to extract PDF pages.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        {totalPages === 0 ? (
          <FilePicker
            files={pdfFiles}
            onChange={handlePdfChange}
            config={{
              ...PDF_PICKER,
              multiple: false,
            }}
          />
        ) : (
          // Custom Card View not use Default File Picker
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {pages.map((page, index) => {
              const isSelected = selectedIndices.includes(index);

              return (
                <FileCard
                  key={page.id || index}
                  file={page}
                  isSelected={isSelected}
                  onClick={() => togglePageSelection(index)}
                  topRightControl={
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl border shadow-xs transition ${
                        isSelected
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-slate-300 bg-white/90 text-slate-400"
                      }`}
                    >
                      {isSelected && <Check className="h-4 w-4 stroke-[3]" />}
                    </div>
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <ExtractPdfActions
          disabled={!canExtract}
          loading={loading}
          totalPages={totalPages}
          selectedIndices={selectedIndices}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
          onSelectOdd={handleSelectOdd}
          onSelectEven={handleSelectEven}
          onRangeInput={handleRangeInput}
          onExtract={handleExtract}
        />
      </aside>
    </div>
  );
}
