import { AppFile } from "@/components/file-picker/types";
import SortableFileCard from "@/components/file-picker/SortableFileCard";
import FileEmptyState from "@/components/file-picker/FileEmptyState";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";

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

    onReorder(arrayMove(files, oldIndex, newIndex));
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={files.map((file) => file.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
