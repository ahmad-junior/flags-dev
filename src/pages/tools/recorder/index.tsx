import { useState } from "react";

import SEO from "@/components/SEO";
import ToolLayout from "@/components/tool-layout/ToolLayout";
import ToolPrivacyBanner from "@/components/tool-layout/ToolPrivacyBanner";
import AdsenseAd from "@/components/adds/AdsenseAd";

import RecorderStudio from "@/features/recorder/components/RecorderStudio";
import RecorderPreflight from "@/features/recorder/components/RecorderPreflight";

import { recorderTools } from "@/features/recorder/toolData";
import { CANONICAL_PATHS } from "@/routes";

export default function Page() {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <SEO
        title="Free Online Screen Recorder - FlagsDev"
        description="Record your screen, browser tabs, application windows, microphone and webcam directly in your browser. Free privacy-first screen recording with local processing."
        keywords="Free Screen Recorder, Online Screen Recorder, Browser Screen Recorder, Screen Capture, Webcam Recorder, FlagsDev"
        canonical={CANONICAL_PATHS.recorder}
      />

      {!isReady ? (
        <RecorderPreflight onContinue={() => setIsReady(true)} />
      ) : (
        <ToolLayout tool={recorderTools}>
          <RecorderStudio />

          <ToolPrivacyBanner />

          <div className="mt-8">
            <AdsenseAd />
          </div>
        </ToolLayout>
      )}
    </>
  );
}
