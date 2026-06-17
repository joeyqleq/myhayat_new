"use client";
import dynamic from 'next/dynamic';

const Aurora = dynamic(() => import('./Aurora'), { ssr: false });

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-50 opacity-50 dark:opacity-30 pointer-events-none mix-blend-overlay">
      <Aurora colorStops={["#F85BAA", "#FEC810", "#F98181"]} blend={0.6} amplitude={1.2} speed={0.5} />
    </div>
  );
}
