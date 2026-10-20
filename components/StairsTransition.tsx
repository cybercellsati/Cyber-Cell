"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Total number of vertical stair columns for widescreen desktop
const TOTAL_STAIRS = 5;

// Fine-tuned Quint easing curve for silky, organic acceleration and deceleration
const STAIR_EASE = [0.76, 0, 0.24, 1] as const;

// Desktop Timing Constants (in seconds & milliseconds)
const STAIR_DURATION = 0.32; // Duration each individual column takes to traverse the screen
const STAIR_STAGGER = 0.05;  // 50ms stagger between adjacent stairs so they cascade clearly "ek ek se"
const DESKTOP_COVER_TOTAL_MS = Math.round(((TOTAL_STAIRS - 1) * STAIR_STAGGER + STAIR_DURATION) * 1000); // 520ms
const DESKTOP_ROUTE_PUSH_MS = 380; // Push route when screen is ~90% covered so Next.js renders in background
const DESKTOP_REVEAL_START_MS = DESKTOP_COVER_TOTAL_MS + 25; // 545ms: seamless handover to reveal
const DESKTOP_TOTAL_IDLE_MS = DESKTOP_REVEAL_START_MS + DESKTOP_COVER_TOTAL_MS + 40; // ~1100ms

// Mobile Timing Constants
const MOBILE_DURATION = 0.28;
const MOBILE_ROUTE_PUSH_MS = 240;
const MOBILE_REVEAL_START_MS = 310;
const MOBILE_TOTAL_IDLE_MS = 640;

// Executive Midnight Slate & Cyber Steel palette with distinct steps and 3D lighting
const STAIR_COLUMNS = [
  {
    bg: "bg-[#09111e]",
    border: "border-white/[0.07]",
  },
  {
    bg: "bg-[#0f1c32]",
    border: "border-white/[0.08]",
  },
  {
    bg: "bg-[#162744]",
    border: "border-white/[0.09]",
  },
  {
    bg: "bg-[#0f1c32]",
    border: "border-white/[0.08]",
  },
  {
    bg: "bg-[#09111e]",
    border: "border-white/[0.07]",
  },
];

export default function StairsTransition() {
  const pathname = usePathname();
  const router = useRouter();

  // Responsive state: detect mobile viewport (< 768px)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Phase: 'idle' | 'covering' | 'revealing'
  // Starts 'idle' so page reload does NOT display an unwanted flash of stairs
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const isNavigatingRef = useRef(false);

  // Active timers references for clean teardown and zero memory leaks
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Intercept internal link clicks to drive the deterministic cascade sequence
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

      // Check URL origin and pathname
      try {
        const targetUrl = new URL(href, window.location.origin);
        if (targetUrl.origin !== window.location.origin) return;

        // Same route ignore
        if (targetUrl.pathname === pathname && targetUrl.hash) return;
        if (targetUrl.pathname === pathname && !targetUrl.search) return;

        // Prevent double trigger while transition is active
        if (isNavigatingRef.current) {
          e.preventDefault();
          return;
        }

        e.preventDefault();
        isNavigatingRef.current = true;
        clearAllTimers();

        // 1. Immediately prefetch route so Next.js caches RSC payload in background
        router.prefetch(href);

        // 2. Start Phase 1: Covering cascade ("ek ek se" stairs drop down)
        setPhase("covering");

        const mobile = window.innerWidth < 768;
        const routePushMs = mobile ? MOBILE_ROUTE_PUSH_MS : DESKTOP_ROUTE_PUSH_MS;
        const revealStartMs = mobile ? MOBILE_REVEAL_START_MS : DESKTOP_REVEAL_START_MS;
        const totalIdleMs = mobile ? MOBILE_TOTAL_IDLE_MS : DESKTOP_TOTAL_IDLE_MS;

        // 3. Trigger route change once screen is opaque
        const pushTimer = setTimeout(() => {
          router.push(href);
        }, routePushMs);
        timersRef.current.push(pushTimer);

        // 4. Start Phase 2: Revealing cascade (stairs drop down out of view, unveiling new page)
        const revealTimer = setTimeout(() => {
          setPhase("revealing");
        }, revealStartMs);
        timersRef.current.push(revealTimer);

        // 5. Reset to idle after reveal completes
        const idleTimer = setTimeout(() => {
          setPhase("idle");
          isNavigatingRef.current = false;
        }, totalIdleMs);
        timersRef.current.push(idleTimer);

      } catch {
        // Fallback for invalid URLs
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
        {isMobile ? (
          /* Mobile Dedicated Animation: Sleek Cyber Curtain with Luminous Laser Beam */
          <motion.div
            key={`mobile-${phase}`}
            className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#080e18] via-[#101b2e] to-[#080e18] flex flex-col justify-between shadow-2xl"
            initial={phase === "covering" ? { y: "-100%" } : { y: "0%" }}
            animate={phase === "covering" ? { y: "0%" } : { y: "100%" }}
            transition={{
              duration: MOBILE_DURATION,
              ease: STAIR_EASE,
            }}
          >
            {/* Architectural glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/30 pointer-events-none" />

            {/* Glowing Cyan Scanner Beam on Leading Edge */}
            {phase === "covering" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20 shadow-[0_0_16px_rgba(56,189,248,0.9)]" />
            )}
            {phase === "revealing" && (
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20 shadow-[0_0_16px_rgba(56,189,248,0.9)]" />
            )}
          </motion.div>
        ) : (
          /* Desktop: 5 Executive Midnight Slate Stairs cascading "ek ek se" */
          <div key={`desktop-${phase}`} className="absolute inset-0 flex w-full h-full">
            {STAIR_COLUMNS.map((stair, index) => {
              // Stagger delay: each stair steps down exactly 50ms after the previous one
              const staggerDelay = index * STAIR_STAGGER;

              return (
                <motion.div
                  key={`${phase}-stair-${index}`}
                  className={`relative h-full flex-1 ${stair.bg} border-l ${stair.border} border-r border-black/50 shadow-[-16px_0_30px_rgba(0,0,0,0.65)]`}
                  initial={phase === "covering" ? { y: "-100%" } : { y: "0%" }}
                  animate={phase === "covering" ? { y: "0%" } : { y: "100%" }}
                  transition={{
                    duration: STAIR_DURATION,
                    delay: staggerDelay,
                    ease: STAIR_EASE,
                  }}
                >
                  {/* Subtle 3D depth bevel gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/[0.04] via-transparent to-black/35 pointer-events-none" />

                  {/* Luminous Neon Cyan Hairline on the leading edge of each individual stair */}
                  {phase === "covering" && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400/40 via-cyan-300 to-cyan-400/40 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
                  )}
                  {phase === "revealing" && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400/40 via-cyan-300 to-cyan-400/40 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
