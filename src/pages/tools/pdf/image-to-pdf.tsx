import Link from "next/link";
import { BookOpen } from "lucide-react";

import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";

import ImageToPdfTool from "@/features/pdf/components/image-to-pdf/ImageToPdf";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

export default function Page() {
  return (
    <>
      <SEO
        title="Image to PDF Converter Online Free | FlagsDev"
        description="Convert JPG, PNG, and other images to PDF online for free directly in your browser. Combine images into a PDF with privacy-first local processing."
        keywords="Image to PDF, JPG to PDF, PNG to PDF, Convert image to PDF, Images to PDF, Photo to PDF, Image PDF converter, Free image to PDF converter, Online image to PDF, Private PDF converter, FlagsDev"
        canonical={CANONICAL_PATHS.pdfImageToPdf}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Image to PDF Converter
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Convert JPG, PNG, and other images into a PDF document directly
                in your browser. Combine multiple images and create your PDF
                with privacy-first local processing.
              </p>
            </div>

            <Link
              href={PUBLIC_PATHS.pdfHowToImageToPdf}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              <BookOpen className="h-4 w-4" />
              How to convert images to PDF
            </Link>
          </div>
        </section>

        <ImageToPdfTool />
      </div>

      <div className="mt-8">
        <AdsenseAd />
      </div>
    </>
  );
}
