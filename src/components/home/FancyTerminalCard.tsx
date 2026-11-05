"use client";

import Link from "next/link";
import {
  ShieldCheck,
  LockKeyhole,
  Terminal,
  ArrowUpRight,
  Compass,
} from "lucide-react";

import { tools } from "@/constants/tools";
import { PUBLIC_PATHS } from "@/routes";
import ExternalLinkModal from "@/components/modals/ExternalLinkModal";

const toolCategoriesRef = tools.map((tool) => ({
  name: tool.category,
  href: `${PUBLIC_PATHS.tools}/${tool.slug}`,
  icon: tool.icon || null,
}));

export default function FancyTerminalCard({
  displayText = "Your files never leave your browser.",
  toolCategories = toolCategoriesRef,
}) {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-gradient-to-r from-emerald-400/15 via-teal-400/10 to-cyan-400/15 blur-2xl" />

      <div className="relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/90 shadow-[0_20px_70px_-25px_rgba(15,23,42,0.20)] backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_25px_80px_-25px_rgba(16,185,129,0.18)]">
        <div className="relative flex h-[52px] items-center justify-between border-b border-slate-200/70 bg-slate-50/70 px-4 sm:px-6">
          <div className="flex items-center gap-[7px]">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-sm" />
          </div>

          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap">
            <ShieldCheck
              size={16}
              strokeWidth={2.2}
              className="text-emerald-600"
            />
            <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-slate-700 sm:text-[11px]">
              FlagsDev Engineering
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-semibold tracking-wide text-emerald-700">
              SECURE
            </span>
          </div>
        </div>

        <div className="relative flex min-h-[190px] items-center gap-5 px-5 py-8 sm:gap-7 sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-2/3 bg-gradient-to-l from-emerald-50/50 to-transparent" />
          <div className="relative z-10 hidden shrink-0 sm:block">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[25px] border border-emerald-400/20 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-800 shadow-[0_12px_30px_-10px_rgba(16,185,129,0.55)] ring-4 ring-emerald-500/[0.06]">
              <Terminal size={38} strokeWidth={2} className="text-white" />
            </div>
          </div>

          <div className="hidden h-[105px] w-px shrink-0 bg-gradient-to-b from-transparent via-slate-200 to-transparent sm:block" />
          <div className="relative z-10 min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-2.5 py-1">
                <LockKeyhole size={11} className="text-emerald-600" />
                <span className="text-[10px] font-semibold tracking-wide text-emerald-700">
                  LOCAL PROCESSING
                </span>
              </span>
            </div>

            <div
              aria-live="polite"
              className="flex items-center font-mono text-base font-semibold leading-relaxed tracking-tight text-slate-800 sm:text-[21px]"
            >
              <span className="mr-2 shrink-0 text-emerald-600">$</span>
              <span className="break-words">{displayText}</span>
              <span
                aria-hidden="true"
                className="ml-1 inline-block h-5 w-[2px] shrink-0 animate-pulse bg-emerald-500"
              />
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
              No uploads. No tracking. Just tools that work in your browser.
            </p>
          </div>

          <div className="absolute right-5 top-5 hidden items-center gap-1.5 rounded-full border border-emerald-100 bg-white/80 px-3 py-1.5 shadow-sm sm:flex">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span className="text-[10px] font-semibold text-emerald-700">
              Private
            </span>
          </div>
        </div>

        {toolCategories.length > 0 && (
          <div className="relative border-t border-slate-200/70 bg-gradient-to-b from-slate-50/80 to-slate-100/60 px-4 py-4 sm:px-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                  <Compass size={24} className="text-emerald-600" />
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-700">
                    Explore tools
                  </p>
                  <p className="text-[12px] text-slate-400">
                    Everything you need, in one place
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-red-500">
                {toolCategories.length} CATEGORIES
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {toolCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="group flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/70 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-green-500 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-700">
                      <Icon size={16} strokeWidth={1.8} />
                    </div>

                    <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-slate-600 transition-colors group-hover:text-emerald-700">
                      {category.name}
                    </span>

                    <ArrowUpRight
                      size={13}
                      className="shrink-0 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-3">
              <ExternalLinkModal
                href="https://github.com/ahmad-junior"
                siteName="Muhammad Ahmad's GitHub profile"
                className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              >
                Made with ❤️ by Muhammad Ahmad
                <ArrowUpRight
                  size={13}
                  className="shrink-0 text-slate-900 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600"
                />
              </ExternalLinkModal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
