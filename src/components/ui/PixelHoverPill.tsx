"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PixelHoverPill = ({ children, className, active }: { children: React.ReactNode, className?: string, active?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pixels, setPixels] = useState<{ id: number; delay: number }[]>([]);
  const rows = 5;
  const cols = 20;

  useEffect(() => {
    const newPixels = [];
    for (let i = 0; i < rows * cols; i++) {
      const col = i % cols;
      // sweep from left to right with slight randomness
      const delay = col * 0.015 + Math.random() * 0.05;
      newPixels.push({ id: i, delay });
    }
    setPixels(newPixels);
  }, []);

  const showBackground = isHovered || active;

  return (
    <div 
      className={cn("relative inline-flex items-center justify-center px-4 py-1.5 cursor-pointer rounded-full group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The grid that pixelates in */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-none flex">
         <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(5,minmax(0,1fr))]">
            {pixels.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: showBackground ? 1 : 0 }}
                transition={{ duration: 0.1, delay: showBackground ? p.delay : Math.max(0, 0.2 - p.delay) }}
                className="bg-myhayat-pink w-[105%] h-[105%]"
              />
            ))}
         </div>
      </div>
      
      {/* The brutalist border and shadow that are always visible */}
      <div 
         className="absolute inset-0 z-0 rounded-full border-2 border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)] pointer-events-none"
      />

      <span className={cn("relative z-10 transition-colors duration-200", showBackground ? "text-white dark:text-black font-bold" : "")}>
        {children}
      </span>
    </div>
  );
};
