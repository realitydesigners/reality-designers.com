"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
	const pathname = usePathname();

	if (pathname === "/create") return null;

	return (
		<footer className="w-full bg-gradient-to-br from-gray-100 via-white to-blue-50/30 px-6 py-20 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
			</div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
					{/* Brand Column */}
					<div className="lg:col-span-1">
						<div className="mb-6">
							<div className="font-russo flex flex-col text-gray-900 mb-4">
								<span className="font-russo text-2xl  leading-none tracking-wider">
									REALITY
								</span>
								<span className="font-russo text-xl  leading-none tracking-wider">
									DESIGNERS
								</span>
							</div>
							<div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"></div>
							<p className="font-outfit text-gray-600 text-lg leading-relaxed mb-6">
								Crafting experiences beyond the ordinary. Let's design a new
								reality together.
							</p>
						</div>

						{/* Contact */}
						<div className="space-y-3">
							<a
								href="mailto:hey@reality-designers.com"
								className="group inline-flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-all duration-300"
							>
								<div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-300">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<span className="font-outfit text-sm">
									hey@reality-designers.com
								</span>
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
						<div>
							<h3 className="font-russo text-gray-900 text-sm mb-6 uppercase tracking-[0.2em] font-bold flex items-center gap-2">
								<div className="w-1 h-1 bg-blue-500 rounded-full"></div>
								Explore
							</h3>
							<ul className="space-y-4 font-outfit text-gray-600">
								<li>
									<Link
										href="/story"
										className="group inline-flex items-center gap-2 hover:text-gray-900 transition-all duration-300"
									>
										<div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
										Story
									</Link>
								</li>
								<li>
									<Link
										href="/lab"
										className="group inline-flex items-center gap-2 hover:text-gray-900 transition-all duration-300"
									>
										<div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
										Lab
									</Link>
								</li>
								<li>
									<Link
										href="/team"
										className="group inline-flex items-center gap-2 hover:text-gray-900 transition-all duration-300"
									>
										<div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
										Team
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-russo text-gray-900 text-sm mb-6 uppercase tracking-[0.2em] font-bold flex items-center gap-2">
								<div className="w-1 h-1 bg-purple-500 rounded-full"></div>
								Resources
							</h3>
							<ul className="space-y-4 font-outfit text-gray-600">
								<li>
									<Link
										href="/videos"
										className="group inline-flex items-center gap-2 hover:text-gray-900 transition-all duration-300"
									>
										<div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-purple-500 transition-colors duration-300"></div>
										Videos
									</Link>
								</li>
								<li>
									<Link
										href="/posts"
										className="group inline-flex items-center gap-2 hover:text-gray-900 transition-all duration-300"
									>
										<div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-purple-500 transition-colors duration-300"></div>
										Posts
									</Link>
								</li>
								<li>
									<Link
										href="/library"
										className="group inline-flex items-center gap-2 hover:text-gray-900 transition-all duration-300"
									>
										<div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-purple-500 transition-colors duration-300"></div>
										Library
									</Link>
								</li>
							</ul>
						</div>
					</div>

					{/* Newsletter Column */}
					<div className="lg:col-span-1">
						<Newsletter />
					</div>
				</div>

				{/* Social Links & Copyright */}
				<div className="border-t border-gray-200 pt-12">
					<div className="flex flex-col md:flex-row justify-between items-center gap-8">
						{/* Social Links */}
						<div className="flex items-center gap-4">
							<span className="font-russo text-gray-500 text-xs uppercase tracking-widest font-bold mr-4">
								Follow
							</span>
							<SocialLink
								href="https://www.youtube.com/@realitydesigners"
								icon={<FaYoutube size={20} />}
								label="YouTube"
							/>
							<SocialLink
								href="https://www.instagram.com/realitydesignerstv/"
								icon={<FaInstagram size={20} />}
								label="Instagram"
							/>
							<SocialLink
								href="https://www.x.com/realitydesignrs/"
								icon={<FaXTwitter size={20} />}
								label="Twitter"
							/>
							<SocialLink
								href="https://www.tiktok.com/@realitydesigners"
								icon={<FaTiktok size={20} />}
								label="TikTok"
							/>
						</div>

						{/* Copyright */}
						<div className="flex items-center gap-4">
							<div className="font-outfit text-gray-500 text-sm">
								© {new Date().getFullYear()} Reality Designers. All rights
								reserved.
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

// Enhanced Social Link Component
const SocialLink = ({ href, icon, label }) => (
	<Link
		href={href}
		className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 backdrop-blur-sm border border-gray-200 hover:bg-gray-200 hover:border-gray-300 hover:scale-110 transition-all duration-300"
		aria-label={label}
		target="_blank"
		rel="noopener noreferrer"
	>
		<span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
			{icon}
		</span>
		<div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
	</Link>
);

const Newsletter = () => {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			setStatus("error");
			setMessage("Please enter your email address");
			return;
		}

		setIsLoading(true);
		setStatus("idle");

		try {
			const response = await fetch("/api/audience", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "add-contact",
					email,
					firstName,
				}),
			});

			const result = await response.json();

			if (result.success) {
				setStatus("success");
				setMessage("🎉 Welcome to the Reality Designers community!");
				setEmail("");
				setFirstName("");
			} else {
				setStatus("error");
				setMessage(result.error || "Something went wrong. Please try again.");
			}
		} catch (error) {
			setStatus("error");
			setMessage("Network error. Please check your connection and try again.");
		} finally {
			setIsLoading(false);
		}
	};

	if (status === "success") {
		return (
			<div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
				<div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
					<svg
						className="w-6 h-6 text-green-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<p className="text-green-800 font-russo text-sm font-bold">
					Thank you for subscribing!
				</p>
				<p className="text-green-600 font-outfit text-xs mt-1">
					Check your inbox for a welcome message.
				</p>
			</div>
		);
	}

	return (
		<div>
			<h3 className="font-russo text-gray-900 text-sm mb-6 uppercase tracking-[0.2em] font-bold flex items-center gap-2">
				<div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
				Newsletter
			</h3>

			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					placeholder="First name"
					className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-outfit text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
					disabled={isLoading}
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Your email address"
					required
					className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-outfit text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
					disabled={isLoading}
				/>
				<button
					type="submit"
					disabled={isLoading}
					className="relative inline-flex items-center justify-center font-russo font-bold uppercase tracking-wide transition-all duration-300 transform-gpu overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-sm bg-black text-white border border-black hover:bg-gray-900 hover:border-gray-900 hover:scale-105 hover:shadow-xl hover:shadow-black/20 rounded-xl w-full"
				>
					{/* Background effects */}
					<div className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10"></div>

					{/* Shimmer effect */}
					<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

					{/* Border glow */}
					<div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>

					{/* Content */}
					<span className="relative z-10 flex items-center gap-2">
						{isLoading ? "Joining..." : "Join Newsletter"}
					</span>

					{/* Corner accents */}
					<div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-current opacity-0 group-hover:opacity-40 transition-all duration-300 group-hover:scale-150"></div>
					<div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-current opacity-0 group-hover:opacity-40 transition-all duration-300 group-hover:scale-150"></div>
					<div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-current opacity-0 group-hover:opacity-40 transition-all duration-300 group-hover:scale-150"></div>
					<div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-current opacity-0 group-hover:opacity-40 transition-all duration-300 group-hover:scale-150"></div>
				</button>
			</form>

			{status === "error" && (
				<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-red-700 text-xs font-outfit">{message}</p>
				</div>
			)}

			<p className="mt-4 text-xs text-gray-500 font-outfit text-center">
				No spam, ever. Unsubscribe anytime.
			</p>
		</div>
	);
};
