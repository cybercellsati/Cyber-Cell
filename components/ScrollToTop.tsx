"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down more than 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0c12]/90 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 text-amber-400 hover:text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_32px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          {/* Subtle Outer Pulsing Ring */}
          <span className="absolute inset-0 rounded-full border border-amber-400/30 animate-ping pointer-events-none opacity-40" />

          {/* Up Arrow Icon with hover elevation */}
          <ArrowUp className="w-5 h-5 text-amber-400 group-hover:text-white group-hover:-translate-y-1 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
