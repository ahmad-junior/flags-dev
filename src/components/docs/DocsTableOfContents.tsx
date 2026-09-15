import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { DocsTableOfContentsProps } from "@/components/docs/types";

export default function DocsTableOfContents({
  sections,
}: DocsTableOfContentsProps) {
  return (
    <details className="mb-10 rounded-xl border border-slate-200 bg-slate-50 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-sm font-semibold text-slate-900">
        <span>On this page</span>

        <ChevronDown className="h-4 w-4 text-slate-500" />
      </summary>

      <nav className="border-t border-slate-200 px-4 py-3">
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={`#${section.id}`}
                className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-950"
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
