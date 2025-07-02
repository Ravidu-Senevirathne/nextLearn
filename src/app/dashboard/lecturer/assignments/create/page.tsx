"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Plus, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { assignmentService, CreateAssignmentData, Course } from '@/services/assignmentService';

interface AssignmentFormData {
    title: string;
    description: string;
    courseId: string;
    dueDate: string;
    dueTime: string;
    totalMarks: number;
    instructions?: string;
    status: 'draft' | 'published';
    attachments: File[];
}

export default function CreateAssignmentPage() {
    const { theme } = useTheme();
    const router = useRouter();

    const [formData, setFormData] = useState<AssignmentFormData>({
        title: '',
        description: '',
        courseId: '',
        dueDate: '',
        dueTime: '',
        totalMarks: 100,
        instructions: '',
        status: 'draft',
        attachments: [],
    });

    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [coursesError, setCoursesError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoadingCourses(true);
                setCoursesError(null);
                setBackendStatus('checking');

                // Check backend connectivity
                const isConnected = await assignmentService.checkBackendHealth();
                setBackendStatus(isConnected ? 'connected' : 'disconnected');

                if (!isConnected) {
                    setCoursesError('Backend server not available. Using offline course list.');
                    // Load fallback courses if available
                    
                    return;
                }

                const fetchedCourses = await assignmentService.getAllCourses();
                if (fetchedCourses.length === 0) {
                    setCoursesError('No courses available. Please contact your administrator.');
                } else {
                    setCourses(fetchedCourses);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                setBackendStatus('disconnected');
                setCoursesError('Failed to load courses. Please refresh the page.');
                
               
            } finally {
                setLoadingCourses(false);
            }
        };

        fetchCourses();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'totalMarks' ? parseInt(value) || 0 : value
        }));

        // Clear error when field is updated
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const maxSize = 10 * 1024 * 1024; // 10MB

            // Validate file size and type
            const validFiles = newFiles.filter(file => {
                if (file.size > maxSize) {
                    setSubmitError(`File "${file.name}" exceeds the 10MB size limit`);
                    return false;
                }
                return true;
            });

            setFormData(prev => ({
                ...prev,
                attachments: [...prev.attachments, ...validFiles]
            }));
        }
    };

    const removeAttachment = (index: number) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
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
            }, 1500);
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

            {/* Backend Status Indicator */}
            {backendStatus !== 'checking' && (
                <div className={`mb-4 p-2 text-sm rounded-md ${backendStatus === 'connected' 
                    ? (theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-800') 
                    : (theme === 'dark' ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-50 text-amber-800')}`}>
                    {backendStatus === 'connected' 
                        ? 'Connected to backend server' 
                        : 'Working in offline mode - some features may be limited'}
                </div>
            )}

            {/* Error/Success Messages */}
            {submitError && (
                <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 border border-red-800 text-red-200' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                    <p className="font-medium">Error</p>
                    <p className="mt-1 text-sm">{submitError}</p>
                </div>
            )}

            {submitSuccess && (
                <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/30 border border-green-800 text-green-200' : 'bg-green-50 border border-green-200 text-green-800'}`}>
                    <p className="font-medium">Success!</p>
                    <p className="mt-1 text-sm">Assignment created successfully. Redirecting...</p>
                </div>
            )}

            <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Title Field */}
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
                                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500'
                                    }`}
                                placeholder="Enter assignment title"
                                disabled={isSubmitting}
                            />
                            {formErrors.title && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                            )}
                        </div>

                        {/* Description Field */}
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
                                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500'
                                    }`}
                                placeholder="Enter assignment description, instructions, and requirements"
                                disabled={isSubmitting}
                            />
                            {formErrors.description && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                            )}
                        </div>

                        {/* Instructions Field */}
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
                                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                                    : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500'
                                    }`}
                                placeholder="Additional instructions for students"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Course Selection */}
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
                                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500'
                                    }`}
                                disabled={isSubmitting || loadingCourses}
                            >
                                <option value="">
                                    {loadingCourses ? 'Loading courses...' :
                                        courses.length === 0 ? 'No courses available' : 'Select a course'}
                                </option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>
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

                        {/* Date/Time/Marks Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Due Date */}
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
                                        min={new Date().toISOString().split('T')[0]} // Prevent past dates
                                        className={`w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${formErrors.dueDate
                                            ? 'border-red-500 focus:ring-red-500'
                                            : theme === 'dark'
                                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                                                : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500'
                                            }`}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {formErrors.dueDate && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.dueDate}</p>
                                )}
                            </div>

                            {/* Due Time */}
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
                                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                                                : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500'
                                            }`}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {formErrors.dueTime && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.dueTime}</p>
                                )}
                            </div>

                            {/* Total Marks */}
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
                                    step="1"
                                    className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${formErrors.totalMarks
                                        ? 'border-red-500 focus:ring-red-500'
                                        : theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                                            : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                {formErrors.totalMarks && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.totalMarks}</p>
                                )}
                            </div>
                        </div>

                        {/* Status Field */}
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
                                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                                    : 'bg-white border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500'
                                    }`}
                                disabled={isSubmitting}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        {/* Attachments Field */}
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
                                            PDF, DOCX, or image files (max 10MB each)
                                        </p>
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        multiple
                                        onChange={handleFileChange}
                                        disabled={isSubmitting}
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                                    />
                                </label>
                            </div>

                            {formData.attachments.length > 0 && (
                                <div className="mt-4">
                                    <h4 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Attached Files ({formData.attachments.length})
                                    </h4>
                                    <ul className="space-y-2">
                                        {formData.attachments.map((file, index) => (
                                            <li key={index} className={`flex items-center justify-between p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                                                        {file.name}
                                                    </p>
                                                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {formatFileSize(file.size)} • {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAttachment(index)}
                                                    className={`ml-3 ${theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
                                                    disabled={isSubmitting}
                                                    aria-label={`Remove ${file.name}`}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className={`border-t pt-6 flex justify-end space-x-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <Link
                                href="/dashboard/lecturer/assignments"
                                className={`px-4 py-2 border rounded-md transition-colors ${theme === 'dark'
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-4 py-2 rounded-md text-white transition-colors flex items-center justify-center min-w-32 ${
                                    isSubmitting 
                                        ? (theme === 'dark' ? 'bg-blue-800' : 'bg-teal-700') 
                                        : (theme === 'dark' 
                                            ? 'bg-blue-600 hover:bg-blue-700' 
                                            : 'bg-teal-600 hover:bg-teal-700')
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </>
                                ) : 'Create Assignment'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}