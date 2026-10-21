"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CyberEvent, upcomingEvents as fallbackUpcoming, pastEvents as fallbackPast } from "@/data/events";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Share2,
  CheckCircle2,
  AlertCircle,
  Tag,
  Users,
  Shield,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Laptop,
  Check,
  Building,
  Target,
  TrendingUp,
  FileText,
  ImageIcon,
  ArrowRight,
  User,
} from "lucide-react";

function formatEventDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return { full: dateStr, weekday: "Event Day", shortBadge: dateStr.toUpperCase() };
    }
    const full = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const weekday = d.toLocaleDateString("en-GB", { weekday: "long" });
    const shortBadge = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
    return { full, weekday, shortBadge };
  } catch {
    return { full: dateStr, weekday: "Event Day", shortBadge: dateStr.toUpperCase() };
  }
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  const [event, setEvent] = useState<CyberEvent | null>(null);
  const [allEventsList, setAllEventsList] = useState<CyberEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Gallery Active Preview & Lightbox
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        let allEvts: CyberEvent[] = [];
        if (data.success && Array.isArray(data.events) && data.events.length > 0) {
          allEvts = data.events;
        } else {
          allEvts = [...fallbackUpcoming, ...fallbackPast];
        }

        setAllEventsList(allEvts);

        const found = allEvts.find(
          (e: CyberEvent) => e.id === eventId || e.slug === eventId
        );
        if (found) {
          setEvent(found);
        } else {
          setEvent(null);
        }
      } catch (err) {
        console.error("Failed to load event:", err);
        const allEvts = [...fallbackUpcoming, ...fallbackPast];
        setAllEventsList(allEvts);
        const found = allEvts.find(
          (e: CyberEvent) => e.id === eventId || e.slug === eventId
        );
        if (found) {
          setEvent(found);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchEventData();
  }, [eventId]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrevLightbox();
      if (e.key === "ArrowRight") handleNextLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-28">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-slate-400">Loading Event Details...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 uppercase tracking-wide">Event Not Found</h1>
          <p className="text-sm text-slate-400 max-w-md mb-6 font-light">
            The event you are looking for may have been rescheduled, concluded, or removed from the public schedule.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs font-mono uppercase tracking-wider transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Events Schedule</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isDummy = Boolean(
    event.id?.toLowerCase().includes("dummy") ||
    event.title?.toLowerCase().includes("dummy") ||
    event.tags?.some((t) => t.toLowerCase().includes("dummy")) ||
    event.description?.toLowerCase().includes("dummy")
  );

  // Collect all photos (deduplicated, up to 10)
  const allImages: string[] = [];
  if (Array.isArray(event.images) && event.images.length > 0) {
    event.images.forEach((img) => {
      if (img && !allImages.includes(img)) allImages.push(img);
    });
  }
  if (event.image && !allImages.includes(event.image)) {
    allImages.push(event.image);
  }
  const displayImages = allImages.length > 0 ? allImages.slice(0, 10) : [];

  // Parse title into prefix (e.g. EXPLOIT:) and main title if colon is present
  const colonIndex = event.title.indexOf(":");
  const hasColon = colonIndex > 0;
  const titlePrefix = hasColon ? event.title.slice(0, colonIndex + 1).trim() : null;
  const titleRest = hasColon ? event.title.slice(colonIndex + 1).trim() : event.title;

  // Date formatting
  const dateInfo = formatEventDate(event.date);

  // Other events for campus recommendations (up to 4 events, excluding current)
  const otherEvents = allEventsList
    .filter((e) => e.id !== event.id && !e.id.includes("dummy"))
    .slice(0, 4);

  // Lightbox handlers
  const handlePrevLightbox = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + displayImages.length) % displayImages.length : 0
    );
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % displayImages.length : 0
    );
  };

  // Extract or synthesize highlight pillars
  const highlightPillars = [
    {
      icon: Target,
      title: "Learn by Doing",
      desc: "Live demos and hands-on activities to understand real attack scenarios.",
    },
    {
      icon: Users,
      title: "Beginner Friendly",
      desc: "No prior cybersecurity experience is required.",
    },
    {
      icon: TrendingUp,
      title: "Build Your Foundation",
      desc: "Understand key tools, concepts, and career opportunities in cybersecurity.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-amber-400/25 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Subtle Warm Atmospheric Glow */}
        <div className="absolute top-10 right-10 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.04),transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 relative z-10">
          
          {/* Top Breadcrumb & Share Navigation */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Events</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Share event link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          {/* Dummy Event Notice Banner (if dummy) */}
          {isDummy && (
            <div className="w-full py-3.5 px-5 rounded-2xl bg-amber-400/10 border-2 border-dashed border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-mono font-black uppercase tracking-wider shrink-0 shadow-sm">
                  ⚠️ DUMMY EVENT
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-mono font-extrabold text-amber-300 uppercase tracking-wide">
                    SAMPLE PREVIEW ONLY &bull; YEH EK DUMMY EVENT HAI
                  </p>
                  <p className="text-[11px] font-sans text-slate-300 font-normal">
                    Yeh entry keval website UI testing ke liye hai. Koi actual session is date par schedule nahi hai.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-black/80 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-extrabold uppercase tracking-widest shrink-0">
                SAMPLE PREVIEW
              </span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* HERO HEADER WITH INTEGRATED CINEMATIC BACKDROP                            */}
          {/* ========================================================================= */}
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#070707] p-6 sm:p-10 lg:p-12 shadow-2xl">
            
            {/* Background Speaker/Projector Photo Blend (from user reference image) */}
            {event.image && (
              <div className="absolute top-0 right-0 w-full sm:w-3/5 h-full opacity-35 sm:opacity-50 pointer-events-none select-none">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  priority
                  className="object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/90 to-transparent sm:via-[#070707]/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/40" />
              </div>
            )}

            <div className="relative z-10 max-w-2xl space-y-4">
              
              {/* Category & Capability Pill Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-extrabold bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.25)]">
                  {event.category}
                </span>

                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center gap-1.5 shadow-sm">
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span>Conducted by Cyber Cell</span>
                </span>

                {event.tags && event.tags.length > 0 ? (
                  event.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-white/[0.05] border border-white/10 text-slate-300 backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-white/[0.05] border border-white/10 text-slate-300 backdrop-blur-md">
                      BEGINNER FRIENDLY
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-white/[0.05] border border-white/10 text-slate-300 backdrop-blur-md">
                      {event.mode.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-white/[0.05] border border-white/10 text-slate-300 backdrop-blur-md">
                      HANDS-ON
                    </span>
                  </>
                )}
              </div>

              {/* Title with Golden Amber Prefix Split */}
              <div className="pt-2">
                {titlePrefix ? (
                  <>
                    <span className="block text-4xl sm:text-6xl lg:text-7xl font-black text-amber-400 tracking-tight uppercase leading-[0.98]">
                      {titlePrefix}
                    </span>
                    <h1 className="block text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mt-1.5">
                      {titleRest}
                    </h1>
                  </>
                ) : (
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                    <span className="text-amber-400">{event.title.split(" ")[0]} </span>
                    <span>{event.title.split(" ").slice(1).join(" ")}</span>
                  </h1>
                )}
              </div>

              {/* Event Subtitle */}
              {event.description && (
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light pt-1">
                  {event.description.replace(/^EXPLOIT: Intro to the Cyber Range\s*/i, "").split("\n\n")[0]}
                </p>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* METADATA HUD BAR (4 COLUMNS + REGISTER CTA BUTTON)                         */}
          {/* ========================================================================= */}
          <div className="rounded-3xl bg-[#090909] border border-white/[0.08] p-5 sm:p-7 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* 4 Metadata Columns Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 flex-1">
              
              {/* 1. DATE */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-semibold">
                    DATE
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                    {dateInfo.full}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {dateInfo.weekday}
                  </span>
                </div>
              </div>

              {/* 2. TIME */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-semibold">
                    TIME
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                    {event.time || "10:30 AM - 01:30 PM"}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    3 Hours
                  </span>
                </div>
              </div>

              {/* 3. VENUE */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-semibold">
                    VENUE
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 leading-snug">
                    {event.venue.split(",")[0]}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    SATI Campus
                  </span>
                </div>
              </div>

              {/* 4. PARTICIPANTS */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-semibold">
                    PARTICIPANTS
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                    {event.status === "Completed" ? "100+ Attended" : event.capacity || "100+ Students"}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[140px] block">
                    First-year students
                  </span>
                </div>
              </div>

            </div>

            {/* Right Action CTA Button */}
            <div className="flex flex-col items-stretch sm:items-end justify-center gap-1.5 pt-4 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-white/[0.08] shrink-0">
              {isDummy ? (
                <div className="px-6 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-slate-400 text-xs font-mono font-bold uppercase tracking-wider text-center">
                  Dummy Preview Mode
                </div>
              ) : event.registrationLink && event.status !== "Completed" ? (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-400/25 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : event.status === "Completed" ? (
                <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Session Concluded</span>
                </div>
              ) : (
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-400/25 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Join Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              <span className="text-[11px] font-mono text-slate-500 text-center sm:text-right">
                Free event &bull; Limited seats
              </span>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* EVENT GALLERY (FEATURED LARGE IMAGE + INTERACTIVE THUMBNAIL DECK)         */}
          {/* ========================================================================= */}
          {displayImages.length > 0 && (
            <section className="space-y-4 pt-2">
              
              {/* Gallery Header */}
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                      Event Gallery
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 font-light">
                      Moments from the session &mdash; learning, experimenting and connecting.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxIndex(activeImageIndex)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group"
                >
                  <span>View All Photos</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Main Large Featured Photo Card */}
              <div
                onClick={() => setLightboxIndex(activeImageIndex)}
                className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-black border border-white/[0.08] hover:border-amber-400/40 shadow-2xl cursor-pointer group transition-all"
              >
                <Image
                  src={displayImages[activeImageIndex] || displayImages[0]}
                  alt={`${event.title} Moment`}
                  fill
                  priority
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 1200px) 100vw, 1150px"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-mono pointer-events-none">
                  <span className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur border border-white/20 text-amber-300 font-bold">
                    Photo #{activeImageIndex + 1} of {displayImages.length}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view full screen ↗
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip (Interactive Switcher) */}
              {displayImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-2.5 sm:gap-3 pt-1">
                  {displayImages.map((img, idx) => {
                    const isActive = idx === activeImageIndex;
                    const isLastVisible = idx === 6 && displayImages.length > 7;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (isLastVisible) {
                            setLightboxIndex(6);
                          } else {
                            setActiveImageIndex(idx);
                          }
                        }}
                        className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border transition-all duration-200 cursor-pointer group ${
                          isActive
                            ? "border-amber-400 ring-2 ring-amber-400/50 scale-[1.03] shadow-lg shadow-amber-400/20"
                            : "border-white/10 hover:border-amber-400/40 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="(max-width: 640px) 25vw, 150px"
                        />

                        {isLastVisible && (
                          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-amber-400 font-mono font-bold text-xs">
                            <span className="text-sm font-black">+{displayImages.length - 6}</span>
                            <span className="text-[10px] text-slate-400">more</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* ========================================================================= */}
          {/* ABOUT THIS SESSION (3 PILLARS + REQUIREMENTS CARDS)                       */}
          {/* ========================================================================= */}
          <section className="space-y-6 pt-4">
            
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                About This Session
              </h2>
            </div>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-4xl">
              This workshop is designed to give first-year students a practical introduction to cybersecurity. You will explore real-world concepts, see live demonstrations, and get hands-on experience through interactive activities in a guided and friendly environment.
            </p>

            {/* 3 Highlight Feature Cards (Learn by doing, Beginner Friendly, Build Foundation) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {highlightPillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-3xl bg-[#080808] border border-white/[0.08] hover:border-amber-400/30 transition-all space-y-2.5 shadow-lg group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* 2 Requirements Cards: Prerequisites & Tools Required */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-1">
              
              {/* Prerequisites */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#080808] border border-white/[0.08] flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Prerequisites
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {event.prerequisites || "None (Just curiosity & passion for tech)"}
                  </p>
                </div>
              </div>

              {/* Tools Required */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#080808] border border-white/[0.08] flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Laptop className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Tools &amp; Software Required
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {event.toolsRequired || "Laptop (Windows / Linux / macOS)"}
                  </p>
                </div>
              </div>

            </div>

            {/* Detailed Session Phases (if longDescription exists) */}
            {event.longDescription && event.longDescription.includes("Phase") && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#080808] border border-white/[0.08] space-y-4 pt-6">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                  Session Roadmap &bull; Timeline
                </div>
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-light space-y-3">
                  {event.longDescription}
                </div>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* MORE EVENTS ON CAMPUS (4 COMPACT CARDS MATCHING REFERENCE)               */}
          {/* ========================================================================= */}
          {otherEvents.length > 0 && (
            <section className="space-y-5 pt-6 border-t border-white/[0.08]">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                      More Events on Campus
                    </h2>
                  </div>
                </div>

                <Link
                  href="/events"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors group"
                >
                  <span>View All Events</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {otherEvents.map((evt) => {
                  const cardDate = formatEventDate(evt.date);
                  const cardCover = evt.image || (evt.images && evt.images[0]) || "/images/about-lab.jpg";

                  return (
                    <Link
                      key={evt.id}
                      href={`/events/${evt.id}`}
                      className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-black border border-white/[0.08] hover:border-amber-400/50 shadow-xl transition-all duration-300 flex flex-col justify-between p-4"
                    >
                      {/* Background Image */}
                      <Image
                        src={cardCover}
                        alt={evt.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-75"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                      {/* Top Right Date Badge */}
                      <div className="relative z-10 flex justify-end">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/80 backdrop-blur border border-white/15 text-slate-300 shadow">
                          {cardDate.shortBadge}
                        </span>
                      </div>

                      {/* Bottom Title & Arrow Button */}
                      <div className="relative z-10 flex items-end justify-between gap-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                          {evt.title}
                        </h4>

                        <div className="w-8 h-8 rounded-full bg-black/80 border border-white/20 group-hover:border-amber-400 group-hover:bg-amber-400 flex items-center justify-center text-slate-300 group-hover:text-black shrink-0 transition-all">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

            </section>
          )}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* INTERACTIVE LIGHTBOX MODAL                                                */}
      {/* ========================================================================= */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[85vh] flex flex-col items-center justify-between"
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 pb-3">
              <span className="px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-amber-300 font-bold">
                Photo {lightboxIndex + 1} of {displayImages.length}
              </span>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/20 transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Center Image */}
            <div className="relative w-full flex-1 rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl flex items-center justify-center">
              <Image
                src={displayImages[lightboxIndex]}
                alt={`Photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                priority
              />

              {/* Prev Button */}
              {displayImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevLightbox}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 hover:bg-amber-400 hover:text-black text-white border border-white/20 transition-all active:scale-95 shadow-xl cursor-pointer"
                  title="Previous Photo (←)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {displayImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextLightbox}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 hover:bg-amber-400 hover:text-black text-white border border-white/20 transition-all active:scale-95 shadow-xl cursor-pointer"
                  title="Next Photo (→)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Thumbnail Scrubber Strip */}
            {displayImages.length > 1 && (
              <div className="flex items-center gap-2 pt-3 overflow-x-auto max-w-full px-2 py-1">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative w-14 h-10 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      idx === lightboxIndex
                        ? "border-amber-400 ring-2 ring-amber-400/50 scale-105"
                        : "border-white/20 opacity-50 hover:opacity-100"
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

      <Footer />
    </div>
  );
}
