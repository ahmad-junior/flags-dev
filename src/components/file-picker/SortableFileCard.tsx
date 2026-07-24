import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import FileCard from "@/components/file-picker/FileCard";

import { AppFile } from "@/components/file-picker/types";

interface Props {
  file: AppFile;

  onRemove(id: string): void;

  actions?: React.ReactNode;

  footer?: React.ReactNode;
}

export default function SortableFileCard({
  file,
  onRemove,
  actions,
  footer,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={isDragging ? "opacity-50" : ""}
      {...attributes}
      {...listeners}
    >
      <FileCard
        file={file}
        onRemove={onRemove}
        actions={actions}
        footer={footer}
        dragHandle={{
          attributes,
          listeners,
        }}
      />
    </div>
  );
}
