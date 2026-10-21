"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Lock, Key, ArrowRight, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = searchParams.get("from") || "/admin";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed. Check your password.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(destination);
      }, 400);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-amber-400/25 selection:text-white relative overflow-hidden">
      
      {/* Ambient Warm Golden Amber Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full pt-2 sm:pt-4 relative z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold tracking-wider text-white">
                CYBER CELL
              </span>
              <span className="text-[10px] font-mono text-amber-400 font-semibold">&bull; SATI</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 block">SATI VIDISHA</span>
          </div>
        </Link>

        <span className="text-[10px] font-mono tracking-widest text-amber-400/90 uppercase border border-amber-400/20 bg-amber-400/[0.04] px-3 py-1 rounded-full">
          RESTRICTED GATEWAY
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8 sm:my-12 relative z-10">
        <div className="relative rounded-3xl bg-[#080808]/90 border border-white/[0.08] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          
          {/* Subtle Top Golden Accent */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

          {/* Header Icon */}
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1 mb-6">
            <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-amber-400">
              Operations Control
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Admin Gateway
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed font-mono pt-1">
              Authenticate with the master key to access Certificate Studio and Event Publishing operations.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs mb-5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs mb-5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Access verified. Initializing dashboard...</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                Admin Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter authorized password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-black/60 border border-white/[0.1] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/30 transition-all font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.3)] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Enter Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>SATI CYBER CELL CORE</span>
            <span className="text-amber-400/70">AUTHORIZED ONLY</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] font-mono text-slate-500 pb-2 relative z-10">
        &copy; {new Date().getFullYear()} Cyber Cell &bull; Samrat Ashok Technological Institute, Vidisha
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030303] flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
