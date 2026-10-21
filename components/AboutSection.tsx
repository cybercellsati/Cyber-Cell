"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Terminal, Users, ShieldCheck, Compass, Sparkles } from "lucide-react";

export default function AboutSection() {
  const pillars = [
    {
      index: "01",
      icon: Terminal,
      title: "Hands-on Cyber Ranges",
      desc: "Live adversary simulations, isolated attack-defense sandboxes, and competitive CTF challenges.",
      stat: "100% Practical Labs",
    },
    {
      index: "02",
      icon: Users,
      title: "Collaborative Intel",
      desc: "A brotherhood of student security researchers and developers sharing tools, writeups, and mentoring.",
      stat: "300+ Active Network",
    },
    {
      index: "03",
      icon: ShieldCheck,
      title: "Defensive & Ethical Code",
      desc: "Strictly authorized security research, vulnerability mitigation, and creating a resilient campus web.",
      stat: "Institutional Standard",
    },
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#030303] border-b border-white/[0.08] overflow-hidden select-none">
      
      {/* Background Subtle Amber Atmospheric Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Top Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-amber-400 uppercase">
            INSTITUTIONAL CHARTER &bull; SATI VIDISHA
          </span>
        </div>

        {/* 2-Column Split: Mission & Campus Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-14">
          
          {/* Left: Editorial Mission & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              Engineering Defense. <br />
              <span className="text-amber-400">Inspiring Curiosity.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
              Cyber Cell is the official cybersecurity community and technical defense body at{" "}
              <span className="text-white font-medium">Samrat Ashok Technological Institute (SATI), Vidisha</span>.
              We bridge academic computer science and modern offensive-defensive engineering through continuous hands-on labs, 
              wargames, and real-world security education.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold text-white hover:text-amber-300 uppercase tracking-wider relative pb-1"
              >
                <span>Read Full Club Charter &amp; Leadership</span>
                <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-400/40 group-hover:bg-amber-400 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Right: Dusk Campus Architecture Frame with HUD Badges */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[28px] overflow-hidden border border-amber-400/30 bg-[#070707] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="/images/about-campus-dusk.png"
                  alt="SATI Campus dusk architectural view"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 550px"
                  priority
                />
                
                {/* Edge Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top HUD Frame Coordinates */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono text-slate-300 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15">
                    23.53° N, 77.81° E
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/40 text-amber-300 flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>SATI CAMPUS</span>
                  </span>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block">
                      OPERATIONAL HEADQUARTERS
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      Central Computer Center (CCC)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">EST. 2026</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================
            3 REFINED LUXURY MINIMALIST PILLARS CARDS
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl p-6 sm:p-7 border border-white/[0.08] hover:border-amber-400/40 bg-gradient-to-b from-[#090704] to-[#040302] hover:shadow-[0_15px_40px_rgba(245,158,11,0.08)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Card Header: Icon & Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-black/60 border border-white/10 group-hover:border-amber-400/50 flex items-center justify-center text-amber-400 transition-colors shadow-inner">
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>

                    <span className="text-xs font-mono font-black text-white/30 group-hover:text-amber-400/60 transition-colors">
                      {pillar.index}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white group-hover:text-amber-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Stat Pill */}
                <div className="pt-5 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-amber-400/90 font-bold">{pillar.stat}</span>
                  <span className="text-slate-500">Verified Charter</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}