"use client";
import React from "react";
import { NavbarDemo } from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Vortex } from "@/Components/ui/vortex";
import { GlowingEffect } from "@/Components/ui/glowing-effect";
import { Spotlight } from "@/Components/ui/Spotlight";
import conceptImage from "../../images/concept.jpg";

export default function AboutPage() {
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarDemo />

      {/* Hero Section with Spotlight - Fixed positioning and z-index */}
      <div className="relative h-[70vh] w-full mt-36 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <Spotlight className="opacity-70"  />
        </div>

        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <motion.div
        className="text-center max-w-3xl mx-auto p-8 rounded-lg backdrop-blur-md bg-black/40 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
          >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">Our Mission</h1>
        <p className="text-xl text-white leading-relaxed drop-shadow-md">
          To create an efficient platform where teachers and students from around the world can connect, share knowledge, and transform education together.
        </p>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Our Story Section with modern design techniques */}
      <section className="py-28 bg-black relative overflow-hidden mt-10">
        {/* Animated background shapes */}
        <div className="absolute w-96 h-96 rounded-full bg-blue-500/5 blur-3xl top-20 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl bottom-20 -right-48 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold text-center mb-16 relative"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
                Our Story
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400"></div>
            </motion.h2>

            <div className="perspective-effect">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-700 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-conic from-blue-500 via-purple-500 to-emerald-500 animate-spin-slow mask-gradient"></div>

                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-xl rounded-2xl p-10 relative z-10 border border-white/10">
                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    {/* Decorative floating element */}
                    <motion.div
                      initial={{ rotate: -5 }}
                      whileInView={{ rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="md:col-span-2 relative group-hover:translate-y-[-5px] transition-transform duration-700"
                    >
                      <div className="w-full aspect-square rounded-lg overflow-hidden relative shadow-2xl shadow-blue-500/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-emerald-500/30 z-10 mix-blend-overlay"></div>
                        <Image
                          src={conceptImage}
                          alt="Education concept"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full blur-xl z-0"></div>
                    </motion.div>

                    {/* Story text with reveal animations */}
                    <div className="md:col-span-3 space-y-6">
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-gray-200 leading-relaxed text-lg"
                      >
                        NextLearn was born from a simple observation: despite living in a digitally connected world, <span className="text-blue-400 font-medium">education remains fragmented and inaccessible</span> to many. Ravidu and Isurindu, both passionate about technology and education, set out to change this reality.
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-gray-200 leading-relaxed text-lg"
                      >
                        Founded in 2025, our platform aims to bridge the gap between traditional learning methods and modern technology. We believe that <span className="text-emerald-400 font-medium">knowledge should be accessible to everyone</span>, regardless of geographical location or economic background.
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="text-gray-200 leading-relaxed text-lg"
                      >
                        Today, NextLearn serves as a comprehensive ecosystem where educators can create engaging courses, and students can access quality education on their terms. Our focus remains on <span className="text-purple-400 font-medium">innovation, accessibility, and building a global community</span> of lifelong learners.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="mt-8 flex space-x-4"
                      >
                        <Link
                          href="/courses/all-courses"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25 group"
                        >
                          Discover Our Courses
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </Link>
                        <Link
                          href="/about/team"
                          className="inline-flex items-center gap-2 bg-transparent border border-purple-500 text-white px-5 py-3 rounded-lg hover:bg-purple-500/10 transition-all duration-300 group"
                        >
                          Meet Our Team
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                          </svg>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section - Fixed spacing and z-index */}
      <section className="py-20 bg-black relative z-10 mb-40 mt-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
            {...fadeInUp}
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Accessibility",
                description: "We believe education should be accessible to everyone, regardless of location, background, or economic status.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                  </svg>
                ),
                color: "blue"
              },
              {
                title: "Innovation",
                description: "We continuously innovate to provide cutting-edge learning experiences that adapt to the changing needs of students and educators.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                ),
                color: "purple"
              },
              {
                title: "Community",
                description: "We foster a global community where knowledge is shared freely and connections between educators and learners transcend traditional boundaries.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                ),
                color: "green"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="relative rounded-xl"
                {...fadeInUp}
                transition={{ delay: 0.1 * index }}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/10">
                  <GlowingEffect
                    blur={10}
                    borderWidth={1}
                    spread={60}
                    glow={true}
                    disabled={false}
                    proximity={80}
                  />
                  <div className={`bg-${value.color}-600 rounded-full w-12 h-12 flex items-center justify-center mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced Vortex - Fixed positioning and containment */}
      <section className="relative py-20 bg-black mt-10 mb-20">
        <Vortex
          backgroundColor="#000000"
          rangeY={300}
          particleCount={300}
          baseHue={160}
          baseSpeed={0.15}
          rangeSpeed={0.8}
          containerClassName="absolute inset-0 z-0"
          baseRadius={0.8}
          rangeRadius={1.5}
        >
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              className="p-8 rounded-lg backdrop-blur-md bg-black/80 border border-emerald-800/30 max-w-3xl mx-auto shadow-lg shadow-emerald-900/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-3xl font-bold mb-6 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Join Us in Transforming Education
              </motion.h2>
              <motion.p
                className="text-white mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Whether you're a student eager to learn or an educator passionate about teaching, NextLearn provides the tools and community to help you succeed.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href="/courses/all-courses"
                  className="inline-block bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-3 rounded-md font-medium mr-4 transition-all shadow-lg shadow-blue-500/30"
                >
                  Explore Courses
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-block bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors shadow-lg"
                >
                  Join Now
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Vortex>
      </section>

      <div className="mt-32 relative z-10">
        <Footer />
      </div>
    </div>
  );
}
