import { Metadata } from "next";
import ServicesHeroSection from "@/components/sections/ServicesHeroSection";
import ServicesRealmsSection from "@/components/sections/ServicesRealmsSection";
import ServicesCTASection from "@/components/sections/ServicesCTASection";
import HeroNarrativeSection from "@/components/sections/HeroNarrativeSection";
import ServicesNarrativeSection from "@/components/sections/ServicesNarrativeSection";
import TechnologyShowcaseSection from "@/components/sections/TechnologyShowcaseSection";
import ProcessTimelineSection from "@/components/sections/ProcessTimelineSection";
import CallToActionSection from "@/components/sections/CallToActionSection";
import NewsletterSignup from "@/components/forms/NewsletterSignup";

export const metadata: Metadata = {
	title: "Services - Reality Designers",
	description:
		"Premium design services for the next generation of digital experiences. We craft immersive realities through cutting-edge design and technology.",
};

export default function HomePage() {
	return (
		<main className="flex w-full flex-col min-h-screen ">
			<ServicesHeroSection />
			
			{/* Enhanced Newsletter Signup Section */}
			<section className="w-full relative bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 overflow-hidden" data-theme="light">
				{/* Sophisticated Background Effects */}
				<div className="absolute inset-0 pointer-events-none">
					{/* Mesh gradient overlay */}
					<div
						className="absolute inset-0 opacity-30"
						style={{
							background: `
								radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
								radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 50%),
								radial-gradient(circle at 60% 40%, rgba(236, 72, 153, 0.04) 0%, transparent 50%)
							`,
						}}
					/>

					{/* Advanced grid pattern */}
					<div
						className="absolute inset-0 opacity-20"
						style={{
							backgroundImage: `
								linear-gradient(rgba(59, 130, 246, 0.06) 1px, transparent 1px),
								linear-gradient(90deg, rgba(59, 130, 246, 0.06) 1px, transparent 1px)
							`,
							backgroundSize: "80px 80px",
						}}
					/>

					{/* Floating geometric elements */}
					<div className="absolute top-1/4 left-1/4 w-64 h-64 border border-blue-200/30 rounded-full animate-pulse opacity-40"></div>
					<div 
						className="absolute top-3/4 right-1/4 w-32 h-32 border border-purple-200/20 rotate-45 opacity-30"
						style={{ animation: "spin 30s linear infinite" }}
					></div>
					<div className="absolute top-1/2 left-3/4 w-16 h-16 border border-pink-200/25 transform animate-pulse opacity-50"></div>
				</div>

				{/* Enhanced content container */}
				<div className="relative z-10 py-24 lg:py-32">
					<div className="container mx-auto px-4">
						{/* Section header */}
						<div className="text-center mb-16">
							<div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/30 shadow-lg mb-8">
								<div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
								<span className="font-russo text-gray-600 text-xs tracking-[0.3em] uppercase font-bold">
									JOIN THE FUTURE
								</span>
							</div>
							<h2 className="font-russo text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
								STAY CONNECTED
							</h2>
							<p className="text-lg text-gray-600 font-outfit max-w-2xl mx-auto">
								Subscribe to receive exclusive insights, project updates, and early access to our latest innovations.
							</p>
						</div>

						{/* Newsletter component with enhanced styling */}
						<div className="max-w-4xl mx-auto">
							<div className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-blue-500/10">
								<NewsletterSignup 
									variant="featured"
									title="Stay Ahead of the Curve"
									description="Be the first to know about our latest projects, design insights, and cutting-edge techniques. Join our community of forward-thinking designers and developers."
									className="border-0 bg-transparent shadow-none p-0"
								/>
							</div>
						</div>

						{/* Visual enhancement elements */}
						<div className="flex justify-center mt-16 space-x-8 opacity-60">
							<div className="flex items-center gap-2 text-sm text-gray-500 font-outfit">
								<div className="w-1 h-1 bg-blue-400 rounded-full"></div>
								<span>Weekly insights</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-500 font-outfit">
								<div className="w-1 h-1 bg-purple-400 rounded-full"></div>
								<span>Exclusive previews</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-500 font-outfit">
								<div className="w-1 h-1 bg-pink-400 rounded-full"></div>
								<span>Early access</span>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom gradient transition */}
				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/5 pointer-events-none"></div>
			</section>

			<section className="w-full py-16 lg:py-24 bg-black min-h-screen" data-theme="dark">	
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold text-white">
						Our Services
					</h2>
					<p className="text-white">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					</p>
				</div>
			</section>
			
			{/* Uncomment these sections as needed */}
			{/* <ServicesRealmsSection /> */}
			{/* 	<ServicesCTASection />
			
			<HeroNarrativeSection />

			<ServicesNarrativeSection />

			<TechnologyShowcaseSection />

			<ProcessTimelineSection />

			<CallToActionSection /> */}
		</main>
	);
}
