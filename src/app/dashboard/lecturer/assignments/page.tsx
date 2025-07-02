"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, Clock, ChevronDown, Edit, Trash2, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
<<<<<<< HEAD
import { useTheme } from '@/hooks/useTheme';
import { assignmentService, Assignment } from '@/services/assignmentService';
=======
import { useTheme } from 'next-themes';
import { assignmentService } from '@/services/assignmentService';
import { Assignment } from '@/types/assignment';
import { Course } from '@/types/course';
import { format, parse, isAfter } from 'date-fns';

// Extend Assignment type for local UI state
interface AssignmentWithStats extends Assignment {
    status: 'Active' | 'Expired' | 'Draft';
    submissions: number;
    totalStudents: number;
}
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac

export default function AssignmentsPage() {
    const { theme } = useTheme();
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
<<<<<<< HEAD
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [allAssignments, setAllAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch assignments from API
    const fetchAssignments = async (showRefreshIndicator = false) => {
        try {
            if (showRefreshIndicator) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const data = await assignmentService.getAllAssignments();
            setAllAssignments(data);
            setAssignments(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError(error instanceof Error ? error.message : 'Failed to load assignments. Please try again.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };
=======
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [assignments, setAssignments] = useState<AssignmentWithStats[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac

    useEffect(() => {
        fetchAssignments();
    }, []);

<<<<<<< HEAD
    // Delete assignment handler
    const handleDeleteAssignment = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this assignment?')) {
            return;
        }

        try {
            await assignmentService.deleteAssignment(id);
            // Remove from local state
            const updatedAssignments = allAssignments.filter(assignment => assignment.id !== id);
            setAllAssignments(updatedAssignments);
            setAssignments(updatedAssignments);
        } catch (error) {
            console.error('Error deleting assignment:', error);
            setError('Failed to delete assignment. Please try again.');
        }
    };

    // Filter assignments based on search term and filters
    useEffect(() => {
        let filteredAssignments = allAssignments;

        // Apply search filter
        if (searchQuery) {
            filteredAssignments = filteredAssignments.filter(assignment =>
                assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (assignment.course?.title || '').toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply status filter
        if (filter !== 'all') {
            filteredAssignments = filteredAssignments.filter(assignment =>
                assignment.status === filter
            );
        }

        setAssignments(filteredAssignments);
    }, [searchQuery, filter, allAssignments]);

    const getStatusBadge = (status: string) => {
        // Handle undefined/null status
        if (!status) {
            status = 'draft'; // Default fallback
        }

        const statusColors = {
            published: theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800',
            draft: theme === 'dark' ? 'bg-amber-900 text-amber-100' : 'bg-amber-100 text-amber-800',
            expired: theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800',
        };

        return (
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusColors[status as keyof typeof statusColors] || statusColors.draft}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
=======
    // Fetch assignments and courses
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch assignments
                const data = await assignmentService.getAll();
                // Fetch courses
                const coursesRes = await fetch('http://localhost:8000/courses', { credentials: 'include' });
                const coursesData = await coursesRes.json();
                setCourses(coursesData);
                // Process the data to include calculated fields
                const processedAssignments: AssignmentWithStats[] = data.map((assignment: Assignment) => {
                    const now = new Date();
                    const dueDate = new Date(assignment.dueDate);
                    return {
                        ...assignment,
                        status: isAfter(dueDate, now) ? 'Active' : 'Expired',
                        submissions: Math.floor(Math.random() * 30),
                        totalStudents: 30
                    };
                });
                setAssignments(processedAssignments);
                setError(null);
            } catch (err: any) {
                console.error("Error fetching assignments or courses:", err);
                setError(err.message || "Failed to load assignments");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

    // Filter assignments based on status and search query
    const filteredAssignments = assignments
        .filter(assignment => {
            if (filter === 'all') return true;
            return assignment.status?.toLowerCase() === filter.toLowerCase();
        })
        .filter(assignment =>
            assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assignment.courseId.toString().toLowerCase().includes(searchQuery.toLowerCase())
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
        );
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return format(date, 'yyyy-MM-dd');
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {error && (
                <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'}`}>
                    <p className="font-medium">Error</p>
                    <p className="mt-1">{error}</p>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        Manage Assignments
                    </h1>
                    <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Create and manage your course assignments
                    </p>
                </div>
                <Link href="/dashboard/lecturer/assignments/create">
                    <button className={`flex items-center px-4 py-2 rounded-md transition-all ${theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-teal-600 hover:bg-teal-700 text-white'
                        }`}>
                        <Plus size={18} className="mr-2" />
                        Create Assignment
                    </button>
                </Link>
                <button
                    onClick={() => fetchAssignments(true)}
                    disabled={refreshing}
                    className={`flex items-center px-4 py-2 rounded-md transition-all ${theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        } ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <RefreshCw size={18} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {/* Filters and Search */}
            <div className={`p-4 mb-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search assignments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`pl-10 pr-4 py-2 w-full rounded-md ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                                } border focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                                }`}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-40">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                    } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                                    }`}
                            >
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="expired">Expired</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

<<<<<<< HEAD
            {/* Assignments Table */}
            <div className="overflow-x-auto">
                <div className={`rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    {loading ? (
                        <div className={`p-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-3"></div>
                            <p>Loading assignments...</p>
                        </div>
                    ) : assignments.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                                <tr>
                                    <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Assignment
                                    </th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Course
                                    </th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Due Date
                                    </th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Total Marks
                                    </th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Status
                                    </th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Created
                                    </th>
                                    <th className={`px-6 py-3 text-right text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                {assignments.map((assignment) => (
                                    <tr key={assignment.id} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                            <div className="font-medium">{assignment.title}</div>
                                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {assignment.description ?
                                                    (assignment.description.length > 60
                                                        ? `${assignment.description.substring(0, 60)}...`
                                                        : assignment.description
                                                    ) : 'No description'
                                                }
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            {assignment.course?.title || 'N/A'}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            <div className="flex items-center">
                                                <Calendar size={14} className="mr-2" />
                                                {new Date(assignment.dueDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            {assignment.totalMarks || assignment.totalPoints || 0} marks
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(assignment.status)}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            {assignment.createdAt ? new Date(assignment.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    className={`p-1 rounded-full ${theme === 'dark'
                                                        ? 'hover:bg-gray-600 text-gray-300'
                                                        : 'hover:bg-gray-100 text-gray-600'
                                                        }`}
                                                    title="Preview"
                                                >
                                                    <ExternalLink size={18} />
                                                </button>
                                                <button
                                                    className={`p-1 rounded-full ${theme === 'dark'
                                                        ? 'hover:bg-gray-600 text-blue-400'
                                                        : 'hover:bg-gray-100 text-teal-600'
                                                        }`}
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAssignment(assignment.id)}
                                                    className={`p-1 rounded-full ${theme === 'dark'
                                                        ? 'hover:bg-gray-600 text-red-400'
                                                        : 'hover:bg-gray-100 text-red-500'
                                                        }`}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={`p-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            <AlertCircle className="mx-auto h-12 w-12 mb-3" />
                            <h3 className={`text-lg font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                No assignments found
                            </h3>
                            <p className="mb-4">
                                {searchQuery || filter !== 'all'
                                    ? 'Try adjusting your search or filters to find what you\'re looking for.'
                                    : 'Get started by creating your first assignment.'}
                            </p>
                            {!searchQuery && filter === 'all' && (
                                <Link href="/dashboard/lecturer/assignments/create">
                                    <button className={`${theme === 'dark'
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-teal-600 hover:bg-teal-700'} text-white px-4 py-2 rounded-md flex items-center mx-auto`}>
                                        <Plus size={16} className="mr-2" /> Create New Assignment
                                    </button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Stats */}
            {assignments.length > 0 && (
                <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                    <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Quick Stats</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-teal-900/30 border border-teal-800' : 'bg-teal-50 border border-teal-200'}`}>
                            <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Assignments</div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-teal-400' : 'text-teal-700'}`}>{allAssignments.length}</div>
                        </div>
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
                            <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Published</div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                                {allAssignments.filter(a => a.status === 'published').length}
                            </div>
                        </div>
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/30 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
                            <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Draft</div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
                                {allAssignments.filter(a => a.status === 'draft').length}
                            </div>
=======
            {/* Assignment List */}
            {loading ? (
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading assignments...</p>
                </div>
            ) : error ? (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg text-center">
                    {error}
                </div>
            ) : (
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
                                    <div className="col-span-2 text-sm text-gray-600 dark:text-gray-300">
                                        {courses.find(c => c.id === assignment.courseId)?.title || assignment.courseId}
                                    </div>
                                    <div className="col-span-2 text-sm flex items-center text-gray-600 dark:text-gray-300">
                                        <Calendar size={14} className="mr-2 text-gray-500 dark:text-gray-400" />
                                        {formatDate(assignment.dueDate)}
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
            )}

            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Quick Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-teal-50 dark:bg-teal-900/30">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Assignments</div>
                        <div className="text-2xl font-bold text-teal-700 dark:text-teal-400">{assignments.length}</div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-cyan-50 dark:bg-cyan-900/30">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Assignments</div>
                        <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">
                            {assignments.filter(a => a.status === 'Active').length}
                        </div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/30">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Submission Rate</div>
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                            {Math.round(assignments.reduce((acc, curr) =>
                                acc + (curr.submissions / curr.totalStudents), 0) / assignments.length * 100)}%
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
