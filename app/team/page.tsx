import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { teamData } from "@/data/team";
import { 
  GraduationCap, 
  Users, 
  Shield, 
  ArrowRight, 
  Sparkles, 
  Terminal,
  Mail,
  ExternalLink
} from "lucide-react";

export const metadata = {
  title: "People Behind Cyber Cell | Team & Leadership - SATI Vidisha",
  description: "Meet the student leaders, advisory, core operations team, and domain leads powering Cyber Cell at Samrat Ashok Technological Institute (SATI), Vidisha.",
};

// Social icon helpers
function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z" />
    </svg>
  );
}

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const tagColorClasses: Record<string, string> = {
  TECHNICAL: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  CREATIVE: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  MANAGEMENT: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  MEDIA: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  COMMUNICATIONS: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  "EXECUTIVE ROLE": "bg-blue-500/10 border-blue-500/30 text-blue-400",
  LEADERSHIP: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
};

export default function TeamPage() {
  const { founder, executive, core } = teamData;

  return (
    <div className="min-h-screen bg-[#06080d] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* ========================================================================= */}
          {/* Hero Header Section */}
          {/* ========================================================================= */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pt-4 pb-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase block mb-3">
                OUR TEAM
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none mb-4">
                People Behind <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Cyber Cell
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-8">
                A team of passionate learners, builders, and problem solvers working
                together to make the digital world safer.
              </p>

              {/* 3 Core Value Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090d16] border border-white/[0.08]">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Learn</p>
                    <p className="text-[11px] text-slate-400">Build Skills</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090d16] border border-white/[0.08]">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Collaborate</p>
                    <p className="text-[11px] text-slate-400">Solve Real Problems</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090d16] border border-white/[0.08]">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Make an Impact</p>
                    <p className="text-[11px] text-slate-400">A Safer Digital Tomorrow</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Graphic: Hooded Cyber Shield */}
            <div className="hidden lg:flex items-center justify-center p-6 rounded-2xl bg-[#080d18] border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.12)] shrink-0">
              <div className="relative w-48 h-36">
                <Image
                  src="/images/team/hero-shield-badge.png"
                  alt="Secure Learn Build Together"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Section 1: Founder & Convenor */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Founder & Convenor
                </h2>
                <div className="hidden sm:block w-12 h-[1px] bg-white/20" />
              </div>
              <p className="text-xs italic text-slate-400 font-serif">
                &ldquo;A safer digital world starts with curious minds.&rdquo;
              </p>
            </div>

            {/* Founder Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#080d18] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8 shadow-xl relative overflow-hidden">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 uppercase tracking-wide">
                    {founder.tag}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {founder.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono font-medium text-cyan-400">
                  {founder.role}
                </p>
                <p className="text-xs text-slate-400">
                  {founder.department}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1 max-w-2xl">
                  {founder.bio}
                </p>
              </div>

              {/* Founder Social Links */}
              <div className="shrink-0 flex flex-col gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-white/[0.08] w-full md:w-auto text-xs font-mono text-slate-300">
                {founder.email && (
                  <a
                    href={`mailto:${founder.email}`}
                    className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>{founder.email}</span>
                  </a>
                )}
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4 text-cyan-400" />
                    <span>linkedin.com/in/yashharfode</span>
                  </a>
                )}
                {founder.github && (
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4 text-cyan-400" />
                    <span>github.com/yashharfode</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Section 2: Executive Committee */}
          {/* NOTE: Per requirement, in Executive only Co-Convenor is placed */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
              <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Users className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Executive Committee
              </h2>
              <div className="w-12 h-[1px] bg-white/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executive.map((member) => (
                <div
                  key={member.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#080d18] border border-white/10 hover:border-cyan-500/30 transition-all flex items-start gap-4 shadow-md"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 uppercase tracking-wide">
                      {member.tag}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mb-1.5">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                      {member.bio}
                    </p>

                    <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-white/[0.06] text-slate-400">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 transition-colors"
                        aria-label={`${member.name} GitHub`}
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-cyan-400 transition-colors"
                        aria-label={`${member.name} Email`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Section 3: Core Operations Team (5 Members) */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
              <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Core Operations Team
              </h2>
              <div className="w-12 h-[1px] bg-white/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {core.map((member) => (
                <div
                  key={member.id}
                  className="p-4 rounded-2xl bg-[#080d18] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between shadow-md group"
                >
                  <div>
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 border border-white/10">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wide border ${tagColorClasses[member.tag] || "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"}`}>
                      {member.tag}
                    </span>

                    <h3 className="text-sm font-bold text-white mt-1.5 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-mono text-cyan-400 mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/[0.06] text-slate-400">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-cyan-400 transition-colors"
                      aria-label={`${member.name} Email`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Section 4: Members */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
              <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Users className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Members
              </h2>
              <div className="w-12 h-[1px] bg-white/20" />
            </div>

            <div className="p-8 sm:p-12 rounded-2xl bg-[#080d18] border border-white/10 hover:border-cyan-500/30 transition-all text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 max-w-md mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>COMING SOON</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Club Members & Inductees
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Official member profiles, working squads, and student contributors will be published here after the completion of our on-campus offline induction drive.
                </p>
                <div className="pt-2">
                  <Link
                    href="/join"
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Read Offline Recruitment Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>



        </div>
      </main>

      <Footer />
    </div>
  );
}
