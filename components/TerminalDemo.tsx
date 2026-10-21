"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, CheckCircle2 } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "system";
  content: string | React.ReactNode;
}

export default function TerminalDemo() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "system",
      content: "Cyber Cell SATI [Version 2.4.0-campus.ops]\n(c) 2026 Cyber Cell, SATI Vidisha. All rights reserved.\nType 'help' or click quick commands below to explore."
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current && history.length > 1) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [{ type: "input", content: `$ ${cmd}` }];

    if (trimmed === "") {
      setHistory((prev) => [...prev, ...newLines]);
      return;
    }

    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    switch (trimmed) {
      case "help":
        newLines.push({
          type: "output",
          content: (
            <div className="space-y-1.5 font-mono text-xs text-slate-300">
              <div className="text-amber-400 font-bold mb-1">Available operational commands:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                <div><span className="text-amber-300 font-bold">about</span> : Institutional mission &amp; charter</div>
                <div><span className="text-amber-300 font-bold">domains</span> : 5 trending curriculum tracks</div>
                <div><span className="text-amber-300 font-bold">events</span> : Current operational schedule</div>
                <div><span className="text-amber-300 font-bold">team</span> : Leadership &amp; faculty coordinator</div>
                <div><span className="text-amber-300 font-bold">roadmap</span> : 6-stage student progression path</div>
                <div><span className="text-amber-300 font-bold">projects</span> : Active tools &amp; repositories</div>
                <div><span className="text-amber-300 font-bold">flag</span> : Capture the secret campus flag</div>
                <div><span className="text-amber-300 font-bold">clear</span> : Flush terminal screen</div>
              </div>
            </div>
          )
        });
        break;

      case "about":
        newLines.push({
          type: "output",
          content:
            "Cyber Cell is the official Cybersecurity Club at Samrat Ashok Technological Institute (SATI), Vidisha. Dedicated to ethical security, hands-on defense labs, CTF qualifiers, and defensive engineering."
        });
        break;

      case "domains":
        newLines.push({
          type: "output",
          content:
            "Top 5 Trending Security Tracks:\n1. Ethical Hacking & Red Teaming\n2. Web Application Defense (OWASP)\n3. Network & Cloud Infrastructure\n4. Competitive CTF & Wargames\n5. Digital Forensics & Incident Response\nVisit /domains for syllabi and toolchains."
        });
        break;

      case "events":
        newLines.push({
          type: "output",
          content:
            "[OPERATIONS STATUS]: Concluded: EXPLOIT — Intro to the Cyber Range (16 OCT 2026 at SATI Vidisha, 160 attended). Visit /events to inspect declassified recap & photos."
        });
        break;

      case "team":
        newLines.push({
          type: "output",
          content:
            "[LEADERSHIP ROSTER]:\n- Yash Harfode (Founder & Convenor)\n- Faculty Club Coordinator: Prof. Shivangi Jain (CSE Dept, SATI Vidisha)\n- Krishna Mishra (Co-Convenor & Security Lead)\n- Core Team: Anubhav Vishwkarma, Abhishek Mahore, Arya Mishra, Ansh Kushwaha, Medhavi Sharma.\nVisit /team for the interactive hierarchy dock."
        });
        break;

      case "roadmap":
        newLines.push({
          type: "output",
          content:
            "6-Stage Student Roadmap:\n01. Architecture -> 02. Networking -> 03. Linux CLI -> 04. Scripting -> 05. Web Security -> 06. Cyber Ranges."
        });
        break;

      case "projects":
        newLines.push({
          type: "output",
          content:
            "Active Student Repositories:\n- SentinelScan (Python Subnet Scanner)\n- RangeCTF Platform (Jeopardy Scoreboard)\n- VulnLab Docker (Safe Web Range)\n- PacketPulse (Network Forensics Triage)"
        });
        break;

      case "flag":
        newLines.push({
          type: "output",
          content: (
            <div className="p-3 my-1 rounded-xl bg-amber-400/15 border-2 border-dashed border-amber-400/50 text-amber-300 font-mono font-bold shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              FLAG FOUND: CYBER&#123;CURIOSITY_TODAY_SAFER_TOMORROW_2026&#125;
            </div>
          )
        });
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        newLines.push({
          type: "output",
          content: `Command not found: '${trimmed}'. Type 'help' to inspect supported commands.`
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInputVal("");
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(cmdHistory[nextIndex]);
        }
      }
    }
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#030303] border-b border-white/[0.08] overflow-hidden select-none">
      
      {/* Background Subtle Amber Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.02),transparent)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-amber-400 uppercase">
              INTERACTIVE CLI &bull; SIMULATED LAB
            </span>
            <span className="w-8 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Simulated Security <span className="text-amber-400">Shell.</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-light max-w-xl mx-auto leading-relaxed">
            Interact with Cyber Cell SATI’s virtual environment directly in your browser. Click commands or type below.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="rounded-[28px] border border-amber-400/30 bg-gradient-to-b from-[#0c0904] via-[#070603] to-[#030201] shadow-[0_25px_70px_rgba(245,158,11,0.08)] overflow-hidden cursor-text"
        >
          {/* Title Bar (Zero Red • Pure Amber Obsidian Dots) */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0a0805] border-b border-white/[0.08] select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white/20 shrink-0" />
              <span className="w-3 h-3 rounded-full bg-amber-500/60 shrink-0" />
              <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              
              <span className="ml-3 text-[11px] sm:text-xs font-mono text-slate-300 flex items-center gap-2 truncate">
                <TerminalIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">guest@sati-cybercell:~</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>LIVE VIRTUAL SH</span>
            </div>
          </div>

          {/* Terminal Console Output & Input Area */}
          <div 
            ref={terminalBodyRef}
            className="p-5 sm:p-7 font-mono text-xs sm:text-sm min-h-[260px] max-h-[380px] overflow-y-auto space-y-3 selection:bg-amber-400/30 selection:text-white"
          >
            {history.map((line, idx) => (
              <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                {line.type === "input" && (
                  <span className="text-white font-bold">{line.content}</span>
                )}
                {line.type === "system" && (
                  <span className="text-slate-400">{line.content}</span>
                )}
                {line.type === "output" && (
                  <div className="text-slate-200 mt-1">{line.content}</div>
                )}
              </div>
            ))}

            {/* Live Prompt Line */}
            <div className="flex items-center gap-2 pt-1 text-slate-200">
              <span className="text-amber-400 font-black">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (or click below)..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 font-mono text-xs sm:text-sm"
                autoComplete="off"
                spellCheck="false"
              />
              <CornerDownLeft className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            </div>
          </div>

          {/* Bottom Quick Command Pills (One-Click Mobile Friendly) */}
          <div className="px-5 py-3.5 bg-black/60 border-t border-white/[0.08] flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="text-slate-500 text-[10px] uppercase font-bold mr-1">Quick execute:</span>
            {["help", "about", "domains", "events", "team", "roadmap", "projects", "flag", "clear"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(c);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-amber-400 hover:text-black border border-white/[0.08] hover:border-amber-400 text-slate-300 font-bold transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
              >
                {c}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}