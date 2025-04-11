"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 -left-10 w-72 h-72 bg-purple-900/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 -right-10 w-72 h-72 bg-blue-900/10 rounded-full filter blur-3xl"></div>
        
        {/* Animated gradient lines */}
        <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M0,20 Q25,40 50,20 T100,20" 
            stroke="url(#grad1)" 
            strokeWidth="0.5" 
            fill="none" 
            className="animate-pulse-slow"
          ></path>
          <path 
            d="M0,50 Q25,30 50,50 T100,50" 
            stroke="url(#grad2)" 
            strokeWidth="0.5" 
            fill="none" 
            className="animate-pulse-slow animation-delay-300"
          ></path>
          <path 
            d="M0,80 Q25,60 50,80 T100,80" 
            stroke="url(#grad3)" 
            strokeWidth="0.5" 
            fill="none" 
            className="animate-pulse-slow animation-delay-600"
          ></path>
          
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join over 15,000+ students who have already advanced their careers 
              with our expert-led courses and industry-recognized certificates.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/auth/signup">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 w-full md:w-auto text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-full shadow-lg shadow-purple-900/30 transition-all"
              >
                Get Started — It's Free
              </motion.button>
            </Link>
            <Link href="/courses/all">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 w-full md:w-auto text-lg border-2 border-gray-700 hover:border-purple-500 hover:bg-gray-900/50 text-white font-medium rounded-full transition-all"
              >
                Explore All Courses
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div
            className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Why Choose NextLearn?
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-white font-medium mb-1">Learn at Your Pace</h4>
                <p className="text-gray-400 text-sm">Access content anytime, anywhere</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-white font-medium mb-1">Expert Instructors</h4>
                <p className="text-gray-400 text-sm">Learn from industry professionals</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-pink-900/30 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-white font-medium mb-1">Certified Courses</h4>
                <p className="text-gray-400 text-sm">Earn recognized certificates</p>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-16">
            <p className="text-gray-400 text-sm">
              No credit card required. Cancel anytime. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-pulse-slow {
          animation: pulseSlow 6s infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 2s;
        }
        
        .animation-delay-600 {
          animation-delay: 4s;
        }
        
        @keyframes pulseSlow {
          0%, 100% { 
            opacity: 0.3; 
          }
          50% { 
            opacity: 0.8; 
          }
        }
      `}</style>
    </section>
  );
}
