"use client";

import React, { useState } from 'react';
import StudentDashboardLayout from '@/Components/Dashboard/student/Layout';
import { BookOpen, Video, FileText, Download, CheckCircle, Lock, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "reading" | "quiz";  // Strict literal type
  completed: boolean;
  locked: boolean;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

// Sample course data - would come from API in real app
const courseData = {
  id: '1',
  title: 'Web Development Fundamentals',
  instructor: 'Dr. Jane Smith',
  description: 'Learn the core concepts of web development including HTML, CSS, and JavaScript. This course covers everything you need to build your first website from scratch.',
  rating: 4.8,
  reviews: 456,
  students: 2587,
  progress: 75,
  image: '/images/web-development.jpg',
  sections: [
    {
      id: 's1',
      title: 'Introduction to HTML',
      lessons: [
        {
          id: 'l1',
          title: 'What is HTML?',
          duration: '10:32',
          type: 'video' as const,  // Using const assertion
          completed: true,
          locked: false
        },
        {
          id: 'l2',
          title: 'Basic HTML Structure',
          duration: '15:45',
          type: 'video' as const,
          completed: true,
          locked: false
        },
        {
          id: 'l3',
          title: 'HTML Elements Quiz',
          duration: '10 questions',
          type: 'quiz' as const,
          completed: true,
          locked: false
        }
      ]
    },
    {
      id: 's2',
      title: 'CSS Fundamentals',
      lessons: [
        {
          id: 'l4',
          title: 'Introduction to CSS',
          duration: '12:18',
          type: 'video' as const,
          completed: true,
          locked: false
        },
        {
          id: 'l5',
          title: 'CSS Selectors',
          duration: '14:22',
          type: 'video' as const,
          completed: true,
          locked: false
        },
        {
          id: 'l6',
          title: 'CSS Box Model',
          duration: '8 pages',
          type: 'reading' as const,
          completed: false,
          locked: false
        },
        {
          id: 'l7',
          title: 'CSS Layout Quiz',
          duration: '8 questions',
          type: 'quiz' as const,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 's3',
      title: 'JavaScript Basics',
      lessons: [
        {
          id: 'l8',
          title: 'Introduction to JavaScript',
          duration: '18:42',
          type: 'video' as const,
          completed: false,
          locked: false
        },
        {
          id: 'l9',
          title: 'Variables and Data Types',
          duration: '15:37',
          type: 'video' as const,
          completed: false,
          locked: true
        },
        {
          id: 'l10',
          title: 'Functions in JS',
          duration: '12 pages',
          type: 'reading' as const,
          completed: false,
          locked: true
        },
        {
          id: 'l11',
          title: 'JavaScript Basics Quiz',
          duration: '15 questions',
          type: 'quiz' as const,
          completed: false,
          locked: true
        }
      ]
    }
  ],
  materials: [
    { id: 'm1', title: 'HTML Cheat Sheet', type: 'PDF', size: '1.2 MB' },
    { id: 'm2', title: 'CSS Reference Guide', type: 'PDF', size: '2.5 MB' },
    { id: 'm3', title: 'Course Project Files', type: 'ZIP', size: '5.8 MB' }
  ]
};

const getCompletedLessonsCount = (sections: Section[]) => {
  return sections.reduce((count, section) => {
    return count + section.lessons.filter(lesson => lesson.completed).length;
  }, 0);
};

const getTotalLessonsCount = (sections: Section[]) => {
  return sections.reduce((count, section) => {
    return count + section.lessons.length;
  }, 0);
};

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'materials'>('content');
  
  // In a real app, you would fetch the course by ID from an API
  const course = courseData;
  
  const completedLessons = getCompletedLessonsCount(course.sections);
  const totalLessons = getTotalLessonsCount(course.sections);
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  const getLessonIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video size={16} />;
      case 'reading': return <FileText size={16} />;
      case 'quiz': return <CheckCircle size={16} />;
      default: return <Video size={16} />;
    }
  };

  return (
    <StudentDashboardLayout title={course.title}>
      {/* Course Header */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
            <p className="text-gray-400 mb-4">Instructor: {course.instructor}</p>
            <p className="text-gray-300 mb-4">{course.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{course.rating} ({course.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <BookOpen size={16} className="mr-1" />
                <span>{totalLessons} lessons</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="mr-1 text-green-400" />
                <span>{completedLessons} completed</span>
              </div>
            </div>
          </div>
          <div className="relative h-48 md:h-auto rounded-lg overflow-hidden">
            <Image 
              src={course.image || '/images/course-placeholder.jpg'} 
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Your Progress</span>
          <span>{progressPercentage}% Complete</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-800">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 px-4 border-b-2 ${
              activeTab === 'content' 
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Course Content
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`py-3 px-4 border-b-2 ${
              activeTab === 'materials' 
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Course Materials
          </button>
        </div>
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          {course.sections.map((section) => (
            <div key={section.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div className="bg-gray-800 p-4">
                <h3 className="font-medium">{section.title}</h3>
              </div>
              <div className="divide-y divide-gray-800">
                {section.lessons.map((lesson) => (
                  <div key={lesson.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          lesson.completed 
                            ? 'bg-green-900/40 text-green-400' 
                            : 'bg-gray-800 text-gray-400'
                        }`}>
                          {lesson.completed ? <CheckCircle size={16} /> : getLessonIcon(lesson.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-gray-400">{lesson.duration}</p>
                        </div>
                      </div>
                      <div>
                        {lesson.locked ? (
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                            <Lock size={16} className="text-gray-500" />
                          </div>
                        ) : (
                          <Link href={`/dashboard/student/courses/${course.id}/lessons/${lesson.id}`}>
                            <button className="w-8 h-8 rounded-full bg-blue-600/20 hover:bg-blue-600/30 flex items-center justify-center">
                              <Play size={16} className="text-blue-400" />
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Materials Tab */}
      {activeTab === 'materials' && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <h3 className="font-medium">Downloadable Materials</h3>
          </div>
          <div className="divide-y divide-gray-800">
            {course.materials.map((material) => (
              <div key={material.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center mr-3">
                      <FileText size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">{material.title}</h4>
                      <p className="text-sm text-gray-400">{material.type} • {material.size}</p>
                    </div>
                  </div>
                  <button className="flex items-center bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-1 px-3 rounded">
                    <Download size={14} className="mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </StudentDashboardLayout>
  );
};

export default CoursePage;
