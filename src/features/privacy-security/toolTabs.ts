import {
  Hash,
  FileSearch,
  Type,
  Binary,
  Link,
  Code,
  Languages,
  KeyRound,
  LockKeyhole,
  Key,
  Fingerprint,
  ShieldCheck,
  Braces,
} from "lucide-react";

import { ToolTab } from "@/components/tool-layout/types";
import { PUBLIC_PATHS, PRIVACY_SECURITY_TOOL_URLS } from "@/routes";

export type PrivacySecurityCategory = "hashing" | "encoding" | "cryptography";

export const privacyHasingToolTabs: ToolTab[] = [
  {
    id: "text-hash",
    label: "Text Hash",
    icon: Hash,
    href: PRIVACY_SECURITY_TOOL_URLS.text,
    description:
      "Generate cryptographic hashes from text using MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3.",
    help: {
      href: PUBLIC_PATHS.hashingToolText,
      label: "Learn more about hashing text",
    },
  },
  {
    id: "file-hash",
    label: "File Hash",
    icon: FileSearch,
    href: PRIVACY_SECURITY_TOOL_URLS.file,
    description:
      "Generate cryptographic hashes for files locally without uploading them to a server.",
    help: {
      href: PUBLIC_PATHS.hashingToolFile,
      label: "Learn more about hashing files",
    },
  },
];

export const privacyEncodingToolTabs: ToolTab[] = [
  {
    id: "base64",
    label: "Base64",
    icon: Type,
    href: PRIVACY_SECURITY_TOOL_URLS.base64,
    description:
      "Encode and decode text or files using Base64 entirely in your browser.",
    help: {
      href: PUBLIC_PATHS.base64Tool,
      label: "Learn more about Base64 encoding",
    },
  },
  {
    id: "url-encode",
    label: "URL Encoder",
    icon: Link,
    href: "",
    description:
      "Encode and decode URL components safely for use in web addresses and query parameters.",
  },
  {
    id: "html-entities",
    label: "HTML Entities",
    icon: Code,
    href: "",
    description:
      "Encode and decode HTML entities to safely represent special characters in HTML.",
  },
  {
    id: "unicode",
    label: "Unicode",
    icon: Languages,
    href: "",
    description:
      "Convert text to Unicode code points and decode Unicode values back into readable text.",
  },
  {
    id: "hex",
    label: "Hex",
    icon: Binary,
    href: "",
    description:
      "Encode and decode text and binary data using hexadecimal representation.",
  },
  {
    id: "binary",
    label: "Binary",
    icon: Binary,
    href: "",
    description:
      "Convert text and data between readable characters and binary representation.",
  },
];

export const privacyCryptographyToolTabs: ToolTab[] = [
  {
    id: "password-generator",
    label: "Password Generator",
    icon: KeyRound,
    href: "",
    description:
      "Generate strong, random passwords locally with configurable length and character sets.",
  },
  {
    id: "uuid-generator",
    label: "UUID Generator",
    icon: Fingerprint,
    href: "",
    description:
      "Generate unique UUIDs locally for applications, databases, APIs, and development workflows.",
  },
  {
    id: "hmac",
    label: "HMAC Generator",
    icon: ShieldCheck,
    href: "",
    description:
      "Generate and verify HMAC signatures using secure hashing algorithms and secret keys.",
  },
  {
    id: "aes",
    label: "AES Encrypt / Decrypt",
    icon: LockKeyhole,
    href: "",
    description:
      "Encrypt and decrypt data using AES symmetric cryptography directly in your browser.",
  },
  {
    id: "rsa-key-generator",
    label: "RSA Key Generator",
    icon: Key,
    href: "",
    description:
      "Generate RSA public and private key pairs locally for encryption and digital signatures.",
  },
  {
    id: "rsa",
    label: "RSA Encrypt / Decrypt",
    icon: LockKeyhole,
    href: "",
    description:
      "Encrypt and decrypt data using RSA public-key cryptography in your browser.",
  },
  {
    id: "jwt",
    label: "JWT Encoder / Decoder",
    icon: Braces,
    href: "",
    description:
      "Encode and decode JSON Web Tokens while inspecting their header, payload, and signature.",
  },
  {
    id: "jwt-inspector",
    label: "JWT Inspector",
    icon: ShieldCheck,
    href: "",
    description:
      "Inspect JWT structure, claims, timestamps, and token metadata without sending it to a server.",
  },
];

export const CATEGORY_TABS: {
  id: PrivacySecurityCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "hashing",
    label: "Hashing",
    description:
      "Generate SHA, MD5, and other cryptographic hashes locally from text and files.",
  },
  {
    id: "encoding",
    label: "Encoding",
    description:
      "Encode and decode Base64, URLs, HTML entities, Unicode, hexadecimal, binary, and more.",
  },
  {
    id: "cryptography",
    label: "Cryptography",
    description:
      "Generate secure passwords, UUIDs, HMACs, encryption keys, and work with AES, RSA, and JWTs.",
  },
];
