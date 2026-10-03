import Link from "next/link";
import { BookOpen } from "lucide-react";

import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";

import MergePDFTool from "@/features/pdf/components/merge/MergePdf";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

export default function Page() {
  return (
    <>
      <SEO
        title="Merge PDF Online Free - Combine PDF Files | FlagsDev"
        description="Merge multiple PDF files into one document directly in your browser. Rearrange files, combine PDFs, and download the result with privacy-first local processing."
        keywords="Merge PDF, Merge PDF online, Combine PDF, Combine PDF files, Merge PDF files free, PDF merger, PDF combiner, Free PDF merger, Online PDF merger, Private PDF merger, FlagsDev, Flags Dev PDF tools"
        canonical={CANONICAL_PATHS.pdfMerge}
      />

      <div className="relative py-4 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Merge PDF Files
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Combine multiple PDF files into a single document. Arrange your
                files in the order you want, then merge them directly in your
                browser.
              </p>
            </div>

            <Link
              href={PUBLIC_PATHS.pdfHowToMerge}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              <BookOpen className="h-4 w-4" />
              How to merge PDFs
            </Link>
          </div>
        </section>

        <MergePDFTool />
      </div>

      <div className="mt-8">
        <AdsenseAd />
      </div>
    </>
  );
}
