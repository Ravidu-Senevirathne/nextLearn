"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, Clock, ChevronDown, Edit, Trash2, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { assignmentService, Assignment } from '@/services/assignmentService';

export default function AssignmentsPage() {
    const { theme } = useTheme();
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
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

    useEffect(() => {
        fetchAssignments();
    }, []);

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
        );
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
