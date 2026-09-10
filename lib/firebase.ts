import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Check whether a valid Firebase API key is configured
const rawApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
export const isFirebaseConfigured = Boolean(
  rawApiKey &&
  !rawApiKey.startsWith("YOUR_") &&
  !rawApiKey.includes("placeholder") &&
  !rawApiKey.includes("MockApiKey")
);

// Fallback dummy credentials to prevent getAuth(app) from crashing during SSR / module evaluation
// if the developer has not yet populated .env.local
const fallbackApiKey = "AIzaSy_CyberCell_DevelopmentPlaceholderKey0";

const firebaseConfig = {
  apiKey: isFirebaseConfigured ? rawApiKey! : fallbackApiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "cyber-cell-d0258.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "cyber-cell-d0258",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "cyber-cell-d0258.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "100344904262",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:100344904262:web:3a7bf2270a0424dbe9a847",
};

// Initialize Firebase safely for Next.js SSR / Fast Refresh
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export default app;
