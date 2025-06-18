import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/Blocks";
import { portfolioBySlugQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { PortfolioPayload } from "@/types";
import { Metadata } from "next";
import React from "react";
import { getPortfolioData } from "@/utils/portfolio-utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return generateStaticSlugs("portfolio");
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const resolvedParams = await props.params;
  const portfolio = await sanityFetch<PortfolioPayload>({
    query: portfolioBySlugQuery,
    tags: ["portfolio"],
    qParams: { slug: resolvedParams.slug },
  });

  const portfolioData = getPortfolioData(portfolio);
  const ogImage = portfolioData?.image?.asset?.url;

  return {
    title: portfolio?.title || portfolioData?.title || "Portfolio Project",
    description: portfolioData?.description || "Portfolio project details",
    openGraph: {
      title: portfolio?.title || portfolioData?.title || "Portfolio Project",
      description: portfolioData?.description || "Portfolio project details",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            alt: portfolioData?.image?.alt || "Portfolio project image",
          },
        ],
      }),
    },
  };
}

export default async function PortfolioSlugRoute(props: Props) {
  const resolvedParams = await props.params;
  const currentPortfolio = await sanityFetch<PortfolioPayload>({
    query: portfolioBySlugQuery,
    tags: ["portfolio"],
    qParams: { slug: resolvedParams.slug },
  });

  const blocks = currentPortfolio?.block || [];

  return (
    <>
      {currentPortfolio && (
        <>
          {/* Content Blocks */}
          <main>
            {blocks?.map((block) => (
              <Blocks key={block._key} block={block as BlockProps} />
            ))}
          </main>
        </>
      )}
    </>
  );
}
