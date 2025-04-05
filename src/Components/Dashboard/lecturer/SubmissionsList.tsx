"use client";

import React from 'react';
import Link from 'next/link';
import { Clipboard } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

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
    const { theme } = useTheme();

    // Helper functions to get appropriate styles based on theme
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

    const getTitleTextStyle = () => {
        return theme === 'dark'
            ? 'text-white'
            : 'text-gray-800';
    };

    const getStatusStyle = (status: 'pending' | 'graded') => {
        if (status === 'pending') {
            return theme === 'dark'
                ? 'bg-amber-900/40 text-amber-400'
                : 'bg-amber-100 text-amber-800';
        } else {
            return theme === 'dark'
                ? 'bg-green-900/40 text-green-400'
                : 'bg-green-100 text-green-800';
        }
    };

    const getLinkStyle = () => {
        return theme === 'dark'
            ? 'text-blue-400 hover:text-blue-300'
            : 'text-blue-600 hover:text-blue-700';
    };

    return (
        <div className={`${getCardStyle()} rounded-lg overflow-hidden`}>
            <div className={`p-4 ${getHeaderStyle()}`}>
                <h3 className={`font-semibold flex items-center ${getTitleTextStyle()}`}>
                    <Clipboard size={18} className={`mr-2 ${theme === 'dark' ? 'text-purple-400' : 'text-teal-600'}`} />
                    Recent Submissions
                </h3>
            </div>
            <div className={getDividerStyle()}>
                {submissions.map((submission, index) => (
                    <div key={index} className={`p-4 ${getHoverStyle()} transition-colors`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{submission.student}</h4>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                                    {submission.course} - {submission.assignment}
                                </p>
                                <div className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                                    {submission.time}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(submission.status)}`}>
                                    {submission.status === 'pending' ? 'Needs Grading' : `Graded: ${submission.grade}`}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`p-3 ${getHeaderStyle()}`}>
                <Link
                    href="/dashboard/lecturer/assignments"
                    className={`text-center block w-full text-sm ${getLinkStyle()}`}
                >
                    See All Submissions
                </Link>
            </div>
        </div>
    );
};

export default SubmissionsList;
