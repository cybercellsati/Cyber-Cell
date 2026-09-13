"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.38,
        delay: 0.12,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="flex-1 flex flex-col min-h-0"
    >
      {children}
    </motion.div>
  );
}
