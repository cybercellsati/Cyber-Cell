import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Shield, ShieldAlert, BookOpen, Compass, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Cyber Cell | SATI Vidisha",
  description: "Learn about the mission, charter, and ethical principles of Cyber Cell under the Central Coding Club at Samrat Ashok Technological Institute, Vidisha."
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 cyber-grid">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00e5ff] uppercase block mb-2">
              FOUNDATIONAL CHARTER
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              About Cyber Cell SATI
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              The official cybersecurity wing operating under the Central Coding Club at 
              Samrat Ashok Technological Institute (SATI), Vidisha.
            </p>
          </div>

          {/* Visual Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] aspect-[21/9] w-full bg-[#0a0d14]">
            <Image
              src="/images/about-lab.jpg"
              alt="Cyber Cell research center"
              fill
              className="object-cover opacity-75"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="text-xs font-mono text-[#00e5ff] bg-[#06080d]/80 px-3 py-1.5 rounded-lg border border-white/[0.1]">
                DISCOVER &bull; DEFEND &bull; DEVELOP
              </span>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                Est. Central Coding Club Wing
              </span>
            </div>
          </div>

          {/* Story & Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0e16] border border-white/[0.08] space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#00e5ff]" />
                Our Institutional Roots
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Founded to provide engineering students at SATI with a focused, hands-on environment 
                for offensive and defensive computing, Cyber Cell operates under the leadership of the 
                Central Coding Club.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                While traditional computer science programs focus heavily on software engineering 
                and data structures, modern systems fail at the seams—where network protocols, 
                memory management, and web architectures intersect with security flaws. Cyber Cell 
                fills this crucial gap through structured peer-learning tracks.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0e16] border border-white/[0.08] space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#00e5ff]" />
                The 5-Stage Philosophy
              </h2>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
                  <span className="text-[#00e5ff] font-mono font-bold">01. LEARN</span>
                  <span className="text-slate-300">Master underlying protocol and system mechanics.</span>
                </div>
                <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
                  <span className="text-[#00e5ff] font-mono font-bold">02. PRACTICE</span>
                  <span className="text-slate-300">Solve legal lab environments (TryHackMe/HTB).</span>
                </div>
                <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
                  <span className="text-[#00e5ff] font-mono font-bold">03. BUILD</span>
                  <span className="text-slate-300">Engineer defense tools, scripts, and scanners.</span>
                </div>
                <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
                  <span className="text-[#00e5ff] font-mono font-bold">04. COMPETE</span>
                  <span className="text-slate-300">Represent SATI in national & global CTF events.</span>
                </div>
                <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
                  <span className="text-[#00e5ff] font-mono font-bold">05. SECURE</span>
                  <span className="text-slate-300">Spread digital hygiene and protect our campus.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code of Ethics & Responsible Disclosure */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0e16] border border-white/[0.08] space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              Code of Ethics & Responsible Disclosure
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every member of Cyber Cell operates under strict adherence to the Information Technology Act (India), 
              the SATI Student Code of Conduct, and internationally accepted ethical hacking tenets:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <li className="flex items-start gap-2 p-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>Zero unauthorized testing on SATI servers or external systems without explicit written consent.</span>
              </li>
              <li className="flex items-start gap-2 p-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>All offensive techniques are executed exclusively in isolated virtual containers or approved wargames.</span>
              </li>
              <li className="flex items-start gap-2 p-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>Any discovered institutional security anomalies must be reported privately to faculty advisors.</span>
              </li>
              <li className="flex items-start gap-2 p-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>Protection of privacy, confidentiality, and institutional reputation at all times.</span>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div id="contact" className="p-6 sm:p-8 rounded-2xl bg-[#0a0e16] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Get in Touch with Cyber Cell</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Department of Computer Science & Engineering, SATI Campus, Vidisha, Madhya Pradesh.
              </p>
            </div>
            <Link
              href="/join"
              className="px-5 py-2.5 rounded-lg bg-[#00e5ff] text-black font-semibold text-xs sm:text-sm hover:bg-[#22d3ee] transition-colors shrink-0"
            >
              Apply to Join
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
