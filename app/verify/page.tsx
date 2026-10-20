"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  Download,
  Calendar,
  CheckCircle2,
  Copy,
  AlertTriangle,
  GraduationCap,
  Award,
  Sparkles,
  ExternalLink,
  X,
  ArrowRight,
  Eye,
  FileCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";
import {
  renderCertificateToCanvas,
  CertificateConfig,
} from "@/lib/certificateRenderer";
import { formatStudentName } from "@/lib/certificates";

interface VerifiedCertificate {
  certificate_id: string;
  scholar_number: string;
  recipient_name: string;
  event_name: string;
  issue_date: string;
  expiry_date: string;
  image_url?: string;
  template_id?: string;
  template_url?: string;
  template_font_family?: string;
  template_font_size?: number;
  template_font_weight?: string;
  template_color?: string;
  template_y_pos?: number;
  template_text_transform?: "uppercase" | "capitalize" | "none";
  is_download_active: boolean;
  is_expired?: boolean;
  role_or_rank?: string;
  issued_by?: string;
  status_label?: string;
}

interface SavedConfig {
  templateUrl?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  yPositionPercent?: number;
  xPositionPercent?: number;
  letterSpacing?: number;
  textTransform?: "uppercase" | "capitalize" | "none";
  showQrCode?: boolean;
  showCertificateId?: boolean;
}

/**
 * Dedicated Modal Viewer rendering the high-definition Certificate Canvas
 * Styled with luxury dark obsidian & gold/amber accents matching institutional credentials
 */
function CertificateModal({
  cert,
  globalConfig,
  copiedId,
  onCopyLink,
  onClose,
}: {
  cert: VerifiedCertificate;
  globalConfig: SavedConfig | null;
  copiedId: string | null;
  onCopyLink: (id: string) => void;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rendering, setRendering] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Render high-definition canvas whenever selected certificate changes
  useEffect(() => {
    if (!canvasRef.current) return;
    setRendering(true);

    const templateUrl = cert.template_url || globalConfig?.templateUrl || "";
    const fontFamily = cert.template_font_family || globalConfig?.fontFamily || "'Cinzel', serif";
    const fontSize = cert.template_font_size || globalConfig?.fontSize || 76;
    const fontWeight = cert.template_font_weight || globalConfig?.fontWeight || "bold";
    const color = cert.template_color || globalConfig?.color || "#d4af37";
    const yPosition =
      cert.template_y_pos !== undefined
        ? cert.template_y_pos / 100
        : (globalConfig?.yPositionPercent ?? 49.5) / 100;
    const textTransform = cert.template_text_transform || globalConfig?.textTransform || "uppercase";

    const cfg: CertificateConfig = {
      mode: "name_only",
      templateType: "custom",
      templateUrl,
      recipientName: formatStudentName(cert.recipient_name),
      scholarNumber: cert.scholar_number,
      certificateId: cert.certificate_id,
      issueDate: cert.issue_date,
      roleOrRank: cert.role_or_rank || "Participant",
      nameFontSize: fontSize,
      nameFontFamily: fontFamily,
      nameFontWeight: fontWeight,
      nameColor: color,
      nameYPosition: yPosition,
      nameXPosition: (globalConfig?.xPositionPercent ?? 50.0) / 100,
      nameLetterSpacing: globalConfig?.letterSpacing ?? 2,
      nameTextTransform: textTransform,
      showQrCode: globalConfig?.showQrCode ?? false,
      showCertificateId: globalConfig?.showCertificateId ?? false,
    };

    renderCertificateToCanvas(canvasRef.current, cfg)
      .catch((err) => console.error("Render canvas error:", err))
      .finally(() => setRendering(false));
  }, [cert, globalConfig]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const formatted = formatStudentName(cert.recipient_name);
    const dataUrl = canvasRef.current.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `CyberCell-${cert.scholar_number || cert.certificate_id}-${formatted.replace(/\s+/g, "_")}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#080808] border border-amber-500/30 rounded-3xl p-5 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.9)] my-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Verified Institutional Credential
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                SATI Vidisha Cyber Cell Official Record
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Close certificate viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Recipient Header */}
        <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08]">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {formatStudentName(cert.recipient_name)}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-0.5">
              {cert.scholar_number && (
                <span>
                  Scholar No: <strong className="text-amber-300">{cert.scholar_number}</strong>
                </span>
              )}
              <span>•</span>
              <span>Event: <strong className="text-white">{cert.event_name}</strong></span>
            </div>
          </div>

          <div className="text-left sm:text-right font-mono text-xs">
            <span className="text-slate-500">Credential ID:</span>
            <div className="font-bold text-amber-300">{cert.certificate_id}</div>
          </div>
        </div>

        {/* High-Definition Certificate Canvas Viewport */}
        <div className="my-5 relative aspect-[297/210] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#040404] shadow-2xl flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
          />
          {rendering && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center gap-2.5 text-xs font-mono text-amber-300">
              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span>Rendering HD Institutional Certificate...</span>
            </div>
          )}
        </div>

        {/* Action Controls: Download & Share */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>⬇ Download Certificate (HD PNG)</span>
          </button>

          <button
            onClick={() => onCopyLink(cert.certificate_id)}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-mono text-xs transition-colors flex items-center justify-center gap-2"
          >
            {copiedId === cert.certificate_id ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Share Verification Link</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white font-mono text-xs transition-colors"
          >
            ← Back to List
          </button>
        </div>

        {/* Institutional Verification Footer */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
          <span>Issuing Body: {cert.issued_by || "Cyber Cell, SATI Vidisha"}</span>
          <span>Issued Date: {cert.issue_date}</span>
        </div>
      </div>
    </div>
  );
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const queryParam = searchParams.get("q") || searchParams.get("query");

  const [searchTerm, setSearchTerm] = useState(idParam || queryParam || "");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<VerifiedCertificate[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [globalConfig, setGlobalConfig] = useState<SavedConfig | null>(null);

  // Active Certificate Modal State
  const [selectedCert, setSelectedCert] = useState<VerifiedCertificate | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Load saved certificate font & placement config
  useEffect(() => {
    fetch("/api/admin/certificates/config")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.config) setGlobalConfig(d.config);
      })
      .catch(() => {});
  }, []);

  // Auto-run verification if ID or query is in URL
  useEffect(() => {
    if (idParam || queryParam) {
      executeVerification(idParam || queryParam || "");
    }
  }, [idParam, queryParam]);

  const executeVerification = async (queryToSearch: string) => {
    const clean = queryToSearch.trim();
    if (!clean) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const url = clean.toUpperCase().startsWith("CYB-")
        ? `/api/certificates/verify?id=${encodeURIComponent(clean)}`
        : `/api/certificates/verify?query=${encodeURIComponent(clean)}`;

      const res = await fetch(url);
      const data = await res.json();

      let certList: VerifiedCertificate[] = [];
      if (data.certificate) {
        certList = [data.certificate];
      } else if (data.certificates && Array.isArray(data.certificates)) {
        certList = data.certificates;
      }

      certList = certList.map((c) => ({
        ...c,
        recipient_name: formatStudentName(c.recipient_name),
      }));

      setResults(certList);

      // Smooth scroll to results if searching
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);

      // If user navigated directly using an exact certificate ID, auto-open the certificate viewer
      if (idParam && certList.length === 1 && certList[0].certificate_id.toUpperCase() === idParam.toUpperCase()) {
        setSelectedCert(certList[0]);
      }
    } catch (err) {
      console.error("Verification query error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCert(null);
    executeVerification(searchTerm);
  };

  const copyVerifyLink = (certId: string) => {
    const url = `${window.location.origin}/verify?id=${certId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(certId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300">
      <Navbar />

      <main className="flex-1 w-full pt-28 sm:pt-32 lg:pt-36 pb-16 overflow-hidden">
        
        {/* ========================================================
            HERO SECTION: VERIFY CERTIFICATE + 3D PLAQUE SCENE
            Directly matching the user's reference mockup
           ======================================================== */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Subtle Ambient Amber Glow behind 3D Plaque */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-amber-500/[0.05] blur-[150px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[460px] sm:min-h-[520px]">
            
            {/* Left Column (lg:col-span-6): Eyebrow, Title, Capsule Search Bar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8 z-10"
            >
              
              {/* Eyebrow: — CERTIFICATE */}
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                <span className="text-[11px] font-mono tracking-[0.24em] text-amber-400 uppercase font-semibold">
                  CERTIFICATE
                </span>
              </div>

              {/* Giant Two-Line Headline: Verify / Certificate */}
              <h1 className="text-5xl sm:text-7xl lg:text-[76px] xl:text-[90px] font-extrabold tracking-[-0.035em] leading-[0.92] select-none">
                <span className="block text-white">
                  Verify
                </span>
                <span className="block bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(255,255,255,0.12)]">
                  Certificate
                </span>
              </h1>

              {/* Sleek Pill Capsule Search Bar (Matching Reference) */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative w-full max-w-lg sm:max-w-xl"
              >
                <div className="group relative flex items-center rounded-full bg-black/60 border border-white/15 hover:border-white/30 focus-within:border-amber-400/80 focus-within:ring-2 focus-within:ring-amber-400/20 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
                  
                  {/* Search Icon */}
                  <Search className="w-5 h-5 text-slate-400 ml-1 mr-3 shrink-0 group-focus-within:text-amber-400 transition-colors" />
                  
                  {/* Text Input */}
                  <input
                    type="text"
                    required
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter scholar number, name or certificate ID..."
                    className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder:text-slate-500 font-sans tracking-wide pr-2"
                  />

                  {/* Circular White Submit Button with Arrow */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-slate-200 text-slate-950 flex items-center justify-center shrink-0 transition-transform duration-200 shadow-md shadow-white/20 active:scale-95 disabled:opacity-50 group-hover:scale-105"
                    title="Search certificate"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    )}
                  </button>
                </div>
              </form>

            </motion.div>

            {/* Right Column (lg:col-span-6): 3D Certificate Plaque Render + Vertical Micro-Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-6 relative flex items-center justify-center lg:justify-end"
            >
              
              {/* Plaque Asset Wrapper */}
              <div className="relative w-full max-w-[580px] xl:max-w-[620px] aspect-[584/415] rounded-2xl overflow-hidden group select-none">
                <Image
                  src="/images/certificate-hero-plaque.png"
                  alt="Cyber Cell SATI Official 3D Certificate Plaque"
                  fill
                  priority
                  className="object-contain object-right drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 620px"
                />
                
                {/* Ambient Amber Rim Glow Under Plaque */}
                <div className="absolute -bottom-4 right-10 w-72 h-14 bg-amber-500/25 blur-2xl pointer-events-none rounded-full" />
              </div>

              {/* Vertical Micro-Text along right edge (Matching Reference Image) */}
              <div className="hidden xl:flex flex-col items-center gap-2.5 pl-3 select-none shrink-0">
                <span className="w-[2px] h-6 bg-amber-400 inline-block rounded-full shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                <div className="flex flex-col items-center gap-1.5 text-[8.5px] font-mono tracking-[0.28em] text-slate-400 uppercase leading-none">
                  <span>A</span>
                  <span>SAFER</span>
                  <span>DIGITAL</span>
                  <span>TOMORROW</span>
                </div>
              </div>

            </motion.div>

          </div>

          {/* ========================================================
              BOTTOM EDITORIAL FOOTER STRIP (Matching Screenshot)
             ======================================================== */}
          <div className="w-full border-t border-white/[0.08] mt-12 sm:mt-16 pt-5 pb-2 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono tracking-widest text-slate-500 gap-3 select-none">
            <div>
              <span className="text-slate-400 font-semibold">CYBER CELL</span> — SATI VIDISHA
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-[2px] bg-amber-400 inline-block shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              <span className="text-slate-400 font-semibold tracking-wider">THINK SECURE. BUILD BETTER.</span>
            </div>
          </div>

        </section>

        {/* ========================================================
            SEARCH RESULTS & VERIFICATION SECTION
           ======================================================== */}
        <div ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
          
          {/* Loading State */}
          {loading && (
            <div className="py-16 text-center space-y-4">
              <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_15px_rgba(251,191,36,0.4)]" />
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Querying SATI Institutional Credential Registry...
              </p>
            </div>
          )}

          {/* Empty / Not Found State */}
          {!loading && hasSearched && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto p-8 rounded-3xl border border-white/10 bg-[#080808]/90 text-center space-y-4 shadow-2xl backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">No Official Record Found</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                We could not find any official certificate matching &quot;{searchTerm}&quot;. Please verify the 5-digit Scholar Number, Certificate ID, or full name and try again.
              </p>
            </motion.div>
          )}

          {/* Search Results: Luxury Dark Cards matching the Obsidian & Amber aesthetic */}
          {!loading && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 pt-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Found <strong className="text-amber-400">{results.length}</strong> Verified Institutional Record{results.length > 1 ? "s" : ""}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  Select your record below to view & download the HD official certificate
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {results.map((cert) => (
                  <SpotlightCard
                    key={cert.certificate_id}
                    spotlightColor="rgba(245, 158, 11, 0.12)"
                    className="p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all duration-200 cursor-pointer group bg-[#080808]/90 hover:bg-[#0c0c0c] shadow-lg"
                  >
                    <div
                      onClick={() => setSelectedCert(cert)}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Left: Recipient & Scholar Info */}
                      <div className="flex items-start sm:items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform group-hover:border-amber-400/50 shadow-sm">
                          <GraduationCap className="w-6 h-6" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                              {formatStudentName(cert.recipient_name)}
                            </h3>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-semibold text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Institutional Verified
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                            {cert.scholar_number && (
                              <span>
                                Scholar No: <strong className="text-amber-400">{cert.scholar_number}</strong>
                              </span>
                            )}
                            <span>•</span>
                            <span className="text-slate-300">{cert.event_name}</span>
                            <span>•</span>
                            <span className="text-slate-400">{cert.role_or_rank || "Participant"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Credential ID & Action Button */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                        <div className="text-left sm:text-right font-mono text-xs">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Credential ID</div>
                          <div className="text-xs font-semibold text-slate-300">{cert.certificate_id}</div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCert(cert);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 group-hover:border-amber-400 text-amber-300 font-medium text-xs transition-all shadow-sm group-hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        {/* Modal: Rendered only when user clicks on a certificate row */}
        {selectedCert && (
          <CertificateModal
            cert={selectedCert}
            globalConfig={globalConfig}
            copiedId={copiedId}
            onCopyLink={copyVerifyLink}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030303] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
