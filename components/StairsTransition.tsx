"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Terminal } from "lucide-react";

// Total number of vertical stair columns
const TOTAL_STAIRS = 6;

// Easing curve (cubic-bezier for smooth velocity curve)
const STAIR_EASE = [0.76, 0, 0.24, 1] as const;

export default function StairsTransition() {
  const pathname = usePathname();
  const router = useRouter();

  // Phase: 'idle' | 'covering' | 'revealing'
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("revealing");
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const isNavigatingRef = useRef(false);

  // When pathname changes (either via our push or browser back/forward), trigger reveal
  useEffect(() => {
    isNavigatingRef.current = false;
    setPhase("revealing");
    const timer = setTimeout(() => {
      setPhase("idle");
      setTargetUrl(null);
    }, 700);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Global click interceptor for internal links to trigger the stair cover phase
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, target="_blank", or modifier keys
      if (
        anchor.target === "_blank" ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      // Check if it is a same-page hash or same route
      const url = new URL(href, window.location.href);
      if (url.pathname === pathname && url.hash) {
        return;
      }
      if (url.pathname === pathname && !url.search) {
        return;
      }

      // Intercept and trigger stair cover animation
      e.preventDefault();
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      // Safety timeout to ensure isNavigating is released even if route change aborts
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 2000);

      setTargetUrl(url.pathname);
      setPhase("covering");

      // Once stairs cover the screen (~380ms), execute route change
      setTimeout(() => {
        router.push(href);
      }, 400);
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => document.removeEventListener("click", handleDocumentClick, { capture: true });
  }, [pathname, router]);

  if (phase === "idle") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] overflow-hidden select-none ${
        phase === "covering" ? "pointer-events-auto cursor-wait" : "pointer-events-none"
      }`}
    >
      {/* 6 Vertical Stair Columns */}
      <div className="absolute inset-0 flex w-full h-full">
        {Array.from({ length: TOTAL_STAIRS }).map((_, index) => {
          // Stagger calculation: left-to-right cascade
          const coverDelay = index * 0.04;
          // Reveal stagger: reverse or left-to-right
          const revealDelay = index * 0.04;

          return (
            <motion.div
              key={index}
              className="relative h-full flex-1 bg-gradient-to-b from-[#060a12] via-[#09101f] to-[#05080e] border-r border-cyan-500/10 last:border-r-0"
              initial={
                phase === "covering"
                  ? { y: "-100%" }
                  : { y: "0%" }
              }
              animate={
                phase === "covering"
                  ? { y: "0%" }
                  : { y: "100%" }
              }
              transition={{
                duration: 0.36,
                delay: phase === "covering" ? coverDelay : revealDelay,
                ease: STAIR_EASE,
              }}
            >
              {/* Glowing Cyber Accent Line on the leading edge */}
              {phase === "covering" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
              )}
              {phase === "revealing" && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Cyber Center HUD Badge during transition */}
      <AnimatePresence>
        {(phase === "covering" || phase === "revealing") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 pointer-events-none select-none"
          >
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#090e1a]/90 border border-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.35)] backdrop-blur-md">
              <Shield className="w-7 h-7 text-cyan-400 animate-pulse" />
              <div className="absolute -inset-1 rounded-2xl border border-cyan-500/20 animate-ping pointer-events-none opacity-40" />
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#070c17]/90 border border-white/10 text-slate-300 font-mono text-[11px] shadow-lg">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-300 font-semibold tracking-wider">CYBER CELL</span>
              <span className="text-slate-500">//</span>
              <span className="text-slate-400 uppercase tracking-widest text-[10px]">
                {targetUrl ? targetUrl.replace("/", "") || "HEADQUARTERS" : "NODE"}
              </span>
              <span className="w-1.5 h-3 bg-cyan-400 animate-pulse ml-0.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
