"use client";

import { useState, useMemo } from 'react';
import { Search, BookOpen, Filter, Calendar } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

// Mock data for student grades
const gradesData = [
    {
        id: 1,
        course: 'Web Development Fundamentals',
        assignment: 'Final Project',
        grade: 85,
        feedback: 'Excellent work on the responsive design',
        submittedDate: '2023-11-25',
        status: 'graded',
        maxGrade: 100
    },
    {
        id: 2,
        course: 'Web Development Fundamentals',
        assignment: 'CSS Layout Challenge',
        grade: 92,
        feedback: 'Outstanding implementation of flexbox and grid',
        submittedDate: '2023-11-10',
        status: 'graded',
        maxGrade: 100
    },
    {
        id: 3,
        course: 'Advanced JavaScript',
        assignment: 'React Component Library',
        grade: 78,
        feedback: 'Good work, but needs improvement in state management',
        submittedDate: '2023-11-26',
        status: 'graded',
        maxGrade: 100
    },
    {
        id: 4,
        course: 'Database Management',
        assignment: 'SQL Optimization Project',
        grade: 90,
        feedback: 'Excellent query optimization techniques',
        submittedDate: '2023-11-22',
        status: 'graded',
        maxGrade: 100
    },
    {
        id: 5,
        course: 'Advanced JavaScript',
        assignment: 'Promise Chain Implementation',
        grade: 88,
        feedback: 'Well-structured code with good error handling',
        submittedDate: '2023-11-05',
        status: 'graded',
        maxGrade: 100
    },
    {
        id: 6,
        course: 'UI/UX Design Principles',
        assignment: 'Mobile App Prototype',
        grade: null,
        feedback: '',
        submittedDate: '2023-11-28',
        status: 'submitted',
        maxGrade: 100
    }
];

// Course data for filtering
const courses = [
    { id: '1', name: 'All Courses' },
    { id: '2', name: 'Web Development Fundamentals' },
    { id: '3', name: 'Advanced JavaScript' },
    { id: '4', name: 'Database Management' },
    { id: '5', name: 'UI/UX Design Principles' },
];

const StudentGradesPage = () => {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('All Courses');

    // Filter grades based on search term and selected course
    const filteredGrades = useMemo(() => {
        return gradesData.filter(grade => {
            const matchesSearch =
                grade.assignment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                grade.course.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCourse =
                selectedCourse === 'All Courses' || grade.course === selectedCourse;

            return matchesSearch && matchesCourse;
        });
    }, [searchTerm, selectedCourse]);

    // Calculate statistics
    const stats = useMemo(() => {
        const gradedItems = filteredGrades.filter(g => g.status === 'graded');
        const grades = gradedItems.map(g => g.grade).filter(g => g !== null) as number[];

        const avg = grades.length > 0
            ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length
            : 0;

        return {
            average: Math.round(avg * 10) / 10,
            highest: grades.length ? Math.max(...grades) : 0,
            total: gradedItems.length,
            pending: filteredGrades.filter(g => g.status === 'submitted').length
        };
    }, [filteredGrades]);

    // Get background style based on grade percentage
    const getGradeBackground = (grade: number | null) => {
        if (grade === null) return 'bg-gray-200 dark:bg-gray-700';

        if (grade >= 90) return 'bg-green-500 dark:bg-green-600';
        if (grade >= 80) return 'bg-blue-500 dark:bg-blue-600';
        if (grade >= 70) return 'bg-yellow-500 dark:bg-yellow-600';
        if (grade >= 60) return 'bg-orange-500 dark:bg-orange-600';
        return 'bg-red-500 dark:bg-red-600';
    };

    // Get appropriate letter grade
    const getLetterGrade = (grade: number | null) => {
        if (grade === null) return '-';

        if (grade >= 90) return 'A';
        if (grade >= 80) return 'B';
        if (grade >= 70) return 'C';
        if (grade >= 60) return 'D';
        return 'F';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-2">My Grades</h1>
            <p className={theme === 'dark' ? 'text-gray-400 mb-6' : 'text-gray-600 mb-6'}>
                View your grades and feedback for all assignments
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Average Grade</div>
                    <div className="flex items-end mt-1">
                        <div className="text-2xl font-bold">{stats.average}%</div>
                        <div className={`ml-2 px-2 py-0.5 rounded text-xs ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                            }`}>
                            {getLetterGrade(stats.average)}
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Highest Grade</div>
                    <div className="flex items-end mt-1">
                        <div className="text-2xl font-bold">{stats.highest}%</div>
                        <div className={`ml-2 px-2 py-0.5 rounded text-xs ${theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                            }`}>
                            {getLetterGrade(stats.highest)}
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Graded / Pending</div>
                    <div className="mt-1">
                        <div className="text-2xl font-bold">
                            {stats.total} <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/ {stats.pending}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={`p-4 mb-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search assignments..."
                            className={`w-full pl-10 pr-4 py-2 border rounded-md ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center">
                        <BookOpen size={18} className="mr-2 text-gray-400" />
                        <select
                            className={`w-full p-2 border rounded-md ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            {courses.map(course => (
                                <option key={course.id} value={course.name}>{course.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        className={`flex justify-center items-center py-2 px-4 rounded-md ${theme === 'dark'
                                ? 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                            }`}
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCourse('All Courses');
                        }}
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Grades List */}
            <div className="space-y-4">
                {filteredGrades.length > 0 ? (
                    filteredGrades.map((grade) => (
                        <div
                            key={grade.id}
                            className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {grade.assignment}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        <BookOpen size={14} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {grade.course}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <Calendar size={14} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Submitted: {grade.submittedDate}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        {grade.status === 'graded' ? (
                                            <div className="flex items-center">
                                                <div className="flex items-baseline">
                                                    <span className={`text-xl font-bold ${grade.grade && grade.grade >= 80
                                                            ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                                            : grade.grade && grade.grade >= 60
                                                                ? theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                                                                : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                                        }`}>
                                                        {grade.grade}
                                                    </span>
                                                    <span className={`text-sm ml-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        / {grade.maxGrade}
                                                    </span>
                                                </div>

                                                <div className={`ml-2 px-2 py-0.5 rounded text-xs ${grade.grade && grade.grade >= 80
                                                        ? theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                                                        : grade.grade && grade.grade >= 60
                                                            ? theme === 'dark' ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-800'
                                                            : theme === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {getLetterGrade(grade.grade)}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={`px-2 py-0.5 rounded text-xs ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                Pending
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {grade.status === 'graded' && grade.feedback && (
                                <div className={`mt-4 p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                    <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Instructor Feedback:
                                    </div>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {grade.feedback}
                                    </p>
                                </div>
                            )}

                            {/* Grade visualization */}
                            {grade.status === 'graded' && (
                                <div className="mt-4">
                                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-2 ${getGradeBackground(grade.grade)}`}
                                            style={{ width: `${grade.grade}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className={`p-8 text-center rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                        <div className="flex flex-col items-center justify-center">
                            <BookOpen size={40} className={`mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            <h3 className={`text-lg font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                No grades found
                            </h3>
                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                                {searchTerm || selectedCourse !== 'All Courses'
                                    ? 'Try adjusting your search or filters'
                                    : 'You don\'t have any graded assignments yet'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentGradesPage;
