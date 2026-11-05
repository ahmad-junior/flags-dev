"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  LockKeyhole,
  GitBranch,
  Globe2,
  Gift,
  ShieldCheck,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { STATIC_PATHS } from "@/routes";
import ExternalLinkModal from "@/components/modals/ExternalLinkModal";
import FancyTerminalCard from "@/components/home/FancyTerminalCard";

const features = [
  {
    icon: LockKeyhole,
    label: "Privacy first",
  },
  {
    icon: GitBranch,
    label: "Open source",
  },
  {
    icon: Globe2,
    label: "Browser powered",
  },
  {
    icon: Gift,
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
    let delay = isDeleting ? 30 : 55;

    if (!isDeleting && displayText === currentWord) {
      delay = 2000;
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
    <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-[#fbfcfe] text-slate-900 min-h-[100dvh] flex flex-col items-center justify-center">
      {/* Background Gradients & Mesh Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,1)_0%,rgba(248,250,252,0.95)_65%,rgba(241,245,249,0.8)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-72 left-1/2 -z-10 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-blue-400/[0.07] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-[35%] -z-10 h-[400px] w-[400px] rounded-full bg-violet-400/[0.06] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-[45%] -z-10 h-[350px] w-[350px] rounded-full bg-emerald-400/[0.07] blur-[110px]"
      />

      {/* Main Container */}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6 lg:px-8">
        <div className="flex flex-col items-center text-center lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:items-start lg:text-left">
          <h1 className="text-[40px] font-semibold leading-[1.08] tracking-[-0.055em] text-slate-900 sm:text-5xl md:text-6xl lg:text-[64px]">
            <span className="block">Your files never</span>
            <span className="mt-1 block bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text pb-2 text-transparent">
              leave your device.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
            Powerful everyday tools, built to work directly in your browser.
            <span className="hidden sm:inline">
              {" "}
              No uploads, no accounts, and no unnecessary tracking.
            </span>
            <span className="sm:hidden">
              {" "}
              No uploads. No accounts. No tracking.
            </span>
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:justify-end">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-emerald-500/20 opacity-70 blur-xl" />

          <div className="relative w-full">
            <FancyTerminalCard displayText={displayText} />
          </div>
        </div>

        <div className="flex flex-col items-center text-center lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:items-start lg:text-left">
          <div className="flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row lg:justify-start">
            <Link
              href={STATIC_PATHS.tools}
              className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full bg-[#0878e8] px-8 text-sm font-semibold text-white shadow-[0_5px_18px_-5px_rgba(0,113,227,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0066cc] hover:shadow-[0_9px_25px_-5px_rgba(0,113,227,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Explore all tools
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <ExternalLinkModal
              href={STATIC_PATHS.gitHubRepo}
              siteName="GitHub repository"
              className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white/80 px-8 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 sm:w-auto"
            >
              <FaGithub
                size={17}
                className="transition-transform duration-200 group-hover:rotate-[-8deg]"
              />
              View on GitHub
            </ExternalLinkModal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:justify-start">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/75 px-3.5 py-2 shadow-[0_2px_8px_rgba(15,23,42,0.025)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md"
              >
                <Icon
                  size={13}
                  strokeWidth={1.8}
                  className="text-emerald-600 transition-transform duration-200 group-hover:scale-110"
                />
                <span className="text-[11px] font-semibold text-slate-600 sm:text-xs">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-3 mb-6 flex items-center justify-center gap-2 text-center lg:justify-start">
          <ShieldCheck size={15} className="shrink-0 text-emerald-600/80" />
          <p className="text-[11px] leading-6 text-slate-400 sm:text-xs">
            Free open-source, and powered by your browser.
          </p>
        </div>
      </div>
    </section>
  );
}
