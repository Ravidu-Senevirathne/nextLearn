"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/Components/ui/input";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Call NextAuth signIn function with redirect:false to prevent automatic redirection
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error || "Authentication failed");
      }

      // First, call our API to get the role information
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Invalid credentials");
      }

      const userData = await response.json();
      const userRole = userData.user.role;

      // Store role in localStorage for retrieval in protected routes
      localStorage.setItem('userRole', userRole);

      // Manually redirect based on role
      router.replace(userRole === "lecturer" ? "/dashboard/lecturer" : "/dashboard/student");
    } catch (error: any) {
      setError(error.message || "Authentication failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 relative z-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
            placeholder="you@example.com"
            disabled={isLoading}
          />
        </div>
        <div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-200 flex items-center justify-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Google
          </button>
          <button
            type="button"
            className="w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            GitHub
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <Link href="/auth/signup" legacyBehavior>
          <p className="text-white">If You Dont Have An Account <a className="font-medium text-blue-600 hover:text-blue-500">Sign up</a></p>
        </Link>
      </div>
    </div>
  );
}
