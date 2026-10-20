"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projectsData, CyberProject } from "@/data/projects";
import { FolderGit2, ArrowRight, Code } from "lucide-react";

import SpotlightCard from "./SpotlightCard";

const categories = [
  "All",
  "Security Tools",
  "Web Security",
  "CTF",
  "Automation",
  "Awareness",
  "Research"
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 bg-[#07090e] border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest text-[#38bdf8] uppercase block mb-1">
              ENGINEERING & CODE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Projects & Tooling
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors shrink-0 group"
          >
            <span>Project Guidelines & Repo</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-white text-black font-semibold border-white shadow-sm"
                  : "bg-[#0d1424] border-white/[0.08] text-slate-400 hover:text-white hover:border-cyan-400/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects List or Truthful Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((proj: CyberProject) => (
              <SpotlightCard
                key={proj.id}
                className="p-6 sm:p-7 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium">
                      {proj.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {proj.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <SpotlightCard className="p-8 sm:p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-400 mx-auto mb-5 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                <FolderGit2 className="w-6 h-6" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight">
                Projects are currently being developed.
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
                Check back soon. Student working groups are building defensive scripts, 
                packet inspection utilities, and CTF challenge sets. Verified repositories will appear here.
              </p>

              <Link
                href="/join"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 hover:border-cyan-400/40 hover:bg-white/[0.08] text-slate-200 hover:text-white transition-all duration-200 shadow-sm"
              >
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interested in building a project? Recruitment Info (Closed)</span>
              </Link>
            </SpotlightCard>
          </div>
        )}

      </div>
    </section>
  );
}
