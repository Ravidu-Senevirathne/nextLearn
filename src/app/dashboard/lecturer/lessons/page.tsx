"use client";

import { useState, useEffect } from 'react';
import {
    BookOpen, Search, Plus, Edit, Trash2, Filter,
    ArrowUpDown, FileText, Video, ExternalLink,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/Components/ui/button';

// Dummy data for lessons - replace with actual API calls
const dummyLessons = [
    {
        id: 1,
        title: 'Introduction to React Hooks',
        courseTitle: 'Advanced React',
        type: 'video',
        duration: '45 min',
        status: 'published',
        dateCreated: '2023-09-15'
    },
    {
        id: 2,
        title: 'State Management with Redux',
        courseTitle: 'Advanced React',
        type: 'document',
        duration: '30 min',
        status: 'published',
        dateCreated: '2023-09-17'
    },
    {
        id: 3,
        title: 'Understanding TypeScript Interfaces',
        courseTitle: 'TypeScript Fundamentals',
        type: 'video',
        duration: '55 min',
        status: 'draft',
        dateCreated: '2023-09-20'
    },
    {
        id: 4,
        title: 'Building REST APIs',
        courseTitle: 'Backend Development',
        type: 'document',
        duration: '60 min',
        status: 'published',
        dateCreated: '2023-09-22'
    },
    {
        id: 5,
        title: 'Database Optimization',
        courseTitle: 'Backend Development',
        type: 'video',
        duration: '50 min',
        status: 'draft',
        dateCreated: '2023-09-25'
    }
];

export default function LessonsPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [lessons, setLessons] = useState(dummyLessons);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');

    // Filter lessons based on search term and filters
    useEffect(() => {
        let filteredLessons = dummyLessons;

        // Apply search filter
        if (searchTerm) {
            filteredLessons = filteredLessons.filter(lesson =>
                lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lesson.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        if (filterStatus !== 'all') {
            filteredLessons = filteredLessons.filter(lesson =>
                lesson.status === filterStatus
            );
        }

        // Apply type filter
        if (filterType !== 'all') {
            filteredLessons = filteredLessons.filter(lesson =>
                lesson.type === filterType
            );
        }

        setLessons(filteredLessons);
    }, [searchTerm, filterStatus, filterType]);

    const getLessonTypeIcon = (type) => {
        switch (type) {
            case 'video':
                return <Video size={18} className={theme === 'dark' ? 'text-blue-400' : 'text-teal-600'} />;
            case 'document':
                return <FileText size={18} className={theme === 'dark' ? 'text-purple-400' : 'text-cyan-600'} />;
            default:
                return <FileText size={18} />;
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'published') {
            return (
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
                    }`}>
                    Published
                </span>
            );
        } else {
            return (
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-amber-900 text-amber-100' : 'bg-amber-100 text-amber-800'
                    }`}>
                    Draft
                </span>
            );
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        Manage Lessons
                    </h1>
                    <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Create and manage your course lessons
                    </p>
                </div>
                <Link href="/dashboard/lecturer/lessons/create">
                    <Button className={`${theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-teal-600 hover:bg-teal-700 text-white'}`}>
                        <Plus size={16} className="mr-2" /> Create New Lesson
                    </Button>
                </Link>
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
                            placeholder="Search lessons..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                                    }`}
                            >
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        <div className="w-40">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                                    }`}
                            >
                                <option value="all">All Types</option>
                                <option value="video">Video</option>
                                <option value="document">Document</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lessons Table */}
            <div className="overflow-x-auto">
                <div className={`rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    {lessons.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                                <tr>
                                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        <div className="flex items-center">
                                            Lesson <ArrowUpDown size={14} className="ml-1" />
                                        </div>
                                    </th>
                                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Course
                                    </th>
                                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Type
                                    </th>
                                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Duration
                                    </th>
                                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Status
                                    </th>
                                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Date Created
                                    </th>
                                    <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                {lessons.map((lesson) => (
                                    <tr key={lesson.id} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                            <div className="flex items-center">
                                                <BookOpen size={18} className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                                <span className="font-medium">{lesson.title}</span>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            {lesson.courseTitle}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getLessonTypeIcon(lesson.type)}
                                                <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                                    {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            {lesson.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(lesson.status)}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            {lesson.dateCreated}
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
                                No lessons found
                            </h3>
                            <p className="mb-4">
                                {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                                    ? 'Try adjusting your search or filters to find what you\'re looking for.'
                                    : 'Get started by creating your first lesson.'}
                            </p>
                            {!searchTerm && filterStatus === 'all' && filterType === 'all' && (
                                <Link href="/dashboard/lecturer/lessons/create">
                                    <Button className={`${theme === 'dark'
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-teal-600 hover:bg-teal-700'} text-white`}>
                                        <Plus size={16} className="mr-2" /> Create New Lesson
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination - Simple version */}
            {lessons.length > 0 && (
                <div className="mt-6 flex justify-between items-center">
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        Showing <span className="font-semibold">{lessons.length}</span> of <span className="font-semibold">{lessons.length}</span> lessons
                    </div>
                    <div className="flex space-x-2">
                        <button
                            disabled
                            className={`px-3 py-1 rounded-md ${theme === 'dark'
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Previous
                        </button>
                        <button
                            disabled
                            className={`px-3 py-1 rounded-md ${theme === 'dark'
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
