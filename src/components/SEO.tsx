import Head from "next/head";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
};

const DEFAULTS = {
  title: "FlagsDev | Privacy-First Browser Tools",
  description:
    "Free, open-source browser tools for PDFs, images, and documents. Everything runs locally in your browser. No uploads. No servers. No tracking.",
  keywords:
    "FlagsDev, PDF Tools, Image Tools, Browser Tools, Open Source, Privacy, Image to PDF, Merge PDF, Split PDF, Compress PDF",
  image: "/og-image.png",
  url: "https://flagsdev.com",
};

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  noIndex = false,
}: SEOProps) {
  const seo = {
    title: title ? `${title} | FlagsDev` : DEFAULTS.title,

    description: description ?? DEFAULTS.description,

    keywords: keywords ?? DEFAULTS.keywords,

    image: image ?? DEFAULTS.image,

    url: url ?? DEFAULTS.url,
  };

  return (
    <Head>
      <title>{seo.title}</title>

      <meta name="description" content={seo.description} />

      <meta name="keywords" content={seo.keywords} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="theme-color" content="#0f172a" />

      {/* Robots */}
      <meta
        name="robots"
        content={noIndex ? "noindex,nofollow" : "index,follow"}
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />

      <meta property="og:title" content={seo.title} />

      <meta property="og:description" content={seo.description} />

      <meta property="og:image" content={seo.image} />

      <meta property="og:url" content={seo.url} />

      <meta property="og:site_name" content="FlagsDev" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={seo.title} />

      <meta name="twitter:description" content={seo.description} />

      <meta name="twitter:image" content={seo.image} />

      {/* Icons */}
      <link rel="icon" href="/favicon.ico" />

      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
}
