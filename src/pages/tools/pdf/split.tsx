import Link from "next/link";
import { BookOpen } from "lucide-react";

import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";

import SplitPDFTool from "@/features/pdf/components/split/SplitPdf";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

export default function Page() {
  return (
    <>
      <SEO
        title="Split PDF Online Free - Split PDF Files | FlagsDev"
        description="Split PDF files online for free directly in your browser. Extract selected pages or divide a PDF into separate documents with privacy-first local processing."
        keywords="Split PDF, Split PDF online, Split PDF files, Split PDF free, PDF splitter, Extract PDF pages, Separate PDF pages, Divide PDF, Free PDF splitter, Online PDF splitter, Private PDF splitter, FlagsDev, Flags Dev PDF tools"
        canonical={CANONICAL_PATHS.pdfSplit}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Split PDF Files
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Split a PDF into separate documents or extract the pages you
                need. Select your pages, create your files, and download them
                directly from your browser.
              </p>
            </div>

            <Link
              href={PUBLIC_PATHS.pdfHowToSplit}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              <BookOpen className="h-4 w-4" />
              How to split PDFs
            </Link>
          </div>
        </section>

        <SplitPDFTool />
      </div>

      <div className="mt-8">
        <AdsenseAd />
      </div>
    </>
  );
}
