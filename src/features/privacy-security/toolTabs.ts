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
export type PrivacySecurityCategory = "hashing" | "encoding" | "cryptography";

export const privacyHasingToolTabs: ToolTab[] = [
  {
    id: "text-hash",
    label: "Text Hash",
    icon: Hash,
  },
  {
    id: "file-hash",
    label: "File Hash",
    icon: FileSearch,
  },
];

export const privacyEncodingToolTabs: ToolTab[] = [
  {
    id: "base64",
    label: "Base64",
    icon: Type,
  },
  {
    id: "url-encode",
    label: "URL Encoder",
    icon: Link,
  },
  {
    id: "html-entities",
    label: "HTML Entities",
    icon: Code,
  },
  {
    id: "unicode",
    label: "Unicode",
    icon: Languages,
  },
  {
    id: "hex",
    label: "Hex",
    icon: Binary,
  },
  {
    id: "binary",
    label: "Binary",
    icon: Binary,
  },
];

export const privacyCryptographyToolTabs: ToolTab[] = [
  {
    id: "password-generator",
    label: "Password Generator",
    icon: KeyRound,
  },
  {
    id: "uuid-generator",
    label: "UUID Generator",
    icon: Fingerprint,
  },
  {
    id: "hmac",
    label: "HMAC Generator",
    icon: ShieldCheck,
  },
  {
    id: "aes",
    label: "AES Encrypt / Decrypt",
    icon: LockKeyhole,
  },
  {
    id: "rsa-key-generator",
    label: "RSA Key Generator",
    icon: Key,
  },
  {
    id: "rsa",
    label: "RSA Encrypt / Decrypt",
    icon: LockKeyhole,
  },
  {
    id: "jwt",
    label: "JWT Encoder / Decoder",
    icon: Braces,
  },
  {
    id: "jwt-inspector",
    label: "JWT Inspector",
    icon: ShieldCheck,
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
    description: "Generate SHA, MD5, and other cryptographic hashes locally.",
  },
  {
    id: "encoding",
    label: "Encoding",
    description:
      "Encode and decode Base64, URL components, HTML entities, and more.",
  },
  {
    id: "cryptography",
    label: "Cryptography",
    description:
      "Inspect JWTs, generate secure passwords, UUIDs, and cryptographic keys.",
  },
];
