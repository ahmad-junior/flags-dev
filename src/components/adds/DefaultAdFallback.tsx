import { useEffect, useState } from "react";
import { Check, StarIcon, Share2, Copy } from "lucide-react";

import { SITE_URL } from "@/routes";

interface DefaultAdFallbackProps {
  title: string;
  text: string;
  githubUrl: string;
}

const SHARE_TEXT =
  "Check out FlagsDev for free, privacy-focused web and developer tools!";

export function DefaultAdFallback({
  title,
  text,
  githubUrl,
}: DefaultAdFallbackProps) {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }

    return SITE_URL;
  };

  const handleShare = async () => {
    if (sharing) return;

    const shareUrl = getShareUrl();

    setSharing(true);

    try {
      // Use the native share sheet when available.
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
      ) {
        await navigator.share({
          title: "FlagsDev",
          text: SHARE_TEXT,
          url: shareUrl,
        });

        return;
      }

      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        return;
      }

      const textArea = document.createElement("textarea");

      textArea.value = shareUrl;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";

      document.body.appendChild(textArea);

      textArea.select();

      const successful = document.execCommand("copy");

      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Failed to share FlagsDev page:", error);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="relative my-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1">
        <span className="text-xs font-semibold text-green-600">
          Advertisement
        </span>
      </div>

      <p className="text-sm font-semibold text-slate-900">{title}</p>

      <p className="mx-auto mt-1 max-w-lg text-sm leading-6 text-slate-600">
        {text}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          aria-label="Star FlagsDev on GitHub"
        >
          <StarIcon className="h-4 w-4" aria-hidden="true" />

          <span>Star on GitHub</span>
        </a>

        <button
          type="button"
          onClick={handleShare}
          disabled={sharing}
          aria-label={
            copied
              ? "Page link copied"
              : sharing
                ? "Sharing page"
                : "Share this page"
          }
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : sharing ? (
            <Share2 className="h-4 w-4 animate-pulse" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}

          <span>
            {copied ? "Link Copied!" : sharing ? "Sharing..." : "Share Link"}
          </span>
        </button>
      </div>
    </div>
  );
}
