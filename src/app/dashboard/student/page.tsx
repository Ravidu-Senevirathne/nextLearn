"use client";

import React from 'react';
import { BookOpen, Clock, Award, BarChart2, Download, Calendar } from 'lucide-react';
import StatCard from '@/Components/Dashboard/student/StatCard';
import CourseCard from '@/Components/Dashboard/student/CourseCard';
import AssignmentsList from '@/Components/Dashboard/student/AssignmentsList';
import QuizzesList from '@/Components/Dashboard/student/QuizzesList';
import ScheduleList from '@/Components/Dashboard/student/ScheduleList';
import NotificationsPanel from '@/Components/Dashboard/student/NotificationsPanel';
import { StatisticItem, Course, Assignment, Quiz, ScheduleEvent, Notification } from '@/Components/Dashboard/student/types';
import Link from 'next/link';

// Sample data for the dashboard - would come from API in real app
const statistics: StatisticItem[] = [
  { title: 'Enrolled Courses', value: 5, icon: BookOpen, color: 'bg-blue-500' },
  { title: 'Hours Learned', value: '42h', icon: Clock, change: '+3h', color: 'bg-green-500' },
  { title: 'Completion Rate', value: '78%', icon: BarChart2, change: '+5%', color: 'bg-purple-500' },
  { title: 'Certifications', value: 2, icon: Award, color: 'bg-amber-500' },
];

const courses: Course[] = [
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
];

const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Create a Responsive Landing Page',
    course: 'Web Development Fundamentals',
    dueDate: 'Tomorrow, 11:59 PM',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Data Visualization Project',
    course: 'Data Science Essentials',
    dueDate: 'Jul 25, 11:59 PM',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Website Wireframe',
    course: 'UI/UX Design Principles',
    dueDate: 'Jul 22, 11:59 PM',
    status: 'submitted'
  },
];

const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'HTML & CSS Fundamentals',
    course: 'Web Development Fundamentals',
    dueDate: 'Tomorrow, 11:59 PM',
    status: 'pending',
    questions: 20
  },
  {
    id: '2',
    title: 'Statistical Concepts',
    course: 'Data Science Essentials',
    dueDate: 'Jul 26, 11:59 PM',
    status: 'completed',
    score: '85%',
    questions: 15
  }
];

const scheduleEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Live Lesson: Advanced CSS',
    course: 'Web Development Fundamentals',
    date: 'Today',
    time: '3:00 PM',
    type: 'live'
  },
  {
    id: '2',
    title: 'Assignment Deadline',
    course: 'Data Science Essentials',
    date: 'Tomorrow',
    time: '11:59 PM',
    type: 'deadline'
  },
  {
    id: '3',
    title: 'Final Exam',
    course: 'UI/UX Design Principles',
    date: 'Jul 30',
    time: '10:00 AM',
    type: 'exam'
  }
];

const notifications: Notification[] = [
  {
    id: '1',
    type: 'announcement',
    title: 'New Course Material Available',
    message: 'Additional resources for "Web Development Fundamentals" have been uploaded.',
    date: '10 minutes ago',
    read: false
  },
  {
    id: '2',
    type: 'grade',
    title: 'Assignment Graded',
    message: 'Your "Data Cleaning" assignment has been graded: A',
    date: '2 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'message',
    title: 'Message from Instructor',
    message: 'Dr. Jane Smith: "Great job on your last project! Let\'s discuss your progress."',
    date: 'Yesterday',
    read: true
  }
];

const StudentDashboard = () => {
  return (
    <>
      {/* Welcome section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Welcome back, Alex!</h2>
        <p className="text-gray-400">Continue your learning journey where you left off.</p>
      </section>

      {/* Statistics */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statistics.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </section>

      {/* Continue Learning - Course Cards */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Continue Learning</h3>
          <Link href="/dashboard/student/courses" className="text-sm text-blue-400 hover:text-blue-300">
            View all courses
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </section>

      {/* Two column layout for assignments/quizzes and schedule/notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AssignmentsList assignments={assignments} />
        <QuizzesList quizzes={quizzes} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScheduleList events={scheduleEvents} />
        <NotificationsPanel notifications={notifications} />
      </div>

      {/* Quick access buttons */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/student/materials">
            <div className="bg-gray-900 border border-gray-800 hover:border-blue-600/40 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center mb-2">
                <Download size={20} className="text-blue-400" />
              </div>
              <span className="text-sm font-medium">Download Materials</span>
            </div>
          </Link>
          <Link href="/dashboard/student/schedule">
            <div className="bg-gray-900 border border-gray-800 hover:border-green-600/40 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center mb-2">
                <Calendar size={20} className="text-green-400" />
              </div>
              <span className="text-sm font-medium">View Schedule</span>
            </div>
          </Link>
          <Link href="/dashboard/student/grades">
            <div className="bg-gray-900 border border-gray-800 hover:border-purple-600/40 p-4 rounded-lg flex items-center justify-center text-center transition-colors">
              <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center mb-2">
                <BarChart2 size={20} className="text-purple-400" />
              </div>
              <span className="text-sm font-medium">View Grades</span>
            </div>
          </Link>
          <Link href="/dashboard/student/courses/explore">
            <div className="bg-gray-900 border border-gray-800 hover:border-amber-600/40 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
              <div className="w-10 h-10 rounded-full bg-amber-600/20 flex items-center justify-center mb-2">
                <BookOpen size={20} className="text-amber-400" />
              </div>
              <span className="text-sm font-medium">Explore Courses</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default StudentDashboard;