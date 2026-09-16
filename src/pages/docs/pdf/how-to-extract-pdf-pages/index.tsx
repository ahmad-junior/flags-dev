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

export default function HowToExtractPdfPagesPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-pdf-page-extraction",
      title: "What is PDF page extraction?",
    },
    {
      id: "how-to-extract-pages",
      title: "How to extract PDF pages",
    },
    {
      id: "tips",
      title: "Tips for extracting PDF pages",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Extract Pages from a PDF"
        description="Learn how to extract specific pages from a PDF and create a new document containing only the pages you need."
        keywords="Extract PDF pages, Extract pages from PDF, How to extract PDF pages, PDF page extraction, Extract PDF, PDF tools, Free PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfHowToExtract}
      />

      <DocsLayout
        title="How to Extract Pages from a PDF"
        description="Learn how to extract specific pages from a PDF and create a new document containing only the pages you need."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.pdfTool}#extract`}
        sections={sections}
      >
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF documents often contain more information than you need for a
            particular task. You may only need a few pages from a report, a
            specific section from a document, or selected pages to share with
            someone else.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Extracting PDF pages allows you to create a new document containing
            only the pages you select from the original PDF. This can make
            documents easier to share, organize, and work with.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn how to extract specific pages using
            the FlagsDev PDF Extract Pages tool.
          </p>
        </section>

        <DocsImage
          src="/images/extract-pdf-pages-illustration.svg"
          alt="PDF page extraction workflow showing selected pages being extracted into a new document"
          caption="Select the pages you need and create a new PDF containing only those pages."
        />

        <section id="what-is-pdf-page-extraction">
          <h2 className="text-2xl font-bold text-slate-900">
            What is PDF page extraction?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF page extraction is the process of selecting specific pages from
            an existing PDF and creating a separate document from those pages.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            For example, imagine you have a 12-page report containing several
            sections:
          </p>

          <ul className="list-inside list-disc text-sm text-slate-600">
            <li>Pages 1 - 2: Introduction</li>
            <li>Pages 3 - 8: Main Report</li>
            <li>Pages 9 - 10: Results</li>
            <li>Pages 11 - 12: References</li>
          </ul>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            If you only need the Results section, you can extract pages 9 and 10
            into a separate PDF.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            The original document remains available separately, while the
            extracted PDF contains only the pages you selected.
          </p>
        </section>

        <section id="how-to-extract-pages">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to extract PDF pages
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these steps to extract specific pages from your PDF.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the Extract Pages tool",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.pdfTool}#extract`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Extract PDF Pages tool
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides an interface where you can upload a PDF
                      and select the pages you want to extract.
                    </p>
                  </>
                ),
              },
              {
                title: "Select your PDF file",
                description: (
                  <>
                    <p>Select the PDF document from your device.</p>

                    <p className="mt-3">
                      Once selected, the pages will be displayed as thumbnails
                      so you can identify the pages you want to extract.
                    </p>
                  </>
                ),
              },
              {
                title: "Select the pages to extract",
                description: (
                  <>
                    <p>Select the pages you want to include in the new PDF.</p>

                    <p className="mt-3">
                      You can select the specific pages that contain the
                      information you need while leaving the other pages out of
                      the extracted document.
                    </p>
                  </>
                ),
              },
              {
                title: "Review your selection",
                description: (
                  <>
                    <p>
                      Review the selected pages before creating the new PDF.
                    </p>

                    <p className="mt-3 text-red-600 text-justify bg-red-50 p-3 rounded-lg">
                      Carefully check the selected page numbers to make sure you
                      have included every page you need and have not selected
                      the wrong pages.
                    </p>
                  </>
                ),
              },
              {
                title: "Generate the extracted PDF",
                description: (
                  <>
                    <p>
                      Once your selection is correct, generate the new PDF
                      containing the selected pages.
                    </p>
                  </>
                ),
              },
              {
                title: "Download the extracted PDF",
                description: (
                  <>
                    <p>Save the newly generated PDF directly to your device.</p>

                    <p className="mt-3">
                      Open the resulting document to verify that it contains the
                      pages you selected.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout
          type="tip"
          title="Check the selected pages before extracting"
        >
          Review the page thumbnails and page numbers carefully before
          generating the extracted PDF. This helps ensure that the new document
          contains all the pages you need.
        </DocsCallout>

        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for extracting PDF pages
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Keep these tips in mind when extracting pages from a PDF:
          </p>

          <ul className="mt-3 list-inside list-disc text-sm leading-7 text-slate-600">
            <li>Review the document before selecting pages.</li>
            <li>Check page numbers carefully before extracting.</li>
            <li>Select every page required for the new document.</li>
            <li>Review the extracted PDF after it has been generated.</li>
            <li>
              Keep the original PDF if you may need the complete document later.
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
              Ready to extract PDF pages?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Select the pages you need and create a separate PDF using the
              FlagsDev Extract Pages tool.
            </p>

            <Link
              href={`${PUBLIC_PATHS.pdfTool}#extract`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Extract Pages Tool
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
