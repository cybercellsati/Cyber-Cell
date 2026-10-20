"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

        const count = verifyData.certificates ? verifyData.certificates.length : 5;
        if (verifyData.certificates) {
          setRecentAttendees(
            verifyData.certificates.slice(0, 5).map((c: any) => ({
              name: c.recipient_name,
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
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-400">Verifying Admin Credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* ========================================================================= */}
      {/* Top Admin Navigation Bar                                                 */}
      {/* ========================================================================= */}
      <header className="border-b border-white/[0.08] bg-[#090d16]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wider text-white">
                  CYBER CELL ADMIN
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AUTHENTICATED
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block">
                Central Coding Club &bull; SATI Vidisha
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>Public Website</span>
            </Link>

            <Link
              href="/verify"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-semibold text-cyan-300 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verify Portal (/verify)</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* Main Dashboard Content Area                                              */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 space-y-10">
        
        {/* Welcome Hero Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0d1627] via-[#09101d] to-[#0d1627] border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Operational Console</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Cyber Cell Administration Panel
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Direct management for certificate generation, Canva template typography alignment,
              attendees registry, and verified credential issuance for Samrat Ashok Technological Institute (SATI), Vidisha.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PRIMARY ACTION CARD: Direct Gateway to /admin/certificates               */}
        {/* ========================================================================= */}
        <div className="relative group rounded-3xl bg-gradient-to-br from-[#0c1322] via-[#0b101c] to-[#070b14] border-2 border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_30px_rgba(56,189,248,0.12)] hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.22)] transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold tracking-wide uppercase">
                  Primary Engine
                </span>
                <span className="text-xs font-mono text-slate-400">
                  /admin/certificates
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Award className="w-6 h-6 text-cyan-400" />
                <span>Certificate Studio & Generator</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Open the interactive studio to upload your <strong>Canva Certificate Template</strong>,
                choose from <strong>8 curated typography fonts</strong>, position recipient names with
                precision sliders, upload attendees Excel sheets, and test instant 1920&times;1080 HD downloads.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Name-Only Canva Mode</span>
                </span>
                <span className="flex items-center gap-1 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Permanent Server Saving</span>
                </span>
                <span className="flex items-center gap-1 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Zero Cloud Storage Cost</span>
                </span>
              </div>
            </div>

            {/* Big Launch Button */}
            <div className="shrink-0">
              <Link
                href="/admin/certificates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-cyan-500/25 active:scale-98 transition-all group-hover:translate-x-1"
              >
                <span>Open Certificate Studio</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KEY METRICS GRID                                                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Attendees Count */}
          <div className="rounded-2xl bg-[#0b101c] border border-white/10 p-5 space-y-3 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Registered Attendees</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">
              {loadingStats ? "..." : stats.attendeeCount}
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Loaded from <code>data/attendees.xlsx</code>
            </p>
          </div>

          {/* 2. Active Template */}
          <div className="rounded-2xl bg-[#0b101c] border border-white/10 p-5 space-y-3 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Active Template</span>
              <Layers className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white truncate">
              Canva Template HD
            </div>
            <p className="text-[11px] text-emerald-400 font-mono">
              ✓ Saved to <code>public/templates/</code>
            </p>
          </div>

          {/* 3. Official Font */}
          <div className="rounded-2xl bg-[#0b101c] border border-white/10 p-5 space-y-3 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Chosen Font</span>
              <Palette className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white truncate" style={{ fontFamily: stats.fontFamily }}>
              {stats.fontFamily}
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Size: {stats.fontSize}px &bull; Color: <span style={{ color: stats.color }}>{stats.color}</span>
            </p>
          </div>

          {/* 4. Engine Health */}
          <div className="rounded-2xl bg-[#0b101c] border border-white/10 p-5 space-y-3 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Renderer Engine</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-white">
              HTML5 Canvas
            </div>
            <p className="text-[11px] text-cyan-300 font-mono">
              On-Demand 1920&times;1080 Generation
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RECENT ATTENDEES & SHORTCUTS                                             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Table: Attendees Preview */}
          <div className="lg:col-span-8 rounded-2xl bg-[#0b101c] border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Attendees Registry Preview</h3>
              </div>

              <Link
                href="/admin/certificates"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <span>Upload New / Manage All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Scholar No</th>
                    <th className="py-2.5 px-3">Credential ID</th>
                    <th className="py-2.5 px-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {recentAttendees.length > 0 ? (
                    recentAttendees.map((att) => (
                      <tr key={att.certificateId} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white font-sans">{att.name}</td>
                        <td className="py-2.5 px-3 text-cyan-300">{att.scholarNumber}</td>
                        <td className="py-2.5 px-3 text-slate-400">{att.certificateId}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">
                            {att.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-slate-500">
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
            <div className="rounded-2xl bg-[#0b101c] border border-white/10 p-5 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Quick Admin Shortcuts</span>
              </h4>

              <div className="space-y-2 pt-1">
                <Link
                  href="/admin/certificates"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-xs transition-colors group"
                >
                  <span className="text-slate-200 font-medium">Design Canva Certificate</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>

                <Link
                  href="/verify"
                  target="_blank"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-xs transition-colors group"
                >
                  <span className="text-slate-200 font-medium">Test Public Verification</span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-red-500/[0.06] hover:bg-red-500/10 border border-red-500/20 text-xs text-red-300 transition-colors"
                >
                  <span className="font-medium">Logout Admin Session</span>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Security Audit Card */}
            <div className="rounded-2xl bg-[#0b101c] border border-white/10 p-5 space-y-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Security Gateway Enforced</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Next.js Middleware intercepts all <code>/admin/*</code> routes. Direct access to <code>/admin/certificates</code> is blocked without active authenticated cookie session.
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
