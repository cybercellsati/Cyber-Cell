"use client";

import React, { useState } from "react";
import { learningRoadmap, RoadmapStage } from "@/data/roadmap";
import { ChevronRight, BookOpen, Terminal, CheckCircle2, ArrowRight } from "lucide-react";

export default function LearningRoadmap() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage: RoadmapStage = learningRoadmap[activeStageIndex];

  return (
    <section id="roadmap" className="relative py-24 bg-[#07090e] border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-medium tracking-widest text-[#38bdf8] uppercase block mb-2">
            STUDENT PATHWAY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cybersecurity Learning Roadmap
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            A progressive curriculum crafted for SATI engineering students. 
            Select any stage to inspect required skills, fundamental concepts, and actionable practice drills.
          </p>
        </div>

        {/* Roadmap Interactive Layout: Left Stages Stepper, Right Stage Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 9-Stage Stepper */}
          <div className="lg:col-span-5 space-y-1.5">
            {learningRoadmap.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-center justify-between group ${
                    isActive
                      ? "bg-[#111622] border-white/20"
                      : "bg-[#0d111a] border-white/[0.06] hover:bg-[#111622] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isActive
                          ? "bg-white text-black"
                          : "bg-white/[0.05] text-slate-400 group-hover:text-white"
                      }`}
                    >
                      {stage.step}
                    </span>
                    <div>
                      <h3
                        className={`text-xs sm:text-sm font-semibold transition-colors ${
                          isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive
                        ? "text-white translate-x-0.5"
                        : "text-slate-600 group-hover:text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Stage Deep-Dive Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-[#0d111a] border border-white/[0.08] relative">
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08] font-semibold">
                    STAGE {currentStage.step} OF 09
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    SATI Student Curriculum
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentStage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {currentStage.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Skills Grid */}
              <div>
                <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 mb-2.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                  Key Skills to Acquire
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStage.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-slate-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Concepts */}
              <div>
                <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  Fundamental Concepts
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentStage.concepts.map((concept, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Practice Drill */}
              <div>
                <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  Hands-on Practice Drill
                </h4>
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs text-slate-300 leading-relaxed font-mono">
                  {currentStage.practiceSuggestion}
                </div>
              </div>

              {/* Study Resources */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  Recommended Study Materials
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentStage.recommendedResources.map((res, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300"
                    >
                      <span className="text-white font-medium">{res.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">({res.type})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Stage */}
              <div className="pt-5 border-t border-white/[0.07] flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  <span>Next: </span>
                  <span className="text-slate-200 font-semibold">{currentStage.nextStage}</span>
                </div>

                {activeStageIndex < learningRoadmap.length - 1 && (
                  <button
                    onClick={() => setActiveStageIndex((prev) => Math.min(prev + 1, learningRoadmap.length - 1))}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-slate-300 transition-colors"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
