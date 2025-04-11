"use client";

import React from 'react';
import Link from 'next/link';
import { Bell, MessageCircle, Clock, Award, Info } from 'lucide-react';
import { Notification } from './types';

interface NotificationsPanelProps {
    notifications: Notification[];
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications }) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'announcement':
                return <Info size={16} className="text-blue-400" />;
            case 'deadline':
                return <Clock size={16} className="text-amber-400" />;
            case 'grade':
                return <Award size={16} className="text-green-400" />;
            case 'message':
                return <MessageCircle size={16} className="text-purple-400" />;
            default:
                return <Bell size={16} className="text-gray-400" />;
        }
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800">
                <h3 className="font-semibold flex items-center">
                    <Bell size={18} className="mr-2 text-red-400" />
                    Recent Notifications
                </h3>
            </div>
            <div className="divide-y divide-gray-800">
                {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No new notifications
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 hover:bg-gray-800/50 transition-colors ${!notification.read ? 'bg-gray-800/30' : ''}`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1">{getIcon(notification.type)}</div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">{notification.title}</h4>
                                    <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                                    <div className="text-xs text-gray-500 mt-2">{notification.date}</div>
                                </div>
                                {!notification.read && (
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1"></div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="p-3 border-t border-gray-800">
                <Link
                    href="/dashboard/student/notifications"
                    className="text-center block w-full text-sm text-red-400 hover:text-red-300"
                >
                    View All Notifications
                </Link>
            </div>
        </div>
    );
};

export default NotificationsPanel;
