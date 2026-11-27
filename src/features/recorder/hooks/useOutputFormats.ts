import { useSyncExternalStore } from "react";
import { getOutputFormatOptions } from "@/features/recorder/lib/formats";

type Options = ReturnType<typeof getOutputFormatOptions>;

const SERVER_OPTIONS: Options = [];
let cached: Options | null = null;

const subscribe = () => () => {};
const getSnapshot = () => (cached ??= getOutputFormatOptions());
const getServerSnapshot = () => SERVER_OPTIONS;

export function useOutputFormats() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
