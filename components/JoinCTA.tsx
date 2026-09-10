import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JoinCTA() {
  return (
    <section className="relative py-20 bg-[#07090e] border-b border-white/[0.07] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-y border-white/[0.08]">
          
          {/* Left Text */}
          <div className="max-w-xl">
            <span className="text-xs font-mono font-medium tracking-widest text-slate-400 uppercase block mb-2">
              BE A PART OF THE CHANGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Join Cyber Cell
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Bring your curiosity. Build your skills. Make an impact.
            </p>
          </div>

          {/* Right Action buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 shrink-0">
            <Link
              href="/join"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg border border-[#38bdf8]/60 bg-[#0ea5e9]/10 hover:bg-[#0ea5e9]/20 hover:border-[#38bdf8] text-white font-medium text-sm transition-colors"
            >
              <span>Join Now</span>
              <ArrowRight className="w-4 h-4 text-[#38bdf8] transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/about"
              className="text-xs text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Or learn more about the process
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
