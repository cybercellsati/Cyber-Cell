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
  Sparkles,
  Layers,
  Star,
  Eye,
  Laptop,
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
    images: [],
    organizer: "Cyber Cell SATI",
    registrationLink: "",
    tags: [],
    capacity: "",
    prerequisites: "",
    toolsRequired: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
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

  // Handle Form Open for New Event
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
      images: [],
      organizer: "Cyber Cell SATI",
      registrationLink: "",
      tags: [],
      capacity: "",
      prerequisites: "",
      toolsRequired: "",
    });
    setTagInput("");
    setUrlInput("");
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  // Handle Form Open for Edit
  const handleOpenEdit = (evt: CyberEvent) => {
    setEditingEvent(evt);
    const existingImages = Array.isArray(evt.images) && evt.images.length > 0
      ? evt.images
      : evt.image
      ? [evt.image]
      : [];

    setFormData({
      ...evt,
      images: existingImages,
      image: evt.image || existingImages[0] || "",
    });
    setTagInput(evt.tags ? evt.tags.join(", ") : "");
    setUrlInput("");
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  // Handle Multi-file Upload (up to 10 images)
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentImages = formData.images || [];
    const remainingSlots = 10 - currentImages.length;
    if (remainingSlots <= 0) {
      setErrorMsg("Maximum 10 images allowed per event. Please remove an image first.");
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    setIsUploading(true);
    setErrorMsg("");

    try {
      const uploadFormData = new FormData();
      filesToUpload.forEach((f) => uploadFormData.append("images", f));

      const res = await fetch("/api/admin/events/upload-image", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await res.json();
      if (!data.success || !Array.isArray(data.urls) || data.urls.length === 0) {
        throw new Error(data.error || "Failed uploading images.");
      }

      const updatedImages = [...currentImages, ...data.urls].slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        images: updatedImages,
        image: prev.image && prev.image.trim() !== "" ? prev.image : updatedImages[0],
      }));
    } catch (err) {
      setErrorMsg((err as Error).message || "Error uploading image files.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Add Image URL manually
  const handleAddImageUrl = () => {
    if (!urlInput || !urlInput.trim()) return;
    const currentImages = formData.images || [];
    if (currentImages.length >= 10) {
      setErrorMsg("Maximum 10 images allowed per event.");
      return;
    }

    const clean = urlInput.trim();
    const updated = [...currentImages, clean].slice(0, 10);
    setFormData((prev) => ({
      ...prev,
      images: updated,
      image: prev.image || updated[0],
    }));
    setUrlInput("");
  };

  // Remove single image from list
  const handleRemoveImage = (indexToRemove: number) => {
    const currentImages = formData.images || [];
    const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
    const removedUrl = currentImages[indexToRemove];

    let newPrimary = formData.image;
    if (newPrimary === removedUrl) {
      newPrimary = updated.length > 0 ? updated[0] : "";
    }

    setFormData((prev) => ({
      ...prev,
      images: updated,
      image: newPrimary,
    }));
  };

  // Set Primary Cover Image
  const handleSetPrimary = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
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
      const parsedTags = tagInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const imagesArray = formData.images || [];
      const primaryImage = formData.image || (imagesArray.length > 0 ? imagesArray[0] : "");

      const payload: Partial<CyberEvent> = {
        ...formData,
        id: editingEvent ? editingEvent.id : undefined,
        image: primaryImage,
        images: imagesArray.slice(0, 10),
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

  const imagesList = formData.images || [];

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
                <span>Multi-Image Gallery & Per-Event Pages</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Manage Campus & Virtual Events
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Add up to 10 photos per event, publish workshops, CTF competitions, seminars, and bootcamps with individual event pages, registration forms, and full agendas.
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

          <div className="flex flex-wrap items-center gap-2.5">
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
            {filteredEvents.map((evt) => {
              const evtImages = Array.isArray(evt.images) && evt.images.length > 0
                ? evt.images
                : evt.image
                ? [evt.image]
                : [];
              const coverImg = evt.image || evtImages[0] || "";

              return (
                <div
                  key={evt.id}
                  className="group rounded-3xl bg-[#0a0f1d] border border-white/10 hover:border-cyan-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Event Banner */}
                    <div className="relative w-full h-44 bg-slate-900 overflow-hidden border-b border-white/[0.08]">
                      {coverImg ? (
                        <Image
                          src={coverImg}
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

                      {/* Mode & Image Count */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur border border-white/15 text-slate-300">
                          {evt.mode}
                        </span>

                        {evtImages.length > 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur border border-white/20 text-cyan-300">
                            📷 {evtImages.length} {evtImages.length === 1 ? "photo" : "photos"}
                          </span>
                        )}
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
                    </div>
                  </div>

                  {/* Footer Controls */}
                  <div className="p-4 bg-black/40 border-t border-white/[0.06] flex items-center justify-between gap-2">
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
                      {/* View Per-Event Page Button */}
                      <Link
                        href={`/events/${evt.id}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-colors"
                        title="View Live Event Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

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
              );
            })}
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
      {/* ADD / EDIT EVENT MODAL (UP TO 10 IMAGES & FULL CONTROLS)                  */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
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
                    {editingEvent ? "Edit Event & Photos" : "Create New Event & Photos"}
                  </h2>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Upload up to 10 photos, configure agenda & links
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
              
              {/* ========================================================================= */}
              {/* 1. UP TO 10 IMAGES GALLERY UPLOADER                                       */}
              {/* ========================================================================= */}
              <div className="space-y-3 p-4 rounded-2xl bg-black/40 border border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                      Event Photos & Posters Gallery
                    </label>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                      {imagesList.length} / 10 Images
                    </span>
                  </div>

                  {imagesList.length < 10 && (
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors disabled:opacity-50"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload Photos"}</span>
                    </button>
                  )}
                </div>

                {/* Hidden Multi-file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFilesSelected}
                  className="hidden"
                />

                {/* Thumbnails Grid (Up to 10 images) */}
                {imagesList.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
                    {imagesList.map((imgUrl, idx) => {
                      const isCover = formData.image === imgUrl;
                      return (
                        <div
                          key={idx}
                          className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border group ${
                            isCover
                              ? "border-cyan-400 ring-2 ring-cyan-400/50"
                              : "border-white/15 hover:border-white/30"
                          }`}
                        >
                          <Image src={imgUrl} alt={`Uploaded ${idx}`} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                            {!isCover && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimary(imgUrl)}
                                className="p-1.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                                title="Set as Primary Cover"
                              >
                                <Star className="w-3.5 h-3.5 fill-current" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                              title="Delete Image"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {isCover && (
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-mono bg-cyan-500 text-slate-950 font-black">
                              COVER
                            </span>
                          )}

                          <span className="absolute top-1 left-1 px-1 py-0.5 rounded text-[8px] font-mono bg-black/70 text-slate-300">
                            #{idx + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-6 rounded-xl border border-dashed border-white/20 hover:border-cyan-400/50 text-center cursor-pointer transition-colors"
                  >
                    <Upload className="w-7 h-7 text-cyan-400/60 mx-auto mb-1.5" />
                    <p className="text-xs font-mono text-slate-300 font-semibold">
                      Click to choose up to 10 images from your device
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                      Supports PNG, JPG, WebP. You can select multiple files at once.
                    </p>
                  </div>
                )}

                {/* Paste URL Option */}
                {imagesList.length < 10 && (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="url"
                      placeholder="Or paste external image URL (https://...)"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-[#060910] border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-xs font-mono text-slate-200 transition-colors"
                    >
                      Add URL
                    </button>
                  </div>
                )}
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
                    Time Slot
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
                    Delivery Mode
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

              {/* 4. Venue & Registration URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Venue / Campus Location
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
                    Registration URL (Google Form / Unstop)
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

              {/* 5. Short Overview */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 block font-semibold">
                  Short Overview / Summary (Shown in cards)
                </label>
                <textarea
                  rows={2}
                  placeholder="A concise 1-2 sentence overview shown in event preview cards..."
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 leading-relaxed"
                />
              </div>

              {/* 6. Detailed Information / Agenda */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 block font-semibold">
                  Detailed Information & Session Agenda (Shown on Per-Event Page)
                </label>
                <textarea
                  rows={4}
                  placeholder="Detailed session breakdown, topics covered, CTF rules, hands-on lab exercises, and schedule timeline..."
                  value={formData.longDescription || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, longDescription: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 leading-relaxed"
                />
              </div>

              {/* 7. Prerequisites & Tools Required */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Prerequisites (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Basic networking, familiar with Linux commands, or Python basics..."
                    value={formData.prerequisites || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, prerequisites: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block font-semibold">
                    Tools & Software Required (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Laptop with Kali Linux in VirtualBox, Burp Suite Community, Wireshark..."
                    value={formData.toolsRequired || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, toolsRequired: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 leading-relaxed"
                  />
                </div>
              </div>

              {/* 8. Tags & Capacity */}
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
                    Capacity / Seating Limit
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
                      <span>{isUploading ? "Uploading Photos..." : "Saving Event..."}</span>
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
