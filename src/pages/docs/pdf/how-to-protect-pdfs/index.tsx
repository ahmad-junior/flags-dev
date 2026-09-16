import Link from "next/link";

import SEO from "@/components/SEO";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsTableOfContents from "@/components/docs/DocsTableOfContents";
import DocsImage from "@/components/docs/DocsImage";
import DocsCallout from "@/components/docs/DocsCallout";
import DocsSteps from "@/components/docs/DocsSteps";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

const LAST_UPDATED = "16 September 2026";
const READ_TIME = "5 min read";

export default function HowToProtectPdfsPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-pdf-protection",
      title: "What is PDF protection?",
    },
    {
      id: "how-to-protect",
      title: "How to protect a PDF",
    },
    {
      id: "tips",
      title: "Tips for protecting PDFs",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Protect a PDF with a Password"
        description="Learn how to protect a PDF with a password and add an extra layer of security to your PDF documents."
        keywords="Protect PDF, Password protect PDF, How to protect PDF, Encrypt PDF, PDF password, PDF security, PDF tools, Free PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfHowToProtect}
      />

      <DocsLayout
        title="How to Protect a PDF with a Password"
        description="Learn how to protect a PDF with a password and add an extra layer of security to your PDF documents."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.pdfTool}#protect`}
        sections={sections}
      >
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF documents can contain information that should not be freely
            accessible to everyone who receives the file. Adding password
            protection can provide an additional layer of control over access to
            a document.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Protecting a PDF with a password can be useful for documents such as
            reports, personal records, business documents, financial
            information, and other files that require additional protection.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn how to protect a PDF using the
            FlagsDev PDF Protect tool.
          </p>
        </section>

        <DocsImage
          src="/images/protect-pdf-illustration.svg"
          alt="PDF protection workflow showing a document being protected with a password"
          caption="Add password protection to a PDF before sharing or storing the document."
        />

        <section id="what-is-pdf-protection">
          <h2 className="text-2xl font-bold text-slate-900">
            What is PDF protection?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF protection is the process of applying security controls to a PDF
            document to help prevent unauthorized access or unwanted use.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Password protection can require a person to enter the correct
            password before the protected document can be opened or accessed,
            depending on the protection method supported by the PDF tool.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            For example, if you need to send a sensitive PDF to another person,
            you can protect the document with a password and provide the
            password separately.
          </p>

          <DocsCallout type="warning" title="Keep your password safe">
            A password-protected PDF should not be treated as a replacement for
            a complete security policy. Use a strong password and share it
            through a separate trusted communication channel.
          </DocsCallout>
        </section>

        <section id="how-to-protect">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to protect a PDF
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these steps to protect your PDF with a password.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the Protect PDF tool",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.pdfTool}#protect`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Protect PDF tool
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides an interface where you can select a PDF
                      and configure its protection.
                    </p>
                  </>
                ),
              },
              {
                title: "Select your PDF file",
                description: (
                  <>
                    <p>
                      Select the PDF document you want to protect from your
                      device.
                    </p>

                    <p className="mt-3">
                      Make sure you have selected the correct document before
                      continuing.
                    </p>
                  </>
                ),
              },
              {
                title: "Enter a password",
                description: (
                  <>
                    <p>
                      Enter the password you want to use to protect the PDF.
                    </p>

                    <p className="mt-3">
                      Choose a password that is difficult for others to guess
                      and avoid using easily identifiable information.
                    </p>
                  </>
                ),
              },
              {
                title: "Confirm the protection settings",
                description: (
                  <>
                    <p>
                      Review the password and available protection settings
                      before processing the document.
                    </p>

                    <p className="mt-3 text-red-600 text-justify bg-red-50 p-3 rounded-lg">
                      Make sure you remember or securely store the password. If
                      you lose access to the password, recovering the protected
                      PDF may not be possible.
                    </p>
                  </>
                ),
              },
              {
                title: "Protect the PDF",
                description: (
                  <>
                    <p>
                      Start the protection process to generate the protected
                      version of your PDF.
                    </p>
                  </>
                ),
              },
              {
                title: "Download the protected PDF",
                description: (
                  <>
                    <p>Save the protected PDF directly to your device.</p>

                    <p className="mt-3">
                      Open the resulting document and verify that the protection
                      works as expected before sharing it.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout type="tip" title="Use a strong password">
          Avoid short or predictable passwords. For important documents, use a
          unique password that is not reused for other accounts or services.
        </DocsCallout>

        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for protecting PDFs
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Keep these practices in mind when protecting PDF documents:
          </p>

          <ul className="mt-3 list-inside list-disc text-sm leading-7 text-slate-600">
            <li>Use a strong and unique password for important documents.</li>
            <li>
              Do not share the PDF password in the same message as the file when
              possible.
            </li>
            <li>
              Store the password somewhere secure if you need to access the
              document later.
            </li>
            <li>
              Verify that the protected PDF can be opened before sending it to
              someone else.
            </li>
            <li>
              Keep an unprotected original in a secure location if you need to
              modify the document later.
            </li>
          </ul>
        </section>

        <section id="privacy">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Privacy</h2>

          <DocsCallout type="privacy" title="Browser based processing">
            FlagsDev is designed around browser based file processing where
            supported by the individual tool. This approach can help reduce
            unnecessary file transfers because supported operations can be
            performed directly in your browser.
          </DocsCallout>

          <p className="my-3 text-sm leading-7 text-slate-600 text-justify">
            For the most accurate information about how data is handled, review
            the{" "}
            <Link
              href={PUBLIC_PATHS.privacy}
              className="font-semibold text-slate-950 underline underline-offset-4"
            >
              FlagsDev Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="not-prose mt-16 rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to protect your PDF?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Add password protection to your PDF and create a protected copy
              using the FlagsDev Protect PDF tool.
            </p>

            <Link
              href={`${PUBLIC_PATHS.pdfTool}#protect`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Protect PDF Tool
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
