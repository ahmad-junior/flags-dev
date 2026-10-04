import Link from "next/link";
import { BookOpen } from "lucide-react";

import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";

import Base64Tool from "@/features/privacy-security/components/encoding/base64/Base64Tool";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

export default function Page() {
  return (
    <>
      <SEO
        title="Base64 Encoder & Decoder Online - Free & Private | FlagsDev"
        description="Encode and decode text and files using Base64 directly in your browser. Fast, free, and privacy-first with local processing."
        keywords="Base64 encoder, Base64 decoder, Base64 encode, Base64 decode, Base64 file encoder, Base64 file decoder, Online Base64 tool, Free Base64 converter, Browser Base64 tool, Private Base64 encoder, FlagsDev"
        canonical={CANONICAL_PATHS.pSBase64}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Base64 Encoder & Decoder
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Encode and decode text or files using Base64 directly in your
                browser. Process your data locally without uploading it to a
                server.
              </p>
            </div>

            <Link
              href={PUBLIC_PATHS.base64Tool}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              <BookOpen className="h-4 w-4" />
              Base64 guide
            </Link>
          </div>
        </section>

        <Base64Tool />
      </div>

      <div className="mt-8">
        <AdsenseAd />
      </div>
    </>
  );
}
