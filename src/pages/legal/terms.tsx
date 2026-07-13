import SEO from "@/components/SEO";
import { STATIC_PATHS } from "@/routes";
import CustomTopHeader from "@/components/layout/CustomTopHeader";
import Link from "next/link";

const LAST_UPDATE_TERMS = "12 - July - 2026";

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of Service for using FlagsDev."
      />

      <main className="mx-auto max-w-4xl px-6 py-20">
        <CustomTopHeader title="Terms of Service" />

        <p className="mt-4 text-slate-600">Last updated: {LAST_UPDATE_TERMS}</p>

        <div className="prose prose-slate mt-10 max-w-none">
          <h2 className="font-bold">Acceptance</h2>
          <p className="text-justify mb-2">
            By using FlagsDev, you agree to these Terms of Service.
          </p>

          <h2 className="font-bold">Use of the Service</h2>
          <p className="text-justify mb-2">
            FlagsDev provides browser-based tools for processing documents,
            images, and other files. You are responsible for how you use these
            tools.
          </p>

          <h2 className="font-bold">Open Source</h2>
          <p className="text-justify mb-2">
            Parts of FlagsDev are open source and available through our GitHub
            repository under the applicable license.
          </p>

          <h2 className="font-bold">Availability</h2>
          <p className="text-justify mb-2">
            We strive to keep the website available but cannot guarantee
            uninterrupted service.
          </p>

          <h2 className="font-bold">No Warranty</h2>
          <p className="text-justify mb-2">
            FlagsDev is provided &quot;as is&quot; without warranties of any
            kind. Use the service at your own risk.
          </p>

          <h2 className="font-bold">Limitation of Liability</h2>
          <p className="text-justify mb-2">
            To the maximum extent permitted by law, FlagsDev shall not be liable
            for any damages resulting from the use of the website or its tools.
          </p>

          <h2 className="font-bold">Prohibited Use</h2>
          <ul className="mb-2 list-disc pl-6 space-y-2 text-slate-600">
            <li>Do not use the service for illegal activities.</li>
            <li>Do not attempt to disrupt the website.</li>
            <li>Do not misuse the tools to harm others.</li>
          </ul>

          <h2 className="font-bold">Changes</h2>
          <p className="text-justify mb-2">
            We may update these Terms of Service at any time. Continued use of
            FlagsDev constitutes acceptance of the updated terms.
          </p>

          <h2 className="font-bold">Contact</h2>
          <p className="text-justify mb-2">
            Questions regarding these Terms of Service may be directed through
            our{" "}
            <Link
              href={STATIC_PATHS.contact}
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Contact
            </Link>{" "}
            page or by opening an issue on our GitHub repository.
          </p>
        </div>
      </main>
    </>
  );
}
