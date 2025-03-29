"use client";

import React from "react";
import LoginForm from "@/Components/auth/LoginForm";
import ClientLoginWrapper from "@/Components/auth/ClientLoginWrapper";

export default function LoginPage() {
  return (
    <ClientLoginWrapper>
      <div className="w-full max-w-md px-8 py-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <LoginForm />
      </div>
    </ClientLoginWrapper>
  );
}
