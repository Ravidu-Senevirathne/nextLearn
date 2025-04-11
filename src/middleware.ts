import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function will run before pages are rendered
export default withAuth(
    function middleware(request: any) { // Using any to access NextAuth's token
        // Get the pathname from the URL
        const path = request.nextUrl.pathname;

        // Get the user's token which includes role information
        const token = request.nextauth?.token;

        // If user is not logged in, they'll be redirected to login page by withAuth

        // If path starts with /dashboard/lecturer but user is not a lecturer
        if (path.startsWith("/dashboard/lecturer") && token?.role !== "lecturer") {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        // If path starts with /dashboard/student but user is not a student
        if (path.startsWith("/dashboard/student") && token?.role !== "student") {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        // Allow the user to proceed
        return NextResponse.next();
    },
    {
        callbacks: {
            // Only run middleware on the dashboard routes
            authorized: ({ token }) => !!token,
        },
    }
);

// Specify which routes this middleware should run on
export const config = {
    matcher: ["/dashboard/:path*"],
};
