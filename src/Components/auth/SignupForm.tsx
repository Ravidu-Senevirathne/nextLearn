"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/Components/ui/input";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState<string>(""); // Explicit type
  const [email, setEmail] = useState<string>(""); // Explicit type
  const [password, setPassword] = useState<string>(""); // Explicit type
  const [mobile, setMobile] = useState<string>(""); // Explicit type
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Explicit type
  const [role, setRole] = useState<"student" | "lecturer">("student"); // Explicit type
  const [isLoading, setIsLoading] = useState<boolean>(false); // Explicit type
  const [error, setError] = useState<string>(""); // Explicit type

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, mobile, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Store the role in localStorage for retrieval after auth
      localStorage.setItem('userRole', role);

      // Sign in after registration with redirect:false to prevent automatic redirection
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error("Sign-in failed after registration");
      }

      // Manually redirect based on role
      router.replace(role === "lecturer" ? "/dashboard/lecturer" : "/dashboard/student");
    } catch (err: any) {
      setError(err.message || "Something went wrong during registration");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 relative z-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Create an account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Join NextLearn to start your learning journey
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">I am a:</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md ${role === "student"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              onClick={() => setRole("student")}
              disabled={isLoading}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md ${role === "lecturer"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              onClick={() => setRole("lecturer")}
              disabled={isLoading}
            >
              Lecturer
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1"
          >
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full"
            placeholder="John Doe"
            disabled={isLoading}
          />
        </div>



        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
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
          <label
            htmlFor="mobile"
            className="block text-sm font-medium mb-1"
          >
            Mobile Number
          </label>
          <Input
            id="mobile"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full"
            placeholder="0720000000"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full"
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-200 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Creating account...
            </>
          ) : (
            "Sign up"
          )}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-black text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-transparent text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Google
          </button>
          <button
            type="button"
            className="w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-transparent text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            GitHub
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
