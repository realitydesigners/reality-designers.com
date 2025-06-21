"use client";
import { useState, useEffect, useRef } from "react";
import {
  individualServices,
  communityMemberships,
  agencyPackages,
} from "@/constants/services-data";

export default function ServicesNarrativeSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
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
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-white via-gray-50/30 to-white overflow-hidden"
    >
      {/* Individual Services Section */}
      <section data-section="individual-services" className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div
              className={`inline-flex items-center gap-4 mb-8 p-6 rounded-2xl bg-white/90 border-2 border-white/60 backdrop-blur-xl shadow-2xl opacity-0 ${
                isLoaded ? "animate-quickFadeIn" : ""
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 blur-sm opacity-60"></div>
              </div>
              <span className="font-russo text-sm tracking-[0.4em] uppercase font-black text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
                EXCLUSIVE CONTENT
              </span>
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 animate-pulse delay-500"></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 blur-sm opacity-60"></div>
              </div>
            </div>

            <h2
              className={`font-russo text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tight opacity-0 ${
                isLoaded ? "animate-digitalReveal" : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              INDIVIDUAL SERVICES
              <br />
              <span className="relative">
                <span className="text-gray-900">& EXCLUSIVE CONTENT</span>
              </span>
            </h2>

            <p
              className={`text-lg sm:text-xl text-gray-600 font-outfit font-medium max-w-4xl mx-auto leading-relaxed opacity-0 ${
                isLoaded ? "animate-quickFadeIn" : ""
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              Premium content and services available exclusively on our
              platform.
              <span className="font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
                {" "}
                Access unique resources
              </span>{" "}
              not found anywhere else.
            </p>
          </div>

          {/* Individual Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {individualServices.map((service, index) => (
              <div
                key={service.name}
                className={`group relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br ${service.gradient} border-2 ${service.borderColor} transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 shadow-2xl hover:shadow-4xl backdrop-blur-sm cursor-pointer opacity-0 ${
                  isLoaded ? "animate-quickFadeIn" : ""
                } ${hoveredService === service.name ? "scale-105 -translate-y-4" : ""}`}
                style={{
                  animationDelay: `${0.6 + index * 0.05}s`,
                  boxShadow:
                    hoveredService === service.name
                      ? `0 30px 60px -12px rgba(16, 185, 129, 0.3)`
                      : undefined,
                }}
                onMouseEnter={() => setHoveredService(service.name)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Floating Service Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-700 border-2 border-white/60">
                  <span className="font-russo text-xs font-black text-gray-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Enhanced Category Badge */}
                <div className="mb-6">
                  <div
                    className={`inline-flex items-center gap-3 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wide rounded-full ${service.categoryColor} shadow-lg group-hover:shadow-xl transition-shadow duration-700`}
                  >
                    <div className="w-2 h-2 bg-current rounded-full "></div>
                    {service.category}
                  </div>
                </div>

                {/* Service Details */}
                <div className="relative z-10">
                  <h4 className="font-russo text-lg lg:text-xl font-black text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-700">
                    {service.name}
                  </h4>

                  {/* Prominent Price Display */}
                  <div className="mb-6">
                    <span className="font-russo text-3xl lg:text-4xl font-black text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-700">
                      {service.price}
                    </span>
                  </div>

                  {/* Service Description */}
                  <p className="text-sm lg:text-base text-gray-600 font-outfit leading-relaxed mb-8 group-hover:text-gray-700 transition-colors duration-700">
                    {service.description}
                  </p>

                  {/* Enhanced Action Area */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/40">
                    <button className="text-sm font-russo font-black uppercase tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2">
                      Add to Cart
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </button>
                    <div className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/60">
                      <span className="text-gray-800 text-lg font-bold">✦</span>
                    </div>
                  </div>
                </div>

                {/* Advanced Hover Effects */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient.replace("/20", "/5").replace("/10", "/3")} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`}
                ></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Memberships Section */}
      <section
        data-section="community-memberships"
        className="relative py-32 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div
              className={`inline-flex items-center gap-4 mb-8 p-6 rounded-2xl bg-white/90 border-2 border-white/60 backdrop-blur-xl shadow-2xl opacity-0 ${
                isLoaded ? "animate-quickFadeIn" : ""
              }`}
              style={{ animationDelay: "2s" }}
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-sm opacity-60"></div>
              </div>
              <span className="font-russo text-sm tracking-[0.4em] uppercase font-black text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
                COLLECTIVE GROWTH
              </span>
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse delay-500"></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-sm opacity-60"></div>
              </div>
            </div>

            <h2
              className={`font-russo text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tight opacity-0 ${
                isLoaded ? "animate-digitalReveal" : ""
              }`}
              style={{ animationDelay: "2.1s" }}
            >
              COMMUNITY
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  MEMBERSHIPS
                </span>
                <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full opacity-60 blur-sm"></div>
              </span>
            </h2>

            <p
              className={`text-lg sm:text-xl text-gray-600 font-outfit font-medium max-w-4xl mx-auto leading-relaxed opacity-0 ${
                isLoaded ? "animate-quickFadeIn" : ""
              }`}
              style={{ animationDelay: "2.2s" }}
            >
              Monthly memberships that bundle multiple services for conscious
              creators and spiritual entrepreneurs.
              <span className="font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                {" "}
                Join our growing collective
              </span>
              .
            </p>
          </div>

          {/* Community Membership Tiers - Horizontal Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {communityMemberships.map((tier, index) => (
              <div
                key={tier.tier}
                className={`group relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br ${tier.gradient} border-2 border-white/50 hover:border-white/70 transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 shadow-2xl hover:shadow-4xl backdrop-blur-xl cursor-pointer opacity-0 ${
                  isLoaded ? "animate-quickFadeIn" : ""
                } ${tier.featured ? "lg:scale-110 lg:border-3 lg:border-purple-300/60" : ""}`}
                style={{
                  animationDelay: `${2.3 + index * 0.1}s`,
                  boxShadow: `0 30px 60px -15px rgba(${
                    tier.glowColor === "purple-500"
                      ? "168, 85, 247"
                      : tier.glowColor === "blue-500"
                        ? "59, 130, 246"
                        : "99, 102, 241"
                  }, 0.2)`,
                }}
              >
                {/* Featured Badge for Creator Tier */}
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-xs font-russo font-black uppercase tracking-wide shadow-xl">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Floating Tier Number */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-white via-white to-purple-50 rounded-3xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-700 border-2 border-white/60">
                  <span className="font-russo text-lg font-black text-purple-700">
                    {tier.level}
                  </span>
                </div>

                {/* Enhanced Tier Badge */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 p-3 rounded-xl bg-white/70 border-2 border-white/50 backdrop-blur-sm shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse shadow-sm"></div>
                    <span className="font-russo text-xs tracking-[0.2em] uppercase font-black text-gray-800">
                      Community Tier
                    </span>
                  </div>
                </div>

                {/* Tier Header */}
                <div className="text-center mb-6">
                  <h4 className="font-russo text-2xl lg:text-3xl font-black text-gray-900 tracking-wide mb-3 group-hover:text-gray-800 transition-colors">
                    {tier.tier}
                  </h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-mono font-black shadow-sm mb-4">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    {tier.savings}
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mb-6">
                    <span className="font-russo text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-700">
                      {tier.price}
                    </span>
                    <span className="font-mono text-lg text-gray-500 uppercase font-bold">
                      {tier.period}
                    </span>
                  </div>
                </div>

                {/* Enhanced Includes List */}
                <div className="space-y-3 mb-6">
                  {tier.includes.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-gray-700 group-hover:text-gray-800 transition-all duration-300"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="font-outfit text-sm leading-relaxed font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Enhanced Narrative Quote */}
                <div className="p-4 lg:p-5 rounded-2xl bg-white/70 border-2 border-white/50 backdrop-blur-sm mb-6 shadow-lg">
                  <p className="text-gray-700 italic font-outfit text-sm leading-relaxed font-medium text-center">
                    "{tier.narrative}"
                  </p>
                </div>

                {/* Enhanced Action Area */}
                <div className="text-center">
                  <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-russo font-black uppercase text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Join {tier.tier}
                    <span className="text-lg">→</span>
                  </button>
                </div>

                {/* Advanced Hover Effects */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tier.gradient.replace("/15", "/3").replace("/20", "/5").replace("/25", "/7")} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Packages Section */}
      <section
        data-section="agency-packages"
        className="relative py-32 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/30"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div
              className={`inline-flex items-center gap-4 mb-8 p-6 rounded-2xl bg-white/90 border-2 border-white/60 backdrop-blur-xl shadow-2xl opacity-0 ${
                isLoaded ? "animate-quickFadeIn" : ""
              }`}
              style={{ animationDelay: "4s" }}
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-sm opacity-60"></div>
              </div>
              <span className="font-russo text-sm tracking-[0.4em] uppercase font-black text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
                BRAND TRANSFORMATION
              </span>
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse delay-500"></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-sm opacity-60"></div>
              </div>
            </div>

            <h2
              className={`font-russo text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tight opacity-0 ${
                isLoaded ? "animate-digitalReveal" : ""
              }`}
              style={{ animationDelay: "4.1s" }}
            >
              AGENCY SERVICE
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  PACKAGES
                </span>
                <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full opacity-60 blur-sm"></div>
              </span>
            </h2>

            <p
              className={`text-lg sm:text-xl text-gray-600 font-outfit font-medium max-w-4xl mx-auto leading-relaxed opacity-0 ${
                isLoaded ? "animate-quickFadeIn" : ""
              }`}
              style={{ animationDelay: "4.2s" }}
            >
              Complete brand transformation packages including animations and
              digital experiences.
              <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
                {" "}
                Professional agency services
              </span>{" "}
              for visionary brands.
            </p>
          </div>

          {/* Agency Package Tiers */}
          <div className="space-y-8">
            {agencyPackages.map((pkg, index) => (
              <div
                key={pkg.package}
                className={`group relative p-8 lg:p-12 rounded-4xl bg-gradient-to-br ${pkg.gradient} border-3 border-white/50 hover:border-white/70 transition-all duration-700 transform hover:scale-105 hover:-translate-y-6 shadow-2xl hover:shadow-4xl backdrop-blur-xl cursor-pointer opacity-0 ${
                  isLoaded ? "animate-quickFadeIn" : ""
                }`}
                style={{
                  animationDelay: `${4.3 + index * 0.2}s`,
                  boxShadow: `0 40px 80px -20px rgba(${
                    pkg.glowColor === "blue-500"
                      ? "59, 130, 246"
                      : pkg.glowColor === "teal-500"
                        ? "20, 184, 166"
                        : "99, 102, 241"
                  }, 0.2)`,
                }}
              >
                {/* Floating Package Number */}
                <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-white via-white to-blue-50 rounded-4xl shadow-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-700 border-3 border-white/60">
                  <span className="font-russo text-2xl font-black text-blue-700">
                    {pkg.level}
                  </span>
                </div>

                {/* Enhanced Package Badge */}
                <div className="mb-8 lg:mb-10">
                  <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-white/70 border-2 border-white/50 backdrop-blur-sm shadow-xl">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse shadow-lg"></div>
                    <span className="font-russo text-sm tracking-[0.3em] uppercase font-black text-gray-800">
                      Agency Package
                    </span>
                  </div>
                </div>

                {/* Package Details */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div>
                    <h4 className="font-russo text-3xl lg:text-4xl font-black text-gray-900 tracking-wide mb-4 group-hover:text-gray-800 transition-colors">
                      {pkg.package}
                    </h4>
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-mono font-black shadow-lg mb-6">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {pkg.savings}
                    </div>
                    <div className="mb-8">
                      <span className="font-russo text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-700">
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  <div>
                    {/* Enhanced Includes List */}
                    <div className="space-y-4 mb-8">
                      {pkg.includes.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 text-gray-700 group-hover:text-gray-800 transition-all duration-300 hover:translate-x-2"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow flex-shrink-0">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <span className="font-outfit leading-relaxed font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Narrative Quote */}
                    <div className="p-6 lg:p-8 rounded-3xl bg-white/70 border-2 border-white/50 backdrop-blur-sm mb-8 shadow-xl">
                      <p className="text-gray-700 italic font-outfit leading-relaxed font-medium">
                        "{pkg.narrative}"
                      </p>
                    </div>

                    {/* Enhanced Action Area */}
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-3 text-gray-800 hover:text-gray-900 font-russo font-black uppercase text-lg tracking-wide transition-colors duration-300">
                        Start {pkg.package}
                        <span className="transition-transform duration-300 group-hover:translate-x-1 text-2xl">
                          →
                        </span>
                      </button>

                      <div className="w-12 h-12 bg-white/90 hover:bg-white rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/60">
                        <span className="text-blue-700 text-xl font-bold">
                          ⬡
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Hover Effects */}
                <div
                  className={`absolute inset-0 rounded-4xl bg-gradient-to-br ${pkg.gradient.replace("/15", "/3").replace("/20", "/5").replace("/25", "/7")} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
