"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { StatisticItem } from './types';

interface StatCardProps {
    stat: StatisticItem;
    index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <h4 className="text-2xl font-bold mt-1">{stat.value}</h4>
                    {stat.change && (
                        <div className="flex items-center mt-2">
                            <span className="text-green-500 text-xs">{stat.change}</span>
                            <span className="text-gray-500 text-xs ml-1">this week</span>
                        </div>
                    )}
                </div>
                <div className={`p-2 rounded-md ${stat.color}`}>
                    <stat.icon size={20} />
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;
