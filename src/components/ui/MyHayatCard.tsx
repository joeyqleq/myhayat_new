import React from "react";

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
         {/* Internal content wrapper to ensure pattern doesn't interfere with readability if needed, 
             though the pattern class handles opacity. 
             If noPattern is false, the background is pinkish with Cubes. 
             If we want a white card with just the border/shadow, pass className="bg-white" and noPattern.
          */}
        <div className={`relative z-10 h-full w-full ${!noPattern ? "" : ""}`}>
          {children}
        </div>
      </div>
    );
  }
);

MyHayatCard.displayName = "MyHayatCard";
