import { CheckStatus, CheckItem, DeviceId } from "@/features/recorder/types";

export async function getPermissionStatus(
  name: "microphone" | "camera",
): Promise<CheckStatus> {
  try {
    if (!navigator.permissions?.query) {
      return "unknown";
    }

    const { state } = await navigator.permissions.query({
      name: name as PermissionName,
    });

    return state === "granted" ? "ready" : state;
  } catch {
    return "unknown";
  }
}

export function getDeviceCheck(
  id: "microphone" | "camera",
  title: string,
  supported: boolean,
  permission: CheckStatus,
): CheckItem {
  const status: CheckStatus = supported ? permission : "unavailable";

  const descriptions: Record<CheckStatus, string> = {
    ready: `${title} permission is already granted.`,
    prompt: "Allow access now, or later in the studio.",
    denied: `${title} is blocked. Screen recording can still work.`,
    unavailable: `No ${title.toLowerCase()} is available.`,
    unknown: `${title} permission status cannot be determined.`,
    error: `${title} couldn't start. Another app may be using it.`,
  };

  return {
    id,
    title,
    status,
    description: descriptions[status],
    required: false,
  };
}

export async function requestDevicePermissionFromBrowser(
  id: "microphone" | "camera",
): Promise<CheckStatus> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(
      id === "microphone" ? { audio: true } : { video: true },
    );
    stream.getTracks().forEach((track) => track.stop());
    return "ready";
  } catch (error) {
    const name = error instanceof DOMException ? error.name : "";

    if (name === "NotFoundError") return "unavailable";

    if (name === "NotAllowedError") {
      const status = await getPermissionStatus(id);
      return status === "prompt" ? "prompt" : "denied";
    }

    return "error";
  }
}

export async function ensureDevicePermission(
  id: DeviceId,
): Promise<CheckStatus> {
  const status = await getPermissionStatus(id);

  if (status === "ready" || status === "denied") return status;

  return requestDevicePermissionFromBrowser(id);
}
