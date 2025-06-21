"use client";

import React, { useState } from 'react';
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from "@/Components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import {
    Trash2, Database, RefreshCw, HardDrive, AlertCircle,
    Clock, CheckCircle, Cog, FileCog, FileArchive
} from "lucide-react";

export default function MaintenancePage() {
    const { theme } = useTheme();
    const [activeTask, setActiveTask] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const getCardStyle = () => {
        return theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200";
    };

    const runMaintenanceTask = (taskId: string) => {
        if (activeTask) return; // Don't start if a task is already running

        setActiveTask(taskId);
        setProgress(0);

        // Simulate task progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setActiveTask(null), 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 200);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">System Maintenance</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Manage system maintenance tasks and optimize performance
                    </p>
                </div>
            </div>

            {/* Maintenance Status */}
            <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>System Status</AlertTitle>
                <AlertDescription>
                    Last maintenance: 2 days ago. System health is good.
                </AlertDescription>
            </Alert>

            {/* Active Task Progress */}
            {activeTask && (
                <Card className={`${getCardStyle()} mb-6`}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Maintenance in Progress</CardTitle>
                        <CardDescription>Please wait while the task completes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-2">
                            <span>{activeTask}</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </CardContent>
                </Card>
            )}

            {/* Maintenance Tasks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className={getCardStyle()}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Database Optimization</CardTitle>
                        <CardDescription>Optimize database performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm">Clean up database tables, rebuild indexes, and optimize queries.</p>
                        <Button
                            onClick={() => runMaintenanceTask("Database Optimization")}
                            disabled={!!activeTask}
                            className="w-full"
                        >
                            <Database className="mr-2 h-4 w-4" /> Run Optimization
                        </Button>
                    </CardContent>
                </Card>

                <Card className={getCardStyle()}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Cache Management</CardTitle>
                        <CardDescription>Clear and rebuild system caches</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm">Flush all caches and rebuild to improve performance.</p>
                        <Button
                            onClick={() => runMaintenanceTask("Cache Rebuilding")}
                            disabled={!!activeTask}
                            className="w-full"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" /> Rebuild Caches
                        </Button>
                    </CardContent>
                </Card>

                <Card className={getCardStyle()}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Storage Cleanup</CardTitle>
                        <CardDescription>Clean temporary files and old data</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm">Remove temporary files, old logs, and unused media.</p>
                        <Button
                            onClick={() => runMaintenanceTask("Storage Cleanup")}
                            disabled={!!activeTask}
                            className="w-full"
                            variant="outline"
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Clean Storage
                        </Button>
                    </CardContent>
                </Card>

                <Card className={getCardStyle()}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Session Cleanup</CardTitle>
                        <CardDescription>Clean expired user sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm">Remove expired user sessions and authentication tokens.</p>
                        <Button
                            onClick={() => runMaintenanceTask("Session Cleanup")}
                            disabled={!!activeTask}
                            className="w-full"
                            variant="outline"
                        >
                            <Clock className="mr-2 h-4 w-4" /> Clean Sessions
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Scheduled Tasks */}
            <h2 className="text-xl font-semibold mb-4">Scheduled Maintenance</h2>
            <Card className={getCardStyle()}>
                <div className="p-4">
                    <table className="w-full">
                        <thead className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                            <tr>
                                <th className="text-left py-2">Task</th>
                                <th className="text-left py-2">Frequency</th>
                                <th className="text-left py-2">Last Run</th>
                                <th className="text-left py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>
                            <tr>
                                <td className="py-2 flex items-center">
                                    <Database size={16} className="mr-2" /> Database Optimization
                                </td>
                                <td>Weekly</td>
                                <td>2 days ago</td>
                                <td><span className="flex items-center"><CheckCircle size={16} className="mr-1 text-green-500" /> Success</span></td>
                            </tr>
                            <tr>
                                <td className="py-2 flex items-center">
                                    <FileArchive size={16} className="mr-2" /> Log Rotation
                                </td>
                                <td>Daily</td>
                                <td>Today</td>
                                <td><span className="flex items-center"><CheckCircle size={16} className="mr-1 text-green-500" /> Success</span></td>
                            </tr>
                            <tr>
                                <td className="py-2 flex items-center">
                                    <HardDrive size={16} className="mr-2" /> Storage Cleanup
                                </td>
                                <td>Monthly</td>
                                <td>28 days ago</td>
                                <td><span className="flex items-center"><Clock size={16} className="mr-1 text-amber-500" /> Due Soon</span></td>
                            </tr>
                            <tr>
                                <td className="py-2 flex items-center">
                                    <FileCog size={16} className="mr-2" /> System Health Check
                                </td>
                                <td>Daily</td>
                                <td>Today</td>
                                <td><span className="flex items-center"><CheckCircle size={16} className="mr-1 text-green-500" /> Success</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
