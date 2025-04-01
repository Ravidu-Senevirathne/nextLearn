"use client";

import { BackgroundGradientAnimation } from "@/Components/ui/background-gradient-animation";
import { FocusCards } from "@/Components/ui/focus-cards";
import { GlareCard } from "@/Components/ui/glare-card";
import { GlowingEffect } from "@/Components/ui/glowing-effect";
import { Vortex } from "@/Components/ui/vortex";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { NavbarDemo } from "@/Components/Navbar";
import Footer from "@/Components/Footer";

// Sample LMS blog data - replace with actual data fetching in production
const featuredPosts = [
  {
    id: 1,
    title: "How to Master JavaScript Fundamentals",
    excerpt: "Build a solid foundation with our comprehensive JavaScript course path...",
    coverImage: "/images/blog/javascript-course.jpg",
    category: "Web Development",
    instructor: "Prof. John Smith",
    date: "June 15, 2023",
    difficulty: "Beginner",
    duration: "8 weeks"
  },
  {
    id: 2,
    title: "UX Design Principles for Online Learning",
    excerpt: "Create engaging learning experiences with proven UX strategies...",
    coverImage: "/images/blog/ux-design.jpg",
    category: "Design",
    instructor: "Dr. Sarah Chen",
    date: "July 22, 2023",
    difficulty: "Intermediate",
    duration: "6 weeks"
  },
  {
    id: 3,
    title: "Machine Learning for Business Applications",
    excerpt: "Apply ML techniques to solve real-world business challenges...",
    coverImage: "/images/blog/ml-business.jpg",
    category: "Data Science",
    instructor: "Prof. Michael Johnson",
    date: "August 10, 2023",
    difficulty: "Advanced",
    duration: "10 weeks"
  }
];

const regularPosts = [
  {
    id: 4,
    title: "Python for Data Analysis",
    src: "/images/blog/python-data.jpg",
    category: "Data Science",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    title: "React Native Mobile Development",
    src: "/images/blog/react-native.jpg",
    category: "Web Development",
    difficulty: "Advanced"
  },
  {
    id: 6,
    title: "Introduction to UI Design",
    src: "/images/blog/ui-basics.jpg",
    category: "Design",
    difficulty: "Beginner"
  },
  {
    id: 7,
    title: "Cloud Infrastructure for Developers",
    src: "/images/blog/cloud-infra.jpg",
    category: "DevOps",
    difficulty: "Intermediate"
  },
  {
    id: 8,
    title: "Business Analytics Fundamentals",
    src: "/images/blog/business-analytics.jpg",
    category: "Business",
    difficulty: "Beginner"
  },
  {
    id: 9,
    title: "Advanced Animation Techniques",
    src: "/images/blog/animations.jpg",
    category: "Design",
    difficulty: "Advanced"
  }
];

const categories = ["All", "Web Development", "Design", "Data Science", "Business", "DevOps"];
const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [email, setEmail] = useState("");
  
  const filteredPosts = regularPosts.filter(post => {
    const categoryMatch = selectedCategory === "All" || post.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "All Levels" || post.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarDemo/>
      
      {/* Hero section with improved text visibility */}
      <section className="relative h-[70vh] overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(5, 5, 20)"
            gradientBackgroundEnd="rgb(10, 0, 25)"
            firstColor="16, 65, 155"
            secondColor="121, 54, 155"
            thirdColor="50, 115, 155"
            pointerColor="80, 50, 155"
            size="100%"
            blendingValue="soft-light"
            containerClassName="h-full"
          />
        </div>
        <div className="relative h-full z-10 flex flex-col items-center justify-center px-4 text-center">
          <div className="mt-16 bg-black/50 p-8 rounded-xl backdrop-blur-md border border-purple-900/30 shadow-xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow-lg">
              Learning Resources
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white text-shadow-sm">
              Discover courses, tutorials, and guides to accelerate your learning journey
            </p>
          </div>
        </div>
      </section>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-black to-gray-950">
        {/* Categories */}
        <section className="mb-12">
          <h3 className="text-center text-lg mb-3 text-gray-400">Filter by Subject</h3>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category 
                    ? "bg-purple-700 text-white" 
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <h3 className="text-center text-lg mb-3 text-gray-400">Filter by Level</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedDifficulty === difficulty 
                    ? "bg-blue-700 text-white" 
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </section>

        {/* Featured courses with GlareCard */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Featured Courses
            </h2>
            <div className="h-1 w-24 bg-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map(post => (
              <div key={post.id}>
                <GlareCard className="p-6 flex flex-col h-full">
                  <div className="flex-1 flex flex-col">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-purple-900 text-purple-300">
                        {post.category}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded 
                        ${post.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' : 
                          post.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' : 
                          'bg-red-900 text-red-300'}`}>
                        {post.difficulty}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-800 text-gray-300">
                        {post.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{post.title}</h3>
                    <p className="text-gray-400 mb-4 flex-grow">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-400">By {post.instructor}</span>
                      <span className="text-gray-500">{post.date}</span>
                    </div>
                  </div>
                </GlareCard>
              </div>
            ))}
          </div>
        </section>

        {/* Learning resources with FocusCards - Fixed heading */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Learning Resources
            </h2>
            <p className="text-gray-400 text-center">
              {filteredPosts.length === 0 
                ? "No resources match your current filters. Try adjusting your selection." 
                : `Showing ${filteredPosts.length} resources ${selectedCategory !== "All" ? `in ${selectedCategory}` : ""}`}
            </p>
          </div>
          
          {filteredPosts.length > 0 ? (
            <FocusCards cards={filteredPosts.map(post => ({
              ...post,
              title: (
                <div>
                  <div className="mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded 
                      ${post.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' : 
                        post.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' : 
                        'bg-red-900 text-red-300'}`}>
                      {post.difficulty}
                    </span>
                  </div>
                  {post.title}
                </div>
              )
            }))} />
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">No results found</p>
            </div>
          )}
        </section>

        {/* Course updates newsletter with improved text visibility */}
        <section className="mb-16 relative py-16">
          <div className="absolute inset-0 z-0">
            <Vortex 
              baseHue={240} 
              particleCount={300} 
              backgroundColor="transparent" 
            />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="p-8 rounded-xl bg-black/70 backdrop-blur-md border border-blue-900/30 shadow-lg">
              <div className="relative">
                <GlowingEffect 
                  disabled={false} 
                  glow={true} 
                  blur={5} 
                  spread={8}
                  movementDuration={1.5}
                />
                <div className="relative z-20">
                  <h2 className="text-3xl font-bold mb-4 text-white text-shadow-sm">Get Learning Updates</h2>
                  <p className="text-gray-100 mb-6 font-medium">
                    Subscribe to our newsletter to receive new course alerts, learning tips, and exclusive educational content.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-gray-800 border-gray-700 text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button className="bg-purple-700 hover:bg-purple-600 font-medium">
                      Get Learning Updates
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning paths */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Learning Paths
            </h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Frontend Developer", courses: 12, hours: 64, level: "All Levels" },
              { title: "Data Scientist", courses: 15, hours: 82, level: "Intermediate to Advanced" },
              { title: "UX/UI Designer", courses: 10, hours: 58, level: "Beginner to Intermediate" }
            ].map((path, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-700 transition-colors">
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <div className="flex gap-4 mb-4">
                  <div className="text-sm text-gray-400">
                    <span className="text-white font-bold">{path.courses}</span> courses
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="text-white font-bold">{path.hours}</span> hours
                  </div>
                </div>
                <p className="text-gray-500 mb-4 text-sm">{path.level}</p>
                <Button variant="outline" className="w-full">View Path</Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
