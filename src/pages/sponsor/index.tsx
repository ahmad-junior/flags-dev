"use client";

import Link from "next/link";
import {
  Heart,
  Sparkles,
  Check,
  ArrowRight,
  Coffee,
  Zap,
  ShieldCheck,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PUBLIC_PATHS } from "@/routes";

const tiers = [
  {
    name: "Supporter",
    price: "$5",
    period: "one-time",
    description:
      "Great for individuals who love using the tools and want to fuel a cup of coffee.",
    icon: Coffee,
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    buttonText: "Sponsor $5",
    features: [
      "Shoutout on our GitHub README",
      "Supporter badge on your profile (coming soon)",
      "Our endless gratitude ❤️",
    ],
    popular: false,
  },
  {
    name: "Pro Backer",
    price: "$19",
    period: "per month",
    description:
      "Ideal for power users and independent developers who rely on these tools daily.",
    icon: Zap,
    badgeColor: "bg-green-100 text-green-800 border-green-200",
    buttonText: "Become a Pro Backer",
    features: [
      "All Supporter perks",
      "Early access to beta features and new tools",
      "Priority feature requests & bug reports",
      "Direct line of communication with the creator",
    ],
    popular: true,
  },
  {
    name: "Enterprise Partner",
    price: "$99",
    period: "per month",
    description:
      "For companies and teams utilizing our open-source tools in production workflows.",
    icon: ShieldCheck,
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    buttonText: "Partner with Us",
    features: [
      "All Pro Backer perks",
      "Company logo displayed on the footer & sponsor page",
      "Featured sponsorship placement in release notes",
      "Dedicated integration or technical support",
    ],
    popular: false,
  },
];

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="relative overflow-hidden bg-white border-b border-slate-200/80 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-sm font-semibold text-rose-700 shadow-sm mb-6">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            <span>Support Open Source</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Fuel the Future of <span className="text-green-600">FlagsDev</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            FlagsDev is built to provide fast, reliable, client side tools
            completely free and open-source. Your sponsorship keeps development
            rolling and servers running smoothly.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#tiers"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:scale-[1.02]"
            >
              <span>Explore Tiers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={PUBLIC_PATHS.gitHubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50"
            >
              <FaGithub className="h-4 w-4 text-slate-900" />
              <span>Star on GitHub</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 mb-4">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              100% Free & Open Source
            </h3>
            <p className="mt-2 text-sm text-slate-600 text-justify">
              No paywalls, no tracking cookies, and no annoying ads. Just clean,
              developer first tools.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mb-4">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Independent & Indie
            </h3>
            <p className="mt-2 text-sm text-slate-600 text-justify">
              Built independently with passion. Sponsorship helps cover
              infrastructure, domain fees, and new tool research.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Continuous Updates
            </h3>
            <p className="mt-2 text-sm text-slate-600 text-justify">
              New converters, UI enhancements, and feature patches shipped
              regularly based on community feedback.
            </p>
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div id="tiers" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Sponsorship Tiers
          </h2>
          <p className="mt-2 text-slate-600">
            Choose a plan that fits your level of support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-xl shadow-slate-900/5 transition-all hover:-translate-y-1 ${
                  tier.popular
                    ? "border-green-500 ring-2 ring-green-500/20"
                    : "border-slate-200"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    {tier.name}
                  </h3>
                  <div className={`rounded-xl border p-2.5 ${tier.badgeColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-6 min-h-[40px]">
                  {tier.description}
                </p>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {tier.price}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    / {tier.period}
                  </span>
                </div>

                <div className="my-4 border-t border-slate-100" />

                <ul className="space-y-3.5 mb-8 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`w-full rounded-xl py-3.5 text-center text-sm font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    tier.popular
                      ? "bg-green-600 text-white shadow-green-600/20 hover:bg-green-700"
                      : "bg-slate-900 text-white shadow-slate-900/10 hover:bg-slate-800"
                  }`}
                  disabled
                >
                  {tier.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sponsorship Checkout — Under Production */}
      {/* TODO: Remove when checkout is ready */}
      <div className="relative mx-auto mt-3 max-w-7xl overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow-sm">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-amber-100/50 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-green-100/40 blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6 lg:p-7">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700">
                <Wrench className="h-3 w-3" />
                Under Production
              </span>

              <span className="text-xs text-slate-400">
                Sponsorship checkout
              </span>
            </div>

            <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-[15px]">
              We&apos;re putting the finishing touches on our sponsorship
              checkout. If you&apos;d like to support the project in the
              meantime, we&apos;d love to hear from you.
            </p>
          </div>

          <Link
            href={PUBLIC_PATHS.contact}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-600/30 focus:ring-offset-2"
          >
            Contact us
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      {/* ---- */}
    </div>
  );
}
