import { AppFile } from "@/components/file-picker/types";
import SortableFileCard from "@/components/file-picker/SortableFileCard";
import FileEmptyState from "@/components/file-picker/FileEmptyState";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortOption } from "@/components/file-picker/types";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

interface FileListProps {
  files: AppFile[];

  onRemove(id: string): void;
  onReorder(files: AppFile[]): void;

  emptyLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;

  actions?: (file: AppFile) => React.ReactNode;
  footer?: (file: AppFile) => React.ReactNode;

  onSortOptionChange: (option: SortOption) => void;
}

export default function FileList({
  files,
  onRemove,
  onReorder,

  emptyLabel = "files",
  emptyTitle,
  emptyDescription,

  actions,
  footer,
  onSortOptionChange,
}: FileListProps) {
  if (files.length === 0) {
    return (
      <FileEmptyState
        fileType={emptyLabel}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = files.findIndex((file) => file.id === active.id);
    const newIndex = files.findIndex((file) => file.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Reset sorting to preserve manual ordering.
    onSortOptionChange(null);

    // Apply the new manual order.
    const reorderedFiles = arrayMove(files, oldIndex, newIndex);

    onReorder(reorderedFiles);
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={files.map((file) => file.id)}
        strategy={rectSortingStrategy}
      >
        <div
          className={
            files.length > 1
              ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : ""
          }
        >
          {files.map((file) => (
            <SortableFileCard
              key={file.id}
              file={file}
              onRemove={onRemove}
              footer={footer?.(file)}
              actions={actions?.(file)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
