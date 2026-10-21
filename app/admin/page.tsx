"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatStudentName } from "@/lib/certificates";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import {
  Shield,
  Award,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  Users,
  Eye,
  LogOut,
  ArrowRight,
  Sparkles,
  Lock,
  Palette,
  ExternalLink,
  Cpu,
  Database,
  Sliders,
  Clock,
  ShieldCheck,
  Calendar,
} from "lucide-react";

interface AdminStats {
  attendeeCount: number;
  templateUrl: string;
  fontFamily: string;
  fontSize: number;
  color: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [stats, setStats] = useState<AdminStats>({
    attendeeCount: 5,
    templateUrl: "",
    fontFamily: "Cinzel",
    fontSize: 76,
    color: "#d4af37",
  });
  const [recentAttendees, setRecentAttendees] = useState<Array<{
    name: string;
    scholarNumber: string;
    certificateId: string;
    role: string;
  }>>([]);

  // 1. Verify Admin Session
  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          setAuthenticated(true);
        } else {
          router.push("/admin/login?from=/admin");
        }
      } catch {
        router.push("/admin/login?from=/admin");
      }
    }
    verifyAuth();
  }, [router]);

  // 2. Fetch Dashboard Metrics & Config
  useEffect(() => {
    if (!authenticated) return;

    async function loadData() {
      try {
        // Load certificate config
        const configRes = await fetch("/api/admin/certificates/config");
        const configData = await configRes.json();

        // Load attendees from verify query
        const verifyRes = await fetch("/api/certificates/verify?query=0108");
        const verifyData = await verifyRes.json();

        // Load events count
        try {
          const eventsRes = await fetch("/api/admin/events");
          const eventsData = await eventsRes.json();
          if (eventsData.success && Array.isArray(eventsData.events)) {
            setEventsCount(eventsData.events.length);
          }
        } catch (eventErr) {
          console.warn("Could not load events metric:", eventErr);
        }

        const count = verifyData.certificates ? verifyData.certificates.length : 5;
        if (verifyData.certificates) {
          setRecentAttendees(
            verifyData.certificates.slice(0, 5).map((c: any) => ({
              name: formatStudentName(c.recipient_name),
              scholarNumber: c.scholar_number,
              certificateId: c.certificate_id,
              role: c.role_or_rank || "Participant",
            }))
          );
        }

        if (configData.success && configData.config) {
          const cfg = configData.config;
          setStats({
            attendeeCount: count,
            templateUrl: cfg.templateUrl || "",
            fontFamily: cfg.fontFamily || "Cinzel",
            fontSize: cfg.fontSize || 76,
            color: cfg.color || "#d4af37",
          });
        }
      } catch (err) {
        console.warn("Could not load dashboard metrics:", err);
      } finally {
        setLoadingStats(false);
      }
    }

    loadData();
  }, [authenticated]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-400">Verifying Admin Credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col selection:bg-amber-400/25 selection:text-white">
      {/* Top Admin Navigation Bar */}
      <AdminNav currentTab="dashboard" />

      {/* Main Dashboard Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full flex-1 space-y-8 sm:space-y-10">
        
        {/* Welcome Hero Console Banner */}
        <div className="relative rounded-3xl bg-[#080808] border border-white/[0.08] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Core Operational Console</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              Cyber Cell Admin <span className="text-amber-400">Hub</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Autonomous control center for verified credential issuance, Canva certificate templates alignment,
              and full event scheduling with flyer posters and registration links for SATI Vidisha.
            </p>
          </div>
        </div>

        {/* DUAL ACTION CARDS: Certificate Studio & Event Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Card 1: Certificate Studio */}
          <div className="relative group rounded-3xl bg-[#090909] border border-white/[0.08] hover:border-amber-400/50 p-6 sm:p-8 shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/15 transition-colors" />

            <div className="space-y-3.5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-amber-400/15 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold tracking-wide uppercase">
                  Primary Engine
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  /admin/certificates
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                <Award className="w-6 h-6 text-amber-400 shrink-0" />
                <span>Certificate Studio & Generator</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Upload your <strong>Canva Certificate Template</strong>, calibrate typography fonts, position recipient names with precision sliders, upload Excel sheets, and test instant 1920&times;1080 HD downloads.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Canva Template</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Excel Roster</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Render</span>
                </span>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/admin/certificates"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-amber-400/20 active:scale-[0.99] transition-all group-hover:translate-x-0.5"
              >
                <span>Launch Certificate Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: Events Management & Posters */}
          <div className="relative group rounded-3xl bg-[#090909] border border-white/[0.08] hover:border-amber-400/50 p-6 sm:p-8 shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-amber-400/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/10 transition-colors" />

            <div className="space-y-3.5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-white/[0.06] text-slate-300 border border-white/[0.1] text-xs font-mono font-bold tracking-wide uppercase">
                  Schedule Engine
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  /admin/events
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                <Calendar className="w-6 h-6 text-amber-400 shrink-0" />
                <span>Events Manager & Poster Studio</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Add, edit, and publish verified cybersecurity workshops, CTF wargames, and webinars. Drag and reorder photo positions, configure registration URLs, and automatically sync schedules to <code>/events</code>.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Poster & Photo Reorder</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live & Upcoming Status</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Syncs to Public Site</span>
                </span>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/admin/events"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.12] hover:border-amber-400/40 font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-lg active:scale-[0.99] transition-all group-hover:translate-x-0.5"
              >
                <span>Manage Events & Posters</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* KEY METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Attendees Count */}
          <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 space-y-2.5 hover:border-amber-400/30 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Registered Attendees</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {loadingStats ? "..." : stats.attendeeCount}
            </div>
            <p className="text-[11px] text-slate-400 font-mono truncate">
              Loaded from <code>data/attendees.xlsx</code>
            </p>
          </div>

          {/* 2. Total Published Events */}
          <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 space-y-2.5 hover:border-amber-400/30 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Published Events</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">
              {eventsCount}
            </div>
            <p className="text-[11px] text-slate-400 font-mono truncate">
              Live on <code>/events</code> schedule
            </p>
          </div>

          {/* 3. Official Font */}
          <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 space-y-2.5 hover:border-amber-400/30 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Certificate Font</span>
              <Palette className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white truncate" style={{ fontFamily: stats.fontFamily }}>
              {stats.fontFamily}
            </div>
            <p className="text-[11px] text-slate-400 font-mono truncate">
              Size: {stats.fontSize}px &bull; <span style={{ color: stats.color }}>{stats.color}</span>
            </p>
          </div>

          {/* 4. Engine Health */}
          <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 space-y-2.5 hover:border-amber-400/30 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Renderer Engine</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">
              HTML5 Canvas
            </div>
            <p className="text-[11px] text-emerald-400 font-mono">
              On-Demand 1080p Generation
            </p>
          </div>
        </div>

        {/* RECENT ATTENDEES & SHORTCUTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Table: Attendees Preview */}
          <div className="lg:col-span-8 rounded-3xl bg-[#090909] border border-white/[0.08] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Attendees Registry Preview</h3>
              </div>

              <Link
                href="/admin/certificates"
                className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors self-start sm:self-auto"
              >
                <span>Upload New / Manage All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
              <table className="w-full text-left text-xs font-mono min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/[0.08] text-slate-400">
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Scholar No</th>
                    <th className="py-2.5 px-3">Credential ID</th>
                    <th className="py-2.5 px-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {recentAttendees.length > 0 ? (
                    recentAttendees.map((att) => (
                      <tr key={att.certificateId} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white font-sans">{att.name}</td>
                        <td className="py-2.5 px-3 text-amber-400">{att.scholarNumber}</td>
                        <td className="py-2.5 px-3 text-slate-400">{att.certificateId}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-300 text-[11px]">
                            {att.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-500">
                        Loading attendees from registry...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Security & System Modules */}
          <div className="lg:col-span-4 space-y-5">
            {/* Quick Actions Card */}
            <div className="rounded-3xl bg-[#090909] border border-white/[0.08] p-5 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick Admin Shortcuts</span>
              </h4>

              <div className="space-y-2 pt-1">
                <Link
                  href="/admin/events"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-xs transition-colors group"
                >
                  <span className="text-slate-200 font-medium">Manage Events & Posters</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </Link>

                <Link
                  href="/admin/certificates"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-xs transition-colors group"
                >
                  <span className="text-slate-200 font-medium">Design Canva Certificate</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </Link>

                <Link
                  href="/verify"
                  target="_blank"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-xs transition-colors group"
                >
                  <span className="text-slate-200 font-medium">Test Public Verification</span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-amber-400/10 border border-white/[0.08] hover:border-amber-400/30 text-xs text-slate-300 hover:text-amber-300 transition-all cursor-pointer"
                >
                  <span className="font-medium">Logout Admin Session</span>
                  <LogOut className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Security Audit Card */}
            <div className="rounded-3xl bg-[#090909] border border-white/[0.08] p-5 space-y-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Security Gateway Enforced</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Next.js Middleware intercepts all <code>/admin/*</code> routes. Direct access to <code>/admin/certificates</code> and <code>/admin/events</code> is blocked without an active authenticated cookie session.
              </p>
              <div className="pt-2 border-t border-white/[0.05] text-[10px] text-slate-500">
                Password Auth: <code>.env.local</code> (ADMIN_PASSWORD)
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-6 text-center text-xs font-mono text-slate-500">
        &copy; {new Date().getFullYear()} Cyber Cell &bull; Samrat Ashok Technological Institute, Vidisha
      </footer>
    </div>
  );
}
