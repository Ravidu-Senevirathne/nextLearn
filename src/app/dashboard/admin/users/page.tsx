"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import {
    Search,
    Filter,
    MoreHorizontal,
    Download,
    User,
    Mail,
    Calendar,
    Shield,
    CheckCircle,
    XCircle,
    UserPlus,
    Edit,
    Trash2,
    ArrowUpDown,
    EyeOff,
    Eye,
    Lock
} from "lucide-react";
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
import { Checkbox } from "@/Components/ui/checkbox";
import { format } from "date-fns";

// Mock data for users
const mockUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Student",
        status: "Active",
        joinedAt: new Date(2023, 5, 15),
        lastLogin: new Date(2023, 11, 2),
        coursesEnrolled: 4,
        verified: true
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Instructor",
        status: "Active",
        joinedAt: new Date(2023, 3, 22),
        lastLogin: new Date(2023, 11, 5),
        coursesCreated: 3,
        earnings: 1250.75,
        verified: true
    },
    {
        id: 3,
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        role: "Admin",
        status: "Active",
        joinedAt: new Date(2023, 1, 10),
        lastLogin: new Date(2023, 11, 1),
        verified: true
    },
    {
        id: 4,
        name: "Emily Williams",
        email: "emily.williams@example.com",
        role: "Student",
        status: "Inactive",
        joinedAt: new Date(2023, 8, 5),
        lastLogin: new Date(2023, 9, 20),
        coursesEnrolled: 2,
        verified: true
    },
    {
        id: 5,
        name: "David Brown",
        email: "david.brown@example.com",
        role: "Instructor",
        status: "Pending",
        joinedAt: new Date(2023, 10, 18),
        lastLogin: null,
        coursesCreated: 0,
        earnings: 0,
        verified: false
    },
    {
        id: 6,
        name: "Sarah Miller",
        email: "sarah.miller@example.com",
        role: "Student",
        status: "Active",
        joinedAt: new Date(2023, 4, 30),
        lastLogin: new Date(2023, 11, 3),
        coursesEnrolled: 7,
        verified: true
    },
    {
        id: 7,
        name: "Robert Wilson",
        email: "robert.wilson@example.com",
        role: "Instructor",
        status: "Suspended",
        joinedAt: new Date(2023, 2, 12),
        lastLogin: new Date(2023, 8, 15),
        coursesCreated: 5,
        earnings: 3420.50,
        verified: true
    },
    {
        id: 8,
        name: "Jessica Taylor",
        email: "jessica.taylor@example.com",
        role: "Student",
        status: "Active",
        joinedAt: new Date(2023, 7, 8),
        lastLogin: new Date(2023, 11, 4),
        coursesEnrolled: 2,
        verified: true
    },
    {
        id: 9,
        name: "Thomas Anderson",
        email: "thomas.anderson@example.com",
        role: "Student",
        status: "Pending",
        joinedAt: new Date(2023, 10, 25),
        lastLogin: null,
        coursesEnrolled: 0,
        verified: false
    },
    {
        id: 10,
        name: "Lisa Martinez",
        email: "lisa.martinez@example.com",
        role: "Instructor",
        status: "Active",
        joinedAt: new Date(2023, 6, 19),
        lastLogin: new Date(2023, 11, 1),
        coursesCreated: 2,
        earnings: 875.25,
        verified: true
    }
];

export default function UsersPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortField, setSortField] = useState("joinedAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: ""
    });

    const usersPerPage = 5;

    // Filter and sort users
    const filteredUsers = mockUsers
        .filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRole =
                selectedRole === "All" || user.role === selectedRole;

            const matchesStatus =
                selectedStatus === "All" || user.status === selectedStatus;

            return matchesSearch && matchesRole && matchesStatus;
        })
        .sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            // Handle date comparisons
            if (aValue instanceof Date && bValue instanceof Date) {
                return sortDirection === "asc"
                    ? aValue.getTime() - bValue.getTime()
                    : bValue.getTime() - aValue.getTime();
            }

            // Handle string comparisons
            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDirection === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            // Handle number comparisons
            return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        });

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
        setSelectedRole("All");
        setSelectedStatus("All");
        setCurrentPage(1);
    };

    // Open edit dialog
    const openEditDialog = (user) => {
        setSelectedUser(user);
        setEditFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        });
        setIsEditDialogOpen(true);
    };

    // Open delete dialog
    const openDeleteDialog = (user) => {
        setSelectedUser(user);
        setIsDeleteDialogOpen(true);
    };

    // Handle edit form submission
    const handleEditSubmit = () => {
        console.log("Updating user:", selectedUser.id, "with data:", editFormData);
        setIsEditDialogOpen(false);
        // In a real app, you would make an API call here
    };

    // Handle delete confirmation
    const handleDeleteConfirm = () => {
        console.log("Deleting user:", selectedUser.id);
        setIsDeleteDialogOpen(false);
        // In a real app, you would make an API call here
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
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-800";
            case "Pending":
                return theme === "dark"
                    ? "bg-yellow-900/30 text-yellow-400"
                    : "bg-yellow-100 text-yellow-800";
            case "Suspended":
                return theme === "dark"
                    ? "bg-red-900/30 text-red-400"
                    : "bg-red-100 text-red-800";
            default:
                return theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-800";
        }
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case "Admin":
                return theme === "dark"
                    ? "bg-purple-900/30 text-purple-400"
                    : "bg-purple-100 text-purple-800";
            case "Instructor":
                return theme === "dark"
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            case "Student":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            default:
                return theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Manage users, roles, and permissions
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
                    <Button className="flex items-center gap-2" onClick={() => { }}>
                        <UserPlus size={16} />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className={`p-4 rounded-lg border ${getCardStyle()} mb-6`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-md border ${getInputStyle()}`}
                        />
                    </div>

                    <div>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            <option value="All">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Student">Student</option>
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
                            <option value="Pending">Pending</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                    </div>

                    <div>
                        <Button variant="outline" onClick={resetFilters} className="w-full">
                            Reset Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
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
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>User</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("role")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Role</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("status")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Status</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("joinedAt")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Joined</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                                                    <User className="h-5 w-5 text-gray-500" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium">{user.name}</div>
                                                    <div className="text-sm text-gray-500 flex items-center">
                                                        <Mail className="h-3 w-3 mr-1" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(user.role)}`}>
                                                {user.role}
                                            </span>
                                            {user.role === "Instructor" && (
                                                <div className="mt-1 text-xs text-gray-500">
                                                    {user.coursesCreated || 0} courses
                                                </div>
                                            )}
                                            {user.role === "Student" && (
                                                <div className="mt-1 text-xs text-gray-500">
                                                    {user.coursesEnrolled || 0} enrollments
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                                                {user.status}
                                            </span>
                                            <div className="mt-1 text-xs text-gray-500">
                                                {user.verified ? (
                                                    <span className="flex items-center">
                                                        <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center">
                                                        <XCircle className="h-3 w-3 mr-1 text-red-500" />
                                                        Not verified
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm">
                                                <Calendar className="h-3 w-3 inline mr-1" />
                                                {format(user.joinedAt, "MMM d, yyyy")}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {user.lastLogin ? (
                                                    <>Last login: {format(user.lastLogin, "MMM d, yyyy")}</>
                                                ) : (
                                                    "Never logged in"
                                                )}
                                            </div>
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
                                                        onClick={() => openEditDialog(user)}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Edit User</span>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center"
                                                    >
                                                        <Lock className="mr-2 h-4 w-4" />
                                                        <span>Reset Password</span>
                                                    </DropdownMenuItem>

                                                    {user.status === "Active" ? (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer flex items-center text-amber-600 dark:text-amber-400"
                                                        >
                                                            <EyeOff className="mr-2 h-4 w-4" />
                                                            <span>Suspend User</span>
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer flex items-center text-green-600 dark:text-green-400"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            <span>Activate User</span>
                                                        </DropdownMenuItem>
                                                    )}

                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center text-red-600 dark:text-red-400"
                                                        onClick={() => openDeleteDialog(user)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Delete User</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center">
                                        <User size={40} className="mx-auto mb-2 text-gray-400" />
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                            No users found matching your criteria
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
                {filteredUsers.length > 0 && (
                    <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                            Showing <span className="font-medium">{indexOfFirstUser + 1}</span>
                            {" "}-{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastUser, filteredUsers.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredUsers.length}</span> users
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

            {/* Edit User Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className={theme === "dark" ? "bg-gray-800 text-white border-gray-700" : ""}>
                    <DialogHeader>
                        <DialogTitle className={theme === "dark" ? "text-white" : ""}>
                            Edit User
                        </DialogTitle>
                        <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                            Update user information and settings
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                className={`col-span-3 ${getInputStyle()}`}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={editFormData.email}
                                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                className={`col-span-3 ${getInputStyle()}`}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                                Role
                            </Label>
                            <select
                                id="role"
                                value={editFormData.role}
                                onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                                className={`col-span-3 p-2 rounded-md border ${getInputStyle()}`}
                            >
                                <option value="Admin">Admin</option>
                                <option value="Instructor">Instructor</option>
                                <option value="Student">Student</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <select
                                id="status"
                                value={editFormData.status}
                                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                className={`col-span-3 p-2 rounded-md border ${getInputStyle()}`}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div></div>
                            <div className="col-span-3 flex items-center space-x-2">
                                <Checkbox id="verified" />
                                <Label htmlFor="verified" className="text-sm">
                                    Email verified
                                </Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                            className={theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleEditSubmit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className={theme === "dark" ? "bg-gray-800 text-white border-gray-700" : ""}>
                    <DialogHeader>
                        <DialogTitle className={theme === "dark" ? "text-white" : ""}>
                            Confirm Deletion
                        </DialogTitle>
                        <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                            Are you sure you want to delete this user? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                        <div className={`p-4 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} mb-4`}>
                            <p className="font-medium">{selectedUser.name}</p>
                            <p className="text-sm text-gray-500">{selectedUser.email}</p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className={theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                        >
                            Delete User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
