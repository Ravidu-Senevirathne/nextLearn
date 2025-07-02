"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Plus, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { assignmentService, CreateAssignmentData, Course } from '@/services/assignmentService';

export default function CreateAssignmentPage() {
    const { theme } = useTheme();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        courseId: '',
        dueDate: '',
        dueTime: '',
        totalMarks: 100,
        instructions: '',
        status: 'draft' as 'draft' | 'published' | 'expired',
        attachments: [] as File[],
    });

    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [coursesError, setCoursesError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [backendConnected, setBackendConnected] = useState<boolean | null>(null);

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoadingCourses(true);
                setCoursesError(null);

                // Check backend connectivity first
                const isConnected = await assignmentService.checkBackendHealth();
                setBackendConnected(isConnected);

                if (!isConnected) {
                    setCoursesError('Backend server not available. Using offline course list.');
                }

                const fetchedCourses = await assignmentService.getAllCourses();

                if (fetchedCourses.length === 0) {
                    setCoursesError('No courses available. Please contact your administrator.');
                } else {
                    setCourses(fetchedCourses);
                    console.log(`Loaded ${fetchedCourses.length} courses:`, fetchedCourses);
                }

            } catch (error) {
                console.error('Error fetching courses:', error);
                setBackendConnected(false);
                setCoursesError('Failed to load courses. Please refresh the page.');

                // Use fallback courses
                
            } finally {
                setLoadingCourses(false);
            }
        };

        fetchCourses();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'totalMarks' ? parseInt(value) || 0 : value
        });

        // Clear error when field is updated
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);

            // Validate file size (max 10MB per file)
            const maxSize = 10 * 1024 * 1024; // 10MB
            const invalidFiles = newFiles.filter(file => file.size > maxSize);

            if (invalidFiles.length > 0) {
                setSubmitError(`The following files exceed the 10MB size limit: ${invalidFiles.map(f => f.name).join(', ')}`);
                return;
            }

            setFormData({
                ...formData,
                attachments: [...formData.attachments, ...newFiles]
            });
        }
    };

    const removeAttachment = (index: number) => {
        const updatedAttachments = [...formData.attachments];
        updatedAttachments.splice(index, 1);
        setFormData({
            ...formData,
            attachments: updatedAttachments
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.title.trim()) errors.title = "Title is required";
        if (!formData.description.trim()) errors.description = "Description is required";
        if (!formData.courseId) errors.courseId = "Please select a course";
        if (!formData.dueDate) errors.dueDate = "Due date is required";
        if (!formData.dueTime) errors.dueTime = "Due time is required";
        if (formData.totalMarks <= 0) errors.totalMarks = "Total marks must be greater than 0";

        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Combine date and time for the backend
            const dueDateTime = `${formData.dueDate}T${formData.dueTime}:00.000Z`;

            const assignmentData: CreateAssignmentData = {
                title: formData.title,
                description: formData.description,
                courseId: formData.courseId,
                dueDate: dueDateTime,
                totalMarks: formData.totalMarks,
                instructions: formData.instructions || formData.description,
                status: formData.status,
            };

            await assignmentService.createAssignment(assignmentData, formData.attachments);

            // Show success message
            setSubmitSuccess(true);

            // Redirect to assignments page after a short delay
            setTimeout(() => {
                router.push('/dashboard/lecturer/assignments');
            }, 2000);
        } catch (error) {
            console.error('Error creating assignment:', error);
            setSubmitError(error instanceof Error ? error.message : 'Failed to create assignment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
            <div className="mb-6">
                <Link
                    href="/dashboard/lecturer/assignments"
                    className={`flex items-center ${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-teal-700'}`}
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Assignments
                </Link>
            </div>

            <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Create New Assignment
            </h1>


            {/* Course Loading/Error Status */}
            {coursesError && (
                <div className={`mb-6 p-3 rounded-lg flex items-center ${theme === 'dark' ? 'bg-amber-900/30 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
                    <div className="w-3 h-3 rounded-full mr-3 bg-amber-500"></div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-800'}`}>
                        {coursesError}
                    </span>
                </div>
            )}

            {submitError && (
                <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'}`}>
                    <p className="font-medium">Error</p>
                    <p className="mt-1">{submitError}</p>
                </div>
            )}

            {submitSuccess && (
                <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'}`}>
                    <p className="font-medium">Success!</p>
                    <p className="mt-1">Assignment created successfully. Redirecting to assignments page...</p>
                </div>
            )}

            <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="title" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                Assignment Title*
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${formErrors.title
                                    ? 'border-red-500 focus:ring-red-500'
                                    : theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500'
                                    }`}
                                placeholder="Enter assignment title"
                                disabled={isSubmitting}
                            />
                            {formErrors.title && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="description" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                Description*
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${formErrors.description
                                    ? 'border-red-500 focus:ring-red-500'
                                    : theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500'
                                    }`}
                                placeholder="Enter assignment description, instructions, and requirements"
                                disabled={isSubmitting}
                            />
                            {formErrors.description && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="instructions" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                Additional Instructions
                            </label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                                rows={3}
                                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                                    : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500'
                                    }`}
                                placeholder="Additional instructions for students"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div>
                            <label htmlFor="courseId" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                Course* {loadingCourses && (
                                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        (Loading...)
                                    </span>
                                )}
                            </label>
                            <select
                                id="courseId"
                                name="courseId"
                                value={formData.courseId}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${formErrors.courseId
                                    ? 'border-red-500 focus:ring-red-500'
                                    : theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                                        : 'bg-gray-500 border-gray-300 text-gray-900 focus:ring-teal-500'
                                    } [&>option]:text-black [&>option]:bg-white ${theme === 'dark' && '[&>option]:bg-gray-700 [&>option]:text-black'}`}
                                disabled={isSubmitting || loadingCourses}
                            >
                                <option value="">
                                    {loadingCourses ? 'Loading courses...' :
                                        courses.length === 0 ? 'No courses available' : 'Select a course'}
                                </option>
                                {courses.map(course => (
                                    <option className='bg-gray-500 text-black' key={course.id} value={course.id}>
                                        {course.title}
                                        {course.instructor && ` - ${course.instructor}`}
                                    </option>
                                ))}
                            </select>
                            {formErrors.courseId && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.courseId}</p>
                            )}
                            {courses.length > 0 && !loadingCourses && (
                                <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {courses.length} course{courses.length !== 1 ? 's' : ''} available
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="dueDate" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Due Date*
                                </label>
                                <div className="relative">
                                    <Calendar size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${formErrors.dueDate
                                            ? 'border-red-500 focus:ring-red-500'
                                            : theme === 'dark'
                                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                                                : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500'
                                            }`}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {formErrors.dueDate && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.dueDate}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="dueTime" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Due Time*
                                </label>
                                <div className="relative">
                                    <Clock size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                                    <input
                                        type="time"
                                        id="dueTime"
                                        name="dueTime"
                                        value={formData.dueTime}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${formErrors.dueTime
                                            ? 'border-red-500 focus:ring-red-500'
                                            : theme === 'dark'
                                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                                                : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500'
                                            }`}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {formErrors.dueTime && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.dueTime}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="totalMarks" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Total Marks*
                                </label>
                                <input
                                    type="number"
                                    id="totalMarks"
                                    name="totalMarks"
                                    value={formData.totalMarks}
                                    onChange={handleChange}
                                    min="1"
                                    className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${formErrors.totalMarks
                                        ? 'border-red-500 focus:ring-red-500'
                                        : theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                                            : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                {formErrors.totalMarks && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.totalMarks}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="status" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                                    : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500'
                                    }`}
                                disabled={isSubmitting}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                Attachments
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="file-upload"
                                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${theme === 'dark'
                                        ? 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload size={24} className={`mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                                        <p className={`mb-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            PDF, DOCX, or image files (max 10MB)
                                        </p>
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        multiple
                                        onChange={handleFileChange}
                                        disabled={isSubmitting}
                                        accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.gif"
                                    />
                                </label>
                            </div>

                            {formData.attachments.length > 0 && (
                                <div className="mt-4">
                                    <h4 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Attached Files:
                                    </h4>
                                    <ul className="space-y-2">
                                        {formData.attachments.map((file, index) => (
                                            <li key={index} className={`flex items-center justify-between p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                <div className="flex-1">
                                                    <span className={`text-sm font-medium truncate max-w-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                                                        {file.name}
                                                    </span>
                                                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAttachment(index)}
                                                    className="text-red-500 hover:text-red-700 disabled:opacity-50 ml-3"
                                                    disabled={isSubmitting}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className={`border-t pt-6 flex justify-end space-x-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <Link
                                href="/dashboard/lecturer/assignments"
                                className={`px-4 py-2 border rounded-md transition-colors ${theme === 'dark'
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-4 py-2 rounded-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark'
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-teal-600 hover:bg-teal-700'
                                    }`}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Assignment'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
