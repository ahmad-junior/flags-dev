import { ReactNode } from "react";
import { ToolDefinition } from "@/components/tool-layout/types";
import ToolHero from "@/components/tool-layout/ToolHero";
import ToolSection from "@/components/tool-layout/ToolSection";
import ToolDevelopers from "@/components/tool-layout/ToolDevelopers";

interface ToolLayoutProps {
  tool: ToolDefinition;
  children: ReactNode;
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <ToolHero tool={tool} />

      {/* Actual Tool Workspace */}
      <section className="mx-auto max-w-7xl px-6 py-10">{children}</section>

      {tool.features && (
        <ToolSection title="Features">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tool.features.map((feature) => (
              <div key={feature.title} className="rounded-xl bg-white p-6">
                <h3 className="font-semibold">{feature.title}</h3>

                <p className="mt-2 text-sm text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </ToolSection>
      )}

      {tool.faqs && (
        <ToolSection title="Frequently Asked Questions">
          <div className="space-y-5">
            {tool.faqs.map((faq) => (
              <div
                key={faq.question}
                className="border-b bg-white p-6 border-blue-500"
              >
                <h3 className="font-semibold">{faq.question}</h3>

                <p className="mt-2 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </ToolSection>
      )}

      {tool.openSource && (
        <ToolSection title="Open Source">
          <ToolDevelopers tool={tool} />
        </ToolSection>
      )}
    </main>
  );
}
