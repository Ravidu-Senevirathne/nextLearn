"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useTheme } from '@/hooks/useTheme';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { Calendar, Download, Users, Clock, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock data for usage statistics
const usageOverTime = [
    { date: '2023-01', pageViews: 45000, uniqueUsers: 12500, averageSessionTime: 8.2 },
    { date: '2023-02', pageViews: 52000, uniqueUsers: 14000, averageSessionTime: 7.8 },
    { date: '2023-03', pageViews: 48000, uniqueUsers: 13200, averageSessionTime: 8.5 },
    { date: '2023-04', pageViews: 56000, uniqueUsers: 15000, averageSessionTime: 9.1 },
    { date: '2023-05', pageViews: 61000, uniqueUsers: 16500, averageSessionTime: 8.7 },
    { date: '2023-06', pageViews: 58000, uniqueUsers: 15800, averageSessionTime: 9.3 },
    { date: '2023-07', pageViews: 64000, uniqueUsers: 17200, averageSessionTime: 9.0 },
    { date: '2023-08', pageViews: 68000, uniqueUsers: 18500, averageSessionTime: 8.8 },
    { date: '2023-09', pageViews: 72000, uniqueUsers: 19800, averageSessionTime: 9.4 },
    { date: '2023-10', pageViews: 75000, uniqueUsers: 20500, averageSessionTime: 9.6 },
    { date: '2023-11', pageViews: 79000, uniqueUsers: 21800, averageSessionTime: 9.2 },
    { date: '2023-12', pageViews: 82000, uniqueUsers: 22500, averageSessionTime: 8.9 },
];

const deviceDistribution = [
    { name: 'Desktop', value: 42 },
    { name: 'Mobile', value: 48 },
    { name: 'Tablet', value: 10 },
];

const browserDistribution = [
    { name: 'Chrome', value: 62 },
    { name: 'Safari', value: 20 },
    { name: 'Firefox', value: 8 },
    { name: 'Edge', value: 7 },
    { name: 'Others', value: 3 },
];

const peakUsageTimes = [
    { hour: '00:00', users: 420 },
    { hour: '02:00', users: 280 },
    { hour: '04:00', users: 190 },
    { hour: '06:00', users: 350 },
    { hour: '08:00', users: 890 },
    { hour: '10:00', users: 1200 },
    { hour: '12:00', users: 1500 },
    { hour: '14:00', users: 1380 },
    { hour: '16:00', users: 1620 },
    { hour: '18:00', users: 1450 },
    { hour: '20:00', users: 1100 },
    { hour: '22:00', users: 680 },
];

const featureUsage = [
    { name: 'Course Viewing', value: 85 },
    { name: 'Video Playback', value: 78 },
    { name: 'Quizzes/Assessments', value: 65 },
    { name: 'Discussion Forums', value: 42 },
    { name: 'Resource Downloads', value: 38 },
    { name: 'Profile Updates', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function UsageReportPage() {
    const { theme } = useTheme();
    const [timeRange, setTimeRange] = useState('30days');

    const getCardStyle = () => {
        return theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200";
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Usage Analytics</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Detailed platform usage statistics and trends
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7days">Last 7 days</SelectItem>
                            <SelectItem value="30days">Last 30 days</SelectItem>
                            <SelectItem value="90days">Last 90 days</SelectItem>
                            <SelectItem value="year">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download size={16} />
                        Export
                    </Button>
                </div>
            </div>

            {/* Usage Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Active Users
                            </p>
                            <p className="text-2xl font-bold mt-1">22,543</p>
                            <div className={`mt-2 text-sm flex items-center text-green-500`}>
                                <ArrowUpRight size={16} className="mr-1" />
                                <span>12% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"}`}>
                            <Users size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Page Views
                            </p>
                            <p className="text-2xl font-bold mt-1">184,295</p>
                            <div className={`mt-2 text-sm flex items-center text-green-500`}>
                                <ArrowUpRight size={16} className="mr-1" />
                                <span>8.3% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-700"}`}>
                            <Activity size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Avg. Session Time
                            </p>
                            <p className="text-2xl font-bold mt-1">9.2 min</p>
                            <div className={`mt-2 text-sm flex items-center text-green-500`}>
                                <ArrowUpRight size={16} className="mr-1" />
                                <span>3.5% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"}`}>
                            <Clock size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Bounce Rate
                            </p>
                            <p className="text-2xl font-bold mt-1">28.4%</p>
                            <div className={`mt-2 text-sm flex items-center text-red-500`}>
                                <ArrowDownRight size={16} className="mr-1" />
                                <span>1.2% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"}`}>
                            <ArrowDownRight size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="devices">Devices & Browsers</TabsTrigger>
                    <TabsTrigger value="usage">Feature Usage</TabsTrigger>
                    <TabsTrigger value="peak">Peak Times</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Platform Usage Over Time</CardTitle>
                            <CardDescription>Monthly page views and unique visitors</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={usageOverTime}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                                            </linearGradient>
                                            <linearGradient id="colorUniqueUsers" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="pageViews"
                                            stroke="#8884d8"
                                            fillOpacity={1}
                                            fill="url(#colorPageViews)"
                                            name="Page Views"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="uniqueUsers"
                                            stroke="#82ca9d"
                                            fillOpacity={1}
                                            fill="url(#colorUniqueUsers)"
                                            name="Unique Users"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="devices">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className={getCardStyle()}>
                            <CardHeader>
                                <CardTitle>Device Distribution</CardTitle>
                                <CardDescription>Users by device type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={deviceDistribution}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {deviceDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${value}%`} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className={getCardStyle()}>
                            <CardHeader>
                                <CardTitle>Browser Distribution</CardTitle>
                                <CardDescription>Users by browser type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={browserDistribution}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {browserDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${value}%`} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="usage">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Feature Usage</CardTitle>
                            <CardDescription>Percentage of users engaging with each feature</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={featureUsage}
                                        layout="vertical"
                                        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" domain={[0, 100]} />
                                        <YAxis dataKey="name" type="category" />
                                        <Tooltip formatter={(value) => `${value}%`} />
                                        <Legend />
                                        <Bar dataKey="value" name="Usage %" fill="#8884d8" radius={[0, 4, 4, 0]}>
                                            {featureUsage.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="peak">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Peak Usage Times</CardTitle>
                            <CardDescription>Average number of concurrent users by hour</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={peakUsageTimes}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="hour" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="users"
                                            stroke="#8884d8"
                                            fill="url(#colorUsers)"
                                            name="Active Users"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
