import { MousePointerClick, Lightbulb } from "lucide-react";

export default function SelectConverterToolNotice() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
          <MousePointerClick className="h-7 w-7 text-blue-600" />
        </div>

        <h2 className="mt-5 text-2xl font-semibold text-slate-900">
          Select a Converter Tool to Get Started
        </h2>

        <p className="mt-3 max-w-2xl text-slate-600">
          Choose a conversion module above to begin. All video, audio, and image
          transcoding happens locally in your browser using WebAssembly, your
          files never leave your device.
        </p>

        <div className="mt-8 w-full max-w-2xl rounded-xl border border-amber-200 bg-amber-50/80 p-5 text-left">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            <div>
              <h3 className="font-semibold text-amber-900">Conversion Tips</h3>

              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-amber-800">
                <li>
                  <strong>100% Private:</strong> Files are processed entirely on
                  your local CPU/GPU and are never uploaded.
                </li>
                <li>
                  Large video or audio files may take a few moments to
                  initialize WebAssembly engines.
                </li>
                <li>
                  Do not close or refresh the tab while active batch processing
                  is underway.
                </li>
                <li>
                  Performance scales directly with your device&apos;s available
                  hardware and RAM.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
