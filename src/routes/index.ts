export const SITE_URL = "https://flagsdev.com";

export const PUBLIC_PATHS = {
  home: "/",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  contact: "/legal/contact",
  license: "/legal/license",
  about: "/legal/about",
  tools: "/tools",
  pdfTool: "/tools/pdf",
  privacySecurity: "/tools/privacy-security",
  converterTool: "/tools/converter",
  gitHubRepo: "https://github.com/ahmad-junior/flags-dev",
  sponsor: "/sponsor",
  docs: "/docs",
  blog: "/blog",
  founder: "/legal/founder-message",

  // Docs PDF Tools
  pdfHowToMerge: "/docs/pdf/how-to-merge-pdfs",
  pdfHowToSplit: "/docs/pdf/how-to-split-pdfs",
  pdfHowToCompress: "/docs/pdf/how-to-compress-pdfs",
  pdfHowToReorder: "/docs/pdf/how-to-reorder-pdfs",
  pdfHowToRotate: "/docs/pdf/how-to-rotate-pdfs",
  pdfHowToDeletePages: "/docs/pdf/how-to-delete-pdf-pages",
  pdfHowToExtract: "/docs/pdf/how-to-extract-pdf-pages",
  pdfHowToProtect: "/docs/pdf/how-to-protect-pdfs",
  pdfHowToUnlock: "/docs/pdf/how-to-unlock-pdfs",
  pdfHowToImageToPdf: "/docs/pdf/how-to-image-to-pdf",
  pdfHowToPdfToImage: "/docs/pdf/how-to-pdf-to-image",

  // Docs Privacy & Security Tools
  hashingToolText: "/docs/privacy-security/hashing/text",
  hashingToolFile: "/docs/privacy-security/hashing/file",
  base64Tool: "/docs/privacy-security/encoding/how-to-base64-studio",
};

export const PDF_TOOL_URLS = {
  merge: `${PUBLIC_PATHS.pdfTool}/merge`,
  split: `${PUBLIC_PATHS.pdfTool}/split`,
  compress: `${PUBLIC_PATHS.pdfTool}/compress`,
  reorder: `${PUBLIC_PATHS.pdfTool}/reorder`,
  rotate: `${PUBLIC_PATHS.pdfTool}/rotate`,
  deletePages: `${PUBLIC_PATHS.pdfTool}/delete`,
  extract: `${PUBLIC_PATHS.pdfTool}/extract`,
  protect: `${PUBLIC_PATHS.pdfTool}/protect`,
  unlock: `${PUBLIC_PATHS.pdfTool}/unlock`,
  pdfToImage: `${PUBLIC_PATHS.pdfTool}/pdf-to-image`,
  imageToPdf: `${PUBLIC_PATHS.pdfTool}/image-to-pdf`,
};

export const PRIVACY_SECURITY_TOOL_URLS = {
  text: `${PUBLIC_PATHS.privacySecurity}/hashing/text`,
  file: `${PUBLIC_PATHS.privacySecurity}/hashing/file`,
  base64: `${PUBLIC_PATHS.privacySecurity}/encoding/base64`,
};

export const STATIC_PATHS = {
  ...PUBLIC_PATHS,
};

export const CANONICAL_PATHS = {
  home: `${SITE_URL}${PUBLIC_PATHS.home}`,
  privacy: `${SITE_URL}${PUBLIC_PATHS.privacy}`,
  terms: `${SITE_URL}${PUBLIC_PATHS.terms}`,
  contact: `${SITE_URL}${PUBLIC_PATHS.contact}`,
  license: `${SITE_URL}${PUBLIC_PATHS.license}`,
  about: `${SITE_URL}${PUBLIC_PATHS.about}`,
  tools: `${SITE_URL}${PUBLIC_PATHS.tools}`,
  pdfTool: `${SITE_URL}${PUBLIC_PATHS.pdfTool}`,
  converterTool: `${SITE_URL}${PUBLIC_PATHS.converterTool}`,
  privacySecurity: `${SITE_URL}${PUBLIC_PATHS.privacySecurity}`,
  sponsor: `${SITE_URL}${PUBLIC_PATHS.sponsor}`,
  docs: `${SITE_URL}${PUBLIC_PATHS.docs}`,
  blog: `${SITE_URL}${PUBLIC_PATHS.blog}`,
  founder: `${SITE_URL}${PUBLIC_PATHS.founder}`,

  // Canonical PDF Tool URLs
  pdfMerge: `${SITE_URL}${PDF_TOOL_URLS.merge}`,
  pdfSplit: `${SITE_URL}${PDF_TOOL_URLS.split}`,
  pdfCompress: `${SITE_URL}${PDF_TOOL_URLS.compress}`,
  pdfReorder: `${SITE_URL}${PDF_TOOL_URLS.reorder}`,
  pdfRotate: `${SITE_URL}${PDF_TOOL_URLS.rotate}`,
  pdfDeletePages: `${SITE_URL}${PDF_TOOL_URLS.deletePages}`,
  pdfExtract: `${SITE_URL}${PDF_TOOL_URLS.extract}`,
  pdfProtect: `${SITE_URL}${PDF_TOOL_URLS.protect}`,
  pdfUnlock: `${SITE_URL}${PDF_TOOL_URLS.unlock}`,
  pdfPdfToImage: `${SITE_URL}${PDF_TOOL_URLS.pdfToImage}`,
  pdfImageToPdf: `${SITE_URL}${PDF_TOOL_URLS.imageToPdf}`,

  // Canonical Privacy Security Tool URLs
  pSText: `${SITE_URL}${PRIVACY_SECURITY_TOOL_URLS.text}`,
  pSFile: `${SITE_URL}${PRIVACY_SECURITY_TOOL_URLS.file}`,
  pSBase64: `${SITE_URL}${PRIVACY_SECURITY_TOOL_URLS.base64}`,

  // Docs PDF Tools
  pdfHowToMerge: `${SITE_URL}${PUBLIC_PATHS.pdfHowToMerge}`,
  pdfHowToSplit: `${SITE_URL}${PUBLIC_PATHS.pdfHowToSplit}`,
  pdfHowToCompress: `${SITE_URL}${PUBLIC_PATHS.pdfHowToCompress}`,
  pdfHowToReorder: `${SITE_URL}${PUBLIC_PATHS.pdfHowToReorder}`,
  pdfHowToRotate: `${SITE_URL}${PUBLIC_PATHS.pdfHowToRotate}`,
  pdfHowToDeletePages: `${SITE_URL}${PUBLIC_PATHS.pdfHowToDeletePages}`,
  pdfHowToExtract: `${SITE_URL}${PUBLIC_PATHS.pdfHowToExtract}`,
  pdfHowToProtect: `${SITE_URL}${PUBLIC_PATHS.pdfHowToProtect}`,
  pdfHowToUnlock: `${SITE_URL}${PUBLIC_PATHS.pdfHowToUnlock}`,
  pdfHowToImageToPdf: `${SITE_URL}${PUBLIC_PATHS.pdfHowToImageToPdf}`,
  pdfHowToPdfToImage: `${SITE_URL}${PUBLIC_PATHS.pdfHowToPdfToImage}`,

  // Docs Privacy & Security Tools
  base64HowTo: `${SITE_URL}${PUBLIC_PATHS.base64Tool}`,
  hashingToolText: `${SITE_URL}${PUBLIC_PATHS.hashingToolText}`,
  hashingToolFile: `${SITE_URL}${PUBLIC_PATHS.hashingToolFile}`,
};
