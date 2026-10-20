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
  Volume2,
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

interface TeamCarouselMember {
  id: string;
  name: string;
  role: string;
  categoryBadge: string;
  isConvenor?: boolean;
  department: string;
  email: string;
  image: string;
  bio: string;
  tags: string[];
  quote: string;
  linkedin: string;
  github: string;
}

// 6 Core Team Members arranged exactly matching the reference layout
const teamCarouselMembers: TeamCarouselMember[] = [
  {
    id: "yash",
    name: "YASH HARFODE",
    role: "Convenor & Founder",
    categoryBadge: "CONVENOR",
    isConvenor: true,
    department: "CSE, SATI Vidisha",
    email: "yash@cybercell.in",
    image: "/images/team/yash-harfode.png",
    bio: "Leading Cyber Cell with a vision to build a strong cybersecurity culture on campus through learning, collaboration and real-world impact.",
    tags: ["Leadership", "Community", "Events", "Strategy"],
    quote: "Building a community where curiosity meets opportunity.",
    linkedin: "https://linkedin.com/in/yashharfode",
    github: "https://github.com/yashharfode",
  },
  {
    id: "krishna",
    name: "KRISHNA",
    role: "Technical Lead",
    categoryBadge: "TECHNICAL LEAD",
    department: "CSE, SATI Vidisha",
    email: "krishna@cybercell.in",
    image: "/images/team/krishna-mishra.png",
    bio: "Driving offensive security tracks, workshop hands-on architectures, and mentoring students in CTF wargames and red teaming.",
    tags: ["Penetration Testing", "Workshops", "CTFs", "Red Teaming"],
    quote: "Security is not a feature; it is a fundamental mindset.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "anubhav",
    name: "ANUBHAV",
    role: "Operations Lead",
    categoryBadge: "OPERATIONS LEAD",
    department: "CSE, SATI Vidisha",
    email: "anubhav@cybercell.in",
    image: "/images/team/anubhav.png",
    bio: "Leading technical infrastructure, CTF challenge design, offensive security tracks, and developer projects.",
    tags: ["Reverse Engineering", "Linux Internals", "CTFs", "Tooling"],
    quote: "Break it down to understand how to build it unbreakable.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "abhishek",
    name: "ABHISHEK",
    role: "Co-Convenor",
    categoryBadge: "CO-CONVENOR",
    department: "CSE, SATI Vidisha",
    email: "abhishek@cybercell.in",
    image: "/images/team/abhishek-mahore.png",
    bio: "Assisting club leadership in strategic planning, event logistics, inter-college outreach, and multimedia production.",
    tags: ["Media Production", "Strategy", "Logistics", "Community"],
    quote: "Documenting the journey inspires the next generation of defenders.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "arya",
    name: "ARYA MISHRA",
    role: "Design & Public Relations",
    categoryBadge: "DESIGN & PR",
    department: "CSE, SATI Vidisha",
    email: "arya@cybercell.in",
    image: "/images/team/arya-mishra.jpg",
    bio: "Directing brand aesthetics, visual design assets, UI/UX, official announcements, and stage presentations for campus events.",
    tags: ["UI/UX Design", "Public Speaking", "Branding", "Creative"],
    quote: "Visual clarity turns complex security concepts into accessible ideas.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "ansh",
    name: "ANSH KUSHWAHA",
    role: "Club Secretary",
    categoryBadge: "CLUB SECRETARY",
    department: "CSE, SATI Vidisha",
    email: "ansh@cybercell.in",
    image: "/images/team/ansh-kushwaha.png",
    bio: "Overseeing executive administration, member relations, official campus coordination, and cross-team workflows.",
    tags: ["Operations", "Administration", "Planning", "Outreach"],
    quote: "Great teams turn shared passion into lasting institutional impact.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
];

export default function TeamPage() {
  const members = teamCarouselMembers;
  const N = members.length;
  const step = 360 / N;

  // Rotation angles for smooth lerp physics
  const [currentAngle, setCurrentAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(0);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);

  // Responsive dimensions
  const [radius, setRadius] = useState(420);
  const [cardDim, setCardDim] = useState({ w: 290, h: 430 });

  // Carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef(0);

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(240);
        setCardDim({ w: 210, h: 320 });
      } else if (w < 1024) {
        setRadius(340);
        setCardDim({ w: 250, h: 380 });
      } else {
        setRadius(430);
        setCardDim({ w: 290, h: 430 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth lerp animation loop (spring damping)
  useEffect(() => {
    let animId: number;
    const updateLoop = () => {
      setCurrentAngle((prev) => {
        const diff = targetAngle - prev;
        if (Math.abs(diff) < 0.02) return targetAngle;
        return prev + diff * 0.11; // smooth damping
      });
      animId = requestAnimationFrame(updateLoop);
    };
    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, [targetAngle]);

  // Current active index in front
  const activeIndex = ((Math.round(targetAngle / step) % N) + N) % N;
  const activeMember = members[activeIndex] || members[0];

  // Rotate smoothly to a specific index
  const rotateToIndex = useCallback(
    (targetIdx: number) => {
      const currentIdx = ((Math.round(targetAngle / step) % N) + N) % N;
      let diff = targetIdx - currentIdx;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      setTargetAngle((prev) => prev + diff * step);
    },
    [targetAngle, step, N]
  );

  // Trackpad / Wheel listener
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastWheelTime.current < 120) return;

      const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 8) {
        lastWheelTime.current = now;
        setTargetAngle((prev) => prev + (delta > 0 ? step : -step));
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [step]);

  // Drag / Touch gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragStartAngle(targetAngle);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setTargetAngle(dragStartAngle - deltaX * 0.32);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    // Snap to nearest card
    setTargetAngle((prev) => Math.round(prev / step) * step);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setTargetAngle((prev) => prev - step);
      } else if (e.key === "ArrowRight") {
        setTargetAngle((prev) => prev + step);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  return (
    <div className="min-h-screen bg-[#030509] text-white flex flex-col font-sans selection:bg-[#00e5ff]/25 selection:text-white overflow-x-hidden">
      {/* Sticky / Fixed Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col items-center pt-24 sm:pt-28 pb-16 px-4 w-full select-none relative">
        {/* Background Subtle Ambient */}
        <div className="absolute top-10 inset-x-0 h-96 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(0,229,255,0.05),transparent)] pointer-events-none" />

        {/* 1. HERO HEADER WITH 3D ROBOT HELMET & THE TEAM TITLE */}
        <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center text-center mb-8 sm:mb-12">
          
          {/* Centered 3D Helmet Asset */}
          <div className="relative w-36 sm:w-44 h-28 sm:h-36 -mb-6 sm:-mb-8 pointer-events-none z-0">
            <Image
              src="/images/hero-cyborg-avatar.jpg"
              alt="Cyber Cell Sentinel"
              fill
              className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              priority
            />
            {/* Subtle mask to blend bottom */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#030509] to-transparent" />
          </div>

          {/* HUD Tech Lines & Editorial Heading Row */}
          <div className="relative w-full flex items-center justify-between px-4 sm:px-8 z-10">
            {/* Left Tech HUD */}
            <div className="hidden lg:flex flex-col text-[10px] font-mono tracking-[0.25em] text-slate-500 uppercase border-l-2 border-[#00e5ff]/40 pl-3.5 py-1 text-left space-y-1">
              <span className="text-[#00e5ff] font-bold">CORE TEAM</span>
              <span>PEOPLE</span>
              <span>IDEAS</span>
              <span>INITIATIVES</span>
              <span>IMPACT</span>
            </div>

            {/* Giant Center Title: THE TEAM */}
            <div className="flex-1 flex justify-center">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white flex items-center justify-center gap-3 sm:gap-4 select-none">
                <span
                  className="font-extrabold"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.7)",
                    color: "transparent",
                  }}
                >
                  THE
                </span>
                <span className="text-[#00e5ff] text-3xl sm:text-4xl font-light opacity-80">
                  ✦
                </span>
                <span className="text-white font-black tracking-tight">
                  TEAM
                </span>
              </h1>
            </div>

            {/* Right Tech HUD */}
            <div className="hidden lg:flex flex-col text-[10px] font-mono tracking-[0.25em] text-slate-500 uppercase border-r-2 border-[#00e5ff]/40 pr-3.5 py-1 text-right space-y-1">
              <span className="text-[#00e5ff] font-bold">STUDENTS</span>
              <span>BUILDING</span>
              <span>A SECURE</span>
              <span>TOMORROW</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto mt-4 px-4 leading-relaxed">
            A team of passionate students driving Cyber Cell forward &mdash; through learning, collaboration and real impact.
          </p>
        </div>

        {/* 2. 3D CYLINDRICAL CAROUSEL VIEWPORT */}
        <div
          ref={carouselRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full max-w-6xl h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-[1200px] overflow-hidden my-auto"
        >
          {/* Center Cards 3D Space */}
          <div className="relative w-full h-full flex items-center justify-center">
            {members.map((member, i) => {
              const cardAngle = i * step;
              const relAngle = (((cardAngle - currentAngle) % 360) + 540) % 360 - 180;
              const rad = (relAngle * Math.PI) / 180;

              // Parametric Cylindrical Transformation
              const x = Math.sin(rad) * radius;
              const z = (Math.cos(rad) - 1) * radius;
              const rotateY = -relAngle * 0.72;
              const scale = Math.max(0.72, 1 + (Math.cos(rad) - 1) * 0.28);
              const opacity = Math.cos(rad) > -0.2 ? Math.max(0.25, (Math.cos(rad) + 0.3) / 1.3) : 0;
              const zIndex = Math.round((Math.cos(rad) + 1) * 50);

              const isFront = Math.abs(relAngle) < 22;

              return (
                <div
                  key={member.id}
                  onClick={() => rotateToIndex(i)}
                  style={{
                    width: `${cardDim.w}px`,
                    height: `${cardDim.h}px`,
                    transform: `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    pointerEvents: opacity < 0.2 ? "none" : "auto",
                  }}
                  className={`absolute rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-300 shadow-2xl ${
                    isFront
                      ? "border-[#00e5ff] shadow-[0_0_35px_rgba(0,229,255,0.3)] ring-1 ring-[#00e5ff]/50 bg-[#070b14] cursor-default"
                      : "border-white/10 hover:border-white/25 bg-[#060910] cursor-pointer"
                  }`}
                >
                  {/* Photo Container */}
                  <div className="relative w-full h-full bg-[#050810]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="340px"
                      className="object-cover object-top select-none pointer-events-none"
                      priority={i < 3}
                    />

                    {/* Gradient overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

                    {/* Card Top Pill Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold backdrop-blur-md shadow-sm transition-all ${
                          isFront
                            ? "bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#00e5ff]"
                            : "bg-black/60 border border-white/15 text-slate-300"
                        }`}
                      >
                        {member.categoryBadge}
                      </span>

                      {/* Yellow Star for Convenor */}
                      {member.isConvenor && isFront && (
                        <span className="text-amber-400 text-sm drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]">
                          ★
                        </span>
                      )}
                    </div>

                    {/* Card Bottom: Member Name & Role */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-10">
                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-white tracking-tight uppercase leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-xs font-mono text-slate-300 mt-0.5">
                          {member.role}
                        </p>
                      </div>

                      {/* Diagonal Arrow Icon on Active Card */}
                      {isFront && (
                        <div className="w-6 h-6 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shrink-0 ml-2">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTargetAngle((prev) => prev - step);
            }}
            className="absolute left-2 sm:left-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-[#00e5ff]/60 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-95 shadow-lg group"
            aria-label="Previous Team Member"
          >
            <ChevronLeft className="w-5 h-5 group-hover:text-[#00e5ff] transition-colors" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTargetAngle((prev) => prev + step);
            }}
            className="absolute right-2 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-[#00e5ff]/60 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-95 shadow-lg group"
            aria-label="Next Team Member"
          >
            <ChevronRight className="w-5 h-5 group-hover:text-[#00e5ff] transition-colors" />
          </button>
        </div>

        {/* 3. ARC TRACK WITH DOTS & INTERACTION HINT */}
        <div className="relative w-full max-w-md mx-auto flex flex-col items-center mt-2 mb-10">
          {/* Subtle Curved Arc SVG Track */}
          <div className="relative w-72 h-10 flex items-center justify-center">
            <svg
              viewBox="0 0 280 40"
              fill="none"
              className="w-full h-full stroke-white/15"
            >
              <path
                d="M 20 30 Q 140 2 260 30"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* 5 Dots along the track */}
            <div className="absolute inset-x-8 top-3 flex items-center justify-between px-2">
              {[0, 1, 2, 3, 4].map((dotIdx) => {
                const isCenter = dotIdx === 2;
                return (
                  <div
                    key={dotIdx}
                    className={`rounded-full transition-all duration-300 ${
                      isCenter
                        ? "w-2.5 h-2.5 bg-[#00e5ff] shadow-[0_0_12px_#00e5ff] scale-125"
                        : "w-1.5 h-1.5 bg-white/30"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Monospace interaction hint */}
          <span className="text-[10px] font-mono tracking-[0.25em] text-slate-500 uppercase mt-1">
            DRAG &bull; SCROLL &bull; EXPLORE
          </span>
        </div>

        {/* 4. ACTIVE MEMBER DEEP-DIVE DETAIL PANEL (MATCHING REFERENCE) */}
        <div className="w-full max-w-6xl mx-auto px-4 mb-16">
          <div className="relative rounded-3xl border border-white/10 bg-[#060911]/85 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500">
            {/* Top Subtle Amber/Cyan Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Member Overview & Tags */}
              <div className="lg:col-span-5 space-y-4">
                {/* Badge */}
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30 shadow-sm">
                  {activeMember.categoryBadge}
                </span>

                {/* Big Name */}
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
                  {activeMember.name}
                </h2>

                {/* Subtitle / Role Line */}
                <p className="text-xs sm:text-sm font-mono text-slate-400">
                  {activeMember.role} &nbsp;|&nbsp; Cyber Cell, SATI Vidisha
                </p>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {activeMember.bio}
                </p>

                {/* Tags */}
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
                  className="flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-[#00e5ff] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#00e5ff]" />
                  <span>{activeMember.email}</span>
                </a>

                <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                  <GraduationCap className="w-4 h-4 text-[#00e5ff]" />
                  <span>{activeMember.department}</span>
                </div>

                <a
                  href={activeMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-[#00e5ff] transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4 text-[#00e5ff]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={activeMember.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-mono text-slate-300 hover:text-[#00e5ff] transition-colors"
                >
                  <GitHubIcon className="w-4 h-4 text-[#00e5ff]" />
                  <span>GitHub</span>
                </a>
              </div>

              {/* Right Column: Quote Block */}
              <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between min-h-[160px]">
                <div>
                  <span className="text-3xl font-serif text-[#00e5ff] leading-none block mb-2 opacity-90">
                    &ldquo;
                  </span>
                  <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed italic">
                    {activeMember.quote}
                  </p>
                </div>
                <div className="w-10 h-[2px] bg-[#00e5ff]/50 mt-4" />
              </div>

            </div>
          </div>
        </div>

        {/* 5. FACULTY ADVISOR & MENTOR SECTION (EXACT REFERENCE LAYOUT) */}
        <section className="w-full max-w-6xl mx-auto px-4 pt-8 pb-12 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Mission */}
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-xs font-mono uppercase tracking-wider font-semibold">
                <Volume2 className="w-3.5 h-3.5" />
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
              <div className="relative rounded-2xl border border-white/10 bg-[#070b14]/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                
                {/* Academic Mentorship Emblem */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-[#0c1424] to-[#060910] border border-[#00e5ff]/25 flex flex-col items-center justify-center shrink-0 shadow-xl text-[#00e5ff]">
                  <GraduationCap className="w-9 h-9 mb-1 text-[#00e5ff]" />
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                    SATI CSE
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20">
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
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-[#00e5ff] group-hover:border-[#00e5ff]/40 transition-colors shrink-0 self-start sm:self-center"
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
