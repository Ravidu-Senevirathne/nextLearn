"use client";

import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    BookOpen,
    Edit,
    Award,
    Star,
    Clock,
    FileText,
    Globe,
    Twitter,
    Linkedin,
    Github,
    Save,
    X,
    GraduationCap,
    BookOpen as Book,
    BarChart2
} from 'lucide-react';

// Mock data for student profile
const mockStudentData = {
    name: "Alex Johnson",
    studentId: "ST2023-45678",
    program: "Computer Science",
    year: "3rd Year",
    email: "alex.johnson@student.edu",
    phone: "+1 (555) 987-6543",
    location: "University Dormitory, Block C, Room 204",
    enrollmentDate: "September 2021",
    bio: "I'm a Computer Science student passionate about web development and machine learning. Currently exploring full-stack development using React and Node.js. Looking for internship opportunities in software development for next summer.",
    interests: ["Web Development", "Machine Learning", "Mobile Apps", "Data Science", "UI/UX Design"],
    education: [
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "Tech University",
            year: "2021-present",
            gpa: "3.8/4.0"
        },
        {
            degree: "High School Diploma",
            institution: "Central High School",
            year: "2017-2021",
            gpa: "4.0/4.0"
        }
    ],
    currentCourses: [
        {
            id: "CS401",
            name: "Advanced Web Development",
            instructor: "Dr. Sarah Johnson",
            progress: 78,
            grade: "A-"
        },
        {
            id: "CS302",
            name: "Data Structures and Algorithms",
            instructor: "Prof. Michael Chen",
            progress: 65,
            grade: "B+"
        },
        {
            id: "CS550",
            name: "Introduction to Machine Learning",
            instructor: "Dr. Lisa Wong",
            progress: 42,
            grade: "In Progress"
        },
        {
            id: "MATH301",
            name: "Advanced Calculus",
            instructor: "Prof. Robert Davis",
            progress: 85,
            grade: "A"
        }
    ],
    achievements: [
        "Dean's List 2022-2023",
        "Hackathon Winner - University Tech Fest 2023",
        "Best Student Project Award - CS Department",
        "3rd Place - Regional Coding Challenge"
    ],
    skills: [
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
        { name: "Python", level: 80 },
        { name: "Java", level: 75 },
        { name: "HTML/CSS", level: 95 },
        { name: "Node.js", level: 70 },
        { name: "SQL", level: 65 },
    ],
    socialMedia: {
        website: "alexjohnsondev.com",
        twitter: "@alexj_dev",
        linkedin: "alexjohnson-dev",
        github: "alexj-dev"
    },
    stats: {
        coursesCompleted: 16,
        currentGPA: 3.8,
        creditsEarned: 64,
        projectsCompleted: 12
    }
};

export default function StudentProfilePage() {
    const { theme } = useTheme();
    const [student, setStudent] = useState(mockStudentData);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(mockStudentData);

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
        setStudent(editData);
        setIsEditing(false);
    };

    // Cancel edits handler
    const handleCancelEdit = () => {
        setEditData(student);
        setIsEditing(false);
    };

    // Get progress bar color based on progress percentage
    const getProgressColor = (progress: number) => {
        if (progress >= 90) return 'bg-green-500';
        if (progress >= 70) return 'bg-blue-500';
        if (progress >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
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
                            {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {!isEditing ? (
                            <>
                                <h2 className={`text-xl font-bold ${getTextColor()}`}>{student.name}</h2>
                                <p className={`text-sm ${getMutedTextColor()} mt-1`}>{student.program} • {student.year}</p>
                                <p className={`text-xs ${getMutedTextColor()} mt-1`}>Student ID: {student.studentId}</p>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    className={`w-full text-center text-xl font-bold mb-2 px-2 py-1 rounded border ${getInputStyle()}`}
                                />
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={editData.program}
                                        onChange={(e) => handleInputChange(e, 'program')}
                                        className={`w-1/2 text-center text-sm px-2 py-1 rounded border ${getInputStyle()}`}
                                        placeholder="Program"
                                    />
                                    <input
                                        type="text"
                                        value={editData.year}
                                        onChange={(e) => handleInputChange(e, 'year')}
                                        className={`w-1/2 text-center text-sm px-2 py-1 rounded border ${getInputStyle()}`}
                                        placeholder="Year"
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={editData.studentId}
                                    onChange={(e) => handleInputChange(e, 'studentId')}
                                    className={`w-full text-center text-xs px-2 py-1 rounded border ${getInputStyle()}`}
                                    placeholder="Student ID"
                                />
                            </>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Mail className={`mr-3 ${getMutedTextColor()}`} size={18} />
                            {!isEditing ? (
                                <span className={getSubtleTextColor()}>{student.email}</span>
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
                                <span className={getSubtleTextColor()}>{student.phone}</span>
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
                                <span className={getSubtleTextColor()}>{student.location}</span>
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
                            <span className={getSubtleTextColor()}>Enrolled {student.enrollmentDate}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className={`text-lg font-medium mb-3 ${getTextColor()}`}>Stats & Achievements</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className={`p-3 rounded-lg border ${getSubCardStyle()}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm ${getMutedTextColor()}`}>GPA</span>
                                    <Star size={18} className="text-yellow-500" />
                                </div>
                                <div className={`text-2xl font-bold ${getTextColor()}`}>
                                    {student.stats.currentGPA}
                                </div>
                            </div>

                            <div className={`p-3 rounded-lg border ${getSubCardStyle()}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm ${getMutedTextColor()}`}>Courses</span>
                                    <BookOpen size={18} className="text-blue-500" />
                                </div>
                                <div className={`text-2xl font-bold ${getTextColor()}`}>
                                    {student.stats.coursesCompleted}
                                </div>
                            </div>

                            <div className={`p-3 rounded-lg border ${getSubCardStyle()}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm ${getMutedTextColor()}`}>Credits</span>
                                    <GraduationCap size={18} className="text-green-500" />
                                </div>
                                <div className={`text-2xl font-bold ${getTextColor()}`}>
                                    {student.stats.creditsEarned}
                                </div>
                            </div>

                            <div className={`p-3 rounded-lg border ${getSubCardStyle()}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm ${getMutedTextColor()}`}>Projects</span>
                                    <FileText size={18} className="text-purple-500" />
                                </div>
                                <div className={`text-2xl font-bold ${getTextColor()}`}>
                                    {student.stats.projectsCompleted}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className={`text-lg font-medium mb-3 ${getTextColor()}`}>Connect</h3>
                        <div className="space-y-3">
                            {student.socialMedia.website && (
                                <div className="flex items-center">
                                    <Globe className={`mr-3 ${getMutedTextColor()}`} size={18} />
                                    {!isEditing ? (
                                        <a href={`https://${student.socialMedia.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                            {student.socialMedia.website}
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

                            {student.socialMedia.twitter && (
                                <div className="flex items-center">
                                    <Twitter className={`mr-3 ${getMutedTextColor()}`} size={18} />
                                    {!isEditing ? (
                                        <a href={`https://twitter.com/${student.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                            {student.socialMedia.twitter}
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

                            {student.socialMedia.linkedin && (
                                <div className="flex items-center">
                                    <Linkedin className={`mr-3 ${getMutedTextColor()}`} size={18} />
                                    {!isEditing ? (
                                        <a href={`https://linkedin.com/in/${student.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                            {student.socialMedia.linkedin}
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

                            {student.socialMedia.github && (
                                <div className="flex items-center">
                                    <Github className={`mr-3 ${getMutedTextColor()}`} size={18} />
                                    {!isEditing ? (
                                        <a href={`https://github.com/${student.socialMedia.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                            {student.socialMedia.github}
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
                            <p className={getSubtleTextColor()}>{student.bio}</p>
                        ) : (
                            <textarea
                                value={editData.bio}
                                onChange={(e) => handleInputChange(e, 'bio')}
                                className={`w-full px-3 py-2 rounded border ${getInputStyle()} min-h-[150px]`}
                                rows={5}
                            />
                        )}
                    </div>

                    {/* Interests Section */}
                    <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                        <h2 className={`text-xl font-bold mb-4 ${getTextColor()}`}>Interests</h2>
                        <div className="flex flex-wrap gap-2">
                            {student.interests.map((interest, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">
                                    {interest}
                                </span>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="mt-4">
                                <label className={`block text-sm font-medium mb-1 ${getMutedTextColor()}`}>
                                    Add or edit interests (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={editData.interests.join(", ")}
                                    onChange={(e) => setEditData({
                                        ...editData,
                                        interests: e.target.value.split(",").map(item => item.trim())
                                    })}
                                    className={`w-full px-3 py-2 rounded border ${getInputStyle()}`}
                                    placeholder="Web Development, AI, Mobile Apps, etc."
                                />
                            </div>
                        )}
                    </div>

                    {/* Education Section */}
                    <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                        <h2 className={`text-xl font-bold mb-4 ${getTextColor()}`}>Education</h2>
                        <div className="space-y-4">
                            {student.education.map((edu, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md mr-4 mt-1">
                                        <GraduationCap size={20} className="text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className={`font-medium ${getTextColor()}`}>{edu.degree}</h3>
                                        <p className={`text-sm ${getSubtleTextColor()}`}>
                                            {edu.institution}, {edu.year}
                                        </p>
                                        <p className={`text-sm ${getMutedTextColor()}`}>
                                            GPA: {edu.gpa}
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
                        <div className="space-y-4">
                            {student.currentCourses.map((course) => (
                                <div key={course.id} className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className={`font-medium ${getTextColor()}`}>
                                                {course.name}
                                                <span className={`ml-2 text-sm font-normal ${getMutedTextColor()}`}>
                                                    {course.id}
                                                </span>
                                            </h3>
                                            <p className={`text-sm ${getSubtleTextColor()}`}>
                                                Instructor: {course.instructor}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-2 py-1 rounded text-sm ${
                                                course.grade === 'In Progress' 
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                                                    : course.grade.startsWith('A') 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                        : course.grade.startsWith('B')
                                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                            }`}>
                                                {course.grade}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className={getMutedTextColor()}>Progress</span>
                                            <span className={getSubtleTextColor()}>{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div 
                                                className={`${getProgressColor(course.progress)} h-2 rounded-full`}
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <a href="/dashboard/student/courses" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                View All Courses
                            </a>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                        <h2 className={`text-xl font-bold mb-4 ${getTextColor()}`}>Skills</h2>
                        <div className="space-y-4">
                            {student.skills.map((skill, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className={getTextColor()}>{skill.name}</span>
                                        <span className={getMutedTextColor()}>{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className={`bg-blue-600 h-2 rounded-full`}
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="mt-4 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                                <p className={`text-sm ${getMutedTextColor()} mb-2`}>
                                    Skills can be updated from the Settings page
                                </p>
                                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                    Go to Skills Settings
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Achievements Section */}
                    <div className={`rounded-lg border ${getCardStyle()} p-6`}>
                        <h2 className={`text-xl font-bold mb-4 ${getTextColor()}`}>Achievements</h2>
                        <div className="space-y-2">
                            {student.achievements.map((achievement, index) => (
                                <div 
                                    key={index} 
                                    className={`flex items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}`}
                                >
                                    <Award size={18} className="text-yellow-500 mr-3" />
                                    <span className={getSubtleTextColor()}>{achievement}</span>
                                </div>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="mt-4">
                                <label className={`block text-sm font-medium mb-1 ${getMutedTextColor()}`}>
                                    Add or edit achievements (one per line)
                                </label>
                                <textarea
                                    value={editData.achievements.join("\n")}
                                    onChange={(e) => setEditData({
                                        ...editData,
                                        achievements: e.target.value.split("\n").filter(line => line.trim() !== '')
                                    })}
                                    className={`w-full px-3 py-2 rounded border ${getInputStyle()}`}
                                    rows={4}
                                    placeholder="Enter your achievements"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
