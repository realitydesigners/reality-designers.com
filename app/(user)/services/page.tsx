import { Metadata } from "next";
import ServicesShowcase from "@/components/items/ServicesShowcase";

export const metadata: Metadata = {
	title: "Services - Reality Designers",
	description: "Premium design services for the next generation of digital experiences. We craft immersive realities through cutting-edge design and technology.",
};

export default function ServicesPage() {
	return (
		<main className="flex w-full flex-col min-h-screen">
			<ServicesShowcase />
		</main>
	);
} 