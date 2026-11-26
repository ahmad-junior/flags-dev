import SEO from "@/components/SEO";
import ToolLayout from "@/components/tool-layout/ToolLayout";
import ToolPrivacyBanner from "@/components/tool-layout/ToolPrivacyBanner";
import AdsenseAd from "@/components/adds/AdsenseAd";

import RecorderStudio from "@/features/recorder/components/RecorderStudio";

import { recorderTools } from "@/features/recorder/toolData";
import { CANONICAL_PATHS } from "@/routes";

export default function Page() {
  return (
    <>
      <SEO
        title="Free Online Screen Recorder - Secure Browser-Based Recording"
        description="Record your screen, browser tabs, application windows, webcam, and microphone directly in your browser. Free privacy-first screen recording with local processing and no uploads."
        keywords="Free Screen Recorder, Online Screen Recorder, Browser Screen Recorder, Screen Capture, Webcam Recorder, Microphone Recorder, Screen and Audio Recorder, Browser Recording, WebM Recorder, FlagsDev"
        canonical={CANONICAL_PATHS.recorder}
      />

      <ToolLayout tool={recorderTools}>
        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl" />

          <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

          {/* Actual Tool UI */}
          <RecorderStudio></RecorderStudio>

          <ToolPrivacyBanner />
        </div>

        <div className="mt-8">
          <AdsenseAd />
        </div>
      </ToolLayout>
    </>
  );
}
