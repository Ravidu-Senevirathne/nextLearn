import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

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
                    // Call your authentication API
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
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Add role to JWT token when user signs in
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            // Add role to session
            if (session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
    },
    session: {
        strategy: "jwt",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
