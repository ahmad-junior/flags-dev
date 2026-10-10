import Hero from "@/components/home/Hero";
import Trust from "@/components/home/Trust";
import Security from "@/components/home/Security";
import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";
import { CANONICAL_PATHS } from "@/routes";

export default function HomePage() {
  return (
    <>
      <SEO canonical={CANONICAL_PATHS.home} />
      <Hero />
      <Trust />
      <AdsenseAd />
      <Security />
      <AdsenseAd />
    </>
  );
}
