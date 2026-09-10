"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut,
  UserCredential
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { syncUserProfile, getUserProfile, UserProfile } from "@/lib/firestore";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  isAuthModalOpen: boolean;
  authModalReason: string;
  openAuthModal: (reason?: string, onComplete?: () => void) => void;
  closeAuthModal: () => void;
  requireAuth: (action: () => void, reason?: string) => void;
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithEmail: (email: string, pass: string) => Promise<UserCredential>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth Modal State & Callback
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState("");
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          await syncUserProfile(currentUser);
          const p = await getUserProfile(currentUser.uid);
          setProfile(p);
        } catch (err) {
          console.warn("Could not sync user profile:", err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (reason: string = "", onComplete?: () => void) => {
    setAuthModalReason(reason);
    if (onComplete) {
      setPendingCallback(() => onComplete);
    } else {
      setPendingCallback(null);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalReason("");
    setPendingCallback(null);
  };

  const handleAuthSuccess = () => {
    if (pendingCallback) {
      pendingCallback();
    }
    closeAuthModal();
  };

  const requireAuth = (action: () => void, reason: string = "Sign in to continue") => {
    if (user) {
      action();
    } else {
      openAuthModal(reason, action);
    }
  };

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase API key is not configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY in .env.local.");
    }
    const provider = new GoogleAuthProvider();
    // Prompt account selection
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, provider);
    await syncUserProfile(result.user);
    handleAuthSuccess();
    return result;
  };

  const signInWithEmail = async (email: string, pass: string) => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase API key is not configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY in .env.local.");
    }
    const result = await signInWithEmailAndPassword(auth, email, pass);
    await syncUserProfile(result.user);
    handleAuthSuccess();
    return result;
  };

  const signUpWithEmail = async (email: string, pass: string, displayName: string) => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase API key is not configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY in .env.local.");
    }
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    if (displayName.trim()) {
      await updateProfile(result.user, { displayName: displayName.trim() });
    }
    await syncUserProfile(result.user, { displayName: displayName.trim() });
    handleAuthSuccess();
    return result;
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    }
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isConfigured: isFirebaseConfigured,
        isAuthModalOpen,
        authModalReason,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
