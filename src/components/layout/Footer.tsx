import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import { STATIC_PATHS } from "@/routes";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="max-w-2xl">
          <Link
            href={STATIC_PATHS.home}
            className="text-xl font-semibold tracking-tight text-slate-900 transition-colors hover:text-blue-600"
          >
            FlagsDev
          </Link>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Privacy-first browser tools that run entirely on your device. No
            uploads. No servers. Open source.
          </p>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} FlagsDev. Built for the open web.</p>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href={STATIC_PATHS.privacy}
              className="transition-colors hover:text-slate-900"
            >
              Privacy
            </Link>

            <Link
              href={STATIC_PATHS.terms}
              className="transition-colors hover:text-slate-900"
            >
              Terms
            </Link>

            <Link
              href={STATIC_PATHS.license}
              className="transition-colors hover:text-slate-900"
            >
              License
            </Link>

            <Link
              href={STATIC_PATHS.contact}
              className="transition-colors hover:text-slate-900"
            >
              Contact
            </Link>

            <a
              href={STATIC_PATHS.gitHubRepo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="text-xl transition-colors hover:text-slate-900"
            >
              <FaGithub />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
