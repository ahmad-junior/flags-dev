"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, ExternalLink, Lock, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import SEO from "@/components/SEO";
import ExternalLinkModal from "@/components/modals/ExternalLinkModal";
import { CANONICAL_PATHS, PUBLIC_PATHS, SITE_URL } from "@/routes";

const beliefs = [
  {
    icon: Lock,
    title: "Privacy",
    description:
      "When something can be processed on your device, I believe it should be.",
    className: "border-emerald-200 bg-emerald-50/60",
    iconClass: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Sparkles,
    title: "Simplicity",
    description:
      "Software should solve the problem without adding unnecessary complexity.",
    className: "border-cyan-200 bg-cyan-50/60",
    iconClass: "bg-cyan-100 text-cyan-600",
  },
  {
    icon: Code2,
    title: "Open source",
    description:
      "People should be able to see how the software they use actually works.",
    className: "border-violet-200 bg-violet-50/60",
    iconClass: "bg-violet-100 text-violet-600",
  },
];

export default function FounderPage() {
  const founderUrl = new URL(CANONICAL_PATHS.founder, SITE_URL).toString();

  return (
    <>
      <SEO
        title="Muhammad Ahmad | Founder of FlagsDev"
        description="Meet Muhammad Ahmad, the founder of FlagsDev, and learn why he started building privacy-first open-source software."
        canonical={CANONICAL_PATHS.founder}
        keywords="Muhammad Ahmad FlagsDev founder software engineer Pakistan open source developer privacy-first software privacy-focused software open source software client-side software browser-based tools local processing web tools privacy tools"
      />

      <main className="relative overflow-hidden bg-white text-slate-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl sm:-left-40 sm:top-24 sm:h-96 sm:w-96" />

          <div className="absolute -right-32 top-[32rem] h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl sm:-right-40 sm:top-[38rem] sm:h-96 sm:w-96" />

          <div className="absolute left-1/3 top-[96rem] h-72 w-72 rounded-full bg-violet-200/20 blur-3xl sm:top-[100rem] sm:h-96 sm:w-96" />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Ahmad",
              jobTitle: "Software Engineer",
              url: founderUrl,
              image: `${SITE_URL}/images/founder.jpeg`,
              worksFor: {
                "@type": "Organization",
                name: "FlagsDev",
                url: SITE_URL,
              },
              sameAs: ["https://github.com/ahmad-junior"],
            }),
          }}
        />

        <section aria-labelledby="founder-heading" className="relative">
          <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-28">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
              <header className="order-2 text-center lg:order-1 lg:text-left">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm sm:mb-8">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />

                  <span>Founder of FlagsDev</span>
                </div>

                <h1
                  id="founder-heading"
                  className="mx-auto max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:mx-0 lg:text-6xl xl:text-7xl"
                >
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent">
                    Muhammad Ahmad.
                  </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:mt-7 sm:text-xl sm:leading-9 lg:mx-0 lg:text-2xl">
                  I&apos;m a Software Engineer who enjoys building things from
                  the ground up.
                </p>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:mt-6 sm:text-base sm:leading-8 lg:mx-0">
                  I like understanding how things work, questioning why they
                  work that way, and finding simpler ways to solve problems.
                  FlagsDev is one of the places where I&apos;m putting those
                  ideas into practice.
                </p>

                <nav
                  aria-label="Founder links"
                  className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-9 lg:justify-start"
                >
                  <Link
                    href={PUBLIC_PATHS.home}
                    className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                  >
                    Explore FlagsDev
                    <ArrowRight
                      aria-hidden="true"
                      size={15}
                      className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                    />
                  </Link>

                  <ExternalLinkModal
                    href={PUBLIC_PATHS.gitHubRepo}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md hover:border-violet-200 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                  >
                    <FaGithub aria-hidden="true" size={16} />

                    <span>GitHub</span>

                    <ExternalLink
                      aria-hidden="true"
                      size={13}
                      className="text-slate-400"
                    />
                  </ExternalLinkModal>
                </nav>
              </header>

              <figure className="order-1 mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:order-2 lg:max-w-[360px]">
                <div className="relative px-3 pb-8 sm:px-5 sm:pb-10 lg:px-0 lg:pb-0">
                  <div
                    aria-hidden="true"
                    className="absolute inset-2 rounded-[2rem] bg-gradient-to-br from-emerald-200/50 via-cyan-200/35 to-violet-200/45 blur-2xl"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute -bottom-1 -right-1 h-24 w-24 rounded-[1.5rem] bg-gradient-to-br from-emerald-200 to-cyan-200 sm:-bottom-3 sm:-right-3 sm:h-28 sm:w-28"
                  />

                  <div className="relative rounded-[1.75rem] border border-slate-200 bg-white p-2 shadow-xl">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-slate-100">
                      <Image
                        src="/images/founder.jpeg"
                        alt="Portrait of Muhammad Ahmad, Software Engineer and founder of FlagsDev"
                        fill
                        priority
                        sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 360px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <figcaption className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-2xl border border-emerald-100 bg-white px-4 py-2.5 shadow-lg sm:-bottom-5 sm:left-4 sm:translate-x-0 sm:px-5 sm:py-3">
                    <p className="whitespace-nowrap text-xs font-semibold text-slate-900">
                      Muhammad Ahmad
                    </p>

                    <p className="mt-0.5 whitespace-nowrap text-[11px] text-slate-500">
                      Software Engineer
                    </p>
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="why-flagsdev-heading"
          className="relative border-y border-emerald-100 bg-gradient-to-br from-emerald-50/50 via-white to-cyan-50/40"
        >
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-[100px_1fr] lg:gap-14">
              <div className="flex items-center gap-3 lg:block">
                <span
                  aria-hidden="true"
                  className="font-mono text-xs tracking-widest text-emerald-600/60"
                >
                  01
                </span>

                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-emerald-200/60 lg:hidden"
                />
              </div>

              <article>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600 sm:text-xs">
                  Why I started FlagsDev
                </p>

                <h2
                  id="why-flagsdev-heading"
                  className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.045em] text-slate-950 sm:mt-5 sm:text-3xl lg:text-4xl xl:text-5xl"
                >
                  I wanted to build a different kind of web tool.
                </h2>

                <div className="mt-7 max-w-3xl space-y-5 text-[15px] leading-7 text-slate-600 sm:mt-9 sm:space-y-6 sm:text-base sm:leading-8 lg:text-lg">
                  <p>I kept noticing a simple pattern on the web.</p>

                  <div
                    role="group"
                    aria-label="Examples of common file-processing workflows"
                    className="rounded-2xl border border-emerald-100/70 bg-white/60 p-4 sm:p-5"
                  >
                    <p>
                      Need to merge a PDF?{" "}
                      <span className="font-medium text-slate-800">
                        Upload it.
                      </span>
                    </p>

                    <p>
                      Need to convert a file?{" "}
                      <span className="font-medium text-slate-800">
                        Upload it.
                      </span>
                    </p>

                    <p>
                      Need to process some data?{" "}
                      <span className="font-medium text-slate-800">
                        Send it to a server.
                      </span>
                    </p>
                  </div>

                  <p>
                    Uploading became the default solution for many everyday
                    tasks, even when the task itself did not necessarily require
                    a remote server.
                  </p>

                  <p>
                    At the same time, modern browsers have become remarkably
                    capable. They can process files, documents, images, and data
                    directly on the user&apos;s device.
                  </p>

                  <p className="border-l-2 border-emerald-300 pl-4 text-base font-medium leading-7 text-slate-950 sm:pl-5 sm:text-lg sm:leading-8 lg:text-xl">
                    That made me ask a simple question:
                    <br />
                    <span className="text-emerald-700">
                      What if useful web tools could simply process things
                      locally?
                    </span>
                  </p>

                  <p>
                    FlagsDev started from that question. It is my attempt to
                    explore what privacy-first, client-side software can look
                    like when privacy is considered from the beginning rather
                    than added later.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="beliefs-heading" className="relative">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              <div>
                <div className="flex items-center gap-3 lg:block">
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs tracking-widest text-violet-600/60"
                  >
                    02
                  </span>

                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-violet-200/60 lg:hidden"
                  />
                </div>

                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-600 sm:mt-6 sm:text-xs">
                  What I believe
                </p>

                <h2
                  id="beliefs-heading"
                  className="mt-4 text-2xl font-semibold tracking-[-0.045em] text-slate-950 sm:mt-5 sm:text-3xl lg:text-4xl"
                >
                  A few ideas that guide my work.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:mt-5 sm:text-base sm:leading-8">
                  These aren&apos;t rules for every piece of software. They are
                  simply the principles I want to keep coming back to.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {beliefs.map((belief) => {
                  const Icon = belief.icon;

                  return (
                    <article
                      key={belief.title}
                      className={`rounded-2xl border p-5 transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md sm:p-7 ${belief.className}`}
                    >
                      <div className="flex gap-4 sm:gap-5">
                        <div
                          aria-hidden="true"
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${belief.iconClass}`}
                        >
                          <Icon size={18} />
                        </div>

                        <div>
                          <h3 className="text-base font-semibold text-slate-950 sm:text-lg">
                            {belief.title}
                          </h3>

                          <p className="mt-1.5 text-sm leading-6 text-slate-600 sm:mt-2 sm:leading-7">
                            {belief.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="future-heading"
          className="relative border-y border-violet-100 bg-gradient-to-br from-violet-50/50 via-white to-cyan-50/40"
        >
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-[100px_1fr] lg:gap-14">
              <div className="flex items-center gap-3 lg:block">
                <span
                  aria-hidden="true"
                  className="font-mono text-xs tracking-widest text-violet-600/60"
                >
                  03
                </span>

                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-violet-200/60 lg:hidden"
                />
              </div>

              <article>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-600 sm:text-xs">
                  Where I want to take it
                </p>

                <h2
                  id="future-heading"
                  className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.045em] text-slate-950 sm:mt-5 sm:text-3xl lg:text-4xl xl:text-5xl"
                >
                  I want FlagsDev to become a place people can trust.
                </h2>

                <div className="mt-7 max-w-3xl space-y-5 text-[15px] leading-7 text-slate-600 sm:mt-9 sm:space-y-6 sm:text-base sm:leading-8 lg:text-lg">
                  <p>
                    I want FlagsDev to grow into a collection of genuinely
                    useful software that people can use without wondering where
                    their files went, what data was collected, or whether they
                    need an account just to complete a simple task.
                  </p>

                  <ul
                    aria-label="Principles for the future of FlagsDev"
                    className="space-y-3"
                  >
                    <li className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"
                      />

                      <span>
                        Whenever processing can happen locally, I want to keep
                        it local.
                      </span>
                    </li>

                    <li className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"
                      />

                      <span>
                        Whenever software can be open, I want people to be able
                        to inspect it.
                      </span>
                    </li>

                    <li className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"
                      />

                      <span>
                        Whenever a tool can be made simpler, I want to simplify
                        it.
                      </span>
                    </li>
                  </ul>

                  <p className="font-medium text-slate-950">
                    FlagsDev is still small, and there is a lot left to build.
                    But the idea behind it is something I care about deeply.
                  </p>
                </div>

                <blockquote className="mt-10 rounded-2xl border border-violet-100 bg-white/70 p-5 sm:mt-12 sm:border-0 sm:border-l-2 sm:border-violet-300 sm:bg-transparent sm:p-0 sm:pl-6">
                  <p className="text-xl font-medium tracking-[-0.035em] text-slate-950 sm:text-2xl lg:text-3xl">
                    &ldquo;Build software worth trusting.&rdquo;
                  </p>

                  <footer className="mt-3 text-sm text-slate-500">
                    Muhammad Ahmad
                  </footer>
                </blockquote>
              </article>
            </div>
          </div>
        </section>

        <footer className="relative">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24 lg:py-32">
            <p className="text-sm leading-7 text-slate-500">
              Thanks for taking the time to learn about the person behind
              FlagsDev.
            </p>

            <p className="mt-2 text-sm font-medium text-slate-900">
              Muhammad Ahmad
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Software Engineer · Founder of FlagsDev
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
