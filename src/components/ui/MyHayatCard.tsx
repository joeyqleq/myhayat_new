"use client";

import React from "react";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";

interface MyHayatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Show the Japanese cube pattern background. Default: true */
  noPattern?: boolean;
  /** Enable the thin perimeter edge-glow on hover/focus. Default: true */
  edgeGlow?: boolean;
}

/**
 * Stable brutalist card — no idle animation, no interior color motion.
 * Edge glow appears only on hover/focus-within and lives on the outer border.
 */
export const MyHayatCard = React.forwardRef<HTMLDivElement, MyHayatCardProps>(
  ({ className, children, noPattern = false, edgeGlow = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          group relative overflow-hidden
          rounded-[var(--radius-curved)]
          border-4 border-myhayat-salmon/20 dark:border-myhayat-pink/20
          bg-white/70 dark:bg-black/20 backdrop-blur-xl
          shadow-[var(--shadow-curved)]
          transition-shadow duration-300
          ${edgeGlow ? "card-edge-glow" : ""}
          ${className || ""}
        `}
        {...props}
      >
        {/* Stable background pattern — no motion */}
        {!noPattern && (
          <JapaneseCubesPattern
            size={18}
            opacity={0.06}
            className="absolute inset-0 pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-overlay"
          />
        )}
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>
    );
  }
);

MyHayatCard.displayName = "MyHayatCard";
