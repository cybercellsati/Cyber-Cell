"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { CyberEvent } from "@/data/events";

export default function UpcomingEvents() {
  const [events, setEvents] = useState<CyberEvent[]>([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (data.success && Array.isArray(data.events)) {
          setEvents((data.events as CyberEvent[]).filter((e: CyberEvent) => e.status !== "Completed"));
        }
      } catch {
        // Keep fallback
      }
    }
    loadEvents();
  }, []);

  return (
    <section id="events" className="relative py-20 lg:py-28 bg-[#04060a] border-b border-white/[0.08] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(0,229,255,0.03),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#00e5ff] inline-block" />
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#00e5ff] uppercase">
                MEET • LEARN • COMPETE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
              UPCOMING <span className="text-slate-400">EVENTS</span>
            </h2>
          </div>

          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors relative pb-1 self-start sm:self-end"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4 text-[#00e5ff] transition-transform group-hover:translate-x-1" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#00e5ff]/40 group-hover:bg-[#00e5ff] transition-colors" />
          </Link>
        </div>

        {/* Content Layout: Left Featured Event Card, Right Calendar & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Featured Event Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#070b14]/90 backdrop-blur-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              
              {/* Event Image Banner */}
              <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] overflow-hidden bg-black/50">
                <Image
                  src="/images/event-exploit-workshop.png"
                  alt="EXPLOIT Intro to the Cyber Range workshop"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Event Details */}
              <div className="p-6 sm:p-8">
                {/* Meta Row: Date & Venue */}
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <div className="flex items-center gap-2 text-[#00e5ff] font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>16 OCT 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>SATI Vidisha</span>
                  </div>
                </div>

                {/* Event Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#00e5ff] transition-colors">
                  EXPLOIT — Intro to the Cyber Range
                </h3>

                {/* Event Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-light">
                  A beginner friendly, hands-on cybersecurity workshop covering network recon, packet dissection, and basic exploit mechanics.
                </p>

                {/* Divider Line */}
                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <Link
                    href="/events"
                    className="group/link inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-[#00e5ff] transition-colors"
                  >
                    <span>View event</span>
                    <ArrowRight className="w-4 h-4 text-[#00e5ff] transition-transform group-hover/link:translate-x-1" />
                  </Link>

                  {/* Attendee Stack Badge */}
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-slate-700 border-2 border-[#070b14] flex items-center justify-center text-[10px] text-white font-medium">
                        AY
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-600 border-2 border-[#070b14] flex items-center justify-center text-[10px] text-white font-medium">
                        KM
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-500 border-2 border-[#070b14] flex items-center justify-center text-[10px] text-white font-medium">
                        YH
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-300 ml-2 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10">
                      +50
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Minimalist Dark Calendar Widget */}
          <div className="lg:col-span-5 relative flex flex-col justify-between h-full">
            
            {/* Top Narrative */}
            <div className="mb-8">
              <div className="w-10 h-[2px] bg-[#00e5ff] mb-6" />
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.15] mb-3">
                Learn together.<br />
                Build something real.
              </h3>
              <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                WORKSHOPS &nbsp;/&nbsp; CTFs &nbsp;/&nbsp; TECH TALKS
              </p>
            </div>

            {/* Calendar Widget matching Reference 4 */}
            <div className="relative rounded-2xl border border-white/[0.08] bg-[#070b14]/70 backdrop-blur-md p-6 max-w-sm">
              {/* Calendar Icon Top */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                <Calendar className="w-4 h-4 text-[#00e5ff]" />
                <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                  OCTOBER 2026
                </span>
              </div>

              {/* Day Initials */}
              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] text-slate-500 mb-2 font-semibold">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>

              {/* Month Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs text-slate-400">
                {/* Empty days before 1st (Thursday) */}
                <span />
                <span />
                <span />
                <span />
                <span className="py-1">1</span>
                <span className="py-1">2</span>
                <span className="py-1">3</span>
                <span className="py-1">4</span>
                <span className="py-1">5</span>
                <span className="py-1">6</span>
                <span className="py-1">7</span>
                <span className="py-1">8</span>
                <span className="py-1">9</span>
                <span className="py-1">10</span>
                <span className="py-1">11</span>
                <span className="py-1">12</span>
                <span className="py-1">13</span>
                <span className="py-1">14</span>
                <span className="py-1">15</span>
                
                {/* Event Day 16 (Highlighted Glowing Cyan Circle) */}
                <span className="py-1 flex items-center justify-center">
                  <span className="w-6 h-6 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.5)] font-bold flex items-center justify-center text-[11px]">
                    16
                  </span>
                </span>

                <span className="py-1">17</span>
                <span className="py-1">18</span>
                <span className="py-1">19</span>
                <span className="py-1">20</span>
                <span className="py-1">21</span>
                <span className="py-1">22</span>
                <span className="py-1">23</span>
                <span className="py-1">24</span>
                <span className="py-1">25</span>
                <span className="py-1">26</span>
                <span className="py-1">27</span>
                <span className="py-1">28</span>
                <span className="py-1">29</span>
                <span className="py-1">30</span>
                <span className="py-1">31</span>
              </div>
            </div>

            {/* Vertical Accent Label & Slashes on desktop */}
            <div className="hidden xl:flex absolute -right-12 top-0 bottom-0 flex-col justify-between items-center py-2 pointer-events-none">
              <span className="text-[10px] font-mono tracking-[0.3em] text-slate-600 uppercase rotate-90 origin-center whitespace-nowrap mt-8">
                CYBER CELL
              </span>
              <span className="text-[#00e5ff] font-mono text-sm tracking-tighter">
                ///
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
