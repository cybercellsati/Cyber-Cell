import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { teamStructure } from "@/data/team";
import { Shield, Users, Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Team & Leadership | Cyber Cell SATI",
  description: "Leadership, founding advisory, faculty guidance, and student committee of Cyber Cell, SATI Vidisha."
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 cyber-grid">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-medium tracking-widest text-[#38bdf8] uppercase block mb-2">
              ORGANIZATIONAL LEADERSHIP
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Leadership & Core Team
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Operating under the guidance of our founding leadership, faculty mentors from the 
              Computer Science Department, and the Central Coding Club at Samrat Ashok Technological Institute.
            </p>
          </div>

          {/* 1. Founder & Advisory */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Sparkles className="w-4 h-4 text-[#38bdf8]" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Founder & Advisory</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {teamStructure.founders.map((founder) => (
                <div
                  key={founder.id}
                  className="p-6 sm:p-8 rounded-xl bg-[#0d111a] border border-white/[0.1] hover:border-white/20 transition-all flex flex-col sm:flex-row items-start gap-6"
                >
                  <div className="w-16 h-16 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white shrink-0 font-mono font-bold text-xl">
                    YH
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 font-semibold uppercase">
                        Leadership
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {founder.department}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      {founder.name}
                    </h3>

                    <p className="text-sm text-[#38bdf8] font-mono font-medium">
                      {founder.role}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Faculty Advisory */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Faculty Guidance</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamStructure.faculty.map((member) => (
                <div
                  key={member.id}
                  className="p-6 rounded-xl bg-[#0d111a] border border-white/[0.07] flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-300 shrink-0 font-mono font-bold text-sm">
                    FA
                  </div>
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-400 uppercase">
                      Faculty Advisor
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{member.name}</h3>
                    <p className="text-xs text-slate-300 font-mono">{member.role}</p>
                    <p className="text-xs text-slate-400 mt-1">{member.department}</p>
                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Executive Committee */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Award className="w-4 h-4 text-slate-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Executive Committee</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {teamStructure.executive.map((member) => (
                <div
                  key={member.id}
                  className="p-5 rounded-xl bg-[#0d111a] border border-white/[0.07] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-300 font-mono font-bold text-xs mb-3">
                      {member.role.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-400 uppercase">
                      Executive Role
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{member.name}</h3>
                    <p className="text-xs text-[#38bdf8] font-mono mb-2">{member.role}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-white/[0.06] text-[10px] font-mono text-slate-500">
                    SATI Central Coding Club
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Core Team */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Core Operations Team</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {teamStructure.core.map((member) => (
                <div
                  key={member.id}
                  className="p-4 rounded-xl bg-[#0d111a] border border-white/[0.07] flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-white">{member.name}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{member.role}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-400">
                    Core
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Domain Leads */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Users className="w-4 h-4 text-slate-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Domain Technical Leads</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {teamStructure.domains.map((member) => (
                <div
                  key={member.id}
                  className="p-4 rounded-xl bg-[#0d111a] border border-white/[0.07] flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-white">{member.name}</h3>
                    <p className="text-xs text-slate-300 font-mono mt-0.5">{member.role}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    Technical
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recruitment CTA */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#0d111a] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white mb-1">
                Want to contribute or lead a domain?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Core committee and domain lead positions are open to SATI students during recruitment drives.
              </p>
            </div>
            <Link
              href="/join"
              className="px-5 py-2.5 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium text-xs sm:text-sm transition-colors shrink-0"
            >
              Apply as Member / Lead
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
