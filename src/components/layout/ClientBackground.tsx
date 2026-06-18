"use client";

import React, { useEffect, useState } from "react";
import ColorBends from "@/components/ui/ReactBits/ColorBends";

export const ClientBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map scroll depth to intensity (1.2 to 3.0) and frequency
  const intensity = Math.min(3.0, 1.2 + scrollY * 0.001);
  const frequency = Math.min(3.0, 1.5 + scrollY * 0.0005);

  return (
    <div className="fixed inset-0 z-[-10] opacity-40 dark:opacity-20 pointer-events-none transition-all duration-300">
      <ColorBends 
        speed={0.4}
        intensity={intensity}
        transparent={true}
        bandWidth={6}
        colors={["#F85BAA", "#FEC810", "#F98181", "#5BB8A6"]}
        frequency={frequency}
      />
    </div>
  );
};
