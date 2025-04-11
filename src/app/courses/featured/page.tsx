"use client";
import React from "react";
import { NavbarDemo } from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { FocusCards } from "@/Components/ui/focus-cards";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturedCoursesPage() {
  // Featured courses with updated imagery
  const featuredCourses = [
    {
      id: 1,
      title: "Introduction to Programming",
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Web Development Masterclass",
      src: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "React Framework Deep Dive",
      src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Data Science Essentials",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      title: "Mobile App Development",
      src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <NavbarDemo />
      
      <div className="container mx-auto py-16 px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Featured Courses
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our handpicked selection of premium courses designed to give you the skills that matter most in today's world.
          </p>
        </motion.div>
        
        <FocusCards cards={featuredCourses} />
        
        <div className="mt-16 text-center">
          <Link 
            href="/courses/all-courses"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all"
          >
            Explore All Courses
          </Link>
        </div>
        
        {/* Featured Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Students Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center text-xl font-bold text-white">IW</div>
                <div className="ml-4">
                  <h3 className="text-white font-medium">Isurindu Wickramasinghe</h3>
                  <p className="text-gray-400 text-sm">Web Development Student</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The Web Development Masterclass completely changed my career path. The instructors explained complex concepts in simple terms, and the projects helped me build a strong portfolio that impressed employers."
              </p>
              <div className="flex mt-4 text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-xl font-bold text-white">TK</div>
                <div className="ml-4">
                  <h3 className="text-white font-medium">Tharushi Kasumini</h3>
                  <p className="text-gray-400 text-sm">Data Science Student</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The Data Science Essentials course provided me with practical skills I use every day in my job. The hands-on projects with real-world datasets gave me confidence to tackle complex data problems."
              </p>
              <div className="flex mt-4 text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
