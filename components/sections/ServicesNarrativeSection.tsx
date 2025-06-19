"use client";
import { useState, useEffect, useRef } from "react";

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
            {[
              {
                name: "Monthly Article",
                price: "$25",
                category: "Content",
                description:
                  "800-word exclusive article with exercises & research",
                gradient: "from-emerald-500/20 to-teal-600/10",
                borderColor:
                  "border-emerald-300/40 hover:border-emerald-400/60",
                glowColor: "emerald-500",
                categoryColor: "bg-emerald-100 text-emerald-700",
              },
              {
                name: "Guided Meditation",
                price: "$15",
                category: "Content",
                description: "10-15 min exclusive audio with transcript PDF",
                gradient: "from-emerald-500/20 to-teal-600/10",
                borderColor:
                  "border-emerald-300/40 hover:border-emerald-400/60",
                glowColor: "emerald-500",
                categoryColor: "bg-emerald-100 text-emerald-700",
              },
              {
                name: "Behind-the-Scenes Video",
                price: "$35",
                category: "Content",
                description: "5-10 min exclusive 1080p walkthrough content",
                gradient: "from-emerald-500/20 to-teal-600/10",
                borderColor:
                  "border-emerald-300/40 hover:border-emerald-400/60",
                glowColor: "emerald-500",
                categoryColor: "bg-emerald-100 text-emerald-700",
              },
              {
                name: "Live Workshop",
                price: "$50",
                category: "Education",
                description: "1-hour exclusive live session with replay access",
                gradient: "from-teal-500/20 to-cyan-600/10",
                borderColor: "border-teal-300/40 hover:border-teal-400/60",
                glowColor: "teal-500",
                categoryColor: "bg-teal-100 text-teal-700",
              },
              {
                name: "Tutorial Creation",
                price: "$75",
                category: "Education",
                description: "15-20 min exclusive tutorial with project files",
                gradient: "from-teal-500/20 to-cyan-600/10",
                borderColor: "border-teal-300/40 hover:border-teal-400/60",
                glowColor: "teal-500",
                categoryColor: "bg-teal-100 text-teal-700",
              },
              {
                name: "1-on-1 Coaching Call",
                price: "$150",
                category: "Coaching",
                description: "30-min personalized guidance session",
                gradient: "from-cyan-500/20 to-blue-600/10",
                borderColor: "border-cyan-300/40 hover:border-cyan-400/60",
                glowColor: "cyan-500",
                categoryColor: "bg-cyan-100 text-cyan-700",
              },
              {
                name: "Early Content Access",
                price: "$20",
                category: "Perks",
                description: "48-hour exclusive pre-release window",
                gradient: "from-blue-500/20 to-indigo-600/10",
                borderColor: "border-blue-300/40 hover:border-blue-400/60",
                glowColor: "blue-500",
                categoryColor: "bg-blue-100 text-blue-700",
              },
              {
                name: "Discord Community Access",
                price: "$10",
                category: "Community",
                description: "Exclusive channels + weekly voice hangouts",
                gradient: "from-indigo-500/20 to-purple-600/10",
                borderColor: "border-indigo-300/40 hover:border-indigo-400/60",
                glowColor: "indigo-500",
                categoryColor: "bg-indigo-100 text-indigo-700",
              },
            ].map((service, index) => (
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
            {[
              {
                tier: "DREAMER",
                price: "$10",
                period: "/mo",
                savings: "Save $65/mo",
                includes: [
                  "Monthly Article ($25 value)",
                  "Guided Meditation ($15 value)",
                  "Behind-the-Scenes Video ($35 value)",
                  "Discord Community Access ($10 value)",
                  "10% Merch Discount",
                ],
                level: "01",
                gradient: "from-purple-500/15 to-pink-500/10",
                glowColor: "purple-500",
                narrative:
                  "Every dreamer needs the foundation to manifest their vision into reality.",
              },
              {
                tier: "CREATOR",
                price: "$25",
                period: "/mo",
                savings: "Save $160/mo",
                includes: [
                  "Everything in Dreamer ($85 value)",
                  "Live Workshop ($50 value)",
                  "Tutorial Creation ($75 value)",
                  "Creator Discord Channel",
                  "20% Merch + 10% Agency Discount",
                ],
                level: "02",
                gradient: "from-purple-500/20 to-blue-500/15",
                glowColor: "blue-500",
                narrative:
                  "Creators transform inspiration into experiences that touch souls across dimensions.",
                featured: true,
              },
              {
                tier: "VISIONARY",
                price: "$50",
                period: "/mo",
                savings: "Save $220/mo",
                includes: [
                  "Everything in Creator ($210 value)",
                  "Quarterly Coaching Call ($150 value)",
                  "Early Content Access ($20 value)",
                  "VIP Discord + Monthly AMAs",
                  "Annual Limited-Edition Merch",
                  "20% Agency Discount",
                ],
                level: "03",
                gradient: "from-purple-500/25 to-indigo-500/20",
                glowColor: "indigo-500",
                narrative:
                  "Visionaries see beyond the veil and architect the impossible into existence.",
              },
            ].map((tier, index) => (
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
            {[
              {
                package: "VISION STARTER",
                price: "$5,000",
                savings: "Save $2,300",
                includes: [
                  "Website 3-5 pages ($2,500 value)",
                  "Hero Animation ($1,200 value)",
                  "Logo Package ($800 value)",
                  "Messaging Deck ($800 value)",
                  "Figma Files + CMS Training",
                  "Vercel Deployment",
                ],
                level: "01",
                gradient: "from-blue-500/15 to-cyan-500/10",
                glowColor: "blue-500",
                narrative:
                  "Every vision needs a foundation to manifest into digital reality.",
              },
              {
                package: "REALITY ARCHITECT",
                price: "$15,000",
                savings: "Save $7,400",
                includes: [
                  "Everything in Vision Starter ($5,000 value)",
                  "Expanded Website 7-10 pages ($4,500 value)",
                  "2 Custom Animations ($4,000 value)",
                  "Complete Brand Book ($2,500 value)",
                  "Social Launch Kit ($600 value)",
                  "Analytics Setup (GA4 + Hotjar)",
                ],
                level: "02",
                gradient: "from-blue-500/20 to-teal-500/15",
                glowColor: "teal-500",
                narrative:
                  "Architects design the infrastructure where consciousness meets technology.",
              },
              {
                package: "COSMIC CREATOR",
                price: "$25,000",
                savings: "Save $12,200",
                includes: [
                  "Everything in Reality Architect ($15,000 value)",
                  "Narrative Strategy Guide ($1,800 value)",
                  "Custom Music Track ($1,500 value)",
                  "NFT Artwork ($2,000 value)",
                  "Signature Animation ($3,500 value)",
                  "30-Day VIP Support (2 sprints)",
                ],
                level: "03",
                gradient: "from-blue-500/25 to-indigo-500/20",
                glowColor: "indigo-500",
                narrative:
                  "Cosmic creators transcend boundaries and architect impossible realities.",
              },
            ].map((pkg, index) => (
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
