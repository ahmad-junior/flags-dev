import Link from "next/link";
import { DocsSidebarProps } from "@/components/docs/types";

export default function DocsSidebar({ sections }: DocsSidebarProps) {
  return (
    <aside className="sticky top-24">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          On this page
        </p>

        <nav aria-label="Table of contents">
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <Link
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
