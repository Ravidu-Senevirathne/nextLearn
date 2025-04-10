"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, Clock, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

// Mock data for assignments
const mockAssignments = [
    {
        id: 1,
        title: 'Research Paper on Machine Learning',
        course: 'Advanced AI Concepts',
        dueDate: '2023-12-15',
        status: 'Active',
        submissions: 12,
        totalStudents: 25,
    },
    {
        id: 2,
        title: 'Database Design Project',
        course: 'Database Management',
        dueDate: '2023-12-20',
        status: 'Active',
        submissions: 8,
        totalStudents: 30,
    },
    {
        id: 3,
        title: 'UI/UX Case Study',
        course: 'Human-Computer Interaction',
        dueDate: '2023-11-30',
        status: 'Expired',
        submissions: 22,
        totalStudents: 22,
    },
];

export default function AssignmentsPage() {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Only access theme client-side
    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

    // Filter assignments based on status and search query
    const filteredAssignments = mockAssignments
        .filter(assignment => {
            if (filter === 'all') return true;
            return assignment.status.toLowerCase() === filter.toLowerCase();
        })
        .filter(assignment =>
            assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Assignments</h1>
                <Link
                    href="/dashboard/lecturer/assignments/create"
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-md flex items-center hover:from-teal-600 hover:to-cyan-700 transition-all"
                >
                    <Plus size={18} className="mr-2" />
                    Create Assignment
                </Link>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-grow max-w-md">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search assignments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <Filter size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        >
                            <option value="all">All Assignments</option>
                            <option value="active">Active</option>
                            <option value="expired">Expired</option>
                            <option value="draft">Drafts</option>
                        </select>
                    </div>

                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <Calendar size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
                        <span>Date</span>
                        <ChevronDown size={16} className="ml-2 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <div className="col-span-5">Assignment</div>
                    <div className="col-span-2">Course</div>
                    <div className="col-span-2">Due Date</div>
                    <div className="col-span-2">Submissions</div>
                    <div className="col-span-1">Status</div>
                </div>

                {filteredAssignments.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredAssignments.map((assignment) => (
                            <div key={assignment.id} className="grid grid-cols-12 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors items-center">
                                <div className="col-span-5">
                                    <Link href={`/dashboard/lecturer/assignments/${assignment.id}`} className="font-medium text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300">
                                        {assignment.title}
                                    </Link>
                                </div>
                                <div className="col-span-2 text-sm text-gray-600 dark:text-gray-300">{assignment.course}</div>
                                <div className="col-span-2 text-sm flex items-center text-gray-600 dark:text-gray-300">
                                    <Calendar size={14} className="mr-2 text-gray-500 dark:text-gray-400" />
                                    {assignment.dueDate}
                                </div>
                                <div className="col-span-2 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="inline-flex items-center">
                                        <span className="mr-2">{assignment.submissions}/{assignment.totalStudents}</span>
                                        <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                            <div
                                                className="bg-teal-500 h-2.5 rounded-full"
                                                style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <span className={`px-2 py-1 text-xs rounded-full ${assignment.status === 'Active'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                        {assignment.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        No assignments found matching your criteria.
                    </div>
                )}
            </div>

            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Quick Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-teal-50 dark:bg-teal-900/30">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Assignments</div>
                        <div className="text-2xl font-bold text-teal-700 dark:text-teal-400">{mockAssignments.length}</div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-cyan-50 dark:bg-cyan-900/30">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Assignments</div>
                        <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">
                            {mockAssignments.filter(a => a.status === 'Active').length}
                        </div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/30">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Submission Rate</div>
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                            {Math.round(mockAssignments.reduce((acc, curr) =>
                                acc + (curr.submissions / curr.totalStudents), 0) / mockAssignments.length * 100)}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
