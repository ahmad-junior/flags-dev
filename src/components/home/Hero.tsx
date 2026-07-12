import Link from "next/link";
import {
  FaArrowRight,
  FaGithub,
  FaLock,
  FaCodeBranch,
  FaGlobe,
  FaGift,
} from "react-icons/fa";
import { STATIC_PATHS } from "@/routes";

const features = [
  {
    icon: <FaLock className="text-emerald-600" />,
    label: "Privacy First",
  },
  {
    icon: <FaCodeBranch className="text-blue-600" />,
    label: "Open Source",
  },
  {
    icon: <FaGlobe className="text-violet-600" />,
    label: "Browser Powered",
  },
  {
    icon: <FaGift className="text-amber-500" />,
    label: "Free Forever",
  },
];

export default function Hero() {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-white via-white to-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center lg:py-32">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {features.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Powerful browser tools.
          <span className="mt-2 block text-blue-600">
            Your files never leave your device.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
          Everything in your browser. No uploads, no accounts, and no tracking.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href={STATIC_PATHS.tools}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Explore Tools
            <FaArrowRight />
          </Link>

          <a
            href={STATIC_PATHS.gitHubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100"
          >
            <FaGithub />
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
