import { AppFile } from "@/components/file-picker/types";
import FileCard from "@/components/file-picker/FileCard";
import FileEmptyState from "@/components/file-picker/FileEmptyState";

interface FileListProps {
  files: AppFile[];

  onRemove: (id: string) => void;

  emptyLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;

  actions?: (file: AppFile) => React.ReactNode;
  footer?: (file: AppFile) => React.ReactNode;
}

export default function FileList({
  files,
  onRemove,

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

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {files.map((file) => (
        <FileCard
          key={file.id}
          file={file}
          onRemove={onRemove}
          footer={footer?.(file)}
          actions={actions?.(file)}
        />
      ))}
    </div>
  );
}
