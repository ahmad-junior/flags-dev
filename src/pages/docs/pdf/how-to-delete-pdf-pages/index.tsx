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

export default function HowToDeletePdfPagesPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-pdf-page-deletion",
      title: "What is deleting PDF pages?",
    },
    {
      id: "how-to-delete-pages",
      title: "How to delete PDF pages",
    },
    {
      id: "tips",
      title: "Tips for deleting PDF pages",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Delete Pages from a PDF"
        description="Learn how to remove unwanted pages from a PDF, select the pages you want to delete, and create a new document with only the pages you need."
        keywords="Delete PDF pages, Remove PDF pages, How to delete PDF pages, Delete pages from PDF, PDF page removal, PDF tools, Free PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfHowToDeletePages}
      />

      <DocsLayout
        title="How to Delete Pages from a PDF"
        description="Learn how to remove unwanted pages from a PDF, select the pages you want to delete, and create a new document with only the pages you need."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.pdfTool}#delete`}
        sections={sections}
      >
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF documents can contain pages that are no longer required. These
            may include blank pages, duplicate pages, outdated information, or
            sections that should not be included in the final document.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Deleting PDF pages allows you to remove unwanted pages while keeping
            the rest of the document intact. This can help make documents easier
            to read, share, store, and organize.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn how to remove unwanted pages using the
            FlagsDev PDF Delete Pages tool.
          </p>
        </section>

        <AdsenseAd />
        <DocsImage
          src="/images/delete-pdf-pages-illustration.svg"
          alt="PDF deletion workflow showing unwanted pages being removed from a document"
          caption="Select the pages you do not need and create a new PDF without them."
        />

        <section id="what-is-pdf-page-deletion">
          <h2 className="text-2xl font-bold text-slate-900">
            What is deleting PDF pages?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Deleting PDF pages is the process of removing selected pages from an
            existing PDF document. The remaining pages are then used to create a
            new version of the document.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            For example, imagine you have a 10-page document and pages 3 and 7
            contain information that you no longer need. Instead of recreating
            the entire document, you can remove those pages and keep the
            remaining content.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            After deleting the selected pages, the remaining document contains
            only the pages you want to keep.
          </p>

          <ul className="mt-3 list-inside list-disc text-sm text-slate-600">
            <li>Original document: 10 pages</li>
            <li>Pages removed: 3 and 7</li>
            <li>Resulting document: 8 pages</li>
          </ul>
        </section>

        <section id="how-to-delete-pages">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to delete PDF pages
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these steps to remove unwanted pages from your PDF.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the Delete Pages tool",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.pdfTool}#delete`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Delete PDF Pages tool
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides an interface where you can upload a PDF
                      and select the pages you want to remove.
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
                      so you can identify the pages you want to remove.
                    </p>
                  </>
                ),
              },
              {
                title: "Select the pages to delete",
                description: (
                  <>
                    <p>
                      Select the page thumbnails that you want to remove from
                      the document.
                    </p>

                    <p className="mt-3">
                      Review the selected pages carefully before continuing with
                      the deletion.
                    </p>
                  </>
                ),
              },
              {
                title: "Review your selection",
                description: (
                  <>
                    <p>
                      Check the selected pages and make sure you have marked
                      only the pages you want to remove.
                    </p>

                    <p className="mt-3 text-red-600 text-justify bg-red-50 p-3 rounded-lg">
                      Deleting the wrong pages can remove important information
                      from the resulting document. Always review your selection
                      before generating the PDF.
                    </p>
                  </>
                ),
              },
              {
                title: "Generate the updated PDF",
                description: (
                  <>
                    <p>
                      Once your selection is correct, generate the new PDF
                      without the selected pages.
                    </p>
                  </>
                ),
              },
              {
                title: "Download the PDF",
                description: (
                  <>
                    <p>Save the newly generated PDF directly to your device.</p>

                    <p className="mt-3">
                      Open the resulting document and verify that the unwanted
                      pages have been removed as expected.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout type="tip" title="Review selected pages before deleting">
          Carefully check the page thumbnails and selected page numbers before
          generating the new PDF. This helps prevent accidentally removing pages
          that you still need.
        </DocsCallout>

        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for deleting PDF pages
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Keep these tips in mind when removing pages from a PDF:
          </p>

          <ul className="mt-3 list-inside list-disc text-sm leading-7 text-slate-600">
            <li>
              Review the page thumbnails before selecting pages for deletion.
            </li>
            <li>Check page numbers carefully before removing them.</li>
            <li>
              Keep a copy of the original PDF if you may need the removed pages
              later.
            </li>
            <li>
              Open the resulting PDF after processing to verify the document.
            </li>
            <li>
              Make sure important sections, signatures, and required pages
              remain in the document.
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

        <AdsenseAd />

        <section className="not-prose mt-16 rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to delete unwanted PDF pages?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Remove unwanted pages from your document and create a cleaner PDF
              using the FlagsDev Delete Pages tool.
            </p>

            <Link
              href={`${PUBLIC_PATHS.pdfTool}#delete`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Delete Pages Tool
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
