"use client";

import React, { useState } from "react";
import Link from "next/link";
import { resourcesData, ResourceItem } from "@/data/resources";
import { ExternalLink, BookOpen, Terminal, Wrench, FileText, ArrowRight } from "lucide-react";

const categories: Array<ResourceItem["category"]> = [
  "Learn",
  "Practice",
  "Tools",
  "Cheatsheets"
];

const categoryIcons = {
  Learn: BookOpen,
  Practice: Terminal,
  Tools: Wrench,
  Cheatsheets: FileText
};

export default function ResourceVault() {
  const [activeCategory, setActiveCategory] = useState<ResourceItem["category"]>("Practice");

  const filteredResources = resourcesData.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section id="resources" className="relative py-24 bg-[#07090e] border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest text-slate-400 uppercase block mb-1">
              CURATED KNOWLEDGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Resource Vault
            </h2>
          </div>

          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors shrink-0"
          >
            <span>Browse Full Vault</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black font-semibold border-white shadow-sm"
                    : "bg-[#0d1424] border-white/[0.08] text-slate-300 hover:text-white hover:border-cyan-400/30"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredResources.map((item) => {
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-[#0d1424] via-[#090e18] to-[#060910] border border-white/[0.08] hover:border-cyan-400/35 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.85),0_0_20px_rgba(56,189,248,0.06)] overflow-hidden"
              >
                {/* Top Subtle Light Line on Hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/90 font-medium">
                      {item.topic}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-slate-400">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-slate-200">
                  <span>{item.badge || "External Link"}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
