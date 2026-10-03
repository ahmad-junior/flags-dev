import Link from "next/link";
import { ArrowRight, BookOpen, Lock } from "lucide-react";
import { useRouter } from "next/router";

import SEO from "@/components/SEO";
import ToolLayout from "@/components/tool-layout/ToolLayout";
import AdsenseAd from "@/components/adds/AdsenseAd";

import { pdfTools } from "@/features/pdf/toolData";
import { pdfToolTabs } from "@/features/pdf/toolTabs";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

export default function Page() {
  const router = useRouter();

  const handleCardClick = (href: string) => {
    router.push(href);
  };

  const handleCardKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    href: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push(href);
    }
  };

  return (
    <>
      <SEO
        title="Free PDF Tools - Secure Browser-Based Suite"
        description="Free browser-based PDF tools to merge, split, compress, reorder, rotate, extract, protect, unlock, and convert PDF files. Privacy-first processing with no uploads whenever possible."
        keywords="PDF tools, Free PDF tools, Merge PDF, Split PDF, Compress PDF, Rotate PDF, Extract PDF pages, Protect PDF, Unlock PDF, PDF converter, Browser PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfTool}
      />

      <ToolLayout tool={pdfTools}>
        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl" />

          <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="mb-12">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Free Professional{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    PDF Tools
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Everything you need to master your PDF workflow entirely in
                  your browser. Blazing fast performance, zero friction
                  utilities, and absolute privacy by design.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pdfToolTabs.map((tool) => {
              const Icon = tool.icon;

              return (
                <article
                  key={tool.id}
                  role="link"
                  tabIndex={0}
                  onClick={() => handleCardClick(tool.href)}
                  onKeyDown={(event) => handleCardKeyDown(event, tool.href)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-1 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative rounded-[22px] bg-white p-6 transition-colors duration-300 group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-slate-50/50">
                    <div className="flex items-start justify-between">
                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-slate-700 shadow-sm transition-all duration-300 group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/30">
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-xs transition-all duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h2 className="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600">
                        {tool.label}
                      </h2>

                      {tool.description && (
                        <p className="mt-2.5 min-h-[48px] text-sm leading-relaxed text-slate-600">
                          {tool.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                      <Link
                        href={tool.href}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-indigo-600"
                      >
                        Launch tool
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 hover:translate-x-1" />
                      </Link>

                      {tool.help?.href && (
                        <Link
                          href={tool.help.href}
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100/80 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                        >
                          <BookOpen className="h-3 w-3" />
                          Docs
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="relative mt-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-indigo-400 ring-1 ring-white/20 backdrop-blur-md">
                  <Lock className="h-6 w-6" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold tracking-tight text-white">
                      Guaranteed Local Privacy
                    </h3>

                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                      Client Side
                    </span>
                  </div>

                  <p className="mt-1.5 max-w-xl text-justify text-sm leading-relaxed text-slate-300">
                    FlagsDev is engineered to process your confidential
                    documents directly in your browser sandbox, ensuring that
                    your files never leave your device. We prioritize your
                    privacy and security above all else.
                  </p>
                </div>
              </div>

              <Link
                href={PUBLIC_PATHS.privacy}
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-950 hover:shadow-lg"
              >
                <span>Read security policy</span>

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <AdsenseAd />
        </div>
      </ToolLayout>
    </>
  );
}
