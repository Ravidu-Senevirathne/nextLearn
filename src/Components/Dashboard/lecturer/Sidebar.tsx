"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    BarChart2,
    BookOpen,
    FileText,
    Users,
    Calendar,
    TrendingUp,
    MessageSquare,
    User,
    Settings,
    LogOut,
    ChevronDown,
    ChevronUp,
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
                    href="/dashboard/lecturer"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <BarChart2 size={sidebarOpen ? 18 : 20} className="min-w-5" />
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
                                href="/dashboard/lecturer/courses"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                All Courses
                            </Link>
                            <Link
                                href="/dashboard/lecturer/courses/create"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Create Course
                            </Link>
                            <Link
                                href="/dashboard/lecturer/lessons"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Manage Lessons
                            </Link>
                        </div>
                    )}
                </div>

                {/* Rest of navigation items - similar pattern */}
                <div>
                    <button
                        onClick={() => toggleDropdown('assessments')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                    >
                        <div className="flex items-center">
                            <FileText size={sidebarOpen ? 18 : 20} className="min-w-5" />
                            {sidebarOpen && <span className="ml-3">Assessments</span>}
                        </div>
                        {sidebarOpen && (
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${activeDropdown === 'assessments' ? 'rotate-180' : ''}`}
                            />
                        )}
                    </button>
                    {sidebarOpen && activeDropdown === 'assessments' && (
                        <div className="ml-6 mt-1 space-y-1">
                            <Link
                                href="/dashboard/lecturer/assignments"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Assignments
                            </Link>
                            <Link
                                href="/dashboard/lecturer/quizzes"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Quizzes
                            </Link>
                            <Link
                                href="/dashboard/lecturer/exams"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Exams
                            </Link>
                        </div>
                    )}
                </div>

                {/* More navigation links */}
                <Link
                    href="/dashboard/lecturer/students"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <Users size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Students</span>}
                </Link>

                <Link
                    href="/dashboard/lecturer/calendar"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <Calendar size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Calendar</span>}
                </Link>

                <div>
                    <button
                        onClick={() => toggleDropdown('progress')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                    >
                        <div className="flex items-center">
                            <TrendingUp size={sidebarOpen ? 18 : 20} className="min-w-5" />
                            {sidebarOpen && <span className="ml-3">Progress</span>}
                        </div>
                        {sidebarOpen && (
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${activeDropdown === 'progress' ? 'rotate-180' : ''}`}
                            />
                        )}
                    </button>
                    {sidebarOpen && activeDropdown === 'progress' && (
                        <div className="ml-6 mt-1 space-y-1">
                            <Link
                                href="/dashboard/lecturer/progress/grades"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Grades
                            </Link>
                            <Link
                                href="/dashboard/lecturer/progress/statistics"
                                className="block px-3 py-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Statistics
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    href="/dashboard/lecturer/messages"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <MessageSquare size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Messages</span>}
                </Link>

                <Link
                    href="/dashboard/lecturer/profile"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                >
                    <User size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Profile</span>}
                </Link>

                <Link
                    href="/dashboard/lecturer/settings"
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
