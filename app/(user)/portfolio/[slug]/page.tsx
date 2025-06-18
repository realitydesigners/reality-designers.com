import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/Blocks";
import { portfolioBySlugQuery, portfolioQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { PortfolioPayload } from "@/types";
import { Metadata } from "next";
import React from "react";
import { SanityImage } from "@/components/global/Images";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Spline from "@splinetool/react-spline";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaCalendarAlt,
  FaUser,
  FaCode,
  FaEye,
} from "react-icons/fa";

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

  const ogImage = portfolio?.image?.asset?.url;

  return {
    title: portfolio?.title || "Portfolio Project",
    description: portfolio?.description || "Portfolio project details",
    openGraph: {
      title: portfolio?.title || "Portfolio Project",
      description: portfolio?.description || "Portfolio project details",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            alt: portfolio?.image?.alt || "Portfolio project image",
          },
        ],
      }),
    },
  };
}

// Project Info Section Component
const ProjectInfoSection = ({ portfolio }: { portfolio: PortfolioPayload }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      spline: "from-purple-500 to-pink-500",
      threejs: "from-blue-500 to-cyan-500",
      brand: "from-orange-500 to-red-500",
      motion: "from-green-500 to-teal-500",
      web: "from-indigo-500 to-purple-500",
      interactive: "from-pink-500 to-rose-500",
    };
    return (
      colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      spline: "🌟",
      threejs: "🔮",
      brand: "🎨",
      motion: "🎬",
      web: "💻",
      interactive: "🎮",
    };
    return icons[category as keyof typeof icons] || "📁";
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      spline: "Spline Animation",
      threejs: "Three.js Experience",
      brand: "Brand Identity",
      motion: "Motion Graphics",
      web: "Web Experience",
      interactive: "Interactive Design",
    };
    return labels[category as keyof typeof labels] || "Project";
  };

  return (
    <div className="relative w-full py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 shadow-sm mb-6">
            <span className="text-lg">
              {getCategoryIcon(portfolio.category)}
            </span>
            <span className="font-russo text-purple-700 text-sm tracking-[0.2em] uppercase font-bold">
              {getCategoryLabel(portfolio.category)}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-russo text-4xl lg:text-6xl font-bold text-black mb-4 leading-tight">
            {portfolio.title}
          </h1>

          {/* Subtitle */}
          {portfolio.subtitle && (
            <p className="text-xl lg:text-2xl text-gray-600 font-outfit mb-8 leading-relaxed">
              {portfolio.subtitle}
            </p>
          )}

          {/* Description */}
          {portfolio.description && (
            <p className="text-lg text-gray-700 font-outfit max-w-3xl mx-auto leading-relaxed mb-12">
              {portfolio.description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {portfolio.liveUrl && (
              <Link
                href={portfolio.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-8 py-4 text-base font-russo font-bold uppercase tracking-wide bg-black text-white border border-black hover:bg-gray-900 hover:border-gray-900 hover:scale-105 hover:shadow-xl hover:shadow-black/20 rounded-xl transition-all duration-300 transform-gpu overflow-hidden group"
              >
                <FaEye className="mr-2" />
                View Live
              </Link>
            )}
            {portfolio.githubUrl && (
              <Link
                href={portfolio.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-8 py-4 text-base font-russo font-bold uppercase tracking-wide bg-transparent text-current border border-current hover:bg-current hover:text-white hover:scale-105 rounded-xl transition-all duration-300 transform-gpu overflow-hidden group"
              >
                <FaGithub className="mr-2" />
                View Code
              </Link>
            )}
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Client */}
          {portfolio.client && (
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <FaUser className="text-purple-500" />
                <span className="font-russo text-sm text-gray-500 uppercase tracking-wide">
                  Client
                </span>
              </div>
              <p className="font-outfit text-lg font-semibold text-gray-900">
                {portfolio.client}
              </p>
            </div>
          )}

          {/* Year */}
          {portfolio.year && (
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <FaCalendarAlt className="text-blue-500" />
                <span className="font-russo text-sm text-gray-500 uppercase tracking-wide">
                  Year
                </span>
              </div>
              <p className="font-outfit text-lg font-semibold text-gray-900">
                {portfolio.year}
              </p>
            </div>
          )}

          {/* Category */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg">
                {getCategoryIcon(portfolio.category)}
              </span>
              <span className="font-russo text-sm text-gray-500 uppercase tracking-wide">
                Category
              </span>
            </div>
            <p className="font-outfit text-lg font-semibold text-gray-900">
              {getCategoryLabel(portfolio.category)}
            </p>
          </div>

          {/* Links */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FaExternalLinkAlt className="text-green-500" />
              <span className="font-russo text-sm text-gray-500 uppercase tracking-wide">
                Links
              </span>
            </div>
            <div className="flex gap-2">
              {portfolio.liveUrl && (
                <Link
                  href={portfolio.liveUrl}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEye size={18} />
                </Link>
              )}
              {portfolio.githubUrl && (
                <Link
                  href={portfolio.githubUrl}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={18} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Technologies */}
        {portfolio.technologies && portfolio.technologies.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-sm mb-16">
            <div className="flex items-center gap-3 mb-6">
              <FaCode className="text-purple-500" />
              <h3 className="font-russo text-xl font-bold text-gray-900 uppercase tracking-wide">
                Technologies
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {portfolio.technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor(portfolio.category)} text-white text-sm font-outfit font-semibold shadow-sm`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Team Members */}
        {portfolio.team && portfolio.team.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-sm mb-16">
            <h3 className="font-russo text-xl font-bold text-gray-900 uppercase tracking-wide mb-6">
              Team
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {portfolio.team.map((member) => (
                <div key={member._id} className="flex items-center gap-4">
                  {member.image && (
                    <SanityImage
                      image={member.image}
                      alt={member.name}
                      width={60}
                      height={60}
                      classesWrapper="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      priority={false}
                    />
                  )}
                  <div>
                    <p className="font-outfit font-semibold text-gray-900">
                      {member.name}
                    </p>
                    <p className="font-outfit text-sm text-gray-600">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Background decorative elements */}
      <div className="absolute -top-8 -right-8 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full opacity-20 blur-3xl" />
    </div>
  );
};

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
          {/* Project Info Section */}
          <ProjectInfoSection portfolio={currentPortfolio} />

          {/* Spline Scene Section */}
          {currentPortfolio.category === "spline" &&
            currentPortfolio.splineScene && (
              <section className="relative w-full min-h-screen bg-black">
                {/* Spline Scene */}
                <div className="absolute inset-0 w-full h-full">
                  <Spline
                    scene={currentPortfolio.splineScene}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                    }}
                  />
                </div>

                {/* Floating Project Card */}
                <div className="absolute top-8 right-8 z-10">
                  <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl max-w-sm">
                    {/* Preview Image */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
                      <Image
                        src={currentPortfolio.image.asset.url}
                        alt={
                          currentPortfolio.image.alt || currentPortfolio.title
                        }
                        className="w-full h-full object-cover"
                        width={300}
                        height={170}
                      />
                    </div>

                    {/* Project Details */}
                    <div className="space-y-3">
                      <h3 className="font-russo text-lg font-bold text-gray-900">
                        {currentPortfolio.title}
                      </h3>

                      {currentPortfolio.subtitle && (
                        <p className="text-gray-600 font-outfit text-sm">
                          {currentPortfolio.subtitle}
                        </p>
                      )}

                      {/* Category Badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌟</span>
                        <span className="font-russo text-xs uppercase tracking-wide text-purple-600 font-bold">
                          Spline Animation
                        </span>
                      </div>

                      {/* Tech Stack */}
                      {currentPortfolio.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {currentPortfolio.technologies
                            .slice(0, 3)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-outfit font-semibold"
                              >
                                {tech}
                              </span>
                            ))}
                        </div>
                      )}

                      {/* Client & Year */}
                      <div className="flex items-center justify-between text-gray-500 text-sm font-outfit">
                        {currentPortfolio.client && (
                          <span>{currentPortfolio.client}</span>
                        )}
                        {currentPortfolio.year && (
                          <span>{currentPortfolio.year}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-8 left-8 z-10">
                  <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3">
                    <p className="text-white/90 font-outfit text-sm">
                      ✨ Interactive 3D Scene - Click and drag to explore
                    </p>
                  </div>
                </div>
              </section>
            )}

          {/* Content Blocks */}
          <main>
            {blocks?.map((block) => (
              <Blocks key={block._key} block={block as BlockProps} />
            ))}
          </main>

          {/* Back to Portfolio */}
          <div className="w-full py-16 px-4 lg:px-8 text-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            <Button
              href="/portfolio"
              variant="outline"
              size="lg"
              theme="light"
              className="text-base"
            >
              ← Back to Portfolio
            </Button>
          </div>
        </>
      )}
    </>
  );
}
