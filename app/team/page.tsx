"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  GraduationCap,
  ArrowUpRight,
  Shield,
  Briefcase,
  Award,
  Sparkles,
} from "lucide-react";

// Social SVG Icons
function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z" />
    </svg>
  );
}

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  categoryBadge: string;
  department: string;
  email: string;
  image: string;
  bio: string;
  tags: string[];
  quote: string;
  linkedin: string;
  github: string;
  quickStats: { label: string; value: string }[];
}

// 7 Core Team Members in order: Yash -> Ansh -> Abhishek -> Krishna -> Anubhav -> Divyansh -> Arya
const teamMembers: TeamMember[] = [
  {
    id: "yash",
    name: "Yash Harfode",
    role: "Convenor & Founder",
    categoryBadge: "CONVENOR",
    department: "CSE, SATI Vidisha",
    email: "yash@cybercell.in",
    image: "/images/team/yash-harfode.png",
    bio: "Leading Cyber Cell with a clear vision to build an ethical cybersecurity culture on campus through structured learning, hands-on labs, and real-world impact.",
    tags: ["Leadership", "Community", "Strategy", "Workshops"],
    quote: "Building an engineering community where curiosity meets practical opportunity.",
    linkedin: "https://linkedin.com/in/yashharfode",
    github: "https://github.com/yashharfode",
    quickStats: [
      { label: "Role", value: "Club Founder" },
      { label: "Branch", value: "CSE SATI" },
      { label: "Focus", value: "Leadership & Labs" },
    ],
  },
  {
    id: "ansh",
    name: "Ansh Kushwaha",
    role: "Club Secretary",
    categoryBadge: "SECRETARY",
    department: "CSE, SATI Vidisha",
    email: "ansh@cybercell.in",
    image: "/images/team/ansh-kushwaha.png",
    bio: "Overseeing executive administration, member relations, official campus coordination, and inter-departmental communications.",
    tags: ["Operations", "Administration", "Planning", "Outreach"],
    quote: "Disciplined execution and strong teams turn shared passion into lasting institutional impact.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    quickStats: [
      { label: "Role", value: "Club Secretary" },
      { label: "Branch", value: "CSE SATI" },
      { label: "Focus", value: "Operations & Flow" },
    ],
  },
  {
    id: "abhishek",
    name: "Abhishek Mahore",
    role: "Co-Convenor",
    categoryBadge: "CO-CONVENOR",
    department: "CSE, SATI Vidisha",
    email: "abhishek@cybercell.in",
    image: "/images/team/abhishek-mahore.png",
    bio: "Assisting club leadership in strategic planning, event logistics, inter-college outreach, and multimedia production.",
    tags: ["Media Production", "Strategy", "Logistics", "Community"],
    quote: "Documenting our journey inspires the next generation of cybersecurity defenders.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    quickStats: [
      { label: "Role", value: "Co-Convenor" },
      { label: "Branch", value: "CSE SATI" },
      { label: "Focus", value: "Logistics & Outreach" },
    ],
  },
  {
    id: "krishna",
    name: "Krishna Mishra",
    role: "Co-Convenor",
    categoryBadge: "CO-CONVENOR",
    department: "CSE, SATI Vidisha",
    email: "krishna@cybercell.in",
    image: "/images/team/krishna-mishra.png",
    bio: "Driving offensive security tracks, workshop hands-on architectures, and mentoring students in CTF wargames and red teaming.",
    tags: ["Penetration Testing", "Workshops", "CTFs", "Red Teaming"],
    quote: "Security is not an isolated feature; it is a fundamental institutional mindset.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    quickStats: [
      { label: "Role", value: "Co-Convenor" },
      { label: "Branch", value: "CSE SATI" },
      { label: "Focus", value: "Red Team & CTFs" },
    ],
  },
  {
    id: "anubhav",
    name: "Anubhav Vishwkarma",
    role: "Technical Lead",
    categoryBadge: "TECHNICAL LEAD",
    department: "CSE, SATI Vidisha",
    email: "anubhav@cybercell.in",
    image: "/images/team/anubhav.png",
    bio: "Leading technical infrastructure, CTF challenge design, offensive security tracks, and developer projects.",
    tags: ["Reverse Engineering", "Linux Internals", "CTFs", "Tooling"],
    quote: "Break systems down rigorously to understand how to build them unbreakable.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    quickStats: [
      { label: "Role", value: "Technical Lead" },
      { label: "Branch", value: "CSE SATI" },
      { label: "Focus", value: "Systems & Exploits" },
    ],
  },
  {
    id: "divyansh",
    name: "Divyansh Chaurey",
    role: "Management & Media Lead",
    categoryBadge: "MANAGEMENT & MEDIA",
    department: "CSE, SATI Vidisha",
    email: "divyansh@cybercell.in",
    image: "/images/team/divyansh-chaurey.png",
    bio: "Heading on-ground event management, media coverage, photography, video production, and publicity campaigns.",
    tags: ["Event Management", "Media Production", "Publicity", "Logistics"],
    quote: "Connecting our club's energy with the wider campus through impactful visual storytelling.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    quickStats: [
      { label: "Role", value: "Media Lead" },
      { label: "Branch", value: "CSE SATI" },
      { label: "Focus", value: "Media & Event Ops" },
    ],
  },
  {
    id: "arya",
    name: "Arya Mishra",
    role: "Graphic Design & Public Speaking",
    categoryBadge: "GRAPHIC DESIGN & SPEAKING",
    department: "CSE, SATI Vidisha",
    email: "arya@cybercell.in",
    image: "/images/team/arya-mishra.jpg",
    bio: "Directing brand aesthetics, visual design assets, UI/UX, official announcements, and stage presentations for campus events.",
    tags: ["Graphic Design", "Public Speaking", "UI/UX", "Creative"],
    quote: "Visual clarity and confident storytelling turn complex security concepts into accessible ideas.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    quickStats: [
      { label: "Role", value: "Design Lead" },
      { label: "Branch", value: "CSE SATI" },
      { label: "Focus", value: "Brand & Stage" },
    ],
  },
];

export default function TeamPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Center card 3D tilt tracking
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const N = teamMembers.length;
  const activeMember = teamMembers[activeIndex];

  // Track window size for responsive curved spacing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % N);
    setTilt({ x: 0, y: 0 });
  }, [N]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + N) % N);
    setTilt({ x: 0, y: 0 });
  }, [N]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevCard();
      else if (e.key === "ArrowRight") nextCard();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    const deltaX = e.clientX - dragStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) nextCard();
      else prevCard();
    }
  };

  // Center card mouse parallax tilt
  const handleCenterMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (-y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleCenterMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300 overflow-x-hidden">
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col items-center pt-24 sm:pt-28 pb-16 px-3 sm:px-6 w-full select-none relative">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-12 inset-x-0 h-[480px] bg-[radial-gradient(ellipse_60%_45%_at_50%_15%,rgba(245,158,11,0.05),transparent)] pointer-events-none" />

        {/* ========================================================
            1. HEADER WITH CONTROLS (MATCHING REFERENCE MOCKUP)
           ======================================================== */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-between mt-2 mb-6 sm:mb-8 px-2 z-20">
          
          {/* Left Arrow Button */}
          <button
            onClick={prevCard}
            aria-label="Previous member"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Centered Editorial Title */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              Core Leadership
            </h1>
            <p className="text-xs font-mono tracking-[0.2em] text-amber-400 uppercase mt-0.5 font-semibold">
              Cyber Cell &bull; SATI Vidisha
            </p>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextCard}
            aria-label="Next member"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* ========================================================
            2. APPLE VISIONOS SPATIAL CURVED FAN DECK
            Exact 1:1 Match to the User's Reference Screenshot
           ======================================================== */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="relative w-full max-w-6xl h-[390px] sm:h-[480px] lg:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-[1200px] overflow-visible my-auto"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {teamMembers.map((member, i) => {
              // Calculate parametric offset from center (-3 to +3)
              const diff = ((i - activeIndex) % N + N) % N;
              const offset = diff > N / 2 ? diff - N : diff;
              const isCenter = offset === 0;

              // Spatial curve parameters
              let x = 0;
              let z = 0;
              let rotateY = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 50;

              if (isCenter) {
                x = 0;
                z = isMobile ? 30 : 60;
                rotateY = 0;
                scale = isMobile ? 1.0 : 1.06;
                opacity = 1;
                zIndex = 50;
              } else if (Math.abs(offset) === 1) {
                x = offset * (isMobile ? 120 : 230);
                z = isMobile ? -35 : -70;
                rotateY = offset * -18;
                scale = isMobile ? 0.85 : 0.88;
                opacity = 0.95;
                zIndex = 40;
              } else if (Math.abs(offset) === 2) {
                x = offset * (isMobile ? 200 : 410);
                z = isMobile ? -90 : -160;
                rotateY = offset * -32;
                scale = isMobile ? 0.72 : 0.76;
                opacity = isMobile ? 0.4 : 0.85;
                zIndex = 30;
              } else {
                x = offset * (isMobile ? 260 : 530);
                z = -260;
                rotateY = offset * -45;
                scale = 0.62;
                opacity = 0;
                zIndex = 10;
              }

              // Card dimensions
              const cardWidth = isMobile ? 220 : 280;
              const cardHeight = isMobile ? 330 : 420;

              return (
                <div
                  key={member.id}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveIndex(i);
                      setTilt({ x: 0, y: 0 });
                    }
                  }}
                  onMouseMove={isCenter ? handleCenterMouseMove : undefined}
                  onMouseLeave={isCenter ? handleCenterMouseLeave : undefined}
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    transform: isCenter
                      ? `translate3d(${x}px, 0, ${z}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`
                      : `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    transition: isDragging
                      ? "none"
                      : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease",
                    pointerEvents: opacity < 0.3 ? "none" : "auto",
                  }}
                  className={`absolute rounded-[28px] overflow-hidden select-none border transition-shadow duration-300 ${
                    isCenter
                      ? "border-amber-400/60 shadow-[0_20px_60px_rgba(0,0,0,0.9),_0_0_40px_rgba(245,158,11,0.22)] ring-1 ring-amber-400/40 cursor-default bg-[#0a0a0a]"
                      : "border-white/10 hover:border-white/30 shadow-2xl cursor-pointer bg-[#070707] brightness-90 hover:brightness-100"
                  }`}
                >
                  {/* Photo Container */}
                  <div className="relative w-full h-full bg-[#06080d]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="340px"
                      className="object-cover object-top select-none pointer-events-none"
                      priority={i < 3}
                    />

                    {/* Gradient Overlay for Typography Contrast (Matching Reference) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 pointer-events-none" />

                    {/* Top-Right Index Notch Tab (Matching Reference e.g. 1 / 20) */}
                    <div className="absolute top-0 right-0 z-10">
                      <div className="px-3.5 py-1.5 rounded-bl-2xl bg-black/65 backdrop-blur-md border-b border-l border-white/10 text-[11px] font-mono font-bold tracking-wider text-white shadow-sm flex items-center gap-1">
                        <span className="text-amber-400">{i + 1}</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-400">{N}</span>
                      </div>
                    </div>

                    {/* Bottom Member Identity Info (Matching Reference e.g. Rosa Khutor) */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-left pointer-events-none">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold mb-1">
                        {member.categoryBadge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-300 font-mono mt-0.5 drop-shadow-sm">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            3. PILL HUD DOCK (MATCHING REFERENCE MOCKUP BELOW TABLE)
            e.g. [ 115km ] [ 2347m ] [ -10 ] [ 113cm ]
           ======================================================== */}
        <div className="relative w-full max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-4 sm:mt-6 mb-12 px-3 z-20">
          
          {/* Badge 1: Role */}
          <div className="px-3.5 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-slate-200 flex items-center gap-2 shadow-lg">
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">{activeMember.categoryBadge}</span>
          </div>

          {/* Badge 2: Department */}
          <div className="px-3.5 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-slate-200 flex items-center gap-2 shadow-lg">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{activeMember.department}</span>
          </div>

          {/* Badge 3: Quick Focus */}
          <div className="hidden sm:flex px-3.5 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-slate-200 items-center gap-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{activeMember.quickStats[2].value}</span>
          </div>

          {/* Badge 4: Email */}
          <a
            href={`mailto:${activeMember.email}`}
            className="px-3.5 py-1.5 rounded-full bg-black/70 border border-white/15 hover:border-amber-400/40 backdrop-blur-xl text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-2 shadow-lg transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate max-w-[140px] sm:max-w-none">{activeMember.email}</span>
          </a>

        </div>

        {/* ========================================================
            4. ACTIVE MEMBER DEEP-DIVE DETAIL PANEL
           ======================================================== */}
        <div className="w-full max-w-6xl mx-auto px-4 mb-16">
          <div className="relative rounded-3xl border border-white/10 bg-[#070707]/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500">
            {/* Top Subtle Amber Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Member Overview & Tags */}
              <div className="lg:col-span-5 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/30 shadow-sm">
                  {activeMember.categoryBadge}
                </span>

                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
                  {activeMember.name}
                </h2>

                <p className="text-xs sm:text-sm font-mono text-slate-400">
                  {activeMember.role} &nbsp;|&nbsp; Cyber Cell, SATI Vidisha
                </p>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {activeMember.bio}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activeMember.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Middle Column: Contact Info & Handles */}
              <div className="lg:col-span-3 space-y-3 lg:border-l lg:border-white/[0.08] lg:pl-8 py-2">
                <a
                  href={`mailto:${activeMember.email}`}
                  className="flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{activeMember.email}</span>
                </a>

                <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                  <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{activeMember.department}</span>
                </div>

                <a
                  href={activeMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={activeMember.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <GitHubIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>GitHub Profile</span>
                </a>
              </div>

              {/* Right Column: Quote Block */}
              <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between min-h-[160px]">
                <div>
                  <span className="text-3xl font-serif text-amber-400 leading-none block mb-2 opacity-90">
                    &ldquo;
                  </span>
                  <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed italic">
                    {activeMember.quote}
                  </p>
                </div>
                <div className="w-10 h-[2px] bg-amber-400/50 mt-4" />
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            5. FACULTY ADVISOR & MENTOR SECTION
           ======================================================== */}
        <section className="w-full max-w-6xl mx-auto px-4 pt-8 pb-12 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Mission */}
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono uppercase tracking-wider font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>INSTITUTIONAL MENTORSHIP</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Faculty Advisor &amp; Mentor
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-md">
                Guiding our club&apos;s academic rigor, research integrity, and student development under SATI Vidisha.
              </p>
            </div>

            {/* Right Column: Mentor Card */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border border-white/10 bg-[#070707]/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                
                {/* Academic Mentorship Emblem */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-[#121008] to-[#06080d] border border-amber-400/25 flex flex-col items-center justify-center shrink-0 shadow-xl text-amber-400">
                  <GraduationCap className="w-9 h-9 mb-1 text-amber-400" />
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                    SATI CSE
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    FACULTY ADVISOR &amp; MENTOR
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Prof. Shivangi Jain
                  </h3>

                  <p className="text-xs text-slate-400 font-mono">
                    Department of Computer Science &amp; Engineering, SATI Vidisha
                  </p>

                  {/* Mentorship Tags */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-2">
                    {["Academic Guidance", "Research Support", "Student Mentorship"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow Button */}
                <a
                  href="mailto:shivangijain@satiengg.in"
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:border-amber-400/40 transition-colors shrink-0 self-start sm:self-center"
                  title="Contact Faculty Advisor"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Global Comprehensive Footer */}
      <Footer />
    </div>
  );
}
