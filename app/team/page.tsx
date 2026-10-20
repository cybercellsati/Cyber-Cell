"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  convenor,
  clubSecretary,
  coConvenors,
  domainHeads,
  facultyAdvisor,
  TeamMember,
} from "@/data/team";
import { ArrowUpRight, Mail } from "lucide-react";

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z" />
    </svg>
  );
}

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/**
 * Minimalist Member Card:
 * Clean portrait ratio, typography, subtle borders, no tacky AI glow effects
 */
function MemberCard({
  member,
  aspect = "aspect-[4/5]",
  priority = false,
}: {
  member: TeamMember;
  aspect?: string;
  priority?: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  // Initials fallback if photo fails or is loading
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group flex flex-col bg-[#0d121c] border border-white/[0.08] hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300">
      {/* Portrait Image Container */}
      <div className={`relative w-full ${aspect} bg-[#080b12] overflow-hidden`}>
        {!imageError && member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            priority={priority}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500 font-mono text-2xl font-bold tracking-wider">
            {initials}
          </div>
        )}
      </div>

      {/* Member Details */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Role Pill */}
          <div className="inline-block text-[11px] font-mono tracking-wider uppercase text-cyan-400 font-semibold mb-1.5">
            {member.role}
          </div>

          {/* Name */}
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {member.name}
          </h3>

          {/* Department / Institution */}
          {member.department && (
            <p className="text-xs text-slate-500 mt-0.5">
              {member.department}
            </p>
          )}

          {/* Bio */}
          {member.bio && (
            <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
              {member.bio}
            </p>
          )}
        </div>

        {/* Social / Contact Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] text-slate-400">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label={`${member.name} LinkedIn Profile`}
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label={`${member.name} GitHub Profile`}
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CleanTeamPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-cyan-500/20 selection:text-cyan-300 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-20">
        {/* ========================================================================= */}
        {/* Page Header (Minimalist & Direct) */}
        {/* ========================================================================= */}
        <header className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-400">
            <span>SATI Vidisha · Cyber Cell</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Our Team
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            The students and mentors driving cybersecurity education, competitive CTFs, 
            and digital defense initiatives at Samrat Ashok Technological Institute, Vidisha.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* Section 1: Executive Leadership (Convenor & Club Secretary) */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2 className="text-xs font-mono tracking-widest uppercase text-slate-400 font-semibold">
              Executive Leadership
            </h2>
            <span className="text-xs font-mono text-slate-500">2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <MemberCard member={convenor} priority={true} />
            <MemberCard member={clubSecretary} priority={true} />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Section 2: Co-Convenors */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2 className="text-xs font-mono tracking-widest uppercase text-slate-400 font-semibold">
              Co-Convenors
            </h2>
            <span className="text-xs font-mono text-slate-500">Operations & Strategy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {coConvenors.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Section 3: Domain & Operations Heads */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2 className="text-xs font-mono tracking-widest uppercase text-slate-400 font-semibold">
              Department & Domain Heads
            </h2>
            <span className="text-xs font-mono text-slate-500">Core Team</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {domainHeads.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Section 4: Faculty Advisory */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2 className="text-xs font-mono tracking-widest uppercase text-slate-400 font-semibold">
              Faculty Advisory
            </h2>
            <span className="text-xs font-mono text-slate-500">Department of CSE</span>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0d121c] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono font-bold text-lg text-cyan-400 shrink-0">
              SJ
            </div>

            <div className="flex-1 space-y-1">
              <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-400 font-semibold">
                {facultyAdvisor.role}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {facultyAdvisor.name}
              </h3>
              <p className="text-xs text-slate-400">
                {facultyAdvisor.department}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {facultyAdvisor.bio}
              </p>
            </div>

            {facultyAdvisor.email && (
              <div className="shrink-0 pt-2 sm:pt-0">
                <a
                  href={`mailto:${facultyAdvisor.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Contact Advisor</span>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Section 5: Minimalist Join Callout */}
        {/* ========================================================================= */}
        <section className="pt-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090d14] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Interested in joining the team?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Cyber Cell conducts offline on-campus recruitment each academic semester at SATI Vidisha.
              </p>
            </div>

            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors shrink-0"
            >
              <span>Recruitment Details</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
