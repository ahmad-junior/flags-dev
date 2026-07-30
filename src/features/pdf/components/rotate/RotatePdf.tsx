"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import FilePicker from "@/components/file-picker/FilePicker";
import { PDF_PICKER } from "@/components/file-picker/presets";
import { AppFile } from "@/components/file-picker/types";

import PageRotateActions from "@/features/pdf/components/shared/PageRotateActions";
import RotatePdfActions from "@/features/pdf/components/rotate/RotatePdfActions";

import { makePagesFromPdf } from "@/features/pdf/components/shared/makePageFromPdf";
import { parsePageRange } from "@/features/pdf/components/shared/parsePageRange";
import { rotatePdfFile } from "@/features/pdf/components/rotate/rotatePdf";

export default function RotatePdf() {
  const [pdf, setPdf] = useState<AppFile[]>([]);
  const [sourcePdfFile, setSourcePdfFile] = useState<File | null>(null);

  const [originalPages, setOriginalPages] = useState<AppFile[]>([]);
  const [pages, setPages] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);

  const [rotations, setRotations] = useState<Record<string, number>>({});

  const canRotate = useMemo(
    () => pages.length > 0 && !loading,
    [pages.length, loading],
  );

  const totalRotatedCount = useMemo(() => {
    return Object.values(rotations).filter((deg) => deg !== 0).length;
  }, [rotations]);

  const normalizeDegree = (deg: number) => ((deg % 360) + 360) % 360;

  async function handlePdfChange(files: AppFile[]) {
    setPdf(files);

    if (files.length === 0) {
      setSourcePdfFile(null);
      setOriginalPages([]);
      setPages([]);
      setRotations({});
      return;
    }

    try {
      setLoading(true);
      const rawFile = files[0].file;
      setSourcePdfFile(rawFile);

      const result = await makePagesFromPdf(rawFile);
      setOriginalPages(result);
      setPages(result);
      setRotations({});
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
      setPages(originalPages);
    }
  }

  const handleRotateLeft = (pageId: string) => {
    setRotations((prev) => ({
      ...prev,
      [pageId]: normalizeDegree((prev[pageId] || 0) - 90),
    }));
  };

  const handleRotateRight = (pageId: string) => {
    setRotations((prev) => ({
      ...prev,
      [pageId]: normalizeDegree((prev[pageId] || 0) + 90),
    }));
  };

  const handleRotateAllLeft = () => {
    const updated: Record<string, number> = {};
    pages.forEach((page) => {
      updated[page.id] = normalizeDegree((rotations[page.id] || 0) - 90);
    });
    setRotations(updated);
  };

  const handleRotateAllRight = () => {
    const updated: Record<string, number> = {};
    pages.forEach((page) => {
      updated[page.id] = normalizeDegree((rotations[page.id] || 0) + 90);
    });
    setRotations(updated);
  };

  const handleResetRotations = () => {
    setRotations({});
  };

  async function handleApplyRotate() {
    if (!canRotate || !sourcePdfFile) return;

    try {
      setLoading(true);

      const pageRotationMap: Record<number, number> = {};
      originalPages.forEach((page, originalIndex) => {
        const deg = rotations[page.id] || 0;
        if (deg !== 0) {
          pageRotationMap[originalIndex] = deg;
        }
      });

      const rotatedFile = await rotatePdfFile(sourcePdfFile, {
        rotations: pageRotationMap,
      });

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .replace("T", "_")
        .slice(0, 19);

      const link = document.createElement("a");
      const url = URL.createObjectURL(rotatedFile);

      link.href = url;
      link.download = `FlagsDev.com_rotated_${timestamp}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success("PDF pages rotated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to rotate PDF pages.");
    } finally {
      setLoading(false);
    }
  }

  const displayPages = useMemo(() => {
    return pages.map((page) => ({
      ...page,
      metadata: {
        ...(typeof page.metadata === "object" ? page.metadata : {}),
        rotation: rotations[page.id] || 0,
      },
    }));
  }, [pages, rotations]);

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
            files={displayPages}
            onChange={setPages}
            config={{
              ...PDF_PICKER,
              multiple: false,
            }}
            renderActions={(file) => (
              <PageRotateActions
                fileId={file.id}
                onRotateLeft={handleRotateLeft}
                onRotateRight={handleRotateRight}
              />
            )}
          />
        )}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <RotatePdfActions
          disabled={!canRotate}
          loading={loading}
          totalPages={originalPages.length}
          totalRotationCount={totalRotatedCount}
          onRangeChange={handleRangeChange}
          onRotateAllLeft={handleRotateAllLeft}
          onRotateAllRight={handleRotateAllRight}
          onResetRotations={handleResetRotations}
          onApplyRotate={handleApplyRotate}
        />
      </aside>
    </div>
  );
}
