"use client";

import React from 'react';
import Link from 'next/link';
import { PlusCircle, Upload, FileText, Calendar } from 'lucide-react';

const QuickActions: React.FC = () => {
    const renderQuickAction = (title: string, bgClass: string, icon: React.ReactNode) => {
        return (
            <Link href="#" className={`${bgClass} p-4 rounded-lg transition-all hover:-translate-y-1 flex flex-col items-center justify-center text-center`}>
                <div className="p-2 bg-white/20 rounded-full mb-2">{icon}</div>
                <span className="text-sm font-medium">{title}</span>
            </Link>
        );
    };

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
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
