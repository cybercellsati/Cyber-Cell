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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-black font-semibold border-white"
                    : "bg-[#0d111a] border-white/[0.07] text-slate-300 hover:text-white hover:bg-[#111622]"
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
                className="group flex flex-col justify-between p-5 rounded-xl bg-[#0d111a] border border-white/[0.07] hover:border-white/20 hover:bg-[#111622] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {item.topic}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/10 text-slate-400">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-slate-200">
                  <span>{item.badge || "External Link"}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
