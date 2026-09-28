import { FaShieldAlt } from "react-icons/fa";

export const privacySecurityTools = {
  slug: "privacy-security",

  title: "Privacy & Security Tools",

  description:
    "Private browser based security utilities for hashing, encoding, encryption, key generation, and secure data inspection. Everything is processed locally on your device without uploading your sensitive data.",

  category: "Privacy & Security",

  icon: FaShieldAlt,

  badges: [
    "Open Source",
    "Privacy First",
    "Client Side",
    "No Uploads",
    "No Tracking",
    "Free Forever",
  ],

  features: [
    {
      title: "Text Hash Generator",
      description:
        "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3 hashes from text directly in your browser.",
    },
    {
      title: "File Hash Calculator",
      description:
        "Calculate cryptographic hashes for local files to verify integrity without uploading them to a server.",
    },
    {
      title: "Base64 Encoder & Decoder",
      description:
        "Encode and decode text or binary data using Base64 entirely within your browser.",
    },
    {
      title: "URL Encoder & Decoder",
      description:
        "Safely encode and decode URLs and query parameters without sending your data to an external service.",
    },
    {
      title: "HTML Entity Encoder & Decoder",
      description:
        "Convert special characters to HTML entities and decode HTML entities back into readable text locally.",
    },
    {
      title: "Unicode Encoder & Decoder",
      description:
        "Inspect and convert Unicode characters, escape sequences, and code points directly on your device.",
    },
    {
      title: "Hex & Binary Converter",
      description:
        "Convert text and data between hexadecimal, binary, decimal, and readable representations.",
    },
    {
      title: "Secure Password Generator",
      description:
        "Generate strong random passwords using browser cryptographic randomness with configurable length and character sets.",
    },
    {
      title: "UUID Generator",
      description:
        "Generate unique UUIDs locally without external APIs, accounts, or network requests.",
    },
    {
      title: "HMAC Generator",
      description:
        "Generate HMAC signatures using supported cryptographic algorithms with keys that remain in your browser.",
    },
    {
      title: "AES Encrypt & Decrypt",
      description:
        "Encrypt and decrypt supported data using AES through the browser's native Web Crypto API.",
    },
    {
      title: "RSA Key Generator",
      description:
        "Generate RSA key pairs locally for supported cryptographic workflows without transmitting private keys.",
    },
    {
      title: "RSA Encrypt & Decrypt",
      description:
        "Perform supported RSA encryption and decryption operations locally using browser cryptography APIs.",
    },
    {
      title: "JWT Encoder & Decoder",
      description:
        "Create and decode JSON Web Tokens locally while keeping your token data inside the browser.",
    },
    {
      title: "JWT Inspector",
      description:
        "Inspect JWT headers, payloads, claims, timestamps, and token structure without uploading the token.",
    },
  ],

  faqs: [
    {
      question: "Is my sensitive data uploaded to FlagsDev?",
      answer:
        "No. These tools are designed to process supported inputs directly in your browser. Your text, files, keys, tokens, and other input data do not need to be uploaded to a FlagsDev server.",
    },
    {
      question: "Can I use these security tools for private data?",
      answer:
        "Yes. Processing is performed locally in your browser for supported tools. However, you should always understand the cryptographic algorithm and configuration before using generated output for security critical systems.",
    },
    {
      question: "What is the difference between hashing and encryption?",
      answer:
        "Hashing produces a one way digest that is designed to be difficult to reverse, while encryption transforms data into ciphertext that can be decrypted using the appropriate key.",
    },
    {
      question: "Does encoding protect my data?",
      answer:
        "No. Encoding such as Base64, hexadecimal, and URL encoding is designed to represent data in another format, not to provide confidentiality or security.",
    },
    {
      question: "Are private keys sent to a server?",
      answer:
        "No. Supported cryptographic operations are performed locally in your browser, so private keys can remain on your device.",
    },
    {
      question: "Which cryptographic APIs do these tools use?",
      answer:
        "Where supported, cryptographic operations use the browser's native Web Crypto API rather than sending sensitive data to a remote service.",
    },
    {
      question: "Can I use the JWT tools to verify a token?",
      answer:
        "The JWT tools can inspect and decode token structure locally. Signature verification depends on the token algorithm and the appropriate verification key or secret being available.",
    },
    {
      question: "Does FlagsDev store my inputs or generated results?",
      answer:
        "FlagsDev does not need to store your inputs or generated results on a server for these browser-based tools. Processing happens locally whenever the selected operation supports client-side execution.",
    },
    {
      question: "Are these tools suitable for production cryptography?",
      answer:
        "They are useful for development, testing, inspection, and learning. For security-critical production systems, always review the algorithm, key management, implementation, and threat model independently rather than relying solely on a browser utility.",
    },
    {
      question: "Is the Privacy & Security category open source?",
      answer:
        "Yes. FlagsDev is an open-source project, allowing users to inspect the implementation and contribute improvements.",
    },
  ],

  lastUpdated: "28 September 2026",

  openSource: true,
  underConstruction: true,

  contributors: [
    {
      name: "Muhammad Ahmad",
      role: "Founder & Maintainer",
      email: "muhammadahmadkon@gmail.com",
    },
  ],
};
