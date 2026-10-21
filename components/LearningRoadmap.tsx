"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Terminal, CheckCircle2, Shield, Sparkles } from "lucide-react";

interface TimelineItem {
  id: string;
  stageNum: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  cliSnippet: string;
}

const roadmapItems: TimelineItem[] = [
  {
    id: "fundamentals",
    stageNum: "01",
    category: "FOUNDATION PHASE",
    title: "Computer Architecture & Systems",
    subtitle: "Understand how binary and computing engines operate",
    description:
      "Grasp processor execution cycles, memory address spaces (Stack vs Heap), file system hierarchies, and low-level OS operations fundamental to exploitation.",
    tags: ["Memory Layout", "OS Internals", "POSIX Systems"],
    cliSnippet: "$ lscpu && free -m && uname -a",
  },
  {
    id: "networking",
    stageNum: "02",
    category: "INFRASTRUCTURE PHASE",
    title: "Network Protocols & Traffic Analysis",
    subtitle: "Master the wires of the internet",
    description:
      "Dissect the OSI 7-layer stack, TCP 3-way handshakes, DNS routing mechanisms, and perform packet stream inspection with Wireshark to map external attack surfaces.",
    tags: ["TCP/IP Dissection", "DNS & ARP Flaws", "Wireshark PCAPs"],
    cliSnippet: "$ sudo tshark -i eth0 -f 'tcp port 443' -w capture.pcap",
  },
  {
    id: "linux",
    stageNum: "03",
    category: "SYSTEMS MASTERY",
    title: "Linux Command-Line & Automation",
    subtitle: "Control operating systems without a GUI",
    description:
      "Achieve high-speed terminal proficiency, granular permission auditing (SUID/GUID), process lifecycle inspection, shell piping, and custom automation.",
    tags: ["Bash Toolchains", "SUID Auditing", "Process Tracing"],
    cliSnippet: "$ find / -perm -4000 -type f 2>/dev/null",
  },
  {
    id: "programming",
    stageNum: "04",
    category: "TOOL ENGINEERING",
    title: "Offensive Python & Scripting",
    subtitle: "Build weaponized and defensive tools",
    description:
      "Develop custom reconnaissance scanners, socket listeners, HTTP payload injectors, automated fuzzers, and log parsers tailored to specific targets.",
    tags: ["Socket Programming", "Payload Crafting", "Log Analytics"],
    cliSnippet: "$ python3 -m venv env && python3 scanner.py --target 10.10.0.0/24",
  },
  {
    id: "web-security",
    stageNum: "05",
    category: "APPLICATION SECURITY",
    title: "Web Security & OWASP Top 10",
    subtitle: "Audit client-server logic and APIs",
    description:
      "Identify, exploit, and remediate high-impact vulnerabilities: SQL Injection, Stored/Reflected XSS, Server-Side Request Forgery (SSRF), IDORs, and broken JWT authentication.",
    tags: ["OWASP Top 10", "Burp Suite Pro", "API Pen-Testing"],
    cliSnippet: "$ sqlmap -u 'https://target.lab/api/v1?id=1' --batch --dbs",
  },
  {
    id: "labs",
    stageNum: "06",
    category: "WARGAMES & CTF",
    title: "Isolated Cyber Ranges & Competitions",
    subtitle: "Test your skills against hardened adversaries",
    description:
      "Engage in jeopardy CTF qualifiers, attack-defense war exercises, campus mini-wargames, and real incident response scenarios hosted at SATI.",
    tags: ["Jeopardy CTF", "Cyber Ranges", "Defensive Drills"],
    cliSnippet: "$ nc ctf.cybercellsati.in 9001 -> FLAG{THINK_SECURE}",
  },
];

export default function LearningRoadmap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = roadmapItems[activeIndex];

  return (
    <section id="roadmap" className="relative py-20 lg:py-28 bg-[#030303] border-b border-white/[0.08] overflow-hidden select-none">
      
      {/* Background Subtle Radial Gradient */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-amber-400 uppercase">
              STUDENT ROADMAP &bull; 6-STAGE PATHWAY
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Learn. Build. <span className="text-amber-400">Secure.</span>
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-slate-400 font-light max-w-xl mt-2">
            A battle-tested progression roadmap designed to take students from day-one computing basics to advanced CTF competition ranks.
          </p>
        </div>

        {/* 2-Column Interactive Pathway */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Interactive Vertical Stage Selector */}
          <div className="lg:col-span-5 relative">
            {/* Background continuous track line */}
            <div className="absolute left-[15px] top-6 bottom-6 w-[2px] bg-white/[0.08]" />

            <div className="space-y-4 sm:space-y-5 relative">
              {roadmapItems.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`flex items-start gap-4 p-3 sm:p-3.5 rounded-2xl w-full text-left transition-all duration-300 focus:outline-none cursor-pointer ${
                      isActive
                        ? "bg-[#0c0904] border border-amber-400/40 shadow-[0_10px_25px_rgba(245,158,11,0.08)]"
                        : "hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    {/* Stage Number Ring Node */}
                    <div className="relative z-10 shrink-0 mt-0.5">
                      {isActive ? (
                        <div className="w-8 h-8 rounded-full border-2 border-amber-400 bg-black flex items-center justify-center text-amber-400 text-xs font-mono font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                          {item.stageNum}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full border border-white/20 bg-[#070707] flex items-center justify-center text-slate-500 text-xs font-mono font-bold group-hover:border-amber-400/50 transition-colors">
                          {item.stageNum}
                        </div>
                      )}
                    </div>

                    {/* Stage Title and Subtitle */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono tracking-wider uppercase font-bold ${
                          isActive ? "text-amber-400" : "text-slate-500"
                        }`}>
                          STAGE {item.stageNum}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-mono text-amber-300 flex items-center gap-1 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span>ACTIVE STAGE</span>
                          </span>
                        )}
                      </div>

                      <h4
                        className={`text-sm sm:text-base font-bold tracking-tight transition-colors mt-0.5 ${
                          isActive ? "text-white" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`text-xs mt-0.5 transition-colors line-clamp-1 font-light ${
                          isActive ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Impact Obsidian Glass Detail Console */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[30px] border border-amber-400/35 bg-gradient-to-b from-[#110d06] via-[#090703] to-[#040301] p-7 sm:p-9 shadow-[0_25px_70px_rgba(245,158,11,0.1)] flex flex-col justify-between overflow-hidden">
              
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-amber-400/15 border border-amber-400/30 text-amber-300">
                    {activeItem.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    &bull; Milestone {activeItem.stageNum}/06
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>SATI CURRICULUM</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3 mb-6">
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-snug">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {activeItem.description}
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold block">
                  CORE MILESTONES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simulated Command Terminal Snippet */}
              <div className="p-4 rounded-2xl bg-black/80 border border-white/10 space-y-1.5 mb-6 shadow-inner">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pb-1 border-b border-white/[0.06]">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>SIMULATED OPERATIONAL WORKFLOW</span>
                  </span>
                  <span>BASH CLI</span>
                </div>
                <code className="text-xs font-mono text-amber-300/90 block pt-1 break-all">
                  {activeItem.cliSnippet}
                </code>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 text-[11px]">
                  Curiosity Today. A Safer Tomorrow.
                </span>

                <Link
                  href="/domains"
                  className="inline-flex items-center gap-2 font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider group"
                >
                  <span>Explore Full Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}