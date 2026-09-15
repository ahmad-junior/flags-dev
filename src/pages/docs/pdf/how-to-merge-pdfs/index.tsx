import Link from "next/link";

import SEO from "@/components/SEO";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsTableOfContents from "@/components/docs/DocsTableOfContents";
import DocsImage from "@/components/docs/DocsImage";
import DocsCallout from "@/components/docs/DocsCallout";
import DocsSteps from "@/components/docs/DocsSteps";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

const LAST_UPDATED = "13 September 2026";
const READ_TIME = "5 min read";

export default function HowToMergePdfsPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-pdf-merging",
      title: "What is PDF merging?",
    },
    {
      id: "how-to-merge",
      title: "How to merge PDFs",
    },
    {
      id: "tips",
      title: "Tips for merging PDFs",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Merge PDFs"
        description="Learn how to combine multiple PDF files into a single document, arrange their order, and create one organized PDF."
        keywords="Merge PDF, Combine PDF, How to merge PDFs, PDF merging guide, PDF tools, Free PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfHowToMerge}
      />

      <DocsLayout
        title="How to Merge PDFs"
        description="Learn how to combine multiple PDF files into a single document, arrange their order, and create one organized PDF."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.pdfTool}#merge`}
        sections={sections}
      >
        {/* Mobile table of contents */}
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF files are commonly used for reports, applications, invoices,
            assignments, presentations, scanned documents, and other types of
            digital documents. Sometimes the information you need is spread
            across several PDF files and you want to combine them into one
            document.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Merging PDFs allows you to combine multiple documents into a single
            PDF while keeping their pages together in one file. This can make
            documents easier to share, store, print, and organize.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn how to merge multiple PDF files using
            the FlagsDev PDF Merge tool.
          </p>
        </section>

        {/* Illustration */}
        <DocsImage
          src="/images/merge-pdfs-illustration.png"
          alt="PDF merge workflow showing multiple PDF files being combined into one document"
          caption="Select multiple PDF files, arrange them in the desired order, and create one PDF."
        />

        {/* What is PDF merging */}
        <section id="what-is-pdf-merging">
          <h2 className="text-2xl font-bold text-slate-900">
            What is PDF merging?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF merging is the process of combining two or more PDF files into a
            single PDF document. The pages from each selected file are added to
            the resulting document in the order you choose.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            For example, imagine you have three documents:
          </p>

          <ul className="list-inside list-disc">
            <li>Cover page</li>
            <li>Project report</li>
            <li>Appendix</li>
          </ul>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Instead of keeping three separate files, you can merge them into one
            PDF with the following structure:
          </p>

          <ol className="list-inside list-decimal">
            <li>Cover page</li>
            <li>Project report</li>
            <li>Appendix</li>
          </ol>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            The resulting PDF contains all the pages from the original documents
            in the order you specified.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            This is particularly useful when you need to submit or share several
            related documents as one file.
          </p>
        </section>

        {/* How to merge */}
        <section id="how-to-merge">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to merge PDFs
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            You can merge your PDF files in a few simple steps.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the Merge PDF tool",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.pdfTool}#merge`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Merge PDF tool
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides an interface where you can select the
                      PDF files you want to combine.
                    </p>
                  </>
                ),
              },
              {
                title: "Select your PDF files",
                description: (
                  <>
                    <p>
                      Select the PDF documents you want to merge from your
                      device.
                    </p>

                    <p className="mt-3">
                      You can select multiple PDF files. Make sure you include
                      all of the documents you want in the final file.
                    </p>
                  </>
                ),
              },
              {
                title: "Arrange the files",
                description: (
                  <>
                    <p>
                      Review the selected files and arrange them in the order
                      you want them to appear in the final document.
                    </p>

                    <p className="mt-3 text-red-600 text-justify bg-red-50 p-3 rounded-lg">
                      The order is important because the pages from the first
                      file will appear before the pages from the second file,
                      and so on.
                    </p>
                  </>
                ),
              },
              {
                title: "Review the document order",
                description: (
                  <>
                    <p>
                      Before creating the final PDF, check the order of your
                      files carefully.
                    </p>

                    <p className="mt-3 text-red-600 text-justify bg-red-50 p-3 rounded-lg">
                      If a document is in the wrong position, rearrange it
                      before continuing.
                    </p>
                  </>
                ),
              },
              {
                title: "Merge the PDFs",
                description: (
                  <>
                    <p>
                      When everything is in the correct order, start the merge
                      operation.
                    </p>

                    <p className="mt-3">
                      The tool combines the selected PDF files into a single
                      document.
                    </p>
                  </>
                ),
              },
              {
                title: "Save the resulting PDF",
                description: (
                  <>
                    <p>
                      Once the merge operation has completed, save the resulting
                      PDF to your device.
                    </p>

                    <p className="mt-3">
                      You can then open, share, print, or store the new document
                      like any other PDF.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout type="tip" title="Check the page order before merging">
          If the documents need to follow a specific sequence, review the order
          before starting the merge operation. This can save you from having to
          create the document again.
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

        {/* Final CTA */}
        <section className="not-prose mt-16 rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to merge your PDFs?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Combine your PDF files into one organized document with the
              FlagsDev Merge PDF tool.
            </p>

            <Link
              href={`${PUBLIC_PATHS.pdfTool}#merge`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Merge PDF Tool
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
