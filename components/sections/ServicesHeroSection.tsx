"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Spline from "@splinetool/react-spline";
import Button from "@/components/ui/Button";
import { floatingCards } from "@/constants";

// Advanced particle system with stable initial state for SSR


export default function ServicesHeroSection() {
	const [scrollY, setScrollY] = useState(0);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [visibleCards, setVisibleCards] = useState<number[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const heroRef = useRef<HTMLDivElement>(null);

	// Advanced scroll handling with performance optimization and scroll progress
	useEffect(() => {
		let ticking = false;
		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					const currentScrollY = window.scrollY;
					setScrollY(currentScrollY);
					
					// Calculate scroll progress for smooth transitions
					const heroHeight = window.innerHeight;
					const progress = Math.min(currentScrollY / heroHeight, 1);
					setScrollProgress(progress);
					
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Sophisticated mouse tracking with smooth interpolation
	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;

		setMousePosition({ x, y });
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.addEventListener("mousemove", handleMouseMove, { passive: true });
		return () => container.removeEventListener("mousemove", handleMouseMove);
	}, [handleMouseMove]);

	// Enhanced entrance animations
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	// Dynamic floating cards with advanced timing
	useEffect(() => {
		// Use deterministic pattern for card visibility to prevent hydration mismatch
		let visibilityIndex = 0;
		const visibilityPatterns = [
			[0, 2, 4], // Show cards 0, 2, 4
			[1, 3, 5], // Show cards 1, 3, 5
			[0, 1, 3], // Show cards 0, 1, 3
			[2, 4, 5], // Show cards 2, 4, 5
			[1, 2, 4], // Show cards 1, 2, 4
		];

		const interval = setInterval(() => {
			const pattern = visibilityPatterns[visibilityIndex % visibilityPatterns.length];
			const newVisibleCards = floatingCards
				.filter((card, index) => pattern.includes(index))
				.map((card) => card.id);

			setVisibleCards(newVisibleCards);
			visibilityIndex++;
		}, 4000);

		// Staggered initial appearance
		floatingCards.forEach((card, index) => {
			setTimeout(() => {
				setVisibleCards((prev) => [...prev, card.id]);
			}, card.delay);
		});

		return () => clearInterval(interval);
	}, []);

	const getColorClasses = (color: string) => {
		const colors = {
			emerald: {
				bg: "bg-emerald-500",
				glow: "shadow-emerald-500/25",
				border: "border-emerald-500/30",
			},
			purple: {
				bg: "bg-purple-500",
				glow: "shadow-purple-500/25",
				border: "border-purple-500/30",
			},
			blue: {
				bg: "bg-blue-500",
				glow: "shadow-blue-500/25",
				border: "border-blue-500/30",
			},
			pink: {
				bg: "bg-pink-500",
				glow: "shadow-pink-500/25",
				border: "border-pink-500/30",
			},
			amber: {
				bg: "bg-amber-500",
				glow: "shadow-amber-500/25",
				border: "border-amber-500/30",
			},
			violet: {
				bg: "bg-violet-500",
				glow: "shadow-violet-500/25",
				border: "border-violet-500/30",
			},
		};
		return colors[color as keyof typeof colors] || colors.blue;
	};

	const mouseParallaxX = (mousePosition.x - 50) * 0.02;
	const mouseParallaxY = (mousePosition.y - 50) * 0.02;

	// Smooth scroll-based transformations
	const scrollTransform = {
		scale: 1 + scrollProgress * 0.1,
		opacity: 1 - scrollProgress * 0.3,
		blur: scrollProgress * 2,
		gridOpacity: (1 - scrollProgress * 1.2) * 0.4,
		parallaxIntensity: 1 - scrollProgress * 0.5,
	};

	return (
		<>
		<section
			ref={containerRef}
			className="relative h-auto pt-24 xl:pt-0 xl:h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden"
			 data-theme="light"
		>
			{/* Revolutionary Dynamic Background with Scroll Effects */}
			<div 
				className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
				style={{
					transform: `scale(${scrollTransform.scale}) translateZ(0)`,
					opacity: scrollTransform.opacity,
					filter: `blur(${scrollTransform.blur}px)`,
				}}
			>
				{/* Advanced mesh gradient */}
				<div
					className="absolute inset-0"
					style={{
						opacity: scrollTransform.gridOpacity,
						background: `
							radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
							radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
							radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
							linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(168, 85, 247, 0.02) 100%)
						`,
						transform: `translate(${mouseParallaxX * scrollTransform.parallaxIntensity}px, ${mouseParallaxY * scrollTransform.parallaxIntensity}px) translateZ(0)`,
					}}
				/>

				{/* Revolutionary grid system with scroll morphing */}
				<div
					className="absolute inset-0 transition-all duration-500 ease-out"
					style={{
						opacity: scrollTransform.gridOpacity,
						backgroundImage: `
							linear-gradient(rgba(59, 130, 246, ${0.08 * (1 - scrollProgress)}) 1px, transparent 1px),
							linear-gradient(90deg, rgba(59, 130, 246, ${0.08 * (1 - scrollProgress)}) 1px, transparent 1px),
							linear-gradient(rgba(168, 85, 247, ${0.04 * (1 - scrollProgress)}) 1px, transparent 1px),
							linear-gradient(90deg, rgba(168, 85, 247, ${0.04 * (1 - scrollProgress)}) 1px, transparent 1px)
						`,
						backgroundSize: `${120 + scrollProgress * 60}px ${120 + scrollProgress * 60}px, ${120 + scrollProgress * 60}px ${120 + scrollProgress * 60}px, ${40 + scrollProgress * 20}px ${40 + scrollProgress * 20}px, ${40 + scrollProgress * 20}px ${40 + scrollProgress * 20}px`,
						transform: `translate(${mouseParallaxX * 2 * scrollTransform.parallaxIntensity}px, ${mouseParallaxY * 2 * scrollTransform.parallaxIntensity}px) rotate(${scrollProgress * 5}deg) translateZ(0)`,
					}}
				/>

		
			</div>

			{/* Scroll-triggered overlay for smooth blending */}
			<div 
				className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
				style={{
					background: `linear-gradient(180deg, transparent ${(1 - scrollProgress) * 100}%, rgba(248, 250, 252, ${scrollProgress * 0.9}) 100%)`,
					opacity: scrollProgress,
				}}
			/>

			{/* Main Content Container */}
			<div 
				ref={heroRef} 
				className="relative z-10 h-auto xl:h-screen flex items-center transition-all duration-500 ease-out"
				style={{
					transform: `translateY(${scrollProgress * -50}px) translateZ(0)`,
					opacity: 1 - scrollProgress * 0.6,
				}}
			>
				<div className="w-full px-4 lg:px-32 pt-20">
					<div className="flex items-center h-full">
						{/* Left Column - Revolutionary Content */}
						<div className="w-full xl:w-1/2 space-y-8 xl:space-y-12 text-center xl:text-left">
							{/* Future Agency Badge - Enhanced */}
							<div
								className={`inline-flex items-center gap-4 px-4 py-4 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl transition-all duration-300 hover:shadow-blue-500/20 hover:scale-105 hover:bg-white/80 group opacity-0 ${
									isLoaded ? "animate-quickFadeIn" : ""
								}`}
								style={{ animationDelay: "0.1s" }}
							>
							
								<span className="font-russo text-black text-xs tracking-[0.3em] uppercase font-bold group-hover:text-gray-900 transition-colors">
									DESIGN AGENCY FROM THE FUTURE
								</span>
								
							</div>

							{/* Revolutionary Headline */}
							<div className="mb-4">
								<h1 className="font-russo font-black leading-[0.9] tracking-tight">
									<div className="overflow-hidden">
										<span
											className={`block text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black opacity-0 ${
												isLoaded ? "animate-digitalReveal" : ""
											}`}
											style={{ animationDelay: "0.15s" }}
										>
											WE BUILD<br></br> WORLDS FROM<br className="sm:hidden" /> YOUR IDEAS
										</span>
									</div>
								</h1>
							</div>

							{/* Mission Statement */}
							<div
								className={`max-w-lg mx-auto xl:mx-0 mb-10 opacity-0 ${
									isLoaded ? "animate-quickFadeIn" : ""
								}`}
								style={{ animationDelay: "0.4s" }}
							>
								<p className="text-lg sm:text-xl xl:text-2xl text-black leading-tight font-outfit font-medium">
									Code breakers crafting experiences beyond the ordinary.
								</p>
							</div>

							{/* Stats */}
							<div
								className={`flex gap-8 sm:gap-12 xl:gap-16 pt-6 border-t border-gray-200 justify-center xl:justify-start opacity-0 ${
									isLoaded ? "animate-scanlineReveal" : ""
								}`}
								style={{ animationDelay: "0.6s" }}
							>
								<div className="text-center xl:text-left">
									<div className="text-3xl sm:text-4xl font-russo font-black text-black mb-1">∞</div>
									<div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-russo font-bold">
										REALITIES
									</div>
								</div>
								<div className="text-center xl:text-left">
									<div className="text-3xl sm:text-4xl font-russo font-black text-black mb-1">2025</div>
									<div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-russo font-bold">
										AWAKENING
									</div>
								</div>
								<div className="text-center xl:text-left">
									<div className="text-3xl sm:text-4xl font-russo font-black text-black mb-1">01</div>
									<div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-russo font-bold">
										COLLECTIVE
									</div>
								</div>
							</div>

							{/* Call to Action */}
							<div
								className={`space-y-6 pt-6 opacity-0 ${
									isLoaded ? "animate-quickFadeIn" : ""
								}`}
								style={{ animationDelay: "0.8s" }}
							>
								<div className="flex flex-col sm:flex-row gap-4">
									<Button
										variant="primary"
										size="md"
										theme="light"
										className="text-base px-8 py-3 font-semibold transform hover:scale-105 transition-all duration-300"
									>
										<span className="flex items-center">
											START PROJECT
											<svg
												className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M17 8l4 4m0 0l-4 4m4-4H3"
												/>
											</svg>
										</span>
									</Button>
									<Button
										variant="outline"
										size="md"
										theme="light"
										className="text-base px-8 py-3 font-semibold transform hover:scale-105 transition-all duration-300"
									>
										VIEW WORK
									</Button>
								</div>
							</div>
						</div>

						{/* Spline 3D Scene - Desktop Only */}
						<div 
							className="hidden xl:block absolute top-0 right-0 w-2/3 h-screen z-10 transition-all duration-500 ease-out"
							style={{
								transform: `translate(${mouseParallaxX * 0.5}px, ${mouseParallaxY * 0.5 + scrollProgress * 30}px) scale(${1 - scrollProgress * 0.1}) translateZ(0)`,
								opacity: 1 - scrollProgress * 0.4,
							}}
						>
							<div className="absolute inset-0 w-full h-full">
								<Spline
									scene="https://prod.spline.design/ETshMG9lS-5Ab7VN/scene.splinecode"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Floating Cards - Desktop Only with Scroll Effects */}
			<div 
				className="hidden xl:block absolute inset-0 pointer-events-none z-50 transition-all duration-500 ease-out"
				style={{
					transform: `translateY(${scrollProgress * 100}px) translateZ(0)`,
					opacity: 1 - scrollProgress * 1.2,
				}}
			>
				{floatingCards.map((card) => (
					<div
						key={card.id}
						className={`absolute backdrop-blur-xl bg-white/95 rounded-2xl max-w-xs transition-all duration-1000 transform hover:scale-110 group cursor-pointer pointer-events-auto hover:rotate-1 ${
							visibleCards.includes(card.id)
								? "opacity-100 scale-100 translate-y-0"
								: "opacity-0 scale-95 translate-y-4"
						}`}
						style={{
							...card.desktopPosition,
							zIndex: 20,
							animationDelay: `${card.delay}ms`,
							transform: `translate(${mouseParallaxX * 0.2}px, ${
								mouseParallaxY * 0.2 + scrollProgress * 50
							}px) ${
								visibleCards.includes(card.id) ? "scale(1)" : "scale(0.95)"
							} translateZ(0)`,
							boxShadow: `
								0 25px 50px -12px rgba(0, 0, 0, 0.15),
								0 10px 25px -5px rgba(0, 0, 0, 0.1),
								0 0 0 1px rgba(255, 255, 255, 0.2),
								inset 0 1px 0 0 rgba(255, 255, 255, 0.3)
							`,
						}}
					>
						{/* Enhanced card content */}
						<div className="p-6 relative">
							{/* Top section with status */}
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-3">
									<div className="relative">
										<div className={`w-3 h-3 ${getColorClasses(card.color).bg} rounded-full shadow-lg`}></div>
										<div className={`absolute inset-0 w-3 h-3 ${getColorClasses(card.color).bg} rounded-full blur-sm opacity-60 animate-pulse`}></div>
									</div>
									<span className="font-russo text-[10px] text-gray-400 uppercase tracking-[0.15em] font-bold">
										{card.status}
									</span>
								</div>
								
								{/* Floating indicator */}
								<div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"></div>
							</div>
							
							{/* Main content */}
							<div className="space-y-2">
								<h3 className="text-base text-gray-900 font-outfit font-semibold leading-tight group-hover:text-black transition-colors">
									{card.message}
								</h3>
								<p className="text-xs text-gray-500 font-outfit">
									Premium service
								</p>
							</div>

						
							
							{/* Subtle corner decoration */}
							<div className="absolute top-3 right-3 w-1 h-1 bg-gray-300 rounded-full opacity-40"></div>
							<div className="absolute top-5 right-3 w-0.5 h-0.5 bg-gray-300 rounded-full opacity-30"></div>
						</div>
					</div>
				))}
			</div>
		</section>

		<section className="xl:hidden relative h-[70vh] xl:min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
			{/* Mobile Spline Scene */}
			<div className="relative w-full h-full">
				<Spline
					scene="https://prod.spline.design/ETshMG9lS-5Ab7VN/scene.splinecode"
					
				/>
			</div>

			{/* Mobile Floating Cards */}
			<div className="absolute inset-0 pointer-events-none z-50">
				{floatingCards.map((card) => (
					<div
						key={`mobile-${card.id}`}
						className={`absolute backdrop-blur-xl bg-white/95 rounded-2xl max-w-xs transition-all duration-1000 transform hover:scale-110 group cursor-pointer pointer-events-auto hover:rotate-1 ${
							visibleCards.includes(card.id)
								? "opacity-100 scale-100 translate-y-0"
								: "opacity-0 scale-95 translate-y-4"
						}`}
						style={{
							...card.mobilePosition,
							zIndex: 20,
							animationDelay: `${card.delay}ms`,
							transform: `translate(${mouseParallaxX * 0.1}px, ${
								mouseParallaxY * 0.1
							}px) ${
								visibleCards.includes(card.id) ? "scale(1)" : "scale(0.95)"
							}`,
							boxShadow: `
								0 25px 50px -12px rgba(0, 0, 0, 0.15),
								0 10px 25px -5px rgba(0, 0, 0, 0.1),
								0 0 0 1px rgba(255, 255, 255, 0.2),
								inset 0 1px 0 0 rgba(255, 255, 255, 0.3)
							`,
						}}
					>
						{/* Enhanced card content */}
						<div className="p-6 relative">
							{/* Top section with status */}
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-3">
									<div className="relative">
										<div className={`w-3 h-3 ${getColorClasses(card.color).bg} rounded-full shadow-lg`}></div>
										<div className={`absolute inset-0 w-3 h-3 ${getColorClasses(card.color).bg} rounded-full blur-sm opacity-60 animate-pulse`}></div>
									</div>
									<span className="font-russo text-[10px] text-gray-400 uppercase tracking-[0.15em] font-bold">
										{card.status}
									</span>
								</div>
								
								{/* Floating indicator */}
								<div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"></div>
							</div>
							
							{/* Main content */}
							<div className="space-y-2">
								<h3 className="text-base text-gray-900 font-outfit font-semibold leading-tight group-hover:text-black transition-colors">
									{card.message}
								</h3>
								<p className="text-xs text-gray-500 font-outfit">
									Premium service
								</p>
							</div>

						
							
							{/* Subtle corner decoration */}
							<div className="absolute top-3 right-3 w-1 h-1 bg-gray-300 rounded-full opacity-40"></div>
							<div className="absolute top-5 right-3 w-0.5 h-0.5 bg-gray-300 rounded-full opacity-30"></div>
						</div>
					</div>
				))}
			</div>
		</section>
		</>
	);
}
