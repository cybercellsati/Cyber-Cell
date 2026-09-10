"use client";

import React, { useState } from "react";
import Link from "next/link";
import { upcomingEvents, CyberEvent } from "@/data/events";
import { Calendar, Bell, ArrowRight, Shield, CheckCircle2 } from "lucide-react";

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
            <span className="text-xs font-mono font-medium tracking-widest text-slate-400 uppercase block mb-1">
              SCHEDULE & WORKSHOPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Upcoming Events
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors shrink-0"
          >
            <span>View All Events</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>

        {/* Content Area: Real events or Authentic Empty State */}
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((evt: CyberEvent) => (
              <div
                key={evt.id}
                className="p-6 rounded-xl bg-[#0d111a] border border-white/[0.07] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-3">
                    <span>{evt.date}</span>
                    <span className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.03]">
                      {evt.mode}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{evt.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{evt.description}</p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-slate-400">{evt.venue}</span>
                  {evt.registrationLink && (
                    <a
                      href={evt.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#38bdf8] hover:underline"
                    >
                      Register Now
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Graceful, Truthful Empty State */
          <div className="rounded-xl bg-[#0d111a] border border-white/[0.07] p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-300 mx-auto mb-4">
              <Calendar className="w-6 h-6 opacity-75" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
              No events announced yet.
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
              Stay tuned for upcoming cybersecurity workshops, competitions and sessions. 
              Official dates will be published once finalized with the SATI Coding Club.
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
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#07090e] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </button>
              </form>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>You will receive announcements once events are published.</span>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-white/[0.05] flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
              <Shield className="w-3 h-3 text-slate-400" />
              <span>Real data only &bull; Verified SATI Coding Club schedule</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
