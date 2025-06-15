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
			<div className={`relative bg-white ${className}`}>
				{/* Simple Background Accent */}
				<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-30"></div>
				
				{/* Main Content */}
				<div className="relative px-6 py-16">
					<div className="max-w-lg mx-auto text-center">
						
						{/* Icon & Badge */}
						<div className="mb-8">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4">
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
							<div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
								<span className="font-russo text-xs uppercase tracking-wider font-bold text-gray-700">Newsletter</span>
							</div>
						</div>

						{/* Heading */}
						<div className="mb-8">
							<h3 className="font-russo font-black text-3xl text-black mb-4 leading-tight">
								{title}
							</h3>
							<p className="text-lg text-gray-600 font-outfit leading-relaxed">
								{description}
							</p>
						</div>

						{/* Form */}
						<div className="bg-gray-50 rounded-2xl p-6 mb-6">
							<form onSubmit={handleSubmit} className="space-y-4">
								{/* Name Fields */}
								<div className="flex gap-3">
									<input
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										placeholder="First name"
										className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none bg-white transition-all duration-300"
										disabled={isLoading}
									/>
									<input
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										placeholder="Last name"
										className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none bg-white transition-all duration-300"
										disabled={isLoading}
									/>
								</div>
								
								{/* Email Field */}
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Your email address"
									required
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none bg-white transition-all duration-300"
									disabled={isLoading}
								/>
								
								{/* Submit Button */}
								<button
									type="submit"
									disabled={isLoading}
									className="w-full px-6 py-3 rounded-xl bg-black text-white font-russo font-bold uppercase tracking-wide hover:bg-gray-800 disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02]"
								>
									{isLoading ? "Joining..." : "Join Newsletter"}
								</button>
							</form>

							{/* Status Message */}
							{status !== "idle" && (
								<div className={`mt-4 p-4 rounded-xl text-sm ${
									status === "success" 
										? "bg-green-100 text-green-700 border border-green-200" 
										: "bg-red-100 text-red-700 border border-red-200"
								}`}>
									<div className="flex items-center gap-2">
										{status === "success" ? (
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
											</svg>
										) : (
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										)}
										<span className="font-outfit">{message}</span>
									</div>
								</div>
							)}
						</div>

						{/* Trust Indicators */}
						<div className="flex items-center justify-center gap-6 text-sm text-gray-500">
							<div className="flex items-center gap-2">
								<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>No spam</span>
							</div>
							<div className="flex items-center gap-2">
								<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
								<span>Unsubscribe anytime</span>
							</div>
						</div>

						{/* Social Proof */}
						<div className="mt-6 text-center">
							<p className="text-sm text-gray-500 font-outfit">
								Join <span className="font-semibold text-black">100+</span> people who are designing their reality
							</p>
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