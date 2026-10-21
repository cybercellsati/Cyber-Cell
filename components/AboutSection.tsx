"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Cpu,
  Zap,
  Users,
  Flame,
  Sparkles,
} from "lucide-react";
import CinematicTelemetry from "@/components/CinematicTelemetry";
import DefenseArchitecture from "@/components/DefenseArchitecture";

export default function AboutSection() {
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
          SECTION 1: CINEMATIC 3D SATELLITE & PARTICLE TELEMETRY (1:1 with Reference)
          Features:
          - Dark immersive 3D satellite & earth particle constellation backdrop
          - Animated golden amber & electric blue canvas particle formations
          - "OPERATIONAL" (White bold) + "TELEMETRY" (Hollow golden amber stroke)
          - Overlaid HUD callout pins with radar pulses (SATI NETWORK, CYBER CELL)
          - 4-column horizontal bottom telemetry metrics bar
         ========================================================================= */}
      <CinematicTelemetry />

      {/* =========================================================================
          SECTION 2: 3D PARTICLE SPACECRAFT DEFENSE ARCHITECTURE (1:1 with Reference)
          Features:
          - Authentic golden amber & electric blue particle spacecraft
          - Animated thruster exhaust jet bubbles, zero-G plasma orbs & orbital beacons
          - 3D levitation & mouse parallax tilt physics
          - Institutional charter typography & glowing solid white pill CTA
         ========================================================================= */}
      <DefenseArchitecture />

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

              {pillars.map((step) => (
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

              {capabilities.map((item) => {
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
