"use client";

import React from "react";
import Link from "next/link";
import { Laptop, Globe, Flag, Terminal, ArrowRight } from "lucide-react";

export default function ProjectsSection() {
  const projectNodes = [
    {
      id: "tools",
      name: "Security Tools",
      icon: Laptop,
      href: "/projects?cat=Security+Tools"
    },
    {
      id: "web",
      name: "Web Security",
      icon: Globe,
      href: "/projects?cat=Web+Security"
    },
    {
      id: "ctf",
      name: "CTF Labs",
      icon: Flag,
      href: "/projects?cat=CTF"
    }
  ];

  return (
    <section id="projects" className="relative py-20 lg:py-24 bg-[#030303] border-b border-white/[0.08] overflow-hidden">
      {/* Background Subtle Amber Atmospheric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_40%,rgba(245,158,11,0.02),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-amber-400 uppercase">
                ENGINEERING & CODE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Projects that<br />
              make an impact<span className="text-amber-400">.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 font-light">
              Build, test, and share practical security tools.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors relative pb-1 self-start sm:self-end"
          >
            <span>Project guidelines</span>
            <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-400/40 group-hover:bg-amber-400 transition-colors" />
          </Link>
        </div>

        {/* Content Layout: 3 Circular Nodes on Left, Development Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 3 Category Nodes */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-2.5 sm:gap-6">
            {projectNodes.map((node) => {
              const Icon = node.icon;
              return (
                <Link
                  key={node.id}
                  href={node.href}
                  className="flex flex-col items-center text-center group focus:outline-none"
                >
                  {/* Circular Node with Orbital Ring */}
                  <div className="relative mb-2.5 sm:mb-3 flex items-center justify-center">
                    {/* Outer thin orbital ring */}
                    <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-white/[0.08] group-hover:border-amber-400/40 transition-colors pointer-events-none" />
                    
                    {/* Orbital satellite amber dot */}
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] transition-transform group-hover:scale-125" />

                    {/* Central Glass Circle */}
                    <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full border border-white/[0.1] bg-[radial-gradient(circle_at_35%_35%,rgba(245,158,11,0.1),rgba(8,8,8,0.98))] shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center justify-center text-amber-400 group-hover:border-amber-400/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-300">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:scale-110" />
                    </div>
                  </div>

                  <span className="text-[11px] sm:text-sm font-semibold text-white group-hover:text-amber-400 transition-colors tracking-tight">
                    {node.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right Column: "Good work takes shape here." Panel */}
          <div className="lg:col-span-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
              {/* Large Central Node with Terminal Symbol */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div className="absolute -inset-3 rounded-full border border-white/[0.08] pointer-events-none" />
                <div className="absolute top-1 right-2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
                
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/[0.12] bg-[radial-gradient(circle_at_35%_35%,rgba(245,158,11,0.12),rgba(8,8,8,0.98))] shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-center">
                  <div className="w-12 h-10 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-amber-400">
                    <Terminal className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Text Information */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Good work takes shape here.
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-light mb-4">
                  Student-led projects are in development.
                </p>

                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-amber-400 transition-colors relative pb-1"
                >
                  <span>Explore project guidelines</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-400/40 group-hover:bg-amber-400 transition-colors" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
