"use client";
import React from "react";
import { NavbarDemo } from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/Components/ui/background-beams-with-collision";
import { GlowingEffect } from "@/Components/ui/glowing-effect";
import raviduImage from "../../../images/ravidu.jpeg";
import isuruImage from "../../../images/isuru.jpeg";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Ravidu Senevirathne",
      role: "Founder & Lead Developer",
      bio: "Passionate about creating educational platforms that democratize learning. Leads the development of NextLearn with a focus on accessibility and user experience.",
      image: raviduImage,
      socialLinks: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Isurindu Wickramasinghe",
      role: "Mobile Developer",
      bio: "Expert in cross-platform mobile development. Responsible for bringing NextLearn's learning experience to iOS and Android platforms with high-performance native applications.",
      image: isuruImage,
      socialLinks: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarDemo />

      <div className="relative h-[50vh] w-full mt-36">
        <BackgroundBeamsWithCollision className="absolute inset-0">
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto p-8 rounded-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">Meet Our Team</h1>
              <p className="text-xl text-white leading-relaxed drop-shadow-md">
                The passionate minds behind NextLearn, dedicated to transforming education through technology.
              </p>
            </motion.div>
          </div>
        </BackgroundBeamsWithCollision>
      </div>

      <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative z-10 mt-10">
        <div className="container mx-auto px-4">
          <motion.p
            className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our team combines expertise in education, technology, and design to create a platform that makes learning accessible and engaging for everyone. We're united by a shared vision of transforming education through innovative solutions.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="relative rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/20 shadow-lg shadow-blue-500/10 relative">
                  <GlowingEffect
                    blur={15}
                    borderWidth={2}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={100}
                    inactiveZone={0.6}
                  />
                  <div className="p-8 flex flex-col items-center">
                    <div className="w-48 h-48 relative rounded-full overflow-hidden mb-6 border-2 border-blue-500/30">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-blue-400 mb-4 text-lg">{member.role}</p>
                      <p className="text-gray-300 mb-6">{member.bio}</p>

                      <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                        <h4 className="text-white font-medium mb-2">Expertise:</h4>
                        <div className="flex flex-wrap gap-2 mb-4 justify-center">
                          {index === 0 ? (
                            <>
                              <span className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-sm">Full Stack Development</span>
                              <span className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-sm">UX Design</span>
                              <span className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-sm">Education Technology</span>
                            </>
                          ) : (
                            <>
                              <span className="bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full text-sm">Mobile Development</span>
                              <span className="bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full text-sm">Cross-Platform Apps</span>
                              <span className="bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full text-sm">UI Animation</span>
                            </>
                          )}
                        </div>
                        <h4 className="text-white font-medium mb-2">Education:</h4>
                        <p className="text-gray-300 text-sm">
                          {index === 0 ? "BSc in Software Engineering, NIBM" : "BSc in Software Engineering, NIBM"}
                        </p>
                      </div>

                      <div className="flex space-x-4 justify-center">
                        <a href={member.socialLinks.github} className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                          </svg>
                        </a>
                        <a href={member.socialLinks.linkedin} className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                          </svg>
                        </a>
                        <a href={member.socialLinks.twitter} className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Team</h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              We're always looking for passionate individuals who share our vision of making education accessible to everyone. If you're interested in joining our team, get in touch!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg transition-colors shadow-lg shadow-purple-500/20"
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="mt-20 relative z-10">
        <Footer />
      </div>
    </div>
  );
}
