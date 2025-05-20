"use client";

import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, AlertCircle, FileText, BookOpen, Filter } from 'lucide-react';
import { Assignment } from '@/Components/Dashboard/student/types';
import Link from 'next/link';

// Sample pending assignments data - would come from API in production
const allAssignments: Assignment[] = [
    {
        id: '1',
        title: 'Create a Responsive Landing Page',
        course: 'Web Development Fundamentals',
        dueDate: 'Tomorrow, 11:59 PM',
        status: 'pending'
    },
    {
        id: '2',
        title: 'Data Visualization Project',
        course: 'Data Science Essentials',
        dueDate: 'Jul 25, 11:59 PM',
        status: 'pending'
    },
    {
        id: '3',
        title: 'JavaScript Framework Comparison',
        course: 'Advanced JavaScript',
        dueDate: 'Jul 28, 11:59 PM',
        status: 'pending'
    },
    {
        id: '4',
        title: 'User Research Report',
        course: 'UI/UX Design Principles',
        dueDate: 'Jul 30, 11:59 PM',
        status: 'pending'
    },
    {
        id: '5',
        title: 'Predictive Model Implementation',
        course: 'Machine Learning Fundamentals',
        dueDate: 'Aug 5, 11:59 PM',
        status: 'pending'
    },
    {
        id: '6',
        title: 'Mobile App Prototype',
        course: 'Mobile App Development',
        dueDate: 'Aug 10, 11:59 PM',
        status: 'pending'
    }
];

// Course list for filtering
const courses = [
    'All Courses',
    'Web Development Fundamentals',
    'Data Science Essentials',
    'Advanced JavaScript',
    'UI/UX Design Principles',
    'Machine Learning Fundamentals',
    'Mobile App Development'
];

const PendingAssignmentsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('All Courses');
    const [sortOption, setSortOption] = useState('due-date');
    const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>(allAssignments);

    // Filter and sort assignments based on search, course, and sort option
    useEffect(() => {
        let result = [...allAssignments];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(
                assignment =>
                    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    assignment.course.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply course filter
        if (selectedCourse !== 'All Courses') {
            result = result.filter(assignment => assignment.course === selectedCourse);
        }

        // Apply sorting
        if (sortOption === 'title-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === 'title-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOption === 'due-date') {
            // This is a simplistic approach. In a real app, you'd parse dates properly
            result.sort((a, b) => {
                if (a.dueDate.includes('Tomorrow')) return -1;
                if (b.dueDate.includes('Tomorrow')) return 1;
                return a.dueDate.localeCompare(b.dueDate);
            });
        }

        setFilteredAssignments(result);
    }, [searchTerm, selectedCourse, sortOption]);

    // Calculate statistics about assignments
    const totalPending = allAssignments.length;
    const dueSoon = allAssignments.filter(a => a.dueDate.includes('Tomorrow')).length;
    const dueThisWeek = allAssignments.filter(a =>
        a.dueDate.includes('Tomorrow') ||
        (a.dueDate.includes('Jul') && parseInt(a.dueDate.split(' ')[1]) <= 30)
    ).length;

    return (
        <>
            {/* Filters and Search */}
            <div className="mb-6 p-4 bg-gray-900 border border-gray-800 rounded-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            placeholder="Search assignments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Course Filter */}
                    <div className="min-w-[180px]">
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        >
                            {courses.map((course) => (
                                <option key={course} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div className="min-w-[180px]">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        >
                            <option value="due-date">Due Date (Earliest First)</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Assignment Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3">
                        <FileText size={18} className="text-blue-400" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">Total Pending</div>
                        <div className="text-lg font-semibold text-white">{totalPending}</div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center mr-3">
                        <AlertCircle size={18} className="text-amber-400" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">Due Tomorrow</div>
                        <div className="text-lg font-semibold text-white">{dueSoon}</div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
                        <Calendar size={18} className="text-purple-400" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">Due This Week</div>
                        <div className="text-lg font-semibold text-white">{dueThisWeek}</div>
                    </div>
                </div>
            </div>

            {/* Assignment List */}
            {filteredAssignments.length > 0 ? (
                <div className="space-y-4">
                    {filteredAssignments.map((assignment) => (
                        <div
                            key={assignment.id}
                            className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-blue-500/40 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="mb-3 md:mb-0">
                                    <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                                    <div className="flex items-center mt-1 text-gray-400 text-sm">
                                        <BookOpen size={14} className="mr-1" />
                                        {assignment.course}
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center gap-3">
                                    <div className="flex items-center text-amber-400 bg-amber-900/30 px-3 py-1 rounded-full text-sm">
                                        <Clock size={14} className="mr-1" />
                                        Due: {assignment.dueDate}
                                    </div>
                                    <Link
                                        href={`/dashboard/student/assignments/${assignment.id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm flex items-center justify-center"
                                    >
                                        Submit Assignment
                                    </Link>
                                </div>
                            </div>

                            {/* Assignment progress bar - this would be implemented in a real app */}
                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Not Started</span>
                                    <span>Submitted</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-1.5 bg-blue-600 rounded-full w-0"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <FileText size={48} className="text-gray-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">No pending assignments found</h3>
                    <p className="text-gray-400 mb-6">
                        {searchTerm || selectedCourse !== 'All Courses'
                            ? "Try adjusting your search or filters."
                            : "You don't have any pending assignments at the moment."}
                    </p>
                    <Link href="/dashboard/student/assignments">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                            View All Assignments
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default PendingAssignmentsPage;
