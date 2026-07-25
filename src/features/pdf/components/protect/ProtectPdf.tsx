"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import FilePicker from "@/components/file-picker/FilePicker";
import { PDF_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";

import ProtectPdfActions, {
  ProtectSettings,
} from "@/features/pdf/components/protect/ProtectPdfActions";
import { protectPdfFile } from "@/features/pdf/components/protect/protectPdf";

export default function ProtectPdf() {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);

  const canProtect = useMemo(
    () => files.length > 0 && !loading,
    [files.length, loading],
  );

  async function handleProtect(settings: ProtectSettings) {
    if (!canProtect || files.length === 0) return;

    try {
      setLoading(true);

      const protectedFile = await protectPdfFile(files[0].file, {
        password: settings.password,
      });

      const link = document.createElement("a");
      const url = URL.createObjectURL(protectedFile);

      link.href = url;
      link.download = protectedFile.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success("PDF protected successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to protect PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <FilePicker
          files={files}
          onChange={setFiles}
          config={{
            ...PDF_PICKER,
            multiple: false,
          }}
        />
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <ProtectPdfActions
          disabled={!canProtect}
          loading={loading}
          fileCount={files.length}
          onProtect={handleProtect}
        />
      </aside>
    </div>
  );
}
