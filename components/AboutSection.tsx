import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Flag, Cpu, Layers } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

interface Characteristic {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const characteristics: Characteristic[] = [
  {
    title: "CTF Competitions",
    desc: "Training student teams for regional and national cyber wargames.",
    icon: Flag
  },
  {
    title: "Projects & Research",
    desc: "Engineering defensive tools, audit scripts, and automated utilities.",
    icon: Cpu
  },
  {
    title: "Cyber Awareness",
    desc: "Hosting security hygiene and anti-phishing sessions across campus.",
    icon: ShieldCheck
  },
  {
    title: "Peer Community",
    desc: "Collaborative mentorship between senior and junior batches.",
    icon: Layers
  }
];

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-[#07090e] border-b border-white/[0.07] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono font-medium tracking-widest text-[#38bdf8] uppercase block mb-2">
            ABOUT US
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            More Than a Club
          </h2>
        </div>

        {/* 3-Column Desktop Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Story & Mission with Spotlight */}
          <div className="lg:col-span-4 h-full">
            <SpotlightCard className="p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Cyber Cell is a student-driven initiative focused on cybersecurity 
                  education, hands-on learning and community building.
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Operating at Samrat Ashok Technological Institute (SATI), we aim to create awareness, 
                  develop practical skills, and inspire the next generation of cybersecurity professionals.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/[0.06]">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-4 py-2 rounded-lg border border-white/15 hover:border-white/30 text-white hover:bg-white/[0.04] transition-colors"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </SpotlightCard>
          </div>

          {/* Column 2: Architectural Lab Visual */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c1018] min-h-[360px] lg:min-h-full group hover:border-white/20 transition-all duration-300">
            <Image
              src="/images/about-lab.jpg"
              alt="Cyber Cell research facility and lab entrance"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
              sizes="(max-width: 1024px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#07090e]/85 backdrop-blur-md border border-white/[0.08] group-hover:border-white/20 transition-colors">
              <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase mb-1">
                CAMPUS INITIATIVE
              </div>
              <div className="text-base font-bold font-mono tracking-wider text-white">
                DISCOVER &bull; DEFEND &bull; DEVELOP
              </div>
            </div>
          </div>

          {/* Column 3: What Defines Us with Spotlight */}
          <div className="lg:col-span-4 h-full">
            <SpotlightCard className="p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-medium tracking-widest text-slate-400 uppercase">
                    OUR PILLARS
                  </span>
                  <span className="text-xs font-mono text-[#38bdf8]">WHAT WE DO</span>
                </div>

                <div className="space-y-2">
                  {characteristics.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="group/item p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-cyan-400/25 transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5 mb-1">
                          <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover/item:text-cyan-300 group-hover/item:border-cyan-400/30 transition-colors">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-semibold text-white group-hover/item:text-cyan-300 transition-colors">{item.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug pl-[34px]">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-500">
                Official Student Body &bull; SATI Vidisha
              </div>
            </SpotlightCard>
          </div>

        </div>
      </div>
    </section>
  );
}
