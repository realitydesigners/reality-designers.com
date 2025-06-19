import { getDiscordClient } from "@/lib/discord/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const discord = await getDiscordClient();
		if (!discord) {
			throw new Error("Discord client not initialized");
		}

		const { discord_user_id } = await request.json();

		// Remove both roles when disconnecting
		await Promise.all([
			discord.removeGuildMemberRole(
				process.env.DISCORD_GUILD_ID!,
				discord_user_id,
				process.env.DISCORD_PAID_ROLE_ID!,
			),
			discord.removeGuildMemberRole(
				process.env.DISCORD_GUILD_ID!,
				discord_user_id,
				process.env.DISCORD_UNPAID_ROLE_ID!,
			),
		]);

		console.log("Removed Discord roles for user:", discord_user_id);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error removing Discord roles:", error);
		return NextResponse.json(
			{ error: "Failed to remove Discord roles" },
			{ status: 500 },
		);
	}
}
