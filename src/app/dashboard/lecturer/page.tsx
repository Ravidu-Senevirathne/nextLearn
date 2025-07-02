"use client";

import React, { useEffect, useState } from 'react';
import { BookOpen, Users, FileText, CheckCircle } from 'lucide-react';
import StatCard from '@/Components/Dashboard/lecturer/StatCard';
import QuickActions from '@/Components/Dashboard/lecturer/QuickActions';
import EventsList from '@/Components/Dashboard/lecturer/EventsList';
import SubmissionsList from '@/Components/Dashboard/lecturer/SubmissionsList';
import CoursesList from '@/Components/Dashboard/lecturer/CoursesList';
import { StatisticItem, Event, Submission, Course } from '@/Components/Dashboard/lecturer/types';
import { assignmentService } from '@/services/assignmentService';

// Sample data - will be replaced with real data from API
const statistics: StatisticItem[] = [
  { title: 'Total Courses', value: 12, icon: BookOpen, change: '+2', color: 'bg-blue-500' },
  { title: 'Active Students', value: 486, icon: Users, change: '+24', color: 'bg-green-500' },
  { title: 'Assignments', value: 38, icon: FileText, change: '+7', color: 'bg-amber-500' },
  { title: 'Completion Rate', value: '87%', icon: CheckCircle, change: '+3%', color: 'bg-purple-500' },
];

const upcomingEvents = [
  { title: 'Web Development Quiz Deadline', course: 'Web Development Fundamentals', time: 'Today, 11:59 PM', type: 'quiz' as const },
  { title: 'Data Science Project Review', course: 'Data Science Essentials', time: 'Tomorrow, 3:00 PM', type: 'review' as const },
  { title: 'Mobile App Dev Live Session', course: 'Mobile App Development', time: 'Jul 24, 2:00 PM', type: 'live' as const },
  { title: 'Final Exam', course: 'JavaScript Mastery', time: 'Jul 29, 10:00 AM', type: 'exam' as const },
];

const recentSubmissions: Submission[] = [
  { student: 'Emma Thompson', course: 'Web Development Fundamentals', assignment: 'Final Project', time: '2 hours ago', status: 'pending' },
  { student: 'Alex Johnson', course: 'React Framework', assignment: 'Component Exercise', time: '5 hours ago', status: 'pending' },
  { student: 'Michael Brown', course: 'Data Science Essentials', assignment: 'Data Visualization', time: '1 day ago', status: 'graded', grade: 'A' },
  { student: 'Sophia Garcia', course: 'Web Development Fundamentals', assignment: 'Form Validation', time: '1 day ago', status: 'graded', grade: 'B+' },
];

const popularCourses: Course[] = [
  { title: 'Web Development Fundamentals', students: 156, completion: 92, rating: 4.8 },
  { title: 'React Framework', students: 132, completion: 78, rating: 4.7 },
  { title: 'Data Science Essentials', students: 98, completion: 85, rating: 4.9 },
];

/**
 * LecturerDashboard Component
 * 
 * Main dashboard interface for lecturers to manage courses, students, 
 * assignments, and view statistics
 */
const LecturerDashboard = () => {
  const [assignmentsCount, setAssignmentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch assignments count for real-time statistics
  useEffect(() => {
    const fetchAssignmentsCount = async () => {
      try {
        const assignments = await assignmentService.getAllAssignments();
        setAssignmentsCount(assignments.length);

        // Update the statistics with real data
        statistics[2].value = assignments.length;
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentsCount();
  }, []);

  return (
    <>
      {/* Welcome section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Welcome back, Dr. Smith!</h2>
        <p className="text-gray-400">Here's what's happening with your courses today.</p>
      </section>

      {/* Quick Actions */}
      <QuickActions />

      {/* Statistics */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statistics.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-1">
          <EventsList events={upcomingEvents} />
        </div>

        {/* Recent Submissions */}
        <div className="lg:col-span-2">
          <SubmissionsList submissions={recentSubmissions} />
        </div>
      </section>

      {/* Popular Courses */}
      <section className="mt-6">
        <CoursesList courses={popularCourses} />
      </section>
    </>
  );
};

export default LecturerDashboard;