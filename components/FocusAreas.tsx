"use client";

import React, { useState } from "react";
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
  CheckCircle2
} from "lucide-react";

// Custom SVG for Network Nodes matching reference
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

// Custom SVG for Digital Forensics Fingerprint matching reference
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

  const getDomain = (id: string) => focusAreas.find((d) => d.id === id) || focusAreas[0];
  const ethicalHacking = getDomain("ethical-hacking");

  const orbitDomains = [
    {
      id: "web-security",
      name: "Web Security",
      desc: "Secure modern web applications.",
      icon: Code2,
      data: getDomain("web-security")
    },
    {
      id: "network-security",
      name: "Network Security",
      desc: "Understand and defend network infrastructure.",
      icon: NetworkIcon,
      data: getDomain("network-security")
    },
    {
      id: "digital-forensics",
      name: "Digital Forensics",
      desc: "Investigate, analyze and recover evidence.",
      icon: FingerprintIcon,
      data: getDomain("digital-forensics")
    },
    {
      id: "malware-analysis",
      name: "Malware Analysis",
      desc: "Analyze and understand malicious software.",
      icon: Bug,
      data: getDomain("malware-analysis")
    },
    {
      id: "ctf-competitions",
      name: "CTF & Research",
      desc: "Apply skills in real challenges and research.",
      icon: Flag,
      data: getDomain("ctf-competitions")
    }
  ];

  return (
    <section id="domains" className="relative py-20 lg:py-28 bg-[#030303] border-b border-white/[0.08] overflow-hidden">
      {/* Background Subtle Amber Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(245,158,11,0.03),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-amber-400 uppercase">
                CURRICULUM / FOCUS AREAS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Explore the <span className="text-slate-400">attack surface.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 font-light">
              Build practical skills across the security landscape.
            </p>
          </div>

          <Link
            href="/domains"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors relative pb-1 self-start sm:self-end"
          >
            <span>Explore all domains</span>
            <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-400/40 group-hover:bg-amber-400 transition-colors" />
          </Link>
        </div>

        {/* Featured Domain Card: Ethical Hacking */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#070707]/90 backdrop-blur-md overflow-hidden mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="p-7 sm:p-10 md:col-span-6 lg:col-span-7 flex flex-col justify-center z-10">
              <span className="text-[11px] font-mono tracking-[0.2em] text-slate-400 uppercase font-semibold mb-3 block">
                FEATURED DOMAIN
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Ethical Hacking
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed mb-6 font-light">
                Learn to identify, exploit, and secure real-world vulnerabilities through hands-on practice.
              </p>
              
              <div>
                <button
                  onClick={() => setSelectedDomain(ethicalHacking)}
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-amber-400 transition-colors relative pb-1"
                >
                  <span>Explore Domain</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-400/40 group-hover:bg-amber-400 transition-colors" />
                </button>
              </div>
            </div>

            {/* Right Visual: Amber Laptop on dark rocky terrain */}
            <div className="md:col-span-6 lg:col-span-5 relative w-full h-52 sm:h-64 md:h-full min-h-[220px] flex items-center justify-end overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/images/ethical-hacking-featured.png"
                  alt="Ethical Hacking security terminal"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                {/* Gradient fade to blend left side */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-transparent to-transparent hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent md:hidden" />
              </div>
            </div>

          </div>
        </div>

        {/* 5 Circular Domain Orbs (Orbital Layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start justify-center">
          {orbitDomains.map((domain) => {
            const Icon = domain.icon;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.data)}
                className="flex flex-col items-center text-center group transition-all duration-300 focus:outline-none"
              >
                {/* Outer Circular Node with Orbital Ring & Satellite Dot */}
                <div className="relative mb-4 flex items-center justify-center">
                  {/* Subtle outer orbital ring */}
                  <div className="absolute -inset-2.5 rounded-full border border-white/[0.08] group-hover:border-amber-400/40 transition-colors duration-500 pointer-events-none" />
                  
                  {/* Satellite amber dot */}
                  <div className="absolute top-0 right-1 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)] transition-transform duration-500 group-hover:scale-125" />

                  {/* Main circular glass orb */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/[0.12] bg-[radial-gradient(circle_at_35%_35%,rgba(245,158,11,0.12),rgba(8,8,8,0.98))] shadow-[inset_0_2px_8px_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-center text-white group-hover:text-amber-400 group-hover:border-amber-400/50 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all duration-300">
                    <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-amber-400 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors tracking-tight">
                  {domain.name}
                </h4>

                {/* Subtitle */}
                <p className="text-[11px] sm:text-xs text-slate-400 mt-1 max-w-[150px] leading-snug">
                  {domain.desc}
                </p>

                {/* Subtle Amber Underline */}
                <span className="w-6 h-[1.5px] bg-amber-400/40 group-hover:bg-amber-400 group-hover:w-10 transition-all duration-300 mt-2 block" />
              </button>
            );
          })}
        </div>

      </div>

      {/* Interactive Detail Modal (Preserves Full Syllabus & Topic Data) */}
      {selectedDomain && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedDomain(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#080808] border border-white/15 rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 font-semibold uppercase">
                  {selectedDomain.level} Track
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">
                  {selectedDomain.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedDomain.shortDesc}
                </p>
              </div>
              <button
                onClick={() => setSelectedDomain(null)}
                className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Syllabus Topics */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Key Topics Covered
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDomain.coreTopics.map((t, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs text-slate-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Toolchain */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                Tools & Frameworks
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDomain.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Cyber Cell SATI Vidisha Curriculum
              </span>
              <Link
                href="/domains"
                onClick={() => setSelectedDomain(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-amber-400 text-black hover:bg-amber-300 transition-colors shadow-[0_0_15px_rgba(251,191,36,0.3)]"
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
