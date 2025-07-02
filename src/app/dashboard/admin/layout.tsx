import React from 'react';
import { ThemeProvider } from '@/hooks/useTheme';
import AdminDashboardLayout from '@/Components/Dashboard/admin/Layout';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <AdminDashboardLayout>{children}</AdminDashboardLayout>
        </ThemeProvider>
    );
}
