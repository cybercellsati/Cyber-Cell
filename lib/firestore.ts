import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  orderBy,
  Timestamp 
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: "member" | "lead" | "admin";
  scholarNumber?: string;
  branch?: string;
  year?: string;
  createdAt: Timestamp | ReturnType<typeof serverTimestamp>;
  lastLoginAt: Timestamp | ReturnType<typeof serverTimestamp>;
}

export interface ClubApplication {
  id?: string;
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  branch: string;
  year: string;
  scholarNumber: string;
  interests: string[];
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  motivation: string;
  githubProfile: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: Timestamp | ReturnType<typeof serverTimestamp>;
}

export interface EventRegistration {
  id?: string;
  userId: string;
  userEmail: string;
  userName?: string;
  eventId: string;
  eventTitle: string;
  registeredAt: Timestamp | ReturnType<typeof serverTimestamp>;
}

/**
 * Creates or updates the user profile document in Firestore
 */
export async function syncUserProfile(
  user: { uid: string; email: string | null; displayName: string | null; photoURL: string | null },
  extraData: Partial<UserProfile> = {}
): Promise<void> {
  if (!isFirebaseConfigured || !user.uid) return;
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "member",
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      ...extraData,
    });
  } else {
    await setDoc(
      userRef,
      {
        lastLoginAt: serverTimestamp(),
        ...(user.displayName ? { displayName: user.displayName } : {}),
        ...(user.photoURL ? { photoURL: user.photoURL } : {}),
        ...extraData,
      },
      { merge: true }
    );
  }
}

/**
 * Fetches user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!isFirebaseConfigured || !uid) return null;
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
  return null;
}

/**
 * Submits a new club membership application
 */
export async function submitClubApplication(
  application: Omit<ClubApplication, "status" | "submittedAt">
): Promise<string> {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY to your .env.local file to submit applications.");
  }
  const applicationsRef = collection(db, "applications");
  const docRef = await addDoc(applicationsRef, {
    ...application,
    status: "pending",
    submittedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Fetches all applications for a given user
 */
export async function getUserApplications(userId: string): Promise<ClubApplication[]> {
  if (!isFirebaseConfigured || !userId) return [];
  try {
    const q = query(
      collection(db, "applications"),
      where("userId", "==", userId),
      orderBy("submittedAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ClubApplication));
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return [];
  }
}

/**
 * Registers an authenticated user for an event / hackathon
 */
export async function registerForEvent(
  registration: Omit<EventRegistration, "registeredAt">
): Promise<string> {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY to your .env.local file to register for events.");
  }
  const regRef = collection(db, "event_registrations");
  const docRef = await addDoc(regRef, {
    ...registration,
    registeredAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Checks if user is registered for a given event
 */
export async function isUserRegisteredForEvent(userId: string, eventId: string): Promise<boolean> {
  if (!isFirebaseConfigured || !userId) return false;
  try {
    const q = query(
      collection(db, "event_registrations"),
      where("userId", "==", userId),
      where("eventId", "==", eventId)
    );
    const snap = await getDocs(q);
    return !snap.empty;
  } catch (error) {
    console.error("Error checking event registration:", error);
    return false;
  }
}
