"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu, Search, Bell, Moon, Sun } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const DashboardLayout: React.FC<LayoutProps> = ({
    children,
    title = "Lecturer Dashboard"
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
            setTheme(storedTheme);
            document.documentElement.setAttribute('data-theme', storedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
        }
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`flex h-screen overflow-hidden ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gradient-to-br from-sky-50 via-white to-teal-50 text-slate-800'}`} data-theme={theme}>
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    className={`p-2 rounded-md focus:outline-none focus:ring-2 ${theme === 'dark'
                        ? 'bg-gray-800 hover:bg-gray-700 focus:ring-gray-600'
                        : 'bg-white hover:bg-teal-50 focus:ring-teal-300 shadow-md border border-teal-100'
                        }`}
                >
                    <Menu size={20} className={theme === 'light' ? 'text-teal-600' : ''} />
                </button>
            </div>

            {/* Conditionally render either mobile or desktop sidebar */}
            {/* Mobile Sidebar - Only rendered when mobileSidebarOpen is true */}
            {mobileSidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-40">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileSidebarOpen(false)}></div>
                    <div className={`fixed inset-y-0 left-0 w-64 p-4 overflow-y-auto ${theme === 'dark'
                        ? 'bg-gray-900'
                        : 'bg-white shadow-xl border-r border-teal-100'
                        }`}>
                        <Sidebar sidebarOpen={true} toggleSidebar={toggleSidebar} theme={theme} />
                    </div>
                </div>
            )}

            {/* Desktop Sidebar - Only visible on large screens */}
            <div className={`hidden lg:block ${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 transition-all duration-300 p-4 overflow-y-auto ${theme === 'dark'
                ? 'bg-gray-900'
                : 'bg-white border-r border-teal-100 shadow-sm'
                }`}>
                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top nav */}
                <header className={`sticky top-0 z-30 backdrop-blur-sm p-4 flex-shrink-0 ${theme === 'dark'
                    ? 'bg-gray-900/90 border-b border-gray-800'
                    : 'bg-white/80 border-b border-teal-100 shadow-sm'
                    }`}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            {/* Remove the hamburger menu button from desktop view and keep it only for mobile */}
                            <h1 className={`text-xl font-semibold ${theme === 'light' ? 'text-teal-700' : ''}`}>{title}</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className={`rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:ring-2 ${theme === 'dark'
                                        ? 'bg-gray-800 focus:ring-blue-500'
                                        : 'bg-slate-50 focus:ring-teal-300 border border-slate-200'
                                        } w-48`}
                                />
                                <Search size={16} className={`absolute left-3 top-2 ${theme === 'dark' ? 'text-gray-400' : 'text-teal-500'}`} />
                            </div>
                            <button className={`p-2 rounded-full relative ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-teal-50 text-teal-600'
                                }`}>
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full focus:outline-none ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-teal-50'
                                    }`}
                            >
                                {theme === 'light' ? <Moon size={20} className="text-teal-600" /> : <Sun size={20} className="text-yellow-300" />}
                            </button>

                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-md">
                                    L
                                </div>
                                <span className={`hidden md:inline text-sm ${theme === 'light' ? 'text-slate-700 font-medium' : ''}`}>Dr. Jane Smith</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content - Fixed scrolling */}
                <main className={`flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8 ${theme === 'dark'
                    ? ''
                    : 'bg-gradient-to-br from-sky-50/50 via-white to-teal-50/50'
                    }`}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
