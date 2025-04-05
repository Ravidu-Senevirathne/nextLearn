"use client";

import React from 'react';
import Link from 'next/link';
import { PlusCircle, Upload, FileText, Calendar } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const QuickActions: React.FC = () => {
    const { theme } = useTheme();

    // Generate appropriate background class based on theme and action type
    const getBgClass = (darkClass: string) => {
        if (theme === 'dark') return darkClass;

        // Map dark theme colors to lighter, more elegant versions
        const colorMap: { [key: string]: string } = {
            'bg-blue-600 hover:bg-blue-700': 'bg-gradient-to-br from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 shadow-md shadow-cyan-500/20',
            'bg-green-600 hover:bg-green-700': 'bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20',
            'bg-purple-600 hover:bg-purple-700': 'bg-gradient-to-br from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-md shadow-violet-500/20',
            'bg-amber-600 hover:bg-amber-700': 'bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-md shadow-orange-500/20'
        };

        return colorMap[darkClass] || darkClass;
    };

    const renderQuickAction = (title: string, bgClass: string, icon: React.ReactNode) => {
        return (
            <Link href="#" className={`${getBgClass(bgClass)} p-4 rounded-lg transition-all hover:-translate-y-1 flex flex-col items-center justify-center text-center text-white`}>
                <div className="p-2 bg-white/20 rounded-full mb-2">{icon}</div>
                <span className="text-sm font-medium">{title}</span>
            </Link>
        );
    };

    return (
        <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' && 'text-slate-800'}`}>Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {renderQuickAction('Create New Course', 'bg-blue-600 hover:bg-blue-700', <PlusCircle size={20} />)}
                {renderQuickAction('Upload Lesson', 'bg-green-600 hover:bg-green-700', <Upload size={20} />)}
                {renderQuickAction('Create Quiz', 'bg-purple-600 hover:bg-purple-700', <FileText size={20} />)}
                {renderQuickAction('Schedule Exam', 'bg-amber-600 hover:bg-amber-700', <Calendar size={20} />)}
            </div>
        </div>
    );
};

export default QuickActions;
