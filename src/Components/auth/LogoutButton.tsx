"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { LogOut } from "lucide-react";

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
            className={`bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 w-full flex items-center ${className}`}
        >
            <LogOut size={16} className="mr-2" />
            {isLoading ? "Logging out..." : "Logout"}
        </Button>
    );
}
