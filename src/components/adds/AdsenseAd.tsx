import { useEffect, useRef, useState, ReactNode } from "react";
import { DefaultAdFallback } from "@/components/adds/DefaultAdFallback";
import { PUBLIC_PATHS } from "@/routes";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdState = "loading" | "loaded" | "fallback";

interface AdsenseAdProps {
  children?: ReactNode;
  fallbackTitle?: string;
  fallbackText?: string;
  githubUrl?: string;
}

export default function AdsenseAd({
  children,
  fallbackTitle = "Support Open Source Development",
  fallbackText = "FlagsDev is a completely free, open source platform. Your support helps us maintain infrastructure and continuously improve our tools.",
  githubUrl = PUBLIC_PATHS.gitHubRepo,
}: AdsenseAdProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const [status, setStatus] = useState<AdState>("loading");
  const isPushedRef = useRef(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const initializeAd = () => {
      if (isPushedRef.current) return;

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isPushedRef.current = true;
      } catch {
        setStatus("fallback");
        return;
      }

      timeoutId = setTimeout(() => {
        const adElement = adRef.current;

        if (!adElement) {
          setStatus("fallback");
          return;
        }

        const adStatus = adElement.getAttribute("data-ad-status");
        const hasContent = adElement.childElementCount > 0;

        if (adStatus === "unfilled" || !hasContent) {
          setStatus("fallback");
        } else {
          setStatus("loaded");
        }
      }, 3500);
    };

    const handleGlobalError = (event: ErrorEvent) => {
      if (event.filename?.includes("adsbygoogle")) {
        setStatus("fallback");
      }
    };

    window.addEventListener("error", handleGlobalError);
    initializeAd();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("error", handleGlobalError);
    };
  }, []);

  if (status === "fallback") {
    return children ? (
      <>{children}</>
    ) : (
      <DefaultAdFallback
        title={fallbackTitle}
        text={fallbackText}
        githubUrl={githubUrl}
      />
    );
  }

  return (
    <div className="relative my-6 min-h-[100px] w-full overflow-hidden">
      {status === "loading" && (
        <div className="absolute inset-0 z-10 flex min-h-[100px] animate-pulse items-center justify-center rounded-2xl border border-slate-200 bg-slate-100/80">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <svg
              className="h-4 w-4 animate-spin text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading advertisement...</span>
          </div>
        </div>
      )}

      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "100px" }}
        data-ad-client="ca-pub-5501202176561362"
        data-ad-slot="3661190168"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
