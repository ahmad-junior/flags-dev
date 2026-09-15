import { DocsStepsProps } from "@/components/docs/types";

export default function DocsSteps({ steps }: DocsStepsProps) {
  return (
    <div className="my-10 space-y-8">
      {steps.map((step, index) => (
        <div key={index} className="relative flex gap-5">
          {/* Step number */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
            {index + 1}
          </div>

          {/* Content */}
          <div className="min-w-0 pt-1">
            <h3 className="m-0 text-lg font-semibold text-slate-950">
              {step.title}
            </h3>

            <div className="mt-2 text-sm leading-7 text-slate-600">
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
