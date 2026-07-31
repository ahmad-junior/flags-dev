import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SEO from "@/components/SEO";
import ToolLayout from "@/components/tool-layout/ToolLayout";
import ToolToolbar from "@/components/tool-layout/ToolToolbar";

import SelectConverterToolNotice from "@/features/converter/components/SelectConverterToolNotice";

import { converterToolTabs } from "@/features/converter/toolTabs";
import { CONVERTER_TOOL_VIEWS } from "@/features/converter/components/toolViews";
import { converterTools } from "@/features/converter/toolData";
import { CANONICAL_PATHS, STATIC_PATHS } from "@/routes";
export default function Page() {
  const router = useRouter();

  const defaultTab = "";

  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash.replace("#", "");
      const exists = converterToolTabs.some((tab) => tab.id === hash);

      setActiveTab(exists ? hash : defaultTab);
    }

    syncFromHash();

    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [defaultTab]);

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);

    router.replace(`${STATIC_PATHS.converterTool}#${tabId}`, undefined, {
      shallow: true,
      scroll: false,
    });
  }

  const activeView =
    CONVERTER_TOOL_VIEWS[activeTab as keyof typeof CONVERTER_TOOL_VIEWS];

  return (
    <>
      <SEO
        title="Free File & Media Converter Tools"
        description="Convert videos, audio, images, vectors, and archives 100% in your browser with WebAssembly. Private, zero server uploads, and free forever."
        keywords="File converter, Media converter, Video transcoder, Audio converter, HEIC to JPG, Compress images, Strip EXIF, WASM converter, Browser file converter, FlagsDev"
        canonical={CANONICAL_PATHS.converterTool}
      />
      <ToolLayout tool={converterTools}>
        <div className="flex flex-col">
          <div className="sticky top-16 z-20 mb-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <ToolToolbar
              tabs={converterToolTabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>

          {activeView ?? <SelectConverterToolNotice />}
        </div>
      </ToolLayout>
    </>
  );
}
