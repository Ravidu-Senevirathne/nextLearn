"use client";

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { ScheduleEvent } from './types';

interface ScheduleListProps {
    events: ScheduleEvent[];
}

const ScheduleList: React.FC<ScheduleListProps> = ({ events }) => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800">
                <h3 className="font-semibold flex items-center">
                    <Calendar size={18} className="mr-2 text-green-400" />
                    Upcoming Schedule
                </h3>
            </div>
            <div className="divide-y divide-gray-800">
                {events.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No upcoming events
                    </div>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium">{event.title}</h4>
                                    <p className="text-sm text-gray-400">{event.course}</p>
                                    <div className="flex items-center mt-1 text-gray-500 text-xs">
                                        <Clock size={14} className="mr-1" /> {event.date}, {event.time}
                                    </div>
                                </div>
                                <div className={`px-2 py-1 text-xs rounded-full ${event.type === 'lesson'
                                        ? 'bg-blue-900/40 text-blue-400'
                                        : event.type === 'deadline'
                                            ? 'bg-red-900/40 text-red-400'
                                            : event.type === 'quiz'
                                                ? 'bg-purple-900/40 text-purple-400'
                                                : event.type === 'exam'
                                                    ? 'bg-amber-900/40 text-amber-400'
                                                    : 'bg-green-900/40 text-green-400'
                                    }`}>
                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="p-3 border-t border-gray-800">
                <Link
                    href="/dashboard/student/schedule"
                    className="text-center block w-full text-sm text-green-400 hover:text-green-300"
                >
                    View Full Schedule
                </Link>
            </div>
        </div>
    );
};

export default ScheduleList;
