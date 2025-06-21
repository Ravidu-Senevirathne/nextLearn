"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Search, BookmarkCheck, Filter } from 'lucide-react';
import CourseCard from '@/Components/Dashboard/student/CourseCard';
import { Course } from '@/Components/Dashboard/student/types';
import Link from 'next/link';

// Sample saved courses data - would come from API in production
const savedCourses: Course[] = [
    {
        id: '2',
        title: 'Data Science Essentials',
        instructor: 'Prof. Michael Johnson',
        progress: 0,
        nextLesson: 'Introduction to Data Science',
        image: '/images/data-science.jpg',
        category: 'Data Science'
    },
    {
        id: '3',
        title: 'UI/UX Design Principles',
        instructor: 'Sarah Williams',
        progress: 0,
        nextLesson: 'Design Thinking',
        image: '/images/ui-ux-design.jpg',
        category: 'Design'
    },
    {
        id: '5',
        title: 'Machine Learning Fundamentals',
        instructor: 'Dr. Emily Rodriguez',
        progress: 0,
        nextLesson: 'Introduction to Machine Learning',
        image: '/images/machine-learning.jpg',
        category: 'Data Science'
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

const SavedCoursesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [sortOption, setSortOption] = useState('title-asc');
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(savedCourses);

    // Filter and sort courses based on search, category, and sort option
    useEffect(() => {
        let result = [...savedCourses];

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
        } else if (sortOption === 'instructor-asc') {
            result.sort((a, b) => a.instructor.localeCompare(b.instructor));
        } else if (sortOption === 'instructor-desc') {
            result.sort((a, b) => b.instructor.localeCompare(a.instructor));
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
                            placeholder="Search saved courses..."
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
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                            <option value="instructor-asc">Instructor (A-Z)</option>
                            <option value="instructor-desc">Instructor (Z-A)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Saved Courses Summary */}
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
                    <BookmarkCheck size={18} className="text-purple-400" />
                </div>
                <div>
                    <div className="text-sm text-gray-400">Saved Courses</div>
                    <div className="text-lg font-semibold text-white">{savedCourses.length}</div>
                </div>
                <div className="ml-auto">
                    <Link href="/dashboard/student/courses/explore">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                            Explore More Courses
                        </button>
                    </Link>
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
                    <h3 className="text-xl font-semibold mb-2 text-white">No saved courses found</h3>
                    <p className="text-gray-400 mb-6">
                        {searchTerm || selectedCategory !== 'All Categories'
                            ? "Try adjusting your search or filters to find your saved courses."
                            : "You haven't saved any courses yet. Explore our course catalog and save courses you're interested in!"}
                    </p>
                    <Link href="/dashboard/student/courses/explore">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                            Explore Courses
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default SavedCoursesPage;
