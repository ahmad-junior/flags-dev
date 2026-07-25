"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import FilePicker from "@/components/file-picker/FilePicker";
import { PDF_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";

import UnprotectPdfActions, {
  UnprotectSettings,
} from "@/features/pdf/components/unprotect/UnprotectPdfActions";
import { unprotectPdfFile } from "@/features/pdf/components/unprotect/unprotectPdf";

export default function UnprotectPdf() {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);

  const canUnprotect = useMemo(
    () => files.length > 0 && !loading,
    [files.length, loading],
  );

  async function handleUnprotect(settings: UnprotectSettings) {
    if (!canUnprotect || files.length === 0) return;

    try {
      setLoading(true);

      const unlockedFile = await unprotectPdfFile(files[0].file, {
        password: settings.password,
      });

      const link = document.createElement("a");
      const url = URL.createObjectURL(unlockedFile);

      link.href = url;
      link.download = unlockedFile.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success("PDF unlocked successfully!");
    } catch {
      toast.error("Failed to unlock PDF. Please check your password.");
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
        <UnprotectPdfActions
          disabled={!canUnprotect}
          loading={loading}
          fileCount={files.length}
          onUnprotect={handleUnprotect}
        />
      </aside>
    </div>
  );
}
