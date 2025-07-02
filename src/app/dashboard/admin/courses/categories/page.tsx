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
    Settings,
    FolderPlus
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

// Mock data for course categories
const mockCategories = [
    {
        id: 1,
        name: "Web Development",
        slug: "web-development",
        description: "Learn modern web development technologies and frameworks",
        color: "#3498db",
        numberOfCourses: 42,
        createdAt: new Date(2021, 2, 15),
        status: "Active"
    },
    {
        id: 2,
        name: "Data Science",
        slug: "data-science",
        description: "Explore data analysis, machine learning, and statistics",
        color: "#9b59b6",
        numberOfCourses: 35,
        createdAt: new Date(2021, 5, 8),
        status: "Active"
    },
    {
        id: 3,
        name: "Mobile Development",
        slug: "mobile-development",
        description: "Build apps for iOS, Android, and cross-platform frameworks",
        color: "#e74c3c",
        numberOfCourses: 28,
        createdAt: new Date(2021, 7, 22),
        status: "Active"
    },
    {
        id: 4,
        name: "UI/UX Design",
        slug: "ui-ux-design",
        description: "Learn user interface and experience design principles",
        color: "#1abc9c",
        numberOfCourses: 19,
        createdAt: new Date(2022, 1, 10),
        status: "Active"
    },
    {
        id: 5,
        name: "Cloud Computing",
        slug: "cloud-computing",
        description: "Master cloud platforms, infrastructure, and DevOps",
        color: "#f39c12",
        numberOfCourses: 23,
        createdAt: new Date(2022, 3, 5),
        status: "Active"
    },
    {
        id: 6,
        name: "Cybersecurity",
        slug: "cybersecurity",
        description: "Learn security principles, ethical hacking, and defense",
        color: "#2c3e50",
        numberOfCourses: 15,
        createdAt: new Date(2022, 6, 18),
        status: "Active"
    },
    {
        id: 7,
        name: "Game Development",
        slug: "game-development",
        description: "Create games using engines like Unity and Unreal",
        color: "#27ae60",
        numberOfCourses: 12,
        createdAt: new Date(2022, 9, 7),
        status: "Inactive"
    },
    {
        id: 8,
        name: "Blockchain",
        slug: "blockchain",
        description: "Explore blockchain technology and cryptocurrency development",
        color: "#f1c40f",
        numberOfCourses: 8,
        createdAt: new Date(2023, 0, 15),
        status: "Inactive"
    },
];

export default function CategoriesPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
        color: "#3498db",
    });

    const categoriesPerPage = 5;

    // Filter and sort categories
    const filteredCategories = mockCategories
        .filter((category) => {
            const matchesSearch =
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.slug.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                selectedStatus === "All" || category.status === selectedStatus;

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
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    );
    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

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
        setSelectedStatus("All");
        setCurrentPage(1);
    };

    // Handle adding a new category
    const handleAddCategory = () => {
        console.log("Adding new category:", newCategory);
        setIsAddDialogOpen(false);
        setNewCategory({
            name: "",
            description: "",
            color: "#3498db",
        });
        // In a real app, you would make an API call here
    };

    // Calculate statistics
    const statistics = {
        total: mockCategories.length,
        active: mockCategories.filter((c) => c.status === "Active").length,
        inactive: mockCategories.filter((c) => c.status === "Inactive").length,
        totalCourses: mockCategories.reduce((sum, c) => sum + c.numberOfCourses, 0),
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
                    <h1 className="text-2xl font-bold">Course Categories</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Manage course categories and their associated courses
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
                                <FolderPlus size={16} className="mr-2" />
                                Add Category
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
                                    Add New Category
                                </DialogTitle>
                                <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                                    Create a new course category for the platform.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className={theme === "dark" ? "text-white" : ""}>
                                        Category Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newCategory.name}
                                        onChange={(e) =>
                                            setNewCategory({ ...newCategory, name: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="Web Development"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description" className={theme === "dark" ? "text-white" : ""}>
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={newCategory.description}
                                        onChange={(e) =>
                                            setNewCategory({ ...newCategory, description: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="Enter a detailed description of this category"
                                        rows={3}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="color" className={theme === "dark" ? "text-white" : ""}>
                                        Category Color
                                    </Label>
                                    <div className="flex gap-3 items-center">
                                        <Input
                                            id="color"
                                            type="color"
                                            value={newCategory.color}
                                            onChange={(e) =>
                                                setNewCategory({ ...newCategory, color: e.target.value })
                                            }
                                            className="w-14 h-10 p-1 cursor-pointer"
                                        />
                                        <div className="text-sm">
                                            This color will be used as an accent for the category
                                        </div>
                                    </div>
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
                                    onClick={handleAddCategory}
                                    className={
                                        theme === "dark"
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-teal-600 hover:bg-teal-700 text-white"
                                    }
                                    disabled={
                                        !newCategory.name ||
                                        !newCategory.description
                                    }
                                >
                                    Add Category
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
                            <Layers size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Categories
                            </p>
                            <p className="text-2xl font-semibold">{statistics.total}</p>
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
                                Active Categories
                            </p>
                            <p className="text-2xl font-semibold">{statistics.active}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-700"} mr-3`}>
                            <XCircle size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Inactive Categories
                            </p>
                            <p className="text-2xl font-semibold">{statistics.inactive}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"} mr-3`}>
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Courses
                            </p>
                            <p className="text-2xl font-semibold">{statistics.totalCourses}</p>
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
                            placeholder="Search categories..."
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
                            <option value="Active">Active</option>
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

            {/* Categories Table */}
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
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Category</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("numberOfCourses")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Courses</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("createdAt")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Created</span>
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
                            {currentCategories.length > 0 ? (
                                currentCategories.map((category) => (
                                    <tr
                                        key={category.id}
                                        className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div 
                                                    className="h-10 w-10 rounded-md flex items-center justify-center"
                                                    style={{ backgroundColor: `${category.color}30` }}
                                                >
                                                    <Bookmark style={{ color: category.color }} size={20} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium">
                                                        {category.name}
                                                    </div>
                                                    <div className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                        {category.description.length > 50
                                                            ? `${category.description.substring(0, 50)}...`
                                                            : category.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <BookOpen size={16} className={`mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                                <span className="text-sm font-medium">{category.numberOfCourses} courses</span>
                                            </div>
                                            <div className="text-sm mt-1">
                                                <Link href={`/dashboard/admin/courses?category=${category.slug}`} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                                                    View all courses
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm flex items-center">
                                                <Calendar size={14} className="mr-1 text-gray-400" />
                                                {format(category.createdAt, "MMM d, yyyy")}
                                            </div>
                                            <div className="text-sm mt-1 flex items-center">
                                                <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    Slug: {category.slug}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(category.status)}`}>
                                                {category.status}
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
                                                        onClick={() => console.log(`View ${category.name}`)}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        <span>View Details</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center"
                                                        onClick={() => console.log(`Edit ${category.name}`)}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center text-red-600 dark:text-red-400"
                                                        onClick={() => console.log(`Delete ${category.name}`)}
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
                                    <td colSpan={5} className="px-6 py-10 text-center">
                                        <Bookmark size={40} className="mx-auto mb-2 text-gray-400" />
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                            No categories found matching your criteria
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
                {filteredCategories.length > 0 && (
                    <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                            Showing <span className="font-medium">{indexOfFirstCategory + 1}</span>
                            {" "}-{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastCategory, filteredCategories.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredCategories.length}</span> categories
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
