"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cloud, Box, Terminal, Flag, ArrowUpRight, ArrowRight, Shield, BookOpen } from "lucide-react";

const curatedResources = [
  {
    id: "thm",
    name: "TryHackMe",
    category: "INTERACTIVE LABS",
    level: "Beginner to Pro",
    desc: "Browser-based hands-on rooms covering Linux, web exploitation, and red/blue teaming.",
    url: "https://tryhackme.com",
    icon: Cloud,
    tag: "Essential Starting Point",
  },
  {
    id: "portswigger",
    name: "PortSwigger Web Academy",
    category: "APPLICATION SECURITY",
    level: "All Levels",
    desc: "Free comprehensive security labs from the creators of Burp Suite, covering OWASP Top 10.",
    url: "https://portswigger.net/web-security",
    icon: Box,
    tag: "Gold Standard Web Sec",
  },
  {
    id: "otw",
    name: "OverTheWire Wargames",
    category: "SYSTEMS & CLI",
    level: "Foundational",
    desc: "SSH into remote wargames to learn Linux commands, privilege escalation, and binary basics.",
    url: "https://overthewire.org/wargames",
    icon: Terminal,
    tag: "Bandit CLI Drill",
  },
  {
    id: "picoctf",
    name: "PicoCTF by CMU",
    category: "COMPETITIVE WARGAMES",
    level: "Beginner Friendly",
    desc: "Gamified capture-the-flag competitions created by Carnegie Mellon University experts.",
    url: "https://picoctf.org",
    icon: Flag,
    tag: "Best for First-Years",
  },
];

export default function ResourceVault() {
  return (
    <section id="resources" className="relative py-20 sm:py-28 bg-[#030303] border-b border-white/[0.08] overflow-hidden select-none">
      
      {/* Background Subtle Amber Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.025),transparent_70%)] pointer-events-none" />

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
                CURATED KNOWLEDGE // VERIFIED PLATFORMS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              RESOURCES WORTH <span className="text-amber-400">YOUR FOCUS</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              Tested platforms recommended by Cyber Cell SATI mentors to accelerate hands-on training.
            </p>
          </div>

          <Link
            href="/resources"
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider relative pb-1 self-start sm:self-end"
          >
            <span>Browse Full Vault</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* 4 Luxury Minimalist Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {curatedResources.map((res, idx) => {
            const Icon = res.icon;
            return (
              <motion.a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative rounded-2xl p-5 sm:p-6 border border-white/[0.08] hover:border-amber-400/40 bg-gradient-to-b from-[#0b0905] via-[#070604] to-[#030201] hover:shadow-[0_15px_40px_rgba(245,158,11,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 group-hover:border-amber-400/50 flex items-center justify-center text-amber-400 transition-colors shadow-inner">
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Title & Category */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-amber-400/80 block">
                      {res.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white group-hover:text-amber-300 transition-colors">
                      {res.name}
                    </h3>
                  </div>

                  {/* Desc */}
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {res.desc}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-amber-400/90 font-bold">{res.tag}</span>
                  <span className="text-slate-500">{res.level}</span>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
