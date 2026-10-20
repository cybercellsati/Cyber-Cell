"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Search,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  AlertTriangle,
  GraduationCap,
  Award,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";
import {
  renderCertificateToCanvas,
  CertificateConfig,
} from "@/lib/certificateRenderer";

interface VerifiedCertificate {
  certificate_id: string;
  scholar_number: string;
  recipient_name: string;
  event_name: string;
  issue_date: string;
  expiry_date: string;
  image_url?: string;
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
 * Individual Certificate Card rendering high-resolution canvas on-demand
 */
function CertificateCardItem({
  cert,
  globalConfig,
  copiedId,
  onCopyLink,
}: {
  cert: VerifiedCertificate;
  globalConfig: SavedConfig | null;
  copiedId: string | null;
  onCopyLink: (id: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;
    setRendering(true);

    const cfg: CertificateConfig = {
      mode: "name_only",
      templateType: "custom",
      templateUrl: globalConfig?.templateUrl || "/templates/certificate-template.png",
      recipientName: cert.recipient_name,
      scholarNumber: cert.scholar_number,
      certificateId: cert.certificate_id,
      issueDate: cert.issue_date,
      roleOrRank: cert.role_or_rank || "Participant",
      nameFontSize: globalConfig?.fontSize || 76,
      nameFontFamily: globalConfig?.fontFamily || "'Cinzel', serif",
      nameFontWeight: globalConfig?.fontWeight || "bold",
      nameColor: globalConfig?.color || "#d4af37",
      nameYPosition: (globalConfig?.yPositionPercent ?? 48.0) / 100,
      nameXPosition: (globalConfig?.xPositionPercent ?? 50.0) / 100,
      nameLetterSpacing: globalConfig?.letterSpacing ?? 2,
      nameTextTransform: globalConfig?.textTransform || "uppercase",
      showQrCode: globalConfig?.showQrCode ?? false,
      showCertificateId: globalConfig?.showCertificateId ?? false,
    };

    renderCertificateToCanvas(canvasRef.current, cfg)
      .catch((err) => console.error("Render canvas error:", err))
      .finally(() => setRendering(false));
  }, [cert, globalConfig]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `CyberCell-${cert.scholar_number || cert.certificate_id}-${cert.recipient_name.replace(/\s+/g, "_")}.png`;
    link.click();
  };

  return (
    <SpotlightCard
      key={cert.certificate_id}
      className="p-6 sm:p-10 rounded-3xl border border-white/10 overflow-hidden"
    >
      {/* Status Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Authentic & Verified Credential
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Official SATI Cyber Cell Institutional Record
            </span>
          </div>
        </div>

        <div className="text-left sm:text-right font-mono">
          <div className="text-xs text-slate-400">Credential ID</div>
          <div className="text-sm font-bold text-cyan-300">{cert.certificate_id}</div>
        </div>
      </div>

      {/* Recipient & Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            Conferred Upon
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {cert.recipient_name}
          </h2>
          {cert.scholar_number && (
            <p className="text-xs font-mono text-slate-400">
              Scholar No: <span className="text-cyan-300 font-semibold">{cert.scholar_number}</span>
            </p>
          )}
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            Event / Recognition
          </span>
          <h3 className="text-base font-bold text-cyan-300">
            {cert.event_name}
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Role / Rank: <span className="text-white font-medium">{cert.role_or_rank || "Participant"}</span>
          </p>
        </div>
      </div>

      {/* Issuance Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Issued: <strong className="text-white">{cert.issue_date}</strong></span>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <Award className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Issuing Body: <strong className="text-white">{cert.issued_by || "Cyber Cell, SATI Vidisha"}</strong></span>
        </div>
      </div>

      {/* Live High-Definition Certificate Canvas */}
      <div className="my-6 space-y-4">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#050810] shadow-2xl flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
          />
          {rendering && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center gap-2 text-xs font-mono text-cyan-300">
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span>Rendering HD Certificate...</span>
            </div>
          )}
        </div>

        {/* Download & Share Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 active:scale-98"
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
        </div>
      </div>

      {/* Institutional Footer */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
        <span>Authorized by: CSE Department, SATI Vidisha</span>
        <span>Credential Status: Permanent Institutional Ledger</span>
      </div>
    </SpotlightCard>
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

      if (data.certificate) {
        setResults([data.certificate]);
      } else if (data.certificates && Array.isArray(data.certificates)) {
        setResults(data.certificates);
      } else {
        setResults([]);
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
    executeVerification(searchTerm);
  };

  const copyVerifyLink = (certId: string) => {
    const url = `${window.location.origin}/verify?id=${certId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(certId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Header & Verification Badges */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Official Credential Registry</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            Certificate Portal
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            Search by your <span className="text-white font-medium">Scholar Number</span>,{" "}
            <span className="text-white font-medium">Certificate ID</span>, or{" "}
            <span className="text-white font-medium">Name</span> to verify and instantly download your official credentials.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="max-w-2xl mx-auto mb-12 relative"
        >
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 pointer-events-none" />
            <input
              type="text"
              required
              placeholder="Enter Scholar Number (e.g. 0108CS221045) or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all text-white placeholder-slate-500 text-sm font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                "Search"
              )}
            </button>
          </div>
        </form>

        {/* Results Area */}
        {loading && (
          <div className="py-16 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Querying SATI Institutional Registry...
            </p>
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="max-w-xl mx-auto p-8 rounded-3xl border border-white/10 bg-[#090d16] text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No Certificate Found</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              We could not find any official certificate matching &quot;{searchTerm}&quot;. Please verify the Scholar Number or Certificate ID and try again.
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-10">
            {results.map((cert) => (
              <CertificateCardItem
                key={cert.certificate_id}
                cert={cert}
                globalConfig={globalConfig}
                copiedId={copiedId}
                onCopyLink={copyVerifyLink}
              />
            ))}
          </div>
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
        <div className="min-h-screen bg-[#06080d] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
