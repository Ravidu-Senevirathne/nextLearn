"use client";

import React from 'react';
import Link from 'next/link';
import { FileText, Clock } from 'lucide-react';
import { Assignment } from './types';

interface AssignmentsListProps {
    assignments: Assignment[];
}

const AssignmentsList: React.FC<AssignmentsListProps> = ({ assignments }) => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800">
                <h3 className="font-semibold flex items-center">
                    <FileText size={18} className="mr-2 text-blue-400" />
                    Pending Assignments
                </h3>
            </div>
            <div className="divide-y divide-gray-800">
                {assignments.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No pending assignments
                    </div>
                ) : (
                    assignments.map((assignment) => (
                        <div key={assignment.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium">{assignment.title}</h4>
                                    <p className="text-sm text-gray-400">{assignment.course}</p>
                                    <div className="flex items-center mt-1 text-gray-500 text-xs">
                                        <Clock size={14} className="mr-1" /> Due: {assignment.dueDate}
                                    </div>
                                </div>
                                <div className={`px-2 py-1 text-xs rounded-full ${assignment.status === 'pending'
                                        ? 'bg-amber-900/40 text-amber-400'
                                        : assignment.status === 'submitted'
                                            ? 'bg-blue-900/40 text-blue-400'
                                            : 'bg-green-900/40 text-green-400'
                                    }`}>
                                    {assignment.status === 'pending' && 'Pending'}
                                    {assignment.status === 'submitted' && 'Submitted'}
                                    {assignment.status === 'graded' && `Graded: ${assignment.grade}`}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="p-3 border-t border-gray-800">
                <Link
                    href="/dashboard/student/assignments"
                    className="text-center block w-full text-sm text-blue-400 hover:text-blue-300"
                >
                    View All Assignments
                </Link>
            </div>
        </div>
    );
};

export default AssignmentsList;
