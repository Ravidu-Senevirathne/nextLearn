import {  Geist_Mono } from "next/font/google";

export const inter = { variable: "--font-inter", className: "font-inter" };

export const geist = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist",
});

export const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});
