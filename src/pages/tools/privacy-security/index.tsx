import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SEO from "@/components/SEO";
import ToolLayout from "@/components/tool-layout/ToolLayout";
import ToolToolbar from "@/components/tool-layout/ToolToolbar";
import AdsenseAd from "@/components/adds/AdsenseAd";

import { privacySecurityTools } from "@/features/privacy-security/toolData";
import {
  privacyHasingToolTabs,
  privacyEncodingToolTabs,
  privacyCryptographyToolTabs,
  CATEGORY_TABS,
  PrivacySecurityCategory,
} from "@/features/privacy-security/toolTabs";
import { CANONICAL_PATHS, STATIC_PATHS } from "@/routes";

import { PRIVACY_SECURITY_TOOL_VIEWS } from "@/features/privacy-security/components/toolViews";

const CATEGORY_TOOLS = {
  hashing: privacyHasingToolTabs,
  encoding: privacyEncodingToolTabs,
  cryptography: privacyCryptographyToolTabs,
};

const ALL_PRIVACY_SECURITY_TABS = [
  ...privacyHasingToolTabs,
  ...privacyEncodingToolTabs,
  ...privacyCryptographyToolTabs,
];

export default function Page() {
  const router = useRouter();

  const [activeCategory, setActiveCategory] =
    useState<PrivacySecurityCategory>("hashing");

  const [activeTool, setActiveTool] = useState("");

  const activeToolTabs = CATEGORY_TOOLS[activeCategory];

  const activeCategoryMeta = CATEGORY_TABS.find(
    (category) => category.id === activeCategory,
  );

  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash.replace("#", "");

      const matchedTool = ALL_PRIVACY_SECURITY_TABS.find(
        (tab) => tab.id === hash,
      );

      if (!matchedTool) {
        const defaultTool = privacyHasingToolTabs[0];

        if (defaultTool) {
          setActiveTool(defaultTool.id);
          setActiveCategory("hashing");
        }

        return;
      }

      setActiveTool(matchedTool.id);

      if (privacyHasingToolTabs.some((tab) => tab.id === matchedTool.id)) {
        setActiveCategory("hashing");
      } else if (
        privacyEncodingToolTabs.some((tab) => tab.id === matchedTool.id)
      ) {
        setActiveCategory("encoding");
      } else if (
        privacyCryptographyToolTabs.some((tab) => tab.id === matchedTool.id)
      ) {
        setActiveCategory("cryptography");
      }
    }

    syncFromHash();

    window.addEventListener("hashchange", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  function handleCategoryChange(category: PrivacySecurityCategory) {
    setActiveCategory(category);

    const firstTool = CATEGORY_TOOLS[category][0];

    if (!firstTool) {
      return;
    }

    setActiveTool(firstTool.id);

    router.replace(
      `${STATIC_PATHS.privacySecurity}#${firstTool.id}`,
      undefined,
      {
        shallow: true,
        scroll: false,
      },
    );
  }

  function handleToolChange(toolId: string) {
    setActiveTool(toolId);

    router.replace(`${STATIC_PATHS.privacySecurity}#${toolId}`, undefined, {
      shallow: true,
      scroll: false,
    });
  }

  const activeView =
    PRIVACY_SECURITY_TOOL_VIEWS[
      activeTool as keyof typeof PRIVACY_SECURITY_TOOL_VIEWS
    ];

  return (
    <>
      <SEO
        title="Privacy & Security Tools"
        description="Free browser-based privacy and security tools for hashing, encoding, cryptography, password generation, JWT inspection, and more. Process sensitive data locally without unnecessary uploads or tracking."
        keywords="Privacy tools, Security tools, Hash generator, File hash, SHA-256, Base64 encoder, URL encoder, Password generator, UUID generator, HMAC, AES, RSA, JWT decoder, JWT inspector, Browser security tools, FlagsDev"
        canonical={CANONICAL_PATHS.privacySecurity}
      />

      <ToolLayout tool={privacySecurityTools}>
        <div className="flex flex-col gap-4">
          <div
            className="flex justify-center"
            role="tablist"
            aria-label="Privacy and Security Categories"
          >
            <div className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded border border-slate-200/80 bg-slate-100/80 p-1.5 shadow-sm no-scrollbar">
              {CATEGORY_TABS.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(category.id)}
                    className={[
                      "group relative shrink-0 rounded px-3 sm:px-5 py-2.5 text-sm font-semibold",
                      "transition-all duration-200 ease-out",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
                      isActive
                        ? `bg-green-500 cursor-not-allowed text-white shadow-md shadow-slate-900/10`
                        : "text-slate-500 hover:bg-white/80 hover:text-slate-800 hover:shadow-sm cursor-pointer",
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
            <div className="text-center">
              <p className="text-xs font-medium text-slate-500">
                {activeCategoryMeta.description}
              </p>
            </div>
          )}

          <div className="sticky top-16 z-20 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-sm backdrop-blur-sm">
            <ToolToolbar
              tabs={activeToolTabs}
              activeTab={activeTool}
              onTabChange={handleToolChange}
            />
          </div>

          {activeView}
        </div>

        <div className="mt-6">
          <AdsenseAd />
        </div>
      </ToolLayout>
    </>
  );
}
