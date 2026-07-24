"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import FilePicker from "@/components/file-picker/FilePicker";
import { IMAGE_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";

import ImageToPdfActions from "@/features/pdf/components/image-to-pdf/ImageToPdfActions";

import { imageToPdf } from "@/features/pdf/components/shared/imageToPdf";

export default function ImageToPdf() {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);

  const canConvert = useMemo(
    () => files.length > 0 && !loading,
    [files.length, loading],
  );

  async function handleConvert() {
    if (!canConvert) {
      return;
    }

    try {
      setLoading(true);

      const blob = await imageToPdf(files);

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .replace("T", "_")
        .slice(0, 19);

      const filename = `FlagsDev.com | images_${timestamp}_FlagsDev.pdf`;

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = filename;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);

      toast.success("PDF created successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create PDF.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <FilePicker files={files} onChange={setFiles} config={IMAGE_PICKER} />
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <ImageToPdfActions
          disabled={!canConvert}
          loading={loading}
          onConvert={handleConvert}
        />
      </aside>
    </div>
  );
}
