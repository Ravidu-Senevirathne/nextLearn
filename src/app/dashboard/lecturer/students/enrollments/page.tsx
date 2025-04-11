"use client";

import React, { useState } from 'react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Search, Filter, Download, UserPlus } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

// Mock data for enrollments
const mockEnrollments = [
    {
        id: 1,
        studentId: "ST001",
        studentName: "Alice Johnson",
        courseTitle: "Introduction to Web Development",
        courseCode: "WEB101",
        enrollmentDate: "2023-09-01",
        status: "active"
    },
    {
        id: 2,
        studentId: "ST002",
        studentName: "Bob Smith",
        courseTitle: "Advanced JavaScript",
        courseCode: "JS202",
        enrollmentDate: "2023-09-02",
        status: "active"
    },
    {
        id: 3,
        studentId: "ST003",
        studentName: "Carol Williams",
        courseTitle: "Database Systems",
        courseCode: "DB101",
        enrollmentDate: "2023-09-03",
        status: "pending"
    },
    {
        id: 4,
        studentId: "ST004",
        studentName: "David Brown",
        courseTitle: "Introduction to Web Development",
        courseCode: "WEB101",
        enrollmentDate: "2023-08-28",
        status: "inactive"
    },
    {
        id: 5,
        studentId: "ST005",
        studentName: "Eva Davis",
        courseTitle: "Mobile App Development",
        courseCode: "MOB301",
        enrollmentDate: "2023-09-05",
        status: "active"
    },
    {
        id: 6,
        studentId: "ST006",
        studentName: "Frank Miller",
        courseTitle: "Data Structures and Algorithms",
        courseCode: "DSA201",
        enrollmentDate: "2023-09-04",
        status: "pending"
    },
    {
        id: 7,
        studentId: "ST007",
        studentName: "Grace Wilson",
        courseTitle: "Advanced JavaScript",
        courseCode: "JS202",
        enrollmentDate: "2023-08-30",
        status: "active"
    },
];

// Status badge styling
const getStatusBadgeStyle = (status: string, theme: string) => {
    switch (status.toLowerCase()) {
        case 'active':
            return theme === 'dark'
                ? 'bg-green-900/30 text-green-300 hover:bg-green-900/50'
                : 'bg-green-100 text-green-800 hover:bg-green-200';
        case 'pending':
            return theme === 'dark'
                ? 'bg-yellow-900/30 text-yellow-300 hover:bg-yellow-900/50'
                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
        case 'inactive':
            return theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        default:
            return theme === 'dark'
                ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    }
};

export default function EnrollmentsPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [courseFilter, setCourseFilter] = useState('all');

    // Get unique course options for filter
    const courseOptions = Array.from(
        new Set(mockEnrollments.map(enrollment => enrollment.courseCode))
    ).map(code => {
        const course = mockEnrollments.find(e => e.courseCode === code);
        return {
            code,
            title: course ? course.courseTitle : ''
        };
    });

    // Filter enrollments based on search and filters
    const filteredEnrollments = mockEnrollments.filter(enrollment => {
        // Search term filter
        const matchesSearch =
            enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enrollment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enrollment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enrollment.courseCode.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const matchesStatus =
            statusFilter === 'all' || enrollment.status === statusFilter;

        // Course filter
        const matchesCourse =
            courseFilter === 'all' || enrollment.courseCode === courseFilter;

        return matchesSearch && matchesStatus && matchesCourse;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    Student Enrollments
                </h1>
                <Button
                    variant="outline"
                    className={theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : ''}
                >
                    <UserPlus className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-gray-300' : ''}`} />
                    New Enrollment
                </Button>
            </div>

            <Card className={`mb-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader className={theme === 'dark' ? 'text-gray-200' : ''}>
                    <CardTitle className={theme === 'dark' ? 'text-gray-100' : ''}>
                        Enrollment Management
                    </CardTitle>
                    <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                        Manage student enrollments across your courses
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-grow">
                            <Search className={`absolute left-2.5 top-2.5 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            <Input
                                placeholder="Search by student name, ID, course..."
                                className={`pl-8 ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400'
                                    : ''}`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2">
                            <Filter className={`h-4 w-4 mt-3 ${theme === 'dark' ? 'text-gray-400' : ''}`} />

                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger className={`w-[140px] ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                                    : ''}`}>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className={theme === 'dark'
                                    ? 'bg-gray-800 border-gray-700 text-gray-200'
                                    : ''}>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={courseFilter}
                                onValueChange={setCourseFilter}
                            >
                                <SelectTrigger className={`w-[180px] ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                                    : ''}`}>
                                    <SelectValue placeholder="Course" />
                                </SelectTrigger>
                                <SelectContent className={theme === 'dark'
                                    ? 'bg-gray-800 border-gray-700 text-gray-200'
                                    : ''}>
                                    <SelectItem value="all">All Courses</SelectItem>
                                    {courseOptions.map(course => (
                                        <SelectItem key={course.code} value={course.code}>
                                            {course.code}: {course.title.substring(0, 15)}...
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                variant="outline"
                                size="icon"
                                className={theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : ''}
                            >
                                <Download className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-300' : ''}`} />
                            </Button>
                        </div>
                    </div>

                    <div className={`rounded-md border ${theme === 'dark' ? 'border-gray-700' : ''}`}>
                        <Table>
                            <TableHeader className={theme === 'dark' ? 'bg-gray-700/50' : ''}>
                                <TableRow className={theme === 'dark' ? 'hover:bg-gray-700/50 border-gray-700' : ''}>
                                    <TableHead className={`w-[100px] ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                                        Student ID
                                    </TableHead>
                                    <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>
                                        Student Name
                                    </TableHead>
                                    <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>
                                        Course
                                    </TableHead>
                                    <TableHead className={`w-[120px] ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                                        Enrollment Date
                                    </TableHead>
                                    <TableHead className={`w-[100px] ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                                        Status
                                    </TableHead>
                                    <TableHead className={`text-right ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEnrollments.length > 0 ? (
                                    filteredEnrollments.map((enrollment) => (
                                        <TableRow
                                            key={enrollment.id}
                                            className={theme === 'dark' ? 'hover:bg-gray-700/50 border-gray-700' : ''}
                                        >
                                            <TableCell className={`font-medium ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                                                {enrollment.studentId}
                                            </TableCell>
                                            <TableCell className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                {enrollment.studentName}
                                            </TableCell>
                                            <TableCell>
                                                <div className={`font-medium ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                                                    {enrollment.courseTitle}
                                                </div>
                                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {enrollment.courseCode}
                                                </div>
                                            </TableCell>
                                            <TableCell className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                {enrollment.enrollmentDate}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatusBadgeStyle(enrollment.status, theme)}
                                                    variant="outline"
                                                >
                                                    {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : ''}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={theme === 'dark'
                                                        ? 'text-red-400 hover:text-red-300 hover:bg-gray-700'
                                                        : 'text-red-500 hover:text-red-700'}
                                                >
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                                        <TableCell
                                            colSpan={6}
                                            className={`h-24 text-center ${theme === 'dark' ? 'text-gray-400' : ''}`}
                                        >
                                            No enrollments found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
                <CardHeader className={theme === 'dark' ? 'text-gray-200' : ''}>
                    <CardTitle className={theme === 'dark' ? 'text-gray-100' : ''}>
                        Enrollment Statistics
                    </CardTitle>
                    <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                        Overview of enrollment status across courses
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={theme === 'dark'
                            ? 'bg-green-900/20 p-4 rounded-md border border-green-900/30'
                            : 'bg-green-50 p-4 rounded-md border border-green-100'}>
                            <div className={theme === 'dark'
                                ? 'text-green-300 text-sm font-medium'
                                : 'text-green-600 text-sm font-medium'}>
                                Active Enrollments
                            </div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : ''}`}>
                                {mockEnrollments.filter(e => e.status === 'active').length}
                            </div>
                        </div>
                        <div className={theme === 'dark'
                            ? 'bg-yellow-900/20 p-4 rounded-md border border-yellow-900/30'
                            : 'bg-yellow-50 p-4 rounded-md border border-yellow-100'}>
                            <div className={theme === 'dark'
                                ? 'text-yellow-300 text-sm font-medium'
                                : 'text-yellow-600 text-sm font-medium'}>
                                Pending Enrollments
                            </div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : ''}`}>
                                {mockEnrollments.filter(e => e.status === 'pending').length}
                            </div>
                        </div>
                        <div className={theme === 'dark'
                            ? 'bg-gray-800 p-4 rounded-md border border-gray-700'
                            : 'bg-gray-50 p-4 rounded-md border border-gray-100'}>
                            <div className={theme === 'dark'
                                ? 'text-gray-300 text-sm font-medium'
                                : 'text-gray-600 text-sm font-medium'}>
                                Inactive Enrollments
                            </div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : ''}`}>
                                {mockEnrollments.filter(e => e.status === 'inactive').length}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
