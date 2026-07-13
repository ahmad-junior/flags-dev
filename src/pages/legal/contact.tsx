import SEO from "@/components/SEO";
import { STATIC_PATHS } from "@/routes";
import CustomTopHeader from "@/components/layout/CustomTopHeader";

import { FaGithub, FaEnvelope, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with FlagsDev, report bugs, request features, or contribute to the project."
      />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <CustomTopHeader title="Contact" />
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            We&apos;d love to hear from you
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Whether you&apos;ve found a bug, have an idea for a new tool, or
            want to contribute to FlagsDev, feel free to get in touch.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CustomTopHeader
              title="GitHub"
              icon={FaGithub}
              hoverText="Github"
              textSize={2}
            />

            <p className="mt-3 text-slate-600">
              Report bugs, request features, or contribute to the project.
            </p>

            <a
              href={STATIC_PATHS.gitHubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex font-medium text-blue-600 hover:text-blue-700"
            >
              {STATIC_PATHS.gitHubRepo}
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CustomTopHeader
              title="Email"
              icon={FaEnvelope}
              hoverText="Email"
              textSize={2}
            />

            <p className="mt-3 text-slate-600">
              Contact us for business inquiries or general questions.
            </p>

            <a
              href="mailto:muhammadahmadkon@gmail.com"
              className="mt-5 inline-flex font-medium text-blue-600 hover:text-blue-700"
            >
              muhammadahmadkon@gmail.com
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CustomTopHeader
              title="WhatsApp"
              icon={FaWhatsapp}
              hoverText="WhatsApp"
              textSize={2}
            />

            <p className="mt-3 text-slate-600">
              Contact us directly for quick questions or collaboration.
            </p>

            <a
              href="https://wa.me/923001860770"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex font-medium text-blue-600 hover:text-blue-700"
            >
              +92 300 1860770
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CustomTopHeader
              title="Phone"
              icon={FaPhoneAlt}
              hoverText="Phone"
              textSize={2}
            />

            <p className="mt-3 text-slate-600">
              Available during normal business hours (Pakistan Time).
            </p>

            <a
              href="tel:+923450770839"
              className="mt-5 inline-flex font-medium text-blue-600 hover:text-blue-700"
            >
              +92 345 0770839
            </a>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            Response Time
          </h2>

          <p className="mt-4 text-slate-600">
            We aim to respond within <strong>24 to 48 hours</strong>. Since
            FlagsDev is an independent open-source project, response times may
            vary depending on availability.
          </p>
        </div>
      </main>
    </>
  );
}
