"use client";

import { useEffect, useState } from "react";
import { X, ShieldCheck } from "lucide-react";

export default function AdBlockNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const bait = document.createElement("div");

    bait.className = "adsbox advertisement ads ad-banner";
    bait.style.position = "absolute";
    bait.style.left = "-9999px";
    bait.style.width = "1px";
    bait.style.height = "1px";

    document.body.appendChild(bait);

    const timer = setTimeout(() => {
      const blocked =
        bait.offsetParent === null ||
        bait.offsetHeight === 0 ||
        bait.clientHeight === 0 ||
        window.getComputedStyle(bait).display === "none";

      document.body.removeChild(bait);

      if (!blocked) return;

      // Don&apos;t show again for 7 days
      const hiddenUntil = localStorage.getItem("adblock_notice_hidden");

      if (hiddenUntil && Number(hiddenUntil) > Date.now()) {
        return;
      }

      setShow(true);
    }, 150);

    return () => {
      clearTimeout(timer);

      if (document.body.contains(bait)) {
        document.body.removeChild(bait);
      }
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <button
          onClick={() => {
            localStorage.setItem(
              "adblock_notice_hidden",
              String(Date.now() + 7 * 24 * 60 * 60 * 1000),
            );

            setShow(false);
          }}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Support FlagsDev
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            It looks like you&apos;re using an ad blocker.
          </p>

          <p className="mt-3 leading-7 text-slate-600">
            FlagsDev is completely free, open source, privacy-first, and runs
            entirely in your browser. We don&apos;t charge subscriptions, sell
            your data, or require an account.
          </p>

          <p className="mt-3 leading-7 text-slate-600">
            The small, non-intrusive ads shown on our website help cover domain,
            infrastructure, development, and maintenance costs so we can keep
            improving these tools for everyone.
          </p>

          <p className="mt-3 leading-7 text-slate-600">
            If FlagsDev has been useful to you, we&apos;d truly appreciate it if
            you could whitelist our website in your ad blocker. It directly
            supports the continued development of free tools for the community.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              I&apos;ve disabled my ad blocker
            </button>

            <button
              onClick={() => {
                localStorage.setItem(
                  "adblock_notice_hidden",
                  String(Date.now() + 7 * 24 * 60 * 60 * 1000),
                );

                setShow(false);
              }}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Continue anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
