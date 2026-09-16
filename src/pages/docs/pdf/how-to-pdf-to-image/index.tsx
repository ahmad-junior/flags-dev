import Link from "next/link";

import SEO from "@/components/SEO";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsTableOfContents from "@/components/docs/DocsTableOfContents";
import DocsImage from "@/components/docs/DocsImage";
import DocsCallout from "@/components/docs/DocsCallout";
import DocsSteps from "@/components/docs/DocsSteps";
import AdsenseAd from "@/components/adds/AdsenseAd";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

const LAST_UPDATED = "16 September 2026";
const READ_TIME = "5 min read";

export default function HowToConvertPdfToImagesPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-pdf-to-image",
      title: "What is PDF to image conversion?",
    },
    {
      id: "supported-formats",
      title: "Supported output formats",
    },
    {
      id: "how-to-convert",
      title: "How to convert PDF to images",
    },
    {
      id: "tips",
      title: "Tips for converting PDFs",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Convert PDF to Images"
        description="Learn how to extract and convert PDF pages into high-quality PNG, JPEG, or WebP image files easily."
        keywords="PDF to Image, Convert PDF to PNG, PDF to JPEG, PDF to WebP, How to convert PDF to images, PDF to image guide, PDF tools, Free PDF tools, FlagsDev"
        canonical={CANONICAL_PATHS.pdfHowToPdfToImage}
      />

      <DocsLayout
        title="How to Convert PDF to Images"
        description="Learn how to extract and convert PDF pages into high-quality PNG, JPEG, or WebP image files easily."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.pdfTool}#pdf-to-image`}
        sections={sections}
      >
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF documents are ideal for preserving document layouts and text
            formats across devices. However, there are many situations where you
            need page content saved as standard image files for social media
            sharing, embedding in presentations, or editing in graphics
            software.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Converting a PDF to images allows you to turn every page of a
            document into standalone image files such as PNG, JPEG, or WebP
            giving you total flexibility to reuse visual content wherever
            needed.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn how to convert PDF pages into image
            formats using the FlagsDev PDF to Image tool.
          </p>
        </section>
        <AdsenseAd />

        <DocsImage
          src="/images/pdf-to-image-illustration.svg"
          alt="PDF to Image workflow showing a PDF document being converted into separate PNG, JPEG, or WebP image files"
          caption="Select your PDF file, choose your target image format (PNG, JPEG, WebP), and export your pages."
        />

        <section id="what-is-pdf-to-image">
          <h2 className="text-2xl font-bold text-slate-900">
            What is PDF to image conversion?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            PDF to image conversion is the process of rendering each individual
            page of a PDF document into a rasterized image file.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            For example, if you upload a 3-page presentation PDF, the converter
            processes each page separately:
          </p>

          <ul className="list-inside list-disc text-sm text-slate-600">
            <li>Page 1: Outputted as Page_1.png / .jpg / .webp</li>
            <li>Page 2: Outputted as Page_2.png / .jpg / .webp</li>
            <li>Page 3: Outputted as Page_3.png / .jpg / .webp</li>
          </ul>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            This allows you to extract specific visuals, graphics, or pages
            without requiring recipients to use a dedicated PDF viewer.
          </p>
        </section>

        <section id="supported-formats">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Supported output formats
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            You can export your PDF pages into the following web-standard image
            formats based on your requirements:
          </p>

          <ul className="mt-3 list-inside list-disc text-sm leading-7 text-slate-600">
            <li>
              <strong className="text-slate-900">
                PNG (Portable Network Graphics):
              </strong>{" "}
              Best for documents containing crisp text, sharp lines, and
              diagrams. Offers lossless rendering.
            </li>
            <li>
              <strong className="text-slate-900">
                JPEG (Joint Photographic Experts Group):
              </strong>{" "}
              Ideal for image-heavy documents, photos, or when you need smaller
              file sizes.
            </li>
            <li>
              <strong className="text-slate-900">WebP:</strong> A modern image
              format that offers superior lossless and lossy compression for web
              use and fast page loads.
            </li>
          </ul>
        </section>

        <section id="how-to-convert">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to convert PDF to images
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these simple steps to extract images from your PDF file.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the PDF to Image tool",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.pdfTool}#pdf-to-image`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        PDF to Image tool
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides a simple workspace where you can upload
                      your PDF document.
                    </p>
                  </>
                ),
              },
              {
                title: "Select your PDF file",
                description: (
                  <>
                    <p>
                      Select the PDF document you wish to convert from your
                      device.
                    </p>

                    <p className="mt-3">
                      Once selected, the page thumbnails will be generated for
                      preview.
                    </p>
                  </>
                ),
              },
              {
                title: "Select image output format",
                description: (
                  <>
                    <p>
                      Choose your desired output format: <strong>PNG</strong>,{" "}
                      <strong>JPEG</strong>, or <strong>WebP</strong>.
                    </p>

                    <p className="mt-3">
                      Select PNG for maximum text clarity or JPEG/WebP for
                      optimized file sizes.
                    </p>
                  </>
                ),
              },
              {
                title: "Review page selection",
                description: (
                  <>
                    <p>
                      Choose whether to convert the entire document or specify
                      particular pages for extraction.
                    </p>

                    <p className="mt-3 text-red-600 text-justify bg-red-50 p-3 rounded-lg">
                      Double-check your target page selection and format
                      settings before initiating conversion.
                    </p>
                  </>
                ),
              },
              {
                title: "Convert to images",
                description: (
                  <>
                    <p>
                      Click the convert button to begin rendering your PDF pages
                      into the chosen image format.
                    </p>
                  </>
                ),
              },
              {
                title: "Download your images",
                description: (
                  <>
                    <p>
                      Save the converted image files directly to your device.
                    </p>

                    <p className="mt-3">
                      Multi-page extractions can be downloaded individually or
                      as a single compressed archive file.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout type="tip" title="Choosing the right image format">
          Use PNG for text-heavy documents or infographics to ensure high
          sharpness. Choose JPEG or WebP if you plan to share images online or
          send them via email to keep file sizes low.
        </DocsCallout>

        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for converting PDF to images
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Keep these guidelines in mind for optimal image quality:
          </p>

          <ul className="mt-3 list-inside list-disc text-sm leading-7 text-slate-600">
            <li>
              Select PNG for documents with high-contrast text and fine details.
            </li>
            <li>
              Select WebP for high quality at lower file sizes on modern
              platforms.
            </li>
            <li>
              Extract only necessary pages if you do not need the full document
              converted.
            </li>
            <li>
              Verify exported image resolutions before inserting them into
              digital presentations.
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
              Ready to convert your PDF to images?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Convert your PDF pages into PNG, JPEG, or WebP image files
              instantly using the FlagsDev PDF to Image tool.
            </p>

            <Link
              href={`${PUBLIC_PATHS.pdfTool}#pdf-to-image`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open PDF to Image Tool
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
