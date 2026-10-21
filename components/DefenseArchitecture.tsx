"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SparkleStar {
  nx: number;
  ny: number;
  color: "gold" | "blue" | "white" | "cyan";
  size: number;
  twinkleSpeed: number;
  phase: number;
  hasGlint: boolean;
}

interface BubbleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  colorScheme: "cyan" | "gold" | "sapphire" | "white";
  wobbleSpeed: number;
  wobbleDist: number;
  wobbleOffset: number;
}

interface ThrusterJet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: "cyan" | "white" | "gold" | "sapphire";
  isBubble: boolean;
}

export default function DefenseArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking with responsive spring damping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 140 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const shipTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const shipTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // High-Definition Canvas Bubble & Sparkle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Fixed set of high-detail sparkle nodes across the spacecraft
    const sparkles: SparkleStar[] = [];
    const ambientBubbles: BubbleParticle[] = [];
    const thrusterJets: ThrusterJet[] = [];

    // Initialize 280 precision sparkle nodes positioned specifically on the rocket's structure
    const initSparkles = () => {
      sparkles.length = 0;
      // 1. Golden Nose & Upper Shell (nx: 0.15 - 0.45, ny: 0.12 - 0.42)
      for (let i = 0; i < 90; i++) {
        sparkles.push({
          nx: 0.16 + Math.random() * 0.32,
          ny: 0.14 + Math.random() * 0.30,
          color: Math.random() > 0.3 ? "gold" : "white",
          size: 0.8 + Math.random() * 1.6,
          twinkleSpeed: 0.02 + Math.random() * 0.05,
          phase: Math.random() * Math.PI * 2,
          hasGlint: Math.random() < 0.22,
        });
      }

      // 2. Sapphire Blue Spherical Cockpit (nx: 0.36 - 0.54, ny: 0.20 - 0.40)
      for (let i = 0; i < 65; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 0.085;
        sparkles.push({
          nx: 0.45 + Math.cos(angle) * dist * 1.1,
          ny: 0.30 + Math.sin(angle) * dist,
          color: Math.random() > 0.25 ? "blue" : "cyan",
          size: 0.9 + Math.random() * 1.8,
          twinkleSpeed: 0.025 + Math.random() * 0.06,
          phase: Math.random() * Math.PI * 2,
          hasGlint: Math.random() < 0.3,
        });
      }

      // 3. Central Golden Spine (nx: 0.46 - 0.65, ny: 0.38 - 0.58)
      for (let i = 0; i < 45; i++) {
        const t = Math.random();
        sparkles.push({
          nx: 0.46 + t * 0.18 + (Math.random() - 0.5) * 0.04,
          ny: 0.38 + t * 0.20 + (Math.random() - 0.5) * 0.04,
          color: "gold",
          size: 0.8 + Math.random() * 1.5,
          twinkleSpeed: 0.03 + Math.random() * 0.04,
          phase: Math.random() * Math.PI * 2,
          hasGlint: Math.random() < 0.25,
        });
      }

      // 4. Crystalline Delta Wings & Body (nx: 0.50 - 0.78, ny: 0.35 - 0.68)
      for (let i = 0; i < 80; i++) {
        sparkles.push({
          nx: 0.52 + Math.random() * 0.26,
          ny: 0.36 + Math.random() * 0.32,
          color: Math.random() > 0.4 ? "cyan" : "white",
          size: 0.8 + Math.random() * 1.7,
          twinkleSpeed: 0.02 + Math.random() * 0.05,
          phase: Math.random() * Math.PI * 2,
          hasGlint: Math.random() < 0.2,
        });
      }
    };

    initSparkles();

    // Initialize razor-sharp ambient zero-G bubbles with crisp specular highlights
    const initAmbientBubbles = () => {
      ambientBubbles.length = 0;
      for (let i = 0; i < 35; i++) {
        const isGold = Math.random() > 0.45;
        ambientBubbles.push({
          x: width * 0.35 + Math.random() * (width * 0.65),
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: -0.2 - Math.random() * 0.35,
          radius: 2.0 + Math.random() * 4.5,
          alpha: 0.2 + Math.random() * 0.5,
          maxAlpha: 0.4 + Math.random() * 0.45,
          life: 0,
          maxLife: 280 + Math.random() * 420,
          colorScheme: isGold ? "gold" : "cyan",
          wobbleSpeed: 0.012 + Math.random() * 0.02,
          wobbleDist: 8 + Math.random() * 14,
          wobbleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (ambientBubbles.length === 0) {
        initAmbientBubbles();
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Calculate spacecraft position on the right side
    const getRocketBounds = () => {
      const isDesktop = width >= 1024;
      const isTablet = width >= 768 && width < 1024;

      let boxW = 0;
      let boxH = 0;
      let startX = 0;
      let startY = 0;

      if (isDesktop) {
        boxW = Math.min(width * 0.56, 720);
        boxH = boxW / 1.25;
        startX = width - boxW - Math.max(16, width * 0.03);
        startY = (height - boxH) * 0.5;
      } else if (isTablet) {
        boxW = Math.min(width * 0.82, 600);
        boxH = boxW / 1.25;
        startX = (width - boxW) * 0.5 + 30;
        startY = (height - boxH) * 0.55;
      } else {
        boxW = Math.min(width * 0.94, 400);
        boxH = boxW / 1.25;
        startX = (width - boxW) * 0.5;
        startY = (height - boxH) * 0.62;
      }

      return { boxW, boxH, startX, startY };
    };

    // Orbital Traveling Marbles (Crisp 3D Beacons)
    const orbitalMarbles = [
      { angle: 0.4, speed: 0.007, rx: 0.38, ry: 0.22, tilt: -0.42, color: "sapphire" as const, radius: 4.5 },
      { angle: 2.8, speed: -0.0055, rx: 0.44, ry: 0.26, tilt: -0.38, color: "gold" as const, radius: 3.8 },
      { angle: 4.6, speed: 0.0045, rx: 0.50, ry: 0.30, tilt: -0.46, color: "cyan" as const, radius: 3.4 },
    ];

    // Spawn crisp thruster exhaust bubbles and micro-sparks
    const spawnThrusterJets = (boost: boolean) => {
      const { boxW, boxH, startX, startY } = getRocketBounds();
      // Rear nozzle coordinates (~73% X, ~66% Y)
      const tx = startX + boxW * 0.73;
      const ty = startY + boxH * 0.66;
      const count = boost ? 6 : 3;

      for (let i = 0; i < count; i++) {
        if (thrusterJets.length > 130) break;

        const angle = Math.PI * 0.23 + (Math.random() - 0.5) * 0.42;
        const speed = 2.4 + Math.random() * 3.8 + (boost ? 2.2 : 0);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        const isBubble = Math.random() > 0.35;
        const rand = Math.random();
        const color: "cyan" | "white" | "sapphire" | "gold" =
          rand < 0.35 ? "white" : rand < 0.7 ? "cyan" : rand < 0.88 ? "sapphire" : "gold";

        thrusterJets.push({
          x: tx + (Math.random() - 0.5) * 16,
          y: ty + (Math.random() - 0.5) * 16,
          vx,
          vy,
          radius: isBubble ? 1.8 + Math.random() * 3.8 : 0.8 + Math.random() * 1.5,
          alpha: 0.85 + Math.random() * 0.15,
          life: 0,
          maxLife: 35 + Math.random() * 50,
          color,
          isBubble,
        });
      }
    };

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const { boxW, boxH, startX, startY } = getRocketBounds();
      const craftCenterX = startX + boxW * 0.5;
      const craftCenterY = startY + boxH * 0.5;

      // Synchronized subtle floating wave
      const waveY = Math.sin(frame * 0.02) * 6;
      const waveX = Math.cos(frame * 0.015) * 3;

      // =========================================================================
      // 1. PINPOINT SHARP SPARKLE NODES ON THE SPACECRAFT
      // =========================================================================
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        const px = startX + s.nx * boxW + waveX;
        const py = startY + s.ny * boxH + waveY;

        const tw = Math.sin(frame * s.twinkleSpeed + s.phase);
        const alpha = Math.max(0.15, 0.45 + tw * 0.55);
        const r = Math.max(0.6, s.size * (0.85 + tw * 0.3));

        // Pinpoint needle-sharp star dot
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        if (s.color === "gold") {
          ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
        } else if (s.color === "blue") {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        } else if (s.color === "cyan") {
          ctx.fillStyle = `rgba(186, 230, 253, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }
        ctx.fill();

        // Cross-flare glint (+) for focal stars at the peak of twinkle
        if (s.hasGlint && tw > 0.72) {
          const glintLen = (tw - 0.72) * 16;
          ctx.strokeStyle = `rgba(255, 255, 255, ${(tw - 0.72) * 2.8})`;
          ctx.lineWidth = 0.8;

          ctx.beginPath();
          ctx.moveTo(px - glintLen, py);
          ctx.lineTo(px + glintLen, py);
          ctx.moveTo(px, py - glintLen);
          ctx.lineTo(px, py + glintLen);
          ctx.stroke();
        }
      }

      // =========================================================================
      // 2. ORBITAL PLANETOID BEACONS TRAVELING ALONG THE RINGS
      // =========================================================================
      orbitalMarbles.forEach((m) => {
        m.angle += m.speed;
        const rx = boxW * m.rx;
        const ry = boxH * m.ry;

        const cosA = Math.cos(m.angle);
        const sinA = Math.sin(m.angle);
        const unrotX = cosA * rx;
        const unrotY = sinA * ry;

        const cosT = Math.cos(m.tilt);
        const sinT = Math.sin(m.tilt);

        const orbX = craftCenterX + waveX + (unrotX * cosT - unrotY * sinT);
        const orbY = craftCenterY + waveY + (unrotX * sinT + unrotY * cosT);

        const depth = (sinA + 1) * 0.5;
        const curRadius = m.radius * (0.8 + depth * 0.4);
        const curAlpha = 0.65 + depth * 0.35;

        // Draw crisp 3D sphere with specular light glint
        ctx.save();
        const orbGrad = ctx.createRadialGradient(
          orbX - curRadius * 0.35,
          orbY - curRadius * 0.35,
          curRadius * 0.1,
          orbX,
          orbY,
          curRadius
        );

        if (m.color === "sapphire") {
          orbGrad.addColorStop(0, `rgba(255, 255, 255, ${curAlpha})`);
          orbGrad.addColorStop(0.35, `rgba(56, 189, 248, ${curAlpha})`);
          orbGrad.addColorStop(1, `rgba(14, 165, 233, 0.4)`);
        } else if (m.color === "gold") {
          orbGrad.addColorStop(0, `rgba(255, 255, 255, ${curAlpha})`);
          orbGrad.addColorStop(0.35, `rgba(251, 191, 36, ${curAlpha})`);
          orbGrad.addColorStop(1, `rgba(217, 119, 6, 0.4)`);
        } else {
          orbGrad.addColorStop(0, `rgba(255, 255, 255, ${curAlpha})`);
          orbGrad.addColorStop(0.35, `rgba(224, 242, 254, ${curAlpha})`);
          orbGrad.addColorStop(1, `rgba(56, 189, 248, 0.4)`);
        }

        ctx.beginPath();
        ctx.arc(orbX, orbY, curRadius, 0, Math.PI * 2);
        ctx.fillStyle = orbGrad;
        ctx.fill();

        // Crisp thin rim
        ctx.strokeStyle = `rgba(255, 255, 255, ${curAlpha * 0.6})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();

        ctx.restore();
      });

      // =========================================================================
      // 3. CONTINUOUS CRISP THRUSTER BUBBLES & SPARKS
      // =========================================================================
      if (frame % 2 === 0) {
        spawnThrusterJets(isHovered);
      }

      for (let i = thrusterJets.length - 1; i >= 0; i--) {
        const tj = thrusterJets[i];
        tj.life++;
        tj.x += tj.vx;
        tj.y += tj.vy;
        tj.vx *= 0.983;
        tj.vy *= 0.983;
        if (tj.isBubble) tj.radius += 0.035;

        const progress = tj.life / tj.maxLife;
        const curAlpha = tj.alpha * (1 - progress);

        if (tj.life >= tj.maxLife) {
          thrusterJets.splice(i, 1);
          continue;
        }

        ctx.save();
        if (tj.isBubble) {
          // Sharp glass-like bubble with specular glint
          const rad = Math.max(1.0, tj.radius);

          // Translucent gradient core
          const bGrad = ctx.createRadialGradient(
            tj.x - rad * 0.35,
            tj.y - rad * 0.35,
            rad * 0.1,
            tj.x,
            tj.y,
            rad
          );

          if (tj.color === "cyan") {
            bGrad.addColorStop(0, `rgba(255, 255, 255, ${curAlpha * 0.9})`);
            bGrad.addColorStop(0.4, `rgba(56, 189, 248, ${curAlpha * 0.6})`);
            bGrad.addColorStop(1, `rgba(14, 165, 233, 0.1)`);
          } else if (tj.color === "gold") {
            bGrad.addColorStop(0, `rgba(255, 255, 255, ${curAlpha * 0.9})`);
            bGrad.addColorStop(0.4, `rgba(251, 191, 36, ${curAlpha * 0.6})`);
            bGrad.addColorStop(1, `rgba(217, 119, 6, 0.1)`);
          } else {
            bGrad.addColorStop(0, `rgba(255, 255, 255, ${curAlpha * 0.95})`);
            bGrad.addColorStop(0.4, `rgba(224, 242, 254, ${curAlpha * 0.7})`);
            bGrad.addColorStop(1, `rgba(56, 189, 248, 0.1)`);
          }

          ctx.beginPath();
          ctx.arc(tj.x, tj.y, rad, 0, Math.PI * 2);
          ctx.fillStyle = bGrad;
          ctx.fill();

          // Crisp outer rim
          ctx.strokeStyle =
            tj.color === "gold"
              ? `rgba(251, 191, 36, ${curAlpha * 0.85})`
              : `rgba(56, 189, 248, ${curAlpha * 0.85})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Specular light reflection dot
          ctx.beginPath();
          ctx.arc(tj.x - rad * 0.35, tj.y - rad * 0.35, Math.max(0.5, rad * 0.22), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${curAlpha * 0.95})`;
          ctx.fill();
        } else {
          // Sharp micro-spark needle
          ctx.beginPath();
          ctx.arc(tj.x, tj.y, tj.radius, 0, Math.PI * 2);
          ctx.fillStyle =
            tj.color === "gold"
              ? `rgba(251, 191, 36, ${curAlpha})`
              : `rgba(255, 255, 255, ${curAlpha})`;
          ctx.fill();
        }
        ctx.restore();
      }

      // =========================================================================
      // 4. RAZOR-SHARP AMBIENT ZERO-G PLASMA BUBBLES
      // =========================================================================
      for (let i = 0; i < ambientBubbles.length; i++) {
        const ab = ambientBubbles[i];
        ab.life++;
        ab.y += ab.vy;
        ab.x += Math.sin(frame * ab.wobbleSpeed + ab.wobbleOffset) * 0.32;

        const progress = ab.life / ab.maxLife;
        let curAlpha = ab.maxAlpha;
        if (progress < 0.2) {
          curAlpha = ab.maxAlpha * (progress / 0.2);
        } else if (progress > 0.8) {
          curAlpha = ab.maxAlpha * (1 - (progress - 0.8) / 0.2);
        }

        if (ab.life >= ab.maxLife || ab.y < -20) {
          ab.x = width * 0.35 + Math.random() * (width * 0.65);
          ab.y = height + 10;
          ab.life = 0;
          ab.maxLife = 280 + Math.random() * 420;
        }

        // Draw crystal-clear glass bubble with specular ring
        ctx.save();
        const rad = Math.max(1.2, ab.radius);

        const bubbleGrad = ctx.createRadialGradient(
          ab.x - rad * 0.35,
          ab.y - rad * 0.35,
          rad * 0.1,
          ab.x,
          ab.y,
          rad
        );

        if (ab.colorScheme === "gold") {
          bubbleGrad.addColorStop(0, `rgba(255, 255, 255, ${curAlpha * 0.75})`);
          bubbleGrad.addColorStop(0.35, `rgba(251, 191, 36, ${curAlpha * 0.35})`);
          bubbleGrad.addColorStop(1, `rgba(217, 119, 6, 0.05)`);
        } else {
          bubbleGrad.addColorStop(0, `rgba(255, 255, 255, ${curAlpha * 0.75})`);
          bubbleGrad.addColorStop(0.35, `rgba(56, 189, 248, ${curAlpha * 0.35})`);
          bubbleGrad.addColorStop(1, `rgba(14, 165, 233, 0.05)`);
        }

        ctx.beginPath();
        ctx.arc(ab.x, ab.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = bubbleGrad;
        ctx.fill();

        // Thin iridescent outer rim
        ctx.strokeStyle =
          ab.colorScheme === "gold"
            ? `rgba(251, 191, 36, ${curAlpha * 0.75})`
            : `rgba(56, 189, 248, ${curAlpha * 0.75})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Specular highlight crescent/dot
        ctx.beginPath();
        ctx.arc(ab.x - rad * 0.35, ab.y - rad * 0.35, Math.max(0.6, rad * 0.25), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${curAlpha * 0.85})`;
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <section
      id="defense-architecture"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] bg-[#000000] text-white overflow-hidden select-none border-y border-amber-500/25"
    >
      {/* 1. Deep Space Pitch Black Canvas & Razor Horizon Lines */}
      <div className="absolute inset-0 bg-[#000000] pointer-events-none" />

      {/* Top & Bottom Golden Horizon Edge Highlights */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#f59e0b]" />
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      {/* 2. Interactive Canvas Layer: Precision Sparkles, Thruster Bubbles, Plasma Orbs & Orbital Beacons */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20 w-full h-full"
      />

      {/* 3. Main 2-Column Responsive Layout matching Reference 1:1 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* =========================================================================
              LEFT COLUMN: Exact Typography matching 1:1 with Reference Image
              - Line dash + INSTITUTIONAL CHARTER • EST. 2026 • SATI VIDISHA
              - Exact 3-Line Headline (White + White + Golden Amber)
              - Contextual Subtitle
              - Glowing Solid White Pill CTA Button
             ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 sm:space-y-7 relative z-30 pr-0 lg:pr-4">
            
            {/* Eyebrow: Amber Dash + Metadata */}
            <div className="flex items-center gap-3">
              <span className="w-5 h-[2px] bg-amber-400 shadow-[0_0_8px_#f59e0b] inline-block" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] text-amber-400 uppercase">
                INSTITUTIONAL CHARTER &bull; EST. 2026 &bull; SATI VIDISHA
              </span>
            </div>

            {/* Exact 3-Line Title matching Reference */}
            <div className="space-y-1 sm:space-y-1.5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-black uppercase tracking-tight text-white leading-[1.06]">
                <span className="block whitespace-nowrap">DEFENSE IS NOT AN</span>
                <span className="block whitespace-nowrap">AFTERTHOUGHT.</span>
                <span className="block whitespace-nowrap bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(245,158,11,0.35)]">
                  IT IS ARCHITECTURE.
                </span>
              </h2>
            </div>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-lg">
              Cyber Cell is the official cybersecurity community at{" "}
              <strong className="text-white font-semibold">
                Samrat Ashok Technological Institute
              </strong>
              .
            </p>

            {/* Glowing Solid White Pill CTA Button matching 1:1 with reference */}
            <div className="pt-2">
              <Link
                href="/about"
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-neutral-100 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_32px_rgba(255,255,255,0.65)] hover:shadow-[0_0_46px_rgba(255,255,255,0.95)] transition-all duration-300 active:scale-95"
              >
                <span className="text-black font-black tracking-wider">READ FULL CHARTER &amp; LEADERSHIP</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Department accreditation line */}
            <div className="pt-1 text-[11px] font-mono text-slate-500 tracking-wider">
              Department of Computer Science &amp; Engineering &bull; Autonomous
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: Ultra-Crisp Spacecraft with Zero-G Floating Levitation
              (The canvas sparkle engine and thruster bubbles sit directly on top)
             ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
            
            <motion.div
              style={{
                rotateX,
                rotateY,
                x: shipTranslateX,
                y: shipTranslateY,
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 0.5, 0, -0.5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-[580px] lg:max-w-[700px] aspect-[736/589] flex items-center justify-center"
            >
              {/* Ultra-Sharp High-Definition Authentic Spacecraft Image */}
              <div className="relative w-full h-full pointer-events-none select-none [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_98%)]">
                <Image
                  src="/images/defense-rocket-actual.png"
                  alt="Cyber Cell 3D Particle Spacecraft Defense Architecture"
                  fill
                  priority
                  className="object-contain object-center scale-100 pointer-events-none select-none drop-shadow-[0_0_30px_rgba(245,158,11,0.3)] contrast-[1.12] brightness-[1.06]"
                />
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
