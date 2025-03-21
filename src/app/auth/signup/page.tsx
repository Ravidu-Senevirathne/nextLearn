"use client";

import React, { useState } from "react";
import { Spotlight } from "@/Components/ui/Spotlight";
import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import ClientOnly from "@/Components/ClientOnly";
import dynamic from "next/dynamic";

// Import the client component with dynamic to disable SSR
const SignupFormClient = dynamic(
  () => import("@/Components/auth/SignupForm"),
  { ssr: false }
);

export default function SignupPage() {
  return <SignupFormClient />;
}