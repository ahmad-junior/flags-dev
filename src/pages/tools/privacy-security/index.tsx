import { useState } from "react";

import SEO from "@/components/SEO";
import ToolLayout from "@/components/tool-layout/ToolLayout";
import ToolCard from "@/components/tool-layout/ToolCard";
import ToolPrivacyBanner from "@/components/tool-layout/ToolPrivacyBanner";
import AdsenseAd from "@/components/adds/AdsenseAd";

import { privacySecurityTools } from "@/features/privacy-security/toolData";
import {
  privacyHasingToolTabs,
  privacyEncodingToolTabs,
  privacyCryptographyToolTabs,
  CATEGORY_TABS,
  PrivacySecurityCategory,
} from "@/features/privacy-security/toolTabs";

import { CANONICAL_PATHS } from "@/routes";

const CATEGORY_TOOLS = {
  hashing: privacyHasingToolTabs,
  encoding: privacyEncodingToolTabs,
  cryptography: privacyCryptographyToolTabs,
};

export default function Page() {
  const [activeCategory, setActiveCategory] =
    useState<PrivacySecurityCategory>("hashing");

  const activeTools = CATEGORY_TOOLS[activeCategory];

  const activeCategoryMeta = CATEGORY_TABS.find(
    (category) => category.id === activeCategory,
  );

  return (
    <>
      <SEO
        title="Privacy & Security Tools"
        description="Free browser-based privacy and security tools for hashing, encoding, cryptography, password generation, JWT inspection, and more. Process sensitive data locally without unnecessary uploads or tracking."
        keywords="Privacy tools, Security tools, Hash generator, File hash, SHA-256, Base64 encoder, URL encoder, Password generator, UUID generator, HMAC, AES, RSA, JWT decoder, JWT inspector, Browser security tools, FlagsDev"
        canonical={CANONICAL_PATHS.privacySecurity}
      />

      <ToolLayout tool={privacySecurityTools}>
        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl" />

          <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="mb-10">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Privacy &{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Security Tools
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Powerful privacy and security utilities for hashing, encoding,
                  cryptography, and secure data workflows. Built to run directly
                  in your browser.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 flex justify-center">
            <div
              className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-xl border border-slate-200/80 bg-slate-100/80 p-1.5 shadow-sm no-scrollbar"
              role="tablist"
              aria-label="Privacy and Security Categories"
            >
              {CATEGORY_TABS.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category.id)}
                    className={[
                      "group relative shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold sm:px-6",
                      "transition-all duration-200 ease-out",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                      isActive
                        ? "cursor-default bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "cursor-pointer text-slate-500 hover:bg-white/80 hover:text-slate-800 hover:shadow-sm",
                    ].join(" ")}
                  >
                    <span className="relative z-10">{category.label}</span>

                    {!isActive && (
                      <span className="absolute inset-x-4 -bottom-px h-px scale-x-0 bg-slate-300 transition-transform duration-200 group-hover:scale-x-100" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {activeCategoryMeta && (
            <div className="mb-8 text-center">
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-500">
                {activeCategoryMeta.description}
              </p>
            </div>
          )}

          <div
            role="tabpanel"
            aria-label={`${activeCategoryMeta?.label ?? ""} tools`}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {activeTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <ToolPrivacyBanner />
        </div>

        <div className="mt-8">
          <AdsenseAd />
        </div>
      </ToolLayout>
    </>
  );
}
