"use client";
import { SanityImage } from "@/components/global/Images";
import { Link } from "next-view-transitions";
import Button from "@/components/ui/Button";
import React from "react";

interface PostsRefData {
	postsSlug: string;
	postsHeading: string;
	postsSubheading?: string;
	postsImage: any;
	postsCategory?: string;
	postsAuthor?: string;
	postsAuthorImage?: any;
}

interface PostsRefBlockProps {
	postsRef: PostsRefData;
}

const PostsRefBlock: React.FC<PostsRefBlockProps> = ({ postsRef }) => {
	const {
		postsSlug,
		postsHeading,
		postsSubheading,
		postsImage,
		postsCategory,
		postsAuthor,
		postsAuthorImage,
	} = postsRef;

	// Calculate read time (simple estimation)
	const readTime = Math.max(
		2,
		Math.ceil((postsHeading.length + (postsSubheading?.length || 0)) / 200),
	);

	return (
		<div className="w-full py-6">
			<div className="max-w-3xl mx-auto px-4 lg:px-20">
				{/* Smaller header */}
				<div className="text-left mb-4">
					<div className="inline-block px-2 py-0.5 rounded-full text-xs font-russo uppercase bg-black text-white border border-white/50 backdrop-blur-xl shadow-sm">
						RELATED POST
					</div>
				</div>

				<Link
					href={`/posts/${postsSlug}`}
					prefetch={true}
					className="group block"
				>
					{/* Compact horizontal card */}
					<div className="relative overflow-hidden transition-all duration-300 hover:shadow-md rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200">
						<div className="flex items- p-4 gap-4">
							{/* Smaller image */}
							<div className="relative w-24 h-24 overflow-hidden rounded-md flex-shrink-0">
								{typeof postsImage === "string" ? (
									<img
										src={postsImage}
										alt={postsHeading}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
										style={{
											viewTransitionName: `post-image-${postsSlug}`,
										}}
									/>
								) : (
									<div
										style={{
											viewTransitionName: `post-image-${postsSlug}`,
										}}
										className="w-full h-full"
									>
										<SanityImage
											image={postsImage}
											alt={postsHeading}
											width={120}
											height={120}
											classesWrapper="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
											priority={false}
										/>
									</div>
								)}
							</div>

							{/* Content */}
							<div className="flex-1 min-w-0">
								{/* Title and category */}
								<div className="flex items-start justify-between gap-3 mb-2">
									<h3 className="font-russo text-base font-bold text-black leading-tight group-hover:text-gray-700 transition-colors">
										{postsHeading}
									</h3>
									{postsCategory && (
										<span className="inline-block px-2 py-0.5 rounded text-xs font-russo uppercase tracking-wide font-bold bg-gray-100 text-gray-600 flex-shrink-0">
											{postsCategory}
										</span>
									)}
								</div>

								{/* Subheading - smaller */}
								{postsSubheading && (
									<p className="font-outfit text-gray-500 text-sm leading-relaxed mb-3 line-clamp-3">
										{postsSubheading.length > 60
											? postsSubheading.substring(0, 200) + "..."
											: postsSubheading}
									</p>
								)}

								{/* Small CTA Button */}
								<div className="flex items-center justify-between mt-4">
									<Button
										href={`/posts/${postsSlug}`}
										variant="outline"
										size="sm"
										theme="light"
										className="text-xs border-gray-300 text-gray-600 hover:border-gray-700 hover:text-gray-900"
									>
										Read More
										<svg
											className="w-3 h-3 ml-1"
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
									</Button>
									
									{/* Read time indicator */}
									<span className="text-xs text-gray-400 font-outfit">
										{readTime} min read
									</span>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default PostsRefBlock;
