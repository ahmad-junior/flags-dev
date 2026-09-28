import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Wrench, Sparkles } from "lucide-react";
import { ToolDefinition } from "../tool-layout/types";
import { STATIC_PATHS } from "@/routes";

interface ToolCardProps {
  tool: ToolDefinition & { underConstruction?: boolean };
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  const isUnderConstruction = tool.underConstruction;

  const cardContent = (
    <div
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300",
        isUnderConstruction
          ? "border-amber-200/60 bg-gradient-to-b from-amber-50/20 via-white to-white hover:border-amber-300 hover:shadow-md cursor-pointer"
          : "border-slate-200/80 bg-white hover:-translate-y-1 hover:border-blue-300/80 hover:shadow-xl hover:shadow-blue-500/5",
      )}
    >
      {!isUnderConstruction && (
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl transition-all group-hover:scale-150 group-hover:bg-blue-500/10" />
      )}

      <div className="mb-5 flex items-center justify-between">
        <div
          className={clsx(
            "rounded-xl p-3 transition-transform duration-300 group-hover:scale-105",
            isUnderConstruction
              ? "bg-amber-50 text-amber-600"
              : "bg-blue-50 text-blue-600",
          )}
        >
          <Icon className="h-6 w-6" />
        </div>

        {isUnderConstruction ? (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-800 backdrop-blur-xs border border-amber-200">
            <Wrench className="h-3 w-3 animate-pulse" />
            <span>Coming Soon</span>
          </div>
        ) : (
          <div className="rounded-full bg-slate-50 p-2 text-slate-400 transition-all duration-300 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </div>

      <h2 className="text-lg font-bold text-slate-900 tracking-tight transition-colors group-hover:text-blue-600">
        {tool.title}
      </h2>

      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 text-justify">
        {tool.description}
      </p>

      {tool.badges && tool.badges.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {tool.badges.map((badge) => (
            <span
              key={badge}
              className={clsx(
                "rounded-md px-2.5 py-1 text-xs font-medium tracking-wide",
                isUnderConstruction
                  ? "bg-amber-50 text-amber-700 border border-amber-200/50"
                  : "bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors",
              )}
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-400">
        <span>Updated {tool.lastUpdated}</span>
        {isUnderConstruction && (
          <span className="text-amber-600 flex items-center gap-1 font-semibold">
            <Sparkles className="h-3 w-3" /> In Development
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Link href={`${STATIC_PATHS.tools}/${tool.slug}`} className="h-full block">
      {cardContent}
    </Link>
  );
}
