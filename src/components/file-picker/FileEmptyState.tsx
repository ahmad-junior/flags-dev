import { FileSearch } from "lucide-react";

interface FileEmptyStateProps {
  fileType?: string;
  title?: string;
  description?: string;
}

export default function FileEmptyState({
  fileType = "files",
  title,
  description,
}: FileEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-8 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
        <FileSearch className="h-8 w-8 text-slate-500" />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-slate-900">
        {title ?? `No ${fileType} selected`}
      </h3>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
        {description ??
          `Select one or more ${fileType} to begin. Your files are processed entirely inside your browser and never leave your device.`}
      </p>
    </div>
  );
}
