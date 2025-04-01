"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    Home,
    Calendar,
    FileText,
    BarChart2,
    Download,
    Bell,
    MessageSquare,
    User,
    Settings,
    LogOut,
    ChevronDown,
    ChevronUp,
    GraduationCap
} from 'lucide-react';
import LogoutButton from '@/Components/auth/LogoutButton';

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
                    <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 ${!sidebarOpen && 'hidden'}`}>
                        NextLearn
                    </span>
                    <span className={`text-xl font-bold text-blue-400 ${sidebarOpen && 'hidden'}`}>N</span>
                </Link>
                <button
                    onClick={toggleSidebar}
                    className="p-1 rounded-md hover:bg-gray-800 focus:outline-none hidden lg:block"
                >
                    {sidebarOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {/* Navigation menu */}
            <div className="space-y-1">
                <Link
                    href="/dashboard/student"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <Home size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Dashboard</span>}
                </Link>

                <div>
                    <button
                        onClick={() => toggleDropdown('courses')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                    >
                        <div className="flex items-center">
                            <BookOpen size={sidebarOpen ? 18 : 20} className="min-w-5" />
                            {sidebarOpen && <span className="ml-3">Courses</span>}
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
                                href="/dashboard/student/courses"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                My Courses
                            </Link>
                            <Link
                                href="/dashboard/student/courses/explore"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Explore Courses
                            </Link>
                            <Link
                                href="/dashboard/student/courses/saved"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Saved Courses
                            </Link>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        onClick={() => toggleDropdown('assignments')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                    >
                        <div className="flex items-center">
                            <FileText size={sidebarOpen ? 18 : 20} className="min-w-5" />
                            {sidebarOpen && <span className="ml-3">Assignments</span>}
                        </div>
                        {sidebarOpen && (
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${activeDropdown === 'assignments' ? 'rotate-180' : ''}`}
                            />
                        )}
                    </button>
                    {sidebarOpen && activeDropdown === 'assignments' && (
                        <div className="ml-6 mt-1 space-y-1">
                            <Link
                                href="/dashboard/student/assignments/pending"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Pending
                            </Link>
                            <Link
                                href="/dashboard/student/assignments/submitted"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Submitted
                            </Link>
                            <Link
                                href="/dashboard/student/assignments/grades"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Grades
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    href="/dashboard/student/quizzes"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <GraduationCap size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Quizzes</span>}
                </Link>

                <Link
                    href="/dashboard/student/schedule"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <Calendar size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Schedule</span>}
                </Link>

                <Link
                    href="/dashboard/student/materials"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <Download size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Materials</span>}
                </Link>

                <Link
                    href="/dashboard/student/grades"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <BarChart2 size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Grades</span>}
                </Link>

                <Link
                    href="/dashboard/student/notifications"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <Bell size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Notifications</span>}
                </Link>

                <Link
                    href="/dashboard/student/messages"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <MessageSquare size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Messages</span>}
                </Link>

                <Link
                    href="/dashboard/student/profile"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <User size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Profile</span>}
                </Link>

                <Link
                    href="/dashboard/student/settings"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <Settings size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Settings</span>}
                </Link>
            </div>

            {/* Logout button */}
            <div className="mt-auto pt-8">
                <LogoutButton
                    variant="ghost"
                    className="w-full flex items-center justify-start px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                >
                    <LogOut size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Logout</span>}
                </LogoutButton>
            </div>
        </>
    );
};

export default Sidebar;
