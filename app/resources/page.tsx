"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { resourcesData, ResourceItem } from "@/data/resources";
import { ExternalLink, Search, BookOpen, Terminal, Wrench, FileText } from "lucide-react";

const categories: Array<ResourceItem["category"] | "All"> = [
  "All",
  "Learn",
  "Practice",
  "Tools",
  "Cheatsheets"
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceItem["category"] | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = resourcesData.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 cyber-grid">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00e5ff] uppercase block mb-2">
              KNOWLEDGE BASE
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Cybersecurity Resource Vault
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Curated platforms, interactive wargames, open-source security toolkits, 
              and technical cheatsheets for SATI students.
            </p>
          </div>

          {/* Controls: Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#0a0e16] border border-white/[0.08]">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, topics, linux, burp..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#06080d] border border-white/[0.1] text-xs sm:text-sm text-white focus:outline-none focus:border-[#00e5ff]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-lg border transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#00e5ff]/15 border-[#00e5ff]/50 text-[#00e5ff]"
                      : "bg-[#06080d] border-white/[0.08] text-slate-300 hover:text-white hover:border-white/[0.2]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => {
              const badgeTypeStyles = {
                Official: "text-sky-400 border-sky-500/30 bg-sky-500/10",
                Community: "text-purple-400 border-purple-500/30 bg-purple-500/10",
                External: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
              }[item.type];

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-2xl bg-[#0a0e16] border border-white/[0.08] hover:border-[#00e5ff]/40 hover:bg-[#0e131e] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {item.topic} &bull; {item.category}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badgeTypeStyles}`}>
                        {item.type}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-white group-hover:text-[#00e5ff] transition-colors mb-2">
                      {item.title}
                    </h2>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-[#00e5ff]">
                    <span className="text-[11px] font-sans font-medium text-slate-300">
                      {item.badge || "Open Resource"}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm font-mono">
              No matching resources found for &quot;{searchQuery}&quot;.
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
