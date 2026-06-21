"use client";

import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export const ClientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(255, 250, 253)"
        gradientBackgroundEnd="rgb(255, 243, 248)"
        firstColor="248, 91, 170"
        secondColor="254, 200, 16"
        thirdColor="249, 129, 129"
        fourthColor="91, 184, 166"
        fifthColor="196, 166, 232"
        pointerColor="248, 91, 170"
        size="90%"
        blendingValue="hard-light"
        interactive={false}
        containerClassName="!h-full !w-full opacity-25 dark:opacity-12"
      />
    </div>
  );
};
