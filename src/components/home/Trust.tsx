"use client";

import {
  ShieldCheck,
  Laptop,
  BadgeCheck,
  ArrowUpRight,
  LockKeyhole,
  Code2,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { STATIC_PATHS } from "@/routes";

const features = [
  {
    icon: ShieldCheck,
    title: "Privacy Comes First",
    description:
      "Your files are processed locally in your browser. No uploads, no server storage, and no unnecessary data collection.",
    label: "Your data stays yours",
    featured: true,
  },
  {
    icon: Code2,
    title: "Open by Nature",
    description:
      "Our source code is publicly available. Explore the implementation, inspect the code, or contribute to the project.",
    label: "Transparent & open source",
  },
  {
    icon: Laptop,
    title: "Browser Powered",
    description:
      "No installations or complicated setup. Open a tool and get things done directly from your browser.",
    label: "No installation required",
  },
  {
    icon: BadgeCheck,
    title: "Free. Always.",
    description:
      "Every tool is free to use without subscriptions, account registration, or hidden paywalls.",
    label: "Free for everyone",
  },
];

export default function Trust() {
  return (
    <section className="relative isolate overflow-hidden border-y border-slate-200/70 bg-[#fafbff]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_0.7px,transparent_0.7px)] [background-size:26px_26px] opacity-30" />
        <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-200/30 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-4 py-2 shadow-sm shadow-blue-100/50">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
              The FlagsDev Difference
            </span>
          </div>

          <h2 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Tools that work for you.
            <span className="mt-2 block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Not against your privacy.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            <Link
              href={STATIC_PATHS.home}
              className="font-bold text-slate-900 transition-colors hover:text-blue-600"
            >
              FlagsDev
            </Link>{" "}
            is built on a simple belief: your files belong to you. We make
            powerful, accessible browser tools without compromising your privacy
            or control.
          </p>
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-2 ${
                  feature.featured
                    ? "border-blue-200 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 shadow-xl shadow-blue-900/10 hover:shadow-2xl hover:shadow-blue-900/20"
                    : "border-slate-200/80 bg-white/90 shadow-sm hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5"
                }`}
              >
                {feature.featured && (
                  <>
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  </>
                )}

                <span
                  className={`absolute right-7 top-7 text-sm font-bold ${
                    feature.featured
                      ? "text-blue-200/60"
                      : "text-slate-200 group-hover:text-blue-200"
                  }`}
                >
                  0{index + 1}
                </span>

                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 ${
                    feature.featured
                      ? "border-white/20 bg-white/15 shadow-lg shadow-blue-950/10"
                      : "border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:border-blue-200"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      feature.featured ? "text-white" : "text-blue-600"
                    }`}
                  />
                </div>

                <div className="relative mt-8 flex flex-1 flex-col">
                  <h3
                    className={`text-xl font-bold tracking-tight ${
                      feature.featured ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`mt-4 flex-1 text-sm leading-7 text-justify ${
                      feature.featured ? "text-blue-50/85" : "text-slate-600"
                    }`}
                  >
                    {feature.description}
                  </p>

                  <div
                    className={`mt-8 flex items-center gap-2 border-t pt-5 ${
                      feature.featured ? "border-white/15" : "border-slate-100"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        feature.featured ? "bg-emerald-300" : "bg-emerald-500"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold tracking-wide ${
                        feature.featured ? "text-blue-50" : "text-slate-500"
                      }`}
                    >
                      {feature.label}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-slate-500">
            <span className="inline-flex items-center gap-2">
              <LockKeyhole className="h-4 w-4 text-emerald-600" />
              Privacy focused
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span className="inline-flex items-center gap-2">
              <FaGithub className="h-4 w-4 text-slate-700" />
              Open source
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-emerald-600" />
              Free to use
            </span>
          </div>

          <Link
            href={STATIC_PATHS.tools}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/20"
          >
            Explore tools
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
