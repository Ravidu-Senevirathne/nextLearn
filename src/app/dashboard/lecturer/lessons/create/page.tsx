"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    BookOpen, Save, ArrowLeft, FileText, Video, Upload, Eye,
    X, HelpCircle, AlertTriangle, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/Components/ui/button';
import { lessonService, CreateLessonParams } from '@/services/lessonService';

// Define the structure for form errors
interface FormErrors {
    title?: string;
    courseId?: string;
    description?: string;
    videoUrl?: string;
    documentFile?: string;
    duration?: string;
    serverError?: string;
}

// Define course interface
interface Course {
    id: string;
    title: string;
}

interface Course {
    id: string;
    title: string;
}

export default function CreateLessonPage() {
    const { theme } = useTheme();
    const router = useRouter();
    const [lessonType, setLessonType] = useState('video');
    const [lessonTitle, setLessonTitle] = useState('');
    const [courseId, setCourseId] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [status, setStatus] = useState('draft');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Replace with your actual course API endpoint
                const response = await fetch('http://localhost:8000/courses', {
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }

                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Basic validation
        const newErrors: FormErrors = {};
        if (!lessonTitle.trim()) newErrors.title = 'Lesson title is required';
        if (!courseId) newErrors.courseId = 'Please select a course';
        if (!description.trim()) newErrors.description = 'Description is required';

        if (lessonType === 'video' && !videoUrl.trim()) {
            newErrors.videoUrl = 'Video URL is required';
        }

        if (lessonType === 'document' && !documentFile) {
            newErrors.documentFile = 'Document file is required';
        }

        // Validate duration if provided
        if (duration && (isNaN(parseInt(duration, 10)) || parseInt(duration, 10) < 1)) {
            newErrors.duration = 'Duration must be a valid positive number';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Form is valid, proceed with submission
        setIsLoading(true);
        setErrors({});

        try {
            // Prepare data for API call
            const lessonData: CreateLessonParams = {
                title: lessonTitle,
                courseId,
                description,
                // Convert duration to integer if provided
                duration: duration ? parseInt(duration, 10) : undefined,
                // Explicitly set contentType to one of the allowed values
                contentType: lessonType as 'video' | 'document',
                status: status as 'draft' | 'published',
                videoUrl: lessonType === 'video' ? videoUrl : undefined,
                documentFile: lessonType === 'document' ? documentFile || undefined : undefined
            };

            console.log('Submitting lesson data:', lessonData);

            // Send to API
            await lessonService.createLesson(lessonData);

            // Show success message and redirect after a delay
            setSubmitted(true);

            // Redirect after showing success message for a moment
            setTimeout(() => {
                router.push('/dashboard/lecturer/lessons');
            }, 2000);

        } catch (error) {
            console.error('Error creating lesson:', error);
            setErrors({
                serverError: error instanceof Error ? error.message : 'An unexpected error occurred'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDocumentFile(e.target.files[0]);
        }
    };

    const removeFile = () => {
        setDocumentFile(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link
                    href="/dashboard/lecturer/lessons"
                    className={`flex items-center mb-4 font-medium ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-teal-600 hover:text-teal-700'
                        }`}
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to Lessons
                </Link>

                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Create New Lesson
                </h1>
                <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Add a new lesson to your course
                </p>
            </div>

            {errors.serverError && (
                <div className={`mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100`}>
                    <p className="font-medium">Error</p>
                    <p className="mt-1">{errors.serverError}</p>
                </div>
            )}

            {submitted && (
                <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
                    }`}>
                    <p className="font-medium">Lesson created successfully!</p>
                    <p className="mt-1">Your lesson has been saved and is now available in your course.</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                    <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                        Basic Information
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="lessonTitle"
                                className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Lesson Title*
                            </label>
                            <input
                                type="text"
                                id="lessonTitle"
                                value={lessonTitle}
                                onChange={(e) => setLessonTitle(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${errors.title ? 'border-red-500' :
                                    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                    } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                                    }`}
                                placeholder="Enter lesson title"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="courseId"
                                className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Course*
                            </label>
                            <select
                                id="courseId"
                                value={courseId}
                                onChange={(e) => setCourseId(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${errors.courseId ? 'border-red-500' :
                                    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                    } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                                    }`}
                            >
                                <option value="">Select a course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                            {errors.courseId && (
                                <p className="mt-1 text-sm text-red-500">{errors.courseId}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Description*
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className={`w-full px-3 py-2 rounded-md border ${errors.description ? 'border-red-500' :
                                    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                    } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                                    }`}
                                placeholder="Enter lesson description"
                            ></textarea>
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="duration"
                                className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Duration (minutes)
                            </label>
                            <input
                                type="number"
                                id="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                min="1"
                                className={`w-full px-3 py-2 rounded-md border ${errors.duration ? 'border-red-500' :
                                    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                    } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                                    }`}
                                placeholder="e.g., 45"
                            />
                            {errors.duration && (
                                <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
                            )}
                            <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                Optional: Estimated time to complete this lesson (in minutes)
                            </p>
                        </div>
                    </div>
                </div>

                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                    <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                        Lesson Content
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                Content Type*
                            </label>
                            <div className="flex space-x-4">
                                <div
                                    className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${lessonType === 'video'
                                        ? theme === 'dark'
                                            ? 'border-blue-500 bg-gray-700'
                                            : 'border-teal-500 bg-teal-50'
                                        : theme === 'dark'
                                            ? 'border-gray-600 hover:border-gray-500'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setLessonType('video')}
                                >
                                    <div className="flex items-center mb-2">
                                        <Video
                                            size={20}
                                            className={lessonType === 'video'
                                                ? theme === 'dark' ? 'text-blue-400' : 'text-teal-600'
                                                : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                            }
                                        />
                                        <span className={`ml-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                                            }`}>
                                            Video
                                        </span>
                                    </div>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Upload or link to a video
                                    </p>
                                </div>

                                <div
                                    className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${lessonType === 'document'
                                        ? theme === 'dark'
                                            ? 'border-blue-500 bg-gray-700'
                                            : 'border-teal-500 bg-teal-50'
                                        : theme === 'dark'
                                            ? 'border-gray-600 hover:border-gray-500'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setLessonType('document')}
                                >
                                    <div className="flex items-center mb-2">
                                        <FileText
                                            size={20}
                                            className={lessonType === 'document'
                                                ? theme === 'dark' ? 'text-blue-400' : 'text-teal-600'
                                                : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                            }
                                        />
                                        <span className={`ml-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                                            }`}>
                                            Document
                                        </span>
                                    </div>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Upload a PDF or other document
                                    </p>
                                </div>
                            </div>
                        </div>

                        {lessonType === 'video' && (
                            <div>
                                <label
                                    htmlFor="videoUrl"
                                    className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Video URL*
                                </label>
                                <input
                                    type="text"
                                    id="videoUrl"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    className={`w-full px-3 py-2 rounded-md border ${errors.videoUrl ? 'border-red-500' :
                                        theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                                        }`}
                                    placeholder="e.g., https://youtube.com/watch?v=..."
                                />
                                {errors.videoUrl ? (
                                    <p className="mt-1 text-sm text-red-500">{errors.videoUrl}</p>
                                ) : (
                                    <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Enter a YouTube, Vimeo, or direct video link
                                    </p>
                                )}
                            </div>
                        )}

                        {lessonType === 'document' && (
                            <div>
                                <label
                                    htmlFor="documentFile"
                                    className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Document File*
                                </label>

                                {!documentFile ? (
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <Upload className={`mx-auto h-12 w-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                            <div className="flex text-sm">
                                                <label
                                                    htmlFor="file-upload"
                                                    className={`relative cursor-pointer rounded-md font-medium ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-teal-600 hover:text-teal-500'
                                                        }`}
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleFileChange}
                                                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                                                    />
                                                </label>
                                                <p className={`pl-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    or drag and drop
                                                </p>
                                            </div>
                                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                PDF, DOC, DOCX, PPT or PPTX up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`mt-1 flex items-center p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                        }`}>
                                        <FileText className={`h-8 w-8 ${theme === 'dark' ? 'text-blue-400' : 'text-teal-600'
                                            }`} />
                                        <div className="ml-3 flex-1">
                                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {documentFile.name}
                                            </p>
                                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {Math.round(documentFile.size / 1024)} KB
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className={`ml-3 p-1 rounded-full ${theme === 'dark'
                                                ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                                                : 'bg-gray-200 hover:bg-gray-300 text-gray-500'
                                                }`}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}

                                {errors.documentFile && (
                                    <p className="mt-1 text-sm text-red-500">{errors.documentFile}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                    <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                        Publication Settings
                    </h2>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Status
                        </label>
                        <div className="flex space-x-4">
                            <div
                                className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${status === 'draft'
                                    ? theme === 'dark'
                                        ? 'border-blue-500 bg-gray-700'
                                        : 'border-teal-500 bg-teal-50'
                                    : theme === 'dark'
                                        ? 'border-gray-600 hover:border-gray-500'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setStatus('draft')}
                            >
                                <div className="flex items-center">
                                    <AlertTriangle
                                        size={20}
                                        className={status === 'draft'
                                            ? theme === 'dark' ? 'text-amber-400' : 'text-amber-500'
                                            : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                        }
                                    />
                                    <span className={`ml-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                                        }`}>
                                        Save as Draft
                                    </span>
                                </div>
                                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Not visible to students
                                </p>
                            </div>

                            <div
                                className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${status === 'published'
                                    ? theme === 'dark'
                                        ? 'border-blue-500 bg-gray-700'
                                        : 'border-teal-500 bg-teal-50'
                                    : theme === 'dark'
                                        ? 'border-gray-600 hover:border-gray-500'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setStatus('published')}
                            >
                                <div className="flex items-center">
                                    <BookOpen
                                        size={20}
                                        className={status === 'published'
                                            ? theme === 'dark' ? 'text-green-400' : 'text-green-500'
                                            : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                        }
                                    />
                                    <span className={`ml-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                                        }`}>
                                        Publish
                                    </span>
                                </div>
                                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Immediately visible to enrolled students
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <Link href="/dashboard/lecturer/lessons">
                        <Button variant="outline" className={
                            theme === 'dark'
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }>
                            Cancel
                        </Button>
                    </Link>

                    <div className="flex space-x-3">
                        <Button
                            type="button"
                            variant="outline"
                            className={
                                theme === 'dark'
                                    ? 'border-blue-500 text-blue-400 hover:bg-gray-800'
                                    : 'border-teal-500 text-teal-600 hover:bg-teal-50'
                            }
                        >
                            <Eye size={16} className="mr-2" /> Preview
                        </Button>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={
                                theme === 'dark'
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
                                    : 'bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50'
                            }
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="mr-2 animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={16} className="mr-2" /> Save Lesson
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>

            <div className={`mt-8 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-start">
                    <HelpCircle className={`h-5 w-5 mt-0.5 ${theme === 'dark' ? 'text-blue-400' : 'text-teal-600'}`} />
                    <div className="ml-3">
                        <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Need Help?
                        </h3>
                        <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Learn how to create effective lessons in our <a href="#" className={theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-teal-600 hover:text-teal-700'}>Lecturer Guide</a> or <a href="#" className={theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-teal-600 hover:text-teal-700'}>contact support</a> if you're having issues.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}