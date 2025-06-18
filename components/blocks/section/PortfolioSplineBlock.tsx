"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for fade-out animation
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) return;

          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const scrolled = Math.max(0, -rect.top);
          const progress = Math.min(scrolled / sectionHeight, 1);
          setScrollProgress(progress);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!block?.splineScene) {
    return null;
  }

  const theme = block.theme || "dark";

  // Scroll-based transformations similar to ServicesHeroSection
  const scrollTransform = {
    scale: 1 + scrollProgress * 0.1,
    opacity: 1 - scrollProgress * 0.8,
    blur: scrollProgress * 3,
    translateY: scrollProgress * 100,
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      data-theme={theme}
    >
      {/* Scroll-triggered overlay for smooth blending */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out z-30"
        style={{
          background: `linear-gradient(180deg, transparent ${
            (1 - scrollProgress) * 100
          }%, rgba(0, 0, 0, ${scrollProgress * 0.9}) 100%)`,
          opacity: scrollProgress,
        }}
      />

      {/* Full-screen Spline Scene with fade-out animation */}
      <div
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          transform: `scale(${scrollTransform.scale}) translateY(${scrollTransform.translateY}px) translateZ(0)`,
          opacity: scrollTransform.opacity,
          filter: `blur(${scrollTransform.blur}px)`,
        }}
      >
        <Spline scene={block.splineScene} />
      </div>

      {/* Compact Project Info Card - Bottom Right with fade-out */}
      <div
        className="absolute bottom-6 right-6 z-20 max-w-xs transition-all duration-500 ease-out"
        style={{
          transform: `translateY(${scrollTransform.translateY * -0.3}px) translateZ(0)`,
          opacity: scrollTransform.opacity,
        }}
      >
        <div className="group relative overflow-hidden rounded-xl bg-black/70 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-black/80">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />

          {/* Compact Content */}
          <div className="relative p-4">
            {/* Project Info */}
            <div className="space-y-2">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm">
                <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                <span className="font-russo text-white text-[10px] tracking-[0.1em] uppercase font-bold">
                  {block.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-russo text-white text-base font-bold leading-tight">
                {block.title}
              </h2>

              {/* Subtitle - Truncated */}
              {block.subtitle && (
                <p className="font-outfit text-white/80 text-xs leading-relaxed">
                  {block.subtitle.length > 60
                    ? block.subtitle.substring(0, 60) + "..."
                    : block.subtitle}
                </p>
              )}

              {/* Technologies - Max 2 visible */}
              {block.technologies && block.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {block.technologies.slice(0, 2).map((tech, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 font-outfit text-white/90 text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                  {block.technologies.length > 2 && (
                    <span className="px-1.5 py-0.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 font-outfit text-white/60 text-[10px]">
                      +{block.technologies.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* Client & Year - Compact */}
              {(block.client || block.year) && (
                <div className="flex items-center justify-between pt-1 border-t border-white/10">
                  {block.client && (
                    <span className="font-outfit text-white/60 text-[10px] uppercase tracking-wide">
                      {block.client}
                    </span>
                  )}
                  {block.year && (
                    <span className="font-russo text-white/60 text-[10px]">
                      {block.year}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Minimal Decorative Elements */}
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/20 rounded-full" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-br from-purple-400/40 to-pink-400/40 rounded-full" />
        </div>
      </div>

      {/* Interactive Instructions - Bottom Left with fade-out */}
      <div
        className="absolute bottom-6 left-6 z-20 transition-all duration-500 ease-out"
        style={{
          transform: `translateY(${scrollTransform.translateY * -0.3}px) translateZ(0)`,
          opacity: scrollTransform.opacity,
        }}
      >
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
