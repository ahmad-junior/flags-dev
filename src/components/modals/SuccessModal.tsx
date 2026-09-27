"use client";

import { useEffect, useState } from "react";
import {
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  Heart,
  Lock,
  Share2,
  ShieldCheck,
  Sparkles,
  X,
  Copy,
} from "lucide-react";
import Link from "next/link";

import { STATIC_PATHS, SITE_URL } from "@/routes";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  title?: string;
  description?: string;
}

const SHARE_TEXT =
  "Just processed my files securely and privately with FlagsDev. No uploads required.";

const SHARE_URL = SITE_URL;

export default function SuccessModal({
  isOpen,
  onClose,
  onDownload,
  title = "Processed Successfully!",
  description = "Your files were processed 100% locally without uploading to any servers. Nothing was uploaded.",
}: SuccessModalProps) {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  if (!isOpen) return null;

  const handleShare = async () => {
    if (sharing) return;

    setSharing(true);

    try {
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
      ) {
        await navigator.share({
          title: "FlagsDev",
          text: SHARE_TEXT,
          url: SHARE_URL,
        });

        return;
      }

      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(SHARE_URL);
        setCopied(true);
        return;
      }

      const textArea = document.createElement("textarea");

      textArea.value = SHARE_URL;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";

      document.body.appendChild(textArea);

      textArea.select();

      const successful = document.execCommand("copy"); // Fallback for older browsers

      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Failed to share FlagsDev:", error);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-950/20 animate-in zoom-in-95 slide-in-from-bottom-2 duration-300"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-48 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-[-120px] h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute right-[-80px] top-[-80px] h-40 w-40 rounded-full bg-green-100/60 blur-3xl" />
          <div className="absolute left-[-80px] top-[-60px] h-40 w-40 rounded-full bg-teal-100/50 blur-3xl" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close success dialog"
          className="cursor-pointer group absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 shadow-sm backdrop-blur transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-900 hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          <X
            className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90"
            aria-hidden="true"
          />
        </button>

        <div className="relative px-6 pb-6 pt-8 sm:px-8 sm:pb-8">
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl"
                aria-hidden="true"
              />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-100 shadow-sm">
                <CheckCircle2
                  className="h-11 w-11 text-emerald-600"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-sm">
                  <Sparkles className="h-3 w-3 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              <Check
                className="h-3.5 w-3.5"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              Processing complete
            </span>
          </div>

          <div className="mt-4 text-center">
            <h2
              id="success-modal-title"
              className="text-2xl font-bold tracking-tight text-slate-950 sm:text-[26px]"
            >
              {title}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-emerald-900">
                    Private by design
                  </p>

                  <Lock
                    className="h-3 w-3 text-emerald-600"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-0.5 text-xs leading-5 text-emerald-800/80">
                  Your files stayed on your device throughout the entire
                  process.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onDownload}
            className="cursor-pointer group mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-lg active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <Download
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />

            <span>Download File Again</span>

            <ExternalLink
              className="ml-auto h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>

          <div className="mt-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Spread the word
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              onClick={handleShare}
              disabled={sharing}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 hover:shadow active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {copied ? (
                <Check
                  className="h-4 w-4 text-emerald-600"
                  aria-hidden="true"
                />
              ) : sharing ? (
                <Share2
                  className="h-4 w-4 animate-pulse text-slate-500"
                  aria-hidden="true"
                />
              ) : (
                <Copy
                  className="h-4 w-4 text-slate-500 transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
              )}

              <span>
                {copied
                  ? "Link Copied to Clipboard!"
                  : sharing
                    ? "Preparing Share..."
                    : "Share FlagsDev with Friends"}
              </span>
            </button>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50/70 to-pink-50/50 px-4 py-3.5 sm:flex-row">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-rose-100">
                  <Heart
                    className="h-4 w-4 fill-rose-500 text-rose-500"
                    aria-hidden="true"
                  />
                </div>

                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-800">
                    Support open source
                  </p>

                  <p className="text-[11px] text-slate-500">
                    Help keep FlagsDev free.
                  </p>
                </div>
              </div>

              <Link
                href={STATIC_PATHS.sponsor}
                onClick={onClose}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-2 text-[11px] font-semibold text-rose-700 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-800 hover:shadow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              >
                <Heart
                  className="h-3.5 w-3.5 fill-rose-500 text-rose-500"
                  aria-hidden="true"
                />
                Sponsor
              </Link>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
            <Lock className="h-3 w-3" aria-hidden="true" />

            <span>Privacy-first processing · No uploads · No tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
}
