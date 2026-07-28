"use client";

import Script from "next/script";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import SEO from "@/components/SEO";
import { ReactNode } from "react";
import { Toaster } from "sonner";

import Footer from "@/components/layout/Footer";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <SEO />
      <Script
        id="adsense-script"
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5501202176561362"
        crossOrigin="anonymous"
      />
      <main className="min-h-screen flex flex-col">
        {getLayout(<Component {...pageProps} />)}
      </main>

      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={4000}
        visibleToasts={4}
        expand={false}
      />
      <Footer />
    </>
  );
}
