"use client";

import React, { useState } from 'react';
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import {
    Search,
    FileText,
    AlertCircle,
    Info,
    Check,
    Clock,
    Server,
    UserCircle,
    MoreHorizontal,
    ArrowUpDown,
    Database,
    RefreshCw,
    Download,
    Eye,
    Terminal,
    ShieldAlert,
    User,
    LogIn
} from "lucide-react";
import { format } from "date-fns";

// Mock data for system logs
const mockLogs = [
    {
        id: "log-001",
        timestamp: new Date(2023, 10, 19, 15, 30, 10),
        level: "ERROR",
        source: "Authentication",
        message: "Failed login attempt for user john.doe@example.com. IP: 192.168.1.45",
        details: "Multiple failed attempts detected from this IP address in the last 10 minutes. Potential brute force attack.",
        user: "john.doe@example.com",
        ipAddress: "192.168.1.45",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    },
    {
        id: "log-002",
        timestamp: new Date(2023, 10, 19, 14, 45, 22),
        level: "INFO",
        source: "User Management",
        message: "User profile updated successfully",
        details: "User updated their profile information including display name and profile picture.",
        user: "sarah.smith@example.com",
        ipAddress: "192.168.1.102",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15"
    },
    {
        id: "log-003",
        timestamp: new Date(2023, 10, 19, 13, 15, 45),
        level: "WARNING",
        source: "Payment System",
        message: "Payment processing delayed for order #ORD-5782",
        details: "Payment gateway response timeout. Retry scheduled in 5 minutes.",
        user: "alex.johnson@example.com",
        ipAddress: "192.168.1.87",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
    },
    {
        id: "log-004",
        timestamp: new Date(2023, 10, 19, 12, 10, 33),
        level: "ERROR",
        source: "Database",
        message: "Database connection timeout during query execution",
        details: "Connection to primary database server timed out after 30 seconds. Failover to secondary successful.",
        user: "system",
        ipAddress: "internal",
        userAgent: "System Service"
    },
    {
        id: "log-005",
        timestamp: new Date(2023, 10, 19, 11, 25, 18),
        level: "INFO",
        source: "Course Management",
        message: "New course published: 'Advanced Machine Learning'",
        details: "Course ID: CRS-789. Published by instructor David Wilson.",
        user: "david.wilson@example.com",
        ipAddress: "192.168.1.56",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    },
    {
        id: "log-006",
        timestamp: new Date(2023, 10, 19, 10, 5, 42),
        level: "SUCCESS",
        source: "Backup System",
        message: "Daily backup completed successfully",
        details: "Full system backup completed in 23 minutes. Backup size: 2.7GB.",
        user: "system",
        ipAddress: "internal",
        userAgent: "Automated Task"
    },
    {
        id: "log-007",
        timestamp: new Date(2023, 10, 19, 9, 30, 15),
        level: "WARNING",
        source: "Security",
        message: "Unusual login activity detected",
        details: "User logged in from a new location. User notified via email.",
        user: "emma.davis@example.com",
        ipAddress: "45.23.156.78",
        userAgent: "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36"
    },
    {
        id: "log-008",
        timestamp: new Date(2023, 10, 19, 8, 15, 50),
        level: "INFO",
        source: "Authentication",
        message: "User password changed",
        details: "Password updated through account settings page.",
        user: "michael.brown@example.com",
        ipAddress: "192.168.1.112",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    },
    {
        id: "log-009",
        timestamp: new Date(2023, 10, 19, 7, 45, 30),
        level: "ERROR",
        source: "Video Streaming",
        message: "Video transcoding failed for upload ID: VID-4523",
        details: "Transcoding service returned error code 500. File format may be unsupported.",
        user: "jennifer.wilson@example.com",
        ipAddress: "192.168.1.78",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15"
    },
    {
        id: "log-010",
        timestamp: new Date(2023, 10, 19, 6, 20, 15),
        level: "SUCCESS",
        source: "Email Service",
        message: "Weekly newsletter sent successfully",
        details: "Newsletter sent to 5,782 subscribers. Open rate: 32%.",
        user: "system",
        ipAddress: "internal",
        userAgent: "Automated Task"
    },
    {
        id: "log-011",
        timestamp: new Date(2023, 10, 18, 22, 10, 33),
        level: "WARNING",
        source: "API Gateway",
        message: "Rate limit exceeded for API key: API-8971",
        details: "Client exceeded 1000 requests per minute threshold. Some requests throttled.",
        user: "api.client@example.com",
        ipAddress: "84.23.107.55",
        userAgent: "API Client/1.0"
    },
    {
        id: "log-012",
        timestamp: new Date(2023, 10, 18, 20, 5, 18),
        level: "INFO",
        source: "User Management",
        message: "New user registered",
        details: "User completed registration and email verification.",
        user: "new.user@example.com",
        ipAddress: "192.168.1.132",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
    },
    {
        id: "log-013",
        timestamp: new Date(2023, 10, 18, 18, 30, 45),
        level: "ERROR",
        source: "Payment System",
        message: "Payment failed for order #ORD-6234",
        details: "Credit card declined by payment processor. User notified.",
        user: "robert.johnson@example.com",
        ipAddress: "192.168.1.98",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    },
    {
        id: "log-014",
        timestamp: new Date(2023, 10, 18, 16, 15, 22),
        level: "SUCCESS",
        source: "Course Management",
        message: "Course materials updated: 'Introduction to Python'",
        details: "3 new lectures and 2 quizzes added by instructor.",
        user: "james.wilson@example.com",
        ipAddress: "192.168.1.65",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15"
    },
    {
        id: "log-015",
        timestamp: new Date(2023, 10, 18, 14, 50, 10),
        level: "INFO",
        source: "System",
        message: "System update completed",
        details: "Platform updated to version 2.4.5. No service interruption.",
        user: "system",
        ipAddress: "internal",
        userAgent: "System Service"
    },
];

// Log levels and sources for filtering
const logLevels = ["All Levels", "ERROR", "WARNING", "INFO", "SUCCESS"];
const logSources = [
    "All Sources",
    "Authentication",
    "User Management",
    "Payment System",
    "Database",
    "Course Management",
    "Backup System",
    "Security",
    "Video Streaming",
    "Email Service",
    "API Gateway",
    "System"
];

export default function SystemLogsPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("All Levels");
    const [selectedSource, setSelectedSource] = useState("All Sources");
    const [timeRange, setTimeRange] = useState("24h");
    const [sortField, setSortField] = useState("timestamp");
    const [sortDirection, setSortDirection] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewedLog, setViewedLog] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const logsPerPage = 10;

    // Filter and sort logs
    const filteredLogs = mockLogs
        .filter((log) => {
            const matchesSearch =
                log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesLevel =
                selectedLevel === "All Levels" || log.level === selectedLevel;

            const matchesSource =
                selectedSource === "All Sources" || log.source === selectedSource;

            // Time range filtering would be implemented here in a real app
            // For now, we'll just return true for all logs
            const matchesTimeRange = true;

            return matchesSearch && matchesLevel && matchesSource && matchesTimeRange;
        })
        .sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortDirection === "asc") {
                if (aValue instanceof Date && bValue instanceof Date) {
                    return aValue.getTime() - bValue.getTime();
                }
                if (typeof aValue === "string" && typeof bValue === "string") {
                    return aValue.localeCompare(bValue);
                }
                return aValue - bValue;
            } else {
                if (aValue instanceof Date && bValue instanceof Date) {
                    return bValue.getTime() - aValue.getTime();
                }
                if (typeof aValue === "string" && typeof bValue === "string") {
                    return bValue.localeCompare(aValue);
                }
                return bValue - aValue;
            }
        });

    // Pagination
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = filteredLogs.slice(
        indexOfFirstLog,
        indexOfLastLog
    );
    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    // Reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedLevel("All Levels");
        setSelectedSource("All Sources");
        setTimeRange("24h");
        setCurrentPage(1);
    };

    // View log details
    const handleViewLog = (log) => {
        setViewedLog(log);
        setIsViewDialogOpen(true);
    };

    // Calculate statistics
    const statistics = {
        total: mockLogs.length,
        errors: mockLogs.filter((log) => log.level === "ERROR").length,
        warnings: mockLogs.filter((log) => log.level === "WARNING").length,
        info: mockLogs.filter((log) => log.level === "INFO").length,
        success: mockLogs.filter((log) => log.level === "SUCCESS").length,
    };

    // Helper functions for theme-specific styling
    const getCardStyle = () => {
        return theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200";
    };

    const getInputStyle = () => {
        return theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500";
    };

    const getLevelIcon = (level) => {
        switch (level) {
            case "ERROR":
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            case "WARNING":
                return <AlertCircle className="h-5 w-5 text-amber-500" />;
            case "INFO":
                return <Info className="h-5 w-5 text-blue-500" />;
            case "SUCCESS":
                return <Check className="h-5 w-5 text-green-500" />;
            default:
                return <Info className="h-5 w-5 text-gray-500" />;
        }
    };

    const getLevelColor = (level) => {
        switch (level) {
            case "ERROR":
                return theme === "dark"
                    ? "bg-red-900/30 text-red-400"
                    : "bg-red-100 text-red-800";
            case "WARNING":
                return theme === "dark"
                    ? "bg-amber-900/30 text-amber-400"
                    : "bg-amber-100 text-amber-800";
            case "INFO":
                return theme === "dark"
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            case "SUCCESS":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            default:
                return theme === "dark"
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
        }
    };

    const getSourceIcon = (source) => {
        switch (source) {
            case "Authentication":
                return <LogIn className="h-5 w-5" />;
            case "User Management":
                return <User className="h-5 w-5" />;
            case "Payment System":
                return <FileText className="h-5 w-5" />;
            case "Database":
                return <Database className="h-5 w-5" />;
            case "Course Management":
                return <FileText className="h-5 w-5" />;
            case "Backup System":
                return <Database className="h-5 w-5" />;
            case "Security":
                return <ShieldAlert className="h-5 w-5" />;
            case "Video Streaming":
                return <FileText className="h-5 w-5" />;
            case "Email Service":
                return <FileText className="h-5 w-5" />;
            case "API Gateway":
                return <Terminal className="h-5 w-5" />;
            case "System":
                return <Server className="h-5 w-5" />;
            default:
                return <Info className="h-5 w-5" />;
        }
    };

    // Format time for logs
    const formatLogTime = (date) => {
        return format(date, "MMM d, yyyy HH:mm:ss");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">System Logs</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        View and analyze system activity logs
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Time range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1h">Last hour</SelectItem>
                            <SelectItem value="24h">Last 24 hours</SelectItem>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => console.log("Refreshing logs...")}
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => console.log("Downloading logs...")}
                    >
                        <Download size={16} />
                        Export
                    </Button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"} mr-3`}>
                            <FileText size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Logs
                            </p>
                            <p className="text-2xl font-semibold">{statistics.total}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"} mr-3`}>
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Errors
                            </p>
                            <p className="text-2xl font-semibold">{statistics.errors}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"} mr-3`}>
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Warnings
                            </p>
                            <p className="text-2xl font-semibold">{statistics.warnings}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"} mr-3`}>
                            <Info size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Info
                            </p>
                            <p className="text-2xl font-semibold">{statistics.info}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"} mr-3`}>
                            <Check size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Success
                            </p>
                            <p className="text-2xl font-semibold">{statistics.success}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={`p-4 rounded-lg border ${getCardStyle()} mb-6`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <Input
                            type="text"
                            placeholder="Search logs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`pl-10 ${getInputStyle()}`}
                        />
                    </div>

                    <div>
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            {logLevels.map((level) => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            {logSources.map((source) => (
                                <option key={source} value={source}>
                                    {source}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Button
                            variant="outline"
                            onClick={resetFilters}
                            className="w-full"
                        >
                            Reset Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className={`rounded-lg border ${getCardStyle()} overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("timestamp")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Timestamp</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("level")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Level</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("source")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Source</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                >
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Message</span>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("user")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>User</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
                            {currentLogs.length > 0 ? (
                                currentLogs.map((log) => (
                                    <tr
                                        key={log.id}
                                        className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Clock size={14} className="mr-2 text-gray-400" />
                                                <span className="text-sm">{formatLogTime(log.timestamp)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                                                {getLevelIcon(log.level)}
                                                <span className="ml-1">{log.level}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-sm">{log.source}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm line-clamp-1">{log.message}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <UserCircle size={16} className="mr-2 text-gray-400" />
                                                <span className="text-sm">{log.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center"
                                                        onClick={() => handleViewLog(log)}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        <span>View Details</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center">
                                        <FileText size={40} className="mx-auto mb-2 text-gray-400" />
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                            No logs found matching your criteria
                                        </p>
                                        <Button
                                            variant="link"
                                            onClick={resetFilters}
                                            className="mt-2"
                                        >
                                            Reset Filters
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredLogs.length > 0 && (
                    <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                            Showing <span className="font-medium">{indexOfFirstLog + 1}</span>
                            {" "}-{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastLog, filteredLogs.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredLogs.length}</span> logs
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                                disabled={currentPage === 1}
                                className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                            >
                                Previous
                            </Button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                let pageNumber;
                                if (totalPages <= 5) {
                                    pageNumber = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNumber = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNumber = totalPages - 4 + i;
                                } else {
                                    pageNumber = currentPage - 2 + i;
                                }
                                return (
                                    <Button
                                        key={pageNumber}
                                        variant={currentPage === pageNumber ? "default" : "outline"}
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={currentPage === pageNumber ? (theme === "dark" ? "bg-blue-600" : "bg-teal-600") : ""}
                                    >
                                        {pageNumber}
                                    </Button>
                                );
                            })}
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                disabled={currentPage === totalPages}
                                className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* View Log Dialog */}
            {viewedLog && (
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent
                        className={`${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : ""} max-w-4xl`}
                    >
                        <DialogHeader>
                            <div className="flex items-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getLevelColor(viewedLog.level)}`}>
                                    {getLevelIcon(viewedLog.level)}
                                    <span className="ml-1">{viewedLog.level}</span>
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full mr-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                    {viewedLog.source}
                                </span>
                                <DialogTitle className={theme === "dark" ? "text-white" : ""}>
                                    Log Details
                                </DialogTitle>
                            </div>
                            <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                                <div className="flex items-center">
                                    <span className="font-medium mr-2">ID:</span> {viewedLog.id}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <h3 className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Timestamp</h3>
                                <p className="mt-1">{formatLogTime(viewedLog.timestamp)}</p>
                            </div>
                            <div>
                                <h3 className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Message</h3>
                                <p className="mt-1">{viewedLog.message}</p>
                            </div>
                            <div>
                                <h3 className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Details</h3>
                                <div className={`mt-1 p-3 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                    <p>{viewedLog.details}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>User</h3>
                                    <p className="mt-1 flex items-center">
                                        <UserCircle size={16} className="mr-2 text-gray-400" />
                                        {viewedLog.user}
                                    </p>
                                </div>
                                <div>
                                    <h3 className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>IP Address</h3>
                                    <p className="mt-1">{viewedLog.ipAddress}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>User Agent</h3>
                                <p className="mt-1 text-sm">{viewedLog.userAgent}</p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsViewDialogOpen(false)}
                                className={theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
