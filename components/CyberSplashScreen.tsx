"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CyberSplashScreen() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasTriggeredExitRef = useRef(false);

  // Fast skip handler
  const triggerExit = useCallback(() => {
    if (hasTriggeredExitRef.current) return;
    hasTriggeredExitRef.current = true;
    setProgress(100);
    setIsExiting(true);

    setTimeout(() => {
      setIsDismissed(true);
    }, 600);
  }, []);

  useEffect(() => {
    // Only run on home page
    if (pathname !== "/") {
      setIsDismissed(true);
      return;
    }

    const DURATION = 900; // Snappy 900ms counter for a premium, non-tedious feel

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const linearRatio = Math.min(elapsed / DURATION, 1);

      // Smooth custom ease-out
      const easedRatio = 1 - Math.pow(1 - linearRatio, 2.2);
      const current = Math.min(100, Math.round(easedRatio * 100));

      setProgress(current);

      if (linearRatio < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          triggerExit();
        }, 140);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        triggerExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pathname, triggerExit]);

  if (isDismissed || pathname !== "/") {
    return null;
  }

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          onClick={triggerExit}
          className="fixed inset-0 z-[100000] bg-[#06080d] text-white flex flex-col justify-between p-6 sm:p-10 select-none cursor-pointer overflow-hidden"
          initial={{ y: "0%" }}
          animate={isExiting ? { y: "-100%" } : { y: "0%" }}
          transition={{
            duration: 0.65,
            ease: [0.85, 0, 0.15, 1], // Luxury editorial curtain lift
          }}
          aria-label="Cyber Cell Welcome - Click or press Esc to skip"
        >
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

          {/* ========================================================================= */}
          {/* Top Bar: Editorial Institutional Identity & Established Year             */}
          {/* ========================================================================= */}
          <div className="flex items-center justify-between w-full text-[11px] sm:text-xs font-mono tracking-[0.2em] text-slate-400 uppercase relative z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
              <span className="text-white font-medium">CYBER CELL</span>
              <span className="text-slate-600 hidden sm:inline">/</span>
              <span className="text-slate-500 hidden sm:inline">SATI VIDISHA</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-500 text-[10px] tracking-widest hidden sm:inline">
                CENTRAL CODING CLUB
              </span>
              <span className="text-slate-400 font-mono">EST. 2026</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Center Composition: Minimalist Geometric Monogram & Editorial Typography */}
          {/* ========================================================================= */}
          <div className="flex flex-col items-center justify-center text-center relative z-10 my-auto">
            {/* Minimalist Architectural Shield Mark */}
            <motion.div
              className="relative w-14 h-14 sm:w-16 sm:h-16 mb-8 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <svg
                className="w-full h-full text-white/90"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Clean, hand-crafted geometric shield line */}
                <motion.path
                  d="M24 4L7 11V22C7 33.2 14.3 43.1 24 45.8C33.7 43.1 41 33.2 41 22V11L24 4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                />
                {/* Center Core Node */}
                <motion.circle
                  cx="24"
                  cy="24"
                  r="3.5"
                  className="fill-[#38bdf8]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                />
              </svg>
            </motion.div>

            {/* Masked Title: CYBER CELL */}
            <div className="overflow-hidden pb-1 mb-2">
              <motion.h1
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                CYBER CELL
              </motion.h1>
            </div>

            {/* Sub-tagline: Curiosity Today. A Safer Tomorrow. */}
            <motion.p
              className="text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-slate-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              Curiosity Today. A Safer Tomorrow.
            </motion.p>

            {/* Minimalist Precision Progress Line */}
            <div className="w-48 sm:w-56 h-[1.5px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-white relative rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.04, ease: "linear" }}
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Bottom Bar: Clean Minimalist Counter & Subtle Skip Indicator              */}
          {/* ========================================================================= */}
          <div className="flex items-end justify-between w-full relative z-10">
            {/* Subtle Interactive Skip Label */}
            <div className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase hover:text-slate-400 transition-colors select-none">
              [ CLICK TO SKIP ]
            </div>

            {/* Large Minimalist Numeric Counter */}
            <div className="flex items-baseline font-mono text-3xl sm:text-4xl font-light tracking-tight text-white/90">
              <span>{progress < 10 ? `0${progress}` : progress}</span>
              <span className="text-xs text-slate-500 ml-1 font-normal">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
