"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import {
  PreflightResult,
  RecorderPreflightProps,
  CheckStatus,
  CheckItem,
  CheckMeta,
  CardPhase,
} from "@/features/recorder/types";
import {
  AUTO_CONTINUE_SECONDS,
  CHECK_STEP_MS,
  statusStyles,
  statusLabels,
  CHECKS,
  REQUIRED_COUNT,
  primaryButton,
  secondaryButton,
  cardStyles,
} from "@/features/recorder/constants";
import {
  getDeviceCheck,
  requestDevicePermissionFromBrowser,
  getPermissionStatus,
} from "@/features/recorder/lib/permissions";
import { getOutputFormatOptions } from "@/features/recorder/lib/formats";

async function inspectBrowser(): Promise<PreflightResult> {
  const secure = window.isSecureContext;

  const screenSupported = Boolean(navigator.mediaDevices?.getDisplayMedia);

  const recorderSupported = typeof MediaRecorder !== "undefined";

  const formats = getOutputFormatOptions();

  const userMediaSupported = Boolean(navigator.mediaDevices?.getUserMedia);

  const [microphonePermission, cameraPermission] = await Promise.all([
    getPermissionStatus("microphone"),
    getPermissionStatus("camera"),
  ]);

  const checks: CheckItem[] = [
    {
      id: "secure",
      title: "Secure connection",
      description: secure
        ? "Your connection supports browser media APIs."
        : "HTTPS is required for screen and media capture.",
      status: secure ? "ready" : "error",
      required: true,
    },
    {
      id: "screen",
      title: "Screen capture",
      description: screenSupported
        ? "Permission is requested when recording starts."
        : "Your browser does not support screen capture.",
      status: screenSupported ? "ready" : "error",
      required: true,
    },
    {
      id: "recorder",
      title: "Video recording",
      description: recorderSupported
        ? "MediaRecorder API is available."
        : "Your browser does not support MediaRecorder.",
      status: recorderSupported ? "ready" : "error",
      required: true,
    },
    {
      id: "codec",
      title: "Recording format",
      description: formats.length
        ? `Supported formats: ${formats.map((f) => f.label).join(", ")}`
        : "No supported recording format was detected.",
      status: formats.length ? "ready" : "error",
      required: true,
    },
    getDeviceCheck(
      "microphone",
      "Microphone",
      userMediaSupported,
      microphonePermission,
    ),
    getDeviceCheck("camera", "Camera", userMediaSupported, cameraPermission),
  ];

  const canContinue = checks
    .filter((check) => check.required)
    .every((check) => check.status === "ready");

  return { checks, canContinue };
}

function CheckCard({
  meta,
  check,
  phase,
}: {
  meta: CheckMeta;
  check?: CheckItem;
  phase: CardPhase;
}) {
  const Icon = meta.icon;
  const status: CheckStatus = check?.status ?? "error";

  return (
    <li
      className={`flex min-h-40 min-w-0 flex-col rounded-2xl border bg-white p-5 transition-all duration-300 motion-reduce:transition-none ${cardStyles[phase]}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
          <Icon
            className={`h-5 w-5 text-indigo-600 ${phase === "checking" ? "animate-pulse" : ""}`}
          />
        </div>

        {phase === "done" ? (
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </span>
        ) : phase === "checking" ? (
          <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
        ) : (
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        )}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">{meta.title}</h3>
      <p className="mt-1 break-words text-sm leading-relaxed text-slate-500">
        {phase === "done"
          ? (check?.description ?? "This check could not be completed.")
          : phase === "checking"
            ? "Checking..."
            : "Waiting..."}
      </p>
    </li>
  );
}

function CheckGroup({
  title,
  required,
  result,
  revealed,
}: {
  title: string;
  required: boolean;
  result: PreflightResult | null;
  revealed: number;
}) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
        {title}
      </h2>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CHECKS.map((meta, index) => {
          if (meta.required !== required) return null;

          const phase: CardPhase =
            result && index < revealed
              ? "done"
              : index === revealed
                ? "checking"
                : "waiting";

          return (
            <CheckCard
              key={meta.id}
              meta={meta}
              phase={phase}
              check={result?.checks.find((c) => c.id === meta.id)}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default function RecorderPreflight({
  onContinue,
}: RecorderPreflightProps) {
  const [result, setResult] = useState<PreflightResult | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(AUTO_CONTINUE_SECONDS);

  const [requesting, setRequesting] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const runChecks = useCallback(async () => {
    setResult(null);
    setRevealed(0);
    setSecondsLeft(AUTO_CONTINUE_SECONDS);

    try {
      setResult(await inspectBrowser());
    } catch {
      setResult({ checks: [], canContinue: false });
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      void runChecks();
    });
  }, [runChecks]);

  const running = !result || revealed < CHECKS.length;

  // Reveal the checks one by one.
  useEffect(() => {
    if (!result || revealed >= CHECKS.length) return;

    const timer = window.setTimeout(
      () => setRevealed((count) => count + 1),
      CHECK_STEP_MS,
    );

    return () => window.clearTimeout(timer);
  }, [result, revealed]);

  const passed = CHECKS.slice(0, revealed).filter(
    (meta) =>
      meta.required &&
      result?.checks.find((c) => c.id === meta.id)?.status === "ready",
  ).length;
  const canContinue = !running && Boolean(result?.canContinue);
  const failed = !running && !result?.canContinue;

  const pendingDevices =
    result?.checks.filter(
      (check) =>
        !check.required &&
        (check.status === "prompt" || check.status === "unknown"),
    ) ?? [];
  const askPermission = canContinue && pendingDevices.length > 0;
  const deviceNames = pendingDevices
    .map((device) => device.title.toLowerCase())
    .join(" & ");

  const allowDevices = async () => {
    setRequesting(true);

    for (const device of pendingDevices) {
      if (!isMounted.current) return;

      const id = device.id as "microphone" | "camera";
      const status = await requestDevicePermissionFromBrowser(id);
      const updated = getDeviceCheck(id, device.title, true, status);

      setResult(
        (current) =>
          current && {
            ...current,
            checks: current.checks.map((check) =>
              check.id === id ? updated : check,
            ),
          },
      );
    }

    setRequesting(false);
  };

  useEffect(() => {
    if (!canContinue || askPermission || requesting) return;

    if (secondsLeft === 0) {
      onContinue();
      return;
    }

    const timer = window.setTimeout(
      () => setSecondsLeft((seconds) => seconds - 1),
      1000,
    );

    return () => window.clearTimeout(timer);
  }, [canContinue, askPermission, requesting, secondsLeft, onContinue]);

  return (
    <main className="min-h-screen flex items-center bg-slate-50 px-4 py-6 sm:px-6 lg:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="rounded-3xl flex flex-col items-center border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
              {running ? (
                <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
              ) : failed ? (
                <AlertTriangle className="h-7 w-7 text-red-600" />
              ) : (
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              )}
            </div>

            <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
              {running
                ? "Preparing..."
                : failed
                  ? "Something needs attention"
                  : "Ready"}
            </h1>

            <p
              aria-live="polite"
              className="mt-2 text-sm leading-relaxed text-slate-500"
            >
              {running
                ? `Checking ${Math.min(revealed + 1, CHECKS.length)} of ${CHECKS.length}...`
                : `${passed} of ${REQUIRED_COUNT} required checks passed.`}
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  failed ? "bg-red-500" : "bg-emerald-500"
                }`}
                style={{
                  width: `${(revealed / CHECKS.length) * 100}%`,
                }}
              />
            </div>

            {failed && (
              <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                Please use a supported desktop browser and make sure this page
                is served over HTTPS.
              </p>
            )}

            <div className="mt-6 space-y-3">
              {askPermission && (
                <>
                  <p className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-blue-700 text-justify">
                    Allow your{" "}
                    <span className="text-red-500">{deviceNames}</span> now so
                    recording starts without interruptions.
                  </p>

                  <button
                    type="button"
                    onClick={() => void allowDevices()}
                    disabled={requesting}
                    className={`${primaryButton} capitalize`}
                  >
                    {requesting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ShieldCheck className="h-5 w-5" />
                    )}
                    {requesting
                      ? "Waiting for browser..."
                      : `Allow ${deviceNames}`}
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={onContinue}
                disabled={!canContinue}
                className={askPermission ? secondaryButton : primaryButton}
              >
                {askPermission
                  ? "Skip and continue"
                  : canContinue
                    ? `Continue to Studio (${secondsLeft}s)`
                    : "Continue to Studio"}
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => void runChecks()}
                disabled={running || requesting}
                className={secondaryButton}
              >
                <RefreshCw
                  className={`h-4 w-4 ${running ? "animate-spin" : ""}`}
                />
                Run checks again
              </button>
            </div>
          </aside>

          <div className="space-y-6">
            <CheckGroup
              title="Required"
              required
              result={result}
              revealed={revealed}
            />
            <CheckGroup
              title="Optional devices"
              required={false}
              result={result}
              revealed={revealed}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
