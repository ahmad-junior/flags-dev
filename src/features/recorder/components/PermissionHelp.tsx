"use client";

import { useEffect, useRef, useState } from "react";

import type { PermissionHelpProps } from "@/features/recorder/types";

export default function PermissionHelp({
  device,
  status,
  attempts,
  busy,
  onRetry,
  onGranted,
  onClose,
}: PermissionHelpProps) {
  const slot = useRef<HTMLDivElement>(null);
  const [hasNativeButton, setHasNativeButton] = useState(false);
  const blocked = status === "denied";

  // Select the device as soon as the user allows it in browser settings.
  useEffect(() => {
    let permission: PermissionStatus | undefined;
    let active = true;

    const handleChange = () => {
      if (permission?.state === "granted") onGranted(device);
    };

    navigator.permissions
      ?.query({ name: device as PermissionName })
      .then((result) => {
        if (!active) return;
        permission = result;
        permission.addEventListener("change", handleChange);
      })
      .catch(() => {
        // Not supported here; the "Try again" button still works.
      });

    return () => {
      active = false;
      permission?.removeEventListener("change", handleChange);
    };
  }, [device, onGranted]);

  // Newer Chrome has <camera> and <microphone> buttons that can recover
  // a blocked permission without leaving the page.
  useEffect(() => {
    if (!blocked) return;

    const element = document.createElement(device) as HTMLElement & {
      track?: MediaStreamTrack;
    };

    if (element instanceof HTMLUnknownElement) return;

    const handleTrack = () => {
      element.track?.stop();
      onGranted(device);
    };

    element.addEventListener("track", handleTrack);
    slot.current?.appendChild(element);

    Promise.resolve().then(() => {
      setHasNativeButton(true);
    });

    return () => {
      element.removeEventListener("track", handleTrack);
      element.remove();
      setHasNativeButton(false);
    };
  }, [blocked, device, onGranted]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const title = blocked
    ? `Your ${device} is blocked`
    : status === "prompt"
      ? `Allow your ${device}`
      : `Your ${device} isn't working`;

  const message =
    status === "prompt"
      ? "Press Try again, then choose Allow in the browser popup."
      : status === "unavailable"
        ? `No ${device} was found. Connect one, then try again.`
        : `Close other apps using your ${device}, then try again.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="permission-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 id="permission-title" className="text-xl font-bold text-slate-900">
          {title}
        </h2>

        {blocked ? (
          <>
            <div ref={slot} className="mt-4 flex justify-center" />

            <p className="mt-3 text-sm text-slate-600">
              {hasNativeButton
                ? "Use the button above, or change it manually:"
                : "To allow it:"}
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
              <li>Click the site settings or lock icon by the address bar.</li>
              <li className="capitalize">Set {device} to Allow.</li>
              <li>Come back here. Reload the page if the browser asks.</li>
            </ol>
          </>
        ) : (
          <p className="mt-3 text-sm text-slate-600">{message}</p>
        )}

        {attempts > 1 && (
          <p
            role="status"
            className="mt-3 text-sm font-semibold text-amber-700"
          >
            {blocked
              ? "Still blocked. Change the browser setting first."
              : "Still not available."}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Not now
          </button>
          <button
            type="button"
            onClick={onRetry}
            disabled={busy}
            className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {busy ? "Waiting..." : "Try again"}
          </button>
        </div>
      </div>
    </div>
  );
}
