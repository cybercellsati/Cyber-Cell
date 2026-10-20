"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  X,
  Shield,
  Terminal,
  CheckCircle2,
  BookOpen,
  Wrench,
  ExternalLink,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { motion, useScroll, useSpring, Variants } from "framer-motion";

interface DomainItem {
  index: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  fullOverview: string;
  curriculum: string[];
  tools: string[];
  platforms: string[];
  careerRoles: string[];
}

const domainsData: DomainItem[] = [
  {
    index: "01",
    title: "Penetration Testing & Red Team",
    description: "Find and exploit vulnerabilities to make systems more secure.",
    tags: ["Ethical Hacking", "Exploitation", "Tools"],
    image: "/images/domain-01.png",
    fullOverview:
      "The Offensive Security & Red Team track trains students to think and operate like real-world adversaries. Within strictly authorized SATI lab environments, members learn how to identify misconfigurations, exploit architectural weaknesses, conduct network pivoting, and write professional vulnerability assessment reports.",
    curriculum: [
      "Network enumeration & port discovery (Nmap, Masscan)",
      "Web application exploit vectors (SQLi, XSS, SSRF, IDOR)",
      "Linux and Windows privilege escalation vectors",
      "Active Directory exploitation and domain dominance",
      "Payload craft, shellcode basics, and defensive evasion",
    ],
    tools: ["Kali Linux", "Metasploit", "Burp Suite Pro", "Nmap", "BloodHound", "Impacket", "Hashcat"],
    platforms: ["HackTheBox", "TryHackMe", "PortSwigger Web Security Academy"],
    careerRoles: ["Penetration Tester", "Red Team Operator", "Security Consultant", "Bug Bounty Hunter"],
  },
  {
    index: "02",
    title: "Security Operations & Blue Team",
    description: "Detect, analyze, and respond to real-world cyber threats.",
    tags: ["SOC", "Threat Detection", "Incident Response"],
    image: "/images/domain-02.png",
    fullOverview:
      "Blue Team operations are the resilient bedrock of modern cybersecurity. Students learn how enterprise Security Operations Centers (SOC) ingest telemetry, analyze network PCAPs, tune SIEM alerts, correlate IOCs, and orchestrate rapid incident response against active intrusions.",
    curriculum: [
      "SOC analyst workflows & alert triage methodologies",
      "Network traffic packet analysis & deep packet inspection",
      "SIEM log ingestion and threat detection rule crafting",
      "Host-based telemetry & Endpoint Detection and Response (EDR)",
      "Cyber Threat Intelligence (CTI) & MITRE ATT&CK framework mapping",
    ],
    tools: ["Wireshark", "Splunk", "Elastic SIEM", "Suricata", "Zeek", "Snort", "Wazuh"],
    platforms: ["LetsDefend", "CyberDefenders", "Blue Team Labs Online"],
    careerRoles: ["SOC Analyst (Tier 1-3)", "Incident Responder", "Threat Hunter", "Detection Engineer"],
  },
  {
    index: "03",
    title: "Application Security",
    description: "Build and test secure web and mobile applications.",
    tags: ["Web Security", "API Security", "DevSecOps"],
    image: "/images/domain-03.png",
    fullOverview:
      "Application Security (AppSec) bridges software development and defensive architecture. Members inspect modern full-stack web and mobile applications, audit API authentication boundaries, automate static and dynamic security scanners, and embed security tests into continuous integration (CI/CD) pipelines.",
    curriculum: [
      "OWASP Top 10 deep-dive & architectural remediation",
      "API Security testing (REST, GraphQL, JWT vulnerabilities)",
      "Static Application Security Testing (SAST) rule authoring",
      "Software Composition Analysis (SCA) & supply chain defense",
      "Mobile App Security (OWASP MASVS / Android & iOS reversing)",
    ],
    tools: ["OWASP ZAP", "Burp Suite", "Snyk", "Semgrep", "Postman", "SonarQube", "MobSF"],
    platforms: ["WebGoat", "OWASP Juice Shop", "AppSecEngineer"],
    careerRoles: ["Application Security Engineer", "DevSecOps Architect", "Security Code Auditor"],
  },
  {
    index: "04",
    title: "Digital Forensics",
    description: "Investigate digital evidence and analyze cyber incidents.",
    tags: ["Forensics", "Incident Analysis", "Malware"],
    image: "/images/domain-04.png",
    fullOverview:
      "When security defenses are breached, Digital Forensics and Incident Response (DFIR) specialists reconstruct what happened. Students learn forensic disk imaging, volatile memory extraction, file system metadata reconstruction, timeline analysis, and malware behavior profiling.",
    curriculum: [
      "Forensic chain of custody & evidentiary integrity verification",
      "Volatile memory acquisition & Volatility plugin analysis",
      "File system artifacts (MFT, Registry, Prefetch, Event Logs)",
      "Network packet forensics & session reconstruction",
      "Static and dynamic basic malware analysis and sandboxing",
    ],
    tools: ["Autopsy", "FTK Imager", "Volatility 3", "Wireshark", "Ghidra", "YARA", "PEStudio"],
    platforms: ["CyberDefenders", "DFIR Diva", "OverTheWire"],
    careerRoles: ["Digital Forensics Analyst", "DFIR Consultant", "Malware Analyst", "Cyber Crime Investigator"],
  },
  {
    index: "05",
    title: "Cloud Security",
    description: "Secure cloud infrastructure and modern deployments.",
    tags: ["AWS", "Azure", "Cloud Attacks"],
    image: "/images/domain-05.png",
    fullOverview:
      "Modern compute runs on distributed public cloud infrastructure and containerized clusters. This track demystifies cloud threat models, misconfigured IAM roles, vulnerable S3 buckets, Kubernetes pod escapes, and immutable Infrastructure-as-Code (IaC) security auditing.",
    curriculum: [
      "Shared responsibility model & cloud threat architectures",
      "AWS & Azure Identity and Access Management (IAM) privilege auditing",
      "Container security & Dockerfile hardening best practices",
      "Kubernetes cluster policy enforcement & admission controllers",
      "Automated Infrastructure as Code (IaC) scanning with tfsec & Checkov",
    ],
    tools: ["AWS CloudTrail", "ScoutSuite", "Trivy", "Falco", "Checkov", "Kubescape", "CloudFox"],
    platforms: ["CloudGoat", "Flaw.cloud", "Kubernetes Goat"],
    careerRoles: ["Cloud Security Architect", "Cloud Security Engineer", "DevSecOps Engineer"],
  },
  {
    index: "06",
    title: "Governance, Risk & Compliance",
    description: "Understand policies, risk management and security standards.",
    tags: ["GRC", "Risk Assessment", "Compliance"],
    image: "/images/domain-06.png",
    fullOverview:
      "Cybersecurity extends beyond raw code into institutional policy, risk quantification, and legal accountability. Students learn international standards (ISO/IEC 27001, NIST CSF), the Indian Digital Personal Data Protection Act (DPDP), vulnerability disclosure governance, and enterprise risk management.",
    curriculum: [
      "NIST Cybersecurity Framework (CSF 2.0) implementation",
      "ISO/IEC 27001 Information Security Management Systems (ISMS)",
      "Indian Digital Personal Data Protection Act (DPDP 2023) guidelines",
      "Quantitative & qualitative risk assessment methodologies",
      "Vulnerability management lifecycles and remediation SLAs",
    ],
    tools: ["Nessus", "OpenVAS", "RiskLens", "Eramba GRC", "Standard Compliance Frameworks"],
    platforms: ["NIST Assessments", "Campus Audit Workflows", "SATI Security Policy Review"],
    careerRoles: ["GRC Analyst", "Information Security Officer", "IT Compliance Auditor", "Risk Consultant"],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function DomainsPage() {
  const [selectedDomain, setSelectedDomain] = useState<DomainItem | null>(null);
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  // Global Page Scroll Progress for top amber indicator line
  const { scrollYProgress: globalScrollProgress } = useScroll();
  const scaleX = useSpring(globalScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track scroll inside the sticky domain track
  const { scrollYProgress: trackProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  // Automatically update the active domain based on scroll position
  useEffect(() => {
    const unsubscribe = trackProgress.on("change", (latest) => {
      const num = domainsData.length;
      // Map 0..1 progress to index 0..5
      const idx = Math.min(num - 1, Math.max(0, Math.floor(latest * num)));
      setActiveDomainIndex(idx);
    });
    return () => unsubscribe();
  }, [trackProgress]);

  // Select a domain by index and sync scroll position
  const selectDomainByIndex = (idx: number) => {
    setActiveDomainIndex(idx);
    if (scrollTrackRef.current) {
      const rect = scrollTrackRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const scrollableHeight = scrollTrackRef.current.offsetHeight - window.innerHeight;
      if (scrollableHeight > 0) {
        // Place scroll target directly in the center of the domain's window
        const targetOffset = (idx + 0.5) / domainsData.length;
        const targetY = scrollTop + targetOffset * scrollableHeight;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    if (activeDomainIndex > 0) selectDomainByIndex(activeDomainIndex - 1);
  };

  const handleNext = () => {
    if (activeDomainIndex < domainsData.length - 1) selectDomainByIndex(activeDomainIndex + 1);
  };

  const scrollToDomains = () => {
    if (scrollTrackRef.current) {
      const rect = scrollTrackRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDomain(null);
    };
    if (selectedDomain) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedDomain]);

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300">
      
      {/* Amber Scroll Progress Line: Positioned right below the fixed navbar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-[64px] sm:top-[72px] left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 origin-left z-40 shadow-[0_0_12px_rgba(245,158,11,0.9)] pointer-events-none"
      />

      <Navbar />

      {/* Main Container with generous top clearance so nothing hides behind navbar */}
      <main className="flex-1 pt-32 sm:pt-36 lg:pt-40 pb-20 overflow-visible">
        
        {/* ========================================================
            HERO SECTION: "EXPLORE THE DOMAINS" + CINEMATIC VISUAL
           ======================================================== */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-between">
            
            {/* Left Column: Eyebrow, Giant Two-Tone Title, Story, CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="lg:col-span-7 space-y-6"
            >
              
              {/* Eyebrow: — OUR DOMAINS (Fully visible below navbar) */}
              <div className="flex items-center gap-2">
                <span className="w-5 h-[2px] bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <span className="text-[11px] font-mono tracking-[0.24em] text-amber-400 uppercase font-semibold">
                  OUR DOMAINS
                </span>
              </div>

              {/* Massive Headline: EXPLORE ( 06 ) / THE DOMAINS */}
              <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-0.04em] leading-[0.92] text-white">
                <span className="flex items-baseline gap-3.5 sm:gap-4 flex-wrap">
                  <span>EXPLORE</span>
                  <span className="text-slate-500 font-mono text-xl sm:text-2xl font-normal">( 06 )</span>
                </span>
                <span className="block mt-1 sm:mt-2">
                  <span className="text-white/40">THE </span>
                  <span className="text-white">DOMAINS</span>
                </span>
              </h1>

              {/* Subtitle & Narrative */}
              <div className="space-y-2 pt-1 max-w-lg">
                <p className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Different paths. A common mission.
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Explore the key areas of cybersecurity. Learn new skills, work on real-world problems, and find the domain that excites you the most.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToDomains}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-200 text-black font-bold text-xs font-sans tracking-wide transition-all duration-200 shadow-md shadow-white/10 active:scale-95"
                >
                  <span>Find Your Domain</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>

            </motion.div>

            {/* Right Column: Cinematic Hacker Hallway Visual with Micro-text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end items-center"
            >
              
              <div className="relative w-full max-w-md aspect-[614/572] rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_25px_70px_rgba(0,0,0,0.95)] group">
                <Image
                  src="/images/domains-hero.png"
                  alt="Cyber Cell SATI Member looking toward the illuminated gateway"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Micro-Text (Top-Right inside frame) */}
                <div className="absolute top-4 right-4 hidden sm:flex flex-col text-[8.5px] font-mono tracking-widest text-slate-400 uppercase leading-[1.7] select-none text-right bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/10">
                  <span>SECURE</span>
                  <span>LEARN</span>
                  <span>PRACTICE</span>
                  <span className="text-amber-400">BUILD</span>
                </div>

                {/* Floating Micro-Text (Bottom-Right) */}
                <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/10 select-none">
                  <span className="w-1 h-6 bg-amber-400 inline-block rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                  <div className="flex flex-col text-[8px] font-mono tracking-widest text-slate-400 uppercase leading-tight text-left">
                    <span>A SAFER</span>
                    <span>DIGITAL</span>
                    <span className="text-white">TOMORROW</span>
                  </div>
                </div>

              </div>

            </motion.div>

          </div>
        </section>


        {/* ========================================================
            STICKY ACCORDION TRACK: USER STAYS IN PLACE
            Each domain expands in place, then collapses to a short bar
            as the next one expands sequentially!
           ======================================================== */}
        <div
          ref={scrollTrackRef}
          id="domain-list"
          className="relative w-full h-[360vh]"
        >
          {/* Pinned Viewport Container: stays locked in view while scrolling */}
          <div className="sticky top-[72px] sm:top-[80px] w-full min-h-[calc(100vh-80px)] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none">
            
            {/* Top HUD Controls of the Domain Stack */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-3">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                <span className="text-xs font-mono tracking-widest text-slate-300 uppercase font-semibold">
                  EXPLORING DOMAIN:{" "}
                  <span className="text-amber-400 font-bold">
                    {domainsData[activeDomainIndex].index} / 06
                  </span>
                </span>
                <span className="hidden sm:inline-block text-slate-600">•</span>
                <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
                  {domainsData[activeDomainIndex].title}
                </span>
              </div>

              {/* Step indicator pills & Previous / Next Controls */}
              <div className="flex items-center gap-3">
                {/* 6 Step Pills */}
                <div className="hidden sm:flex items-center gap-1.5 mr-1">
                  {domainsData.map((d, i) => (
                    <button
                      key={d.index}
                      type="button"
                      onClick={() => selectDomainByIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeDomainIndex === i
                          ? "w-8 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                      title={`Jump to Domain ${d.index}: ${d.title}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={activeDomainIndex === 0}
                    className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-white flex items-center justify-center disabled:opacity-25 disabled:pointer-events-none transition-colors"
                    title="Previous Domain"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={activeDomainIndex === domainsData.length - 1}
                    className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-white flex items-center justify-center disabled:opacity-25 disabled:pointer-events-none transition-colors"
                    title="Next Domain"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* The Stacked List: Collapses to short bars, active domain expands */}
            <div className="space-y-1.5 w-full">
              {domainsData.map((item, idx) => {
                const isActive = activeDomainIndex === idx;

                return (
                  <div
                    key={item.index}
                    className={`rounded-xl transition-all duration-300 border ${
                      isActive
                        ? "bg-white/[0.03] border-amber-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
                        : "bg-transparent border-white/[0.06] hover:border-white/20 hover:bg-white/[0.015]"
                    }`}
                  >
                    {/* Always-Visible Short Header Bar */}
                    <div
                      onClick={() => selectDomainByIndex(idx)}
                      className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                        <span
                          className={`font-mono text-sm sm:text-base font-bold transition-colors ${
                            isActive ? "text-amber-400" : "text-slate-500 group-hover:text-slate-300"
                          }`}
                        >
                          {item.index}
                        </span>

                        <h3
                          className={`text-sm sm:text-base font-bold truncate transition-colors ${
                            isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Collapsed Tag Badge */}
                        {!isActive && (
                          <span className="hidden md:inline-block px-2.5 py-0.5 rounded text-[10.5px] font-mono text-slate-400 bg-white/[0.02] border border-white/[0.06]">
                            {item.tags[0]}
                          </span>
                        )}

                        {/* Interactive Expand Indicator */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? "bg-amber-400 text-slate-950 font-bold rotate-90 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                              : "bg-white/[0.04] text-slate-400 group-hover:text-white group-hover:bg-white/10"
                          }`}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Expandable Drawer: Animates height auto when active, height 0 when collapsed */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-6 pt-1 border-t border-white/[0.06]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          
                          {/* Left Column (lg:col-span-7): Full Description, Tags & Curriculum Link */}
                          <div className="lg:col-span-7 space-y-3.5">
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                              {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-0.5">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/10"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="pt-2 flex flex-wrap items-center gap-3">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDomain(item);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-sm active:scale-95"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Curriculum Deep-Dive</span>
                              </button>

                              <span className="text-[11px] font-mono text-slate-500">
                                {item.careerRoles[0]} • {item.careerRoles[1]}
                              </span>
                            </div>
                          </div>

                          {/* Right Column (lg:col-span-5): Widescreen 16:9 Thumbnail with Click-to-Modal */}
                          <div className="lg:col-span-5">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDomain(item);
                              }}
                              className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-xl group/thumb cursor-pointer hover:border-amber-400/50 transition-all duration-300"
                            >
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                                sizes="(max-width: 1024px) 100vw, 420px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                              
                              <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[10.5px] font-mono text-slate-300 flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-amber-400" />
                                <span>Click to View Full Syllabus</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>


        {/* ========================================================
            INTERACTIVE DOMAIN DETAILS MODAL
           ======================================================== */}
        {selectedDomain && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={() => setSelectedDomain(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090d16] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-20 p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#090d16]/95 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-amber-400 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30">
                    TRACK {selectedDomain.index} / 06
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-white truncate max-w-md">
                    {selectedDomain.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDomain(null)}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* Banner Image */}
                <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-xl">
                  <Image
                    src={selectedDomain.image}
                    alt={selectedDomain.title}
                    fill
                    className="object-cover"
                    sizes="800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Full Overview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
                    DOMAIN OVERVIEW & PHILOSOPHY
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedDomain.fullOverview}
                  </p>
                </div>

                {/* Core Curriculum */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
                    WHAT YOU WILL LEARN & MASTER
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedDomain.curriculum.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Platforms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2.5">
                    <h5 className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                      TOOLS & FRAMEWORKS
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDomain.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <h5 className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                      PRACTICE LAB PLATFORMS
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDomain.platforms.map((p) => (
                        <span
                          key={p}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-amber-400/10 border border-amber-400/30 text-amber-300"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Career Pathways */}
                <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                  <h5 className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                    TARGET INDUSTRY ROLES
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedDomain.careerRoles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 rounded-full text-xs font-sans font-medium bg-white/[0.03] border border-white/[0.08] text-slate-300"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-black/60 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Cyber Cell SATI &bull; Vidisha Campus
                </span>
                <Link
                  href="/join"
                  onClick={() => setSelectedDomain(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
                >
                  <span>Join Offline Induction</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </motion.div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
