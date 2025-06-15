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
				{/* Revolutionary Light Background System */}
				<div className="absolute inset-0">
					{/* Base light gradient */}
					<div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
					
					{/* Advanced mesh gradient overlay - light version */}
					<div 
						className="absolute inset-0 opacity-40"
						style={{
							background: `
								radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
								radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
								radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
								linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(168, 85, 247, 0.02) 100%)
							`
						}}
					/>
					
					{/* Revolutionary grid system - light version */}
					<div 
						className="absolute inset-0"
						style={{
							backgroundImage: `
								linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
								linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
								linear-gradient(rgba(168, 85, 247, 0.04) 1px, transparent 1px),
								linear-gradient(90deg, rgba(168, 85, 247, 0.04) 1px, transparent 1px)
							`,
							backgroundSize: "120px 120px, 120px 120px, 40px 40px, 40px 40px"
						}}
					/>

					{/* Floating geometric shapes - light version */}
					<div className="absolute inset-0">
						<div className="absolute top-12 left-12 w-24 h-24 border border-blue-200/30 rounded-full animate-pulse"></div>
						<div className="absolute top-16 right-16 w-16 h-16 border border-purple-200/40 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
						<div className="absolute bottom-12 left-20 w-8 h-8 border border-pink-200/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
						<div className="absolute bottom-20 right-12 w-12 h-12 border border-blue-300/30 rotate-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
					</div>
				</div>
				
				{/* Content */}
				<div className="relative z-10 px-6 py-16 lg:px-12 lg:py-20">
					<div className="max-w-4xl mx-auto text-center">
						{/* Future Agency Badge - Light Version */}
						<div className="mb-8">
							<div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl hover:shadow-blue-500/20 hover:scale-105 hover:bg-white/80 transition-all duration-500 group">
								<div className="relative">
									<div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
									<div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full blur-sm opacity-60 animate-pulse"></div>
								</div>
								<span className="font-russo text-black text-sm tracking-[0.3em] uppercase font-bold group-hover:text-gray-900 transition-colors">
									INTELLIGENCE NETWORK
								</span>
							</div>
						</div>

						{/* Revolutionary Title - Light Version */}
						<div className="mb-8">
							<h3 className="font-russo font-black text-5xl lg:text-6xl text-black mb-4 leading-[0.9] tracking-tight">
								{title}
							</h3>
							<div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
						</div>

						{/* Enhanced Description - Light Version */}
						<p className="text-xl lg:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-outfit">
							{description}
						</p>

						{/* Advanced Form - Light Version */}
						<form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
								<div className="relative group">
									<input
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										placeholder="First name"
										className="w-full px-6 py-4 rounded-2xl bg-white/70 border border-gray-200/50 text-black placeholder-gray-500 focus:border-blue-400/50 focus:outline-none backdrop-blur-xl transition-all duration-300 group-hover:bg-white/80 focus:bg-white/90 focus:scale-105 shadow-lg"
										disabled={isLoading}
									/>
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
								</div>
								<div className="relative group">
									<input
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										placeholder="Last name"
										className="w-full px-6 py-4 rounded-2xl bg-white/70 border border-gray-200/50 text-black placeholder-gray-500 focus:border-blue-400/50 focus:outline-none backdrop-blur-xl transition-all duration-300 group-hover:bg-white/80 focus:bg-white/90 focus:scale-105 shadow-lg"
										disabled={isLoading}
									/>
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
								</div>
							</div>
							
							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<div className="relative group flex-1">
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your neural network address"
										required
										className="w-full px-6 py-4 rounded-2xl bg-white/70 border border-gray-200/50 text-black placeholder-gray-500 focus:border-blue-400/50 focus:outline-none backdrop-blur-xl transition-all duration-300 group-hover:bg-white/80 focus:bg-white/90 focus:scale-105 shadow-lg"
										disabled={isLoading}
									/>
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
								</div>
								<button
									type="submit"
									disabled={isLoading}
									className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-russo font-bold uppercase tracking-wider hover:scale-105 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 whitespace-nowrap overflow-hidden"
								>
									<span className="relative z-10">
										{isLoading ? "CONNECTING..." : "JOIN NETWORK"}
									</span>
									<div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</button>
							</div>
						</form>

						{/* Status Message with enhanced styling - Light Version */}
						{status !== "idle" && (
							<div className={`mb-8 p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 transform ${
								status === "success" 
									? "bg-green-100/80 border-green-300/50 text-green-800 scale-105" 
									: "bg-red-100/80 border-red-300/50 text-red-800 scale-105"
							}`}>
								<div className="flex items-center justify-center gap-3">
									{status === "success" ? (
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									) : (
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									)}
									<span className="font-outfit font-semibold">{message}</span>
								</div>
							</div>
						)}

						{/* Enhanced Privacy Note - Light Version */}
						<div className="flex items-center justify-center gap-2 text-gray-600 mb-8">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
							<p className="text-sm font-outfit">
								Quantum-encrypted • Zero spam • One-click unsubscribe
							</p>
						</div>

						{/* Stats - Light Version */}
						<div className="flex justify-center gap-8 sm:gap-12 pt-8 border-t border-gray-200">
							<div className="text-center">
								<div className="text-2xl sm:text-3xl font-russo font-black text-black mb-1">2.5K+</div>
								<div className="text-xs text-gray-500 uppercase tracking-wider font-russo font-bold">DESIGNERS</div>
							</div>
							<div className="text-center">
								<div className="text-2xl sm:text-3xl font-russo font-black text-black mb-1">∞</div>
								<div className="text-xs text-gray-500 uppercase tracking-wider font-russo font-bold">INSIGHTS</div>
							</div>
							<div className="text-center">
								<div className="text-2xl sm:text-3xl font-russo font-black text-black mb-1">24/7</div>
								<div className="text-xs text-gray-500 uppercase tracking-wider font-russo font-bold">NETWORK</div>
							</div>
						</div>
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