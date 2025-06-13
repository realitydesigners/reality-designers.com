"use client";
import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Button from "@/components/ui/Button";

export default function JoinCommunitySection() {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section className="relative min-h-screen bg-black overflow-hidden">
			{/* Cybernetic Grid */}
			<div className="absolute inset-0 pointer-events-none opacity-20">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
							linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
						`,
						backgroundSize: "80px 80px",
						animation: "gridPulse 4s ease-in-out infinite",
					}}
				></div>
			</div>

			{/* Prominent Spline 3D - Full Background */}
			<div className="absolute inset-0 w-full h-full">
				<Spline scene="https://prod.spline.design/jEsawKZEsxEwrEN5/scene.splinecode" />
				{/* Minimal overlay to keep text readable */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60"></div>
			</div>

			{/* Floating Particles */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
							animationDelay: `${Math.random() * 2}s`,
						}}
					></div>
				))}
			</div>

			{/* Main Content - Centered and Powerful */}
			<div className="relative z-10 h-screen flex items-center justify-center">
				<div className="max-w-6xl mx-auto px-6 text-center">
					{/* Movement Badge */}
					<div className="inline-flex items-center gap-4 mb-8 px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
						<div className="relative">
							<div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
							<div className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full blur-sm opacity-50"></div>
						</div>
						<span className="font-russo text-purple-300 text-sm tracking-[0.4em] uppercase font-bold">
							REALITY DESIGNERS COLLECTIVE
						</span>
						<div className="relative">
							<div
								className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"
								style={{ animationDelay: "1s" }}
							></div>
							<div className="absolute inset-0 w-3 h-3 bg-pink-400 rounded-full blur-sm opacity-50"></div>
						</div>
					</div>

					{/* Epic Headline */}
					<div className="space-y-8 mb-12">
						<h1 className="font-russo font-black leading-[0.8] tracking-tight">
							<span className="text-8xl lg:text-[12rem] block text-white drop-shadow-2xl">
								JOIN THE
							</span>
							<span className="text-6xl lg:text-[8rem] block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
								MOVEMENT
							</span>
						</h1>
					</div>

					{/* Powerful Mission Statement */}
					<div className="max-w-4xl mx-auto mb-16">
						<p className="text-2xl lg:text-4xl text-white/90 leading-relaxed font-outfit font-light mb-8">
							We are{" "}
							<span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
								conscious creators
							</span>{" "}
							building the impossible.
						</p>
						<p className="text-xl lg:text-2xl text-white/70 leading-relaxed font-outfit">
							A Discord community of visionaries, designers, and builders
							crafting experimental realities that transcend conventional
							boundaries.
						</p>
					</div>

					{/* Community Stats - Movement Style */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
						{[
							{
								value: "∞",
								label: "POSSIBILITIES",
								sublabel: "Unlimited potential",
							},
							{ value: "1", label: "MOVEMENT", sublabel: "United vision" },
							{ value: "∞", label: "CREATORS", sublabel: "Growing collective" },
						].map((stat, index) => (
							<div key={index} className="group text-center">
								<div className="text-6xl lg:text-7xl font-russo font-black text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-700">
									{stat.value}
								</div>
								<div className="text-sm text-purple-300 uppercase tracking-[0.3em] font-russo font-bold mb-2">
									{stat.label}
								</div>
								<div className="text-xs text-white/50 font-outfit italic">
									{stat.sublabel}
								</div>
							</div>
						))}
					</div>

					{/* Call to Action - Community Focused */}
					<div className="space-y-8">
						<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
							<Button
								variant="primary"
								size="lg"
								theme="dark"
								className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0"
							>
								JOIN DISCORD
								<svg
									className="w-6 h-6 ml-3"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
								</svg>
							</Button>
							<Button
								variant="outline"
								size="lg"
								theme="dark"
								className="text-xl px-12 py-6 border-white/30 text-white hover:bg-white/10"
							>
								EXPLORE WORK
								<svg
									className="w-6 h-6 ml-3"
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
							</Button>
						</div>

						{/* Community Invitation */}
						<div className="text-center">
							<p className="text-white/60 font-outfit text-lg">
								Ready to design reality?{" "}
								<span className="text-purple-300 font-semibold">
									The collective awaits.
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Scroll Indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex flex-col items-center gap-4">
					<div className="text-white/40 text-sm font-outfit tracking-wide">
						SCROLL TO EXPLORE
					</div>
					<div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-500 group animate-bounce">
						<svg
							className="w-5 h-5 text-white/40 group-hover:text-purple-300 transition-colors"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 14l-7 7m0 0l-7-7m7 7V3"
							/>
						</svg>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes gridPulse {
					0%, 100% { opacity: 0.2; }
					50% { opacity: 0.4; }
				}
				@keyframes float {
					0%, 100% { transform: translateY(0px) rotate(0deg); }
					50% { transform: translateY(-20px) rotate(180deg); }
				}
			`}</style>
		</section>
	);
}
