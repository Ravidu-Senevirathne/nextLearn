"use client";

import React from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';

interface Event {
    title: string;
    course: string;
    time: string;
    type: string;
}

interface EventsListProps {
    events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800">
                <h3 className="font-semibold flex items-center">
                    <Clock size={18} className="mr-2 text-blue-400" />
                    Upcoming Events
                </h3>
            </div>
            <div className="divide-y divide-gray-800">
                {events.map((event, index) => (
                    <div key={index} className="p-4 hover:bg-gray-800/50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-sm text-gray-400">{event.course}</p>
                                <div className="flex items-center mt-1 text-gray-500 text-xs">
                                    <Clock size={14} className="mr-1" /> {event.time}
                                </div>
                            </div>
                            <div className="px-2 py-1 text-xs rounded-full bg-gray-800">
                                {event.type}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 border-t border-gray-800">
                <Link
                    href="/dashboard/lecturer/calendar"
                    className="text-center block w-full text-sm text-blue-400 hover:text-blue-300"
                >
                    View Full Schedule
                </Link>
            </div>
        </div>
    );
};

export default EventsList;
