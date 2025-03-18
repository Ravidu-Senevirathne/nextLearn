"use client";

import React from "react";
import { BackgroundGradientAnimation } from "../Components/ui/background-gradient-animation";

export function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(0, 0, 0)"        // Pure black
      gradientBackgroundEnd="rgb(10, 10, 15)"       // Very dark blue-black
      firstColor="45, 35, 120"     // Muted purple
      secondColor="25, 45, 90"     // Muted blue
      thirdColor="0, 82, 110"      // Darker blue
      fourthColor="100, 45, 20"    // Darker orange
      fifthColor="70, 60, 10"      // Muted gold
      pointerColor="40, 15, 70"    // Dark violet
      size="100%"
      blendingValue="soft-light"   // Changed from "screen" to "soft-light"
    >
      <div className="absolute z-40 inset-0 flex flex-col items-center justify-center px-4 pointer-events-none mt-24">
        {/* Main content - adjusted z-indices */}
        <div className="text-center max-w-4xl mx-auto relative z-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent drop-shadow-lg bg-gradient-to-r from-blue-400 to-purple-500">
            NextLearn LMS
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300">
            Transform your learning experience with our interactive platform
          </p>
          
          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6 mb-12">
            <div className="bg-black/70 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-800">
              <div className="text-3xl font-bold text-blue-400">10,000+</div>
              <div className="text-sm text-gray-400">Active Learners</div>
            </div>
            <div className="bg-black/70 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-800">
              <div className="text-3xl font-bold text-purple-400">500+</div>
              <div className="text-sm text-gray-400">Expert Courses</div>
            </div>
            <div className="bg-black/70 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-800">
              <div className="text-3xl font-bold text-emerald-400">24/7</div>
              <div className="text-sm text-gray-400">Learning Support</div>
            </div>
          </div>
          
          {/* CTA Button - keep high z-index but below navbar */}
          <button className="pointer-events-auto bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-lg shadow-purple-900/30 transition-all mb-20 relative z-30">
            Start Learning Now
          </button> <br />
        </div>
        
        {/* Educational Elements */}
        <div className="absolute inset-0 overflow-hidden z-10">
          {/* Learning Path Curved Line */}
          <svg className="absolute w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M0,50 C20,20 50,80 100,50" 
              stroke="#8B5CF6" 
              strokeWidth="0.5" 
              fill="none" 
              className="path-animation"
            />
            <path 
              d="M0,60 C30,30 70,70 100,40" 
              stroke="#10B981" 
              strokeWidth="0.5" 
              fill="none" 
              className="path-animation-delay"
            />
          </svg>
          
          {/* Books */}
          <svg className="absolute w-16 h-16 md:w-24 md:h-24 text-blue-500/40 top-20 left-[15%] animate-float-slow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z" />
          </svg>
          
          {/* Certificate */}
          <svg className="absolute w-12 h-12 md:w-20 md:h-20 text-amber-400/40 bottom-[25%] right-[10%] animate-float" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4,3C2.89,3 2,3.89 2,5V15A2,2 0 0,0 4,17H12V22L15,19L18,22V17H20A2,2 0 0,0 22,15V8L22,6V5A2,2 0 0,0 20,3H16V3H4M12,5L15,7L18,5V8.5L21,10L18,11.5V15L15,13L12,15V11.5L9,10L12,8.5V5M4,5H9V7H4V5M4,9H7V11H4V9M4,13H9V15H4V13Z" />
          </svg>
          
          {/* Graduation Cap */}
          <svg className="absolute w-14 h-14 md:w-20 md:h-20 text-purple-400/40 top-[30%] right-[20%] animate-float-slow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
          </svg>
          
          {/* Lightbulb */}
          <svg className="absolute w-10 h-10 md:w-16 md:h-16 text-yellow-400/40 bottom-[20%] left-[20%] animate-float" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z" />
          </svg>
          
          {/* Computer/Laptop */}
          <svg className="absolute w-14 h-14 md:w-20 md:h-20 text-cyan-500/40 top-[15%] right-[15%] animate-float" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" />
          </svg>
          
          {/* Course Cards (small rectangles) */}
          <div className="absolute w-16 h-10 md:w-24 md:h-16 bg-purple-900/30 rounded-lg top-[40%] left-[10%] transform -rotate-12 animate-float shadow-sm"></div>
          <div className="absolute w-16 h-10 md:w-24 md:h-16 bg-blue-900/30 rounded-lg top-[30%] left-[8%] transform rotate-6 animate-float-delay shadow-sm"></div>
          <div className="absolute w-16 h-10 md:w-24 md:h-16 bg-emerald-900/30 rounded-lg bottom-[25%] right-[25%] transform rotate-12 animate-float-slow shadow-sm"></div>
          
          {/* Progress circles */}
          <div className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-emerald-800/30 border-t-emerald-400/80 top-[20%] left-[25%] animate-spin-very-slow"></div>
          <div className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full border-4 border-blue-800/30 border-r-blue-400/80 bottom-[15%] left-[15%] animate-spin-slow-reverse"></div>
        </div>

        {/* Learning path dots - moved position down */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse animation-delay-300"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse animation-delay-600"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse animation-delay-900"></div>
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 7s ease-in-out 2s infinite;
        }
        
        .animate-spin-very-slow {
          animation: spin 30s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-reverse 20s linear infinite;
        }
        
        .path-animation {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: dash 15s linear infinite alternate;
        }
        
        .path-animation-delay {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: dash 20s linear 2s infinite alternate;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-900 {
          animation-delay: 900ms;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes dash {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </BackgroundGradientAnimation>
  );
}
