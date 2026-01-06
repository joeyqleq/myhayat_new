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
    
    const baseStyles = "relative inline-flex items-center justify-center font-barriecito tracking-wider transition-all duration-300 ease-out border-4 shadow-[var(--shadow-curved)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] active:scale-95 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-myhayat-pink border-myhayat-salmon text-white bg-japanese-cubes",
      secondary: "bg-myhayat-yellow border-myhayat-salmon text-myhayat-salmon", // No pattern, just solid pop
      outline: "bg-transparent border-myhayat-pink text-myhayat-pink hover:bg-myhayat-pink/10",
      ghost: "border-transparent shadow-none hover:bg-myhayat-pink/20 text-myhayat-pink hover:translate-x-0 hover:translate-y-0",
    };

    const sizes = {
      sm: "h-10 px-6 text-lg rounded-[1.5rem]",
      md: "h-14 px-8 text-xl rounded-[2rem]",
      lg: "h-16 px-10 text-2xl rounded-[2.5rem]",
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
