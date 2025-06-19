import { getDiscordConnection } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { getDiscordClient } from "./client";

export async function manageDiscordAccess(
	stripeCustomerId: string,
	isActive: boolean,
) {
	const supabase = await createClient();

	try {
		// 1. Get user from stripe customer ID
		const { data: customer } = await supabase
			.from("customers")
			.select("id")
			.eq("stripe_customer_id", stripeCustomerId)
			.single();

		if (!customer) {
			console.error("No customer found for stripe ID:", stripeCustomerId);
			return;
		}

		// 2. Get Discord connection
		const discordConnection = await getDiscordConnection(supabase);

		if (!discordConnection) {
			console.log("No Discord connection found for user");
			return;
		}

		const discord = await getDiscordClient();
		if (!discord) {
			throw new Error("Discord client not initialized");
		}

		// 3. Get Discord guild member
		const member = await discord.getGuildMember(
			process.env.DISCORD_GUILD_ID!,
			discordConnection.discord_user_id,
		);

		// 4. Manage roles based on subscription status
		if (isActive) {
			// Add paid role and remove unpaid role
			await Promise.all([
				discord.addGuildMemberRole(
					process.env.DISCORD_GUILD_ID!,
					discordConnection.discord_user_id,
					process.env.DISCORD_PAID_ROLE_ID!,
				),
				discord.removeGuildMemberRole(
					process.env.DISCORD_GUILD_ID!,
					discordConnection.discord_user_id,
					process.env.DISCORD_UNPAID_ROLE_ID!,
				),
			]);
		} else {
			// Remove paid role and add unpaid role
			await Promise.all([
				discord.removeGuildMemberRole(
					process.env.DISCORD_GUILD_ID!,
					discordConnection.discord_user_id,
					process.env.DISCORD_PAID_ROLE_ID!,
				),
				discord.addGuildMemberRole(
					process.env.DISCORD_GUILD_ID!,
					discordConnection.discord_user_id,
					process.env.DISCORD_UNPAID_ROLE_ID!,
				),
			]);
		}

		console.log(
			`Successfully updated roles for Discord user ${discordConnection.discord_user_id} to ${isActive ? "paid" : "unpaid"}`,
		);
	} catch (error) {
		console.error("Error managing Discord access:", error);
		if (error instanceof Error) {
			console.error("Error details:", error.message);
			console.error("Error stack:", error.stack);
		}
	}
}
