"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import {
    Save,
    X,
    Upload,
    AlertCircle,
    Clock,
    DollarSign,
    Users,
    BookOpen,
    FileText
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CourseCreatePage = () => {
    const router = useRouter();
    const { theme } = useTheme();

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        level: 'Beginner',
        duration: '',
        price: '',
        image: undefined,
        previewImage: null,
        topics: [''],
        features: [''],
        requirements: ['']
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Helper functions for theme-specific styling
    const getInputStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500';
    };

    const getButtonPrimaryStyle = () => {
        return theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-teal-600 hover:bg-teal-700 text-white';
    };

    const getButtonSecondaryStyle = () => {
        return theme === 'dark'
            ? 'border border-gray-600 text-gray-300 hover:bg-gray-800'
            : 'border border-gray-300 text-gray-700 hover:bg-gray-100';
    };

    const getCardStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200 shadow-sm';
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);

            setFormData({
                ...formData,
                image: e.target.files?.[0] || undefined,
                previewImage: previewUrl
            });

            if (errors.image) {
                setErrors({ ...errors, image: '' });
            }
        }
    };

    // Handle array field changes (topics, features, requirements)
    const handleArrayFieldChange = (index: number, value: string, fieldName: 'topics' | 'features' | 'requirements') => {
        const updatedArray = [...formData[fieldName]];
        updatedArray[index] = value;

        setFormData({
            ...formData,
            [fieldName]: updatedArray
        });
    };

    // Add new item to array fields
    const addArrayItem = (fieldName: 'topics' | 'features' | 'requirements') => {
        setFormData({
            ...formData,
            [fieldName]: [...formData[fieldName], '']
        });
    };

    // Remove item from array fields
    const removeArrayItem = (index: number, fieldName: 'topics' | 'features' | 'requirements') => {
        if (formData[fieldName].length > 1) {
            const updatedArray = [...formData[fieldName]];
            updatedArray.splice(index, 1);

            setFormData({
                ...formData,
                [fieldName]: updatedArray
            });
        }
    };

    // Form validation
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Course title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Course description is required';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }

        if (!formData.duration.trim()) {
            newErrors.duration = 'Duration is required';
        }

        if (!formData.price.trim()) {
            newErrors.price = 'Price is required';
        } else if (isNaN(parseFloat(formData.price))) {
            newErrors.price = 'Price must be a valid number';
        }

        if (!formData.image) {
            newErrors.image = 'Course image is required';
        }

        // Check if all array fields have at least one non-empty value
        ['topics', 'features', 'requirements'].forEach((field) => {
            const arrayField = formData[field as keyof typeof formData] as string[];
            if (arrayField.every(item => !item.trim())) {
                newErrors[field] = `At least one ${field.slice(0, -1)} is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare form data for API
            const courseData = new FormData();

            // Add text fields
            courseData.append('title', formData.title);
            courseData.append('description', formData.description);
            courseData.append('category', formData.category);
            courseData.append('level', formData.level);
            courseData.append('duration', formData.duration);
            courseData.append('price', formData.price);

            // Add arrays as JSON strings
            courseData.append('topics', JSON.stringify(formData.topics.filter(t => t.trim())));
            courseData.append('features', JSON.stringify(formData.features.filter(f => f.trim())));
            courseData.append('requirements', JSON.stringify(formData.requirements.filter(r => r.trim())));

            // Add image if available
            if (formData.image) {
                courseData.append('image', formData.image);
            }

            // Send to API
            const response = await fetch('http://localhost:8000/courses', {
                method: 'POST',
                body: courseData,
                credentials: 'include',
            });

            console.log('Submitting course:', formData);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                
                // If there's a validation error, display it in a more user-friendly way
                if (response.status === 400) {
                    const errorMessages = errorData.message || [];
                    const formattedErrors = Array.isArray(errorMessages) 
                        ? errorMessages.join('\n') 
                        : errorMessages;
                    throw new Error(`Validation failed: ${formattedErrors}`);
                }
                
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }

            // Redirect to courses page after successful submission
            router.push('/dashboard/lecturer/courses');
        } catch (error: any) {
            console.error('Error creating course:', error);
            // Show error message to user - you could add a state for this
            alert(`Failed to create course: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Create New Course</h1>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Fill in the details below to create a new course
                    </p>
                </div>
                <Link
                    href="/dashboard/lecturer/courses"
                    className={`px-4 py-2 rounded-md ${getButtonSecondaryStyle()} flex items-center`}
                >
                    <X size={18} className="mr-2" />
                    Cancel
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information Card */}
                <div className={`border rounded-lg ${getCardStyle()}`}>
                    <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                        <h2 className="text-lg font-medium">Basic Information</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Course Title */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Course Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md ${getInputStyle()}`}
                                placeholder="e.g., Web Development Fundamentals"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500 flex items-center">
                                    <AlertCircle size={14} className="mr-1" /> {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Course Description */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Course Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className={`w-full px-4 py-2 border rounded-md ${getInputStyle()}`}
                                placeholder="Provide a detailed description of your course"
                            ></textarea>
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500 flex items-center">
                                    <AlertCircle size={14} className="mr-1" /> {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Course Category */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md ${getInputStyle()}`}
                            >
                                <option value="">Select a category</option>
                                <option value="Development">Development</option>
                                <option value="Business">Business</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="IT & Software">IT & Software</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Personal Development">Personal Development</option>
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-500 flex items-center">
                                    <AlertCircle size={14} className="mr-1" /> {errors.category}
                                </p>
                            )}
                        </div>

                        {/* Two columns for Level and Duration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Level <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-md ${getInputStyle()}`}
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="All Levels">All Levels</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Duration <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Clock size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                                    </div>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className={`w-full pl-10 px-4 py-2 border rounded-md ${getInputStyle()}`}
                                        placeholder="e.g., 8 weeks"
                                    />
                                </div>
                                {errors.duration && (
                                    <p className="mt-1 text-sm text-red-500 flex items-center">
                                        <AlertCircle size={14} className="mr-1" /> {errors.duration}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                                </div>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className={`w-full pl-10 px-4 py-2 border rounded-md ${getInputStyle()}`}
                                    placeholder="e.g., 99.99"
                                />
                            </div>
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500 flex items-center">
                                    <AlertCircle size={14} className="mr-1" /> {errors.price}
                                </p>
                            )}
                        </div>

                        {/* Course Image */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Course Image <span className="text-red-500">*</span>
                            </label>
                            <div className={`border-2 border-dashed rounded-lg p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                                {formData.previewImage ? (
                                    <div className="relative">
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={formData.previewImage as string}
                                                alt="Course preview"
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, image: undefined, previewImage: null })}
                                            className="absolute top-2 right-2 p-1 bg-gray-900 bg-opacity-75 rounded-full text-white"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <div className="flex flex-col items-center justify-center py-6">
                                                <Upload className={`mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={36} />
                                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    SVG, PNG, JPG or GIF (Max. 2MB)
                                                </p>
                                            </div>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500 flex items-center">
                                    <AlertCircle size={14} className="mr-1" /> {errors.image}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Course Content Card */}
                <div className={`border rounded-lg ${getCardStyle()}`}>
                    <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                        <h2 className="text-lg font-medium">Course Content</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        {/* What You'll Learn */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium">
                                    What You'll Learn <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('topics')}
                                    className={`text-sm px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' : 'bg-gray-100 text-teal-600 hover:bg-gray-200'}`}
                                >
                                    + Add Topic
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.topics.map((topic, index) => (
                                    <div key={`topic-${index}`} className="flex items-center gap-2">
                                        <div className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                            <BookOpen size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                                        </div>
                                        <input
                                            type="text"
                                            value={topic}
                                            onChange={(e) => handleArrayFieldChange(index, e.target.value, 'topics')}
                                            className={`flex-1 px-4 py-2 border rounded-md ${getInputStyle()}`}
                                            placeholder="e.g., Master HTML fundamentals"
                                        />
                                        {formData.topics.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem(index, 'topics')}
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                            >
                                                <X size={16} className="text-gray-500" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {errors.topics && (
                                    <p className="mt-1 text-sm text-red-500 flex items-center">
                                        <AlertCircle size={14} className="mr-1" /> {errors.topics}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Course Features */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium">
                                    Course Features <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('features')}
                                    className={`text-sm px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' : 'bg-gray-100 text-teal-600 hover:bg-gray-200'}`}
                                >
                                    + Add Feature
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.features.map((feature, index) => (
                                    <div key={`feature-${index}`} className="flex items-center gap-2">
                                        <div className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                            <FileText size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                                        </div>
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => handleArrayFieldChange(index, e.target.value, 'features')}
                                            className={`flex-1 px-4 py-2 border rounded-md ${getInputStyle()}`}
                                            placeholder="e.g., 40+ hours of video content"
                                        />
                                        {formData.features.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem(index, 'features')}
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                            >
                                                <X size={16} className="text-gray-500" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {errors.features && (
                                    <p className="mt-1 text-sm text-red-500 flex items-center">
                                        <AlertCircle size={14} className="mr-1" /> {errors.features}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Requirements */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium">
                                    Requirements <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('requirements')}
                                    className={`text-sm px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' : 'bg-gray-100 text-teal-600 hover:bg-gray-200'}`}
                                >
                                    + Add Requirement
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.requirements.map((requirement, index) => (
                                    <div key={`requirement-${index}`} className="flex items-center gap-2">
                                        <div className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                            <Users size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                                        </div>
                                        <input
                                            type="text"
                                            value={requirement}
                                            onChange={(e) => handleArrayFieldChange(index, e.target.value, 'requirements')}
                                            className={`flex-1 px-4 py-2 border rounded-md ${getInputStyle()}`}
                                            placeholder="e.g., Basic programming knowledge required"
                                        />
                                        {formData.requirements.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem(index, 'requirements')}
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                            >
                                                <X size={16} className="text-gray-500" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {errors.requirements && (
                                    <p className="mt-1 text-sm text-red-500 flex items-center">
                                        <AlertCircle size={14} className="mr-1" /> {errors.requirements}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                    <Link
                        href="/dashboard/lecturer/courses"
                        className={`px-6 py-2 rounded-md ${getButtonSecondaryStyle()}`}
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className={`px-6 py-2 rounded-md ${getButtonPrimaryStyle()} flex items-center`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save size={18} className="mr-2" />
                                Create Course
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseCreatePage;
