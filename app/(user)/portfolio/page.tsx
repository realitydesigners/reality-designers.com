import { portfolioQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import { PortfolioPayload } from "@/types";
import PortfolioSection from "@/components/sections/PortfolioSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Reality Designers",
  description:
    "Explore our collection of immersive experiences, brand identities, and cutting-edge digital creations.",
  openGraph: {
    title: "Portfolio | Reality Designers",
    description:
      "Explore our collection of immersive experiences, brand identities, and cutting-edge digital creations.",
  },
};

export default async function PortfolioPage() {
  const portfolioItems = await sanityFetch<PortfolioPayload[]>({
    query: portfolioQuery,
    tags: ["portfolio"],
  });

  return (
    <main>
      <PortfolioSection portfolioItems={portfolioItems} />
    </main>
  );
}
