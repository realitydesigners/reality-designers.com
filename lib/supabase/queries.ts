import type { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export const getUser = cache(async (supabase: SupabaseClient) => {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		return user;
	} catch (error) {
		console.error("Error fetching user:", error);
		return null;
	}
});

export const getSubscription = async (supabase: SupabaseClient) => {
	const { data: subscription, error } = await supabase
		.from("subscriptions")
		.select("*, prices(*)")
		.in("status", ["trialing", "active"])
		.maybeSingle();

	if (error) {
		console.error("getSubscription: Error fetching subscription:", error);
	} else {
	}
	return subscription;
};

export const getProducts = cache(async (supabase: SupabaseClient) => {
	try {
		// Fetch products
		const { data: products, error: productsError } = await supabase
			.from("products")
			.select("*")
			.eq("active", true)
			.order("metadata->index", { ascending: true });

		if (productsError) throw productsError;

		// Fetch prices
		const { data: prices, error: pricesError } = await supabase
			.from("prices")
			.select("*")
			.eq("active", true);

		if (pricesError) throw pricesError;

		// Combine products with their prices
		const productsWithPrices = products.map((product) => {
			const productPrices = prices.filter(
				(price) => price.product_id === product.id,
			);
			return {
				...product,
				prices: productPrices,
			};
		});

		return productsWithPrices;
	} catch (error) {
		console.error("getProducts: Error fetching products:", error);
		return null;
	}
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) throw new Error("No user found");

		// First try to get existing user details
		const { data: userDetails, error } = await supabase
			.from("users")
			.select("*")
			.eq("id", user.id)
			.single();

		if (error) {
			// If user doesn't exist in the users table, create a new record
			if (error.code === "PGRST116") {
				const { data: newUser, error: insertError } = await supabase
					.from("users")
					.insert([
						{
							id: user.id,
							full_name: null,
							avatar_url: null,
							billing_address: null,
							payment_method: null,
							updated_at: new Date().toISOString(),
						},
					])
					.select()
					.single();

				if (insertError) {
					console.error("Error creating user:", insertError);
					throw insertError;
				}
				return newUser;
			}

			console.error("Error fetching user details:", error);
			throw error;
		}

		return userDetails;
	} catch (error) {
		console.error("Error in getUserDetails:", error);
		return null;
	}
});

export const getSignals = cache(async (supabase: SupabaseClient) => {
	try {
		// Simple query - RLS will ensure user is authenticated
		const { data: signals, error } = await supabase
			.from("signals")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;
		return signals;
	} catch (error) {
		console.error("Error fetching signals:", error);
		return null;
	}
});

export const getDiscordConnection = cache(async (supabase: SupabaseClient) => {
	try {
		const { data: discord, error } = await supabase
			.from("discord_connections")
			.select("*")
			.maybeSingle();

		if (error && error.code !== "PGRST116") {
			throw error;
		}

		return discord;
	} catch (error) {
		console.error("Error fetching discord connection:", error);
		return null;
	}
});

export const getSupportThreads = cache(async (supabase: SupabaseClient) => {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) return null;

		const { data, error } = await supabase
			.from("support_threads")
			.select("*")
			.eq("user_id", user.id)
			.order("last_message_time", { ascending: false });

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Error fetching support threads:", error);
		return null;
	}
});

export const getSupportMessages = cache(
	async (supabase: SupabaseClient, threadId: string) => {
		try {
			const { data, error } = await supabase
				.from("support_messages")
				.select("*")
				.eq("thread_id", threadId)
				.order("created_at", { ascending: true });

			if (error) throw error;
			return data;
		} catch (error) {
			console.error("Error fetching support messages:", error);
			return null;
		}
	},
);

export const createSupportThread = cache(
	async (supabase: SupabaseClient, subject: string) => {
		try {
			const {
				data: { user },
				error: userError,
			} = await supabase.auth.getUser();

			if (userError) {
				console.error("Auth error:", userError);
				throw new Error("Authentication error");
			}

			if (!user) {
				throw new Error("No user found");
			}

			// First, get a valid product_id
			const { data: products, error: productsError } = await supabase
				.from("products")
				.select("id")
				.eq("active", true)
				.limit(1)
				.single();

			if (productsError) {
				console.error("Error fetching products:", productsError);
				throw new Error("Failed to fetch product information");
			}

			if (!products) {
				throw new Error("No active products found");
			}

			const { data, error } = await supabase
				.from("support_threads")
				.insert({
					product_id: products.id,
					user_id: user.id,
					user_name: user.user_metadata?.full_name || "User",
					user_email: user.email,
					subject: subject.trim(),
					status: "open",
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				})
				.select()
				.single();

			if (error) {
				console.error("Supabase error details:", {
					code: error.code,
					message: error.message,
					details: error.details,
					hint: error.hint,
				});
				throw new Error(error.message || "Failed to create support thread");
			}

			if (!data) {
				throw new Error("No data returned from insert");
			}

			return data;
		} catch (error) {
			console.error("Error creating support thread:", error);
			if (error instanceof Error) {
				throw error;
			}
			throw new Error("An unexpected error occurred");
		}
	},
);

export const sendSupportMessage = cache(
	async (supabase: SupabaseClient, threadId: string, content: string) => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error("No user found");

			const { data, error } = await supabase
				.from("support_messages")
				.insert({
					thread_id: threadId,
					sender_id: user.id,
					sender_name: user.user_metadata?.full_name || "User",
					sender_type: "user",
					content: content.trim(),
					created_at: new Date().toISOString(),
				})
				.select()
				.single();

			if (error) {
				console.error("Supabase error:", error);
				throw error;
			}

			if (!data) {
				throw new Error("No data returned from insert");
			}

			// Update the last message in the thread
			const { error: updateError } = await supabase
				.from("support_threads")
				.update({
					last_message: content.trim(),
					last_message_time: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				})
				.eq("id", threadId);

			if (updateError) {
				console.error("Error updating thread:", updateError);
				throw updateError;
			}

			return data;
		} catch (error) {
			console.error("Error sending support message:", error);
			throw error;
		}
	},
);
