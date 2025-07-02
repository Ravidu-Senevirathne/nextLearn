"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    UserPlus,
    MoreHorizontal,
    Users,
    Shield,
    Calendar,
    ArrowUpDown,
    Download,
    Trash2,
    Edit,
    Eye,
    Mail,
    ShieldCheck,
    ShieldAlert,
    Settings
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

// Mock data for administrators
const mockAdmins = [
    {
        id: 1,
        name: "John Anderson",
        email: "john.anderson@example.com",
        adminId: "ADM2021-1001",
        role: "System Administrator",
        department: "IT Department",
        joinDate: new Date(2021, 3, 10), // April 10, 2021
        status: "Active",
        lastLogin: new Date(2023, 5, 15, 9, 30), // June 15, 2023, 9:30 AM
        permissionLevel: "Full Access"
    },
    {
        id: 2,
        name: "Sarah Mitchell",
        email: "sarah.mitchell@example.com",
        adminId: "ADM2020-1002",
        role: "Content Manager",
        department: "Academic Affairs",
        joinDate: new Date(2020, 8, 5), // September 5, 2020
        status: "Active",
        lastLogin: new Date(2023, 5, 14, 14, 15), // June 14, 2023, 2:15 PM
        permissionLevel: "Limited Access"
    },
    {
        id: 3,
        name: "David Wong",
        email: "david.wong@example.com",
        adminId: "ADM2022-1003",
        role: "User Manager",
        department: "Human Resources",
        joinDate: new Date(2022, 1, 15), // February 15, 2022
        status: "Active",
        lastLogin: new Date(2023, 5, 15, 11, 45), // June 15, 2023, 11:45 AM
        permissionLevel: "Standard Access"
    },
    {
        id: 4,
        name: "Jennifer Lopez",
        email: "jennifer.lopez@example.com",
        adminId: "ADM2019-1004",
        role: "Financial Administrator",
        department: "Finance",
        joinDate: new Date(2019, 5, 20), // June 20, 2019
        status: "On Leave",
        lastLogin: new Date(2023, 5, 10, 8, 20), // June 10, 2023, 8:20 AM
        permissionLevel: "Limited Access"
    },
    {
        id: 5,
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        adminId: "ADM2022-1005",
        role: "System Administrator",
        department: "IT Department",
        joinDate: new Date(2022, 3, 12), // April 12, 2022
        status: "Active",
        lastLogin: new Date(2023, 5, 15, 16, 5), // June 15, 2023, 4:05 PM
        permissionLevel: "Full Access"
    },
    {
        id: 6,
        name: "Rebecca Williams",
        email: "rebecca.williams@example.com",
        adminId: "ADM2021-1006",
        role: "Content Manager",
        department: "Academic Affairs",
        joinDate: new Date(2021, 7, 8), // August 8, 2021
        status: "Active",
        lastLogin: new Date(2023, 5, 15, 10, 30), // June 15, 2023, 10:30 AM
        permissionLevel: "Standard Access"
    },
    {
        id: 7,
        name: "Thomas Brown",
        email: "thomas.brown@example.com",
        adminId: "ADM2020-1007",
        role: "User Manager",
        department: "Student Affairs",
        joinDate: new Date(2020, 10, 15), // November 15, 2020
        status: "Inactive",
        lastLogin: new Date(2023, 4, 20, 13, 10), // May 20, 2023, 1:10 PM
        permissionLevel: "Limited Access"
    },
    {
        id: 8,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        adminId: "ADM2022-1008",
        role: "Financial Administrator",
        department: "Finance",
        joinDate: new Date(2022, 2, 1), // March 1, 2022
        status: "Active",
        lastLogin: new Date(2023, 5, 14, 15, 45), // June 14, 2023, 3:45 PM
        permissionLevel: "Standard Access"
    },
];

// Departments for filtering
const departments = [
    "All Departments",
    "IT Department",
    "Academic Affairs",
    "Human Resources",
    "Finance",
    "Student Affairs",
];

// Roles for filtering
const roles = [
    "All Roles",
    "System Administrator",
    "Content Manager",
    "User Manager",
    "Financial Administrator",
];

// Permission levels for filtering
const permissionLevels = [
    "All Permissions",
    "Full Access",
    "Standard Access",
    "Limited Access",
];

export default function AdminsPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [selectedRole, setSelectedRole] = useState("All Roles");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newAdmin, setNewAdmin] = useState({
        name: "",
        email: "",
        department: "",
        role: "",
        permissionLevel: "",
    });

    const adminsPerPage = 5;

    // Filter and sort administrators
    const filteredAdmins = mockAdmins
        .filter((admin) => {
            const matchesSearch =
                admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                admin.adminId.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesDepartment =
                selectedDepartment === "All Departments" ||
                admin.department === selectedDepartment;

            const matchesRole =
                selectedRole === "All Roles" ||
                admin.role === selectedRole;

            const matchesStatus =
                selectedStatus === "All" || admin.status === selectedStatus;

            return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
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
    const indexOfLastAdmin = currentPage * adminsPerPage;
    const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
    const currentAdmins = filteredAdmins.slice(
        indexOfFirstAdmin,
        indexOfLastAdmin
    );
    const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

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
        setSelectedRole("All Roles");
        setSelectedStatus("All");
        setCurrentPage(1);
    };

    // Handle adding a new administrator
    const handleAddAdmin = () => {
        console.log("Adding new administrator:", newAdmin);
        setIsAddDialogOpen(false);
        setNewAdmin({
            name: "",
            email: "",
            department: "",
            role: "",
            permissionLevel: "",
        });
        // In a real app, you would make an API call here
    };

    // Calculate statistics
    const statistics = {
        total: mockAdmins.length,
        active: mockAdmins.filter((a) => a.status === "Active").length,
        onLeave: mockAdmins.filter((a) => a.status === "On Leave").length,
        inactive: mockAdmins.filter((a) => a.status === "Inactive").length,
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

    const getPermissionLevelColor = (level) => {
        switch (level) {
            case "Full Access":
                return theme === "dark"
                    ? "bg-purple-900/30 text-purple-400"
                    : "bg-purple-100 text-purple-800";
            case "Standard Access":
                return theme === "dark"
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            case "Limited Access":
                return theme === "dark"
                    ? "bg-sky-900/30 text-sky-400"
                    : "bg-sky-100 text-sky-800";
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
                    <h1 className="text-2xl font-bold">Administrator Management</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        View and manage all administrator accounts
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
                                Add Administrator
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
                                    Add New Administrator
                                </DialogTitle>
                                <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                                    Enter the administrator's information below.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className={theme === "dark" ? "text-white" : ""}>
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newAdmin.name}
                                        onChange={(e) =>
                                            setNewAdmin({ ...newAdmin, name: e.target.value })
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
                                        value={newAdmin.email}
                                        onChange={(e) =>
                                            setNewAdmin({ ...newAdmin, email: e.target.value })
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
                                        value={newAdmin.department}
                                        onChange={(e) =>
                                            setNewAdmin({ ...newAdmin, department: e.target.value })
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
                                    <Label htmlFor="role" className={theme === "dark" ? "text-white" : ""}>
                                        Role
                                    </Label>
                                    <select
                                        id="role"
                                        value={newAdmin.role}
                                        onChange={(e) =>
                                            setNewAdmin({ ...newAdmin, role: e.target.value })
                                        }
                                        className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                                    >
                                        <option value="">Select a role</option>
                                        {roles.slice(1).map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="permissionLevel" className={theme === "dark" ? "text-white" : ""}>
                                        Permission Level
                                    </Label>
                                    <select
                                        id="permissionLevel"
                                        value={newAdmin.permissionLevel}
                                        onChange={(e) =>
                                            setNewAdmin({ ...newAdmin, permissionLevel: e.target.value })
                                        }
                                        className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                                    >
                                        <option value="">Select permission level</option>
                                        {permissionLevels.slice(1).map((level) => (
                                            <option key={level} value={level}>
                                                {level}
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
                                    onClick={handleAddAdmin}
                                    className={
                                        theme === "dark"
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-teal-600 hover:bg-teal-700 text-white"
                                    }
                                    disabled={
                                        !newAdmin.name ||
                                        !newAdmin.email ||
                                        !newAdmin.department ||
                                        !newAdmin.role ||
                                        !newAdmin.permissionLevel
                                    }
                                >
                                    Add Administrator
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
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Administrators
                            </p>
                            <p className="text-2xl font-semibold">{statistics.total}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"} mr-3`}>
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Active Administrators
                            </p>
                            <p className="text-2xl font-semibold">{statistics.active}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"} mr-3`}>
                            <ShieldAlert size={20} />
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
                                Inactive Administrators
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
                            placeholder="Search administrators..."
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
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
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

            {/* Administrators Table */}
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
                            {currentAdmins.length > 0 ? (
                                currentAdmins.map((admin) => (
                                    <tr
                                        key={admin.id}
                                        className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                                                    {admin.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium">
                                                        {admin.name}
                                                    </div>
                                                    <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                        {admin.role}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm">{admin.adminId}</div>
                                            <div className="text-sm flex items-center mt-1">
                                                <Mail size={14} className="mr-1 text-gray-400" />
                                                <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>{admin.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm">{admin.department}</div>
                                            <span className={`px-2 py-1 text-xs rounded-full mt-1 inline-block ${getPermissionLevelColor(admin.permissionLevel)}`}>
                                                {admin.permissionLevel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm flex items-center">
                                                <Calendar size={14} className="mr-1 text-gray-400" />
                                                {format(admin.joinDate, "MMM d, yyyy")}
                                            </div>
                                            <div className="flex items-center mt-1 text-sm">
                                                <Settings size={14} className="mr-1 text-gray-400" />
                                                <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    Last login: {format(admin.lastLogin, "MMM d, h:mm a")}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(admin.status)}`}>
                                                {admin.status}
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
                                                        onClick={() => console.log(`View ${admin.name}`)}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        <span>View Details</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center"
                                                        onClick={() => console.log(`Edit ${admin.name}`)}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center text-red-600 dark:text-red-400"
                                                        onClick={() => console.log(`Delete ${admin.name}`)}
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
                                        <ShieldCheck size={40} className="mx-auto mb-2 text-gray-400" />
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                            No administrators found matching your criteria
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
                {filteredAdmins.length > 0 && (
                    <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                            Showing <span className="font-medium">{indexOfFirstAdmin + 1}</span>
                            {" "}-{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastAdmin, filteredAdmins.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredAdmins.length}</span> administrators
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
