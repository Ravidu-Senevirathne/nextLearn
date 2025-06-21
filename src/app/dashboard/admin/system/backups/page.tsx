"use client";

import React, { useState } from 'react';
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from "@/Components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    AlertCircle,
    DownloadCloud,
    Database,
    Calendar,
    Clock,
    MoreHorizontal,
    Check,
    History,
    RotateCw,
    RefreshCw,
    HardDrive,
    Server,
    Shield
} from "lucide-react";
import { format } from "date-fns";

// Mock data for backups
const mockBackups = [
    {
        id: "bkp-001",
        name: "Daily Backup - Database",
        type: "Database",
        status: "Completed",
        size: "2.7GB",
        date: new Date(2023, 10, 19, 2, 30, 0),
        duration: "23 minutes",
        createdBy: "System Automated Task"
    },
    {
        id: "bkp-002",
        name: "Weekly Backup - Full System",
        type: "Full System",
        status: "Completed",
        size: "15.3GB",
        date: new Date(2023, 10, 16, 1, 0, 0),
        duration: "1 hour 12 minutes",
        createdBy: "System Automated Task"
    },
    {
        id: "bkp-003",
        name: "Monthly Backup - Full System",
        type: "Full System",
        status: "Completed",
        size: "16.1GB",
        date: new Date(2023, 10, 1, 0, 0, 0),
        duration: "1 hour 18 minutes",
        createdBy: "System Automated Task"
    },
    {
        id: "bkp-004",
        name: "Pre-Update Backup",
        type: "Full System",
        status: "Completed",
        size: "14.9GB",
        date: new Date(2023, 9, 28, 22, 0, 0),
        duration: "1 hour 5 minutes",
        createdBy: "Admin User"
    },
    {
        id: "bkp-005",
        name: "Manual Backup - Database",
        type: "Database",
        status: "Completed",
        size: "2.6GB",
        date: new Date(2023, 9, 20, 14, 30, 0),
        duration: "21 minutes",
        createdBy: "Admin User"
    }
];

export default function BackupsPage() {
    const { theme } = useTheme();
    const [isBackupInProgress, setIsBackupInProgress] = useState(false);
    const [backupProgress, setBackupProgress] = useState(0);

    const startBackup = (type) => {
        setIsBackupInProgress(true);
        setBackupProgress(0);

        // Simulate backup progress
        const interval = setInterval(() => {
            setBackupProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsBackupInProgress(false), 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 300);
    };

    const getCardStyle = () => {
        return theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            case "In Progress":
                return theme === "dark"
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            case "Failed":
                return theme === "dark"
                    ? "bg-red-900/30 text-red-400"
                    : "bg-red-100 text-red-800";
            default:
                return theme === "dark"
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">System Backups</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Manage system backups and restoration
                    </p>
                </div>
                <Button
                    onClick={() => startBackup("Full System")}
                    disabled={isBackupInProgress}
                    className={theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-teal-600 hover:bg-teal-700"}
                >
                    <DownloadCloud className="mr-2 h-4 w-4" />
                    Create New Backup
                </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"} mr-3`}>
                            <Database size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Backups
                            </p>
                            <p className="text-2xl font-semibold">{mockBackups.length}</p>
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
                                Last Backup
                            </p>
                            <p className="text-lg font-semibold">{format(mockBackups[0].date, "MMM d, yyyy")}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-700"} mr-3`}>
                            <HardDrive size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Backup Size
                            </p>
                            <p className="text-lg font-semibold">51.6GB</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"} mr-3`}>
                            <History size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Retention Period
                            </p>
                            <p className="text-lg font-semibold">90 Days</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backup Progress */}
            {isBackupInProgress && (
                <div className={`rounded-lg border p-4 ${getCardStyle()} mb-6`}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-md font-medium">Creating System Backup...</h3>
                        <span>{backupProgress}%</span>
                    </div>
                    <Progress value={backupProgress} className="h-2" />
                    <p className={`mt-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Please do not close this page while the backup is in progress.
                    </p>
                </div>
            )}

            {/* Backup Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className={getCardStyle()}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Database Backup</CardTitle>
                        <CardDescription>Backup database only</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={`mb-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            Only backs up database content. Faster than a full system backup.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => startBackup("Database")}
                            disabled={isBackupInProgress}
                        >
                            <Database className="mr-2 h-4 w-4" /> Start Database Backup
                        </Button>
                    </CardContent>
                </Card>

                <Card className={getCardStyle()}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Full System Backup</CardTitle>
                        <CardDescription>Complete system backup</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={`mb-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            Includes database, files, user uploads, and system configurations.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => startBackup("Full System")}
                            disabled={isBackupInProgress}
                        >
                            <Server className="mr-2 h-4 w-4" /> Start Full Backup
                        </Button>
                    </CardContent>
                </Card>

                <Card className={getCardStyle()}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Restore System</CardTitle>
                        <CardDescription>Restore from backup</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={`mb-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            Restore the system from a previous backup point.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full"
                            disabled={isBackupInProgress}
                        >
                            <RotateCw className="mr-2 h-4 w-4" /> Restore System
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Backup History */}
            <h2 className="text-xl font-semibold mb-4">Backup History</h2>
            <div className={`rounded-lg border ${getCardStyle()} overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Backup</span>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Type</span>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Date & Time</span>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Size</span>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
                            {mockBackups.map((backup) => (
                                <tr key={backup.id} className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`p-2 rounded-full ${getStatusColor(backup.status)} mr-3`}>
                                                <Database size={16} />
                                            </div>
                                            <div>
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium">{backup.name}</span>
                                                </div>
                                                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    {backup.createdBy}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${backup.type === "Database"
                                                ? theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-800"
                                                : theme === "dark" ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-800"
                                            }`}>
                                            {backup.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm flex items-center">
                                            <Calendar size={14} className="mr-1 text-gray-400" />
                                            {format(backup.date, "MMM d, yyyy")}
                                        </div>
                                        <div className="text-sm flex items-center">
                                            <Clock size={14} className="mr-1 text-gray-400" />
                                            {format(backup.date, "h:mm a")}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm">{backup.size}</div>
                                        <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            {backup.duration}
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
                                                <DropdownMenuItem className="cursor-pointer flex items-center">
                                                    <DownloadCloud className="mr-2 h-4 w-4" />
                                                    <span>Download</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer flex items-center">
                                                    <RotateCw className="mr-2 h-4 w-4" />
                                                    <span>Restore from this Backup</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer flex items-center text-red-600 dark:text-red-400">
                                                    <AlertCircle className="mr-2 h-4 w-4" />
                                                    <span>Delete Backup</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
