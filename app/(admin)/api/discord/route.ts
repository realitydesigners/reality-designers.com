import type { NextRequest } from "next/server";

type DiscordData = {
	_id: string;
	_type: "posts" | "video";
	title: string;
	slug: string;
	heading?: string;
	excerpt?: string;
	imageUrl?: string;
	videoUrl?: string;
};

// Send a post or video, with the heading and slug, to Discord
export async function POST(request: NextRequest) {
	try {
		if (request.headers.get("content-type") !== "application/json") {
			console.log("❌ Invalid content type");
			return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), { 
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}

		const postData: DiscordData = await request.json();
		console.log("📨 Received data:", JSON.stringify(postData, null, 2));

		if (!["posts", "video"].includes(postData._type)) {
			console.log("❌ Invalid post type:", postData._type);
			return new Response(JSON.stringify({ error: "Invalid _type. Must be 'posts' or 'video'" }), { 
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}

		const heading = postData.heading || postData.title || "No Heading";
		const slug = postData.slug || "no-slug";
		let messageContent = "";

		switch (postData._type) {
			case "posts":
				messageContent = `@everyone **New Post**: *${heading}*\n[Read More](https://www.reality-designers.com/posts/${slug})`;
				break;
			case "video": {
				const videoUrl =
					postData.videoUrl || "https://www.youtube.com/@realitydesigners";
				messageContent = `@everyone **New Video**: *${heading}*\n[Check out post](https://www.reality-designers.com/videos/${slug})\n\n[Watch on YouTube](${videoUrl})\n\n`;
				break;
			}
			default:
				return new Response(JSON.stringify({ error: "Invalid _type" }), { 
					status: 400,
					headers: { "Content-Type": "application/json" }
				});
		}

		console.log("📤 Sending message to Discord:", messageContent);

		const discordWebhookUrl =
			"https://discord.com/api/webhooks/1383538696204193904/N7AMlgRXGBAoKAHd6whZmvYSy6Unej7cwQeZ3OuZj9lK0KfKzftadCLFOjH1iGidh4zC";

		const discordResponse = await fetch(discordWebhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: messageContent }),
		});

		if (!discordResponse.ok) {
			console.error("❌ Discord webhook failed:", discordResponse.status, discordResponse.statusText);
			return new Response(JSON.stringify({ 
				error: "Failed to send Discord notification",
				status: discordResponse.status
			}), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}

		console.log("✅ Successfully sent to Discord!");

		return new Response(
			JSON.stringify({ success: true, message: "Notification sent to Discord" }),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("❌ Error in Discord API:", error);
		return new Response(JSON.stringify({ 
			error: "Internal server error",
			message: error instanceof Error ? error.message : "Unknown error"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
