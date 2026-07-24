import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import ToolLayout from "@/components/tool-layout/ToolLayout";
import ToolToolbar from "@/components/tool-layout/ToolToolbar";

import { pdfTools } from "@/features/pdf/toolData";
import { pdfToolTabs } from "@/features/pdf/toolTabs";

import SelectPDFToolNotice from "@/features/pdf/components/SelectPDFToolNotice";
import { PDF_TOOL_VIEWS } from "@/features/pdf/components/toolViews";

export default function Page() {
  const router = useRouter();

  const defaultTab = pdfToolTabs[0].id;

  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash.replace("#", "");

      const exists = pdfToolTabs.some((tab) => tab.id === hash);

      setActiveTab(exists ? hash : defaultTab);
    }

    syncFromHash();

    window.addEventListener("hashchange", syncFromHash);

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [defaultTab]);

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);

    router.replace(`/tools/pdf#${tabId}`, undefined, {
      shallow: true,
      scroll: false,
    });
  }

  const ActiveComponent = useMemo(
    () => PDF_TOOL_VIEWS[activeTab as keyof typeof PDF_TOOL_VIEWS],
    [activeTab],
  );

  return (
    <ToolLayout tool={pdfTools}>
      <div className="flex flex-col">
        <div className="sticky top-16 z-20 mb-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <ToolToolbar
            tabs={pdfToolTabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        {ActiveComponent ? <ActiveComponent /> : <SelectPDFToolNotice />}
      </div>
    </ToolLayout>
  );
}
