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
  gitHubRepo: "https://github.com/ahmad-junior/flags-dev",
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
};
