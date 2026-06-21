"use client";

import React from 'react';

type PatternVariant = "cubes-3d" | "hexagons" | "diamonds" | "waves" | "triangles" | "stars" | "weave";
type ColorScheme = "pink" | "yellow" | "salmon" | "lavender" | "teal" | "mixed" | "warm" | "cool";

const COLOR_SCHEMES: Record<ColorScheme, [string, string, string, string, string]> = {
  pink:     ["#F85BAA", "#E84D9A", "#D4408B", "#FF7BC4", "#FFB3DD"],
  yellow:   ["#FEC810", "#E5B30E", "#CC9F0C", "#FFD94A", "#FFF0A0"],
  salmon:   ["#F98181", "#E67272", "#D36363", "#FFB3B3", "#FFD0C0"],
  lavender: ["#C4A6E8", "#B493D8", "#A480C8", "#DCC6F5", "#EAD9FF"],
  teal:     ["#5BB8A6", "#4FA896", "#439886", "#7DD4C2", "#A8E8DA"],
  mixed:    ["#F85BAA", "#FEC810", "#F98181", "#5BB8A6", "#C4A6E8"],
  warm:     ["#F85BAA", "#F98181", "#FEC810", "#FFB347", "#FF8C94"],
  cool:     ["#C4A6E8", "#5BB8A6", "#7AB8F5", "#A3D9F5", "#B8E0D4"],
};

export const JapaneseCubesPattern = ({
  size = 20,
  opacity = 1,
  className = "",
  variant = "cubes-3d",
  colorScheme = "mixed",
}: {
  size?: number;
  opacity?: number;
  className?: string;
  variant?: PatternVariant;
  colorScheme?: ColorScheme;
}) => {
  const colors = COLOR_SCHEMES[colorScheme];
  const [c1, c2, c3, c4, c5] = colors;
  const s = Math.max(8, Math.min(size, 30));
  const id = `myhayat-pattern-${variant}-${colorScheme}-${s}`;
  const f = (value: number) => Number(value.toFixed(4)).toString();
  const point = (x: number, y: number) => `${f(x)},${f(y)}`;

  const renderPattern = () => {
    switch (variant) {
      case "hexagons": {
        const h = s * Math.sqrt(3) / 2;
        const r = s * 0.45;
        const hexPoints = (cx: number, cy: number) =>
          Array.from({ length: 6 }, (_, i) => {
            const angle = (i * 60 - 30) * Math.PI / 180;
            return point(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
          }).join(' ');
        return (
          <pattern id={`pat-${id}`} x="0" y="0" width={s * 1.5} height={h * 2} patternUnits="userSpaceOnUse">
            <polygon points={hexPoints(s * 0.5, h * 0.6)} fill={c1} opacity="0.7" />
            <polygon points={hexPoints(s * 1.25, h * 1.4)} fill={c2} opacity="0.6" />
            <circle cx={s * 0.5} cy={h * 0.6} r={r * 0.3} fill={c4} opacity="0.5" />
            <circle cx={s * 1.25} cy={h * 1.4} r={r * 0.25} fill={c5} opacity="0.4" />
            <line x1={s * 0.5} y1={h * 0.6 + r} x2={s * 1.25} y2={h * 1.4 - r} stroke={c3} strokeWidth="0.5" opacity="0.3" />
          </pattern>
        );
      }
      case "diamonds": {
        return (
          <pattern id={`pat-${id}`} x="0" y="0" width={s * 2} height={s * 2} patternUnits="userSpaceOnUse">
            <polygon points={`${s},0 ${s*2},${s} ${s},${s*2} 0,${s}`} fill="none" stroke={c1} strokeWidth="0.8" opacity="0.6" />
            <polygon points={`${s},${s*0.3} ${s*1.7},${s} ${s},${s*1.7} ${s*0.3},${s}`} fill={c2} opacity="0.3" />
            <polygon points={`${s},${s*0.6} ${s*1.4},${s} ${s},${s*1.4} ${s*0.6},${s}`} fill={c4} opacity="0.4" />
            <circle cx={s} cy={s} r={s * 0.1} fill={c3} opacity="0.6" />
            <line x1="0" y1="0" x2={s} y2={s} stroke={c5} strokeWidth="0.3" opacity="0.2" />
            <line x1={s*2} y1="0" x2={s} y2={s} stroke={c5} strokeWidth="0.3" opacity="0.2" />
          </pattern>
        );
      }
      case "waves": {
        const h = s * 0.5;
        return (
          <pattern id={`pat-${id}`} x="0" y="0" width={s * 2} height={h * 4} patternUnits="userSpaceOnUse">
            <path d={`M0,${h} Q${s*0.5},0 ${s},${h} Q${s*1.5},${h*2} ${s*2},${h}`} fill="none" stroke={c1} strokeWidth="1.2" opacity="0.6" />
            <path d={`M0,${h*2} Q${s*0.5},${h} ${s},${h*2} Q${s*1.5},${h*3} ${s*2},${h*2}`} fill="none" stroke={c2} strokeWidth="1" opacity="0.5" />
            <path d={`M0,${h*3} Q${s*0.5},${h*2} ${s},${h*3} Q${s*1.5},${h*4} ${s*2},${h*3}`} fill="none" stroke={c3} strokeWidth="0.8" opacity="0.4" />
            <circle cx={s * 0.5} cy={h * 0.5} r={s * 0.04} fill={c4} opacity="0.5" />
            <circle cx={s * 1.5} cy={h * 2.5} r={s * 0.04} fill={c5} opacity="0.5" />
          </pattern>
        );
      }
      case "triangles": {
        const h = s * Math.sqrt(3) / 2;
        return (
          <pattern id={`pat-${id}`} x="0" y="0" width={s} height={h * 2} patternUnits="userSpaceOnUse">
            <polygon points={`${s/2},0 ${s},${h} 0,${h}`} fill={c1} opacity="0.4" />
            <polygon points={`0,${h} ${s},${h} ${s/2},${h*2}`} fill={c2} opacity="0.35" />
            <polygon points={`${s/2},${h*0.35} ${s*0.65},${h*0.7} ${s*0.35},${h*0.7}`} fill={c3} opacity="0.5" />
            <polygon points={`${s*0.35},${h*1.3} ${s*0.65},${h*1.3} ${s*0.5},${h*1.65}`} fill={c4} opacity="0.45" />
            <circle cx={s/2} cy={h} r={s * 0.04} fill={c5} opacity="0.6" />
          </pattern>
        );
      }
      case "stars": {
        const cx = s / 2, cy = s / 2, r = s * 0.35, ri = r * 0.4;
        const starPoints = (numPoints: number, outerR: number, innerR: number, centerX: number, centerY: number) =>
          Array.from({ length: numPoints * 2 }, (_, i) => {
            const angle = (i * 180 / numPoints - 90) * Math.PI / 180;
            const radius = i % 2 === 0 ? outerR : innerR;
            return point(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
          }).join(' ');
        return (
          <pattern id={`pat-${id}`} x="0" y="0" width={s} height={s} patternUnits="userSpaceOnUse">
            <polygon points={starPoints(6, r, ri, cx, cy)} fill={c1} opacity="0.5" />
            <polygon points={starPoints(4, r * 0.4, ri * 0.5, cx, cy)} fill={c4} opacity="0.6" />
            <circle cx={cx} cy={cy} r={ri * 0.4} fill={c2} opacity="0.4" />
            <circle cx={s * 0.1} cy={s * 0.1} r={s * 0.04} fill={c3} opacity="0.3" />
            <circle cx={s * 0.9} cy={s * 0.9} r={s * 0.04} fill={c5} opacity="0.3" />
          </pattern>
        );
      }
      case "weave": {
        return (
          <pattern id={`pat-${id}`} x="0" y="0" width={s * 2} height={s * 2} patternUnits="userSpaceOnUse">
            <rect x="0" y={s * 0.3} width={s * 2} height={s * 0.3} fill={c1} rx="1" opacity="0.5" />
            <rect x="0" y={s * 1.3} width={s * 2} height={s * 0.3} fill={c2} opacity="0.45" />
            <rect x={s * 0.3} y="0" width={s * 0.3} height={s * 2} fill={c3} opacity="0.4" rx="1" />
            <rect x={s * 1.3} y="0" width={s * 0.3} height={s * 2} fill={c4} opacity="0.35" rx="1" />
            <rect x={s * 0.35} y={s * 0.35} width={s * 0.2} height={s * 0.2} fill={c5} opacity="0.5" rx="2" />
            <rect x={s * 1.35} y={s * 1.35} width={s * 0.2} height={s * 0.2} fill={c5} opacity="0.5" rx="2" />
          </pattern>
        );
      }
      case "cubes-3d":
      default: {
        const w = s * Math.sqrt(3);
        const h = s * 2;
        return (
          <pattern id={`pat-${id}`} x="0" y="0" width={w} height={h * 0.75} patternUnits="userSpaceOnUse">
            {/* Top face */}
            <polygon points={`${w/2},0 ${w},${s*0.25} ${w/2},${s*0.5} 0,${s*0.25}`} fill={c1} opacity="0.65" />
            {/* Left face */}
            <polygon points={`0,${s*0.25} ${w/2},${s*0.5} ${w/2},${s} 0,${s*0.75}`} fill={c2} opacity="0.55" />
            {/* Right face */}
            <polygon points={`${w/2},${s*0.5} ${w},${s*0.25} ${w},${s*0.75} ${w/2},${s}`} fill={c3} opacity="0.6" />
            {/* Inner highlight diamond */}
            <polygon points={`${w/2},${s*0.08} ${w*0.72},${s*0.25} ${w/2},${s*0.42} ${w*0.28},${s*0.25}`} fill={c4} opacity="0.3" />
            {/* Left face inner gradient */}
            <polygon points={`${w*0.08},${s*0.32} ${w*0.42},${s*0.52} ${w*0.42},${s*0.82} ${w*0.08},${s*0.62}`} fill={c5} opacity="0.2" />
            {/* Right face inner gradient */}
            <polygon points={`${w*0.58},${s*0.52} ${w*0.92},${s*0.32} ${w*0.92},${s*0.62} ${w*0.58},${s*0.82}`} fill={c4} opacity="0.2" />
            {/* Edge accents */}
            <line x1={w/2} y1={s*0.5} x2={w/2} y2={s} stroke={c5} strokeWidth="0.6" opacity="0.5" />
            <line x1={0} y1={s*0.25} x2={w/2} y2={s*0.5} stroke={c1} strokeWidth="0.4" opacity="0.3" />
            <line x1={w} y1={s*0.25} x2={w/2} y2={s*0.5} stroke={c3} strokeWidth="0.4" opacity="0.3" />
            {/* Top face center dot */}
            <circle cx={w/2} cy={s*0.25} r={s*0.03} fill={c5} opacity="0.6" />
          </pattern>
        );
      }
    }
  };

  return (
    <svg
      className={className}
      style={{ opacity, width: '100%', height: '100%' }}
      xmlns="http://www.w3.org/2000/svg"
      suppressHydrationWarning
    >
      <defs>
        {renderPattern()}
      </defs>
      <rect width="100%" height="100%" fill={`url(#pat-${id})`} />
    </svg>
  );
};
