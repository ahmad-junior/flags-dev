import { ShieldCheck, Laptop, BadgeCheck } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Private",
    description:
      "All files are processed locally in your browser. Nothing is uploaded.",
  },
  {
    icon: FaGithub,
    title: "Open Source",
    description:
      "Our source code is public, transparent, and open for everyone.",
  },
  {
    icon: Laptop,
    title: "Browser Powered",
    description:
      "No software installation required. Works directly in modern browsers.",
  },
  {
    icon: BadgeCheck,
    title: "Free Forever",
    description: "Every tool is free to use without creating an account.",
  },
];

export default function Trust() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Built with privacy at its core
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            FlagsDev is designed differently. Your files stay on your device,
            and every tool runs entirely inside your browser.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
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
