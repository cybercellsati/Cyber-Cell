"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "system";
  content: string | React.ReactNode;
}

export default function TerminalDemo() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "system",
      content: "Cyber Cell SATI [Version 1.0.0-sati.lab]\n(c) 2025 Cyber Cell under Central Coding Club, SATI Vidisha.\nType 'help' to see available simulated commands."
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Only scroll the internal terminal container, NEVER the whole page
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
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <div className="text-[#00e5ff] font-semibold mb-1">Available simulated commands:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                <div><span className="text-white font-bold">about</span> : Learn about Cyber Cell SATI</div>
                <div><span className="text-white font-bold">domains</span> : Explore 8 core security domains</div>
                <div><span className="text-white font-bold">events</span> : View official event status</div>
                <div><span className="text-white font-bold">team</span> : View organizational structure</div>
                <div><span className="text-white font-bold">roadmap</span> : View 9-stage student roadmap</div>
                <div><span className="text-white font-bold">resources</span> : Inspect verified learning links</div>
                <div><span className="text-white font-bold">flag</span> : Discover the hidden flag</div>
                <div><span className="text-white font-bold">clear</span> : Clear terminal screen</div>
              </div>
            </div>
          )
        });
        break;

      case "about":
        newLines.push({
          type: "output",
          content:
            "Cyber Cell is the official Cybersecurity Club under the Central Coding Club at Samrat Ashok Technological Institute (SATI), Vidisha. Focused on ethical security, practical hands-on labs, CTFs, and defensive engineering."
        });
        break;

      case "domains":
        newLines.push({
          type: "output",
          content:
            "Cyber Cell 8 Focus Domains:\n1. Ethical Hacking\n2. Network Security\n3. Web Security\n4. Malware Analysis\n5. Digital Forensics\n6. CTF & Competitions\n7. Security Awareness\n8. Career & Skill Development\nVisit /domains for syllabi and toolchains."
        });
        break;

      case "events":
        newLines.push({
          type: "output",
          content:
            "[EVENTS STATUS]: No events announced yet. Real dates will be published once officially finalized by SATI Central Coding Club."
        });
        break;

      case "team":
        newLines.push({
          type: "output",
          content:
            "[LEADERSHIP & TEAM]:\n- Yash Harfode (Founder & Convenor)\n- Faculty Advisor: Prof. Shivangi Jain (CSE Dept, SATI Vidisha)\n- Krishna Mishra (Co-Convenor)\n- Core Team: Anubhav Vishwkarma (Tech Head), Abhishek Mahore (Media Head), Arya Mishra (Design Head), Ansh Kushwaha (Management Head), Medhavi Sharma (Docs Head)\nVisit /team for the complete organizational structure."
        });
        break;

      case "roadmap":
        newLines.push({
          type: "output",
          content:
            "9-Stage Student Roadmap:\n01. Computer Fundamentals -> 02. Networking -> 03. Linux -> 04. Programming -> 05. Web Fundamentals -> 06. Cybersecurity Foundations -> 07. Practical Security -> 08. CTFs & Labs -> 09. Specialization."
        });
        break;

      case "resources":
        newLines.push({
          type: "output",
          content:
            "Top Recommended Starting Platforms:\n- Linux: linuxjourney.com\n- Web Sec: portswigger.net/web-security\n- Wargames: overthewire.org/wargames/bandit\n- Labs: tryhackme.com"
        });
        break;

      case "flag":
        newLines.push({
          type: "output",
          content: (
            <div className="p-3 my-1 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-[#00e5ff] font-mono font-bold">
              FLAG FOUND: CYBER&#123;THINK_SECURE_BUILD_BETTER&#125;
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
    <section className="relative py-24 bg-[#06080d] border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00e5ff] uppercase block mb-2">
            INTERACTIVE SHELL
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Cyber Cell Interactive Terminal
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            A simulated educational CLI interface. Try typing <span className="font-mono text-[#00e5ff]">help</span>,{" "}
            <span className="font-mono text-[#00e5ff]">roadmap</span>, or finding the hidden{" "}
            <span className="font-mono text-[#00e5ff]">flag</span>.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="rounded-2xl border border-white/[0.12] bg-[#080c14] shadow-2xl overflow-hidden cursor-text"
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0c101b] border-b border-white/[0.06] select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
              <span className="w-3 h-3 rounded-full bg-[#eab308]/80" />
              <span className="w-3 h-3 rounded-full bg-[#10b981]/80" />
              <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-[#00e5ff]" />
                guest@sati-cybercell:~ (simulated)
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">bash 5.2</span>
          </div>

          {/* Terminal Console Output & Input Area */}
          <div 
            ref={terminalBodyRef}
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm min-h-[280px] max-h-[400px] overflow-y-auto space-y-2.5"
          >
            {history.map((line, idx) => (
              <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                {line.type === "input" && (
                  <span className="text-slate-200 font-semibold">{line.content}</span>
                )}
                {line.type === "system" && (
                  <span className="text-slate-400">{line.content}</span>
                )}
                {line.type === "output" && (
                  <div className="text-slate-300 mt-1">{line.content}</div>
                )}
              </div>
            ))}

            {/* Live Prompt Line */}
            <div className="flex items-center gap-2 pt-1 text-slate-200">
              <span className="text-[#38bdf8] font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command..."
                className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600 font-mono text-xs sm:text-sm"
                autoComplete="off"
                spellCheck="false"
              />
              <CornerDownLeft className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            </div>
          </div>

          {/* Bottom Quick Chips */}
          <div className="px-4 py-2.5 bg-[#0a0e18] border-t border-white/[0.06] flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="text-slate-500">Quick tests:</span>
            {["help", "about", "domains", "roadmap", "resources", "flag", "clear"].map((c) => (
              <button
                key={c}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(c);
                }}
                className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-[#00e5ff]/15 hover:text-[#00e5ff] border border-white/[0.06] transition-colors"
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
