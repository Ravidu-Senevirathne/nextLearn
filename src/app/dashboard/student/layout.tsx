import React from 'react';
import { ThemeProvider } from '@/hooks/useTheme';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import StudentDashboardLayout from '@/Components/Dashboard/student/Layout';

export default async function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check session on the server side
    const session = await getServerSession(authOptions);

    // Redirect to login if no session or incorrect role
    if (!session || !session.user || session.user.role !== "student") {
        redirect("/auth/login");
    }

    return (
        <ThemeProvider>
            <StudentDashboardLayout>{children}</StudentDashboardLayout>
        </ThemeProvider>
    );
}
