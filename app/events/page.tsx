"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Layers,
  Award,
  Pin,
  Terminal,
} from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<CyberEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Active cover photo per event card: { [eventId]: activeImageUrl }
  const [activeCoverPhoto, setActiveCoverPhoto] = useState<Record<string, string>>({});

  // Full-screen multi-photo lightbox modal
  const [lightboxData, setLightboxData] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);

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

  const isDummyUpcoming = Boolean(
    featuredUpcoming && (
      featuredUpcoming.id?.toLowerCase().includes("dummy") ||
      featuredUpcoming.title?.toLowerCase().includes("dummy") ||
      featuredUpcoming.tags?.some((t) => t.toLowerCase().includes("dummy")) ||
      featuredUpcoming.description?.toLowerCase().includes("dummy")
    )
  );

  // Calculate Days To Go for the upcoming event (Image 01 reference)
  let daysToGo = 38;
  let eventMonth = "NOV. 2026";
  let eventDayNum = 28;
  let surroundingDays: { dayName: string; dayNum: number; isEventDay: boolean }[] = [];

  if (featuredUpcoming && featuredUpcoming.date) {
    const parts = featuredUpcoming.date.split("-").map(Number);
    let evtDateObj: Date;
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      evtDateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      evtDateObj = new Date(featuredUpcoming.date);
    }

    if (!isNaN(evtDateObj.getTime())) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const target = new Date(evtDateObj.getFullYear(), evtDateObj.getMonth(), evtDateObj.getDate());
      const diffMs = target.getTime() - today.getTime();
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

  // Fallback calendar strip if no date parsed
  if (surroundingDays.length === 0) {
    surroundingDays = [
      { dayName: "THUR.", dayNum: 26, isEventDay: false },
      { dayName: "FRI.", dayNum: 27, isEventDay: false },
      { dayName: "SAT.", dayNum: 28, isEventDay: true },
      { dayName: "SUN.", dayNum: 29, isEventDay: false },
    ];
  }

  // Past events slider helpers
  const pastCount = completedList.length;
  const nextPast = () => setPastIndex((p) => (p + 1) % Math.max(1, pastCount));
  const prevPast = () => setPastIndex((p) => (p - 1 + pastCount) % Math.max(1, pastCount));

  const cardWidth = isMobile ? 310 : 380;
  const cardGap = 20;

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300 overflow-x-hidden">
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col w-full select-none relative pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Ambient Radial Gold Glow */}
        <div className="absolute top-10 inset-x-0 h-[480px] bg-[radial-gradient(ellipse_60%_40%_at_50%_10%,rgba(245,158,11,0.06),transparent)] pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto space-y-16 relative z-10">

          {/* ========================================================
              PAGE HEADER
             ======================================================== */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-mono tracking-widest uppercase font-bold">
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
              TEDx Style High-Impact Poster Layout in Signature Cyber Amber Palette
             ======================================================== */}
          {featuredUpcoming ? (
            <section className="relative w-full rounded-3xl lg:rounded-[36px] overflow-hidden border border-amber-400/30 bg-gradient-to-b from-[#140f06] via-[#090703] to-[#040301] shadow-[0_25px_80px_rgba(245,158,11,0.14)] p-6 sm:p-10 lg:p-12 transition-all">
              
              {/* Atmospheric Background Architectural Lighting (Image 01 reference) */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Amber top radial spotlight */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.18),transparent_70%)]" />
                {/* Diagonal light beams */}
                <div className="absolute -top-32 -left-20 w-72 h-[800px] bg-amber-500/10 rotate-12 blur-3xl" />
                <div className="absolute -top-32 -right-20 w-72 h-[800px] bg-amber-500/10 -rotate-12 blur-3xl" />
                {/* Scanline grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-40" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-7 sm:space-y-9">

                {/* Explicit High-Visibility Dummy Upcoming Event Notice Banner */}
                {isDummyUpcoming && (
                  <div className="w-full py-3.5 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border-2 border-dashed border-amber-400/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left backdrop-blur-md shadow-xl">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-mono font-black tracking-wider uppercase shrink-0 shadow-md">
                        ⚠️ DUMMY EVENT
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-mono font-extrabold text-amber-200 uppercase tracking-wide">
                          SAMPLE DEMO PREVIEW ONLY &bull; YEH EK DUMMY UPCOMING EVENT HAI
                        </p>
                        <p className="text-[11px] font-sans text-slate-300 font-normal">
                          Upcoming event section ka UI aur countdown poster preview karne ke liye yeh dummy event add kiya gaya hai. Real official club events administrative confirmation par announce honge.
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-xl bg-black/80 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-extrabold uppercase tracking-widest shrink-0 shadow-inner">
                      DEMO MODE &bull; NOT A REAL EVENT
                    </span>
                  </div>
                )}

                {/* Top Branding Eyebrow (Image 01 Match) */}
                <div className="w-full flex items-center justify-between text-xs font-mono text-slate-300 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold tracking-widest text-white uppercase text-sm sm:text-base">
                      CYBER CELL <span className="text-amber-400">&bull;</span> SATI
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[11px]">
                    <span>@cybercellsati</span>
                    <span>&bull;</span>
                    <span className="text-amber-400 font-bold uppercase">
                      {isDummyUpcoming ? "SAMPLE DEMO OPERATION" : "FLAGSHIP WORKSHOP"}
                    </span>
                  </div>

                  {isDummyUpcoming ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span>⚠️ DUMMY UPCOMING EVENT</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span>REGISTRATION OPEN</span>
                    </div>
                  )}
                </div>

                {/* Event Name & Category Title */}
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
                      {featuredUpcoming.category} &bull; {featuredUpcoming.mode}
                    </span>
                    {isDummyUpcoming && (
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[10px] font-mono font-black tracking-widest uppercase">
                        [DUMMY PREVIEW]
                      </span>
                    )}
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] drop-shadow-xl">
                    {featuredUpcoming.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed pt-1">
                    {featuredUpcoming.description.split("\n")[0]}
                  </p>
                </div>

                {/* ========================================================
                    COUNTDOWN VISUAL (EXACT IMAGE 01 MATCH):
                    Giant bold number + [ DAYS TO GO ]
                   ======================================================== */}
                <div className="relative flex items-center justify-center my-2 sm:my-4 select-none">
                  
                  {/* Glowing Pill Top-Right: [ DAYS TO GO ] */}
                  <div className="absolute top-2 -right-8 sm:-right-16 z-20">
                    <div className="px-4 py-1.5 rounded-full bg-amber-400 border border-amber-300 text-black font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(245,158,11,0.7)] animate-pulse">
                      DAYS TO GO
                    </div>
                  </div>

                  {/* Giant Hero Number (e.g. 38) */}
                  <div className="relative text-[110px] sm:text-[180px] lg:text-[220px] font-black text-white leading-none tracking-tight drop-shadow-[0_15px_45px_rgba(245,158,11,0.2)] select-none font-sans">
                    {daysToGo}
                  </div>

                </div>

                {/* ========================================================
                    CALENDAR DAY STRIP (EXACT IMAGE 01 MATCH):
                    [ THUR. 26 ] [ FRI. 27 ] [ SAT. 28 📌 ] [ SUN. 29 ]
                   ======================================================== */}
                <div className="w-full max-w-xl mx-auto">
                  <div className="grid grid-cols-4 border border-white/20 rounded-2xl overflow-hidden shadow-2xl bg-black/60 backdrop-blur-md">
                    {surroundingDays.map((d, idx) => (
                      <div
                        key={idx}
                        className={`relative py-4 sm:py-5 flex flex-col items-center justify-center transition-all ${
                          d.isEventDay
                            ? "bg-gradient-to-b from-amber-400 to-amber-500 text-black shadow-inner font-black"
                            : "bg-[#090b10]/90 text-slate-500 border-r border-white/10 last:border-r-0"
                        }`}
                      >
                        {/* Golden Pin on Event Day (Image 01 Match) */}
                        {d.isEventDay && (
                          <div className="absolute -top-2.5 right-2 sm:right-4 z-20 drop-shadow-md">
                            <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-black flex items-center justify-center shadow-lg transform -rotate-12">
                              <Pin className="w-3.5 h-3.5 text-black fill-current" />
                            </div>
                          </div>
                        )}

                        <span
                          className={`text-[10px] sm:text-xs font-mono tracking-wider uppercase font-bold mb-1 ${
                            d.isEventDay ? "text-black" : "text-slate-400"
                          }`}
                        >
                          {d.dayName}
                        </span>

                        <span
                          className={`text-2xl sm:text-4xl lg:text-5xl font-black leading-none ${
                            d.isEventDay ? "text-black drop-shadow-sm" : "text-slate-500"
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
                    [ DATE: 28TH NOV. ] | [ TIME: 10:00 AM ] | [ VENUE ]
                   ======================================================== */}
                <div className="w-full max-w-4xl mx-auto rounded-3xl bg-[#090b10]/95 text-white p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-amber-400/50 backdrop-blur-xl">
                  
                  {/* Left Column: DATE */}
                  <div className="text-left w-full md:w-auto border-b md:border-b-0 md:border-r border-white/15 pb-3 md:pb-0 md:pr-8">
                    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-amber-400 block">
                      DATE:
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white">
                        {eventDayNum}
                      </span>
                      <span className="text-sm font-black text-amber-400 uppercase">
                        {eventMonth.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Middle Column: TIME */}
                  <div className="text-left w-full md:w-auto border-b md:border-b-0 md:border-r border-white/15 pb-3 md:pb-0 md:pr-8">
                    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-amber-400 block">
                      TIME:
                    </span>
                    <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white block mt-1">
                      {featuredUpcoming.time}
                    </span>
                  </div>

                  {/* Right Column: VENUE */}
                  <div className="text-left w-full md:flex-1 md:pr-6">
                    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-amber-400 block">
                      VENUE:
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-200 leading-snug block mt-0.5">
                      {featuredUpcoming.venue}
                    </span>
                  </div>

                  {/* CTA Register Button */}
                  <div className="w-full md:w-auto">
                    {isDummyUpcoming ? (
                      <div className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-amber-400/15 border border-amber-400/40 text-amber-300 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider cursor-default shadow-md">
                        <span>⚠️ Dummy Event (Sample Only)</span>
                      </div>
                    ) : featuredUpcoming.registrationLink ? (
                      <a
                        href={featuredUpcoming.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_10px_30px_rgba(245,158,11,0.35)] group"
                      >
                        <span>Register For Pass</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <Link
                        href={`/events/${featuredUpcoming.id}`}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white text-black hover:bg-amber-400 font-mono font-bold text-xs uppercase tracking-wider transition-all"
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
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{featuredUpcoming.capacity ? `${featuredUpcoming.capacity} Seats` : "160 Seats Capacity"}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tools: {featuredUpcoming.toolsRequired || "Personal Laptop"}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Verified SATI Certificate</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hands-On Labs &amp; CTF</span>
                  </div>
                </div>

              </div>
            </section>
          ) : (
            /* Anticipation State if no upcoming event */
            <section className="relative rounded-3xl border border-white/10 bg-[#090b10] p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
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
                    className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-amber-400 text-black font-mono font-bold text-xs uppercase hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-400/25"
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
              2. PAST EVENTS SECTION (REAL DATA & MINIMALIST PREMIUM ARCHIVE)
             ======================================================== */}
          <section className="space-y-6 pt-10 border-t border-white/10">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold">
                  &mdash; DECLASSIFIED OPERATIONS &bull; CAMPUS ARCHIVE
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                  Past Flagship Events &amp; Recaps
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-light max-w-lg">
                  Archived bootcamps, security drills, and competitive CTFs organized by Cyber Cell SATI.
                </p>
              </div>

              {/* Slider Arrows if multiple events exist */}
              {completedList.length > 1 && (
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={prevPast}
                    aria-label="Previous past event"
                    className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/50 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
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
                    className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/50 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* If 1 Event: Render the Flagship Wide Showcase Card */}
            {completedList.length === 1 ? (
              (() => {
                const evt = completedList[0];
                const allEvtImages: string[] = [];
                if (Array.isArray(evt.images) && evt.images.length > 0) {
                  evt.images.forEach((img) => {
                    if (img && !allEvtImages.includes(img)) allEvtImages.push(img);
                  });
                } else if (evt.image) {
                  allEvtImages.push(evt.image);
                }
                const activeImg = activeCoverPhoto[evt.id] || allEvtImages[0] || "/images/event-exploit-workshop.png";

                return (
                  <div className="relative rounded-[32px] overflow-hidden border border-amber-400/35 bg-gradient-to-b from-[#110d06] via-[#090703] to-[#040301] shadow-[0_25px_70px_rgba(245,158,11,0.12)] p-6 sm:p-8 lg:p-10 transition-all">
                    
                    {/* Ambient subtle glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                      
                      {/* Left: Media Showcase (Photo + Interactive Thumbnail Strip) */}
                      <div className="lg:col-span-6 space-y-4">
                        {/* Main Cover Photo */}
                        <div
                          onClick={() =>
                            setLightboxData({
                              images: allEvtImages,
                              index: allEvtImages.indexOf(activeImg) >= 0 ? allEvtImages.indexOf(activeImg) : 0,
                              title: evt.title,
                            })
                          }
                          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-white/15 cursor-pointer group shadow-2xl"
                        >
                          <Image
                            src={activeImg}
                            alt={evt.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 1024px) 100vw, 550px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                          {/* Floating Top Badges */}
                          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold bg-black/80 backdrop-blur-md border border-amber-400/35 text-amber-400">
                              {evt.category} &bull; {evt.mode}
                            </span>
                            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-extrabold bg-amber-400 text-black shadow-md">
                              COMPLETED
                            </span>
                          </div>

                          {/* Hover Expand Hint */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white pointer-events-none">
                            <span className="px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur border border-white/15 text-amber-300 text-[11px] flex items-center gap-1.5">
                              <span>📸</span>
                              <span>{allEvtImages.length} Real Photos</span>
                            </span>
                            <span className="px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur border border-white/15 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to expand ↗
                            </span>
                          </div>
                        </div>

                        {/* Interactive Thumbnail Gallery Strip */}
                        {allEvtImages.length > 1 && (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                              <span>Event Gallery Preview:</span>
                              <span className="text-amber-400/90 font-medium">Click thumbnail to switch preview</span>
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                              {allEvtImages.slice(0, 6).map((img, tIdx) => {
                                const isSelected = img === activeImg;
                                return (
                                  <button
                                    key={tIdx}
                                    type="button"
                                    onClick={() =>
                                      setActiveCoverPhoto((prev) => ({
                                        ...prev,
                                        [evt.id]: img,
                                      }))
                                    }
                                    className={`relative aspect-square rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
                                      isSelected
                                        ? "border-amber-400 ring-2 ring-amber-400/60 scale-105 shadow-md shadow-amber-400/20"
                                        : "border-white/15 opacity-70 hover:opacity-100 hover:border-amber-400/50"
                                    }`}
                                  >
                                    <Image
                                      src={img}
                                      alt={`Preview ${tIdx + 1}`}
                                      fill
                                      className="object-cover"
                                      sizes="80px"
                                    />
                                    {isSelected && (
                                      <span className="absolute inset-0 bg-amber-400/10 pointer-events-none" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right: Event Information & Outcomes */}
                      <div className="lg:col-span-6 space-y-5">
                        
                        {/* Meta strip */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            <span>{evt.date}</span>
                          </div>
                          {evt.time && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              <span>{evt.time}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span className="truncate max-w-[180px]">{evt.venue.split(",")[0]}</span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-2">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight hover:text-amber-300 transition-colors">
                            <Link href={`/events/${evt.id}`}>{evt.title}</Link>
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                            {evt.description.split("\n\n")[0] || evt.description}
                          </p>
                        </div>

                        {/* 3-Phase Highlights Breakdown */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                          <div className="p-3 rounded-2xl bg-black/50 border border-white/[0.08] space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                              Phase 01
                            </span>
                            <span className="text-xs font-bold text-white block">
                              Explore Domains
                            </span>
                            <span className="text-[11px] text-slate-400 block leading-tight font-light">
                              Cybersecurity careers &amp; foundations
                            </span>
                          </div>

                          <div className="p-3 rounded-2xl bg-black/50 border border-white/[0.08] space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                              Phase 02
                            </span>
                            <span className="text-xs font-bold text-white block">
                              Attack / Defend
                            </span>
                            <span className="text-[11px] text-slate-400 block leading-tight font-light">
                              Practical live exploit demonstrations
                            </span>
                          </div>

                          <div className="p-3 rounded-2xl bg-black/50 border border-white/[0.08] space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                              Phase 03
                            </span>
                            <span className="text-xs font-bold text-white block">
                              Cyber Challenge
                            </span>
                            <span className="text-[11px] text-slate-400 block leading-tight font-light">
                              Interactive hands-on mini-wargame
                            </span>
                          </div>
                        </div>

                        {/* Speakers & Mentors */}
                        {evt.speakers && evt.speakers.length > 0 && (
                          <div className="pt-2 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-mono text-slate-400 mr-1">Conducted By:</span>
                            {evt.speakers.map((spk, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-200"
                              >
                                <span className="font-bold text-amber-400">{spk.name}</span>
                                {spk.role && <span className="text-slate-400 text-[11px] ml-1">({spk.role})</span>}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Action buttons & stats */}
                        <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                            <div className="px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-300 flex items-center gap-1.5 font-bold">
                              <Users className="w-3.5 h-3.5 text-amber-400" />
                              <span>{evt.capacity || "160"} First-Years Attended</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() =>
                                setLightboxData({
                                  images: allEvtImages,
                                  index: allEvtImages.indexOf(activeImg) >= 0 ? allEvtImages.indexOf(activeImg) : 0,
                                  title: evt.title,
                                })
                              }
                              className="px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
                            >
                              <span>View All {allEvtImages.length} Photos</span>
                            </button>

                            <Link
                              href={`/events/${evt.id}`}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_10px_25px_rgba(245,158,11,0.25)] group"
                            >
                              <span>Full Session Recap</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })()
            ) : completedList.length > 1 ? (
              /* Slider for multiple past events */
              <div className="relative w-full overflow-hidden py-4">
                <div
                  className="flex items-stretch gap-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `translateX(-${pastIndex * (cardWidth + cardGap)}px)`,
                  }}
                >
                  {completedList.map((evt, idx) => {
                    const allEvtImages: string[] = [];
                    if (Array.isArray(evt.images) && evt.images.length > 0) {
                      evt.images.forEach((img) => {
                        if (img && !allEvtImages.includes(img)) allEvtImages.push(img);
                      });
                    } else if (evt.image) {
                      allEvtImages.push(evt.image);
                    }
                    const activeImg = activeCoverPhoto[evt.id] || allEvtImages[0] || "/images/event-exploit-workshop.png";

                    return (
                      <div
                        key={evt.id}
                        className={`relative w-[310px] sm:w-[380px] rounded-[28px] overflow-hidden shrink-0 border transition-all duration-500 flex flex-col justify-between group select-none ${
                          idx === pastIndex
                            ? "border-amber-400/50 bg-[#0d0a06] shadow-[0_20px_50px_rgba(245,158,11,0.12)] scale-[1.01]"
                            : "border-white/10 hover:border-white/25 bg-[#090b10] opacity-85 hover:opacity-100"
                        }`}
                      >
                        <div>
                          {/* Photo Banner with Hover Zoom */}
                          <div
                            onClick={() =>
                              setLightboxData({
                                images: allEvtImages,
                                index: allEvtImages.indexOf(activeImg) >= 0 ? allEvtImages.indexOf(activeImg) : 0,
                                title: evt.title,
                              })
                            }
                            className="relative w-full h-52 bg-slate-950 overflow-hidden cursor-pointer group/img"
                          >
                            <Image
                              src={activeImg}
                              alt={evt.title}
                              fill
                              className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                              sizes="(max-width: 640px) 310px, 380px"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-black/30 to-transparent pointer-events-none" />

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold bg-black/70 backdrop-blur-md border border-white/15 text-amber-400">
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
                              <Calendar className="w-3.5 h-3.5 text-amber-400" />
                              <span>{evt.date}</span>
                              <span>&bull;</span>
                              <MapPin className="w-3.5 h-3.5 text-slate-500" />
                              <span className="truncate max-w-[140px]">{evt.venue.split(",")[0]}</span>
                            </div>

                            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white leading-snug group-hover:text-amber-300 transition-colors">
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
                            <Users className="w-3.5 h-3.5 text-amber-400" />
                            <span>{evt.capacity || "100+ Attended"}</span>
                          </span>

                          <Link
                            href={`/events/${evt.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-amber-400 hover:text-black border border-white/10 hover:border-amber-400 text-xs font-mono text-slate-200 transition-all cursor-pointer group/btn"
                          >
                            <span>View Recap &amp; Gallery</span>
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Real Clean Institutional Archive Box */
              <div className="p-8 sm:p-12 rounded-3xl bg-[#07090e] border border-white/[0.08] text-center max-w-3xl mx-auto space-y-4 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                  <Clock className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                  Official Archive Roster
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-lg mx-auto">
                  Past session records, workshop challenges, and photo galleries will be automatically archived here as official campus operations conclude.
                </p>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Real SATI Cyber Cell Records &bull; Verified Documentation</span>
                </div>
              </div>
            )}

          </section>

        </div>
      </main>

      {/* Full-Screen Multi-Image Lightbox Modal */}
      {lightboxData && (
        <div
          onClick={() => setLightboxData(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[85vh] flex flex-col items-center justify-between"
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-300 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold">
                  Photo {lightboxData.index + 1} of {lightboxData.images.length}
                </span>
                <span className="text-white font-bold hidden sm:inline truncate max-w-md">
                  {lightboxData.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxData(null)}
                className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/20 transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Center Image */}
            <div className="relative w-full flex-1 rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl my-3">
              <Image
                src={lightboxData.images[lightboxData.index]}
                alt={`Photo ${lightboxData.index + 1}`}
                fill
                className="object-contain"
                priority
              />

              {/* Prev Button */}
              {lightboxData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setLightboxData((prev) =>
                      prev
                        ? {
                            ...prev,
                            index: (prev.index - 1 + prev.images.length) % prev.images.length,
                          }
                        : null
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/75 hover:bg-black text-white border border-white/25 hover:border-amber-400/60 transition-all active:scale-95 shadow-2xl cursor-pointer"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {lightboxData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setLightboxData((prev) =>
                      prev
                        ? {
                            ...prev,
                            index: (prev.index + 1) % prev.images.length,
                          }
                        : null
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/75 hover:bg-black text-white border border-white/25 hover:border-amber-400/60 transition-all active:scale-95 shadow-2xl cursor-pointer"
                  title="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Thumbnails Strip */}
            {lightboxData.images.length > 1 && (
              <div className="flex items-center gap-2 pt-2 overflow-x-auto max-w-full px-2">
                {lightboxData.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setLightboxData((prev) =>
                        prev ? { ...prev, index: idx } : null
                      )
                    }
                    className={`relative w-14 h-10 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      idx === lightboxData.index
                        ? "border-amber-400 ring-2 ring-amber-400/60 scale-105"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Comprehensive Footer */}
      <Footer />
    </div>
  );
}
