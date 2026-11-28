import { useEffect, useState, useSyncExternalStore } from "react";
import { RecordingEngine } from "@/features/recorder/engine/RecordingEngine";
import { INITIAL_SNAPSHOT } from "@/features/recorder/engine/constants";

const getServerSnapshot = () => INITIAL_SNAPSHOT;

export function useRecorder() {
  const [engine] = useState(() => new RecordingEngine());
  const snapshot = useSyncExternalStore(
    engine.subscribe,
    engine.getSnapshot,
    getServerSnapshot,
  );

  const busy = ["starting", "recording", "paused", "stopping"].includes(
    snapshot.phase,
  );

  useEffect(() => () => void engine.release(), [engine]);

  useEffect(() => {
    if (!busy) return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [busy]);

  return { engine, snapshot, busy };
}
