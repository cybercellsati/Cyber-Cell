import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CyberShieldLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  hideSubtitle?: boolean;
}

export default function CyberShieldLogo({
  className = "",
  size = "md",
  hideSubtitle = false,
}: CyberShieldLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7 sm:w-8 sm:h-8",
    md: "w-8 h-8 sm:w-9 sm:h-9",
    lg: "w-11 h-11 sm:w-12 sm:h-12",
  };

  const titleSizes = {
    sm: "text-xs tracking-wider",
    md: "text-sm tracking-wider",
    lg: "text-base tracking-wider",
  };

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 select-none transition-all duration-200 ${className}`}
      aria-label="Cyber Cell - Home"
    >
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <Image
          src="/images/cyber-cell-logo.png"
          alt="Cyber Cell Logo"
          width={48}
          height={48}
          className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
          priority
        />
      </div>

      <div className="flex flex-col text-left leading-none">
        <span className={`font-bold font-sans tracking-wide text-white ${titleSizes[size]}`}>
          CYBER CELL
        </span>
        {!hideSubtitle && (
          <span className="text-[11px] text-slate-400 font-normal tracking-normal mt-1">
            SATI Vidisha
          </span>
        )}
      </div>
    </Link>
  );
}
