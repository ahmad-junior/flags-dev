import Link from "next/link";
import { STATIC_PATHS } from "@/routes";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="max-w-2xl">
          <Link
            href={STATIC_PATHS.home}
            className="text-xl font-semibold tracking-tight text-slate-900"
          >
            FlagsDev
          </Link>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Privacy-first browser tools that run entirely on your device. No
            uploads. No servers. Open source.
          </p>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-3 pt-1 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} FlagsDev. Built for the open web.</p>

          <nav className="flex items-center gap-6">
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

            <a
              href={STATIC_PATHS.gitHubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-900 text-xl"
            >
              <FaGithub></FaGithub>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
