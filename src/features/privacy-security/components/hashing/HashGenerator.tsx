"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  CheckCheck,
  Copy,
  FileText,
  Hash,
  RotateCcw,
  Type,
} from "lucide-react";
import { md5 } from "js-md5";
import { sha3_256 } from "js-sha3";

import {
  HASH_ALGORITHMS,
  HashAlgorithm,
  HashResult,
  SAMPLE_TEXTS,
  WEB_CRYPTO_ALGORITHMS,
  WebCryptoAlgorithm,
  EMPTY_RESULTS,
  HASH_DEBOUNCE_DELAY,
  COPY_RESET_DELAY,
  HashGeneratorProps,
} from "@/features/privacy-security/components/hashing/constants";
import { AppFile } from "@/components/file-picker/types";
import FilePicker from "@/components/file-picker/FilePicker";
import { ALL_FILE_PICKER } from "@/components/file-picker/presets";

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashWithWebCrypto(
  text: string,
  algorithm: WebCryptoAlgorithm,
): Promise<string> {
  const data = new TextEncoder().encode(text);

  const buffer = await crypto.subtle.digest(
    WEB_CRYPTO_ALGORITHMS[algorithm],
    data,
  );

  return bufferToHex(buffer);
}

async function generateHash(
  text: string,
  algorithm: HashAlgorithm,
): Promise<string> {
  switch (algorithm) {
    case "MD5":
      return md5(text);

    case "SHA-3-256":
      return sha3_256(text);

    case "SHA-1":
    case "SHA-256":
    case "SHA-384":
    case "SHA-512":
      return hashWithWebCrypto(text, algorithm);

    default:
      return "";
  }
}

async function generateFileHash(
  file: File,
  algorithm: HashAlgorithm,
): Promise<string> {
  const buffer = await file.arrayBuffer();

  switch (algorithm) {
    case "MD5":
      return md5(new Uint8Array(buffer));

    case "SHA-3-256":
      return sha3_256(new Uint8Array(buffer));

    case "SHA-1":
    case "SHA-256":
    case "SHA-384":
    case "SHA-512": {
      const hashBuffer = await crypto.subtle.digest(algorithm, buffer);

      return bufferToHex(hashBuffer);
    }

    default:
      return "";
  }
}

async function generateAllFileHashes(file: File): Promise<HashResult[]> {
  return Promise.all(
    HASH_ALGORITHMS.map(async (name) => ({
      name,
      value: await generateFileHash(file, name),
    })),
  );
}

async function generateAllHashes(text: string): Promise<HashResult[]> {
  if (!text) {
    return EMPTY_RESULTS;
  }

  return Promise.all(
    HASH_ALGORITHMS.map(async (name) => ({
      name,
      value: await generateHash(text, name),
    })),
  );
}

function formatHash(value: string, uppercase: boolean): string {
  return uppercase ? value.toUpperCase() : value.toLowerCase();
}

function getWordCount(text: string): number {
  const trimmed = text.trim();

  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export default function HashGenerator({
  inputType = "text",
}: HashGeneratorProps) {
  const [input, setInput] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [results, setResults] = useState<HashResult[]>(EMPTY_RESULTS);
  const [copiedKey, setCopiedKey] = useState<HashAlgorithm | "ALL" | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [files, setFiles] = useState<AppFile[]>([]);
  const selectedFile = files[0]?.file ?? null;
  const hasInput =
    inputType === "text" ? Boolean(input) : Boolean(selectedFile);

  const displayedResults = hasInput ? results : EMPTY_RESULTS;
  const displayedIsGenerating = Boolean(hasInput) && isGenerating;

  useEffect(() => {
    if (!hasInput) {
      return;
    }

    let cancelled = false;

    const timer = window.setTimeout(async () => {
      setIsGenerating(true);

      try {
        const hashes =
          inputType === "text"
            ? await generateAllHashes(input)
            : await generateAllFileHashes(selectedFile!);

        if (cancelled) {
          return;
        }

        setResults(
          hashes.map(({ name, value }) => ({
            name,
            value: formatHash(value, uppercase),
          })),
        );
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to generate hashes:", error);
          setResults(EMPTY_RESULTS);
        }
      } finally {
        if (!cancelled) {
          setIsGenerating(false);
        }
      }
    }, HASH_DEBOUNCE_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [inputType, input, selectedFile, uppercase, hasInput]);

  const wordCount = useMemo(() => getWordCount(input), [input]);
  const characterCount = input.length;
  const hasResults = displayedResults.some(({ value }) => value);

  const handleCopy = async (
    algorithm: HashAlgorithm,
    value: string,
  ): Promise<void> => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);

      setCopiedKey(algorithm);

      window.setTimeout(() => {
        setCopiedKey((current) => (current === algorithm ? null : current));
      }, COPY_RESET_DELAY);
    } catch (error) {
      console.error("Failed to copy hash:", error);
    }
  };

  const handleCopyAll = async (): Promise<void> => {
    if (!hasResults) {
      return;
    }

    const text = results
      .filter(({ value }) => value)
      .map(({ name, value }) => `${name}: ${value}`)
      .join("\n");

    try {
      await navigator.clipboard.writeText(text);

      setCopiedKey("ALL");

      window.setTimeout(() => {
        setCopiedKey((current) => (current === "ALL" ? null : current));
      }, COPY_RESET_DELAY);
    } catch (error) {
      console.error("Failed to copy hashes:", error);
    }
  };

  const handleClear = (): void => {
    setInput("");
    setCopiedKey(null);
    setResults(EMPTY_RESULTS);
    setIsGenerating(false);
  };

  const handleSample = (sample: string): void => {
    setInput(sample);
    setCopiedKey(null);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <header className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Cryptographic Hash Generator
        </h1>

        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3-256 hashes
          directly in your browser.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.4fr)] lg:gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-6">
          {inputType === "text" && (
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FileText className="size-4" />
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="source-text"
                    className="block text-sm font-bold text-slate-900"
                  >
                    Input Text
                  </label>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Enter or paste text to hash.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClear}
                disabled={!input}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw className="size-3.5" />
                <span>Clear</span>
              </button>
            </div>
          )}

          {inputType === "text" ? (
            <textarea
              id="source-text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type or paste your text here..."
              rows={9}
              spellCheck={false}
              aria-describedby="input-meta"
              className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          ) : (
            <FilePicker
              files={files}
              config={ALL_FILE_PICKER}
              onChange={setFiles}
            />
          )}

          <div
            id="input-meta"
            className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-400"
          >
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span
                className="size-2 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              Processed locally
            </span>

            <div className="flex items-center gap-2">
              <span>{wordCount} words</span>
              <span aria-hidden="true">•</span>
              <span>{characterCount} characters</span>
            </div>
          </div>

          {inputType === "text" && (
            <div className="mt-5 border-t border-slate-100 pt-5">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Try a sample
              </p>

              <div className="flex flex-wrap gap-2">
                {SAMPLE_TEXTS.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => handleSample(sample)}
                    title={sample}
                    className="max-w-full cursor-pointer truncate rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => setUppercase((value) => !value)}
              aria-pressed={uppercase}
              className={[
                "flex w-full cursor-pointer items-center justify-between rounded-xl border px-3.5 py-3 text-left transition",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
                uppercase
                  ? "border-indigo-200 bg-indigo-50"
                  : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white",
              ].join(" ")}
            >
              <span className="flex items-center gap-2.5">
                <Type
                  className={[
                    "size-4",
                    uppercase ? "text-indigo-600" : "text-slate-500",
                  ].join(" ")}
                />

                <span>
                  <span className="block text-xs font-bold text-slate-800">
                    Uppercase output
                  </span>

                  <span className="mt-0.5 block text-[11px] text-slate-500">
                    Display hexadecimal characters in A-F
                  </span>
                </span>
              </span>

              <span
                className={[
                  "relative h-5 w-9 shrink-0 rounded-full transition",
                  uppercase ? "bg-indigo-600" : "bg-slate-300",
                ].join(" ")}
                aria-hidden="true"
              >
                <span
                  className={[
                    "absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform",
                    uppercase ? "translate-x-4" : "translate-x-0.5",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </section>

        <section
          aria-live="polite"
          aria-busy={displayedIsGenerating}
          className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Hash className="size-4" />
              </div>

              <div className="min-w-0">
                <h2 className="text-sm font-bold text-slate-900">
                  Generated Hashes
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  {isGenerating
                    ? "Generating hashes..."
                    : "Select any result to copy it."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyAll}
              disabled={!hasResults || isGenerating}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copiedKey === "ALL" ? (
                <>
                  <CheckCheck className="size-3.5 text-emerald-600" />
                  <span className="hidden text-emerald-600 sm:inline">
                    Copied
                  </span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span className="hidden sm:inline">Copy All</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {displayedResults.map(({ name, value }) => {
              const isCopied = copiedKey === name;

              return (
                <article
                  key={name}
                  className={[
                    "min-w-0 rounded-2xl border p-3.5 transition",
                    isCopied
                      ? "border-emerald-200 bg-emerald-50/40"
                      : "border-slate-200 bg-slate-50 hover:border-indigo-200 hover:bg-white hover:shadow-sm",
                  ].join(" ")}
                >
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm">
                      {name}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(name, value)}
                      disabled={!value}
                      className={[
                        "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5",
                        "text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
                        isCopied
                          ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600",
                        "disabled:cursor-not-allowed disabled:opacity-40",
                      ].join(" ")}
                      aria-label={`Copy ${name} hash`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(name, value)}
                    disabled={!value}
                    title={value ? `Copy ${name} hash` : undefined}
                    className="block w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition hover:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-default"
                  >
                    <code
                      className={[
                        "block min-h-11 overflow-x-auto whitespace-nowrap px-3 py-3 font-mono text-[11px] leading-5 sm:text-xs",
                        value ? "text-slate-700" : "text-slate-300",
                      ].join(" ")}
                    >
                      {value ? value : `Waiting for ${inputType} input...`}
                    </code>
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5">
            <p className="text-xs leading-5 text-emerald-800">
              <strong>Your {`${inputType}`} stays in your browser.</strong>{" "}
              Hashes are generated locally. Your input is not uploaded to
              FlagsDev or sent to a server.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
