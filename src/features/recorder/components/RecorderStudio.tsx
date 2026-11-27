import { useCallback, useEffect, useState } from "react";
import {
  Mic,
  Settings2,
  FileVideo,
  Circle,
  ChevronDown,
  Check,
  Loader2,
} from "lucide-react";

import {
  CheckStatus,
  RecordingSource,
  DeviceId,
} from "@/features/recorder/types";
import PermissionHelp from "@/features/recorder/components/PermissionHelp";

import { useOutputFormats } from "@/features/recorder/hooks/useOutputFormats";
import { useQualityOptions } from "@/features/recorder/hooks/useQualityOptions";

import {
  recordingSourceCards,
  defaultSettings,
  audioOptions,
  advancedFPSOptions,
  OutputFormat,
  Quality,
} from "@/features/recorder/constants";

import {
  ensureDevicePermission,
  getPermissionStatus,
} from "@/features/recorder/lib/permissions";

export default function RecorderStudio() {
  const formatOptions = useOutputFormats();

  const [sources, setSources] = useState<RecordingSource[]>(
    defaultSettings.sources,
  );

  const qualityOptions = useQualityOptions();
  const [quality, setQuality] = useState<Quality>(
    defaultSettings.quality as Quality,
  );

  const [fps, setFps] = useState(defaultSettings.fps);
  const [audio, setAudio] = useState(defaultSettings.audio);
  const [format, setFormat] = useState<OutputFormat>(
    defaultSettings.format as OutputFormat,
  );
  const [advanced, setAdvanced] = useState(defaultSettings.advanced);
  const [notice, setNotice] = useState(defaultSettings.notice);

  const [pending, setPending] = useState<RecordingSource | null>(null);

  const activeFormat =
    formatOptions.find((o) => o.value === format)?.value ??
    formatOptions[0]?.value;

  const activePreset =
    qualityOptions.find((o) => o.value === quality) ?? qualityOptions[0];

  useEffect(() => {
    const verifyDefaults = async () => {
      for (const id of ["microphone", "camera"] as const) {
        if ((await getPermissionStatus(id)) !== "ready") {
          setSources((current) => current.filter((item) => item !== id));
        }
      }
    };

    void verifyDefaults();
  }, []);

  const [help, setHelp] = useState<{
    device: DeviceId;
    status: CheckStatus;
    attempts: number;
  } | null>(null);

  const selectDevice = useCallback((device: DeviceId) => {
    setSources((current) =>
      current.includes(device) ? current : [...current, device],
    );
    setHelp(null);
  }, []);

  const closeHelp = useCallback(() => setHelp(null), []);

  const requestSource = async (device: DeviceId) => {
    setPending(device);
    const status = await ensureDevicePermission(device);
    setPending(null);

    if (status === "ready") {
      selectDevice(device);
      return;
    }

    setHelp((current) => ({
      device,
      status,
      attempts: current?.device === device ? current.attempts + 1 : 1,
    }));
  };

  const toggleSource = (source: RecordingSource) => {
    setNotice("");

    if (sources.includes(source)) {
      setSources((current) => current.filter((item) => item !== source));
    } else if (source === "screen") {
      setSources((current) => [...current, source]);
    } else {
      void requestSource(source);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-3xl bg-white shadow-sm sm:p-8">
          <div className="relative">
            <div className="mb-8 flex items-center gap-5">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Recording Studio
                </h1>
                <p className="mt-2 text-sm text-slate-500 sm:text-lg">
                  Everything ready for your next recording?
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recordingSourceCards.map((source) => {
                const Icon = source.icon;
                const selected = sources.includes(source.id);
                const waiting = pending === source.id;

                return (
                  <button
                    key={source.id}
                    type="button"
                    onClick={() => toggleSource(source.id)}
                    disabled={pending !== null && source.id !== "screen"}
                    aria-pressed={selected}
                    aria-busy={waiting}
                    className={`relative flex min-h-48 flex-col items-center justify-center rounded-2xl border-2 p-5 text-center transition-all disabled:cursor-wait ${
                      selected
                        ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border ${
                        selected
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-slate-300 text-transparent"
                      }`}
                    >
                      {waiting ? (
                        <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                      ) : (
                        selected && <Check className="h-4 w-4" />
                      )}
                    </span>

                    <Icon
                      className={`mb-4 h-12 w-12 ${
                        selected ? "text-indigo-600" : "text-slate-500"
                      }`}
                    />

                    <span className="text-xl font-bold text-slate-900">
                      {source.title}
                    </span>

                    <span className="mt-2 max-w-48 text-sm leading-relaxed text-slate-500">
                      {waiting
                        ? "Waiting for permission..."
                        : source.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <Settings2 className="h-7 w-7 text-slate-700" />
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Recording Settings
                    </h2>
                    <p className="text-sm text-slate-500">
                      Customize your recording preferences
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAdvanced(!advanced)}
                  aria-expanded={advanced}
                  className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Advanced Settings
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      advanced ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
                <label className="block">
                  <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-xs text-white">
                      HD
                    </span>
                    Quality
                  </span>

                  <select
                    value={activePreset.value}
                    onChange={(e) => setQuality(e.target.value as Quality)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    {qualityOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Mic className="h-5 w-5 text-indigo-600" />
                    Audio
                  </span>

                  <select
                    value={audio}
                    onChange={(e) => setAudio(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    {audioOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block sm:col-span-2 lg:col-span-1">
                  <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <FileVideo className="h-5 w-5 text-indigo-600" />
                    Format
                  </span>

                  <select
                    value={activeFormat ?? ""}
                    onChange={(e) => setFormat(e.target.value as OutputFormat)}
                    disabled={formatOptions.length === 0}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {formatOptions.length === 0 && (
                      <option value="">No supported format</option>
                    )}
                    {formatOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {advanced && (
                <div className="grid gap-5 border-t border-slate-200 bg-slate-50/60 p-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Frame Rate
                    </span>
                    <select
                      value={fps}
                      onChange={(e) => setFps(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                    >
                      {advancedFPSOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="flex items-center rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-800">
                    Actual resolution and frame rate depend on browser and
                    capture source support.
                  </div>
                </div>
              )}
            </section>

            <div className="mt-6">
              <button
                type="button"
                disabled={
                  !sources.includes("screen") ||
                  !activeFormat ||
                  pending !== null
                }
                onClick={() =>
                  setNotice(
                    "Recording engine will be connected in the next implementation phase.",
                  )
                }
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 text-lg font-bold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Circle className="h-5 w-5 fill-white" />
                Start Recording
              </button>

              <p className="mt-3 text-center text-sm text-slate-500">
                Your browser will ask what you want to share.
              </p>

              {notice && (
                <p
                  role="status"
                  className="mt-3 text-center text-sm text-indigo-600"
                >
                  {notice}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      {help && (
        <PermissionHelp
          device={help.device}
          status={help.status}
          attempts={help.attempts}
          busy={pending !== null}
          onRetry={() => void requestSource(help.device)}
          onGranted={selectDevice}
          onClose={closeHelp}
        />
      )}
    </main>
  );
}
