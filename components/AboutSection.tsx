"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Users, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#030303] border-t border-b border-white/[0.08] overflow-hidden">
      {/* Background Subtle Amber Atmospheric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.04),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tag / Category Line with Amber Bar */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-amber-400 uppercase">
                ABOUT CYBER CELL
              </span>
            </div>

            {/* Editorial Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
              More Than a<br />
              Club<span className="text-amber-400">.</span>
            </h2>

            {/* Mission Statement */}
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl leading-relaxed mb-10">
              A student-led community building practical cybersecurity skills through learning, labs, and collaboration.
            </p>

            {/* Three Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {/* Highlight 1: Learn by doing */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/35 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.1] group-hover:border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.08)]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight mb-0.5 group-hover:text-amber-400 transition-colors">
                    Learn by doing
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-snug">
                    Hands-on skills and real-world tools.
                  </p>
                </div>
              </div>

              {/* Highlight 2: Build together */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/35 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.1] group-hover:border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.08)]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight mb-0.5 group-hover:text-amber-400 transition-colors">
                    Build together
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-snug">
                    Collaborate, share and grow.
                  </p>
                </div>
              </div>

              {/* Highlight 3: Think responsibly */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/35 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.1] group-hover:border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.08)]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight mb-0.5 group-hover:text-amber-400 transition-colors">
                    Think responsibly
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-snug">
                    Create a safer digital tomorrow.
                  </p>
                </div>
              </div>
            </div>

            {/* Discover Story Link */}
            <div>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white hover:text-amber-400 transition-colors relative pb-1"
              >
                <span>Discover our story</span>
                <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-400/30 group-hover:bg-amber-400 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Right Column: Dusk Campus Architecture Visual */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.1] bg-[#080808] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="/images/about-campus-dusk.png"
                  alt="SATI Campus dusk architectural view"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
                {/* Subtle Edge Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
