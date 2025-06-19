import { getDiscordClient } from "@/lib/discord/client";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Constants for Discord OAuth
const DISCORD_CLIENT_ID = "1297321318030639114";

// Helper to get the correct base URL
const getBaseUrl = (origin: string) => {
	// For production, always use the non-www version
	if (origin.includes("www.rthmn.com")) {
		return "https://rthmn.com";
	}
	return origin;
};

export async function GET(request: Request) {
	console.log("==== DISCORD CALLBACK STARTED ====");
	console.log("Request URL:", request.url);

	// Store origin at the top level so it's available throughout the function
	const { searchParams, origin } = new URL(request.url);
	const baseUrl = getBaseUrl(origin);

	console.log("Search params:", Object.fromEntries(searchParams.entries()));
	console.log("Origin:", origin);
	console.log("Base URL:", baseUrl);

	try {
		// Use the consistent base URL for the redirect URI
		const REDIRECT_URI = `${baseUrl}/api/discord/callback`;
		console.log("Using redirect URI:", REDIRECT_URI);

		const code = searchParams.get("code");
		const error = searchParams.get("error");
		const errorDescription = searchParams.get("error_description");

		if (error) {
			console.error("Discord OAuth Error:", error, errorDescription);
			return NextResponse.redirect(`${origin}/account?error=oauth_${error}`);
		}

		if (!code) {
			console.log("No code provided in callback");
			return NextResponse.redirect(`${origin}/account?error=no_code`);
		}

		const supabase = await createClient();
		console.log("Starting Discord connection process...");

		// Add detailed logging for debugging
		console.log("OAuth Configuration:", {
			clientId: DISCORD_CLIENT_ID,
			redirectUri: REDIRECT_URI,
			code: code,
		});

		const discord = await getDiscordClient();
		if (!discord) {
			throw new Error("Discord client not initialized");
		}
		console.log("Discord client initialized");

		const user = await supabase.auth.getUser();
		console.log("Got Supabase user:", user.data.user?.id);

		// Exchange code for Discord token and get user info
		console.log("Attempting to exchange code for Discord token...");
		try {
			const tokenResponse = await fetch(
				"https://discord.com/api/oauth2/token",
				{
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: new URLSearchParams({
						client_id: DISCORD_CLIENT_ID,
						client_secret: process.env.DISCORD_CLIENT_SECRET!,
						code,
						grant_type: "authorization_code",
						redirect_uri: REDIRECT_URI,
					}),
					signal: AbortSignal.timeout(30000), // 30 second timeout
				},
			);

			if (!tokenResponse.ok) {
				const errorData = await tokenResponse.text();
				console.error("Token exchange failed:", errorData);
				return NextResponse.redirect(
					`${origin}/account?error=token_exchange_failed`,
				);
			}

			const tokenData = await tokenResponse.json();
			console.log("Successfully obtained Discord token");
			const { access_token } = tokenData;

			console.log("Fetching Discord user info...");
			const userResponse = await fetch("https://discord.com/api/users/@me", {
				headers: { Authorization: `Bearer ${access_token}` },
				signal: AbortSignal.timeout(30000), // 30 second timeout
			});

			if (!userResponse.ok) {
				const errorData = await userResponse.text();
				console.error("User info fetch failed:", errorData);
				return NextResponse.redirect(
					`${origin}/account?error=user_info_failed`,
				);
			}

			const discordUser = await userResponse.json();
			console.log(
				"Got Discord user info:",
				discordUser.id,
				discordUser.username,
			);

			// Store Discord connection
			console.log("Storing Discord connection in database...");
			try {
				await supabase.from("discord_connections").upsert({
					user_id: user.data.user?.id,
					discord_user_id: discordUser.id,
					discord_username: discordUser.username,
				});
				console.log("Successfully stored Discord connection");
			} catch (dbError) {
				console.error("Database storage failed:", dbError);
				return NextResponse.redirect(
					`${origin}/account?error=database_storage_failed`,
				);
			}

			// Add user to guild using access token
			console.log("Adding user to guild...");
			try {
				await fetch(
					`https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/members/${discordUser.id}`,
					{
						method: "PUT",
						headers: {
							Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							access_token,
						}),
					},
				);
				console.log("Successfully added member to guild");
			} catch (addError) {
				console.error("Failed to add member to guild:", addError);
				return NextResponse.redirect(
					`${origin}/account?error=discord_join_failed`,
				);
			}

			// Check subscription status
			console.log("Checking subscription status...");
			const { data: subscription, error: subError } = await supabase
				.from("subscriptions")
				.select("*")
				.in("status", ["trialing", "active"])
				.single();

			if (subError) {
				console.error("Subscription check failed:", subError);
			}
			console.log("Subscription status:", subscription ? "active" : "inactive");

			try {
				if (subscription) {
					console.log("Adding paid role...");
					await discord.addGuildMemberRole(
						process.env.DISCORD_GUILD_ID!,
						discordUser.id,
						process.env.DISCORD_PAID_ROLE_ID!,
					);
					console.log("Added paid role for new connection");
				} else {
					console.log("Adding unpaid role...");
					await discord.addGuildMemberRole(
						process.env.DISCORD_GUILD_ID!,
						discordUser.id,
						process.env.DISCORD_UNPAID_ROLE_ID!,
					);
					console.log("Added unpaid role for new connection");
				}
			} catch (roleError) {
				console.error("Failed to add role:", roleError);
				return NextResponse.redirect(
					`${origin}/account?error=discord_role_failed`,
				);
			}

			console.log("Discord connection process completed successfully");
			return NextResponse.redirect(
				`${origin}/account?success=discord_connected`,
			);
		} catch (fetchError) {
			console.error("Fetch error:", fetchError);
			return NextResponse.redirect(`${origin}/account?error=network_error`);
		}
	} catch (error) {
		console.error("Top level error:", error);
		console.error("Error details:", {
			message: error instanceof Error ? error.message : "Unknown error",
			stack: error instanceof Error ? error.stack : undefined,
		});
		return NextResponse.redirect(
			`${origin}/account?error=initial_setup_failed`,
		);
	}
}
