"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Terminal,
  Cpu,
  Zap,
  CheckCircle2,
  Users,
  Compass,
  Play,
  Flame,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Radio,
} from "lucide-react";

export default function AboutSection() {
  const [activeConsoleTab, setActiveConsoleTab] = useState<"logs" | "nodes">("logs");
  const [isRunningPing, setIsRunningPing] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(false);

  const handleRunPing = () => {
    setIsRunningPing(true);
    setTimeout(() => {
      setIsRunningPing(false);
      setPingSuccess(true);
      setTimeout(() => setPingSuccess(false), 3000);
    }, 900);
  };

  // 3 Operational Pillars (Left Column of Matrix)
  const pillars = [
    {
      num: "01",
      title: "INITIALIZE",
      subtitle: "Systems & Sandboxes",
      desc: "Deploy isolated Linux containers, inspect POSIX memory layout, and dissect raw TCP/IP packet streams.",
      tag: "FOUNDATION OPS",
    },
    {
      num: "02",
      title: "ENGAGE",
      subtitle: "Offensive Exploitation",
      desc: "Audit OWASP Top 10 web vulnerabilities, reverse-engineer x86/ARM binaries, and solve competitive jeopardy CTFs.",
      tag: "WARGAME DRILLS",
    },
    {
      num: "03",
      title: "DEFEND",
      subtitle: "Hardening & Tooling",
      desc: "Engineer Python recon scanners, harden campus server infrastructure, and practice responsible vulnerability triage.",
      tag: "CAMPUS RESILIENCE",
    },
  ];

  // 5 "Why Us" Capabilities (Right Column of Matrix)
  const capabilities = [
    {
      icon: Zap,
      title: "100% Practical Labs",
      desc: "Zero theoretical slides. Learn by exploiting and patching real software in isolated cyber ranges.",
    },
    {
      icon: Cpu,
      title: "Defensive Tool Engineering",
      desc: "Build custom asynchronous port scanners, fuzzers, and packet sniffers from scratch.",
    },
    {
      icon: Shield,
      title: "Official SATI Accreditation",
      desc: "Chartered cybersecurity community backed by the Department of Computer Science & Engineering.",
    },
    {
      icon: Flame,
      title: "Competitive CTF Battlegroups",
      desc: "Compete in national collegiate CTFs, campus jeopardy wargames, and bug-hunting bounties.",
    },
    {
      icon: Users,
      title: "Peer-to-Peer Intel & Mentorship",
      desc: "Direct access to senior security researchers, verified exploit writeups, and industry alumni.",
    },
  ];

  return (
    <section id="about" className="relative w-full bg-[#030303] text-white overflow-hidden select-none">
      
      {/* =========================================================================
          SECTION 1: TELEMETRY HUD & LIVE CONSOLE PREVIEW (Inspire by Section 2 in Ref)
          Features:
          - Angled upper container with glowing golden horizon line
          - Left: Interactive cyber console with simulated live campus telemetry
          - Right: 4 High-contrast operational stats with glowing amber numbers
          - Overlapping 3D Cyber Sentinel floating across section boundary
         ========================================================================= */}
      <div className="relative pt-16 sm:pt-20 pb-20 sm:pb-28 border-b border-white/[0.06]">
        {/* Ambient Amber Core Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.035),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Eyebrow Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                TELEMETRY // SATI CAMPUS RANGE
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 tracking-widest hidden sm:inline-block">
              NODE 23.53° N, 77.81° E &bull; VIDISHA
            </span>
          </motion.div>

          {/* 2-Column Split: Console Window (Left) + Statistics Grid (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Live Terminal Window (Inspired by the Video/Interactive Player) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-between rounded-3xl bg-[#070707] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative group hover:border-amber-500/30 transition-all duration-300"
            >
              {/* Window Top Bar */}
              <div className="px-5 py-3.5 bg-black/60 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 border border-amber-400/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">cyber-range.sati.in:8080</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("logs")}
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      activeConsoleTab === "logs"
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    LOGS
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("nodes")}
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      activeConsoleTab === "nodes"
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    TOPOLOGY
                  </button>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-5 font-mono text-xs text-slate-300 space-y-2.5 min-h-[220px] bg-gradient-to-b from-black/80 to-[#070707]">
                {activeConsoleTab === "logs" ? (
                  <>
                    <div className="text-slate-500 text-[11px]">
                      [+] Initializing SATI Defensive Sandbox v2.4 ...
                    </div>
                    <div className="text-emerald-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>[STATUS] 6/6 CTF docker challenges loaded (web, pwn, rev)</span>
                    </div>
                    <div className="text-amber-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>[EVENT] 160+ Cadets completed EXPLOIT 2026 Bootcamp</span>
                    </div>
                    <div className="text-slate-400">
                      [AUTH] 300+ Verified collegiate student nodes connected
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      [FIREWALL] Inbound scans triaged. Zero unauthorized leaks.
                    </div>
                    {pingSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-amber-400 font-bold bg-amber-500/10 p-2 rounded border border-amber-500/30"
                      >
                        &gt; 64 bytes from range.sati.in: icmp_seq=1 ttl=64 time=1.84 ms [ALL GREEN]
                      </motion.div>
                    )}
                  </>
                ) : (
                  <div className="space-y-2 text-slate-400 text-xs">
                    <div className="text-white font-bold text-[11px] text-amber-400 uppercase tracking-widest">
                      // Campus Range Topology
                    </div>
                    <div className="pl-2 border-l border-white/10 space-y-1 font-mono text-[11px]">
                      <div>&bull; Gateway: <span className="text-white">10.10.23.1 (SATI Core Firewall)</span></div>
                      <div>&bull; CTF Sandbox Cluster: <span className="text-emerald-400">ONLINE (6 Nodes)</span></div>
                      <div>&bull; Vulnerable Benchmarks: <span className="text-amber-300">ISOLATED SUBNET</span></div>
                      <div>&bull; Incident Triage Station: <span className="text-white">Central Computer Center</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Console Footer Action Bar */}
              <div className="px-5 py-3.5 bg-black/80 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SANDBOX STATUS: READY
                </span>

                <button
                  type="button"
                  onClick={handleRunPing}
                  disabled={isRunningPing}
                  className="px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-[11px] tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
                >
                  <Terminal className="w-3 h-3" />
                  <span>{isRunningPing ? "PINGING RANGE..." : "EXECUTE PING"}</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column: High-Impact Statistics Grid (Inspire by "СТАТИСТИКА НАШЕГО СЕРВИСА") */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-between space-y-6"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
                  OPERATIONAL TELEMETRY
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  Real numbers powering the technical defense society at Samrat Ashok Technological Institute.
                </p>
              </div>

              {/* 4 Stats in 2x2 Grid with Golden Amber Glow */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                
                {/* Stat 1 */}
                <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#090805] to-[#040302] border border-amber-500/20 hover:border-amber-400/50 transition-colors group">
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-400" />
                  <span className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight font-sans drop-shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform inline-block">
                    300+
                  </span>
                  <div className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Active Cadets
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Verified SATI Network
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#090805] to-[#040302] border border-white/[0.08] hover:border-amber-400/50 transition-colors group">
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-400" />
                  <span className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans group-hover:text-amber-300 group-hover:scale-105 transition-all inline-block">
                    100%
                  </span>
                  <div className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Hands-on Labs
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Zero Passive Slides
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#090805] to-[#040302] border border-white/[0.08] hover:border-amber-400/50 transition-colors group">
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-400" />
                  <span className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight font-sans drop-shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform inline-block">
                    160+
                  </span>
                  <div className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Workshop Cadets
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    EXPLOIT 2026 Batch
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#090805] to-[#040302] border border-amber-500/20 hover:border-amber-400/50 transition-colors group">
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-400" />
                  <span className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans group-hover:text-amber-300 group-hover:scale-105 transition-all inline-block">
                    24/7
                  </span>
                  <div className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
                    CTF Cyber Range
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Live Sandboxes
                  </div>
                </div>

              </div>

              {/* Sub-bar link */}
              <div className="pt-1 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Audited by CSE Department
                </span>
                <Link
                  href="/events"
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold group"
                >
                  <span>Inspect Event Archive</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>

          </div>

        </div>
      </div>


      {/* =========================================================================
          SECTION 2: SLASHED ANGLED MISSION BANNER (Inspire by Section 3 "О НАШЕМ ПРОЕКТЕ")
          Features:
          - Slashed diagonal geometric cut
          - High-contrast titanium/golden horizon edge
          - Minimalist punchy manifesto with tight tracking
          - SATI Vidisha campus coordinates badge
         ========================================================================= */}
      <div className="relative py-16 sm:py-20 bg-gradient-to-r from-[#0a0805] via-[#050402] to-[#0a0805] border-y border-amber-500/25">
        
        {/* Glowing Horizon Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#f59e0b]" />
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          >
            {/* Left: Punchy Manifesto */}
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest text-black bg-amber-400 uppercase">
                  INSTITUTIONAL CHARTER
                </span>
                <span className="text-xs font-mono text-slate-400">EST. 2026 &bull; SATI VIDISHA</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                DEFENSE IS NOT AN AFTERTHOUGHT. <br />
                <span className="text-amber-400">IT IS ARCHITECTURE.</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
                Cyber Cell is the official cybersecurity community and technical defense body at{" "}
                <strong className="text-white font-medium">Samrat Ashok Technological Institute</strong>. 
                We engineer student researchers through live adversary wargames, low-level binary exploitation, 
                and hardened defensive systems.
              </p>
            </div>

            {/* Right: Direct CTA to Full Charter */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 self-start lg:self-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-white/10 active:scale-95 group"
              >
                <span>Read Full Charter &amp; Leadership</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[11px] font-mono text-slate-500">
                Department of Computer Science &amp; Engineering
              </span>
            </div>
          </motion.div>
        </div>
      </div>


      {/* =========================================================================
          SECTION 3: THE 3-COLUMN PILLAR MATRIX (Inspire by Thanos Section 4 in Ref)
          Features:
          - Left Column: 1, 2, 3 Numbered Operational Steps ("НА НАШЕЙ ПЛАТФОРМЕ...")
          - Center Column: Full-Height 3D Cyborg Guardian Anchor with Glowing Halo
          - Right Column: "WHY CYBER CELL?" (5 concise key capabilities with icons)
         ========================================================================= */}
      <div className="relative py-20 sm:py-28 overflow-hidden">
        {/* Subtle Background Radial Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-amber-400 text-[10px] font-mono tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              <span>THE OPERATIONAL MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              HOW WE ENGINEER DEFENSE
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Structured progressive tracks backed by real-world adversary exercises.
            </p>
          </motion.div>

          {/* 3-Column Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            
            {/* Left Column: 1, 2, 3 Steps (Numbered Progression) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 space-y-4"
            >
              <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
                // 3-STAGE PROGRESSION
              </div>

              {pillars.map((step, idx) => (
                <div
                  key={step.num}
                  className="relative p-5 rounded-2xl bg-[#070707] border border-white/[0.08] hover:border-amber-400/40 transition-all duration-300 group"
                >
                  {/* Glowing Corner Accents */}
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber-400/50" />
                  
                  <div className="flex items-start gap-4">
                    {/* Big Bold Number */}
                    <div className="text-3xl sm:text-4xl font-black font-sans text-amber-400/90 group-hover:text-amber-300 transition-colors leading-none pt-0.5">
                      {step.num}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider group-hover:text-amber-300 transition-colors">
                          {step.title}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400">
                          {step.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Center Column: Full-Height 3D Cyber Sentinel (Inspired by Thanos in Reference) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col items-center justify-center relative py-6"
            >
              {/* Amber Halo Ring behind Sentinel */}
              <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-amber-500/25 shadow-[0_0_80px_rgba(245,158,11,0.12)] pointer-events-none" />
              <div className="absolute w-[200px] h-[200px] rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />

              {/* 3D Character Cutout */}
              <div className="relative w-[280px] sm:w-[340px] aspect-[1050/871] z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
                <Image
                  src="/images/hero-cyborg-cutout.png"
                  alt="Cyber Cell Sentinel Guardian"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 300px, 340px"
                />
              </div>

              {/* Interactive Telemetry HUD Plaque */}
              <div className="mt-4 px-4 py-1.5 rounded-full bg-black/80 border border-amber-500/30 backdrop-blur-md text-[10px] font-mono text-amber-300 flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.15)] z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>SENTINEL CORE // DEFENSE ACTIVE</span>
              </div>
            </motion.div>

            {/* Right Column: "WHY CYBER CELL?" (5 Capabilities with Icons - Inspired by "ПОЧЕМУ МЫ?") */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 space-y-3"
            >
              <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
                // WHY CYBER CELL?
              </div>

              {capabilities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl bg-[#070707] border border-white/[0.06] hover:border-amber-400/40 transition-all duration-200 group flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/60 border border-white/10 group-hover:border-amber-400/50 flex items-center justify-center text-amber-400 flex-shrink-0 transition-colors">
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wide group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

          </div>

        </div>
      </div>

    </section>
  );
}
