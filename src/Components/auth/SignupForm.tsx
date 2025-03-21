"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Spotlight } from "@/Components/ui/Spotlight";

export default function SignupForm() {
  const [role, setRole] = useState<"student" | "lecturer" | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-black/[0.96] antialiased">
      <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]" />
      
      <Spotlight className="-top-40 left-0 md:left-60" fill="white" />
      
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 md:py-32 pointer-events-auto">
        <div className="mx-auto max-w-md">
          <div className="text-center mb-8">
            <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent">
              Join NextLearn
            </h1>
            <p className="mt-2 text-neutral-400">
              Create your account and start learning today
            </p>
          </div>

          <div className="relative z-20 bg-black/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-neutral-300 mb-2 text-sm">I am a:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`py-4 px-6 rounded-lg border transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105 ${
                    role === "student"
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/50"
                      : "border-neutral-700 text-neutral-300 hover:bg-indigo-900/20 hover:border-indigo-500/50"
                  }`}
                >
                  Student
                  {role === "student" && (
                    <span className="absolute inset-0 rounded-lg border-2 border-indigo-500 animate-pulse" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setRole("lecturer")}
                  className={`py-4 px-6 rounded-lg border transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105 ${
                    role === "lecturer"
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/50"
                      : "border-neutral-700 text-neutral-300 hover:bg-indigo-900/20 hover:border-indigo-500/50"
                  }`}
                >
                  Lecturer
                  {role === "lecturer" && (
                    <span className="absolute inset-0 rounded-lg border-2 border-indigo-500 animate-pulse" />
                  )}
                </button>
              </div>
            </div>

            {/* Signup Form */}
            <form className="space-y-6">
              <div className="relative">
                <label className="block text-neutral-300 mb-1 text-sm">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-black/50 border border-neutral-700 rounded-lg py-4 px-5 text-white text-lg focus:outline-none"
                    placeholder="Enter your full name"
                    onFocus={() => setFocusedInput("name")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  {focusedInput === "name" && (
                    <div className="pointer-events-none absolute -inset-px rounded-lg border-2 border-indigo-500 blur-sm" />
                  )}
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-neutral-300 mb-1 text-sm">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full bg-black/50 border border-neutral-700 rounded-lg py-4 px-5 text-white text-lg focus:outline-none"
                    placeholder="Enter your email"
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  {focusedInput === "email" && (
                    <div className="pointer-events-none absolute -inset-px rounded-lg border-2 border-indigo-500 blur-sm" />
                  )}
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-neutral-300 mb-1 text-sm">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full bg-black/50 border border-neutral-700 rounded-lg py-4 px-5 text-white text-lg focus:outline-none"
                    placeholder="Create a strong password"
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  {focusedInput === "password" && (
                    <div className="pointer-events-none absolute -inset-px rounded-lg border-2 border-indigo-500 blur-sm" />
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-neutral-300 mb-1 text-sm">Confirm Password</label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full bg-black/50 border border-neutral-700 rounded-lg py-4 px-5 text-white text-lg focus:outline-none"
                    placeholder="Confirm your password"
                    onFocus={() => setFocusedInput("confirmPassword")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  {focusedInput === "confirmPassword" && (
                    <div className="pointer-events-none absolute -inset-px rounded-lg border-2 border-indigo-500 blur-sm" />
                  )}
                </div>
              </div>
              
              <div className="relative mt-8">
                <button
                  type="submit"
                  disabled={!role}
                  className={`w-full text-white py-4 rounded-lg font-medium transition-all duration-300 ease-in-out text-lg transform hover:scale-105 ${
                    !role 
                      ? "bg-indigo-600/50 cursor-not-allowed opacity-70" 
                      : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-lg shadow-indigo-500/50"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-neutral-800"></div>
              <div className="mx-4 text-sm text-neutral-400">Or continue with</div>
              <div className="flex-1 border-t border-neutral-800"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                className="flex items-center justify-center gap-2 bg-transparent border border-neutral-700 hover:bg-neutral-800/50 hover:border-red-500/30 py-4 rounded-lg text-white transition-all duration-300 transform hover:scale-105"
              >
                <FaGoogle className="text-red-500" />
                <span>Google</span>
              </button>
              <button 
                type="button"
                className="flex items-center justify-center gap-2 bg-transparent border border-neutral-700 hover:bg-neutral-800/50 hover:border-blue-500/30 py-4 rounded-lg text-white transition-all duration-300 transform hover:scale-105"
              >
                <FaFacebook className="text-blue-500" />
                <span>Facebook</span>
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-neutral-400">
              Already have an account?{" "}
              <Link 
                href="/auth/login" 
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
