import { ArrowUpRight } from "lucide-react";

const EnvironmentSwitch = () => {
  const isNoIndex = process.env.NEXT_PUBLIC_NOINDEX === "true";

  const productionUrl =
    process.env.NEXT_PUBLIC_PRODUCTION_URL || "https://flagsdev.com";

  const stagingUrl =
    process.env.NEXT_PUBLIC_STAGING_URL || "https://stagging.flagsdev.com";

  const targetUrl = isNoIndex ? productionUrl : stagingUrl;
  const label = isNoIndex ? "Try Production" : "Try Beta";
  const description = isNoIndex
    ? "Switch to the live version"
    : "Preview upcoming features";

  return (
    <a
      href={targetUrl}
      className={`group inline-flex h-10 items-center gap-2 rounded-xl border px-3.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${
        isNoIndex
          ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
          : "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100"
      }`}
      aria-label={`${label}: ${description}`}
      title={description}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isNoIndex ? "bg-green-500" : "bg-violet-500"
        }`}
      />
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
};

export default EnvironmentSwitch;
