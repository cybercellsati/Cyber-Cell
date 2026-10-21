"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
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
  { name: "Amber Gold", hex: "#f59e0b", bg: "bg-[#f59e0b]" },
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
      const attRes = await fetch("/api/certificates/verify?all=true");
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
            scholarNumber: "22104",
            certificateId: "CYB-2026-PREVIEW",
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

    // 2. Direct upload to Cloudinary CDN
    try {
      const signRes = await fetch("/api/admin/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "cyber-cell/certificates" }),
      });
      const signData = await signRes.json();

      if (!signRes.ok || !signData.signature) {
        throw new Error(signData.error || "Failed to get Cloudinary signature");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp.toString());
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      const cloudName = signData.cloudName;
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok || !uploadData.secure_url) {
        throw new Error(uploadData.error?.message || "Cloudinary direct upload failed");
      }

      const secureUrl = uploadData.secure_url;
      setTemplateUrl(secureUrl);

      // Auto-save to current template profile
      await fetch("/api/admin/certificates/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedTemplateId,
          templateUrl: secureUrl,
          templateFileName: file.name,
        }),
      });

      showToast(`✓ Canva Template uploaded and attached to "${templateDisplayName}"!`);
    } catch (err: any) {
      console.error("Direct upload error:", err);
      alert(`Upload error: ${err.message || "Failed to upload to Cloudinary."}`);
    } finally {
      setIsUploadingTemplate(false);
    }
  };

  // Delete Canva Template from profile
  const handleDeleteTemplate = async () => {
    if (!confirm("Remove Canva template from this profile?")) return;
    setIsDeletingTemplate(true);
    try {
      setCustomImage(null);
      setTemplateUrl("");
      setTemplateFileName("");

      await fetch("/api/admin/certificates/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedTemplateId,
          templateUrl: "",
          templateFileName: "",
        }),
      });

      showToast("✓ Template cleared.");
    } catch {
      alert("Error clearing template.");
    } finally {
      setIsDeletingTemplate(false);
    }
  };

  // Upload Excel Roster
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
        showToast(`✓ Excel uploaded! ${data.count} attendees loaded.`);
        // Reload attendees
        const attRes = await fetch("/api/certificates/verify?all=true");
        const attData = await attRes.json();
        if (attData.certificates) {
          setAttendees(
            attData.certificates.map((c: any) => ({
              name: formatStudentName(c.recipient_name),
              scholarNumber: c.scholar_number,
              certificateId: c.certificate_id,
              role: c.role_or_rank || "Participant",
            }))
          );
        }
      } else {
        alert("Excel upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Network error uploading Excel.");
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

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 flex flex-col font-sans selection:bg-amber-400/25 selection:text-white">
      
      {/* Top Header via Unified AdminNav */}
      <AdminNav
        currentTab="certificates"
        extraActions={
          <button
            type="button"
            onClick={handleSaveDesign}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-md shadow-amber-400/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{saveSuccess ? "Saved" : "Save Profile"}</span>
          </button>
        }
      />

      {/* Main Studio Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1 space-y-6">
        
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="p-3.5 rounded-2xl bg-amber-400/15 border border-amber-400/40 text-amber-200 text-xs font-mono flex items-center gap-2.5 shadow-xl animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* EVENT & TEMPLATE SELECTOR BAR (MULTI-EVENT PRESETS) */}
        <div className="bg-[#080808] border border-white/[0.08] rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Event Template:</span>
            </div>

            {/* Template Dropdown */}
            <select
              value={selectedTemplateId}
              onChange={(e) => handleSelectTemplate(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/[0.12] text-white text-xs font-medium focus:border-amber-400 focus:outline-none transition-all cursor-pointer min-w-[220px]"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id} className="bg-[#0c0c0c] text-white">
                  {t.name} {t.id === activePortalTemplateId ? "★ (Active on Portal)" : ""}
                </option>
              ))}
            </select>

            {/* Active Status Badge */}
            {selectedTemplateId === activePortalTemplateId ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-semibold text-emerald-400 self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active on /verify Portal
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSetActivePortalTemplate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-[11px] font-mono text-amber-300 transition-colors cursor-pointer self-start sm:self-auto"
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
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New Event Template</span>
            </button>

            {templates.length > 1 && (
              <button
                type="button"
                onClick={handleDeleteTemplateProfile}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-amber-400/10 border border-white/10 hover:border-amber-400/30 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                title="Delete this template profile"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Responsive Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT COLUMN: Large Live Canvas Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#080808] border border-white/[0.08] rounded-3xl p-4 sm:p-6 shadow-2xl relative">
              
              {/* Canvas Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider truncate max-w-[200px] sm:max-w-none">
                    Preview: {templateDisplayName || "Event Template"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadTestPng}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Test PNG</span>
                </button>
              </div>

              {/* A4 Landscape Canvas Viewport (Mobile Responsive) */}
              <div className="relative aspect-[297/210] w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-black flex items-center justify-center shadow-inner group">
                <canvas
                  ref={previewCanvasRef}
                  className="w-full h-full object-contain"
                />

                {/* Overlay if No Template is uploaded yet */}
                {!templateUrl && !customImage && (
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-wider">No Canva Template Uploaded</p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm font-light">
                        Upload your Canva certificate design below. It will save to Cloudinary and attach to &quot;{templateDisplayName}&quot;.
                      </p>
                    </div>
                  </div>
                )}

                {/* Uploading Spinner Overlay */}
                {isUploadingTemplate && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-amber-300 text-xs font-mono">
                    <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
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
                        type="button"
                        onClick={() => setPreviewIndex(idx)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          previewIndex === idx
                            ? "bg-amber-400 text-black font-bold shadow"
                            : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300"
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
            <div className="p-4 rounded-2xl bg-[#080808] border border-white/[0.08] text-xs text-slate-400 flex items-center gap-3">
              <span className="text-amber-400 font-bold shrink-0">💡 Event Tip:</span>
              <span className="font-light">
                Aap har event ke liye alag Canva template upload kar sakte hain. Student jab apna naam / scholar number /verify par search karega, use usi event ka certificate milega!
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Event Info, Canva Template, Typography & Excel */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* STEP 1: Template & Event Identity */}
            <div className="bg-[#080808] border border-white/[0.08] rounded-3xl p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Event Details</h3>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-medium focus:border-amber-400 focus:outline-none transition-all"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-medium focus:border-amber-400 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* STEP 2: Canva Template (Cloudinary) */}
            <div className="bg-[#080808] border border-white/[0.08] rounded-3xl p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Canva Template Image</h3>
                </div>

                {templateUrl ? (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Cloudinary Live
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-semibold">
                    No Template
                  </span>
                )}
              </div>

              {/* Action Area */}
              {templateUrl ? (
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 truncate max-w-[200px] font-mono" title={templateFileName || "Canva Template"}>
                      📄 {templateFileName || "Canva Template"}
                    </span>
                    <a
                      href={templateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 text-[11px] font-mono"
                    >
                      <span>View CDN</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
                    <label className="flex-1 py-2 px-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5">
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
                      className="py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-amber-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Clear image"
                    >
                      {isDeletingTemplate ? (
                        <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-amber-400/30 hover:border-amber-400 bg-amber-400/[0.02] hover:bg-amber-400/[0.05] cursor-pointer transition-all text-center group">
                  <Upload className="w-6 h-6 text-amber-400 group-hover:scale-110 mb-2 transition-transform" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
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

            {/* STEP 3: Typography & Name Alignment */}
            <div className="bg-[#080808] border border-white/[0.08] rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Name Formatting</h3>
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-medium focus:border-amber-400 focus:outline-none transition-all cursor-pointer"
                >
                  {CERTIFICATE_FONTS.map((font) => (
                    <option key={font.id} value={font.id} className="bg-[#0c0c0c] text-white">
                      {font.name} ({font.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Vertical Position (Y Slider) with Precision - / + */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <MoveVertical className="w-3.5 h-3.5 text-amber-400" />
                    <span>Vertical Position (Up / Down)</span>
                  </span>
                  <div className="flex items-center gap-1 font-mono text-amber-400 font-bold">
                    <button
                      type="button"
                      onClick={() => setNameYPos((prev) => Math.max(0.2, Number((prev - 0.005).toFixed(3))))}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md text-xs cursor-pointer"
                      title="Move Up"
                    >
                      -
                    </button>
                    <span>{(nameYPos * 100).toFixed(1)}%</span>
                    <button
                      type="button"
                      onClick={() => setNameYPos((prev) => Math.min(0.8, Number((prev + 0.005).toFixed(3))))}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md text-xs cursor-pointer"
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
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* 3. Font Size Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-amber-400" />
                    <span>Font Size</span>
                  </span>
                  <div className="flex items-center gap-1 font-mono text-amber-400 font-bold">
                    <button
                      type="button"
                      onClick={() => setFontSize((prev) => Math.max(40, prev - 2))}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md text-xs cursor-pointer"
                    >
                      -
                    </button>
                    <span>{fontSize}px</span>
                    <button
                      type="button"
                      onClick={() => setFontSize((prev) => Math.min(120, prev + 2))}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md text-xs cursor-pointer"
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
                  className="w-full accent-amber-400 cursor-pointer"
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
                          ? "ring-2 ring-amber-400 scale-110 border-white"
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
                className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer ${
                  saveSuccess
                    ? "bg-emerald-500 text-black shadow-emerald-500/20"
                    : "bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/25"
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

            {/* STEP 4: Attendees Registry (Excel) for this Event */}
            <div className="bg-[#080808] border border-white/[0.08] rounded-3xl p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                    4
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Event Attendees (Excel)</h3>
                </div>

                <span className="text-[11px] font-mono text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-bold">
                  {attendees.length} Students
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Upload attendees sheet for <strong>{templateDisplayName}</strong> (.xlsx or .csv):
              </p>

              <label className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-dashed border-amber-400/30 hover:border-amber-400 bg-amber-400/[0.02] hover:bg-amber-400/[0.05] cursor-pointer transition-all text-center group">
                <FileSpreadsheet className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
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
                    className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white transition-colors py-1 cursor-pointer font-mono"
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
                          className={`p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                            previewIndex === idx
                              ? "bg-amber-400/15 border border-amber-400/40 text-amber-300 font-bold"
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

      {/* MODAL: Create New Event Template Profile */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-[#080808] border border-white/[0.12] rounded-3xl p-6 shadow-2xl text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-tight">Create New Event Template</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewTemplate} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5 font-bold">
                  Template Name (Admin Reference)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Web3 Security Workshop 2026"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-medium focus:border-amber-400 focus:outline-none transition-all placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5 font-bold">
                  Event Name (Printed on Verification)
                </label>
                <input
                  type="text"
                  placeholder="e.g. National Cyber Security Bootcamp 2026"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-medium focus:border-amber-400 focus:outline-none transition-all placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5 font-bold">
                  Issuance Date
                </label>
                <input
                  type="date"
                  value={newIssueDate}
                  onChange={(e) => setNewIssueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-medium focus:border-amber-400 focus:outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingTemplate || !newTemplateName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-md"
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
