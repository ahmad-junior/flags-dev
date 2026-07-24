"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import FilePicker from "@/components/file-picker/FilePicker";
import { PDF_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";

import ReorderPdfActions from "./ReorderPdfActions";

import { makePagesFromPdf } from "@/features/pdf/components/shared/makePageFromPdf"; // Shared
import { imageToPdf } from "@/features/pdf/components/shared/imageToPdf"; // Shared

export default function ReorderPdf() {
  const [pdf, setPdf] = useState<AppFile[]>([]);
  const [pages, setPages] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);

  const canSave = useMemo(
    () => pages.length > 0 && !loading,
    [pages.length, loading],
  );

  async function handlePdfChange(files: AppFile[]) {
    setPdf(files);

    if (files.length === 0) {
      setPages([]);
      return;
    }

    try {
      setLoading(true);

      const result = await makePagesFromPdf(files[0].file);

      setPages(result);
      setPdf([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load PDF.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!canSave) {
      return;
    }

    try {
      setLoading(true);

      const blob = await imageToPdf(pages);

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .replace("T", "_")
        .slice(0, 19);

      const filename = `FlagsDev.com | reordered_${timestamp}_FlagsDev.pdf`;

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = filename;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);

      toast.success("PDF reordered successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reorder PDF.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        {pages.length === 0 ? (
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
              accept: "image",
              multiple: false,
            }}
          />
        )}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <ReorderPdfActions
          disabled={!canSave}
          loading={loading}
          onSave={handleSave}
        />
      </aside>
    </div>
  );
}
