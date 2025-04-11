"use client";

import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useTheme } from "@/hooks/useTheme";
import {
    Search,
    UserPlus,
    Filter,
    MoreHorizontal,
    Users,
    ArrowUpDown,
    Calendar,
    CheckCircle,
    Trash2,
    Edit,
    Eye,
    BarChart2
} from "lucide-react";
import { Input } from "@/Components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the form schema for enrollment
const formSchema = z.object({
    student: z.string().min(1, { message: "Student is required" }),
    course: z.string().min(1, { message: "Course is required" }),
    enrollmentDate: z.string().min(1, { message: "Enrollment date is required" }),
});

// Define the type for form data
type FormData = z.infer<typeof formSchema>;

// Define a proper type for the enrollment objects
type Enrollment = {
    id: number;
    student: string;
    course: string;
    status: string;
    enrollmentDate: Date;
    progress: number;
    [key: string]: any; // This allows string indexing
};

// Mock data for enrollments
const mockEnrollments = [
    {
        id: 1,
        student: "John Doe",
        course: "Introduction to Web Development",
        status: "Active",
        enrollmentDate: new Date(2023, 6, 15),
        progress: 45,
    },
    {
        id: 2,
        student: "Jane Smith",
        course: "Advanced JavaScript",
        status: "Active",
        enrollmentDate: new Date(2023, 7, 20),
        progress: 78,
    },
    {
        id: 3,
        student: "Bob Johnson",
        course: "React Fundamentals",
        status: "Completed",
        enrollmentDate: new Date(2023, 5, 10),
        progress: 100,
    },
    {
        id: 4,
        student: "Alice Williams",
        course: "Database Design",
        status: "Inactive",
        enrollmentDate: new Date(2023, 8, 5),
        progress: 12,
    },
    {
        id: 5,
        student: "Charlie Brown",
        course: "UI/UX Design Principles",
        status: "Active",
        enrollmentDate: new Date(2023, 7, 25),
        progress: 67,
    },
];

// Mock data for students
const mockStudents = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Bob Johnson" },
    { id: "4", name: "Alice Williams" },
    { id: "5", name: "Charlie Brown" },
];

// Mock data for courses
const mockCourses = [
    { id: "1", title: "Introduction to Web Development" },
    { id: "2", title: "Advanced JavaScript" },
    { id: "3", title: "React Fundamentals" },
    { id: "4", title: "Database Design" },
    { id: "5", title: "UI/UX Design Principles" },
];

export default function EnrollmentsPage() {
    const { theme } = useTheme();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('All Courses');
    const [selectedStatus, setSelectedStatus] = useState('All Statuses');
    const [sortField, setSortField] = useState('student');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([]);
    const [enrollments] = useState(mockEnrollments);

    // Theme-based styling functions
    const getCardStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-800 border-gray-700 text-gray-100'
            : '';
    };

    const getInputStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400'
            : '';
    };

    const getDropdownStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-gray-100'
            : '';
    };

    const getButtonPrimaryStyle = () => {
        return theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-teal-600 hover:bg-teal-700';
    };

    const getButtonSecondaryStyle = () => {
        return theme === 'dark'
            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
            : '';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return theme === 'dark'
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            case "Completed":
                return theme === 'dark'
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            case "Inactive":
                return theme === 'dark'
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
            default:
                return theme === 'dark'
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
        }
    };

    const getTableHeaderStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-800 text-gray-300'
            : 'bg-gray-100 text-gray-600';
    };

    const getTableRowStyle = (index: number) => {
        const alternating = index % 2 === 0;
        return theme === 'dark'
            ? alternating ? 'bg-gray-800' : 'bg-gray-750'
            : alternating ? 'bg-white' : 'bg-gray-50';
    };

    const getTableBorderStyle = () => {
        return theme === 'dark'
            ? 'border-gray-700'
            : 'border-gray-200';
    };

    // Initialize the form with react-hook-form
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            student: "",
            course: "",
            enrollmentDate: new Date().toISOString().split('T')[0],
        },
    });

    // Handle form submission
    const onSubmit = (values: FormData) => {
        console.log(values);
        setIsDialogOpen(false);
        form.reset();
        // Here you would typically send the data to your backend
    };

    // Apply filters and sorting to the enrollments data
    useEffect(() => {
        let result = [...enrollments] as Enrollment[];

        // Apply search filter
        if (searchQuery) {
            result = result.filter(
                (enrollment) =>
                    enrollment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    enrollment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    enrollment.status.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply course filter
        if (selectedCategory !== 'All Courses') {
            const selectedCourse = mockCourses.find(course => course.id === selectedCategory)?.title;
            if (selectedCourse) {
                result = result.filter(enrollment => enrollment.course === selectedCourse);
            }
        }

        // Apply status filter
        if (selectedStatus !== 'All Statuses') {
            result = result.filter(enrollment => enrollment.status === selectedStatus);
        }

        // Apply sorting
        result.sort((a, b) => {
            // Handle each property specifically to avoid type errors
            if (sortField === 'student') {
                return sortDirection === 'asc'
                    ? a.student.localeCompare(b.student)
                    : b.student.localeCompare(a.student);
            }
            else if (sortField === 'course') {
                return sortDirection === 'asc'
                    ? a.course.localeCompare(b.course)
                    : b.course.localeCompare(a.course);
            }
            else if (sortField === 'status') {
                return sortDirection === 'asc'
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status);
            }
            else if (sortField === 'enrollmentDate') {
                return sortDirection === 'asc'
                    ? a.enrollmentDate.getTime() - b.enrollmentDate.getTime()
                    : b.enrollmentDate.getTime() - a.enrollmentDate.getTime();
            }
            else if (sortField === 'progress') {
                return sortDirection === 'asc'
                    ? a.progress - b.progress
                    : b.progress - a.progress;
            }
            return 0;
        });

        setFilteredEnrollments(result);
    }, [searchQuery, selectedCategory, selectedStatus, sortField, sortDirection]);

    return (
        <div className={`p-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Student Enrollments</h1>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Manage student enrollments, track progress and update statuses
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className={`mt-4 md:mt-0 px-4 py-2 rounded-md font-medium flex items-center ${getButtonPrimaryStyle()}`}>
                            <UserPlus size={18} className="mr-2" />
                            New Enrollment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className={`sm:max-w-[425px] ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : ''}`}>
                        <DialogHeader>
                            <DialogTitle className={theme === 'dark' ? 'text-white' : ''}>Create New Enrollment</DialogTitle>
                            <DialogDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                                Enroll a student in one of your courses
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                                <FormField
                                    control={form.control}
                                    name="student"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={theme === 'dark' ? 'text-gray-200' : ''}>Student</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className={getDropdownStyle()}>
                                                        <SelectValue placeholder="Select student" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : ''}>
                                                    {mockStudents.map(student => (
                                                        <SelectItem key={student.id} value={student.id}>
                                                            {student.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="course"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={theme === 'dark' ? 'text-gray-200' : ''}>Course</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className={getDropdownStyle()}>
                                                        <SelectValue placeholder="Select course" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : ''}>
                                                    {mockCourses.map(course => (
                                                        <SelectItem key={course.id} value={course.id}>
                                                            {course.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="enrollmentDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={theme === 'dark' ? 'text-gray-200' : ''}>Enrollment Date</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Calendar size={16} className="mr-2 text-gray-500" />
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        className={`w-full ${getInputStyle()}`}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter className="pt-4">
                                    <Button
                                        type="submit"
                                        className={getButtonPrimaryStyle()}
                                    >
                                        Create Enrollment
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters and Search */}
            <div className={`${getCardStyle()} rounded-lg mb-6`}>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search enrollments..."
                                className={`${getInputStyle()} pl-10 pr-4 py-2 rounded-md w-full border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Course Filter */}
                        <div>
                            <select
                                className={`${getDropdownStyle()} px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="All Courses">All Courses</option>
                                {mockCourses.map(course => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <select
                                className={`${getDropdownStyle()} px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="All Statuses">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Filter Button */}
                        <div className="flex space-x-2">
                            <button className={`${getButtonSecondaryStyle()} border px-4 py-2 rounded-md font-medium flex items-center flex-1 justify-center`}>
                                <Filter size={18} className="mr-2" />
                                More Filters
                            </button>
                            <button
                                className={`${getButtonSecondaryStyle()} border px-3 py-2 rounded-md font-medium`}
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All Courses');
                                    setSelectedStatus('All Statuses');
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enrollments Table */}
            <div className={`${getCardStyle()} rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-gray-800' : 'border-slate-200'}`}>
                <div className="overflow-x-auto">
                    <table className={`min-w-full divide-y ${getTableBorderStyle()}`}>
                        <thead className={getTableHeaderStyle()}>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => {
                                            if (sortField === 'student') {
                                                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                                            } else {
                                                setSortField('student');
                                                setSortDirection('asc');
                                            }
                                        }}
                                    >
                                        <span>Student</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => {
                                            if (sortField === 'course') {
                                                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                                            } else {
                                                setSortField('course');
                                                setSortDirection('asc');
                                            }
                                        }}
                                    >
                                        <span>Course</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => {
                                            if (sortField === 'enrollmentDate') {
                                                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                                            } else {
                                                setSortField('enrollmentDate');
                                                setSortDirection('asc');
                                            }
                                        }}
                                    >
                                        <span>Date</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => {
                                            if (sortField === 'status') {
                                                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                                            } else {
                                                setSortField('status');
                                                setSortDirection('asc');
                                            }
                                        }}
                                    >
                                        <span>Status</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <button
                                        className="flex items-center space-x-1"
                                        onClick={() => {
                                            if (sortField === 'progress') {
                                                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                                            } else {
                                                setSortField('progress');
                                                setSortDirection('asc');
                                            }
                                        }}
                                    >
                                        <span>Progress</span>
                                        <ArrowUpDown size={14} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${getTableBorderStyle()}`}>
                            {filteredEnrollments.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center">
                                        <div className="flex flex-col items-center">
                                            <Users size={40} className="mb-2 text-gray-400" />
                                            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                No enrollments found matching your criteria
                                            </p>
                                            <button
                                                className="mt-4 text-blue-500 hover:text-blue-600"
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setSelectedCategory('All Courses');
                                                    setSelectedStatus('All Statuses');
                                                }}
                                            >
                                                Reset filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredEnrollments.map((enrollment, index) => (
                                    <tr key={enrollment.id} className={getTableRowStyle(index)}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
                                                    <Users size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium">{enrollment.student}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {enrollment.course}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {format(enrollment.enrollmentDate, "MMM d, yyyy")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                                                {enrollment.status === 'Active' && <CheckCircle className="w-3 h-3 mr-1 inline" />}
                                                {enrollment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <span className="text-sm mr-2">{enrollment.progress}%</span>
                                                    <BarChart2 size={16} className="text-gray-400" />
                                                </div>
                                                <div className={`w-24 h-1.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                                                    <div
                                                        className="h-full bg-blue-500 rounded-full"
                                                        style={{ width: `${enrollment.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                                                    <Eye size={16} className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'} />
                                                </button>
                                                <button className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                                                    <Edit size={16} className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'} />
                                                </button>
                                                <button className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                                                    <Trash2 size={16} className="text-red-500 hover:text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className={`px-6 py-4 flex items-center justify-between ${theme === 'dark' ? 'border-t border-gray-800 bg-gray-800' : 'border-t border-gray-200 bg-white'}`}>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Showing {filteredEnrollments.length} of {enrollments.length} enrollments
                    </div>
                    <div className="flex space-x-2">
                        <button disabled className={`px-3 py-1 rounded-md ${getButtonSecondaryStyle()} border opacity-50`}>
                            Previous
                        </button>
                        <button className={`px-3 py-1 rounded-md ${getButtonPrimaryStyle()}`}>
                            1
                        </button>
                        <button className={`px-3 py-1 rounded-md ${getButtonSecondaryStyle()} border`}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
