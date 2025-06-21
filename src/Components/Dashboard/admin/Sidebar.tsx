"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Settings,
    LineChart,
    Bell,
    Shield,
    HelpCircle,
    MessageSquare,
    Database,
    FileText,
    LogOut,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import LogoutButton from '@/Components/auth/LogoutButton';

// Create a LogoutButtonWrapper component that doesn't pass children to LogoutButton
const LogoutButtonWrapper = ({ className, variant }: { className?: string, variant?: string }) => {
    return (
        <LogoutButton variant={variant as any} className={className} />
    );
};

interface SidebarProps {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (dropdown: string) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(dropdown);
        }
    };

    return (
        <>
            {/* Logo and toggle button */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center">
                    <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-500 ${!sidebarOpen && 'hidden'}`}>
                        NextLearn Admin
                    </span>
                    <span className={`text-xl font-bold text-red-400 ${sidebarOpen && 'hidden'}`}>N</span>
                </Link>
                <button
                    onClick={toggleSidebar}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none hidden lg:block"
                >
                    {sidebarOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {/* Navigation menu */}
            <div className="space-y-1">
                <Link
                    href="/dashboard/admin"
                    className="flex items-center px-3 py-2 rounded-md bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                    <LayoutDashboard size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Dashboard</span>}
                </Link>

                <div>
                    <button
                        onClick={() => toggleDropdown('users')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        <div className="flex items-center">
                            <Users size={sidebarOpen ? 18 : 20} className="min-w-5" />
                            {sidebarOpen && <span className="ml-3">User Management</span>}
                        </div>
                        {sidebarOpen && (
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${activeDropdown === 'users' ? 'rotate-180' : ''}`}
                            />
                        )}
                    </button>
                    {sidebarOpen && activeDropdown === 'users' && (
                        <div className="ml-6 mt-1 space-y-1">
                            <Link
                                href="/dashboard/admin/users"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                All Users
                            </Link>
                            <Link
                                href="/dashboard/admin/users/students"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                Students
                            </Link>
                            <Link
                                href="/dashboard/admin/users/lecturers"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                Lecturers
                            </Link>
                            <Link
                                href="/dashboard/admin/users/admins"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                Administrators
                            </Link>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        onClick={() => toggleDropdown('courses')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        <div className="flex items-center">
                            <BookOpen size={sidebarOpen ? 18 : 20} className="min-w-5" />
                            {sidebarOpen && <span className="ml-3">Course Management</span>}
                        </div>
                        {sidebarOpen && (
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${activeDropdown === 'courses' ? 'rotate-180' : ''}`}
                            />
                        )}
                    </button>
                    {sidebarOpen && activeDropdown === 'courses' && (
                        <div className="ml-6 mt-1 space-y-1">
                            <Link
                                href="/dashboard/admin/courses"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                All Courses
                            </Link>
                            <Link
                                href="/dashboard/admin/courses/categories"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                Categories
                            </Link>
                            <Link
                                href="/dashboard/admin/courses/approvals"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                Pending Approvals
                            </Link>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        onClick={() => toggleDropdown('reports')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        <div className="flex items-center">
                            <LineChart size={sidebarOpen ? 18 : 20} className="min-w-5" />
                            {sidebarOpen && <span className="ml-3">Reports & Analytics</span>}
                        </div>
                        {sidebarOpen && (
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${activeDropdown === 'reports' ? 'rotate-180' : ''}`}
                            />
                        )}
                    </button>
                    {sidebarOpen && activeDropdown === 'reports' && (
                        <div className="ml-6 mt-1 space-y-1">
                            <Link
                                href="/dashboard/admin/reports/usage"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                Platform Usage
                            </Link>
                            <Link
                                href="/dashboard/admin/reports/enrollments"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                Enrollments
                            </Link>
                            <Link
                                href="/dashboard/admin/reports/revenue"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                Revenue
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    href="/dashboard/admin/announcements"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                    <Bell size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Announcements</span>}
                </Link>

                <Link
                    href="/dashboard/admin/support"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                    <HelpCircle size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Support Tickets</span>}
                </Link>

                <Link
                    href="/dashboard/admin/messages"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                    <MessageSquare size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Messages</span>}
                </Link>

                <div>
                    <button
                        onClick={() => toggleDropdown('system')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        <div className="flex items-center">
                            <Database size={sidebarOpen ? 18 : 20} className="min-w-5" />
                            {sidebarOpen && <span className="ml-3">System</span>}
                        </div>
                        {sidebarOpen && (
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${activeDropdown === 'system' ? 'rotate-180' : ''}`}
                            />
                        )}
                    </button>
                    {sidebarOpen && activeDropdown === 'system' && (
                        <div className="ml-6 mt-1 space-y-1">
                            <Link
                                href="/dashboard/admin/system/logs"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                System Logs
                            </Link>
                            <Link
                                href="/dashboard/admin/system/backups"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                Backups
                            </Link>
                            <Link
                                href="/dashboard/admin/system/maintenance"
                                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                Maintenance
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    href="/dashboard/admin/settings"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                    <Settings size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Settings</span>}
                </Link>

                <Link
                    href="/dashboard/admin/security"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                    <Shield size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Security</span>}
                </Link>
            </div>

            {/* Logout button */}
            <div className="mt-auto pt-8">
                <LogoutButtonWrapper
                    variant="ghost"
                    className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                />
            </div>
        </>
    );
};

export default Sidebar;
