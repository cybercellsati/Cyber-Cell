"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projectsData, CyberProject } from "@/data/projects";
import { FolderGit2, ArrowRight, Code } from "lucide-react";

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
            <span className="text-xs font-mono font-medium tracking-widest text-slate-400 uppercase block mb-1">
              ENGINEERING & CODE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Projects & Tooling
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors shrink-0"
          >
            <span>Project Guidelines & Repo</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                activeCategory === cat
                  ? "bg-white text-black font-semibold border-white"
                  : "bg-[#0d111a] border-white/[0.07] text-slate-400 hover:text-white hover:border-white/20"
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
              <div
                key={proj.id}
                className="p-6 rounded-xl bg-[#0d111a] border border-white/[0.07] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-3">
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                      {proj.category}
                    </span>
                    <span className="text-slate-400">{proj.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{proj.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-[#0d111a] border border-white/[0.07] p-8 sm:p-12 text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-300 mx-auto mb-4">
              <FolderGit2 className="w-6 h-6 opacity-75" />
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
              className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg bg-white/[0.04] border border-white/15 hover:border-white/30 text-slate-200 hover:text-white transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-slate-400" />
              <span>Interested in building a project? Join Cyber Cell</span>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
