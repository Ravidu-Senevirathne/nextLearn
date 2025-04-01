"use client";

import React from 'react';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

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
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800">
                <h3 className="font-semibold flex items-center">
                    <TrendingUp size={18} className="mr-2 text-green-400" />
                    Popular Courses
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Students
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Completion Rate
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Rating
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {courses.map((course, index) => (
                            <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium">{course.title}</div>
                                </td>
                                <td className="px-6 py-4">
                                    {course.students}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-24 h-2 bg-gray-800 rounded-full mr-2">
                                            <div
                                                className="h-2 bg-green-500 rounded-full"
                                                style={{ width: `${course.completion}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-gray-400 text-xs">{course.completion}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <span className="text-yellow-400 mr-1">★</span>
                                        <span>{course.rating}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/dashboard/lecturer/courses/${index}`} className="text-blue-400 hover:text-blue-300 text-sm">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-3 border-t border-gray-800">
                <Link
                    href="/dashboard/lecturer/courses"
                    className="text-center block w-full text-sm text-blue-400 hover:text-blue-300"
                >
                    Manage All Courses
                </Link>
            </div>
        </div>
    );
};

export default CoursesList;
