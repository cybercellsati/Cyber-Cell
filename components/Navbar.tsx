"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CyberShieldLogo from "./CyberShieldLogo";
import { ArrowRight, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Domains", href: "/domains" },
  { name: "Events", href: "/events" },
  { name: "Resources", href: "/resources" },
  { name: "Projects", href: "/projects" },
  { name: "Team", href: "/team" },
  { name: "Certificate", href: "/verify" },
];

export default function Navbar() {
  const { user, profile, logout, openAuthModal, requireAuth } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-[#06080d]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-3.5"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo matching reference */}
        <CyberShieldLogo size="md" />

        {/* Center Desktop Navigation with Liquid Bubble Hover Effect */}
        <nav
          onMouseLeave={() => setHoveredIndex(null)}
          className="hidden lg:flex relative items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05]"
        >
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`relative px-4 py-2 text-[13.5px] font-medium transition-colors duration-200 select-none flex items-center justify-center rounded-full ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {/* Floating Liquid Bubble */}
                {hoveredIndex === idx && (
                  <motion.span
                    layoutId="navbar-liquid-bubble"
                    className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                  />
                )}

                {/* Nav Item Label */}
                <span className="relative z-10">{item.name}</span>

                {/* Active Page Indicator matching reference: warm amber accent */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.95)] pointer-events-none" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button matching reference */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/30 transition-all text-xs text-white"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-6 h-6 rounded-full border border-cyan-400/40 object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-[10px] font-bold text-cyan-300">
                    {(user.displayName?.[0] || user.email?.[0] || "U").toUpperCase()}
                  </div>
                )}
                <span className="font-medium max-w-[120px] truncate">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {profile?.role || "Member"}
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-xl bg-[#090d16] border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                  <p className="text-xs font-semibold text-white truncate">
                    {user.displayName || "Cyber Cell Member"}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>

                <Link
                  href="/resources"
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  <span>Resource Vault</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>

                <button
                  onClick={() => logout()}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors mt-1"
                >
                  <span>Sign Out</span>
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal()}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Animated Hamburger Button for Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative p-2.5 text-slate-300 hover:text-white focus:outline-none rounded-lg"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-current rounded-full transition-transform duration-300 ease-in-out ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current rounded-full transition-transform duration-300 ease-in-out ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer with Stagger Animation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full max-h-[calc(100dvh-75px)] overflow-y-auto bg-[#06080d]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl px-5 sm:px-6 py-5 space-y-2 animate-in slide-in-from-top-3 duration-200">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-2">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/[0.06] text-amber-400 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span>{item.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />}
              </Link>
            );
          })}

          <div className="pt-4 mt-2 border-t border-white/[0.08] space-y-2">
            {user ? (
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-7 h-7 rounded-full border border-amber-400/40 object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xs font-bold text-amber-300">
                      {(user.displayName?.[0] || user.email?.[0] || "U").toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium text-white truncate max-w-[150px]">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-[10px] font-mono text-amber-400 uppercase">
                      {profile?.role || "Member"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => logout()}
                  className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full py-2.5 text-center text-xs font-medium text-slate-200 bg-white/[0.05] hover:bg-white/[0.08] rounded-lg border border-white/10 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

