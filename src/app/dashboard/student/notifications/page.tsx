"use client";

import React, { useState, useMemo } from 'react';
import { Search, Bell, MessageCircle, Clock, Award, Info, Filter, CheckCircle, Trash, MoreHorizontal, ChevronDown, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Notification } from '@/Components/Dashboard/student/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// Mock data for notifications
const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'announcement',
        title: 'New Course Material Available',
        message: 'Additional resources for "Web Development Fundamentals" have been uploaded. Check the materials section for new PDFs and practice exercises.',
        date: '10 minutes ago',
        read: false
    },
    {
        id: '2',
        type: 'grade',
        title: 'Assignment Graded',
        message: 'Your "Data Cleaning" assignment has been graded: A. Check the feedback for comments on your approach and implementation.',
        date: '2 hours ago',
        read: false
    },
    {
        id: '3',
        type: 'message',
        title: 'Message from Instructor',
        message: 'Dr. Jane Smith: "Great job on your last project! Let\'s discuss your progress during office hours tomorrow."',
        date: 'Yesterday',
        read: true
    },
    {
        id: '4',
        type: 'deadline',
        title: 'Assignment Deadline Approaching',
        message: 'The "React Component Library" assignment is due in 2 days. Make sure to submit before the deadline.',
        date: 'Yesterday',
        read: true
    },
    {
        id: '5',
        type: 'announcement',
        title: 'Platform Maintenance',
        message: 'The learning platform will undergo maintenance on Sunday from 2 AM to 5 AM EST. Some features may be unavailable during this time.',
        date: '3 days ago',
        read: true
    },
    {
        id: '6',
        type: 'grade',
        title: 'Quiz Results Available',
        message: 'Your quiz "JavaScript Fundamentals" has been graded. You scored 85%. View detailed results in the grades section.',
        date: '4 days ago',
        read: true
    },
    {
        id: '7',
        type: 'message',
        title: 'Reply from Teaching Assistant',
        message: 'Alex Johnson: "Ive reviewed your question about the database schema. Lets schedule a call to discuss it in detail."',
        date: '1 week ago',
        read: true
    },
    {
        id: '8',
        type: 'deadline',
        title: 'Group Project Milestone',
        message: 'First milestone for the "Data Visualization" group project is due next Monday. Make sure your team has completed all requirements.',
        date: '1 week ago',
        read: true
    },
    {
        id: '9',
        type: 'announcement',
        title: 'New Elective Courses Open',
        message: 'Registration for next semesters elective courses is now open. Review the course catalog and register before spots fill up.',
        date: '2 weeks ago',
        read: true
    },
    {
        id: '10',
        type: 'grade',
        title: 'Midterm Exam Graded',
        message: 'Your midterm exam for "Database Management" has been graded. You received 90%. Great job!',
        date: '3 weeks ago',
        read: true
    }
];

const NotificationsPage = () => {
    const { theme } = useTheme();
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

    // Filter types
    const filterOptions = [
        { id: 'all', label: 'All Notifications' },
        { id: 'unread', label: 'Unread' },
        { id: 'announcement', label: 'Announcements' },
        { id: 'grade', label: 'Grades' },
        { id: 'message', label: 'Messages' },
        { id: 'deadline', label: 'Deadlines' }
    ];

    // Get icon based on notification type
    const getIcon = (type: string) => {
        switch (type) {
            case 'announcement':
                return <Info size={20} className="text-blue-400" />;
            case 'deadline':
                return <Clock size={20} className="text-amber-400" />;
            case 'grade':
                return <Award size={20} className="text-green-400" />;
            case 'message':
                return <MessageCircle size={20} className="text-purple-400" />;
            default:
                return <Bell size={20} className="text-gray-400" />;
        }
    };

    // Filter and search notifications
    const filteredNotifications = useMemo(() => {
        return notifications.filter(notification => {
            // Apply type filter
            const matchesFilter =
                filter === 'all' ||
                (filter === 'unread' && !notification.read) ||
                notification.type === filter;

            // Apply search
            const matchesSearch =
                notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.message.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesFilter && matchesSearch;
        });
    }, [notifications, filter, searchTerm]);

    // Notification stats
    const stats = useMemo(() => {
        const unread = notifications.filter(n => !n.read).length;
        const total = notifications.length;

        return {
            unread,
            total
        };
    }, [notifications]);

    // Handle marking notification as read/unread
    const toggleRead = (id: string) => {
        setNotifications(notifications.map(notification =>
            notification.id === id
                ? { ...notification, read: !notification.read }
                : notification
        ));
    };

    // Handle bulk selection
    const toggleSelect = (id: string) => {
        if (selectedNotifications.includes(id)) {
            setSelectedNotifications(selectedNotifications.filter(notifId => notifId !== id));
        } else {
            setSelectedNotifications([...selectedNotifications, id]);
        }
    };

    // Select or deselect all visible notifications
    const toggleSelectAll = () => {
        if (selectedNotifications.length === filteredNotifications.length) {
            setSelectedNotifications([]);
        } else {
            setSelectedNotifications(filteredNotifications.map(n => n.id));
        }
    };

    // Delete selected notifications
    const deleteSelected = () => {
        setNotifications(notifications.filter(n => !selectedNotifications.includes(n.id)));
        setSelectedNotifications([]);
    };

    // Mark selected as read
    const markSelectedAsRead = () => {
        setNotifications(notifications.map(notification =>
            selectedNotifications.includes(notification.id)
                ? { ...notification, read: true }
                : notification
        ));
        setSelectedNotifications([]);
    };

    // Mark all as read
    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    };

    // Delete notification
    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Notifications</h1>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        You have {stats.unread} unread notifications
                    </p>
                </div>

                {selectedNotifications.length > 0 && (
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            {selectedNotifications.length} selected
                        </span>
                        <button
                            onClick={markSelectedAsRead}
                            className="px-3 py-1.5 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                        >
                            <CheckCircle size={16} className="mr-2" />
                            Mark as Read
                        </button>
                        <button
                            onClick={deleteSelected}
                            className="px-3 py-1.5 rounded-md text-sm bg-red-600 hover:bg-red-700 text-white flex items-center"
                        >
                            <Trash size={16} className="mr-2" />
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Filters and Search */}
            <div className={`mb-6 p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            className={`w-full pl-10 pr-4 py-2 border rounded-md ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500'
                                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="relative inline-flex w-full md:w-auto">
                        <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className={`pl-10 pr-8 py-2 w-full rounded-md appearance-none border ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                        >
                            {filterOptions.map(option => (
                                <option key={option.id} value={option.id}>{option.label}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    <button
                        onClick={markAllAsRead}
                        className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${theme === 'dark'
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }`}
                    >
                        Mark all as read
                    </button>
                </div>
            </div>

            {/* Notification List */}
            {filteredNotifications.length > 0 ? (
                <div className={`rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    {/* Bulk selection header */}
                    <div className="p-3 border-b dark:border-gray-700 flex items-center">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedNotifications.length === filteredNotifications.length}
                                onChange={toggleSelectAll}
                                className={`h-4 w-4 rounded border-gray-300 ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-500 text-blue-600 focus:ring-blue-500'
                                    : 'text-blue-600 focus:ring-blue-500'}`}
                            />
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                Select all
                            </span>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 flex ${!notification.read ? 'bg-blue-50/5 dark:bg-blue-900/10' : ''}`}
                            >
                                <div className="flex items-start space-x-4 w-full">
                                    <div className="flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={selectedNotifications.includes(notification.id)}
                                            onChange={() => toggleSelect(notification.id)}
                                            className={`h-4 w-4 rounded border-gray-300 ${theme === 'dark'
                                                ? 'bg-gray-700 border-gray-500 text-blue-600 focus:ring-blue-500'
                                                : 'text-blue-600 focus:ring-blue-500'}`}
                                        />
                                    </div>

                                    <div className="flex-shrink-0 mt-1">
                                        {getIcon(notification.type)}
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                                {notification.title}
                                            </h3>
                                            <div className="flex items-center ml-2">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {notification.date}
                                                </span>
                                                <DropdownMenu.Root>
                                                    <DropdownMenu.Trigger asChild>
                                                        <button className="p-1 ml-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                                                            <MoreHorizontal size={16} />
                                                        </button>
                                                    </DropdownMenu.Trigger>

                                                    <DropdownMenu.Portal>
                                                        <DropdownMenu.Content
                                                            className={`min-w-[180px] rounded-md p-1 shadow-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                                                            sideOffset={5}
                                                        >
                                                            <DropdownMenu.Item
                                                                onClick={() => toggleRead(notification.id)}
                                                                className={`text-sm rounded-md flex items-center p-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                                            >
                                                                <CheckCircle size={16} className="mr-2" />
                                                                {notification.read ? 'Mark as unread' : 'Mark as read'}
                                                            </DropdownMenu.Item>
                                                            <DropdownMenu.Item
                                                                onClick={() => deleteNotification(notification.id)}
                                                                className={`text-sm rounded-md flex items-center p-2 text-red-600 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                                            >
                                                                <Trash size={16} className="mr-2" />
                                                                Delete notification
                                                            </DropdownMenu.Item>
                                                        </DropdownMenu.Content>
                                                    </DropdownMenu.Portal>
                                                </DropdownMenu.Root>
                                            </div>
                                        </div>

                                        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} ${notification.read ? (theme === 'dark' ? 'text-gray-400' : 'text-gray-500') : ''}`}>
                                            {notification.message}
                                        </p>

                                        <div className="mt-2 flex items-center space-x-2">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${getTypeStyle(notification.type)}`}>
                                                {getTypeLabel(notification.type)}
                                            </span>
                                            <button
                                                onClick={() => toggleRead(notification.id)}
                                                className={`text-xs ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                                            >
                                                {notification.read ? 'Mark as unread' : 'Mark as read'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={`p-8 text-center rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex flex-col items-center">
                        <Bell size={40} className="text-gray-400 mb-3" />
                        <h3 className="text-lg font-medium mb-1">No notifications found</h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm || filter !== 'all'
                                ? 'Try adjusting your search or filter'
                                : 'You\'re all caught up!'}
                        </p>
                        {(searchTerm || filter !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilter('all');
                                }}
                                className={`px-4 py-2 rounded-md ${theme === 'dark'
                                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                    }`}
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper functions
const getTypeLabel = (type: string) => {
    switch (type) {
        case 'announcement': return 'Announcement';
        case 'deadline': return 'Deadline';
        case 'grade': return 'Grade';
        case 'message': return 'Message';
        default: return 'Notification';
    }
};

const getTypeStyle = (type: string) => {
    switch (type) {
        case 'announcement': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        case 'deadline': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
        case 'grade': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
        case 'message': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
};

export default NotificationsPage;
