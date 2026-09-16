import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdsenseAdProps {
  fallbackTitle?: string;
  fallbackText?: string;
}

export default function AdsenseAd({
  fallbackTitle = "Support FlagsDev",
  fallbackText = "FlagsDev is free and open source. Your support helps us maintain and improve the tools.",
}: AdsenseAdProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const isPushedRef = useRef(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const initializeAd = () => {
      // Avoid pushing multiple times in React 18 Strict Mode
      if (isPushedRef.current) return;

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isPushedRef.current = true;
      } catch {
        setShowFallback(true);
        return;
      }

      timeoutId = setTimeout(() => {
        const adElement = adRef.current;

        if (!adElement) {
          setShowFallback(true);
          return;
        }

        const adStatus = adElement.getAttribute("data-ad-status");

        const hasContent = adElement.childElementCount > 0;

        if (adStatus === "unfilled" || !hasContent) {
          setShowFallback(true);
        }
      }, 3500);
    };

    const handleGlobalError = (event: ErrorEvent) => {
      if (event.filename?.includes("adsbygoogle")) {
        setShowFallback(true);
      }
    };

    window.addEventListener("error", handleGlobalError);
    initializeAd();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("error", handleGlobalError);
    };
  }, []);

  if (showFallback) {
    return (
      <div className="my-6 border border-slate-200 bg-slate-50 px-6 py-5 text-center">
        <p className="text-sm font-semibold text-slate-900">{fallbackTitle}</p>

        <p className="mx-auto mt-1 max-w-lg text-sm leading-6 text-slate-500">
          {fallbackText}
        </p>
      </div>
    );
  }

  return (
    <div className="my-6 min-h-[100px] aria-hidden:hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5501202176561362"
        data-ad-slot="3661190168"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
