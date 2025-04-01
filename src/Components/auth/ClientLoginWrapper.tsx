"use client";

import { useState, useEffect } from "react";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";
import { Spotlight } from "../ui/Spotlight";

export default function ClientLoginWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors by mounting after client-side render
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <Spotlight className="hidden md:block" />
      <div className="flex flex-grow items-center justify-center relative z-10 px-4 md:px-0">
        {children}
      </div>
    </div>
  );
}