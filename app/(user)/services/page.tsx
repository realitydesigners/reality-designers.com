import { Metadata } from "next";
import ServicesHeroSection from "@/components/sections/ServicesHeroSection";
import ServicesRealmsSection from "@/components/sections/ServicesRealmsSection";
import ServicesCTASection from "@/components/sections/ServicesCTASection";
import HeroNarrativeSection from "@/components/sections/HeroNarrativeSection";
import ServicesNarrativeSection from "@/components/sections/ServicesNarrativeSection";
import TechnologyShowcaseSection from "@/components/sections/TechnologyShowcaseSection";
import ProcessTimelineSection from "@/components/sections/ProcessTimelineSection";
import CallToActionSection from "@/components/sections/CallToActionSection";

export const metadata: Metadata = {
	title: "Services - Reality Designers",
	description:
		"Premium design services for the next generation of digital experiences. We craft immersive realities through cutting-edge design and technology.",
};

export default function ServicesPage() {
	return (
		<main className="flex w-full flex-col min-h-screen bg-white">
			<ServicesHeroSection />
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
