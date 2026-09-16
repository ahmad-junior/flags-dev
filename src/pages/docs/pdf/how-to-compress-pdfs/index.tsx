import Link from "next/link";

import SEO from "@/components/SEO";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsTableOfContents from "@/components/docs/DocsTableOfContents";
import DocsImage from "@/components/docs/DocsImage";
import DocsCallout from "@/components/docs/DocsCallout";
import DocsSteps from "@/components/docs/DocsSteps";
import AdsenseAd from "@/components/adds/AdsenseAd";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

const LAST_UPDATED = "13 September 2026";
const READ_TIME = "5 min read";

export default function HowToCompressPdfsPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-pdf-compression",
      title: "What is PDF compression?",
    },
    {
      id: "how-to-compress",
      title: "How to compress PDFs",
    },
    {
      id: "tips",
      title: "Tips for compressing PDFs",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Compress PDFs"
        description="Learn how to reduce PDF file size while keeping your document practical to view, share, print, and store."
        keywords="Compress PDF, Reduce PDF size, How to compress PDFs, PDF compression guide, Reduce PDF file size, Free PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfHowToCompress}
      />

      <DocsLayout
        title="How to Compress PDFs"
        description="Learn how to reduce PDF file size while keeping your document practical to view, share, print, and store."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.pdfTool}#compress`}
        sections={sections}
      >
        {/* Mobile table of contents */}
        <DocsTableOfContents sections={sections} />

        {/* Introduction */}
        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF files can become large when they contain high resolution images,
            scanned pages, embedded fonts, or other detailed content. Large
            files can take longer to upload, download, share, and store.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Compressing a PDF reduces its file size so the document is easier to
            handle while keeping the content useful and readable. The amount of
            reduction depends on the content and structure of the original PDF.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn how to compress PDF files using the
            FlagsDev PDF Compress tool.
          </p>
        </section>

        <AdsenseAd />

        {/* Illustration */}
        <DocsImage
          src="/images/compress-pdfs-illustration.svg"
          alt="PDF compression workflow showing a large PDF being reduced to a smaller file"
          caption="Select your PDF, process the document, and save a smaller version of the file."
        />

        {/* What is PDF compression */}
        <section id="what-is-pdf-compression">
          <h2 className="text-2xl font-bold text-slate-900">
            What is PDF compression?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF compression is the process of reducing the amount of data
            required to store a PDF document. Depending on the PDF, compression
            can reduce image data, remove unnecessary information, or optimize
            how content is stored.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            For example, imagine you have a PDF that is 18 MB because it
            contains several high-resolution scanned pages. Compressing the
            document may produce a smaller version that is easier to upload or
            send.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            The final file size depends on the original document. A PDF
            containing mostly text may not become significantly smaller, while a
            PDF containing many large images or scans may have more
            opportunities for size reduction.
          </p>

          <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Original
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  Large PDF
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Process
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  Compression
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Result
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  Smaller PDF
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to compress */}
        <section id="how-to-compress">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to compress PDFs
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these steps to reduce the size of your PDF document.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the Compress PDF tool",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.pdfTool}#compress`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Compress PDF tool
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides an interface where you can select the
                      PDF you want to optimize.
                    </p>
                  </>
                ),
              },
              {
                title: "Select your PDF file",
                description: (
                  <>
                    <p>
                      Select the PDF document you want to compress from your
                      device.
                    </p>

                    <p className="mt-3">
                      Choose the original document rather than an already
                      compressed copy when possible.
                    </p>
                  </>
                ),
              },
              {
                title: "Start the compression",
                description: (
                  <>
                    <p>
                      Start the compression process after selecting your PDF.
                    </p>

                    <p className="mt-3">
                      The tool processes the document and attempts to reduce its
                      file size.
                    </p>
                  </>
                ),
              },
              {
                title: "Review the result",
                description: (
                  <>
                    <p>
                      Once compression has finished, review the resulting
                      document and check that the content is still suitable for
                      your intended use.
                    </p>

                    <p className="mt-3 rounded-lg bg-amber-50 p-3 text-justify text-amber-700">
                      Compression results can vary depending on the original
                      PDF. Documents containing mostly text may have limited
                      size reduction.
                    </p>
                  </>
                ),
              },
              {
                title: "Download the compressed PDF",
                description: (
                  <>
                    <p>Save the compressed PDF directly to your device.</p>

                    <p className="mt-3">
                      You can now use the smaller file for sharing, uploading,
                      storing, or other supported purposes.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout type="tip" title="Check the result after compression">
          Always open the compressed PDF and verify that the pages, text,
          images, and overall document quality are suitable for your needs
          before replacing the original file.
        </DocsCallout>

        {/* Tips */}
        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for compressing PDFs
          </h2>

          <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-7 text-slate-600">
            <li>
              Keep the original PDF until you have verified the compressed
              version.
            </li>
            <li>
              Image-heavy and scanned PDFs may have more potential for size
              reduction than text-only documents.
            </li>
            <li>
              Check the compressed document before submitting it to a website or
              sending it to someone else.
            </li>
            <li>
              If a website has a maximum upload size, compare the final file
              size with that limit before uploading.
            </li>
            <li>
              Avoid repeatedly compressing the same PDF when unnecessary,
              especially when the document contains images.
            </li>
          </ul>
        </section>

        {/* Privacy */}
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

        <AdsenseAd />

        {/* Final CTA */}
        <section className="not-prose mt-16 rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to compress your PDF?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Reduce your PDF file size and create a more manageable document
              with the FlagsDev Compress PDF tool.
            </p>

            <Link
              href={`${PUBLIC_PATHS.pdfTool}#compress`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Compress PDF Tool
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
