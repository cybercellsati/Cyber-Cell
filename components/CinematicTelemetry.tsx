"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Laptop, Box, FlaskConical, ArrowRight } from "lucide-react";

export default function CinematicTelemetry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll parallax for cinematic depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02]);

  // Interactive Live Animated Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Resize canvas
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Observer to pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }

    const PARTICLE_COUNT = 65;
    const particles: Particle[] = [];
    const colors = [
      "#f59e0b", // Gold/Amber
      "#fbbf24", // Warm Yellow
      "#38bdf8", // Electric Sky Cyan
      "#60a5fa", // Sapphire Blue
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 1200),
        y: Math.random() * (canvas.height || 600),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.1, // Slight upward drift
        radius: Math.random() * 1.8 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pulsing glow
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;
        const clampedAlpha = Math.max(0.15, Math.min(0.85, p.alpha));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color === p2.color ? p.color : "#f59e0b";
            ctx.globalAlpha = (1 - dist / 85) * 0.18;
            ctx.lineWidth = 0.7;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#020408] text-white overflow-hidden select-none border-b border-white/[0.08]"
    >
      {/* =========================================================================
          1. 3D PARTICLE CONSTELLATION & SATELLITE BACKDROP
         ========================================================================= */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Cinematic 3D Satellite & Earth Particle Render */}
        <div className="relative w-full h-full">
          <Image
            src="/images/telemetry-satellite-particles.jpg"
            alt="Cyber Cell 3D Satellite & Globe Particle Telemetry"
            fill
            priority
            className="object-cover object-[72%_center] sm:object-[65%_center] lg:object-right opacity-90 transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 1920px"
          />

          {/* Deep Vignette Gradients for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020408] via-[#020408]/85 to-transparent w-full lg:w-[68%] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-[#020408]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.1),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" />
        </div>
      </motion.div>

      {/* Live Animated HTML5 Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1]"
      />

      {/* =========================================================================
          2. TOP HEADER HUD BAR (1:1 with reference)
         ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.12]">
          
          {/* Left: Glowing Amber Dot + Telemetry Eyebrow */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              TELEMETRY // SATI CAMPUS RANGE
            </span>
          </div>

          {/* Right: Technical Coordinates */}
          <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 tracking-[0.2em] uppercase">
            NODE 23.53° N, 77.81° E &bull; VIDISHA
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MAIN CONTENT: HEADLINE + CTA + 3D HUD CALLOUT PINS
         ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className="relative min-h-[340px] sm:min-h-[400px] flex items-center">
          
          {/* Left Column: Two-Tone Giant Typography & Action Button */}
          <div className="max-w-xl space-y-5 sm:space-y-6">
            
            {/* Live Telemetry Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center text-xs font-mono text-slate-300 tracking-wider"
            >
              <span className="text-amber-400">[</span>
              <span className="mx-1.5 font-bold uppercase tracking-[0.2em] text-white">LIVE TELEMETRY</span>
              <span className="text-amber-400">]</span>
            </motion.div>

            {/* Giant Title: OPERATIONAL (Solid White) + TELEMETRY (Hollow Amber Stroke) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4"
            >
              {/* Vertical 4-Block Telemetry Indicator (1:1 with reference) */}
              <div className="flex flex-col gap-1.5 pt-2 sm:pt-3">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-sm bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-sm bg-white/20" />
              </div>

              {/* Title Text */}
              <div className="space-y-0.5">
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-sans tracking-[-0.03em] uppercase text-white leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
                  OPERATIONAL
                </h2>
                <h2
                  className="text-4xl sm:text-6xl lg:text-7xl font-black font-sans tracking-[-0.03em] uppercase leading-none drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                  style={{
                    WebkitTextStroke: "1.8px #f59e0b",
                    color: "transparent",
                  }}
                >
                  TELEMETRY
                </h2>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-md pl-6 sm:pl-7"
            >
              Real numbers powering the technical defense society at Samrat Ashok Technological Institute.
            </motion.p>

            {/* CTA Button (1:1 with reference) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="pt-2 pl-6 sm:pl-7"
            >
              <Link
                href="/events"
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-amber-500/80 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_0_25px_rgba(245,158,11,0.2)]"
              >
                <span>EXPLORE EVENT ARCHIVE</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          4. BOTTOM HORIZONTAL METRICS BAR (1:1 with reference)
          Features:
          - Full-width 4-column layout separated by thin dividers
          - Distinct icons in glowing warm gold amber
          - Large bold numbers with uppercase tracked labels
         ========================================================================= */}
      <div className="relative z-10 border-t border-white/[0.12] bg-[#020408]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/[0.12]">
            
            {/* Stat 1: 300+ Active Cadets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="md:px-6 lg:px-8 first:pl-0 flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-sans text-white tracking-tight leading-none group-hover:text-amber-300 transition-colors">
                  300+
                </div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-200">
                  ACTIVE CADETS
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Verified SATI Network
                </div>
              </div>
            </motion.div>

            {/* Stat 2: 160+ Workshop Cadets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="md:px-6 lg:px-8 flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Laptop className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-sans text-white tracking-tight leading-none group-hover:text-amber-300 transition-colors">
                  160+
                </div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-200">
                  WORKSHOP CADETS
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  EXPLOIT 2026 Batch
                </div>
              </div>
            </motion.div>

            {/* Stat 3: 24/7 CTF Cyber Range */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="md:px-6 lg:px-8 flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Box className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-sans text-white tracking-tight leading-none group-hover:text-amber-300 transition-colors">
                  24/7
                </div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-200">
                  CTF CYBER RANGE
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Live Sandboxes
                </div>
              </div>
            </motion.div>

            {/* Stat 4: 100% Hands-on Labs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="md:px-6 lg:px-8 last:pr-0 flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-sans text-white tracking-tight leading-none group-hover:text-amber-300 transition-colors">
                  100%
                </div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-200">
                  HANDS-ON LABS
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Zero Passive Slides
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}
