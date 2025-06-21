"use client"

import React, { useState, useMemo } from 'react';
import { Calendar } from '@/Components/ui/calendar';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { useTheme } from "@/hooks/useTheme";
import {
    CalendarIcon,
    ListFilter,
    Plus,
    ChevronLeft,
    ChevronRight,
    Clock,
    BookOpen,
    AlarmClock,
    Users,
    Calendar as CalendarComponent,
    FileText,
    Layers
} from "lucide-react";

// Mock calendar events
const mockEvents = [
    {
        id: '1',
        title: 'Web Development Lecture',
        course: 'Web Development Fundamentals',
        date: '2023-07-15',
        startTime: '10:00',
        endTime: '11:30',
        type: 'lesson',
        location: 'Room 301',
        description: 'Introduction to HTML and CSS'
    },
    {
        id: '2',
        title: 'Database Quiz',
        course: 'Database Management',
        date: '2023-07-15',
        startTime: '14:00',
        endTime: '15:00',
        type: 'quiz',
        location: 'Online',
        description: 'SQL fundamentals quiz'
    },
    {
        id: '3',
        title: 'Project Deadline',
        course: 'Advanced JavaScript',
        date: '2023-07-20',
        startTime: '23:59',
        endTime: '23:59',
        type: 'deadline',
        description: 'Final project submission'
    },
    {
        id: '4',
        title: 'Department Meeting',
        course: '',
        date: '2023-07-18',
        startTime: '13:00',
        endTime: '14:30',
        type: 'meeting',
        location: 'Conference Room B',
        description: 'Semester planning'
    },
    {
        id: '5',
        title: 'Mobile App Development Live Session',
        course: 'Mobile App Development',
        date: '2023-07-22',
        startTime: '15:00',
        endTime: '16:30',
        type: 'live',
        location: 'Online - Zoom',
        description: 'Live coding session: Building a React Native app'
    }
];

export default function CalendarPage() {
    const { theme } = useTheme();
    const [date, setDate] = useState<Date>(new Date());
    const [view, setView] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
    const [filterType, setFilterType] = useState<string>("all");
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    // Format date for display
    const formattedDate = useMemo(() => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
            day: view === 'day' ? 'numeric' : undefined
        });
    }, [date, view]);

    // Filter events based on selected date and filters
    const filteredEvents = useMemo(() => {
        let events = [...mockEvents];

        // Filter by date based on view
        if (view === 'day') {
            const dayStart = new Date(date);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(dayStart);
            dayEnd.setDate(dayEnd.getDate() + 1);

            events = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= dayStart && eventDate < dayEnd;
            });
        } else if (view === 'week') {
            const weekStart = new Date(date);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            weekStart.setHours(0, 0, 0, 0);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 7);

            events = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= weekStart && eventDate < weekEnd;
            });
        } else if (view === 'month') {
            const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            events = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= monthStart && eventDate <= monthEnd;
            });
        }

        // Apply type filter
        if (filterType !== 'all') {
            events = events.filter(event => event.type === filterType);
        }

        return events.sort((a, b) => {
            // Sort by date and then by start time
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA.getTime() !== dateB.getTime()) {
                return dateA.getTime() - dateB.getTime();
            }
            return a.startTime.localeCompare(b.startTime);
        });
    }, [date, view, filterType]);

    // Handle date navigation
    const navigateDate = (direction: 'prev' | 'next') => {
        const newDate = new Date(date);
        if (view === 'day') {
            newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        } else if (view === 'week') {
            newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        } else {
            newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        }
        setDate(newDate);
    };

    // Get color based on event type
    const getEventColor = (type: string) => {
        switch (type) {
            case 'lesson':
                return theme === 'dark' ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-800';
            case 'quiz':
                return theme === 'dark' ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-100 text-purple-800';
            case 'deadline':
                return theme === 'dark' ? 'bg-red-900/40 text-red-400' : 'bg-red-100 text-red-800';
            case 'exam':
                return theme === 'dark' ? 'bg-amber-900/40 text-amber-400' : 'bg-amber-100 text-amber-800';
            case 'meeting':
                return theme === 'dark' ? 'bg-gray-900/40 text-gray-400' : 'bg-gray-100 text-gray-800';
            case 'live':
                return theme === 'dark' ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-800';
            default:
                return theme === 'dark' ? 'bg-gray-900/40 text-gray-400' : 'bg-gray-100 text-gray-800';
        }
    };

    // Get icon based on event type
    const getEventIcon = (type: string) => {
        switch (type) {
            case 'lesson':
                return <BookOpen size={16} />;
            case 'quiz':
                return <FileText size={16} />;
            case 'deadline':
                return <AlarmClock size={16} />;
            case 'exam':
                return <FileText size={16} />;
            case 'meeting':
                return <Users size={16} />;
            case 'live':
                return <Layers size={16} />;
            default:
                return <CalendarComponent size={16} />;
        }
    };

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Calendar</h1>
                <Button className={theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'}>
                    <Plus size={16} className="mr-2" />
                    Add Event
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left sidebar */}
                <div className="lg:col-span-1">
                    <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
                        <CardHeader>
                            <CardTitle>Calendar</CardTitle>
                            <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                                Select dates to view events
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(newDate) => newDate && setDate(newDate)}
                                className="rounded-md border w-full max-w-full"
                                styles={{
                                    caption: { width: '100%' },
                                    caption_label: { fontSize: '0.875rem' },
                                    head_cell: { width: '100%', fontSize: '0.75rem', paddingTop: '8px', paddingBottom: '8px' },
                                    cell: { 
                                        width: '100%', 
                                        padding: '2px',
                                        margin: '1px'
                                    },
                                    button: { 
                                        width: '100%',
                                        height: '32px',
                                        margin: '0',
                                        borderRadius: '4px'
                                    },
                                    nav_button: { width: 'auto' },
                                    nav: { width: '100%', display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' },
                                    table: { width: '100%', borderSpacing: '3px', borderCollapse: 'separate' }
                                }}
                            />

                            <div className="mt-6">
                                <h3 className="mb-2 text-sm font-medium">Event Types</h3>
                                <div className="space-y-2">
                                    <div
                                        className={`px-2 py-1.5 rounded-md cursor-pointer flex items-center ${filterType === 'all'
                                            ? theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                                            : ''}`}
                                        onClick={() => setFilterType('all')}
                                    >
                                        <CalendarComponent size={16} className="mr-2 text-gray-500" />
                                        <span>All Events</span>
                                    </div>
                                    <div
                                        className={`px-2 py-1.5 rounded-md cursor-pointer flex items-center ${filterType === 'lesson'
                                            ? theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                                            : ''}`}
                                        onClick={() => setFilterType('lesson')}
                                    >
                                        <BookOpen size={16} className="mr-2 text-blue-500" />
                                        <span>Lectures</span>
                                    </div>
                                    <div
                                        className={`px-2 py-1.5 rounded-md cursor-pointer flex items-center ${filterType === 'quiz'
                                            ? theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                                            : ''}`}
                                        onClick={() => setFilterType('quiz')}
                                    >
                                        <FileText size={16} className="mr-2 text-purple-500" />
                                        <span>Quizzes</span>
                                    </div>
                                    <div
                                        className={`px-2 py-1.5 rounded-md cursor-pointer flex items-center ${filterType === 'deadline'
                                            ? theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                                            : ''}`}
                                        onClick={() => setFilterType('deadline')}
                                    >
                                        <AlarmClock size={16} className="mr-2 text-red-500" />
                                        <span>Deadlines</span>
                                    </div>
                                    <div
                                        className={`px-2 py-1.5 rounded-md cursor-pointer flex items-center ${filterType === 'meeting'
                                            ? theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                                            : ''}`}
                                        onClick={() => setFilterType('meeting')}
                                    >
                                        <Users size={16} className="mr-2 text-gray-500" />
                                        <span>Meetings</span>
                                    </div>
                                    <div
                                        className={`px-2 py-1.5 rounded-md cursor-pointer flex items-center ${filterType === 'live'
                                            ? theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                                            : ''}`}
                                        onClick={() => setFilterType('live')}
                                    >
                                        <Layers size={16} className="mr-2 text-green-500" />
                                        <span>Live Sessions</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main calendar area */}
                <div className="lg:col-span-3">
                    <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div>
                                <CardTitle className="text-lg">{formattedDate}</CardTitle>
                                <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                                    {view === 'day' ? 'Daily schedule' : view === 'week' ? 'Weekly schedule' : 'Monthly overview'}
                                </CardDescription>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : ''}
                                    onClick={() => navigateDate('prev')}
                                >
                                    <ChevronLeft size={16} />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : ''}
                                    onClick={() => navigateDate('next')}
                                >
                                    <ChevronRight size={16} />
                                </Button>
                                <Select defaultValue={view} onValueChange={(value) => setView(value as any)}>
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="View" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="month">Month</SelectItem>
                                        <SelectItem value="week">Week</SelectItem>
                                        <SelectItem value="day">Day</SelectItem>
                                        <SelectItem value="agenda">Agenda</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {view === 'agenda' ? (
                                <div className="space-y-4">
                                    {filteredEvents.length > 0 ? (
                                        filteredEvents.map(event => (
                                            <div
                                                key={event.id}
                                                className={`p-3 rounded-md border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'} cursor-pointer transition-colors`}
                                                onClick={() => setSelectedEvent(event)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="font-medium">{event.title}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            {event.course && `${event.course} • `}
                                                            {new Date(event.date).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })} • {event.startTime} - {event.endTime}
                                                        </div>
                                                        {event.location && (
                                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                                Location: {event.location}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getEventColor(event.type)}`}>
                                                        {getEventIcon(event.type)}
                                                        <span className="ml-1 capitalize">{event.type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            No events found for the selected period
                                        </div>
                                    )}
                                </div>
                            ) : view === 'day' ? (
                                <div className="space-y-2">
                                    {/* For simplicity, just showing time slots from 8 AM to 8 PM */}
                                    {Array.from({ length: 13 }).map((_, index) => {
                                        const hour = index + 8;
                                        const hourEvents = filteredEvents.filter(event => {
                                            const eventHour = parseInt(event.startTime.split(':')[0]);
                                            return eventHour === hour;
                                        });

                                        return (
                                            <div key={hour} className="flex">
                                                <div className={`w-16 text-right pr-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                                                </div>
                                                <div className={`flex-1 min-h-[60px] border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} py-1 relative`}>
                                                    {hourEvents.map(event => (
                                                        <div
                                                            key={event.id}
                                                            className={`absolute inset-x-0 mx-1 p-2 rounded-md ${getEventColor(event.type)} cursor-pointer`}
                                                            style={{
                                                                top: `${parseInt(event.startTime.split(':')[1]) / 60 * 100}%`,
                                                                height: '50px'
                                                            }}
                                                            onClick={() => setSelectedEvent(event)}
                                                        >
                                                            <div className="font-medium text-sm">{event.title}</div>
                                                            <div className="text-xs">{event.startTime} - {event.endTime}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    {view === 'week'
                                        ? "Week view would be shown here with days of the week and hourly slots."
                                        : "Month view would be displayed here with a full calendar grid."}
                                    <p className="mt-2">For this example, please use the Agenda view to see events.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Event details */}
                    {selectedEvent && (
                        <Card className={`mt-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{selectedEvent.title}</CardTitle>
                                    <div className={`px-2 py-1 text-xs rounded-full flex items-center ${getEventColor(selectedEvent.type)}`}>
                                        {getEventIcon(selectedEvent.type)}
                                        <span className="ml-1 capitalize">{selectedEvent.type}</span>
                                    </div>
                                </div>
                                {selectedEvent.course && (
                                    <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                                        {selectedEvent.course}
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex">
                                        <CalendarIcon size={16} className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                        <span>
                                            {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <Clock size={16} className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                        <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                                    </div>
                                    {selectedEvent.location && (
                                        <div className="flex">
                                            <Users size={16} className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                            <span>{selectedEvent.location}</span>
                                        </div>
                                    )}
                                    {selectedEvent.description && (
                                        <div className="pt-2">
                                            <h4 className="text-sm font-medium mb-1">Description</h4>
                                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {selectedEvent.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
