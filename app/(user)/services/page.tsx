import { Metadata } from "next";
import HeroNarrativeSection from "@/components/sections/ServicesHeroSection";
import ServicesNarrativeSection from "@/components/sections/ServicesNarrativeSection";
import TechnologyShowcaseSection from "@/components/sections/TechnologyShowcaseSection";
import ProcessTimelineSection from "@/components/sections/ProcessTimelineSection";
import CallToActionSection from "@/components/sections/CallToActionSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import { sanityFetch } from "@/sanity/lib/client";
import { portfolioQuery } from "@/sanity/lib/queries";
import { PortfolioPayload } from "@/types";
import HomePageHeroSection from "@/components/sections/HomePageHeroSection";
import ServicesHeroSection from "@/components/sections/ServicesHeroSection";

export const metadata: Metadata = {
  title: "Services | Reality Designers - Digital Experience Architecture",
  description:
    "Discover our services: Immersive Worlds, Brand Consciousness, Reality Platforms, and Motion Narratives. We architect the impossible and build bridges between digital and physical realities.",
  keywords: [
    "digital services",
    "immersive experiences",
    "brand design",
    "web development",
    "3D animation",
    "reality design",
    "spline design",
    "interactive experiences",
  ],
  openGraph: {
    title: "Services | Reality Designers",
    description:
      "We architect the impossible - from immersive worlds to conscious brand experiences.",
    type: "website",
  },
};

export default async function ServicesPage() {
  // Fetch portfolio items to showcase service examples
  const portfolioItems: PortfolioPayload[] = await sanityFetch({
    query: portfolioQuery,
    tags: ["portfolio"],
  });

  return (
    <main className="min-h-screen">
      <ServicesHeroSection />
      <ServicesNarrativeSection />
      {/* <ProcessTimelineSection />
      <TechnologyShowcaseSection />
      <PortfolioSection portfolioItems={portfolioItems} />
      <CallToActionSection /> */}
    </main>
  );
}
