"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface TimelineItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const roadmapItems: TimelineItem[] = [
  {
    id: "fundamentals",
    category: "FOUNDATION",
    title: "Computer Fundamentals",
    subtitle: "Build a strong foundation",
    description:
      "Understand how computers work, operating systems, file systems, and essential concepts required for security.",
    tags: ["Hardware Basics", "OS Concepts", "File System"]
  },
  {
    id: "networking",
    category: "INFRASTRUCTURE",
    title: "Networking",
    subtitle: "Understand how the internet works",
    description:
      "Master the OSI model, TCP/IP handshake, DNS, routing protocols, and packet sniffing with Wireshark to understand the attack surface.",
    tags: ["TCP/IP Stack", "DNS & Routing", "Packet Analysis"]
  },
  {
    id: "linux",
    category: "SYSTEMS",
    title: "Linux",
    subtitle: "Master the command line",
    description:
      "Command-line proficiency, file permissions, shell piping, process management, and essential system administration for security operations.",
    tags: ["Bash CLI", "File Permissions", "Process Lifecycle"]
  },
  {
    id: "programming",
    category: "AUTOMATION",
    title: "Programming",
    subtitle: "Automate and build tools",
    description:
      "Develop custom scripts in Python and Bash for rapid vulnerability scanning, packet crafting, payload generation, and log parsing.",
    tags: ["Python Scripting", "Sockets & APIs", "Regex & Parsers"]
  },
  {
    id: "web-security",
    category: "OFFENSIVE & DEFENSIVE",
    title: "Web Security",
    subtitle: "Find and fix vulnerabilities",
    description:
      "Audit client-server interactions, uncover OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, IDOR), and test defenses with intercepting proxies.",
    tags: ["OWASP Top 10", "Burp Suite", "Auth & Sessions"]
  },
  {
    id: "labs",
    category: "PRACTICE & WARGAMES",
    title: "Hands-on Labs",
    subtitle: "Apply your skills in real scenarios",
    description:
      "Put theory into practice through capture-the-flag (CTF) challenges, isolated cyber ranges, and real-world attack simulations.",
    tags: ["CTF Challenges", "TryHackMe Labs", "Defensive Operations"]
  }
];

export default function LearningRoadmap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = roadmapItems[activeIndex];

  return (
    <section id="roadmap" className="relative py-20 lg:py-28 bg-[#030508] border-b border-white/[0.08] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,229,255,0.03),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#00e5ff] inline-block" />
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#00e5ff] uppercase">
              THE LEARNING PATH
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3 leading-tight">
            Learn. Build. <span className="text-[#00e5ff]">Secure.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl">
            A practical path from fundamentals to real-world security.
          </p>
        </div>

        {/* Roadmap Interactive Layout: Left Timeline, Right Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Connected Vertical Timeline */}
          <div className="lg:col-span-5 relative">
            {/* Continuous Vertical Connecting Line */}
            <div className="absolute left-[13px] top-4 bottom-4 w-[1.5px] bg-white/[0.12]" />

            <div className="space-y-6 sm:space-y-7 relative">
              {roadmapItems.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className="flex items-start gap-4 text-left group w-full focus:outline-none"
                  >
                    {/* Timeline Node Ring */}
                    <div className="relative z-10 shrink-0 mt-0.5">
                      {isActive ? (
                        <div className="w-7 h-7 rounded-full border-2 border-[#00e5ff] bg-[#030508] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.5)]">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full border border-white/20 bg-[#070b14] flex items-center justify-center group-hover:border-[#00e5ff]/50 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-slate-500 group-hover:bg-[#00e5ff] transition-colors" />
                        </div>
                      )}
                    </div>

                    {/* Stage Title and Subtitle */}
                    <div>
                      <h4
                        className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${
                          isActive ? "text-white font-bold" : "text-slate-400 group-hover:text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`text-xs mt-0.5 transition-colors ${
                          isActive ? "text-slate-300" : "text-slate-500 group-hover:text-slate-400"
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

          {/* Right Column: Single Glass Detail Panel */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#070b14]/90 backdrop-blur-md p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] min-h-[380px] flex flex-col justify-between overflow-hidden group">
              
              {/* Top and Body Content */}
              <div>
                {/* Category Label */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] font-mono tracking-[0.2em] text-slate-400 uppercase font-semibold">
                    {activeItem.category}
                  </span>
                  <span className="w-8 h-[1px] bg-white/20" />
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {activeItem.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mb-8">
                  {activeItem.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side Isometric Graphic */}
              <div className="absolute right-4 bottom-14 sm:bottom-10 w-44 sm:w-56 h-36 sm:h-44 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/roadmap-isometric.png"
                    alt="Isometric terminal monitor"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Bottom Row Link */}
              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between relative z-10">
                <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                  Step 0{activeIndex + 1} of 06
                </span>
                <Link
                  href="/domains"
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors relative pb-1 ml-auto"
                >
                  <span>Explore learning path</span>
                  <ArrowRight className="w-4 h-4 text-[#00e5ff] transition-transform group-hover:translate-x-1" />
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#00e5ff]/40 group-hover:bg-[#00e5ff] transition-colors" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
