import { FileText } from "lucide-react";
import { pdfToolTabs } from "@/features/pdf/toolTabs";
import {
  privacyHasingToolTabs,
  privacyEncodingToolTabs,
  privacyCryptographyToolTabs,
} from "@/features/privacy-security/toolTabs";

export const DOC_CATEGORIES = [
  {
    title: "PDF Tools",
    description:
      "Learn how to work with secure, local PDFs using FlagsDev's browser-based utilities.",
    icon: FileText,
    docs: pdfToolTabs,
  },
  {
    title: "Privacy & Security",
    description:
      "Learn how to protect your data and privacy with FlagsDev's hashing, encoding, and cryptography tools.",
    icon: FileText,
    docs: [
      ...privacyHasingToolTabs,
      ...privacyEncodingToolTabs,
      ...privacyCryptographyToolTabs,
    ],
  },
];
