import Link from "next/link";
import { BookOpen } from "lucide-react";

import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";

import CompressPDFTool from "@/features/pdf/components/compress/CompressPdf";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

export default function Page() {
  return (
    <>
      <SEO
        title="Compress PDF Online Free - Reduce PDF Size | FlagsDev"
        description="Compress PDF files online for free directly in your browser. Reduce PDF file size while keeping your documents usable with privacy-first local processing."
        keywords="Compress PDF, Compress PDF online, Reduce PDF size, Compress PDF files, PDF compressor, PDF size reducer, Reduce PDF file size, Free PDF compressor, Online PDF compressor, Private PDF compressor, FlagsDev, Flags Dev PDF tools"
        canonical={CANONICAL_PATHS.pdfCompress}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Compress PDF Files
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Reduce the file size of your PDF documents while keeping them
                easy to use and share. Compress your files directly in your
                browser with privacy-first local processing.
              </p>
            </div>

            <Link
              href={PUBLIC_PATHS.pdfHowToCompress}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              <BookOpen className="h-4 w-4" />
              How to compress PDFs
            </Link>
          </div>
        </section>

        <CompressPDFTool />
      </div>

      <div className="mt-8">
        <AdsenseAd />
      </div>
    </>
  );
}
