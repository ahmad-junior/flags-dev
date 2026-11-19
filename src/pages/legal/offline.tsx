import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import SEO from "@/components/SEO";
import {
  WifiOff,
  RefreshCw,
  Server,
  Globe,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  LockKeyhole,
  Clock,
  Activity,
  ShieldCheck,
} from "lucide-react";

type ConnectionStatus = "checking" | "unavailable" | "restored";

const CHECK_INTERVAL_MS = 3 * 60 * 1000;
const CHECK_INTERVAL_SECONDS = CHECK_INTERVAL_MS / 1000;
const REQUEST_TIMEOUT_MS = 8000;

export default function OfflinePage() {
  const [status, setStatus] = useState<ConnectionStatus>("unavailable");
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [secondsUntilCheck, setSecondsUntilCheck] = useState(
    CHECK_INTERVAL_SECONDS,
  );

  const abortController = useRef<AbortController | null>(null);
  const reloadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRestoredRef = useRef(false);
  const isMountedRef = useRef(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const checkConnection = useCallback(async () => {
    if (isRestoredRef.current || abortController.current) return;

    const controller = new AbortController();
    abortController.current = controller;

    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    if (isMountedRef.current) {
      setIsChecking(true);
      setStatus("checking");
    }

    try {
      const response = await fetch("/", {
        method: "HEAD",
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("FlagsDev is still unavailable.");
      }

      if (!isMountedRef.current) return;

      isRestoredRef.current = true;
      setStatus("restored");
      setIsOnline(true);

      if (reloadTimer.current) {
        clearTimeout(reloadTimer.current);
      }

      reloadTimer.current = setTimeout(() => {
        window.location.replace("/");
      }, 3000);
    } catch {
      if (isMountedRef.current && !isRestoredRef.current) {
        setStatus("unavailable");
        setIsOnline(navigator.onLine);
      }
    } finally {
      clearTimeout(timeout);

      if (abortController.current === controller) {
        abortController.current = null;
      }

      if (isMountedRef.current && !controller.signal.aborted) {
        setIsChecking(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    const handleOnline = () => {
      setIsOnline(true);
      setSecondsUntilCheck(CHECK_INTERVAL_SECONDS);
      void checkConnection();
    };

    const handleOffline = () => {
      setIsOnline(false);

      if (!isRestoredRef.current) {
        setStatus("unavailable");
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    Promise.resolve().then(() => {
      setIsOnline(navigator.onLine);
    });

    const initialCheck = setTimeout(() => {
      if (navigator.onLine) {
        void checkConnection();
      }
    }, 0);

    const countdown = setInterval(() => {
      if (isRestoredRef.current) return;

      setSecondsUntilCheck((previous) => {
        if (previous <= 1) {
          void checkConnection();
          return CHECK_INTERVAL_SECONDS;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      isMountedRef.current = false;

      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      clearTimeout(initialCheck);
      clearInterval(countdown);

      abortController.current?.abort();

      if (reloadTimer.current) {
        clearTimeout(reloadTimer.current);
        reloadTimer.current = null;
      }
    };
  }, [checkConnection]);

  const handleRetry = () => {
    if (isRestoredRef.current || isChecking) return;

    setSecondsUntilCheck(CHECK_INTERVAL_SECONDS);
    void checkConnection();
  };

  const isRestored = status === "restored";

  const statusText = isRestored
    ? "Connection restored"
    : isChecking
      ? "Checking connection"
      : "Connection unavailable";

  return (
    <>
      <SEO
        title="Connection Issue | FlagsDev"
        description="Unable to reach FlagsDev. Check your internet connection or try again shortly."
        noIndex={true}
      />

      <main className="relative flex min-h-screen justify-center overflow-hidden bg-[#f8fafc] px-4 py-10 text-slate-900 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#94a3b80a_1px,transparent_1px),linear-gradient(to_bottom,#94a3b80a_1px,transparent_1px)] bg-[size:36px_36px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.07] blur-[110px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-[520px]">
          <div className="mb-7 flex items-center justify-center">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-slate-900"
            >
              FlagsDev
            </Link>
          </div>

          <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.18)]">
            <div className="px-6 pb-8 pt-9 sm:px-9 sm:pb-9 sm:pt-10">
              <div className="mb-8 flex justify-center">
                <div
                  role="status"
                  aria-live="polite"
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold ${
                    isRestored
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : isChecking
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                  }`}
                >
                  {isRestored ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : isChecking ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                  )}

                  {statusText}
                </div>
              </div>

              <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-[30px] ${
                    isRestored ? "bg-emerald-50" : "bg-amber-50"
                  }`}
                />

                <div
                  className={`absolute inset-2 rounded-[24px] border ${
                    isRestored ? "border-emerald-100" : "border-amber-100"
                  }`}
                />

                {isRestored ? (
                  <CheckCircle2 className="relative h-11 w-11 text-emerald-500" />
                ) : (
                  <WifiOff className="relative h-11 w-11 text-amber-500" />
                )}
              </div>

              <div className="text-center">
                <h1 className="text-[28px] font-bold tracking-tight text-slate-900 sm:text-[34px]">
                  {isRestored
                    ? "You're back online."
                    : "We can't reach FlagsDev."}
                </h1>

                <p className="mx-auto mt-3 max-w-[390px] text-sm leading-7 text-slate-500 sm:text-[15px]">
                  {isRestored
                    ? "Your connection is working we're redirecting you to the homepage in a few seconds."
                    : "We couldn't establish a connection to our website. This may be caused by your internet connection or a temporary infrastructure issue."}
                </p>
              </div>

              {!isRestored && (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white">
                        <Clock className="h-4 w-4 text-slate-500" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Next automatic check
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          Checking every 3 minutes
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-[25px] font-bold tabular-nums tracking-tight text-slate-900">
                        {formatTime(secondsUntilCheck)}
                      </p>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        Minutes : Seconds
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-[width] duration-1000 ease-linear"
                      style={{
                        width: `${
                          (secondsUntilCheck / CHECK_INTERVAL_SECONDS) * 100
                        }%`,
                      }}
                    />
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                    <Activity className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                    {isChecking
                      ? "Testing connection to FlagsDev..."
                      : "Waiting for the next availability check."}
                  </div>
                </div>
              )}

              {!isRestored && (
                <div className="mt-8">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.13em] text-slate-400">
                    Possible causes
                  </p>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                        <Globe className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800">
                          Internet connection
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          Your Wi-Fi or mobile data may be disconnected or
                          unstable.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                        <Server className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800">
                          Temporary server issue
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          FlagsDev or its hosting infrastructure may be
                          temporarily unavailable.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                        <AlertTriangle className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800">
                          DNS or network routing
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          Your network provider or DNS service may be having
                          trouble reaching our domain.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={isChecking || isRestored}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`}
                  />
                  {isChecking ? "Checking..." : "Check connection"}
                </button>

                <Link
                  href="/"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Try homepage
                </Link>
              </div>

              {!isOnline && !isRestored && (
                <p className="mt-4 text-center text-xs text-slate-400">
                  Your browser reports that there is no network connection.
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50/80 px-5 py-4">
              <LockKeyhole className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              <p className="text-center text-[11px] text-slate-500">
                Privacy first by design. Your files stay on your device when
                processed locally.
              </p>
            </div>
          </section>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>FlagsDev · Free, open-source and privacy-first tools</span>
          </div>
        </div>
      </main>
    </>
  );
}
