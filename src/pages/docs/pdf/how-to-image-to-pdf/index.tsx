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

export default function HowToConvertImagesToPdfPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-image-to-pdf",
      title: "What is image to PDF conversion?",
    },
    {
      id: "how-to-convert",
      title: "How to convert images to PDF",
    },
    {
      id: "tips",
      title: "Tips for converting images",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Convert Images to PDF"
        description="Learn how to convert JPG, PNG, and other images into a PDF document, arrange images, and create a single organized file."
        keywords="Image to PDF, Convert image to PDF, JPG to PDF, PNG to PDF, How to convert images to PDF, Images to PDF guide, PDF tools, Free PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfHowToImageToPdf}
      />

      <DocsLayout
        title="How to Convert Images to PDF"
        description="Learn how to convert JPG, PNG, and other images into a PDF document, arrange images, and create a single organized file."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.pdfTool}#image-to-pdf`}
        sections={sections}
      >
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Images are commonly used for scanned documents, receipts, notes,
            forms, screenshots, photographs, and other types of visual
            information. However, sharing multiple image files can sometimes be
            less convenient than using a single document.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Converting images to PDF allows you to combine one or more images
            into a single PDF document. This can make files easier to organize,
            share, print, and store.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn how to convert images into a PDF using
            the FlagsDev Image to PDF tool.
          </p>
        </section>

        <DocsImage
          src="/images/image-to-pdf-illustration.svg"
          alt="Image to PDF workflow showing multiple images being converted into a single PDF document"
          caption="Select your images, arrange them in the desired order, and create a single PDF document."
        />

        <section id="what-is-image-to-pdf">
          <h2 className="text-2xl font-bold text-slate-900">
            What is image to PDF conversion?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Image to PDF conversion is the process of placing one or more image
            files into a PDF document. Each selected image can become a page in
            the resulting PDF.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            For example, if you have several scanned pages saved as image files,
            you can combine them into a single PDF:
          </p>

          <ul className="list-inside list-disc text-sm text-slate-600">
            <li>Image 1: First scanned page</li>
            <li>Image 2: Second scanned page</li>
            <li>Image 3: Third scanned page</li>
            <li>Image 4: Fourth scanned page</li>
          </ul>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Instead of managing four separate image files, you can create one
            PDF containing all four pages in the required order.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            This is useful for creating digital documents from scanned pages,
            photographs, receipts, forms, and other images.
          </p>
        </section>

        <section id="how-to-convert">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to convert images to PDF
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these steps to create a PDF from your images.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the Image to PDF tool",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.pdfTool}#image-to-pdf`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Image to PDF tool
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides an interface where you can select
                      multiple images and prepare them for conversion.
                    </p>
                  </>
                ),
              },
              {
                title: "Select your images",
                description: (
                  <>
                    <p>
                      Select the image files you want to include in your PDF
                      from your device.
                    </p>

                    <p className="mt-3">
                      You can select multiple images if you want to create a
                      multi-page PDF.
                    </p>
                  </>
                ),
              },
              {
                title: "Arrange the images",
                description: (
                  <>
                    <p>
                      Review the selected images and arrange them in the order
                      you want them to appear in the PDF.
                    </p>

                    <p className="mt-3">
                      The image order determines the page sequence in the
                      resulting document.
                    </p>
                  </>
                ),
              },
              {
                title: "Review the images",
                description: (
                  <>
                    <p>
                      Check the selected images and their order before
                      generating the PDF.
                    </p>

                    <p className="mt-3 text-red-600 text-justify bg-red-50 p-3 rounded-lg">
                      Make sure all required images are included and that they
                      are arranged in the correct order before continuing.
                    </p>
                  </>
                ),
              },
              {
                title: "Generate the PDF",
                description: (
                  <>
                    <p>
                      Once your images are ready, start the conversion process
                      to create the PDF document.
                    </p>
                  </>
                ),
              },
              {
                title: "Download the PDF",
                description: (
                  <>
                    <p>Save the generated PDF directly to your device.</p>

                    <p className="mt-3">
                      Open the resulting document and check that the images
                      appear correctly on the PDF pages.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout type="tip" title="Check the image order before converting">
          Review the images and their order before generating the PDF. This is
          especially important when converting multiple scanned pages into a
          single document.
        </DocsCallout>

        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for converting images to PDF
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Keep these tips in mind when creating PDFs from images:
          </p>

          <ul className="mt-3 list-inside list-disc text-sm leading-7 text-slate-600">
            <li>
              Select clear and readable images for better document quality.
            </li>
            <li>Review the image order before generating the PDF.</li>
            <li>Make sure all required images have been selected.</li>
            <li>Check the generated PDF after conversion.</li>
            <li>Keep the original image files if you may need them later.</li>
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
              Ready to convert your images?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Combine your images into a single PDF document using the FlagsDev
              Image to PDF tool.
            </p>

            <Link
              href={`${PUBLIC_PATHS.pdfTool}#image-to-pdf`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Image to PDF Tool
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
