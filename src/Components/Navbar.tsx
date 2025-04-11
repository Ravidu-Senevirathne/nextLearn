"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../Components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-0 inset-x-0 w-full mx-auto z-[90] bg-white dark:bg-black shadow-md", className)}
    >
      <div className="flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-bold text-grey dark:text-white">NextLearn</div>
        <div className="flex-1 flex justify-center">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Home">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/">Home</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Courses">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/courses/all-courses">All Courses</HoveredLink>
                <HoveredLink href="/courses/featured">Featured</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="About Us">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/about">Our Story</HoveredLink>
                <HoveredLink href="/about/team">Team</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Resources">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/resources/blog">Blog</HoveredLink>
                <HoveredLink href="/resources/help">Help Center</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Get Started">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/auth/login">Login</HoveredLink>
                <HoveredLink href="/auth/signup">Sign Up</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
