import Link from "next/link";

import SEO from "@/components/SEO";
import DocsLayout from "@/components/docs/DocsLayout";
import DocsTableOfContents from "@/components/docs/DocsTableOfContents";
import DocsImage from "@/components/docs/DocsImage";
import DocsCallout from "@/components/docs/DocsCallout";
import DocsSteps from "@/components/docs/DocsSteps";
import AdsenseAd from "@/components/adds/AdsenseAd";
import { CANONICAL_PATHS, PUBLIC_PATHS } from "@/routes";

const LAST_UPDATED = "1 October 2026";
const READ_TIME = "6 min read";

export default function HowToGenerateFileHashesPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "what-is-file-hashing",
      title: "What is file hashing?",
    },
    {
      id: "supported-algorithms",
      title: "Supported hash algorithms",
    },
    {
      id: "how-to-hash-a-file",
      title: "How to hash a file",
    },
    {
      id: "verify-file-integrity",
      title: "How to verify file integrity",
    },
    {
      id: "understanding-hash-output",
      title: "Understanding hash output",
    },
    {
      id: "tips",
      title: "Tips for file hashing",
    },
    {
      id: "privacy",
      title: "Privacy",
    },
  ];

  return (
    <>
      <SEO
        title="How to Generate File Hashes and Verify File Integrity"
        description="Learn how to generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3 hashes for files and use file checksums to verify data integrity with FlagsDev."
        keywords="File Hash Generator, File Hashing, SHA-256 File Hash, MD5 File Hash, File Checksum, Checksum Generator, Verify File Integrity, File Integrity Checker, Hash a File, SHA-1 File Hash, SHA-512 File Hash, SHA-3 File Hash, Free File Hash Generator, FlagsDev"
        canonical={CANONICAL_PATHS.hashingToolFile}
      />

      <DocsLayout
        title="How to Generate File Hashes and Verify File Integrity"
        description="Learn how to generate cryptographic hashes for files and use file checksums to verify whether file data has changed."
        updatedAt={LAST_UPDATED}
        readTime={READ_TIME}
        toolUrl={`${PUBLIC_PATHS.privacySecurity}#file-hash`}
        sections={sections}
      >
        <DocsTableOfContents sections={sections} />

        <section id="introduction">
          <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            A file hash is a fixed length value generated from the contents of a
            file. Hashes are commonly used as file checksums to compare data,
            detect changes, and verify file integrity.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            FlagsDev File Hash Generator allows you to calculate hashes for
            files directly in your browser. You can select a file and generate
            hash values using multiple supported hashing algorithms without
            manually reading the file contents.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            This guide explains what file hashing is, how to generate a file
            checksum, how to compare a hash with a known value, and how to
            choose an appropriate hashing algorithm.
          </p>
        </section>

        <AdsenseAd />

        <DocsImage
          src="/images/file-hashing-illustration.svg"
          alt="File hashing workflow showing a file being processed into multiple hash values"
          caption="Select a file and generate hash values to compare or verify its contents."
        />

        <section id="what-is-file-hashing">
          <h2 className="text-2xl font-bold text-slate-900">
            What is file hashing?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            File hashing is the process of passing the contents of a file
            through a hash function to produce a deterministic hash value. The
            resulting value is often called a file hash, digest, or checksum.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            The hash is calculated from the file&apos;s data rather than its
            filename. If the contents of a file change, its hash will normally
            change as well.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            This makes hashes useful when you need to determine whether a file
            still matches a previously calculated value. For example, you can
            calculate the SHA-256 hash of a downloaded file and compare it with
            a SHA-256 checksum published by the software provider.
          </p>

          <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Input
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  File
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
                  File Hash
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
            FlagsDev File Hash Generator supports several commonly encountered
            hashing algorithms. Each algorithm produces a hash with a specific
            digest size.
          </p>

          <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="divide-y divide-slate-200">
              <div className="p-5">
                <h3 className="font-semibold text-slate-900">MD5 File Hash</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  MD5 produces a 128-bit digest, normally displayed as a
                  32-character hexadecimal value. MD5 is commonly encountered in
                  older file checksum workflows, but it is not considered
                  suitable for modern security-sensitive applications because
                  collision attacks are known.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">
                  SHA-1 File Hash
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  SHA-1 produces a 160-bit digest, normally displayed as a
                  40-character hexadecimal value. SHA-1 has known collision
                  weaknesses and should not be selected for new
                  security-sensitive applications.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">
                  SHA-256 File Hash
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  SHA-256 produces a 256-bit digest, normally displayed as a
                  64-character hexadecimal value. It is widely used for file
                  integrity checks, software downloads, digital assets, and
                  other modern cryptographic workflows.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">
                  SHA-384 File Hash
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  SHA-384 produces a 384-bit digest, normally displayed as a
                  96-character hexadecimal value. It is part of the SHA-2 family
                  of cryptographic hash functions.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">
                  SHA-512 File Hash
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  SHA-512 produces a 512-bit digest, normally displayed as a
                  128-character hexadecimal value. It is part of the SHA-2
                  family and can be used when a larger cryptographic digest is
                  required.
                </p>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">
                  SHA-3 File Hash
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  SHA-3 is a family of cryptographic hash functions standardized
                  by NIST. FlagsDev currently generates a SHA3-256 digest for
                  file hashing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <DocsCallout
          type="warning"
          title="Choose modern algorithms for security-sensitive use"
        >
          MD5 and SHA-1 are provided for compatibility, legacy workflows, and
          comparison purposes. For new security-sensitive applications, use an
          appropriate modern cryptographic hash such as SHA-256, SHA-384,
          SHA-512, or SHA-3.
        </DocsCallout>

        <section id="how-to-hash-a-file">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to hash a file
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            Follow these steps to generate a file hash using the FlagsDev File
            Hash Generator.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Open the File Hash Generator",
                description: (
                  <>
                    <p>
                      Open the{" "}
                      <Link
                        href={`${PUBLIC_PATHS.privacySecurity}#file-hash`}
                        className="font-semibold text-slate-950 underline underline-offset-4"
                      >
                        File Hash Generator
                      </Link>
                      .
                    </p>

                    <p className="mt-3">
                      The hashing interface allows you to select a file and
                      calculate its hash values.
                    </p>
                  </>
                ),
              },
              {
                title: "Select a file",
                description: (
                  <>
                    <p>Choose the file you want to hash from your device.</p>

                    <p className="mt-3">
                      The filename itself does not determine the hash. The hash
                      is calculated from the contents of the selected file.
                    </p>
                  </>
                ),
              },
              {
                title: "Generate the file hashes",
                description: (
                  <>
                    <p>
                      Start the hashing operation after selecting your file.
                    </p>

                    <p className="mt-3">
                      FlagsDev reads the file data in your browser and
                      calculates the supported hash values.
                    </p>
                  </>
                ),
              },
              {
                title: "Review the hash values",
                description: (
                  <>
                    <p>
                      Review the generated MD5, SHA-1, SHA-256, SHA-384,
                      SHA-512, and SHA-3 values.
                    </p>

                    <p className="mt-3">
                      Select the hash algorithm required by the website,
                      software project, documentation, or verification process
                      you are working with.
                    </p>
                  </>
                ),
              },
              {
                title: "Copy the required checksum",
                description: (
                  <>
                    <p>
                      Copy the required file hash and compare it with the
                      expected checksum when verifying file integrity.
                    </p>

                    <p className="mt-3">
                      Make sure the complete hash value is copied without
                      accidental spaces or missing characters.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>

        {/* Verify file integrity */}
        <section id="verify-file-integrity">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            How to verify file integrity
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            A file checksum can be used to check whether the contents of a file
            match a previously known hash. This is commonly useful for
            downloaded software, backups, archives, datasets, and files
            transferred between systems.
          </p>

          <DocsSteps
            steps={[
              {
                title: "Obtain the expected hash",
                description: (
                  <p>
                    Find the checksum published by the trusted source of the
                    file. Make sure you know which hashing algorithm was used.
                  </p>
                ),
              },
              {
                title: "Generate a hash from your file",
                description: (
                  <p>
                    Select the downloaded or transferred file in the FlagsDev
                    File Hash Generator and generate the same type of hash as
                    the published checksum.
                  </p>
                ),
              },
              {
                title: "Compare the values",
                description: (
                  <p>
                    Compare your generated hash with the expected checksum. If
                    the values are identical, the file data matches the data
                    represented by that checksum.
                  </p>
                ),
              },
            ]}
          />

          <DocsCallout type="tip" title="Compare the complete hash">
            Compare the complete hash value and make sure both values were
            generated using the same algorithm. A SHA-256 hash cannot be
            directly compared with an MD5 or SHA-1 hash.
          </DocsCallout>
        </section>

        <section id="understanding-hash-output">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Understanding hash output
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            File hashes are commonly displayed as lowercase hexadecimal strings.
            The output length depends on the selected algorithm.
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
                  Hexadecimal output
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
            The same file contents produce the same hash when processed with the
            same algorithm. Changing even a small part of the file can produce a
            different hash.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
            The filename, extension, and location of a file do not normally
            become part of a standard file hash calculation. The hash is
            calculated from the file data itself.
          </p>
        </section>

        {/* Tips */}
        <section id="tips">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Tips for file hashing
          </h2>

          <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-7 text-slate-600">
            <li>
              Use the same hashing algorithm as the checksum you are comparing
              against.
            </li>

            <li>
              Compare the complete hash value rather than checking only a small
              portion of it.
            </li>

            <li>
              Keep the original or trusted checksum available when verifying a
              downloaded file.
            </li>

            <li>
              SHA-256 is a common choice when a modern cryptographic file hash
              is required.
            </li>

            <li>
              MD5 and SHA-1 may still appear in legacy documentation or download
              pages, but they should not be treated as modern
              collision-resistant choices.
            </li>

            <li>
              A matching checksum shows that the file data matches the expected
              hash, but the hash alone does not prove who created or published
              the file.
            </li>

            <li>
              Hashing is different from encryption. A file hash is not intended
              to be decoded back into the original file.
            </li>
          </ul>
        </section>

        <section id="privacy">
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Privacy</h2>

          <DocsCallout type="privacy" title="Browser based file hashing">
            FlagsDev File Hash Generator is designed to calculate supported file
            hashes directly in your browser. The file can be processed locally
            without requiring it to be uploaded to a remote hashing server.
          </DocsCallout>

          <p className="my-3 text-sm leading-7 text-slate-600 text-justify">
            Local browser processing can be useful when working with private
            documents, software packages, archives, datasets, or other files
            that you do not want to send to an external processing service.
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
              Ready to hash a file?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3 file
              hashes directly in your browser with FlagsDev.
            </p>

            <Link
              href={`${PUBLIC_PATHS.privacySecurity}#file-hash`}
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open File Hash Generator
            </Link>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
