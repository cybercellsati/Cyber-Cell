"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { focusAreas, FocusArea } from "@/data/focusAreas";
import {
  ArrowRight,
  Code2,
  Bug,
  Flag,
  X,
  Wrench,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";

// Custom SVG for Network Nodes
function NetworkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <line x1="12" y1="7.5" x2="5" y2="16.5" />
      <line x1="12" y1="7.5" x2="19" y2="16.5" />
      <line x1="7.5" y1="19" x2="16.5" y2="19" />
    </svg>
  );
}

// Custom SVG for Digital Forensics Fingerprint
function FingerprintIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a9 9 0 0 0-9 9c0 3.3 1.5 6 3 8" />
      <path d="M12 6a5 5 0 0 0-5 5c0 2.5 1 5 2 7" />
      <path d="M12 10a1 1 0 0 0-1 1c0 2 .5 4 1 5.5" />
      <path d="M12 2c3.5 0 7 2.5 7 7 0 5-2.5 9-4 12" />
      <path d="M16.5 9.5c0-2.5-2-4.5-4.5-4.5" />
      <path d="M15 14c.8 2 1.5 4 1.5 5" />
    </svg>
  );
}

export default function FocusAreas() {
  const [selectedDomain, setSelectedDomain] = useState<FocusArea | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll state & progress
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Drag to scroll
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const getDomain = (id: string) => focusAreas.find((d) => d.id === id) || focusAreas[0];

  // The Curated Trending Top 5 Security Tracks
  const top5Tracks = [
    {
      rank: "01",
      badge: "RANK #01 • MOST ACTIVE",
      id: "ethical-hacking",
      name: "Ethical Hacking & Red Teaming",
      tagline: "Vulnerability discovery, penetration testing, and authorized offensive audits.",
      icon: ShieldAlert,
      level: "Intermediate",
      data: getDomain("ethical-hacking"),
      highlights: [
        "Reconnaissance & Port Auditing",
        "Privilege Escalation Chains",
        "Vulnerability Assessment",
        "Responsible Disclosure Reports",
      ],
      tools: ["Nmap", "Metasploit", "Netcat", "Gobuster"],
    },
    {
      rank: "02",
      badge: "RANK #02 • INDUSTRY CRITICAL",
      id: "web-security",
      name: "Web Application Defense",
      tagline: "Audit modern client-server architectures, OWASP Top 10, and API vulnerabilities.",
      icon: Code2,
      level: "Beginner Friendly",
      data: getDomain("web-security"),
      highlights: [
        "OWASP Top 10 Exploits",
        "SQLi & Parameter Tampering",
        "XSS & Session Hijacking",
        "REST API & JWT Security",
      ],
      tools: ["Burp Suite", "OWASP ZAP", "Postman", "SQLMap"],
    },
    {
      rank: "03",
      badge: "RANK #03 • CORE INFRASTRUCTURE",
      id: "network-security",
      name: "Network & Cloud Security",
      tagline: "Packet sniffing, protocol dissection, firewall segmentation, and threat hunting.",
      icon: NetworkIcon,
      level: "Beginner Friendly",
      data: getDomain("network-security"),
      highlights: [
        "TCP/IP & Handshake Analysis",
        "DNS & ARP Spoofing Mitigation",
        "Deep Packet Inspection",
        "Firewall & IDS Architectures",
      ],
      tools: ["Wireshark", "Tcpdump", "Snort", "Suricata"],
    },
    {
      rank: "04",
      badge: "RANK #04 • WARGAMES & CTF",
      id: "ctf-competitions",
      name: "Competitive CTF & Wargames",
      tagline: "Fast-paced attack-defense tournaments, cryptography puzzles, and binary exploitation.",
      icon: Flag,
      level: "Intermediate",
      data: getDomain("ctf-competitions"),
      highlights: [
        "Jeopardy CTF Strategy",
        "Applied Cryptography",
        "Reverse Engineering Basics",
        "Forensics & Steganography",
      ],
      tools: ["CyberChef", "Ghidra", "Python", "ExifTool"],
    },
    {
      rank: "05",
      badge: "RANK #05 • INCIDENT RESPONSE",
      id: "digital-forensics",
      name: "Digital Forensics & Artifacts",
      tagline: "Recover forensic evidence, analyze memory dumps, and reconstruct cyber incidents.",
      icon: FingerprintIcon,
      level: "Intermediate",
      data: getDomain("digital-forensics"),
      highlights: [
        "Chain of Custody Principles",
        "RAM & Volatility Dumps",
        "Filesystem Metadata Recovery",
        "Event Log Timeline Analysis",
      ],
      tools: ["Autopsy", "Volatility", "FTK Imager", "Wireshark"],
    },
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

      // Determine active card for progress bar
      const cardWidth = 360;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveCardIndex(Math.min(top5Tracks.length - 1, Math.max(0, index)));
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollByDirection = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.3;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section id="domains" className="relative py-20 lg:py-28 bg-[#030303] border-b border-white/[0.08] overflow-hidden select-none">
      
      {/* Background Subtle Amber Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            SECTION HEADER WITH CONTROLS (TRENDING TOP 5)
           ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-amber-400 uppercase">
                TRENDING IN 2026 &bull; STUDENT CURRICULUM
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              Top 5 Security <span className="text-amber-400">Tracks.</span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-slate-400 font-light leading-relaxed">
              The highest-demand cybersecurity specializations actively researched and practiced in SATI’s cyber labs.
            </p>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <Link
              href="/domains"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-amber-300 transition-colors mr-2 group"
            >
              <span>All 8 Domains</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByDirection("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-11 h-11 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] disabled:opacity-20 disabled:hover:bg-white/[0.04] border border-white/10 hover:border-amber-400/50 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => scrollByDirection("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-11 h-11 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] disabled:opacity-20 disabled:hover:bg-white/[0.04] border border-white/10 hover:border-amber-400/50 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            TRENDING TOP 5 HORIZONTAL SCROLL DECK
           ======================================================== */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory ${
            isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {top5Tracks.map((track, idx) => {
            const Icon = track.icon;
            const isRankOne = idx === 0;

            return (
              <div
                key={track.id}
                onClick={() => setSelectedDomain(track.data)}
                className={`relative w-[300px] sm:w-[360px] rounded-[30px] p-6 sm:p-7 shrink-0 snap-start border transition-all duration-500 flex flex-col justify-between group overflow-hidden bg-gradient-to-b from-[#0e0c08] via-[#080705] to-[#040302] hover:scale-[1.015] ${
                  isRankOne
                    ? "border-amber-400/40 shadow-[0_20px_60px_rgba(245,158,11,0.12)] ring-1 ring-amber-400/20"
                    : "border-white/10 hover:border-amber-400/40 hover:shadow-[0_20px_50px_rgba(245,158,11,0.08)]"
                }`}
              >
                {/* Background Giant Watermark Rank Number (Netflix Top 5 Style) */}
                <div className="absolute -top-6 -right-3 text-[120px] sm:text-[140px] font-black font-sans leading-none text-white/[0.04] group-hover:text-amber-400/10 transition-colors pointer-events-none select-none">
                  {track.rank}
                </div>

                <div className="relative z-10 space-y-5">
                  
                  {/* Top Eyebrow with Rank Pill & Level */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-black bg-amber-400/15 border border-amber-400/30 text-amber-300 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span>{track.badge}</span>
                    </span>

                    <span className="text-[10px] font-mono tracking-wider uppercase font-medium text-slate-400">
                      {track.level}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-3 pt-1">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-black/60 border border-white/10 group-hover:border-amber-400/50 flex items-center justify-center text-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {track.name}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-2">
                      {track.tagline}
                    </p>
                  </div>

                  {/* Core Focus Highlights */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold block">
                      CORE COMPETENCIES:
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {track.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Toolchain Badges */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {track.tools.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300 group-hover:border-amber-400/30 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="relative z-10 pt-5 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="text-[11px] text-slate-400 group-hover:text-white transition-colors">
                    Track #{track.rank}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedDomain(track.data)}
                    className="inline-flex items-center gap-1.5 font-bold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* ========================================================
            SEGMENTED PROGRESS BAR & MOBILE BROWSE LINK
           ======================================================== */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* 5 Segmented Indicator Bars */}
          <div className="flex items-center gap-2">
            {top5Tracks.map((_, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth = 360;
                    scrollRef.current.scrollTo({
                      left: pIdx * cardWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  pIdx === activeCardIndex
                    ? "w-10 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                    : "w-4 bg-white/20 hover:bg-white/40"
                }`}
                title={`Go to Track 0${pIdx + 1}`}
              />
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400">
            <span>Drag or scroll to browse &bull; Click card to view full curriculum</span>
          </div>

          <Link
            href="/domains"
            className="sm:hidden inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 font-bold"
          >
            <span>Explore All 8 Domains &rarr;</span>
          </Link>
        </div>

      </div>

      {/* ========================================================
          INTERACTIVE DOMAIN DETAIL MODAL
         ======================================================== */}
      {selectedDomain && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedDomain(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#110d06] via-[#090703] to-[#040301] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-[0_25px_80px_rgba(0,0,0,0.9)] space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 font-bold uppercase">
                  {selectedDomain.level} Track
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight pt-1">
                  {selectedDomain.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light">
                  {selectedDomain.shortDesc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDomain(null)}
                className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {selectedDomain.learnSummary}
            </div>

            {/* Core Syllabus Topics */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Key Competencies Covered</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDomain.coreTopics.map((t, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-200 flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)] shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Toolchain */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Tools &amp; Practical Frameworks</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDomain.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-3 py-1 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Starting Point */}
            {selectedDomain.suggestedStartingPoint && (
              <div className="p-4 rounded-2xl bg-amber-400/[0.05] border border-amber-400/20 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                  RECOMMENDED STARTING STRATEGY:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {selectedDomain.suggestedStartingPoint}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                SATI Vidisha Cyber Cell
              </span>
              <Link
                href="/domains"
                onClick={() => setSelectedDomain(null)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold px-5 py-2.5 rounded-xl bg-amber-400 text-black hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/25 uppercase tracking-wider"
              >
                <span>Full Domain Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}