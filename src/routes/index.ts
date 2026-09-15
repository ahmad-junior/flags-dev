const SITE_URL = "https://flagsdev.com";

export const PUBLIC_PATHS = {
  home: "/",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  contact: "/legal/contact",
  license: "/legal/license",
  about: "/legal/about",
  tools: "/tools",
  pdfTool: "/tools/pdf",
  converterTool: "/tools/converter",
  gitHubRepo: "https://github.com/ahmad-junior/flags-dev",

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
};
