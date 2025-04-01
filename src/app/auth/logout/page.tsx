"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await signOut({ redirect: false });
                router.push("/");
            } catch (error) {
                console.error("Error during logout:", error);
                // Redirect to home page even if there's an error
                router.push("/");
            }
        };

        performLogout();
    }, [router]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
                <p>Please wait while we sign you out.</p>
            </div>
        </div>
    );
}
