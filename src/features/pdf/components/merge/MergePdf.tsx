"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import FilePicker from "@/components/file-picker/FilePicker";
import { PDF_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";
import SuccessModal from "@/components/modals/SuccessModal";

import MergePdfActions from "./MergePdfActions";
import { mergePdf } from "@/features/pdf/components/merge/mergePdf";
import ProcessingIndicatorModal from "@/components/modals/ProcessingIndicatorModal";

export default function MergePdf() {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>("");

  const canMerge = useMemo(
    () => files.length >= 2 && !loading,
    [files.length, loading],
  );

  async function handleMerge() {
    if (!canMerge) return;

    try {
      setLoading(true);
      setLoadingText("We're Merging PDFs...");

      const blob = await mergePdf(files);

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .replace("T", "_")
        .slice(0, 19);

      const filename = `FlagsDev.com | merged_${timestamp}_FlagsDev.pdf`;
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setDownloadFilename(filename);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("PDFs merged successfully.");
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to merge PDFs.");
    } finally {
      setLoading(false);
    }
  }

  function handleManualDownload() {
    if (!downloadUrl) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ProcessingIndicatorModal isOpen={loading} text={loadingText} />
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

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onDownload={handleManualDownload}
        title="PDF Merged Successfully!"
        description="Your PDF was merged securely on your device. Nothing was uploaded."
      />
    </>
  );
}
