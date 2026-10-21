"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, X, Shield, ExternalLink, Sparkles } from "lucide-react";

export default function Hero() {
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsIntroOpen(false);
    };
    if (isIntroOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isIntroOpen]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-[46px] sm:pt-[62px] lg:pt-[70px] pb-8 overflow-hidden bg-[#030303] text-white select-none">
      
      {/* 1. Ambient Background Effects & Amber Halo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle orange radial core glow */}
        <div className="absolute top-[32%] sm:top-[30%] lg:top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full bg-amber-500/[0.04] blur-[140px] translate-y-[6px]" />
        
        {/* Fine amber halo ring centered behind head */}
        <div className="absolute top-[32%] sm:top-[30%] lg:top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[540px] lg:h-[540px] rounded-full border border-amber-500/25 shadow-[0_0_60px_rgba(245,158,11,0.06)] translate-y-[6px]" />

        {/* Subtle top & bottom gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* 2. Center Section: 3D Typography + 3D Cyborg Guardian */}
      <div className="relative flex-1 flex items-center justify-center w-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] my-auto translate-y-[6px]">
        
        {/* Layer A (Behind Cyborg): Giant Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 text-center px-4 -mt-16 sm:-mt-24 lg:-mt-28">
          <h1 className="flex flex-col items-center w-full">
            <span className="text-[58px] sm:text-[90px] md:text-[120px] lg:text-[148px] xl:text-[172px] font-extrabold tracking-[-0.04em] text-white/95 leading-[0.88] lowercase font-sans drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              — the future —
            </span>
            <span className="text-[50px] sm:text-[76px] md:text-[104px] lg:text-[130px] xl:text-[152px] font-extrabold tracking-[-0.04em] text-white/90 leading-[0.88] lowercase font-sans mt-0.5 sm:mt-1 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              of thinking
            </span>
          </h1>
        </div>

        {/* Layer B (In Front of Typography): Centered 3D Cyborg Guardian */}
        <div className="relative z-20 w-full flex justify-center items-end pointer-events-none -mt-4 sm:-mt-8 lg:-mt-10">
          <div className="relative w-[290px] sm:w-[420px] md:w-[540px] lg:w-[660px] xl:w-[740px] aspect-[1050/871] mx-auto">
            <Image
              src="/images/hero-cyborg-cutout.png"
              alt="Cyber Cell SATI Cyber Guardian"
              fill
              priority
              className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
              sizes="(max-width: 768px) 100vw, 740px"
            />
          </div>
        </div>

      </div>

      {/* 3. Foreground Content Grid (Left Story/Actions & Right Stats/Avatar) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-1 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
          
          {/* Left Column: Context, Tags, and CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-md">
              Cyber Cell is a student-driven cybersecurity initiative at{" "}
              <span className="text-white font-medium">Samrat Ashok Technological Institute (SATI), Vidisha</span>.
            </p>

            {/* Tags */}
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wider text-slate-300 bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                Technology
              </span>
              <span className="px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wider text-slate-300 bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                Cybersecurity
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {/* Explore Domains CTA (White Solid Pill) */}
              <Link
                href="/domains"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-200 text-black font-bold text-xs font-sans tracking-wide transition-all duration-200 shadow-md shadow-white/10 active:scale-95"
              >
                <span>Explore Domains</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Watch Intro (Circular Outline Button) */}
              <button
                type="button"
                onClick={() => setIsIntroOpen(true)}
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-black/40 hover:bg-white/[0.06] hover:border-white/30 text-xs font-sans text-slate-300 hover:text-white transition-all duration-200 active:scale-95"
              >
                <span className="w-6 h-6 rounded-full border border-amber-500/60 bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </span>
                <span>Watch Intro</span>
              </button>
            </div>
          </div>

          {/* Right Column: Mini Avatar & Dual Cyber HUD Stat Cards */}
          <div className="lg:col-span-6 flex flex-col items-start lg:items-end gap-3.5">
            
            {/* Small Cyber Helmet Avatar in HUD Frame */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-black/60 border border-white/10 backdrop-blur-md group">
              <Image
                src="/images/hero-cyborg-avatar.jpg"
                alt="Cyber Cell SATI Cyber Sentinel"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Orange HUD Bracket Corners */}
              <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-amber-500" />
              <span className="absolute top-1 right-1 w-2 h-2 border-t border-r border-amber-500" />
              <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-amber-500" />
              <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-amber-500" />
            </div>

            {/* 2 HUD Stat Cards Side by Side */}
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              
              {/* Stat 1: 300+ Active Members */}
              <div className="relative flex-1 sm:w-36 p-3.5 rounded-lg bg-black/50 border border-white/[0.08] backdrop-blur-md">
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-500" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                  300+
                </div>
                <div className="text-[11px] font-sans text-slate-400 font-normal leading-tight">
                  Active Members
                </div>
              </div>

              {/* Stat 2: 98% Community Engagement */}
              <div className="relative flex-1 sm:w-36 p-3.5 rounded-lg bg-black/50 border border-white/[0.08] backdrop-blur-md">
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-500" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                  98%
                </div>
                <div className="text-[11px] font-sans text-slate-400 font-normal leading-tight">
                  Community Engagement
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 4. Bottom Partner / Community Section */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 border-t border-white/[0.05]">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-mono tracking-[0.28em] text-slate-500 uppercase select-none">
            OUR COMMUNITY
          </span>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 text-slate-400">
            
            {/* HackTheBox */}
            <div className="flex items-center gap-2 group hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-400 shrink-0" fill="currentColor">
                <path d="M11.996 0a1.119 1.119 0 0 0-.56.152L2.56 5.275a1.12 1.12 0 0 0-.56.97v11.51c0 .402.215.772.56.97l8.876 5.123c.174.1.368.152.56.152.193 0 .387-.052.56-.152l8.877-5.123a1.12 1.12 0 0 0 .56-.97V6.245a1.12 1.12 0 0 0-.56-.97L12.557.152A1.123 1.123 0 0 0 11.996 0zm0 2.298l7.587 4.38-3.14 1.813-7.587-4.38 3.14-1.813zm-8.876 5.12l7.588 4.381v8.761l-7.588-4.38V7.418zm17.753 0v8.762l-7.588 4.38V11.8l7.588-4.381z"/>
              </svg>
              <span className="font-semibold text-xs sm:text-sm tracking-wide">HackTheBox</span>
            </div>

            {/* TryHackMe */}
            <div className="flex items-center gap-2 group hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400 shrink-0" fill="currentColor">
                <path d="M10.74 0c-.26 0-.52.08-.73.23L1.08 6.55A1.33 1.33 0 0 0 .4 7.68v8.64c0 .46.24.88.64 1.12l8.93 5.34c.4.24.9.24 1.3 0l8.93-5.34c.4-.24.64-.66.64-1.12V7.68c0-.46-.24-.88-.64-1.13L11.47.23a1.36 1.36 0 0 0-.73-.23zm-.06 2.65l6.76 4.7-6.76 4.7-6.76-4.7 6.76-4.7zm-7.6 6.32l6.28 4.36v7.38l-6.28-3.76V8.97zm15.2 0v7.98l-6.28 3.76v-7.38l6.28-4.36z" />
              </svg>
              <span className="font-semibold text-xs sm:text-sm tracking-wide">TryHackMe</span>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-2 group hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white shrink-0" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span className="font-semibold text-xs sm:text-sm tracking-wide">GitHub</span>
            </div>

            {/* Google Cloud */}
            <div className="flex items-center gap-2 group hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-sky-400 shrink-0" fill="currentColor">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
              </svg>
              <span className="font-semibold text-xs sm:text-sm tracking-wide">Google Cloud</span>
            </div>

            {/* OWASP */}
            <div className="flex items-center gap-2 group hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400 shrink-0" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.52-3.1 8.76-7 9.88-3.9-1.12-7-5.36-7-9.88V6.3l7-3.12zM11 7v6h2V7h-2zm0 8v2h2v-2h-2z"/>
              </svg>
              <span className="font-semibold text-xs sm:text-sm tracking-wide">OWASP</span>
            </div>

          </div>
        </div>
      </div>

      {/* 5. Interactive "Watch Intro" Video Modal */}
      {isIntroOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setIsIntroOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-[#090d16] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  Orientation Video
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Cyber Cell SATI — Introduction
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsIntroOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player / Showcase Screen */}
            <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex flex-col items-center max-w-lg space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    Official Orientation & Induction Reel
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Explore live CTF challenge walk-throughs, campus lab privileges, faculty mentorship, and ethical defense squads at SATI Vidisha.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    href="/domains"
                    onClick={() => setIsIntroOpen(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
                  >
                    <span>Explore 5 Tracks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setIsIntroOpen(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-xs font-mono transition-colors"
                  >
                    <span>Read Club Charter</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-black/60 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Samrat Ashok Technological Institute (SATI), Vidisha</span>
              <span className="text-amber-400/90">Curiosity Today. A Safer Tomorrow.</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
