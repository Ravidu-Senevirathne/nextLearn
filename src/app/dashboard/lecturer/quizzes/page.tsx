"use client";

import React, { useState } from 'react';
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
    AlertTriangle
} from 'lucide-react';

// Sample quiz data - would come from API in production
const quizzes = [
    {
        id: '1',
        title: 'JavaScript Fundamentals',
        course: 'Web Development Fundamentals',
        questions: 15,
        duration: '30 minutes',
        totalAttempts: 48,
        avgScore: 76,
        status: 'active',
        dueDate: '2023-08-15',
    },
    {
        id: '2',
        title: 'CSS Layout Techniques',
        course: 'Web Development Fundamentals',
        questions: 10,
        duration: '20 minutes',
        totalAttempts: 45,
        avgScore: 82,
        status: 'active',
        dueDate: '2023-08-20',
    },
    {
        id: '3',
        title: 'React Hooks & Components',
        course: 'Advanced JavaScript',
        questions: 20,
        duration: '45 minutes',
        totalAttempts: 32,
        avgScore: 68,
        status: 'draft',
        dueDate: null,
    },
    {
        id: '4',
        title: 'API Integration Basics',
        course: 'Backend Development',
        questions: 15,
        duration: '30 minutes',
        totalAttempts: 38,
        avgScore: 72,
        status: 'active',
        dueDate: '2023-09-05',
    },
    {
        id: '5',
        title: 'Database Relationships',
        course: 'Database Management',
        questions: 12,
        duration: '25 minutes',
        totalAttempts: 27,
        avgScore: 65,
        status: 'expired',
        dueDate: '2023-07-30',
    }
];

const QuizzesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [courseFilter, setCourseFilter] = useState('all');

    const filteredQuizzes = quizzes.filter(quiz => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quiz.course.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;
        const matchesCourse = courseFilter === 'all' || quiz.course === courseFilter;
        return matchesSearch && matchesStatus && matchesCourse;
    });

    // Extract unique courses for filter dropdown
    const courses = ['all', ...new Set(quizzes.map(quiz => quiz.course))];

    const getStatusBadgeClasses = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'draft':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            case 'expired':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
            default:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle size={14} className="mr-1" />;
            case 'draft':
                return <FileText size={14} className="mr-1" />;
            case 'expired':
                return <Clock size={14} className="mr-1" />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold flex items-center">
                    <GraduationCap className="mr-2 h-7 w-7 text-purple-500" />
                    Quiz Management
                </h1>
                <Link href="/dashboard/lecturer/quizzes/create">
                    <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                        <PlusCircle size={18} className="mr-1" />
                        Create New Quiz
                    </button>
                </Link>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Quizzes</div>
                    <div className="text-2xl font-semibold">{quizzes.length}</div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Active Quizzes</div>
                    <div className="text-2xl font-semibold">{quizzes.filter(q => q.status === 'active').length}</div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Attempts</div>
                    <div className="text-2xl font-semibold">{quizzes.reduce((sum, quiz) => sum + quiz.totalAttempts, 0)}</div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Avg. Score</div>
                    <div className="text-2xl font-semibold">
                        {Math.round(quizzes.reduce((sum, quiz) => sum + quiz.avgScore, 0) / quizzes.length)}%
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
                        placeholder="Search quizzes..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-3">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <select
                            className="border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 px-3"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>

                    <div>
                        <select
                            className="border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 px-3"
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
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quiz</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Questions</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Attempts</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredQuizzes.length > 0 ? (
                                filteredQuizzes.map((quiz) => (
                                    <tr key={quiz.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{quiz.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{quiz.course}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{quiz.questions}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{quiz.duration}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(quiz.status)}`}>
                                                {getStatusIcon(quiz.status)}
                                                {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {quiz.dueDate || <span className="text-gray-400">—</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-gray-100">{quiz.totalAttempts}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Avg. Score: {quiz.avgScore}%
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Link href={`/dashboard/lecturer/quizzes/${quiz.id}`}>
                                                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                                        <Eye size={18} />
                                                    </button>
                                                </Link>
                                                <Link href={`/dashboard/lecturer/quizzes/${quiz.id}/edit`}>
                                                    <button className="text-amber-600 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-300">
                                                        <Edit size={18} />
                                                    </button>
                                                </Link>
                                                <button
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    onClick={() => {
                                                        if (confirm("Are you sure you want to delete this quiz?")) {
                                                            // Handle delete logic
                                                            console.log("Delete quiz with id:", quiz.id);
                                                        }
                                                    }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center py-6">
                                            <AlertTriangle size={32} className="text-gray-400 mb-2" />
                                            <p>No quizzes found matching your filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder - would be implemented with real data */}
                <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing <span className="font-medium">{filteredQuizzes.length}</span> of <span className="font-medium">{quizzes.length}</span> quizzes
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-purple-500 text-white text-sm">
                            1
                        </button>
                        <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizzesPage;
