import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/Blocks";
import PostsList from "@/components/items/PostsList";
import { postsBySlugQuery, postsQuery } from "@/sanity/lib//queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { PostsPayload } from "@/types";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { SanityImage } from "@/components/global/Images";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
	FaYoutube,
	FaInstagram,
	FaTiktok,
	FaLinkedin,
	FaGithub,
	FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type Props = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return generateStaticSlugs("posts");
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const resolvedParams = await props.params;
	const post = await sanityFetch<PostsPayload>({
		query: postsBySlugQuery,
		tags: ["post"],
		qParams: { slug: resolvedParams.slug },
	});

	const ogImage = urlForOpenGraphImage(post?.block?.[0]?.imageRef);

	return {
		title: post?.block?.[0]?.heading || "Post",
		description: post?.block?.[0]?.subheading || "Article details",
		openGraph: {
			title: post?.block?.[0]?.heading || "Post",
			description: post?.block?.[0]?.subheading || "Article details",
			...(ogImage && {
				images: [
					{
						url: ogImage,
						alt: post?.block?.[0]?.imageRef?.imageAlt || "Article image",
					},
				],
			}),
		},
	};
}

// Author Section Component
const AuthorSection = ({ team }) => {
	if (!team) return null;

	const getSocialIcon = (name: string) => {
		const icons = {
			youtube: <FaYoutube size={18} />,
			instagram: <FaInstagram size={18} />,
			twitter: <FaXTwitter size={18} />,
			tiktok: <FaTiktok size={18} />,
			linkedin: <FaLinkedin size={18} />,
			github: <FaGithub size={18} />,
			website: <FaGlobe size={18} />,
		};
		return icons[name.toLowerCase()] || null;
	};

	const SocialLink = ({ href, name }) => (
		<Link
			href={href}
			className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 backdrop-blur-sm border border-gray-200 hover:bg-gray-200 hover:border-gray-300 hover:scale-110 transition-all duration-300  hover:shadow-xl"
			aria-label={name}
			target="_blank"
			rel="noopener noreferrer"
		>
			<span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
				{getSocialIcon(name)}
			</span>
		</Link>
	);

	// Transform social links from team data
	const socialLinks = [];
	if (team.youtube) socialLinks.push({ name: "YouTube", url: team.youtube });
	if (team.instagram)
		socialLinks.push({ name: "Instagram", url: team.instagram });
	if (team.twitter) socialLinks.push({ name: "Twitter", url: team.twitter });
	if (team.tiktok) socialLinks.push({ name: "TikTok", url: team.tiktok });
	if (team.linkedin) socialLinks.push({ name: "LinkedIn", url: team.linkedin });
	if (team.github) socialLinks.push({ name: "GitHub", url: team.github });
	if (team.website) socialLinks.push({ name: "Website", url: team.website });

	return (
		<div className="flex h-full w-full justify-center py-16 px-4">
			<div className="relative max-w-2xl w-full">
				{/* Author Card */}
				<div className="group relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-lg transition-all duration-500 hover:scale-[1.02]">
					{/* Gradient Border Effect */}
					<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

					{/* Main Content */}
					<div className="relative p-8 md:p-10">
						{/* Header Section */}
						<div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
							{/* Author Image */}
							{team?.image && (
								<div className="relative">
									<div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden ring-4 ring-blue-200/50 shadow-2xl">
										<SanityImage
											image={team.image}
											alt={`Team member image for ${team.name}`}
											width={300}
											height={300}
											priority={false}
											classesWrapper="w-full h-full object-cover"
										/>
									</div>
									{/* Status Indicator */}
									<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
										<div className="w-2 h-2 bg-white rounded-full animate-pulse" />
									</div>
								</div>
							)}

							{/* Author Info */}
							<div className="flex-1 text-center md:text-left">
								<div className="mb-3">
									<h3 className="font-russo text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-wide">
										{team.name}
									</h3>
									<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-gray-200 backdrop-blur-sm">
										<div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
										<span className="font-kodemono text-xs uppercase tracking-widest text-gray-700 font-bold">
											{team.role || "Reality Designer"}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Bio Section */}
						{team.shortBio && (
							<div className="mb-8">
								<p className="font-outfit text-gray-600 text-lg leading-relaxed text-center md:text-left">
									{team.shortBio}
								</p>
							</div>
						)}

						{/* Social Links */}
						{socialLinks.length > 0 && (
							<div className="mb-8">
								<div className="flex items-center gap-1 mb-4 justify-center md:justify-start">
									<div className="w-1 h-1 bg-gray-400 rounded-full" />
									<span className="font-russo text-gray-500 text-xs uppercase tracking-widest font-bold mx-2">
										Connect
									</span>
									<div className="w-1 h-1 bg-gray-400 rounded-full" />
								</div>
								<div className="flex gap-3 justify-center md:justify-start">
									{socialLinks.map(({ name, url }) => (
										<SocialLink key={name} href={url} name={name} />
									))}
								</div>
							</div>
						)}

						{/* CTA Button */}
						<div className="flex justify-center md:justify-start">
							<Button
								href={`/team/${team.slug?.current}`}
								variant="primary"
								size="md"
								theme="light"
								className="text-sm"
							>
								View Full Profile
								<svg
									className="w-4 h-4 ml-2 transform group-hover:translate-x-0.5 transition-transform duration-300"
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
						</div>
					</div>

					{/* Decorative Elements */}
					<div className="absolute top-4 right-4 w-2 h-2 bg-gray-300 rounded-full" />
					<div className="absolute top-8 right-4 w-1 h-1 bg-gray-200 rounded-full" />
					<div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-60" />
				</div>
			</div>
		</div>
	);
};

export default async function PostSlugRoute(props: Props) {
	const resolvedParams = await props.params;
	const currentPost = await sanityFetch<PostsPayload>({
		query: postsBySlugQuery,
		tags: ["post"],
		qParams: { slug: resolvedParams.slug },
	});

	let otherPosts;

	if (currentPost) {
		const allPosts = await sanityFetch<PostsPayload[]>({
			query: postsQuery,
			tags: ["post"],
		});

		otherPosts = allPosts.filter(
			(post) => post.slug?.current !== resolvedParams.slug,
		);
	}

	const blocks = currentPost?.block || [];

	// Extract team info from the first HeadingBlock
	const headingBlock = blocks.find((block) => block._type === "headingBlock");
	const teamInfo = headingBlock?.team;

	return (
		<>
			{currentPost && (
				<>
					<main>
						{blocks?.map((block) => (
							<Blocks key={block._key} block={block as BlockProps} />
						))}
					</main>

					{/* Automatically show author section if team info exists */}
					{teamInfo && <AuthorSection team={teamInfo} />}

					{/* <Suspense fallback={<div>Loading...</div>}>
						{otherPosts && (
							<div className="w-full py-16 px-4 lg:px-8">
								<PostsList post={otherPosts} />
							</div>
						)}
					</Suspense> */}
				</>
			)}
		</>
	);
}
