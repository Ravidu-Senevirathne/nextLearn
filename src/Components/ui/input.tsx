"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { theme, resolvedTheme } = useTheme();

    return (
      <input
        type={type}
        className={cn(
          `shadow-sm flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition duration-200 
          file:border-0 file:bg-transparent file:text-sm file:font-medium 
          placeholder:text-gray-400 
          focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-teal-500 focus-visible:outline-none 
          disabled:cursor-not-allowed disabled:opacity-50 
          dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 
          dark:placeholder:text-gray-500 
          dark:focus-visible:ring-teal-600 dark:focus-visible:border-teal-600`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
