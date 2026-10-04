import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { PUBLIC_PATHS } from "@/routes";

export default function ToolPrivacyBanner() {
  return (
    <div className="relative mt-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-indigo-400 ring-1 ring-white/20 backdrop-blur-md">
            <Lock className="h-6 w-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold tracking-tight text-white">
                Guaranteed Local Privacy
              </h3>

              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                Client Side
              </span>
            </div>

            <p className="mt-1.5 max-w-xl text-justify text-sm leading-relaxed text-slate-300">
              FlagsDev is engineered to process your confidential documents
              directly in your browser sandbox, ensuring that your files never
              leave your device. We prioritize your privacy and security above
              all else.
            </p>
          </div>
        </div>

        <Link
          href={PUBLIC_PATHS.privacy}
          className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-950 hover:shadow-lg"
        >
          <span>Read security policy</span>

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
