"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  GraduationCap,
  ArrowUpRight,
  Shield,
  Award,
  Sparkles,
  Layers,
  ArrowDown,
  MousePointer,
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
    role: "Founder & Convenor",
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

  // References
  const heroRef = useRef<HTMLElement>(null);
  const isScrollingRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const N = teamMembers.length;
  const activeMember = teamMembers[activeIndex];

  // Split name for giant editorial display (e.g. YASH / HARFODE)
  const nameParts = activeMember.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % N);
  }, [N]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + N) % N);
  }, [N]);

  const scrollToDossier = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("dossier")?.scrollIntoView({ behavior: "smooth" });
  };

  // When on Arya Mishra (last card, index 6), automatically return to Convenor (index 0) after 5 seconds
  useEffect(() => {
    if (activeIndex === N - 1) {
      const timer = setTimeout(() => {
        setActiveIndex(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, N]);

  // ========================================================
  // WHEEL INTERCEPTOR:
  // Scrolling down flips cards WITHOUT scrolling the page down!
  // Only after cycling to the last leader (Arya) does scroll
  // naturally continue into the dossier section.
  // ========================================================
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const onWheel = (e: WheelEvent) => {
      // If user has already scrolled down into the page body, let normal scroll occur
      if (window.scrollY > 40) return;

      // Filter out micro accidental movements
      if (Math.abs(e.deltaY) < 18) return;

      if (e.deltaY > 0) {
        // User scrolls wheel DOWN:
        // While not on the last member, intercept wheel and advance card!
        // The page does NOT scroll down!
        if (activeIndex < N - 1) {
          e.preventDefault();
          if (!isScrollingRef.current) {
            isScrollingRef.current = true;
            setActiveIndex((prev) => Math.min(N - 1, prev + 1));
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 450);
          }
        }
        // When activeIndex === N - 1, wheel is not prevented, allowing smooth scroll to dossier
      } else if (e.deltaY < 0) {
        // User scrolls wheel UP:
        // If near page top, intercept wheel and return to previous card
        if (activeIndex > 0 && window.scrollY < 20) {
          e.preventDefault();
          if (!isScrollingRef.current) {
            isScrollingRef.current = true;
            setActiveIndex((prev) => Math.max(0, prev - 1));
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 450);
          }
        }
      }
    };

    heroEl.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      heroEl.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex, N]);

  // Touch Swipe Gesture Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Horizontal swipe triggers card navigation cleanly
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        handlePrev();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Card slide translation step
  const cardStep = isMobile ? 241 : 290;

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300 overflow-x-hidden">
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col w-full select-none relative pt-16 sm:pt-20">
        {/* ========================================================
            1. CINEMATIC SPLIT HERO SLIDER
            Wheel scroll flips cards while keeping the page locked in place!
           ======================================================== */}
        <section
          ref={heroRef}
          className="relative w-full h-[88vh] min-h-[640px] max-h-[950px] overflow-hidden flex flex-col justify-between"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Cross-Fade Portals */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {teamMembers.map((member, idx) => (
              <div
                key={member.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === activeIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105 pointer-events-none"
                } transition-transform duration-700`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-top lg:object-center filter brightness-[0.32] contrast-[1.12] blur-[1px]"
                />
              </div>
            ))}

            {/* Cinematic Gradient Scrims for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 lg:via-black/70 to-black/30 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
          </div>

          {/* Main Two-Column Split Content Area */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between pt-4 pb-20 sm:pb-24">
            {/* ========================================================
                LEFT COLUMN: Active Member Hero Story
               ======================================================== */}
            <div className="w-full lg:w-[48%] flex flex-col justify-center text-left py-4 z-20">
              {/* Eyebrow with horizontal line: e.g. — FOUNDER & CONVENOR */}
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-8 sm:w-12 h-[2px] bg-amber-400" />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
                  {activeMember.role}
                </span>
              </div>

              {/* Giant Condensed Editorial Typography */}
              <h1 className="font-black uppercase tracking-tight text-white leading-[0.88] drop-shadow-2xl">
                <span className="block text-white tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl">
                  {firstName}
                </span>
                <span
                  className={`block tracking-tight text-slate-200 ${
                    lastName.length >= 8
                      ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1"
                      : "text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl"
                  }`}
                >
                  {lastName}
                </span>
              </h1>

              {/* Concise Narrative Bio Snippet */}
              <p className="text-xs sm:text-sm lg:text-base text-slate-300 font-light leading-relaxed max-w-md mt-4 sm:mt-5 drop-shadow-md line-clamp-3 sm:line-clamp-none">
                {activeMember.bio}
              </p>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                {/* Shield / Bookmark pill */}
                <a
                  href={activeMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-amber-400/80 backdrop-blur-md flex items-center justify-center text-white hover:text-amber-400 transition-all active:scale-95 shadow-lg group cursor-pointer"
                  title="View LinkedIn Profile"
                >
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </a>

                {/* Primary Explore Dossier Button */}
                <button
                  type="button"
                  onClick={scrollToDossier}
                  className="inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-amber-400 hover:text-black font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.15)] group cursor-pointer"
                >
                  <span>Explore Dossier</span>
                  <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>

                {/* Mobile Hint Pill */}
                <div className="lg:hidden ml-auto">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    {activeMember.categoryBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================
                RIGHT COLUMN: Floating Cards Strip
                Clicking or wheeling flips through cards smoothly!
               ======================================================== */}
            <div className="w-full lg:w-[52%] h-full flex items-center mt-6 lg:mt-0 relative overflow-hidden pl-0 lg:pl-6">
              {/* Horizontal Slider Track with smooth offset */}
              <div
                className="flex items-center gap-4 sm:gap-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] py-4"
                style={{
                  transform: `translateX(-${activeIndex * cardStep}px)`,
                }}
              >
                {teamMembers.map((member, i) => {
                  const isCurrent = i === activeIndex;
                  const parts = member.name.split(" ");
                  const cardFirstName = parts[0] || "";
                  const cardLastName = parts.slice(1).join(" ") || "";
                  const isKushwaha = member.id === "ansh" || cardLastName.toLowerCase().includes("kushwaha");
                  const isLongLastName = cardLastName.length >= 8 || isKushwaha;
                  const isLongName = member.name.length >= 12 || isLongLastName;

                  return (
                    <div
                      key={member.id}
                      onClick={() => setActiveIndex(i)}
                      className={`relative w-[225px] sm:w-[270px] h-[325px] sm:h-[400px] rounded-[24px] sm:rounded-[28px] overflow-hidden shrink-0 cursor-pointer transition-all duration-500 group select-none ${
                        isCurrent
                          ? "ring-2 ring-amber-400 border-transparent shadow-[0_20px_50px_rgba(245,158,11,0.25)] scale-[1.02]"
                          : "border border-white/10 hover:border-white/35 opacity-70 hover:opacity-100 hover:scale-[1.01] bg-[#080808]"
                      }`}
                    >
                      {/* Member Portrait */}
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 225px, 270px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      />

                      {/* Scrim Overlay with deep contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                      {/* Top Right Index Badge: e.g. 01 / 07 */}
                      <div className="absolute top-3 right-3 z-10">
                        <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold tracking-wider text-white shadow-sm flex items-center gap-1">
                          <span className={isCurrent ? "text-amber-400" : "text-white"}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-slate-500">/</span>
                          <span className="text-slate-400">{String(N).padStart(2, "0")}</span>
                        </div>
                      </div>

                      {/* Active Status Badge */}
                      {isCurrent && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black font-mono font-bold text-[9px] tracking-wider uppercase flex items-center gap-1 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                            Active
                          </span>
                        </div>
                      )}

                      {/* Bottom Info: Category Bar & Clean 2-Line Name */}
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 pr-5 sm:pr-6 z-10 flex flex-col justify-end text-left pointer-events-none">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="w-3.5 h-[1.5px] bg-amber-400 shrink-0" />
                          <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.18em] text-amber-400 font-bold truncate">
                            {member.categoryBadge}
                          </span>
                        </div>

                        {/* 2-line clean editorial name layout with safe scaling for long surnames like Kushwaha & Vishwkarma */}
                        <h3
                          className={`font-black uppercase tracking-tight leading-[1.08] drop-shadow-md ${
                            isKushwaha
                              ? "text-[16px] sm:text-[17px] lg:text-[18px]"
                              : isLongName
                              ? "text-[15px] sm:text-[16px] lg:text-[17px]"
                              : "text-base sm:text-lg lg:text-xl"
                          }`}
                        >
                          <span className="block text-white truncate">{cardFirstName}</span>
                          <span
                            className={`block truncate ${
                              isKushwaha
                                ? "text-[15px] sm:text-[16px] lg:text-[17px] text-slate-200 font-black tracking-tight mt-0.5"
                                : isLongLastName
                                ? "text-[13px] sm:text-[14px] lg:text-[15px] text-slate-200 tracking-normal"
                                : "text-slate-200"
                            }`}
                          >
                            {cardLastName}
                          </span>
                        </h3>

                        <p className="text-[10.5px] sm:text-[11px] text-slate-400 font-mono mt-1 drop-shadow-sm truncate">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================
              BOTTOM CONTROLS & LINEAR PROGRESS DOCK
             ======================================================== */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-0 px-4 sm:px-10 lg:px-14 z-30 flex items-center justify-between">
            {/* Left Controls: Prev, Next & Scroll Tip */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous member"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-amber-400 text-white hover:text-amber-400 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next member"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-amber-400 text-white hover:text-amber-400 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Scroll Tip Indicator */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-lg">
                <MousePointer className="w-3.5 h-3.5 text-amber-400" />
                <span>Scroll wheel to flip cards</span>
              </div>
            </div>

            {/* Center: Linear Progress Bar Indicator */}
            <div className="flex-1 max-w-[100px] sm:max-w-xs md:max-w-md mx-3 sm:mx-8">
              <div className="relative w-full h-[2px] sm:h-[3px] bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.9)] transition-all duration-500 ease-out"
                  style={{ width: `${((activeIndex + 1) / N) * 100}%` }}
                />
              </div>
            </div>

            {/* Right: Counter e.g. 01 / 07 */}
            <div className="flex items-baseline font-mono text-white">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wider text-amber-400">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 ml-1.5">
                / {String(N).padStart(2, "0")}
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. QUICK HUD PILLS DOCK
            Showing key quick attributes for the active leader
           ======================================================== */}
        <section className="relative w-full max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8 mb-16 px-4 z-20">
          {/* Badge 1: Role */}
          <div className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-slate-200 flex items-center gap-2 shadow-lg">
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">{activeMember.categoryBadge}</span>
          </div>

          {/* Badge 2: Department */}
          <div className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-slate-200 flex items-center gap-2 shadow-lg">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{activeMember.department}</span>
          </div>

          {/* Badge 3: Quick Focus */}
          <div className="hidden sm:flex px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-slate-200 items-center gap-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{activeMember.quickStats[2].value}</span>
          </div>

          {/* Badge 4: Email */}
          <a
            href={`mailto:${activeMember.email}`}
            className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 hover:border-amber-400/40 backdrop-blur-xl text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-2 shadow-lg transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate max-w-[140px] sm:max-w-none">{activeMember.email}</span>
          </a>
        </section>

        {/* ========================================================
            3. ACTIVE MEMBER DEEP-DIVE DOSSIER PANEL
            Smooth scroll target from hero CTA button
           ======================================================== */}
        <section id="dossier" className="w-full max-w-6xl mx-auto px-4 mb-20 scroll-mt-24">
          {/* Header Title with Direct Member Selector Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
                Leadership Dossier &bull; Full Profile
              </span>
            </div>

            {/* Quick Member Filter Tabs inside Dossier */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {teamMembers.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all shrink-0 cursor-pointer ${
                    idx === activeIndex
                      ? "bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                  }`}
                >
                  {m.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

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
        </section>

        {/* ========================================================
            4. FACULTY ADVISOR & MENTOR SECTION
           ======================================================== */}
        <section className="w-full max-w-6xl mx-auto px-4 pt-8 pb-16 border-t border-white/[0.08]">
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
