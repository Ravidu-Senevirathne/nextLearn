"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    UserPlus,
    MoreHorizontal,
    Users,
    GraduationCap,
    Calendar,
    ArrowUpDown,
    Download,
    Trash2,
    Edit,
    Eye,
    Mail
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
import { format } from "date-fns";

// Mock data for students
const mockStudents = [
    {
        id: 1,
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        studentId: "ST2023-45678",
        program: "Computer Science",
        year: "3rd Year",
        enrollmentDate: new Date(2021, 8, 1), // September 1, 2021
        status: "Active",
        courses: 4,
        progress: 75,
    },
    {
        id: 2,
        name: "Emma Davis",
        email: "emma.davis@example.com",
        studentId: "ST2022-34567",
        program: "Business Administration",
        year: "2nd Year",
        enrollmentDate: new Date(2022, 8, 1), // September 1, 2022
        status: "Active",
        courses: 5,
        progress: 62,
    },
    {
        id: 3,
        name: "Michael Brown",
        email: "michael.brown@example.com",
        studentId: "ST2021-23456",
        program: "Electrical Engineering",
        year: "4th Year",
        enrollmentDate: new Date(2020, 8, 1), // September 1, 2020
        status: "Active",
        courses: 3,
        progress: 92,
    },
    {
        id: 4,
        name: "Sophia Garcia",
        email: "sophia.garcia@example.com",
        studentId: "ST2023-56789",
        program: "Graphic Design",
        year: "1st Year",
        enrollmentDate: new Date(2023, 8, 1), // September 1, 2023
        status: "Active",
        courses: 6,
        progress: 28,
    },
    {
        id: 5,
        name: "William Taylor",
        email: "william.taylor@example.com",
        studentId: "ST2022-45678",
        program: "Psychology",
        year: "2nd Year",
        enrollmentDate: new Date(2022, 8, 1), // September 1, 2022
        status: "Inactive",
        courses: 0,
        progress: 0,
    },
    {
        id: 6,
        name: "Olivia Martinez",
        email: "olivia.martinez@example.com",
        studentId: "ST2021-34567",
        program: "Computer Science",
        year: "3rd Year",
        enrollmentDate: new Date(2021, 8, 1), // September 1, 2021
        status: "Active",
        courses: 5,
        progress: 85,
    },
    {
        id: 7,
        name: "James Wilson",
        email: "james.wilson@example.com",
        studentId: "ST2022-23456",
        program: "Mathematics",
        year: "2nd Year",
        enrollmentDate: new Date(2022, 8, 1), // September 1, 2022
        status: "Suspended",
        courses: 0,
        progress: 45,
    },
    {
        id: 8,
        name: "Ava Anderson",
        email: "ava.anderson@example.com",
        studentId: "ST2023-12345",
        program: "Biology",
        year: "1st Year",
        enrollmentDate: new Date(2023, 8, 1), // September 1, 2023
        status: "Active",
        courses: 6,
        progress: 32,
    },
];

// Academic programs for filtering
const programs = [
    "All Programs",
    "Computer Science",
    "Business Administration",
    "Electrical Engineering",
    "Graphic Design",
    "Psychology",
    "Mathematics",
    "Biology",
];

// Student years for filtering
const years = ["All Years", "1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function StudentsPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("All Programs");
    const [selectedYear, setSelectedYear] = useState("All Years");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        program: "",
        year: "",
    });

    const studentsPerPage = 5;

    // Filter and sort students
    const filteredStudents = mockStudents
        .filter((student) => {
            const matchesSearch =
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.studentId.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesProgram =
                selectedProgram === "All Programs" ||
                student.program === selectedProgram;

            const matchesYear =
                selectedYear === "All Years" || student.year === selectedYear;

            const matchesStatus =
                selectedStatus === "All" || student.status === selectedStatus;

            return matchesSearch && matchesProgram && matchesYear && matchesStatus;
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
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(
        indexOfFirstStudent,
        indexOfLastStudent
    );
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    // Reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedProgram("All Programs");
        setSelectedYear("All Years");
        setSelectedStatus("All");
        setCurrentPage(1);
    };

    // Handle adding a new student
    const handleAddStudent = () => {
        console.log("Adding new student:", newStudent);
        setIsAddDialogOpen(false);
        setNewStudent({
            name: "",
            email: "",
            program: "",
            year: "",
        });
        // In a real app, you would make an API call here
    };

    // Calculate statistics
    const statistics = {
        total: mockStudents.length,
        active: mockStudents.filter((s) => s.status === "Active").length,
        inactive: mockStudents.filter((s) => s.status === "Inactive").length,
        suspended: mockStudents.filter((s) => s.status === "Suspended").length,
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
            case "Active":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            case "Inactive":
                return theme === "dark"
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
            case "Suspended":
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
                    <h1 className="text-2xl font-bold">Student Management</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        View and manage all student accounts
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
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className={
                                    theme === "dark"
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-teal-600 hover:bg-teal-700 text-white"
                                }
                            >
                                <UserPlus size={16} className="mr-2" />
                                Add Student
                            </Button>
                        </DialogTrigger>
                        <DialogContent
                            className={
                                theme === "dark"
                                    ? "bg-gray-800 text-white border-gray-700"
                                    : ""
                            }
                        >
                            <DialogHeader>
                                <DialogTitle className={theme === "dark" ? "text-white" : ""}>
                                    Add New Student
                                </DialogTitle>
                                <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                                    Enter the student's information below.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className={theme === "dark" ? "text-white" : ""}>
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newStudent.name}
                                        onChange={(e) =>
                                            setNewStudent({ ...newStudent, name: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className={theme === "dark" ? "text-white" : ""}>
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newStudent.email}
                                        onChange={(e) =>
                                            setNewStudent({ ...newStudent, email: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="john.doe@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="program" className={theme === "dark" ? "text-white" : ""}>
                                        Program
                                    </Label>
                                    <select
                                        id="program"
                                        value={newStudent.program}
                                        onChange={(e) =>
                                            setNewStudent({ ...newStudent, program: e.target.value })
                                        }
                                        className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                                    >
                                        <option value="">Select a program</option>
                                        {programs.slice(1).map((program) => (
                                            <option key={program} value={program}>
                                                {program}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="year" className={theme === "dark" ? "text-white" : ""}>
                                        Year
                                    </Label>
                                    <select
                                        id="year"
                                        value={newStudent.year}
                                        onChange={(e) =>
                                            setNewStudent({ ...newStudent, year: e.target.value })
                                        }
                                        className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                                    >
                                        <option value="">Select a year</option>
                                        {years.slice(1).map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAddDialogOpen(false)}
                                    className={theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleAddStudent}
                                    className={
                                        theme === "dark"
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-teal-600 hover:bg-teal-700 text-white"
                                    }
                                    disabled={
                                        !newStudent.name ||
                                        !newStudent.email ||
                                        !newStudent.program ||
                                        !newStudent.year
                                    }
                                >
                                    Add Student
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"} mr-3`}>
                            <Users size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Students
                            </p>
                            <p className="text-2xl font-semibold">{statistics.total}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"} mr-3`}>
                            <GraduationCap size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Active Students
                            </p>
                            <p className="text-2xl font-semibold">{statistics.active}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-700"} mr-3`}>
                            <Users size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Inactive Students
                            </p>
                            <p className="text-2xl font-semibold">{statistics.inactive}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"} mr-3`}>
                            <Users size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Suspended Students
                            </p>
                            <p className="text-2xl font-semibold">{statistics.suspended}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={`p-4 rounded-lg border ${getCardStyle()} mb-6`}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-md border ${getInputStyle()}`}
                        />
                    </div>

                    <div>
                        <select
                            value={selectedProgram}
                            onChange={(e) => setSelectedProgram(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            {programs.map((program) => (
                                <option key={program} value={program}>
                                    {program}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Suspended">Suspended</option>
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

            {/* Students Table */}
            <div className={`rounded-lg border ${getCardStyle()} overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("name")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Name</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>ID & Email</span>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("program")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Program</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("enrollmentDate")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Enrollment</span>
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
                            {currentStudents.length > 0 ? (
                                currentStudents.map((student) => (
                                    <tr
                                        key={student.id}
                                        className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                                                    {student.name.split(" ").map(n => n[0]).join("")}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium">
                                                        {student.name}
                                                    </div>
                                                    <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                        {student.year}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm">{student.studentId}</div>
                                            <div className="text-sm flex items-center mt-1">
                                                <Mail size={14} className="mr-1 text-gray-400" />
                                                <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>{student.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm">{student.program}</div>
                                            <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {student.courses} courses
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm flex items-center">
                                                <Calendar size={14} className="mr-1 text-gray-400" />
                                                {format(student.enrollmentDate, "MMM d, yyyy")}
                                            </div>
                                            <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                Progress: {student.progress}%
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(student.status)}`}>
                                                {student.status}
                                            </span>
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
                                                        onClick={() => console.log(`View ${student.name}`)}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        <span>View Details</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center"
                                                        onClick={() => console.log(`Edit ${student.name}`)}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center text-red-600 dark:text-red-400"
                                                        onClick={() => console.log(`Delete ${student.name}`)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center">
                                        <Users size={40} className="mx-auto mb-2 text-gray-400" />
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                            No students found matching your criteria
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
                {filteredStudents.length > 0 && (
                    <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                            Showing <span className="font-medium">{indexOfFirstStudent + 1}</span>
                            {" "}-{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastStudent, filteredStudents.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredStudents.length}</span> students
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
        </div>
    );
}
