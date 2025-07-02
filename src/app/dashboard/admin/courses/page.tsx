'use client';

import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow
} from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from '@/Components/ui/dropdown-menu';
import { Badge } from '@/Components/ui/badge';

export default function CoursesManagement() {
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data - replace with API call
    const courses = [
        { id: 1, title: 'Introduction to React', instructor: 'Jane Smith', category: 'Web Development', students: 156, status: 'Published' },
        { id: 2, title: 'Advanced JavaScript', instructor: 'John Doe', category: 'Programming', students: 89, status: 'Published' },
        { id: 3, title: 'UX Design Principles', instructor: 'Alice Brown', category: 'Design', students: 212, status: 'Draft' },
        { id: 4, title: 'Python for Data Science', instructor: 'Bob Johnson', category: 'Data Science', students: 178, status: 'Published' },
        { id: 5, title: 'Machine Learning Basics', instructor: 'Tom Wilson', category: 'AI', students: 94, status: 'Review' },
    ];

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Course Management</h1>
                <Button>Add New Course</Button>
            </div>

            <div className="mb-6">
                <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCourses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.title}</TableCell>
                                <TableCell>{course.instructor}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{course.category}</Badge>
                                </TableCell>
                                <TableCell>{course.students}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${course.status === 'Published'
                                            ? 'bg-green-100 text-green-800'
                                            : course.status === 'Draft'
                                                ? 'bg-gray-100 text-gray-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {course.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">Actions</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>View Enrollments</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
