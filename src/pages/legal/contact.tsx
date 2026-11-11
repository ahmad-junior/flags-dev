import SEO from "@/components/SEO";
import { CANONICAL_PATHS, STATIC_PATHS } from "@/routes";
import AdsenseAd from "@/components/adds/AdsenseAd";
import ExternalLinkModal from "@/components/modals/ExternalLinkModal";

import {
  Mail,
  MessageCircle,
  Phone,
  ArrowUpRight,
  Clock3,
  GitBranch,
  HeartHandshake,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

const contactMethods = [
  {
    number: "01",
    title: "GitHub",
    category: "OPEN SOURCE",
    description:
      "Found an issue? Have an idea worth building? Join the conversation, report bugs, or contribute to the ecosystem.",
    action: "Explore repository",
    href: STATIC_PATHS.gitHubRepo,
    external: true,
    icon: FaGithub,
    color: "text-slate-900",
    background: "bg-slate-100",
    hover: "group-hover:bg-slate-900 group-hover:text-white",
  },
  {
    number: "02",
    title: "Email",
    category: "BUSINESS & GENERAL",
    description:
      "For business inquiries, partnerships, feedback, or anything that deserves a thoughtful conversation.",
    action: "Send an email",
    href: "mailto:muhammadahmadkon@gmail.com",
    external: false,
    icon: Mail,
    color: "text-blue-600",
    background: "bg-blue-50",
    hover: "group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    number: "03",
    title: "WhatsApp",
    category: "DIRECT COMMUNICATION",
    description:
      "Sometimes a quick conversation is all it takes. Reach out directly for questions and collaboration.",
    action: "Start a conversation",
    href: "https://wa.me/+923001860770",
    external: true,
    icon: MessageCircle,
    color: "text-emerald-600",
    background: "bg-emerald-50",
    hover: "group-hover:bg-emerald-600 group-hover:text-white",
  },
  {
    number: "04",
    title: "Phone",
    category: "DIRECT CONTACT",
    description:
      "Prefer speaking directly? Get in touch during normal business hours, Pakistan Standard Time.",
    action: "Call us",
    href: "tel:+923001860770",
    external: false,
    icon: Phone,
    color: "text-violet-600",
    background: "bg-violet-50",
    hover: "group-hover:bg-violet-600 group-hover:text-white",
  },
];

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with FlagsDev. Report bugs, request features, discuss partnerships, or contribute to our privacy-first open-source tools."
        keywords="contact, flagsdev, open source, privacy-first, report bugs, request features, partnerships, contribute"
        canonical={CANONICAL_PATHS.contact}
      />

      <main className="relative overflow-hidden bg-white text-slate-900">
        <section className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-end gap-12 mt-6 lg:grid-cols-[1fr_340px]">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[76px]">
                Every great idea
                <br />
                starts with a{" "}
                <span className="text-blue-600">conversation.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
                Questions, feedback, opportunities, or simply an idea you&apos;d
                like to share. We&apos;re always interested in hearing from
                people building a better web.
              </p>
            </div>

            <div className="border-l border-slate-200 pl-7 pb-2">
              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-400">
                A NOTE FROM FLAGDEV
              </span>

              <p className="mt-5 text-lg font-medium leading-8 tracking-tight text-slate-800">
                Built independently.
                <br />
                Open to everyone.
                <br />
                Always evolving.
              </p>

              <div className="mt-7 flex items-center gap-3 text-sm text-slate-500">
                <HeartHandshake size={19} className="text-blue-600" />
                <span>Community comes first.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact channels */}
        <section
          aria-labelledby="contact-options"
          className="relative mx-auto max-w-7xl px-6 pb-24"
        >
          <div className="my-10 flex flex-col justify-between gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end">
            <div>
              <h2
                id="contact-options"
                className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
              >
                Find your way to us.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Choose the channel that best suits your inquiry. We&apos;ll take
              it from there.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {contactMethods.map((method) => {
              const Icon = method.icon;

              return (
                <article
                  key={method.number}
                  className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_60px_-25px_rgba(15,23,42,0.16)] sm:p-9"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${method.background} ${method.color} transition-all duration-300 ${method.hover}`}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <span className="font-mono text-xs tracking-wider text-slate-300">
                      {method.number} /{" "}
                      {contactMethods.length.toString().padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-8">
                    <span className="text-[10px] font-bold tracking-[0.17em] text-slate-400">
                      {method.category}
                    </span>

                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                      {method.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                      {method.description}
                    </p>
                  </div>

                  <div className="mt-auto border-t border-slate-100 pt-6">
                    {method.external ? (
                      <ExternalLinkModal
                        href={method.href}
                        siteName={method.title}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
                      >
                        {method.action}
                        <ArrowUpRight
                          size={16}
                          className="text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600"
                        />
                      </ExternalLinkModal>
                    ) : (
                      <a
                        href={method.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
                      >
                        {method.action}
                        <ArrowUpRight
                          size={16}
                          className="text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600"
                        />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Response time */}
        <section className="relative mx-auto max-w-7xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-2xl bg-[#101827]">
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 h-full w-1/2 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 40%, #3b82f6 0, transparent 55%)",
              }}
            />

            <div className="relative grid gap-12 px-8 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1fr_300px] lg:items-center">
              <div>
                <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Good conversations deserve thoughtful responses.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-8 text-slate-400 sm:text-base">
                  We aim to respond within 24 to 48 hours. FlagsDev is an
                  independently maintained open-source project, so response
                  times may vary depending on availability.
                </p>
              </div>

              <div className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="flex items-center gap-3 text-blue-300">
                  <Clock3 size={20} strokeWidth={1.7} />
                  <span className="font-mono text-[11px] font-semibold tracking-[0.15em]">
                    TYPICAL RESPONSE
                  </span>
                </div>

                <p className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-white">
                  24 - 48
                </p>

                <p className="mt-2 text-sm font-medium text-slate-400">Hours</p>

                <div className="mt-7 h-px bg-white/10" />

                <p className="mt-5 text-xs leading-6 text-slate-500">
                  Thank you for your patience and for supporting independent
                  open-source development.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pb-20">
          <div className="flex flex-col justify-between gap-6 border-t border-slate-200 pt-9 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-slate-900">
                <GitBranch size={17} className="text-blue-600" />

                <h2 className="text-lg font-semibold tracking-tight">
                  Built in the open. Improved together.
                </h2>
              </div>

              <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
                FlagsDev is a privacy-first open-source project. Your feedback
                helps make it better for everyone.
              </p>
            </div>

            <ExternalLinkModal
              href={STATIC_PATHS.gitHubRepo}
              siteName="Flagsdev Github Repository"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <FaGithub size={17} />
              Contribute on GitHub
              <ArrowUpRight size={15} />
            </ExternalLinkModal>
          </div>
        </section>

        <div className="relative mx-auto max-w-7xl px-6 pb-10">
          <AdsenseAd />
        </div>
      </main>
    </>
  );
}
