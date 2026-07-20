import { useRef, useState } from "react";
import clsx from "clsx";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { ToolTab } from "@/components/tool-layout/types";

interface ToolToolbarProps {
  tabs: ToolTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ToolToolbar({
  tabs,
  activeTab,
  onTabChange,
}: ToolToolbarProps) {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {!expanded && (
        <>
          {/* Fade --- Left --- Right */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />

          {/* Scroll --- Left --- Right */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 shadow-md transition hover:bg-slate-50 lg:flex cursor-pointer"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 shadow-md transition hover:bg-slate-50 lg:flex cursor-pointer"
            aria-label="Scroll right"
          >
            <FaChevronRight className="h-3.5 w-3.5" />
          </button>
        </>
      )}

      {tabs.length > 6 && (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
          >
            {" "}
            {expanded ? (
              <>
                {" "}
                <FaChevronUp className="h-3.5 w-3.5" /> Collapse{" "}
              </>
            ) : (
              <>
                {" "}
                <FaChevronDown className="h-3.5 w-3.5" /> Show All Tools{" "}
              </>
            )}
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        role="tablist"
        aria-label="Tool Navigation"
        className={clsx(
          "gap-3 p-4 transition-all duration-300 scroll-smooth scrollbar-none",
          expanded ? "flex flex-wrap" : "flex overflow-x-auto px-14",
        )}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onTabChange(tab.id)}
              disabled={isActive}
              className={clsx(
                "group flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-md cursor-not-allowed"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm cursor-pointer",
              )}
            >
              <Icon
                className={clsx(
                  "h-4 w-4 transition-transform duration-200",
                  !isActive && "group-hover:scale-110",
                )}
              />

              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
