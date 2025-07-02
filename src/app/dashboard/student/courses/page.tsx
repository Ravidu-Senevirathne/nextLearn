"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Search, CheckCircle, Clock, Filter } from 'lucide-react';
import CourseCard from '@/Components/Dashboard/student/CourseCard';
import { Course } from '@/Components/Dashboard/student/types';
import Link from 'next/link';

// Sample courses data - would come from API in production
const allCourses: Course[] = [
    {
        id: '1',
        title: 'Web Development Fundamentals',
        instructor: 'Dr. Jane Smith',
        progress: 75,
        nextLesson: 'CSS Grid Layout',
        image: '/images/web-development.jpg',
        category: 'Development'
    },
    {
        id: '2',
        title: 'Data Science Essentials',
        instructor: 'Prof. Michael Johnson',
        progress: 45,
        nextLesson: 'Statistical Analysis',
        image: '/images/data-science.jpg',
        category: 'Data Science'
    },
    {
        id: '3',
        title: 'UI/UX Design Principles',
        instructor: 'Sarah Williams',
        progress: 90,
        nextLesson: 'User Testing',
        image: '/images/ui-ux-design.jpg',
        category: 'Design'
    },
    {
        id: '4',
        title: 'Advanced JavaScript',
        instructor: 'Dr. Robert Chen',
        progress: 30,
        nextLesson: 'Promises & Async/Await',
        image: '/images/javascript.jpg',
        category: 'Development'
    },
    {
        id: '5',
        title: 'Machine Learning Fundamentals',
        instructor: 'Dr. Emily Rodriguez',
        progress: 60,
        nextLesson: 'Neural Networks',
        image: '/images/machine-learning.jpg',
        category: 'Data Science'
    },
    {
        id: '6',
        title: 'Mobile App Development',
        instructor: 'James Wilson',
        progress: 25,
        nextLesson: 'React Native Navigation',
        image: '/images/mobile-dev.jpg',
        category: 'Development'
    }
];

// Categories for filtering
const categories = [
    'All Categories',
    'Development',
    'Data Science',
    'Design',
    'Business',
    'Marketing'
];

const MyCoursesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [sortOption, setSortOption] = useState('progress');
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(allCourses);

    // Filter and sort courses based on search, category, and sort option
    useEffect(() => {
        let result = [...allCourses];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(
                course => course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (selectedCategory !== 'All Categories') {
            result = result.filter(course => course.category === selectedCategory);
        }

        // Apply sorting
        if (sortOption === 'title-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === 'title-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOption === 'progress') {
            result.sort((a, b) => b.progress - a.progress);
        } else if (sortOption === 'progress-asc') {
            result.sort((a, b) => a.progress - b.progress);
        }

        setFilteredCourses(result);
    }, [searchTerm, selectedCategory, sortOption]);

    return (
        <>
            {/* Filters and Search */}
            <div className="mb-6 p-4 bg-gray-900 border border-gray-800 rounded-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="min-w-[180px]">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div className="min-w-[180px]">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        >
                            <option value="progress">Progress (High to Low)</option>
                            <option value="progress-asc">Progress (Low to High)</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Courses Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3">
                        <BookOpen size={18} className="text-blue-400" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">Enrolled Courses</div>
                        <div className="text-lg font-semibold text-white">{allCourses.length}</div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                        <CheckCircle size={18} className="text-green-400" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">Completed Courses</div>
                        <div className="text-lg font-semibold text-white">
                            {allCourses.filter(course => course.progress === 100).length}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
                        <Clock size={18} className="text-purple-400" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">In Progress</div>
                        <div className="text-lg font-semibold text-white">
                            {allCourses.filter(course => course.progress > 0 && course.progress < 100).length}
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Cards */}
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => (
                        <CourseCard key={course.id} course={course} index={index} />
                    ))}
                </div>
            ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <BookOpen size={48} className="text-gray-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">No courses found</h3>
                    <p className="text-gray-400 mb-6">
                        {searchTerm || selectedCategory !== 'All Categories'
                            ? "Try adjusting your search or filters to find your courses."
                            : "You haven't enrolled in any courses yet."}
                    </p>
                    <Link href="/courses/all-courses">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                            Browse Courses
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default MyCoursesPage;
