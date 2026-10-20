"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
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
} from "lucide-react";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  const [event, setEvent] = useState<CyberEvent | null>(null);
  const [otherEvents, setOtherEvents] = useState<CyberEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Gallery Lightbox Modal
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        let allEvts: CyberEvent[] = [];
        if (data.success && Array.isArray(data.events)) {
          allEvts = data.events;
        } else {
          allEvts = [...fallbackUpcoming, ...fallbackPast];
        }
        const found = allEvts.find(
          (e: CyberEvent) => e.id === eventId || e.slug === eventId
        );
        if (found) {
          setEvent(found);
          setOtherEvents(
            allEvts
              .filter((e: CyberEvent) => e.id !== found.id && e.status !== "Completed")
              .slice(0, 3)
          );
        } else {
          setEvent(null);
        }
      } catch (err) {
        console.error("Failed to load event:", err);
        const allEvts = [...fallbackUpcoming, ...fallbackPast];
        const found = allEvts.find(
          (e: CyberEvent) => e.id === eventId || e.slug === eventId
        );
        if (found) {
          setEvent(found);
          setOtherEvents(
            allEvts
              .filter((e: CyberEvent) => e.id !== found.id && e.status !== "Completed")
              .slice(0, 3)
          );
        }
      } finally {
        setLoading(false);
      }
    }
    fetchEventData();
  }, [eventId]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06080d] text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-28">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-slate-400">Loading Event Details...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#06080d] text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Event Not Found</h1>
          <p className="text-sm text-slate-400 max-w-md mb-6">
            The event you are looking for may have been rescheduled, concluded, or removed from the public schedule.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Events Schedule</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Aggregate all photos (primary + gallery, deduplicated, up to 10)
  const allImages: string[] = [];
  if (Array.isArray(event.images) && event.images.length > 0) {
    event.images.forEach((img) => {
      if (img && !allImages.includes(img)) allImages.push(img);
    });
  } else if (event.image) {
    allImages.push(event.image);
  }
  const displayImages = allImages.slice(0, 10);

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 cyber-grid">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Top Breadcrumb & Share Navigation */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Events</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
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

          {/* Event Header & Badges */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shadow-sm">
                {event.category}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase font-bold ${
                  event.status === "Live"
                    ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
                    : event.status === "Upcoming"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : event.status === "Completed"
                    ? "bg-slate-700/40 text-slate-400 border border-slate-600/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                }`}
              >
                {event.status}
              </span>

              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300">
                {event.mode}
              </span>

              {displayImages.length > 1 && (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 flex items-center gap-1">
                  <span>📷</span>
                  <span>{displayImages.length} Photos</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {event.title}
            </h1>

            {event.description && (
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {event.description}
              </p>
            )}
          </div>

          {/* Quick Info & Registration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Quick Facts Card (8 cols) */}
            <div className="md:col-span-8 p-6 rounded-3xl bg-[#0b101c] border border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <Calendar className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Date & Schedule</span>
                    <span className="font-bold text-white text-sm">{event.date}</span>
                    {event.time && <span className="block text-slate-300 mt-0.5">{event.time}</span>}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Venue & Campus</span>
                    <span className="font-bold text-white text-sm">{event.venue}</span>
                    <span className="block text-slate-400 text-[11px] mt-0.5">SATI Vidisha (M.P.)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <Building className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Organized By</span>
                    <span className="font-bold text-white text-sm">{event.organizer || "Cyber Cell SATI"}</span>
                    <span className="block text-slate-400 text-[11px] mt-0.5">Official Student Body</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <Users className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Eligibility / Capacity</span>
                    <span className="font-bold text-white text-sm">
                      {event.capacity || "Open to all SATI Students"}
                    </span>
                    <span className="block text-slate-400 text-[11px] mt-0.5">B.Tech / MCA / All Years</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-500 mr-1">Focus Tags:</span>
                  {event.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-cyan-500/[0.06] border border-cyan-500/20 text-cyan-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Action CTA Card (4 cols) */}
            <div className="md:col-span-4 p-6 rounded-3xl bg-gradient-to-b from-[#0c1424] to-[#070b14] border-2 border-cyan-500/30 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block font-semibold">
                  CANDIDATE ADMISSION
                </span>
                <h3 className="text-lg font-black text-white tracking-tight">
                  {event.status === "Completed" ? "Event Concluded" : "Register For Event"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {event.status === "Completed"
                    ? "This event has concluded. Check out our upcoming schedule or archive photos below."
                    : event.registrationLink
                    ? "Fill the official registration form to reserve your seat and lab workstation."
                    : "Admission is conducted in-person via desk registration at Central Computer Center (CCC)."}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {event.registrationLink && event.status !== "Completed" ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm font-mono shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
                  >
                    <span>Register Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    href="/join"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-bold text-xs font-mono transition-colors"
                  >
                    <span>Desk Registration Info</span>
                  </Link>
                )}

                <p className="text-[10px] font-mono text-center text-slate-500">
                  Free student entry &bull; SATI Cyber Cell
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PHOTO SHOWCASE & 10-IMAGE GALLERY                                         */}
          {/* ========================================================================= */}
          {displayImages.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>Event Posters & Photo Gallery</span>
                </h2>
                <span className="text-xs font-mono text-slate-400">
                  {displayImages.length} of 10 Photos
                </span>
              </div>

              {/* Main Banner + Gallery Grid */}
              <div className="space-y-4">
                {/* Primary Large Cover Photo */}
                <div
                  onClick={() => setLightboxIndex(0)}
                  className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-900 border border-white/15 cursor-pointer group shadow-2xl"
                >
                  <Image
                    src={displayImages[0]}
                    alt={`${event.title} Banner`}
                    fill
                    priority
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 960px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white pointer-events-none">
                    <span className="px-3 py-1 rounded-xl bg-black/70 backdrop-blur border border-white/20 text-cyan-300">
                      Primary Poster
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-black/70 backdrop-blur border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to expand full screen ↗
                    </span>
                  </div>
                </div>

                {/* Additional Thumbnails Grid (up to 9 additional photos) */}
                {displayImages.length > 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {displayImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxIndex(idx)}
                        className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border cursor-pointer group transition-all ${
                          idx === 0
                            ? "border-cyan-400/50 ring-1 ring-cyan-400/30"
                            : "border-white/10 hover:border-cyan-400/50"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Event photo ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, 200px"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                        {idx === 0 && (
                          <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[9px] font-mono bg-black/70 border border-white/20 text-cyan-300 font-bold">
                            COVER
                          </span>
                        )}

                        <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/70 text-slate-300">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DETAILED CONTENT & AGENDA                                                 */}
          {/* ========================================================================= */}
          <div className="space-y-8 pt-6 border-t border-white/[0.08]">
            {/* Long Description / In-Depth Details */}
            {event.longDescription && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0e16] border border-white/10 space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <span>About This Session</span>
                </h2>
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans space-y-3">
                  {event.longDescription}
                </div>
              </div>
            )}

            {/* Prerequisites & Tools Required */}
            {(event.prerequisites || event.toolsRequired) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.prerequisites && (
                  <div className="p-6 rounded-3xl bg-[#0a0e16] border border-white/10 space-y-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Prerequisites</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {event.prerequisites}
                    </p>
                  </div>
                )}

                {event.toolsRequired && (
                  <div className="p-6 rounded-3xl bg-[#0a0e16] border border-white/10 space-y-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-cyan-400" />
                      <span>Tools & Software Required</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {event.toolsRequired}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* OTHER UPCOMING SESSIONS                                                   */}
          {/* ========================================================================= */}
          {otherEvents.length > 0 && (
            <div className="space-y-4 pt-10 border-t border-white/[0.08]">
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span>More Events on Campus</span>
                </h2>
                <Link
                  href="/events"
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
                >
                  View All &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherEvents.map((evt) => (
                  <Link
                    key={evt.id}
                    href={`/events/${evt.id}`}
                    className="p-5 rounded-2xl bg-[#0a0e16] border border-white/[0.08] hover:border-cyan-500/40 transition-colors group space-y-2 block"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span>{evt.date}</span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] text-slate-300">
                        {evt.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {evt.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* INTERACTIVE LIGHTBOX MODAL WITH MULTI-IMAGE CAROUSEL                      */}
      {/* ========================================================================= */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-between"
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 pb-3">
              <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-cyan-300">
                Photo {lightboxIndex + 1} of {displayImages.length}
              </span>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/20 transition-colors"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Center Image */}
            <div className="relative w-full flex-1 rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl">
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
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null
                        ? (prev - 1 + displayImages.length) % displayImages.length
                        : 0
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all active:scale-95 shadow-xl"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {displayImages.length > 1 && (
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null ? (prev + 1) % displayImages.length : 0
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all active:scale-95 shadow-xl"
                  title="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {displayImages.length > 1 && (
              <div className="flex items-center gap-2 pt-3 overflow-x-auto max-w-full px-2">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative w-14 h-10 rounded-xl overflow-hidden shrink-0 border transition-all ${
                      idx === lightboxIndex
                        ? "border-cyan-400 ring-2 ring-cyan-400/50 scale-105"
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

      <Footer />
    </div>
  );
}
