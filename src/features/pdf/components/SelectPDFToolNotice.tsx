import { MousePointerClick, Lightbulb } from "lucide-react";

export default function SelectPDFToolNotice() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <MousePointerClick className="h-7 w-7 text-green-600" />
        </div>

        <h2 className="mt-5 text-2xl font-semibold text-slate-900">
          Select a Tool to Get Started
        </h2>

        <p className="mt-3 max-w-2xl text-slate-600">
          Choose one of the PDF tools above to begin. All processing happens
          directly in your browser, so your files stay private and never leave
          your device.
        </p>

        <div className="mt-8 w-full max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-5 text-left">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            <div>
              <h3 className="font-semibold text-amber-900">Tips</h3>

              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-amber-800">
                <li>Do not refresh or close this page while working.</li>
                <li>
                  Your files are processed only in your browser and are never
                  uploaded.
                </li>
                <li>
                  Refreshing the page will clear any files you&apos;ve selected.
                </li>
                <li>Large PDF files may take a little longer to process.</li>
                <li>
                  After downloading your result, you can safely clear the
                  workspace.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
