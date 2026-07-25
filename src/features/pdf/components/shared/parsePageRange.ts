export function parsePageRange(rangeStr: string, total: number): number[] {
  if (!rangeStr || total <= 0) return [];

  const indices = new Set<number>();
  const parts = rangeStr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const rangeParts = part.split("-").map((num) => num.trim());

      if (rangeParts.length === 2) {
        const rawStart = parseInt(rangeParts[0], 10);
        const rawEnd = parseInt(rangeParts[1], 10);

        if (!isNaN(rawStart) && !isNaN(rawEnd)) {
          const min = Math.min(rawStart, rawEnd);
          const max = Math.max(rawStart, rawEnd);

          const start = Math.max(1, min);
          const end = Math.min(total, max);

          for (let i = start; i <= end; i++) {
            indices.add(i - 1);
          }
        }
      }
    } else {
      const pageNum = parseInt(part, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= total) {
        indices.add(pageNum - 1);
      }
    }
  }

  return Array.from(indices).sort((a, b) => a - b);
}
