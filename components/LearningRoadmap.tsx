"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  Shield,
  CheckCircle2,
  Cpu,
  Globe,
  Lock,
  Code2,
  Flag,
  Sparkles,
} from "lucide-react";

interface StageItem {
  id: string;
  stageNum: string;
  shortName: string;
  title: string;
  phase: string;
  desc: string;
  tools: string[];
  cli: string;
}

const stages: StageItem[] = [
  {
    id: "architecture",
    stageNum: "01",
    shortName: "SYSTEMS",
    title: "Computer Systems & Memory Layout",
    phase: "FOUNDATION PHASE",
    desc: "Understand stack vs heap memory spaces, CPU instruction cycles, and low-level POSIX execution mechanisms.",
    tools: ["x86-64 ASM", "GDB", "Valgrind", "ELF Header"],
    cli: "$ uname -a && lscpu && cat /proc/meminfo",
  },
  {
    id: "networking",
    stageNum: "02",
    shortName: "NETWORKS",
    title: "Network Protocols & Packet Stream Inspection",
    phase: "INFRASTRUCTURE PHASE",
    desc: "Dissect TCP 3-way handshakes, DNS routing mechanisms, and perform packet stream capture with Wireshark.",
    tools: ["Wireshark", "Tshark", "Tcpdump", "ARP Sniffing"],
    cli: "$ sudo tshark -i eth0 -f 'tcp port 443' -w stream.pcap",
  },
  {
    id: "linux",
    stageNum: "03",
    shortName: "LINUX CLI",
    title: "Linux Command Line & Privilege Auditing",
    phase: "SYSTEMS MASTERY",
    desc: "Achieve shell velocity, audit SUID/SGID permissions, trace system calls, and build automated Bash scripts.",
    tools: ["Bash Shell", "Strace", "Cron Jobs", "SUID Auditing"],
    cli: "$ find / -perm -4000 -type f 2>/dev/null",
  },
  {
    id: "programming",
    stageNum: "04",
    shortName: "PYTHON",
    title: "Offensive Python & Automation Tools",
    phase: "TOOL ENGINEERING",
    desc: "Engineer custom asynchronous port scanners, TCP sockets, HTTP payload injectors, and custom fuzzers.",
    tools: ["Python 3.12", "Asyncio", "Raw Sockets", "Scapy"],
    cli: "$ python3 scanner.py --cidr 10.10.0.0/24 --ports 1-1000",
  },
  {
    id: "web-security",
    stageNum: "05",
    shortName: "WEB SEC",
    title: "Web Security & OWASP Top 10 Mitigation",
    phase: "APPLICATION DEFENSE",
    desc: "Identify and remediate SQL Injection, Cross-Site Scripting (XSS), SSRF, IDORs, and broken JWT auth.",
    tools: ["Burp Suite", "OWASP ZAP", "SQLmap", "Postman"],
    cli: "$ sqlmap -u 'https://target.lab/api/v1?id=1' --batch --dbs",
  },
  {
    id: "labs",
    stageNum: "06",
    shortName: "CTF WARGAMES",
    title: "Live Cyber Ranges & Attack-Defense Battles",
    phase: "WARGAME OPERATIONS",
    desc: "Compete in jeopardy CTF tournaments, extract hidden memory flags, and defend isolated Docker sandboxes.",
    tools: ["Docker Range", "Ghidra", "Netcat", "CyberChef"],
    cli: "$ nc ctf.cybercellsati.in 9001 -> FLAG{THINK_SECURE}",
  },
];

export default function LearningRoadmap() {
  const [activeStage, setActiveStage] = useState(0);
  const current = stages[activeStage];

  return (
    <section id="roadmap" className="relative py-20 sm:py-28 bg-[#030303] border-b border-white/[0.08] overflow-hidden select-none">
      
      {/* Background Subtle Amber Atmospheric Glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-amber-400 text-[10px] font-mono tracking-widest uppercase">
            <Sparkles className="w-3 h-3" />
            <span>PROGRESSIVE CURRICULUM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            6-STAGE MASTERY TIERS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light">
            From raw CPU registers to live CTF cyber ranges. Select a tier to inspect toolchains.
          </p>
        </motion.div>

        {/* =========================================================================
            ROW OF ANGULAR SHIELD / RIBBON TIER CARDS (Inspire by Section 6 in Ref)
           ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {stages.map((stage, idx) => {
            const isSelected = activeStage === idx;
            return (
              <motion.button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className={`relative p-4 sm:p-5 text-left rounded-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[140px] sm:min-h-[160px] ${
                  isSelected
                    ? "bg-gradient-to-b from-[#141008] to-[#070503] border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)] -translate-y-1"
                    : "bg-[#070707] border border-white/[0.08] hover:border-amber-400/50 hover:bg-[#0a0805]"
                }`}
              >
                {/* Angular Top Accent Dot */}
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isSelected ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "bg-white/20 group-hover:bg-amber-400/60"
                  }`}
                />

                <div className="space-y-1 my-auto">
                  <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    STAGE
                  </div>
                  <div
                    className={`text-2xl sm:text-3xl font-black font-sans tracking-tight transition-colors ${
                      isSelected ? "text-amber-400" : "text-white group-hover:text-amber-300"
                    }`}
                  >
                    {stage.stageNum}
                  </div>
                  <div className="text-xs font-mono font-bold text-white uppercase tracking-wider line-clamp-1">
                    {stage.shortName}
                  </div>
                </div>

                {/* Bottom Status Pill */}
                <div className="text-[9px] font-mono text-slate-500 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <span>{isSelected ? "INSPECTING" : "SELECT"}</span>
                  <span className={isSelected ? "text-amber-400" : ""}>&rarr;</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* =========================================================================
            INSPECTED STAGE DETAIL DRAWER (High-Tech Telemetry Card)
           ========================================================================= */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#080705] via-[#050402] to-[#020201] border border-amber-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative"
        >
          {/* Amber Corner Brackets */}
          <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-400" />
          <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-400" />
          <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-400" />
          <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-black bg-amber-400 uppercase">
                  {current.phase}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  STAGE {current.stageNum} OF 06
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {current.desc}
              </p>

              {/* Tool Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1">
                  CORE TOOLS:
                </span>
                {current.tools.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right CLI Code Window */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-black border border-white/10 overflow-hidden font-mono text-xs">
                <div className="px-4 py-2.5 bg-black/80 border-b border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400">
                  <span>kali@sati-lab:~#</span>
                  <span className="text-amber-400">OPERATIONAL SHELL</span>
                </div>
                <div className="p-4 text-slate-300 space-y-2 bg-[#040404]">
                  <div className="text-amber-300 font-bold">{current.cli}</div>
                  <div className="text-[11px] text-emerald-400">
                    [+] Execution verified. Sandbox loaded without faults.
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-mono">
                <Link
                  href="/domains"
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 group"
                >
                  <span>Explore Track Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-slate-500 text-[11px]">SATI CCC Lab Syllabus</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
