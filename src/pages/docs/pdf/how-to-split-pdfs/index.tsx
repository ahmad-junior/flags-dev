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

export default function HowToSplitPdfsPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-pdf-splitting",
      title: "What is PDF splitting?",
    },
    {
      id: "how-to-split",
      title: "How to split PDFs",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Split PDFs"
        description="Learn how to extract specific pages, split a PDF into individual files, or divide large documents into smaller parts easily."
        keywords="Split PDF, Extract PDF pages, How to split PDFs, PDF splitting guide, PDF tools, Free PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfHowToSplit}
      />

      <DocsLayout
        title="How to Split PDFs"
        description="Learn how to extract specific pages, split a PDF into individual files, or divide large documents into smaller parts easily."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.pdfTool}#split`}
        sections={sections}
      >
        {/* Mobile table of contents */}
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF documents often contain multiple pages, chapters, or sections.
            However, there are many situations where you only need a specific
            section, a single page, or want to divide a large document into
            manageable pieces.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Splitting a PDF allows you to separate pages from an existing file
            and save them as independent documents. This helps you extract
            relevant details, reduce overall file size for sharing, and organize
            content cleanly.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn how to split PDF files into separate
            documents using the FlagsDev PDF Split tool.
          </p>
        </section>
        <AdsenseAd />

        {/* Illustration */}
        <DocsImage
          src="/images/split-pdfs-illustration.svg"
          alt="PDF split workflow showing a single PDF file being divided into multiple documents"
          caption="Select your PDF file, choose page ranges or individual pages, and save them as separate PDFs."
        />

        {/* What is PDF splitting */}
        <section id="what-is-pdf-splitting">
          <h2 className="text-2xl font-bold text-slate-900">
            What is PDF splitting?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF splitting is the process of breaking down a single PDF file into
            two or more smaller PDF files. You can extract individual pages,
            specific page ranges, or separate every page into its own standalone
            document.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            For example, imagine you have a 10-page document:
          </p>

          <ul className="list-inside list-disc text-sm text-slate-600">
            <li>Pages 1 - 3: Executive Summary</li>
            <li>Pages 4 - 8: Detailed Financial Report</li>
            <li>Pages 9 - 10: Receipts and Invoices</li>
          </ul>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Instead of sharing the entire 10-page file with everyone, you can
            split it into:
          </p>

          <ol className="list-inside list-decimal text-sm text-slate-600">
            <li>A 3-page file for the Summary</li>
            <li>A 5-page file for the Financial Report</li>
            <li>A 2-page file for Receipts</li>
          </ol>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            This ensures that recipients only receive the specific information
            they require.
          </p>
        </section>

        {/* How to split */}
        <section id="how-to-split">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to split PDFs
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these simple steps to split your PDF file.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the Split PDF tool",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.pdfTool}#split`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Split PDF tool
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides an interface where you can upload the
                      document you wish to divide.
                    </p>
                  </>
                ),
              },
              {
                title: "Select your PDF file",
                description: (
                  <>
                    <p>
                      Select the PDF document you want to split from your
                      device.
                    </p>

                    <p className="mt-3">
                      Once selected, the page thumbnails will be rendered for
                      preview.
                    </p>
                  </>
                ),
              },
              {
                title: "Choose pages or ranges to split",
                description: (
                  <>
                    <p>
                      Specify how you want to divide your PDF. You can select
                      individual pages or define specific page ranges (e.g.,
                      1-3, 5, 8-10).
                    </p>

                    <p className="mt-3 text-red-600 text-justify bg-red-50 p-3 rounded-lg">
                      Double-check the page numbers you enter to avoid
                      accidentally missing critical pages in your exported
                      files.
                    </p>
                  </>
                ),
              },
              {
                title: "Process the split",
                description: (
                  <>
                    <p>
                      Click the split button to separate the specified pages
                      from the original document.
                    </p>
                  </>
                ),
              },
              {
                title: "Download the split PDF files",
                description: (
                  <>
                    <p>
                      Save the newly generated PDF documents directly to your
                      device.
                    </p>

                    <p className="mt-3">
                      If you split the document into multiple parts, you can
                      download them individually or as a compressed archive.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout type="tip" title="Verify page numbers before splitting">
          Always preview page numbers in the document viewer before confirming
          the split operation to make sure you extract the exact pages you need.
        </DocsCallout>

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
              Ready to split your PDFs?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Divide your PDF documents or extract specific pages instantly with
              the FlagsDev Split PDF tool.
            </p>

            <Link
              href={`${PUBLIC_PATHS.pdfTool}#split`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Split PDF Tool
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
