import Link from "next/link";
import { BookOpen } from "lucide-react";

import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";

import HashGenerator from "@/features/privacy-security/components/hashing/HashGenerator";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

export default function Page() {
  return (
    <>
      <SEO
        title="Text Hash Generator - MD5, SHA-1, SHA-256 & More | FlagsDev"
        description="Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3 hashes from text directly in your browser. Fast, private, and processed locally."
        keywords="Text hash generator, Hash generator, MD5 generator, SHA-1 generator, SHA-256 generator, SHA-384, SHA-512, SHA-3, Online hash generator, Free hash generator, Browser hash generator, Privacy hash tool, FlagsDev"
        canonical={CANONICAL_PATHS.pSText}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Text Hash Generator
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Generate cryptographic hashes from text using MD5, SHA-1,
                SHA-256, SHA-384, SHA-512, and SHA-3. Everything is processed
                directly in your browser without uploading your text.
              </p>
            </div>

            <Link
              href={PUBLIC_PATHS.hashingToolText}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              <BookOpen className="h-4 w-4" />
              Hashing guide
            </Link>
          </div>
        </section>

        <HashGenerator inputType="text" />
      </div>

      <div className="mt-8">
        <AdsenseAd />
      </div>
    </>
  );
}
