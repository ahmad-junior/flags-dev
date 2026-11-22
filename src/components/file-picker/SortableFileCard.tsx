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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 250ms ease",
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        ${isDragging ? "scale-102 shadow-2xl" : ""}
        transition-shadow duration-300 file-reorder-animation
      `}
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
