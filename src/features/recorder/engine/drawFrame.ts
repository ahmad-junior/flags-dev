import { Picture } from "./types";

export const even = (value: number) => Math.max(2, Math.round(value / 2) * 2);

export function drawFrame(
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  screen: Picture,
  camera: Picture | null,
) {
  const { width, height } = context.canvas;
  const scale = Math.min(width / screen.width, height / screen.height);
  const sw = screen.width * scale;
  const sh = screen.height * scale;

  if (sw < width - 1 || sh < height - 1) {
    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(screen.image, (width - sw) / 2, (height - sh) / 2, sw, sh);

  if (!camera) return;

  const w = width * 0.2;
  const h = (w * camera.height) / camera.width;
  const x = width - w - width * 0.02;
  const y = height - h - width * 0.02;

  context.save();
  context.beginPath();
  if (typeof context.roundRect === "function") {
    context.roundRect(x, y, w, h, w * 0.06);
    context.clip();
  }
  context.drawImage(camera.image, x, y, w, h);
  context.restore();
}
