"use client";
import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Button from "@/components/ui/Button";

export default function ServicesHeroSection() {
	const [scrollY, setScrollY] = useState(0);
	
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section className="relative min-h-screen bg-white overflow-hidden">
			{/* Subtle Grid */}
			<div className="absolute inset-0 pointer-events-none opacity-[0.03]">
				<div 
					className="absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
							linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
						`,
						backgroundSize: '100px 100px',
					}}
				></div>
			</div>

			{/* Prominent Spline 3D - Full Background */}
			<div className="absolute inset-0 w-full h-full">
				<Spline scene="https://prod.spline.design/jEsawKZEsxEwrEN5/scene.splinecode" />
				{/* Light mode overlay for text readability */}
				<div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/60 to-white/75"></div>
			</div>

			{/* Floating Elements - Subtle */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(8)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-gray-400/40 rounded-full"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
							animationDelay: `${Math.random() * 2}s`
						}}
					></div>
				))}
			</div>

			{/* Main Content - Professional Layout */}
			<div className="relative z-10 h-screen flex items-center">
				<div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
					<div className="grid lg:grid-cols-12 gap-12 items-center h-full">
						{/* Left Column - Agency Messaging */}
						<div className="lg:col-span-8 space-y-8">
							{/* Agency Badge */}
							<div className="inline-flex items-center gap-4 px-5 py-2 rounded-full border border-gray-300/50 bg-gray-50/80 backdrop-blur-sm">
								<div className="relative">
									<div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
									<div className="absolute inset-0 w-2 h-2 bg-purple-500 rounded-full blur-sm opacity-50"></div>
								</div>
								<span className="font-russo text-gray-700 text-xs tracking-[0.3em] uppercase font-bold">
									REALITY DESIGNERS AGENCY
								</span>
								<div className="relative">
									<div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
									<div className="absolute inset-0 w-2 h-2 bg-pink-500 rounded-full blur-sm opacity-50"></div>
								</div>
							</div>

							{/* Main Headline - More Professional */}
							<div className="space-y-6">
								<h1 className="font-russo font-black leading-[0.85] tracking-tight">
									<span className="text-6xl lg:text-7xl block text-black">
										WE DESIGN
									</span>
									<span className="text-4xl lg:text-5xl block font-light italic font-outfit bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
										the impossible
									</span>
								</h1>
							</div>

							{/* Professional Mission Statement */}
							<div className="max-w-3xl space-y-4">
								<p className="text-xl lg:text-2xl text-gray-800 leading-relaxed font-outfit font-medium">
									A design agency crafting <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">experimental realities</span> that transcend conventional boundaries.
								</p>
								<p className="text-lg text-gray-600 leading-relaxed font-outfit">
									We're a collective of conscious creators building immersive digital experiences, brands, and platforms that push the limits of what's possible.
								</p>
							</div>

							{/* Agency Stats - Professional */}
							<div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-200/50">
								{[
									{ value: "∞", label: "POSSIBILITIES", sublabel: "Unlimited creative potential" },
									{ value: "01", label: "AGENCY", sublabel: "Unified creative vision" },
									{ value: "∞", label: "PROJECTS", sublabel: "Reality-defining work" }
								].map((stat, index) => (
									<div key={index} className="group text-left">
										<div className="text-3xl lg:text-4xl font-russo font-black text-black mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
											{stat.value}
										</div>
										<div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-russo font-bold mb-1">
											{stat.label}
										</div>
										<div className="text-xs text-gray-400 font-outfit">
											{stat.sublabel}
										</div>
									</div>
								))}
							</div>

							{/* Professional CTAs */}
							<div className="flex flex-col sm:flex-row gap-4 pt-6">
								<Button 
									variant="primary" 
									size="lg" 
									theme="light"
									className="text-base px-8 py-4"
								>
									START PROJECT
									<svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</Button>
								<Button 
									variant="outline" 
									size="lg" 
									theme="light"
									className="text-base px-8 py-4"
								>
									VIEW WORK
								</Button>
								<Button 
									variant="navbar" 
									size="md" 
									theme="light"
									className="text-sm px-6 py-3"
								>
									JOIN COMMUNITY
									<svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
									</svg>
								</Button>
							</div>
						</div>

						{/* Right Column - Service Preview */}
						<div className="lg:col-span-4 space-y-6">
							{/* Capability Highlight */}
							<div className="relative group">
								<div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
								<div className="relative bg-gray-50/60 border border-gray-200/50 p-6 rounded-xl backdrop-blur-sm hover:bg-white/80 hover:border-gray-300/50 transition-all duration-300">
									<div className="flex items-center gap-3 mb-4">
										<div className="relative">
											<div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
											<div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
										</div>
										<span className="text-green-600 text-xs font-russo uppercase tracking-wide font-bold">
											CREATIVE ACTIVE
										</span>
									</div>
									<h3 className="text-black text-lg font-russo font-bold mb-3 leading-tight">
										Experimental Design Agency
									</h3>
									<p className="text-gray-600 text-sm leading-relaxed font-outfit">
										We push creative boundaries to deliver unprecedented digital experiences that redefine what's possible.
									</p>
								</div>
							</div>

							{/* Service Areas */}
							<div className="grid grid-cols-2 gap-4">
								{[
									{ title: "3D Worlds", desc: "Immersive experiences" },
									{ title: "Brand Identity", desc: "Visual consciousness" },
									{ title: "Web Platforms", desc: "Digital ecosystems" },
									{ title: "Motion Design", desc: "Animated stories" }
								].map((service, index) => (
									<div key={index} className="group relative">
										<div className="bg-white/60 border border-gray-200/50 p-4 rounded-lg hover:bg-white hover:border-gray-300/50 hover:shadow-md transition-all duration-300 cursor-pointer backdrop-blur-sm">
											<div className="text-black font-russo font-bold text-sm mb-1 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
												{service.title}
											</div>
											<div className="text-gray-500 text-xs font-outfit">
												{service.desc}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Info */}
			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex flex-col items-center gap-3">
					<div className="text-gray-400 text-xs font-outfit tracking-wide">
						SCROLL TO EXPLORE
					</div>
					<div className="w-8 h-8 border border-gray-300/50 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-50/50 transition-all duration-300 group">
						<svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes float {
					0%, 100% { transform: translateY(0px) rotate(0deg); }
					50% { transform: translateY(-15px) rotate(90deg); }
				}
			`}</style>
		</section>
	);
} 