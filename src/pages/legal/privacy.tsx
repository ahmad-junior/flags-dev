import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";
import { CANONICAL_PATHS } from "@/routes";
import {
  ShieldCheck,
  LockKeyhole,
  FileCheck2,
  UserRound,
  Cookie,
  ChartNoAxesCombined,
  Globe,
  Server,
  Shield,
  RefreshCw,
  CalendarDays,
  Info,
} from "lucide-react";

const LAST_UPDATE_PRIVACY = "12 - November - 2026";

const PRIVACY_SECTIONS = [
  {
    id: "commitment",
    number: "01",
    title: "Our Privacy Commitment",
    icon: ShieldCheck,
    content: [
      "FlagsDev is built with privacy as a core principle. Our tools are designed to process files locally in your browser whenever the tool supports it.",
      "We aim to minimize unnecessary data collection and provide a straightforward experience that keeps users in control of their files and information.",
    ],
  },
  {
    id: "file-processing",
    number: "02",
    title: "File Processing",
    icon: FileCheck2,
    content: [
      "Many of our document, image, and other utilities use browser-based technologies to process files directly on your device.",
      "For tools that support local processing, file contents are not uploaded to FlagsDev servers as part of the processing workflow. Some features or external services may work differently, and their data handling should be explained where applicable.",
    ],
  },
  {
    id: "personal-information",
    number: "03",
    title: "Personal Information",
    icon: UserRound,
    content: [
      "You do not need to create an account to use the core FlagsDev tools.",
      "If you contact us voluntarily through email or another communication channel, we may receive the information you choose to provide, such as your name, email address, and message. We use this information to respond to your inquiry.",
    ],
  },
  {
    id: "cookies",
    number: "04",
    title: "Cookies and Similar Technologies",
    icon: Cookie,
    content: [
      "FlagsDev or its third-party providers may use cookies or similar technologies for website functionality, analytics, and advertising purposes.",
      "These technologies are not used by our local file-processing tools to read the contents of your files. You can manage cookies through your browser settings, although disabling some cookies may affect website functionality.",
    ],
  },
  {
    id: "analytics",
    number: "05",
    title: "Analytics",
    icon: ChartNoAxesCombined,
    content: [
      "We may use analytics services to understand general website usage, identify performance issues, and improve the FlagsDev experience.",
      "Depending on the analytics provider and configuration, limited technical information such as page views, browser details, device information, and approximate usage data may be processed. Analytics are not intended to access the contents of files processed locally in your browser.",
    ],
  },
  {
    id: "advertising",
    number: "06",
    title: "Advertising",
    icon: Globe,
    content: [
      "FlagsDev may display advertisements to help support website hosting, maintenance, and continued development.",
      "If third-party advertising services such as Google AdSense are used, those providers may use cookies or similar technologies to serve, measure, or personalize advertisements according to their own privacy policies and applicable settings.",
    ],
  },
  {
    id: "third-party",
    number: "07",
    title: "Third-Party Services",
    icon: Server,
    content: [
      "FlagsDev may rely on third-party services for website hosting, content delivery, security, analytics, and advertising.",
      "These providers may process limited technical information necessary to deliver their services. Their handling of information is governed by their respective privacy policies and terms.",
    ],
  },
  {
    id: "security",
    number: "08",
    title: "Security",
    icon: LockKeyhole,
    content: [
      "We use HTTPS to protect communication between your browser and our website.",
      "We also aim to minimize unnecessary data handling and use appropriate technical measures to maintain the reliability and security of the platform. No internet service can guarantee absolute security.",
    ],
  },
  {
    id: "changes",
    number: "09",
    title: "Changes to This Policy",
    icon: RefreshCw,
    content: [
      "We may update this Privacy Policy as FlagsDev evolves, new features are introduced, or our services and practices change.",
      "Any updates will be published on this page along with a revised last-updated date. We encourage users to review this page periodically.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how FlagsDev approaches privacy, processes files locally where supported, and handles website information, cookies, analytics, and third-party services."
        keywords="FlagsDev, privacy policy, file processing, local processing, personal information, cookies, analytics, third-party services, data minimization"
        canonical={CANONICAL_PATHS.privacy}
      />

      <main className="overflow-hidden bg-white">
        <section className="relative border-b border-slate-200 bg-slate-50">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-blue-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-[350px] w-[350px] rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 border-b-2 border-blue-200 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 hover:border-blue-300 hover:text-blue-800">
                <ShieldCheck size={15} />
                Your privacy matters
              </div>

              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Your privacy.
                <span className="block text-blue-600">Your control.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                We believe useful online tools should respect the people who use
                them. Learn how FlagsDev approaches file processing, personal
                information, cookies, and website privacy.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} className="text-blue-600" />
                  Last updated: {LAST_UPDATE_PRIVACY}
                </span>
                <span className="inline-flex items-center gap-2">
                  <LockKeyhole size={16} className="text-blue-600" />
                  Privacy focused approach
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileCheck2 size={22} />
              </div>
              <h2 className="mt-5 font-bold text-slate-900">
                Local file processing
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Files are processed in your browser whenever supported by the
                tool.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <UserRound size={22} />
              </div>
              <h2 className="mt-5 font-bold text-slate-900">
                No account required
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Core FlagsDev tools are available without creating an account.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Shield size={22} />
              </div>
              <h2 className="mt-5 font-bold text-slate-900">
                Data minimization
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                We aim to minimize unnecessary collection and handling of
                information.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 lg:grid-cols-[260px_1fr] lg:gap-20">
          <aside className="h-fit lg:sticky lg:top-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              On this page
            </p>

            <nav className="mt-5 space-y-1">
              {PRIVACY_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                >
                  <span className="text-xs font-semibold tabular-nums text-slate-400">
                    {section.number}
                  </span>
                  <span>{section.title}</span>
                </a>
              ))}
            </nav>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
              <ShieldCheck size={22} className="text-blue-600" />
              <p className="mt-3 text-sm font-semibold text-slate-900">
                Privacy by design
              </p>
              <p className="mt-2 text-xs leading-6 text-slate-600">
                Our goal is to make useful tools without unnecessary collection
                of your data.
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-10 border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Privacy Policy
              </h2>
              <p className="mt-4 leading-8 text-slate-600">
                This policy explains how FlagsDev handles information when you
                visit our website and use our tools. It also describes the role
                of third-party services that may support the platform.
              </p>
            </div>

            <div className="space-y-0">
              {PRIVACY_SECTIONS.map((section) => {
                const Icon = section.icon;

                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-10 border-b border-slate-200 py-9 first:pt-0 last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-semibold tracking-widest text-blue-600">
                            {section.number}
                          </span>
                          <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                            {section.title}
                          </h2>
                        </div>

                        <div className="mt-4 space-y-4 text-sm leading-8 text-slate-600 sm:text-base">
                          {section.content.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6">
          <AdsenseAd />
        </div>

        <section className="mx-auto max-w-6xl px-6 pb-24 pt-12">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <Info size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                  Have a privacy question?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  If you have questions about this policy or how FlagsDev
                  handles information, you can contact us. We welcome feedback
                  that helps us improve transparency and privacy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
