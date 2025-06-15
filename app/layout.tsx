import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { russo, oxanium, outfit, kodemono } from "./fonts";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import { NavigationProvider } from "@/components/providers/NavigationProvider";
import Footer from "@/components/navigation/Footer";
import "./global.css";
import { preconnect } from "react-dom";

export const metadata: Metadata = {
	title: "Reality Designers",
	description:
		"Reality Designers is a collective of artists, designers, dreamers, and engineers who are building the next generation of immersive experiences.",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	preconnect("cdn.sanity.io");
	preconnect("prod.spline.design");
	return (
		<html
			lang="en"
			className={`${kodemono.variable}  ${outfit.variable}  ${russo.variable}  ${oxanium.variable}  `}
		>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className="bg-white">
				<NavigationProvider>
					<SiteNavbar />
					{children}
					<Footer />
				</NavigationProvider>
				<Analytics />
			</body>
		</html>
	);
}
