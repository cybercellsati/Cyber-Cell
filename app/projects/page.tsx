import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projectsData } from "@/data/projects";
import Link from "next/link";
import { FolderGit2, Code, GitFork, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Projects & Tooling | Cyber Cell SATI",
  description: "Explore technical security projects, tools, and research created by Cyber Cell members at SATI Vidisha."
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 cyber-grid">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00e5ff] uppercase block mb-2">
              TECHNICAL REPOSITORIES
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Projects & Engineering
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Open source tools, defensive utilities, CTF challenge authoring, 
              and cybersecurity research developed by students of SATI.
            </p>
          </div>

          {/* Projects Content: Real or Truthful Empty State */}
          {projectsData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project cards when real repos exist */}
            </div>
          ) : (
            <div className="p-8 sm:p-14 rounded-2xl bg-[#0a0e16] border border-white/[0.08] text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#00e5ff] mx-auto mb-4">
                <FolderGit2 className="w-7 h-7 opacity-80" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Projects are currently being developed.
              </h2>

              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
                Check back soon. Student development groups under the Central Coding Club 
                are working on vulnerability scanners, packet dissection tools, and challenge containers.
              </p>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-left max-w-lg mx-auto space-y-2 mb-8">
                <div className="text-xs font-mono font-semibold text-[#00e5ff] flex items-center gap-2">
                  <GitFork className="w-4 h-4" />
                  Upcoming Project Tracks in Development:
                </div>
                <ul className="text-xs text-slate-300 space-y-1 font-mono pl-4 list-disc list-inside">
                  <li>SATI CTF Challenge Platform & Wargames Engine</li>
                  <li>Campus Network Vulnerability Audit Scripts (Educational)</li>
                  <li>Phishing Awareness & Simulation Portal</li>
                  <li>Automated Log Analysis & Threat Intelligence Ingestor</li>
                </ul>
              </div>

              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#00e5ff] text-black font-semibold text-xs sm:text-sm hover:bg-[#22d3ee] transition-colors"
              >
                <Code className="w-4 h-4" />
                <span>Join a Project Working Group</span>
              </Link>
            </div>
          )}

          {/* Project Contribution Guidelines */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0e16] border border-white/[0.08] space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00e5ff]" />
              Project Submission & Open Source Policy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[#00e5ff] font-mono block mb-1 font-bold">1. Clean Code & Ethics</span>
                All repositories must be strictly defensive, educational, or authorized security tooling with standard open-source licenses (MIT/Apache).
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[#00e5ff] font-mono block mb-1 font-bold">2. Peer Review</span>
                Projects must undergo technical code review by Cyber Cell leads before official inclusion in the organization showcase.
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[#00e5ff] font-mono block mb-1 font-bold">3. Documentation</span>
                Every project must provide comprehensive README setup instructions, architecture diagrams, and testing guides.
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
