
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { 
    Video, FileText, Eye, Edit, Trash2, Loader2
} from 'lucide-react';
import { lessonService } from '@/services/lessonService';

interface Lesson {
    id: string;
    title: string;
    courseTitle: string;
    type: 'video' | 'document';
    duration: string;
    status: 'draft' | 'published';
    dateCreated: string;
}

export default function LessonsList() {
    const { theme } = useTheme();
    const router = useRouter();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                setLoading(true);
                const data = await lessonService.getLessons();
                setLessons(data);
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

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lesson?')) {
            return;
        }

        try {
            await fetch(`http://localhost:8000/lessons/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            
            // Remove the deleted lesson from state
            setLessons(lessons.filter(lesson => lesson.id !== id));
        } catch (err) {
            console.error('Error deleting lesson:', err);
            alert('Failed to delete lesson');
        }
    };

    const getLessonTypeIcon = (type: string) => {
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
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'}`}>
                    Published
                </span>
            );
        } else {
            return (
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-amber-900 text-amber-100' : 'bg-amber-100 text-amber-800'}`}>
                    Draft
                </span>
            );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
                <span className="ml-2">Loading lessons...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
                <p className="font-medium">Error</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <div className={`rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                {lessons.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                            <tr>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                                    Lesson
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
                                            {getLessonTypeIcon(lesson.type)}
                                            <span className="font-medium ml-2">{lesson.title}</span>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {lesson.courseTitle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className={`ml-2 capitalize ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                                {lesson.type}
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
                                                className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                                                title="Preview"
                                                onClick={() => router.push(`/dashboard/lecturer/lessons/${lesson.id}`)}
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <Link href={`/dashboard/lecturer/lessons/edit/${lesson.id}`}>
                                                <button
                                                    className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-600 text-blue-400' : 'hover:bg-gray-100 text-teal-600'}`}
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                            </Link>
                                            <button
                                                className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-600 text-red-400' : 'hover:bg-gray-100 text-red-500'}`}
                                                title="Delete"
                                                onClick={() => handleDelete(lesson.id)}
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
                        <p className="text-lg font-medium">No lessons found</p>
                        <p className="mt-2">Get started by creating your first lesson.</p>
                    </div>
                )}
            </div>
        </div>
    );
}