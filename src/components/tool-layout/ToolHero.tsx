import { ToolDefinition } from "@/components/tool-layout/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { STATIC_PATHS } from "@/routes";

interface Props {
  tool: ToolDefinition;
}

export default function ToolHero({ tool }: Props) {
  const Icon = tool.icon;

  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl items-start gap-5 px-6 py-10">
        <div className="relative flex flex-col gap-3">
          <div className="relative h-11">
            <Link
              href={STATIC_PATHS.tools}
              className="group absolute left-0 inline-flex h-11 w-11 items-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:w-40 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              </div>

              <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Back to Tools
              </span>
            </Link>
          </div>

          <div className="rounded-xl bg-green-500 text-3xl text-white">
            <Icon className="m-3" />
          </div>
        </div>

        <div>
          <h1 className="mt-1 text-4xl font-bold">{tool.title}</h1>
          <span className="text-sm font-medium text-blue-600">
            {tool.category}
          </span>

          <p className="mt-3 max-w-2xl text-slate-600 text-justify">
            {tool.description}
          </p>

          {tool.badges && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tool.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          <p className="mt-3 max-w-2xl text-slate-600 text-justify">
            Last Updated: {tool.lastUpdated}
          </p>
        </div>
      </div>
    </section>
  );
}
