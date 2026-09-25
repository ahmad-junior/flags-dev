import { BookOpen, Code2, Heart, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import { STATIC_PATHS } from "@/routes";
import ExternalLinkModal from "@/components/navigation/ExternalLinkModal";

export default function BlogPage() {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-slate-50/50 px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-green-100/60 to-emerald-50/20 blur-3xl"
      />

      <section className="relative w-full max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-green-100 bg-green-50 text-green-600 shadow-sm">
          <BookOpen className="h-8 w-8" />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-200/60 bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          Under Active Development
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          FlagsDev Blog
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600">
          We are crafting a space for practical insights on privacy-first
          software, client-side processing, and web engineering.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={STATIC_PATHS.sponsor}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-green-600/10 transition hover:bg-green-700"
          >
            <Heart className="h-4 w-4" />
            Sponsor FlagsDev
          </Link>

          <ExternalLinkModal
            href={STATIC_PATHS.gitHubRepo}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-md shadow-slate-900/5 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <Code2 className="h-4 w-4" />
            Contribute on GitHub
          </ExternalLinkModal>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <Share2 className="h-3.5 w-3.5" />
            Sharing FlagsDev also helps the project grow.
          </p>
        </div>
      </section>
    </main>
  );
}
