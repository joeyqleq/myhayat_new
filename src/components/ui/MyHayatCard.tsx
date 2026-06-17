import React from "react";
import { MagicCard } from "@/components/ui/magic-card";

interface MyHayatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  noPattern?: boolean;
}

export const MyHayatCard = React.forwardRef<HTMLDivElement, MyHayatCardProps>(
  ({ className, children, noPattern = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          relative overflow-hidden
          rounded-[var(--radius-curved)] 
          border-4 border-myhayat-salmon 
          bg-white 
          shadow-[var(--shadow-curved)]
          transition-transform duration-300 hover:scale-[1.01]
          ${!noPattern ? "bg-japanese-cubes" : ""}
          ${className || ""}
        `}
        {...props}
        style={{
            // Ensuring the pattern/bg logic works with the class utilities
        }}
      >
        <MagicCard 
          gradientColor="var(--color-myhayat-pink)" 
          gradientOpacity={0.15} 
          className="w-full h-full border-none shadow-none bg-transparent"
        >
          <div className={`relative z-10 h-full w-full ${!noPattern ? "" : ""}`}>
            {children}
          </div>
        </MagicCard>
      </div>
    );
  }
);

MyHayatCard.displayName = "MyHayatCard";
