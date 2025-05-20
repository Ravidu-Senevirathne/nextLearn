"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { GraduationCap, Search, BookOpen, Clock, Check, AlertCircle, Filter, BarChart2 } from 'lucide-react';

// Sample quiz data - would be fetched from API in production
const quizzesData = [
  {
    id: '1',
    title: 'HTML & CSS Fundamentals',
    course: 'Web Development Fundamentals',
    dueDate: '2023-12-15',
    status: 'pending',
    questions: 20,
    timeLimit: '30 minutes',
    description: 'Test your knowledge of HTML elements, CSS selectors, and layout techniques.'
  },
  {
    id: '2',
    title: 'JavaScript Basics',
    course: 'Web Development Fundamentals',
    dueDate: '2023-12-20',
    status: 'pending',
    questions: 15,
    timeLimit: '25 minutes',
    description: 'Assess your understanding of JavaScript fundamentals, including variables, functions, and control flow.'
  },
  {
    id: '3',
    title: 'Statistical Concepts',
    course: 'Data Science Essentials',
    dueDate: '2023-12-18',
    status: 'completed',
    score: '85',
    totalScore: '100',
    questions: 15,
    attemptDate: '2023-12-01',
    timeLimit: '30 minutes',
    description: 'Test your understanding of basic statistical concepts including mean, median, and standard deviation.'
  },
  {
    id: '4',
    title: 'Data Visualization',
    course: 'Data Science Essentials',
    dueDate: '2023-12-10',
    status: 'completed',
    score: '92',
    totalScore: '100',
    questions: 12,
    attemptDate: '2023-12-05',
    timeLimit: '20 minutes',
    description: 'Evaluate your skills in creating and interpreting different types of data visualizations.'
  },
  {
    id: '5',
    title: 'UI Design Principles',
    course: 'UI/UX Design Principles',
    dueDate: '2023-12-25',
    status: 'pending',
    questions: 25,
    timeLimit: '40 minutes',
    description: 'Test your knowledge of key UI design principles, color theory, and typography.'
  },
  {
    id: '6',
    title: 'React Components',
    course: 'Advanced JavaScript',
    dueDate: '2023-12-22',
    status: 'completed',
    score: '78',
    totalScore: '100',
    questions: 18,
    attemptDate: '2023-12-03',
    timeLimit: '35 minutes',
    description: 'Assess your understanding of React components, props, state, and lifecycle methods.'
  }
];

// Course data for filtering
const courses = [
  { id: '1', name: 'All Courses' },
  { id: '2', name: 'Web Development Fundamentals' },
  { id: '3', name: 'Data Science Essentials' },
  { id: '4', name: 'UI/UX Design Principles' },
  { id: '5', name: 'Advanced JavaScript' }
];

const QuizzesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Filter quizzes based on search term, selected course and status
  const filteredQuizzes = useMemo(() => {
    return quizzesData.filter(quiz => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCourse = selectedCourse === 'All Courses' || quiz.course === selectedCourse;
      
      const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [searchTerm, selectedCourse, statusFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const completedQuizzes = quizzesData.filter(q => q.status === 'completed');
    const scores = completedQuizzes.map(q => parseInt(q.score || '0'));
    
    const avg = scores.length > 0 
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length 
      : 0;
    
    return {
      total: quizzesData.length,
      completed: completedQuizzes.length,
      pending: quizzesData.filter(q => q.status === 'pending').length,
      averageScore: Math.round(avg)
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2 flex items-center">
        <GraduationCap className="mr-2 h-6 w-6 text-purple-500" />
        My Quizzes
      </h1>
      <p className="text-gray-400 mb-6">
        Complete quizzes to test your knowledge and track your progress
      </p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Total Quizzes</div>
          <div className="text-2xl font-bold mt-1">{stats.total}</div>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Completed</div>
          <div className="text-2xl font-bold mt-1 text-green-400">{stats.completed}</div>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Pending</div>
          <div className="text-2xl font-bold mt-1 text-amber-400">{stats.pending}</div>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Average Score</div>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-purple-400">{stats.averageScore}</span>
            <span className="text-gray-400 ml-1">/ 100</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search quizzes..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <BookOpen size={18} className="mr-2 text-gray-400" />
            <select
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map(course => (
                <option key={course.id} value={course.name}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-gray-400" />
            <select
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'completed')}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quizzes List */}
      {filteredQuizzes.length > 0 ? (
        <div className="space-y-4">
          {filteredQuizzes.map((quiz) => (
            <div 
              key={quiz.id}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-medium text-lg text-white">{quiz.title}</h3>
                    <div className="flex items-center mt-1">
                      <BookOpen size={14} className="mr-1 text-gray-400" />
                      <span className="text-sm text-gray-400">{quiz.course}</span>
                    </div>
                  </div>

                  <div className="mt-2 md:mt-0">
                    {quiz.status === 'completed' ? (
                      <div className="flex items-center bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm">
                        <Check size={14} className="mr-1" />
                        Completed
                      </div>
                    ) : (
                      <div className="flex items-center bg-amber-900/30 text-amber-400 px-3 py-1 rounded-full text-sm">
                        <Clock size={14} className="mr-1" />
                        Due {new Date(quiz.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mt-2">{quiz.description}</p>

                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center text-gray-400 text-sm">
                    <BarChart2 size={14} className="mr-1" />
                    {quiz.questions} questions
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock size={14} className="mr-1" />
                    {quiz.timeLimit}
                  </div>
                  {quiz.status === 'completed' && (
                    <div className="flex items-center text-sm">
                      <span className="text-purple-400 font-medium">{quiz.score}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-gray-400">{quiz.totalScore}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  {quiz.status === 'pending' ? (
                    <Link href={`/dashboard/student/quizzes/${quiz.id}`} className="w-full sm:w-auto">
                      <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 py-2 px-4 rounded transition-colors">
                        Start Quiz
                      </button>
                    </Link>
                  ) : (
                    <Link href={`/dashboard/student/quizzes/${quiz.id}/results`} className="w-full sm:w-auto">
                      <button className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-2 px-4 rounded transition-colors">
                        View Results
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <AlertCircle size={40} className="mb-2 text-gray-500" />
            <h3 className="text-lg font-medium mb-1 text-white">
              No quizzes found
            </h3>
            <p className="text-gray-400">
              {searchTerm || selectedCourse !== 'All Courses' || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'You don\'t have any quizzes assigned yet'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
