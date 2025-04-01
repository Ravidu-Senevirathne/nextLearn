"use client";

import React from 'react';
import DashboardLayout from '@/Components/Dashboard/lecturer/Layout'; // You could create a student-specific version eventually

const StudentDashboard = () => {
  return (
    <DashboardLayout title="Student Dashboard">
      <div className="p-4 bg-gray-950 text-gray-100">
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
        <p className="text-gray-400">Welcome to your learning dashboard! Content coming soon...</p>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;