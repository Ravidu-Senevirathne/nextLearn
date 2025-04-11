"use client";

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Clock } from 'lucide-react';
import { Quiz } from './types';

interface QuizzesListProps {
    quizzes: Quiz[];
}

const QuizzesList: React.FC<QuizzesListProps> = ({ quizzes }) => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800">
                <h3 className="font-semibold flex items-center">
                    <GraduationCap size={18} className="mr-2 text-purple-400" />
                    Upcoming Quizzes
                </h3>
            </div>
            <div className="divide-y divide-gray-800">
                {quizzes.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No upcoming quizzes
                    </div>
                ) : (
                    quizzes.map((quiz) => (
                        <div key={quiz.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium">{quiz.title}</h4>
                                    <p className="text-sm text-gray-400">{quiz.course}</p>
                                    <div className="flex items-center mt-1 text-gray-500 text-xs">
                                        <Clock size={14} className="mr-1" /> Due: {quiz.dueDate}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`px-2 py-1 text-xs rounded-full ${quiz.status === 'pending'
                                            ? 'bg-amber-900/40 text-amber-400'
                                            : 'bg-green-900/40 text-green-400'
                                        }`}>
                                        {quiz.status === 'pending' ? 'Pending' : `Completed: ${quiz.score}`}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {quiz.questions} questions
                                    </div>
                                </div>
                            </div>
                            {quiz.status === 'pending' && (
                                <div className="mt-2">
                                    <Link href={`/dashboard/student/quizzes/${quiz.id}`}>
                                        <button className="w-full text-sm bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 py-1 px-3 rounded transition-colors">
                                            Start Quiz
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            <div className="p-3 border-t border-gray-800">
                <Link
                    href="/dashboard/student/quizzes"
                    className="text-center block w-full text-sm text-purple-400 hover:text-purple-300"
                >
                    View All Quizzes
                </Link>
            </div>
        </div>
    );
};

export default QuizzesList;
