"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ClientLoginWrapper from "@/Components/auth/ClientLoginWrapper";

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    let errorMessage = "An error occurred during authentication";

    // Map error codes to user-friendly messages
    switch (error) {
        case "Configuration":
            errorMessage = "There is a problem with the server configuration. Please try again later.";
            break;
        case "AccessDenied":
            errorMessage = "You do not have permission to access this resource.";
            break;
        case "Verification":
            errorMessage = "The verification link is invalid or has expired.";
            break;
        case "OAuthSignin":
        case "OAuthCallback":
        case "OAuthCreateAccount":
            errorMessage = "There was a problem with the OAuth login. Please try again.";
            break;
        case "EmailCreateAccount":
        case "EmailSignin":
            errorMessage = "The email login failed. Please check your email address.";
            break;
        case "CredentialsSignin":
            errorMessage = "The email or password you entered is incorrect.";
            break;
        case "SessionRequired":
            errorMessage = "You must be signed in to access this page.";
            break;
        default:
            errorMessage = `Authentication error: ${error || "Unknown error"}. Please try again.`;
    }

    return (
        <ClientLoginWrapper>
            <div className="w-full max-w-md px-8 py-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-6">Authentication Error</h1>
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                        <p>{errorMessage}</p>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <Link
                            href="/auth/login"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                        >
                            Return to Login
                        </Link>
                        <Link
                            href="/"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Return to Home Page
                        </Link>
                    </div>
                </div>
            </div>
        </ClientLoginWrapper>
    );
}
