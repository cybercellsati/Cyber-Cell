"use client";

import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  asButton?: boolean;
  onClick?: () => void;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(56, 189, 248, 0.08)",
  asButton = false,
  onClick,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const Component = asButton ? "button" : "div";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0d1424] via-[#090e18] to-[#060910] border border-white/[0.09] hover:border-cyan-400/40 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.08)] backdrop-blur-md ${
        asButton ? "cursor-pointer text-left w-full" : ""
      } ${className}`}
      {...props}
    >
      {/* Interactive Radial Spotlight Follower */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Top Edge Architectural Light Sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/[0.2] to-transparent group-hover:via-cyan-400/60 transition-all duration-300 z-10" />

      {/* Subtle Inner Glass Refraction Rim */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06)] z-10" />

      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
