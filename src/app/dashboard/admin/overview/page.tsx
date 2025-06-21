"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/Components/ui/button";
import Link from "next/link";
import {
    Users,
    BookOpen,
    BarChart2,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    TrendingUp,
    Clock,
    Award,
    CheckCircle,
    XCircle,
    AlertTriangle
} from "lucide-react";

// Mock data for dashboard
const dashboardStats = {
    totalUsers: 4250,
    totalCourses: 215,
    totalRevenue: 125750,
    activeStudents: 3180,
    pendingApprovals: 8,
    recentSignups: 156,
    completionRate: 78,
    userGrowth: 12.5,
    revenueGrowth: 8.3,
    courseGrowth: 15.2,
};

const recentActivities = [
    {
        id: 1,
        action: "New course submitted",
        subject: "Advanced Machine Learning",
        user: "David Johnson",
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        status: "pending",
    },
    {
        id: 2,
        action: "New user registered",
        subject: "Emma Wilson",
        user: "System",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "success",
    },
    {
        id: 3,
        action: "Course approved",
        subject: "Web Development Masterclass",
        user: "Admin Sara",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        status: "success",
    },
    {
        id: 4,
        action: "Payment failed",
        subject: "Transaction #58729",
        user: "Michael Brown",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        status: "error",
    },
    {
        id: 5,
        action: "Course rejected",
        subject: "Quick Photoshop Tips",
        user: "Admin Mark",
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
        status: "warning",
    },
];

const topCourses = [
    {
        id: 1,
        title: "Complete JavaScript Course",
        students: 845,
        rating: 4.8,
        revenue: 42250,
        instructor: "Sarah Johnson",
    },
    {
        id: 2,
        title: "Python for Data Science",
        students: 712,
        rating: 4.7,
        revenue: 35600,
        instructor: "Michael Lee",
    },
    {
        id: 3,
        title: "UX/UI Design Fundamentals",
        students: 658,
        rating: 4.9,
        revenue: 32900,
        instructor: "Emily Chen",
    },
    {
        id: 4,
        title: "React.js - The Complete Guide",
        students: 590,
        rating: 4.6,
        revenue: 29500,
        instructor: "David Wilson",
    },
];

export default function AdminOverviewPage() {
    const { theme } = useTheme();
    const [timeRange, setTimeRange] = useState("week");

    // Helper functions for theme-specific styling
    const getCardStyle = () => {
        return theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200";
    };

    // Format number with commas for thousands
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Format as currency
    const formatCurrency = (num) => {
        return "$" + formatNumber(num);
    };

    // Format date relative to now
    const formatRelativeTime = (date) => {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 60) {
            return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
        } else {
            return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
        }
    };

    // Status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case "success":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            case "error":
                return theme === "dark"
                    ? "bg-red-900/30 text-red-400"
                    : "bg-red-100 text-red-800";
            case "warning":
                return theme === "dark"
                    ? "bg-amber-900/30 text-amber-400"
                    : "bg-amber-100 text-amber-800";
            case "pending":
                return theme === "dark"
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            default:
                return theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Overview of platform performance and activities
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className={`border rounded-md overflow-hidden flex ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <button
                            onClick={() => setTimeRange("week")}
                            className={`px-3 py-1 text-sm ${timeRange === "week"
                                    ? theme === "dark"
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-100 text-gray-800"
                                    : ""
                                }`}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => setTimeRange("month")}
                            className={`px-3 py-1 text-sm ${timeRange === "month"
                                    ? theme === "dark"
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-100 text-gray-800"
                                    : ""
                                }`}
                        >
                            Month
                        </button>
                        <button
                            onClick={() => setTimeRange("year")}
                            className={`px-3 py-1 text-sm ${timeRange === "year"
                                    ? theme === "dark"
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-100 text-gray-800"
                                    : ""
                                }`}
                        >
                            Year
                        </button>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>Export Report</span>
                    </Button>
                </div>
            </div>

            {/* Main Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Total Users</span>
                            <span className="text-2xl font-bold mt-1">{formatNumber(dashboardStats.totalUsers)}</span>
                            <span className={`mt-2 text-sm flex items-center ${dashboardStats.userGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {dashboardStats.userGrowth >= 0 ? (
                                    <ArrowUpRight size={16} className="mr-1" />
                                ) : (
                                    <ArrowDownRight size={16} className="mr-1" />
                                )}
                                {Math.abs(dashboardStats.userGrowth)}% since last {timeRange}
                            </span>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"}`}>
                            <Users size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Total Courses</span>
                            <span className="text-2xl font-bold mt-1">{formatNumber(dashboardStats.totalCourses)}</span>
                            <span className={`mt-2 text-sm flex items-center ${dashboardStats.courseGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {dashboardStats.courseGrowth >= 0 ? (
                                    <ArrowUpRight size={16} className="mr-1" />
                                ) : (
                                    <ArrowDownRight size={16} className="mr-1" />
                                )}
                                {Math.abs(dashboardStats.courseGrowth)}% since last {timeRange}
                            </span>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-700"}`}>
                            <BookOpen size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Total Revenue</span>
                            <span className="text-2xl font-bold mt-1">{formatCurrency(dashboardStats.totalRevenue)}</span>
                            <span className={`mt-2 text-sm flex items-center ${dashboardStats.revenueGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {dashboardStats.revenueGrowth >= 0 ? (
                                    <ArrowUpRight size={16} className="mr-1" />
                                ) : (
                                    <ArrowDownRight size={16} className="mr-1" />
                                )}
                                {Math.abs(dashboardStats.revenueGrowth)}% since last {timeRange}
                            </span>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"}`}>
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Completion Rate</span>
                            <span className="text-2xl font-bold mt-1">{dashboardStats.completionRate}%</span>
                            <span className={`mt-2 text-sm flex items-center text-green-500`}>
                                <TrendingUp size={16} className="mr-1" />
                                Active learning community
                            </span>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"}`}>
                            <Award size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Recent Activity Section */}
                <div className={`rounded-lg border ${getCardStyle()} lg:col-span-2`}>
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="font-semibold text-lg">Recent Activity</h2>
                        <Link href="/dashboard/admin/activity" className="text-sm text-blue-500 hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="p-4">
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className={`p-3 rounded-lg flex items-start ${theme === "dark" ? "bg-gray-750" : "bg-gray-50"}`}>
                                    <div className={`p-2 rounded-full mr-3 ${getStatusColor(activity.status)}`}>
                                        {activity.status === "success" ? (
                                            <CheckCircle size={18} />
                                        ) : activity.status === "error" ? (
                                            <XCircle size={18} />
                                        ) : activity.status === "warning" ? (
                                            <AlertTriangle size={18} />
                                        ) : (
                                            <Clock size={18} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="font-medium">{activity.action}</span>
                                            <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {formatRelativeTime(activity.timestamp)}
                                            </span>
                                        </div>
                                        <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                            {activity.subject}
                                        </p>
                                        <div className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            by {activity.user}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Stats Section */}
                <div className={`rounded-lg border ${getCardStyle()}`}>
                    <div className="p-4 border-b">
                        <h2 className="font-semibold text-lg">Quick Stats</h2>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-750" : "bg-gray-50"}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Users size={18} className={`mr-2 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                                    <span>Active Students</span>
                                </div>
                                <span className="font-semibold">{formatNumber(dashboardStats.activeStudents)}</span>
                            </div>
                        </div>

                        <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-750" : "bg-gray-50"}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <AlertTriangle size={18} className={`mr-2 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
                                    <span>Pending Approvals</span>
                                </div>
                                <span className="font-semibold">{dashboardStats.pendingApprovals}</span>
                            </div>
                            <div className="mt-2">
                                <Link href="/dashboard/admin/courses/approvals" className={`text-sm ${theme === "dark" ? "text-blue-400" : "text-blue-600"} hover:underline`}>
                                    Review pending courses →
                                </Link>
                            </div>
                        </div>

                        <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-750" : "bg-gray-50"}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Calendar size={18} className={`mr-2 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                                    <span>Recent Signups</span>
                                </div>
                                <span className="font-semibold">{dashboardStats.recentSignups} users</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button className="w-full" variant="outline">
                                <BarChart2 size={16} className="mr-2" />
                                View Detailed Reports
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Performing Courses */}
            <div className={`rounded-lg border ${getCardStyle()} mb-6`}>
                <div className="p-4 border-b">
                    <h2 className="font-semibold text-lg">Top Performing Courses</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Course
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Instructor
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Students
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Rating
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Revenue
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
                            {topCourses.map((course) => (
                                <tr key={course.id} className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`h-8 w-8 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} flex items-center justify-center`}>
                                                <BookOpen size={16} />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium">{course.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {course.instructor}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {formatNumber(course.students)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className={`text-sm font-medium ${course.rating >= 4.5 ? "text-green-500" : "text-amber-500"}`}>
                                                {course.rating}
                                            </span>
                                            <div className="ml-1">
                                                <Award size={14} className={course.rating >= 4.5 ? "text-green-500" : "text-amber-500"} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {formatCurrency(course.revenue)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
