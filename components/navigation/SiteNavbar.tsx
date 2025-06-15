"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiBook, BiLock, BiVideo } from "react-icons/bi";
import { IoBookOutline } from "react-icons/io5";
import { useSmartNavbar } from "@/hooks/useSmartNavbar";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import DropdownPanel from "@/components/navigation/DropdownPanel";
import { Links } from "@/constants";

export default function SiteNavbar() {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [scrollY, setScrollY] = useState(0);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isScrollingDown, setIsScrollingDown] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
	const [isAnyDropdownActive, setIsAnyDropdownActive] = useState(false);
	const [isNavbarHovered, setIsNavbarHovered] = useState(false);
	const { theme: navbarTheme, isReady } = useSmartNavbar();
	const [showNavbar, setShowNavbar] = useState(false);

	// Track scroll direction
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			
			// Determine scroll direction
			if (currentScrollY > lastScrollY && currentScrollY > 50) {
				// Scrolling down and past threshold
				setIsScrollingDown(true);
			} else if (currentScrollY < lastScrollY) {
				// Scrolling up
				setIsScrollingDown(false);
			}
			
			setScrollY(currentScrollY);
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	// Show navbar with fade-in once theme is determined
	useEffect(() => {
		if (isReady && navbarTheme) {
			// Small delay for smooth fade-in animation
			const timer = setTimeout(() => {
				setShowNavbar(true);
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [isReady, navbarTheme]);

	// Handle navbar area hover - keeps dropdowns open while in navbar zone
	const handleNavbarEnter = () => {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			setHoverTimeout(null);
		}
		setIsNavbarHovered(true);
	};

	const handleNavbarLeave = () => {
		setIsNavbarHovered(false);
		const timeout = setTimeout(() => {
			setActiveDropdown(null);
			setIsAnyDropdownActive(false);
		}, 200); // Slightly longer delay for smoother experience
		setHoverTimeout(timeout);
	};

	// Handle individual dropdown button hover
	const handleDropdownEnter = (label: string) => {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			setHoverTimeout(null);
		}
		setActiveDropdown(label);
		setIsAnyDropdownActive(true);
	};

	// Handle dropdown panel hover (when moving from button to dropdown content)
	const handleDropdownPanelEnter = () => {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			setHoverTimeout(null);
		}
	};

	const handleDropdownPanelLeave = () => {
		if (!isNavbarHovered) {
			const timeout = setTimeout(() => {
				setActiveDropdown(null);
				setIsAnyDropdownActive(false);
			}, 200);
			setHoverTimeout(timeout);
		}
	};

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
		document.body.style.overflow = isNavOpen ? "auto" : "hidden";
	};
	const closeNav = () => {
		setIsNavOpen(false);
		document.body.style.overflow = "auto";
	};
	const handleBackdropClick = () => {
		closeNav();
	};

	// Clean navbar styling logic
	const getNavbarStyles = () => {
		const baseClasses = "relative transition-all duration-300 pointer-events-auto";
		
		if (isFlat) {
			// Flat (scrolled) version - gradient from top to bottom transparent, no blur, no shadow
			const flatClasses = "mx-0 mt-0 rounded-none";
			const flatBackground = navbarTheme === "dark" 
				? "bg-gradient-to-b from-black/90 via-black/50 to-black/10 border border-transparent"
				: "bg-gradient-to-b from-white/90 via-white/50 to-white/10 border border-transparent";
			
			return `${baseClasses} ${flatClasses} ${flatBackground}`;
		} else {
			// Rounded (top) version - solid with blur
			const roundedClasses = "mx-3 mt-3 lg:mx-6 lg:mt-4 rounded-2xl";
			const roundedBackground = navbarTheme === "dark"
				? "bg-black/50 border border-white/10 shadow-lg shadow-black/10 backdrop-blur-2xl"
				: "bg-white/50 border border-gray-900/10 shadow-lg shadow-black/10 backdrop-blur-2xl";
			
			return `${baseClasses} ${roundedClasses} ${roundedBackground}`;
		}
	};

	const getIcon = (name) => {
		const iconColor = navbarTheme === "dark" ? "#fff" : "#000000";
		const icons = {
			menu: (
				// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
				<svg
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
					stroke={iconColor}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
					/>
				</svg>
			),
			library: <BiBook size={18} color={iconColor} />,
			lock: <BiLock size={18} color={iconColor} />,
			story: <IoBookOutline size={18} color={iconColor} />,
			video: <BiVideo size={18} color={iconColor} />,
		};
		return icons[name] || null;
	};

	// Use scroll direction for navbar styling
	const isFlat = isScrollingDown;

	return (
		<>
			{isNavOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					className="fixed inset-0 z-40 bg-black "
					onClick={handleBackdropClick}
				/>
			)}

			{/* Interdimensional Navbar Container */}
			<div 
				className={`fixed top-0 left-0 right-0 z-[9999] pointer-events-none transition-opacity duration-500 ease-out ${
					showNavbar ? 'opacity-100' : 'opacity-0'
				}`}
			>
				{/* Morphing navbar */}
				<nav
					id="navbar"
					className={getNavbarStyles()}
					style={{
						// CSS custom properties for smoother theme transitions
						'--text-color': navbarTheme === "dark" ? '#ffffff' : '#000000',
						'--text-color-secondary': navbarTheme === "dark" ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.8)',
					} as React.CSSProperties}
				>
					{/* Main navbar content */}
					<div className="relative z-10 flex h-14 w-full items-center justify-between px-4 lg:px-">
						{/* Left side - Logo */}
						<div className="flex items-center ">
							<Link
								href="/"
								className={`flex items-center gap-2 transition-all duration-500 transform ${
									navbarTheme === "dark" ? "text-white" : "text-black"
								}`}
								onClick={closeNav}
							>
								<Logo
									size={30}
									iconColor={navbarTheme === "dark" ? "#fff" : "#1f2937"}
								/>

								<div className="flex flex-col">
									<span className="font-russo text-md  leading-none tracking-wider">
										REALITY
									</span>
									<span className="font-russo text-xs  leading-none tracking-wider">
										DESIGNERS
									</span>
								</div>
							</Link>
						</div>

						{/* Center - Desktop Navigation */}
						<div
							className="hidden lg:flex items-center gap-1 relative"
							onMouseEnter={handleNavbarEnter}
							onMouseLeave={handleNavbarLeave}
						>
							{Links.map(({ href, label, icon, dropdown }, index) => (
								<div
									key={label}
									className="relative"
									onMouseEnter={() => dropdown && handleDropdownEnter(label)}
								>
									<Link
										href={href}
										className={`group relative px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 block ${
											navbarTheme === "dark"
												? `hover:bg-white/5 text-white/80 hover:text-white border border-transparent hover:border-white/10 ${
														activeDropdown === label
															? "bg-white/5 text-white"
															: ""
												  }`
												: `hover:bg-black/5 text-black/80 hover:text-black border border-transparent hover:border-black/10 ${
														activeDropdown === label
															? "bg-black/5 text-black"
															: ""
												  }`
										}`}
										style={{
											animationDelay: `${index * 50}ms`,
										}}
									>
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 flex items-center justify-center">
												{getIcon(icon)}
											</div>
											<span className="font-russo text-xs font-bold uppercase tracking-wide">
												{label}
											</span>
											{dropdown && (
												<svg
													className={`w-3 h-3 transition-transform duration-200 ${
														activeDropdown === label ? "rotate-180" : ""
													}`}
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											)}
										</div>

										{/* Subtle hover effect */}
										<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</Link>

									{/* Individual dropdown content - only render for active item */}
									{activeDropdown === label && (
										<DropdownPanel
											dropdown={dropdown}
											isActive={true}
											navbarTheme={navbarTheme}
											onMouseEnter={handleDropdownPanelEnter}
											onMouseLeave={handleDropdownPanelLeave}
											onLinkClick={() => setActiveDropdown(null)}
											type={label.toLowerCase()}
										/>
									)}
								</div>
							))}
						</div>

						{/* Right side - Action buttons and mobile menu */}
						<div className="flex items-center gap-3">
							{/* Desktop action buttons */}
							<div className="hidden lg:flex items-center gap-3">
								<Button
									variant="navbar"
									size="sm"
									href="/login"
									theme={navbarTheme}
									className="text-xs"
								>
									Login
								</Button>
								<Button
									variant="primary"
									size="sm"
									href="/contact"
									theme={navbarTheme}
									className="text-xs"
								>
									Work with us
								</Button>
							</div>

							{/* Mobile menu button */}
							<div className="lg:hidden">
								<button
									type="button"
									onClick={toggleNav}
									className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
										navbarTheme === "dark"
											? "hover:bg-white/10 text-white border border-white/10"
											: "hover:bg-black/10 text-white border border-black/10"
									}`}
								>
									{getIcon("menu")}
								</button>
							</div>
						</div>
					</div>
				</nav>
			</div>

			{/* Mobile Navigation Menu */}
			<div
				className={`fixed inset-0 z-50 transform transition-all duration-500 lg:hidden ${
					isNavOpen
						? "translate-x-0 opacity-100"
						: "translate-x-full opacity-0 pointer-events-none"
				}`}
			>
				{/* Background with interdimensional effects */}
				<div className="absolute inset-0 bg-black/95 backdrop-blur-2xl">
					{/* Animated grid pattern */}
					<div
						className="absolute inset-0 opacity-20"
						style={{
							backgroundImage: `
								linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
								linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
							`,
							backgroundSize: "40px 40px",
							animation: "gridFloat 20s ease-in-out infinite",
						}}
					></div>

					{/* Floating geometric shapes */}
					<div className="absolute inset-0 overflow-hidden">
						<div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
						<div
							className="absolute top-3/4 right-1/4 w-24 h-24 border border-white/5 rotate-45 animate-spin"
							style={{ animationDuration: "30s" }}
						></div>
						<div className="absolute top-1/2 left-1/2 w-16 h-16 border border-white/10 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-1000"></div>
					</div>

					{/* Gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"></div>
				</div>

				{/* Mobile menu content */}
				<div className="relative z-10 flex h-full flex-col">
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-white/10">
						<Link
							href="/"
							className="flex items-center gap-3 text-white"
							onClick={closeNav}
						>
							<div className="p-2 rounded-xl bg-white/10 border border-white/20">
								<Logo size={24} iconColor="#fff" />
							</div>
							<div className="flex flex-col">
								<span className="font-russo text-lg font-bold leading-none tracking-wide">
									REALITY
								</span>
								<span className="font-russo text-xs leading-none tracking-wider opacity-70">
									DESIGNERS
								</span>
							</div>
						</Link>
						<button
							type="button"
							onClick={toggleNav}
							className="p-2 rounded-xl hover:bg-white/10 text-white border border-white/10"
						>
							{getIcon("menu")}
						</button>
					</div>

					{/* Navigation links */}
					<div className="flex-1 px-6 py-8">
						<div className="space-y-4">
							{Links.map(({ href, label, icon }, index) => (
								<Link
									key={label}
									href={href}
									onClick={closeNav}
									className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-white/80 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
									style={{ animationDelay: `${index * 50}ms` }}
								>
									<div className="w-6 h-6 flex items-center justify-center">
										{getIcon(icon)}
									</div>
									<span className="font-russo text-lg font-bold uppercase tracking-wide">
										{label}
									</span>
								</Link>
							))}
						</div>

						{/* Mobile action buttons */}
						<div className="mt-8 pt-8 border-t border-white/10 space-y-4">
							<Button
								variant="secondary"
								size="md"
								href="/login"
								className="w-full"
								onClick={closeNav}
							>
								Login
							</Button>
							<Button
								variant="primary"
								size="md"
								href="/contact"
								className="w-full"
								onClick={closeNav}
							>
								Work with us
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
