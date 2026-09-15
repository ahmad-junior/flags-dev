import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DocsHeaderProps } from "@/components/docs/types";

export default function DocsHeader({
  title,
  description,
  updatedAt,
  readTime,
  toolUrl,
}: DocsHeaderProps) {
  return (
    <header className="border-b border-slate-200 pb-10">
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

      <div className="mt-8">
        <Link
          href={toolUrl}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Try it now
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
