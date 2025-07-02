"use client";

import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import {
    BarChart,
    LineChart,
    PieChart,
    AreaChart,
    Calendar,
    ChevronDown,
    Filter,
    Download,
    TrendingUp,
    TrendingDown,
    Users,
    Clock,
    BookOpen,
    CheckCircle,
    Award
} from 'lucide-react';

// Mock data for the statistics page
const courseData = [
    { name: 'Web Development Fundamentals', completionRate: 85, activeStudents: 145, totalStudents: 156 },
    { name: 'React Framework', completionRate: 76, activeStudents: 112, totalStudents: 132 },
    { name: 'Data Science Essentials', completionRate: 92, activeStudents: 94, totalStudents: 98 },
    { name: 'Mobile App Development', completionRate: 65, activeStudents: 87, totalStudents: 112 },
    { name: 'Python Programming', completionRate: 88, activeStudents: 132, totalStudents: 145 },
];

// Weekly progress data for line chart
const weeklyProgressData = [
    { week: 'Week 1', completion: 25 },
    { week: 'Week 2', completion: 32 },
    { week: 'Week 3', completion: 48 },
    { week: 'Week 4', completion: 53 },
    { week: 'Week 5', completion: 67 },
    { week: 'Week 6', completion: 82 },
    { week: 'Week 7', completion: 85 },
    { week: 'Week 8', completion: 91 },
];

// Student engagement distribution
const engagementData = [
    { category: 'High', count: 245, percentage: 42 },
    { category: 'Medium', count: 198, percentage: 34 },
    { category: 'Low', count: 143, percentage: 24 },
];

// Grade distribution data
const gradeDistribution = [
    { grade: 'A', count: 112, percentage: 23 },
    { grade: 'B', count: 156, percentage: 32 },
    { grade: 'C', count: 134, percentage: 27 },
    { grade: 'D', count: 67, percentage: 14 },
    { grade: 'F', count: 21, percentage: 4 },
];

// Time spent data
const timeSpentData = [
    { category: '< 1 hour', count: 78, percentage: 16 },
    { category: '1-2 hours', count: 145, percentage: 30 },
    { category: '2-3 hours', count: 172, percentage: 35 },
    { category: '3+ hours', count: 92, percentage: 19 },
];

const ProgressStatisticsPage = () => {
    const { theme } = useTheme();
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('This Month');
    const [selectedCourse, setSelectedCourse] = useState('All Courses');

    // Helper functions for theme-based styling
    const getCardStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200';
    };

    const getTextColor = () => {
        return theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
    };

    const getSubtleTextColor = () => {
        return theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
    };

    const getPositiveTrendColor = () => {
        return theme === 'dark' ? 'text-green-400' : 'text-green-600';
    };

    const getNegativeTrendColor = () => {
        return theme === 'dark' ? 'text-red-400' : 'text-red-600';
    };

    const getChartColor = () => {
        return theme === 'dark' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)';
    };

    // Calculate overall statistics
    const overallCompletionRate = Math.round(
        courseData.reduce((sum, course) => sum + course.completionRate, 0) / courseData.length
    );

    const totalActiveStudents = courseData.reduce((sum, course) => sum + course.activeStudents, 0);
    const totalEnrolledStudents = courseData.reduce((sum, course) => sum + course.totalStudents, 0);
    const activeStudentPercentage = Math.round((totalActiveStudents / totalEnrolledStudents) * 100);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className={`text-2xl font-bold mb-2 ${getTextColor()}`}>Progress Statistics</h1>
                    <p className={getSubtleTextColor()}>
                        Comprehensive analytics on student progress and course completion
                    </p>
                </div>

                <div className="flex space-x-3">
                    <button
                        className={`px-4 py-2 rounded-md flex items-center ${
                            theme === 'dark'
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                        }`}
                    >
                        <Download size={16} className="mr-2" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className={`p-4 mb-8 rounded-lg border ${getCardStyle()}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${getSubtleTextColor()}`}>
                            Time Frame
                        </label>
                        <div className="relative">
                            <div className="flex items-center">
                                <Calendar size={16} className={`absolute left-3 ${getSubtleTextColor()}`} />
                                <select
                                    className={`w-full pl-10 pr-4 py-2 rounded-md border ${
                                        theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                    value={selectedTimeFrame}
                                    onChange={(e) => setSelectedTimeFrame(e.target.value)}
                                >
                                    <option value="This Week">This Week</option>
                                    <option value="This Month">This Month</option>
                                    <option value="Last 3 Months">Last 3 Months</option>
                                    <option value="This Year">This Year</option>
                                    <option value="All Time">All Time</option>
                                </select>
                                <ChevronDown size={16} className={`absolute right-3 ${getSubtleTextColor()}`} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${getSubtleTextColor()}`}>
                            Course
                        </label>
                        <div className="relative">
                            <div className="flex items-center">
                                <BookOpen size={16} className={`absolute left-3 ${getSubtleTextColor()}`} />
                                <select
                                    className={`w-full pl-10 pr-4 py-2 rounded-md border ${
                                        theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                >
                                    <option value="All Courses">All Courses</option>
                                    {courseData.map((course, index) => (
                                        <option key={index} value={course.name}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className={`absolute right-3 ${getSubtleTextColor()}`} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end">
                        <button
                            className={`px-4 py-2 rounded-md flex items-center ${
                                theme === 'dark'
                                    ? 'bg-gray-700 border border-gray-600 hover:bg-gray-600 text-white'
                                    : 'bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-800'
                            }`}
                        >
                            <Filter size={16} className="mr-2" />
                            More Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Overall Completion Rate */}
                <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                            <BarChart size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                        </div>
                        <div className="flex items-center">
                            <TrendingUp size={16} className={getPositiveTrendColor()} />
                            <span className={`ml-1 text-xs ${getPositiveTrendColor()}`}>+5%</span>
                        </div>
                    </div>
                    <h3 className={`text-sm font-medium ${getSubtleTextColor()}`}>Overall Completion Rate</h3>
                    <div className="flex items-baseline mt-1">
                        <span className={`text-2xl font-bold ${getTextColor()}`}>{overallCompletionRate}%</span>
                    </div>
                    <div className="mt-3">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${overallCompletionRate}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Active Students */}
                <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-green-900/50' : 'bg-green-100'}`}>
                            <Users size={20} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />
                        </div>
                        <div className="flex items-center">
                            <TrendingUp size={16} className={getPositiveTrendColor()} />
                            <span className={`ml-1 text-xs ${getPositiveTrendColor()}`}>+12%</span>
                        </div>
                    </div>
                    <h3 className={`text-sm font-medium ${getSubtleTextColor()}`}>Active Students</h3>
                    <div className="flex items-baseline mt-1">
                        <span className={`text-2xl font-bold ${getTextColor()}`}>{totalActiveStudents}</span>
                        <span className={`ml-2 text-sm ${getSubtleTextColor()}`}>
                            of {totalEnrolledStudents} ({activeStudentPercentage}%)
                        </span>
                    </div>
                    <div className="mt-3">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${activeStudentPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Average Time Spent */}
                <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-amber-900/50' : 'bg-amber-100'}`}>
                            <Clock size={20} className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} />
                        </div>
                        <div className="flex items-center">
                            <TrendingUp size={16} className={getPositiveTrendColor()} />
                            <span className={`ml-1 text-xs ${getPositiveTrendColor()}`}>+8%</span>
                        </div>
                    </div>
                    <h3 className={`text-sm font-medium ${getSubtleTextColor()}`}>Avg. Time Per Session</h3>
                    <div className="flex items-baseline mt-1">
                        <span className={`text-2xl font-bold ${getTextColor()}`}>2h 15m</span>
                    </div>
                    <p className={`mt-1 text-xs ${getSubtleTextColor()}`}>
                        32 minutes longer than last month
                    </p>
                </div>

                {/* Certification Rate */}
                <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
                            <Award size={20} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
                        </div>
                        <div className="flex items-center">
                            <TrendingDown size={16} className={getNegativeTrendColor()} />
                            <span className={`ml-1 text-xs ${getNegativeTrendColor()}`}>-3%</span>
                        </div>
                    </div>
                    <h3 className={`text-sm font-medium ${getSubtleTextColor()}`}>Certification Rate</h3>
                    <div className="flex items-baseline mt-1">
                        <span className={`text-2xl font-bold ${getTextColor()}`}>62%</span>
                    </div>
                    <p className={`mt-1 text-xs ${getSubtleTextColor()}`}>
                        178 certificates issued this month
                    </p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Weekly Progress Chart */}
                <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                    <h3 className={`text-lg font-medium mb-4 ${getTextColor()}`}>Weekly Progress</h3>
                    <div className="h-72 w-full">
                        {/* This would be replaced with an actual chart component */}
                        <div className="relative h-full flex">
                            <div className="absolute bottom-0 left-0 right-0 top-0 grid grid-cols-8 gap-1">
                                {weeklyProgressData.map((data, index) => (
                                    <div key={index} className="flex flex-col justify-end">
                                        <div
                                            className={`w-full ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} rounded-t`}
                                            style={{ height: `${data.completion}%` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-2 border-t border-gray-300 dark:border-gray-600">
                                {weeklyProgressData.map((data, index) => (
                                    <div key={index} className={`text-xs ${getSubtleTextColor()}`}>
                                        {data.week.substring(5)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <div className={`w-3 h-3 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} rounded-full mr-2`}></div>
                            <span className={`text-sm ${getSubtleTextColor()}`}>Completion Rate (%)</span>
                        </div>
                        <span className={`text-sm font-medium ${getTextColor()}`}>Avg: 60.4%</span>
                    </div>
                </div>

                {/* Grade Distribution Chart */}
                <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                    <h3 className={`text-lg font-medium mb-4 ${getTextColor()}`}>Grade Distribution</h3>
                    <div className="grid grid-cols-5 gap-3 mb-4">
                        {gradeDistribution.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="flex flex-col items-center justify-end h-40 w-full">
                                    <div
                                        className={`w-full ${
                                            theme === 'dark'
                                                ? index === 0 ? 'bg-green-600' : 
                                                  index === 1 ? 'bg-blue-600' : 
                                                  index === 2 ? 'bg-amber-600' : 
                                                  index === 3 ? 'bg-orange-600' : 'bg-red-600'
                                                : index === 0 ? 'bg-green-500' : 
                                                  index === 1 ? 'bg-blue-500' : 
                                                  index === 2 ? 'bg-amber-500' : 
                                                  index === 3 ? 'bg-orange-500' : 'bg-red-500'
                                        } rounded-t`}
                                        style={{ height: `${item.percentage * 2}%` }}
                                    ></div>
                                </div>
                                <div className="mt-2 text-center">
                                    <div className={`text-sm font-medium ${getTextColor()}`}>{item.grade}</div>
                                    <div className={`text-xs ${getSubtleTextColor()}`}>{item.percentage}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                            <span className={`text-sm ${getSubtleTextColor()}`}>Pass Rate:</span>
                            <span className={`text-sm font-medium ${getTextColor()}`}>82%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Specific Progress */}
            <div className={`rounded-lg border ${getCardStyle()} p-6 mb-8`}>
                <h3 className={`text-lg font-medium mb-6 ${getTextColor()}`}>Course Progress</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${getSubtleTextColor()}`}
                                >
                                    Course
                                </th>
                                <th
                                    scope="col"
                                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${getSubtleTextColor()}`}
                                >
                                    Active Students
                                </th>
                                <th
                                    scope="col"
                                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${getSubtleTextColor()}`}
                                >
                                    Completion Rate
                                </th>
                                <th
                                    scope="col"
                                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${getSubtleTextColor()}`}
                                >
                                    Progress
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {courseData.map((course, index) => (
                                <tr key={index} 
                                    className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                                >
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getTextColor()}`}>
                                        {course.name}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${getSubtleTextColor()}`}>
                                        {course.activeStudents} / {course.totalStudents}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${getTextColor()}`}>
                                        {course.completionRate}%
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full"
                                                style={{ width: `${course.completionRate}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Student Engagement and Time Spent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Student Engagement Chart */}
                <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                    <h3 className={`text-lg font-medium mb-4 ${getTextColor()}`}>Student Engagement</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {engagementData.map((item, index) => (
                            <div key={index} className="text-center">
                                <div
                                    className={`mx-auto mb-3 w-20 h-20 rounded-full flex items-center justify-center ${
                                        index === 0
                                            ? theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                                            : index === 1
                                            ? theme === 'dark' ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'
                                            : theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                                    }`}
                                >
                                    <span className="text-xl font-bold">{item.percentage}%</span>
                                </div>
                                <h4 className={`text-sm font-medium ${getTextColor()}`}>{item.category}</h4>
                                <p className={`text-xs mt-1 ${getSubtleTextColor()}`}>{item.count} students</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm">
                            <span className={getSubtleTextColor()}>Total Unique Active Students:</span>{' '}
                            <span className={`font-medium ${getTextColor()}`}>
                                {engagementData.reduce((sum, item) => sum + item.count, 0)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Time Spent Distribution */}
                <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                    <h3 className={`text-lg font-medium mb-4 ${getTextColor()}`}>Time Spent Distribution</h3>
                    <div className="space-y-4">
                        {timeSpentData.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <span className={`text-sm ${getTextColor()}`}>{item.category}</span>
                                    <span className={`text-sm ${getSubtleTextColor()}`}>{item.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className={`h-2.5 rounded-full ${
                                            index === 0
                                                ? 'bg-red-500'
                                                : index === 1
                                                ? 'bg-amber-500'
                                                : index === 2
                                                ? 'bg-green-500'
                                                : 'bg-blue-500'
                                        }`}
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                                <p className={`mt-1 text-xs ${getSubtleTextColor()}`}>{item.count} students</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-sm">
                            <span className={getSubtleTextColor()}>Average Time Spent:</span>
                            <span className={`font-medium ${getTextColor()}`}>2 hours 15 minutes</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Info Box */}
            <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-4 ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                        <CheckCircle size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                    </div>
                    <div>
                        <h4 className={`text-sm font-medium mb-1 ${getTextColor()}`}>Insight Summary</h4>
                        <p className={`text-sm ${getSubtleTextColor()}`}>
                            Data shows a positive trend in course completion rates this {selectedTimeFrame.toLowerCase()},
                            with an increase of 5% compared to the previous period. Student engagement remains high with 76% 
                            of enrolled students actively participating in course activities. The Web Development Fundamentals 
                            and Data Science Essentials courses show the highest completion rates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressStatisticsPage;
