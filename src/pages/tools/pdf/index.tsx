import ToolLayout from "@/components/tool-layout/ToolLayout";
import { pdfTools } from "@/features/pdf/toolData";
import ToolToolbar from "@/components/tool-layout/ToolToolbar";
import { useState } from "react";
import { pdfToolTabs } from "@/features/pdf/toolTabs";

// Tool Components
import SelectPDFToolNotice from "@/features/pdf/components/SelectPDFToolNotice";

export default function Page() {
  const [activeTab, setActiveTab] = useState(pdfToolTabs[0].id);

  return (
    <ToolLayout tool={pdfTools}>
      <div className="flex flex-col">
        <div className="sticky top-16 z-20 rounded-xl border border-slate-200 bg-white p-2 shadow-sm mb-3">
          <ToolToolbar
            tabs={pdfToolTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        <SelectPDFToolNotice />
      </div>
    </ToolLayout>
  );
}
