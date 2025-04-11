"use client";
import React from "react";
import { GlareCard } from "@/Components/ui/glare-card";
import Link from "next/link";
import { NavbarDemo } from "@/Components/Navbar";
import Footer from "@/Components/Footer";

// Sample course data
const courseData = [
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming with this comprehensive course for beginners",
    image: "https://placehold.co/600x400/3b82f6/FFFFFF/png?text=Programming+Basics",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.8,
    students: 2340
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript to build modern websites",
    image: "https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Web+Development",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.9,
    students: 3560
  },
  {
    id: 3,
    title: "React Framework",
    description: "Build responsive and interactive UIs with React",
    image: "https://placehold.co/600x400/06b6d4/FFFFFF/png?text=React+Framework",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.7,
    students: 2890
  },
  {
    id: 4,
    title: "Data Science Essentials",
    description: "Learn data analysis, visualization and machine learning fundamentals",
    image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=Data+Science",
    level: "Intermediate",
    duration: "14 weeks",
    rating: 4.8,
    students: 1950
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Create iOS and Android applications using React Native",
    image: "https://placehold.co/600x400/f59e0b/FFFFFF/png?text=Mobile+Development",
    level: "Advanced",
    duration: "11 weeks",
    rating: 4.6,
    students: 2120
  },
  {
    id: 6,
    title: "UI/UX Design Principles",
    description: "Master user interface and experience design techniques",
    image: "https://placehold.co/600x400/ec4899/FFFFFF/png?text=UI+UX+Design",
    level: "Beginner",
    duration: "9 weeks",
    rating: 4.9,
    students: 1780
  },
  {
    id: 7,
    title: "Cybersecurity Fundamentals",
    description: "Learn to protect systems and networks from digital attacks",
    image: "https://placehold.co/600x400/6d28d9/FFFFFF/png?text=Cybersecurity",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.7,
    students: 2450
  },
  {
    id: 8,
    title: "Cloud Computing",
    description: "Master AWS, Azure, and Google Cloud platforms",
    image: "https://placehold.co/600x400/2563eb/FFFFFF/png?text=Cloud+Computing",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.8,
    students: 1980
  },
  {
    id: 9,
    title: "Artificial Intelligence",
    description: "Explore machine learning, neural networks, and AI applications",
    image: "https://placehold.co/600x400/7c3aed/FFFFFF/png?text=AI+Course",
    level: "Advanced",
    duration: "15 weeks",
    rating: 4.9,
    students: 2760
  },
  {
    id: 10,
    title: "Game Development",
    description: "Create interactive games using Unity and C#",
    image: "https://placehold.co/600x400/db2777/FFFFFF/png?text=Game+Dev",
    level: "Intermediate",
    duration: "14 weeks",
    rating: 4.8,
    students: 3120
  },
  {
    id: 11,
    title: "DevOps Engineering",
    description: "Learn CI/CD pipelines, Docker, and Kubernetes",
    image: "https://placehold.co/600x400/0891b2/FFFFFF/png?text=DevOps",
    level: "Advanced",
    duration: "11 weeks",
    rating: 4.7,
    students: 1890
  },
  {
    id: 12,
    title: "Digital Marketing",
    description: "Master SEO, social media, and content marketing strategies",
    image: "https://placehold.co/600x400/16a34a/FFFFFF/png?text=Digital+Marketing",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.8,
    students: 2970
  }
];

export default function AllCoursesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <NavbarDemo />
      
      <div className="container mx-auto py-16 px-4 mt-20">
        <h1 className="text-4xl font-bold mb-2 text-center">All Courses</h1>
        <p className="text-gray-600 mb-8 text-center">Expand your knowledge with our diverse range of courses</p>
        
        <div className="flex justify-center flex-wrap gap-8">
          {courseData.map(course => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div className="w-full mb-4">
                <GlareCard className="p-0 overflow-hidden">
                  <div className="flex flex-col h-full">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-slate-900 to-slate-950">
                      <h2 className="text-xl font-semibold mb-2 text-white">{course.title}</h2>
                      <p className="text-gray-300 mb-4 text-sm flex-grow">{course.description}</p>
                      
                      <div className="flex justify-between items-center mb-3">
                        <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                          course.level === "Beginner" ? "bg-blue-100 text-blue-800" :
                          course.level === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {course.level}
                        </span>
                        <span className="text-gray-300 text-xs">{course.duration}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="text-yellow-300 ml-1 text-sm">{course.rating}</span>
                        </div>
                        <span className="text-gray-300 text-xs">{course.students.toLocaleString()} students</span>
                      </div>
                    </div>
                  </div>
                </GlareCard>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
