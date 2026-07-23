import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { ToolDefinition } from "../tool-layout/types";

interface ToolCardProps {
  tool: ToolDefinition;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={clsx(
        "group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200",
        "hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg",
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-xl bg-blue-50 p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>

        <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
      </div>

      <h2 className="text-lg font-semibold text-slate-900">{tool.title}</h2>

      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 text-justify">
        {tool.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tool.badges?.map((badge) => (
          <span
            key={badge}
            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
          >
            {badge}
          </span>
        ))}
      </div>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 text-justify">
        Last Updated: {tool.lastUpdated}
      </p>
    </Link>
  );
}
