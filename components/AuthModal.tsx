"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react";

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalReason, 
    isConfigured,
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail 
  } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in cancelled.");
      } else if (err.code === "auth/unauthorized-domain") {
        setError("This domain is not authorized in Firebase Console. Please add localhost to Authorized Domains.");
      } else if (err.code === "auth/invalid-api-key" || err.message?.includes("invalid-api-key") || err.message?.includes("not configured")) {
        setError("Firebase is not configured yet. Add NEXT_PUBLIC_FIREBASE_API_KEY to your .env.local file.");
      } else {
        setError(err.message || "Failed to sign in with Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "signup") {
        if (!name.trim()) {
          setError("Please enter your full name.");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters long.");
          setLoading(false);
          return;
        }
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Try signing in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/invalid-api-key" || err.message?.includes("invalid-api-key") || err.message?.includes("not configured")) {
        setError("Firebase is not configured yet. Add NEXT_PUBLIC_FIREBASE_API_KEY to your .env.local file.");
      } else {
        setError(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div 
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-black/80 to-black/90 -z-10" 
        onClick={closeAuthModal} 
      />

      {/* Outer Glow Wrapper */}
      <div className="relative w-full max-w-[460px] mx-auto">
        {/* Soft atmospheric blue rim glow behind modal */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/25 via-cyan-500/15 to-blue-700/25 rounded-[38px] blur-xl opacity-80 pointer-events-none" />

        {/* Modal Card */}
        <div className="relative w-full bg-[#12151d]/95 border border-white/[0.08] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),_0_0_50px_rgba(30,58,138,0.25)] rounded-[32px] sm:rounded-[36px] p-7 sm:p-10 backdrop-blur-2xl z-10">
          
          {/* Subtle Top Specular Highlight */}
          <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.09] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center mb-7">
            {authModalReason ? (
              <div className="mb-3 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 inline-flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-[11px] font-mono text-blue-300 font-medium">{authModalReason}</span>
              </div>
            ) : null}

            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {mode === "signin" ? "Log in" : "Sign up"}
            </h2>
            <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed mt-2.5 max-w-[340px] mx-auto">
              {mode === "signin"
                ? "Log in to your account and seamlessly continue managing your projects, ideas, and progress just where you left off."
                : "Create an account to join SATI's premier student cybersecurity community and access resources."}
            </p>
          </div>

          {/* Firebase Config Notice */}
          {!isConfigured && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div className="leading-relaxed">
                <span className="font-semibold text-amber-200">Firebase Setup Required:</span> Add your Firebase keys in <code className="bg-black/40 px-1 py-0.5 rounded text-amber-200 font-mono">.env.local</code> to enable authentication.
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {mode === "signup" && (
              <div className="relative flex items-center w-full rounded-full bg-[#0b0e15] border border-slate-700/60 focus-within:border-blue-500/80 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all px-4 py-3 sm:py-3.5">
                <User className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-3" />
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            )}

            {/* Email Input Pill */}
            <div className="relative flex items-center w-full rounded-full bg-[#0b0e15] border border-slate-700/60 focus-within:border-blue-500/80 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all px-4 py-3 sm:py-3.5">
              <Mail className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-3" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Password Input Pill */}
            <div className="relative flex items-center w-full rounded-full bg-[#0b0e15] border border-slate-700/60 focus-within:border-blue-500/80 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all px-4 py-3 sm:py-3.5">
              <Lock className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-blue-500 hover:text-blue-400 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Submit Button Pill */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full py-3.5 sm:py-4 px-6 bg-[#212634] hover:bg-[#2c3345] text-white text-sm sm:text-base font-medium transition-all duration-200 shadow-md active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                    <span>Please wait...</span>
                  </span>
                ) : (
                  <span>{mode === "signin" ? "Log in" : "Sign up"}</span>
                )}
              </button>
            </div>
          </form>

          {/* Social Auth Providers Row */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-5">
            {/* Facebook Button */}
            <button
              type="button"
              onClick={() => {
                setError("Facebook sign-in is not yet enabled. Please use Google or Email.");
              }}
              className="rounded-full py-2.5 px-3 bg-[#131620] hover:bg-[#1c2130] border border-white/[0.08] hover:border-white/20 text-xs sm:text-[13px] font-medium text-slate-300 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="rounded-full py-2.5 px-3 bg-[#131620] hover:bg-[#1c2130] border border-white/[0.08] hover:border-white/20 text-xs sm:text-[13px] font-medium text-slate-300 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            {/* Apple Button */}
            <button
              type="button"
              onClick={() => {
                setError("Apple sign-in is not yet enabled. Please use Google or Email.");
              }}
              className="rounded-full py-2.5 px-3 bg-[#131620] hover:bg-[#1c2130] border border-white/[0.08] hover:border-white/20 text-xs sm:text-[13px] font-medium text-slate-300 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.71-.93 2.73 1.01.08 2.02-.48 2.64-1.23z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Switch Mode Footer */}
          <div className="mt-7 text-center text-xs sm:text-sm text-slate-400">
            {mode === "signin" ? (
              <p>
                Didn&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError(null);
                  }}
                  className="text-blue-500 hover:text-blue-400 font-medium hover:underline transition-colors"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setError(null);
                  }}
                  className="text-blue-500 hover:text-blue-400 font-medium hover:underline transition-colors"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
