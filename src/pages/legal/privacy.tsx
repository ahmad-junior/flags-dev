import SEO from "@/components/SEO";
import CustomTopHeader from "@/components/layout/CustomTopHeader";

const LAST_UPDATE_PRIVACY = "12 - July - 2026";

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how FlagsDev protects your privacy and processes files locally in your browser."
      />

      <main className="mx-auto max-w-4xl px-6 py-20">
        <CustomTopHeader title="Privacy Policy" />

        <p className="mt-4 text-slate-600">
          Last updated: {LAST_UPDATE_PRIVACY}
        </p>

        <div className="prose prose-slate mt-10 max-w-none">
          <h2 className="font-bold">Our Privacy Commitment</h2>
          <p className="text-justify mb-2">
            FlagsDev is built with privacy as a core principle. Our tools are
            designed to process files locally in your browser whenever possible.
            Your files remain on your device and are not uploaded to our
            servers.
          </p>

          <h2 className="font-bold">File Processing</h2>

          <p className="text-justify mb-2">
            Documents, images, and other files are processed entirely within
            your browser using modern web technologies. We do not store,
            transmit, or access the contents of your files.
          </p>

          <h2 className="font-bold">Personal Information</h2>

          <p className="text-justify mb-2">
            FlagsDev does not require an account to use its tools. We do not
            collect personal information unless you voluntarily contact us.
          </p>

          <h2 className="font-bold">Cookies</h2>

          <p className="text-justify mb-2">
            We may use essential cookies required for the website to function.
            We do not use cookies to access or store your files.
          </p>

          <h2 className="font-bold">Analytics</h2>

          <p className="text-justify mb-2">
            We may use privacy-friendly analytics to understand overall website
            usage. These analytics do not access or process your files.
          </p>

          <h2 className="font-bold">Third-Party Services</h2>

          <p className="text-justify mb-2">
            If FlagsDev uses third-party services such as hosting providers or
            analytics providers, those services may process limited technical
            information required to deliver the website.
          </p>

          <h2 className="font-bold">Security</h2>

          <p className="text-justify mb-2">
            We use HTTPS to protect communication between your browser and our
            website. Because files are processed locally, your data remains
            under your control.
          </p>

          <h2 className="font-bold">Changes</h2>

          <p className="text-justify mb-2">
            We may update this Privacy Policy from time to time. Changes will be
            published on this page.
          </p>
        </div>
      </main>
    </>
  );
}
