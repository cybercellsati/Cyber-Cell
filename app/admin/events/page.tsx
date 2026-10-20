"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CyberEvent } from "@/data/events";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  SlidersHorizontal,
  Sparkles,
  Shield,
  Layers,
  Globe,
  Tag,
  Users,
} from "lucide-react";

const CATEGORIES: CyberEvent["category"][] = [
  "Workshop",
  "CTF",
  "Bootcamp",
  "Seminar",
  "Tech Talk",
  "Hackathon",
  "Orientation",
  "Awareness",
  "Talk",
];

const STATUSES: CyberEvent["status"][] = ["Upcoming", "Live", "Completed", "Tentative"];

const MODES: CyberEvent["mode"][] = ["On-Campus", "Online", "Hybrid"];

export default function AdminEventsPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [events, setEvents] = useState<CyberEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CyberEvent | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<Partial<CyberEvent>>({
    title: "",
    category: "Workshop",
    status: "Upcoming",
    mode: "On-Campus",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM - 01:00 PM",
    venue: "Central Computer Center (CCC), SATI Campus",
    description: "",
    longDescription: "",
    image: "",
    organizer: "Cyber Cell SATI",
    registrationLink: "",
    tags: [],
    capacity: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Verify Admin Authentication
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
        } else {
          router.push("/admin/login?from=/admin/events");
        }
      } catch {
        router.push("/admin/login?from=/admin/events");
      }
    }
    checkAuth();
  }, [router]);

  // 2. Fetch Events
  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      if (data.success && Array.isArray(data.events)) {
        setEvents(data.events);
      }
    } catch (err) {
      console.error("Failed loading events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadEvents();
    }
  }, [authenticated]);

  // Handle Form Open for New
  const handleOpenNew = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      category: "Workshop",
      status: "Upcoming",
      mode: "On-Campus",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM - 01:00 PM",
      venue: "Central Computer Center (CCC), SATI Campus",
      description: "",
      longDescription: "",
      image: "",
      organizer: "Cyber Cell SATI",
      registrationLink: "",
      tags: [],
      capacity: "",
    });
    setTagInput("");
    setImageFile(null);
    setImagePreview("");
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  // Handle Form Open for Edit
  const handleOpenEdit = (evt: CyberEvent) => {
    setEditingEvent(evt);
    setFormData({
      ...evt,
    });
    setTagInput(evt.tags ? evt.tags.join(", ") : "");
    setImageFile(null);
    setImagePreview(evt.image || "");
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  // Handle Image Upload
  const uploadImageFile = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("image", file);

    const res = await fetch("/api/admin/events/upload-image", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (!data.success || !data.url) {
      throw new Error(data.error || "Failed to upload image.");
    }
    return data.url;
  };

  // Save Event Handler
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.title || formData.title.trim() === "") {
      setErrorMsg("Event title is required.");
      return;
    }

    setIsSaving(true);

    try {
      let finalImageUrl = formData.image || "";

      // Upload image if a new file was chosen
      if (imageFile) {
        setIsUploading(true);
        finalImageUrl = await uploadImageFile(imageFile);
        setIsUploading(false);
      }

      // Parse tags
      const parsedTags = tagInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const payload: Partial<CyberEvent> = {
        ...formData,
        id: editingEvent ? editingEvent.id : undefined,
        image: finalImageUrl,
        tags: parsedTags,
      };

      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to save event.");
      }

      setSuccessMsg(editingEvent ? "Event updated successfully!" : "Event created successfully!");
      await loadEvents();

      setTimeout(() => {
        setIsModalOpen(false);
      }, 700);
    } catch (err) {
      setErrorMsg((err as Error).message || "An error occurred while saving the event.");
    } finally {
      setIsSaving(false);
      setIsUploading(false);
    }
  };

  // Delete Event Handler
  const handleDeleteEvent = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/events?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      } else {
        alert(data.error || "Failed to delete event.");
      }
    } catch (err) {
      alert("Error deleting event: " + (err as Error).message);
    }
  };

  // Toggle Event Status
  const handleStatusToggle = async (evt: CyberEvent, newStatus: CyberEvent["status"]) => {
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...evt, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEvents((prev) =>
          prev.map((e) => (e.id === evt.id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // Filtered Events
  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.description && evt.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || evt.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "All" || evt.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-400">Verifying Admin Credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#090d16]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Back to Admin Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Calendar className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wider text-white">
                  EVENT MANAGEMENT
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                  {events.length} {events.length === 1 ? "Event" : "Events"}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block">
                Official Cyber Cell Schedule &bull; SATI Vidisha
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/events"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>View Public Schedule (/events)</span>
            </Link>

            <button
              onClick={handleOpenNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Event</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 space-y-8">
        {/* Banner with Metrics */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0d1627] via-[#09101d] to-[#0d1627] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Publishing & Schedules</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Manage Campus & Virtual Events
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Add, edit, and publish verified cybersecurity workshops, CTF competitions, seminars, and bootcamps with banner images, registration forms, and venue details.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="p-3.5 rounded-2xl bg-[#0b101c] border border-white/10 text-center">
                <span className="text-xs font-mono text-slate-400 uppercase block">Total</span>
                <span className="text-2xl font-black text-white">{events.length}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0b101c] border border-cyan-500/20 text-center">
                <span className="text-xs font-mono text-cyan-400 uppercase block">Upcoming</span>
                <span className="text-2xl font-black text-cyan-300">
                  {events.filter((e) => e.status === "Upcoming" || e.status === "Live").length}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0b101c] border border-white/10 text-center">
                <span className="text-xs font-mono text-slate-500 uppercase block">Completed</span>
                <span className="text-2xl font-black text-slate-400">
                  {events.filter((e) => e.status === "Completed").length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#090d16] border border-white/10">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by event title, venue, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400/50"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400/50"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="p-16 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-slate-400">Loading events...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="group rounded-3xl bg-[#0a0f1d] border border-white/10 hover:border-cyan-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Event Image Banner / Poster */}
                  <div className="relative w-full h-44 bg-slate-900 overflow-hidden border-b border-white/[0.08]">
                    {evt.image ? (
                      <Image
                        src={evt.image}
                        alt={evt.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-[#070c18] text-slate-600 font-mono text-xs">
                        <Calendar className="w-10 h-10 text-cyan-400/30 mb-1" />
                        <span>No Poster Image</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-black/70 backdrop-blur-md border border-white/15 text-cyan-300 shadow">
                        {evt.category}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold shadow ${
                          evt.status === "Live"
                            ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
                            : evt.status === "Upcoming"
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                            : evt.status === "Completed"
                            ? "bg-slate-700/40 text-slate-400 border border-slate-600/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}
                      >
                        {evt.status}
                      </span>
                    </div>

                    {/* Mode Tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/60 backdrop-blur border border-white/15 text-slate-300">
                        {evt.mode}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base sm:text-lg font-black text-white leading-snug tracking-tight group-hover:text-cyan-300 transition-colors">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {evt.description || "No description provided."}
                    </p>

                    {/* Date, Time & Venue */}
                    <div className="space-y-1.5 pt-2 text-xs font-mono text-slate-300 border-t border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{evt.date}</span>
                        {evt.time && (
                          <>
                            <span className="text-slate-600">&bull;</span>
                            <span className="text-slate-400">{evt.time}</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {evt.tags && evt.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {evt.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-black/40 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  {/* Status Dropdown */}
                  <select
                    value={evt.status}
                    onChange={(e) =>
                      handleStatusToggle(evt, e.target.value as CyberEvent["status"])
                    }
                    className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-cyan-400/50"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1.5">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleOpenEdit(evt)}
                      className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors"
                      title="Edit Event"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteEvent(evt.id, evt.title)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-16 rounded-3xl bg-[#090d16] border border-white/10 text-center max-w-lg mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-inner">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">No Events Found</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {searchQuery || selectedCategory !== "All" || selectedStatus !== "All"
                ? "No events match the selected filters. Try clearing your search query or reset filters."
                : "No events have been added yet. Click 'Add New Event' above to publish your first cybersecurity workshop or CTF schedule!"}
            </p>
            <button
              onClick={handleOpenNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Event</span>
            </button>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* ADD / EDIT EVENT MODAL                                                   */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#0c1220] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 sticky top-0 bg-[#0c1220] z-20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    {editingEvent ? "Edit Event Details" : "Create New Event"}
                  </h2>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Fill in event information and upload banner
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error or Success Alerts */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono mb-6 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Event Form */}
            <form onSubmit={handleSaveEvent} className="space-y-6">
              {/* 1. Image Banner Upload */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                  Event Banner / Poster Image
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                  {/* Image Preview Box */}
                  <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-slate-900 border border-white/15 shrink-0 flex items-center justify-center">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 text-xs font-mono p-2 text-center">
                        <Upload className="w-6 h-6 mb-1 text-slate-600" />
                        <span>No image</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-xs font-mono text-white flex items-center gap-2 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{imagePreview ? "Change Image" : "Upload Poster"}</span>
                      </button>

                      {imagePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview("");
                            setFormData((prev) => ({ ...prev, image: "" }));
                          }}
                          className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-300 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 font-mono">
                      Recommended: 16:9 or 4:3 ratio (PNG, JPG, WebP up to 12MB). Or paste direct URL below.
                    </p>

                    <input
                      type="url"
                      placeholder="Or enter image URL (https://...)"
                      value={formData.image || ""}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, image: e.target.value }));
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#060910] border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Event Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Offensive Cyber Defense Bootcamp 2026"
                    value={formData.title || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value as CyberEvent["category"],
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400/50"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as CyberEvent["status"],
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400/50"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Schedule & Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM - 04:00 PM"
                    value={formData.time || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Mode
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        mode: e.target.value as CyberEvent["mode"],
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400/50"
                  >
                    {MODES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Venue & Organizer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Venue / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Central Computer Center (CCC), SATI Campus"
                    value={formData.venue || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, venue: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Registration Link (URL)
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://forms.gle/... or https://unstop.com/..."
                    value={formData.registrationLink || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, registrationLink: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
              </div>

              {/* 5. Short Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 block font-semibold">
                  Short Summary / Overview
                </label>
                <textarea
                  rows={2}
                  placeholder="A concise 1-2 sentence description shown in event cards and previews..."
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 leading-relaxed"
                />
              </div>

              {/* 6. Long Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 block font-semibold">
                  Detailed Information / Agenda (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Detailed session breakdown, prerequisites, CTF rules, tools required (Kali Linux, Burp Suite), or instructions for attendees..."
                  value={formData.longDescription || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, longDescription: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 leading-relaxed"
                />
              </div>

              {/* 7. Tags & Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Web Security, CTF, Kali Linux, Hands-on"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Capacity / Seats
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 60 Seats or Open to all branches"
                    value={formData.capacity || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, capacity: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-300 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm font-mono tracking-wide shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving || isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>{isUploading ? "Uploading Poster..." : "Saving Event..."}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingEvent ? "Save Changes" : "Publish Event"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
