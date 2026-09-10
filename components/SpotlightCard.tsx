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
      className={`group relative overflow-hidden rounded-2xl bg-[#0d111a] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] ${
        asButton ? "cursor-pointer text-left w-full" : ""
      } ${className}`}
      {...props}
    >
      {/* Interactive Radial Spotlight Follower */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Subtle Top Border Sheen Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
