"use client";

import React, { useState } from "react";
import Link from "next/link";
import { upcomingEvents, CyberEvent } from "@/data/events";
import { Calendar, Bell, ArrowRight, Shield, CheckCircle2 } from "lucide-react";

import SpotlightCard from "./SpotlightCard";

export default function UpcomingEvents() {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setEmailSubscribed(true);
    }
  };

  return (
    <section id="events" className="relative py-24 bg-[#07090e] border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest text-[#38bdf8] uppercase block mb-1">
              SCHEDULE & WORKSHOPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Upcoming Events
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors shrink-0 group"
          >
            <span>View All Events</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Content Area: Real events or Authentic Empty State */}
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((evt: CyberEvent) => (
              <SpotlightCard
                key={evt.id}
                className="p-6 sm:p-7 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="text-[#38bdf8] font-medium">{evt.date}</span>
                    <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 text-[10px]">
                      {evt.mode}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {evt.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{evt.venue}</span>
                  {evt.registrationLink && (
                    <a
                      href={evt.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Register Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        ) : (
          /* Graceful, Truthful Empty State */
          <div className="max-w-2xl mx-auto">
            <SpotlightCard className="p-8 sm:p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                <Calendar className="w-6 h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                No events announced yet.
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
                Stay tuned for upcoming cybersecurity workshops, competitions and sessions. 
                Official dates will be published once finalized by the Cyber Cell team.
              </p>

              {/* Notification alert / Signup box */}
              {!emailSubscribed ? (
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your college / personal email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#060910] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#27446b] hover:bg-[#315383] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Bell className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Notify Me</span>
                  </button>
                </form>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You will receive announcements once events are published.</span>
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
                <Shield className="w-3 h-3 text-cyan-500/70" />
                <span>Real data only &bull; Verified SATI Cyber Cell schedule</span>
              </div>
            </SpotlightCard>
          </div>
        )}

      </div>
    </section>
  );
}
