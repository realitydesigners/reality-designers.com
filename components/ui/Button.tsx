"use client";
import React from "react";
import Link from "next/link";

interface ButtonProps {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "outline" | "navbar";
	size?: "sm" | "md" | "lg";
	href?: string;
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
	theme?: "dark" | "light";
}

export default function Button({
	children,
	variant = "primary",
	size = "md",
	href,
	onClick,
	className = "",
	disabled = false,
	theme = "dark",
}: ButtonProps) {
	const baseClasses =
		"relative inline-flex items-center justify-center font-russo font-bold uppercase tracking-wide transition-all duration-300 transform-gpu overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";

	const sizeClasses = {
		sm: "px-4 py-2 text-xs",
		md: "px-6 py-3 text-sm",
		lg: "px-8 py-4 text-base",
	};

	const variantClasses = {
		primary:
			theme === "dark"
				? "bg-white text-black border border-white hover:bg-gray-100 hover:border-gray-100 hover:scale-105 hover:shadow-xl hover:shadow-white/20"
				: "bg-black text-white border border-black hover:bg-gray-900 hover:border-gray-900 hover:scale-105 hover:shadow-xl hover:shadow-black/20",
		secondary:
			theme === "dark"
				? "bg-black text-white border border-black hover:bg-gray-900 hover:border-gray-900 hover:scale-105 hover:shadow-xl hover:shadow-black/20"
				: "bg-white text-black border border-white hover:bg-gray-100 hover:border-gray-100 hover:scale-105 hover:shadow-xl hover:shadow-white/20",
		outline:
			"bg-transparent text-current border border-current hover:bg-current hover:text-white hover:scale-105",
		navbar:
			theme === "dark"
				? "bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/30 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
				: "bg-black/10 text-black border border-black/20 backdrop-blur-sm hover:bg-black/20 hover:border-black/30 hover:scale-105 hover:shadow-lg hover:shadow-black/10",
	};

	const roundedClasses = "rounded-xl";

	const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${roundedClasses} ${className}`;

	const ButtonContent = () => (
		<>
			{/* Background effects - enhanced for navbar variant */}
			<div
				className={`absolute inset-0 transition-all duration-300 ${
					variant === "navbar"
						? "bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5"
						: "bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10"
				}`}
			></div>

			{/* Shimmer effect - more subtle for navbar */}
			<div
				className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12 ${
					variant === "navbar"
						? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
						: "bg-gradient-to-r from-transparent via-white/20 to-transparent"
				}`}
			></div>

			{/* Border glow - adaptive for navbar */}
			<div
				className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10 ${
					variant === "navbar"
						? theme === "dark"
							? "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
							: "bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15"
						: "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
				}`}
			></div>

			{/* Content */}
			<span className="relative z-10 flex items-center gap-2">{children}</span>

			{/* Corner accents - more subtle for navbar */}
			<div
				className={`absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-current opacity-0 group-hover:opacity-40 transition-all duration-300 ${
					variant === "navbar"
						? "group-hover:scale-125"
						: "group-hover:scale-150"
				}`}
			></div>
			<div
				className={`absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-current opacity-0 group-hover:opacity-40 transition-all duration-300 ${
					variant === "navbar"
						? "group-hover:scale-125"
						: "group-hover:scale-150"
				}`}
			></div>
			<div
				className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-current opacity-0 group-hover:opacity-40 transition-all duration-300 ${
					variant === "navbar"
						? "group-hover:scale-125"
						: "group-hover:scale-150"
				}`}
			></div>
			<div
				className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-current opacity-0 group-hover:opacity-40 transition-all duration-300 ${
					variant === "navbar"
						? "group-hover:scale-125"
						: "group-hover:scale-150"
				}`}
			></div>
		</>
	);

	if (href) {
		return (
			<Link href={href} className={buttonClasses}>
				<ButtonContent />
			</Link>
		);
	}

	return (
		<button onClick={onClick} disabled={disabled} className={buttonClasses}>
			<ButtonContent />
		</button>
	);
}
