"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Plus, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { assignmentService } from '@/services/assignmentService';
import { CreateAssignmentDto } from '@/types/assignment';

// Mock data for courses
const courses = [
    { id: 1, name: 'Advanced AI Concepts' },
    { id: 2, name: 'Database Management' },
    { id: 3, name: 'Human-Computer Interaction' },
    { id: 4, name: 'Web Development' },
    { id: 5, name: 'Mobile App Development' },
];

export default function CreateAssignmentPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Omit<CreateAssignmentDto, 'attachments'> & { dueTime: string }>({
        title: '',
        description: '',
        courseId: '',
        dueDate: '',
        dueTime: '',
        totalPoints: 100,
    });

    const [attachments, setAttachments] = useState<File[]>([]);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
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
            setAttachments([...attachments, ...newFiles]);
        }
    };

    const removeAttachment = (index: number) => {
        const updatedAttachments = [...attachments];
        updatedAttachments.splice(index, 1);
        setAttachments(updatedAttachments);
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.title.trim()) errors.title = "Title is required";
        if (!formData.description.trim()) errors.description = "Description is required";
        if (!formData.courseId) errors.courseId = "Please select a course";
        if (!formData.dueDate) errors.dueDate = "Due date is required";
        if (!formData.dueTime) errors.dueTime = "Due time is required";

        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Combine date and time for the dueDate field
            const combinedDueDate = `${formData.dueDate}T${formData.dueTime}:00`;

            const assignmentDto: CreateAssignmentDto = {
                ...formData,
                dueDate: combinedDueDate,
            };

            let result;
            if (attachments.length > 0) {
                result = await assignmentService.createWithFiles(assignmentDto, attachments);
            } else {
                result = await assignmentService.create(assignmentDto);
            }

            console.log("Assignment created:", result);
            router.push('/dashboard/lecturer/assignments');
        } catch (error) {
            console.error("Error creating assignment:", error);
            alert("Failed to create assignment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-900">
            <div className="mb-6">
                <Link
                    href="/dashboard/lecturer/assignments"
                    className="text-gray-600 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-500 flex items-center"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Assignments
                </Link>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 dark:text-amber-50 mb-6">Create New Assignment</h1>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Assignment Title*
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${formErrors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                placeholder="Enter assignment title"
                            />
                            {formErrors.title && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description*
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                className={`w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${formErrors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                placeholder="Enter assignment description, instructions, and requirements"
                            ></textarea>
                            {formErrors.description && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Course*
                            </label>
                            <select
                                id="courseId"
                                name="courseId"
                                value={formData.courseId}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${formErrors.courseId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                            >
                                <option value="">Select a course</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </select>
                            {formErrors.courseId && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.courseId}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Due Date*
                                </label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${formErrors.dueDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                    />
                                </div>
                                {formErrors.dueDate && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.dueDate}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Due Time*
                                </label>
                                <div className="relative">
                                    <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="time"
                                        id="dueTime"
                                        name="dueTime"
                                        value={formData.dueTime}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${formErrors.dueTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                    />
                                </div>
                                {formErrors.dueTime && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.dueTime}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="totalPoints" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Total Points
                            </label>
                            <input
                                type="number"
                                id="totalPoints"
                                name="totalPoints"
                                value={formData.totalPoints}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Attachments
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload size={24} className="text-gray-400 mb-2" />
                                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, or image files (max 10MB)</p>
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>

                            {attachments.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attached Files:</h4>
                                    <ul className="space-y-2">
                                        {attachments.map((file, index) => (
                                            <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                                                <span className="text-sm text-gray-800 dark:text-gray-200 truncate max-w-xs">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAttachment(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-end space-x-4">
                            <Link
                                href="/dashboard/lecturer/assignments"
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-teal-600 hover:to-cyan-700'}`}
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
