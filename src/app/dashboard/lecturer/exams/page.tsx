"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { examService } from '@/services/examService';
import {
    BookOpen,
    Filter,
    Search,
    PlusCircle,
    FileText,
    Calendar,
    Clock,
    Users,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    BarChart2
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';

const ExamsPage = () => {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'completed'>('all');
    const [exams, setExams] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load exams on component mount
    useEffect(() => {
        const loadExams = async () => {
            try {
                const fetchedExams = await examService.getExams();
                setExams(fetchedExams.map(exam => ({
                    ...exam,
                    date: new Date(exam.date).toISOString().split('T')[0],
                    time: new Date(exam.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    // Add mock data for submission counts (replace with real data from your API)
                    submissionCount: exam.status === 'completed' ? Math.floor(Math.random() * 50) : 0,
                    totalStudents: Math.floor(Math.random() * 60) + 20
                })));
            } catch (error) {
                console.error('Failed to load exams:', error);
                // Handle error (e.g., show toast notification)
            } finally {
                setIsLoading(false);
            }
        };
        loadExams();
    }, []);

    // Filter exams based on search term and status filter
    const filteredExams = useMemo(() => {
        return exams.filter(exam => {
            const matchesSearch =
                exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (exam.course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

            const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter, exams]);

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'published':
                return theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700';
            case 'draft':
                return theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
            case 'completed':
                return theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700';
            default:
                return theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'published':
                return <BookOpen size={14} className="mr-1" />;
            case 'draft':
                return <FileText size={14} className="mr-1" />;
            case 'completed':
                return <CheckCircle size={14} className="mr-1" />;
            default:
                return null;
        }
    };

    const handleDeleteExam = async (id: string) => {
        if (!confirm('Are you sure you want to delete this exam?')) return;
        try {
            await examService.deleteExam(id);
            setExams(exams.filter(exam => exam.id !== id));
        } catch (error) {
            console.error('Failed to delete exam:', error);
            // Show error to user
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
                        Exams
                    </h1>

                    <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                        Create and manage exams for your courses
                    </p>
                </div>
                <Link href="/dashboard/lecturer/exams/create">
                    <Button
                        className={
                            theme === 'dark'
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                        }
                    >
                        <PlusCircle size={16} className="mr-2" /> Create Exam
                    </Button>
                </Link>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className={`relative flex-1 max-w-md ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <input
                        type="text"
                        className={`pl-10 pr-4 py-2 w-full rounded-md border ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                            } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                            }`}
                        placeholder="Search exams..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                        <Filter size={16} className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Status:</span>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className={`py-2 px-3 rounded-md border ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                            } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                            } [&>option]:text-black ${theme === 'dark' && '[&>option]:bg-gray-700 [&>option]:text-white'
                            }`}
                    >
                        <option value="all">All</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Stats Summary */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
                            }`}>
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Published</div>
                            <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {exams.filter(e => e.status === 'published').length}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-600'
                            }`}>
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Completed</div>
                            <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {exams.filter(e => e.status === 'completed').length}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-600'
                            }`}>
                            <FileText size={20} />
                        </div>
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Drafts</div>
                            <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {exams.filter(e => e.status === 'draft').length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exams Table */}
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                } mb-6`}>
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className={theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}>
                        <tr>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
                                }`}>
                                Title
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
                                }`}>
                                Course
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
                                }`}>
                                Date & Time
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
                                }`}>
                                Duration
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
                                }`}>
                                Status
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
                                }`}>
                                Submissions
                            </th>
                            <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
                                }`}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className={`${theme === 'dark' ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'
                        }`}>
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-sm">
                                    Loading exams...
                                </td>
                            </tr>
                        ) : filteredExams.length > 0 ? (
                            filteredExams.map((exam) => (
                                <tr
                                    key={exam.id}
                                    className={theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}
                                >
                                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        <div className="font-medium">{exam.title}</div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                                        }`}>
                                        <div className="flex items-center">
                                            <BookOpen size={14} className="mr-1" />
                                            {exam.course?.title}
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                                        }`}>
                                        <div className="flex items-center mb-1">
                                            <Calendar size={14} className="mr-1" />
                                            {new Date(exam.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock size={14} className="mr-1" />
                                            {exam.time}
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                                        }`}>
                                        {exam.duration} minutes
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(exam.status)
                                            }`}>
                                            {getStatusIcon(exam.status)}
                                            {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                                        }`}>
                                        <div className="flex items-center">
                                            <Users size={14} className="mr-1" />
                                            {exam.submissionCount} / {exam.totalStudents}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                                                >
                                                    <MoreHorizontal size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className={
                                                theme === 'dark'
                                                    ? 'bg-gray-800 border-gray-700 text-white'
                                                    : 'bg-white border-gray-200'
                                            }>
                                                <Link href={`/dashboard/lecturer/exams/${exam.id}`}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <FileText size={14} className="mr-2" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href={`/dashboard/lecturer/exams/${exam.id}/edit`}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <FileText size={14} className="mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                </Link>
                                                {exam.status === 'completed' && (
                                                    <Link href={`/dashboard/lecturer/exams/${exam.id}/results`}>
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <BarChart2 size={14} className="mr-2" />
                                                            View Results
                                                        </DropdownMenuItem>
                                                    </Link>
                                                )}
                                                {exam.status !== 'completed' && (
                                                    <DropdownMenuItem
                                                        className="cursor-pointer text-red-500"
                                                        onClick={() => handleDeleteExam(exam.id)}
                                                    >
                                                        <XCircle size={14} className="mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className={`px-6 py-12 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                        }`}
                                >
                                    <div className="flex flex-col items-center">
                                        <FileText size={40} className="mb-2 opacity-40" />
                                        <p>No exams found matching your criteria</p>
                                        {searchTerm && (
                                            <p className="mt-1">
                                                Try adjusting your search or filter
                                            </p>
                                        )}
                                        {!searchTerm && statusFilter !== 'all' && (
                                            <p className="mt-1">
                                                Try selecting a different status filter
                                            </p>
                                        )}
                                        {!searchTerm && statusFilter === 'all' && (
                                            <Link href="/dashboard/lecturer/exams/create">
                                                <Button
                                                    className={`mt-3 ${theme === 'dark'
                                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                        : 'bg-teal-600 hover:bg-teal-700 text-white'
                                                        }`}
                                                    size="sm"
                                                >
                                                    <PlusCircle size={14} className="mr-2" /> Create your first exam
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Help section */}
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                }`}>
                <div className="flex items-center">
                    <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
                        } mr-3`}>
                        <BookOpen size={16} />
                    </div>
                    <div>
                        <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            Create effective exams
                        </h3>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            Learn how to build well-structured exams in our{' '}
                            <Link
                                href="/support/exam-guide"
                                className={theme === 'dark' ? 'text-blue-400' : 'text-teal-600'}
                            >
                                Lecturer Guide
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ExamsPage;
