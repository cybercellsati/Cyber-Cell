import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Projects & Engineering | Cyber Cell SATI",
  description:
    "Open source tools, defensive utilities, CTF challenge authoring, and cybersecurity research developed by students of SATI.",
};

const upcomingTracks = [
  "SATI CTF Challenge Platform & Nargam Engine",
  "Campus Network Vulnerability Audit Scripts (Educational)",
  "Phishing Awareness & Simulation Portal",
  "Automated Log Analysis & Threat Intelligence Ingestor",
];

const policySteps = [
  {
    num: "01",
    title: "Clean Code & Ethics",
    desc: "All repositories must be strictly defensive, educational, or authorized security tooling with standard open-source licenses (MIT/Apache).",
  },
  {
    num: "02",
    title: "Peer Review",
    desc: "Projects must undergo technical code review by Cyber Cell leads before official inclusion in the organization showcase.",
  },
  {
    num: "03",
    title: "Documentation",
    desc: "Every project must provide comprehensive README setup instructions, architecture diagrams, and testing guide.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#030508] text-white flex flex-col font-sans selection:bg-amber-400/25 selection:text-white overflow-x-hidden">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col items-center pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 w-full relative">
        
        {/* 2. CINEMATIC HERO SECTION WITH PLANET ECLIPSE BACKGROUND */}
        <div className="relative w-full max-w-6xl mx-auto pt-8 sm:pt-12 pb-14 sm:pb-20">
          
          {/* Planet Eclipse Artwork Background on the Right */}
          <div className="absolute right-0 top-0 w-full sm:w-[540px] lg:w-[620px] h-[260px] sm:h-[320px] pointer-events-none select-none overflow-hidden z-0 opacity-90">
            <Image
              src="/images/projects-hero-planet.png"
              alt="Planet Eclipse Horizon"
              fill
              className="object-contain object-right"
              priority
            />
            {/* Subtle Gradient Blend towards bottom and left */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030508] via-transparent to-transparent sm:hidden pointer-events-none" />
          </div>

          {/* Foreground Hero Content Row */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-8">
            
            {/* Left HUD Bracket */}
            <div className="hidden lg:flex items-stretch gap-3 pt-2">
              <span className="w-[2px] bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] rounded-full" />
              <div className="flex flex-col text-[10px] font-mono tracking-[0.24em] text-slate-400 uppercase space-y-1">
                <span>BUILD</span>
                <span>RESEARCH</span>
                <span>AUTOMATE</span>
                <span>SECURE</span>
              </div>
            </div>

            {/* Center Editorial Title & Subtitle */}
            <div className="flex-1 max-w-2xl sm:pl-4 lg:pl-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-semibold tracking-[0.24em] text-amber-400 uppercase">
                  TECHNICAL REPOSITORIES
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                Projects &amp;<br />
                <span className="text-slate-400 font-extrabold">Engineering</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 font-light mt-4 max-w-xl leading-relaxed">
                Open source tools, defensive utilities, CTF challenge authoring, and cybersecurity research developed by students of SATI.
              </p>
            </div>

            {/* Right HUD Bracket */}
            <div className="hidden lg:flex items-stretch gap-3 self-center pr-4">
              <div className="flex flex-col text-[10px] font-mono tracking-[0.24em] text-slate-400 uppercase space-y-1 text-right">
                <span>STUDENT</span>
                <span>DRIVEN</span>
                <span>OPEN SOURCE</span>
              </div>
              <span className="w-[1.5px] bg-white/20 rounded-full" />
            </div>

          </div>

        </div>

        {/* 3. MAIN CARD: CURRENT STATUS & UPCOMING TRACKS */}
        <div className="w-full max-w-6xl mx-auto mb-8">
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#06080d]/90 backdrop-blur-md p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Ambient Subtle Amber Arc in Top-Right */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left Column: Current Status & Button */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.24em] text-slate-400 uppercase font-semibold mb-3 block">
                    CURRENT STATUS
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-4">
                    Projects are currently<br />
                    being developed.
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-8 max-w-lg">
                    Check back soon. Student development groups at Cyber Cell SATI are working on vulnerability scanners, packet dissection tools, and challenge containers.
                  </p>
                </div>

                <div>
                  <Link
                    href="/join"
                    className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/15 hover:border-amber-400/50 text-xs sm:text-sm font-medium text-white transition-all shadow-sm"
                  >
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Recruitment &amp; Working Group Info (Closed)</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Upcoming Project Tracks List */}
              <div className="lg:col-span-5 lg:border-l lg:border-white/[0.08] lg:pl-10">
                {/* Header with concentric circle icon */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-5 h-5 rounded-full border border-amber-400 flex items-center justify-center text-amber-400 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                  </div>
                  <span className="text-xs font-mono font-semibold tracking-[0.2em] text-amber-400 uppercase">
                    UPCOMING PROJECT TRACKS
                  </span>
                </div>

                {/* 4 Connected Tracks */}
                <div className="relative pl-1 space-y-5">
                  {/* Subtle connecting vertical line */}
                  <div className="absolute left-[7px] top-2 bottom-3 w-[1.5px] bg-white/[0.08]" />

                  {upcomingTracks.map((track, i) => (
                    <div key={i} className="flex items-start gap-3.5 relative z-10 group/track">
                      {/* Amber Bullet Dot */}
                      <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] mt-1.5 shrink-0 group-hover/track:scale-125 transition-transform" />
                      <span className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed group-hover/track:text-white transition-colors">
                        {track}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 4. BOTTOM CARD: PROJECT SUBMISSION & OPEN SOURCE POLICY */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#06080d]/90 backdrop-blur-md p-6 sm:p-8 lg:p-9 shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Project Submission &amp; Open Source Policy
              </h3>
            </div>

            {/* 3 Sequential Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {policySteps.map((step, idx) => (
                <div key={step.num} className="flex items-start gap-4 relative">
                  {/* Circular Number Badge */}
                  <div className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-xs font-mono font-bold text-amber-400 shadow-sm shrink-0">
                    {step.num}
                  </div>

                  {/* Text details */}
                  <div className="flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5 tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Subtle chevron divider between steps on desktop */}
                  {idx < 2 && (
                    <div className="hidden md:flex absolute -right-3 top-4 text-slate-700 pointer-events-none">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

      </main>

      {/* 5. Global Comprehensive Footer */}
      <Footer />
    </div>
  );
}
