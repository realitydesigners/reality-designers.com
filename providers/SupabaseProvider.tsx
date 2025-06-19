"use client";

import { createClient } from "@/lib/supabase/client";

import type { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, use, useEffect, useState } from "react";

type UserDetails = any["public"]["Tables"]["users"]["Row"];
type DiscordConnection = any["public"]["Tables"]["discord_connections"]["Row"];
type Subscription = any; // Replace with your subscription type

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userDetails: UserDetails | null;
  subscription: Subscription | null;
  discordConnection: DiscordConnection | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = use(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function SupabaseProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [supabaseClient] = useState(() => createClient());
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(initialUser);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [discordConnection, setDiscordConnection] =
    useState<DiscordConnection | null>(null);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const router = useRouter();

  const signOut = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        console.error("Error during sign out:", error);
        return;
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
    }
  };

  // Fetch user data when user changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserDetails(null);
        setSubscription(null);
        setDiscordConnection(null);
        return;
      }

      try {
        const { data: details } = await supabaseClient
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        // console.log('User details fetched:', details);

        // Fetch subscription using the same query as queries.ts
        const { data: sub, error: subError } = await supabaseClient
          .from("subscriptions")
          .select("*, prices(*)")
          .in("status", ["trialing", "active"])
          .maybeSingle();

        // console.log('Subscription query:', {
        //     userId: user.id,
        //     subscription: sub,
        //     error: subError?.message,
        // });

        setSubscription(sub);

        // Fetch discord connection
        const { data: discord } = await supabaseClient
          .from("discord_connections")
          .select("*")
          .eq("user_id", user.id)
          .single();

        setUserDetails(details);
        setDiscordConnection(discord);
      } catch (error) {
        // console.error('Error in fetchUserData:', error);
        setSubscription(null);
        setUserDetails(null);
        setDiscordConnection(null);
      }
    };

    // console.log('useEffect triggered with user:', user?.id);
    fetchUserData();
  }, [user, supabaseClient]);

  useEffect(() => {
    if (initialUser) {
      setSession({ user: initialUser } as Session);
      setIsLoading(false);
    }

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);

        if (event === "SIGNED_OUT") {
          router.push("/");
          router.refresh();
        }
      }
    );

    if (!initialUser) {
      supabaseClient.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      });
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabaseClient, router, initialUser]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userDetails,
        subscription,
        discordConnection,
        isLoading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
