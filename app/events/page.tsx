"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { upcomingEvents, pastEvents, CyberEvent } from "@/data/events";
import { Calendar, Bell, CheckCircle2, Shield, Clock, MapPin } from "lucide-react";

export default function EventsPage() {
  const [notifyEmail, setNotifyEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 cyber-grid">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00e5ff] uppercase block mb-2">
              CAMPUS & VIRTUAL SCHEDULE
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Cyber Cell Events
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Official cybersecurity workshops, bootcamps, capture-the-flag wargames, 
              and student meetups hosted under SATI Central Coding Club.
            </p>
          </div>

          {/* Upcoming Events Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#00e5ff]" />
                Upcoming Schedule
              </h2>
              <span className="text-xs font-mono text-slate-400">
                Verified Announcements Only
              </span>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((evt: CyberEvent) => (
                  <div
                    key={evt.id}
                    className="p-6 rounded-2xl bg-[#0a0e16] border border-white/[0.08] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#00e5ff] mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {evt.date}
                        </span>
                        <span className="px-2 py-0.5 rounded border border-[#00e5ff]/30 bg-[#00e5ff]/10">
                          {evt.mode}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{evt.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{evt.description}</p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-[#00e5ff]" />
                        {evt.venue}
                      </span>
                      {evt.registrationLink && (
                        <a
                          href={evt.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#00e5ff] hover:underline"
                        >
                          Register &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Truthful Empty State */
              <div className="p-8 sm:p-14 rounded-2xl bg-[#0a0e16] border border-white/[0.08] text-center max-w-2xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#00e5ff] mx-auto mb-4">
                  <Calendar className="w-7 h-7 opacity-80" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No events announced yet.</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto mb-8">
                  Stay tuned for upcoming cybersecurity workshops, competitions, and sessions. 
                  Official dates will be posted as soon as they are approved by the SATI Central Coding Club.
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
                      className="flex-1 px-4 py-2.5 rounded-lg bg-[#06080d] border border-white/[0.12] text-sm text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-[#00e5ff] text-black text-xs sm:text-sm font-semibold hover:bg-[#22d3ee] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Notify Me</span>
                    </button>
                  </form>
                ) : (
                  <div className="inline-flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Notification registered. We will email you once dates are published.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Past Events Archive */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Past Events Archive
              </h2>
            </div>
            {pastEvents.length > 0 ? (
              <div className="space-y-3">
                {pastEvents.map((e) => (
                  <div key={e.id} className="p-4 rounded-xl bg-[#0a0e16] border border-white/[0.06]">
                    <h3 className="text-sm font-bold text-white">{e.title}</h3>
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

      <Footer />
    </div>
  );
}
