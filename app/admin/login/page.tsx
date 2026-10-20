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
      }, 500);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col justify-between p-4 sm:p-8 selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full pt-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-white">
              CYBER CELL
            </span>
            <span className="text-[10px] font-mono text-slate-500 block">SATI VIDISHA</span>
          </div>
        </Link>

        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase border border-white/10 px-2.5 py-1 rounded-full">
          RESTRICTED GATEWAY
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-12">
        <div className="relative rounded-2xl bg-gradient-to-b from-[#0e1626] to-[#070b13] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Subtle Top Light Accent */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          {/* Header Icon */}
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
            Admin Panel Login
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed mb-6 font-mono">
            Enter the authorized master admin password to access the Certificate Studio & Registry.
          </p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs mb-4 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs mb-4">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Access granted. Initializing Studio...</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                Admin Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter admin password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#050810] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/60 transition-colors font-mono"
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
              className="w-full py-2.5 rounded-xl bg-[#27446b] hover:bg-[#315383] text-white text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/20 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Access Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/[0.06] text-center text-[10px] font-mono text-slate-500">
            Official SATI Cyber Cell Core Team System
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] font-mono text-slate-600 pb-4">
        &copy; {new Date().getFullYear()} Cyber Cell &bull; Samrat Ashok Technological Institute, Vidisha
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#06080d] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
