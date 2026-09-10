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
    <section className="relative border-y border-white/[0.07] bg-[#080b11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x divide-white/[0.07]">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`relative flex flex-col justify-start group p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.02] ${
                  idx === 0 ? "lg:pl-0 lg:pr-6" : idx === pillars.length - 1 ? "lg:pl-6 lg:pr-0" : "lg:px-6"
                }`}
              >
                {/* Icon with smooth float animation */}
                <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-300 mb-4 group-hover:-translate-y-1 group-hover:text-[#38bdf8] group-hover:border-[#38bdf8]/30 group-hover:bg-[#38bdf8]/[0.05] transition-all duration-300 ease-out shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-1.5 tracking-tight group-hover:text-[#38bdf8] transition-colors duration-200">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-200">
                  {pillar.desc}
                </p>

                {/* Subtle bottom line hover expansion */}
                <div className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
