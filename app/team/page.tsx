"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allTeamMembers, TeamMember } from "@/data/team";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  ArrowUpRight,
  Sparkles,
  Info,
} from "lucide-react";

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

/**
 * Detailed Modal View when a card is clicked
 */
function MemberDetailModal({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0b0f19] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden my-auto"
      >
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar with close button */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <span>{member.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Close details (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Photo & Details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Portrait Photo */}
          <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden shrink-0 bg-slate-900 border border-white/15 shadow-xl">
            {!imgErr && member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                onError={() => setImgErr(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-2xl font-bold text-slate-500">
                {initials}
              </div>
            )}
          </div>

          {/* Member Information */}
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {member.name}
              </h2>
              <p className="text-sm font-mono text-cyan-400 font-medium mt-0.5">
                {member.role}
              </p>
              {member.department && (
                <p className="text-xs text-slate-400 mt-1">
                  {member.department}
                </p>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/[0.06]">
              {member.bio}
            </p>

            {/* Social & Contact Actions */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-4">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-200 hover:text-white transition-colors"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              )}

              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-200 hover:text-white transition-colors"
                >
                  <GitHubIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              )}

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-200 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{member.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RotatingTeamPage() {
  const members = allTeamMembers;
  const N = members.length;
  const step = 360 / N; // 45 degrees per member

  // Rotation animation states
  const [currentAngle, setCurrentAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(0);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragAngleStart, setDragAngleStart] = useState(0);

  // Responsive radius
  const [radius, setRadius] = useState(380);
  const [cardDim, setCardDim] = useState({ w: 280, h: 420 });

  // Selected Member for Detail View
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Image load error tracking
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Responsive window resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(240);
        setCardDim({ w: 220, h: 330 });
      } else if (w < 1024) {
        setRadius(320);
        setCardDim({ w: 250, h: 380 });
      } else {
        setRadius(400);
        setCardDim({ w: 290, h: 440 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth lerp animation loop (smooth 60/120fps rotation)
  useEffect(() => {
    let animId: number;
    const updateLoop = () => {
      setCurrentAngle((prev) => {
        const diff = targetAngle - prev;
        if (Math.abs(diff) < 0.05) return targetAngle;
        return prev + diff * 0.12; // Smooth damping coefficient
      });
      animId = requestAnimationFrame(updateLoop);
    };
    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, [targetAngle]);

  // Current active index at front
  const activeIndex = ((Math.round(targetAngle / step) % N) + N) % N;
  const activeMember = members[activeIndex] || members[0];

  // Rotate smoothly to specific card index
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

  // Mouse wheel rotation (Clockwise when scrolling down!)
  const handleWheel = (e: React.WheelEvent) => {
    // Scrolling down (deltaY > 0) rotates clockwise (+step)
    const delta = e.deltaY || e.deltaX;
    if (Math.abs(delta) > 10) {
      setTargetAngle((prev) => prev + (delta > 0 ? step : -step));
    }
  };

  // Pointer Dragging (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragAngleStart(targetAngle);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // 1px drag = ~0.35 degrees rotation
    setTargetAngle(dragAngleStart - deltaX * 0.35);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to closest card
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
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-cyan-500/20 selection:text-cyan-300 flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-between pt-28 pb-16 px-4 w-full select-none">
        {/* Top Header Badge (matching reference pill: EXTENDED GRAPHIC) */}
        <div className="text-center space-y-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/15 text-slate-300 text-[11px] font-mono tracking-widest uppercase shadow-sm">
            <span>CYBER CELL · CORE LEADERSHIP</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Meet Our Team
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 font-normal max-w-md mx-auto">
            Scroll or drag horizontally to rotate cards clockwise. Click on any card to view full profile and details.
          </p>
        </div>

        {/* 3D Cylindrical Rotating Cards Viewport */}
        <div
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full max-w-5xl h-[460px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-[1200px] overflow-hidden my-auto"
        >
          {/* Subtle Ambient Behind Carousel */}
          <div className="absolute inset-0 bg-radial from-cyan-500/[0.03] to-transparent pointer-events-none" />

          {/* Cards Arc Ring */}
          <div className="relative w-full h-full flex items-center justify-center">
            {members.map((member, i) => {
              const cardAngle = i * step;
              // Angle relative to front facing point (0 deg = facing viewer)
              const relAngle = ((cardAngle - currentAngle) % 360 + 540) % 360 - 180;
              const rad = (relAngle * Math.PI) / 180;

              // Parametric 3D Arc Positioning
              const x = Math.sin(rad) * radius;
              const z = (Math.cos(rad) - 1) * radius;
              const rotateY = -relAngle * 0.75;
              const scale = Math.max(0.68, 1 + (Math.cos(rad) - 1) * 0.32);
              const opacity = Math.cos(rad) > -0.1 ? Math.max(0.2, (Math.cos(rad) + 0.3) / 1.3) : 0;
              const zIndex = Math.round((Math.cos(rad) + 1) * 50);

              const isFront = Math.abs(relAngle) < 22.5;

              const initials = member.name
                .split(" ")
                .map((w) => w[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <div
                  key={member.id}
                  onClick={() => {
                    if (isFront) {
                      setSelectedMember(member);
                    } else {
                      rotateToIndex(i);
                    }
                  }}
                  style={{
                    width: `${cardDim.w}px`,
                    height: `${cardDim.h}px`,
                    transform: `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    pointerEvents: opacity < 0.2 ? "none" : "auto",
                  }}
                  className={`absolute rounded-3xl overflow-hidden border transition-shadow duration-300 shadow-2xl bg-[#090d16] ${
                    isFront
                      ? "border-cyan-400/50 shadow-cyan-500/10 cursor-pointer ring-1 ring-cyan-400/30"
                      : "border-white/15 hover:border-white/30 cursor-pointer"
                  }`}
                >
                  {/* Portrait Photo Container */}
                  <div className="relative w-full h-full bg-[#050810]">
                    {!imgErrors[member.id] && member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="320px"
                        className="object-cover object-top select-none pointer-events-none"
                        priority={i < 3}
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [member.id]: true }))
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-3xl font-bold text-slate-600 bg-slate-900">
                        {initials}
                      </div>
                    )}

                    {/* Dark Gradient Vignette for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                    {/* Card Top Category Pill */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-black/60 backdrop-blur-md border border-white/15 text-cyan-300 shadow-sm">
                        {member.category}
                      </span>
                    </div>

                    {/* Card Bottom: Member Name & Click Hint */}
                    <div className="absolute bottom-5 left-5 right-5 space-y-1">
                      <p className="text-[11px] font-mono font-medium tracking-wide text-cyan-400 uppercase">
                        {member.role}
                      </p>

                      <h3 className="text-xl font-black text-white tracking-tight uppercase leading-snug">
                        {member.name}
                      </h3>

                      {isFront && (
                        <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
                          <span className="text-cyan-400">Click to view details</span>
                          <span>→</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Chevron Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTargetAngle((prev) => prev - step);
            }}
            className="absolute left-2 sm:left-4 z-40 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-cyan-400/50 text-white backdrop-blur-md transition-all active:scale-95 shadow-lg"
            aria-label="Previous Team Member"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setTargetAngle((prev) => prev + step);
            }}
            className="absolute right-2 sm:right-4 z-40 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-cyan-400/50 text-white backdrop-blur-md transition-all active:scale-95 shadow-lg"
            aria-label="Next Team Member (Rotate Clockwise)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Focus Bar: Active Member Info & Quick Click Pills */}
        <div className="w-full max-w-3xl text-center space-y-4 pt-4">
          {/* Active Member Title (matching RECAP JUNIO style in reference) */}
          <div
            onClick={() => setSelectedMember(activeMember)}
            className="inline-flex flex-col items-center cursor-pointer group"
          >
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              {activeMember.role}
            </span>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors uppercase">
              {activeMember.name}
            </span>
            <span className="text-xs font-mono text-slate-400 mt-0.5 group-hover:underline">
              Tap for full bio & links ↗
            </span>
          </div>

          {/* Member Quick-Jump Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {members.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => rotateToIndex(idx)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                  idx === activeIndex
                    ? "bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                {m.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Profile Details Modal */}
      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      <Footer />
    </div>
  );
}
