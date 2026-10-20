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
  Plus,
  Layers,
  FolderOpen,
  Calendar,
  X,
  FileText,
} from "lucide-react";
import {
  renderCertificateToCanvas,
  CertificateConfig,
  CERTIFICATE_FONTS,
  FontOption,
} from "@/lib/certificateRenderer";
import { CertificateTemplateProfile } from "@/lib/certificateConfig";
import { formatStudentName } from "@/lib/certificates";

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

  // Multi-Template Management State
  const [templates, setTemplates] = useState<CertificateTemplateProfile[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [activePortalTemplateId, setActivePortalTemplateId] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newEventName, setNewEventName] = useState("");
  const [newIssueDate, setNewIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);

  // Template Editing State
  const [templateDisplayName, setTemplateDisplayName] = useState<string>("");
  const [eventTitle, setEventTitle] = useState<string>("");
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

  // Helper: Apply a template profile to current studio state
  const applyTemplateToStudio = (tmpl: CertificateTemplateProfile) => {
    setSelectedTemplateId(tmpl.id);
    setTemplateDisplayName(tmpl.name);
    setEventTitle(tmpl.eventName || tmpl.name);
    setTemplateUrl(tmpl.templateUrl || "");
    setTemplateFileName(tmpl.templateFileName || "");
    setFontSize(tmpl.fontSize || 76);
    setFontWeight(tmpl.fontWeight || "bold");
    setFontColor(tmpl.color || "#d4af37");
    setNameYPos((tmpl.yPositionPercent ?? 49.5) / 100);
    setTextTransform(tmpl.textTransform || "uppercase");

    if (tmpl.fontFamily) {
      const match = CERTIFICATE_FONTS.find(
        (f) =>
          tmpl.fontFamily.toLowerCase().includes(f.name.toLowerCase()) ||
          f.family === tmpl.fontFamily
      );
      if (match) setSelectedFont(match);
    }

    if (tmpl.templateUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setCustomImage(img);
      img.src = tmpl.templateUrl;
    } else {
      setCustomImage(null);
    }
  };

  // 2. Load all saved templates from server
  const loadTemplatesAndAttendees = async () => {
    try {
      const res = await fetch("/api/admin/certificates/templates");
      const data = await res.json();

      if (data.success && Array.isArray(data.templates) && data.templates.length > 0) {
        setTemplates(data.templates);
        setActivePortalTemplateId(data.activeTemplateId || data.templates[0].id);

        // Find either currently selected or active template
        const target =
          data.templates.find((t: CertificateTemplateProfile) => t.id === selectedTemplateId) ||
          data.templates.find((t: CertificateTemplateProfile) => t.id === data.activeTemplateId) ||
          data.templates[0];

        applyTemplateToStudio(target);
      }

      // Load attendees
      const attRes = await fetch("/api/certificates/verify?query=0108");
      const attData = await attRes.json();
      if (attData.certificates && attData.certificates.length > 0) {
        setAttendees(
          attData.certificates.map((c: any) => ({
            name: formatStudentName(c.recipient_name),
            scholarNumber: c.scholar_number,
            certificateId: c.certificate_id,
            role: c.role_or_rank || "Participant",
          }))
        );
      }
    } catch (err) {
      console.warn("Could not load certificate templates:", err);
    }
  };

  useEffect(() => {
    loadTemplatesAndAttendees();
  }, []);

  // 3. Switch selected template profile
  const handleSelectTemplate = (id: string) => {
    const target = templates.find((t) => t.id === id);
    if (target) {
      applyTemplateToStudio(target);
      showToast(`Switched to template: "${target.name}"`);
    }
  };

  // 4. Set template as active for public verification
  const handleSetActivePortalTemplate = async () => {
    if (!selectedTemplateId) return;
    try {
      const res = await fetch("/api/admin/certificates/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set_active",
          id: selectedTemplateId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActivePortalTemplateId(selectedTemplateId);
        showToast("✓ Template is now ACTIVE on the public /verify portal!");
        if (data.templates) setTemplates(data.templates);
      }
    } catch {
      alert("Failed to activate template.");
    }
  };

  // 5. Create a new event template profile
  const handleCreateNewTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateName.trim()) return;

    setIsCreatingTemplate(true);
    try {
      const newId = `tmpl_${Date.now()}`;
      const payload: Partial<CertificateTemplateProfile> = {
        id: newId,
        name: newTemplateName.trim(),
        eventName: newEventName.trim() || newTemplateName.trim(),
        issueDate: newIssueDate || new Date().toISOString().split("T")[0],
        templateUrl: "",
        templateFileName: "",
        fontFamily: "'Cinzel', serif",
        fontSize: 76,
        fontWeight: "bold",
        color: "#d4af37",
        yPositionPercent: 49.5,
        xPositionPercent: 50.0,
        textTransform: "uppercase",
        attendeesCount: 0,
        isActive: false,
      };

      const res = await fetch("/api/admin/certificates/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.profile) {
        setTemplates(data.templates || [...templates, data.profile]);
        applyTemplateToStudio(data.profile);
        setShowCreateModal(false);
        setNewTemplateName("");
        setNewEventName("");
        showToast(`✓ New template "${data.profile.name}" created! Now upload its Canva template & Excel sheet.`);
      } else {
        alert("Failed to create template: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Network error creating template.");
    } finally {
      setIsCreatingTemplate(false);
    }
  };

  // 6. Delete template profile
  const handleDeleteTemplateProfile = async () => {
    if (templates.length <= 1) {
      alert("You cannot delete the only existing template.");
      return;
    }
    if (!confirm(`Are you sure you want to delete template "${templateDisplayName}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/certificates/templates?id=${encodeURIComponent(selectedTemplateId)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setTemplates(data.templates);
        setActivePortalTemplateId(data.activeTemplateId);
        const remaining = data.templates[0];
        if (remaining) applyTemplateToStudio(remaining);
        showToast("✓ Template deleted successfully.");
      } else {
        alert("Delete error: " + data.error);
      }
    } catch {
      alert("Network error while deleting template.");
    }
  };

  // 7. Render Canvas whenever settings change
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
      recipientName: formatStudentName(currentAttendee.name),
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

  // Upload Canva Template: Direct Client-to-Cloudinary
  const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTemplateFileName(file.name);
    setIsUploadingTemplate(true);

    // 1. Instant local preview in canvas
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => setCustomImage(img);
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);

    try {
      // 2. Request upload signature from server with template-specific public ID
      const safeTmplId = selectedTemplateId || `tmpl_${Date.now()}`;
      const signRes = await fetch("/api/admin/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folder: "cybercell/templates",
          public_id: `certificate-template-${safeTmplId}`,
          overwrite: true,
        }),
      });

      const signData = await signRes.json();
      if (!signRes.ok || !signData.success) {
        throw new Error(
          signData.error ||
          "Cloudinary credentials missing. Please check CLOUDINARY_URL in environment variables."
        );
      }

      // 3. Direct client-to-Cloudinary upload
      const cldFormData = new FormData();
      cldFormData.append("file", file);
      cldFormData.append("api_key", signData.apiKey);
      cldFormData.append("timestamp", String(signData.timestamp));
      cldFormData.append("signature", signData.signature);
      cldFormData.append("folder", signData.folder);
      cldFormData.append("public_id", `certificate-template-${safeTmplId}`);
      cldFormData.append("overwrite", "true");

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
        {
          method: "POST",
          body: cldFormData,
        }
      );

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.secure_url) {
        throw new Error(uploadData.error?.message || "Cloudinary direct upload failed.");
      }

      const finalUrl = uploadData.secure_url;
      setTemplateUrl(finalUrl);

      // 4. Save template URL into this specific template profile
      await fetch("/api/admin/certificates/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedTemplateId,
          templateUrl: finalUrl,
          templateFileName: file.name,
          cloudinaryPublicId: uploadData.public_id,
        }),
      });

      showToast(`✓ Canva template saved to Cloudinary for "${templateDisplayName}"!`);
    } catch (err) {
      console.error("Template upload error:", err);
      alert("Upload error: " + (err as Error).message);
    } finally {
      setIsUploadingTemplate(false);
    }
  };

  // Delete Canva Template from Cloudinary
  const handleDeleteTemplate = async () => {
    if (!confirm("Are you sure you want to remove this Canva image?")) {
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

        // Also update template profile
        await fetch("/api/admin/certificates/templates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedTemplateId,
            templateUrl: "",
            templateFileName: "",
          }),
        });

        showToast("✓ Template image cleared.");
      } else {
        alert("Delete error: " + data.error);
      }
    } catch {
      alert("Network error while deleting template.");
    } finally {
      setIsDeletingTemplate(false);
    }
  };

  // Upload Attendees Excel File for this specific template/event
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingExcel(true);
    try {
      const formData = new FormData();
      formData.append("excel", file);
      formData.append("templateId", selectedTemplateId);
      formData.append("eventName", eventTitle || templateDisplayName);

      const res = await fetch("/api/admin/certificates/upload-excel", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        showToast(`✓ Excel uploaded successfully! ${data.rowCount} attendees added to "${templateDisplayName}".`);

        if (data.attendees && Array.isArray(data.attendees) && data.attendees.length > 0) {
          setAttendees(data.attendees);
          setPreviewIndex(0);
        }

        // Refresh template list to update attendee count badges
        const tmplRes = await fetch("/api/admin/certificates/templates");
        const tmplData = await tmplRes.json();
        if (tmplData.templates) setTemplates(tmplData.templates);
      } else {
        alert("Excel upload error: " + data.error);
      }
    } catch {
      alert("Network error while uploading Excel.");
    } finally {
      setIsUploadingExcel(false);
    }
  };

  // Save Final Template & Design Decision
  const handleSaveDesign = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/certificates/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedTemplateId,
          name: templateDisplayName.trim(),
          eventName: eventTitle.trim(),
          templateUrl,
          templateFileName,
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
        if (data.templates) setTemplates(data.templates);
        showToast(`✓ Profile "${templateDisplayName}" saved successfully!`);
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
    link.download = `CyberCell-${(templateDisplayName || "Certificate").replace(/\s+/g, "_")}-Preview.png`;
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
                  Multi-Event Engine
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Design Canva templates and issue certificates per event
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2.5 shadow-xl animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* EVENT & TEMPLATE SELECTOR BAR (MULTI-EVENT PRESETS)                       */}
        {/* ========================================================================= */}
        <div className="bg-[#0b101c] border border-white/10 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Event Template:</span>
            </div>

            {/* Template Dropdown */}
            <select
              value={selectedTemplateId}
              onChange={(e) => handleSelectTemplate(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white text-xs font-medium focus:border-cyan-400 focus:outline-none transition-all cursor-pointer min-w-[220px]"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id} className="bg-[#0b101c] text-white">
                  {t.name} {t.id === activePortalTemplateId ? "★ (Active on Portal)" : ""}
                </option>
              ))}
            </select>

            {/* Active Status Badge */}
            {selectedTemplateId === activePortalTemplateId ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-semibold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active on /verify Portal
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSetActivePortalTemplate}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 transition-colors"
                title="Make this template the default for the public verification portal"
              >
                <span>Set as Active on Portal</span>
              </button>
            )}
          </div>

          {/* Action Buttons: New Template & Delete */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Create Template for Next Event</span>
            </button>

            {templates.length > 1 && (
              <button
                type="button"
                onClick={handleDeleteTemplateProfile}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 transition-colors"
                title="Delete this template profile"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Responsive Studio Layout */}
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
                    Live A4 Landscape Preview ({templateDisplayName || "Event Template"})
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
                      <p className="text-sm font-semibold text-white">No Canva Template Uploaded for this Event</p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm">
                        Upload your Canva certificate design below. It will save to Cloudinary and attach to &quot;{templateDisplayName}&quot;.
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
                    {attendees.length > 0 ? formatStudentName(attendees[previewIndex]?.name || attendees[0].name) : "Student Full Name"}
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
                        {formatStudentName(att.name).split(" ")[0]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tip Pill */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 flex items-center gap-3">
              <span className="text-cyan-400 font-bold shrink-0">💡 Event Tip:</span>
              <span>
                Aap har event ke liye alag Canva template upload kar sakte hain. Student jab apna naam / scholar number /verify par search karega, use usi event ka certificate milega!
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Event Info, Canva Template, Typography & Excel               */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-5">
            {/* ----------------------------------------------------------------------- */}
            {/* STEP 1: Template & Event Identity                                       */}
            {/* ----------------------------------------------------------------------- */}
            <div className="bg-[#0b101c] border border-white/10 rounded-3xl p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-white">Event Details</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Template Profile</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Template Display Name
                  </label>
                  <input
                    type="text"
                    value={templateDisplayName}
                    onChange={(e) => setTemplateDisplayName(e.target.value)}
                    placeholder="e.g. National Cyber Defense 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:border-cyan-400 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Event Title (on Certificate Record)
                  </label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. Workshop on Ethical Hacking 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:border-cyan-400 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* STEP 2: Canva Template (Cloudinary)                                     */}
            {/* ----------------------------------------------------------------------- */}
            <div className="bg-[#0b101c] border border-white/10 rounded-3xl p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-white">Canva Template Image</h3>
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
                    <span className="text-slate-400 truncate max-w-[200px]" title={templateFileName || "Canva Template"}>
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
                      title="Clear image"
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
            {/* STEP 3: Typography & Name Alignment                                     */}
            {/* ----------------------------------------------------------------------- */}
            <div className="bg-[#0b101c] border border-white/10 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-white">Name Formatting</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Position & Style</span>
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

              {/* Save Button for this template */}
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
                    <span>Template Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Template Profile</span>
                  </>
                )}
              </button>
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* STEP 4: Attendees Registry (Excel) for this Event                       */}
            {/* ----------------------------------------------------------------------- */}
            <div className="bg-[#0b101c] border border-white/10 rounded-3xl p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    4
                  </span>
                  <h3 className="text-sm font-bold text-white">Event Attendees (Excel)</h3>
                </div>

                <span className="text-[11px] font-mono text-slate-300 bg-white/[0.05] border border-white/10 px-2.5 py-0.5 rounded-full">
                  {attendees.length} Students
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Upload attendees sheet for <strong>{templateDisplayName}</strong> (.xlsx or .csv):
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
                          <span className="font-medium truncate max-w-[150px]">{formatStudentName(att.name)}</span>
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

      {/* ========================================================================= */}
      {/* MODAL: Create New Event Template Profile                                  */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-[#090e1a] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Create New Event Template</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewTemplate} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                  Template Name (Admin Reference)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Web3 Security Workshop 2026"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs font-medium focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                  Event Name (Printed on Verification)
                </label>
                <input
                  type="text"
                  placeholder="e.g. National Cyber Security Bootcamp 2026"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs font-medium focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                  Issuance Date
                </label>
                <input
                  type="date"
                  value={newIssueDate}
                  onChange={(e) => setNewIssueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs font-medium focus:border-cyan-400 focus:outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingTemplate || !newTemplateName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs transition-all disabled:opacity-50"
                >
                  {isCreatingTemplate ? "Creating..." : "Create & Start Designing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
