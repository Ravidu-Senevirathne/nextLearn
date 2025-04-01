"use client";

import React from 'react';
import Link from 'next/link';
import { Clipboard } from 'lucide-react';

interface Submission {
    student: string;
    course: string;
    assignment: string;
    time: string;
    status: 'pending' | 'graded';
    grade?: string;
}

interface SubmissionsListProps {
    submissions: Submission[];
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({ submissions }) => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800">
                <h3 className="font-semibold flex items-center">
                    <Clipboard size={18} className="mr-2 text-purple-400" />
                    Recent Submissions
                </h3>
            </div>
            <div className="divide-y divide-gray-800">
                {submissions.map((submission, index) => (
                    <div key={index} className="p-4 hover:bg-gray-800/50 transition-colors">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-medium">{submission.student}</h4>
                                <p className="text-sm text-gray-400">
                                    {submission.course} - {submission.assignment}
                                </p>
                                <div className="mt-1 text-gray-500 text-xs">
                                    {submission.time}
                                </div>
                            </div>
                            <div className="flex items-center">
                                {submission.status === 'pending' ? (
                                    <span className="px-3 py-1 text-xs rounded-full bg-amber-900/40 text-amber-400">
                                        Needs Grading
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 text-xs rounded-full bg-green-900/40 text-green-400">
                                        Graded: {submission.grade}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 border-t border-gray-800">
                <Link
                    href="/dashboard/lecturer/assignments"
                    className="text-center block w-full text-sm text-blue-400 hover:text-blue-300"
                >
                    See All Submissions
                </Link>
            </div>
        </div>
    );
};

export default SubmissionsList;
