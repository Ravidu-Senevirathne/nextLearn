"use client";

import React, { useEffect, useState } from "react";
import { NavbarDemo } from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useParams } from "next/navigation";
import Link from "next/link";

// This would ideally come from an API, but we'll use static data for demonstration
const allCourses = [
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming with this comprehensive course for beginners. This course covers fundamental programming concepts including variables, data types, control structures, functions, and basic algorithms. Perfect for those with no prior coding experience.",
    image: "https://placehold.co/600x400/3b82f6/FFFFFF/png?text=Programming+Basics",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.8,
    students: 2340,
    instructor: "Dr. Jane Smith",
    price: "$49.99",
    language: "English",
    topics: ["Variables", "Data Types", "Control Flow", "Functions", "Basic Algorithms"],
    requirements: ["No prior programming experience required", "Basic computer skills"],
    features: ["24 hours of video content", "45 coding exercises", "10 projects", "Certificate of completion"]
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript to build modern websites. This course provides a solid foundation in front-end web development. Learn to create responsive layouts, style web pages, and add interactivity to create engaging user experiences.",
    image: "https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Web+Development",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.9,
    students: 3560,
    instructor: "Michael Chen",
    price: "$69.99",
    language: "English",
    topics: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "DOM Manipulation"],
    requirements: ["Basic understanding of how websites work", "Familiarity with using computers"],
    features: ["30 hours of video content", "50+ coding exercises", "5 real-world projects", "Certificate of completion"]
  },
  // Add limited details for other courses so they can be found by ID
  {
    id: 3,
    title: "React Framework",
    description: "Build responsive and interactive UIs with React. Master component architecture, state management, hooks, and more to create modern web applications.",
    image: "https://placehold.co/600x400/06b6d4/FFFFFF/png?text=React+Framework",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.7,
    students: 2890,
    instructor: "Sarah Johnson",
    price: "$79.99",
    language: "English",
    topics: ["React Components", "State Management", "React Hooks", "Context API", "React Router"],
    requirements: ["JavaScript knowledge", "Basic HTML and CSS"],
    features: ["35 hours of video content", "20 exercises", "3 complete applications", "Certificate of completion"]
  },
  // Add additional courses with basic details so we can find them by ID
  {
    id: 4,
    title: "Data Science Essentials",
    description: "Learn data analysis, visualization and machine learning fundamentals",
    image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=Data+Science",
    level: "Intermediate",
    duration: "14 weeks",
    rating: 4.8,
    students: 1950,
    instructor: "David Wilson",
    price: "$89.99",
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Create iOS and Android applications using React Native",
    image: "https://placehold.co/600x400/f59e0b/FFFFFF/png?text=Mobile+Development",
    level: "Advanced",
    duration: "11 weeks",
    rating: 4.6,
    students: 2120,
    instructor: "Lisa Rodriguez",
    price: "$84.99",
  },
  // More courses can be added here
];

export default function CourseDetails() {
  const params = useParams();
  const courseId = typeof params?.courseId === 'string' ? parseInt(params.courseId, 10) : 0;
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the course data from an API
    const fetchCourse = async () => {
      try {
        // Simulate API loading
        const foundCourse = allCourses.find(c => c.id === courseId);
        setTimeout(() => {
          setCourse(foundCourse || null);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950">
        <NavbarDemo />
        <div className="container mx-auto py-16 px-4 mt-20 flex justify-center items-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-950">
        <NavbarDemo />
        <div className="container mx-auto py-16 px-4 mt-20 text-center min-h-[60vh] flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Course Not Found</h1>
          <p className="text-gray-400 mb-8">We couldn't find the course you're looking for.</p>
          <Link 
            href="/courses/all-courses" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md inline-block transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <NavbarDemo />
      
      {/* Hero Section with Course Image */}
      <div 
        className="h-[50vh] bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${course.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end">
          <div className="container mx-auto px-4 py-12">
            <span className={`px-4 py-1 rounded-full text-sm font-medium inline-block mb-4 ${
              course.level === "Beginner" ? "bg-blue-100 text-blue-800" :
              course.level === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            }`}>
              {course.level}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{course.title}</h1>
            <p className="text-xl text-gray-300 mb-4 max-w-3xl">{course.description?.split('.')[0]}.</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="ml-1 text-white">{course.rating}</span>
                <span className="text-gray-400 ml-1">({course.students?.toLocaleString()} students)</span>
              </div>
              <div className="text-white">
                <span className="font-medium">Created by:</span> {course.instructor}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Details */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.topics?.map((topic: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Course Description</h2>
              <div className="text-gray-300 space-y-4">
                <p>{course.description}</p>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                {course.requirements?.map((req: string, index: number) => (
                  <li key={index}>{req}</li>
                )) || <li>No specific requirements for this course.</li>}
              </ul>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-gray-900 rounded-xl p-6 sticky top-24">
              <div className="text-3xl font-bold text-white mb-6">{course.price}</div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium mb-4 transition-colors">
                Enroll Now
              </button>
              <button className="w-full border border-gray-600 text-white py-3 rounded-md font-medium mb-6 hover:bg-gray-800 transition-colors">
                Add to Wishlist
              </button>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between pb-4 border-b border-gray-800">
                  <span>Duration:</span>
                  <span className="font-medium text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-800">
                  <span>Level:</span>
                  <span className="font-medium text-white">{course.level}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-800">
                  <span>Language:</span>
                  <span className="font-medium text-white">{course.language || 'English'}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-medium text-white mb-2">This course includes:</h3>
                  {course.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
