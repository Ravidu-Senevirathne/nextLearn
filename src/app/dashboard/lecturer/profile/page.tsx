"use client";

import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    Edit,
    BookOpen,
    Award,
    Star,
    Users,
    FileText,
    Globe,
    // Brand icons are deprecated in lucide-react, consider migrating to SimpleIcons
    Twitter,
    Linkedin,
    Github,
    Save,
    X
} from 'lucide-react';

// Mock data for lecturer profile
const mockLecturerData = {
    name: "Dr. Sarah Johnson",
    title: "Associate Professor of Computer Science",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    location: "Computer Science Department, Room 305",
    joinDate: "September 2015",
    bio: "Dr. Sarah Johnson is an Associate Professor specializing in Artificial Intelligence and Machine Learning. With over 15 years of experience in both industry and academia, she brings practical knowledge and theoretical expertise to her teaching. She received her Ph.D. from MIT in 2010 and has published over 30 research papers in leading journals.",
    expertise: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "Computer Vision", "Natural Language Processing"],
    education: [
        {
            degree: "Ph.D. in Computer Science",
            institution: "Massachusetts Institute of Technology",
            year: "2010"
        },
        {
            degree: "M.Sc. in Computer Science",
            institution: "Stanford University",
            year: "2006"
        },
        {
            degree: "B.Sc. in Computer Engineering",
            institution: "University of California, Berkeley",
            year: "2004"
        }
    ],
    currentCourses: [
        {
            id: "CS401",
            name: "Advanced Machine Learning",
            students: 45,
            schedule: "Mon/Wed 10:00-11:30 AM",
            rating: 4.8
        },
        {
            id: "CS302",
            name: "Introduction to Neural Networks",
            students: 78,
            schedule: "Tue/Thu 2:00-3:30 PM",
            rating: 4.7
        },
        {
            id: "CS550",
            name: "AI Research Seminar",
            students: 22,
            schedule: "Fri 1:00-4:00 PM",
            rating: 4.9
        }
    ],
    officeHours: "Tuesday & Thursday 11:00 AM - 1:00 PM, or by appointment",
    socialMedia: {
        website: "sarahjohnson.edu",
        twitter: "@prof_sjohnson",
        linkedin: "sarahjohnson",
        github: "sjohnson-ai"
    },
    stats: {
        coursesCount: 24,
        totalStudents: 1200,
        avgRating: 4.8,
        publications: 32
    }
};

export default function LecturerProfilePage() {
    const { theme } = useTheme();
    const [lecturer, setLecturer] = useState(mockLecturerData);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(mockLecturerData);

    // Helper functions for theme-specific styling
    const getCardStyle = () => {
        return theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
    };

    const getSubCardStyle = () => {
        return theme === 'dark' ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-200';
    };

    const getTextColor = () => {
        return theme === 'dark' ? 'text-white' : 'text-gray-900';
    };

    const getSubtleTextColor = () => {
        return theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
    };

    const getMutedTextColor = () => {
        return theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
    };

    const getInputStyle = () => {
        return theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500';
    };

    // Handler for input changes in edit mode
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setEditData({
            ...editData,
            [field]: e.target.value
        });
    };

    // Save changes handler
    const handleSaveChanges = () => {
        setLecturer(editData);
        setIsEditing(false);
    };

    // Cancel edits handler
    const handleCancelEdit = () => {
        setEditData(lecturer);
        setIsEditing(false);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${getTextColor()}`}>My Profile</h1>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                        <Edit size={16} className="mr-2" />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleCancelEdit}
                            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                        >
                            <X size={16} className="mr-2" />
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveChanges}
                            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                        >
                            <Save size={16} className="mr-2" />
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Overview */}
                <div className={`lg:col-span-1 rounded-lg border ${getCardStyle()} p-6`}>
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                            {lecturer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {!isEditing ? (
                            <>
                                <h2 className={`text-xl font-bold ${getTextColor()}`}>{lecturer.name}</h2>
                                <p className={`text-sm ${getMutedTextColor()} mt-1`}>{lecturer.title}</p>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    className={`w-full text-center text-xl font-bold mb-2 px-2 py-1 rounded border ${getInputStyle()}`}
                                />
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => handleInputChange(e, 'title')}
                                    className={`w-full text-center text-sm px-2 py-1 rounded border ${getInputStyle()}`}
                                />
                            </>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Mail className={`mr-3 ${getMutedTextColor()}`} size={18} />
                            {!isEditing ? (
                                <span className={getSubtleTextColor()}>{lecturer.email}</span>
                            ) : (
                                <input
                                    type="email"
                                    value={editData.email}
                                    onChange={(e) => handleInputChange(e, 'email')}
                                    className={`w-full px-2 py-1 rounded border ${getInputStyle()}`}
                                />
                            )}
                        </div>

                        <div className="flex items-center">
                            <Phone className={`mr-3 ${getMutedTextColor()}`} size={18} />
                            {!isEditing ? (
                                <span className={getSubtleTextColor()}>{lecturer.phone}</span>
                            ) : (
                                <input
                                    type="text"
                                    value={editData.phone}
                                    onChange={(e) => handleInputChange(e, 'phone')}
                                    className={`w-full px-2 py-1 rounded border ${getInputStyle()}`}
                                />
                            )}
                        </div>

                        <div className="flex items-center">
                            <MapPin className={`mr-3 ${getMutedTextColor()}`} size={18} />
                            {!isEditing ? (
                                <span className={getSubtleTextColor()}>{lecturer.location}</span>
                            ) : (
                                <input
                                    type="text"
                                    value={editData.location}
                                    onChange={(e) => handleInputChange(e, 'location')}
                                    className={`w-full px-2 py-1 rounded border ${getInputStyle()}`}
                                />
                            )}
                        </div>

                        <div className="flex items-center">
                            <Calendar className={`mr-3 ${getMutedTextColor()}`} size={18} />
                            <span className={getSubtleTextColor()}>Joined {lecturer.joinDate}</span>
                        </div>

                        <div className="flex items-center">
                            <Clock className={`mr-3 ${getMutedTextColor()}`} size={18} />
                            {!isEditing ? (
                                <span className={getSubtleTextColor()}>{lecturer.officeHours}</span>
                            ) : (
                                <input
                                    type="text"
                                    value={editData.officeHours}
                                    onChange={(e) => handleInputChange(e, 'officeHours')}
                                    className={`w-full px-2 py-1 rounded border ${getInputStyle()}`}
                                />
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className={`text-lg font-medium mb-3 ${getTextColor()}`}>Stats & Achievements</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className={`p-3 rounded-lg border ${getSubCardStyle()}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm ${getMutedTextColor()}`}>Courses</span>
                                    <BookOpen size={18} className="text-blue-500" />
                                </div>
                                <div className={`text-2xl font-bold ${getTextColor()}`}>
                                    {lecturer.stats.coursesCount}
                                </div>
                            </div>

                            <div className={`p-3 rounded-lg border ${getSubCardStyle()}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm ${getMutedTextColor()}`}>Students</span>
                                    <Users size={18} className="text-green-500" />
                                </div>
                                <div className={`text-2xl font-bold ${getTextColor()}`}>
                                    {lecturer.stats.totalStudents}
                                </div>
                            </div>

                            <div className={`p-3 rounded-lg border ${getSubCardStyle()}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm ${getMutedTextColor()}`}>Rating</span>
                                    <Star size={18} className="text-yellow-500" />
                                </div>
                                <div className={`text-2xl font-bold ${getTextColor()}`}>
                                    {lecturer.stats.avgRating}
                                </div>
                            </div>

                            <div className={`p-3 rounded-lg border ${getSubCardStyle()}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm ${getMutedTextColor()}`}>Papers</span>
                                    <FileText size={18} className="text-purple-500" />
                                </div>
                                <div className={`text-2xl font-bold ${getTextColor()}`}>
                                    {lecturer.stats.publications}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className={`text-lg font-medium mb-3 ${getTextColor()}`}>Connect</h3>
                        <div className="space-y-3">
                            {lecturer.socialMedia.website && (
                                <div className="flex items-center">
                                    <Globe className={`mr-3 ${getMutedTextColor()}`} size={18} />
                                    {!isEditing ? (
                                        <a href={`https://${lecturer.socialMedia.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                            {lecturer.socialMedia.website}
                                        </a>
                                    ) : (
                                        <div className="flex items-center w-full">
                                            <span className="mr-2">https://</span>
                                            <input
                                                type="text"
                                                value={editData.socialMedia.website}
                                                onChange={(e) => setEditData({
                                                    ...editData,
                                                    socialMedia: { ...editData.socialMedia, website: e.target.value }
                                                })}
                                                className={`flex-1 px-2 py-1 rounded border ${getInputStyle()}`}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {lecturer.socialMedia.twitter && (
                                <div className="flex items-center">
                                    <Twitter className={`mr-3 ${getMutedTextColor()}`} size={18} />
                                    {!isEditing ? (
                                        <a href={`https://twitter.com/${lecturer.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                            {lecturer.socialMedia.twitter}
                                        </a>
                                    ) : (
                                        <input
                                            type="text"
                                            value={editData.socialMedia.twitter}
                                            onChange={(e) => setEditData({
                                                ...editData,
                                                socialMedia: { ...editData.socialMedia, twitter: e.target.value }
                                            })}
                                            className={`w-full px-2 py-1 rounded border ${getInputStyle()}`}
                                        />
                                    )}
                                </div>
                            )}

                            {lecturer.socialMedia.linkedin && (
                                <div className="flex items-center">
                                    <Linkedin className={`mr-3 ${getMutedTextColor()}`} size={18} />
                                    {!isEditing ? (
                                        <a href={`https://linkedin.com/in/${lecturer.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                            {lecturer.socialMedia.linkedin}
                                        </a>
                                    ) : (
                                        <div className="flex items-center w-full">
                                            <span className="mr-2">linkedin.com/in/</span>
                                            <input
                                                type="text"
                                                value={editData.socialMedia.linkedin}
                                                onChange={(e) => setEditData({
                                                    ...editData,
                                                    socialMedia: { ...editData.socialMedia, linkedin: e.target.value }
                                                })}
                                                className={`flex-1 px-2 py-1 rounded border ${getInputStyle()}`}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {lecturer.socialMedia.github && (
                                <div className="flex items-center">
                                    <Github className={`mr-3 ${getMutedTextColor()}`} size={18} />
                                    {!isEditing ? (
                                        <a href={`https://github.com/${lecturer.socialMedia.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                            {lecturer.socialMedia.github}
                                        </a>
                                    ) : (
                                        <div className="flex items-center w-full">
                                            <span className="mr-2">github.com/</span>
                                            <input
                                                type="text"
                                                value={editData.socialMedia.github}
                                                onChange={(e) => setEditData({
                                                    ...editData,
                                                    socialMedia: { ...editData.socialMedia, github: e.target.value }
                                                })}
                                                className={`flex-1 px-2 py-1 rounded border ${getInputStyle()}`}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About Section */}
                    <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                        <h2 className={`text-xl font-bold mb-4 ${getTextColor()}`}>About Me</h2>
                        {!isEditing ? (
                            <p className={getSubtleTextColor()}>{lecturer.bio}</p>
                        ) : (
                            <textarea
                                value={editData.bio}
                                onChange={(e) => handleInputChange(e, 'bio')}
                                className={`w-full px-3 py-2 rounded border ${getInputStyle()} min-h-[150px]`}
                                rows={5}
                            />
                        )}
                    </div>

                    {/* Expertise Section */}
                    <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                        <h2 className={`text-xl font-bold mb-4 ${getTextColor()}`}>Areas of Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                            {lecturer.expertise.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="mt-4">
                                <label className={`block text-sm font-medium mb-1 ${getMutedTextColor()}`}>
                                    Add or edit expertise (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={editData.expertise.join(", ")}
                                    onChange={(e) => setEditData({
                                        ...editData,
                                        expertise: e.target.value.split(",").map(item => item.trim())
                                    })}
                                    className={`w-full px-3 py-2 rounded border ${getInputStyle()}`}
                                    placeholder="AI, Machine Learning, Data Science, etc."
                                />
                            </div>
                        )}
                    </div>

                    {/* Education Section */}
                    <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                        <h2 className={`text-xl font-bold mb-4 ${getTextColor()}`}>Education</h2>
                        <div className="space-y-4">
                            {lecturer.education.map((edu, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md mr-4 mt-1">
                                        <Award size={20} className="text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className={`font-medium ${getTextColor()}`}>{edu.degree}</h3>
                                        <p className={`text-sm ${getSubtleTextColor()}`}>
                                            {edu.institution}, {edu.year}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="mt-4 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                                <p className={`text-sm ${getMutedTextColor()} mb-2`}>
                                    Education details can be updated from the Settings page
                                </p>
                                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                    Go to Education Settings
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Current Courses Section */}
                    <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                        <h2 className={`text-xl font-bold mb-4 ${getTextColor()}`}>Current Courses</h2>
                        <div className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${getMutedTextColor()} uppercase tracking-wider`}>Course</th>
                                            <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${getMutedTextColor()} uppercase tracking-wider`}>Schedule</th>
                                            <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${getMutedTextColor()} uppercase tracking-wider`}>Students</th>
                                            <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${getMutedTextColor()} uppercase tracking-wider`}>Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {lecturer.currentCourses.map((course) => (
                                            <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                                <td className={`px-4 py-4 whitespace-nowrap ${getTextColor()} font-medium`}>
                                                    <div>{course.name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{course.id}</div>
                                                </td>
                                                <td className={`px-4 py-4 whitespace-nowrap text-sm ${getSubtleTextColor()}`}>
                                                    {course.schedule}
                                                </td>
                                                <td className={`px-4 py-4 whitespace-nowrap text-sm ${getSubtleTextColor()}`}>
                                                    {course.students}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <Star size={16} className="text-yellow-500 mr-1" />
                                                        <span className={`text-sm ${getSubtleTextColor()}`}>{course.rating}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <a href="/dashboard/lecturer/courses" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                View All Courses
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
