"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Shield,
  Terminal,
  Flag,
  Calendar,
  CheckCircle2,
  Sparkles,
  Quote,
  Cpu,
} from "lucide-react";

export default function ProjectsSection() {
  const newsItems = [
    {
      id: "exploit-workshop",
      category: "FIELD WORKSHOP",
      date: "16 OCT 2026",
      status: "DECLASSIFIED RECAP",
      title: "EXPLOIT: Intro to the Cyber Range",
      desc: "160+ first-year cadets introduced to isolated Linux command lines, network auditing, and hands-on jeopardy CTFs at SATI.",
      image: "/images/event-exploit-workshop.png",
      link: "/events",
      linkText: "Read Field Report",
    },
    {
      id: "sentinel-scan",
      category: "OPEN SOURCE TOOL",
      date: "OCT 2026",
      status: "CAMPUS DEPLOYED",
      title: "SentinelScan Recon Engine v2.0",
      desc: "Asynchronous subnet reconnaissance and open-port auditor engineered by SATI students for high-speed campus threat audits.",
      image: "/images/projects-hero-planet.png",
      link: "/projects",
      linkText: "Inspect Source Code",
    },
    {
      id: "campus-ctf",
      category: "UPCOMING WARGAME",
      date: "NOV 2026",
      status: "ACTIVE INTEL",
      title: "Campus Jeopardy CTF 2026",
      desc: "24-hour inter-branch security wargame featuring memory corruption, web exploitation, and cryptography flag extraction.",
      image: "/images/ethical-hacking-featured.png",
      link: "/events",
      linkText: "View Range Briefing",
    },
  ];

  return (
    <section id="projects" className="relative py-20 sm:py-28 bg-[#030303] border-b border-white/[0.08] overflow-hidden select-none">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.025),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                INTELLIGENCE // DISPATCHES &amp; REPOSITORIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              FIELD REPORTS &amp; SPOTLIGHT
            </h2>
          </div>

          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider relative pb-1 self-start sm:self-end"
          >
            <span>Explore All Dispatches</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* =========================================================================
            SPLIT SECTION (Inspire by Section 5: Batman / Reviews on Left, News on Right)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Cadet & Leadership Mission Spotlight */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400">
              // LEADERSHIP &amp; CADET SPOTLIGHT
            </div>

            {/* Primary Spotlight Card: Founder & Convenor Quote */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#090805] via-[#050402] to-[#020201] border border-amber-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
              {/* Amber Corner Brackets */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-400" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-400" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-400" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-400" />

              <div className="space-y-4">
                <Quote className="w-7 h-7 text-amber-400/40 group-hover:text-amber-400 transition-colors" />

                <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed italic">
                  &ldquo;Theoretical knowledge without execution is just an illusion of security. At Cyber Cell, 
                  we build engineers who understand computing down to the raw registers and wire packets.&rdquo;
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-amber-400/40 bg-black/60 flex-shrink-0">
                    <Image
                      src="/images/team/yash-harfode.png"
                      alt="Yash Harfode"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span>Yash Harfode</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-[11px] font-mono text-amber-400/80">
                      Founder &amp; Convenor
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      SATI Vidisha &bull; CSE Dept
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Cadet Feedback Card */}
            <div className="p-5 rounded-2xl bg-[#070707] border border-white/[0.08] space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="text-amber-400 font-bold uppercase tracking-wider">EXPLOIT 2026 CADET FEEDBACK</span>
                <span>VERIFIED PARTICIPANT</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                &ldquo;Getting hands-on with live Linux terminals in the CCC lab gave me real confidence. 
                I never realized breaking web authentication could be understood this systematically.&rdquo;
              </p>
              <div className="text-[11px] font-mono text-slate-500">
                &mdash; First-Year CSE Cadet &bull; SATI Vidisha
              </div>
            </div>

          </motion.div>

          {/* Right Column: News & Field Reports ("НАШИ НОВОСТИ" equivalent) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400">
              // DISPATCH ARCHIVE
            </div>

            {newsItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="group block rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#070707] via-[#050505] to-[#070707] border border-white/[0.08] hover:border-amber-400/50 hover:shadow-[0_10px_30px_rgba(245,158,11,0.06)] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                  
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-32 h-24 sm:h-20 rounded-xl overflow-hidden bg-black border border-white/10 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="130px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/25 font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {item.date}
                      </span>
                      <span className="text-emerald-400 font-bold ml-auto hidden sm:inline-block">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors uppercase tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-amber-400/50 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all flex-shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>

                </div>
              </Link>
            ))}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
