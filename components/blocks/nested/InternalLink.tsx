"use client";
import { getPostData } from "@/app/(admin)/api/actions/fetchInternalLink";
import { SanityImage } from "@/components/global/Images";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const formatDate = (dateString) => {
	return dateString
		? new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
		  })
		: "Date not available";
};

const PostPreviewDialog = ({
	isOpen,
	onClose,
	postData,
}: {
	isOpen: boolean;
	onClose: () => void;
	postData: any;
}) => {
	if (!isOpen || !postData) return null;

	const { block = [] } = postData;
	const [content] = block;
	const imageUrl = block[0]?.imageRef?.imageUrl;

	return (
		<div className="mt-6 w-full">
			<div className="relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl bg-gray-50 border border-gray-200/50">
				{content && (
					<>
						{/* Top section with image and basic info */}
						<div className="flex items-center justify-between p-4 bg-gray-50/50 border-b border-gray-200/50">
							<div className="flex items-center gap-4">
								<div className="relative w-12 h-12 overflow-hidden rounded-lg flex-shrink-0">
									<Image
										src={imageUrl}
										alt={content.heading || "Post image"}
										fill
										className="object-cover"
										style={{
											viewTransitionName: `post-image-${postData.slug?.current}`,
										}}
									/>
								</div>

								<div className="flex-1">
									<Link
										href={`/posts/${postData.slug?.current}`}
										className="font-russo text-black hover:text-gray-700 text-sm lg:text-base font-bold leading-tight transition-colors"
									>
										{content.heading || "No title"}
									</Link>
								</div>
							</div>

							{/* Date badge */}
							<div className="flex-shrink-0">
								<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-sm">
									<div className="w-1 h-1 bg-purple-500 rounded-full" />
									<span className="font-russo text-gray-600 text-xs uppercase tracking-wide font-bold">
										{formatDate(content.publicationDate)}
									</span>
								</span>
							</div>
						</div>

						{/* Content section */}
						<div className="p-6">
							{/* Subheading */}
							<p className="font-outfit text-gray-600 text-base leading-relaxed mb-4">
								{content.subheading || "No description"}
							</p>

							{/* Bottom section with author and CTA */}
							<div className="flex items-center justify-between">
								{/* Author info */}
								{content.team && (
									<div className="flex items-center gap-3">
										{content.team.image ? (
											<SanityImage
												image={content.team.image}
												alt={content.team.name || "Author"}
												width={80}
												height={80}
												classesWrapper="max-w-8 max-h-8 rounded-full border-2 border-gray-200/50 shadow-sm"
												priority={false}
											/>
										) : (
											<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm border-2 border-gray-200/50">
												<span className="text-white font-russo font-bold text-xs">
													{content.team.name?.charAt(0) || "?"}
												</span>
											</div>
										)}
										<div>
											<p className="font-kodemono uppercase text-black font-semibold text-sm">
												{content.team.name || "No author"}
											</p>
										</div>
									</div>
								)}

								{/* Read More Button */}
								<Link
									href={`/posts/${postData.slug?.current}`}
									prefetch={true}
									className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-sm"
								>
									<span className="font-russo uppercase tracking-wide font-bold">
										Read More
									</span>
									<div className="w-3 h-3 border border-white/30 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
										<svg
											className="w-1.5 h-1.5 transform group-hover:translate-x-0.5 transition-transform"
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
					</>
				)}
			</div>
		</div>
	);
};

const InternalLink: React.FC<{
	slug: string;
	children: React.ReactNode;
}> = ({ slug, children }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [previewPostData, setPreviewPostData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const toggleDialog = async (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		e.preventDefault();

		// If already open, just close it
		if (isDialogOpen) {
			setDialogOpen(false);
			return;
		}

		// If we already have data, just open without loading
		if (previewPostData) {
			setDialogOpen(true);
			return;
		}

		// If no data yet, load and open
		setIsLoading(true);
		setDialogOpen(true);

		if (!slug) {
			console.error("The slug is undefined.");
			setIsLoading(false);
			return;
		}

		try {
			const data = await getPostData(slug);
			setPreviewPostData(data as any);
		} catch (error) {
			console.error("Failed to fetch post data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Link href="#popup" onClick={toggleDialog}>
				<span className="font-outfit font-bold text-black hover:text-gray-700 transition-colors">
					{children}
				</span>
				<span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-russo uppercase tracking-wide font-bold hover:bg-purple-200 transition-colors">
					<div className="w-1 h-1 bg-purple-500 rounded-full" />
					POST
				</span>
			</Link>

			<PostPreviewDialog
				isOpen={isDialogOpen}
				onClose={() => setDialogOpen(false)}
				postData={previewPostData}
			/>

			{isDialogOpen && isLoading && <LoadingIndicator />}
		</>
	);
};

export default React.memo(InternalLink);

const LoadingIndicator = () => (
	<div className="my-6 w-full">
		<div className="bg-white/90 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-gray-200/50">
			<div className="flex items-center gap-3 justify-center">
				<div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
				<span className="font-outfit text-gray-700 text-sm">
					Loading preview...
				</span>
			</div>
		</div>
	</div>
);
