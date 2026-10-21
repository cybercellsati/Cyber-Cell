"use client";

import React from "react";
import Link from "next/link";
import { Laptop, Globe, Flag, Terminal, ArrowRight, ExternalLink, GitBranch, Shield, Cpu } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      id: "sentinel-scan",
      name: "SentinelScan",
      tag: "CLI SECURITY TOOL",
      status: "CAMPUS DEPLOYED",
      desc: "Asynchronous subnet reconnaissance and open-port auditor engineered by SATI students for fast campus network auditing.",
      stack: ["Python 3.12", "Asyncio", "Raw Sockets", "JSON Reports"],
      icon: Terminal,
      metrics: "Sub-second Port Sweep",
    },
    {
      id: "range-ctf",
      name: "RangeCTF Platform",
      tag: "WARGAME INFRASTRUCTURE",
      status: "ACTIVE OPERATIONS",
      desc: "Lightweight Jeopardy CTF scoring engine with dynamic flag verification, real-time leaderboard graph, and dockerized challenges.",
      stack: ["Next.js", "TypeScript", "Docker", "PostgreSQL"],
      icon: Flag,
      metrics: "Live Campus Battles",
    },
    {
      id: "vuln-lab",
      name: "VulnLab Dockerized Range",
      tag: "TRAINING ENVIRONMENT",
      status: "INTERNAL LAB",
      desc: "Isolated multi-container attack surface hosting intentionally vulnerable web apps for safe student penetration testing.",
      stack: ["Docker Compose", "Nginx", "Node.js", "OWASP Bench"],
      icon: Cpu,
      metrics: "Zero-Risk Sandboxing",
    },
    {
      id: "packet-pulse",
      name: "PacketPulse Forensics",
      tag: "NETWORK AUDITING",
      status: "RESEARCH LAB",
      desc: "Automated PCAP analyzer that flags unencrypted credentials, ARP poisoning attempts, and anomalous DNS tunneling activity.",
      stack: ["Python", "Scapy", "Wireshark PCAP", "Tkinter/CLI"],
      icon: Shield,
      metrics: "Real-time Traffic Triage",
    },
  ];

  return (
    <section id="projects" className="relative py-20 lg:py-28 bg-[#030303] border-b border-white/[0.08] overflow-hidden select-none">
      
      {/* Background Subtle Amber Atmospheric Glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.025),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-amber-400 uppercase">
                ENGINEERING &bull; TOOLS &bull; CODE
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Tools That Make <br className="hidden sm:inline" />
              <span className="text-amber-400">An Impact.</span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-slate-400 font-light leading-relaxed">
              Open-source security tooling, cyber range architectures, and defensive automation built by Cyber Cell SATI members.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-white hover:text-amber-300 uppercase tracking-wider relative pb-1 self-start sm:self-end"
          >
            <span>Explore All Repositories</span>
            <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-400/40 group-hover:bg-amber-400 transition-colors" />
          </Link>
        </div>

        {/* 4 Luxury Minimalist Project Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                className="relative rounded-3xl p-6 sm:p-8 border border-white/[0.08] hover:border-amber-400/40 bg-gradient-to-b from-[#0b0905] via-[#070604] to-[#030201] hover:shadow-[0_20px_50px_rgba(245,158,11,0.08)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Top Bar: Tag & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-amber-400">
                      {proj.tag}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-black bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-amber-400/30 group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span>{proj.status}</span>
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-black/60 border border-white/10 group-hover:border-amber-400/50 flex items-center justify-center text-amber-400 transition-colors shadow-inner">
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-amber-300 transition-colors">
                        {proj.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light pt-1">
                      {proj.desc}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300 group-hover:border-white/15 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Metrics & Link */}
                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-[11px] text-amber-400/90 font-bold">
                    {proj.metrics}
                  </span>

                  <Link
                    href={`/projects#${proj.id}`}
                    className="inline-flex items-center gap-1.5 font-bold text-white group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Inspect Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}