"use client";
import { useState, useEffect, useRef } from "react";
import { serviceCategories } from "@/constants/services-data";

export default function ServicesHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseParallaxX, setMouseParallaxX] = useState(0);
  const [mouseParallaxY, setMouseParallaxY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });

        // Mouse parallax for grid animation (matching ServicesHeroSection)
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMouseParallaxX((x - 50) * 0.02);
        setMouseParallaxY((y - 50) * 0.02);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate scroll progress (0 to 1)
        const progress = Math.max(
          0,
          Math.min(
            1,
            (windowHeight - elementTop) / (windowHeight + elementHeight)
          )
        );

        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (targetSection: string) => {
    const element = document.querySelector(`[data-section="${targetSection}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Smooth scroll-based transformations
  const scrollTransform = {
    scale: 1 + scrollProgress * 0.1,
    opacity: 1 - scrollProgress * 0.3,
    blur: scrollProgress * 2,
    gridOpacity: (1 - scrollProgress * 1.2) * 0.4,
    parallaxIntensity: 1 - scrollProgress * 0.5,
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
      data-theme="light"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        {/* Enhanced Hero Header */}
        <div className="text-center mb-20">
          <div
            className={`inline-flex items-center gap-4 mb-8 p-6 rounded-2xl bg-white/80 border border-white/60 backdrop-blur-xl shadow-2xl opacity-0 ${
              isLoaded ? "animate-quickFadeIn" : ""
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-sm opacity-60"></div>
            </div>
            <span className="font-russo text-sm tracking-[0.4em] uppercase font-black text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
              SERVICE ARCHITECTURE
            </span>
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse delay-500"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-sm opacity-60"></div>
            </div>
          </div>

          <h1
            className={`font-russo text-4xl sm:text-5xl lg:text-8xl font-black mb-8 text-gray-900 leading-[0.9] tracking-tight opacity-0 ${
              isLoaded ? "animate-digitalReveal" : ""
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            WE'LL DESIGN YOUR
            <br />
            <span className="relative">
              <span className="text-gray-900">DIGITAL REALITY</span>
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-outfit font-medium opacity-0 ${
              isLoaded ? "animate-quickFadeIn" : ""
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            Three dimensions of transformation await. Choose your path to
            digital evolution and discover services crafted to manifest the
            impossible.
          </p>
        </div>

        {/* Enhanced Service Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {serviceCategories.map((category, index) => {
            // Get the right icon for each category
            const getIcon = () => {
              switch (category.id) {
                case "individual":
                  return (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  );
                case "memberships":
                  return (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  );
                case "packages":
                  return (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  );
                default:
                  return (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                    </svg>
                  );
              }
            };

            const getGlowColor = () => {
              switch (category.color) {
                case "emerald":
                  return "16, 185, 129";
                case "purple":
                  return "168, 85, 247";
                case "blue":
                  return "59, 130, 246";
                default:
                  return "16, 185, 129";
              }
            };

            return (
              <div
                key={category.id}
                className={`group relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br ${category.gradient} border-2 border-white/40 hover:border-white/60 transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-2 shadow-2xl hover:shadow-4xl cursor-pointer opacity-0 ${
                  isLoaded ? "animate-quickFadeIn" : ""
                }`}
                style={{
                  animationDelay: `${0.6 + index * 0.15}s`,
                  boxShadow:
                    hoveredCategory === category.id
                      ? `0 40px 80px -12px rgba(${getGlowColor()}, 0.4), 0 0 0 1px rgba(${getGlowColor()}, 0.1)`
                      : undefined,
                }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => scrollToSection(category.targetSection)}
              >
                {/* Floating Category Number */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-300 ease-out border-2 border-white/60 z-20">
                  <span className="font-russo text-xl font-black text-gray-800">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Glowing Category Icon */}
                <div className="mb-6 lg:mb-8 relative z-10">
                  <div
                    className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-white/60 flex items-center justify-center shadow-xl transition-all duration-300 ease-out`}
                    style={{
                      boxShadow:
                        hoveredCategory === category.id
                          ? `0 20px 40px -8px rgba(${getGlowColor()}, 0.4)`
                          : undefined,
                    }}
                  >
                    <div className="text-gray-800 group-hover:scale-110 transition-transform duration-300 ease-out">
                      {getIcon()}
                    </div>
                    {hoveredCategory === category.id && (
                      <div
                        className="absolute inset-0 rounded-2xl opacity-20 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle, rgba(${getGlowColor()}, 0.3) 0%, transparent 70%)`,
                        }}
                      ></div>
                    )}
                  </div>
                </div>

                {/* Enhanced Category Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        category.color === "purple"
                          ? "bg-purple-500"
                          : category.color === "blue"
                            ? "bg-blue-500"
                            : "bg-emerald-500"
                      } shadow-lg`}
                    ></div>
                    <span className="font-russo text-xs tracking-[0.3em] uppercase text-gray-600 font-black">
                      {category.subtitle}
                    </span>
                  </div>

                  <h3 className="font-russo text-2xl lg:text-3xl font-black text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {category.title}
                  </h3>

                  {/* Simplified Content - Always Show Details */}
                  <div className="mb-6 min-h-[140px] lg:min-h-[160px]">
                    <p className="text-sm lg:text-base text-gray-700 font-outfit leading-relaxed mb-4 font-medium">
                      {category.detailedDescription}
                    </p>
                    <div className="space-y-2">
                      {category.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs lg:text-sm text-gray-600"
                        >
                          <div
                            className={`w-1 h-1 rounded-full ${
                              category.color === "purple"
                                ? "bg-purple-500"
                                : category.color === "blue"
                                  ? "bg-blue-500"
                                  : "bg-emerald-500"
                            }`}
                          ></div>
                          <span className="font-outfit">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6">
                    <div className="text-center p-3 lg:p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/40">
                      <div className="font-russo font-black text-lg lg:text-xl text-gray-900">
                        {category.services}
                      </div>
                      <div className="text-xs text-gray-500 font-outfit">
                        Services
                      </div>
                    </div>
                    <div className="text-center p-3 lg:p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/40">
                      <div className="font-russo font-black text-xs lg:text-sm text-gray-900">
                        {category.priceRange}
                      </div>
                      <div className="text-xs text-gray-500 font-outfit">
                        Range
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Explore Button */}
                  <button className="w-full py-3 lg:py-4 px-4 lg:px-6 bg-gradient-to-r from-white/80 to-white/60 hover:from-white hover:to-white/80 border-2 border-white/60 hover:border-white rounded-2xl font-russo font-black text-sm uppercase tracking-wider text-gray-800 hover:text-gray-900 transition-all duration-300 backdrop-blur-xl shadow-xl hover:shadow-2xl">
                    <span className="flex items-center justify-center gap-2">
                      {category.ctaText ||
                        `EXPLORE ${category.title.toUpperCase()}`}
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </span>
                  </button>
                </div>

                {/* Simplified Hover Effects */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out -z-10"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(${getGlowColor()}, 0.1) 0%, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                ></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
