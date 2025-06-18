"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import Spline with no SSR
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-white font-russo text-lg">Loading 3D Scene...</div>
    </div>
  ),
});

interface PortfolioSplineBlockProps {
  block: {
    title: string;
    subtitle?: string;
    description?: string;
    category: string;
    image: {
      asset: {
        url: string;
      };
      alt?: string;
    };
    splineScene: string;
    technologies?: string[];
    client?: string;
    year?: number;
    liveUrl?: string;
    githubUrl?: string;
    layout?: string;
    theme?: string;
    className?: string;
  };
}

export default function PortfolioSplineBlock({
  block,
}: PortfolioSplineBlockProps) {
  if (!block?.splineScene) {
    return null;
  }

  const theme = block.theme || "dark";

  return (
    <section
      className="relative w-full h-screen bg-black overflow-hidden"
      data-theme={theme}
    >
      {/* Full-screen Spline Scene */}
      <div className="absolute inset-0">
        <Spline scene={block.splineScene} />
      </div>

      {/* Floating Project Info Card - Top Right */}
      <div className="absolute top-6 right-6 z-20 max-w-sm">
        <div className="group relative overflow-hidden rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 hover:scale-105">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

          {/* Content */}
          <div className="relative p-6">
            {/* Preview Image */}
            {block.image && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 ring-2 ring-white/20">
                <Image
                  src={block.image.asset.url}
                  alt={block.image.alt || block.title}
                  className="w-full h-full object-cover"
                  width={400}
                  height={225}
                />
              </div>
            )}

            {/* Project Info */}
            <div className="space-y-3">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                <span className="font-russo text-white text-xs tracking-[0.15em] uppercase font-bold">
                  {block.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-russo text-white text-xl font-bold leading-tight">
                {block.title}
              </h2>

              {/* Subtitle */}
              {block.subtitle && (
                <p className="font-outfit text-white/80 text-sm leading-relaxed">
                  {block.subtitle}
                </p>
              )}

              {/* Technologies */}
              {block.technologies && block.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {block.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 font-outfit text-white/90 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {block.technologies.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 font-outfit text-white/60 text-xs">
                      +{block.technologies.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Client & Year */}
              {(block.client || block.year) && (
                <div className="flex items-center justify-between pt-2">
                  {block.client && (
                    <span className="font-outfit text-white/70 text-xs">
                      {block.client}
                    </span>
                  )}
                  {block.year && (
                    <span className="font-russo text-white/70 text-xs">
                      {block.year}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-3 right-3 w-2 h-2 bg-white/30 rounded-full" />
          <div className="absolute top-6 right-3 w-1 h-1 bg-white/20 rounded-full" />
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-gradient-to-br from-purple-400/60 to-pink-400/60 rounded-full" />
        </div>
      </div>

      {/* Interactive Instructions - Bottom Left */}
      <div className="absolute bottom-6 left-6 z-20">
        <div className="group relative overflow-hidden rounded-xl bg-black/60 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-300 hover:bg-black/80">
          <div className="p-4">
            <div className="flex items-center gap-3">
              {/* Animated Icon */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>

              {/* Instructions */}
              <div>
                <p className="font-russo text-white text-sm font-bold mb-1">
                  INTERACT
                </p>
                <p className="font-outfit text-white/70 text-xs">
                  Click & drag to explore
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
