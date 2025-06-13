"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Spline from "@splinetool/react-spline";
import Button from "@/components/ui/Button";

const floatingCards = [
	{
		id: 1,
		status: "ACTIVE",
		message: "Web Development",
		color: "emerald",
		position: { top: "20%", right: "35%" },
		delay: 0,
	},
	{
		id: 2,
		status: "LIVE",
		message: "3D Design",
		color: "purple",
		position: { top: "70%", right: "40%" },
		delay: 200,
	},
	{
		id: 3,
		status: "BUILDING",
		message: "Brand Identity",
		color: "blue",
		position: { top: "60%", right: "10%" },
		delay: 400,
	},
	{
		id: 4,
		status: "CREATING",
		message: "UI/UX Design",
		color: "pink",
		position: { top: "85%", right: "5%" },
		delay: 600,
	},
	{
		id: 5,
		status: "SHIPPING",
		message: "Prototyping",
		color: "amber",
		position: { top: "30%", right: "2%" },
		delay: 800,
	},
	{
		id: 6,
		status: "DESIGNING",
		message: "Motion Graphics",
		color: "violet",
		position: { top: "75%", right: "8%" },
		delay: 1000,
	},
];

// Advanced particle system
const generateParticles = (count: number) => {
	return Array.from({ length: count }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		size: Math.random() * 4 + 1,
		opacity: Math.random() * 0.6 + 0.2,
		speed: Math.random() * 2 + 0.5,
		color: ["blue", "purple", "pink", "emerald", "amber"][
			Math.floor(Math.random() * 5)
		],
	}));
};

export default function ServicesHeroSection() {
	const [scrollY, setScrollY] = useState(0);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [visibleCards, setVisibleCards] = useState<number[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [particles, setParticles] = useState(() => generateParticles(25));
	const containerRef = useRef<HTMLDivElement>(null);
	const heroRef = useRef<HTMLDivElement>(null);

	// Advanced scroll handling with performance optimization
	useEffect(() => {
		let ticking = false;
		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					setScrollY(window.scrollY);
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
		const interval = setInterval(() => {
			const newVisibleCards = floatingCards
				.filter(() => Math.random() > 0.55)
				.map((card) => card.id);

			setVisibleCards(newVisibleCards);
		}, 4000);

		// Staggered initial appearance
		floatingCards.forEach((card) => {
			setTimeout(() => {
				setVisibleCards((prev) => [...prev, card.id]);
			}, card.delay);
		});

		return () => clearInterval(interval);
	}, []);

	// Advanced particle animation
	useEffect(() => {
		const animateParticles = () => {
			setParticles((prev) =>
				prev.map((particle) => ({
					...particle,
					y: (particle.y + particle.speed * 0.1) % 100,
					x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.05,
					opacity: 0.2 + Math.sin(Date.now() * 0.002 + particle.id) * 0.1,
				})),
			);
		};

		const interval = setInterval(animateParticles, 50);
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

	return (
		<section
			ref={containerRef}
			className="relative min-h-screen  bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden"
		>
			{/* Revolutionary Dynamic Background */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Advanced mesh gradient */}
				<div
					className="absolute inset-0 opacity-40"
					style={{
						background: `
							radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
							radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
							radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
							linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(168, 85, 247, 0.02) 100%)
						`,
						transform: `translate(${mouseParallaxX}px, ${mouseParallaxY}px)`,
					}}
				/>

				{/* Revolutionary grid system */}
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
							linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
							linear-gradient(rgba(168, 85, 247, 0.04) 1px, transparent 1px),
							linear-gradient(90deg, rgba(168, 85, 247, 0.04) 1px, transparent 1px)
						`,
						backgroundSize: "120px 120px, 120px 120px, 40px 40px, 40px 40px",
						transform: `translate(${mouseParallaxX * 2}px, ${
							mouseParallaxY * 2
						}px)`,
					}}
				/>
			</div>

			{/* Main Content Container */}
			<div ref={heroRef} className="relative z-10 h-screen flex items-center">
				<div className="w-full px-4 lg:px-32 pt-20">
					<div className="flex items-center h-full">
						{/* Left Column - Revolutionary Content */}
						<div
							className={`w-1/2 space-y-12 transition-all duration-2000 ease-out ${
								isLoaded
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-12"
							}`}
						>
							{/* Future Agency Badge - Enhanced */}
							<div
								className={`inline-flex items-center gap-4 px-4 py-4 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl transition-all duration-1000 hover:shadow-blue-500/20 hover:scale-105 hover:bg-white/80 group ${
									isLoaded ? "animate-slideInUp" : ""
								}`}
								style={{ animationDelay: "200ms" }}
							>
								<div className="relative">
									<div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></div>
									<div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full blur-md opacity-50 animate-ping"></div>
								</div>
								<span className="font-russo text-black text-xs tracking-[0.3em] uppercase font-bold group-hover:text-gray-900 transition-colors">
									DESIGN AGENCY FROM THE FUTURE
								</span>
								<div className="relative">
									<div
										className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full animate-pulse"
										style={{ animationDelay: "1s" }}
									></div>
									<div
										className="absolute inset-0 w-3 h-3 bg-purple-500 rounded-full blur-md opacity-50 animate-ping"
										style={{ animationDelay: "1s" }}
									></div>
								</div>
							</div>

							{/* Revolutionary Headline */}
							<div
								className={`mb-4 ${isLoaded ? "animate-slideInUp" : ""}`}
								style={{ animationDelay: "400ms" }}
							>
								<h1 className="font-russo font-black leading-[0.9] tracking-tight">
									<div className="overflow-hidden">
										<span
											className={`block text-7xl lg:text-8xl text-black transition-all duration-1200 ease-out ${
												isLoaded
													? "translate-y-0 opacity-100"
													: "translate-y-full opacity-0"
											}`}
											style={{ animationDelay: "600ms" }}
										>
											WE BUILD
										</span>
									</div>
									<div className="overflow-hidden">
										<span
											className={`block text-7xl lg:text-8xl text-black transition-all duration-1200 ease-out ${
												isLoaded
													? "translate-y-0 opacity-100"
													: "translate-y-full opacity-0"
											}`}
											style={{ animationDelay: "800ms" }}
										>
											WORLDS FROM YOUR IDEAS
										</span>
									</div>
								</h1>
							</div>

							{/* Mission Statement */}
							<div
								className={`max-w-lg mb-10 ${
									isLoaded ? "animate-slideInUp" : ""
								}`}
								style={{ animationDelay: "1000ms" }}
							>
								<p className="text-2xl text-black leading-tight font-outfit font-medium">
									Code breakers crafting experiences beyond the ordinary.
								</p>
							</div>

							{/* Stats */}
							<div
								className={`flex gap-16 pt-6 border-t border-gray-200 ${
									isLoaded ? "animate-slideInUp" : ""
								}`}
								style={{ animationDelay: "1200ms" }}
							>
								<div>
									<div className="text-4xl font-russo font-black text-black mb-1">∞</div>
									<div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-russo font-bold">
										REALITIES
									</div>
								</div>
								<div>
									<div className="text-4xl font-russo font-black text-black mb-1">2025</div>
									<div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-russo font-bold">
										AWAKENING
									</div>
								</div>
								<div>
									<div className="text-4xl font-russo font-black text-black mb-1">01</div>
									<div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-russo font-bold">
										COLLECTIVE
									</div>
								</div>
							</div>

							{/* Call to Action */}
							<div
								className={`space-y-6 pt-6 ${
									isLoaded ? "animate-slideInUp" : ""
								}`}
								style={{ animationDelay: "1400ms" }}
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

						<div className="absolute top-0 right-0 w-1/2 h-screen z-0">
							<div className="absolute inset-0 w-full h-full">
								<Spline
									scene="https://prod.spline.design/ETshMG9lS-5Ab7VN/scene.splinecode"
									style={{
										transform: `translate(${mouseParallaxX * 0.5}px, ${
											mouseParallaxY * 0.5
										}px) scale(${1 + mouseParallaxX * 0.0002})`,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Floating Cards - Positioned relative to full screen */}
			<div className="absolute inset-0 pointer-events-none z-50">
				{floatingCards.map((card) => (
					<div
						key={card.id}
						className={`absolute backdrop-blur-xl bg-white/95 rounded-2xl max-w-xs transition-all duration-1000 transform hover:scale-110 group cursor-pointer pointer-events-auto hover:rotate-1 ${
							visibleCards.includes(card.id)
								? "opacity-100 scale-100 translate-y-0"
								: "opacity-0 scale-95 translate-y-4"
						}`}
						style={{
							...card.position,
							zIndex: 20,
							animationDelay: `${card.delay}ms`,
							transform: `translate(${mouseParallaxX * 0.2}px, ${
								mouseParallaxY * 0.2
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
	);
}
