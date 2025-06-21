"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    PlusCircle,
    MoreHorizontal,
    Layers,
    Bookmark,
    Calendar,
    ArrowUpDown,
    Download,
    Trash2,
    Edit,
    Eye,
    BookOpen,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    ThumbsUp,
    ThumbsDown,
    User
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { format } from "date-fns";

// Mock data for courses pending approval
const mockCourses = [
    {
        id: 101,
        title: "Advanced React Patterns",
        slug: "advanced-react-patterns",
        instructorName: "Jane Smith",
        instructorId: 5,
        category: "Web Development",
        price: 49.99,
        level: "Advanced",
        description: "Master advanced React patterns and techniques to build scalable applications",
        thumbnail: "/course-images/react-advanced.jpg",
        submittedAt: new Date(2023, 10, 15),
        status: "Pending",
        duration: "10 hours",
        lectures: 45
    },
    {
        id: 102,
        title: "Data Visualization with D3.js",
        slug: "data-visualization-d3js",
        instructorName: "Michael Johnson",
        instructorId: 8,
        category: "Data Science",
        price: 59.99,
        level: "Intermediate",
        description: "Learn to create stunning data visualizations using D3.js and JavaScript",
        thumbnail: "/course-images/d3js.jpg",
        submittedAt: new Date(2023, 10, 18),
        status: "Pending",
        duration: "8 hours",
        lectures: 32
    },
    {
        id: 103,
        title: "iOS App Development with SwiftUI",
        slug: "ios-app-development-swiftui",
        instructorName: "Emily Chen",
        instructorId: 12,
        category: "Mobile Development",
        price: 69.99,
        level: "Intermediate",
        description: "Build modern iOS apps using SwiftUI framework",
        thumbnail: "/course-images/swiftui.jpg",
        submittedAt: new Date(2023, 10, 20),
        status: "Pending",
        duration: "12 hours",
        lectures: 55
    },
    {
        id: 104,
        title: "Machine Learning for Beginners",
        slug: "machine-learning-beginners",
        instructorName: "David Wilson",
        instructorId: 7,
        category: "Data Science",
        price: 54.99,
        level: "Beginner",
        description: "Introduction to machine learning concepts and algorithms",
        thumbnail: "/course-images/ml-intro.jpg",
        submittedAt: new Date(2023, 10, 12),
        status: "Approved",
        duration: "15 hours",
        lectures: 62,
        approvedAt: new Date(2023, 10, 16),
        approvedBy: "Admin User"
    },
    {
        id: 105,
        title: "Python for Data Analysis",
        slug: "python-data-analysis",
        instructorName: "Sarah Jackson",
        instructorId: 9,
        category: "Data Science",
        price: 49.99,
        level: "Intermediate",
        description: "Use Python to analyze and visualize complex datasets",
        thumbnail: "/course-images/python-data.jpg",
        submittedAt: new Date(2023, 10, 8),
        status: "Rejected",
        duration: "9 hours",
        lectures: 38,
        rejectedAt: new Date(2023, 10, 11),
        rejectedBy: "Admin User",
        rejectionReason: "Content overlaps with existing courses. Please revise to add more unique material."
    },
    {
        id: 106,
        title: "Blockchain Development",
        slug: "blockchain-development",
        instructorName: "Robert Lee",
        instructorId: 15,
        category: "Blockchain",
        price: 79.99,
        level: "Advanced",
        description: "Learn blockchain development and create your own cryptocurrency",
        thumbnail: "/course-images/blockchain.jpg",
        submittedAt: new Date(2023, 10, 19),
        status: "Pending",
        duration: "18 hours",
        lectures: 72
    },
    {
        id: 107,
        title: "UX Research Methods",
        slug: "ux-research-methods",
        instructorName: "Lisa Brown",
        instructorId: 11,
        category: "UI/UX Design",
        price: 44.99,
        level: "Intermediate",
        description: "Master user experience research methods and techniques",
        thumbnail: "/course-images/ux-research.jpg",
        submittedAt: new Date(2023, 10, 10),
        status: "Approved",
        duration: "7 hours",
        lectures: 28,
        approvedAt: new Date(2023, 10, 14),
        approvedBy: "Admin User"
    },
    {
        id: 108,
        title: "Cybersecurity Fundamentals",
        slug: "cybersecurity-fundamentals",
        instructorName: "Kevin Martinez",
        instructorId: 18,
        category: "Cybersecurity",
        price: 64.99,
        level: "Beginner",
        description: "Learn the basics of cybersecurity and protect against threats",
        thumbnail: "/course-images/cybersecurity.jpg",
        submittedAt: new Date(2023, 10, 5),
        status: "Rejected",
        duration: "11 hours",
        lectures: 42,
        rejectedAt: new Date(2023, 10, 9),
        rejectedBy: "Admin User",
        rejectionReason: "Course content needs more practical examples and hands-on exercises."
    },
];

export default function ApprovalsPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortField, setSortField] = useState("submittedAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");

    const coursesPerPage = 5;

    // Filter and sort courses
    const filteredCourses = mockCourses
        .filter((course) => {
            const matchesSearch =
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.category.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                selectedStatus === "All" || course.status === selectedStatus;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortDirection === "asc") {
                if (typeof aValue === "string" && typeof bValue === "string") {
                    return aValue.localeCompare(bValue);
                }
                return aValue - bValue;
            } else {
                if (typeof aValue === "string" && typeof bValue === "string") {
                    return bValue.localeCompare(aValue);
                }
                return bValue - aValue;
            }
        });

    // Pagination
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(
        indexOfFirstCourse,
        indexOfLastCourse
    );
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    // Reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedStatus("All");
        setCurrentPage(1);
    };

    // Handle course approval
    const handleApprove = () => {
        console.log(`Approving course: ${selectedCourse.title}`);
        setIsReviewDialogOpen(false);
        // In a real app, you would make an API call here
    };

    // Handle course rejection
    const handleReject = () => {
        console.log(`Rejecting course: ${selectedCourse.title}, Reason: ${rejectionReason}`);
        setIsReviewDialogOpen(false);
        setRejectionReason("");
        // In a real app, you would make an API call here
    };

    // Open review dialog
    const openReviewDialog = (course) => {
        setSelectedCourse(course);
        setIsReviewDialogOpen(true);
    };

    // Calculate statistics
    const statistics = {
        total: mockCourses.length,
        pending: mockCourses.filter((c) => c.status === "Pending").length,
        approved: mockCourses.filter((c) => c.status === "Approved").length,
        rejected: mockCourses.filter((c) => c.status === "Rejected").length,
    };

    // Helper functions for theme-specific styling
    const getCardStyle = () => {
        return theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200";
    };

    const getInputStyle = () => {
        return theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return theme === "dark"
                    ? "bg-yellow-900/30 text-yellow-400"
                    : "bg-yellow-100 text-yellow-800";
            case "Approved":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            case "Rejected":
                return theme === "dark"
                    ? "bg-red-900/30 text-red-400"
                    : "bg-red-100 text-red-800";
            default:
                return theme === "dark"
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Course Approvals</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Review and manage course submissions from instructors
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => { }}
                    >
                        <Download size={16} />
                        Export
                    </Button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"} mr-3`}>
                            <Layers size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Submissions
                            </p>
                            <p className="text-2xl font-semibold">{statistics.total}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-700"} mr-3`}>
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Pending Review
                            </p>
                            <p className="text-2xl font-semibold">{statistics.pending}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"} mr-3`}>
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Approved
                            </p>
                            <p className="text-2xl font-semibold">{statistics.approved}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"} mr-3`}>
                            <XCircle size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Rejected
                            </p>
                            <p className="text-2xl font-semibold">{statistics.rejected}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={`p-4 rounded-lg border ${getCardStyle()} mb-6`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search courses or instructors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-md border ${getInputStyle()}`}
                        />
                    </div>

                    <div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <Button
                            variant="outline"
                            onClick={resetFilters}
                            className="w-full"
                        >
                            Reset Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Courses Table */}
            <div className={`rounded-lg border ${getCardStyle()} overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("title")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Course</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("instructorName")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Instructor</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("submittedAt")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Submitted</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Status</span>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
                            {currentCourses.length > 0 ? (
                                currentCourses.map((course) => (
                                    <tr
                                        key={course.id}
                                        className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div
                                                    className="h-12 w-16 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
                                                >
                                                    <BookOpen className="text-gray-500" size={20} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium">
                                                        {course.title}
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <span className={`mr-3 px-2 py-1 text-xs rounded-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                                            {course.category}
                                                        </span>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                                            {course.level}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <User size={16} className={`mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                                <span className="text-sm font-medium">{course.instructorName}</span>
                                            </div>
                                            <div className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {course.lectures} lectures · {course.duration}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm flex items-center">
                                                <Calendar size={14} className="mr-1 text-gray-400" />
                                                {format(course.submittedAt, "MMM d, yyyy")}
                                            </div>
                                            <div className="text-sm mt-1 flex items-center">
                                                <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    ${course.price.toFixed(2)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(course.status)}`}>
                                                {course.status}
                                            </span>
                                            {course.status === "Rejected" && (
                                                <div className="text-xs mt-1 text-red-500 max-w-[200px] truncate" title={course.rejectionReason}>
                                                    {course.rejectionReason}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center"
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        <span>Preview Course</span>
                                                    </DropdownMenuItem>

                                                    {course.status === "Pending" && (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer flex items-center"
                                                            onClick={() => openReviewDialog(course)}
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            <span>Review</span>
                                                        </DropdownMenuItem>
                                                    )}

                                                    {course.status === "Approved" && (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer flex items-center text-amber-600 dark:text-amber-400"
                                                            onClick={() => openReviewDialog(course)}
                                                        >
                                                            <AlertTriangle className="mr-2 h-4 w-4" />
                                                            <span>Revoke Approval</span>
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center">
                                        <BookOpen size={40} className="mx-auto mb-2 text-gray-400" />
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                            No courses found matching your criteria
                                        </p>
                                        <Button
                                            variant="link"
                                            onClick={resetFilters}
                                            className="mt-2"
                                        >
                                            Reset Filters
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredCourses.length > 0 && (
                    <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                            Showing <span className="font-medium">{indexOfFirstCourse + 1}</span>
                            {" "}-{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastCourse, filteredCourses.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredCourses.length}</span> courses
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                                disabled={currentPage === 1}
                                className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                            >
                                Previous
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    onClick={() => setCurrentPage(page)}
                                    className={currentPage === page ? (theme === "dark" ? "bg-blue-600" : "bg-teal-600") : ""}
                                >
                                    {page}
                                </Button>
                            ))}
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                disabled={currentPage === totalPages}
                                className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Review Dialog */}
            {selectedCourse && (
                <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                    <DialogContent
                        className={
                            theme === "dark"
                                ? "bg-gray-800 text-white border-gray-700"
                                : ""
                        }
                    >
                        <DialogHeader>
                            <DialogTitle className={theme === "dark" ? "text-white" : ""}>
                                Review Course Submission
                            </DialogTitle>
                            <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                                {selectedCourse.title} by {selectedCourse.instructorName}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label className={theme === "dark" ? "text-white" : ""}>
                                    Course Details
                                </Label>
                                <div className={`p-3 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                                        <div>
                                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Category:</span> {selectedCourse.category}
                                        </div>
                                        <div>
                                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Level:</span> {selectedCourse.level}
                                        </div>
                                        <div>
                                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Price:</span> ${selectedCourse.price.toFixed(2)}
                                        </div>
                                        <div>
                                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Duration:</span> {selectedCourse.duration}
                                        </div>
                                    </div>
                                    <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                                        {selectedCourse.description}
                                    </p>
                                </div>
                            </div>

                            {selectedCourse.status === "Pending" && (
                                <div className="space-y-2">
                                    <Label htmlFor="rejectionReason" className={theme === "dark" ? "text-white" : ""}>
                                        Rejection Reason (optional for approval)
                                    </Label>
                                    <Textarea
                                        id="rejectionReason"
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        className={getInputStyle()}
                                        placeholder="Explain why this course is being rejected..."
                                        rows={3}
                                    />
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsReviewDialogOpen(false)}
                                className={theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}
                            >
                                Cancel
                            </Button>

                            {selectedCourse.status === "Pending" && (
                                <>
                                    <Button
                                        onClick={handleReject}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                        disabled={false}
                                    >
                                        <ThumbsDown className="mr-2 h-4 w-4" />
                                        Reject
                                    </Button>
                                    <Button
                                        onClick={handleApprove}
                                        className={
                                            theme === "dark"
                                                ? "bg-green-600 hover:bg-green-700 text-white"
                                                : "bg-green-600 hover:bg-green-700 text-white"
                                        }
                                    >
                                        <ThumbsUp className="mr-2 h-4 w-4" />
                                        Approve
                                    </Button>
                                </>
                            )}

                            {selectedCourse.status === "Approved" && (
                                <Button
                                    onClick={() => {
                                        console.log(`Revoking approval for course: ${selectedCourse.title}`);
                                        setIsReviewDialogOpen(false);
                                    }}
                                    className="bg-amber-600 hover:bg-amber-700 text-white"
                                >
                                    Revoke Approval
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
