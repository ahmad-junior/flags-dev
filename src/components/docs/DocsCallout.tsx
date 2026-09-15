import { Info, Lightbulb, ShieldCheck, AlertTriangle } from "lucide-react";
import { DocsCalloutProps } from "@/components/docs/types";

const icons = {
  info: Info,
  tip: Lightbulb,
  privacy: ShieldCheck,
  warning: AlertTriangle,
};

export default function DocsCallout({
  type = "info",
  title,
  children,
}: DocsCalloutProps) {
  const Icon = icons[type];

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
          <Icon className="h-4 w-4 text-slate-700" />
        </div>

        <div>
          <h3 className="m-0 text-sm font-semibold text-slate-950">{title}</h3>

          <div className="mt-2 text-sm leading-6 text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
