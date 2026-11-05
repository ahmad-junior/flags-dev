"use client";

import {
  Lock,
  ShieldCheck,
  Globe,
  FileCheck,
  ArrowUpRight,
  Shield,
  Fingerprint,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { STATIC_PATHS } from "@/routes";

const securityFeatures = [
  {
    icon: Lock,
    title: "Secure Connections",
    description:
      "Every connection uses HTTPS encryption to help protect information exchanged between your browser and our website.",
    label: "HTTPS protected",
  },
  {
    icon: ShieldCheck,
    title: "Local Processing",
    description:
      "Supported file operations happen directly in your browser. Your files are not uploaded to our servers.",
    label: "Your files stay local",
  },
  {
    icon: Globe,
    title: "Open Source & Transparent",
    description:
      "Our source code is publicly available. Anyone can inspect how our tools work, review implementations, and contribute.",
    label: "Publicly accessible code",
  },
  {
    icon: FileCheck,
    title: "No Account Required",
    description:
      "Start using our tools instantly. No registration, passwords, or unnecessary personal information required.",
    label: "No sign-up needed",
  },
];

export default function Security() {
  return (
    <section className="relative isolate overflow-hidden border-t border-slate-200 bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-40 h-80 w-80 rounded-full bg-blue-100/40 blur-[110px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-indigo-100/40 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                Security & Privacy
              </span>
            </div>

            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Security isn&apos;t an extra.
              <span className="mt-2 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                It&apos;s built in.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              We believe your files deserve protection by default.
              <Link
                href={STATIC_PATHS.home}
                className="font-bold text-slate-900 transition-colors hover:text-blue-600"
              >
                {" "}
                FlagsDev
              </Link>{" "}
              combines modern web security standards with local browser
              processing to give you more control over your documents.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                HTTPS encryption
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Local processing
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full border border-blue-100 sm:h-80 sm:w-80" />
            <div className="absolute h-60 w-60 rounded-full border border-dashed border-blue-200/80 sm:h-72 sm:w-72" />

            <div className="relative flex h-52 w-52 items-center justify-center rounded-[2.5rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-indigo-100 shadow-2xl shadow-blue-900/10 sm:h-60 sm:w-60">
              <div className="absolute inset-4 rounded-[2rem] border border-white/80" />

              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-600/25 sm:h-36 sm:w-36">
                <Shield className="h-20 w-20 fill-white/10 text-white sm:h-24 sm:w-24" />

                <div className="absolute bottom-2 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-indigo-600 bg-emerald-400">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div className="absolute left-0 top-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-900/5 sm:-left-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <Lock className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Secure</p>
                <p className="text-[10px] text-slate-500">HTTPS connection</p>
              </div>
            </div>

            <div className="absolute bottom-8 right-0 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-900/5 sm:-right-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                <Fingerprint className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Your Control</p>
                <p className="text-[10px] text-slate-500">Privacy focused</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              >
                <div className="absolute right-7 top-7 text-sm font-bold text-slate-200 transition-colors group-hover:text-blue-200">
                  0{index + 1}
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>

                <h3 className="mt-7 text-lg font-bold tracking-tight text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 min-h-[105px] text-sm leading-7 text-slate-600 text-justify">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-slate-500">
                    {feature.label}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={STATIC_PATHS.tools}
            className="group inline-flex items-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/20"
          >
            Explore tools
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
