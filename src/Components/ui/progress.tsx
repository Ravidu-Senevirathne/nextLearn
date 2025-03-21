"use client";

import * as React from "react";
// Using dynamic import with a fallback implementation
import { cn } from "@/lib/utils";

// Fallback implementation if the package isn't available
const ProgressPrimitive = {
  Root: function Root(props: any) {
    return <div {...props} />;
  },
  Indicator: function Indicator(props: any) {
    return <div {...props} />;
  },
  displayName: 'Progress',
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, max = 100, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-gray-900/20 dark:bg-gray-800",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
      style={{ width: `${((value || 0) / max) * 100}%`, transform: "none" }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.displayName;

export { Progress };
