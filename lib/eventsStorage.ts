import fs from "fs";
import path from "path";
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { CyberEvent, upcomingEvents as staticUpcoming } from "@/data/events";

const EVENTS_FILE = path.join(process.cwd(), "data", "events.json");

function readLocalEvents(): CyberEvent[] {
  try {
    if (fs.existsSync(EVENTS_FILE)) {
      const raw = fs.readFileSync(EVENTS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
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
 * Fetch all events (Firestore prioritized with local JSON fallback)
 */
export async function getAllEvents(): Promise<CyberEvent[]> {
  let firestoreEvents: CyberEvent[] = [];
  let firestoreSuccess = false;

  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "events");
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as CyberEvent;
          firestoreEvents.push({ ...data, id: docSnap.id });
        });
        firestoreSuccess = true;
      }
    } catch (err) {
      console.warn("[eventsStorage] Firestore getDocs error, using local fallback:", err);
    }
  }

  if (firestoreSuccess && firestoreEvents.length > 0) {
    // Sync to local JSON as backup
    writeLocalEvents(firestoreEvents);
    return sortEvents(firestoreEvents);
  }

  const local = readLocalEvents();
  return sortEvents(local);
}

/**
 * Fetch single event by ID
 */
export async function getEventById(id: string): Promise<CyberEvent | null> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "events", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { ...(snap.data() as CyberEvent), id: snap.id };
      }
    } catch (err) {
      console.warn("[eventsStorage] Firestore getDoc error:", err);
    }
  }

  const all = readLocalEvents();
  return all.find((e) => e.id === id) || null;
}

/**
 * Create or update an event
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

  // 1. Save to Firestore if available
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "events", id);
      await setDoc(docRef, fullEvent, { merge: true });
    } catch (err) {
      console.warn("[eventsStorage] Firestore setDoc error:", err);
    }
  }

  // 2. Save to local JSON
  const current = readLocalEvents();
  const existingIdx = current.findIndex((e) => e.id === id);
  if (existingIdx >= 0) {
    current[existingIdx] = fullEvent;
  } else {
    current.unshift(fullEvent);
  }
  writeLocalEvents(current);

  return fullEvent;
}

/**
 * Delete an event by ID
 */
export async function deleteEvent(id: string): Promise<boolean> {
  let success = false;

  // 1. Delete from Firestore if available
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "events", id);
      await deleteDoc(docRef);
      success = true;
    } catch (err) {
      console.warn("[eventsStorage] Firestore deleteDoc error:", err);
    }
  }

  // 2. Delete from local JSON
  const current = readLocalEvents();
  const filtered = current.filter((e) => e.id !== id);
  if (filtered.length !== current.length) {
    writeLocalEvents(filtered);
    success = true;
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
