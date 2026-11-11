import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";
import { CANONICAL_PATHS } from "@/routes";
import {
  ShieldCheck,
  Sparkles,
  Gauge,
  Accessibility,
  GitBranch,
  Users,
  LockKeyhole,
  FileText,
  Code2,
  HeartHandshake,
  ArrowDown,
} from "lucide-react";

const LAST_UPDATE_ABOUT = "12 - November - 2026";

const OUR_VALUES = [
  {
    title: "Privacy by Design",
    description:
      "Your privacy comes first. Whenever possible, files are processed locally in your browser and remain under your control.",
    icon: ShieldCheck,
    number: "01",
  },
  {
    title: "Simple Experiences",
    description:
      "We build intuitive tools that eliminate unnecessary complexity and help you get work done faster.",
    icon: Sparkles,
    number: "02",
  },
  {
    title: "Performance",
    description:
      "Our browser powered tools are designed for speed, responsiveness, and reliability across modern devices.",
    icon: Gauge,
    number: "03",
  },
  {
    title: "Free & Accessible",
    description:
      "Useful software should be available to everyone without expensive subscriptions or unnecessary barriers.",
    icon: Accessibility,
    number: "04",
  },
  {
    title: "Open & Transparent",
    description:
      "Open-source development encourages transparency, collaboration, and continuous improvement.",
    icon: GitBranch,
    number: "05",
  },
  {
    title: "Community Driven",
    description:
      "Feedback and contributions help shape our roadmap as we continue improving FlagsDev.",
    icon: Users,
    number: "06",
  },
];

const WHAT_WE_BUILD = [
  {
    title: "Document tools",
    description:
      "Work with PDFs and documents through practical browser-based utilities.",
    icon: FileText,
  },
  {
    title: "Privacy focused tools",
    description:
      "Complete everyday tasks while keeping your data under your control whenever possible.",
    icon: LockKeyhole,
  },
  {
    title: "Developer utilities",
    description:
      "Useful utilities that make common development tasks simpler and faster.",
    icon: Code2,
  },
  {
    title: "Open source platform",
    description:
      "Built with transparency and improved together through open-source development.",
    icon: GitBranch,
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-8 bg-blue-600" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
        {children}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about FlagsDev, our mission, values, and commitment to building free, privacy-first, browser-powered tools."
        canonical={CANONICAL_PATHS.about}
      />

      <main className="overflow-hidden bg-white">
        <section className="relative border-b border-slate-200 bg-slate-50">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
            <div className="max-w-3xl">
              <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-blue-700 border-b-2">
                GET TO KNOW FLAGDEV
              </div>

              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Technology should work for you.
                <span className="mt-2 block text-blue-600">
                  Not against your privacy.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                FlagsDev is an open source platform building practical, browser
                powered tools that make everyday digital tasks simpler, faster,
                and more private.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <ShieldCheck size={18} className="text-blue-600" />
                  Privacy focused
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <GitBranch size={18} className="text-blue-600" />
                  Open source
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Sparkles size={18} className="text-blue-600" />
                  Free to use
                </div>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              <ArrowDown size={15} />
              Discover our story
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <SectionLabel>Our story</SectionLabel>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              Building a more thoughtful web experience.
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-500">
              Last updated: {LAST_UPDATE_ABOUT}
            </p>
          </div>

          <div className="space-y-6 text-base leading-8 text-slate-600">
            <p>
              FlagsDev is an open source platform dedicated to building fast,
              secure, and privacy first online tools. Our goal is to provide
              simple, reliable utilities that help people work with documents,
              images, and other digital content directly from their browser.
            </p>

            <p>
              We believe useful software should be accessible to everyone
              without expensive subscriptions, unnecessary downloads, or
              complicated workflows. We focus on creating tools that are free,
              easy to use, and respectful of user privacy.
            </p>

            <p>
              FlagsDev is an evolving project. We continuously work on new
              utilities, improve existing features, and listen to user feedback
              to build a platform people can rely on.
            </p>
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel>Privacy first</SectionLabel>
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Your files belong to you. Your privacy should too.
              </h2>
              <p className="mt-6 max-w-xl leading-8 text-slate-400">
                Privacy is at the heart of FlagsDev. Whenever possible, our
                tools process files locally in your browser instead of uploading
                them to remote servers. This helps keep your documents under
                your control while providing a convenient experience.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <LockKeyhole size={25} className="text-blue-400" />
                <h3 className="mt-5 font-semibold text-white">
                  Local processing
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Files are processed in your browser whenever the tool supports
                  it.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <ShieldCheck size={25} className="text-blue-400" />
                <h3 className="mt-5 font-semibold text-white">User control</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  We aim to minimize unnecessary data handling and keep
                  workflows straightforward.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <SectionLabel>What we build</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Small tools. Meaningful improvements.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              FlagsDev is growing into a collection of practical utilities
              designed to make everyday digital work easier.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {WHAT_WE_BUILD.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <SectionLabel>What guides us</SectionLabel>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Principles behind every tool.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-slate-500">
                These values shape how we design, develop, and improve
                everything at FlagsDev.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {OUR_VALUES.map((value) => {
                const Icon = value.icon;

                return (
                  <article
                    key={value.number}
                    className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                        <Icon size={21} />
                      </div>
                      <span className="text-xs font-semibold tracking-widest text-slate-300">
                        {value.number}
                      </span>
                    </div>

                    <h3 className="mt-7 text-lg font-bold text-slate-900">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {value.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <SectionLabel>Open source</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Built with transparency. Improved together.
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                We believe transparency builds trust. Open-source development
                allows developers to inspect code, contribute improvements,
                report issues, and help make FlagsDev better for everyone.
              </p>
            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <GitBranch size={36} />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6">
          <AdsenseAd />
        </div>

        <section className="mx-auto max-w-4xl px-6 pb-24 pt-12 text-center sm:pb-28">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <HeartHandshake size={27} />
          </div>

          <h2 className="mt-7 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Growing together.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Whether you&apos;re a student, developer, professional, or casual
            user, our goal is to provide trustworthy tools that make everyday
            tasks easier while respecting your privacy.
          </p>

          <p className="mt-6 text-sm font-medium text-slate-500">
            Thank you for being part of the FlagsDev journey.
          </p>
        </section>
      </main>
    </>
  );
}
