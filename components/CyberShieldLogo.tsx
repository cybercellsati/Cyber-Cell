import React from "react";
import Link from "next/link";

interface CyberShieldLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  hideSubtitle?: boolean;
}

export default function CyberShieldLogo({
  className = "",
  size = "md",
  hideSubtitle = false
}: CyberShieldLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-11 h-11"
  };

  const titleSizes = {
    sm: "text-xs tracking-wider",
    md: "text-sm tracking-wider",
    lg: "text-base tracking-wider"
  };

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 select-none transition-all duration-200 ${className}`}
      aria-label="Cyber Cell - Home"
    >
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        {/* Precise Shield Icon matching reference */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-105"
        >
          {/* Outer Shield Path */}
          <path
            d="M24 3.5L8 10V22.5C8 33 14.8 42.5 24 45C33.2 42.5 40 33 40 22.5V10L24 3.5Z"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Inner Sharp Trident / Circuits */}
          {/* Center Vertical Spear */}
          <path
            d="M24 13V33"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Left Vertical Prong with angle */}
          <path
            d="M17 17L18.5 21V30"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right Vertical Prong with angle */}
          <path
            d="M31 17L29.5 21V30"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle connecting node */}
          <path
            d="M18.5 25.5H29.5"
            stroke="#38bdf8"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
        </svg>
      </div>

      <div className="flex flex-col text-left leading-none">
        <span className={`font-bold font-sans tracking-wide text-white ${titleSizes[size]}`}>
          CYBER CELL
        </span>
        {!hideSubtitle && (
          <span className="text-[11px] text-slate-400 font-normal tracking-normal mt-1">
            Under Coding Club, SATI
          </span>
        )}
      </div>
    </Link>
  );
}
