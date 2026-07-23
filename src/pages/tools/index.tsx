import ToolGrid from "@/components/tools/ToolGrid";
import { tools } from "@/constants/tools";
import CustomTopHeader from "@/components/layout/CustomTopHeader";

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <CustomTopHeader title="Free privacy first browser tools" />

        <p className="mt-5 text-lg leading-8 text-slate-600 text-justify">
          Every tool runs entirely inside your browser. No uploads. No accounts.
          No tracking. Everything stays on your device.
        </p>
      </div>

      <section className="mt-14">
        <ToolGrid tools={tools} />
      </section>
    </main>
  );
}
