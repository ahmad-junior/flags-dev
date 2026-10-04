import Link from "next/link";
import { BookOpen } from "lucide-react";

import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";

import RotatePDFTool from "@/features/pdf/components/rotate/RotatePdf";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

export default function Page() {
  return (
    <>
      <SEO
        title="Rotate PDF Pages Online Free | FlagsDev"
        description="Rotate PDF pages online for free directly in your browser. Rotate individual pages or your entire PDF and download the result with privacy-first local processing."
        keywords="Rotate PDF, Rotate PDF pages, Rotate PDF online, Rotate PDF files, Turn PDF pages, PDF page rotator, Free PDF rotator, Online PDF rotator, Private PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfRotate}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Rotate PDF Pages
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Rotate individual pages or your entire PDF to the correct
                orientation. Make your changes directly in your browser with
                privacy-first local processing.
              </p>
            </div>

            <Link
              href={PUBLIC_PATHS.pdfHowToRotate}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              <BookOpen className="h-4 w-4" />
              How to rotate PDFs
            </Link>
          </div>
        </section>

        <RotatePDFTool />
      </div>

      <div className="mt-8">
        <AdsenseAd />
      </div>
    </>
  );
}
