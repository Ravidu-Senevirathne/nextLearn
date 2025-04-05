"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen, Star } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface Course {
    title: string;
    students: number;
    completion: number;
    rating: number;
}

interface CoursesListProps {
    courses: Course[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
    const { theme } = useTheme();

    // Helper functions for theme-specific styling
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

    const getContentStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-900'
            : 'bg-white';
    };

    const getDividerStyle = () => {
        return theme === 'dark'
            ? 'divide-y divide-gray-800'
            : 'divide-y divide-slate-200';
    };

    const getHoverStyle = () => {
        return theme === 'dark'
            ? 'hover:bg-gray-800/50'
            : 'hover:bg-blue-50';
    };

    const getLinkStyle = () => {
        return theme === 'dark'
            ? 'text-blue-400 hover:text-blue-300'
            : 'text-blue-600 hover:text-blue-700';
    };

    const getProgressBgStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-800'
            : 'bg-slate-200';
    };

    const getProgressFillStyle = () => {
        return theme === 'dark'
            ? 'bg-blue-600'
            : 'bg-blue-500';
    };

    const getButtonStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700 text-white'
            : 'bg-blue-100 hover:bg-blue-200 text-blue-700';
    };

    const getTextStyle = () => {
        return theme === 'dark'
            ? 'text-gray-400'
            : 'text-slate-600';
    };

    const getTitleTextStyle = () => {
        return theme === 'dark'
            ? 'text-white'
            : 'text-gray-800';
    };

    return (
        <div className={`${getCardStyle()} rounded-lg overflow-hidden`}>
            <div className={`p-4 ${getHeaderStyle()}`}>
                <h3 className={`font-semibold flex items-center ${getTitleTextStyle()}`}>
                    <BookOpen size={18} className={`mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    Popular Courses
                </h3>
            </div>
            <div className={`${getDividerStyle()} ${getContentStyle()}`}>
                {courses.map((course, index) => (
                    <div key={index} className={`p-4 ${getHoverStyle()} transition-colors`}>
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <h4 className={`font-medium ${getTitleTextStyle()}`}>{course.title}</h4>
                                <div className="flex items-center mt-1">
                                    <span className={`text-sm ${getTextStyle()}`}>
                                        {course.students} students
                                    </span>
                                    <span className="mx-2 text-gray-500">•</span>
                                    <div className="flex items-center">
                                        <Star size={14} className="text-yellow-400 mr-1" />
                                        <span className={`text-sm ${getTextStyle()}`}>
                                            {course.rating}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className={getTextStyle()}>Completion</span>
                                        <span className={getTextStyle()}>{course.completion}%</span>
                                    </div>
                                    <div className={`w-full ${getProgressBgStyle()} rounded-full h-2`}>
                                        <div
                                            className={`${getProgressFillStyle()} h-2 rounded-full transition-all duration-500`}
                                            style={{ width: `${course.completion}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/dashboard/lecturer/courses/${index + 1}`}>
                                <button className={`ml-4 px-3 py-2 rounded-md text-sm ${getButtonStyle()}`}>
                                    View
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`p-3 ${getHeaderStyle()}`}>
                <Link
                    href="/dashboard/lecturer/courses"
                    className={`text-center block w-full text-sm ${getLinkStyle()}`}
                >
                    View All Courses
                </Link>
            </div>
        </div>
    );
};

export default CoursesList;
