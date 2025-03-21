"use client";

import dynamic from "next/dynamic";

// Import the client component with dynamic to disable SSR
const LoginFormClient = dynamic(
  () => import("@/Components/auth/LoginForm"),
  { ssr: false }
);

export default function ClientLoginWrapper() {
  return <LoginFormClient />;
}
