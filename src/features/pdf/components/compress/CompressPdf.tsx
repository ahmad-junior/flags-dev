"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import FilePicker from "@/components/file-picker/FilePicker";
import { PDF_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";
import { formatBytes } from "@/components/file-picker/utils";

import CompressPdfActions from "@/features/pdf/components/compress/CompressPdfActions";
import {
  compressPdfFile,
  CompressionLevel,
} from "@/features/pdf/components/compress/compressPdf";
import SuccessModal from "@/components/modals/SuccessModal";

export default function CompressPdf() {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);

  const activeFile = useMemo(() => files[0]?.file || null, [files]);
  const canCompress = useMemo(
    () => !!activeFile && !loading,
    [activeFile, loading],
  );

  const downloadBlob = (blob: Blob) => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "_")
      .slice(0, 19);

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `FlagsDev.com_compressed_${timestamp}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  async function handleCompress(level: CompressionLevel) {
    if (!activeFile) return;

    try {
      setLoading(true);
      setProgress(0);

      const originalSizeBytes = activeFile.size;
      const compressedBlob = await compressPdfFile(
        activeFile,
        level,
        (currentProgress) => setProgress(currentProgress),
      );

      setCompressedFile(compressedBlob);
      setShowSuccessModal(true);

      const newSizeBytes = compressedBlob.size;
      const savedBytes = originalSizeBytes - newSizeBytes;
      const percentageSaved = Math.max(
        0,
        Math.round((savedBytes / originalSizeBytes) * 100),
      );

      downloadBlob(compressedBlob);

      if (savedBytes > 0) {
        toast.success(
          `Compressed by ${percentageSaved}%! Reduced from ${formatBytes(
            originalSizeBytes,
          )} to ${formatBytes(newSizeBytes)}.`,
        );
      } else {
        toast.info(
          "Document is already optimally compressed. Minimal size change achieved.",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to compress PDF.");
    } finally {
      setLoading(false);
      setProgress(0);
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
        <CompressPdfActions
          disabled={!canCompress}
          loading={loading}
          progress={progress}
          originalSize={activeFile?.size || 0}
          onCompress={handleCompress}
        />
      </aside>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onDownload={() => {
          if (compressedFile) downloadBlob(compressedFile);
        }}
        title="PDF Compressed Successfully!"
        description="Your PDF was compressed securely on your device. Nothing was uploaded."
      />
    </div>
  );
}
