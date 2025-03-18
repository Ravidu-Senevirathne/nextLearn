"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import web from "../../images/web-development.jpg";
import ds from "../../images/data-science.jpg";
import { GlowingEffect } from "../../Components/ui/glowing-effect";

// Updated courses to match IDs in the course details page
const courses = [
  {
    id: 1, // Introduction to Programming
    title: "Introduction to Programming",
    instructor: "Dr. Jane Smith",
    category: "Development",
    level: "Beginner",
    rating: 4.8,
    students: 2340,
    image: "https://placehold.co/600x400/3b82f6/FFFFFF/png?text=Programming+Basics",
    price: "$49.99",
  },
  {
    id: 2, // Web Development Fundamentals
    title: "Web Development Fundamentals",
    instructor: "Michael Chen",
    category: "Development",
    level: "Intermediate",
    rating: 4.9,
    students: 3560,
    image: "https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Web+Development",
    price: "$69.99",
  },
  {
    id: 3, // React Framework
    title: "React Framework",
    instructor: "Sarah Johnson",
    category: "Development",
    level: "Advanced",
    rating: 4.7,
    students: 2890,
    image: "https://placehold.co/600x400/06b6d4/FFFFFF/png?text=React+Framework",
    price: "$79.99",
  },
  {
    id: 4, // Data Science Essentials
    title: "Data Science Essentials",
    instructor: "David Wilson",
    category: "Data Science",
    level: "Intermediate",
    rating: 4.8,
    students: 1950,
    image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=Data+Science",
    price: "$89.99",
  },
];

export default function PopularCourses() {
  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Popular Courses
            </h2>
            <p className="text-gray-400 mt-2">
              Explore our most in-demand courses across various disciplines
            </p>
          </div>
          <Link href="/courses/all-courses" className="px-5 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-md transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-h-[24rem]"
            >
              <div className="relative h-full rounded-xl border border-gray-800 p-2">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-gray-900">
                  <div className="relative h-48 w-full">
                    {typeof course.image === 'string' ? (
                      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <span className="text-white text-lg font-medium">{course.category}</span>
                      </div>
                    ) : (
                      <Image 
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                        priority={index < 2}
                      />
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      By {course.instructor}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="text-yellow-400 mr-1">★</div>
                        <span className="text-white">{course.rating}</span>
                        <span className="text-gray-400 text-xs ml-1">
                          ({course.students.toLocaleString()} students)
                        </span>
                      </div>
                      <div className="text-blue-400 font-medium">
                        {course.price}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Link 
                        href={`/courses/${course.id}`}
                        className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-md transition-colors"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
