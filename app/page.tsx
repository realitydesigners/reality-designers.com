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
			
			{/* Newsletter Signup Section */}
			<section className="w-full py-16 lg:py-24">
				<div className="container mx-auto px-4">
					<NewsletterSignup 
						variant="featured"
						title="Stay Ahead of the Curve"
						description="Be the first to know about our latest projects, design insights, and cutting-edge techniques. Join our community of forward-thinking designers and developers."
						className="rounded-3xl"
					/>
				</div>
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
