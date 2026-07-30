import SEO from "@/components/SEO";
import CustomTopHeader from "@/components/layout/CustomTopHeader";
import AdsenseAd from "@/components/adds/AdsenseAd";

const LAST_UPDATE_ABOUT = "30 - July - 2026";

const OUR_VALUES = [
  {
    title: "Privacy by Design",
    description:
      "Your privacy comes first. Whenever possible, files are processed locally in your browser and remain under your control.",
  },
  {
    title: "Simple Experiences",
    description:
      "We build intuitive tools that are easy to use, eliminating unnecessary complexity and helping you get work done faster.",
  },
  {
    title: "Performance",
    description:
      "Our browser-powered tools are optimized for speed, responsiveness, and reliability across modern devices.",
  },
  {
    title: "Free & Accessible",
    description:
      "We believe useful software should be freely available and accessible to everyone without barriers.",
  },
  {
    title: "Open & Transparent",
    description:
      "Open-source development encourages transparency, collaboration, and continuous improvement.",
  },
  {
    title: "Community Driven",
    description:
      "User feedback helps shape our roadmap as we continue improving and expanding FlagsDev.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about FlagsDev, our mission, values, and commitment to building free, privacy-first, browser-powered tools."
      />

      <main className="mx-auto max-w-4xl px-6 py-20">
        <CustomTopHeader title="About Us" />

        <p className="mt-4 text-slate-600">Last updated: {LAST_UPDATE_ABOUT}</p>

        <div className="prose prose-slate mt-10 max-w-none">
          <h2 className="font-bold">Who We Are</h2>

          <p className="mb-2 text-justify">
            FlagsDev is an open-source platform dedicated to building fast,
            secure, and privacy-first online tools. Our goal is to provide
            simple, reliable utilities that help people work with documents,
            images, and other digital content directly from their browser.
          </p>

          <h2 className="font-bold">Our Mission</h2>

          <p className="mb-2 text-justify">
            We believe useful software should be accessible to everyone without
            expensive subscriptions, unnecessary downloads, or complicated
            workflows. Our mission is to create high-quality web tools that are
            free, easy to use, and respectful of user privacy.
          </p>

          <h2 className="font-bold">Privacy First</h2>

          <p className="mb-2 text-justify">
            Privacy is at the heart of FlagsDev. Whenever possible, our tools
            process files locally in your browser instead of uploading them to
            remote servers. This helps keep your documents under your control
            while providing a faster and more secure experience.
          </p>

          <h2 className="font-bold">What We Build</h2>

          <p className="mb-2 text-justify">
            FlagsDev is continuously expanding with practical browser-based
            utilities, including PDF tools, image tools, file converters, text
            utilities, developer tools, and other productivity solutions. Every
            tool is designed with simplicity, speed, and reliability in mind.
          </p>

          <h2 className="font-bold">Open Source</h2>

          <p className="mb-2 text-justify">
            Transparency builds trust. Many of our projects are developed as
            open-source software, allowing developers to inspect the code,
            contribute improvements, report issues, and help make FlagsDev
            better for everyone.
          </p>

          <AdsenseAd />

          <h2 className="font-bold">Our Values</h2>

          <p className="mb-2 text-justify">
            Everything we build is guided by a few core principles:
          </p>

          <ul className="my-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {OUR_VALUES.map((value) => (
              <li
                key={value.title}
                className="flex gap-4 p-5 first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="mt-1 h-10 w-1 shrink-0 rounded-full bg-slate-900" />

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {value.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {value.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="font-bold">Growing Together</h2>

          <p className="mb-2 text-justify">
            FlagsDev is an evolving project. We are constantly adding new tools,
            improving existing features, and listening to user feedback to build
            a platform that people can rely on every day.
          </p>

          <p className="mb-2 text-justify">
            Whether you&apos;re a student, developer, professional, or casual
            user, our goal is to provide trustworthy tools that make everyday
            tasks easier while respecting your privacy.
          </p>

          <h2 className="font-bold">Thank You</h2>

          <p className="mb-2 text-justify">
            Thank you for using FlagsDev and supporting our mission to build
            free, privacy-first, browser-powered tools for everyone.
          </p>
        </div>
      </main>
    </>
  );
}
