import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

// More robust secret handling
const getSecret = () => {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
        throw new Error("Missing NEXTAUTH_SECRET environment variable");
    }
    return secret;
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                try {
                    // Update the URL to include the /api prefix
                    const response = await fetch("http://localhost:8000/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    // Handle non-OK responses with detailed error messages
                    if (!response.ok) {
                        const errorData = await response.json().catch(() => null);
                        const errorMessage = errorData?.message || `Error ${response.status}: ${response.statusText}`;
                        console.error("Authentication API error:", errorMessage);
                        throw new Error(errorMessage);
                    }

                    const userData = await response.json();

                    // Verify that user data structure is as expected
                    if (!userData || !userData.user) {
                        throw new Error("Invalid response structure from authentication server");
                    }

                    // Return user data including role
                    return {
                        id: userData.user.id,
                        email: userData.user.email,
                        name: userData.user.name,
                        role: userData.user.role,
                    };
                } catch (error: any) {
                    console.error("Authentication error:", error);
                    throw new Error(error?.message || "Authentication failed");
                }
            },
        }),
        // Add these if you have them configured in your environment variables
        // Otherwise they will be properly skipped by NextAuth
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            })
        ] : []),
        ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [
            GithubProvider({
                clientId: process.env.GITHUB_ID,
                clientSecret: process.env.GITHUB_SECRET,
            })
        ] : []),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Direct reference rather than through function
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        async jwt({ token, user, account }) {
            // If user object exists (on sign-in), add role to token
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            // Add role from token to session user
            if (session.user) {
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
