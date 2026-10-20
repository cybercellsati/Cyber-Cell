"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Download,
  Check,
  Save,
  Trash2,
  ExternalLink,
  FileSpreadsheet,
  Type,
  MoveVertical,
  Palette,
  Eye,
  LogOut,
  Sparkles,
  CheckCircle2,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  renderCertificateToCanvas,
  CertificateConfig,
  CERTIFICATE_FONTS,
  FontOption,
} from "@/lib/certificateRenderer";

interface AttendeeRow {
  name: string;
  scholarNumber: string;
  certificateId: string;
  role: string;
}

const COLOR_SWATCHES = [
  { name: "Royal Gold", hex: "#d4af37", bg: "bg-[#d4af37]" },
  { name: "Deep Gold", hex: "#b8860b", bg: "bg-[#b8860b]" },
  { name: "Pure Black", hex: "#000000", bg: "bg-black" },
  { name: "Dark Navy", hex: "#0f172a", bg: "bg-[#0f172a]" },
  { name: "Pure White", hex: "#ffffff", bg: "bg-white" },
  { name: "Cyber Cyan", hex: "#00e5ff", bg: "bg-[#00e5ff]" },
];

export default function CleanAdminCertificatesStudio() {
  const router = useRouter();

  // Template State
  const [templateUrl, setTemplateUrl] = useState<string>("");
  const [templateFileName, setTemplateFileName] = useState<string>("");
  const [customImage, setCustomImage] = useState<HTMLImageElement | null>(null);
  const [isUploadingTemplate, setIsUploadingTemplate] = useState(false);
  const [isDeletingTemplate, setIsDeletingTemplate] = useState(false);

  // Typography Settings
  const [selectedFont, setSelectedFont] = useState<FontOption>(CERTIFICATE_FONTS[0]);
  const [fontSize, setFontSize] = useState<number>(76);
  const [fontWeight, setFontWeight] = useState<string>("bold");
  const [fontColor, setFontColor] = useState<string>("#d4af37");
  const [nameYPos, setNameYPos] = useState<number>(0.495); // 49.5% from top
  const [textTransform, setTextTransform] = useState<"uppercase" | "capitalize" | "none">("uppercase");

  // Save State
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Attendees Data
  const [attendees, setAttendees] = useState<AttendeeRow[]>([]);
  const [isUploadingExcel, setIsUploadingExcel] = useState(false);
  const [showAttendeesList, setShowAttendeesList] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Check Admin Auth on mount
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => {
        if (!res.ok) router.push("/admin/login");
      })
      .catch(() => router.push("/admin/login"));
  }, [router]);

  // 2. Load existing saved config from server
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/admin/certificates/config");
        const data = await res.json();
        if (data.success && data.config) {
          const cfg = data.config;
          if (cfg.fontSize) setFontSize(cfg.fontSize);
          if (cfg.color) setFontColor(cfg.color);
          if (cfg.yPositionPercent) setNameYPos(cfg.yPositionPercent / 100);
          if (cfg.textTransform) setTextTransform(cfg.textTransform);
          if (cfg.fontWeight) setFontWeight(cfg.fontWeight);

          if (cfg.fontFamily) {
            const match = CERTIFICATE_FONTS.find(
              (f) => cfg.fontFamily.toLowerCase().includes(f.name.toLowerCase()) || f.family === cfg.fontFamily
            );
            if (match) setSelectedFont(match);
          }

          if (cfg.templateUrl) {
            setTemplateUrl(cfg.templateUrl);
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => setCustomImage(img);
            img.src = cfg.templateUrl;
          }
          if (cfg.templateFileName) {
            setTemplateFileName(cfg.templateFileName);
          }
        }

        // Load attendees if already in Excel/Registry
        const attRes = await fetch("/api/certificates/verify?query=0108");
        const attData = await attRes.json();
        if (attData.certificates && attData.certificates.length > 0) {
          setAttendees(
            attData.certificates.map((c: any) => ({
              name: c.recipient_name,
              scholarNumber: c.scholar_number,
              certificateId: c.certificate_id,
              role: c.role_or_rank || "Participant",
            }))
          );
        }
      } catch (err) {
        console.warn("Could not load certificate config:", err);
      }
    }
    loadConfig();
  }, []);

  // 3. Render Canvas whenever settings change
  useEffect(() => {
    if (!previewCanvasRef.current) return;

    const currentAttendee: AttendeeRow =
      attendees.length > 0
        ? attendees[previewIndex] || attendees[0]
        : {
            name: "STUDENT FULL NAME",
            scholarNumber: "0108CS221001",
            certificateId: "CYB-2026-SAMPLE",
            role: "Participant",
          };

    const config: CertificateConfig = {
      mode: "name_only",
      templateType: "custom",
      customTemplateImage: customImage,
      templateUrl: templateUrl || "/templates/certificate-template.png",
      recipientName: currentAttendee.name,
      scholarNumber: currentAttendee.scholarNumber,
      certificateId: currentAttendee.certificateId,
      issueDate: new Date().toISOString().split("T")[0],
      roleOrRank: currentAttendee.role,
      nameYPosition: nameYPos,
      nameXPosition: 0.50, // Always centered horizontally
      nameFontSize: fontSize,
      nameFontFamily: selectedFont.family,
      nameFontWeight: fontWeight,
      nameColor: fontColor,
      nameLetterSpacing: 2,
      nameTextTransform: textTransform,
      showQrCode: false,
      showCertificateId: false,
    };

    renderCertificateToCanvas(previewCanvasRef.current, config).catch((err) =>
      console.error("Canvas render error:", err)
    );
  }, [customImage, templateUrl, selectedFont, fontSize, fontWeight, fontColor, nameYPos, textTransform, attendees, previewIndex]);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Upload Canva Template (Auto-saves to Cloudinary)
  const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTemplateFileName(file.name);
    setIsUploadingTemplate(true);

    // Instant local preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => setCustomImage(img);
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
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
        showToast("✓ Template successfully uploaded to Cloudinary CDN!");
      } else {
        alert("Upload error: " + (data.error || "Failed to upload"));
      }
    } catch {
      alert("Network error while uploading template.");
    } finally {
      setIsUploadingTemplate(false);
    }
  };

  // Delete Canva Template from Cloudinary
  const handleDeleteTemplate = async () => {
    if (!confirm("Are you sure you want to delete this template from Cloudinary storage?")) {
      return;
    }

    setIsDeletingTemplate(true);
    try {
      const res = await fetch("/api/admin/certificates/upload-template", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTemplateUrl("");
        setCustomImage(null);
        setTemplateFileName("");
        showToast("✓ Template deleted from Cloudinary storage.");
      } else {
        alert("Delete error: " + data.error);
      }
    } catch {
      alert("Network error while deleting template.");
    } finally {
      setIsDeletingTemplate(false);
    }
  };

  // Upload Attendees Excel File
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
        showToast(`✓ Excel uploaded successfully! ${data.rowCount} attendees loaded.`);

        if (data.attendees && Array.isArray(data.attendees) && data.attendees.length > 0) {
          setAttendees(data.attendees);
          setPreviewIndex(0);
        } else {
          // Fallback refresh
          const refreshRes = await fetch("/api/certificates/verify?query=0108");
          const refreshData = await refreshRes.json();
          if (refreshData.certificates && refreshData.certificates.length > 0) {
            setAttendees(
              refreshData.certificates.map((c: any) => ({
                name: c.recipient_name,
                scholarNumber: c.scholar_number,
                certificateId: c.certificate_id,
                role: c.role_or_rank || "Participant",
              }))
            );
            setPreviewIndex(0);
          }
        }
      } else {
        alert("Excel upload error: " + data.error);
      }
    } catch {
      alert("Network error while uploading Excel.");
    } finally {
      setIsUploadingExcel(false);
    }
  };

  // Save Final Font Decision
  const handleSaveDesign = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/certificates/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fontFamily: selectedFont.family,
          fontSize,
          fontWeight,
          color: fontColor,
          yPositionPercent: Number((nameYPos * 100).toFixed(1)),
          xPositionPercent: 50,
          textTransform,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        showToast("✓ Certificate design saved! All students will receive this style.");
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch {
      alert("Network error while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  // Download Test PNG
  const handleDownloadTestPng = () => {
    if (!previewCanvasRef.current) return;
    const url = previewCanvasRef.current.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = url;
    link.download = "CyberCell-Certificate-Preview.png";
    link.click();
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* ========================================================================= */}
      {/* Header Bar                                                                */}
      {/* ========================================================================= */}
      <header className="border-b border-white/[0.08] bg-[#090e1a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              title="Back to Admin Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <span>Certificate Studio</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  Canva + Cloudinary
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Upload Canva template, adjust name placement, and finalize
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/verify"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors font-medium"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">View Public Portal</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2.5 shadow-xl animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Large Live Canvas Preview                                    */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#0b101c] border border-white/10 rounded-3xl p-5 shadow-2xl relative">
              {/* Canvas Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                    Live A4 Landscape Preview
                  </span>
                </div>

                <button
                  onClick={handleDownloadTestPng}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all active:scale-95 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Test PNG</span>
                </button>
              </div>

              {/* A4 Landscape Canvas Viewport */}
              <div className="relative aspect-[297/210] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#050811] flex items-center justify-center shadow-inner group">
                <canvas
                  ref={previewCanvasRef}
                  className="w-full h-full object-contain"
                />

                {/* Overlay if No Template is uploaded yet */}
                {!templateUrl && !customImage && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">No Canva Template Uploaded</p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm">
                        Upload your Canva certificate below. It will automatically save to Cloudinary and display here.
                      </p>
                    </div>
                  </div>
                )}

                {/* Uploading Spinner Overlay */}
                {isUploadingTemplate && (
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-cyan-300 text-xs font-mono">
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <span>Uploading Canva Template to Cloudinary CDN...</span>
                  </div>
                )}
              </div>

              {/* Preview Testing Name Bar */}
              <div className="mt-4 pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-mono">
                  <span>Testing:</span>
                  <strong className="text-white font-sans text-sm font-bold">
                    {attendees.length > 0 ? (attendees[previewIndex]?.name || attendees[0].name) : "STUDENT FULL NAME"}
                  </strong>
                </div>

                {attendees.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500 font-mono">Sample:</span>
                    {attendees.slice(0, 3).map((att, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPreviewIndex(idx)}
                        className={`px-2 py-0.5 rounded-lg text-xs font-mono transition-colors ${
                          previewIndex === idx
                            ? "bg-cyan-500 text-black font-bold"
                            : "bg-white/[0.05] hover:bg-white/[0.1] text-slate-300"
                        }`}
                      >
                        {att.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tip Pill */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 flex items-center gap-3">
              <span className="text-cyan-400 font-bold shrink-0">💡 Tip:</span>
              <span>
                Canva template par jaha student ke naam ki jagah khali hai, right side me <strong>Vertical Position (Y)</strong> slider se naam ko theek usi line par set karein.
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: 3 Simple Steps                                              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-5">
            {/* ----------------------------------------------------------------------- */}
            {/* STEP 1: Canva Template (Cloudinary)                                     */}
            {/* ----------------------------------------------------------------------- */}
            <div className="bg-[#0b101c] border border-white/10 rounded-3xl p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-white">Canva Template</h3>
                </div>

                {templateUrl ? (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Cloudinary Live
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    No Template
                  </span>
                )}
              </div>

              {/* Action Area */}
              {templateUrl ? (
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 truncate max-w-[200px]" title={templateFileName || "Active Canva Template"}>
                      📄 {templateFileName || "Canva Template"}
                    </span>
                    <a
                      href={templateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 text-[11px] font-mono"
                    >
                      <span>View CDN</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
                    <label className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploadingTemplate ? "Uploading..." : "Replace Template"}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        disabled={isUploadingTemplate}
                        onChange={handleTemplateUpload}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleDeleteTemplate}
                      disabled={isDeletingTemplate}
                      className="py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      title="Delete from Cloudinary"
                    >
                      {isDeletingTemplate ? (
                        <div className="w-3.5 h-3.5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/[0.02] hover:bg-cyan-500/[0.05] cursor-pointer transition-all text-center group">
                  <Upload className="w-6 h-6 text-cyan-400 group-hover:scale-110 mb-2 transition-transform" />
                  <span className="text-xs font-bold text-white">
                    {isUploadingTemplate ? "Uploading to Cloudinary..." : "Upload Canva Certificate Template"}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 font-mono">PNG or JPG (Up to 15 MB)</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    disabled={isUploadingTemplate}
                    onChange={handleTemplateUpload}
                  />
                </label>
              )}
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* STEP 2: Name & Typography Customizer                                    */}
            {/* ----------------------------------------------------------------------- */}
            <div className="bg-[#0b101c] border border-white/10 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-white">Name Formatting</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Fixed for all students</span>
              </div>

              {/* 1. Font Family Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium block">
                  Font Style
                </label>
                <select
                  value={selectedFont.id}
                  onChange={(e) => {
                    const match = CERTIFICATE_FONTS.find((f) => f.id === e.target.value);
                    if (match) setSelectedFont(match);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:border-cyan-400 focus:outline-none transition-all cursor-pointer"
                >
                  {CERTIFICATE_FONTS.map((font) => (
                    <option key={font.id} value={font.id} className="bg-[#0b101c] text-white">
                      {font.name} ({font.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Vertical Position (Y Slider) with Precision - / + */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <MoveVertical className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Vertical Position (Up / Down)</span>
                  </span>
                  <div className="flex items-center gap-1 font-mono text-cyan-300 font-bold">
                    <button
                      onClick={() => setNameYPos((prev) => Math.max(0.2, Number((prev - 0.005).toFixed(3))))}
                      className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded-md text-xs"
                      title="Move Up"
                    >
                      -
                    </button>
                    <span>{(nameYPos * 100).toFixed(1)}%</span>
                    <button
                      onClick={() => setNameYPos((prev) => Math.min(0.8, Number((prev + 0.005).toFixed(3))))}
                      className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded-md text-xs"
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
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* 3. Font Size Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Font Size</span>
                  </span>
                  <div className="flex items-center gap-1 font-mono text-cyan-300 font-bold">
                    <button
                      onClick={() => setFontSize((prev) => Math.max(40, prev - 2))}
                      className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded-md text-xs"
                    >
                      -
                    </button>
                    <span>{fontSize}px</span>
                    <button
                      onClick={() => setFontSize((prev) => Math.min(120, prev + 2))}
                      className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded-md text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min="44"
                  max="120"
                  step="2"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* 4. Color Swatches */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium block">
                  Name Color
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {COLOR_SWATCHES.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setFontColor(c.hex)}
                      className={`w-7 h-7 rounded-full ${c.bg} transition-all relative flex items-center justify-center border ${
                        fontColor.toLowerCase() === c.hex.toLowerCase()
                          ? "ring-2 ring-cyan-400 scale-110 border-white"
                          : "border-white/20 hover:scale-105"
                      }`}
                      title={c.name}
                    >
                      {fontColor.toLowerCase() === c.hex.toLowerCase() && (
                        <Check className={`w-3.5 h-3.5 ${c.hex === "#ffffff" ? "text-black" : "text-white"}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                type="button"
                onClick={handleSaveDesign}
                disabled={isSaving}
                className={`w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 ${
                  saveSuccess
                    ? "bg-emerald-500 text-black shadow-emerald-500/20"
                    : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-cyan-500/25"
                }`}
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Design Finalized & Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Certificate Design</span>
                  </>
                )}
              </button>
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* STEP 3: Attendees Registry (Excel)                                      */}
            {/* ----------------------------------------------------------------------- */}
            <div className="bg-[#0b101c] border border-white/10 rounded-3xl p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-white">Attendees Data</h3>
                </div>

                <span className="text-[11px] font-mono text-slate-300 bg-white/[0.05] border border-white/10 px-2.5 py-0.5 rounded-full">
                  {attendees.length} Students
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Attendees ki Excel file (.xlsx) upload karein jisme <strong>Scholar Number</strong> aur <strong>Name</strong> ho:
              </p>

              <label className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-dashed border-emerald-500/30 hover:border-emerald-400 bg-emerald-500/[0.02] hover:bg-emerald-500/[0.05] cursor-pointer transition-all text-center group">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">
                  {isUploadingExcel ? "Uploading Excel..." : "Upload Attendees Excel (.xlsx)"}
                </span>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  disabled={isUploadingExcel}
                  onChange={handleExcelUpload}
                />
              </label>

              {/* Collapsible View Attendees Button */}
              {attendees.length > 0 && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAttendeesList(!showAttendeesList)}
                    className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white transition-colors py-1"
                  >
                    <span>View {attendees.length} Attendees List</span>
                    {showAttendeesList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showAttendeesList && (
                    <div className="mt-2 max-h-48 overflow-y-auto space-y-1.5 pr-1 border-t border-white/[0.08] pt-2">
                      {attendees.map((att, idx) => (
                        <div
                          key={idx}
                          onClick={() => setPreviewIndex(idx)}
                          className={`p-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                            previewIndex === idx
                              ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300"
                              : "bg-white/[0.02] hover:bg-white/[0.05] text-slate-300"
                          }`}
                        >
                          <span className="font-medium truncate max-w-[150px]">{att.name}</span>
                          <span className="text-[11px] font-mono text-slate-400">{att.scholarNumber}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
