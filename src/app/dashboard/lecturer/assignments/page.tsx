"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, Clock, ChevronDown, Edit, Trash2, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { assignmentService, Assignment } from '@/services/assignmentService';
import { format, isAfter } from 'date-fns';

interface EnhancedAssignment extends Assignment {
    // Match the base interface status values but make it required
    status: "draft" | "published" | "expired";
    displayStatus: 'Active' | 'Expired' | 'Draft';
    submissions: number;
    totalStudents: number;
    submissionRate: number;
}

export default function AssignmentsPage() {
    const { theme } = useTheme();
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [assignments, setAssignments] = useState<EnhancedAssignment[]>([]);
    const [filteredAssignments, setFilteredAssignments] = useState<EnhancedAssignment[]>([]);
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

            // Enhance assignments with additional calculated fields
            const enhancedData = data.map(assignment => {
                const now = new Date();
                const dueDate = new Date(assignment.dueDate);
                const submissions = Math.floor(Math.random() * 30); // Mock data - replace with real data
                const totalStudents = 30; // Mock data - replace with real data

                // Determine display status
                let displayStatus: 'Active' | 'Expired' | 'Draft';

                if (assignment.status === 'published' && isAfter(dueDate, now)) {
                    displayStatus = 'Active';
                } else if (assignment.status === 'published') {
                    displayStatus = 'Expired';
                } else {
                    displayStatus = 'Draft';
                }

                return {
                    ...assignment,
                    status: assignment.status || 'draft', // Ensure status is not undefined
                    displayStatus,
                    submissions,
                    totalStudents,
                    submissionRate: Math.round((submissions / totalStudents) * 100)
                };
            });

            setAssignments(enhancedData);
            setError(null);
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError(error instanceof Error ? error.message : 'Failed to load assignments. Please try again.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Delete assignment handler
    const handleDeleteAssignment = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this assignment?')) {
            return;
        }

        try {
            await assignmentService.deleteAssignment(id);
            // Remove from local state
            const updatedAssignments = assignments.filter(assignment => assignment.id !== id);
            setAssignments(updatedAssignments);
        } catch (error) {
            console.error('Error deleting assignment:', error);
            setError('Failed to delete assignment. Please try again.');
        }
    };

    // Filter assignments based on search term and filters
    useEffect(() => {
        let filtered = assignments;

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(assignment =>
                assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (assignment.course?.title || '').toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply status filter
        if (filter !== 'all') {
            filtered = filtered.filter(assignment => {
                if (filter === 'active') return assignment.displayStatus === 'Active';
                if (filter === 'expired') return assignment.displayStatus === 'Expired';
                if (filter === 'draft') return assignment.displayStatus === 'Draft';
                return true;
            });
        }

        setFilteredAssignments(filtered);
    }, [searchQuery, filter, assignments]);

    // Fetch data on component mount
    useEffect(() => {
        fetchAssignments();
    }, []);

    const getStatusBadge = (status: 'Active' | 'Expired' | 'Draft') => {
        const statusColors = {
            Active: theme === 'dark' ? 'bg-green-900/30 text-green-300 border-green-700' : 'bg-green-100 text-green-800 border-green-200',
            Expired: theme === 'dark' ? 'bg-red-900/30 text-red-300 border-red-700' : 'bg-red-100 text-red-800 border-red-200',
            Draft: theme === 'dark' ? 'bg-amber-900/30 text-amber-300 border-amber-700' : 'bg-amber-100 text-amber-800 border-amber-200',
        };

        return (
            <span className={`inline-block px-2 py-1 text-xs rounded-full border ${statusColors[status] || statusColors.Draft}`}>
                {status}
            </span>
        );
    };

    const formatDateDisplay = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch {
            return dateString;
        }
    };

    const formatDateTime = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
        } catch {
            return dateString;
        }
    };

    return (
        <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Error Message */}
            {error && (
                <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 border border-red-800 text-red-300' : 'bg-red-100 border border-red-200 text-red-800'}`}>
                    <p className="font-medium">Error</p>
                    <p className="mt-1 text-sm">{error}</p>
                </div>
            )}

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        Manage Assignments
                    </h1>
                    <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Create and manage your course assignments
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Link href="/dashboard/lecturer/assignments/create" className="w-full sm:w-auto">
                        <button className={`flex items-center justify-center px-4 py-2 rounded-md transition-all w-full ${theme === 'dark'
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
                        className={`flex items-center justify-center px-4 py-2 rounded-md transition-all w-full sm:w-auto ${theme === 'dark'
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            } ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <RefreshCw size={18} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className={`p-4 mb-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search assignments by title or course..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`pl-10 pr-4 py-2 w-full rounded-md ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
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
                                <option value="active">Active</option>
                                <option value="expired">Expired</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Assignments Table */}
            <div className="overflow-x-auto">
                <div className={`rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    {loading ? (
                        <div className={`p-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-3"></div>
                            <p>Loading assignments...</p>
                        </div>
                    ) : filteredAssignments.length > 0 ? (
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
                                        Submissions
                                    </th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Status
                                    </th>
                                    <th className={`px-6 py-3 text-right text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                {filteredAssignments.map((assignment) => (
                                    <tr key={assignment.id} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                        <td className={`px-6 py-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                            <div className="font-medium">
                                                <Link
                                                    href={`/dashboard/lecturer/assignments/${assignment.id}`}
                                                    className={`hover:underline ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-teal-600 hover:text-teal-700'}`}
                                                >
                                                    {assignment.title}
                                                </Link>
                                            </div>
                                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {assignment.description ?
                                                    (assignment.description.length > 60
                                                        ? `${assignment.description.substring(0, 60)}...`
                                                        : assignment.description
                                                    ) : 'No description'
                                                }
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            {assignment.course?.title || 'N/A'}
                                        </td>
                                        <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            <div className="flex items-center">
                                                <Calendar size={14} className="mr-2" />
                                                {formatDateDisplay(assignment.dueDate)}
                                            </div>
                                            <div className="text-xs mt-1">
                                                {formatDateTime(assignment.dueDate)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-24 mr-3">
                                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                                        <div
                                                            className="bg-teal-500 h-2 rounded-full"
                                                            style={{ width: `${assignment.submissionRate}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    {assignment.submissions}/{assignment.totalStudents}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(assignment.displayStatus)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={`/dashboard/lecturer/assignments/${assignment.id}`}
                                                    className={`p-1 rounded-full ${theme === 'dark'
                                                        ? 'hover:bg-gray-600 text-gray-300'
                                                        : 'hover:bg-gray-100 text-gray-600'
                                                        }`}
                                                    title="View"
                                                >
                                                    <ExternalLink size={18} />
                                                </Link>
                                                <Link
                                                    href={`/dashboard/lecturer/assignments/edit/${assignment.id}`}
                                                    className={`p-1 rounded-full ${theme === 'dark'
                                                        ? 'hover:bg-gray-600 text-blue-400'
                                                        : 'hover:bg-gray-100 text-teal-600'
                                                        }`}
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
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
                            {(!searchQuery && filter === 'all') && (
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
                <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Assignment Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-teal-900/30 border-teal-800' : 'bg-teal-50 border-teal-200'}`}>
                            <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Assignments</div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-teal-400' : 'text-teal-700'}`}>{assignments.length}</div>
                        </div>
                        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200'}`}>
                            <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Active Assignments</div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                                {assignments.filter(a => a.displayStatus === 'Active').length}
                            </div>
                        </div>
                        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
                            <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Avg Submission Rate</div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                                {Math.round(assignments.reduce((sum, a) => sum + a.submissionRate, 0) / assignments.length)}%
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}