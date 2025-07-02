"use client";

import React from 'react';
import {
    Users,
    BookOpen,
    GraduationCap,
    LineChart,
    AlertTriangle,
    UserPlus,
    Bell,
    Database,
    HelpCircle,
    ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// Sample data for statistics
const stats = [
    { title: 'Total Users', value: '2,345', icon: Users, color: 'bg-blue-500', change: '+120', link: '/dashboard/admin/users' },
    { title: 'Total Courses', value: '187', icon: BookOpen, color: 'bg-green-500', change: '+24', link: '/dashboard/admin/courses' },
    { title: 'Active Students', value: '1,872', icon: GraduationCap, color: 'bg-purple-500', change: '+56', link: '/dashboard/admin/users/students' },
    { title: 'Platform Revenue', value: '$12,450', icon: LineChart, color: 'bg-amber-500', change: '+8.2%', link: '/dashboard/admin/reports/revenue' },
];

// Sample data for notifications
const notifications = [
    { id: 1, title: 'New course approval request', time: '10 minutes ago', type: 'approval', link: '/dashboard/admin/courses/approvals' },
    { id: 2, title: 'System backup completed', time: '2 hours ago', type: 'system', link: '/dashboard/admin/system/backups' },
    { id: 3, title: 'New support ticket opened', time: '3 hours ago', type: 'support', link: '/dashboard/admin/support' },
    { id: 4, title: 'Monthly report generated', time: 'Yesterday', type: 'report', link: '/dashboard/admin/reports' },
    { id: 5, title: 'Security alert: unusual login', time: 'Yesterday', type: 'security', link: '/dashboard/admin/security' },
];

// Sample data for pending items
const pendingItems = [
    { id: 1, title: 'Course approvals', count: 5, icon: BookOpen, link: '/dashboard/admin/courses/approvals' },
    { id: 2, title: 'Support tickets', count: 12, icon: HelpCircle, link: '/dashboard/admin/support' },
    { id: 3, title: 'User verifications', count: 8, icon: UserPlus, link: '/dashboard/admin/users' },
    { id: 4, title: 'Security alerts', count: 3, icon: ShieldAlert, link: '/dashboard/admin/security' },
];

// Sample data for system health
const systemHealth = [
    { id: 1, title: 'Server Status', status: 'Operational', value: '99.9%', icon: Database },
    { id: 2, title: 'Database Load', status: 'Normal', value: '32%', icon: Database },
    { id: 3, title: 'Storage Usage', status: 'Warning', value: '87%', icon: Database },
    { id: 4, title: 'API Response Time', status: 'Good', value: '120ms', icon: Database },
];

// Sample data for revenue chart
const revenueData = [
    { name: 'Jan', total: 1200 },
    { name: 'Feb', total: 1900 },
    { name: 'Mar', total: 2300 },
    { name: 'Apr', total: 2800 },
    { name: 'May', total: 3200 },
    { name: 'Jun', total: 3500 },
];

export default function AdminDashboard() {
    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
                <p className="text-gray-400">
                    Monitor platform activity, manage users, and control system settings
                </p>
            </div>

            {/* Platform Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                {stats.map((stat, index) => (
                    <Link href={stat.link} key={index}>
                        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-400 text-sm">{stat.title}</p>
                                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                    <p className="text-green-400 text-xs mt-1">{stat.change} this month</p>
                                </div>
                                <div className={`p-3 rounded-md ${stat.color}`}>
                                    <stat.icon size={20} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Left column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Pending Items */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-700">
                            <h2 className="font-semibold">Pending Items</h2>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pendingItems.map((item) => (
                                    <Link href={item.link} key={item.id}>
                                        <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between hover:bg-gray-600 transition-colors cursor-pointer">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-gray-800 rounded-md mr-3">
                                                    <item.icon size={18} className="text-blue-400" />
                                                </div>
                                                <span>{item.title}</span>
                                            </div>
                                            <div className="bg-red-900/50 text-red-400 w-8 h-8 rounded-full flex items-center justify-center">
                                                {item.count}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-700">
                            <h2 className="font-semibold">System Health</h2>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {systemHealth.map((item) => (
                                    <div key={item.id} className="bg-gray-700 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-gray-800 rounded-md mr-3">
                                                    <item.icon size={18} className="text-blue-400" />
                                                </div>
                                                <span>{item.title}</span>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Operational' || item.status === 'Good'
                                                ? 'bg-green-900/50 text-green-400'
                                                : item.status === 'Warning'
                                                    ? 'bg-amber-900/50 text-amber-400'
                                                    : item.status === 'Normal'
                                                        ? 'bg-blue-900/50 text-blue-400'
                                                        : 'bg-red-900/50 text-red-400'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="text-xl font-semibold">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column - Notifications */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                        <h2 className="font-semibold">Recent Notifications</h2>
                        <Link href="/dashboard/admin/notifications" className="text-sm text-blue-400 hover:text-blue-300">
                            View All
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-700">
                        {notifications.map((notification) => (
                            <Link href={notification.link} key={notification.id}>
                                <div className="p-4 hover:bg-gray-700 transition-colors cursor-pointer">
                                    <div className="flex items-start">
                                        <div className="p-2 bg-gray-700 rounded-md mr-3">
                                            {notification.type === 'approval' && <BookOpen size={16} className="text-blue-400" />}
                                            {notification.type === 'system' && <Database size={16} className="text-green-400" />}
                                            {notification.type === 'support' && <HelpCircle size={16} className="text-purple-400" />}
                                            {notification.type === 'report' && <LineChart size={16} className="text-amber-400" />}
                                            {notification.type === 'security' && <AlertTriangle size={16} className="text-red-400" />}
                                        </div>
                                        <div>
                                            <p className="text-sm">{notification.title}</p>
                                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Revenue Overview Chart */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h2 className="font-semibold mb-4">Revenue Overview</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={revenueData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Activities */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                    <h2 className="font-semibold">Recent Activities</h2>
                </div>
                <div className="p-4">
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                                <div className="flex-1">
                                    <p className="text-sm font-medium">User enrolled in course</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
