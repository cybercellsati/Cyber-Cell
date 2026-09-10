import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-[#06080d]">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: High-Quality Editorial Copy (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left z-10">
            
            {/* Eyebrow matching reference: STUDENTS | TECHNOLOGY | SECURITY | A BETTER TOMORROW */}
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-mono tracking-[0.18em] text-slate-400 uppercase mb-5 select-none">
              <span>STUDENTS</span>
              <span className="text-slate-600 font-light">|</span>
              <span>TECHNOLOGY</span>
              <span className="text-slate-600 font-light">|</span>
              <span>SECURITY</span>
              <span className="text-slate-600 font-light">|</span>
              <span className="text-slate-300">A BETTER TOMORROW</span>
            </div>

            {/* Main Headline: Curiosity Today. A Safer Tomorrow. */}
            <h1 className="text-5xl sm:text-6xl xl:text-[72px] font-extrabold tracking-tight text-white leading-[1.03] mb-6">
              Curiosity<br />
              Today.<br />
              <span className="text-white">A Safer</span><br />
              <span className="text-slate-200">Tomorrow.</span>
            </h1>

            {/* Supporting Copy matching SATI Vidisha context */}
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-lg mb-9">
              Cyber Cell is a student-driven cybersecurity initiative under the{" "}
              <span className="text-white font-medium">Central Coding Club at Samrat Ashok Technological Institute, Vidisha</span>.
            </p>

            {/* CTAs matching reference: Sky-Blue "Join Us ->" and Outline "Explore Events" */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/join"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#70b0fc] hover:bg-[#86bdfd] text-[#080d1a] font-semibold text-sm transition-all duration-200 shadow-sm active:scale-[0.98]"
              >
                <span>Join Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-black/40 hover:bg-white/[0.06] hover:border-white/40 text-white font-medium text-sm transition-all duration-200 active:scale-[0.98]"
              >
                <span>Explore Events</span>
              </Link>
            </div>

            {/* Bottom Sub-tagline matching reference: — LEARN PRACTICE BUILD COMPETE SECURE */}
            <div className="flex items-center gap-3 text-[11px] sm:text-xs font-mono tracking-[0.2em] text-slate-400 select-none">
              <span className="w-5 h-[1.5px] bg-slate-500 rounded-full inline-block" />
              <span className="text-slate-300">LEARN</span>
              <span className="text-slate-400">PRACTICE</span>
              <span className="text-slate-400">BUILD</span>
              <span className="text-slate-400">COMPETE</span>
              <span className="text-slate-400">SECURE</span>
            </div>

          </div>

          {/* Right Column: High-Fidelity Photorealistic Lab Visual (6 cols) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            <div className="relative w-full aspect-[674/409] rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0c1018] shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
              
              <Image
                src="/images/hero-desk-v2.png"
                alt="Cyber Cell SATI realistic cybersecurity workstation with laptop and research notes"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 650px"
              />

              {/* Subtle Vignette & Left Gradient Fade for Seamless Composition */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#06080d]/40 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080d]/50 via-transparent to-transparent pointer-events-none" />

              {/* Subtle top subtle border highlight */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
