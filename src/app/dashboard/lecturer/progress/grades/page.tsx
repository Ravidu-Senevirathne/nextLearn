"use client";

import { useState, useMemo } from 'react';
import {
    Search,
    Filter,
    Download,
    ArrowUpDown,
    Users,
    BookOpen,
    BarChart2,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';

// Mock data for student grades
const gradesData = [
    {
        id: 1,
        studentName: 'Emma Johnson',
        studentId: 'ST001',
        course: 'Web Development Fundamentals',
        assignment: 'Final Project',
        grade: 85,
        feedback: 'Excellent work on the responsive design',
        submittedDate: '2023-11-25',
        status: 'graded',
    },
    {
        id: 2,
        studentName: 'Liam Wilson',
        studentId: 'ST002',
        course: 'Web Development Fundamentals',
        assignment: 'Final Project',
        grade: 92,
        feedback: 'Outstanding implementation of advanced features',
        submittedDate: '2023-11-24',
        status: 'graded',
    },
    {
        id: 3,
        studentName: 'Olivia Martinez',
        studentId: 'ST003',
        course: 'Advanced JavaScript',
        assignment: 'React Component Library',
        grade: 78,
        feedback: 'Good work, but needs improvement in state management',
        submittedDate: '2023-11-26',
        status: 'graded',
    },
    {
        id: 4,
        studentName: 'Noah Davis',
        studentId: 'ST004',
        course: 'Advanced JavaScript',
        assignment: 'React Component Library',
        grade: 88,
        feedback: 'Well-designed components with good documentation',
        submittedDate: '2023-11-23',
        status: 'graded',
    },
    {
        id: 5,
        studentName: 'Ava Rodriguez',
        studentId: 'ST005',
        course: 'Database Management',
        assignment: 'SQL Optimization Project',
        grade: 90,
        feedback: 'Excellent query optimization techniques',
        submittedDate: '2023-11-22',
        status: 'graded',
    },
    {
        id: 6,
        studentName: 'Ethan Thompson',
        studentId: 'ST006',
        course: 'Database Management',
        assignment: 'SQL Optimization Project',
        grade: 75,
        feedback: 'Decent work but indexes could be better utilized',
        submittedDate: '2023-11-25',
        status: 'graded',
    },
    {
        id: 7,
        studentName: 'Isabella Clark',
        studentId: 'ST007',
        course: 'UI/UX Design Principles',
        assignment: 'Mobile App Prototype',
        grade: 95,
        feedback: 'Outstanding UI design with excellent user flow',
        submittedDate: '2023-11-21',
        status: 'graded',
    },
    {
        id: 8,
        studentName: 'Mason Lewis',
        studentId: 'ST008',
        course: 'UI/UX Design Principles',
        assignment: 'Mobile App Prototype',
        grade: 82,
        feedback: 'Good design but accessibility needs improvement',
        submittedDate: '2023-11-24',
        status: 'graded',
    },
];

// Course data for filtering
const courses = [
    { id: '1', name: 'All Courses' },
    { id: '2', name: 'Web Development Fundamentals' },
    { id: '3', name: 'Advanced JavaScript' },
    { id: '4', name: 'Database Management' },
    { id: '5', name: 'UI/UX Design Principles' },
];

// Assignment data for filtering
const assignments = [
    { id: '1', name: 'All Assignments' },
    { id: '2', name: 'Final Project' },
    { id: '3', name: 'React Component Library' },
    { id: '4', name: 'SQL Optimization Project' },
    { id: '5', name: 'Mobile App Prototype' },
];

const GradesPage = () => {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('All Courses');
    const [selectedAssignment, setSelectedAssignment] = useState('All Assignments');
    const [sortField, setSortField] = useState('studentName');
    const [sortDirection, setSortDirection] = useState('asc');

    // Filter and sort the grades data based on user selections
    const filteredGrades = useMemo(() => {
        return gradesData
            .filter(grade => {
                const matchesSearch =
                    grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    grade.studentId.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesCourse =
                    selectedCourse === 'All Courses' || grade.course === selectedCourse;

                const matchesAssignment =
                    selectedAssignment === 'All Assignments' || grade.assignment === selectedAssignment;

                return matchesSearch && matchesCourse && matchesAssignment;
            })
            .sort((a, b) => {
                const fieldA = a[sortField as keyof typeof a];
                const fieldB = b[sortField as keyof typeof b];

                if (typeof fieldA === 'string' && typeof fieldB === 'string') {
                    return sortDirection === 'asc'
                        ? fieldA.localeCompare(fieldB)
                        : fieldB.localeCompare(fieldA);
                }

                return sortDirection === 'asc'
                    ? Number(fieldA) - Number(fieldB)
                    : Number(fieldB) - Number(fieldA);
            });
    }, [searchTerm, selectedCourse, selectedAssignment, sortField, sortDirection]);

    // Calculate statistics
    const stats = useMemo(() => {
        const grades = filteredGrades.map(g => g.grade);
        const avg = grades.length > 0
            ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length
            : 0;

        return {
            average: Math.round(avg * 10) / 10,
            highest: Math.max(...(grades.length ? grades : [0])),
            lowest: Math.min(...(grades.length ? grades : [0])),
            total: filteredGrades.length
        };
    }, [filteredGrades]);

    // Handle sorting
    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Get appropriate style based on grade
    const getGradeStyle = (grade: number) => {
        if (grade >= 90) return theme === 'dark' ? 'text-green-400' : 'text-green-600';
        if (grade >= 75) return theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
        if (grade >= 60) return theme === 'dark' ? 'text-amber-400' : 'text-amber-600';
        return theme === 'dark' ? 'text-red-400' : 'text-red-600';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Student Grades</h1>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        View and manage student grades across courses and assignments
                    </p>
                </div>
                <button
                    className={`mt-4 md:mt-0 px-4 py-2 rounded-md flex items-center ${theme === 'dark'
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-teal-600 hover:bg-teal-700 text-white'
                        }`}
                >
                    <Download size={18} className="mr-2" />
                    Export Grades
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className={`rounded-lg border p-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <Users size={20} className={`mr-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                Total Students
                            </div>
                            <div className="text-xl font-semibold">{stats.total}</div>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <BarChart2 size={20} className={`mr-3 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                Average Grade
                            </div>
                            <div className="text-xl font-semibold">{stats.average}%</div>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <CheckCircle size={20} className={`mr-3 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-500'}`} />
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                Highest Grade
                            </div>
                            <div className="text-xl font-semibold">{stats.highest}%</div>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <AlertCircle size={20} className={`mr-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`} />
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                Lowest Grade
                            </div>
                            <div className="text-xl font-semibold">{stats.lowest}%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className={`p-4 mb-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by student name or ID..."
                            className={`w-full pl-10 pr-4 py-2 border rounded-md ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
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

                    <div className="flex items-center">
                        <Filter size={18} className="mr-2 text-gray-400" />
                        <select
                            className={`w-full p-2 border rounded-md ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                            value={selectedAssignment}
                            onChange={(e) => setSelectedAssignment(e.target.value)}
                        >
                            {assignments.map(assignment => (
                                <option key={assignment.id} value={assignment.name}>{assignment.name}</option>
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
                            setSelectedAssignment('All Assignments');
                        }}
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Grades Table */}
            <div className={`rounded-lg border overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('studentName')}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Student</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('course')}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Course</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('assignment')}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Assignment</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('grade')}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Grade</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('submittedDate')}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Submission Date</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                            {filteredGrades.length > 0 ? (
                                filteredGrades.map((grade) => (
                                    <tr
                                        key={grade.id}
                                        className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                                                    {grade.studentName}
                                                </div>
                                                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    ID: {grade.studentId}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {grade.course}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {grade.assignment}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`font-semibold ${getGradeStyle(grade.grade)}`}>
                                                {grade.grade}%
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {grade.submittedDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <Link
                                                href={`/dashboard/lecturer/progress/grades/${grade.id}`}
                                                className={theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-teal-600 hover:text-teal-700'}
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <BookOpen size={40} className={`mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                                            <h3 className={`text-lg font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                No grades found
                                            </h3>
                                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                                                Try adjusting your search or filters
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredGrades.length > 0 && (
                    <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                            Showing <span className="font-medium">{filteredGrades.length}</span> of <span className="font-medium">{gradesData.length}</span> grades
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className={`px-3 py-1 border rounded-md ${theme === 'dark'
                                        ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                disabled
                            >
                                Previous
                            </button>
                            <button
                                className={`px-3 py-1 rounded-md ${theme === 'dark'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-teal-600 text-white'
                                    }`}
                            >
                                1
                            </button>
                            <button
                                className={`px-3 py-1 border rounded-md ${theme === 'dark'
                                        ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                disabled
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GradesPage;
