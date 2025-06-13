"use client";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiBook, BiLock, BiVideo } from "react-icons/bi";
import { IoBookOutline } from "react-icons/io5";
import { useSmartNavbar } from "@/hooks/useSmartNavbar";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export default function SiteNavbar() {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [scrollY, setScrollY] = useState(0);
	const navbarTheme = useSmartNavbar();
	
	// Track scroll for subtle effects
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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

	const Links = [
		{ href: "/story", label: "Story", icon: "story" },
		{ href: "/services", label: "Services", icon: "video" },
		{
			href: "https://www.youtube.com/@realitydesigners",
			label: "Videos",
			icon: "video",
		},
		{ href: "#", label: "Library", icon: "lock" },
		{ href: "/lab", label: "Lab", icon: "video" },
		{ href: "#", label: "Contact", icon: "lock" },
	];

	const getIcon = (name) => {
		const iconColor = navbarTheme === 'dark' ? '#fff' : '#000000';
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

	const isScrolled = scrollY > 50;

	return (
		<>
			{isNavOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					className="fixed inset-0 z-40 bg-black backdrop-blur-[.5em] lg:bg-black/20"
					onClick={handleBackdropClick}
				/>
			)}

			{/* Interdimensional Navbar Container */}
			<div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
				{/* Background blur layer */}
				<div 
					className={`absolute inset-0 transition-all duration-700 ${
						isScrolled ? 'h-14' : 'h-20'
					} ${
						navbarTheme === 'dark' 
							? 'bg-gradient-to-b from-black/30 via-black/20 to-transparent backdrop-blur-xl' 
							: 'bg-gradient-to-b from-white/30 via-white/20 to-transparent backdrop-blur-xl'
					}`}
				></div>
				
				{/* Morphing navbar */}
				<nav
					id="navbar"
					className={`relative transition-all duration-700 pointer-events-auto ${
						isScrolled 
							? 'mx-0 mt-0 rounded-none' 
							: 'mx-3 mt-3 lg:mx-6 lg:mt-4 rounded-2xl'
					} ${
						isScrolled 
							? (navbarTheme === 'dark' 
								? 'bg-black/90 border-b border-white/20 shadow-lg backdrop-blur-sm' 
								: 'bg-white/90 border-b border-gray-900/20 shadow-lg backdrop-blur-sm')
							: (navbarTheme === 'dark' 
								? 'bg-black/15 border border-white/10 shadow-xl shadow-black/30 backdrop-blur-2xl' 
								: 'bg-white/15 border border-gray-900/10 shadow-xl shadow-gray-900/15 backdrop-blur-2xl')
					}`}
				>
		
					
					{/* Main navbar content */}
					<div className="relative z-10 flex h-14 w-full items-center justify-between px-4 lg:px-8">
						{/* Left side - Logo */}
						<div className="flex items-center ">
							<Link
								href="/"
								className={`flex items-center gap-2 transition-all duration-500 transform ${
									navbarTheme === 'dark' ? 'text-white' : 'text-black'
								}`}
								onClick={closeNav}
							>
									<Logo 
										size={30} 
										iconColor={navbarTheme === 'dark' ? '#fff' : '#1f2937'} 
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
						<div className="hidden lg:flex items-center gap-1">
							{Links.map(({ href, label, icon }, index) => (
								<Link
									key={label}
									href={href}
									className={`group relative px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
										navbarTheme === 'dark' 
											? 'hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10' 
											: 'hover:bg-black/5 text-black hover:text-white border border-transparent hover:border-black/10'
									}`}
									style={{ 
										animationDelay: `${index * 50}ms`
									}}
								>
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 flex items-center justify-center">
											{getIcon(icon)}
										</div>
										<span className="font-russo text-xs font-bold uppercase tracking-wide">
											{label}
										</span>
									</div>
									
									{/* Subtle hover effect */}
									<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</Link>
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
										navbarTheme === 'dark' 
											? 'hover:bg-white/10 text-white border border-white/10' 
											: 'hover:bg-black/10 text-white border border-black/10'
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
							backgroundSize: '40px 40px',
							animation: 'gridFloat 20s ease-in-out infinite'
						}}
					></div>
					
					{/* Floating geometric shapes */}
					<div className="absolute inset-0 overflow-hidden">
						<div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
						<div className="absolute top-3/4 right-1/4 w-24 h-24 border border-white/5 rotate-45 animate-spin" style={{animationDuration: '30s'}}></div>
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
									style={{ animationDelay: `${index * 100}ms` }}
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
