import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { useRouter } from "next/router";

import { ToolTab } from "@/components/tool-layout/types";

interface ToolCardProps {
  tool: ToolTab;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const router = useRouter();
  const Icon = tool.icon;

  const hasHref = Boolean(tool.href);

  const handleCardClick = () => {
    if (!hasHref) return;

    router.push(tool.href);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();

    if (!hasHref) return;

    router.push(tool.href);
  };

  return (
    <article
      role={hasHref ? "link" : undefined}
      tabIndex={hasHref ? 0 : -1}
      aria-label={hasHref ? `Open ${tool.label}` : undefined}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-1 shadow-sm backdrop-blur-xl transition-all duration-300 ${
        hasHref
          ? "cursor-pointer hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
          : "cursor-default"
      }`}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative rounded-[22px] bg-white p-6 transition-colors duration-300 group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-slate-50/50">
        <div className="flex items-start justify-between">
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-slate-700 shadow-sm transition-all duration-300 group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/30">
            <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
          </div>

          {hasHref && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-all duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600">
            {tool.label}
          </h2>

          {tool.description && (
            <p className="mt-2.5 min-h-[48px] text-sm leading-relaxed text-slate-600">
              {tool.description}
            </p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          {hasHref ? (
            <Link
              href={tool.href}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-indigo-600"
            >
              Launch tool
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ) : (
            <span className="text-sm font-semibold text-slate-400">
              Coming soon
            </span>
          )}

          {tool.help?.href && (
            <Link
              href={tool.help.href}
              onClick={(event) => event.stopPropagation()}
              title={tool.help.label}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100/80 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
            >
              <BookOpen className="h-3 w-3" />
              Docs
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
