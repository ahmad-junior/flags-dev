import { ToolDefinition } from "@/components/tool-layout/types";

interface Props {
  tool: ToolDefinition;
}

export default function ToolHero({ tool }: Props) {
  const Icon = tool.icon;

  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl items-start gap-5 px-6 py-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Icon />
        </div>

        <div>
          <span className="text-sm font-medium text-blue-600">
            {tool.category}
          </span>

          <h1 className="mt-1 text-4xl font-bold">{tool.title}</h1>

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
