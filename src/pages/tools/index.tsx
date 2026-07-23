import SEO from "@/components/SEO";
import CustomTopHeader from "@/components/layout/CustomTopHeader";
import ToolGrid from "@/components/tools/ToolGrid";
import { tools } from "@/constants/tools";
import { ShieldCheck, Laptop, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Privacy First",
  },
  {
    icon: Laptop,
    title: "Browser Powered",
  },
  {
    icon: Lock,
    title: "No Uploads",
  },
  {
    icon: FaGithub,
    title: "Open Source",
  },
];

export default function ToolsPage() {
  return (
    <>
      <SEO
        title="Free Browser Tools"
        description="Privacy first browser tools that run entirely on your device. No uploads, no tracking, no accounts."
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <section className="mx-auto max-w-4xl">
          <CustomTopHeader title="Free Privacy-First Browser Tools" />

          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600 text-justify">
            A growing collection of fast, secure, and open-source tools that
            work entirely in your browser. Your files never leave your device,
            so your privacy stays protected.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {highlights.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                <Icon className="h-4 w-4 text-green-600" />
                {title}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                All Tools
              </h2>

              <p className="mt-2 text-slate-600">
                {tools.length} browser tools available and more coming soon.
              </p>
            </div>
          </div>

          <ToolGrid tools={tools} />
        </section>
      </main>
    </>
  );
}
