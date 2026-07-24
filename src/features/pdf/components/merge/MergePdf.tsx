"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import FilePicker from "@/components/file-picker/FilePicker";
import { PDF_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";

import MergePdfActions from "./MergePdfActions";

import { mergePdf } from "@/features/pdf/components/merge/mergePdf";

export default function MergePdf() {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);

  const canMerge = useMemo(
    () => files.length >= 2 && !loading,
    [files.length, loading],
  );

  async function handleMerge() {
    if (!canMerge) {
      return;
    }

    try {
      setLoading(true);

      const blob = await mergePdf(files);

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .replace("T", "_")
        .slice(0, 19);

      const filename = `FlagsDev.com | merged_${timestamp}_FlagsDev.pdf`;

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = filename;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);

      toast.success("PDFs merged successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to merge PDFs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <FilePicker files={files} onChange={setFiles} config={PDF_PICKER} />
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <MergePdfActions
          disabled={!canMerge}
          loading={loading}
          onMerge={handleMerge}
        />
      </aside>
    </div>
  );
}
