import DocsHeader from "@/components/docs/DocsHeader";
import DocsSidebar from "@/components/docs/DocsSidebar";
import { DocsLayoutProps } from "@/components/docs/types";

export default function DocsLayout({
  children,
  title,
  description,
  updatedAt,
  readTime,
  sections = [],
  toolUrl,
}: DocsLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <DocsHeader
          title={title}
          description={description}
          updatedAt={updatedAt}
          readTime={readTime}
          toolUrl={toolUrl}
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)_180px]">
          <aside className="hidden lg:block">
            <DocsSidebar sections={sections} />
          </aside>

          <article className="min-w-0">
            <div className="prose prose-slate max-w-none">{children}</div>
          </article>

          <div className="hidden lg:block" />
        </div>
      </div>
    </main>
  );
}
