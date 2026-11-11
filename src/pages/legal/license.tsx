"use client";

import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";
import { CANONICAL_PATHS } from "@/routes";
import ExternalLinkModal from "@/components/modals/ExternalLinkModal";

import {
  Scale,
  ShieldCheck,
  Code2,
  Copy,
  GitBranch,
  BriefcaseBusiness,
  FileCheck2,
  ExternalLink,
  Info,
} from "lucide-react";

const LAST_UPDATED_LICENCE = "12 - November - 2026";

const PERMISSIONS = [
  {
    title: "Personal Use",
    description: "Use the software for personal projects and individual needs.",
    icon: ShieldCheck,
  },
  {
    title: "Commercial Use",
    description:
      "Use the software in commercial projects and business environments.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Modification",
    description: "Modify the source code and adapt it to your requirements.",
    icon: Code2,
  },
  {
    title: "Distribution",
    description: "Share, publish, and distribute copies of the software.",
    icon: GitBranch,
  },
  {
    title: "Sublicensing",
    description: "Sublicense and sell copies of the software.",
    icon: Copy,
  },
  {
    title: "Private Use",
    description: "Use and modify the software privately without restriction.",
    icon: FileCheck2,
  },
];

export default function LicensePage() {
  return (
    <>
      <SEO
        title="License"
        description="Explore the MIT License governing FlagsDev, including permissions, conditions, and warranty information."
        keywords="FlagsDev, MIT License, Open Source, Software License, Permissions, Conditions, Warranty Disclaimer"
        canonical={CANONICAL_PATHS.license}
      />

      <main className="overflow-hidden bg-white">
        <section className="relative border-b border-slate-200 bg-slate-50">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-blue-100/60 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 border-b-2 py-2 px-10 text-xs font-bold uppercase tracking-wider text-blue-700 hover:border-blue-500 hover:text-blue-500">
                <Scale size={15} />
                Open source licensing
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Open to use.
                <span className="block text-blue-600">Free to build upon.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                FlagsDev is released under the MIT License, giving developers
                the freedom to use, modify, and distribute the software while
                preserving the original license notice.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={17} className="text-blue-600" />
                  MIT License
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>Last updated: {LAST_UPDATED_LICENCE}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Scale size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                    Project license
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-950">
                    MIT License
                  </h2>
                </div>
              </div>

              <div className="mt-8 space-y-5 text-sm leading-8 text-slate-600 sm:text-base">
                <p>
                  FlagsDev is an open source project released under the MIT
                  License. You are free to use, copy, modify, merge, publish,
                  distribute, sublicense, and sell copies of the software,
                  provided that the original copyright notice and permission
                  notice are included in all copies or substantial portions of
                  the software.
                </p>

                <p>
                  The software is provided{" "}
                  <strong className="font-semibold text-slate-900">
                    &quot;AS IS&quot;
                  </strong>
                  , without warranty of any kind, express or implied, including
                  but not limited to the warranties of merchantability, fitness
                  for a particular purpose, and non-infringement.
                </p>
              </div>

              <div className="mt-8 flex items-start gap-3 rounded-xl bg-slate-50 p-5">
                <Info size={19} className="mt-0.5 shrink-0 text-blue-600" />
                <p className="text-sm leading-6 text-slate-600">
                  This page provides a summary for convenience. The official
                  LICENSE file in the repository contains the governing license
                  text.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-slate-950 p-8 text-white sm:p-10">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-blue-400">
                  <Code2 size={25} />
                </div>

                <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Developer friendly
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight">
                  Build without unnecessary restrictions.
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-400">
                  The MIT License is a permissive open source license that
                  allows broad use, modification, and distribution, subject to
                  its conditions.
                </p>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">License type</span>
                  <span className="font-semibold text-white">Permissive</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-400">Commercial use</span>
                  <span className="font-semibold text-white">Permitted</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-400">Modification</span>
                  <span className="font-semibold text-white">Permitted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Your permissions
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                What you can do with the software.
              </h2>
              <p className="mt-5 leading-7 text-slate-600">
                The MIT License gives you broad permissions to work with the
                software, provided you comply with its terms.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PERMISSIONS.map((permission) => {
                const Icon = permission.icon;

                return (
                  <article
                    key={permission.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-5 font-bold text-slate-900">
                      {permission.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {permission.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Important condition
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                Keep the original notice.
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                When distributing copies or substantial portions of the
                software, you must include the original copyright and permission
                notice specified by the MIT License.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="flex items-center gap-3">
                <Info size={21} className="text-amber-700" />
                <h3 className="font-bold text-slate-900">
                  Warranty disclaimer
                </h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                The software is provided without warranty. The authors or
                copyright holders are not liable for claims, damages, or other
                liabilities arising from its use, as stated in the MIT License.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6">
          <AdsenseAd />
        </div>

        <section className="mx-auto max-w-6xl px-6 pb-24 pt-12">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
              <FileCheck2 size={27} />
            </div>

            <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Read the complete license.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
              For the complete terms and conditions, refer to the LICENSE file
              located in the root of the FlagsDev GitHub repository.
            </p>

            <ExternalLinkModal
              href="https://github.com/ahmad-junior/flags-dev/blob/main/LICENCE"
              siteName="GitHub Repository"
            >
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <ExternalLink size={16} />
                Official LICENSE file in the repository
              </p>
            </ExternalLinkModal>
          </div>
        </section>
      </main>
    </>
  );
}
