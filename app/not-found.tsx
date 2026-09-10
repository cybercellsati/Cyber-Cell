import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase">
              404 // ROUTE_NOT_FOUND
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Lost in Cyberspace
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              The requested node or coordinate does not exist on the Cyber Cell network.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#27446b] hover:bg-[#315383] border border-white/15 text-xs font-medium text-white transition-all shadow-sm"
            >
              <Home className="w-4 h-4" />
              <span>Return to Headquarters</span>
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Team</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
