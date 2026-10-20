"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CyberEvent, upcomingEvents as fallbackUpcoming, pastEvents as fallbackPast } from "@/data/events";
import {
  Calendar,
  Bell,
  CheckCircle2,
  Shield,
  Clock,
  MapPin,
  ExternalLink,
  Tag,
  X,
  Sparkles,
  Camera,
  ArrowRight,
} from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<CyberEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activePoster, setActivePoster] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (data.success && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setEvents(fallbackUpcoming);
        }
      } catch (err) {
        console.warn("Failed fetching live events, using static data:", err);
        setEvents(fallbackUpcoming);
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

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 cyber-grid">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase inline-block">
              CAMPUS & VIRTUAL SCHEDULE
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Cyber Cell Events
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Official cybersecurity workshops, bootcamps, capture-the-flag wargames, 
              and student meetups hosted by Cyber Cell SATI.
            </p>
          </div>

          {/* Upcoming Schedule */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>Upcoming & Live Schedule</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">
                Verified Announcements Only
              </span>
            </div>

            {loading ? (
              <div className="p-16 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-mono text-slate-400">Loading schedule...</p>
              </div>
            ) : upcomingList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingList.map((evt: CyberEvent) => (
                  <div
                    key={evt.id}
                    className="group rounded-3xl bg-[#0a0e16] border border-white/[0.08] hover:border-cyan-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Image Banner / Poster */}
                      {evt.image ? (
                        <div
                          onClick={() => setActivePoster(evt.image!)}
                          className="relative w-full h-48 bg-slate-900 overflow-hidden cursor-pointer border-b border-white/[0.06] group/poster"
                        >
                          <Image
                            src={evt.image}
                            alt={evt.title}
                            fill
                            className="object-cover group-hover/poster:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 500px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-black/70 backdrop-blur-md border border-white/15 text-cyan-300">
                              {evt.category}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {evt.images && evt.images.length > 1 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-black/75 backdrop-blur-md border border-white/20 text-slate-200">
                                  <Camera className="w-3 h-3 text-cyan-400" />
                                  {evt.images.length}
                                </span>
                              )}
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                                  evt.status === "Live"
                                    ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
                                    : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                                }`}
                              >
                                {evt.status}
                              </span>
                            </div>
                          </div>

                          <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur border border-white/10 opacity-0 group-hover/poster:opacity-100 transition-opacity">
                            Click to expand poster ↗
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 pb-0 flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                            {evt.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            {evt.status}
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <h3 className="text-lg sm:text-xl font-bold leading-snug">
                          <Link
                            href={`/events/${evt.id}`}
                            className="text-white hover:text-cyan-300 transition-colors inline-block"
                          >
                            {evt.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {evt.description}
                        </p>

                        {evt.longDescription && (
                          <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/[0.04]">
                            {evt.longDescription}
                          </p>
                        )}

                        {/* Date, Time & Venue */}
                        <div className="space-y-1.5 pt-3 text-xs font-mono text-slate-300 border-t border-white/[0.06]">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{evt.date}</span>
                            {evt.time && (
                              <>
                                <span className="text-slate-600">&bull;</span>
                                <span className="text-slate-400">{evt.time}</span>
                              </>
                            )}
                            <span className="ml-auto px-2 py-0.5 rounded border border-white/10 bg-white/[0.04] text-[10px] text-slate-300">
                              {evt.mode}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-slate-400">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="truncate">{evt.venue}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        {evt.tags && evt.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {evt.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="p-4 bg-black/40 border-t border-white/[0.06] flex items-center justify-between gap-3 text-xs">
                      <Link
                        href={`/events/${evt.id}`}
                        className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-mono font-semibold text-xs group/link"
                      >
                        <span>Details & Gallery</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>

                      {evt.registrationLink ? (
                        <a
                          href={evt.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
                        >
                          <span>Register</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-500 font-mono text-[10px] hidden sm:inline">
                          On-Campus
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="p-8 sm:p-14 rounded-2xl bg-[#0a0e16] border border-white/[0.08] text-center max-w-2xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-inner">
                  <Calendar className="w-7 h-7 opacity-80" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No events announced yet.</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto mb-8">
                  Stay tuned for upcoming cybersecurity workshops, competitions, and sessions. 
                  Official dates will be posted as soon as they are finalized by the Cyber Cell team.
                </p>

                {/* Notify Signup */}
                {!subscribed ? (
                  <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Enter your college or personal email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#06080d] border border-white/[0.12] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 text-xs sm:text-sm font-semibold hover:bg-cyan-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Notify Me</span>
                    </button>
                  </form>
                ) : (
                  <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Notification registered. We will email you once dates are published.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Past Events Archive */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Past Events Archive</span>
              </h2>
            </div>

            {completedList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedList.map((e) => (
                  <div
                    key={e.id}
                    className="p-5 rounded-2xl bg-[#0a0e16] border border-white/[0.06] space-y-2 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>{e.date}</span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] text-slate-400">
                        Completed
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{e.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{e.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-mono text-slate-500 italic p-4 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                Past session records will be archived here as events conclude.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Poster Lightbox Modal */}
      {activePoster && (
        <div
          onClick={() => setActivePoster(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border border-white/20 bg-black shadow-2xl"
          >
            <button
              onClick={() => setActivePoster(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/70 hover:bg-black text-white border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-[85vw] max-w-3xl h-[70vh]">
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

      <Footer />
    </div>
  );
}
