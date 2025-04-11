"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    PlusCircle,
    Mail,
    FileText,
    User,
    Users,
    MoreHorizontal,
    Calendar,
    BookOpen,
    BarChart2,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';

// Mock data - replace with actual API calls
const mockStudents = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        enrolledCourses: 3,
        progress: 78,
        lastActive: '2023-11-15'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        enrolledCourses: 2,
        progress: 92,
        lastActive: '2023-11-14'
    },
    {
        id: 3,
        name: 'Michael Johnson',
        email: 'michael.j@example.com',
        enrolledCourses: 4,
        progress: 45,
        lastActive: '2023-11-10'
    },
    {
        id: 4,
        name: 'Emily Brown',
        email: 'emily.b@example.com',
        enrolledCourses: 1,
        progress: 60,
        lastActive: '2023-11-13'
    },
    {
        id: 5,
        name: 'Robert Wilson',
        email: 'robert.w@example.com',
        enrolledCourses: 2,
        progress: 85,
        lastActive: '2023-11-12'
    },
];

export default function StudentsPage() {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [students, setStudents] = useState(mockStudents);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const studentsPerPage = 10;

    // Filter students based on search query and status
    const filteredStudents = useMemo(() => {
        return students.filter(student => {
            const matchesSearch =
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase());

            let matchesStatus = true;
            if (statusFilter !== 'all') {
                const isActive = new Date(student.lastActive) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                matchesStatus = (statusFilter === 'active' && isActive) || (statusFilter === 'inactive' && !isActive);
            }

            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, statusFilter, students]);

    // Get current students for pagination
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Count active students (active in the last 7 days)
    const activeStudentsCount = students.filter(s =>
        new Date(s.lastActive) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    // Calculate average progress
    const averageProgress = Math.round(
        students.reduce((acc, student) => acc + student.progress, 0) / students.length
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
                        Student Management
                    </h1>
                    <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                        View and manage your students
                    </p>
                </div>
                <Link href="/dashboard/lecturer/students/enrollments">
                    <Button
                        className={
                            theme === 'dark'
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                        }
                    >
                        <PlusCircle size={16} className="mr-2" /> Manage Enrollments
                    </Button>
                </Link>
            </div>

            {/* Stats Summary */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                            <Users size={20} />
                        </div>
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Students</div>
                            <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {students.length}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-600'}`}>
                            <Calendar size={20} />
                        </div>
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Active This Week</div>
                            <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {activeStudentsCount}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-600'}`}>
                            <BarChart2 size={20} />
                        </div>
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Average Progress</div>
                            <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {averageProgress}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className={`relative flex-1 max-w-md ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <input
                        type="text"
                        className={`pl-10 pr-4 py-2 w-full rounded-md border ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                            } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'}`}
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                        <Filter size={16} className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Status:</span>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className={`py-2 px-3 rounded-md border ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                            } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                            } [&>option]:text-black ${theme === 'dark' && '[&>option]:bg-gray-700 [&>option]:text-white'}`}
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Students Table */}
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className={theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}>
                        <tr>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Name
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Email
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Enrolled Courses
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Progress
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Last Active
                            </th>
                            <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className={`${theme === 'dark' ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}`}>
                        {currentStudents.length > 0 ? (
                            currentStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className={theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}
                                >
                                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        <div className="flex items-center">
                                            <div className={`h-10 w-10 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'} flex items-center justify-center`}>
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="ml-4">
                                                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                    {student.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                        <div className="flex items-center">
                                            <Mail size={14} className="mr-2" />
                                            {student.email}
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                        <div className="flex items-center">
                                            <BookOpen size={14} className="mr-2" />
                                            {student.enrolledCourses}
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                        <div className={`w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
                                            <div
                                                className={`h-2.5 rounded-full ${student.progress >= 75 ? 'bg-green-500' :
                                                    student.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${student.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} mt-1 block`}>
                                            {student.progress}%
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                        <div className="flex items-center">
                                            <Calendar size={14} className="mr-2" />
                                            {new Date(student.lastActive).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                                                >
                                                    <MoreHorizontal size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className={
                                                theme === 'dark'
                                                    ? 'bg-gray-800 border-gray-700 text-white'
                                                    : 'bg-white border-gray-200'
                                            }>
                                                <Link href={`/dashboard/lecturer/students/${student.id}`}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <User size={14} className="mr-2" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href={`/dashboard/lecturer/students/${student.id}/message`}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Mail size={14} className="mr-2" />
                                                        Send Message
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href={`/dashboard/lecturer/students/${student.id}/progress`}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <BarChart2 size={14} className="mr-2" />
                                                        View Progress
                                                    </DropdownMenuItem>
                                                </Link>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className={`px-6 py-12 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                                >
                                    <div className="flex flex-col items-center">
                                        <Users size={40} className="mb-2 opacity-40" />
                                        <p>No students found matching your criteria</p>
                                        {searchQuery && (
                                            <p className="mt-1">
                                                Try adjusting your search or filter
                                            </p>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className={`flex items-center justify-between py-3`}>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to{" "}
                        <span className="font-medium">
                            {indexOfLastStudent > filteredStudents.length ? filteredStudents.length : indexOfLastStudent}
                        </span>{" "}
                        of <span className="font-medium">{filteredStudents.length}</span> students
                    </div>
                    <div className="flex space-x-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                            disabled={currentPage === 1}
                            className={
                                currentPage === 1
                                    ? `${theme === 'dark' ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`
                            }
                        >
                            Previous
                        </Button>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <Button
                                key={index}
                                variant={currentPage === index + 1 ? "default" : "outline"}
                                size="sm"
                                onClick={() => paginate(index + 1)}
                                className={
                                    currentPage === index + 1
                                        ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-teal-600 text-white'}`
                                        : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`
                                }
                            >
                                {index + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                            disabled={currentPage === totalPages}
                            className={
                                currentPage === totalPages
                                    ? `${theme === 'dark' ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* Help section */}
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="flex items-center">
                    <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'} mr-3`}>
                        <Users size={16} />
                    </div>
                    <div>
                        <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Engage with your students
                        </h3>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Learn how to improve student engagement in our{' '}
                            <Link
                                href="/support/student-engagement"
                                className={theme === 'dark' ? 'text-blue-400' : 'text-teal-600'}
                            >
                                Lecturer Guide
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
