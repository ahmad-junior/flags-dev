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

export default function HowToRotatePdfsPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-pdf-rotation",
      title: "What is PDF rotation?",
    },
    {
      id: "how-to-rotate",
      title: "How to rotate PDF pages",
    },
    {
      id: "tips",
      title: "Tips for rotating PDF pages",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Rotate PDF Pages"
        description="Learn how to rotate PDF pages, correct page orientation, and create a new PDF with pages displayed in the correct direction."
        keywords="Rotate PDF, Rotate PDF pages, How to rotate PDF, PDF page rotation, Fix PDF orientation, PDF tools, Free PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfHowToRotate}
      />

      <DocsLayout
        title="How to Rotate PDF Pages"
        description="Learn how to rotate PDF pages, correct page orientation, and create a new PDF with pages displayed in the correct direction."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.pdfTool}#rotate`}
        sections={sections}
      >
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF pages can sometimes appear sideways or upside down after
            scanning, exporting, or combining documents from different sources.
            This can make a document difficult to read or print correctly.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Rotating PDF pages allows you to correct their orientation without
            recreating the original document. You can adjust the page direction
            and create a new PDF that is easier to read, share, and print.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn how to rotate PDF pages using the
            FlagsDev PDF Rotate tool.
          </p>
        </section>
        <AdsenseAd />

        <DocsImage
          src="/images/rotate-pdf-pages-illustration.svg"
          alt="PDF rotation workflow showing pages being rotated into the correct orientation"
          caption="Rotate PDF pages to correct their orientation and create a new document."
        />

        <section id="what-is-pdf-rotation">
          <h2 className="text-2xl font-bold text-slate-900">
            What is PDF rotation?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF rotation is the process of changing the orientation of one or
            more pages in a PDF document. A page can be rotated to make its
            content easier to read or to match the orientation of the other
            pages.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            For example, a scanned document may contain a page that is displayed
            sideways:
          </p>

          <ul className="list-inside list-disc text-sm text-slate-600">
            <li>Page 1: Correct orientation</li>
            <li>Page 2: Rotated sideways</li>
            <li>Page 3: Correct orientation</li>
            <li>Page 4: Upside down</li>
          </ul>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Rotating the affected pages allows the document to have a consistent
            and readable orientation.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            This can be especially useful for scanned documents, forms, reports,
            invoices, notes, and PDFs created from images.
          </p>
        </section>

        <section id="how-to-rotate">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to rotate PDF pages
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these steps to rotate pages in your PDF.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the Rotate PDF tool",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.pdfTool}#rotate`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Rotate PDF tool
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides an interface where you can upload a PDF
                      and adjust the orientation of its pages.
                    </p>
                  </>
                ),
              },
              {
                title: "Select your PDF file",
                description: (
                  <>
                    <p>
                      Select the PDF document you want to rotate from your
                      device.
                    </p>

                    <p className="mt-3">
                      Once the document is selected, its pages will be displayed
                      so you can review their current orientation.
                    </p>
                  </>
                ),
              },
              {
                title: "Rotate the pages",
                description: (
                  <>
                    <p>
                      Select the pages that need to be rotated and apply the
                      required rotation.
                    </p>

                    <p className="mt-3">
                      Use the available rotation controls to change the page
                      orientation until the content is facing the correct
                      direction.
                    </p>
                  </>
                ),
              },
              {
                title: "Review the page orientation",
                description: (
                  <>
                    <p>
                      Review the document and make sure the rotated pages are
                      facing the correct direction.
                    </p>

                    <p className="mt-3 text-red-600 text-justify bg-red-50 p-3 rounded-lg">
                      Check each affected page before generating the final PDF
                      to avoid accidentally rotating a page in the wrong
                      direction.
                    </p>
                  </>
                ),
              },
              {
                title: "Generate the rotated PDF",
                description: (
                  <>
                    <p>
                      Once the page orientations are correct, generate the new
                      PDF with the updated page rotation.
                    </p>
                  </>
                ),
              },
              {
                title: "Download the rotated PDF",
                description: (
                  <>
                    <p>Save the newly generated PDF directly to your device.</p>

                    <p className="mt-3">
                      Open the resulting document to confirm that the pages are
                      displayed correctly.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout type="tip" title="Check the orientation before saving">
          Review the affected pages carefully before generating the final PDF.
          This helps ensure that every page is facing the correct direction.
        </DocsCallout>

        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for rotating PDF pages
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Keep these tips in mind when rotating PDF pages:
          </p>

          <ul className="mt-3 list-inside list-disc text-sm leading-7 text-slate-600">
            <li>Check the orientation of every page before making changes.</li>
            <li>Rotate only the pages that need correction.</li>
            <li>Review the page content after applying the rotation.</li>
            <li>Check both portrait and landscape pages carefully.</li>
            <li>
              Keep the original PDF if you may need to restore the original
              document later.
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
              Ready to rotate your PDF?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Correct the orientation of your PDF pages and create a new
              document using the FlagsDev Rotate PDF tool.
            </p>

            <Link
              href={`${PUBLIC_PATHS.pdfTool}#rotate`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Rotate PDF Tool
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
