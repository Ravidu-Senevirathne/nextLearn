"use client";

import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, Search, Bell, Shield } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const AdminDashboardLayout: React.FC<LayoutProps> = ({
    children,
    title = "Admin Dashboard"
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const notificationCount = 5;

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Sidebar - Mobile */}
            <div className={`lg:hidden fixed inset-0 z-40 ${mobileSidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileSidebarOpen(false)}></div>
                <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 p-4 overflow-y-auto">
                    <Sidebar sidebarOpen={true} toggleSidebar={toggleSidebar} />
                </div>
            </div>

            {/* Sidebar - Desktop */}
            <div className={`hidden lg:block bg-gray-900 ${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 transition-all duration-300 p-4 overflow-y-auto`}>
                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top nav */}
                <header className="sticky top-0 z-30 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 p-4 flex-shrink-0">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                onClick={toggleSidebar}
                                className="mr-4 p-2 rounded-md hover:bg-gray-800 focus:outline-none hidden lg:block"
                            >
                                <Menu size={20} />
                            </button>
                            <div className="flex items-center">
                                <Shield size={20} className="mr-2 text-red-400" />
                                <h1 className="text-xl font-semibold">{title}</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-gray-800 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-48"
                                />
                                <Search size={16} className="absolute left-3 top-2 text-gray-400" />
                            </div>
                            <button className="p-2 rounded-full hover:bg-gray-800 relative">
                                <Bell size={20} />
                                {notificationCount > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                    A
                                </div>
                                <span className="hidden md:inline text-sm">Admin User</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content - Fixed scrolling */}
                <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;
