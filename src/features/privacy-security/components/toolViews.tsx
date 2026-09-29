import { ComingSoonLayout } from "@/components/layout/ComingSoonLayout";

import {
  Link,
  Code,
  Languages,
  Binary,
  KeyRound,
  Fingerprint,
  ShieldCheck,
  LockKeyhole,
  Key,
  Braces,
} from "lucide-react";

import HashGenerator from "@/features/privacy-security/components/hashing/HashGenerator";
import Base64Tool from "@/features/privacy-security/components/encoding/base64/Base64Tool";

export const PRIVACY_SECURITY_TOOL_VIEWS = {
  "text-hash": <HashGenerator inputType="text" />,
  "file-hash": <HashGenerator inputType="file" />,
  base64: <Base64Tool />,

  "url-encode": (
    <ComingSoonLayout
      toolName="URL Encoder / Decoder"
      toolIcon={Link}
      description="Encode or decode URL components safely for use in web addresses, query parameters, and APIs."
      keyFeatures={[
        "URL encoding and decoding",
        "RFC-compatible browser processing",
        "No data sent to external servers",
      ]}
    />
  ),

  "html-entities": (
    <ComingSoonLayout
      toolName="HTML Entity Encoder / Decoder"
      toolIcon={Code}
      description="Convert special characters to HTML entities or decode HTML entities back into readable text."
      keyFeatures={[
        "Encode and decode HTML entities",
        "Handle special characters safely",
        "Process content locally in your browser",
      ]}
    />
  ),

  unicode: (
    <ComingSoonLayout
      toolName="Unicode Encoder / Decoder"
      toolIcon={Languages}
      description="Convert text between Unicode characters and their escaped representations for development and debugging."
      keyFeatures={[
        "Unicode escape encoding and decoding",
        "Support for international text",
        "Fast client-side processing",
      ]}
    />
  ),

  hex: (
    <ComingSoonLayout
      toolName="Hex Encoder / Decoder"
      toolIcon={Binary}
      description="Encode text into hexadecimal or decode hexadecimal data directly in your browser."
      keyFeatures={[
        "Hexadecimal encoding and decoding",
        "UTF-8 text support",
        "Instant local processing",
      ]}
    />
  ),

  binary: (
    <ComingSoonLayout
      toolName="Binary Encoder / Decoder"
      toolIcon={Binary}
      description="Convert text to binary representation or decode binary values back into readable text."
      keyFeatures={[
        "Text-to-binary conversion",
        "Binary-to-text decoding",
        "No server-side processing",
      ]}
    />
  ),

  "password-generator": (
    <ComingSoonLayout
      toolName="Password Generator"
      toolIcon={KeyRound}
      description="Generate strong, customizable passwords using secure browser-based randomness."
      keyFeatures={[
        "Cryptographically secure randomness",
        "Custom length and character sets",
        "Generate passwords entirely on your device",
      ]}
    />
  ),

  "uuid-generator": (
    <ComingSoonLayout
      toolName="UUID Generator"
      toolIcon={Fingerprint}
      description="Generate universally unique identifiers directly in your browser for applications, databases, APIs, and development."
      keyFeatures={[
        "Generate UUID v4 identifiers",
        "Secure browser-based randomness",
        "Generate and copy multiple UUIDs",
      ]}
    />
  ),

  hmac: (
    <ComingSoonLayout
      toolName="HMAC Generator"
      toolIcon={ShieldCheck}
      description="Generate HMAC signatures using a secret key and supported cryptographic hash algorithms directly in your browser."
      keyFeatures={[
        "Multiple HMAC hash algorithms",
        "Secret keys remain on your device",
        "Useful for API and webhook signature testing",
      ]}
    />
  ),

  aes: (
    <ComingSoonLayout
      toolName="AES Encrypt / Decrypt"
      toolIcon={LockKeyhole}
      description="Encrypt and decrypt text using AES directly in your browser without sending sensitive data to a remote server."
      keyFeatures={[
        "AES encryption and decryption",
        "Browser-based Web Crypto processing",
        "Sensitive data stays on your device",
      ]}
    />
  ),

  "rsa-key-generator": (
    <ComingSoonLayout
      toolName="RSA Key Generator"
      toolIcon={Key}
      description="Generate RSA public and private key pairs locally for development, testing, encryption, and digital signature workflows."
      keyFeatures={[
        "Generate RSA key pairs locally",
        "Configurable key sizes",
        "Export public and private keys",
      ]}
    />
  ),

  rsa: (
    <ComingSoonLayout
      toolName="RSA Encrypt / Decrypt"
      toolIcon={LockKeyhole}
      description="Encrypt and decrypt compatible data using RSA public and private keys directly in your browser."
      keyFeatures={[
        "RSA encryption and decryption",
        "Client-side cryptographic operations",
        "No key material uploaded to servers",
      ]}
    />
  ),

  jwt: (
    <ComingSoonLayout
      toolName="JWT Encoder / Decoder"
      toolIcon={Braces}
      description="Create and decode JSON Web Tokens for development and testing while keeping token data inside your browser."
      keyFeatures={[
        "Encode JWT payloads",
        "Decode JWT headers and payloads",
        "Local browser-based processing",
      ]}
    />
  ),

  "jwt-inspector": (
    <ComingSoonLayout
      toolName="JWT Inspector"
      toolIcon={ShieldCheck}
      description="Inspect JWT headers, payloads, claims, expiration times, and token structure without uploading tokens anywhere."
      keyFeatures={[
        "Inspect JWT headers and claims",
        "Check expiration and standard claims",
        "Token data stays in your browser",
      ]}
    />
  ),
};
