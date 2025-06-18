"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { PortfolioPayload } from "@/types";
import Button from "@/components/ui/Button";
import Spline from "@splinetool/react-spline";

interface PortfolioSectionProps {
  portfolioItems: PortfolioPayload[];
}

export default function PortfolioSection({
  portfolioItems,
}: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredItems, setFilteredItems] =
    useState<PortfolioPayload[]>(portfolioItems);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = [
    { value: "all", label: "All Work", count: portfolioItems.length },
    {
      value: "spline",
      label: "Spline",
      count: portfolioItems.filter((item) => item.category === "spline").length,
    },
    {
      value: "threejs",
      label: "Three.js",
      count: portfolioItems.filter((item) => item.category === "threejs")
        .length,
    },
    {
      value: "brand",
      label: "Brand Identity",
      count: portfolioItems.filter((item) => item.category === "brand").length,
    },
    {
      value: "motion",
      label: "Motion Graphics",
      count: portfolioItems.filter((item) => item.category === "motion").length,
    },
    {
      value: "web",
      label: "Web Experience",
      count: portfolioItems.filter((item) => item.category === "web").length,
    },
    {
      value: "interactive",
      label: "Interactive",
      count: portfolioItems.filter((item) => item.category === "interactive")
        .length,
    },
  ].filter((cat) => cat.count > 0);

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        )
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter items
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(
        portfolioItems.filter((item) => item.category === activeFilter)
      );
    }
  }, [activeFilter, portfolioItems]);

  const featuredItems = filteredItems.filter((item) => item.featured);
  const regularItems = filteredItems.filter((item) => !item.featured);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
      data-theme="light"
    >
      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-sm mb-6">
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
          <span className="font-russo text-gray-600 text-xs tracking-[0.2em] uppercase font-bold">
            PORTFOLIO
          </span>
        </div>

        <h1 className="font-russo text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
          REALITY
          <br />
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            SHOWCASE
          </span>
        </h1>
        <p className="text-gray-600 font-outfit text-xl max-w-3xl mx-auto leading-relaxed">
          Explore our collection of immersive experiences, brand identities, and
          cutting-edge digital creations that push the boundaries of what's
          possible.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              className={`group relative px-6 py-3 rounded-full font-russo font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                activeFilter === category.value
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                  : "bg-white/80 backdrop-blur-xl border border-gray-200/50 text-gray-700 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">
                  {getCategoryIcon(
                    category.value === "all" ? "spline" : category.value
                  )}
                </span>
                {category.label}
                <span
                  className={`text-xs ${activeFilter === category.value ? "text-white/80" : "text-gray-500"}`}
                >
                  ({category.count})
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        {featuredItems.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 shadow-sm">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                <span className="font-russo text-purple-700 text-xs tracking-[0.2em] uppercase font-bold">
                  FEATURED
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredItems.map((item) => (
                <Link
                  key={item._id}
                  href={`/portfolio/${item.slug?.current}`}
                  className="group relative block"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image.asset.url}
                        alt={item.image.alt || item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={800}
                        height={450}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(item.category)} text-white text-xs font-russo font-bold uppercase tracking-wide shadow-lg`}
                        >
                          <span>{getCategoryIcon(item.category)}</span>
                          {
                            categories.find(
                              (cat) => cat.value === item.category
                            )?.label
                          }
                        </span>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-russo text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-white/90 font-outfit text-lg mb-3">
                            {item.subtitle}
                          </p>
                        )}
                        {item.description && (
                          <p className="text-white/80 font-outfit text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {item.description}
                          </p>
                        )}

                        {/* Tech Stack */}
                        {item.technologies && (
                          <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                            {item.technologies
                              .slice(0, 3)
                              .map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-outfit"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                        )}

                        {/* Client & Year */}
                        <div className="flex items-center justify-between text-white/70 text-sm font-outfit">
                          {item.client && <span>{item.client}</span>}
                          {item.year && <span>{item.year}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects Grid */}
        {regularItems.length > 0 && (
          <div>
            {featuredItems.length > 0 && (
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" />
                  <span className="font-russo text-gray-600 text-xs tracking-[0.2em] uppercase font-bold">
                    ALL PROJECTS
                  </span>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularItems.map((item) => (
                <Link
                  key={item._id}
                  href={`/portfolio/${item.slug?.current}`}
                  className="group relative block"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image.asset.url}
                        alt={item.image.alt || item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        width={400}
                        height={225}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(item.category)} text-white text-xs font-russo font-bold uppercase tracking-wide shadow-md`}
                        >
                          <span className="text-xs">
                            {getCategoryIcon(item.category)}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-russo text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-purple-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-gray-600 font-outfit text-sm mb-3">
                          {item.subtitle}
                        </p>
                      )}

                      {/* Tech Stack */}
                      {item.technologies && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {item.technologies.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-outfit"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between text-gray-500 text-sm font-outfit">
                        {item.client && <span>{item.client}</span>}
                        {item.year && <span>{item.year}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-russo text-2xl font-bold text-gray-700 mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-500 font-outfit">
              Try selecting a different category to see more work.
            </p>
          </div>
        )}
      </div>

      {/* Background decorative elements */}
      <div className="absolute -top-8 -right-8 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full opacity-20 blur-3xl" />
    </section>
  );
}
