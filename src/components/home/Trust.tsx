import { STATIC_PATHS } from "@/routes";
import { ShieldCheck, Laptop, BadgeCheck } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const features = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
    title: "100% Private",
    description:
      "Every file is processed locally in your browser. Nothing is uploaded or stored on our servers.",
  },
  {
    icon: <FaGithub className="h-6 w-6 text-blue-600" />,
    title: "Open Source",
    description:
      "Our source code is public, transparent, and open for anyone to inspect or contribute.",
  },
  {
    icon: <Laptop className="h-6 w-6 text-blue-600" />,
    title: "Browser Powered",
    description:
      "Everything runs directly in your browser with no software installation required.",
  },
  {
    icon: <BadgeCheck className="h-6 w-6 text-blue-600" />,
    title: "Free Forever",
    description:
      "All tools are free to use without creating an account or paying a subscription.",
  },
];

export default function Trust() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xl font-semibold uppercase tracking-wider text-blue-600">
            Why FlagsDev?
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Your files stay in your hands.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            <Link
              href={STATIC_PATHS.home}
              className="font-semibold text-slate-900 transition-colors hover:text-blue-600"
            >
              FlagsDev
            </Link>{" "}
            is built around one simple idea: your files belong to you. Every
            tool runs entirely in your browser, so your data never leaves your
            device.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
