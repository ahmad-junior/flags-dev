"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, AlertTriangle, X } from "lucide-react";

interface ExternalLinkModalProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  siteName?: string;
}

export default function ExternalLinkModal({
  href,
  children,
  className = "",
  siteName = "external website",
}: ExternalLinkModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        className={className}
        aria-haspopup="dialog"
      >
        {children}
      </a>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="external-link-title"
              className="
                                relative
                                w-full
                                max-w-md
                                overflow-hidden
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                shadow-2xl
                                shadow-slate-950/20
                                animate-in
                                fade-in
                                zoom-in-95
                                duration-200
                            "
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="
                                    absolute
                                    right-4
                                    top-4
                                    flex
                                    h-9
                                    w-9
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    rounded-xl
                                    text-slate-400
                                    transition
                                    hover:bg-slate-100
                                    hover:text-slate-700
                                    active:scale-95
                                "
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-6 sm:p-7">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="
                                        mb-5
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-amber-200
                                        bg-amber-50
                                        text-amber-600
                                        shadow-sm
                                    "
                  >
                    <AlertTriangle className="h-8 w-8" strokeWidth={2} />
                  </div>

                  <h3
                    id="external-link-title"
                    className="text-xl font-bold tracking-tight text-slate-900"
                  >
                    Leaving FlagsDev
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    You&apos;re about to visit an external website.
                  </p>
                </div>

                <div
                  className="
                                    mt-5
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    p-3.5
                                "
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400" />

                    <span
                      className="
                                            text-[11px]
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-slate-400
                                        "
                    >
                      Destination
                    </span>
                  </div>

                  <p
                    className="truncate font-mono text-xs text-slate-600"
                    title={href}
                  >
                    {href}
                  </p>
                </div>

                <p
                  className="
                                    mt-5
                                    text-center
                                    text-sm
                                    leading-6
                                    text-slate-600
                                "
                >
                  You are being redirected to{" "}
                  <span className="font-semibold text-slate-800">
                    {siteName}
                  </span>
                  . Please make sure you trust the destination before
                  continuing.
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="
                                            inline-flex
                                            h-11
                                            cursor-pointer
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-white
                                            px-4
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                            shadow-sm
                                            transition-all
                                            hover:border-slate-300
                                            hover:bg-slate-50
                                            hover:text-slate-900
                                            active:scale-[0.98]
                                        "
                  >
                    Stay Here
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="
                                            group
                                            inline-flex
                                            h-11
                                            cursor-pointer
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-slate-900
                                            px-4
                                            text-sm
                                            font-semibold
                                            text-white
                                            shadow-sm
                                            transition-all
                                            hover:bg-slate-800
                                            hover:shadow-md
                                            active:scale-[0.98]
                                        "
                  >
                    Continue
                    <ExternalLink
                      className="
                                            h-4
                                            w-4
                                            transition-transform
                                            duration-200
                                            group-hover:-translate-y-0.5
                                            group-hover:translate-x-0.5
                                        "
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
