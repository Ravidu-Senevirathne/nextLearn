'use client';
import React from 'react';
import { ThemeProvider } from '@/hooks/useTheme';
import DashboardLayout from '@/Components/Dashboard/lecturer/Layout';

export default function LecturerDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </ThemeProvider>
    );
}
