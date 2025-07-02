"use client";

import { useState, useMemo } from 'react';
import { Search, BookOpen, Filter, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

// Mock data for student grades across courses
const gradesData = [
    {
        id: 1,
        course: 'Web Development Fundamentals',
        category: 'Assignment',
        title: 'Final Project',
        grade: 85,
        maxGrade: 100,
        date: '2023-11-25',
        feedback: 'Excellent work on the responsive design'
    },
    {
        id: 2,
        course: 'Web Development Fundamentals',
        category: 'Quiz',
        title: 'HTML & CSS Basics',
        grade: 92,
        maxGrade: 100,
        date: '2023-11-10',
        feedback: 'Outstanding knowledge of core concepts'
    },
    {
        id: 3,
        course: 'Advanced JavaScript',
        category: 'Assignment',
        title: 'React Component Library',
        grade: 78,
        maxGrade: 100,
        date: '2023-11-26',
        feedback: 'Good work, but needs improvement in state management'
    },
    {
        id: 4,
        course: 'Database Management',
        category: 'Exam',
        title: 'Midterm Exam',
        grade: 90,
        maxGrade: 100,
        date: '2023-11-22',
        feedback: 'Excellent understanding of database concepts'
    },
    {
        id: 5,
        course: 'Advanced JavaScript',
        category: 'Quiz',
        title: 'Modern JS Features',
        grade: 88,
        maxGrade: 100,
        date: '2023-11-05',
        feedback: 'Well-structured code with good error handling'
    },
    {
        id: 6,
        course: 'UI/UX Design Principles',
        category: 'Project',
        title: 'Mobile App Design',
        grade: 95,
        maxGrade: 100,
        date: '2023-11-15',
        feedback: 'Creative and user-focused design approach'
    },
    {
        id: 7,
        course: 'Data Science Essentials',
        category: 'Assignment',
        title: 'Data Visualization',
        grade: 82,
        maxGrade: 100,
        date: '2023-11-18',
        feedback: 'Good analysis but could improve visualization clarity'
    },
    {
        id: 8,
        course: 'Data Science Essentials',
        category: 'Exam',
        title: 'Final Exam',
        grade: 91,
        maxGrade: 100,
        date: '2023-12-10',
        feedback: 'Excellent problem-solving skills'
    }
];

// Course data for filtering
const courses = [
    { id: '1', name: 'All Courses' },
    { id: '2', name: 'Web Development Fundamentals' },
    { id: '3', name: 'Advanced JavaScript' },
    { id: '4', name: 'Database Management' },
    { id: '5', name: 'UI/UX Design Principles' },
    { id: '6', name: 'Data Science Essentials' },
];

// Category data for filtering
const categories = [
    { id: '1', name: 'All Categories' },
    { id: '2', name: 'Assignment' },
    { id: '3', name: 'Quiz' },
    { id: '4', name: 'Exam' },
    { id: '5', name: 'Project' }
];

const StudentGradesPage = () => {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('All Courses');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [expandedGrade, setExpandedGrade] = useState<number | null>(null);

    // Filter grades based on search term and selected filters
    const filteredGrades = useMemo(() => {
        return gradesData.filter(grade => {
            const matchesSearch =
                grade.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                grade.course.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCourse =
                selectedCourse === 'All Courses' || grade.course === selectedCourse;

            const matchesCategory =
                selectedCategory === 'All Categories' || grade.category === selectedCategory;

            return matchesSearch && matchesCourse && matchesCategory;
        });
    }, [searchTerm, selectedCourse, selectedCategory]);

    // Calculate statistics
    const stats = useMemo(() => {
        const grades = filteredGrades.map(g => g.grade);
        const avg = grades.length > 0
            ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length
            : 0;

        const courseGrades = {} as Record<string, number[]>;
        const categoryGrades = {} as Record<string, number[]>;

        filteredGrades.forEach(grade => {
            if (!courseGrades[grade.course]) courseGrades[grade.course] = [];
            courseGrades[grade.course].push(grade.grade);

            if (!categoryGrades[grade.category]) categoryGrades[grade.category] = [];
            categoryGrades[grade.category].push(grade.grade);
        });

        const courseAverages = Object.entries(courseGrades).map(([course, grades]) => ({
            course,
            average: grades.reduce((sum, grade) => sum + grade, 0) / grades.length
        }));

        return {
            average: Math.round(avg * 10) / 10,
            highest: grades.length ? Math.max(...grades) : 0,
            lowest: grades.length ? Math.min(...grades) : 0,
            total: filteredGrades.length,
            courseAverages
        };
    }, [filteredGrades]);

    // Get appropriate letter grade
    const getLetterGrade = (grade: number) => {
        if (grade >= 90) return 'A';
        if (grade >= 80) return 'B';
        if (grade >= 70) return 'C';
        if (grade >= 60) return 'D';
        return 'F';
    };

    // Get color based on grade
    const getGradeColor = (grade: number) => {
        if (grade >= 90) return theme === 'dark' ? 'text-green-400' : 'text-green-600';
        if (grade >= 80) return theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
        if (grade >= 70) return theme === 'dark' ? 'text-amber-400' : 'text-amber-600';
        return theme === 'dark' ? 'text-red-400' : 'text-red-600';
    };

    // Get background style based on grade percentage
    const getGradeBackground = (grade: number) => {
        if (grade >= 90) return 'bg-green-500 dark:bg-green-600';
        if (grade >= 80) return 'bg-blue-500 dark:bg-blue-600';
        if (grade >= 70) return 'bg-yellow-500 dark:bg-yellow-600';
        if (grade >= 60) return 'bg-orange-500 dark:bg-orange-600';
        return 'bg-red-500 dark:bg-red-600';
    };

    // Toggle expanded view for a grade
    const toggleGradeExpand = (id: number) => {
        setExpandedGrade(expandedGrade === id ? null : id);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-2">My Grades</h1>
            <p className={theme === 'dark' ? 'text-gray-400 mb-6' : 'text-gray-600 mb-6'}>
                View your academic performance across all courses
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Overall Average</div>
                    <div className="flex items-end mt-1">
                        <div className="text-2xl font-bold">{stats.average}%</div>
                        <div className={`ml-2 px-2 py-0.5 rounded text-xs ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                            {getLetterGrade(stats.average)}
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Highest Grade</div>
                    <div className="flex items-end mt-1">
                        <div className="text-2xl font-bold">{stats.highest}%</div>
                        <div className={`ml-2 px-2 py-0.5 rounded text-xs ${theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'}`}>
                            {getLetterGrade(stats.highest)}
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Lowest Grade</div>
                    <div className="flex items-end mt-1">
                        <div className="text-2xl font-bold">{stats.lowest}%</div>
                        <div className={`ml-2 px-2 py-0.5 rounded text-xs ${theme === 'dark' 
                            ? `${stats.lowest >= 60 ? 'bg-amber-900/30 text-amber-300' : 'bg-red-900/30 text-red-300'}` 
                            : `${stats.lowest >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}`}>
                            {getLetterGrade(stats.lowest)}
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Graded Items</div>
                    <div className="mt-1">
                        <div className="text-2xl font-bold">
                            {stats.total}
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Performance */}
            {stats.courseAverages.length > 0 && (
                <div className={`p-4 mb-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <h2 className="text-lg font-medium mb-4">Course Performance</h2>
                    <div className="space-y-4">
                        {stats.courseAverages.map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{item.course}</span>
                                    <span className={`font-medium ${getGradeColor(item.average)}`}>
                                        {Math.round(item.average)}% ({getLetterGrade(item.average)})
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={getGradeBackground(item.average)}
                                        style={{ width: `${item.average}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className={`p-4 mb-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search grades..."
                            className={`w-full pl-10 pr-4 py-2 border rounded-md ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                                }`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center">
                        <BookOpen size={18} className="mr-2 text-gray-400" />
                        <select
                            className={`w-full p-2 border rounded-md ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                                }`}
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            {courses.map(course => (
                                <option key={course.id} value={course.name}>{course.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <Filter size={18} className="mr-2 text-gray-400" />
                        <select
                            className={`w-full p-2 border rounded-md ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                                }`}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Grades List */}
            <div className="space-y-4">
                {filteredGrades.length > 0 ? (
                    filteredGrades.map((grade) => (
                        <div
                            key={grade.id}
                            className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                        >
                            <div onClick={() => toggleGradeExpand(grade.id)} className="cursor-pointer">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between">
                                            <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {grade.title}
                                            </h3>
                                            <div className="flex items-center">
                                                <div className={`px-2 py-0.5 rounded text-xs ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} mr-2`}>
                                                    {grade.category}
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex items-baseline">
                                                        <span className={`text-xl font-bold ${getGradeColor(grade.grade)}`}>
                                                            {grade.grade}
                                                        </span>
                                                        <span className={`text-sm ml-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                            / {grade.maxGrade}
                                                        </span>
                                                    </div>
                                                    <div className={`ml-2 px-2 py-0.5 rounded text-xs ${
                                                        grade.grade >= 80
                                                            ? theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                                                            : grade.grade >= 60
                                                                ? theme === 'dark' ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-800'
                                                                : theme === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {getLetterGrade(grade.grade)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <BookOpen size={14} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {grade.course}
                                            </span>
                                            <span className={`text-sm ml-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Date: {grade.date}
                                            </span>
                                        </div>

                                        {/* Grade visualization */}
                                        <div className="mt-3">
                                            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={getGradeBackground(grade.grade)}
                                                    style={{ width: `${grade.grade}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center mt-2 md:mt-0 ml-auto">
                                        {expandedGrade === grade.id ? (
                                            <ChevronUp size={18} className="text-gray-400" />
                                        ) : (
                                            <ChevronDown size={18} className="text-gray-400" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Expanded view with feedback */}
                            {expandedGrade === grade.id && grade.feedback && (
                                <div className={`mt-4 p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Instructor Feedback:
                                    </div>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {grade.feedback}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className={`p-8 text-center rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="flex flex-col items-center justify-center">
                            <BarChart2 size={40} className={`mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            <h3 className={`text-lg font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                No grades found
                            </h3>
                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                                {searchTerm || selectedCourse !== 'All Courses' || selectedCategory !== 'All Categories'
                                    ? 'Try adjusting your search or filters'
                                    : 'You don\'t have any graded items yet'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentGradesPage;
