import SEO from "@/components/SEO";
import ToolLayout from "@/components/tool-layout/ToolLayout";
import ToolCard from "@/components/tool-layout/ToolCard";
import ToolPrivacyBanner from "@/components/tool-layout/ToolPrivacyBanner";
import AdsenseAd from "@/components/adds/AdsenseAd";

import { pdfTools } from "@/features/pdf/toolData";
import { pdfToolTabs } from "@/features/pdf/toolTabs";
import { CANONICAL_PATHS } from "@/routes";

export default function Page() {
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
            {pdfToolTabs.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <ToolPrivacyBanner />
        </div>

        <div className="mt-8">
          <AdsenseAd />
        </div>
      </ToolLayout>
    </>
  );
}
