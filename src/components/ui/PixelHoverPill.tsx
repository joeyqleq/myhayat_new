"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const PixelHoverPill = ({
  children,
  className,
  active,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const showEffect = isHovered || active;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center px-4 py-1.5 cursor-pointer rounded-full group overflow-hidden",
        "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "active:scale-[0.93] active:translate-y-[1px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sliding fill — magicui interactive-hover-button style */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-myhayat-pink transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          showEffect ? "translate-x-0" : "-translate-x-full"
        )}
      />

      {/* Border */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border-2 pointer-events-none transition-colors duration-200",
          showEffect
            ? "border-myhayat-pink dark:border-myhayat-pink"
            : "border-myhayat-salmon/50 dark:border-myhayat-pink/40"
        )}
      />

      {/* Content */}
      <span
        className={cn(
          "relative z-10 flex items-center gap-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          showEffect ? "text-white font-bold -translate-x-1" : ""
        )}
      >
        {children}
      </span>

      {/* Arrow slides in from right */}
      <span
        className={cn(
          "absolute right-3 z-10 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          showEffect ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        )}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={showEffect ? "text-white" : "text-myhayat-pink"}
          />
        </svg>
      </span>
    </div>
  );
};
