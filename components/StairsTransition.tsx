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
      {/* 6 Vertical Stair Columns with High-Contrast Cyber Blue & Cyan Palette */}
      <div className="absolute inset-0 flex w-full h-full">
        {[
          {
            gradient: "from-[#00e5ff] via-[#0284c7] to-[#0a1e38]",
            edge: "bg-cyan-200 shadow-[0_0_18px_#00e5ff,0_0_35px_#00e5ff]",
            accent: "border-cyan-300/40",
          },
          {
            gradient: "from-[#38bdf8] via-[#0369a1] to-[#0c2547]",
            edge: "bg-sky-200 shadow-[0_0_18px_#38bdf8,0_0_35px_#0284c7]",
            accent: "border-cyan-300/40",
          },
          {
            gradient: "from-[#0284c7] via-[#1d4ed8] to-[#0f2c52]",
            edge: "bg-blue-200 shadow-[0_0_18px_#0284c7,0_0_35px_#1d4ed8]",
            accent: "border-cyan-300/40",
          },
          {
            gradient: "from-[#2563eb] via-[#1e40af] to-[#0d2240]",
            edge: "bg-blue-200 shadow-[0_0_18px_#2563eb,0_0_35px_#1e40af]",
            accent: "border-cyan-300/40",
          },
          {
            gradient: "from-[#0284c7] via-[#0369a1] to-[#0c2547]",
            edge: "bg-sky-200 shadow-[0_0_18px_#38bdf8,0_0_35px_#0284c7]",
            accent: "border-cyan-300/40",
          },
          {
            gradient: "from-[#00e5ff] via-[#0284c7] to-[#0a1e38]",
            edge: "bg-cyan-200 shadow-[0_0_18px_#00e5ff,0_0_35px_#00e5ff]",
            accent: "border-cyan-300/40",
          },
        ].map((stair, index) => {
          // Stagger calculation: left-to-right cascade
          const coverDelay = index * 0.045;
          const revealDelay = index * 0.045;

          return (
            <motion.div
              key={index}
              className={`relative h-full flex-1 bg-gradient-to-b ${stair.gradient} border-r ${stair.accent} last:border-r-0 shadow-2xl`}
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
                duration: 0.38,
                delay: phase === "covering" ? coverDelay : revealDelay,
                ease: STAIR_EASE,
              }}
            >
              {/* Beveled glass highlight across the column */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/20 pointer-events-none" />

              {/* Glowing Cyber Accent Line on the leading edge */}
              {phase === "covering" && (
                <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${stair.edge}`} />
              )}
              {phase === "revealing" && (
                <div className={`absolute top-0 left-0 right-0 h-[3px] ${stair.edge}`} />
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
