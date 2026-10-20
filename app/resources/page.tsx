"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { resourcesData, ResourceItem } from "@/data/resources";
import {
  Search,
  ArrowRight,
  ExternalLink,
  Terminal,
  Shield,
  LayoutGrid,
  FileText,
  Users,
  Sparkles,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";

type CategoryType = "All" | "Learn" | "Practice" | "Tools" | "Cheatsheets" | "Community";

interface SphereItem {
  id: CategoryType;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  accentColor: string;
  ringBorder: string;
  activeRing: string;
  glowShadow: string;
  topSpecular: string;
  dotColor: string;
  yOffsetClass: string;
}

const sphereCategories: SphereItem[] = [
  {
    id: "Learn",
    label: "Learn",
    sublabel: "Interactive Paths",
    icon: <Terminal className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />,
    accentColor: "text-cyan-400",
    ringBorder: "border-cyan-400/60 hover:border-cyan-300",
    activeRing: "border-cyan-400 ring-2 ring-cyan-400/40",
    glowShadow: "shadow-[0_0_35px_rgba(6,182,212,0.35),inset_0_0_25px_rgba(6,182,212,0.15)]",
    topSpecular: "from-cyan-300/25",
    dotColor: "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]",
    yOffsetClass: "lg:-translate-y-2",
  },
  {
    id: "Practice",
    label: "Practice",
    sublabel: "CTFs & Labs",
    icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />,
    accentColor: "text-amber-400",
    ringBorder: "border-amber-400/60 hover:border-amber-300",
    activeRing: "border-amber-400 ring-2 ring-amber-400/40",
    glowShadow: "shadow-[0_0_35px_rgba(245,158,11,0.35),inset_0_0_25px_rgba(245,158,11,0.15)]",
    topSpecular: "from-amber-300/25",
    dotColor: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]",
    yOffsetClass: "lg:translate-y-12 sm:lg:translate-y-14",
  },
  {
    id: "Tools",
    label: "Tools",
    sublabel: "Security Arsenal",
    icon: <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7 text-violet-400" />,
    accentColor: "text-violet-400",
    ringBorder: "border-violet-500/70 hover:border-violet-400",
    activeRing: "border-violet-400 ring-2 ring-violet-400/40",
    glowShadow: "shadow-[0_0_40px_rgba(139,92,246,0.4),inset_0_0_25px_rgba(139,92,246,0.15)]",
    topSpecular: "from-violet-300/30",
    dotColor: "bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.9)]",
    yOffsetClass: "lg:translate-y-3",
  },
  {
    id: "Cheatsheets",
    label: "Cheatsheets",
    sublabel: "Quick Commands",
    icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />,
    accentColor: "text-emerald-400",
    ringBorder: "border-emerald-400/60 hover:border-emerald-300",
    activeRing: "border-emerald-400 ring-2 ring-emerald-400/40",
    glowShadow: "shadow-[0_0_35px_rgba(16,185,129,0.35),inset_0_0_25px_rgba(16,185,129,0.15)]",
    topSpecular: "from-emerald-300/25",
    dotColor: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]",
    yOffsetClass: "lg:translate-y-12 sm:lg:translate-y-14",
  },
  {
    id: "Community",
    label: "Community",
    sublabel: "Campus & Global",
    icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />,
    accentColor: "text-purple-400",
    ringBorder: "border-purple-400/60 hover:border-purple-300",
    activeRing: "border-purple-400 ring-2 ring-purple-400/40",
    glowShadow: "shadow-[0_0_35px_rgba(192,132,252,0.35),inset_0_0_25px_rgba(192,132,252,0.15)]",
    topSpecular: "from-purple-300/25",
    dotColor: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.9)]",
    yOffsetClass: "lg:-translate-y-2",
  },
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const gridSectionRef = useRef<HTMLDivElement | null>(null);

  const filtered = resourcesData.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectSphere = (cat: CategoryType) => {
    setSelectedCategory((prev) => (prev === cat ? "All" : cat));
    if (gridSectionRef.current) {
      gridSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gridSectionRef.current) {
      gridSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300">
      <Navbar />

      <main className="flex-1 w-full pt-32 sm:pt-36 lg:pt-40 pb-20 overflow-hidden">
        
        {/* ========================================================
            HERO SECTION: "CYBERSECURITY RESOURCE VAULT"
            Directly matching user's reference mockup
           ======================================================== */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          
          {/* Eyebrow: KNOWLEDGE BASE */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[11px] font-mono tracking-[0.3em] text-slate-500 uppercase font-semibold">
              KNOWLEDGE BASE
            </span>
          </div>

          {/* Giant Two-Tone Title: Cybersecurity / Resource Vault */}
          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-0.035em] leading-[0.94] select-none">
            <span className="block text-white">
              Cybersecurity
            </span>
            <span className="block bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]">
              Resource Vault
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-lg mx-auto mt-3.5">
            Curated tools, platforms, guides and learning resources for SATI students.
          </p>

          {/* Center Pill Capsule Search Bar (Matching Reference Image) */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full max-w-lg sm:max-w-xl mx-auto mt-7 sm:mt-9 z-20"
          >
            <div className="group relative flex items-center rounded-full bg-black/60 border border-white/15 hover:border-white/30 focus-within:border-amber-400/80 focus-within:ring-2 focus-within:ring-amber-400/20 backdrop-blur-xl px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
              
              {/* Search Icon */}
              <Search className="w-5 h-5 text-slate-400 ml-1 mr-3 shrink-0 group-focus-within:text-amber-400 transition-colors" />
              
              {/* Text Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, topics, platforms..."
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder:text-slate-500 font-sans tracking-wide pr-2"
              />

              {/* Circular White Submit Button with Arrow */}
              <button
                type="submit"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-slate-200 text-slate-950 flex items-center justify-center shrink-0 transition-transform duration-200 shadow-md shadow-white/20 active:scale-95 group-hover:scale-105"
                title="Search vault"
              >
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>

        </section>


        {/* ========================================================
            CELESTIAL ARC & 5 GLOWING GLASS SPHERES
            Interactive orbs positioned along the planetary horizon
           ======================================================== */}
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 pb-16">
          
          {/* Planetary Horizon Glow at Bottom */}
          <div className="relative w-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
            
            {/* Dark Planet Horizon Arc with Illuminated Amber Rim */}
            <div className="absolute -bottom-[580px] sm:-bottom-[640px] left-1/2 -translate-x-1/2 w-[1200px] sm:w-[1500px] lg:w-[1800px] h-[700px] sm:h-[800px] rounded-[100%] border-t border-amber-500/40 shadow-[0_-15px_60px_rgba(245,158,11,0.25)] bg-[#040507] pointer-events-none" />

            {/* Subtle Horizon Atmospheric Core Glow */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-28 bg-amber-500/[0.08] blur-[70px] pointer-events-none rounded-full" />

            {/* Orbital Curve SVG running behind spheres */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block opacity-60"
              viewBox="0 0 1200 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Wave-shaped orbital line connecting all 5 sphere centers */}
              <path
                d="M 120 200 C 260 270 320 320 400 320 C 480 320 540 230 600 230 C 660 230 720 320 800 320 C 880 320 940 270 1080 200"
                stroke="url(#orbitWaveGrad)"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />

              {/* Satellite Dot Nodes on the Orbit Path */}
              <circle cx="250" cy="255" r="3.5" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
              <circle cx="440" cy="315" r="3.5" fill="#fbbf24" filter="drop-shadow(0 0 6px #fbbf24)" />
              <circle cx="680" cy="270" r="3.5" fill="#a78bfa" filter="drop-shadow(0 0 6px #a78bfa)" />
              <circle cx="760" cy="315" r="3.5" fill="#34d399" filter="drop-shadow(0 0 6px #34d399)" />
              <circle cx="950" cy="255" r="3.5" fill="#c084fc" filter="drop-shadow(0 0 6px #c084fc)" />

              <defs>
                <linearGradient id="orbitWaveGrad" x1="100" y1="200" x2="1100" y2="200" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="25%" stopColor="#fbbf24" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
                  <stop offset="75%" stopColor="#34d399" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>

            {/* The 5 Interactive Glass Spheres */}
            <div className="relative z-10 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-items-center py-4">
              {sphereCategories.map((sphere) => {
                const isSelected = selectedCategory === sphere.id;

                return (
                  <motion.div
                    key={sphere.id}
                    whileHover={{ scale: 1.06, y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    onClick={() => handleSelectSphere(sphere.id)}
                    className={`relative cursor-pointer group select-none ${sphere.yOffsetClass}`}
                  >
                    {/* The Spherical Glass Body */}
                    <div
                      className={`relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center p-4 border transition-all duration-300 backdrop-blur-xl bg-gradient-to-b from-[#090d16]/85 via-[#04060a]/90 to-black/95 ${
                        isSelected
                          ? sphere.activeRing + " " + sphere.glowShadow
                          : sphere.ringBorder + " " + sphere.glowShadow
                      }`}
                    >
                      {/* Top Crescent Specular Reflection (Gives 3D glass sphere look) */}
                      <div
                        className={`absolute top-0 left-1/4 right-1/4 h-10 rounded-full bg-gradient-to-b ${sphere.topSpecular} to-transparent blur-[1px] pointer-events-none`}
                      />

                      {/* Icon */}
                      <div className="relative mb-2 transition-transform duration-300 group-hover:scale-110">
                        {sphere.icon}
                      </div>

                      {/* Category Label */}
                      <span className="text-white font-bold text-sm sm:text-base tracking-wide text-center">
                        {sphere.label}
                      </span>

                      {/* Micro Sublabel */}
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                        {sphere.sublabel}
                      </span>

                      {/* Bottom Action Circle Button with Arrow */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 bg-white/[0.04] flex items-center justify-center text-slate-300 transition-all duration-200 mt-2.5 ${
                          isSelected
                            ? "bg-white text-slate-950 font-bold scale-110"
                            : "group-hover:bg-white group-hover:text-slate-950 group-hover:scale-110"
                        }`}
                      >
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>

                      {/* Active Ring Pulse Indicator */}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </section>


        {/* ========================================================
            FILTER CONTROLS & RESOURCE CARDS GRID
           ======================================================== */}
        <section ref={gridSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-12">
          
          {/* Header Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
              <h2 className="text-sm sm:text-base font-mono font-bold tracking-wider uppercase text-white">
                VAULT INVENTORY:{" "}
                <span className="text-amber-400">
                  {selectedCategory === "All" ? "ALL DOMAINS" : selectedCategory.toUpperCase()}
                </span>{" "}
                ({filtered.length})
              </h2>
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedCategory === "All"
                    ? "bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-sm"
                    : "bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                }`}
              >
                All (22)
              </button>

              {sphereCategories.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedCategory(s.id)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    selectedCategory === s.id
                      ? "bg-white text-slate-950 font-bold border-white shadow-sm"
                      : "bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-8">
            {filtered.map((item) => {
              const badgeTypeStyles = {
                Official: "text-amber-400 border-amber-500/30 bg-amber-500/10",
                Community: "text-purple-400 border-purple-500/30 bg-purple-500/10",
                External: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
              }[item.type];

              const categoryBadgeColor = {
                Learn: "text-cyan-400 border-cyan-500/25 bg-cyan-500/10",
                Practice: "text-amber-400 border-amber-500/25 bg-amber-500/10",
                Tools: "text-violet-400 border-violet-500/25 bg-violet-500/10",
                Cheatsheets: "text-emerald-400 border-emerald-500/25 bg-emerald-500/10",
                Community: "text-purple-400 border-purple-500/25 bg-purple-500/10",
              }[item.category];

              return (
                <SpotlightCard
                  key={item.id}
                  spotlightColor="rgba(245, 158, 11, 0.1)"
                  className="p-6 rounded-2xl bg-[#080808]/90 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:-translate-y-1"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${categoryBadgeColor}`}>
                        {item.category} &bull; {item.topic}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badgeTypeStyles}`}>
                        {item.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2.5 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed font-normal mb-5">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer: Action & Resource Tag */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-amber-400">
                    <span className="text-[11px] font-sans font-medium text-slate-300">
                      {item.badge || "Open Resource"}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] group-hover:bg-amber-400 group-hover:text-slate-950 text-slate-300 font-semibold transition-all duration-200"
                    >
                      <span>Access</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Empty Search State */}
          {filtered.length === 0 && (
            <div className="text-center py-20 border border-white/10 rounded-2xl bg-[#080808]/90 p-8 space-y-3">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
              <h4 className="text-base font-bold text-white">No Matching Vault Resources Found</h4>
              <p className="text-xs text-slate-400 font-mono">
                No items matched &quot;{searchQuery}&quot;. Try searching for Linux, Burp, CTF, or select a category above.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono transition-colors mt-2"
              >
                <span>Reset Filters</span>
              </button>
            </div>
          )}

        </section>

      </main>

      <Footer />
    </div>
  );
}
