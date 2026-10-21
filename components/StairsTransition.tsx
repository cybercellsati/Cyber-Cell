"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Silky quintic bezier curve for organic, luxury acceleration & deceleration
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

// Transition Timing Constants
const COVER_DURATION = 0.32; // Duration for curtain to smoothly glide across viewport
const ROUTE_PUSH_MS = 240;   // Trigger Next.js route change while screen is fully covered
const REVEAL_START_MS = 340; // Seamless handover to reveal the new page
const TOTAL_IDLE_MS = 680;   // Complete cycle and reset to idle

export default function StairsTransition() {
  const pathname = usePathname();
  const router = useRouter();

  // Phase: 'idle' | 'covering' | 'revealing'
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const isNavigatingRef = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Intercept internal link clicks to trigger monolithic curtain transition
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor element
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, target="_blank", or modifier keys
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
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

      // Validate URL origin and pathname
      try {
        const targetUrl = new URL(href, window.location.origin);
        if (targetUrl.origin !== window.location.origin) return;

        // Ignore same route clicks
        if (targetUrl.pathname === pathname && targetUrl.hash) return;
        if (targetUrl.pathname === pathname && !targetUrl.search) return;

        // Prevent double trigger if already animating
        if (isNavigatingRef.current) {
          e.preventDefault();
          return;
        }

        e.preventDefault();
        isNavigatingRef.current = true;
        clearAllTimers();

        // 1. Prefetch route immediately for instant background rendering
        router.prefetch(href);

        // 2. Start Phase 1: Monolithic curtain slides down from top
        setPhase("covering");

        // 3. Trigger route navigation once screen is covered
        const pushTimer = setTimeout(() => {
          router.push(href);
        }, ROUTE_PUSH_MS);
        timersRef.current.push(pushTimer);

        // 4. Start Phase 2: Curtain glides upward, gracefully revealing the new page
        const revealTimer = setTimeout(() => {
          setPhase("revealing");
        }, REVEAL_START_MS);
        timersRef.current.push(revealTimer);

        // 5. Reset to idle after reveal completes
        const idleTimer = setTimeout(() => {
          setPhase("idle");
          isNavigatingRef.current = false;
        }, TOTAL_IDLE_MS);
        timersRef.current.push(idleTimer);

      } catch {
        return;
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
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
      <AnimatePresence mode="wait">
        <motion.div
          key={`curtain-${phase}`}
          className="absolute inset-0 w-full h-full bg-[#030303] flex flex-col justify-between shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
          initial={phase === "covering" ? { y: "-100%" } : { y: "0%" }}
          animate={phase === "covering" ? { y: "0%" } : { y: "-100%" }}
          transition={{
            duration: COVER_DURATION,
            ease: CURTAIN_EASE,
          }}
        >
          {/* Subtle Monolithic Obsidian Shading */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#030303] to-[#020202] pointer-events-none" />

          {/* Minimalist Center HUD Telemetry Badge */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-[11px] font-mono tracking-[0.25em] text-slate-300 shadow-xl uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
              <span className="text-amber-400 font-extrabold">CYBER CELL</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-slate-400">SATI VIDISHA</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* GOLDEN HORIZON LINE: 1.5px Glowing Amber Beam along the leading edge       */}
          {/* ========================================================================= */}
          {/* When covering (sliding down), the beam is anchored at the bottom edge */}
          {phase === "covering" && (
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
              {/* Outer soft glow blur */}
              <div className="h-[6px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent blur-[4px]" />
              {/* Sharp horizon core line */}
              <div className="h-[1.5px] bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_16px_rgba(251,191,36,0.95)]" />
            </div>
          )}

          {/* When revealing (sliding up), the beam leads from the bottom edge */}
          {phase === "revealing" && (
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
              {/* Outer soft glow blur */}
              <div className="h-[6px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent blur-[4px]" />
              {/* Sharp horizon core line */}
              <div className="h-[1.5px] bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_16px_rgba(251,191,36,0.95)]" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
