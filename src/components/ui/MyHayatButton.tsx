"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Assuming a utility for class merging exists or will be created. If not, I'll use standard template literals for now but standard for nextjs projects is to have it. I'll create it if needed.

// Actually, I should create the utils file first if it doesn't exist, but I can inline the logic or standard implementations often have it. 
// Let's assume I need to create it. For now, I will stick to simple string interpolation if I check and it's missing, but to be safe and "Award Winning", I'll use clsx/tailwind-merge pattern usually. 
// EXCEPT I haven't installed `clsx` or `tailwind-merge`. I should stick to standard strings or install them. 
// Given the "npm install" failed earlier, I will use template literals to be safe and self-contained.

interface MyHayatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const MyHayatButton = React.forwardRef<HTMLButtonElement, MyHayatButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center font-titan tracking-wider transition-all duration-300 ease-out border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-myhayat-pink border-black dark:border-white text-black dark:text-white",
      secondary: "bg-myhayat-yellow border-black dark:border-white text-black dark:text-white",
      outline: "bg-transparent border-myhayat-pink text-myhayat-pink hover:bg-myhayat-pink/10",
      ghost: "border-transparent shadow-none hover:bg-myhayat-pink/20 text-myhayat-pink hover:translate-x-0 hover:translate-y-0",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-full",
      md: "h-11 px-6 text-base rounded-full",
      lg: "h-14 px-8 text-lg rounded-full",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2 filter drop-shadow-sm">
           {children}
        </span>
      </button>
    );
  }
);

MyHayatButton.displayName = "MyHayatButton";
