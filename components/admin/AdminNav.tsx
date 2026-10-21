"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Calendar,
  Award,
  LayoutDashboard,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Eye,
  Sparkles,
} from "lucide-react";

interface AdminNavProps {
  currentTab: "dashboard" | "events" | "certificates";
  extraActions?: React.ReactNode;
}

export default function AdminNav({ currentTab, extraActions }: AdminNavProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      router.push("/admin/login");
    }
  };

  const navLinks = [
    {
      id: "dashboard",
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      id: "events",
      label: "Events & Posters",
      href: "/admin/events",
      icon: Calendar,
    },
    {
      id: "certificates",
      label: "Certificate Studio",
      href: "/admin/certificates",
      icon: Award,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/[0.08] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-3">
          
          {/* Left Brand & Active Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.15)] group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm tracking-wider text-white">
                    CYBER CELL
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/15 border border-amber-400/30 text-amber-300">
                    ADMIN
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono hidden md:block">
                  SATI Vidisha Operations
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Center Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#0c0c0c] p-1 rounded-xl border border-white/[0.06]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.35)] font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {extraActions && (
              <div className="flex items-center gap-2">
                {extraActions}
              </div>
            )}

            {/* Quick Public View */}
            <Link
              href="/"
              target="_blank"
              title="Open Public Website in new tab"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Website</span>
            </Link>

            {/* Verify Portal */}
            <Link
              href="/verify"
              target="_blank"
              title="Open Public Certificate Verification Portal"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Verify</span>
            </Link>

            {/* Logout Button (Minimalist, Amber/Slate, Zero Red) */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              title="Logout from Admin Session"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-amber-400/10 border border-white/[0.08] hover:border-amber-400/30 text-xs font-mono text-slate-300 hover:text-amber-300 transition-all cursor-pointer disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{loggingOut ? "..." : "Logout"}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white"
              aria-label="Toggle admin navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Responsive Navigation for Phones & Tablets) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#080808] px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold px-2">
            Navigation
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-amber-400 text-black font-bold shadow-[0_0_12px_rgba(251,191,36,0.35)]"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-amber-400"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/[0.08] grid grid-cols-2 gap-2 text-xs font-mono">
            <Link
              href="/"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>Public Site</span>
            </Link>
            <Link
              href="/verify"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Verify Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
