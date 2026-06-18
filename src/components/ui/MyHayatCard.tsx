"use client";

import React, { useRef } from "react";
import { MagicCard } from "@/components/ui/magic-card";

interface MyHayatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  noPattern?: boolean;
}

export const MyHayatCard = React.forwardRef<HTMLDivElement, MyHayatCardProps>(
  ({ className, children, noPattern = false, ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--glow-x", `${x}%`);
      el.style.setProperty("--glow-y", `${y}%`);
      el.style.setProperty("--glow-intensity", "1");
    };

    const handleMouseLeave = () => {
      const el = cardRef.current;
      if (!el) return;
      el.style.setProperty("--glow-intensity", "0");
    };

    return (
      <div
        ref={(node) => {
          // Merge refs
          (cardRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          group relative overflow-hidden
          rounded-[var(--radius-curved)] 
          border-4 border-myhayat-salmon/20 dark:border-myhayat-pink/20
          bg-white/70 dark:bg-black/20 backdrop-blur-xl
          shadow-[var(--shadow-curved)]
          transition-transform duration-300 hover:-translate-y-1
          ${!noPattern ? "bg-japanese-cubes" : ""}
          ${className || ""}
        `}
        style={{
          "--glow-x": "50%",
          "--glow-y": "50%",
          "--glow-intensity": "0",
          "--glow-radius": "250px",
          "--glow-color": "248, 91, 170", /* myhayat-pink */
        } as React.CSSProperties}
        {...props}
      >
        {/* Mouse hover glow effect from glass-blog-card */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{
               background: `radial-gradient(circle 300px at var(--glow-x) var(--glow-y), rgba(255,255,255,0.15), transparent 40%)`,
             }}
        />
        {/* Glowing border effect */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{
               padding: "4px",
               background: `radial-gradient(circle 300px at var(--glow-x) var(--glow-y), rgba(248, 91, 170, 0.8), transparent 40%)`,
               borderRadius: "inherit",
               WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
               WebkitMaskComposite: "xor",
               mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
               maskComposite: "exclude",
             }}
        />
        
        <MagicCard 
          gradientColor="rgba(var(--glow-color), 0.1)" 
          gradientOpacity={1} 
          className="w-full h-full border-none shadow-none bg-transparent rounded-none"
        >
          <div className={`relative z-20 h-full w-full ${!noPattern ? "" : ""}`}>
            {children}
          </div>
        </MagicCard>
      </div>
    );
  }
);

MyHayatCard.displayName = "MyHayatCard";
