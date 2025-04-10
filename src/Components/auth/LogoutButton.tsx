"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { LogOut, Loader2 } from "lucide-react";

interface LogoutButtonProps {
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" |
    "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

export default function LogoutButton({ className, variant = "default", size = "default" }: LogoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            // Sign out and redirect to the home page
            await signOut({ callbackUrl: "/" });
        } catch (error) {
            console.error("Logout failed:", error);
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleLogout}
            disabled={isLoading}
            className={`bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 w-full flex items-center min-h-[40px] md:min-h-[44px] ${className}`}
        >
            {isLoading ? (
                <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    <span className="hidden sm:inline">Logging out...</span>
                </>
            ) : (
                <>
                    <LogOut size={16} className="mr-2" />
                    <span className="hidden sm:inline">Logout</span>
                </>
            )}
        </Button>
    );
}
