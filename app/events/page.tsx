"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CyberEvent, upcomingEvents as fallbackUpcoming, pastEvents as fallbackPast } from "@/data/events";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
  Users,
  Laptop,
  CheckCircle2,
  Bell,
  ArrowRight,
  X,
  Camera,
  Layers,
  Award,
  Pin,
} from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<CyberEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activePoster, setActivePoster] = useState<string | null>(null);

  // Past Events Slider index
  const [pastIndex, setPastIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (data.success && Array.isArray(data.events) && data.events.length > 0) {
          setEvents(data.events);
        } else {
          setEvents([...fallbackUpcoming, ...fallbackPast]);
        }
      } catch (err) {
        console.warn("Failed fetching live events, using static data:", err);
        setEvents([...fallbackUpcoming, ...fallbackPast]);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setSubscribed(true);
    }
  };

  const upcomingList = events.filter((e) => e.status !== "Completed");
  const completedList = events.filter((e) => e.status === "Completed");

  // Primary upcoming featured event
  const featuredUpcoming = upcomingList.length > 0 ? upcomingList[0] : null;

  // Calculate Days To Go for the upcoming event (Image 01 reference)
  let daysToGo = 2; // Default fallback matching Image 01
  let eventMonth = "OCT. 2026";
  let eventDayNum = 25;
  let surroundingDays: { dayName: string; dayNum: number; isEventDay: boolean }[] = [];

  if (featuredUpcoming) {
    const evtDateObj = new Date(featuredUpcoming.date);
    if (!isNaN(evtDateObj.getTime())) {
      const now = new Date();
      const diffMs = evtDateObj.getTime() - now.getTime();
      const calcDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      daysToGo = Math.max(0, calcDays);

      eventMonth = evtDateObj
        .toLocaleDateString("en-US", { month: "short", year: "numeric" })
        .toUpperCase();
      eventDayNum = evtDateObj.getDate();

      // Generate 4-day timeline surrounding the event (matching Image 01 calendar strip)
      surroundingDays = [-2, -1, 0, 1].map((offset) => {
        const d = new Date(evtDateObj);
        d.setDate(d.getDate() + offset);
        return {
          dayName: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
          dayNum: d.getDate(),
          isEventDay: offset === 0,
        };
      });
    }
  }

  // If no date parsed, fallback to realistic calendar strip
  if (surroundingDays.length === 0) {
    surroundingDays = [
      { dayName: "THUR.", dayNum: 23, isEventDay: false },
      { dayName: "FRI.", dayNum: 24, isEventDay: false },
      { dayName: "SAT.", dayNum: 25, isEventDay: true },
      { dayName: "SUN.", dayNum: 26, isEventDay: false },
    ];
  }

  // Past events navigation
  const pastCount = completedList.length;
  const nextPast = () => setPastIndex((p) => (p + 1) % Math.max(1, pastCount));
  const prevPast = () => setPastIndex((p) => (p - 1 + pastCount) % Math.max(1, pastCount));

  const cardWidth = isMobile ? 310 : 400;
  const cardGap = 20;

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-red-500/20 selection:text-red-300 overflow-x-hidden">
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col w-full select-none relative pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-10 inset-x-0 h-[480px] bg-[radial-gradient(ellipse_60%_40%_at_50%_10%,rgba(239,68,68,0.07),transparent)] pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto space-y-16 relative z-10">

          {/* ========================================================
              PAGE HEADER
             ======================================================== */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-[11px] font-mono tracking-widest uppercase font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>OFFICIAL OPERATIONS &amp; SCHEDULE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Cyber Cell Events
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-slate-400 font-light leading-relaxed max-w-xl mx-auto">
              Flagship cybersecurity workshops, practical attack-defense ranges,
              and competitive capture-the-flag qualifiers hosted by SATI Vidisha.
            </p>
          </div>

          {/* ========================================================
              1. UPCOMING EVENT POSTER HERO (1:1 IMAGE 01 REFERENCE)
              TEDx-style High Impact Red & Dark Atmospheric Countdown
             ======================================================== */}
          {featuredUpcoming ? (
            <section className="relative w-full rounded-3xl lg:rounded-[36px] overflow-hidden border border-red-500/30 bg-gradient-to-b from-[#1b0507] via-[#0e0304] to-[#040102] shadow-[0_25px_80px_rgba(239,68,68,0.18)] p-6 sm:p-10 lg:p-12 transition-all">
              
              {/* Atmospheric Background Architectural Pillars (Image 01 reference) */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Red radial beam */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.22),transparent_70%)]" />
                {/* Diagonal light rays */}
                <div className="absolute -top-32 -left-20 w-72 h-[800px] bg-red-600/10 rotate-12 blur-3xl" />
                <div className="absolute -top-32 -right-20 w-72 h-[800px] bg-red-600/10 -rotate-12 blur-3xl" />
                {/* Scanline grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-40" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-8 sm:space-y-10">

                {/* Top Branding Eyebrow (Image 01 Match) */}
                <div className="w-full flex items-center justify-between text-xs font-mono text-slate-300 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold tracking-widest text-white uppercase text-sm sm:text-base">
                      CYBER CELL <span className="text-red-500">&bull;</span> SATI
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[11px]">
                    <span>@cybercellsati</span>
                    <span>&bull;</span>
                    <span className="text-red-400 font-bold uppercase">FLAGSHIP WORKSHOP</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    <span>REGISTRATION OPEN</span>
                  </div>
                </div>

                {/* Event Name & Category Title */}
                <div className="space-y-2 max-w-3xl">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-red-400 font-bold">
                    {featuredUpcoming.category} &bull; {featuredUpcoming.mode}
                  </span>

                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] drop-shadow-xl">
                    {featuredUpcoming.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed pt-1">
                    {featuredUpcoming.description.split("\n")[0]}
                  </p>
                </div>

                {/* ========================================================
                    COUNTDOWN VISUAL (EXACT IMAGE 01 MATCH):
                    Giant bold number + [ DAYS TO GO ] + [ SEPT. 2025 ]
                   ======================================================== */}
                <div className="relative flex items-center justify-center my-2 sm:my-4 select-none">
                  
                  {/* Glowing Pill Top-Right: [ DAYS TO GO ] */}
                  <div className="absolute top-2 -right-8 sm:-right-16 z-20">
                    <div className="px-4 py-1.5 rounded-full bg-red-600 border border-red-400/80 text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(239,68,68,0.8)] animate-pulse">
                      DAYS TO GO
                    </div>
                  </div>

                  {/* Giant Hero Number (e.g. 2 / 05) */}
                  <div className="relative text-[110px] sm:text-[180px] lg:text-[220px] font-black text-white leading-none tracking-tight drop-shadow-[0_15px_45px_rgba(255,255,255,0.25)] select-none font-sans">
                    {daysToGo}
                  </div>

                  {/* Glowing Pill Bottom-Left: [ OCT. 2026 ] */}
                  <div className="absolute bottom-4 -left-6 sm:-left-14 z-20">
                    <div className="px-4 py-1.5 rounded-full bg-red-600/90 border border-red-400/80 text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(239,68,68,0.7)]">
                      {eventMonth}
                    </div>
                  </div>

                </div>

                {/* ========================================================
                    CALENDAR DAY STRIP (EXACT IMAGE 01 MATCH):
                    [ THUR. 25 ] [ FRI. 26 ] [ SAT. 27 📌 ] [ SUN. 28 ]
                   ======================================================== */}
                <div className="w-full max-w-xl mx-auto">
                  <div className="grid grid-cols-4 border border-white/20 rounded-2xl overflow-hidden shadow-2xl bg-black/60 backdrop-blur-md">
                    {surroundingDays.map((d, idx) => (
                      <div
                        key={idx}
                        className={`relative py-4 sm:py-5 flex flex-col items-center justify-center transition-all ${
                          d.isEventDay
                            ? "bg-gradient-to-b from-red-600 to-red-700 text-white shadow-inner font-black"
                            : "bg-[#090b10]/90 text-slate-500 border-r border-white/10 last:border-r-0"
                        }`}
                      >
                        {/* Red 3D Pin on Event Day (Image 01 Match) */}
                        {d.isEventDay && (
                          <div className="absolute -top-2.5 right-2 sm:right-4 z-20 drop-shadow-md">
                            <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white flex items-center justify-center shadow-lg transform -rotate-12">
                              <Pin className="w-3.5 h-3.5 text-white fill-current" />
                            </div>
                          </div>
                        )}

                        <span
                          className={`text-[10px] sm:text-xs font-mono tracking-wider uppercase font-bold mb-1 ${
                            d.isEventDay ? "text-white" : "text-slate-400"
                          }`}
                        >
                          {d.dayName}
                        </span>

                        <span
                          className={`text-2xl sm:text-4xl lg:text-5xl font-black leading-none ${
                            d.isEventDay ? "text-white drop-shadow-md" : "text-slate-500"
                          }`}
                        >
                          {d.dayNum}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ========================================================
                    BOTTOM HUD DOCK CARD (EXACT IMAGE 01 MATCH):
                    [ DATE: 27TH OCT. ] | [ TIME: 10:00 AM ] | [ VENUE ]
                   ======================================================== */}
                <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white text-black p-5 sm:p-7 shadow-[0_20px_60px_rgba(255,255,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-red-500">
                  
                  {/* Left Column: DATE */}
                  <div className="text-left w-full md:w-auto border-b md:border-b-0 md:border-r border-slate-200 pb-3 md:pb-0 md:pr-8">
                    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-slate-500 block">
                      DATE:
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-black">
                        {eventDayNum}
                      </span>
                      <span className="text-sm font-black text-black uppercase">
                        {eventMonth.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Middle Column: TIME */}
                  <div className="text-left w-full md:w-auto border-b md:border-b-0 md:border-r border-slate-200 pb-3 md:pb-0 md:pr-8">
                    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-slate-500 block">
                      TIME:
                    </span>
                    <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-black block mt-1">
                      {featuredUpcoming.time}
                    </span>
                  </div>

                  {/* Right Column: VENUE */}
                  <div className="text-left w-full md:flex-1 md:pr-6">
                    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-slate-500 block">
                      VENUE:
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug block mt-0.5">
                      {featuredUpcoming.venue}
                    </span>
                  </div>

                  {/* CTA Register Button */}
                  <div className="w-full md:w-auto">
                    {featuredUpcoming.registrationLink ? (
                      <a
                        href={featuredUpcoming.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-mono font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_10px_30px_rgba(239,68,68,0.4)] group"
                      >
                        <span>Register For Pass</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <Link
                        href={`/events/${featuredUpcoming.id}`}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-black text-white hover:bg-red-600 font-mono font-bold text-xs uppercase tracking-wider transition-all"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>

                </div>

                {/* Important Highlights Row */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-xs font-mono text-slate-300">
                  <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-red-400" />
                    <span>{featuredUpcoming.capacity || "160 Seats Capacity"}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-red-400" />
                    <span>Tools: {featuredUpcoming.toolsRequired || "Personal Laptop"}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-red-400" />
                    <span>Verified SATI Certificate</span>
                  </div>
                </div>

              </div>
            </section>
          ) : (
            /* Anticipation State if no upcoming event */
            <section className="relative rounded-3xl border border-white/10 bg-[#090c13] p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2">
                Next Flagship Operation In Progress
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-8 font-light leading-relaxed">
                The Cyber Cell executive board is preparing the next campus CTF bootcamp.
                Enter your college email to get notified the second registration opens.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your college or personal email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-red-500 text-white font-mono font-bold text-xs uppercase hover:bg-red-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-500/25"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Notify Me</span>
                  </button>
                </form>
              ) : (
                <div className="inline-flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Notification registered. You will receive priority access!</span>
                </div>
              )}
            </section>
          )}

          {/* ========================================================
              2. PAST EVENTS SECTION (MINIMALIST & PREMIUM SLIDER)
              Inspired by Image 02 with Frosted Glass Tiles & Animations
             ======================================================== */}
          <section className="space-y-6 pt-10 border-t border-white/10">
            
            {/* Section Header with Slider Navigation Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 font-bold">
                  &mdash; DECLASSIFIED OPERATIONS &bull; CAMPUS ARCHIVE
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                  Past Flagship Events &amp; Recaps
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-light max-w-lg">
                  Hands-on bootcamps, security drills, and competitive CTFs organized by Cyber Cell SATI.
                </p>
              </div>

              {/* Slider Arrows & Counter */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={prevPast}
                  aria-label="Previous past event"
                  className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-red-400/50 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="text-xs font-mono text-slate-400 px-2">
                  <span className="font-bold text-white">{String(pastIndex + 1).padStart(2, "0")}</span>
                  <span> / </span>
                  <span>{String(pastCount).padStart(2, "0")}</span>
                </div>

                <button
                  type="button"
                  onClick={nextPast}
                  aria-label="Next past event"
                  className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-red-400/50 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Interactive Slider Track (Image 02 Dark Glass aesthetic) */}
            <div className="relative w-full overflow-hidden py-4">
              <div
                className="flex items-stretch gap-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `translateX(-${pastIndex * (cardWidth + cardGap)}px)`,
                }}
              >
                {completedList.map((evt, idx) => (
                  <div
                    key={evt.id}
                    className={`relative w-[310px] sm:w-[400px] rounded-[28px] overflow-hidden shrink-0 border transition-all duration-500 flex flex-col justify-between group select-none ${
                      idx === pastIndex
                        ? "border-red-500/50 bg-[#0d0708] shadow-[0_20px_50px_rgba(239,68,68,0.12)] scale-[1.01]"
                        : "border-white/10 hover:border-white/25 bg-[#090b10] opacity-85 hover:opacity-100"
                    }`}
                  >
                    <div>
                      {/* Photo Banner with Hover Zoom */}
                      <div
                        onClick={() => evt.image && setActivePoster(evt.image)}
                        className="relative w-full h-52 bg-slate-950 overflow-hidden cursor-pointer group/img"
                      >
                        {evt.image ? (
                          <Image
                            src={evt.image}
                            alt={evt.title}
                            fill
                            className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                            sizes="(max-width: 640px) 310px, 400px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                            <Layers className="w-10 h-10 text-slate-600" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-black/30 to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold bg-black/70 backdrop-blur-md border border-white/15 text-red-400">
                            {evt.category}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-white/10 backdrop-blur-md border border-white/15 text-slate-300">
                            COMPLETED
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-red-400" />
                          <span>{evt.date}</span>
                          <span>&bull;</span>
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate max-w-[140px]">{evt.venue.split(",")[0]}</span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white leading-snug group-hover:text-red-300 transition-colors">
                          <Link href={`/events/${evt.id}`}>{evt.title}</Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed line-clamp-2">
                          {evt.description}
                        </p>

                        {/* Tags */}
                        {evt.tags && evt.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {evt.tags.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.03] border border-white/[0.08] text-slate-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-4 sm:p-5 bg-black/40 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-red-400" />
                        <span>{evt.capacity || "100+ Attended"}</span>
                      </span>

                      <Link
                        href={`/events/${evt.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-red-500 hover:text-white border border-white/10 hover:border-red-400 text-xs font-mono text-slate-200 transition-all cursor-pointer group/btn"
                      >
                        <span>View Recap &amp; Gallery</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Slider Progress Bar Line */}
            <div className="w-full max-w-xs mx-auto h-[2px] bg-white/10 rounded-full overflow-hidden mt-4">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 ease-out"
                style={{
                  width: `${((pastIndex + 1) / Math.max(1, pastCount)) * 100}%`,
                }}
              />
            </div>

          </section>

        </div>
      </main>

      {/* Poster Fullscreen Lightbox Modal */}
      {activePoster && (
        <div
          onClick={() => setActivePoster(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border border-white/20 bg-black shadow-2xl"
          >
            <button
              onClick={() => setActivePoster(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-[85vw] max-w-3xl h-[72vh]">
              <Image
                src={activePoster}
                alt="Event Poster Full View"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Global Comprehensive Footer */}
      <Footer />
    </div>
  );
}
