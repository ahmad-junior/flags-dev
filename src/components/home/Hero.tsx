"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaGithub,
  FaLock,
  FaCodeBranch,
  FaGlobe,
  FaGift,
} from "react-icons/fa";

import { STATIC_PATHS } from "@/routes";
import ExternalLinkModal from "@/components/navigation/ExternalLinkModal";

const features = [
  {
    icon: FaLock,
    label: "Privacy first",
  },
  {
    icon: FaCodeBranch,
    label: "Open source",
  },
  {
    icon: FaGlobe,
    label: "Browser powered",
  },
  {
    icon: FaGift,
    label: "Free forever",
  },
];

const typingWords = [
  "Your files stay on your device.",
  "Nothing gets uploaded.",
  "No account is required.",
  "No tracking or analytics.",
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typingWords[wordIndex];

    let delay = isDeleting ? 35 : 60;

    if (!isDeleting && displayText === currentWord) {
      delay = 1800;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentWord.slice(0, displayText.length + 1);

        setDisplayText(nextText);

        if (nextText === currentWord) {
          setIsDeleting(true);
        }
      } else {
        const nextText = currentWord.slice(0, displayText.length - 1);

        setDisplayText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setWordIndex((current) => (current + 1) % typingWords.length);
        }
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section className="relative isolate overflow-hidden border-b border-black/[0.06] bg-[#fbfbfd] text-[#1d1d1f] selection:bg-blue-100">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,1)_0%,rgba(245,245,247,1)_75%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-18rem] -z-10 h-[38rem] w-[70rem] -translate-x-1/2 rounded-full bg-blue-400/[0.06] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-1/3 -z-10 h-[25rem] w-[25rem] rounded-full bg-violet-400/[0.05] blur-[120px]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-10 text-center">
        <h1 className="max-w-5xl text-5xl font-semibold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f] sm:text-6xl md:text-7xl lg:text-[78px]">
          Powerful browser tools.
          <span className="mt-2 block bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text pb-1 text-transparent">
            Your files never leave your device.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#515154] sm:text-xl">
          Everything runs directly in your browser.
          <br className="hidden sm:block" />
          No uploads, no accounts, and no tracking.
        </p>

        <div className="mt-9 w-full max-w-2xl">
          <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white/80 text-left shadow-[0_12px_40px_rgb(0,0,0,0.06)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_16px_50px_rgb(0,0,0,0.09)]">
            <div className="flex h-11 items-center border-b border-black/[0.05] bg-black/[0.018] px-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>

              <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-[11px] font-medium text-[#86868b]">
                <FaLock className="text-[9px]" />
                FlagsDev Engineering
              </div>
            </div>

            <div className="flex min-h-[72px] items-center px-5 py-4 sm:px-6">
              <div className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                <FaLock className="text-xs text-emerald-600" />
              </div>

              <div className="min-w-0">
                <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
                  Local processing
                </div>

                <div
                  aria-live="polite"
                  className="font-mono text-xs text-[#1d1d1f] sm:text-sm"
                >
                  {displayText}
                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] animate-pulse bg-blue-500"
                  />
                </div>
              </div>

              <div className="ml-auto hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Private
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href={STATIC_PATHS.tools}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0071e3] px-7 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0077ed] hover:shadow-md sm:w-auto"
          >
            Explore tools
            <FaArrowRight className="text-[11px] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <ExternalLinkModal
            href={STATIC_PATHS.gitHubRepo}
            siteName="GitHub repository"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-black/[0.045] px-7 py-3 text-sm font-medium text-[#1d1d1f] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.08] sm:w-auto"
          >
            <FaGithub className="text-base" />
            View on GitHub
          </ExternalLinkModal>
        </div>

        <div className="mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-2.5">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.05] bg-white px-3.5 py-2 text-xs font-medium text-[#515154] shadow-sm"
              >
                <Icon className="text-[11px] text-[#86868b]" />
                {item.label}
              </div>
            );
          })}
        </div>

        <p className="mt-8 max-w-xl text-xs leading-6 text-[#86868b] sm:text-sm">
          Built with modern web technologies to keep your files on your device
          while giving you powerful tools without unnecessary accounts or
          services.
        </p>
      </div>
    </section>
  );
}
