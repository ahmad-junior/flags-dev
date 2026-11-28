import { useSyncExternalStore } from "react";
import { QUALITY_PRESETS } from "@/features/recorder/constants";

const subscribe = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
};

// Shorter side in physical pixels (estimate)
const getScreenHeight = () =>
  Math.round(
    Math.min(window.screen.width, window.screen.height) *
      window.devicePixelRatio,
  );

export function useQualityOptions() {
  const screenHeight = useSyncExternalStore(
    subscribe,
    getScreenHeight,
    () => 0,
  );

  return QUALITY_PRESETS.filter((p) => !p.height || p.height <= screenHeight);
}
