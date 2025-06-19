interface DiscordAPIClient {
	getGuildMember: (guildId: string, userId: string) => Promise<any>;
	addGuildMemberRole: (
		guildId: string,
		userId: string,
		roleId: string,
	) => Promise<void>;
	removeGuildMemberRole: (
		guildId: string,
		userId: string,
		roleId: string,
	) => Promise<void>;
}

class DiscordRESTClient implements DiscordAPIClient {
	private token: string;
	private baseUrl = "https://discord.com/api/v10";

	constructor(token: string) {
		this.token = token;
	}

	private async fetch(endpoint: string, options: RequestInit = {}) {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			...options,
			headers: {
				Authorization: `Bot ${this.token}`,
				"Content-Type": "application/json",
				...options.headers,
			},
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(
				`Discord API Error: ${response.status} ${JSON.stringify(error)}`,
			);
		}

		return response;
	}

	async getGuildMember(guildId: string, userId: string) {
		const response = await this.fetch(`/guilds/${guildId}/members/${userId}`);
		return response.json();
	}

	async addGuildMemberRole(guildId: string, userId: string, roleId: string) {
		await this.fetch(`/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
			method: "PUT",
		});
	}

	async removeGuildMemberRole(guildId: string, userId: string, roleId: string) {
		await this.fetch(`/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
			method: "DELETE",
		});
	}
}

let discordClient: DiscordRESTClient | null = null;

export async function getDiscordClient() {
	if (!discordClient && process.env.DISCORD_BOT_TOKEN) {
		discordClient = new DiscordRESTClient(process.env.DISCORD_BOT_TOKEN);
	}
	return discordClient;
}
