"use client";

import {
  Check,
  Clipboard,
  Download,
  File as FileIcon,
  FileDown,
  FileText,
  RefreshCcw,
  RotateCcw,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

import {
  Base64Mode,
  InputType,
  BASE64_REGEX,
} from "@/features/privacy-security/components/encoding/base64/constants";
import { AppFile } from "@/components/file-picker/types";
import FilePicker from "@/components/file-picker/FilePicker";
import { ALL_FILE_PICKER } from "@/components/file-picker/presets";

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** index;
  return `${value.toFixed(index === 0 ? 0 : value < 10 ? 2 : 1)} ${units[index]}`;
}

function getExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop() || "" : "";
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = bytes.subarray(
      offset,
      Math.min(offset + chunkSize, bytes.length),
    );
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

function base64ToUint8Array(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function textToBase64(value: string): string {
  const bytes = new TextEncoder().encode(value);
  return arrayBufferToBase64(bytes.buffer);
}

function base64ToText(value: string): string {
  const bytes = base64ToUint8Array(value);
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function normalizeBase64(value: string): string {
  return value.replace(/\s+/g, "");
}

function isValidBase64(value: string): boolean {
  const normalized = normalizeBase64(value);
  if (!normalized) return true;
  if (normalized.length % 4 !== 0) return false;
  return BASE64_REGEX.test(normalized);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Base64Tool() {
  const [mode, setMode] = useState<Base64Mode>("encode");
  const [inputType, setInputType] = useState<InputType>("text");

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [files, setFiles] = useState<AppFile[]>([]);
  const [decodedFileName, setDecodedFileName] = useState("decoded-file");

  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isEncode = mode === "encode";

  const inputTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const incodeDecodeBtn = useRef<HTMLButtonElement | null>(null);

  const inputLabel = isEncode
    ? inputType === "text"
      ? "Text Input"
      : "File Input"
    : "Base64 Input";

  const outputLabel = isEncode
    ? "Base64 Output"
    : inputType === "text"
      ? "Decoded Text"
      : "Decoded File";

  const inputSize = useMemo(() => {
    if (inputType === "file" && files.length > 0) return files[0].size;
    return new TextEncoder().encode(input).byteLength;
  }, [input, inputType, files]);

  const outputSize = useMemo(() => {
    if (!output) return 0;
    if (isEncode) return new TextEncoder().encode(output).byteLength;
    try {
      return base64ToUint8Array(normalizeBase64(output)).byteLength;
    } catch {
      return 0;
    }
  }, [output, isEncode]);

  const hasInput =
    isEncode && inputType === "file" ? files.length > 0 : input.length > 0;

  const clearError = useCallback(() => setError(null), []);

  const reset = useCallback(() => {
    setInput("");
    setOutput("");
    setFiles([]);
    setError(null);
    setCopied(false);
    setDecodedFileName("decoded-file");
  }, []);

  const handleModeChange = useCallback(
    (nextMode: Base64Mode) => {
      if (nextMode === mode) return;
      setMode(nextMode);
      reset();
    },
    [mode, reset],
  );

  const handleInputTypeChange = useCallback(
    (nextType: InputType) => {
      if (nextType === inputType) return;
      setInputType(nextType);
      reset();
    },
    [inputType, reset],
  );

  const encode = useCallback(async () => {
    clearError();
    setCopied(false);

    if (!hasInput) {
      setError(
        inputType === "file"
          ? "Select a file to encode."
          : "Enter some text to encode.",
      );
      return;
    }

    setIsProcessing(true);
    try {
      let result: string;
      if (inputType === "file") {
        const targetFile = files[0];

        if (!targetFile) {
          throw new Error("No file selected.");
        }

        const buffer = await targetFile.file.arrayBuffer();

        setDecodedFileName(targetFile.name || "decoded-file");

        result = arrayBufferToBase64(buffer);
      } else {
        result = textToBase64(input);
      }
      setOutput(result);
    } catch {
      setError("Unable to encode the input. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [clearError, hasInput, input, inputType, files]);

  const decode = useCallback(() => {
    clearError();
    setCopied(false);

    const normalized = normalizeBase64(input);

    if (!normalized) {
      setError("Enter a Base64 value to decode.");
      return;
    }

    if (!isValidBase64(normalized)) {
      setError(
        "The input is not valid Base64. Check the characters and padding.",
      );
      return;
    }

    setIsProcessing(true);

    try {
      if (inputType === "text") {
        const decoded = base64ToText(normalized);
        setOutput(decoded);
        return;
      }

      const bytes = base64ToUint8Array(normalized);
      const fileBuffer = new ArrayBuffer(bytes.byteLength);
      new Uint8Array(fileBuffer).set(bytes);

      const fileName = decodedFileName || "decoded-file";
      const fileType = files[0]?.type || "application/octet-stream";

      const nativeFile = new File([fileBuffer], fileName, {
        type: fileType,
      });

      const appFile: AppFile = {
        id:
          typeof crypto !== "undefined" &&
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : Math.random().toString(36).slice(2),

        file: nativeFile,
        name: nativeFile.name,
        size: nativeFile.size,
        type: nativeFile.type,
        extension: getExtension(nativeFile.name),
      };

      setFiles([appFile]);
      setOutput(normalized);
    } catch {
      setOutput("");
      setFiles([]);

      setError(
        inputType === "text"
          ? "Unable to decode this value as UTF-8 text."
          : "Unable to create the decoded file.",
      );
    } finally {
      setIsProcessing(false);
    }
  }, [clearError, decodedFileName, files, input, inputType]);

  const handleProcess = useCallback(async () => {
    if (isEncode) {
      await encode();
    } else {
      decode();
    }
  }, [decode, encode, isEncode]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy the result.");
    }
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;

    try {
      if (isEncode) {
        const blob = new Blob([output], {
          type: "text/plain;charset=utf-8",
        });

        downloadBlob(blob, "encoded.base64");
        return;
      }

      const bytes = base64ToUint8Array(normalizeBase64(output));
      const fileBuffer = new ArrayBuffer(bytes.byteLength);
      new Uint8Array(fileBuffer).set(bytes);

      const fileType = files[0]?.type || "application/octet-stream";

      const blob = new Blob([fileBuffer], {
        type: fileType,
      });

      const filename = decodedFileName || "decoded-file";

      downloadBlob(blob, filename);
    } catch {
      setError("Unable to create the download file.");
    }
  }, [decodedFileName, isEncode, output, files]);

  const handleSwap = useCallback(() => {
    if (!output) return;

    setError(null);
    setCopied(false);

    if (isEncode) {
      setMode("decode");
      setInputType(inputType);
      setInput(output);
      setFiles([]);
      setOutput("");

      requestAnimationFrame(() => {
        inputTextareaRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        inputTextareaRef.current?.focus();
      });

      return;
    }

    setMode("encode");

    if (inputType === "text") {
      setInput(output);
      setInputType("text");
      setFiles([]);
    } else {
      try {
        const bytes = base64ToUint8Array(normalizeBase64(output));
        const fileBuffer = new ArrayBuffer(bytes.byteLength);
        new Uint8Array(fileBuffer).set(bytes);

        const nativeFile = new File(
          [fileBuffer],
          decodedFileName || "decoded-file",
          {
            type: "application/octet-stream",
          },
        );

        const appFile: AppFile = {
          id:
            typeof crypto !== "undefined" &&
            typeof crypto.randomUUID === "function"
              ? crypto.randomUUID()
              : Math.random().toString(36).slice(2),

          file: nativeFile,
          name: nativeFile.name,
          size: nativeFile.size,
          type: nativeFile.type,
          extension: getExtension(nativeFile.name),
        };

        setInputType("file");
        setFiles([appFile]);
        setInput("");
      } catch {
        setInputType("text");
        setInput(output);
        setFiles([]);
        setError("Unable to reconstruct the decoded file.");
      }
    }

    setOutput("");
  }, [decodedFileName, inputType, isEncode, output]);

  return (
    <section className="w-full rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-100">
      <div className="border-b border-slate-100 px-6 py-6 sm:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Base64 Studio
            </h2>
            <p className="text-sm text-slate-500">
              Lightning fast, private client side encoding & decoding.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={reset}
          disabled={!input && !output && files.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          Reset All
        </button>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Operation Mode
            </label>
            <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1.5 shadow-inner">
              <button
                type="button"
                onClick={() => handleModeChange("encode")}
                className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
                  isEncode
                    ? "bg-green-500 text-white shadow-sm cursor-not-allowed"
                    : "text-slate-500 hover:text-slate-700 cursor-pointer"
                }`}
              >
                Encode
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("decode")}
                className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
                  !isEncode
                    ? "bg-green-500 text-white shadow-sm cursor-not-allowed"
                    : "text-slate-500 hover:text-slate-700 cursor-pointer"
                }`}
              >
                Decode
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Input Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleInputTypeChange("text")}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                  inputType === "text"
                    ? "bg-yellow-500 text-white shadow-md shadow-indigo-100 cursor-not-allowed"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer"
                }`}
              >
                <FileText className="h-4 w-4" />
                Text
              </button>
              <button
                type="button"
                onClick={() => handleInputTypeChange("file")}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                  inputType === "file"
                    ? "bg-yellow-500 text-white shadow-md shadow-indigo-100 cursor-not-allowed"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer"
                }`}
              >
                <FileIcon className="h-4 w-4" />
                File
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="text-sm font-semibold text-slate-800">
              {inputLabel}
            </label>
            {inputSize > 0 && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {formatBytes(inputSize)}
              </span>
            )}
          </div>

          {isEncode && inputType === "file" ? (
            <FilePicker
              files={files}
              config={ALL_FILE_PICKER}
              onChange={(nextFiles) => {
                setFiles(nextFiles);
                setOutput("");
                clearError();
                if (nextFiles.length !== 0) {
                  requestAnimationFrame(() => {
                    incodeDecodeBtn.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });

                    incodeDecodeBtn.current?.focus();
                  });
                }
              }}
            />
          ) : (
            <textarea
              ref={inputTextareaRef}
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setOutput("");
                clearError();
              }}
              placeholder={
                isEncode
                  ? "Type or paste your text here..."
                  : "Paste Base64 payload here..."
              }
              spellCheck={false}
              className="min-h-[160px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm font-medium text-rose-700 shadow-sm"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            ref={incodeDecodeBtn}
            type="button"
            onClick={handleProcess}
            disabled={!hasInput || isProcessing}
            className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <RefreshCcw className="h-4 w-4 animate-spin" />
                Processing payload...
              </>
            ) : isEncode ? (
              <>
                <FileDown className="h-4 w-4" />
                Encode to Base64
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4" />
                Decode Base64
              </>
            )}
          </button>

          {output && (
            <button
              type="button"
              onClick={handleSwap}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99] cursor-pointer"
            >
              <RefreshCcw className="h-4 w-4" />
              Swap Input / Output
            </button>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="text-sm font-semibold text-slate-800">
              {outputLabel}
            </label>
            <div className="flex items-center gap-3">
              {outputSize > 0 && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {formatBytes(outputSize)}
                </span>
              )}
              {output && inputType === "text" && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-3.5 w-3.5" />
                      Copy Result
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {inputType === "file" && !isEncode && output ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
                  <FileDown className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {decodedFileName}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {formatBytes(outputSize)} ready for download
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 shadow-sm cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  Download File
                </button>
              </div>
            </div>
          ) : (
            <textarea
              value={output}
              readOnly
              placeholder="Your resulting output will appear here..."
              spellCheck={false}
              className="min-h-[160px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          )}

          {output && inputType === "text" && (
            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm cursor-pointer"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Clipboard className="h-4 w-4" />
                )}
                {copied ? "Copied to Clipboard" : "Copy Output"}
              </button>

              {isEncode && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  Download .base64 File
                </button>
              )}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-5 py-4">
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-900">
                100% Client-Side & Private
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-emerald-700">
                All transformations happen completely locally inside your
                browser runtime. No files or text strings are ever uploaded to
                an external server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
