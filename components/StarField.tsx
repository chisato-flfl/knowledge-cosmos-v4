"use client";

import { useMemo } from "react";

interface StarProps {
  count?: number;
}

export default function StarField({ count = 180 }: StarProps) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      opacity: 0.2 + Math.random() * 0.6,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Nebula gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(76, 29, 149, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 70%)
          `,
        }}
      />

      {/* Stars */}
      <svg className="absolute inset-0 w-full h-full">
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size}
            fill="white"
            opacity={star.opacity}
            style={{
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
