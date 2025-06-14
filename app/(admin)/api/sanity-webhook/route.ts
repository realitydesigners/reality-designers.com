import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookBody = {
	_type: string;
	_id: string;
	slug?: { current: string };
	title?: string;
	block?: Array<{
		heading?: string;
		subheading?: string;
		_type: string;
	}>;
	videoUrl?: string;
	[key: string]: any;
};

// Handler for Sanity webhooks that forwards to Discord
export async function POST(request: NextRequest) {
	try {
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

		// Transform Sanity data to Discord API format
		const discordData = {
			_id: body._id,
			_type: body._type as "posts" | "video",
			title: body.title || body.block?.[0]?.heading || "Untitled",
			slug: body.slug?.current || "no-slug",
			heading: body.block?.[0]?.heading,
			excerpt: body.block?.[0]?.subheading,
			videoUrl: body.videoUrl,
		};

		console.log("🔄 Transformed data for Discord:", JSON.stringify(discordData, null, 2));

		// Call our Discord API endpoint
		const discordResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/discord`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(discordData),
		});

		if (!discordResponse.ok) {
			const errorText = await discordResponse.text();
			console.error("❌ Discord API call failed:", discordResponse.status, errorText);
			return new Response(`Discord API error: ${discordResponse.status}`, { status: 500 });
		}

		const discordResult = await discordResponse.json();
		console.log("✅ Successfully sent to Discord:", discordResult);

		return new Response(JSON.stringify({ 
			success: true, 
			message: "Webhook processed and sent to Discord",
			discordResult 
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});

	} catch (error) {
		console.error("❌ Error processing Sanity webhook:", error);
		return new Response(JSON.stringify({ 
			error: "Internal server error",
			message: error instanceof Error ? error.message : "Unknown error"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
} 