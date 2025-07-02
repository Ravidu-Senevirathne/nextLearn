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
import { Calendar, Download, Users, GraduationCap, BookOpen, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

// Mock data for enrollment statistics
const monthlyEnrollments = [
    { month: 'Jan', enrollments: 850, completions: 210 },
    { month: 'Feb', enrollments: 920, completions: 240 },
    { month: 'Mar', enrollments: 880, completions: 265 },
    { month: 'Apr', enrollments: 950, completions: 280 },
    { month: 'May', enrollments: 1020, completions: 310 },
    { month: 'Jun', enrollments: 980, completions: 325 },
    { month: 'Jul', enrollments: 1050, completions: 340 },
    { month: 'Aug', enrollments: 1120, completions: 360 },
    { month: 'Sep', enrollments: 1180, completions: 390 },
    { month: 'Oct', enrollments: 1250, completions: 410 },
    { month: 'Nov', enrollments: 1320, completions: 430 },
    { month: 'Dec', enrollments: 1420, completions: 460 },
];

const categoryEnrollments = [
    { name: 'Web Development', value: 35 },
    { name: 'Data Science', value: 25 },
    { name: 'Business', value: 15 },
    { name: 'Design', value: 12 },
    { name: 'Marketing', value: 8 },
    { name: 'Other', value: 5 },
];

const topCourses = [
    { name: 'Complete JavaScript Course', value: 845 },
    { name: 'Python for Data Science', value: 712 },
    { name: 'UX/UI Design Fundamentals', value: 658 },
    { name: 'React.js - The Complete Guide', value: 590 },
    { name: 'Machine Learning Basics', value: 545 },
];

const enrollmentRates = [
    { day: '1', rate: 68 },
    { day: '2', rate: 52 },
    { day: '3', rate: 43 },
    { day: '4', rate: 36 },
    { day: '5', rate: 28 },
    { day: '6', rate: 24 },
    { day: '7', rate: 20 },
    { day: '8', rate: 18 },
    { day: '9', rate: 16 },
    { day: '10', rate: 14 },
    { day: '11', rate: 12 },
    { day: '12', rate: 10 },
    { day: '13', rate: 9 },
    { day: '14', rate: 8 },
    { day: '15+', rate: 6 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function EnrollmentsReportPage() {
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
                    <h1 className="text-2xl font-bold">Enrollment Analytics</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Course enrollment statistics and completion rates
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

            {/* Enrollment Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Enrollments
                            </p>
                            <p className="text-2xl font-bold mt-1">12,453</p>
                            <div className={`mt-2 text-sm flex items-center text-green-500`}>
                                <ArrowUpRight size={16} className="mr-1" />
                                <span>14.2% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"}`}>
                            <GraduationCap size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Course Completion Rate
                            </p>
                            <p className="text-2xl font-bold mt-1">68.5%</p>
                            <div className={`mt-2 text-sm flex items-center text-green-500`}>
                                <ArrowUpRight size={16} className="mr-1" />
                                <span>3.8% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"}`}>
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Active Courses
                            </p>
                            <p className="text-2xl font-bold mt-1">248</p>
                            <div className={`mt-2 text-sm flex items-center text-green-500`}>
                                <ArrowUpRight size={16} className="mr-1" />
                                <span>5.2% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-700"}`}>
                            <BookOpen size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Avg. Course Duration
                            </p>
                            <p className="text-2xl font-bold mt-1">18.2 days</p>
                            <div className={`mt-2 text-sm flex items-center text-red-500`}>
                                <ArrowDownRight size={16} className="mr-1" />
                                <span>2.1% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"}`}>
                            <Calendar size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                    <TabsTrigger value="courses">Top Courses</TabsTrigger>
                    <TabsTrigger value="completion">Completion Rates</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Monthly Enrollments & Completions</CardTitle>
                            <CardDescription>Trend of course enrollments and completions over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={monthlyEnrollments}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="enrollments" name="New Enrollments" fill="#8884d8" />
                                        <Bar dataKey="completions" name="Course Completions" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="categories">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Enrollments by Category</CardTitle>
                            <CardDescription>Distribution of enrollments across course categories</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryEnrollments}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {categoryEnrollments.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value}%`} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="courses">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Top Enrolled Courses</CardTitle>
                            <CardDescription>Courses with the highest number of enrollments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={topCourses}
                                        layout="vertical"
                                        margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" name="Enrollments" fill="#8884d8" radius={[0, 4, 4, 0]}>
                                            {topCourses.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="completion">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Course Completion Timeline</CardTitle>
                            <CardDescription>Percentage of students completing courses by day since enrollment</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={enrollmentRates}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip formatter={(value) => `${value}%`} />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="rate"
                                            name="Completion Rate (%)"
                                            stroke="#8884d8"
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
