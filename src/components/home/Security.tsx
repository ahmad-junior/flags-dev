import { Lock, ShieldCheck, Globe, FileCheck } from "lucide-react";
import Link from "next/link";
import { STATIC_PATHS } from "@/routes";

const securityFeatures = [
  {
    icon: Lock,
    title: "Secure HTTPS",
    description:
      "Every connection is encrypted using HTTPS to protect your data in transit.",
  },
  {
    icon: ShieldCheck,
    title: "No File Uploads",
    description:
      "Your files never leave your device. Processing happens entirely inside your browser.",
  },
  {
    icon: Globe,
    title: "Open Source",
    description:
      "Our code is publicly available so anyone can inspect, audit, and contribute.",
  },
  {
    icon: FileCheck,
    title: "No Accounts Required",
    description:
      "Use every tool instantly without signing up or sharing personal information.",
  },
];

export default function Security() {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xl font-semibold uppercase tracking-widest text-blue-600">
            Security
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Built with security and privacy in mind.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We believe file tools should be secure by default.
            <Link
              href={STATIC_PATHS.home}
              className="font-semibold text-slate-900 transition-colors hover:text-blue-600"
            >
              FlagsDev
            </Link>{" "}
            keeps your documents on your device while using modern web standards
            to protect every connection.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 text-justify">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
