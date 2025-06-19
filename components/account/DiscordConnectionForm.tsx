"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";

type DiscordConnection = any["public"]["Tables"]["discord_connections"]["Row"];

// Get the base URL dynamically
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // For production, always use the non-www version
    if (window.location.hostname === "www.rthmn.com") {
      return "https://rthmn.com";
    }
    return window.location.origin;
  }
  // Default to the non-www version for production
  return process.env.NEXT_PUBLIC_SITE_URL || "https://rthmn.com";
};

// Use dynamic redirect URI based on environment
const DISCORD_OAUTH_URL =
  "https://discord.com/oauth2/authorize?" +
  new URLSearchParams({
    client_id: "1297321318030639114",
    redirect_uri: `${getBaseUrl()}/api/discord/callback`,
    response_type: "code",
    scope: "identify guilds.join",
  }).toString();

export default function DiscordConnectionForm({
  discordConnection,
  subscription,
}: {
  discordConnection: DiscordConnection | null;
  subscription: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleDisconnect = async () => {
    try {
      setIsLoading(true);

      await fetch("/api/discord/disconnect", {
        method: "POST",
        body: JSON.stringify({
          discord_user_id: discordConnection?.discord_user_id,
        }),
      });

      await supabase
        .from("discord_connections")
        .delete()
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      window.location.reload();
    } catch (error) {
      console.error("Error disconnecting Discord:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 rounded-md bg-[#5865F2]/10 p-2">
          <FaDiscord className="h-4 w-4 text-[#5865F2]" />
        </div>
        <div className="min-w-0">
          <h3 className="font-russo text-base font-semibold text-white">
            Discord Connection
          </h3>
          <p className="font-russo truncate text-xs text-zinc-400">
            {discordConnection
              ? `Connected as ${discordConnection.discord_username}`
              : "Connect your Discord account"}
          </p>
        </div>
      </div>

      <div className="mt-3 pl-9">
        {discordConnection ? (
          <button
            onClick={handleDisconnect}
            disabled={isLoading}
            className="flex w-auto items-center justify-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-red-500 transition-all duration-200 hover:bg-red-500/20 disabled:opacity-50"
          >
            <span className="font-russo text-sm">
              {isLoading ? "Disconnecting..." : "Disconnect"}
            </span>
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = DISCORD_OAUTH_URL)}
            className="flex w-auto items-center justify-center gap-2 rounded-full bg-[#5865F2] px-4 py-2 text-white transition-all duration-200 hover:bg-[#4752C4]"
          >
            <span className="font-russo text-sm">Connect Discord</span>
          </button>
        )}
      </div>
    </div>
  );
}
