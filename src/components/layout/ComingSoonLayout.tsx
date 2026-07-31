import React from "react";
import {
  LucideIcon,
  Sparkles,
  Clock,
  Terminal,
  ArrowRight,
  GitBranch,
} from "lucide-react";

interface ComingSoonLayoutProps {
  toolName: string;
  toolIcon?: LucideIcon;
  description?: string;
  keyFeatures?: string[];
  githubUrl?: string;
}

export const ComingSoonLayout: React.FC<ComingSoonLayoutProps> = ({
  toolName,
  toolIcon: Icon = Sparkles,
  description = "We are currently assembling this browser-powered conversion module using WebAssembly and client-side web APIs.",
  keyFeatures = [
    "100% Client-Side execution (Zero Server Uploads)",
    "Privacy-first architecture using local CPU/GPU hardware",
    "Fast multi-threaded processing via Web Workers",
  ],
  githubUrl = "https://github.com/ahmad-junior/flags-dev",
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 md:p-12 text-center shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-medium tracking-wide mb-6 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Under Active Development</span>
        </div>

        <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-slate-800 mb-6 shadow-xs">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.75]" />
        </div>

        <h1 className="relative text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-3">
          {toolName} is Coming Soon
        </h1>
        <p className="relative max-w-xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
          {description}
        </p>

        <div className="relative max-w-md mx-auto text-left rounded-xl bg-slate-50/80 border border-slate-200/80 p-5 mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            <Terminal className="w-4 h-4 text-slate-700" />
            <span>Planned Capabilities</span>
          </div>
          <ul className="space-y-2.5">
            {keyFeatures.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
              >
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            <GitBranch className="w-4 h-4 text-slate-300" />
            <span>Track on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};
