"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface NewsletterSignupProps {
	className?: string;
	title?: string;
	description?: string;
	variant?: "default" | "minimal" | "featured";
}

export default function NewsletterSignup({ 
	className = "",
	title = "Stay in the Loop",
	description = "Get notified when we drop new videos, articles, and insights about the future of design.",
	variant = "default"
}: NewsletterSignupProps) {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
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
					lastName
					// audienceId will be handled server-side from env
				}),
			});

			const result = await response.json();

			if (result.success) {
				setStatus("success");
				setMessage("🎉 Welcome to the Reality Designers community!");
				setEmail("");
				setFirstName("");
				setLastName("");
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

	if (variant === "minimal") {
		return (
			<div className={`${className}`}>
				<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none text-sm"
						disabled={isLoading}
					/>
					<button
						type="submit"
						disabled={isLoading}
						className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 whitespace-nowrap"
					>
						{isLoading ? "Joining..." : "Join Newsletter"}
					</button>
				</form>
				
				{status !== "idle" && (
					<p className={`mt-2 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
						{message}
					</p>
				)}
			</div>
		);
	}

	if (variant === "featured") {
		return (
			<div className={`relative overflow-hidden ${className}`}>
				{/* Background Pattern */}
				<div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
					<div className="absolute inset-0 opacity-30">
						<div className="absolute inset-0 bg-black"></div>
					</div>
				</div>
				
				{/* Content */}
				<div className="relative z-10 px-6 py-12 lg:px-12 lg:py-16">
					<div className="max-w-3xl mx-auto text-center">
						{/* Icon */}
						<div className="mb-6">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
						</div>

						{/* Brand Badge */}
						<div className="mb-4">
							<span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-wider text-white bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
								Reality Designers
							</span>
						</div>

						{/* Title */}
						<h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-russo">
							{title}
						</h3>

						{/* Description */}
						<p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
							{description}
						</p>

						{/* Form */}
						<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
								<input
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									placeholder="First name"
									className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none backdrop-blur-sm"
									disabled={isLoading}
								/>
								<input
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									placeholder="Last name"
									className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none backdrop-blur-sm"
									disabled={isLoading}
								/>
							</div>
							
							<div className="flex flex-col sm:flex-row gap-3">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email address"
									required
									className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none backdrop-blur-sm"
									disabled={isLoading}
								/>
								<button
									type="submit"
									disabled={isLoading}
									className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 whitespace-nowrap"
								>
									{isLoading ? "Joining..." : "Join Newsletter"}
								</button>
							</div>
						</form>

						{/* Status Message */}
						{status !== "idle" && (
							<div className={`mt-4 p-4 rounded-lg ${
								status === "success" 
									? "bg-green-500/20 border border-green-500/30 text-green-200" 
									: "bg-red-500/20 border border-red-500/30 text-red-200"
							}`}>
								{message}
							</div>
						)}

						{/* Privacy Note */}
						<p className="mt-6 text-sm text-gray-400">
							No spam, ever. Unsubscribe anytime with one click.
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Default variant
	return (
		<div className={`bg-gray-50 rounded-2xl p-8 ${className}`}>
			<div className="max-w-md mx-auto text-center">
				<h3 className="text-2xl font-bold text-gray-900 mb-2 font-russo">
					{title}
				</h3>
				<p className="text-gray-600 mb-6">
					{description}
				</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="First name"
							className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none text-sm"
							disabled={isLoading}
						/>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Last name"
							className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none text-sm"
							disabled={isLoading}
						/>
					</div>
					
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email address"
						required
						className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none text-sm"
						disabled={isLoading}
					/>
					
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50"
					>
						{isLoading ? "Joining..." : "Join Newsletter"}
					</button>
				</form>

				{status !== "idle" && (
					<div className={`mt-4 p-3 rounded-lg text-sm ${
						status === "success" 
							? "bg-green-100 text-green-800 border border-green-200" 
							: "bg-red-100 text-red-800 border border-red-200"
					}`}>
						{message}
					</div>
				)}

				<p className="mt-4 text-xs text-gray-500">
					No spam, ever. Unsubscribe anytime.
				</p>
			</div>
		</div>
	);
} 