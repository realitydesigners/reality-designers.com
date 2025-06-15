import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { Resend } from "resend";

import { NewVideo } from "@/app/(admin)/api/email/new-video";
import { NewPostEnhanced } from "@/app/(admin)/api/email/new-post-enhanced";

const resend = new Resend(process.env.RESEND_API_KEY);

type SanityWebhookBody = {
	_type: string;
	_id: string;
	slug?: { current: string };
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
			process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET
		);

		if (!isValidSignature) {
			console.log("❌ Invalid webhook signature");
			return new Response("Invalid Signature", { status: 401 });
		}

		if (!body?._type) {
			console.log("❌ Missing _type in webhook body");
			return new Response("Bad Request", { status: 400 });
		}

		console.log("📨 Received Sanity webhook:", JSON.stringify(body, null, 2));

		// Only process posts and video types
		if (!["posts", "video"].includes(body._type)) {
			console.log(`ℹ️ Ignoring webhook for type: ${body._type}`);
			return new Response("OK - Ignored", { status: 200 });
		}

		// Extract data for notifications
		const heading = body.block?.[0]?.heading || body.title || "New Content";
		const slug = body.slug?.current || "no-slug";
		const excerpt = body.excerpt || body.block?.[0]?.subheading || "No description available";
		const imageUrl = body.imageUrl || "";
		const videoUrl = body.videoUrl || "";
		const contentType = body._type === "video" ? "Video" : "Post";

		// 🎯 SEND TO DISCORD
		console.log("📤 Sending to Discord...");
		
		let discordMessage = "";
		if (body._type === "posts") {
			// Include full URL so Discord can scrape metadata
			discordMessage = `@everyone **New Post**: *${heading}*\n\nhttps://www.reality-designers.com/posts/${slug}`;
		} else {
			// Include both website link and video URL for maximum metadata
			discordMessage = `@everyone **New Video**: *${heading}*\n\nhttps://www.reality-designers.com/videos/${slug}\n\n${videoUrl}`;
		}

		const discordWebhookUrl = "https://discord.com/api/webhooks/1383538696204193904/N7AMlgRXGBAoKAHd6whZmvYSy6Unej7cwQeZ3OuZj9lK0KfKzftadCLFOjH1iGidh4zC";
		
		const discordResponse = await fetch(discordWebhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: discordMessage }),
		});

		const discordSuccess = discordResponse.ok;
		if (discordSuccess) {
			console.log("✅ Discord notification sent!");
		} else {
			console.error("❌ Discord failed:", discordResponse.status, discordResponse.statusText);
		}

		// 📧 SEND EMAIL
		console.log("📧 Sending email notification...");
		
		// Prepare enhanced data for email templates
		const emailTeam = body.team?.name ? {
			name: body.team.name,
			role: body.team.role || "Team Member",
			image: body.team.image?.asset?.url
		} : body.block?.find(b => b.team)?.team ? {
			name: body.block.find(b => b.team)!.team!.name,
			role: body.block.find(b => b.team)!.team!.role || "Team Member",
			image: body.block.find(b => b.team)!.team!.image?.asset?.url
		} : undefined;

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
				blocks: body.block?.slice(0, 3) // Preview first 3 blocks
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
				blocks: body.block?.slice(0, 3) // Preview first 3 blocks
			});
		}

		let emailSuccess = false;
		let emailsSent = 0;
		let emailsFailed = 0;

		try {
			const audienceId = process.env.RESEND_AUDIENCE_ID;

			if (!audienceId) {
				// No audience: send to test email
				await resend.emails.send({
					from: "Reality Designers <hey@reality-designers.com>",
					to: "wearerealitydesigners@gmail.com",
					subject: `New ${contentType}: ${heading}`,
					react: emailContent as React.ReactElement,
					headers: {
						"X-Entity-Ref-ID": "RD-Notification",
					},
				});
				emailSuccess = true;
				emailsSent = 1;
			} else {
				// Send to all audience members
				const contactsResponse = await resend.contacts.list({ audienceId });
				const contacts = Array.isArray(contactsResponse.data) ? contactsResponse.data : [];

				// Send emails in batches
				const batchSize = 10;
				for (let i = 0; i < contacts.length; i += batchSize) {
					const batch = contacts.slice(i, i + batchSize);
					
					const emailPromises = batch
						.filter(contact => !contact.unsubscribed)
						.map(async (contact) => {
							try {
								await resend.emails.send({
									from: "Reality Designers <hey@reality-designers.com>",
									to: contact.email,
									subject: `New ${contentType}: ${heading}`,
									react: emailContent as React.ReactElement,
									headers: {
										"X-Entity-Ref-ID": "RD-Notification",
										"List-Unsubscribe": `<https://www.reality-designers.com/unsubscribe?email=${encodeURIComponent(contact.email)}>`,
									},
								});
								return { success: true };
							} catch (error) {
								return { success: false };
							}
						});

					const batchResults = await Promise.all(emailPromises);
					emailsSent += batchResults.filter(r => r.success).length;
					emailsFailed += batchResults.filter(r => !r.success).length;

					// Brief delay between batches
					if (i + batchSize < contacts.length) {
						await new Promise(resolve => setTimeout(resolve, 1000));
					}
				}

				emailSuccess = emailsSent > 0;
			}
		} catch (emailError) {
			console.error("❌ Email failed:", emailError);
			emailSuccess = false;
		}

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
					total: emailsSent + emailsFailed
				}
			},
			content: {
				type: body._type,
				heading,
				slug,
				url: body._type === "posts" 
					? `https://www.reality-designers.com/posts/${slug}`
					: `https://www.reality-designers.com/videos/${slug}`
			}
		};

		console.log("🎉 Final result:", response);

		return new Response(JSON.stringify(response), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});

	} catch (error) {
		console.error("❌ Error in post API:", error);
		return new Response(JSON.stringify({ 
			error: "Internal server error",
			message: error instanceof Error ? error.message : "Unknown error"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
} 