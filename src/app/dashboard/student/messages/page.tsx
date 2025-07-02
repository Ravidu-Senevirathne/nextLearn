"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import {
    Search,
    MoreVertical,
    Send,
    Paperclip,
    Image as ImageIcon,
    Smile,
    Check,
    CheckCheck,
    ChevronDown,
    Phone,
    Video,
    PlusCircle,
    Filter,
    Bell,
    MessageSquare,
    User,
    Users
} from 'lucide-react';

// Mock data for conversations
const mockConversations = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        avatar: "/images/avatars/lecturer-1.jpg",
        lastMessage: "Please submit your assignment by Friday",
        timestamp: "10:42 AM",
        unread: 2,
        online: true,
        course: "Web Development",
        role: "lecturer"
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        avatar: "/images/avatars/lecturer-2.jpg",
        lastMessage: "Office hours will be from 2-4pm tomorrow",
        timestamp: "Yesterday",
        unread: 0,
        online: false,
        course: "Data Science",
        role: "lecturer"
    },
    {
        id: 3,
        name: "React Study Group",
        avatar: null,
        isGroup: true,
        participants: ["You", "Emma", "John", "+4 others"],
        lastMessage: "Emma: When should we meet for the project?",
        timestamp: "Yesterday",
        unread: 4,
        course: "React Framework",
        role: "group"
    },
    {
        id: 4,
        name: "Emma Davis",
        avatar: "/images/avatars/student-1.jpg",
        lastMessage: "Can you share your notes from today's lecture?",
        timestamp: "Monday",
        unread: 0,
        online: true,
        course: "Mobile App Development",
        role: "student"
    },
    {
        id: 5,
        name: "Teaching Assistant - John Smith",
        avatar: "/images/avatars/ta-1.jpg",
        lastMessage: "I've reviewed your draft, let's discuss it",
        timestamp: "Monday",
        unread: 1,
        online: false,
        course: "Python Programming",
        role: "ta"
    },
    {
        id: 6,
        name: "Python Project Team",
        avatar: null,
        isGroup: true,
        participants: ["You", "Miguel", "Lisa", "+2 others"],
        lastMessage: "You: I've completed my part of the code",
        timestamp: "Sunday",
        unread: 0,
        course: "Python Programming",
        role: "group"
    },
    {
        id: 7,
        name: "Academic Advisor - Dr. Lee",
        avatar: "/images/avatars/staff-1.jpg",
        lastMessage: "Let's schedule a meeting to discuss your progress",
        timestamp: "Last week",
        unread: 0,
        online: false,
        course: "Academic Support",
        role: "staff"
    }
];

// Mock messages for a conversation
const mockMessages = [
    {
        id: 1,
        sender: "lecturer",
        text: "Hello! How are you progressing with your final project?",
        timestamp: "10:30 AM",
        status: "read"
    },
    {
        id: 2,
        sender: "student",
        text: "Hi Dr. Johnson, I'm making good progress. I've completed the frontend design.",
        timestamp: "10:35 AM",
        status: "read"
    },
    {
        id: 3,
        sender: "lecturer",
        text: "Great! Have you started working on the backend API integration yet?",
        timestamp: "10:37 AM",
        status: "read"
    },
    {
        id: 4,
        sender: "student",
        text: "Yes, I've set up the routes and controllers. I'm currently working on the database models and authentication.",
        timestamp: "10:40 AM",
        status: "read"
    },
    {
        id: 5,
        sender: "lecturer",
        text: "Excellent progress. Don't forget that your submission deadline is next Friday at 11:59 PM.",
        timestamp: "10:41 AM",
        status: "read"
    },
    {
        id: 6,
        sender: "student",
        text: "Thanks for the reminder. I have a quick question about the deployment requirements. Do we need to deploy to a specific platform?",
        timestamp: "10:42 AM",
        status: "sent"
    }
];

// Placeholder avatar component
const Avatar = ({ src, name, online, size = 'md', role = 'student' }: { src?: string | null, name: string, online?: boolean, size?: 'sm' | 'md' | 'lg', role?: string }) => {
    const { theme } = useTheme();
    const initials = name.split(' ').map(part => part[0]).join('').toUpperCase();
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    // Different color palettes based on role
    const roleBgColors: Record<string, string[]> = {
        student: [
            'bg-blue-500', 'bg-indigo-500', 'bg-cyan-500', 'bg-sky-500'
        ],
        lecturer: [
            'bg-emerald-500', 'bg-green-500', 'bg-teal-500'
        ],
        ta: [
            'bg-amber-500', 'bg-yellow-500', 'bg-orange-500'
        ],
        group: [
            'bg-purple-500', 'bg-violet-500', 'bg-fuchsia-500'
        ],
        staff: [
            'bg-rose-500', 'bg-pink-500', 'bg-red-500'
        ]
    };

    const bgColors = roleBgColors[role] || roleBgColors.student;

    // Use name to deterministically select a color
    const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % bgColors.length;
    const bgColor = bgColors[colorIndex];

    return (
        <div className="relative">
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className={`${sizes[size]} rounded-full object-cover`}
                />
            ) : (
                <div className={`${sizes[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-medium`}>
                    {initials}
                </div>
            )}
            {online !== undefined && (
                <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ${theme === 'dark' ? 'ring-gray-800' : 'ring-white'} ${online ? 'bg-green-400' : 'bg-gray-400'}`}></span>
            )}
        </div>
    );
};

export default function StudentMessagesPage() {
    const { theme } = useTheme();
    const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
    const [messages, setMessages] = useState(mockMessages);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [roleFilter, setRoleFilter] = useState('All');
    const [courseFilter, setCourseFilter] = useState('All Courses');
    const [conversationsFiltered, setConversationsFiltered] = useState(mockConversations);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Apply filters and search to conversations
    useEffect(() => {
        let filtered = mockConversations;

        if (searchTerm) {
            filtered = filtered.filter(conv =>
                conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (courseFilter !== 'All Courses') {
            filtered = filtered.filter(conv => conv.course === courseFilter);
        }

        if (roleFilter !== 'All') {
            filtered = filtered.filter(conv => conv.role === roleFilter.toLowerCase());
        }

        setConversationsFiltered(filtered);
    }, [searchTerm, courseFilter, roleFilter]);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Helper function for theme-specific styling
    const getCardStyle = () => {
        return theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
    };

    const getInputStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
    };

    const getTextColor = () => {
        return theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
    };

    const getSubtleTextColor = () => {
        return theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
    };

    const getBubbleStyle = (isOwn: boolean) => {
        if (isOwn) {
            return theme === 'dark'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-600 text-white';
        } else {
            return theme === 'dark'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-800';
        }
    };

    // Send a new message
    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const newMsg = {
            id: messages.length + 1,
            sender: 'student',
            text: newMessage.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    // Get unique courses for filter
    const uniqueCourses = ['All Courses', ...new Set(mockConversations.map(conv => conv.course))];

    // Role filter options
    const roleOptions = ['All', 'Lecturer', 'Student', 'Group', 'TA', 'Staff'];

    // Get appropriate icon for conversation based on role
    const getConversationIcon = (conversation: any) => {
        if (conversation.isGroup) {
            return <Users size={16} className="mr-1 text-purple-400" />;
        }
        
        switch(conversation.role) {
            case 'lecturer':
                return <User size={16} className="mr-1 text-emerald-400" />;
            case 'student':
                return <User size={16} className="mr-1 text-blue-400" />;
            case 'ta':
                return <User size={16} className="mr-1 text-amber-400" />;
            case 'staff':
                return <User size={16} className="mr-1 text-rose-400" />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className={`text-2xl font-bold mb-6 ${getTextColor()}`}>Messages</h1>

            <div className={`rounded-lg border ${getCardStyle()} overflow-hidden`}>
                <div className="flex h-[calc(100vh-220px)]">
                    {/* Conversations sidebar */}
                    <div className={`w-full lg:w-80 border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}>
                        {/* Search and filter */}
                        <div className="p-4">
                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className={`w-full pl-10 pr-4 py-2 rounded-md border ${getInputStyle()}`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search size={18} className={`absolute top-2.5 left-3 ${getSubtleTextColor()}`} />
                            </div>

                            <div className="flex">
                                <button
                                    onClick={() => setFilterOpen(!filterOpen)}
                                    className={`flex items-center text-sm ${getSubtleTextColor()} hover:${getTextColor()} transition-colors`}
                                >
                                    <Filter size={14} className="mr-1" />
                                    Filter
                                    <ChevronDown size={14} className={`ml-1 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
                                </button>
                            </div>

                            {filterOpen && (
                                <div className="mt-2 p-2 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
                                    <div>
                                        <label className={`block text-xs font-medium mb-1 ${getSubtleTextColor()}`}>Contact Type</label>
                                        <select
                                            className={`w-full text-sm p-1.5 rounded border ${getInputStyle()}`}
                                            value={roleFilter}
                                            onChange={(e) => setRoleFilter(e.target.value)}
                                        >
                                            {roleOptions.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className={`block text-xs font-medium mb-1 ${getSubtleTextColor()}`}>Course</label>
                                        <select
                                            className={`w-full text-sm p-1.5 rounded border ${getInputStyle()}`}
                                            value={courseFilter}
                                            onChange={(e) => setCourseFilter(e.target.value)}
                                        >
                                            {uniqueCourses.map(course => (
                                                <option key={course} value={course}>{course}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Conversations list */}
                        <div className="flex-1 overflow-y-auto">
                            {conversationsFiltered.length > 0 ? (
                                conversationsFiltered.map((conversation) => (
                                    <button
                                        key={conversation.id}
                                        className={`w-full text-left px-4 py-3 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                                            } ${activeConversation.id === conversation.id
                                                ? theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                            } transition-colors duration-150`}
                                        onClick={() => setActiveConversation(conversation)}
                                    >
                                        <div className="flex items-start">
                                            <div className="mr-3">
                                                <Avatar
                                                    src={conversation.avatar}
                                                    name={conversation.name}
                                                    online={conversation.online}
                                                    role={conversation.role}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline">
                                                    <h4 className={`font-medium truncate ${getTextColor()}`}>
                                                        {conversation.name}
                                                    </h4>
                                                    <span className={`text-xs ${getSubtleTextColor()} whitespace-nowrap ml-2`}>
                                                        {conversation.timestamp}
                                                    </span>
                                                </div>
                                                <p className={`text-sm truncate ${conversation.unread ? getTextColor() : getSubtleTextColor()}`}>
                                                    {conversation.lastMessage}
                                                </p>
                                                <div className="flex items-center">
                                                    {getConversationIcon(conversation)}
                                                    <span className={`text-xs ${getSubtleTextColor()}`}>
                                                        {conversation.course}
                                                    </span>
                                                </div>
                                            </div>
                                            {conversation.unread > 0 && (
                                                <div className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                                    {conversation.unread}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center">
                                    <p className={`text-sm ${getSubtleTextColor()}`}>No conversations found</p>
                                </div>
                            )}
                        </div>

                        {/* Bottom actions */}
                        <div className={`p-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <button
                                className={`w-full flex items-center justify-center py-2 rounded-md ${theme === 'dark'
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                    } text-white`}
                            >
                                <PlusCircle size={16} className="mr-2" />
                                <span className="text-sm font-medium">New Message</span>
                            </button>
                        </div>
                    </div>

                    {/* Active conversation */}
                    {activeConversation ? (
                        <div className="hidden lg:flex flex-col flex-1">
                            {/* Conversation header */}
                            <div className={`p-4 flex items-center justify-between border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex items-center">
                                    <Avatar
                                        src={activeConversation.avatar}
                                        name={activeConversation.name}
                                        online={activeConversation.online}
                                        size="lg"
                                        role={activeConversation.role}
                                    />
                                    <div className="ml-3">
                                        <h3 className={`font-medium text-lg ${getTextColor()}`}>{activeConversation.name}</h3>
                                        <p className={`text-sm ${getSubtleTextColor()}`}>
                                            {activeConversation.online ? 'Online' : activeConversation.lastSeen ? `Last seen ${activeConversation.lastSeen}` : ''}
                                            {activeConversation.isGroup && `${activeConversation.participants?.join(', ')}`}
                                            {!activeConversation.isGroup && ` • ${activeConversation.course}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${getSubtleTextColor()} hover:${getTextColor()}`}>
                                        <Video size={18} />
                                    </button>
                                    <button className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${getSubtleTextColor()} hover:${getTextColor()}`}>
                                        <Bell size={18} />
                                    </button>
                                    <button className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${getSubtleTextColor()} hover:${getTextColor()}`}>
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto">
                                <div className="space-y-4">
                                    {messages.map((msg) => {
                                        const isOwn = msg.sender === 'student';
                                        return (
                                            <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                                                {!isOwn && (
                                                    <div className="mr-2 flex-shrink-0">
                                                        <Avatar
                                                            src={activeConversation.avatar}
                                                            name={activeConversation.name}
                                                            size="sm"
                                                            role={activeConversation.role}
                                                        />
                                                    </div>
                                                )}
                                                <div className={`max-w-[70%]`}>
                                                    <div className={`rounded-lg px-4 py-2 ${getBubbleStyle(isOwn)}`}>
                                                        {msg.text}
                                                    </div>
                                                    <div className={`mt-1 text-xs flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                                                        <span className={getSubtleTextColor()}>
                                                            {msg.timestamp}
                                                        </span>
                                                        {isOwn && (
                                                            <span className="ml-1 text-blue-400">
                                                                {msg.status === 'read' ? <CheckCheck size={14} /> : <Check size={14} />}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Message input */}
                            <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                <form
                                    className="flex items-center gap-2"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }}
                                >
                                    <button type="button" className={`p-2 ${getSubtleTextColor()} hover:${getTextColor()}`}>
                                        <Paperclip size={20} />
                                    </button>
                                    <div className="flex-1 relative flex items-center gap-2">
                                        <textarea
                                            className={`w-full px-4 py-2.5 rounded-lg border resize-none ${getInputStyle()}`}
                                            placeholder="Type a message..."
                                            rows={1}
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage();
                                                }
                                            }}
                                        ></textarea>
                                        <div className="flex items-center gap-1">
                                            <button type="button" className={`p-1.5 ${getSubtleTextColor()} hover:${getTextColor()}`}>
                                                <Smile size={20} />
                                            </button>
                                            <button type="button" className={`p-1.5 ${getSubtleTextColor()} hover:${getTextColor()}`}>
                                                <ImageIcon size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className={`p-2.5 rounded-full ${newMessage.trim()
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                : theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-400'
                                            }`}
                                        disabled={!newMessage.trim()}
                                    >
                                        <Send size={20} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden lg:flex flex-col flex-1 items-center justify-center p-4">
                            <div className={`p-4 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
                                <MessageSquare size={40} className={getSubtleTextColor()} />
                            </div>
                            <h3 className={`text-xl font-medium mb-2 ${getTextColor()}`}>No conversation selected</h3>
                            <p className={`text-center ${getSubtleTextColor()}`}>
                                Select a conversation from the list or start a new one
                            </p>
                        </div>
                    )}

                    {/* Mobile view - No conversation selected message */}
                    <div className="flex flex-1 lg:hidden items-center justify-center p-4">
                        <div className="text-center">
                            <div className={`p-4 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} mb-4 inline-block`}>
                                <MessageSquare size={40} className={getSubtleTextColor()} />
                            </div>
                            <h3 className={`text-xl font-medium mb-2 ${getTextColor()}`}>Select a Conversation</h3>
                            <p className={getSubtleTextColor()}>
                                Choose a conversation from the list to view messages
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
