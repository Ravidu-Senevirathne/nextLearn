"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import web from "../../images/web-development.jpg";
import { GlowingEffect } from "../../Components/ui/glowing-effect";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Software Developer", 
    company: "Tech Solutions Inc.",
    image: web, // Using the imported image
    quote: "NextLearn transformed my career. I went from knowing basic HTML to developing full-stack applications in just 6 months. The instructors are incredibly knowledgeable and supportive."
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "UX Designer",
    company: "Creative Design Studio",
    image: web, // Using the same image as fallback
    quote: "The UI/UX courses on NextLearn are top-notch. I appreciate how they combine theory with practical projects. I've applied what I learned directly to my work, and my team has noticed the improvement."
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Data Scientist",
    company: "DataMetrics",
    image: web, // Using the same image as fallback
    quote: "I've taken many online courses, but NextLearn stands out. The machine learning curriculum is comprehensive yet accessible. I went from understanding basic concepts to implementing complex algorithms."
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            What Our Students Say
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from our community about how NextLearn has helped them achieve their learning goals.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
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
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-gray-900 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                  <div className="flex flex-row items-center space-x-4 z-10 relative">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
                      <Image
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg text-white">
                        {currentTestimonial.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {currentTestimonial.role} at {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-content mt-6 relative">
                    <div className="absolute -top-10 left-0">
                      <svg className="h-12 w-12 text-purple-500 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <p className="font-normal text-base text-gray-200 mt-4">
                      "{currentTestimonial.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-purple-500" : "bg-gray-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex justify-between mt-8 mx-auto max-w-md">
            <button
              onClick={prevTestimonial}
              className="rounded-full bg-gray-800 hover:bg-gray-700 p-2 text-white"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 010-1.414l4-4a1 1 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button
              onClick={nextTestimonial}
              className="rounded-full bg-gray-800 hover:bg-gray-700 p-2 text-white"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
