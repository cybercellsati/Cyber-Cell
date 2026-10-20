"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import {
  Shield,
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  Eye,
  Search,
  RefreshCw,
  LogOut,
  Sliders,
  Type,
  MoveVertical,
  MoveHorizontal,
  Palette,
  Sparkles,
  Save,
  Check,
  Award,
  Layers,
  GraduationCap,
  LayoutDashboard,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import {
  renderCertificateToCanvas,
  CertificateConfig,
  CERTIFICATE_FONTS,
  FontOption,
} from "@/lib/certificateRenderer";
import { generateCertificateId, CertificateRecord } from "@/lib/certificates";

interface AttendeeRow {
  name: string;
  scholarNumber: string;
  certificateId: string;
  role: string;
  status?: "active";
}

const COLOR_PRESETS = [
  { name: "Royal Gold", hex: "#d4af37", bg: "bg-[#d4af37]" },
  { name: "Deep Gold", hex: "#b8860b", bg: "bg-[#b8860b]" },
  { name: "Dark Navy", hex: "#0f172a", bg: "bg-[#0f172a]" },
  { name: "Dark Slate", hex: "#1e293b", bg: "bg-[#1e293b]" },
  { name: "Pure Black", hex: "#000000", bg: "bg-black" },
  { name: "Pure White", hex: "#ffffff", bg: "bg-white" },
  { name: "Cyber Cyan", hex: "#00e5ff", bg: "bg-[#00e5ff]" },
];

export default function AdminCertificatesStudio() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"studio" | "directory">("studio");
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Template Mode & File
  const [templateMode, setTemplateMode] = useState<"name_only" | "full">("name_only");
  const [templateType, setTemplateType] = useState<
    "custom" | "cyber_midnight" | "gold_merit" | "monochrome_slate"
  >("custom");
  const [customImage, setCustomImage] = useState<HTMLImageElement | null>(null);
  const [customImageName, setCustomImageName] = useState("Canva Template (Cloudinary CDN)");
  const [templateUrl, setTemplateUrl] = useState<string>("");
  const [isDeletingTemplate, setIsDeletingTemplate] = useState(false);

  // Typography Settings
  const [selectedFont, setSelectedFont] = useState<FontOption>(CERTIFICATE_FONTS[0]); // Default: Cinzel
  const [fontSize, setFontSize] = useState<number>(76);
  const [fontWeight, setFontWeight] = useState<string>("bold");
  const [fontColor, setFontColor] = useState<string>("#d4af37");
  const [nameYPos, setNameYPos] = useState<number>(0.48); // 48% from top
  const [nameXPos, setNameXPos] = useState<number>(0.50); // 50% centered
  const [letterSpacing, setLetterSpacing] = useState<number>(2);
  const [textTransform, setTextTransform] = useState<"uppercase" | "capitalize" | "none">("uppercase");
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const [showCertId, setShowCertId] = useState<boolean>(false);

  // Save State
  const [savingConfig, setSavingConfig] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Attendees Data
  const [attendees, setAttendees] = useState<AttendeeRow[]>([
    {
      name: "Aarav Sharma",
      scholarNumber: "0108CS221001",
      certificateId: "CYB-2026-ARV001",
      role: "1st Place Winner",
    },
    {
      name: "Yash Harfode",
      scholarNumber: "0108CS221045",
      certificateId: "CYB-2026-YSH045",
      role: "Lead Convenor",
    },
    {
      name: "Priya Sen",
      scholarNumber: "0108IT221012",
      certificateId: "CYB-2026-PRY012",
      role: "2nd Place Winner",
    },
    {
      name: "Rohan Vishwakarma",
      scholarNumber: "0108EC221089",
      certificateId: "CYB-2026-RHN089",
      role: "Participant",
    },
    {
      name: "Dr. Rohith Venkataraman",
      scholarNumber: "0108CS221999",
      certificateId: "CYB-2026-LONG01",
      role: "Special Recognition",
    },
  ]);

  // Preview State
  const [previewIndex, setPreviewIndex] = useState(1); // Default to Yash Harfode
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Directory State
  const [directoryList, setDirectoryList] = useState<CertificateRecord[]>([]);
  const [directoryLoading, setDirectoryLoading] = useState(false);
  const [directorySearch, setDirectorySearch] = useState("");

  // 1. Verify Admin Session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          setAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  // 2. Load existing saved config from data/certificateConfig.json
  useEffect(() => {
    async function loadSavedConfig() {
      try {
        const res = await fetch("/api/admin/certificates/config");
        const data = await res.json();
        if (data.success && data.config) {
          const cfg = data.config;
          if (cfg.fontSize) setFontSize(cfg.fontSize);
          if (cfg.color) setFontColor(cfg.color);
          if (cfg.yPositionPercent) setNameYPos(cfg.yPositionPercent / 100);
          if (cfg.xPositionPercent) setNameXPos(cfg.xPositionPercent / 100);
          if (cfg.letterSpacing !== undefined) setLetterSpacing(cfg.letterSpacing);
          if (cfg.textTransform) setTextTransform(cfg.textTransform);
          if (cfg.fontWeight) setFontWeight(cfg.fontWeight);
          if (cfg.showQrCode !== undefined) setShowQrCode(cfg.showQrCode);
          if (cfg.showCertificateId !== undefined) setShowCertId(cfg.showCertificateId);

          if (cfg.fontFamily) {
            const match = CERTIFICATE_FONTS.find(
              (f) => cfg.fontFamily.toLowerCase().includes(f.name.toLowerCase()) || f.family === cfg.fontFamily
            );
            if (match) setSelectedFont(match);
          }
        }
      } catch (err) {
        console.warn("Could not load saved certificate config:", err);
      }
    }
    loadSavedConfig();
  }, []);

  // 3. Fetch Directory
  useEffect(() => {
    if (activeTab === "directory") {
      fetchDirectory();
    }
  }, [activeTab]);

  const fetchDirectory = async () => {
    setDirectoryLoading(true);
    try {
      const res = await fetch("/api/certificates/verify?query=0108");
      const data = await res.json();
      if (data.certificates) {
        setDirectoryList(data.certificates);
      }
    } catch (err) {
      console.error("Failed to fetch directory:", err);
    } finally {
      setDirectoryLoading(false);
    }
  };

  // 4. Render Canvas Preview whenever settings change
  useEffect(() => {
    if (!previewCanvasRef.current) return;
    const currentAttendee = attendees.length > 0 ? (attendees[previewIndex] || attendees[0]) : { name: "STUDENT FULL NAME", scholarNumber: "0108CS221001", certificateId: "CYB-2026-PREVIEW", role: "Participant" };

    const config: CertificateConfig = {
      mode: templateMode,
      templateType: templateType,
      customTemplateImage: customImage,
      templateUrl: "/templates/certificate-template.png",
      recipientName: currentAttendee.name,
      scholarNumber: currentAttendee.scholarNumber,
      certificateId: currentAttendee.certificateId,
      issueDate: new Date().toISOString().split("T")[0],
      roleOrRank: currentAttendee.role,
      nameYPosition: nameYPos,
      nameXPosition: nameXPos,
      nameFontSize: fontSize,
      nameFontFamily: selectedFont.family,
      nameFontWeight: fontWeight,
      nameColor: fontColor,
      nameLetterSpacing: letterSpacing,
      nameTextTransform: textTransform,
      showQrCode,
      showCertificateId: showCertId,
    };

    renderCertificateToCanvas(previewCanvasRef.current, config).catch((err) =>
      console.error("Canvas render error:", err)
    );
  }, [
    templateMode,
    templateType,
    customImage,
    selectedFont,
    fontSize,
    fontWeight,
    fontColor,
    nameYPos,
    nameXPos,
    letterSpacing,
    textTransform,
    showQrCode,
    showCertId,
    attendees,
    previewIndex,
  ]);

  // Uploading States & Notification
  const [isUploadingTemplate, setIsUploadingTemplate] = useState(false);
  const [isUploadingExcel, setIsUploadingExcel] = useState(false);
  const [uploadNotification, setUploadNotification] = useState<string | null>(null);

  // Handle Custom Canva Template Upload (Permanently Saves to Server)
  const handleCustomTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomImageName(file.name);
    setIsUploadingTemplate(true);

    // 1. Instant client-side preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setCustomImage(img);
        setTemplateType("custom");
        setTemplateMode("name_only");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);

    // 2. Permanently upload to server (public/templates/certificate-template.png)
    try {
      const formData = new FormData();
      formData.append("template", file);

      const res = await fetch("/api/admin/certificates/upload-template", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        if (data.templateUrl) setTemplateUrl(data.templateUrl);
        if (data.fileName) setCustomImageName(data.fileName);
        setUploadNotification("✓ Canva template permanently saved to Cloudinary CDN & server!");
        setTimeout(() => setUploadNotification(null), 6000);
      } else {
        alert("Template upload error: " + (data.error || "Failed to save file"));
      }
    } catch (err) {
      console.error("Template upload error:", err);
      alert("Network error while uploading template to server.");
    } finally {
      setIsUploadingTemplate(false);
    }
  };


  // Handle Delete Canva Template (Deletes from Cloudinary & resets server)
  const handleDeleteTemplate = async () => {
    if (!confirm("Are you sure you want to delete this Canva template from Cloudinary storage?")) {
      return;
    }

    setIsDeletingTemplate(true);
    try {
      const res = await fetch("/api/admin/certificates/upload-template", {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setTemplateUrl("");
        setCustomImage(null);
        setCustomImageName("No Template Loaded");
        setUploadNotification("✓ Canva template successfully deleted from Cloudinary storage.");
        setTimeout(() => setUploadNotification(null), 5000);
      } else {
        alert("Delete template error: " + (data.error || "Failed to delete"));
      }
    } catch (err) {
      console.error("Delete template error:", err);
      alert("Network error while deleting template.");
    } finally {
      setIsDeletingTemplate(false);
    }
  };

  // Handle Excel Upload (Permanently Saves to Server data/attendees.xlsx)
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingExcel(true);

    try {
      const formData = new FormData();
      formData.append("excel", file);

      const res = await fetch("/api/admin/certificates/upload-excel", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setUploadNotification(`✓ Excel attendees file permanently saved to server (${data.rowCount} attendees)!`);
        setTimeout(() => setUploadNotification(null), 6000);

        // Fetch refreshed attendees from server
        const refreshRes = await fetch("/api/certificates/verify?query=0108");
        const refreshData = await refreshRes.json();
        if (refreshData.certificates && refreshData.certificates.length > 0) {
          setAttendees(
            refreshData.certificates.map((c: any) => ({
              name: c.recipient_name,
              scholarNumber: c.scholar_number,
              certificateId: c.certificate_id,
              role: c.role_or_rank || "Participant",
              status: "active",
            }))
          );
          setPreviewIndex(0);
        }
      } else {
        alert("Excel upload error: " + (data.error || "Failed to save Excel file"));
      }
    } catch (err) {
      console.error("Excel upload error:", err);
      alert("Network error while uploading Excel to server.");
    } finally {
      setIsUploadingExcel(false);
    }
  };

  // Save Final Official Font & Configuration
  const handleSaveConfig = async () => {
    setSavingConfig(true);
    setSaveSuccess(false);

    try {
      const payload = {
        templateUrl: "/templates/certificate-template.png",
        fontFamily: selectedFont.family,
        fontSize,
        fontWeight,
        color: fontColor,
        yPositionPercent: Math.round(nameYPos * 1000) / 10,
        xPositionPercent: Math.round(nameXPos * 1000) / 10,
        letterSpacing,
        textTransform,
        showQrCode,
        showCertificateId: showCertId,
      };

      const res = await fetch("/api/admin/certificates/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        alert("Failed to save config to server");
      }
    } catch (err) {
      console.error("Save config error:", err);
      alert("Error saving configuration");
    } finally {
      setSavingConfig(false);
    }
  };

  // Test Download Current Canvas PNG
  const handleDownloadTestPng = () => {
    if (!previewCanvasRef.current) return;
    const currentAttendee = attendees[previewIndex] || attendees[0];
    const dataUrl = previewCanvasRef.current.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `CyberCell-${currentAttendee.name.replace(/\s+/g, "_")}-Certificate.png`;
    link.click();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentAttendee = attendees[previewIndex] || attendees[0];

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col">
      {/* ========================================================================= */}
      {/* Top Admin Navigation Bar                                                 */}
      {/* ========================================================================= */}
      <header className="border-b border-white/[0.08] bg-[#090d16]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors"
              title="Return to Admin Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide text-white">
                  CYBER CELL STUDIO
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 border border-amber-500/30 text-amber-300">
                  On-Demand Canvas
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Canva Template & Font Customizer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/verify"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verify Portal (/verify)</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Upload Notification Banner */}
        {uploadNotification && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2.5 shadow-lg animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{uploadNotification}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-white/[0.08] pb-4">
          <button
            onClick={() => setActiveTab("studio")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "studio"
                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Font & Template Studio</span>
          </button>

          <button
            onClick={() => setActiveTab("directory")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "directory"
                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel Attendees Registry ({attendees.length})</span>
          </button>
        </div>

        {activeTab === "studio" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ========================================================================= */}
            {/* LEFT / CENTER: Live High-Definition Certificate Preview                   */}
            {/* ========================================================================= */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-[#0b101b] border border-white/10 rounded-2xl p-5 shadow-2xl relative">
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                      Live Canvas Preview (1920×1080 HD)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadTestPng}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27446b] hover:bg-[#315383] text-white text-xs font-semibold shadow-md active:scale-98 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Test PNG</span>
                    </button>
                  </div>
                </div>

                {/* 16:9 Aspect Ratio Canvas Container */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-inner flex items-center justify-center">
                  <canvas
                    ref={previewCanvasRef}
                    className="w-full h-full object-contain"
                  />
                  {isUploadingTemplate && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-cyan-300 text-xs font-mono">
                      <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                      <span>Saving Canva Template permanently to server...</span>
                    </div>
                  )}
                </div>

                {/* Active Attendee Test Switcher */}
                <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>Testing Name:</span>
                    <strong className="text-cyan-300 font-sans text-sm">
                      {currentAttendee.name}
                    </strong>
                    <span className="text-slate-500">({currentAttendee.scholarNumber})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 mr-1">Switch:</span>
                    {attendees.slice(0, 4).map((att, idx) => (
                      <button
                        key={att.scholarNumber || idx}
                        onClick={() => setPreviewIndex(idx)}
                        className={`px-2 py-1 rounded text-[11px] transition-colors ${
                          previewIndex === idx
                            ? "bg-cyan-500 text-black font-bold"
                            : "bg-white/[0.05] hover:bg-white/[0.1] text-slate-300"
                        }`}
                      >
                        {att.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Template Upload & Selection Card */}
              <div className="bg-[#0b101b] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">Canva Template Mode</h3>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                    Only writes recipient name
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Aapka 5 MB Canva template background rahega. Code se sirf aur sirf recipient ka naam draw hoga.
                  Aap yaha naya Canva image upload karenge toh wo <strong>direct server par save</strong> ho jayega taaki student bhi download kar paye:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-white/20 hover:border-cyan-400/50 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer transition-all text-center group">
                    {isUploadingTemplate ? (
                      <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-1.5" />
                    ) : (
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 mb-1.5 transition-colors" />
                    )}
                    <span className="text-xs font-semibold text-white">
                      {isUploadingTemplate ? "Saving to Server..." : "Upload Canva Template"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">PNG / JPG up to 10 MB (Auto-saves)</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      disabled={isUploadingTemplate}
                      onChange={handleCustomTemplateUpload}
                    />
                  </label>

                  <label className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-white/20 hover:border-emerald-400/50 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer transition-all text-center group">
                    {isUploadingExcel ? (
                      <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-1.5" />
                    ) : (
                      <FileSpreadsheet className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 mb-1.5 transition-colors" />
                    )}
                    <span className="text-xs font-semibold text-white">
                      {isUploadingExcel ? "Saving Attendees..." : "Upload Excel File"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">.xlsx or .csv (Auto-saves to server)</span>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="hidden"
                      disabled={isUploadingExcel}
                      onChange={handleExcelUpload}
                    />
                  </label>
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-white/[0.05]">
                  <span>Active Template: <strong className="text-slate-200">{customImageName}</strong></span>
                  <span className="text-emerald-400">✓ Server Persistent</span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT SIDEBAR: Font Picker & Alignment Studio                             */}
            {/* ========================================================================= */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary Save Action Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/40 border border-cyan-500/30 flex items-center justify-between gap-3 shadow-lg">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Final Font Decision
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Aap jo font yaha final karenge, sabhi students ke liye wahi use hoga.
                  </p>
                </div>

                <button
                  onClick={handleSaveConfig}
                  disabled={savingConfig}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all shrink-0 ${
                    saveSuccess
                      ? "bg-emerald-500 text-black shadow-emerald-500/20"
                      : "bg-[#00e5ff] hover:bg-[#38bdf8] text-slate-950 shadow-cyan-500/20"
                  }`}
                >
                  {savingConfig ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : saveSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Finalized!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save as Final</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1. Font Selection Gallery */}
              <div className="bg-[#0b101b] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">Choose Final Font</h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {CERTIFICATE_FONTS.length} Curated Fonts
                  </span>
                </div>

                {/* Font Options Grid */}
                <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
                  {CERTIFICATE_FONTS.map((f) => {
                    const isSelected = selectedFont.id === f.id;
                    return (
                      <div
                        key={f.id}
                        onClick={() => setSelectedFont(f)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-cyan-500/15 border-cyan-500/60 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                            : "bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{f.name}</span>
                            <span
                              className={`px-1.5 py-0.2 rounded text-[10px] font-mono uppercase ${
                                f.category === "Academic"
                                  ? "bg-amber-500/20 text-amber-300"
                                  : f.category === "Calligraphy"
                                  ? "bg-pink-500/20 text-pink-300"
                                  : f.category === "Serif"
                                  ? "bg-purple-500/20 text-purple-300"
                                  : "bg-cyan-500/20 text-cyan-300"
                              }`}
                            >
                              {f.category}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{f.description}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className="text-base text-cyan-300"
                            style={{ fontFamily: f.family }}
                          >
                            {f.sample}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Position & Alignment Sliders */}
              <div className="bg-[#0b101b] border border-white/10 rounded-2xl p-5 space-y-5">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Name Position & Styling</h3>
                </div>

                {/* Vertical Position (Y %) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <MoveVertical className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Vertical Position (Y from Top)</span>
                    </span>
                    <div className="flex items-center gap-1 font-mono text-cyan-300 font-bold">
                      <button
                        onClick={() => setNameYPos((prev) => Math.max(0.2, prev - 0.005))}
                        className="px-1.5 py-0.5 bg-white/10 hover:bg-white/20 rounded text-[11px]"
                        title="Move Up"
                      >
                        -
                      </button>
                      <span>{(nameYPos * 100).toFixed(1)}%</span>
                      <button
                        onClick={() => setNameYPos((prev) => Math.min(0.8, prev + 0.005))}
                        className="px-1.5 py-0.5 bg-white/10 hover:bg-white/20 rounded text-[11px]"
                        title="Move Down"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="70"
                    step="0.5"
                    value={nameYPos * 100}
                    onChange={(e) => setNameYPos(parseFloat(e.target.value) / 100)}
                    className="w-full accent-cyan-400"
                  />
                  <p className="text-[10px] text-slate-500">
                    Canva template me jaha naam ki khali line hai, uske theek upar set karein.
                  </p>
                </div>

                {/* Font Size */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Font Size (px)</span>
                    <span className="font-mono text-cyan-300 font-bold">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="44"
                    max="120"
                    step="2"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                {/* Text Color Presets */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-300 block">Name Color</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {COLOR_PRESETS.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setFontColor(c.hex)}
                        title={c.name}
                        className={`w-7 h-7 rounded-full border transition-all ${c.bg} ${
                          fontColor.toLowerCase() === c.hex.toLowerCase()
                            ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0b101b] scale-110 border-white"
                            : "border-white/20 hover:scale-105"
                        }`}
                      />
                    ))}
                    <input
                      type="color"
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                      className="w-7 h-7 rounded-full bg-transparent cursor-pointer border border-white/20 ml-1"
                      title="Custom Color"
                    />
                  </div>
                </div>

                {/* Text Transform & Letter Spacing */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.08]">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Casing</label>
                    <select
                      value={textTransform}
                      onChange={(e) => setTextTransform(e.target.value as "uppercase" | "capitalize" | "none")}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="uppercase" className="bg-[#0b101b]">UPPERCASE</option>
                      <option value="capitalize" className="bg-[#0b101b]">Title Case</option>
                      <option value="none" className="bg-[#0b101b]">As in Excel</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Font Weight</label>
                    <select
                      value={fontWeight}
                      onChange={(e) => setFontWeight(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="bold" className="bg-[#0b101b]">Bold</option>
                      <option value="600" className="bg-[#0b101b]">Semi-Bold</option>
                      <option value="normal" className="bg-[#0b101b]">Normal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DIRECTORY / ATTENDEES TAB                                                */}
        {/* ========================================================================= */}
        {activeTab === "directory" && (
          <div className="bg-[#0b101b] border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-bold text-white">
                  Attendees Data Registry ({attendees.length} Records)
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Data sourced from local Excel / JSON in <code>data/attendees.xlsx</code>
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <label className="px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New Excel</span>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                    onChange={handleExcelUpload}
                  />
                </label>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Recipient Name</th>
                    <th className="py-3 px-4">Scholar Number</th>
                    <th className="py-3 px-4">Certificate ID</th>
                    <th className="py-3 px-4">Role / Category</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {attendees.map((att, idx) => (
                    <tr
                      key={att.certificateId || idx}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 px-4 text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-white font-sans text-sm">
                        {att.name}
                      </td>
                      <td className="py-3 px-4 text-cyan-300">{att.scholarNumber}</td>
                      <td className="py-3 px-4 text-slate-400">{att.certificateId}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">
                          {att.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setPreviewIndex(idx);
                            setActiveTab("studio");
                          }}
                          className="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs transition-colors"
                        >
                          Preview On Canvas
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
