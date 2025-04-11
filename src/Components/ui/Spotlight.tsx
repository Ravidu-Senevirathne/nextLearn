"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  size?: number;
}

export function Spotlight({
  className = "",
  size = 1000,
}: SpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;

      const { clientX, clientY } = e;
      spotlightRef.current.style.background = `
        radial-gradient(
          circle at ${clientX}px ${clientY}px,
          rgba(120, 119, 198, 0.15) 0%,
          rgba(0, 0, 0, 0) 60%
        )
      `;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [size]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 h-full w-full",
        className
      )}
      ref={spotlightRef}
    />
  );
}
