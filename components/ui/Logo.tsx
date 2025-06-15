"use client";
import React from "react";

interface LogoProps {
	size?: number;
	className?: string;
	iconColor?: string;
}

export default function Logo({
	size = 24,
	className = "",
	iconColor = "#fff",
}: LogoProps) {
	// Determine if we're using dark or light theme based on iconColor
	const isDark = iconColor === "#fff";
	const scanColor = isDark ? "white" : "black";

	return (
		<div className={`relative group cursor-pointer ${className}`}>
			{/* Logo with rotation animation */}
			<div className="relative transition-all duration-500 ease-out group-hover:rotate-[360deg] group-hover:scale-105">
				<svg
					width={size}
					height={size}
					viewBox="0 0 80 80"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="transition-all duration-500"
				>
					<path
						d="M47.1279 70.8731L33.5967 55.3087M43.4729 23.3416L10.6978 28.9689L33.5967 55.3087M43.4729 23.3416L33.5967 55.3087M43.4729 23.3416L68.3831 51.4708L33.5967 55.3087M43.4729 23.3416L30.6805 9.58502"
						stroke={iconColor}
						strokeWidth="6"
						className="transition-all duration-500 group-hover:stroke-[7]"
					/>
				</svg>
			</div>

			{/* Futuristic scan frame */}
			<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
				{/* Corner brackets */}
				<div
					className="absolute -top-0.5 -left-0.5 w-2 h-2 border-l border-t transition-all duration-500 group-hover:scale-110"
					style={{ borderColor: `${scanColor}60` }}
				></div>
				<div
					className="absolute -top-0.5 -right-0.5 w-2 h-2 border-r border-t transition-all duration-500 group-hover:scale-110"
					style={{ borderColor: `${scanColor}60` }}
				></div>
				<div
					className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-l border-b transition-all duration-500 group-hover:scale-110"
					style={{ borderColor: `${scanColor}60` }}
				></div>
				<div
					className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-r border-b transition-all duration-500 group-hover:scale-110"
					style={{ borderColor: `${scanColor}60` }}
				></div>
			</div>
		</div>
	);
}
