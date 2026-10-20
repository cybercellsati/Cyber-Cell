import fs from "fs";
import path from "path";
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { CyberEvent, upcomingEvents as staticUpcoming } from "@/data/events";

const EVENTS_FILE = path.join(process.cwd(), "data", "events.json");

// Tracks whether Firestore is reachable to avoid repeated slow timeouts
let firestoreAvailable = true;

function withTimeout<T>(promise: Promise<T>, ms: number = 1000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

function readLocalEvents(): CyberEvent[] {
  try {
    if (fs.existsSync(EVENTS_FILE)) {
      const raw = fs.readFileSync(EVENTS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn("[eventsStorage] Failed reading local data/events.json:", err);
  }
  return [...staticUpcoming];
}

function writeLocalEvents(events: CyberEvent[]): void {
  try {
    const dir = path.dirname(EVENTS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), "utf-8");
  } catch (err) {
    console.error("[eventsStorage] Failed writing local data/events.json:", err);
  }
}

/**
 * Fetch all events (Instant local JSON with fast non-blocking Firestore sync)
 */
export async function getAllEvents(): Promise<CyberEvent[]> {
  const local = readLocalEvents();

  if (isFirebaseConfigured && db && firestoreAvailable) {
    try {
      const colRef = collection(db, "events");
      const snapshot = await withTimeout(getDocs(colRef), 1000);
      if (!snapshot.empty) {
        const firestoreEvents: CyberEvent[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as CyberEvent;
          firestoreEvents.push({ ...data, id: docSnap.id });
        });
        if (firestoreEvents.length > 0) {
          writeLocalEvents(firestoreEvents);
          return sortEvents(firestoreEvents);
        }
      }
    } catch (err: any) {
      const msg = err?.message || String(err);
      if (msg.includes("PERMISSION_DENIED") || msg.includes("has not been used") || msg.includes("timed out")) {
        firestoreAvailable = false;
      }
      console.warn("[eventsStorage] Firestore getDocs unavailable, using local storage:", msg);
    }
  }

  return sortEvents(local);
}

/**
 * Fetch single event by ID
 */
export async function getEventById(id: string): Promise<CyberEvent | null> {
  const all = readLocalEvents();
  const found = all.find((e) => e.id === id);
  if (found) return found;

  if (isFirebaseConfigured && db && firestoreAvailable) {
    try {
      const docRef = doc(db, "events", id);
      const snap = await withTimeout(getDoc(docRef), 1000);
      if (snap.exists()) {
        return { ...(snap.data() as CyberEvent), id: snap.id };
      }
    } catch (err: any) {
      const msg = err?.message || String(err);
      if (msg.includes("PERMISSION_DENIED") || msg.includes("has not been used")) {
        firestoreAvailable = false;
      }
      console.warn("[eventsStorage] Firestore getDoc error:", msg);
    }
  }

  return null;
}

/**
 * Create or update an event (Immediately saves to local JSON without blocking, then syncs Firestore in background)
 */
export async function saveEvent(eventData: Partial<CyberEvent>): Promise<CyberEvent> {
  const existingId = eventData.id;
  const id = existingId && existingId.trim() !== "" ? existingId : `evt_${Date.now()}`;
  const now = new Date().toISOString();

  const fullEvent: CyberEvent = {
    id,
    title: eventData.title || "Untitled Event",
    date: eventData.date || new Date().toISOString().split("T")[0],
    time: eventData.time || "10:00 AM - 01:00 PM",
    venue: eventData.venue || "Central Computer Center (CCC), SATI Campus",
    mode: eventData.mode || "On-Campus",
    description: eventData.description || "",
    longDescription: eventData.longDescription || "",
    image: eventData.image || (Array.isArray(eventData.images) && eventData.images.length > 0 ? eventData.images[0] : ""),
    images: Array.isArray(eventData.images)
      ? eventData.images.slice(0, 10)
      : eventData.image
      ? [eventData.image]
      : [],
    organizer: eventData.organizer || "Cyber Cell SATI",
    registrationLink: eventData.registrationLink || "",
    status: eventData.status || "Upcoming",
    category: eventData.category || "Workshop",
    featured: Boolean(eventData.featured),
    tags: Array.isArray(eventData.tags) ? eventData.tags : [],
    capacity: eventData.capacity || "",
    prerequisites: eventData.prerequisites || "",
    toolsRequired: eventData.toolsRequired || "",
    agenda: eventData.agenda || "",
    speakers: Array.isArray(eventData.speakers) ? eventData.speakers : [],
    createdAt: eventData.createdAt || now,
    updatedAt: now,
  };

  // 1. Save to local JSON immediately (instant, guaranteed, never hangs)
  const current = readLocalEvents();
  const existingIdx = current.findIndex((e) => e.id === id);
  if (existingIdx >= 0) {
    current[existingIdx] = fullEvent;
  } else {
    current.unshift(fullEvent);
  }
  writeLocalEvents(current);

  // 2. Fire-and-forget sync to Firestore in background (non-blocking)
  if (isFirebaseConfigured && db && firestoreAvailable) {
    withTimeout(setDoc(doc(db, "events", id), fullEvent, { merge: true }), 1200)
      .catch((err: any) => {
        const msg = err?.message || String(err);
        if (msg.includes("PERMISSION_DENIED") || msg.includes("has not been used") || msg.includes("timed out")) {
          firestoreAvailable = false;
        }
        console.warn("[eventsStorage] Firestore setDoc background sync skipped:", msg);
      });
  }

  return fullEvent;
}

/**
 * Delete an event by ID
 */
export async function deleteEvent(id: string): Promise<boolean> {
  let success = false;

  // 1. Delete from local JSON immediately
  const current = readLocalEvents();
  const filtered = current.filter((e) => e.id !== id);
  if (filtered.length !== current.length) {
    writeLocalEvents(filtered);
    success = true;
  }

  // 2. Delete from Firestore in background (non-blocking)
  if (isFirebaseConfigured && db && firestoreAvailable) {
    withTimeout(deleteDoc(doc(db, "events", id)), 1200)
      .catch((err: any) => {
        const msg = err?.message || String(err);
        if (msg.includes("PERMISSION_DENIED") || msg.includes("has not been used")) {
          firestoreAvailable = false;
        }
        console.warn("[eventsStorage] Firestore deleteDoc background sync skipped:", msg);
      });
  }

  return success;
}

/**
 * Helper to sort events: Upcoming first, then by date descending
 */
function sortEvents(events: CyberEvent[]): CyberEvent[] {
  const statusWeight: Record<string, number> = {
    Live: 0,
    Upcoming: 1,
    Tentative: 2,
    Completed: 3,
  };

  return [...events].sort((a, b) => {
    const weightA = statusWeight[a.status] ?? 2;
    const weightB = statusWeight[b.status] ?? 2;
    if (weightA !== weightB) return weightA - weightB;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
