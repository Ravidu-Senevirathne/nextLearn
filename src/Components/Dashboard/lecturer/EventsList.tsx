"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Calendar as CalendarIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface Event {
    title: string;
    course: string;
    time: string;
    type: 'quiz' | 'review' | 'live' | 'exam';
}

interface EventsListProps {
    events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events: initialEvents }) => {
    const [events, setEvents] = useState(initialEvents || []);
    const [loading, setLoading] = useState(!initialEvents);
    const [error, setError] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        // If events were passed as props, don't fetch
        if (initialEvents) return;

        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8000/lecturer/events', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setEvents(data);
            } catch (err: any) {
                console.error("Error fetching events:", err);
                setError(err.message || 'Failed to load events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [initialEvents]);

    // Helper functions for theme-specific styling
    const getCardStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-900 border border-gray-800'
            : 'bg-white border border-slate-200 shadow-sm';
    };

    const getHeaderStyle = () => {
        return theme === 'dark'
            ? 'border-b border-gray-800 bg-gray-900'
            : 'border-b border-slate-200 bg-white';
    };

    const getContentStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-900'
            : 'bg-white';
    };

    const getDividerStyle = () => {
        return theme === 'dark'
            ? 'divide-y divide-gray-800'
            : 'divide-y divide-slate-200';
    };

    const getHoverStyle = () => {
        return theme === 'dark'
            ? 'hover:bg-gray-800/50'
            : 'hover:bg-blue-50';
    };

    const getLinkStyle = () => {
        return theme === 'dark'
            ? 'text-blue-400 hover:text-blue-300'
            : 'text-blue-600 hover:text-blue-700';
    };

    const getTitleTextStyle = () => {
        return theme === 'dark'
            ? 'text-white'
            : 'text-gray-800';
    };

    const getEventTypeStyle = (type: string) => {
        switch (type) {
            case 'quiz':
                return theme === 'dark'
                    ? 'bg-purple-900/40 text-purple-400'
                    : 'bg-purple-100 text-purple-700';
            case 'review':
                return theme === 'dark'
                    ? 'bg-blue-900/40 text-blue-400'
                    : 'bg-blue-100 text-blue-700';
            case 'live':
                return theme === 'dark'
                    ? 'bg-green-900/40 text-green-400'
                    : 'bg-green-100 text-green-700';
            case 'exam':
                return theme === 'dark'
                    ? 'bg-red-900/40 text-red-400'
                    : 'bg-red-100 text-red-700';
            default:
                return theme === 'dark'
                    ? 'bg-gray-800 text-gray-400'
                    : 'bg-gray-200 text-gray-700';
        }
    };

    return (
        <div className={`${getCardStyle()} rounded-lg overflow-hidden h-full`}>
            {loading ? (
                <div className="flex justify-center items-center p-8">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <div className="p-4 text-red-500">{error}</div>
            ) : (
                <>
                    <div className={`p-4 ${getHeaderStyle()}`}>
                        <h3 className={`font-semibold flex items-center ${getTitleTextStyle()}`}>
                            <Calendar size={18} className={`mr-2 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
                            Upcoming Events
                        </h3>
                    </div>
                    <div className={`${getDividerStyle()} ${getContentStyle()}`}>
                        {events.map((event, index) => (
                            <div key={index} className={`p-4 ${getHoverStyle()} transition-colors`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className={`font-medium ${getTitleTextStyle()}`}>{event.title}</h4>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                                            {event.course}
                                        </p>
                                        <div className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                                            {event.time}
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${getEventTypeStyle(event.type)}`}>
                                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className={`p-3 ${getHeaderStyle()}`}>
                <Link
                    href="/dashboard/lecturer/schedule"
                    className={`text-center block w-full text-sm ${getLinkStyle()}`}
                >
                    View Full Schedule
                </Link>
            </div>
        </div>
    );
};

export default EventsList;
