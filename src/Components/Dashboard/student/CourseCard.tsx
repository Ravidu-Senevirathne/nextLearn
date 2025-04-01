"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { Course } from './types';

interface CourseCardProps {
    course: Course;
    index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-blue-600/40 transition-all duration-300"
        >
            <div className="h-32 relative">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-2 left-2 bg-blue-600 text-xs py-1 px-2 rounded">
                    {course.category}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold mb-1">{course.title}</h3>
                <p className="text-sm text-gray-400 mb-3">By {course.instructor}</p>

                <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                        Next: <span className="text-blue-400">{course.nextLesson}</span>
                    </div>
                    <Link href={`/dashboard/student/courses/${course.id}`}>
                        <button className="flex items-center text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-1 px-2 rounded transition-colors">
                            <PlayCircle size={14} className="mr-1" />
                            Continue
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;
