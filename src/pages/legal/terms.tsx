import SEO from "@/components/SEO";
import { CANONICAL_PATHS, STATIC_PATHS } from "@/routes";
import Link from "next/link";
import AdsenseAd from "@/components/adds/AdsenseAd";
import {
  Scale,
  FileCheck2,
  ShieldCheck,
  Globe,
  Code2,
  Clock,
  AlertTriangle,
  Ban,
  RefreshCw,
  Mail,
  Info,
  CalendarDays,
} from "lucide-react";

const LAST_UPDATE_TERMS = "12 - November - 2026";

const TERMS_SECTIONS = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of Terms",
    icon: FileCheck2,
    paragraphs: [
      "By accessing or using FlagsDev, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.",
      "If you do not agree with these terms, please discontinue using the flagsdev website and its services.",
    ],
  },
  {
    id: "use-of-service",
    number: "02",
    title: "Use of the Service",
    icon: Globe,
    paragraphs: [
      "FlagsDev provides browser based utilities for working with documents, images, text, and other digital content. Features and processing methods may vary between individual tools.",
      "You are responsible for the files and information you use with our tools, verifying generated outputs, and ensuring that your use complies with applicable laws and third party rights.",
    ],
  },
  {
    id: "open-source",
    number: "03",
    title: "Open Source Software",
    icon: Code2,
    paragraphs: [
      "Parts of FlagsDev are released as open source software and may be available through our GitHub repository.",
      "Open source components are governed by their respective licenses. These Terms do not replace or override the applicable license terms for those components.",
    ],
  },
  {
    id: "availability",
    number: "04",
    title: "Availability and Changes",
    icon: Clock,
    paragraphs: [
      "We aim to maintain a reliable and accessible platform, but we do not guarantee that FlagsDev will always be available, uninterrupted, secure, or free from errors.",
      "We reserve the right to modify, suspend, restrict, or discontinue any part of the website or its tools when necessary, without guaranteeing prior notice.",
    ],
  },
  {
    id: "disclaimer",
    number: "05",
    title: "Disclaimer of Warranties",
    icon: ShieldCheck,
    paragraphs: [
      'FlagsDev and its tools are provided on an "AS IS" and "AS AVAILABLE" basis, without warranties of any kind, whether express, implied, or statutory.',
      "To the extent permitted by applicable law, we disclaim implied warranties including merchantability, fitness for a particular purpose, availability, accuracy, and non infringement.",
    ],
  },
  {
    id: "liability",
    number: "06",
    title: "Limitation of Liability",
    icon: Scale,
    paragraphs: [
      "To the maximum extent permitted by applicable law, FlagsDev and its contributors shall not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, or business opportunities arising from your use of the website.",
      "You are responsible for maintaining appropriate backups of important files and checking the accuracy and integrity of processed results.",
    ],
  },
  {
    id: "prohibited-use",
    number: "07",
    title: "Prohibited Activities",
    icon: Ban,
    paragraphs: [
      "You agree not to use FlagsDev in ways that violate applicable laws, infringe the rights of others, or compromise the security and integrity of the platform.",
    ],
    list: [
      "Use the service for unlawful, fraudulent, or harmful activities.",
      "Attempt to disrupt, damage, overload, or interfere with the website or its infrastructure.",
      "Attempt unauthorized access to systems, accounts, or services connected to FlagsDev.",
      "Use the tools to create, process, or distribute content in violation of applicable laws or third-party rights.",
      "Abuse the platform in ways that negatively affect its availability or other users.",
    ],
  },
  {
    id: "third-party",
    number: "08",
    title: "Third-Party Services and Links",
    icon: Globe,
    paragraphs: [
      "FlagsDev may contain links to external websites or rely on third party services for hosting, analytics, advertising, or other functionality.",
      "We do not control and are not responsible for the content, availability, policies, or practices of external services. Your interactions with those services are subject to their own terms and policies.",
    ],
  },
  {
    id: "changes",
    number: "09",
    title: "Changes to These Terms",
    icon: RefreshCw,
    paragraphs: [
      "We may revise these Terms of Service as FlagsDev evolves, new features are introduced, or operational and legal requirements change.",
      "Updated terms will be published on this page with a revised last-updated date. Your continued use of FlagsDev after changes take effect constitutes acceptance of the revised terms, to the extent permitted by applicable law.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the FlagsDev Terms of Service covering acceptable use, open-source licensing, service availability, disclaimers, and user responsibilities."
        canonical={CANONICAL_PATHS.terms}
      />

      <main className="overflow-hidden bg-white">
        <section className="relative border-b border-slate-200 bg-slate-950 text-white">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="max-w-3xl">
              <div className="mb-8 inline-flex items-center gap-2 border-b-2 border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                <Scale size={15} />
                Legal & guidelines
              </div>

              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                Clear terms.
                <span className="block text-blue-400">Responsible use.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                These terms explain the responsibilities, conditions, and
                guidelines that apply when using FlagsDev and its browser
                powered tools.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} className="text-blue-400" />
                  Last updated: {LAST_UPDATE_TERMS}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FileCheck2 size={16} className="text-blue-400" />
                  Terms of Service
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-slate-200/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={22} />
              </div>
              <h2 className="mt-5 font-bold text-slate-900">Responsible use</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Use FlagsDev responsibly and respect applicable laws and third
                party rights.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-slate-200/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Code2 size={22} />
              </div>
              <h2 className="mt-5 font-bold text-slate-900">
                Open source freedom
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Open source components remain subject to their respective
                licenses.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-slate-200/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Info size={22} />
              </div>
              <h2 className="mt-5 font-bold text-slate-900">
                Important disclaimers
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Understand service availability, warranties, and your
                responsibilities.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 lg:grid-cols-[260px_1fr] lg:gap-20">
          <aside className="h-fit lg:sticky lg:top-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Contents
            </p>

            <nav className="mt-5 space-y-1">
              {TERMS_SECTIONS.map((section) => (
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
              <a
                href="#contact"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
              >
                <span className="text-xs font-semibold tabular-nums text-slate-400">
                  10
                </span>
                Contact
              </a>
            </nav>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
              <Scale size={22} className="text-blue-600" />
              <p className="mt-3 text-sm font-semibold text-slate-900">
                Use responsibly
              </p>
              <p className="mt-2 text-xs leading-6 text-slate-600">
                Respect the platform, other users, and applicable laws when
                using FlagsDev.
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-10 border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Terms and Conditions
              </h2>
              <p className="mt-4 leading-8 text-slate-600">
                Please read these terms carefully before using FlagsDev. They
                apply to visitors and users of the website and its available
                tools.
              </p>
            </div>

            <div>
              {TERMS_SECTIONS.map((section) => {
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
                          {section.paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>

                        {section.list && (
                          <ul className="mt-5 space-y-3">
                            {section.list.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 text-sm leading-7 text-slate-600 sm:text-base"
                              >
                                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </section>
                );
              })}

              <section
                id="contact"
                className="scroll-mt-10 border-b border-slate-200 py-9"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Mail size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold tracking-widest text-blue-600">
                        10
                      </span>
                      <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                        Contact
                      </h2>
                    </div>

                    <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                      If you have questions about these Terms of Service, please
                      reach out through our{" "}
                      <Link
                        href={STATIC_PATHS.contact}
                        className="font-semibold text-blue-600 underline decoration-blue-200 underline-offset-4 transition-colors hover:text-blue-700"
                      >
                        Contact page
                      </Link>{" "}
                      or report an issue through our GitHub repository.
                    </p>
                  </div>
                </div>
              </section>
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
                <AlertTriangle size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                  A final reminder
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Always verify important files and results before relying on
                  them. Keep backups of valuable data and use the platform in
                  accordance with these terms.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
