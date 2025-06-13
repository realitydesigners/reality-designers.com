"use client";
import { useState, useEffect } from "react";

export default function ServicesHeroSection() {
	const [scrollY, setScrollY] = useState(0);
	
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Animated background grid */}
			<div className="absolute inset-0 pointer-events-none opacity-20">
				<div 
					className="absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
							linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
						`,
						backgroundSize: '50px 50px',
						animation: 'gridFloat 25s ease-in-out infinite',
						transform: `translateY(${scrollY * 0.5}px)`
					}}
				></div>
			</div>

			{/* Floating geometric shapes */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-64 h-64 border border-blue-500/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
				<div className="absolute top-3/4 right-1/4 w-48 h-48 border border-purple-500/15 rotate-45 animate-spin" style={{animationDuration: '40s'}}></div>
				<div className="absolute top-1/2 left-1/2 w-32 h-32 border border-pink-500/25 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '2s'}}></div>
			</div>

			{/* Glowing orb background - multiple layers */}
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
			<div className="absolute top-1/3 right-1/3 transform w-[400px] h-[400px] bg-gradient-radial from-purple-500/15 via-pink-500/8 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{animationDelay: '3s'}}></div>
			
			<div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
				{/* Enhanced badge with multiple elements */}
				<div className="inline-flex items-center gap-4 mb-12 p-6 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-400/30 backdrop-blur-sm">
					<div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
					<span className="font-russo text-lg tracking-[0.4em] uppercase font-bold text-gray-800">
						Reality Architecture Division
					</span>
					<div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse delay-1000"></div>
					<div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse delay-2000"></div>
				</div>

				<h1 className="font-russo text-7xl lg:text-9xl font-bold mb-12 leading-[0.9] text-gray-900">
					WE <span className="relative inline-block">
						DESIGN
						<div className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-80"></div>
					</span>
					<br/>
					<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						WORLDS
					</span>
				</h1>
				
				<div className="max-w-5xl mx-auto mb-16">
					<p className="text-2xl lg:text-3xl leading-relaxed font-outfit font-medium text-gray-700 mb-8">
						In a dimension where <span className="font-semibold text-blue-600">scattered souls</span> are gathering, where <span className="font-semibold text-purple-600">technology becomes self-aware</span>, we are the <span className="font-semibold text-pink-600">architects of the impossible</span>.
					</p>
					<p className="text-xl text-gray-600 leading-relaxed">
						We craft the bridges between what is and what could be, designing realities that awaken human potential and connect consciousness across all dimensions.
					</p>
				</div>

				<div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
					<button className="group px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-russo font-bold text-lg rounded-3xl hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden">
						<span className="relative z-10">BEGIN TRANSFORMATION</span>
						<div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					</button>
					<button className="px-12 py-6 border-3 border-gray-900 text-gray-900 font-russo font-bold text-lg rounded-3xl hover:bg-gray-900 hover:text-white transition-all duration-500 hover:scale-105">
						EXPLORE OUR REALMS
					</button>
				</div>
			</div>
		</section>
	);
} 