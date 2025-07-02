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
import { Calendar, Download, DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp, CreditCard, BarChart2 } from 'lucide-react';

// Mock data for revenue statistics
const monthlyRevenue = [
    { month: 'Jan', revenue: 42500, expenses: 18200, profit: 24300 },
    { month: 'Feb', revenue: 46800, expenses: 19500, profit: 27300 },
    { month: 'Mar', revenue: 44200, expenses: 18900, profit: 25300 },
    { month: 'Apr', revenue: 48500, expenses: 20100, profit: 28400 },
    { month: 'May', revenue: 52300, expenses: 21500, profit: 30800 },
    { month: 'Jun', revenue: 49800, expenses: 20800, profit: 29000 },
    { month: 'Jul', revenue: 53200, expenses: 22100, profit: 31100 },
    { month: 'Aug', revenue: 56700, expenses: 23400, profit: 33300 },
    { month: 'Sep', revenue: 59200, expenses: 24500, profit: 34700 },
    { month: 'Oct', revenue: 62500, expenses: 25800, profit: 36700 },
    { month: 'Nov', revenue: 65800, expenses: 27100, profit: 38700 },
    { month: 'Dec', revenue: 72500, expenses: 29800, profit: 42700 },
];

const revenueByCategory = [
    { name: 'Web Development', value: 35 },
    { name: 'Data Science', value: 25 },
    { name: 'Business', value: 15 },
    { name: 'Design', value: 12 },
    { name: 'Marketing', value: 8 },
    { name: 'Other', value: 5 },
];

const topRevenueCourses = [
    { name: 'Complete JavaScript Course', revenue: 42250 },
    { name: 'Python for Data Science', revenue: 35600 },
    { name: 'UX/UI Design Fundamentals', revenue: 32900 },
    { name: 'React.js - The Complete Guide', revenue: 29500 },
    { name: 'Machine Learning Basics', revenue: 27200 },
];

const paymentMethods = [
    { name: 'Credit Card', value: 68 },
    { name: 'PayPal', value: 18 },
    { name: 'Bank Transfer', value: 8 },
    { name: 'Digital Wallets', value: 6 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function RevenueReportPage() {
    const { theme } = useTheme();
    const [timeRange, setTimeRange] = useState('30days');

    const getCardStyle = () => {
        return theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200";
    };

    // Format currency values
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Revenue Analytics</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Financial performance and revenue metrics
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

            {/* Revenue Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Revenue
                            </p>
                            <p className="text-2xl font-bold mt-1">{formatCurrency(604500)}</p>
                            <div className={`mt-2 text-sm flex items-center text-green-500`}>
                                <ArrowUpRight size={16} className="mr-1" />
                                <span>12.8% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"}`}>
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Profit
                            </p>
                            <p className="text-2xl font-bold mt-1">{formatCurrency(352400)}</p>
                            <div className={`mt-2 text-sm flex items-center text-green-500`}>
                                <ArrowUpRight size={16} className="mr-1" />
                                <span>10.2% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"}`}>
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Avg. Order Value
                            </p>
                            <p className="text-2xl font-bold mt-1">{formatCurrency(58.50)}</p>
                            <div className={`mt-2 text-sm flex items-center text-green-500`}>
                                <ArrowUpRight size={16} className="mr-1" />
                                <span>3.5% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-700"}`}>
                            <CreditCard size={24} />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Profit Margin
                            </p>
                            <p className="text-2xl font-bold mt-1">58.3%</p>
                            <div className={`mt-2 text-sm flex items-center text-red-500`}>
                                <ArrowDownRight size={16} className="mr-1" />
                                <span>1.2% since last period</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"}`}>
                            <BarChart2 size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                    <TabsTrigger value="courses">Top Courses</TabsTrigger>
                    <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Monthly Revenue</CardTitle>
                            <CardDescription>Revenue, expenses, and profit over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={monthlyRevenue}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => formatCurrency(value)} />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stackId="1"
                                            stroke="#8884d8"
                                            fill="#8884d8"
                                            name="Revenue"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="expenses"
                                            stackId="2"
                                            stroke="#82ca9d"
                                            fill="#82ca9d"
                                            name="Expenses"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="profit"
                                            stackId="3"
                                            stroke="#ffc658"
                                            fill="#ffc658"
                                            name="Profit"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="categories">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Revenue by Category</CardTitle>
                            <CardDescription>Distribution of revenue across course categories</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={revenueByCategory}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {revenueByCategory.map((entry, index) => (
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
                            <CardTitle>Top Revenue Generating Courses</CardTitle>
                            <CardDescription>Courses with the highest revenue</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={topRevenueCourses}
                                        layout="vertical"
                                        margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" />
                                        <Tooltip formatter={(value) => formatCurrency(value)} />
                                        <Legend />
                                        <Bar dataKey="revenue" name="Revenue" fill="#8884d8" radius={[0, 4, 4, 0]}>
                                            {topRevenueCourses.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payment">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>Distribution of revenue by payment method</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={paymentMethods}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {paymentMethods.map((entry, index) => (
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
            </Tabs>
        </div>
    );
}
