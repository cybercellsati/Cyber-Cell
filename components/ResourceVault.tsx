"use client";

import React from "react";
import Link from "next/link";
import { Cloud, Box, Terminal, Flag, ArrowUpRight, ArrowRight } from "lucide-react";

const curatedResources = [
  {
    id: "thm",
    name: "TryHackMe",
    desc: "Hands-on security labs",
    url: "https://tryhackme.com",
    icon: Cloud
  },
  {
    id: "portswigger",
    name: "PortSwigger Academy",
    desc: "Web security training",
    url: "https://portswigger.net/web-security",
    icon: Box
  },
  {
    id: "otw",
    name: "OverTheWire",
    desc: "Linux and wargames",
    url: "https://overthewire.org/wargames",
    icon: Terminal
  },
  {
    id: "picoctf",
    name: "PicoCTF",
    desc: "Beginner-friendly CTFs",
    url: "https://picoctf.org",
    icon: Flag
  }
];

export default function ResourceVault() {
  return (
    <section id="resources" className="relative py-20 lg:py-24 bg-[#030303] border-b border-white/[0.08] overflow-hidden">
      {/* Background Subtle Amber Atmospheric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(245,158,11,0.02),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-amber-400 uppercase">
                CURATED KNOWLEDGE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Resources <span className="text-slate-400">worth your time.</span>
            </h2>
          </div>

          <Link
            href="/resources"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors relative pb-1 self-start sm:self-end"
          >
            <span>Browse all</span>
            <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-400/40 group-hover:bg-amber-400 transition-colors" />
          </Link>
        </div>

        {/* 4 Cards Grid matching Reference 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {curatedResources.map((res) => {
            const Icon = res.icon;
            return (
              <a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#070707]/80 border border-white/[0.08] hover:border-amber-400/40 hover:bg-[#0c0c0c] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] focus:outline-none"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Circular Icon Orb */}
                  <div className="w-11 h-11 rounded-full border border-white/[0.1] bg-white/[0.03] group-hover:border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.08)]">
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Title & Description */}
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      {res.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate font-light">
                      {res.desc}
                    </p>
                  </div>
                </div>

                {/* External Link Arrow */}
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
