"use client";

import React, { useState } from 'react';
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
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
import {
    Search,
    Filter,
    MoreHorizontal,
    MessageCircle,
    Users,
    User,
    Star,
    Clock,
    Send,
    Trash2,
    Archive,
    ChevronLeft,
    ChevronRight,
    Mail,
    MailOpen,
    MailPlus,
    Inbox,
    AlertCircle,
    CheckCircle,
    Flag,
    ArrowUpDown,
    PlusCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { format } from "date-fns";

// Mock data for messages
const mockMessages = [
    {
        id: "msg-1001",
        subject: "Question about JavaScript course",
        content: "Hello, I'm having trouble with the advanced functions section in the JavaScript course. The examples in lecture 15 aren't working as described. Could you please help?",
        sender: {
            id: "user-123",
            name: "Michael Johnson",
            email: "michael.j@example.com",
            role: "Student",
            avatar: null
        },
        isRead: true,
        isStarred: false,
        timestamp: new Date(2023, 10, 18, 14, 35),
        category: "Course Support",
        thread: [
            {
                id: "reply-1",
                content: "Hello, I'm having trouble with the advanced functions section in the JavaScript course. The examples in lecture 15 aren't working as described. Could you please help?",
                sender: {
                    id: "user-123",
                    name: "Michael Johnson",
                    role: "Student"
                },
                timestamp: new Date(2023, 10, 18, 14, 35)
            },
            {
                id: "reply-2",
                content: "Hi Michael, I'll look into this right away. Could you please tell me which specific example is causing problems? Also, what browser are you using?",
                sender: {
                    id: "admin-1",
                    name: "Admin Support",
                    role: "Admin"
                },
                timestamp: new Date(2023, 10, 18, 15, 20)
            },
            {
                id: "reply-3",
                content: "Thanks for the quick response! It's the closure example where we're creating a counter. I'm using Chrome version 96.0.4664.110.",
                sender: {
                    id: "user-123",
                    name: "Michael Johnson",
                    role: "Student"
                },
                timestamp: new Date(2023, 10, 18, 15, 45)
            }
        ]
    },
    {
        id: "msg-1002",
        subject: "Certificate not generating",
        content: "I've completed all the requirements for the Data Science course but my completion certificate isn't generating. I've tried refreshing and waiting for 24 hours as suggested.",
        sender: {
            id: "user-124",
            name: "Sarah Williams",
            email: "sarah.w@example.com",
            role: "Student",
            avatar: null
        },
        isRead: false,
        isStarred: true,
        timestamp: new Date(2023, 10, 19, 9, 15),
        category: "Technical Support",
        thread: [
            {
                id: "reply-1",
                content: "I've completed all the requirements for the Data Science course but my completion certificate isn't generating. I've tried refreshing and waiting for 24 hours as suggested.",
                sender: {
                    id: "user-124",
                    name: "Sarah Williams",
                    role: "Student"
                },
                timestamp: new Date(2023, 10, 19, 9, 15)
            }
        ]
    },
    {
        id: "msg-1003",
        subject: "Request for additional resources",
        content: "The Python for AI course is excellent, but I'm wondering if you could provide some additional resources on neural networks? I'd like to dive deeper into this topic.",
        sender: {
            id: "user-125",
            name: "James Robinson",
            email: "james.r@example.com",
            role: "Student",
            avatar: null
        },
        isRead: true,
        isStarred: false,
        timestamp: new Date(2023, 10, 17, 16, 22),
        category: "Content Request",
        thread: [
            {
                id: "reply-1",
                content: "The Python for AI course is excellent, but I'm wondering if you could provide some additional resources on neural networks? I'd like to dive deeper into this topic.",
                sender: {
                    id: "user-125",
                    name: "James Robinson",
                    role: "Student"
                },
                timestamp: new Date(2023, 10, 17, 16, 22)
            },
            {
                id: "reply-2",
                content: "Hi James, thank you for your interest in learning more! I've shared your request with our content team. In the meantime, I can recommend these resources: 1) Deep Learning by Ian Goodfellow, 2) Neural Networks and Deep Learning by Michael Nielsen (free online), and 3) Stanford's CS231n course materials. Would these be helpful for you?",
                sender: {
                    id: "admin-2",
                    name: "Content Admin",
                    role: "Admin"
                },
                timestamp: new Date(2023, 10, 17, 17, 30)
            }
        ]
    },
    {
        id: "msg-1004",
        subject: "Feedback on new UI design",
        content: "I've been using the platform since the recent update, and I'm really impressed with the new UI design. It's much more intuitive and visually appealing. Great job!",
        sender: {
            id: "user-126",
            name: "Emma Davis",
            email: "emma.d@example.com",
            role: "Student",
            avatar: null
        },
        isRead: true,
        isStarred: true,
        timestamp: new Date(2023, 10, 16, 11, 45),
        category: "Feedback",
        thread: [
            {
                id: "reply-1",
                content: "I've been using the platform since the recent update, and I'm really impressed with the new UI design. It's much more intuitive and visually appealing. Great job!",
                sender: {
                    id: "user-126",
                    name: "Emma Davis",
                    role: "Student"
                },
                timestamp: new Date(2023, 10, 16, 11, 45)
            },
            {
                id: "reply-2",
                content: "Hi Emma, thank you so much for your positive feedback! We're thrilled to hear that you're enjoying the new UI. Our design team worked hard to improve the user experience. If you have any specific features you particularly like or suggestions for further improvements, we'd love to hear them!",
                sender: {
                    id: "admin-3",
                    name: "Product Admin",
                    role: "Admin"
                },
                timestamp: new Date(2023, 10, 16, 13, 10)
            }
        ]
    },
    {
        id: "msg-1005",
        subject: "Payment issue with subscription",
        content: "I was charged twice for my monthly subscription on November 15th. My transaction IDs are #TRX-5789023 and #TRX-5789024. Please help resolve this issue.",
        sender: {
            id: "user-127",
            name: "David Wilson",
            email: "david.w@example.com",
            role: "Student",
            avatar: null
        },
        isRead: false,
        isStarred: false,
        timestamp: new Date(2023, 10, 15, 8, 20),
        category: "Billing",
        thread: [
            {
                id: "reply-1",
                content: "I was charged twice for my monthly subscription on November 15th. My transaction IDs are #TRX-5789023 and #TRX-5789024. Please help resolve this issue.",
                sender: {
                    id: "user-127",
                    name: "David Wilson",
                    role: "Student"
                },
                timestamp: new Date(2023, 10, 15, 8, 20)
            }
        ]
    },
    {
        id: "msg-1006",
        subject: "Instructor application status",
        content: "I submitted my application to become an instructor three weeks ago but haven't heard back. My application ID is INSTR-2023-1089. Could you please provide an update on my status?",
        sender: {
            id: "user-128",
            name: "Robert Chen",
            email: "robert.c@example.com",
            role: "Student",
            avatar: null
        },
        isRead: true,
        isStarred: false,
        timestamp: new Date(2023, 10, 14, 16, 55),
        category: "Instructor Support",
        thread: [
            {
                id: "reply-1",
                content: "I submitted my application to become an instructor three weeks ago but haven't heard back. My application ID is INSTR-2023-1089. Could you please provide an update on my status?",
                sender: {
                    id: "user-128",
                    name: "Robert Chen",
                    role: "Student"
                },
                timestamp: new Date(2023, 10, 14, 16, 55)
            },
            {
                id: "reply-2",
                content: "Hi Robert, I apologize for the delay in response regarding your instructor application. I've looked up your application and see that it's currently in the final review stage. We typically complete this within 30 days of submission. You should receive an update within the next week. If you have any specific questions about the process, feel free to ask!",
                sender: {
                    id: "admin-4",
                    name: "Instructor Relations",
                    role: "Admin"
                },
                timestamp: new Date(2023, 10, 14, 17, 30)
            }
        ]
    },
    {
        id: "msg-1007",
        subject: "Course suggestion",
        content: "I would love to see a course on cybersecurity fundamentals. With the increasing importance of digital security, I think many students would benefit from this topic.",
        sender: {
            id: "user-129",
            name: "Olivia Martinez",
            email: "olivia.m@example.com",
            role: "Student",
            avatar: null
        },
        isRead: false,
        isStarred: false,
        timestamp: new Date(2023, 10, 13, 10, 10),
        category: "Content Request",
        thread: [
            {
                id: "reply-1",
                content: "I would love to see a course on cybersecurity fundamentals. With the increasing importance of digital security, I think many students would benefit from this topic.",
                sender: {
                    id: "user-129",
                    name: "Olivia Martinez",
                    role: "Student"
                },
                timestamp: new Date(2023, 10, 13, 10, 10)
            }
        ]
    },
];

// Message categories for filtering
const messageCategories = [
    "All Categories",
    "Course Support",
    "Technical Support",
    "Billing",
    "Content Request",
    "Feedback",
    "Instructor Support",
];

export default function MessagesPage() {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [filter, setFilter] = useState("all"); // all, unread, starred
    const [sortField, setSortField] = useState("timestamp");
    const [sortDirection, setSortDirection] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
    const [replyMessage, setReplyMessage] = useState("");
    const [newMessage, setNewMessage] = useState({
        to: "",
        subject: "",
        content: "",
        category: "Course Support",
    });

    const messagesPerPage = 5;

    // Filter and sort messages
    const filteredMessages = mockMessages
        .filter((message) => {
            const matchesSearch =
                message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.sender.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === "All Categories" || message.category === selectedCategory;

            const matchesFilter =
                (filter === "all") ||
                (filter === "unread" && !message.isRead) ||
                (filter === "starred" && message.isStarred);

            return matchesSearch && matchesCategory && matchesFilter;
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
    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = filteredMessages.slice(
        indexOfFirstMessage,
        indexOfLastMessage
    );
    const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

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
        setSelectedCategory("All Categories");
        setFilter("all");
        setCurrentPage(1);
    };

    // View message details
    const handleViewMessage = (message) => {
        setSelectedMessage(message);
        // Mark as read when viewed
        if (!message.isRead) {
            // In a real app, you would make an API call to mark as read
            console.log(`Marking message ${message.id} as read`);
        }
    };

    // Send reply to message
    const handleSendReply = () => {
        if (replyMessage.trim() === "") return;

        console.log(`Sending reply to message ${selectedMessage.id}:`, replyMessage);
        // In a real app, you would make an API call to send the reply

        // Clear reply field
        setReplyMessage("");
    };

    // Send new message
    const handleSendMessage = () => {
        console.log("Sending new message:", newMessage);
        // In a real app, you would make an API call to send the message

        // Close dialog and reset form
        setIsComposeDialogOpen(false);
        setNewMessage({
            to: "",
            subject: "",
            content: "",
            category: "Course Support",
        });
    };

    // Toggle star status
    const handleToggleStar = (message, e) => {
        e.stopPropagation();
        console.log(`Toggling star for message ${message.id}`);
        // In a real app, you would make an API call to update the star status
    };

    // Calculate statistics
    const statistics = {
        total: mockMessages.length,
        unread: mockMessages.filter((m) => !m.isRead).length,
        starred: mockMessages.filter((m) => m.isStarred).length,
    };

    // Format relative time
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

    const getCategoryColor = (category) => {
        switch (category) {
            case "Course Support":
                return theme === "dark"
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800";
            case "Technical Support":
                return theme === "dark"
                    ? "bg-purple-900/30 text-purple-400"
                    : "bg-purple-100 text-purple-800";
            case "Billing":
                return theme === "dark"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800";
            case "Content Request":
                return theme === "dark"
                    ? "bg-amber-900/30 text-amber-400"
                    : "bg-amber-100 text-amber-800";
            case "Feedback":
                return theme === "dark"
                    ? "bg-sky-900/30 text-sky-400"
                    : "bg-sky-100 text-sky-800";
            case "Instructor Support":
                return theme === "dark"
                    ? "bg-indigo-900/30 text-indigo-400"
                    : "bg-indigo-100 text-indigo-800";
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
                    <h1 className="text-2xl font-bold">Messages</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Manage communications with users
                    </p>
                </div>
                <div>
                    <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className={
                                    theme === "dark"
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-teal-600 hover:bg-teal-700 text-white"
                                }
                            >
                                <MailPlus size={16} className="mr-2" />
                                Compose Message
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
                                    Compose New Message
                                </DialogTitle>
                                <DialogDescription className={theme === "dark" ? "text-gray-400" : ""}>
                                    Send a message to a user or group of users
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="to" className={theme === "dark" ? "text-white" : ""}>
                                        To
                                    </Label>
                                    <Input
                                        id="to"
                                        value={newMessage.to}
                                        onChange={(e) =>
                                            setNewMessage({ ...newMessage, to: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="Email address or username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject" className={theme === "dark" ? "text-white" : ""}>
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        value={newMessage.subject}
                                        onChange={(e) =>
                                            setNewMessage({ ...newMessage, subject: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="Message subject"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category" className={theme === "dark" ? "text-white" : ""}>
                                        Category
                                    </Label>
                                    <select
                                        id="category"
                                        value={newMessage.category}
                                        onChange={(e) =>
                                            setNewMessage({ ...newMessage, category: e.target.value })
                                        }
                                        className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                                    >
                                        {messageCategories.slice(1).map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content" className={theme === "dark" ? "text-white" : ""}>
                                        Message
                                    </Label>
                                    <Textarea
                                        id="content"
                                        value={newMessage.content}
                                        onChange={(e) =>
                                            setNewMessage({ ...newMessage, content: e.target.value })
                                        }
                                        className={getInputStyle()}
                                        placeholder="Type your message here..."
                                        rows={6}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsComposeDialogOpen(false)}
                                    className={theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSendMessage}
                                    className={
                                        theme === "dark"
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-teal-600 hover:bg-teal-700 text-white"
                                    }
                                    disabled={!newMessage.to || !newMessage.subject || !newMessage.content}
                                >
                                    <Send size={16} className="mr-2" />
                                    Send Message
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"} mr-3`}>
                            <Inbox size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Total Messages
                            </p>
                            <p className="text-2xl font-semibold">{statistics.total}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"} mr-3`}>
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Unread Messages
                            </p>
                            <p className="text-2xl font-semibold">{statistics.unread}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border p-4 ${getCardStyle()}`}>
                    <div className="flex items-center">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-700"} mr-3`}>
                            <Star size={20} />
                        </div>
                        <div>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Starred Messages
                            </p>
                            <p className="text-2xl font-semibold">{statistics.starred}</p>
                        </div>
                    </div>
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
                        <Input
                            type="text"
                            placeholder="Search messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`pl-10 ${getInputStyle()}`}
                        />
                    </div>

                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            {messageCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className={`w-full p-2 rounded-md border ${getInputStyle()}`}
                        >
                            <option value="all">All Messages</option>
                            <option value="unread">Unread Only</option>
                            <option value="starred">Starred Only</option>
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

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Messages List */}
                <div className={`rounded-lg border ${getCardStyle()} overflow-hidden flex-1 ${selectedMessage ? 'hidden lg:block' : ''}`}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className={theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort("sender.name")}
                                    >
                                        <div className="flex items-center">
                                            <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>From</span>
                                            <ArrowUpDown size={14} className="ml-1" />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort("subject")}
                                    >
                                        <div className="flex items-center">
                                            <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Subject</span>
                                            <ArrowUpDown size={14} className="ml-1" />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort("timestamp")}
                                    >
                                        <div className="flex items-center">
                                            <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Date</span>
                                            <ArrowUpDown size={14} className="ml-1" />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
                                {currentMessages.length > 0 ? (
                                    currentMessages.map((message) => (
                                        <tr
                                            key={message.id}
                                            className={`${theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"} cursor-pointer ${!message.isRead ? 'font-semibold' : ''}`}
                                            onClick={() => handleViewMessage(message)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <Avatar className="h-8 w-8 mr-3">
                                                        <AvatarFallback className="bg-blue-600">{message.sender.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center">
                                                            <span className="text-sm">{message.sender.name}</span>
                                                            {!message.isRead && (
                                                                <span className={`ml-2 w-2 h-2 rounded-full ${theme === "dark" ? "bg-blue-400" : "bg-blue-600"}`}></span>
                                                            )}
                                                        </div>
                                                        <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                            {message.sender.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm">{message.subject}</span>
                                                    </div>
                                                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} line-clamp-1`}>
                                                        {message.content}
                                                    </p>
                                                    <div className="mt-1">
                                                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(message.category)}`}>
                                                            {message.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm">
                                                    {format(message.timestamp, "MMM d, yyyy")}
                                                </div>
                                                <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    {formatRelativeTime(message.timestamp)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        onClick={(e) => handleToggleStar(message, e)}
                                                    >
                                                        <Star
                                                            className={`h-4 w-4 ${message.isStarred ? 'text-yellow-500 fill-yellow-500' : ''}`}
                                                        />
                                                    </Button>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                                                            <DropdownMenuItem
                                                                className="cursor-pointer flex items-center"
                                                            >
                                                                <MailOpen className="mr-2 h-4 w-4" />
                                                                <span>Mark as {message.isRead ? 'unread' : 'read'}</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="cursor-pointer flex items-center"
                                                            >
                                                                <Archive className="mr-2 h-4 w-4" />
                                                                <span>Archive</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="cursor-pointer flex items-center text-red-600 dark:text-red-400"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                <span>Delete</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center">
                                            <MessageCircle size={40} className="mx-auto mb-2 text-gray-400" />
                                            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                                No messages found matching your criteria
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
                    {filteredMessages.length > 0 && (
                        <div className={`px-6 py-3 flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                            <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                Showing <span className="font-medium">{indexOfFirstMessage + 1}</span>
                                {" "}-{" "}
                                <span className="font-medium">
                                    {Math.min(indexOfLastMessage, filteredMessages.length)}
                                </span>{" "}
                                of <span className="font-medium">{filteredMessages.length}</span> messages
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                                    disabled={currentPage === 1}
                                    className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                                >
                                    <ChevronLeft size={16} />
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
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Message Detail View */}
                {selectedMessage && (
                    <div className={`${getCardStyle()} rounded-lg border flex-1 ${selectedMessage ? 'block' : 'hidden lg:block'}`}>
                        <div className="p-4 border-b flex justify-between items-center">
                            <div className="flex items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mr-2 lg:hidden"
                                    onClick={() => setSelectedMessage(null)}
                                >
                                    <ChevronLeft size={16} />
                                </Button>
                                <h3 className="text-lg font-semibold">{selectedMessage.subject}</h3>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => handleToggleStar(selectedMessage, e)}
                                >
                                    <Star
                                        className={`h-4 w-4 ${selectedMessage.isStarred ? 'text-yellow-500 fill-yellow-500' : ''}`}
                                    />
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                                        <DropdownMenuItem className="cursor-pointer flex items-center">
                                            <Archive className="mr-2 h-4 w-4" />
                                            <span>Archive</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer flex items-center">
                                            <Flag className="mr-2 h-4 w-4" />
                                            <span>Flag as Important</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer flex items-center text-red-600 dark:text-red-400">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <Avatar className="h-10 w-10 mr-3">
                                        <AvatarFallback className="bg-blue-600">{selectedMessage.sender.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{selectedMessage.sender.name}</div>
                                        <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            {selectedMessage.sender.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm">{format(selectedMessage.timestamp, "MMM d, yyyy")}</div>
                                    <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        {format(selectedMessage.timestamp, "h:mm a")}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(selectedMessage.category)}`}>
                                    {selectedMessage.category}
                                </span>
                            </div>

                            {/* Message Thread */}
                            <div className="space-y-6">
                                {selectedMessage.thread.map((message) => (
                                    <div key={message.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Avatar className="h-8 w-8 mr-2">
                                                    <AvatarFallback className={message.sender.role === "Admin" ? "bg-green-600" : "bg-blue-600"}>
                                                        {message.sender.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="text-sm font-medium">{message.sender.name}</div>
                                                    <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                        {message.sender.role}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {format(message.timestamp, "MMM d, h:mm a")}
                                            </div>
                                        </div>
                                        <div className={`p-3 rounded-lg ${message.sender.role === "Admin"
                                            ? theme === "dark" ? "bg-blue-900/30" : "bg-blue-50"
                                            : theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                                            }`}>
                                            <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                                                {message.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reply Form */}
                            <div className="mt-6">
                                <Label htmlFor="reply" className={theme === "dark" ? "text-white" : ""}>
                                    Your Reply
                                </Label>
                                <Textarea
                                    id="reply"
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    className={`mt-1 ${getInputStyle()}`}
                                    placeholder="Type your reply here..."
                                    rows={4}
                                />
                                <div className="flex justify-end mt-3">
                                    <Button
                                        onClick={handleSendReply}
                                        className={
                                            theme === "dark"
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : "bg-teal-600 hover:bg-teal-700 text-white"
                                        }
                                        disabled={!replyMessage.trim()}
                                    >
                                        <Send size={16} className="mr-2" />
                                        Send Reply
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
