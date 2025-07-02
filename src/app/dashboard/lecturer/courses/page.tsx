"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    PlusCircle,
    BookOpen,
    Star,
    Users,
    BarChart2,
    MoreVertical,
    Edit,
    Eye,
    Copy,
    Trash2,
    ArrowUpDown,
    CheckCircle
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

// Course categories for filtering
const categories = [
    'All Categories',
    'Development',
    'Data Science',
    'Programming',
    'Design',
    'Business',
];

// Course statuses for filtering
const statuses = [
    'All Statuses',
    'Published',
    'Draft',
    'Archived',
];

const CoursesPage = () => {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedStatus, setSelectedStatus] = useState('All Statuses');
    const [sortField, setSortField] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Theme-based styling functions
    const getPageStyle = () => {
        return theme === 'dark' ? 'text-white' : 'text-gray-800';
    };

    const getCardStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-900 border border-gray-800'
            : 'bg-white border border-slate-200 shadow-sm';
    };

    const getHeaderStyle = () => {
        return theme === 'dark'
            ? 'border-b border-gray-800 bg-gray-900'
            : 'border-b border-slate-200 bg-white';
    };

    const getInputStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400';
    };

    const getButtonPrimaryStyle = () => {
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    };

    const getButtonSecondaryStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300';
    };

    const getDropdownStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-800 border border-gray-700 text-white'
            : 'bg-white border border-gray-300 text-gray-800';
    };

    const getTableHeaderStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-800 text-gray-300'
            : 'bg-gray-100 text-gray-600';
    };

    const getTableRowStyle = (index: number) => {
        const alternating = index % 2 === 0;
        return theme === 'dark'
            ? alternating ? 'bg-gray-900' : 'bg-gray-850'
            : alternating ? 'bg-white' : 'bg-gray-50';
    };

    const getTableBorderStyle = () => {
        return theme === 'dark'
            ? 'border-gray-800'
            : 'border-gray-200';
    };

    const getStatusStyle = (status: string) => {
        if (status === 'Published') {
            return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        } else if (status === 'Draft') {
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
        } else {
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    // Fetch courses from API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8000/courses', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setCourses(data);
            } catch (err: any) {
                console.error("Error fetching courses:", err);
                setError(err.message || 'Failed to load courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Filter and sort courses
    const filteredCourses = courses
        .filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
            const matchesStatus = selectedStatus === 'All Statuses' || course.status === selectedStatus;
            return matchesSearch && matchesCategory && matchesStatus;
        })
        .sort((a, b) => {
            const fieldA = a[sortField as keyof typeof a];
            const fieldB = b[sortField as keyof typeof b];

            if (typeof fieldA === 'string' && typeof fieldB === 'string') {
                return sortDirection === 'asc'
                    ? fieldA.localeCompare(fieldB)
                    : fieldB.localeCompare(fieldA);
            }

            return sortDirection === 'asc'
                ? Number(fieldA) - Number(fieldB)
                : Number(fieldB) - Number(fieldA);
        });

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Add loading state
    if (loading) {
        return (
            <div className={`p-6 ${getPageStyle()}`}>
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    // Add error state
    if (error) {
        return (
            <div className={`p-6 ${getPageStyle()}`}>
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`p-6 ${getPageStyle()}`}>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Courses</h1>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Manage your courses, monitor student progress, and update content
                    </p>
                </div>
                <Link href="/dashboard/lecturer/courses/create">
                    <button className={`mt-4 md:mt-0 px-4 py-2 rounded-md font-medium flex items-center ${getButtonPrimaryStyle()}`}>
                        <PlusCircle size={18} className="mr-2" />
                        Create New Course
                    </button>
                </Link>
            </div>

            {/* Filters and Search */}
            <div className={`${getCardStyle()} rounded-lg mb-6`}>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className={`${getInputStyle()} pl-10 pr-4 py-2 rounded-md w-full border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <select
                                className={`${getDropdownStyle()} px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <select
                                className={`${getDropdownStyle()} px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        {/* Filter Button */}
                        <div className="flex space-x-2">
                            <button className={`${getButtonSecondaryStyle()} px-4 py-2 rounded-md font-medium flex items-center flex-1 justify-center`}>
                                <Filter size={18} className="mr-2" />
                                More Filters
                            </button>
                            <button className={`${getButtonSecondaryStyle()} px-3 py-2 rounded-md font-medium`}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Table */}
            <div className={`${getCardStyle()} rounded-lg overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className={getTableHeaderStyle()}>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => handleSort('title')}
                                    >
                                        <span>Course</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => handleSort('students')}
                                    >
                                        <span>Students</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => handleSort('completion')}
                                    >
                                        <span>Completion</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => handleSort('rating')}
                                    >
                                        <span>Rating</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => handleSort('status')}
                                    >
                                        <span>Status</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => handleSort('lastUpdated')}
                                    >
                                        <span>Last Updated</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${getTableBorderStyle()}`}>
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course, index) => (
                                    <tr key={course.id} className={getTableRowStyle(index)}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-100'}`}>
                                                    <BookOpen size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium">{course.title}</div>
                                                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{course.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Users size={16} className="mr-2 text-gray-400" />
                                                <span>{course.students}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <span className="text-sm mr-2">{course.completion}%</span>
                                                    <BarChart2 size={16} className="text-gray-400" />
                                                </div>
                                                <div className={`w-24 h-1.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                                                    <div
                                                        className="h-full bg-blue-500 rounded-full"
                                                        style={{ width: `${course.completion}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Star size={16} className="mr-1 text-yellow-400" />
                                                <span>{course.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusStyle(course.status)}`}>
                                                {course.status === 'Published' && <CheckCircle className="w-3 h-3 mr-1" />}
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {course.lastUpdated}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Link href={`/dashboard/lecturer/courses/${course.id}`}>
                                                    <button className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                                                        <Eye size={16} className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'} />
                                                    </button>
                                                </Link>
                                                <Link href={`/dashboard/lecturer/courses/${course.id}/edit`}>
                                                    <button className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                                                        <Edit size={16} className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'} />
                                                    </button>
                                                </Link>
                                                <button className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                                                    <Copy size={16} className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'} />
                                                </button>
                                                <button className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                                                    <Trash2 size={16} className="text-red-500 hover:text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center">
                                        <div className="flex flex-col items-center">
                                            <BookOpen size={40} className="mb-2 text-gray-400" />
                                            <p className="text-gray-500 dark:text-gray-400">No courses found matching your criteria</p>
                                            <button
                                                className="mt-4 text-blue-500 hover:text-blue-600"
                                                onClick={() => {
                                                    setSearchTerm('');
                                                    setSelectedCategory('All Categories');
                                                    setSelectedStatus('All Statuses');
                                                }}
                                            >
                                                Reset filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className={`px-6 py-4 ${getHeaderStyle()} flex items-center justify-between`}>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Showing {filteredCourses.length} of {courses.length} courses
                    </div>
                    <div className="flex space-x-2">
                        <button disabled className={`px-3 py-1 rounded-md ${getButtonSecondaryStyle()} opacity-50`}>
                            Previous
                        </button>
                        <button className={`px-3 py-1 rounded-md ${getButtonPrimaryStyle()}`}>
                            1
                        </button>
                        <button className={`px-3 py-1 rounded-md ${getButtonSecondaryStyle()}`}>
                            2
                        </button>
                        <button className={`px-3 py-1 rounded-md ${getButtonSecondaryStyle()}`}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;

