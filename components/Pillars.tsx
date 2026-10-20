import React from "react";
import { GraduationCap, Laptop, Users, Lightbulb, Shield } from "lucide-react";

interface Pillar {
  title: string;
  desc: string;
  icon: React.ElementType;
}

const pillars: Pillar[] = [
  {
    title: "Learn",
    desc: "Gain practical skills from experts and peer learning sessions.",
    icon: GraduationCap
  },
  {
    title: "Practice",
    desc: "Hands-on labs and real-world cybersecurity challenges.",
    icon: Laptop
  },
  {
    title: "Collaborate",
    desc: "Work with like-minded peers across technical backgrounds.",
    icon: Users
  },
  {
    title: "Innovate",
    desc: "Build solutions and tooling for real security problems.",
    icon: Lightbulb
  },
  {
    title: "Create Impact",
    desc: "Spread awareness and promote responsible security across campus.",
    icon: Shield
  }
];

export default function Pillars() {
  return (
    <section className="relative border-y border-white/[0.07] bg-[#07090e]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const stepNum = `0${idx + 1}`;

            return (
              <div
                key={pillar.title}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-[#0d1424] via-[#090e18] to-[#060910] border border-white/[0.08] hover:border-cyan-400/35 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(56,189,248,0.06)] overflow-hidden"
              >
                {/* Top Subtle Light Line on Hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top: Icon + Micro Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-slate-200 group-hover:text-cyan-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.25)] transition-all duration-300 ease-out">
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <span className="text-[11px] font-mono font-medium tracking-widest text-slate-500 group-hover:text-cyan-400/80 transition-colors">
                    {stepNum}
                  </span>
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-white mb-1 tracking-tight group-hover:text-cyan-300 transition-colors duration-200">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-200">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
