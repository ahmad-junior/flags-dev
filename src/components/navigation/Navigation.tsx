"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  ChevronRight,
  Heart,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PUBLIC_PATHS, STATIC_PATHS } from "@/routes";
import ExternalLinkModal from "@/components/navigation/ExternalLinkModal";
import { tools } from "@/constants/tools";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  // Prevent body scroll
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={PUBLIC_PATHS.home}
          className="group flex items-center gap-2.5 focus:outline-none"
          onClick={() => setMobileOpen(false)}
        >
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Flags<span className="text-green-600">Dev</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setToolsOpen((value) => !value)}
              className={`group flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                toolsOpen
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>Tools</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  toolsOpen ? "rotate-180 text-slate-700" : ""
                }`}
              />
            </button>

            {toolsOpen && (
              <>
                <button
                  aria-label="Close tools menu"
                  className="fixed inset-0 -z-10 h-full w-full cursor-default"
                  onClick={() => setToolsOpen(false)}
                />

                <div className="absolute left-0 top-full mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-2xl shadow-slate-900/10 animate-in fade-in zoom-in-95 duration-150">
                  <Link
                    href={PUBLIC_PATHS.tools}
                    onClick={() => setToolsOpen(false)}
                    className="group mb-1 flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-green-50/60 hover:text-green-700"
                  >
                    <span>Explore All Tools</span>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-green-600" />
                  </Link>

                  <div className="my-1.5 border-t border-slate-100" />

                  <div className="max-h-[320px] overflow-y-auto space-y-0.5 pr-1">
                    {tools.map((tool) => (
                      <Link
                        key={tool.title}
                        href={`${PUBLIC_PATHS.tools}/${tool.slug}`}
                        onClick={() => setToolsOpen(false)}
                        className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-150 hover:bg-slate-50"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-800 group-hover:text-green-700 transition-colors">
                            {tool.title}
                          </span>
                          {tool.description && (
                            <span className="text-xs text-slate-400 line-clamp-1">
                              {tool.description}
                            </span>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <Link
            href="/docs"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            Docs
          </Link>
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <ExternalLinkModal
            href={STATIC_PATHS.gitHubRepo}
            siteName="GitHub repository"
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md active:translate-y-0"
          >
            <FaGithub className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span>GitHub</span>
          </ExternalLinkModal>

          <Link
            href="/sponsor"
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-100 hover:text-rose-800 hover:shadow-md active:translate-y-0"
          >
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500 transition-transform duration-200 group-hover:scale-110" />
            <span>Sponsor</span>
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <div className="space-y-1.5">
              <div>
                <button
                  type="button"
                  onClick={() => setToolsOpen((value) => !value)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  <span>Tools</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      toolsOpen ? "rotate-180 text-slate-700" : ""
                    }`}
                  />
                </button>

                {toolsOpen && (
                  <div className="my-1 ml-4 space-y-1 border-l-2 border-slate-100 pl-3">
                    <Link
                      href="/tools"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
                    >
                      All Tools
                    </Link>
                    {tools.map((tool) => (
                      <Link
                        key={tool.title}
                        href={`${PUBLIC_PATHS.tools}/${tool.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/docs"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Docs
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6">
              <ExternalLinkModal
                href={STATIC_PATHS.gitHubRepo}
                siteName="GitHub repository"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md active:scale-[0.98]"
              >
                <FaGithub className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                <span>GitHub</span>
              </ExternalLinkModal>

              <Link
                href="/sponsor"
                onClick={() => setMobileOpen(false)}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-100 hover:text-rose-800 hover:shadow-md active:scale-[0.98]"
              >
                <Heart className="h-4 w-4 fill-rose-500 text-rose-500 transition-transform duration-200 group-hover:scale-110" />
                <span>Sponsor</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
