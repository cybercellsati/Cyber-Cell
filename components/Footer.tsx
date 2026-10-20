import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#030303] border-t border-white/[0.08] text-slate-400 text-xs overflow-hidden select-none">
      
      {/* Golden / Amber Atmospheric Arc (Matching Reference Mockup in Top-Right) */}
      <div className="absolute top-0 right-0 w-[550px] h-[180px] pointer-events-none overflow-hidden select-none">
        <svg
          viewBox="0 0 550 180"
          fill="none"
          className="w-full h-full opacity-80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 550 5 C 440 25 330 70 240 180"
            stroke="url(#footerGoldGlow)"
            strokeWidth="3"
            filter="drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"
          />
          <path
            d="M 550 5 C 440 25 330 70 240 180"
            stroke="url(#footerGoldCore)"
            strokeWidth="1.2"
          />
          <defs>
            <linearGradient id="footerGoldGlow" x1="550" y1="5" x2="240" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="footerGoldCore" x1="550" y1="5" x2="240" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-20 w-80 h-28 bg-amber-500/[0.05] blur-3xl rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 sm:pb-10">
        
        {/* Main 3-Column Footer Grid with Vertical Dividers */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-8">
          
          {/* ========================================================
              COLUMN 1: BRAND LOGO, CLUB DETAILS & MISSION CHAIN
             ======================================================== */}
          <div className="flex-1 flex flex-col justify-between max-w-md lg:pr-6">
            <div>
              {/* Brand Logo with Vertical Amber Divider (Matching Reference) */}
              <Link href="/" className="group inline-flex items-center gap-3.5 select-none" aria-label="Cyber Cell Home">
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src="/images/cyber-cell-logo.png"
                    alt="Cyber Cell Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Vertical Amber Bar */}
                <span className="w-[2px] h-9 bg-amber-500 rounded-full inline-block shadow-[0_0_8px_rgba(245,158,11,0.85)]" />

                {/* Two-Line Title */}
                <div className="flex flex-col text-left leading-none">
                  <span className="font-extrabold font-sans tracking-[0.16em] text-white text-base sm:text-lg group-hover:text-amber-300 transition-colors">
                    CYBER CELL
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-[0.24em] uppercase mt-1.5 font-semibold">
                    SATI VIDISHA
                  </span>
                </div>
              </Link>

              {/* Subtitle / Club Narrative */}
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-sm mt-4 font-normal">
                Official Cybersecurity Club at Samrat Ashok Technological Institute (SATI), Vidisha.
              </p>
            </div>

            {/* Mission Chain with Amber Arrows */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11.5px] font-mono tracking-wider text-slate-300 mt-6 select-none">
              <span>LEARN</span>
              <span className="text-amber-400 font-bold">&rarr;</span>
              <span>PRACTICE</span>
              <span className="text-amber-400 font-bold">&rarr;</span>
              <span>BUILD</span>
              <span className="text-amber-400 font-bold">&rarr;</span>
              <span>COMPETE</span>
              <span className="text-amber-400 font-bold">&rarr;</span>
              <span className="text-white font-semibold">SECURE</span>
            </div>
          </div>

          {/* Vertical Divider 1 */}
          <div className="hidden lg:block w-[1px] bg-white/[0.08] self-stretch my-1" />

          {/* ========================================================
              COLUMN 2: 3-COLUMN QUICK NAVIGATION LINKS
             ======================================================== */}
          <div className="flex-1 grid grid-cols-3 gap-6 sm:gap-10 text-xs sm:text-[13px] font-medium lg:px-6">
            
            {/* Nav Column 1 */}
            <div className="flex flex-col space-y-3.5">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/domains" className="text-slate-400 hover:text-white transition-colors">
                Domains
              </Link>
              <Link href="/events" className="text-slate-400 hover:text-white transition-colors">
                Events
              </Link>
            </div>

            {/* Nav Column 2 */}
            <div className="flex flex-col space-y-3.5">
              <Link href="/resources" className="text-slate-400 hover:text-white transition-colors">
                Resources
              </Link>
              <Link href="/projects" className="text-slate-400 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="/team" className="text-slate-400 hover:text-white transition-colors">
                Team
              </Link>
              <Link href="/verify" className="text-slate-400 hover:text-white transition-colors">
                Certificate
              </Link>
            </div>

            {/* Nav Column 3 */}
            <div className="flex flex-col space-y-3.5">
              <Link href="/admin/login" className="text-slate-400 hover:text-white transition-colors">
                Admin
              </Link>
              <Link href="/join" className="text-slate-400 hover:text-white transition-colors">
                Join
              </Link>
              <Link href="/about#contact" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>

          </div>

          {/* Vertical Divider 2 */}
          <div className="hidden lg:block w-[1px] bg-white/[0.08] self-stretch my-1" />

          {/* ========================================================
              COLUMN 3: SOCIAL PILLS & EDITORIAL MOTTO
             ======================================================== */}
          <div className="flex flex-col justify-between shrink-0 lg:pl-6 space-y-4">
            
            {/* Social Icons in Rounded Square Outline Boxes */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-slate-300">
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/cybercellsati/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/15 bg-white/[0.02] flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/[0.05] transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/cybercell_sati/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/15 bg-white/[0.02] flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/[0.05] transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@CyberCellSATI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/15 bg-white/[0.02] flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/[0.05] transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/cybercellsati"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/15 bg-white/[0.02] flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/[0.05] transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>

            </div>

            {/* Amber Accent Line */}
            <div className="w-6 h-[2px] bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />

            {/* Two-Tone Cyber Motto */}
            <div className="flex flex-col text-left font-mono">
              <span className="text-white font-extrabold text-sm sm:text-base tracking-[0.22em] uppercase">
                THINK SECURE.
              </span>
              <span className="text-slate-500 font-normal text-xs sm:text-[13px] tracking-[0.22em] uppercase mt-0.5">
                BUILD BETTER.
              </span>
            </div>

          </div>

        </div>

        {/* ========================================================
            BOTTOM COPYRIGHT & MOTTO STRIP
           ======================================================== */}
        <div className="mt-12 sm:mt-14 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          
          {/* Copyright Notice */}
          <div>
            &copy; 2026 Cyber Cell. All rights reserved.
          </div>

          {/* Slogan with Amber Separator Dots */}
          <div className="flex items-center gap-2 sm:gap-2.5 tracking-[0.2em] uppercase text-slate-400">
            <span className="hidden sm:inline-block text-slate-700 mr-1.5">|</span>
            <span>LEARN</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>BUILD</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>SECURE</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span className="text-white font-semibold">TOGETHER</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
