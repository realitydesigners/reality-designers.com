"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PostsPayload } from "@/types";
import Button from "@/components/ui/Button";
import { SanityImage } from "@/components/global/Images";

interface BlogPostsSectionProps {
	posts: PostsPayload[];
}

export default function BlogPostsSection({ posts }: BlogPostsSectionProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const sectionRef = useRef<HTMLElement>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Smooth scroll tracking
	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current) return;

			const rect = sectionRef.current.getBoundingClientRect();
			const progress = Math.max(
				0,
				Math.min(
					1,
					(window.innerHeight - rect.top) / (window.innerHeight + rect.height),
				),
			);
			setScrollProgress(progress);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Auto-advance slides for featured post
	useEffect(() => {
		const startInterval = () => {
			intervalRef.current = setInterval(() => {
				setIsTransitioning(true);
				setTimeout(() => {
					setActiveIndex(
						(prev) => (prev + 1) % Math.min(featuredPosts.length, 3),
					);
					setIsTransitioning(false);
				}, 300);
			}, 5000);
		};

		startInterval();
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [posts.length]);

	const formatDate = (dateString: string) => {
		if (!dateString) return "RECENT";
		return new Date(dateString)
			.toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})
			.toUpperCase();
	};

	const validPosts = posts.filter((post) => {
		const block = post.block?.[0];
		return block?.heading && block?.imageRef;
	});

	if (validPosts.length === 0) return null;

	// Split posts: first 4 for grid, next 3 for featured carousel
	const gridPosts = validPosts.slice(0, 4);
	const featuredPosts = validPosts.slice(4, 7);

	const activePost = featuredPosts[activeIndex];
	const activeBlock = activePost?.block?.[0];

	return (
		<section
			ref={sectionRef}
			className="relative w-full py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100"
			data-theme="light"
		>
			{/* Header */}
			<div className="relative z-10 text-center mb-12">
				<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-sm mb-6">
					<div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
					<span className="font-russo text-gray-600 text-xs tracking-[0.2em] uppercase font-bold">
						INSIGHTS
					</span>
				</div>

				<h2 className="font-russo text-3xl lg:text-4xl font-bold text-black mb-3 leading-tight">
					RECENT THOUGHTS
				</h2>
				<p className="text-gray-600 font-outfit max-w-2xl mx-auto leading-relaxed">
					Exploring design, technology, and human experience.
				</p>
			</div>

			<div className="relative max-w-7xl mx-auto px-6">
				{/* Editorial Grid - Wired/Futurism Style */}
				{gridPosts.length > 0 && (
					<div className="mb-20">
						<div className="relative">
							{/* Centered Bento Grid Layout */}
							<div className="grid grid-cols-12 grid-rows-2 gap-3 lg:gap-4 max-w-5xl mx-auto auto-rows-fr">
								{gridPosts.map((post, index) => {
									const block = post.block?.[0];
									if (!block?.heading || !block?.imageRef) return null;

									// Compact Bento Grid - Perfectly Centered
									const layouts = [
										// Large feature card (top-left)
										{
											cols: "col-span-12 lg:col-span-7",
											imageAspect: "aspect-[16/11]",
											titleSize: "text-lg lg:text-xl",
											descLines: 2,
										},
										// Tall vertical card (top-right)
										{
											cols: "col-span-12 lg:col-span-5",
											imageAspect: "aspect-[4/5]",
											titleSize: "text-base lg:text-lg",
											descLines: 2,
										},
										// Wide horizontal card (bottom-left)
										{
											cols: "col-span-12 lg:col-span-8",
											imageAspect: "aspect-[21/10]",
											titleSize: "text-base lg:text-lg",
											descLines: 2,
										},
										// Square accent card (bottom-right)
										{
											cols: "col-span-12 lg:col-span-4",
											imageAspect: "aspect-square",
											titleSize: "text-base lg:text-lg",
											descLines: 2,
										},
									];

									const layout = layouts[index % layouts.length];

									return (
										<div
											key={post.slug?.current || index}
											className={`${layout.cols} flex`}
										>
											<Link
												href={`/posts/${post.slug?.current}`}
												className="group relative block w-full h-full"
											>
												{/* Futuristic Overlay Card */}
												<div
													className="relative overflow-hidden rounded-2xl group-hover:scale-[1.02] transition-all duration-500 shadow-lg hover:shadow-2xl w-full h-full flex flex-col"
													style={{
														borderRadius:
															index % 2 === 0
																? "24px 8px 24px 8px"
																: "8px 24px 8px 24px",
													}}
												>
													{/* Full Image Background */}
													<div
														className="relative flex-1 overflow-hidden"
													>
														<img
															src={block.imageRef.imageUrl}
															alt={block.imageRef.imageAlt || block.heading}
															className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
														/>

														{/* Futuristic Gradient Overlays */}
														<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
														<div
															className={`absolute inset-0 ${
																index % 3 === 0
																	? "bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/20"
																	: index % 3 === 1
																	  ? "bg-gradient-to-tl from-cyan-600/30 via-transparent to-blue-600/20"
																	  : "bg-gradient-to-tr from-pink-600/30 via-transparent to-purple-600/20"
															}`}
														/>

														{/* Hover Excerpt Overlay */}
														{block.subheading && (
															<div className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6">
																<div className="text-center">
																	<p className="text-white font-outfit text-sm leading-relaxed mb-4">
																		{block.subheading}
																	</p>
																	<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/30">
																		<span className="text-white font-russo text-xs uppercase tracking-wide">
																			Read More
																		</span>
																		<svg
																			className="w-3 h-3 text-white"
																			fill="none"
																			stroke="currentColor"
																			viewBox="0 0 24 24"
																		>
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth={2}
																				d="M17 8l4 4m0 0l-4 4m4-4H3"
																			/>
																		</svg>
																	</div>
																</div>
															</div>
														)}

														{/* Floating UI Elements */}
														<div className="absolute inset-0 pointer-events-none">
															{/* Date Badge */}
															<div className="absolute top-4 left-4">
																<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-lg">
																	<div
																		className={`w-1.5 h-1.5 rounded-full ${
																			index % 3 === 0
																				? "bg-purple-400"
																				: index % 3 === 1
																				  ? "bg-cyan-400"
																				  : "bg-pink-400"
																		}`}
																	/>
																	<span className="font-russo text-white text-xs uppercase tracking-wide font-bold">
																		{formatDate(block.publicationDate || "")}
																	</span>
																</span>
															</div>

															{/* Category Tag */}
															{block.category?.title && (
																<div className="absolute top-4 right-4">
																	<span className="inline-block px-2 py-0.5 rounded-full text-xs font-russo uppercase tracking-wide font-bold bg-white/90 text-black border border-white/50 backdrop-blur-xl shadow-sm">
																		{block.category.title.toUpperCase()}
																	</span>
																</div>
															)}

															{/* Futuristic Corner Elements */}
															<div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
															<div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
														</div>

														{/* Content Overlay - Bottom */}
														<div className="absolute bottom-0 left-0 right-0 p-6">
															{/* Title */}
															<h3
																className={`font-russo ${
																	layout.titleSize
																} font-bold text-white leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
																	index % 3 === 0
																		? "group-hover:from-purple-400 group-hover:to-pink-400"
																		: index % 3 === 1
																		  ? "group-hover:from-cyan-400 group-hover:to-blue-400"
																		  : "group-hover:from-pink-400 group-hover:to-purple-400"
																} transition-all duration-300 drop-shadow-lg`}
															>
																{block.heading}
															</h3>

															{/* Author Info */}
															{block.team && (
																<div className="flex items-center justify-between">
																	<div className="flex items-center gap-3">
																		{block.team.image ? (
																			<SanityImage
																				image={block.team.image}
																				alt={block.team.name || "Author"}
																				width={80}
																				height={80}
																				classesWrapper="max-w-8 max-h-8 rounded-full border-2 border-white/50 shadow-lg"
																				priority={false}
																			/>
																		) : (
																			<div
																				className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 ${
																					index % 3 === 0
																						? "bg-gradient-to-br from-purple-500 to-pink-500"
																						: index % 3 === 1
																						  ? "bg-gradient-to-br from-cyan-500 to-blue-500"
																						  : "bg-gradient-to-br from-pink-500 to-purple-500"
																				}`}
																			>
																				<span className="text-white font-russo font-bold text-xs">
																					{block.team.name?.charAt(0) || "?"}
																				</span>
																			</div>
																		)}
																		<div>
																			<p className="font-outfit text-white font-semibold text-sm drop-shadow-md">
																				{block.team.name}
																			</p>
																			<p className="font-outfit text-white/80 text-xs drop-shadow-md">
																				Reality Designer
																			</p>
																		</div>
																	</div>

																	{/* Read Time */}
																	<div className="text-right">
																		<span className="text-white/80 font-outfit text-xs drop-shadow-md">
																			{Math.ceil(Math.random() * 5 + 2)} min
																			read
																		</span>
																	</div>
																</div>
															)}
														</div>
													</div>
												</div>
											</Link>
										</div>
									);
								})}
							</div>

							{/* Background decorative elements */}
							<div className="absolute -top-8 -right-8 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 blur-3xl" />
							<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full opacity-30 blur-2xl" />
						</div>
					</div>
				)}

				{/* Featured Post Section */}
				{featuredPosts.length > 0 && (
					<>
						{/* Featured Label */}
						<div className="text-center mb-8">
							<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 shadow-sm">
								<div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
								<span className="font-russo text-purple-700 text-xs tracking-[0.2em] uppercase font-bold">
									FEATURED
								</span>
							</div>
						</div>

						{/* Featured Carousel */}
						<div className="grid lg:grid-cols-5 gap-8 items-start">
							{/* Left Side - Large Image */}
							<div className="lg:col-span-3 relative">
								{/* Image Container - 16:9 Aspect Ratio */}
								<div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
									{featuredPosts.map((post, index) => {
										const block = post.block?.[0];
										if (!block?.imageRef) return null;

										const isActive = index === activeIndex;

										return (
											<div
												key={post.slug?.current || index}
												className={`absolute inset-0 transition-all duration-1000 ease-out ${
													isActive
														? "opacity-100 scale-100"
														: "opacity-0 scale-105"
												}`}
											>
												<img
													src={block.imageRef.imageUrl}
													alt={block.imageRef.imageAlt || block.heading}
													className="w-full h-full object-cover"
												/>
												{/* Gradient overlay for text readability */}
												<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
											</div>
										);
									})}

									{/* Navigation Arrows on Sides */}
									<button
										onClick={() => {
											setIsTransitioning(true);
											setTimeout(() => {
												setActiveIndex((prev) =>
													prev > 0 ? prev - 1 : featuredPosts.length - 1,
												);
												setIsTransitioning(false);
											}, 150);
										}}
										className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-300 group shadow-lg"
									>
										<svg
											className="w-4 h-4 text-gray-800 group-hover:text-black"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 19l-7-7 7-7"
											/>
										</svg>
									</button>

									<button
										onClick={() => {
											setIsTransitioning(true);
											setTimeout(() => {
												setActiveIndex(
													(prev) => (prev + 1) % featuredPosts.length,
												);
												setIsTransitioning(false);
											}, 150);
										}}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-300 group shadow-lg"
									>
										<svg
											className="w-4 h-4 text-gray-800 group-hover:text-black"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</button>

									{/* Floating Info on Image */}
									<div className="absolute bottom-4 left-4 right-4 z-10">
										<div className="flex items-center justify-between">
											{/* Date Badge */}
											<div
												className={`transition-all duration-700 ${
													isTransitioning
														? "opacity-0 transform translate-y-4"
														: "opacity-100 transform translate-y-0"
												}`}
											>
												<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xl border border-white/20 shadow-lg">
													<div className="w-1 h-1 bg-purple-500 rounded-full" />
													<span className="font-russo text-black text-xs uppercase tracking-wide font-bold">
														{formatDate(activeBlock?.publicationDate || "")}
													</span>
												</span>
											</div>

											{/* Progress Dots */}
											<div className="flex gap-1.5">
												{featuredPosts.map((_, index) => (
													<button
														key={index}
														onClick={() => {
															setIsTransitioning(true);
															setTimeout(() => {
																setActiveIndex(index);
																setIsTransitioning(false);
															}, 150);
														}}
														className="group relative"
													>
														<div
															className={`w-2 h-2 rounded-full transition-all duration-300 ${
																index === activeIndex
																	? "bg-white shadow-lg"
																	: "bg-white/50 hover:bg-white/80"
															}`}
														/>
													</button>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Right Side - Content */}
							<div className="lg:col-span-2 relative">
								{/* Content Stack */}
								<div className="space-y-4">
									{/* Title */}
									<h3
										className={`font-russo text-xl lg:text-2xl font-bold text-black leading-tight transition-all duration-700 ${
											isTransitioning
												? "opacity-0 transform translate-y-4"
												: "opacity-100 transform translate-y-0"
										}`}
									>
										{activeBlock?.heading}
									</h3>

									{/* Description */}
									{activeBlock?.subheading && (
										<p
											className={`text-gray-600 font-outfit text-sm leading-relaxed transition-all duration-700 delay-100 ${
												isTransitioning
													? "opacity-0 transform translate-y-4"
													: "opacity-100 transform translate-y-0"
											}`}
										>
											{activeBlock.subheading.length > 100
												? activeBlock.subheading.substring(0, 100) + "..."
												: activeBlock.subheading}
										</p>
									)}

									{/* Author */}
									{activeBlock?.team && (
										<div
											className={`flex items-center gap-2.5 transition-all duration-700 delay-200 ${
												isTransitioning
													? "opacity-0 transform translate-y-4"
													: "opacity-100 transform translate-y-0"
											}`}
										>
											{/* Author Image - Using SanityImage component */}
											{activeBlock.team.image ? (
												<SanityImage
													image={activeBlock.team.image}
													alt={activeBlock.team.name || "Author"}
													width={80}
													height={80}
													classesWrapper="max-w-8 max-h-8 rounded-full border-2 border-white shadow-md"
													priority={false}
												/>
											) : (
												<div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
													<span className="text-white font-russo font-bold text-xs">
														{activeBlock.team.name?.charAt(0) || "?"}
													</span>
												</div>
											)}
											<div>
												<p className="font-outfit text-black font-semibold text-sm">
													{activeBlock.team.name}
												</p>
												<p className="font-outfit text-gray-500 text-xs">
													Reality Designer
												</p>
											</div>
										</div>
									)}

									{/* CTA Button */}
									<div
										className={`pt-2 transition-all duration-700 delay-300 ${
											isTransitioning
												? "opacity-0 transform translate-y-4"
												: "opacity-100 transform translate-y-0"
										}`}
									>
										<Link
											href={`/posts/${activePost?.slug?.current}`}
											className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm"
										>
											<span className="font-russo uppercase tracking-wide font-bold">
												Read More
											</span>
											<div className="w-4 h-4 border border-white/30 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
												<svg
													className="w-2 h-2 transform group-hover:translate-x-0.5 transition-transform"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M17 8l4 4m0 0l-4 4m4-4H3"
													/>
												</svg>
											</div>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>

			{/* Bottom CTA */}
			<div className="relative z-10 text-center mt-16">
				<Button
					variant="outline"
					size="md"
					href="/blog"
					theme="light"
					className="font-russo text-sm uppercase tracking-wide border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50"
				>
					View All Insights
				</Button>
			</div>
		</section>
	);
}
