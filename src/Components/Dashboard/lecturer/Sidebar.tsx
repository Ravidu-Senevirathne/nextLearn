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
    theme: 'light' | 'dark';
}

// Create a LogoutButtonWrapper component that doesn't pass children to LogoutButton
const LogoutButtonWrapper = ({ className, variant }: { className?: string, variant?: string }) => {
    return (
        <LogoutButton variant={variant as any} className={className} />
    );
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar, theme }) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (dropdown: string) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(dropdown);
        }
    };

    // Dynamic classes based on theme
    const getLinkClasses = (isActive: boolean = false) => {
        const baseClasses = "flex items-center px-3 py-2 rounded-md transition-colors";

        if (theme === 'dark') {
            return `${baseClasses} ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`;
        } else {
            return `${baseClasses} ${isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'}`;
        }
    };

    const getDropdownClasses = () => {
        const baseClasses = "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors";

        if (theme === 'dark') {
            return `${baseClasses} text-gray-300 hover:bg-gray-800 hover:text-white`;
        } else {
            return `${baseClasses} text-slate-600 hover:bg-teal-50 hover:text-teal-700`;
        }
    };

    const getSubLinkClasses = () => {
        const baseClasses = "block px-3 py-2 rounded-md text-sm transition-colors";

        if (theme === 'dark') {
            return `${baseClasses} text-gray-400 hover:bg-gray-800 hover:text-white`;
        } else {
            return `${baseClasses} text-slate-500 hover:bg-teal-50 hover:text-teal-700`;
        }
    };

    return (
        <>
            {/* Logo and toggle button */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center">
                    <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme === 'dark' ? 'from-blue-400 to-purple-500' : 'from-teal-500 to-cyan-600'} ${!sidebarOpen && 'hidden'}`}>
                        NextLearn
                    </span>
                    <span className={`text-xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-teal-600'} ${sidebarOpen && 'hidden'}`}>N</span>
                </Link>
                <button
                    onClick={toggleSidebar}
                    className={`p-1 rounded-md focus:outline-none hidden lg:block ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-teal-50 text-slate-500'}`}
                >
                    {sidebarOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {/* Navigation menu */}
            <div className="space-y-1">
                <Link
                    href="/dashboard/lecturer"
                    className={getLinkClasses()}
                >
                    <BarChart2 size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Dashboard</span>}
                </Link>

                <div>
                    <button
                        onClick={() => toggleDropdown('courses')}
                        className={getDropdownClasses()}
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
                                className={getSubLinkClasses()}
                            >
                                All Courses
                            </Link>
                            <Link
                                href="/dashboard/lecturer/courses/create"
                                className={getSubLinkClasses()}
                            >
                                Create Course
                            </Link>
                            <Link
                                href="/dashboard/lecturer/lessons"
                                className={getSubLinkClasses()}
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
                        className={getDropdownClasses()}
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
                                className={getSubLinkClasses()}
                            >
                                Assignments
                            </Link>
                            <Link
                                href="/dashboard/lecturer/quizzes"
                                className={getSubLinkClasses()}
                            >
                                Quizzes
                            </Link>
                            <Link
                                href="/dashboard/lecturer/exams"
                                className={getSubLinkClasses()}
                            >
                                Exams
                            </Link>
                        </div>
                    )}
                </div>

                {/* More navigation links */}
                <div>
                    <button
                        onClick={() => toggleDropdown('students')}
                        className={getDropdownClasses()}
                    >
                        <div className="flex items-center">
                            <Users size={sidebarOpen ? 18 : 20} className="min-w-5" />
                            {sidebarOpen && <span className="ml-3">Students</span>}
                        </div>
                        {sidebarOpen && (
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${activeDropdown === 'students' ? 'rotate-180' : ''}`}
                            />
                        )}
                    </button>
                    {sidebarOpen && activeDropdown === 'students' && (
                        <div className="ml-6 mt-1 space-y-1">
                            <Link
                                href="/dashboard/lecturer/students"
                                className={getSubLinkClasses()}
                            >
                                All Students
                            </Link>
                            <Link
                                href="/dashboard/lecturer/students/groups"
                                className={getSubLinkClasses()}
                            >
                                Student Groups
                            </Link>
                            <Link
                                href="/dashboard/lecturer/students/enrollments"
                                className={getSubLinkClasses()}
                            >
                                Enrollments
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    href="/dashboard/lecturer/calendar"
                    className={getLinkClasses()}
                >
                    <Calendar size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Calendar</span>}
                </Link>

                <div>
                    <button
                        onClick={() => toggleDropdown('progress')}
                        className={getDropdownClasses()}
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
                                className={getSubLinkClasses()}
                            >
                                Grades
                            </Link>
                            <Link
                                href="/dashboard/lecturer/progress/statistics"
                                className={getSubLinkClasses()}
                            >
                                Statistics
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    href="/dashboard/lecturer/messages"
                    className={getLinkClasses()}
                >
                    <MessageSquare size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Messages</span>}
                </Link>

                <Link
                    href="/dashboard/lecturer/profile"
                    className={getLinkClasses()}
                >
                    <User size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Profile</span>}
                </Link>

                <Link
                    href="/dashboard/lecturer/settings"
                    className={getLinkClasses()}
                >
                    <Settings size={sidebarOpen ? 18 : 20} className="min-w-5" />
                    {sidebarOpen && <span className="ml-3">Settings</span>}
                </Link>
            </div>

            {/* Logout button */}
            <div className="mt-auto pt-8">
                <LogoutButtonWrapper
                    variant="ghost"
                    className={`w-full justify-start ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'}`}
                />
            </div>
        </>
    );
};

export default Sidebar;
