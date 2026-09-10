import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { focusAreas } from "@/data/focusAreas";
import { 
  ShieldAlert, 
  Network, 
  Globe, 
  Bug, 
  Search, 
  Flag, 
  ShieldCheck, 
  TrendingUp, 
  Wrench, 
  BookOpen, 
  Compass, 
  CheckCircle2 
} from "lucide-react";

export const metadata = {
  title: "Domains & Curricula | Cyber Cell SATI",
  description: "Explore the eight specialized cybersecurity domains cultivated at Cyber Cell, SATI Vidisha."
};

const iconMap: Record<string, React.ElementType> = {
  ShieldAlert,
  Network,
  Globe,
  Bug,
  Search,
  Flag,
  ShieldCheck,
  TrendingUp
};

export default function DomainsPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 cyber-grid">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00e5ff] uppercase block mb-2">
              ACADEMIC SPECIALIZATIONS
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Cybersecurity Domains
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Eight comprehensive tracks covering foundational networking, offensive exploitation, 
              reverse engineering, forensics, and modern campus defense.
            </p>
          </div>

          {/* Domains Expanded List */}
          <div className="space-y-8">
            {focusAreas.map((domain) => {
              const Icon = iconMap[domain.icon] || ShieldCheck;
              const levelColor = {
                Beginner: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
                Intermediate: "text-amber-400 border-amber-500/30 bg-amber-500/10",
                Advanced: "text-red-400 border-red-500/30 bg-red-500/10"
              }[domain.level];

              return (
                <div
                  key={domain.id}
                  id={domain.id}
                  className="p-6 sm:p-8 rounded-2xl bg-[#0a0e16] border border-white/[0.08] hover:border-[#00e5ff]/30 transition-all space-y-6"
                >
                  {/* Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${levelColor}`}>
                            {domain.level}
                          </span>
                          <span className="text-xs font-mono text-slate-500">SATI Track</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                          {domain.name}
                        </h2>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-md sm:text-right">
                      {domain.shortDesc}
                    </p>
                  </div>

                  {/* Body Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Learn Summary */}
                    <div className="lg:col-span-1 space-y-2">
                      <h3 className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#00e5ff] font-semibold">
                        <BookOpen className="w-4 h-4" />
                        Domain Scope
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-3.5 rounded-lg border border-white/[0.04]">
                        {domain.learnSummary}
                      </p>
                    </div>

                    {/* Core Topics */}
                    <div className="lg:col-span-1 space-y-2">
                      <h3 className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#00e5ff] font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Key Topics
                      </h3>
                      <div className="space-y-1.5">
                        {domain.coreTopics.map((topic, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded bg-white/[0.02] border border-white/[0.04]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools & Entry Point */}
                    <div className="lg:col-span-1 space-y-4">
                      <div>
                        <h3 className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#00e5ff] font-semibold mb-2">
                          <Wrench className="w-4 h-4" />
                          Recommended Tools
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {domain.tools.map((t) => (
                            <span
                              key={t}
                              className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-slate-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="flex items-center gap-1.5 text-xs font-mono uppercase text-slate-400 font-semibold mb-1.5">
                          <Compass className="w-4 h-4 text-[#00e5ff]" />
                          First Step for Beginners
                        </h3>
                        <p className="text-xs text-slate-300 bg-[#00e5ff]/[0.03] p-3 rounded border border-[#00e5ff]/20 leading-relaxed">
                          {domain.suggestedStartingPoint}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
