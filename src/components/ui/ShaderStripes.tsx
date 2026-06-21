"use client";

import React from "react";

/**
 * ShaderStripes — A CSS-only animated diagonal stripe background
 * Inspired by Aceternity UI's shader blocks.
 * Diagonal stripes in brand colors slowly rotate and pulse.
 */
export const ShaderStripes = ({
  className = "",
  speed = 30,
}: {
  className?: string;
  speed?: number;
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Layer 1: Large diagonal stripes — slow rotation */}
      <div
        className="absolute inset-[-50%] w-[200%] h-[200%] animate-shader-rotate"
        style={{
          animationDuration: `${speed}s`,
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(248, 91, 170, 0.12) 40px,
            rgba(248, 91, 170, 0.12) 80px,
            transparent 80px,
            transparent 120px,
            rgba(254, 200, 16, 0.10) 120px,
            rgba(254, 200, 16, 0.10) 160px,
            transparent 160px,
            transparent 200px,
            rgba(249, 129, 129, 0.08) 200px,
            rgba(249, 129, 129, 0.08) 240px
          )`,
        }}
      />
      {/* Layer 2: Smaller stripes — counter-rotation, different colors */}
      <div
        className="absolute inset-[-50%] w-[200%] h-[200%] animate-shader-rotate-reverse"
        style={{
          animationDuration: `${speed * 1.4}s`,
          background: `repeating-linear-gradient(
            -30deg,
            transparent,
            transparent 60px,
            rgba(196, 166, 232, 0.06) 60px,
            rgba(196, 166, 232, 0.06) 90px,
            transparent 90px,
            transparent 150px,
            rgba(91, 184, 166, 0.05) 150px,
            rgba(91, 184, 166, 0.05) 180px
          )`,
        }}
      />
      {/* Layer 3: Pulsing radial glow overlay */}
      <div
        className="absolute inset-0 animate-shader-pulse"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 30% 40%, rgba(248, 91, 170, 0.08) 0%, transparent 60%),
                       radial-gradient(ellipse 60% 80% at 70% 60%, rgba(254, 200, 16, 0.06) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
};
