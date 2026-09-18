import { FaCodeBranch, FaUser, FaGithub } from "react-icons/fa";
import { ToolDefinition } from "@/components/tool-layout/types";
import ExternalLinkModal from "@/components/navigation/ExternalLinkModal";
import { STATIC_PATHS } from "@/routes";
import Link from "next/link";
import { Heart } from "lucide-react";

interface Props {
  tool: ToolDefinition;
}

export default function ToolDevelopers({ tool }: Props) {
  if (!tool.openSource) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <FaCodeBranch size={20} />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            Open Source Project
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            This tool is open source, privacy-first, and built with the help of
            the community.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="mb-3 font-semibold text-slate-900">Contributors</h4>

          <div className="space-y-3">
            {tool.contributors?.map((person) => (
              <div
                key={`${person.name}-${person.role}`}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <FaUser />
                </div>

                <div>
                  <p className="font-medium text-slate-900">{person.name}</p>

                  <p className="text-sm text-slate-500">{person.role}</p>

                  <p className="text-sm text-slate-500">
                    Email: {person?.email ?? "Not available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Community Driven
            </span>

            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              Help Improve This Tool
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              This project is completely open source and built by developers
              from the community. Whether you&apos;ve found a bug, have an idea
              for a new feature, or want to improve the codebase, every
              contribution is appreciated.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={STATIC_PATHS.sponsor}
              className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-100 hover:text-rose-800 hover:shadow-md active:translate-y-0"
            >
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500 transition-transform duration-200 group-hover:scale-110" />
              <span>Sponsor</span>
            </Link>

            <ExternalLinkModal
              href={STATIC_PATHS.gitHubRepo}
              siteName="GitHub repository"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800"
            >
              <FaGithub size={20} />
              View Repository
            </ExternalLinkModal>
            <p className="text-center text-xs text-slate-500">
              Fork • Star • Contribute
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
