import React from 'react';

export const JapaneseCubesPattern = ({
  size = 40,
  opacity = 1,
  className = "",
}: {
  size?: number;
  opacity?: number;
  className?: string;
}) => {
  const w = size * Math.sqrt(3);
  const h = size * 2;
  
  // Brand colors
  const topColor = "#F85BAA"; // Pink
  const leftColor = "#FEC810"; // Yellow
  const rightColor = "#F98181"; // Salmon

  return (
    <svg
      className={className}
      style={{ opacity, width: '100%', height: '100%' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="japanese-cubes"
          x="0"
          y="0"
          width={w}
          height={h * 1.5}
          patternUnits="userSpaceOnUse"
        >
          {/* A single isometric cube consists of 3 faces */}
          <g id="cube">
            {/* Top face */}
            <polygon points={`${w/2},0 ${w},${size/2} ${w/2},${size} 0,${size/2}`} fill={topColor} />
            {/* Left face */}
            <polygon points={`0,${size/2} ${w/2},${size} ${w/2},${size*2} 0,${size*1.5}`} fill={leftColor} />
            {/* Right face */}
            <polygon points={`${w/2},${size} ${w},${size/2} ${w},${size*1.5} ${w/2},${size*2}`} fill={rightColor} />
          </g>
          {/* Offset cube for tiling */}
          <use href="#cube" x={w/2} y={h * 0.75} />
          <use href="#cube" x={-w/2} y={h * 0.75} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#japanese-cubes)" />
    </svg>
  );
};
