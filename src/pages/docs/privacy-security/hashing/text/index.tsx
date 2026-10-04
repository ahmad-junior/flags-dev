import Link from "next/link";

import SEO from "@/components/SEO";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsTableOfContents from "@/components/docs/DocsTableOfContents";
import DocsImage from "@/components/docs/DocsImage";
import DocsCallout from "@/components/docs/DocsCallout";
import DocsSteps from "@/components/docs/DocsSteps";
import AdsenseAd from "@/components/adds/AdsenseAd";
import {
  CANONICAL_PATHS,
  PUBLIC_PATHS,
  PRIVACY_SECURITY_TOOL_URLS,
} from "@/routes";

const LAST_UPDATED = "1 October 2026";
const READ_TIME = "5 min read";

export default function HowToGenerateTextHashesPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-hashing",
      title: "What is hashing?",
    },
    {
      id: "supported-algorithms",
      title: "Supported hash algorithms",
    },
    {
      id: "how-to-hash-text",
      title: "How to hash text",
    },
    {
      id: "understanding-output",
      title: "Understanding hash output",
    },
    {
      id: "tips",
      title: "Tips for text hashing",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Generate Text Hashes"
        description="Learn how to generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3 hashes from text using FlagsDev Text Hash Generator."
        keywords="Text Hash Generator, Text Hashing, MD5, SHA-1, SHA-256, SHA-384, SHA-512, SHA-3, Hash Text, Generate Hash, Free Hash Generator, FlagsDev"
        canonical={CANONICAL_PATHS.hashingToolText}
      />

      <DocsLayout
        title="How to Generate Text Hashes"
        description="Learn how to generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3 hashes from text using FlagsDev Text Hash Generator."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={PRIVACY_SECURITY_TOOL_URLS.text}
        sections={sections}
      >
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Hashing is a common way to generate a fixed length representation of
            data. A hash function takes input data and produces a value known as
            a hash, digest, or checksum.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            FlagsDev Text Hash Generator allows you to generate hashes from text
            directly in your browser. You can enter or paste text and generate
            hashes using multiple commonly used hashing algorithms.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            This guide explains how text hashing works, which algorithms are
            supported, and how to understand and use the generated hash values.
          </p>
        </section>

        <AdsenseAd />

        <DocsImage
          src="/images/text-hashing-illustration.svg"
          alt="Text hashing workflow showing text being converted into hash values"
          caption="Enter text and generate hash values using multiple supported algorithms."
        />

        <section id="what-is-hashing">
          <h2 className="text-2xl font-bold text-slate-900">
            What is hashing?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Hashing is the process of passing data through a hash function to
            produce a deterministic value called a hash. The same input produces
            the same hash when the same algorithm and encoding are used.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            A small change in the input can produce a substantially different
            hash value. This property makes hashes useful for comparing data,
            checking integrity, identifying changes, and other technical
            workflows.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Hashing should not be confused with encryption. Encryption is
            designed to allow authorized parties to recover the original data,
            while cryptographic hash functions are generally designed as one way
            functions.
          </p>

          <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Input
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  Text
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Process
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  Hash Function
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Output
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  Hash Value
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="supported-algorithms">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Supported hash algorithms
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Text Hash Generator supports six hashing algorithms. Each algorithm
            produces a hash with different characteristics and output length.
          </p>

          <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="divide-y divide-slate-200">
              <div className="p-5">
                <h3 className="font-semibold text-slate-900">MD5</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  MD5 produces a 128-bit hash, commonly represented as a
                  32-character hexadecimal value. MD5 is considered
                  cryptographically broken and should not be used for modern
                  security-sensitive applications.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">SHA-1</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  SHA-1 produces a 160-bit hash, commonly represented as a
                  40-character hexadecimal value. SHA-1 has known practical
                  collision weaknesses and is not recommended for new
                  security-sensitive applications.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">SHA-256</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  SHA-256 produces a 256-bit hash, commonly represented as a
                  64-character hexadecimal value. It is widely used for modern
                  integrity and cryptographic applications.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">SHA-384</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  SHA-384 produces a 384-bit hash, commonly represented as a
                  96-character hexadecimal value. It belongs to the SHA-2
                  family.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">SHA-512</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  SHA-512 produces a 512-bit hash, commonly represented as a
                  128-character hexadecimal value. It is part of the SHA-2
                  family and is commonly used where a larger digest is required.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">SHA-3</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  SHA-3 is a member of the SHA-3 family standardized by NIST.
                  FlagsDev generates a SHA-3 digest for the supplied text.
                </p>
              </div>
            </div>
          </div>
        </section>

        <DocsCallout
          type="warning"
          title="MD5 and SHA-1 are not recommended for security"
        >
          MD5 and SHA-1 are included for compatibility, comparison, and
          legacy-data workflows. For new security-sensitive applications,
          consider modern cryptographic algorithms such as SHA-256, SHA-384,
          SHA-512, or SHA-3 where appropriate.
        </DocsCallout>

        <section id="how-to-hash-text">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to hash text
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these steps to generate hashes from text using the FlagsDev
            Text Hash Generator.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the Text Hash Generator",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={PRIVACY_SECURITY_TOOL_URLS.text}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        Text Hash Generator
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The tool provides a text input field and displays the
                      generated hash values for the supported algorithms.
                    </p>
                  </>
                ),
              },
              {
                title: "Enter your text",
                description: (
                  <>
                    <p>
                      Type or paste the text you want to hash into the input
                      field.
                    </p>

                    <p className="mt-3">
                      The input can contain ordinary text, numbers, symbols, or
                      other Unicode characters.
                    </p>
                  </>
                ),
              },
              {
                title: "Generate the hashes",
                description: (
                  <>
                    <p>Start the hashing operation after entering your text.</p>

                    <p className="mt-3">
                      The tool generates hash values using the supported
                      algorithms and displays the results separately.
                    </p>
                  </>
                ),
              },
              {
                title: "Review the output",
                description: (
                  <>
                    <p>
                      Review the generated values and select the algorithm that
                      matches your intended use case.
                    </p>

                    <p className="mt-3">
                      Hash outputs are deterministic, so the same input should
                      produce the same result when processed using the same
                      algorithm.
                    </p>
                  </>
                ),
              },
              {
                title: "Copy a hash value",
                description: (
                  <>
                    <p>
                      Copy the required hash value when you need to compare it,
                      store it, or use it in another application.
                    </p>

                    <p className="mt-3">
                      Make sure you copy the complete hash without accidentally
                      adding spaces or changing any characters.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        <section id="understanding-output">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Understanding hash output
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Hash values are commonly displayed as hexadecimal strings. The
            length of the output depends on the selected hashing algorithm.
          </p>

          <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Algorithm
                </p>

                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p>
                    <strong>MD5:</strong> 128 bits
                  </p>
                  <p>
                    <strong>SHA-1:</strong> 160 bits
                  </p>
                  <p>
                    <strong>SHA-256:</strong> 256 bits
                  </p>
                  <p>
                    <strong>SHA-384:</strong> 384 bits
                  </p>
                  <p>
                    <strong>SHA-512:</strong> 512 bits
                  </p>
                  <p>
                    <strong>SHA-3:</strong> 256-bit digest
                  </p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Common hexadecimal length
                </p>

                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p>
                    <strong>MD5:</strong> 32 characters
                  </p>
                  <p>
                    <strong>SHA-1:</strong> 40 characters
                  </p>
                  <p>
                    <strong>SHA-256:</strong> 64 characters
                  </p>
                  <p>
                    <strong>SHA-384:</strong> 96 characters
                  </p>
                  <p>
                    <strong>SHA-512:</strong> 128 characters
                  </p>
                  <p>
                    <strong>SHA-3:</strong> 64 characters
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm leading-7 text-slate-600 text-justify">
            The hash value is determined by the exact input. Even a small
            difference in the input, such as an additional space, different
            capitalization, or a changed character, can result in a completely
            different hash.
          </p>
        </section>

        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for text hashing
          </h2>

          <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-7 text-slate-600">
            <li>
              Use the same hashing algorithm when comparing two hash values.
            </li>

            <li>
              Make sure the input text is exactly the same when verifying a
              hash.
            </li>

            <li>
              Watch for leading spaces, trailing spaces, line breaks, and
              capitalization because they can change the resulting hash.
            </li>

            <li>
              Use SHA-256, SHA-384, SHA-512, or SHA-3 for modern cryptographic
              use cases where an appropriate cryptographic hash is required.
            </li>

            <li>
              Do not treat a hash as encryption. A normal hash function is not
              intended to be decrypted back into the original text.
            </li>

            <li>
              Do not use general-purpose hash functions such as MD5 or SHA-1 for
              password storage. Passwords require dedicated password hashing
              algorithms designed for that purpose.
            </li>
          </ul>
        </section>

        <section id="privacy">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Privacy</h2>

          <DocsCallout type="privacy" title="Browser based processing">
            FlagsDev Text Hash Generator is designed to generate hashes directly
            in your browser. Supported text hashing operations can therefore be
            performed locally without requiring the text to be uploaded to a
            remote processing server.
          </DocsCallout>

          <p className="my-3 text-sm leading-7 text-slate-600 text-justify">
            This can be useful when working with text that you prefer to keep on
            your device. However, always verify the specific workflow and avoid
            sharing sensitive information unnecessarily.
          </p>

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
              Ready to generate a hash?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3 hashes
              from your text with the FlagsDev Text Hash Generator.
            </p>

            <Link
              href={PRIVACY_SECURITY_TOOL_URLS.text}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Text Hash Generator
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
