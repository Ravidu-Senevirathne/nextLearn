"use client";

import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Calendar,
    ArrowUpDown,
    MessageCircle,
    AlertCircle,
    CheckCircle,
    Clock,
    UserCircle,
    ArrowUpRight,
    ArrowDownRight,
    Ticket,
    RefreshCw,
    XCircle,
    HelpCircle
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
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
} from "@/Components/ui/dialog";
import { format } from "date-fns";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

// Mock data for support tickets
const mockTickets = [
    {
        id: "TKT-1001",
        subject: "Course video not loading",
        description: "I'm unable to play videos in the React Fundamentals course. I've tried multiple browsers but none of them work.",
        status: "Open",
        priority: "High",
        category: "Technical",
        createdBy: "Sarah Johnson",
        userEmail: "sarah.j@example.com",
        userRole: "Student",
        createdAt: new Date(2023, 10, 15, 9, 30),
        updatedAt: new Date(2023, 10, 15, 10, 45),
        assignedTo: "Support Team",
        responses: [
            {
                id: 1,
                message: "I've tried clearing my cache and cookies but still having the same issue.",
                from: "User",
                timestamp: new Date(2023, 10, 15, 10, 15),
            },
            {
                id: 2,
                message: "Thank you for reporting this. Could you please provide us with your browser version and operating system?",
                from: "Support",
                timestamp: new Date(2023, 10, 15, 10, 45),
                agentName: "Alex Support",
            }
        ]
    },
    {
        id: "TKT-1002",
        subject: "Billing issue with subscription",
        description: "I was charged twice for my monthly subscription. Please help resolve this issue.",
        status: "In Progress",
        priority: "High",
        category: "Billing",
        createdBy: "Michael Brown",
        userEmail: "michael.b@example.com",
        userRole: "Student",
        createdAt: new Date(2023, 10, 14, 15, 20),
        updatedAt: new Date(2023, 10, 15, 11, 30),
        assignedTo: "Billing Department",
        responses: [
            {
                id: 1,
                message: "I've attached my payment receipts for reference.",
                from: "User",
                timestamp: new Date(2023, 10, 14, 15, 45),
            },
            {
                id: 2,
                message: "We're looking into this issue. We'll need to check with our payment processor and will get back to you shortly.",
                from: "Support",
                timestamp: new Date(2023, 10, 14, 16, 30),
                agentName: "Finance Team",
            },
            {
                id: 3,
                message: "We've identified the duplicate charge. A refund has been processed and should appear in your account in 3-5 business days.",
                from: "Support",
                timestamp: new Date(2023, 10, 15, 11, 30),
                agentName: "Finance Team",
            }
        ]
    },
    {
        id: "TKT-1003",
        subject: "Certificate generation failed",
        description: "I completed the Python for Data Science course but I'm unable to generate my certificate of completion.",
        status: "Open",
        priority: "Medium",
        category: "Technical",
        createdBy: "Emily Chen",
        userEmail: "emily.c@example.com",
        userRole: "Student",
        createdAt: new Date(2023, 10, 15, 14, 10),
        updatedAt: new Date(2023, 10, 15, 14, 10),
        assignedTo: "Technical Support",
        responses: []
    },
    {
        id: "TKT-1004",
        subject: "Content suggestion",
        description: "I'd like to suggest adding more projects to the Web Development course. Practical exercises would be very helpful.",
        status: "Closed",
        priority: "Low",
        category: "Content",
        createdBy: "David Wilson",
        userEmail: "david.w@example.com",
        userRole: "Student",
        createdAt: new Date(2023, 10, 10, 9, 45),
        updatedAt: new Date(2023, 10, 12, 16, 20),
        assignedTo: "Content Team",
        responses: [
            {
                id: 1,
                message: "Thank you for your suggestion. We're actually planning to update our web development curriculum next month and will include more practical projects.",
                from: "Support",
                timestamp: new Date(2023, 10, 11, 11, 30),
                agentName: "Content Manager",
            },
            {
                id: 2,
                message: "That's great to hear! Looking forward to the updates.",
                from: "User",
                timestamp: new Date(2023, 10, 11, 14, 15),
            },
            {
                id: 3,
                message: "We've marked this as resolved. Please feel free to create a new ticket if you have any other suggestions.",
                from: "Support",
                timestamp: new Date(2023, 10, 12, 16, 20),
                agentName: "Content Manager",
            }
        ]
    },
    {
        id: "TKT-1005",
        subject: "Account access problem",
        description: "I'm unable to log in to my account. I've tried resetting my password but I'm not receiving any reset emails.",
        status: "In Progress",
        priority: "High",
        category: "Account",
        createdBy: "James Smith",
        userEmail: "james.s@example.com",
        userRole: "Instructor",
        createdAt: new Date(2023, 10, 14, 8, 30),
        updatedAt: new Date(2023, 10, 15, 13, 45),
        assignedTo: "Account Support",
        responses: [
            {
                id: 1,
                message: "We're looking into this issue. Could you confirm the email address you're using to sign in?",
                from: "Support",
                timestamp: new Date(2023, 10, 14, 9, 15),
                agentName: "Account Team",
            },
            {
                id: 2,
                message: "I'm using james.s@example.com for login.",
                from: "User",
                timestamp: new Date(2023, 10, 14, 10, 30),
            },
            {
                id: 3,
                message: "Thank you for confirming. We've checked our system and there seems to be an issue with email delivery to your domain. We're working on a fix. In the meantime, could you provide an alternative email address?",
                from: "Support",
                timestamp: new Date(2023, 10, 15, 13, 45),
                agentName: "Account Team",
            }
        ]
    },
    {
        id: "TKT-1006",
        subject: "Feature request: Dark mode",
        description: "It would be great if the platform had a dark mode option for reducing eye strain during night-time study sessions.",
        status: "Open",
        priority: "Low",
        category: "Feature Request",
        createdBy: "Lisa Brown",
        userEmail: "lisa.b@example.com",
        userRole: "Student",
        createdAt: new Date(2023, 10, 13, 20, 15),
        updatedAt: new Date(2023, 10, 15, 9, 10),
        assignedTo: "Product Team",
        responses: [
            {
                id: 1,
                message: "Thank you for your suggestion! We've added this to our feature request list and will consider it for future updates.",
                from: "Support",
                timestamp: new Date(2023, 10, 15, 9, 10),
                agentName: "Product Manager",
            }
        ]
    },
    {
        id: "TKT-1007",
        subject: "Quiz results not showing",
        description: "I completed a quiz in the Marketing Basics course but my results aren't showing in my progress tracker.",
        status: "Closed",
        priority: "Medium",
        category: "Technical",
        createdBy: "Robert Lee",
        userEmail: "robert.l@example.com",
        userRole: "Student",
        createdAt: new Date(2023, 10, 12, 14, 30),
        updatedAt: new Date(2023, 10, 13, 11, 45),
        assignedTo: "Technical Support",
        responses: [
            {
                id: 1,
                message: "We're looking into this issue. Could you let us know which specific quiz you're referring to?",
                from: "Support",
                timestamp: new Date(2023, 10, 12, 15, 20),
                agentName: "Tech Support",
            },
            {
                id: 2,
                message: "It was the Week 3 Quiz - Customer Segments.",
                from: "User",
                timestamp: new Date(2023, 10, 12, 16, 45),
            },
            {
                id: 3,
                message: "We've identified the issue and fixed it. Your quiz results should now be visible in your progress tracker. Please let us know if you're still experiencing issues.",
                from: "Support",
                timestamp: new Date(2023, 10, 13, 11, 45),
                agentName: "Tech Support",
            }
        ]
    },
];

export default function SupportPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedPriority, setSelectedPriority] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortField, setSortField] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewedTicket, setViewedTicket] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [replyMessage, setReplyMessage] = useState("");

    const ticketsPerPage = 5;

    // Filter and sort tickets
    const filteredTickets = mockTickets
        .filter((ticket) => {
            const matchesSearch =
                ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.createdBy.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                selectedStatus === "All" || ticket.status === selectedStatus;

            const matchesPriority =
                selectedPriority === "All" || ticket.priority === selectedPriority;

            const matchesCategory =
                selectedCategory === "All" || ticket.category === selectedCategory;

            return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
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
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = filteredTickets.slice(
        indexOfFirstTicket,
        indexOfLastTicket
    );
    const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

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
        setSelectedPriority("All");
        setSelectedCategory("All");
        setCurrentPage(1);
    };

    // View ticket details
    const handleViewTicket = (ticket) => {
        setViewedTicket(ticket);
        setIsViewDialogOpen(true);
    };

    // Send reply to ticket
    const handleSendReply = () => {
        console.log(`Sending reply to ticket ${viewedTicket.id}:`, replyMessage);
        setReplyMessage("");
        // In a real app, you would make an API call here to save the reply
    };

    // Calculate statistics
    const statistics = {
        total: mockTickets.length,
        open: mockTickets.filter((t) => t.status === "Open").length,
        inProgress: mockTickets.filter((t) => t.status === "In Progress").length,
        closed: mockTickets.filter((t) => t.status === "Closed").length,
        highPriority: mockTickets.filter((t) => t.priority === "High").length,
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
            case "Open":
                return theme === "dark"
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            case "In Progress":
                return theme === "dark"
                    ? "bg-amber-900/30 text-amber-400"
                    : "bg-amber-100 text-amber-800";
            case "Closed":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            default:
                return theme === "dark"
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High":
                return theme === "dark"
                    ? "bg-red-900/30 text-red-400"
                    : "bg-red-100 text-red-800";
            case "Medium":
                return theme === "dark"
                    ? "bg-amber-900/30 text-amber-400"
                    : "bg-amber-100 text-amber-800";
            case "Low":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            default:
                return theme === "dark"
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case "Technical":
                return theme === "dark"
                    ? "bg-purple-900/30 text-purple-400"
                    : "bg-purple-100 text-purple-800";
            case "Billing":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            case "Account":
                return theme === "dark"
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            case "Content":
                return theme === "dark"
                    ? "bg-amber-900/30 text-amber-400"
                    : "bg-amber-100 text-amber-800";
            case "Feature Request":
                return theme === "dark"
                    ? "bg-sky-900/30 text-sky-400"
                    : "bg-sky-100 text-sky-800";
            default:
                return theme === "dark"
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600";
        }
    };

    const formatRelativeTime = (date) => {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 60) {
            return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
        } else {
            return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Support Tickets</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Manage and respond to user support requests
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"} mr-3`}>
                            <Ticket size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Tickets
                            </p>
                            <p className="text-2xl font-semibold">{statistics.total}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"} mr-3`}>
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Open
                            </p>
                            <p className="text-2xl font-semibold">{statistics.open}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"} mr-3`}>
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                In Progress
                            </p>
                            <p className="text-2xl font-semibold">{statistics.inProgress}</p>
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
                                Closed
                            </p>
                            <p className="text-2xl font-semibold">{statistics.closed}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"} mr-3`}>
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                High Priority
                            </p>
                            <p className="text-2xl font-semibold">{statistics.highPriority}</p>
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
                            placeholder="Search tickets..."
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
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div>
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            <option value="All">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            <option value="All">All Categories</option>
                            <option value="Technical">Technical</option>
                            <option value="Billing">Billing</option>
                            <option value="Account">Account</option>
                            <option value="Content">Content</option>
                            <option value="Feature Request">Feature Request</option>
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

            {/* Tickets Table */}
            <div className={`rounded-lg border ${getCardStyle()} overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("id")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Ticket</span>
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("createdBy")}
                                >
                                    <div className="flex items-center">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>User</span>
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
                            {currentTickets.length > 0 ? (
                                currentTickets.map((ticket) => (
                                    <tr
                                        key={ticket.id}
                                        className={theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className={`p-2 rounded-full ${getCategoryColor(ticket.category)} mr-3`}>
                                                    <HelpCircle size={16} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center">
                                                        <span className="text-xs font-medium mr-2">{ticket.id}</span>
                                                        <span className="text-sm font-medium">{ticket.subject}</span>
                                                        {ticket.priority === "High" && (
                                                            <span className={`ml-2 p-1 rounded-full ${theme === "dark" ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-800"}`}>
                                                                <AlertCircle size={14} />
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"} line-clamp-1`}>
                                                        {ticket.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm flex items-center">
                                                <UserCircle size={16} className={`mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                                <span>{ticket.createdBy}</span>
                                            </div>
                                            <div className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {ticket.userRole} • {ticket.userEmail}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm flex items-center">
                                                <Calendar size={14} className="mr-1 text-gray-400" />
                                                {format(ticket.createdAt, "MMM d, yyyy")}
                                            </div>
                                            <div className="text-sm mt-1 flex items-center">
                                                <Clock size={14} className="mr-1 text-gray-400" />
                                                {format(ticket.createdAt, "h:mm a")} ({formatRelativeTime(ticket.createdAt)})
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-2">
                                                <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${getStatusColor(ticket.status)}`}>
                                                    {ticket.status === "Open" && <AlertCircle size={12} className="mr-1" />}
                                                    {ticket.status === "In Progress" && <RefreshCw size={12} className="mr-1" />}
                                                    {ticket.status === "Closed" && <CheckCircle size={12} className="mr-1" />}
                                                    {ticket.status}
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                                                    {ticket.priority} Priority
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(ticket.category)}`}>
                                                    {ticket.category}
                                                </span>
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
                                                        onClick={() => handleViewTicket(ticket)}
                                                    >
                                                        <MessageCircle className="mr-2 h-4 w-4" />
                                                        <span>View & Reply</span>
                                                    </DropdownMenuItem>
                                                    {ticket.status !== "Closed" && (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer flex items-center"
                                                        >
                                                            <CheckCircle className="mr-2 h-4 w-4" />
                                                            <span>Mark as Resolved</span>
                                                        </DropdownMenuItem>
                                                    )}
                                                    {ticket.status === "Open" && (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer flex items-center"
                                                        >
                                                            <RefreshCw className="mr-2 h-4 w-4" />
                                                            <span>Mark as In Progress</span>
                                                        </DropdownMenuItem>
                                                    )}
                                                    {ticket.status === "Closed" && (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer flex items-center"
                                                        >
                                                            <RefreshCw className="mr-2 h-4 w-4" />
                                                            <span>Reopen Ticket</span>
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
                                        <HelpCircle size={40} className="mx-auto mb-2 text-gray-400" />
                                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                            No tickets found matching your criteria
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
                {filteredTickets.length > 0 && (
                    <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                            Showing <span className="font-medium">{indexOfFirstTicket + 1}</span>
                            {" "}-{" "}
                            <span className="font-medium">
                                {Math.min(indexOfLastTicket, filteredTickets.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredTickets.length}</span> tickets
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

            {/* View Ticket Dialog */}
            {viewedTicket && (
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent
                        className={`${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : ""} max-w-4xl`}
                    >
                        <DialogHeader>
                            <div className="flex items-center">
                                <span className={`px-2 py-1 text-xs rounded-full mr-2 ${getCategoryColor(viewedTicket.category)}`}>
                                    {viewedTicket.category}
                                </span>
                                <DialogTitle className={theme === "dark" ? "text-white" : ""}>
                                    {viewedTicket.subject}
                                </DialogTitle>
                            </div>
                            <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                                <div className="flex items-center justify-between">
                                    <span>Ticket {viewedTicket.id} • {format(viewedTicket.createdAt, "MMM d, yyyy 'at' h:mm a")}</span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(viewedTicket.status)}`}>
                                        {viewedTicket.status}
                                    </span>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="flex items-start space-x-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-blue-600">{viewedTicket.createdBy.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <span className="font-medium">{viewedTicket.createdBy}</span>
                                        <span className={`ml-2 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            {viewedTicket.userRole}
                                        </span>
                                    </div>
                                    <div className={`mt-2 p-3 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                        <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                                            {viewedTicket.description}
                                        </p>
                                    </div>
                                    <div className={`mt-1 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        {format(viewedTicket.createdAt, "MMM d, yyyy 'at' h:mm a")}
                                    </div>
                                </div>
                            </div>

                            <Separator className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"} />

                            <div className="space-y-4">
                                {viewedTicket.responses.map((response) => (
                                    <div key={response.id} className="flex items-start space-x-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className={response.from === "User" ? "bg-blue-600" : "bg-green-600"}>
                                                {response.from === "User"
                                                    ? viewedTicket.createdBy.split(' ').map(n => n[0]).join('')
                                                    : response.agentName?.split(' ').map(n => n[0]).join('') || "SP"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <span className="font-medium">
                                                    {response.from === "User" ? viewedTicket.createdBy : response.agentName || "Support Team"}
                                                </span>
                                                <span className={`ml-2 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    {response.from === "User" ? viewedTicket.userRole : "Support Agent"}
                                                </span>
                                            </div>
                                            <div className={`mt-2 p-3 rounded-lg ${response.from === "User"
                                                    ? theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                                                    : theme === "dark" ? "bg-blue-900/30" : "bg-blue-50"
                                                }`}>
                                                <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                                                    {response.message}
                                                </p>
                                            </div>
                                            <div className={`mt-1 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {format(response.timestamp, "MMM d, yyyy 'at' h:mm a")}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {viewedTicket.status !== "Closed" && (
                                <div className="mt-4">
                                    <Label htmlFor="reply" className={theme === "dark" ? "text-white" : ""}>
                                        Your Reply
                                    </Label>
                                    <Textarea
                                        id="reply"
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                        className={`mt-1 ${getInputStyle()}`}
                                        placeholder="Type your response here..."
                                        rows={4}
                                    />
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsViewDialogOpen(false)}
                                    className={theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}
                                >
                                    Close
                                </Button>

                                {viewedTicket.status !== "Closed" && (
                                    <>
                                        <Button
                                            onClick={handleSendReply}
                                            className={
                                                theme === "dark"
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                            }
                                            disabled={!replyMessage.trim()}
                                        >
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            Send Reply
                                        </Button>

                                        <Button
                                            className={
                                                theme === "dark"
                                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                                    : "bg-green-600 hover:bg-green-700 text-white"
                                            }
                                        >
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Resolve & Close
                                        </Button>
                                    </>
                                )}

                                {viewedTicket.status === "Closed" && (
                                    <Button
                                        className={
                                            theme === "dark"
                                                ? "bg-amber-600 hover:bg-amber-700 text-white"
                                                : "bg-amber-600 hover:bg-amber-700 text-white"
                                        }
                                    >
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Reopen Ticket
                                    </Button>
                                )}
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
