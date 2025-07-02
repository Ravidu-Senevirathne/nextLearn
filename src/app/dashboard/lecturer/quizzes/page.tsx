"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    PlusCircle,
    Search,
    Filter,
    GraduationCap,
    Edit,
    Trash2,
    Eye,
    FileText,
    CheckCircle,
    Clock,
    AlertTriangle,
    Loader2,
    RotateCw
} from 'lucide-react';
import { quizService, Quiz, QuizStatus } from '@/services/quizService';
import { useTheme } from '@/hooks/useTheme';

const QuizzesPage = () => {
    const { theme } = useTheme();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<QuizStatus | 'all'>('all');
    const [courseFilter, setCourseFilter] = useState('all');
    const [refreshing, setRefreshing] = useState(false);

    // Fetch quizzes from API
    const fetchQuizzes = async (showLoading = true) => {
        try {
            if (showLoading) setLoading(true);
            setRefreshing(true);
            setError(null);

            const data = await quizService.getQuizzes();
            setQuizzes(data);
        } catch (err) {
            console.error('Error fetching quizzes:', err);
            setError(err instanceof Error ? err.message : 'Failed to load quizzes');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    // Filter quizzes based on search and filters
    const filteredQuizzes = quizzes.filter(quiz => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (quiz.course?.title || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;
        const matchesCourse = courseFilter === 'all' || quiz.course?.title === courseFilter;
        return matchesSearch && matchesStatus && matchesCourse;
    });

    // Extract unique courses for filter dropdown
    const courses = ['all', ...new Set(quizzes.map(quiz => quiz.course?.title).filter(Boolean))] as string[];

    const getStatusBadgeClasses = (status: QuizStatus) => {
        const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
        
        switch (status) {
            case 'active':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
            case 'draft':
                return `${baseClasses} bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400`;
            case 'expired':
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400`;
            default:
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400`;
        }
    };

    const getStatusIcon = (status: QuizStatus) => {
        const iconSize = 14;
        switch (status) {
            case 'active':
                return <CheckCircle size={iconSize} className="mr-1" />;
            case 'draft':
                return <FileText size={iconSize} className="mr-1" />;
            case 'expired':
                return <Clock size={iconSize} className="mr-1" />;
            default:
                return null;
        }
    };

    const formatDate = (dateString?: string | Date) => {
        if (!dateString) return '—';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        } catch {
            return 'Invalid date';
        }
    };

    const handleDeleteQuiz = async (id: string) => {
        if (!confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
            return;
        }

        try {
            await quizService.deleteQuiz(id);
            setQuizzes(quizzes.filter(quiz => quiz.id !== id));
        } catch (err) {
            console.error('Error deleting quiz:', err);
            setError('Failed to delete quiz. Please try again.');
        }
    };

    return (
        <div className={`p-6 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className={`text-2xl font-bold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    <GraduationCap className="mr-2 h-7 w-7 text-purple-500" />
                    Quiz Management
                </h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => fetchQuizzes(false)}
                        disabled={refreshing}
                        className={`flex items-center px-3 py-2 rounded-md ${theme === 'dark' 
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                    >
                        <RotateCw 
                            size={18} 
                            className={`mr-1 ${refreshing ? 'animate-spin' : ''}`} 
                        />
                        Refresh
                    </button>
                    <Link href="/dashboard/lecturer/quizzes/create">
                        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                            <PlusCircle size={18} className="mr-1" />
                            Create Quiz
                        </button>
                    </Link>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' 
                    ? 'bg-red-900/30 border border-red-800 text-red-300' 
                    : 'bg-red-100 border border-red-200 text-red-800'
                }`}>
                    <p className="font-medium">Error</p>
                    <p className="mt-1 text-sm">{error}</p>
                </div>
            )}

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-lg border ${theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-gray-300' 
                    : 'bg-white border-gray-200 text-gray-900'
                } shadow-sm`}>
                    <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Total Quizzes
                    </div>
                    <div className="text-2xl font-semibold">
                        {loading ? '—' : quizzes.length}
                    </div>
                </div>

                <div className={`p-4 rounded-lg border ${theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-gray-300' 
                    : 'bg-white border-gray-200 text-gray-900'
                } shadow-sm`}>
                    <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Active Quizzes
                    </div>
                    <div className="text-2xl font-semibold">
                        {loading ? '—' : quizzes.filter(q => q.status === 'active').length}
                    </div>
                </div>

                <div className={`p-4 rounded-lg border ${theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-gray-300' 
                    : 'bg-white border-gray-200 text-gray-900'
                } shadow-sm`}>
                    <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Draft Quizzes
                    </div>
                    <div className="text-2xl font-semibold">
                        {loading ? '—' : quizzes.filter(q => q.status === 'draft').length}
                    </div>
                </div>

                <div className={`p-4 rounded-lg border ${theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-gray-300' 
                    : 'bg-white border-gray-200 text-gray-900'
                } shadow-sm`}>
                    <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Avg. Questions
                    </div>
                    <div className="text-2xl font-semibold">
                        {loading ? '—' : 
                            quizzes.length > 0 
                                ? Math.round(quizzes.reduce((sum, quiz) => sum + (quiz.questions?.length || 0), 0) / quizzes.length)
                                : 0
                        }
                    </div>
                </div>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search quizzes by title or course..."
                        className={`pl-10 pr-4 py-2 w-full border rounded-md ${theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-3">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <select
                            className={`border rounded-md py-2 px-3 ${theme === 'dark'
                                ? 'bg-gray-800 border-gray-700 text-gray-100'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as QuizStatus | 'all')}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>

                    <div>
                        <select
                            className={`border rounded-md py-2 px-3 ${theme === 'dark'
                                ? 'bg-gray-800 border-gray-700 text-gray-100'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            value={courseFilter}
                            onChange={(e) => setCourseFilter(e.target.value)}
                        >
                            <option value="all">All Courses</option>
                            {courses.filter(c => c !== 'all').map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Quizzes Table */}
            <div className={`rounded-lg border shadow-sm overflow-hidden ${theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
                {loading ? (
                    <div className="flex justify-center items-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Quiz Title
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Course
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Questions
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Due Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${theme === 'dark' 
                                    ? 'divide-gray-700 bg-gray-800' 
                                    : 'divide-gray-200 bg-white'
                                }`}>
                                    {filteredQuizzes.length > 0 ? (
                                        filteredQuizzes.map((quiz) => (
                                            <tr key={quiz.id} className={theme === 'dark' 
                                                ? 'hover:bg-gray-700' 
                                                : 'hover:bg-gray-50'
                                            }>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium">
                                                        <Link 
                                                            href={`/dashboard/lecturer/quizzes/${quiz.id}`}
                                                            className={`hover:underline ${theme === 'dark' 
                                                                ? 'text-purple-400 hover:text-purple-300' 
                                                                : 'text-purple-600 hover:text-purple-700'
                                                            }`}
                                                        >
                                                            {quiz.title}
                                                        </Link>
                                                    </div>
                                                    <div className={`text-sm ${theme === 'dark' 
                                                        ? 'text-gray-400' 
                                                        : 'text-gray-500'
                                                    }`}>
                                                        {quiz.description || 'No description'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={`text-sm ${theme === 'dark' 
                                                        ? 'text-gray-300' 
                                                        : 'text-gray-700'
                                                    }`}>
                                                        {quiz.course?.title || '—'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={`text-sm ${theme === 'dark' 
                                                        ? 'text-gray-300' 
                                                        : 'text-gray-700'
                                                    }`}>
                                                        {quiz.questions?.length || 0}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={getStatusBadgeClasses(quiz.status)}>
                                                        {getStatusIcon(quiz.status)}
                                                        {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={`text-sm ${theme === 'dark' 
                                                        ? 'text-gray-300' 
                                                        : 'text-gray-700'
                                                    }`}>
                                                        {formatDate(quiz.dueDate)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <Link 
                                                            href={`/dashboard/lecturer/quizzes/${quiz.id}`}
                                                            className={`p-1 rounded-full ${theme === 'dark'
                                                                ? 'hover:bg-gray-600 text-blue-400'
                                                                : 'hover:bg-gray-100 text-blue-600'
                                                            }`}
                                                        >
                                                            <Eye size={18} />
                                                        </Link>
                                                        <Link 
                                                            href={`/dashboard/lecturer/quizzes/${quiz.id}/edit`}
                                                            className={`p-1 rounded-full ${theme === 'dark'
                                                                ? 'hover:bg-gray-600 text-amber-400'
                                                                : 'hover:bg-gray-100 text-amber-600'
                                                            }`}
                                                        >
                                                            <Edit size={18} />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteQuiz(quiz.id)}
                                                            className={`p-1 rounded-full ${theme === 'dark'
                                                                ? 'hover:bg-gray-600 text-red-400'
                                                                : 'hover:bg-gray-100 text-red-600'
                                                            }`}
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center">
                                                <div className={`flex flex-col items-center py-6 ${theme === 'dark' 
                                                    ? 'text-gray-400' 
                                                    : 'text-gray-500'
                                                }`}>
                                                    <AlertTriangle size={32} className="mb-2" />
                                                    <p>No quizzes found matching your criteria</p>
                                                    {searchTerm && (
                                                        <button 
                                                            onClick={() => {
                                                                setSearchTerm('');
                                                                setStatusFilter('all');
                                                                setCourseFilter('all');
                                                            }}
                                                            className="mt-2 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                                                        >
                                                            Clear all filters
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination - would be implemented with real data */}
                        {filteredQuizzes.length > 0 && (
                            <div className={`px-6 py-3 border-t ${theme === 'dark' 
                                ? 'border-gray-700' 
                                : 'border-gray-200'
                            } flex items-center justify-between`}>
                                <div className={`text-sm ${theme === 'dark' 
                                    ? 'text-gray-400' 
                                    : 'text-gray-500'
                                }`}>
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredQuizzes.length}</span> of{' '}
                                    <span className="font-medium">{quizzes.length}</span> quizzes
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        className={`px-3 py-1 rounded-md ${theme === 'dark'
                                            ? 'bg-gray-700 text-gray-300 border-gray-600'
                                            : 'bg-white text-gray-700 border-gray-300'
                                        } border`}
                                        disabled
                                    >
                                        Previous
                                    </button>
                                    <button 
                                        className={`px-3 py-1 rounded-md ${theme === 'dark'
                                            ? 'bg-purple-700 text-white'
                                            : 'bg-purple-600 text-white'
                                        }`}
                                    >
                                        1
                                    </button>
                                    <button 
                                        className={`px-3 py-1 rounded-md ${theme === 'dark'
                                            ? 'bg-gray-700 text-gray-300 border-gray-600'
                                            : 'bg-white text-gray-700 border-gray-300'
                                        } border`}
                                        disabled
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizzesPage;