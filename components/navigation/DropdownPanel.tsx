"use client";
import React from "react";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import Button from "@/components/ui/Button";
import { StoryPanel } from "./panels/StoryPanel";

interface DropdownLink {
	href: string;
	label: string;
	description: string;
}

interface DropdownData {
	title: string;
	description: string;
	spline: string;
	links: DropdownLink[];
}

interface DropdownPanelProps {
	dropdown: DropdownData | null;
	isActive: boolean;
	navbarTheme: "dark" | "light";
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	onLinkClick: () => void;
	type?: string; // Add type prop for custom layouts
}

// Custom layout components

const ServicesPanel = ({
	dropdown,
	navbarTheme,
	onLinkClick,
}: {
	dropdown: DropdownData;
	navbarTheme: "dark" | "light";
	onLinkClick: () => void;
}) => (
	<div className="flex">
		{/* Left side - Content */}
		<div className="flex-1 p-6">
			<div className="mb-4">
				<h3
					className={`font-russo text-2xl font-bold mb-2 ${
						navbarTheme === "dark" ? "text-white" : "text-black"
					}`}
				>
					WE DESIGN REALITY
				</h3>
				<p
					className={`text-sm ${
						navbarTheme === "dark" ? "text-white/70" : "text-black/70"
					}`}
				>
					Transform your ideas into immersive digital experiences that captivate
					and inspire.
				</p>
			</div>

			<div className="grid grid-cols-3 gap-3">
				{dropdown.links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={`group p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
							navbarTheme === "dark"
								? "hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20"
								: "hover:bg-black/10 text-black/80 hover:text-black border border-black/10 hover:border-black/20"
						}`}
						onClick={onLinkClick}
					>
						<div className="font-russo text-sm font-bold mb-1">
							{link.label}
						</div>
						<div
							className={`text-xs ${
								navbarTheme === "dark" ? "text-white/60" : "text-black/60"
							}`}
						>
							{link.description}
						</div>
					</Link>
				))}
			</div>

			<div className="mt-4 pt-4 border-t border-current/10">
				<Button
					variant="primary"
					size="sm"
					href="/contact"
					theme={navbarTheme}
					className="w-full"
				>
					Start Your Project
				</Button>
			</div>
		</div>
	</div>
);

const DefaultPanel = ({
	dropdown,
	navbarTheme,
	onLinkClick,
}: {
	dropdown: DropdownData;
	navbarTheme: "dark" | "light";
	onLinkClick: () => void;
}) => (
	<div className="flex">
		{/* Left side - Content */}
		<div className="flex-1 p-6">
			<div className="mb-4">
				<h3
					className={`font-russo text-xl font-bold mb-2 ${
						navbarTheme === "dark" ? "text-white" : "text-black"
					}`}
				>
					{dropdown.title}
				</h3>
				<p
					className={`text-sm ${
						navbarTheme === "dark" ? "text-white/70" : "text-black/70"
					}`}
				>
					{dropdown.description}
				</p>
			</div>

			<div className="grid grid-cols-2 gap-3">
				{dropdown.links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={`group p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
							navbarTheme === "dark"
								? "hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20"
								: "hover:bg-black/10 text-black/80 hover:text-black border border-black/10 hover:border-black/20"
						}`}
						onClick={onLinkClick}
					>
						<div className="font-russo text-sm font-bold mb-1">
							{link.label}
						</div>
						<div
							className={`text-xs ${
								navbarTheme === "dark" ? "text-white/60" : "text-black/60"
							}`}
						>
							{link.description}
						</div>
					</Link>
				))}
			</div>

			<div className="mt-4 pt-4 border-t border-current/10">
				<Button
					variant="primary"
					size="sm"
					href="/contact"
					theme={navbarTheme}
					className="w-full"
				>
					Get Started
				</Button>
			</div>
		</div>

		{/* Right side - Spline */}
		<div className="w-64 relative overflow-hidden">
			<div className="absolute inset-0 opacity-60">
				<Spline scene={dropdown.spline} />
			</div>
			<div
				className={`absolute inset-0 bg-gradient-to-l ${
					navbarTheme === "dark"
						? "from-transparent to-black/20"
						: "from-transparent to-white/20"
				}`}
			></div>
		</div>
	</div>
);

export default function DropdownPanel({
	dropdown,
	isActive,
	navbarTheme,
	onMouseEnter,
	onMouseLeave,
	onLinkClick,
	type = "default",
}: DropdownPanelProps) {
	if (!isActive || !dropdown) return null;

	// Render different layouts based on type
	const renderContent = () => {
		switch (type) {
			case "story":
				return (
					<StoryPanel
						dropdown={dropdown}
						navbarTheme={navbarTheme}
						onLinkClick={onLinkClick}
					/>
				);
			case "services":
				return (
					<ServicesPanel
						dropdown={dropdown}
						navbarTheme={navbarTheme}
						onLinkClick={onLinkClick}
					/>
				);
			default:
				return (
					<DefaultPanel
						dropdown={dropdown}
						navbarTheme={navbarTheme}
						onLinkClick={onLinkClick}
					/>
				);
		}
	};

	return (
		<div
			className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[80vw] max-w-[1200px] z-50"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div
				className={`rounded-2xl border backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-200 ${
					navbarTheme === "dark"
						? "bg-black/95 border-white/20 shadow-black/50"
						: "bg-white/95 border-black/20 shadow-black/20"
				}`}
			>
				{renderContent()}
			</div>
		</div>
	);
}
