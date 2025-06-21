"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Calendar,
    Megaphone,
    Plus,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    CheckCircle,
    Clock,
    Globe,
    Users,
    Bookmark,
    AlertCircle,
    ArrowUpDown,
} from "lucide-react";
import { format } from "date-fns";

// Mock data for announcements
const mockAnnouncements = [
    {
        id: 1,
        title: "Platform Maintenance Scheduled",
        content: "We will be performing scheduled maintenance on July 15th from 2AM to 5AM UTC. During this time, the platform may be temporarily unavailable.",
        type: "Maintenance",
        audience: "All Users",
        status: "Scheduled",
        createdAt: new Date(2023, 6, 10),
        scheduledFor: new Date(2023, 6, 15, 2, 0, 0),
        expiresAt: new Date(2023, 6, 15, 5, 0, 0),
        isImportant: true,
        createdBy: "System Admin",
    },
    {
        id: 2,
        title: "New Course Categories Added",
        content: "We're excited to announce that we've added three new course categories: Artificial Intelligence, Blockchain Development, and Digital Marketing.",
        type: "Feature",
        audience: "All Users",
        status: "Published",
        createdAt: new Date(2023, 6, 5),
        scheduledFor: new Date(2023, 6, 5),
        expiresAt: new Date(2023, 7, 5),
        isImportant: false,
        createdBy: "Content Manager",
    },
    {
        id: 3,
        title: "Student Dashboard Update",
        content: "We've updated the student dashboard with new progress tracking features and improved navigation.",
        type: "Update",
        audience: "Students",
        status: "Published",
        createdAt: new Date(2023, 6, 3),
        scheduledFor: new Date(2023, 6, 3),
        expiresAt: new Date(2023, 8, 3),
        isImportant: false,
        createdBy: "Product Manager",
    },
    {
        id: 4,
        title: "Important: Terms of Service Update",
        content: "We've updated our Terms of Service and Privacy Policy. Please review the changes at your earliest convenience.",
        type: "Policy",
        audience: "All Users",
        status: "Published",
        createdAt: new Date(2023, 5, 28),
        scheduledFor: new Date(2023, 5, 28),
        expiresAt: new Date(2023, 8, 28),
        isImportant: true,
        createdBy: "Legal Team",
    },
    {
        id: 5,
        title: "New Instructor Resources Available",
        content: "We've added new resources for instructors, including teaching guides, presentation templates, and more.",
        type: "Resource",
        audience: "Instructors",
        status: "Draft",
        createdAt: new Date(2023, 6, 8),
        scheduledFor: null,
        expiresAt: null,
        isImportant: false,
        createdBy: "Instructor Support",
    },
    {
        id: 6,
        title: "Summer Promotion: 25% Off All Courses",
        content: "Get 25% off all courses until August 31st using the code SUMMER25.",
        type: "Promotion",
        audience: "Students",
        status: "Scheduled",
        createdAt: new Date(2023, 6, 12),
        scheduledFor: new Date(2023, 6, 15),
        expiresAt: new Date(2023, 7, 31),
        isImportant: true,
        createdBy: "Marketing Team",
    },
];

// Available announcement types for filtering
const announcementTypes = [
    "All Types",
    "Maintenance",
    "Update",
    "Feature",
    "Promotion",
    "Policy",
    "Resource",
];

// Available audience options for filtering
const audienceOptions = ["All Users", "Students", "Instructors", "Admins"];

// Available status options for filtering
const statusOptions = ["All Statuses", "Published", "Scheduled", "Draft", "Expired"];

export default function AnnouncementsPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All Types");
    const [selectedStatus, setSelectedStatus] = useState("All Statuses");
    const [sortField, setSortField] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [viewedAnnouncement, setViewedAnnouncement] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const [newAnnouncement, setNewAnnouncement] = useState({
        title: "",
        content: "",
        type: "Update",
        audience: "All Users",
        isImportant: false,
        scheduledFor: null,
        expiresAt: null,
    });

    const announcementsPerPage = 5;

    // Filter and sort announcements
    const filteredAnnouncements = mockAnnouncements
        .filter((announcement) => {
            const matchesSearch =
                announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                announcement.content.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType =
                selectedType === "All Types" || announcement.type === selectedType;

            const matchesStatus =
                selectedStatus === "All Statuses" || announcement.status === selectedStatus;

            return matchesSearch && matchesType && matchesStatus;
        })
        .sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortDirection === "asc") {
                if (aValue instanceof Date && bValue instanceof Date) {
                    return aValue.getTime() - bValue.getTime();
                }
                if (typeof aValue === "string" && typeof bValue === "string") {
                    return aValue.localeCompare(bValue);
                }
                return aValue - bValue;
            } else {
                if (aValue instanceof Date && bValue instanceof Date) {
                    return bValue.getTime() - aValue.getTime();
                }
                if (typeof aValue === "string" && typeof bValue === "string") {
                    return bValue.localeCompare(aValue);
                }
                return bValue - aValue;
            }
        });

    // Pagination
    const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentAnnouncements = filteredAnnouncements.slice(
        indexOfFirstAnnouncement,
        indexOfLastAnnouncement
    );
    const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);

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
        setSelectedType("All Types");
        setSelectedStatus("All Statuses");
        setCurrentPage(1);
    };

    // Handle adding a new announcement
    const handleAddAnnouncement = () => {
        console.log("Adding new announcement:", newAnnouncement);
        setIsAddDialogOpen(false);
        setNewAnnouncement({
            title: "",
            content: "",
            type: "Update",
            audience: "All Users",
            isImportant: false,
            scheduledFor: null,
            expiresAt: null,
        });
        // In a real app, you would make an API call here
    };

    // View announcement details
    const handleViewAnnouncement = (announcement) => {
        setViewedAnnouncement(announcement);
        setIsViewDialogOpen(true);
    };

    // Calculate statistics
    const statistics = {
        total: mockAnnouncements.length,
        published: mockAnnouncements.filter((a) => a.status === "Published").length,
        scheduled: mockAnnouncements.filter((a) => a.status === "Scheduled").length,
        draft: mockAnnouncements.filter((a) => a.status === "Draft").length,
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
            case "Published":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            case "Scheduled":
                return theme === "dark"
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            case "Draft":
                return theme === "dark"
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
            case "Expired":
                return theme === "dark"
                    ? "bg-amber-900/30 text-amber-400"
                    : "bg-amber-100 text-amber-800";
            default:
                return theme === "dark"
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "Maintenance":
                return theme === "dark"
                    ? "bg-amber-900/30 text-amber-400"
                    : "bg-amber-100 text-amber-800";
            case "Update":
                return theme === "dark"
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            case "Feature":
                return theme === "dark"
                    ? "bg-purple-900/30 text-purple-400"
                    : "bg-purple-100 text-purple-800";
            case "Promotion":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            case "Policy":
                return theme === "dark"
                    ? "bg-red-900/30 text-red-400"
                    : "bg-red-100 text-red-800";
            case "Resource":
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
                    <h1 className="text-2xl font-bold">Announcements</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Create and manage platform-wide announcements
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className={
                                    theme === "dark"
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-teal-600 hover:bg-teal-700 text-white"
                                }
                            >
                                <Plus size={16} className="mr-2" />
                                New Announcement
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
                                    Create New Announcement
                                </DialogTitle>
                                <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                                    Compose a new announcement to share with users
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className={theme === "dark" ? "text-white" : ""}>
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={newAnnouncement.title}
                                        onChange={(e) =>
                                            setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="Announcement title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content" className={theme === "dark" ? "text-white" : ""}>
                                        Content
                                    </Label>
                                    <Textarea
                                        id="content"
                                        value={newAnnouncement.content}
                                        onChange={(e) =>
                                            setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="Announcement content"
                                        rows={5}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="type" className={theme === "dark" ? "text-white" : ""}>
                                            Type
                                        </Label>
                                        <select
                                            id="type"
                                            value={newAnnouncement.type}
                                            onChange={(e) =>
                                                setNewAnnouncement({ ...newAnnouncement, type: e.target.value })
                                            }
                                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                                        >
                                            {announcementTypes.slice(1).map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="audience" className={theme === "dark" ? "text-white" : ""}>
                                            Audience
                                        </Label>
                                        <select
                                            id="audience"
                                            value={newAnnouncement.audience}
                                            onChange={(e) =>
                                                setNewAnnouncement({ ...newAnnouncement, audience: e.target.value })
                                            }
                                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                                        >
                                            {audienceOptions.map((audience) => (
                                                <option key={audience} value={audience}>
                                                    {audience}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="important"
                                        checked={newAnnouncement.isImportant}
                                        onCheckedChange={(checked) =>
                                            setNewAnnouncement({ ...newAnnouncement, isImportant: checked })
                                        }
                                    />
                                    <Label htmlFor="important" className={theme === "dark" ? "text-white" : ""}>
                                        Mark as important
                                    </Label>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="scheduledFor" className={theme === "dark" ? "text-white" : ""}>
                                            Schedule Date
                                        </Label>
                                        <Input
                                            id="scheduledFor"
                                            type="date"
                                            className={getInputStyle()}
                                            onChange={(e) => {
                                                const date = e.target.value ? new Date(e.target.value) : null;
                                                setNewAnnouncement({ ...newAnnouncement, scheduledFor: date });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="expiresAt" className={theme === "dark" ? "text-white" : ""}>
                                            Expiration Date (Optional)
                                        </Label>
                                        <Input
                                            id="expiresAt"
                                            type="date"
                                            className={getInputStyle()}
                                            onChange={(e) => {
                                                const date = e.target.value ? new Date(e.target.value) : null;
                                                setNewAnnouncement({ ...newAnnouncement, expiresAt: date });
                                            }}
                                        />
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
                                    onClick={handleAddAnnouncement}
                                    className={
                                        theme === "dark"
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-teal-600 hover:bg-teal-700 text-white"
                                    }
                                    disabled={!newAnnouncement.title || !newAnnouncement.content}
                                >
                                    Create Announcement
                                </Button>
                                <Button
                                    variant="outline"
                                    className={
                                        theme === "dark"
                                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                                            : ""
                                    }
                                >
                                    Save as Draft
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
                            <Megaphone size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Announcements
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
                                Published
                            </p>
                            <p className="text-2xl font-semibold">{statistics.published}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"} mr-3`}>
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Scheduled
                            </p>
                            <p className="text-2xl font-semibold">{statistics.scheduled}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-700"} mr-3`}>
                            <Edit size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Drafts
                            </p>
                            <p className="text-2xl font-semibold">{statistics.draft}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={`p-4 rounded-lg border ${getCardStyle()} mb-6`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search announcements..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={getInputStyle()}
                        />
                    </div>

                    <div>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            {announcementTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
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
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
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

            {/* Announcements Table */}
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
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Announcement</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("audience")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Audience</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("createdAt")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Dates</span>
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
                            {currentAnnouncements.length > 0 ? (
                                currentAnnouncements.map((announcement) => (
                                    <tr
                                        key={announcement.id}
                                        className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className={`p-2 rounded-full ${getTypeColor(announcement.type)} mr-3`}>
                                                    <Megaphone size={16} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm font-medium">{announcement.title}</span>
                                                        {announcement.isImportant && (
                                                            <span className={`ml-2 p-1 rounded-full ${theme === "dark" ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-800"}`}>
                                                                <AlertCircle size={14} />
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"} line-clamp-1`}>
                                                        {announcement.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm flex items-center">
                                                {announcement.audience === "All Users" ? (
                                                    <Globe size={14} className="mr-1 text-gray-400" />
                                                ) : (
                                                    <Users size={14} className="mr-1 text-gray-400" />
                                                )}
                                                {announcement.audience}
                                            </div>
                                            <div className="text-sm mt-1 flex items-center">
                                                <Bookmark size={14} className="mr-1 text-gray-400" />
                                                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(announcement.type)}`}>
                                                    {announcement.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm flex items-center">
                                                <Calendar size={14} className="mr-1 text-gray-400" />
                                                Created: {format(announcement.createdAt, "MMM d, yyyy")}
                                            </div>
                                            {announcement.scheduledFor && (
                                                <div className="text-sm mt-1 flex items-center">
                                                    <Clock size={14} className="mr-1 text-gray-400" />
                                                    {announcement.status === "Scheduled"
                                                        ? `Scheduled: ${format(announcement.scheduledFor, "MMM d, yyyy")}`
                                                        : `Published: ${format(announcement.scheduledFor, "MMM d, yyyy")}`}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(announcement.status)}`}>
                                                {announcement.status}
                                            </span>
                                            <div className="text-xs mt-1">
                                                By: {announcement.createdBy}
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
                                                        onClick={() => handleViewAnnouncement(announcement)}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        <span>View</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center"
                                                        onClick={() => console.log(`Edit ${announcement.title}`)}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center text-red-600 dark:text-red-400"
                                                        onClick={() => console.log(`Delete ${announcement.title}`)}
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
                                        <Megaphone size={40} className="mx-auto mb-2 text-gray-400" />
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                            No announcements found matching your criteria
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
                {filteredAnnouncements.length > 0 && (
                    <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                            Showing <span className="font-medium">{indexOfFirstAnnouncement + 1}</span>
                            {" "}-{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastAnnouncement, filteredAnnouncements.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredAnnouncements.length}</span> announcements
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

            {/* View Announcement Dialog */}
            {viewedAnnouncement && (
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent
                        className={
                            theme === "dark"
                                ? "bg-gray-800 text-white border-gray-700"
                                : ""
                        }
                    >
                        <DialogHeader>
                            <div className="flex items-center">
                                <span className={`px-2 py-1 text-xs rounded-full mr-2 ${getTypeColor(viewedAnnouncement.type)}`}>
                                    {viewedAnnouncement.type}
                                </span>
                                <DialogTitle className={theme === "dark" ? "text-white" : ""}>
                                    {viewedAnnouncement.title}
                                </DialogTitle>
                            </div>
                            <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                                <div className="flex items-center justify-between">
                                    <span>Created by {viewedAnnouncement.createdBy}</span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(viewedAnnouncement.status)}`}>
                                        {viewedAnnouncement.status}
                                    </span>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className={`p-4 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                                    {viewedAnnouncement.content}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Audience:</p>
                                    <p className="font-medium">{viewedAnnouncement.audience}</p>
                                </div>
                                <div>
                                    <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Created:</p>
                                    <p className="font-medium">{format(viewedAnnouncement.createdAt, "MMM d, yyyy")}</p>
                                </div>
                                {viewedAnnouncement.scheduledFor && (
                                    <div>
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                            {viewedAnnouncement.status === "Scheduled" ? "Scheduled for:" : "Published on:"}
                                        </p>
                                        <p className="font-medium">{format(viewedAnnouncement.scheduledFor, "MMM d, yyyy")}</p>
                                    </div>
                                )}
                                {viewedAnnouncement.expiresAt && (
                                    <div>
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Expires:</p>
                                        <p className="font-medium">{format(viewedAnnouncement.expiresAt, "MMM d, yyyy")}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${viewedAnnouncement.isImportant ? "bg-red-500" : "bg-gray-400"}`}></div>
                                <span>{viewedAnnouncement.isImportant ? "Marked as important" : "Normal priority"}</span>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsViewDialogOpen(false)}
                                className={theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={() => console.log(`Edit ${viewedAnnouncement.title}`)}
                                className={
                                    theme === "dark"
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-teal-600 hover:bg-teal-700 text-white"
                                }
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
