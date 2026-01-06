import React from "react";
import { cn } from "@/lib/utils"; // Fallback to template literals if this doesn't exist yet, but assuming standard.

interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
  type?: "phone" | "laptop";
}

export const DeviceFrame = ({ children, className, type = "phone" }: DeviceFrameProps) => {
  if (type === "laptop") {
    return (
      <div className={`relative mx-auto ${className || ""}`}>
        {/* Laptop Lid/Screen */}
        <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
          <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
             {/* Screen Content */}
             <div className="h-full w-full overflow-hidden">
                {children}
             </div>
          </div>
        </div>
        {/* Laptop Base */}
        <div className="relative mx-auto bg-gray-900 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
        </div>
      </div>
    );
  }

  // Default: Phone (iPhone 14/15 style)
  return (
    <div className={`relative mx-auto border-gray-900 dark:border-gray-900 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl ${className || ""}`}>
      {/* Notch/Dynamic Island */}
      <div className="w-[148px] h-[18px] bg-gray-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20" />
      
      {/* Side Buttons */}
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      
      {/* Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800 relative z-10">
          <div className="h-full w-full overflow-hidden scrollbar-hide">
            {children}
          </div>
      </div>
    </div>
  );
};
