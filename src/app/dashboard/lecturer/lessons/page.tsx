"use client";

import { useState, useEffect } from 'react';
import {
    BookOpen, Search, Plus, Edit, Trash2, Filter,
    ArrowUpDown, FileText, Video, ExternalLink,
    AlertCircle, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/Components/ui/button';
import { lessonService, Lesson } from '@/services/lessonService';

export default function LessonsPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [allLessons, setAllLessons] = useState<Lesson[]>([]);
=======
    const [allLessons, setAllLessons] = useState<Lesson[]>([]);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch lessons from API
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                setLoading(true);
                const data = await lessonService.getAllLessons();
                setAllLessons(data);
                setLessons(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching lessons:', error);
                setError('Failed to load lessons. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    // Delete lesson handler
    const handleDeleteLesson = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this lesson?')) {
            return;
        }

        try {
            await lessonService.deleteLesson(id);
            // Remove from local state
            const updatedLessons = allLessons.filter(lesson => lesson.id !== id);
            setAllLessons(updatedLessons);
            setLessons(updatedLessons);
        } catch (error) {
            console.error('Error deleting lesson:', error);
            setError('Failed to delete lesson. Please try again.');
        }
    };

    // Fetch lessons from API
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                setLoading(true);
                const data = await lessonService.getAll();
                setAllLessons(data);
                setError(null);
            } catch (err) {
                setError('Failed to load lessons');
                console.error('Error fetching lessons:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    // Filter lessons based on search term and filters
    useEffect(() => {
        let filteredLessons = allLessons;

        // Apply search filter
        if (searchTerm) {
            filteredLessons = filteredLessons.filter(lesson =>
                lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
<<<<<<< HEAD
                (lesson.course?.title || '').toLowerCase().includes(searchTerm.toLowerCase())
=======
                (lesson.courseId && lesson.courseId.toLowerCase().includes(searchTerm.toLowerCase()))
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
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
<<<<<<< HEAD
                lesson.contentType === filterType
=======
                (lesson.contentType || lesson.type) === filterType
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
            );
        }

        setLessons(filteredLessons);
<<<<<<< HEAD
    }, [searchTerm, filterStatus, filterType, allLessons]);

    const getLessonTypeIcon = (type: string) => {
=======
    }, [allLessons, searchTerm, filterStatus, filterType]);

    // Delete lesson handler
    const handleDeleteLesson = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lesson?')) {
            return;
        }

        try {
            await lessonService.deleteLesson(id);
            // Remove the deleted lesson from both states
            setAllLessons(prev => prev.filter(lesson => lesson.id !== id));
            setLessons(prev => prev.filter(lesson => lesson.id !== id));
        } catch (err) {
            console.error('Error deleting lesson:', err);
            alert('Failed to delete lesson');
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return dateString;
        }
    };

    // Format duration
    const formatDuration = (duration: string) => {
        // If duration is just a number (minutes), format it
        if (!isNaN(Number(duration))) {
            return `${duration} min`;
        }
        return duration;
    };

    const getLessonTypeIcon = (lesson: Lesson) => {
        const type = lesson.contentType || lesson.type || 'document';
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
        switch (type) {
            case 'video':
                return <Video size={18} className={theme === 'dark' ? 'text-blue-400' : 'text-teal-600'} />;
            case 'document':
                return <FileText size={18} className={theme === 'dark' ? 'text-purple-400' : 'text-cyan-600'} />;
            default:
                return <FileText size={18} />;
        }
    };

    const getStatusBadge = (status: string) => {
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

    // Show loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="animate-spin h-8 w-8 text-primary" />
                    <span className="ml-2">Loading lessons...</span>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="p-6 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
                    <p className="font-medium">Error</p>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

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
                    {loading ? (
                        <div className={`p-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-3"></div>
                            <p>Loading lessons...</p>
                        </div>
                    ) : lessons.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                                <tr>
                                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        <div className="flex items-center">
                                            Lesson <ArrowUpDown size={14} className="ml-1" />
                                        </div>
                                    </th>
                                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Course ID
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
<<<<<<< HEAD
                                            {lesson.course?.title || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getLessonTypeIcon(lesson.contentType)}
                                                <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                                    {lesson.contentType.charAt(0).toUpperCase() + lesson.contentType.slice(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            {lesson.duration || 'N/A'}
=======
                                            {lesson.courseId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getLessonTypeIcon(lesson)}
                                                {(() => {
                                                    const typeLabel = String(lesson.contentType || lesson.type || 'document');
                                                    return (
                                                        <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                                            {typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1)}
                                                        </span>
                                                    );
                                                })()}
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                            {formatDuration(lesson.duration)}
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(lesson.status)}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
<<<<<<< HEAD
                                            {new Date(lesson.createdAt).toLocaleDateString()}
=======
                                            {formatDate(lesson.createdAt)}
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Link href={`/dashboard/lecturer/lessons/${lesson.id}`}>
                                                    <button
                                                        className={`p-1 rounded-full ${theme === 'dark'
                                                            ? 'hover:bg-gray-600 text-gray-300'
                                                            : 'hover:bg-gray-100 text-gray-600'
                                                            }`}
                                                        title="Preview"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </button>
                                                </Link>
                                                <Link href={`/dashboard/lecturer/lessons/${lesson.id}/edit`}>
                                                    <button
                                                        className={`p-1 rounded-full ${theme === 'dark'
                                                            ? 'hover:bg-gray-600 text-blue-400'
                                                            : 'hover:bg-gray-100 text-teal-600'
                                                            }`}
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                </Link>
                                                <button
<<<<<<< HEAD
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
=======
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
                                                    onClick={() => handleDeleteLesson(lesson.id)}
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
