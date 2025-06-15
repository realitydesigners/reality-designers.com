import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { NewVideo } from "@/app/(admin)/api/email/new-video";
import { NewPostEnhanced } from "@/app/(admin)/api/email/new-post-enhanced";
import { sendContentNotification } from "@/lib/services/broadcast";

type SanityWebhookBody = {
	_type: string;
	_id: string;
	slug?: string; // Now a string directly since Sanity projects it as "slug": slug.current
	title?: string;
	block?: Array<{
		_type?: string;
		heading?: string;
		subheading?: string;
		content?: any[];
		imageRef?: {
			imageUrl?: string;
			imageAlt?: string;
		};
		team?: {
			name: string;
			role: string;
			image?: { asset?: { url: string } };
		};
		layout?: string;
		publicationDate?: string;
	}>;
	videoUrl?: string;
	imageUrl?: string;
	image?: { asset?: { url: string } };
	excerpt?: string;
	team?: {
		name: string;
		role: string;
		image?: { asset?: { url: string } };
	};
	subcategories?: any[];
	[key: string]: any;
};

// Single endpoint to handle post/video publishing - sends to Discord AND Email
export async function POST(request: NextRequest) {
	try {
		// Validate Sanity webhook
		const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
			request as any,
			process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET,
		);

		if (!isValidSignature) {
			return new Response("Invalid Signature", { status: 401 });
		}

		if (!body?._type) {
			return new Response("Bad Request", { status: 400 });
		}

		// Only process posts and video types
		if (!["posts", "video"].includes(body._type)) {
			return new Response("OK - Ignored", { status: 200 });
		}

		// Extract data for notifications
		const heading = body.block?.[0]?.heading || body.title || "New Content";

		// Extract slug (now comes as string directly from Sanity projection)
		let slug = "no-slug";
		if (body.slug && typeof body.slug === "string") {
			slug = body.slug;
		} else if (body._id) {
			// Use document ID as fallback
			slug = body._id.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
		}

		const excerpt =
			body.excerpt || body.block?.[0]?.subheading || "No description available";
		const imageUrl = body.imageUrl || "";
		const videoUrl = body.videoUrl || "";
		const contentType = body._type === "video" ? "Video" : "Post";

		// 🎯 SEND TO DISCORD

		let discordMessage = "";
		if (body._type === "posts") {
			// Include full URL so Discord can scrape metadata
			discordMessage = `@everyone **New Post**: *${heading}*\n\nhttps://www.reality-designers.com/posts/${slug}`;
		} else {
			// Include both website link and video URL for maximum metadata
			discordMessage = `@everyone **New Video**: *${heading}*\n\nhttps://www.reality-designers.com/videos/${slug}\n\n${videoUrl}`;
		}

		const discordWebhookUrl =
			"https://discord.com/api/webhooks/1383538696204193904/N7AMlgRXGBAoKAHd6whZmvYSy6Unej7cwQeZ3OuZj9lK0KfKzftadCLFOjH1iGidh4zC";

		const discordResponse = await fetch(discordWebhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: discordMessage }),
		});

		const discordSuccess = discordResponse.ok;

		// 📧 SEND EMAIL

		// Prepare enhanced data for email templates
		const emailTeam = body.team?.name
			? {
					name: body.team.name,
					role: body.team.role || "Team Member",
					image: body.team.image?.asset?.url,
			  }
			: body.block?.find((b) => b.team)?.team
			  ? {
						name: body.block.find((b) => b.team)!.team!.name,
						role: body.block.find((b) => b.team)!.team!.role || "Team Member",
						image: body.block.find((b) => b.team)!.team!.image?.asset?.url,
				  }
			  : undefined;

		let emailContent;

		if (body._type === "video") {
			// Use video-specific template
			emailContent = NewVideo({
				title: body.title || heading,
				heading,
				subheading: body.block?.[0]?.subheading,
				excerpt,
				slug,
				videoUrl,
				image: imageUrl || body.image?.asset?.url,
				team: emailTeam,
				blocks: body.block?.slice(0, 3), // Preview first 3 blocks
			});
		} else {
			// Use enhanced post template
			emailContent = NewPostEnhanced({
				title: body.title || heading,
				heading,
				subheading: body.block?.[0]?.subheading,
				excerpt,
				slug,
				image: imageUrl || body.image?.asset?.url,
				team: emailTeam,
				blocks: body.block?.slice(0, 3), // Preview first 3 blocks
			});
		}

		// Send broadcast using the modular service
		const broadcastResult = await sendContentNotification({
			contentType: body._type === "video" ? "Video" : "Post",
			heading,
			emailTemplate: emailContent as React.ReactElement,
		});

		const emailSuccess = broadcastResult.success;
		const emailsSent = broadcastResult.emailsSent;
		const emailsFailed = emailSuccess ? 0 : 1;

		// Return comprehensive response
		const response = {
			success: true,
			message: `${contentType} published successfully`,
			notifications: {
				discord: discordSuccess ? "✅ Sent" : "❌ Failed",
				email: emailSuccess ? `✅ Sent to ${emailsSent} contacts` : "❌ Failed",
				emailStats: {
					sent: emailsSent,
					failed: emailsFailed,
					total: emailsSent + emailsFailed,
				},
			},
			content: {
				type: body._type,
				heading,
				slug,
				url:
					body._type === "posts"
						? `https://www.reality-designers.com/posts/${slug}`
						: `https://www.reality-designers.com/videos/${slug}`,
			},
		};

		return new Response(JSON.stringify(response), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: "Internal server error",
				message: error instanceof Error ? error.message : "Unknown error",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
