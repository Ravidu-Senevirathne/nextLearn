"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    UserPlus,
    MoreHorizontal,
    Users,
    BookOpen,
    Calendar,
    ArrowUpDown,
    Download,
    Trash2,
    Edit,
    Eye,
    Mail,
    GraduationCap,
    BookText,
    Star
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

// Mock data for lecturers
const mockLecturers = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@example.com",
        lecturerId: "LC2021-1234",
        department: "Computer Science",
        position: "Associate Professor",
        joinDate: new Date(2021, 5, 15), // June 15, 2021
        status: "Active",
        coursesCount: 5,
        studentsCount: 120,
        rating: 4.8,
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        email: "michael.chen@example.com",
        lecturerId: "LC2019-5678",
        department: "Mathematics",
        position: "Professor",
        joinDate: new Date(2019, 7, 10), // August 10, 2019
        status: "Active",
        coursesCount: 3,
        studentsCount: 85,
        rating: 4.6,
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        lecturerId: "LC2022-9012",
        department: "Business Administration",
        position: "Assistant Professor",
        joinDate: new Date(2022, 1, 5), // February 5, 2022
        status: "Active",
        coursesCount: 4,
        studentsCount: 110,
        rating: 4.7,
    },
    {
        id: 4,
        name: "Dr. James Wilson",
        email: "james.wilson@example.com",
        lecturerId: "LC2020-3456",
        department: "Physics",
        position: "Professor",
        joinDate: new Date(2020, 8, 1), // September 1, 2020
        status: "On Leave",
        coursesCount: 0,
        studentsCount: 0,
        rating: 4.9,
    },
    {
        id: 5,
        name: "Prof. Lisa Thompson",
        email: "lisa.thompson@example.com",
        lecturerId: "LC2018-7890",
        department: "Computer Science",
        position: "Professor",
        joinDate: new Date(2018, 5, 20), // June 20, 2018
        status: "Active",
        coursesCount: 6,
        studentsCount: 145,
        rating: 4.5,
    },
    {
        id: 6,
        name: "Dr. Robert Davis",
        email: "robert.davis@example.com",
        lecturerId: "LC2023-2345",
        department: "Engineering",
        position: "Assistant Professor",
        joinDate: new Date(2023, 0, 15), // January 15, 2023
        status: "Active",
        coursesCount: 2,
        studentsCount: 60,
        rating: 4.2,
    },
    {
        id: 7,
        name: "Prof. Samantha Lee",
        email: "samantha.lee@example.com",
        lecturerId: "LC2019-8901",
        department: "Chemistry",
        position: "Associate Professor",
        joinDate: new Date(2019, 3, 12), // April 12, 2019
        status: "Inactive",
        coursesCount: 0,
        studentsCount: 0,
        rating: 4.4,
    },
    {
        id: 8,
        name: "Dr. Daniel Brown",
        email: "daniel.brown@example.com",
        lecturerId: "LC2020-6789",
        department: "Mathematics",
        position: "Assistant Professor",
        joinDate: new Date(2020, 6, 8), // July 8, 2020
        status: "Active",
        coursesCount: 4,
        studentsCount: 95,
        rating: 4.3,
    },
];

// Academic departments for filtering
const departments = [
    "All Departments",
    "Computer Science",
    "Mathematics",
    "Business Administration",
    "Physics",
    "Engineering",
    "Chemistry",
];

// Positions for filtering
const positions = [
    "All Positions",
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
];

export default function LecturersPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [selectedPosition, setSelectedPosition] = useState("All Positions");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newLecturer, setNewLecturer] = useState({
        name: "",
        email: "",
        department: "",
        position: "",
    });

    const lecturersPerPage = 5;

    // Filter and sort lecturers
    const filteredLecturers = mockLecturers
        .filter((lecturer) => {
            const matchesSearch =
                lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lecturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lecturer.lecturerId.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesDepartment =
                selectedDepartment === "All Departments" ||
                lecturer.department === selectedDepartment;

            const matchesPosition =
                selectedPosition === "All Positions" ||
                lecturer.position === selectedPosition;

            const matchesStatus =
                selectedStatus === "All" || lecturer.status === selectedStatus;

            return matchesSearch && matchesDepartment && matchesPosition && matchesStatus;
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
    const indexOfLastLecturer = currentPage * lecturersPerPage;
    const indexOfFirstLecturer = indexOfLastLecturer - lecturersPerPage;
    const currentLecturers = filteredLecturers.slice(
        indexOfFirstLecturer,
        indexOfLastLecturer
    );
    const totalPages = Math.ceil(filteredLecturers.length / lecturersPerPage);

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
        setSelectedDepartment("All Departments");
        setSelectedPosition("All Positions");
        setSelectedStatus("All");
        setCurrentPage(1);
    };

    // Handle adding a new lecturer
    const handleAddLecturer = () => {
        console.log("Adding new lecturer:", newLecturer);
        setIsAddDialogOpen(false);
        setNewLecturer({
            name: "",
            email: "",
            department: "",
            position: "",
        });
        // In a real app, you would make an API call here
    };

    // Calculate statistics
    const statistics = {
        total: mockLecturers.length,
        active: mockLecturers.filter((l) => l.status === "Active").length,
        onLeave: mockLecturers.filter((l) => l.status === "On Leave").length,
        inactive: mockLecturers.filter((l) => l.status === "Inactive").length,
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
            case "On Leave":
                return theme === "dark"
                    ? "bg-amber-900/30 text-amber-400"
                    : "bg-amber-100 text-amber-800";
            case "Inactive":
                return theme === "dark"
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
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
                    <h1 className="text-2xl font-bold">Lecturer Management</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        View and manage all lecturer accounts
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
                                Add Lecturer
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
                                    Add New Lecturer
                                </DialogTitle>
                                <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                                    Enter the lecturer's information below.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className={theme === "dark" ? "text-white" : ""}>
                                        Full Name with Title
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newLecturer.name}
                                        onChange={(e) =>
                                            setNewLecturer({ ...newLecturer, name: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="Dr. John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className={theme === "dark" ? "text-white" : ""}>
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newLecturer.email}
                                        onChange={(e) =>
                                            setNewLecturer({ ...newLecturer, email: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="john.doe@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department" className={theme === "dark" ? "text-white" : ""}>
                                        Department
                                    </Label>
                                    <select
                                        id="department"
                                        value={newLecturer.department}
                                        onChange={(e) =>
                                            setNewLecturer({ ...newLecturer, department: e.target.value })
                                        }
                                        className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                                    >
                                        <option value="">Select a department</option>
                                        {departments.slice(1).map((department) => (
                                            <option key={department} value={department}>
                                                {department}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="position" className={theme === "dark" ? "text-white" : ""}>
                                        Position
                                    </Label>
                                    <select
                                        id="position"
                                        value={newLecturer.position}
                                        onChange={(e) =>
                                            setNewLecturer({ ...newLecturer, position: e.target.value })
                                        }
                                        className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                                    >
                                        <option value="">Select a position</option>
                                        {positions.slice(1).map((position) => (
                                            <option key={position} value={position}>
                                                {position}
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
                                    onClick={handleAddLecturer}
                                    className={
                                        theme === "dark"
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-teal-600 hover:bg-teal-700 text-white"
                                    }
                                    disabled={
                                        !newLecturer.name ||
                                        !newLecturer.email ||
                                        !newLecturer.department ||
                                        !newLecturer.position
                                    }
                                >
                                    Add Lecturer
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
                            <GraduationCap size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Lecturers
                            </p>
                            <p className="text-2xl font-semibold">{statistics.total}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"} mr-3`}>
                            <BookText size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Active Lecturers
                            </p>
                            <p className="text-2xl font-semibold">{statistics.active}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"} mr-3`}>
                            <Users size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                On Leave
                            </p>
                            <p className="text-2xl font-semibold">{statistics.onLeave}</p>
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
                                Inactive Lecturers
                            </p>
                            <p className="text-2xl font-semibold">{statistics.inactive}</p>
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
                            placeholder="Search lecturers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-md border ${getInputStyle()}`}
                        />
                    </div>

                    <div>
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            {departments.map((department) => (
                                <option key={department} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            {positions.map((position) => (
                                <option key={position} value={position}>
                                    {position}
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
                            <option value="On Leave">On Leave</option>
                            <option value="Inactive">Inactive</option>
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

            {/* Lecturers Table */}
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
                                    onClick={() => handleSort("department")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Department</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("joinDate")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Info</span>
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
                            {currentLecturers.length > 0 ? (
                                currentLecturers.map((lecturer) => (
                                    <tr
                                        key={lecturer.id}
                                        className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                                                    {lecturer.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium">
                                                        {lecturer.name}
                                                    </div>
                                                    <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                        {lecturer.position}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm">{lecturer.lecturerId}</div>
                                            <div className="text-sm flex items-center mt-1">
                                                <Mail size={14} className="mr-1 text-gray-400" />
                                                <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>{lecturer.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm">{lecturer.department}</div>
                                            <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {lecturer.coursesCount} courses
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm flex items-center">
                                                <Calendar size={14} className="mr-1 text-gray-400" />
                                                {format(lecturer.joinDate, "MMM d, yyyy")}
                                            </div>
                                            <div className="flex items-center mt-1 text-sm">
                                                <Star size={14} className="mr-1 text-yellow-400" />
                                                <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    {lecturer.rating} ({lecturer.studentsCount} students)
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lecturer.status)}`}>
                                                {lecturer.status}
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
                                                        onClick={() => console.log(`View ${lecturer.name}`)}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        <span>View Details</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center"
                                                        onClick={() => console.log(`Edit ${lecturer.name}`)}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center text-red-600 dark:text-red-400"
                                                        onClick={() => console.log(`Delete ${lecturer.name}`)}
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
                                        <GraduationCap size={40} className="mx-auto mb-2 text-gray-400" />
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                            No lecturers found matching your criteria
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
                {filteredLecturers.length > 0 && (
                    <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                            Showing <span className="font-medium">{indexOfFirstLecturer + 1}</span>
                            {" "}-{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastLecturer, filteredLecturers.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredLecturers.length}</span> lecturers
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
