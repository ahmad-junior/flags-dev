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

export default function HowToRearrangePdfPagesPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-pdf-reordering",
      title: "What is PDF page reordering?",
    },
    {
      id: "how-to-reorder",
      title: "How to reorder PDF pages",
    },
    {
      id: "tips",
      title: "Tips for reordering pages",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Reorder PDF Pages"
        description="Learn how to rearrange PDF pages, change their order, and create a new document with the pages organized exactly the way you need."
        keywords="Reorder PDF, Rearrange PDF pages, How to reorder PDF pages, PDF page organizer, PDF tools, Free PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfHowToReorder}
      />

      <DocsLayout
        title="How to Reorder PDF Pages"
        description="Learn how to rearrange PDF pages, change their order, and create a new document with the pages organized exactly the way you need."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.pdfTool}#reorder`}
        sections={sections}
      >
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF documents are often created in an order that does not match the
            way you want to present or organize the information. You may need to
            move pages, place a section earlier in the document, or arrange
            several pages into a new sequence.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Reordering PDF pages allows you to change the sequence of pages
            without manually recreating the entire document. This can be useful
            when preparing reports, assignments, presentations, forms, or other
            multi-page documents.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn how to rearrange pages using the
            FlagsDev PDF Reorder tool.
          </p>
        </section>
        <AdsenseAd />

        <DocsImage
          src="/images/reorder-pdf-pages-illustration.svg"
          alt="PDF page reordering workflow showing pages being rearranged into a new order"
          caption="Arrange PDF pages into the order you need and create a new PDF document."
        />

        <section id="what-is-pdf-reordering">
          <h2 className="text-2xl font-bold text-slate-900">
            What is PDF page reordering?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF page reordering is the process of changing the sequence of pages
            inside an existing PDF document. Instead of changing the content of
            individual pages, you simply organize the pages into a different
            order.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            For example, imagine you have a document with the following page
            order:
          </p>

          <ul className="list-inside list-disc text-sm text-slate-600">
            <li>Page 1: Introduction</li>
            <li>Page 2: Conclusion</li>
            <li>Page 3: Main Report</li>
            <li>Page 4: References</li>
          </ul>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            You may want the final document to follow this order instead:
          </p>

          <ol className="list-inside list-decimal text-sm text-slate-600">
            <li>Introduction</li>
            <li>Main Report</li>
            <li>Conclusion</li>
            <li>References</li>
          </ol>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Reordering the pages lets you create this new sequence without
            having to recreate the original document from scratch.
          </p>
        </section>

        <section id="how-to-reorder">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to reorder PDF pages
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these steps to rearrange the pages in your PDF.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the Reorder PDF tool",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.pdfTool}#reorder`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Reorder PDF tool
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides an interface where you can upload a PDF
                      and organize its pages.
                    </p>
                  </>
                ),
              },
              {
                title: "Select your PDF file",
                description: (
                  <>
                    <p>
                      Select the PDF document whose pages you want to rearrange
                      from your device.
                    </p>

                    <p className="mt-3">
                      After selecting the document, the pages will be displayed
                      as thumbnails so you can identify and organize them
                      visually.
                    </p>
                  </>
                ),
              },
              {
                title: "Arrange the pages",
                description: (
                  <>
                    <p>
                      Drag and drop the page thumbnails into the order you want.
                    </p>

                    <p className="mt-3">
                      You can move pages earlier or later in the document until
                      the sequence matches your desired structure.
                    </p>
                  </>
                ),
              },
              {
                title: "Review the page order",
                description: (
                  <>
                    <p>
                      Review the complete page sequence before generating the
                      new PDF.
                    </p>

                    <p className="mt-3 text-red-600 text-justify bg-red-50 p-3 rounded-lg">
                      Carefully check the page order before saving the document
                      to make sure no pages were accidentally misplaced.
                    </p>
                  </>
                ),
              },
              {
                title: "Generate the reordered PDF",
                description: (
                  <>
                    <p>
                      Once the pages are arranged correctly, generate the new
                      PDF document using the reordered page sequence.
                    </p>
                  </>
                ),
              },
              {
                title: "Download the reordered PDF",
                description: (
                  <>
                    <p>Save the newly generated PDF directly to your device.</p>

                    <p className="mt-3">
                      You can then open the document and verify that the pages
                      appear in the intended order.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout type="tip" title="Review the page sequence before saving">
          Always check the complete page order before generating the final PDF.
          Reviewing the thumbnails can help you catch misplaced pages before
          creating the new document.
        </DocsCallout>

        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for reordering PDF pages
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            A few simple practices can make PDF page organization easier:
          </p>

          <ul className="mt-3 list-inside list-disc text-sm leading-7 text-slate-600">
            <li>Review the page thumbnails before changing the order.</li>
            <li>
              Arrange related sections together when organizing long documents.
            </li>
            <li>
              Check the first and last pages carefully before generating the
              PDF.
            </li>
            <li>Review the final document after downloading it.</li>
            <li>
              Keep the original PDF if you may need to restore the original
              order later.
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
              Ready to reorder your PDF pages?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Rearrange your PDF pages and create a new document with the exact
              page order you need using the FlagsDev Reorder PDF tool.
            </p>

            <Link
              href={`${PUBLIC_PATHS.pdfTool}#reorder`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Reorder PDF Tool
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
