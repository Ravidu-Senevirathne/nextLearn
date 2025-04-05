"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

interface StatisticItem {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    change?: string;
    color: string;
}

interface StatCardProps {
    stat: StatisticItem;
    index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
    const { theme } = useTheme();

    // Light mode color mapping for stat cards
    const getLightModeColor = (darkColor: string) => {
        switch (darkColor) {
            case 'bg-blue-500':
                return 'bg-blue-100 text-blue-700';
            case 'bg-green-500':
                return 'bg-green-100 text-green-700';
            case 'bg-amber-500':
                return 'bg-amber-100 text-amber-700';
            case 'bg-purple-500':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getCardStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-900 border border-gray-800'
            : 'bg-white border border-slate-200 shadow-sm';
    };

    const getTitleColor = () => {
        return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
    };

    const getValueColor = () => {
        return theme === 'dark' ? 'text-white' : 'text-gray-900';
    };

    const getIconBgColor = () => {
        // In dark mode, use the original color, in light mode use the light variant
        return theme === 'dark'
            ? stat.color
            : getLightModeColor(stat.color);
    };

    const getChangeColor = (change?: string) => {
        if (!change) return '';

        if (change.startsWith('+')) {
            return theme === 'dark' ? 'text-green-400' : 'text-green-600';
        } else if (change.startsWith('-')) {
            return theme === 'dark' ? 'text-red-400' : 'text-red-600';
        }
        return '';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${getCardStyle()} rounded-lg p-6`}
        >
            <div className="flex items-center">
                <div className={`rounded-md p-2 ${getIconBgColor()}`}>
                    <stat.icon size={20} className={theme === 'dark' ? 'text-white' : ''} />
                </div>
                <div className="ml-4">
                    <h4 className={`text-sm font-medium ${getTitleColor()}`}>{stat.title}</h4>
                    <div className="flex items-center">
                        <span className={`text-2xl font-bold ${getValueColor()}`}>
                            {stat.value}
                        </span>
                        {stat.change && (
                            <span className={`ml-2 text-xs ${getChangeColor(stat.change)}`}>
                                {stat.change}
                                <span className="ml-1">vs last month</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;
