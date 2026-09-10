"use client";

import React, { useState } from "react";
import Link from "next/link";
import { focusAreas, FocusArea } from "@/data/focusAreas";
import SpotlightCard from "./SpotlightCard";
import {
  ShieldAlert,
  Network,
  Globe,
  Bug,
  Search,
  Flag,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  X,
  Wrench,
  BookOpen,
  CheckCircle2,
  Compass,
  Terminal,
  Cpu,
  Layers
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  ShieldAlert,
  Network,
  Globe,
  Bug,
  Search,
  Flag,
  ShieldCheck,
  TrendingUp
};

export default function FocusAreas() {
  const [selectedDomain, setSelectedDomain] = useState<FocusArea | null>(null);

  const getDomain = (id: string) => focusAreas.find((d) => d.id === id) || focusAreas[0];

  const ethicalHacking = getDomain("ethical-hacking");
  const webSecurity = getDomain("web-security");
  const networkSecurity = getDomain("network-security");
  const digitalForensics = getDomain("digital-forensics");
  const malwareAnalysis = getDomain("malware-analysis");
  const ctf = getDomain("ctf-competitions");
  const securityAwareness = getDomain("security-awareness");
  const career = getDomain("career-guidance");

  return (
    <section id="domains" className="relative py-24 bg-[#07090e] border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest text-[#38bdf8] uppercase block mb-1">
              CURRICULUM ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Specialized Focus Areas
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Eight practical engineering domains explored through structured wargames, hands-on labs, and student research groups.
            </p>
          </div>

          <Link
            href="/domains"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors group"
          >
            <span>Explore Full Syllabi</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* --- BENTO GRID ARCHITECTURE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          
          {/* TILE 1: Ethical Hacking (Large Featured Card - 8 cols) */}
          <div className="lg:col-span-8">
            <SpotlightCard
              asButton
              onClick={() => setSelectedDomain(ethicalHacking)}
              className="p-6 sm:p-8 flex flex-col justify-between h-full min-h-[320px]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:text-[#38bdf8] transition-colors">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-300 uppercase">
                      Core Offensive Track
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400">
                    Intermediate
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#38bdf8] transition-colors">
                  {ethicalHacking.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed mb-6">
                  {ethicalHacking.shortDesc}
                </p>

                {/* Simulated Terminal Recon Snippet */}
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-xs text-slate-300 space-y-1 mb-6">
                  <div className="text-slate-400 flex items-center gap-2">
                    <span className="text-[#38bdf8]">$</span>
                    <span>nmap -sV -sC -Pn target.sati.lab</span>
                  </div>
                  <div className="text-slate-400 text-[11px] pl-3">
                    [+] 22/tcp  open  OpenSSH 9.2p1 (protocol 2.0)<br />
                    [+] 80/tcp  open  nginx 1.24.0 (audited)<br />
                    [+] 443/tcp open  ssl/https (TLS 1.3 verified)
                  </div>
                </div>
              </div>

              {/* Tools & Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-1.5">
                  {ethicalHacking.tools.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 group-hover:text-[#38bdf8] transition-colors">
                  <span>Inspect Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </SpotlightCard>
          </div>

          {/* TILE 2: Web Security (4 cols) */}
          <div className="lg:col-span-4">
            <SpotlightCard
              asButton
              onClick={() => setSelectedDomain(webSecurity)}
              className="p-6 sm:p-7 flex flex-col justify-between h-full min-h-[320px]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:text-[#38bdf8] transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    Beginner
                  </span>
                </div>

                <span className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-wider block mb-1">
                  OWASP Top 10
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#38bdf8] transition-colors">
                  {webSecurity.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {webSecurity.shortDesc}
                </p>

                {/* Vulnerability Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["SQLi", "XSS", "CSRF", "IDOR", "JWT Flaws", "SSRF"].map((vuln) => (
                    <span key={vuln} className="text-[10px] font-mono px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300">
                      {vuln}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-[#38bdf8]">
                <span>Explore PortSwigger Track</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </SpotlightCard>
          </div>

          {/* TILE 3: Network Security (4 cols) */}
          <div className="lg:col-span-4">
            <SpotlightCard
              asButton
              onClick={() => setSelectedDomain(networkSecurity)}
              className="p-6 flex flex-col justify-between h-full min-h-[260px]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:text-[#38bdf8] transition-colors">
                    <Network className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    Beginner
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#38bdf8] transition-colors">
                  {networkSecurity.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {networkSecurity.shortDesc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Wireshark", "Suricata", "TCP/IP", "DNS"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-[#38bdf8]">
                <span>Packet Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </SpotlightCard>
          </div>

          {/* TILE 4: Digital Forensics (4 cols) */}
          <div className="lg:col-span-4">
            <SpotlightCard
              asButton
              onClick={() => setSelectedDomain(digitalForensics)}
              className="p-6 flex flex-col justify-between h-full min-h-[260px]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:text-[#38bdf8] transition-colors">
                    <Search className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400">
                    Intermediate
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#38bdf8] transition-colors">
                  {digitalForensics.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {digitalForensics.shortDesc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Volatility 3", "Autopsy", "Memory Dumps", "FTK"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-[#38bdf8]">
                <span>Incident Triage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </SpotlightCard>
          </div>

          {/* TILE 5: Malware Analysis (4 cols) */}
          <div className="lg:col-span-4">
            <SpotlightCard
              asButton
              onClick={() => setSelectedDomain(malwareAnalysis)}
              className="p-6 flex flex-col justify-between h-full min-h-[260px]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:text-[#38bdf8] transition-colors">
                    <Bug className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-400">
                    Advanced
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#38bdf8] transition-colors">
                  {malwareAnalysis.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {malwareAnalysis.shortDesc}
                </p>

                {/* Disassembly Pill */}
                <div className="p-2 rounded bg-black/40 border border-white/[0.05] font-mono text-[10px] text-slate-400 mb-4">
                  <code>MOV EAX, [EBP-0x4] &bull; JNZ 0x004012A</code>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-[#38bdf8]">
                <span>Reverse Engineering</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </SpotlightCard>
          </div>

          {/* TILE 6: CTF & Competitions (Wide 7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard
              asButton
              onClick={() => setSelectedDomain(ctf)}
              className="p-6 sm:p-7 flex flex-col justify-between h-full min-h-[260px]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:text-[#38bdf8] transition-colors">
                      <Flag className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-300 uppercase">
                      Gamified Wargames
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    All Levels
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#38bdf8] transition-colors">
                  {ctf.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {ctf.shortDesc}
                </p>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Cryptography", "Web Exploitation", "Binary / PWN", "Reverse Engineering", "Forensics"].map((c) => (
                    <span key={c} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  TryHackMe &bull; PicoCTF &bull; SATI Wargames
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-[#38bdf8]">
                  <span>Join CTF Squad</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </SpotlightCard>
          </div>

          {/* TILE 7: Security Awareness & Career (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard
              asButton
              onClick={() => setSelectedDomain(securityAwareness)}
              className="p-6 sm:p-7 flex flex-col justify-between h-full min-h-[260px]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:text-[#38bdf8] transition-colors">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:text-[#38bdf8] transition-colors">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 text-slate-300">
                    Dual Pathway
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#38bdf8] transition-colors">
                  Awareness & Careers
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Institutional defense hygiene, anti-phishing campus drives, plus real-world certification roadmaps (CompTIA, eJPT, OSCP).
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Security+", "eJPT", "OSCP", "BTL1", "Ethical Disclosures"].map((c) => (
                    <span key={c} className="text-[10px] font-mono px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-[#38bdf8]">
                <span>Certification Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </SpotlightCard>
          </div>

        </div>

      </div>

      {/* Domain Detail Modal */}
      {selectedDomain && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="domain-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedDomain(null);
          }}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d111a] border border-white/[0.1] p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white">
                  {React.createElement(iconMap[selectedDomain.icon] || ShieldCheck, { className: "w-5 h-5" })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 text-slate-300">
                      Level: {selectedDomain.level}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      SATI Cyber Track
                    </span>
                  </div>
                  <h3 id="domain-modal-title" className="text-xl font-bold text-white mt-1">
                    {selectedDomain.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedDomain(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scope */}
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                What You&apos;ll Learn
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-3.5 rounded-lg border border-white/[0.04]">
                {selectedDomain.learnSummary}
              </p>
            </div>

            {/* Core Topics */}
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-300 mb-2.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                Core Topics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDomain.coreTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded bg-white/[0.02] border border-white/[0.04]"
                  >
                    <span className="text-slate-500 font-mono">&bull;</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                <Wrench className="w-3.5 h-3.5 text-slate-400" />
                Tools & Frameworks
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDomain.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.07] text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Starting point */}
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                Recommended Beginner Starting Point
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3.5 rounded-lg border border-white/[0.04]">
                {selectedDomain.suggestedStartingPoint}
              </p>
            </div>

            {/* Done button */}
            <div className="pt-4 border-t border-white/[0.07] flex justify-end">
              <button
                onClick={() => setSelectedDomain(null)}
                className="px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-white font-medium transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
