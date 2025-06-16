"use client";
import { SanityImage } from "@/components/global/Images";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const Heading = ({ heading, className }) => {
	if (!heading) return null;
	const displayHeading = heading || "No title";
	return <h1 className={className}>{displayHeading}</h1>;
};

const SubHeading = ({ heading, className }) => {
	if (!heading) return null;
	const displayHeading = heading || "No subtitle";
	return <h2 className={className}>{displayHeading}</h2>;
};

interface FormattedDateProps {
	date?: string;
	className?: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date, className }) => {
	const formattedDate = date
		? new Date(date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
		  })
		: "Date not available";

	return <span className={className}>{formattedDate}</span>;
};

const HeadingBlock = ({ block }) => {
	const { className, publicationDate } = block;
	const params = useParams();
	const slug = params?.slug as string;
	const [scrollProgress, setScrollProgress] = useState(0);
	const heroRef = useRef<HTMLDivElement>(null);

	const theme = block.className;
	const imageUrl = block.imageRef?.imageUrl;
	const imageAlt = block.imageRef?.imageAlt;

	// Scroll tracking for parallax effect
	useEffect(() => {
		const handleScroll = () => {
			if (!heroRef.current) return;

			const rect = heroRef.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Calculate scroll progress (0 to 1)
			// When rect.top = 0 (hero at top), progress should be 0
			// When rect.top = -windowHeight (hero scrolled past), progress should be 1
			const progress = Math.max(0, Math.min(1, -rect.top / windowHeight));

			setScrollProgress(progress);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Initial call
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	switch (theme) {
		case "dark":
			return (
				<>
					{/* Full-Screen Hero Section with Padding */}
					<div
						ref={heroRef}
						className="relative w-full h-screen pt-16 pb-4 px-4 md:pt-20 md:pb-6 md:px-6 lg:pt-24 lg:pb-8 lg:px-8"
					>
						<div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
							{/* Background Image with Parallax */}
							<div
								className="absolute inset-0 w-full h-full"
								style={{
									transform: `translateY(${scrollProgress * 50}px)`,
									opacity: 1 - scrollProgress * 0.8,
								}}
							>
								<Image
									src={imageUrl}
									alt={imageAlt || "Post image"}
									fill
									className="object-cover"
									style={{
										viewTransitionName: `post-image-${slug}`,
									}}
									priority
								/>
								{/* Dark overlay for text readability */}
								<div className="absolute inset-0 bg-black/40" />
							</div>

							{/* Floating UI Elements */}
							<div className="absolute inset-0 pointer-events-none z-10">
								{/* Top Bar - Category and Date */}
								<div className="absolute top-8 left-8 right-8 flex items-center justify-between">
									{block.category && (
										<div
											className="transition-all duration-500"
											style={{
												opacity: 1 - scrollProgress * 2,
												transform: `translateY(${scrollProgress * 20}px)`,
											}}
										>
											<span className="inline-block px-3 py-1 rounded-full text-xs font-russo uppercase tracking-wide font-bold bg-white/90 text-black border border-white/50 backdrop-blur-xl shadow-sm">
												{block.category.title.toUpperCase()}
											</span>
										</div>
									)}

									<div
										className="transition-all duration-500"
										style={{
											opacity: 1 - scrollProgress * 2,
											transform: `translateY(${scrollProgress * 20}px)`,
										}}
									>
										<FormattedDate
											date={publicationDate}
											className="text-white/80 font-kodemono text-xs uppercase tracking-widest bg-black/50 backdrop-blur-xl px-3 py-1 rounded-full"
										/>
									</div>
								</div>

								{/* Center Content - Title and Subtitle */}
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="text-center max-w-4xl px-8">
										{/* Main Title */}
										<div
											className="transition-all duration-700 ease-out"
											style={{
												opacity: 1 - scrollProgress * 1.5,
												transform: `translateY(${
													scrollProgress * -30
												}px) scale(${1 - scrollProgress * 0.1})`,
											}}
										>
											<Heading
												heading={block.heading}
												className="font-russo text-white text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-none mb-6 drop-shadow-2xl"
											/>
										</div>

										{/* Subtitle */}
										<div
											className="transition-all duration-700 ease-out delay-100"
											style={{
												opacity: 1 - scrollProgress * 1.2,
												transform: `translateY(${scrollProgress * -20}px)`,
											}}
										>
											<SubHeading
												heading={block.subheading}
												className="text-white/90 font-outfit text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-lg max-w-2xl mx-auto"
											/>
										</div>

										{/* Author Info */}
										{block.team && (
											<div
												className="mt-8 transition-all duration-700 ease-out delay-200"
												style={{
													opacity: 1 - scrollProgress * 1.8,
													transform: `translateY(${scrollProgress * -10}px)`,
												}}
											>
												<div className="flex items-center justify-center gap-4">
													{block.team.image ? (
														<SanityImage
															image={block.team.image}
															alt={block.team.name || "Author"}
															width={120}
															height={120}
															classesWrapper="max-w-12 max-h-12 rounded-full border-2 border-white/50 shadow-lg"
															priority={false}
														/>
													) : (
														<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
															<span className="text-white font-russo font-bold text-sm">
																{block.team.name?.charAt(0) || "?"}
															</span>
														</div>
													)}
													<div className="text-left">
														<p className="font-outfit text-white font-semibold text-base drop-shadow-md">
															{block.team.name}
														</p>
														<p className="font-outfit text-white/80 text-sm drop-shadow-md">
															Reality Designer
														</p>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Content Section - Appears as image fades */}
					<div
						className="relative bg-black min-h-screen pt-16"
						style={{
							opacity: scrollProgress * 1.5,
							transform: `translateY(${(1 - scrollProgress) * 50}px)`,
						}}
					>
						<div className="max-w-4xl mx-auto px-8">
							{/* Image Caption */}
							{imageAlt && (
								<p className="text-gray-400 font-kodemono text-xs uppercase tracking-wide mb-8 text-center">
									{imageAlt}
								</p>
							)}

							{/* Content placeholder - this is where the rest of your content blocks would go */}
							<div className="text-white/80 font-outfit text-lg leading-relaxed space-y-6">
								<p>Content continues here as the hero image fades away...</p>
								<p>
									This is where your article content, additional blocks, and
									other components would be rendered.
								</p>
							</div>
						</div>
					</div>
				</>
			);
		case "light":
			return (
				<>
					{/* Full-Screen Hero Section with Padding */}
					<div
						ref={heroRef}
						className="relative w-full h-screen pt-16 pb-4 px-4 md:pt-20 md:pb-6 md:px-6 lg:pt-24 lg:pb-8 lg:px-8"
					>
						<div className="relative w-full h-full overflow-hidden rounded-xl">
							{/* Background Image with Parallax */}
							<div
								className="absolute inset-0 w-full h-full"
								style={{
									transform: `translateY(${scrollProgress * 50}px)`,
									opacity: 1 - scrollProgress * 0.8,
								}}
							>
								<Image
									src={imageUrl}
									alt={imageAlt || "Post image"}
									fill
									quality={100}
									className="object-cover"
									style={{
										viewTransitionName: `post-image-${slug}`,
									}}
									priority
								/>
								{/* Light overlay for text readability */}
								<div className="absolute inset-0 bg-white/20" />
							</div>

							{/* Floating UI Elements */}
							<div className="absolute inset-0 pointer-events-none z-10">
								{/* Top Bar - Category and Date */}
								<div className="absolute top-8 left-8 right-8 flex items-center justify-between">
									{block.category && (
										<div
											className="transition-all duration-500"
											style={{
												opacity: 1 - scrollProgress * 2,
												transform: `translateY(${scrollProgress * 20}px)`,
											}}
										>
											<span className="inline-block px-3 py-1 rounded-full text-xs font-russo uppercase tracking-wide font-bold bg-black/90 text-white border border-black/50 backdrop-blur-xl shadow-sm">
												{block.category.title.toUpperCase()}
											</span>
										</div>
									)}

									<div
										className="transition-all duration-500"
										style={{
											opacity: 1 - scrollProgress * 2,
											transform: `translateY(${scrollProgress * 20}px)`,
										}}
									>
										<FormattedDate
											date={publicationDate}
											className="text-black/80 font-kodemono text-xs uppercase tracking-widest bg-white/90 backdrop-blur-xl px-3 py-1 rounded-full border border-white/50"
										/>
									</div>
								</div>

								{/* Center Content - Title and Subtitle */}
								<div className="absolute inset-0 flex items-center justify-center z-90">
									<div className="text-center max-w-4xl px-8">
										{/* Main Title */}
										<div
											className="transition-all duration-700 ease-out"
											style={{
												opacity: 1 - scrollProgress * 1.5,
												transform: `translateY(${
													scrollProgress * -30
												}px) scale(${1 - scrollProgress * 0.1})`,
											}}
										>
											<Heading
												heading={block.heading}
												className="font-russo text-black text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-none mb-6 drop-shadow-2xl"
											/>
										</div>

										{/* Subtitle */}
										<div
											className="transition-all duration-700 ease-out delay-100"
											style={{
												opacity: 1 - scrollProgress * 1.2,
												transform: `translateY(${scrollProgress * -20}px)`,
											}}
										>
											<SubHeading
												heading={block.subheading}
												className="text-black/90 font-outfit text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-lg max-w-2xl mx-auto"
											/>
										</div>

										{/* Author Info */}
										{block.team && (
											<div
												className="mt-8 transition-all duration-700 ease-out delay-200"
												style={{
													opacity: 1 - scrollProgress * 1.8,
													transform: `translateY(${scrollProgress * -10}px)`,
												}}
											>
												<div className="flex items-center justify-center gap-4">
													{block.team.image ? (
														<SanityImage
															image={block.team.image}
															alt={block.team.name || "Author"}
															width={120}
															height={120}
															classesWrapper="max-w-12 max-h-12 rounded-full border-2 border-black/30 shadow-lg"
															priority={false}
														/>
													) : (
														<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-black/30">
															<span className="text-white font-russo font-bold text-sm">
																{block.team.name?.charAt(0) || "?"}
															</span>
														</div>
													)}
													<div className="text-left">
														<p className="font-outfit text-black font-semibold text-base drop-shadow-md">
															{block.team.name}
														</p>
														<p className="font-outfit text-black/80 text-sm drop-shadow-md">
															Reality Designer
														</p>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Fade to Content Overlay */}
							<div
								className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-20"
								style={{
									opacity: scrollProgress * 2,
								}}
							/>
						</div>
					</div>
				</>
			);

		default:
			return null;
	}
};

export default HeadingBlock;
