import {
  AppFile,
  FilePickerConfig,
  ValidationResult,
} from "@/components/file-picker/types";

export function createFiles(files: File[]): AppFile[] {
  return files.map((file) => ({
    id: crypto.randomUUID(),
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    extension: file.name.split(".").pop()?.toLowerCase() ?? "",
  }));
}

export function formatBytes(bytes: number) {
  if (!bytes) return "0 B";

  const units = ["B", "KB", "MB", "GB"];

  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
}

export function getTotalSize(files: AppFile[]) {
  return files.reduce((sum, file) => sum + file.size, 0);
}

export function removeDuplicates(current: AppFile[], incoming: AppFile[]) {
  const existing = new Set(
    current.map(
      (file) => `${file.name}-${file.size}-${file.file.lastModified}`,
    ),
  );

  return incoming.filter((file) => {
    const key = `${file.name}-${file.size}-${file.file.lastModified}`;

    return !existing.has(key);
  });
}

export function matchesAccept(file: File, accept?: string): boolean {
  if (!accept || accept === "*" || accept === "*/*") {
    return true;
  }

  const mimeType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  const rules = accept.split(",").map((rule) => rule.trim().toLowerCase());

  return rules.some((rule) => {
    if (rule.startsWith(".")) {
      return fileName.endsWith(rule);
    }

    if (rule.endsWith("/*")) {
      const category = rule.slice(0, -1);

      return mimeType.startsWith(category);
    }

    return mimeType === rule;
  });
}

export function validateFiles(
  selected: File[],
  config: FilePickerConfig,
): ValidationResult {
  const valid: File[] = [];

  const errors: string[] = [];

  for (const file of selected) {
    if (!matchesAccept(file, config.accept)) {
      errors.push(`${file.name} is not a supported file type.`);
      continue;
    }

    if (config.maxFileSize && file.size > config.maxFileSize) {
      errors.push(`${file.name} is too large.`);
      continue;
    }

    valid.push(file);
  }

  if (config.maxFiles && valid.length > config.maxFiles) {
    errors.push(`Maximum ${config.maxFiles} files allowed.`);
  }

  return {
    valid,
    errors,
  };
}
