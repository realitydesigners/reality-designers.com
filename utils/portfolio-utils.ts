import { PortfolioPayload, PortfolioSplineBlockItem } from "@/types";

export const getPortfolioData = (
  portfolio: PortfolioPayload | null
): PortfolioSplineBlockItem | null => {
  if (!portfolio || !portfolio.block) {
    return null;
  }

  const portfolioBlock = portfolio.block.find(
    (block) => block._type === "portfolioSplineBlock"
  ) as PortfolioSplineBlockItem;

  return portfolioBlock || null;
};

export const getPortfolioImage = (portfolio: PortfolioPayload | null) => {
  const portfolioData = getPortfolioData(portfolio);
  return portfolioData?.image;
};

export const getPortfolioCategory = (portfolio: PortfolioPayload | null) => {
  const portfolioData = getPortfolioData(portfolio);
  return portfolioData?.category || "";
};

export const getPortfolioTitle = (portfolio: PortfolioPayload | null) => {
  const portfolioData = getPortfolioData(portfolio);
  return portfolio?.title || portfolioData?.title || "";
};
