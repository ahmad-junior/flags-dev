import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { DocsHeaderProps } from "@/components/docs/types";
import { STATIC_PATHS } from "@/routes";

export default function DocsHeader({
  title,
  description,
  updatedAt,
  readTime,
  toolUrl,
}: DocsHeaderProps) {
  return (
    <header className="border-b border-slate-200 pb-10">
      <div className="mb-6">
        <Link
          href={STATIC_PATHS.docs}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all guides
        </Link>
      </div>

      <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
        {title}
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        {description}
      </p>

      {(updatedAt || readTime) && (
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
          {updatedAt && <span>Updated {updatedAt}</span>}

          {readTime && (
            <>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{readTime}</span>
            </>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href={toolUrl}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 shadow-sm"
        >
          Try it now
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href={STATIC_PATHS.docs}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 shadow-xs"
        >
          Docs
        </Link>
      </div>
    </header>
  );
}