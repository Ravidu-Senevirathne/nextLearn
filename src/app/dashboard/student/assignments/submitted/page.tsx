"use client";

import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, CheckCircle2, FileText, BookOpen } from 'lucide-react';
import { Assignment } from '@/Components/Dashboard/student/types';
import Link from 'next/link';

// Sample submitted assignments data - would come from API in production
const allAssignments = [
    {
        id: '1',
        title: 'JavaScript Fundamentals Quiz',
        course: 'Advanced JavaScript',
        submittedDate: 'Jul 15, 2023',
        status: 'submitted',
        waitingDays: 2
    },
    {
        id: '2',
        title: 'Database Design Project',
        course: 'Database Management',
        submittedDate: 'Jul 18, 2023',
        status: 'submitted',
        waitingDays: 1
    },
    {
        id: '3',
        title: 'User Interface Prototype',
        course: 'UI/UX Design Principles',
        submittedDate: 'Jul 10, 2023',
        status: 'submitted',
        waitingDays: 7
    },
    {
        id: '4',
        title: 'API Integration Exercise',
        course: 'Web Development Fundamentals',
        submittedDate: 'Jul 5, 2023',
        status: 'submitted',
        waitingDays: 12
    },
    {
        id: '5',
        title: 'Data Visualization Project',
        course: 'Data Science Essentials',
        submittedDate: 'Jul 20, 2023',
        status: 'submitted',
        waitingDays: 0
    }
];

// Course list for filtering
const courses = [
    'All Courses',
    'Web Development Fundamentals',
    'Data Science Essentials',
    'Advanced JavaScript',
    'UI/UX Design Principles',
    'Database Management',
    'Mobile App Development'
];

const SubmittedAssignmentsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('All Courses');
    const [sortOption, setSortOption] = useState('recent-first');
    const [filteredAssignments, setFilteredAssignments] = useState(allAssignments);

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
        } else if (sortOption === 'recent-first') {
            // Sort by most recently submitted
            result.sort((a, b) => {
                // This is a simplistic approach. In a real app, you'd parse dates properly
                return a.waitingDays - b.waitingDays;
            });
        } else if (sortOption === 'oldest-first') {
            // Sort by longest waiting
            result.sort((a, b) => {
                return b.waitingDays - a.waitingDays;
            });
        }

        setFilteredAssignments(result);
    }, [searchTerm, selectedCourse, sortOption]);

    // Calculate statistics about submitted assignments
    const totalSubmitted = allAssignments.length;
    const recentlySubmitted = allAssignments.filter(a => a.waitingDays <= 2).length;
    const waitingLong = allAssignments.filter(a => a.waitingDays >= 7).length;

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
                            <option value="recent-first">Recently Submitted</option>
                            <option value="oldest-first">Longest Waiting</option>
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
                        <div className="text-sm text-gray-400">Total Submitted</div>
                        <div className="text-lg font-semibold text-white">{totalSubmitted}</div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                        <CheckCircle2 size={18} className="text-green-400" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">Recently Submitted</div>
                        <div className="text-lg font-semibold text-white">{recentlySubmitted}</div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center mr-3">
                        <Clock size={18} className="text-amber-400" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">Waiting > 7 Days</div>
                        <div className="text-lg font-semibold text-white">{waitingLong}</div>
                    </div>
                </div>
            </div>

            {/* Submitted Assignment List */}
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
                                    <div className="flex items-center text-green-400 bg-green-900/30 px-3 py-1 rounded-full text-sm">
                                        <Calendar size={14} className="mr-1" />
                                        Submitted: {assignment.submittedDate}
                                    </div>
                                    <div className={`flex items-center ${assignment.waitingDays > 7
                                            ? 'text-amber-400 bg-amber-900/30'
                                            : 'text-blue-400 bg-blue-900/30'
                                        } px-3 py-1 rounded-full text-sm`}>
                                        <Clock size={14} className="mr-1" />
                                        Waiting: {assignment.waitingDays} {assignment.waitingDays === 1 ? 'day' : 'days'}
                                    </div>
                                    <Link
                                        href={`/dashboard/student/assignments/${assignment.id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm flex items-center justify-center"
                                    >
                                        View Submission
                                    </Link>
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
                    <h3 className="text-xl font-semibold mb-2 text-white">No submitted assignments found</h3>
                    <p className="text-gray-400 mb-6">
                        {searchTerm || selectedCourse !== 'All Courses'
                            ? "Try adjusting your search or filters."
                            : "You don't have any submitted assignments waiting for grading."}
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

export default SubmittedAssignmentsPage;
