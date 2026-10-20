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
  Award
} from "lucide-react";

export const metadata = {
  title: "People Behind Cyber Cell | Team & Leadership - SATI Vidisha",
  description: "Meet the student leaders, faculty advisory, executive committee, and core operations team powering Cyber Cell at Samrat Ashok Technological Institute (SATI), Vidisha.",
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

// Restrained, elegant tag color palette
const tagColorClasses: Record<string, string> = {
  TECHNICAL: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  CREATIVE: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  MANAGEMENT: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  MEDIA: "bg-rose-500/10 border-rose-500/20 text-rose-400",
  COMMUNICATIONS: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  "EXECUTIVE ROLE": "bg-blue-500/10 border-blue-500/20 text-blue-400",
  LEADERSHIP: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  "FACULTY ADVISOR": "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
};

export default function TeamPage() {
  const { founder, faculty, executive, core } = teamData;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* ========================================================================= */}
          {/* Hero Header Section */}
          {/* ========================================================================= */}
          <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pt-4 pb-2">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
                <span>OUR TEAM</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">
                People Behind <br />
                <span className="text-blue-500">
                  Cyber Cell
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mb-8">
                A team of passionate learners, builders, and problem solvers working
                together to make the digital world safer.
              </p>

              {/* 3 Value Badges in a clean horizontal row */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#111827] border border-white/[0.08] shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Learn</p>
                    <p className="text-[11px] text-slate-400">Build Skills</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#111827] border border-white/[0.08] shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Collaborate</p>
                    <p className="text-[11px] text-slate-400">Solve Real Problems</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#111827] border border-white/[0.08] shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Make an Impact</p>
                    <p className="text-[11px] text-slate-400">A Safer Digital Tomorrow</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top-Right Balanced Graphic */}
            <div className="hidden lg:flex items-center justify-center p-8 rounded-2xl bg-[#111827] border border-white/[0.08] shadow-sm shrink-0">
              <div className="relative w-44 h-36">
                <Image
                  src="/images/team/hero-shield-badge.png"
                  alt="Cyber Cell SATI Vidisha Shield"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* Section 1: Founder & Convenor */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Founder & Convenor
                </h2>
              </div>
              <p className="text-xs italic text-slate-400 font-serif">
                &ldquo;A safer digital world starts with curious minds.&rdquo;
              </p>
            </div>

            {/* Founder Full-Width Card with Subtle Left Accent Bar */}
            <div className="relative overflow-hidden rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-blue-500/30 transition-all duration-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8 shadow-sm before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-blue-500">
              {/* Photo on the left */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-slate-900/60 shadow-inner">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Information in the middle */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-wide">
                    {founder.tag}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {founder.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono font-medium text-blue-400">
                  {founder.role}
                </p>
                <p className="text-xs text-slate-400">
                  {founder.department}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1 max-w-2xl">
                  {founder.bio}
                </p>
              </div>

              {/* Contact Links on far right */}
              <div className="shrink-0 flex flex-col gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-white/[0.08] w-full md:w-auto text-xs font-mono text-slate-400">
                {founder.email && (
                  <a
                    href={`mailto:${founder.email}`}
                    className="flex items-center gap-2.5 hover:text-blue-400 transition-colors p-1.5 rounded-lg hover:bg-white/[0.03]"
                  >
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{founder.email}</span>
                  </a>
                )}
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-blue-400 transition-colors p-1.5 rounded-lg hover:bg-white/[0.03]"
                  >
                    <LinkedInIcon className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>linkedin.com/in/yashharfode</span>
                  </a>
                )}
                {founder.github && (
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-blue-400 transition-colors p-1.5 rounded-lg hover:bg-white/[0.03]"
                  >
                    <GitHubIcon className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>github.com/yashharfode</span>
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* Section: Faculty Advisory */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Faculty Advisory
                </h2>
              </div>
              <p className="text-xs italic text-slate-400 font-serif">
                &ldquo;Guiding technical integrity, ethics, and academic excellence.&rdquo;
              </p>
            </div>

            {/* Faculty Advisor Card - Identical full-width treatment */}
            <div className="relative overflow-hidden rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8 shadow-sm before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-indigo-500">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center text-indigo-400 shrink-0 shadow-inner">
                <GraduationCap className="w-12 h-12 text-indigo-400" />
                <span className="text-[10px] font-mono font-bold mt-1 text-indigo-300">FACULTY</span>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 uppercase tracking-wide">
                    {faculty.tag}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {faculty.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono font-medium text-indigo-400">
                  {faculty.role}
                </p>
                <p className="text-xs text-slate-400">
                  {faculty.department}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1 max-w-2xl">
                  {faculty.bio}
                </p>
              </div>

              {faculty.email && (
                <div className="shrink-0 flex flex-col gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-white/[0.08] w-full md:w-auto text-xs font-mono text-slate-400">
                  <a
                    href={`mailto:${faculty.email}`}
                    className="flex items-center gap-2.5 hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-white/[0.03]"
                  >
                    <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{faculty.email}</span>
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* Section 2: Executive Committee */}
          {/* Compact, focused card with generous margin */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Users className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Executive Committee
              </h2>
            </div>

            {/* Single compact card, left-aligned with refined width */}
            <div className="max-w-2xl">
              {executive.map((member) => (
                <div
                  key={member.id}
                  className="relative overflow-hidden p-6 rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-blue-500/30 transition-all duration-200 flex flex-col sm:flex-row items-start gap-5 shadow-sm before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500/70"
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-slate-900/60 shadow-inner">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-wide">
                      {member.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2 truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-blue-400 mb-2">
                      {member.role}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.06] text-slate-400">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <LinkedInIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors"
                          aria-label={`${member.name} GitHub`}
                        >
                          <GitHubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="hover:text-blue-400 transition-colors"
                          aria-label={`${member.name} Email`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* Section 3: Core Operations Team (5 Cards Grid) */}
          {/* Desktop: exactly 5 equal-width cards in one row with identical structure */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Core Operations Team
              </h2>
            </div>

            {/* Exactly 5 equal-width cards in 1 row on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {core.map((member) => (
                <div
                  key={member.id}
                  className="p-5 rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-blue-500/30 transition-all duration-200 hover:-translate-y-1 shadow-sm flex flex-col justify-between group"
                >
                  <div>
                    {/* Consistent Aspect-Ratio Photo Container */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-slate-900/60 border border-white/10 shadow-inner">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Role Badge */}
                    <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wide border ${tagColorClasses[member.tag] || "bg-blue-500/10 border-blue-500/20 text-blue-400"}`}>
                      {member.tag}
                    </span>

                    {/* Name */}
                    <h3 className="text-base font-bold text-white mt-2 leading-snug truncate">
                      {member.name}
                    </h3>

                    {/* Short Role Title */}
                    <p className="text-xs font-mono text-blue-400 mt-0.5">
                      {member.role}
                    </p>

                    {/* 2-3 line description with consistent height baseline */}
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3 min-h-[3.75rem]">
                      {member.bio}
                    </p>
                  </div>

                  {/* Social Icons at bottom: evenly spaced, vertically aligned baseline */}
                  <div className="flex items-center justify-start gap-4 mt-4 pt-3.5 border-t border-white/[0.06] text-slate-400">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors p-1 -m-1"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors p-1 -m-1"
                        aria-label={`${member.name} GitHub`}
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-blue-400 transition-colors p-1 -m-1"
                        aria-label={`${member.name} Email`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* Section 4: Members */}
          {/* Elegant Coming Soon Card with soft border and clear CTA */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Award className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Members & Community
              </h2>
            </div>

            <div className="p-8 sm:p-12 rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-blue-500/20 transition-all text-center relative overflow-hidden shadow-sm">
              <div className="relative z-10 max-w-lg mx-auto space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>COMING SOON</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Club Members & Inductees
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                  Official member profiles, working squads, and student contributors will be published here following the completion of our on-campus offline induction drive.
                </p>
                <div className="pt-2">
                  <Link
                    href="/join"
                    className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors group"
                  >
                    <span>Read Offline Recruitment Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
