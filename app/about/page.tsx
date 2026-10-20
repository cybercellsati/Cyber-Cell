"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Compass, Lock, Users, Terminal, CheckCircle2, ChevronRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 overflow-hidden">
        
        {/* ========================================================
            SECTION 1: HERO "ABOUT US" WITH LAYERED PHOTOS
           ======================================================== */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-16 lg:pb-24">
          
          {/* Eyebrow: — WHO WE ARE / CYBERSECURITY COMMUNITY */}
          <div className="flex items-center gap-2 mb-8 sm:mb-12">
            <span className="w-5 h-[2px] bg-amber-400 inline-block" />
            <div className="flex flex-col text-[10.5px] font-mono tracking-[0.2em] text-slate-400 uppercase leading-tight select-none">
              <span className="text-amber-400 font-semibold">WHO WE ARE</span>
              <span className="text-slate-500">CYBERSECURITY COMMUNITY</span>
            </div>
          </div>

          {/* Interactive Visual Canvas: 3 Photos + Giant "about us" Layer */}
          <div className="relative w-full min-h-[340px] sm:min-h-[460px] lg:min-h-[540px] flex flex-col justify-end">
            
            {/* Top 3 Photos Grid / Positions */}
            <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[360px] pointer-events-none">
              
              {/* Photo 1: Students collaborating in lab (Left-Center) */}
              <div className="absolute left-[4%] sm:left-[10%] lg:left-[15%] top-0 w-36 sm:w-52 lg:w-64 aspect-[4/3] rounded-lg overflow-hidden border border-white/15 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-10 pointer-events-auto group">
                <Image
                  src="/images/about-students.png"
                  alt="SATI Students collaborating in cybersecurity lab"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Crosshair Top-Left */}
                <span className="absolute -top-2.5 -left-2.5 text-xs text-amber-400 font-mono select-none">+</span>
                
                {/* Micro Label */}
                <div className="absolute -right-20 top-2 hidden xl:flex flex-col text-[8.5px] font-mono tracking-widest text-slate-500 uppercase leading-tight select-none">
                  <span>STUDENTS</span>
                  <span>LEARNING</span>
                  <span className="text-slate-400">TOGETHER</span>
                </div>
              </div>

              {/* Photo 2: Close-up of code on laptop (Center) */}
              <div className="absolute left-[36%] sm:left-[42%] lg:left-[44%] top-4 sm:top-6 w-44 sm:w-64 lg:w-80 aspect-[16/10] rounded-lg overflow-hidden border border-white/15 bg-black/60 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-20 pointer-events-auto group">
                <Image
                  src="/images/about-coding.png"
                  alt="Hands typing cybersecurity exploit script on terminal"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="340px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Crosshair Accent */}
                <span className="absolute -top-2.5 -right-2.5 text-xs text-slate-400 font-mono select-none">+</span>

                {/* Micro Label */}
                <div className="absolute -right-20 top-2 hidden xl:flex flex-col text-[8.5px] font-mono tracking-widest text-slate-500 uppercase leading-tight select-none">
                  <span>PRACTICE</span>
                  <span>EXPLORE</span>
                  <span>BREAK</span>
                  <span className="text-slate-400">LEARN</span>
                </div>
              </div>

              {/* Photo 3: SATI Vidisha campus facade (Right) */}
              <div className="absolute right-[2%] sm:right-[6%] lg:right-[8%] top-8 sm:top-10 w-40 sm:w-56 lg:w-72 aspect-[4/3] rounded-lg overflow-hidden border border-white/15 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-10 pointer-events-auto group">
                <Image
                  src="/images/about-campus.png"
                  alt="SATI Vidisha campus engineering building"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="300px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Cyber Frame Box Accents */}
                <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-amber-500" />
                <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-amber-500" />

                {/* Micro Label */}
                <div className="absolute -right-16 top-6 hidden xl:flex flex-col text-[8.5px] font-mono tracking-widest text-slate-500 uppercase leading-tight select-none">
                  <span>A SAFER</span>
                  <span>DIGITAL</span>
                  <span className="text-slate-400">TOMORROW</span>
                </div>
              </div>

            </div>

            {/* Giant Overlapping Typography: "about us" */}
            <div className="relative z-30 w-full text-center sm:text-left select-none -mt-16 sm:-mt-24 lg:-mt-32 pointer-events-none">
              <h1 className="text-[76px] sm:text-[130px] md:text-[170px] lg:text-[220px] xl:text-[256px] font-extrabold tracking-[-0.05em] text-white lowercase leading-[0.82] drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
                about us
              </h1>
            </div>

          </div>

          {/* Context Narrative Block Below "about us" */}
          <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 sm:pt-12 border-t border-white/[0.08]">
            
            {/* Left Tag: CYBER CELL / SATI VIDISHA */}
            <div className="lg:col-span-2 hidden lg:flex items-start gap-2 text-[10.5px] font-mono tracking-widest text-slate-400 uppercase select-none">
              <span className="w-1.5 h-6 bg-amber-400 inline-block shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-white font-bold">CYBER CELL</span>
                <span className="text-slate-500">SATI VIDISHA</span>
              </div>
            </div>

            {/* Middle Main Headline Statement */}
            <div className="lg:col-span-5">
              <p className="text-lg sm:text-2xl lg:text-[26px] font-bold text-white leading-snug tracking-tight">
                We are a student-driven cybersecurity community building safer systems through learning, practice, and collaboration.
              </p>
            </div>

            {/* Right Detailed Narrative (separated by vertical line) */}
            <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-8">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Cyber Cell at SATI Vidisha brings together students passionate about cybersecurity to explore ethical hacking, web security, digital forensics, network defense, and secure development. We learn, build, and grow together through hands-on practice, workshops, CTFs, and real-world projects to create a safer digital future.
              </p>
            </div>

            {/* Far Right Accent List */}
            <div className="lg:col-span-1 hidden xl:flex flex-col text-[10px] font-mono tracking-[0.22em] text-slate-500 uppercase leading-[1.8] select-none border-l border-white/10 pl-4">
              <span className="text-slate-400">LEARN</span>
              <span>PRACTICE</span>
              <span>BUILD</span>
              <span>COMPETE</span>
              <span className="text-amber-400">SECURE</span>
            </div>

          </div>

        </section>


        {/* ========================================================
            SECTION 2: "OUR PROCESS" INTERACTIVE ROADMAP (01 TO 04)
           ======================================================== */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 lg:pt-24 pb-16">
          
          {/* Eyebrow & Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16 sm:mb-24">
            
            <div className="lg:col-span-7 space-y-3">
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-5 h-[2px] bg-amber-400 inline-block" />
                <span className="text-[11px] font-mono tracking-[0.22em] text-amber-400 uppercase font-semibold">
                  OUR PROCESS
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-white uppercase tracking-tight leading-none">
                FROM CURIOSITY<br />
                <span className="text-white">TO A SAFER TOMORROW.</span>
              </h2>
            </div>

            {/* Sub-narrative */}
            <div className="lg:col-span-5">
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                A continuous journey of learning, practicing, collaborating, and building practical solutions for real-world security challenges.
              </p>
            </div>

          </div>

          {/* S-Curving Roadmap Canvas */}
          <div className="relative w-full min-h-[580px] lg:min-h-[660px]">
            
            {/* SVG Glowing Yellow Curving Ribbon Path (Desktop) */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 640"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="yellowGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#facc15" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* S-curve path connecting 01 -> 02 -> 03 -> 04 */}
                <path
                  d="M 390 90 C 560 90, 680 140, 710 240 C 740 330, 480 390, 315 440 C 200 480, 520 540, 780 575"
                  stroke="#facc15"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  filter="url(#yellowGlow)"
                  className="opacity-80"
                />

                {/* Arrow at end */}
                <polygon
                  points="782,572 792,575 782,578"
                  fill="#facc15"
                />
              </svg>
            </div>

            {/* 4 Process Checkpoints Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 lg:h-[640px]">
              
              {/* CHECKPOINT 01: LEARN (Top-Left) */}
              <div className="lg:absolute lg:left-[22%] lg:top-[50px] max-w-sm group">
                {/* Watermark 01 */}
                <span className="absolute -top-10 -left-6 text-[88px] sm:text-[110px] font-extrabold text-white/[0.03] select-none pointer-events-none leading-none">
                  01
                </span>

                <div className="relative flex items-start gap-4">
                  {/* Glowing Node Dot */}
                  <div className="relative mt-1 shrink-0">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400 block shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                    <span className="w-6 h-6 rounded-full border border-amber-400/40 absolute -top-1.5 -left-1.5 animate-ping opacity-30" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold">
                      <span className="text-amber-400 font-mono">01.</span>{" "}
                      <span className="text-white">LEARN</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Start with the fundamentals. Explore core concepts through structured resources and guided labs.
                    </p>
                  </div>
                </div>
              </div>

              {/* CHECKPOINT 02: PRACTICE (Middle-Right) */}
              <div className="lg:absolute lg:right-[8%] lg:top-[200px] max-w-sm group">
                {/* Watermark 02 */}
                <span className="absolute -top-10 -left-6 text-[88px] sm:text-[110px] font-extrabold text-white/[0.03] select-none pointer-events-none leading-none">
                  02
                </span>

                <div className="relative flex items-start gap-4">
                  {/* Glowing Node Dot */}
                  <div className="relative mt-1 shrink-0">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400 block shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold">
                      <span className="text-amber-400 font-mono">02.</span>{" "}
                      <span className="text-white">PRACTICE</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Apply your knowledge with hands-on security exercises, labs, and real-world tools.
                    </p>
                  </div>
                </div>
              </div>

              {/* CHECKPOINT 03: COLLABORATE (Lower-Left) */}
              <div className="lg:absolute lg:left-[16%] lg:top-[390px] max-w-sm group">
                {/* Watermark 03 */}
                <span className="absolute -top-10 -left-6 text-[88px] sm:text-[110px] font-extrabold text-white/[0.03] select-none pointer-events-none leading-none">
                  03
                </span>

                <div className="relative flex items-start gap-4">
                  {/* Glowing Node Dot */}
                  <div className="relative mt-1 shrink-0">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400 block shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold">
                      <span className="text-amber-400 font-mono">03.</span>{" "}
                      <span className="text-white">COLLABORATE</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Take part in CTFs, workshops and peer learning. Work with like-minded students across domains.
                    </p>
                  </div>
                </div>
              </div>

              {/* CHECKPOINT 04: BUILD & SECURE (Bottom-Right) */}
              <div className="lg:absolute lg:right-[6%] lg:top-[535px] max-w-sm group">
                {/* Watermark 04 */}
                <span className="absolute -top-10 -left-6 text-[88px] sm:text-[110px] font-extrabold text-white/[0.03] select-none pointer-events-none leading-none">
                  04
                </span>

                <div className="relative flex items-start gap-4">
                  {/* Glowing Node Dot */}
                  <div className="relative mt-1 shrink-0">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400 block shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold">
                      <span className="text-amber-400 font-mono">04.</span>{" "}
                      <span className="text-white">BUILD & SECURE</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Build impactful projects, contribute to open-source, and develop solutions for a safer digital world.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* ========================================================
            SECTION 3: INSTITUTIONAL CHARTER & SQUADS OVERVIEW
           ======================================================== */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: SATI Institutional Anchor */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/[0.08] hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Institutional Heritage
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Operating at Samrat Ashok Technological Institute (SATI), Vidisha (M.P.), Cyber Cell empowers engineering students with practical defensive computing and systems security expertise.
                </p>
              </div>

              <div className="pt-2 text-[11px] font-mono text-amber-400 flex items-center gap-1.5">
                <span>Central Computer Center (CCC)</span>
              </div>
            </div>

            {/* Card 2: Ethical Defense Mindset */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/[0.08] hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Strict Ethical Defense Charter
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  All techniques, penetration exercises, and vulnerability assessments operate exclusively within strictly authorized lab sandboxes, adhering to legal guidelines and institutional integrity.
                </p>
              </div>

              <div className="pt-2 text-[11px] font-mono text-amber-400 flex items-center gap-1.5">
                <span>Responsible Disclosure Focus</span>
              </div>
            </div>

            {/* Card 3: 5 Specialization Squads */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/[0.08] hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Active Research Squads
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Members specialize across 5 primary operational tracks: Offensive Security (Red Team), Defensive Security (Blue Team), Competitive CTF Squad, Cloud & DevSecOps, and Cyber Awareness.
                </p>
              </div>

              <Link
                href="/domains"
                className="pt-2 text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1.5 group/link"
              >
                <span>Explore Domain Tracks</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Bottom Action Strip */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-black/40 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-bold text-white">
                Ready to explore cybersecurity at SATI?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Check our official induction roadmap, offline recruitment process, or meet the core team.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-200 text-black font-bold text-xs font-sans transition-all duration-200 shadow-md shadow-white/5 active:scale-95"
              >
                <span>Induction Process</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/team"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-xs font-sans transition-all duration-200"
              >
                <span>Meet the Team</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
