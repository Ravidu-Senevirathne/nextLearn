"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlowingEffect } from './ui/glowing-effect';
import { 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ArrowRight, 
  Mail, 
  MapPin, 
  Phone,
  BookOpen,
  Lightbulb,
  Award,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    console.log("Newsletter subscription submitted");
  };

  return (
    <footer className="bg-gray-950 text-gray-200 pt-16 pb-8 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-blue-900/10 pointer-events-none"></div>
      
      {/* Grid patterns */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'%3E%3Cg fill=\'white\' fill-opacity=\'1\'%3E%3Cpath d=\'M0 0h20v20H0V0zm2 2v16h16V2H2z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          variants={footerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* Brand and description column */}
          <motion.div variants={itemAnimation} className="col-span-1 md:col-span-4">
            <Link href="/" className="flex items-center mb-6 group">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 transition-transform group-hover:scale-105">NextLearn</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Transform your learning experience with our interactive platform. Access world-class courses anytime, anywhere, and advance your career with NextLearn.
            </p>
            
            <div className="flex space-x-4 mb-8">
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-125 p-2 rounded-full hover:bg-blue-900/20">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="block text-gray-400 hover:text-pink-400 transition-colors duration-300 transform hover:scale-125 p-2 rounded-full hover:bg-pink-900/20">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="block text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-125 p-2 rounded-full hover:bg-blue-900/20">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="block text-gray-400 hover:text-gray-200 transition-colors duration-300 transform hover:scale-125 p-2 rounded-full hover:bg-gray-800">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </motion.div>

          {/* Navigation columns */}
          <motion.div variants={itemAnimation} className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
              <BookOpen size={16} className="mr-2 text-blue-400" />
              Courses
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/courses/development" 
                  className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                    Development
                    <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/courses/business" 
                  className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                    Business
                    <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/courses/design" 
                  className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                    Design
                    <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/courses/marketing" 
                  className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                    Marketing
                    <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/courses/all" 
                  className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                    All Courses
                    <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemAnimation} className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
              <Lightbulb size={16} className="mr-2 text-purple-400" />
              Resources
            </h3>
            <ul className="space-y-3">
              <li><Link href="/resources/blog" className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"><span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">Blog<ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></span></Link></li>
              <li><Link href="/resources/tutorials" className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"><span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">Tutorials<ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></span></Link></li>
              <li><Link href="/resources/webinars" className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"><span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">Webinars<ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></span></Link></li>
              <li><Link href="/resources/documentation" className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"><span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">Documentation<ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></span></Link></li>
              <li><Link href="/resources/community" className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"><span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">Community<ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></span></Link></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemAnimation} className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
              <Award size={16} className="mr-2 text-emerald-400" />
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"><span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">About Us<ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></span></Link></li>
              <li><Link href="/careers" className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"><span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">Careers<ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></span></Link></li>
              <li><Link href="/press" className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"><span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">Press<ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></span></Link></li>
              <li><Link href="/partners" className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"><span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">Partners<ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></span></Link></li>
              <li><Link href="/contact" className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center w-fit"><span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center">Contact Us<ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></span></Link></li>
            </ul>
          </motion.div>
          
          {/* Contact and newsletter */}
          <motion.div variants={itemAnimation} className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
              <MessageSquare size={16} className="mr-2 text-amber-400" />
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:support@nextlearn.com" 
                  className="flex items-start group hover:bg-gray-900/40 p-1 rounded transition-all"
                >
                  <Mail size={16} className="mr-2 mt-1 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">support@nextlearn.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+15551234567" 
                  className="flex items-start group hover:bg-gray-900/40 p-1 rounded transition-all"
                >
                  <Phone size={16} className="mr-2 mt-1 text-gray-500 group-hover:text-green-400 transition-colors" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">+1 (555) 123-4567</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://maps.google.com/?q=Learning+City,+CA+94043" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start group hover:bg-gray-900/40 p-1 rounded transition-all"
                >
                  <MapPin size={16} className="mr-2 mt-1 text-gray-500 group-hover:text-red-400 transition-colors" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    123 Education St.<br/>Learning City, CA 94043
                    <ExternalLink size={12} className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Newsletter Subscription */}
        <motion.div 
          variants={itemAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 mb-8"
        >
          <div className="relative max-w-md mx-auto md:mx-0">
            <div className="relative p-1 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
                <h4 className="text-xl font-semibold mb-3 text-white">Subscribe to Our Newsletter</h4>
                <p className="text-gray-400 mb-4">Get the latest updates, courses and resources</p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow bg-gray-800 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-gray-750 transition-colors"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-all hover:shadow-lg hover:shadow-purple-900/30 transform hover:-translate-y-1"
                  >
                    Subscribe
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom links and copyright */}
        <div className="pt-8 mt-12 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 mb-4 md:mb-0">
              &copy; {currentYear} NextLearn LMS. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm hover:underline underline-offset-4">
                <ShieldCheck size={14} className="mr-1" /> Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm hover:underline underline-offset-4">
                <HelpCircle size={14} className="mr-1" /> Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm hover:underline underline-offset-4">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm hover:underline underline-offset-4">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
