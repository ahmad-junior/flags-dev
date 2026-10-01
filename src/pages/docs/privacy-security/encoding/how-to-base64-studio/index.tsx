import Link from "next/link";

import SEO from "@/components/SEO";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsTableOfContents from "@/components/docs/DocsTableOfContents";
import DocsImage from "@/components/docs/DocsImage";
import DocsCallout from "@/components/docs/DocsCallout";
import DocsSteps from "@/components/docs/DocsSteps";
import AdsenseAd from "@/components/adds/AdsenseAd";
import { CANONICAL_PATHS, STATIC_PATHS } from "@/routes";

const LAST_UPDATED = "1 October 2026";
const READ_TIME = "10 min read";

export default function HowToUseBase64StudioPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-base64",
      title: "What is Base64?",
    },
    {
      id: "how-to-use",
      title: "How to use Base64 Studio",
    },
    {
      id: "text-and-file-input",
      title: "Text and file input",
    },
    {
      id: "tips",
      title: "Tips for using Base64",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Use Base64 Studio"
        description="Learn how to encode text and files to Base64 and decode Base64 data back into text or files using FlagsDev Base64 Studio."
        keywords="Base64, Base64 Encoder, Base64 Decoder, Base64 Studio, Encode Base64, Decode Base64, File to Base64, Base64 to File, Free Base64 tool, FlagsDev"
        canonical={CANONICAL_PATHS.base64HowTo}
      />

      <DocsLayout
        title="How to Use Base64 Studio"
        description="Learn how to encode text and files to Base64 and decode Base64 data back into text or files using FlagsDev Base64 Studio."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${STATIC_PATHS.privacySecurity}#base64`}
        sections={sections}
      >
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Base64 is a commonly used encoding format for representing binary
            data as text. It is often used when data needs to be stored or
            transferred through systems that are designed primarily for text
            based content.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            With FlagsDev Base64 Studio, you can encode text or files into
            Base64 and decode Base64 data back into text or a file. The tool
            supports both text based and file based workflows through a simple
            browser interface.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            In this guide, you will learn what Base64 is, how to encode and
            decode data, and how to use the different input and output modes
            available in Base64 Studio.
          </p>
        </section>

        <AdsenseAd />

        <DocsImage
          src="/images/base64-studio-illustration.svg"
          alt="Base64 Studio workflow showing text and files being encoded and decoded"
          caption="Encode text or files to Base64, or decode Base64 data back into its original form."
        />

        <section id="what-is-base64">
          <h2 className="text-2xl font-bold text-slate-900">What is Base64?</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Base64 is an encoding scheme that represents binary data using a
            limited set of ASCII characters. It converts groups of binary data
            into text so the resulting value can be handled by systems that
            expect textual data.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Base64 is an encoding format, not encryption. Encoding data with
            Base64 does not protect it from being read by someone else. Anyone
            with the Base64 value can decode it back into the underlying data.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Base64 is commonly encountered in APIs, data URLs, email systems,
            configuration files, authentication related data, and applications
            that need to represent binary content as text.
          </p>

          <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Input
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  Text or File
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Process
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  Base64 Encoding
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Result
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  Base64 Data
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-to-use">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to use Base64 Studio
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Base64 Studio supports both encoding and decoding workflows. Follow
            the steps below depending on what you want to do.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open Base64 Studio",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${STATIC_PATHS.privacySecurity}#base64`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Base64 Studio
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides controls for choosing between encoding
                      and decoding and for selecting the appropriate input type.
                    </p>
                  </>
                ),
              },
              {
                title: "Choose Encode or Decode",
                description: (
                  <>
                    <p>
                      Select <strong>Encode</strong> when you want to convert
                      text or a file into Base64.
                    </p>

                    <p className="mt-3">
                      Select <strong>Decode</strong> when you already have
                      Base64 data and want to convert it back into text or a
                      file.
                    </p>
                  </>
                ),
              },
              {
                title: "Select the input type",
                description: (
                  <>
                    <p>
                      When encoding, you can choose between{" "}
                      <strong>Text</strong> and <strong>File</strong> input.
                    </p>

                    <p className="mt-3">
                      Text input is useful for strings, configuration values, or
                      other textual content. File input allows you to select a
                      file and convert its binary contents into Base64.
                    </p>
                  </>
                ),
              },
              {
                title: "Enter or select your data",
                description: (
                  <>
                    <p>
                      For text encoding, enter or paste your content into the
                      input field.
                    </p>

                    <p className="mt-3">
                      For file encoding, select the file you want to convert
                      from your device.
                    </p>

                    <p className="mt-3">
                      When decoding, paste the Base64 value into the Base64
                      input field.
                    </p>
                  </>
                ),
              },
              {
                title: "Process the data",
                description: (
                  <>
                    <p>
                      Start the encoding or decoding operation after providing
                      the required input.
                    </p>

                    <p className="mt-3">
                      Base64 Studio processes the provided data and displays the
                      resulting value or decoded file.
                    </p>
                  </>
                ),
              },
              {
                title: "Review and use the result",
                description: (
                  <>
                    <p>
                      Review the generated Base64 value or decoded result before
                      using it elsewhere.
                    </p>

                    <p className="mt-3">
                      You can copy Base64 text to your clipboard or download the
                      resulting data when working with files.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <DocsCallout type="tip" title="Base64 is encoding, not encryption">
          Do not use Base64 to protect passwords, API keys, confidential
          information, or other sensitive data. Base64 makes binary data
          representable as text but does not provide confidentiality or
          security.
        </DocsCallout>

        <section id="text-and-file-input">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Text and file input
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Base64 Studio supports two different input workflows when encoding:
            text and files. The appropriate mode depends on the type of data you
            want to convert.
          </p>

          <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="divide-y divide-slate-200">
              <div className="p-5">
                <h3 className="font-semibold text-slate-900">Text to Base64</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Enter text into the input field and encode it into a Base64
                  representation. This is useful when you need to represent
                  textual content as Base64.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">File to Base64</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Select a file from your device to convert its binary contents
                  into Base64. The resulting Base64 value represents the
                  file&apos;s data.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">Base64 to Text</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Paste a Base64 value and decode it as UTF-8 text when the
                  underlying data represents text.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">Base64 to File</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Decode Base64 data into binary file data when the Base64 value
                  represents a file or other binary content.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm leading-7 text-slate-600 text-justify">
            When decoding arbitrary Base64 data into a file, the original
            filename and MIME type may not be available in the Base64 value
            itself. In those cases, the decoded data may use a generic filename
            and binary content type.
          </p>
        </section>

        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for using Base64
          </h2>

          <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-7 text-slate-600">
            <li>
              Remember that Base64 encoding does not encrypt or secure your
              data.
            </li>

            <li>
              Make sure you decode Base64 as text only when the underlying data
              is actually textual content.
            </li>

            <li>
              When working with files, keep the original file available if you
              need to compare the decoded result.
            </li>

            <li>
              Large files can produce very large Base64 strings because binary
              data is represented using text characters.
            </li>

            <li>
              When copying Base64 values, avoid accidentally adding unrelated
              characters or modifying the encoded content.
            </li>

            <li>
              Use the decoded result only after verifying that it represents the
              expected data.
            </li>
          </ul>
        </section>

        <section id="privacy">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Privacy</h2>

          <DocsCallout type="privacy" title="Browser based processing">
            FlagsDev Base64 Studio is designed to process supported text and
            file data directly in your browser. This means your input can be
            processed locally without requiring the file or text to be uploaded
            to a remote processing server.
          </DocsCallout>

          <p className="my-3 text-sm leading-7 text-slate-600 text-justify">
            Because Base64 operations can involve sensitive or private data,
            always verify the behavior of the specific tool and your browser
            environment before processing information with additional
            applications or services.
          </p>

          <p className="my-3 text-sm leading-7 text-slate-600 text-justify">
            For the most accurate information about how data is handled, review
            the{" "}
            <Link
              href={STATIC_PATHS.privacy}
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
              Ready to work with Base64?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Encode text and files to Base64 or decode Base64 data back into
              text and files with FlagsDev Base64 Studio.
            </p>

            <Link
              href={`${STATIC_PATHS.privacySecurity}#base64`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Base64 Studio
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
