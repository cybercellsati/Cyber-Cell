export interface FocusArea {
  id: string;
  name: string;
  shortDesc: string;
  icon: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  learnSummary: string;
  coreTopics: string[];
  tools: string[];
  suggestedStartingPoint: string;
}

export const focusAreas: FocusArea[] = [
  {
    id: "ethical-hacking",
    name: "Ethical Hacking",
    shortDesc: "Vulnerability discovery, penetration testing methodology, and responsible security assessments.",
    icon: "ShieldAlert",
    level: "Intermediate",
    learnSummary:
      "Understand attacker methodologies to build resilient defenses. Focuses on offensive security fundamentals, systematic reconnaissance, enumeration, and strictly authorized vulnerability reporting.",
    coreTopics: [
      "Information Gathering & Reconnaissance",
      "Vulnerability Assessment & Scanning",
      "Exploitation Fundamentals",
      "Privilege Escalation Basics",
      "Documentation & Responsible Disclosure"
    ],
    tools: ["Nmap", "Metasploit Framework", "Netcat", "Gobuster", "LinPEAS"],
    suggestedStartingPoint:
      "Master TCP/IP networking basics and Linux commands first, then solve beginner rooms on TryHackMe (Pre-Security and Complete Beginner paths)."
  },
  {
    id: "network-security",
    name: "Network Security",
    shortDesc: "Packet analysis, protocol security, firewall configurations, and intrusion detection.",
    icon: "Network",
    level: "Beginner",
    learnSummary:
      "Investigate how network communication works and how data travels across local and global networks. Learn to identify anomalies, inspect raw packet streams, and implement defensive barriers.",
    coreTopics: [
      "TCP/IP & OSI Architecture",
      "DNS, DHCP & ARP Protocol Flaws",
      "Packet Sniffing & Traffic Analysis",
      "Firewalls, IDS/IPS & Segmentation",
      "VPNs & Transport Layer Security (TLS)"
    ],
    tools: ["Wireshark", "Tcpdump", "Snort", "Suricata", "Zeek"],
    suggestedStartingPoint:
      "Capture your own home network traffic using Wireshark and inspect standard HTTP, DNS, and TLS handshake packets to learn protocol internals."
  },
  {
    id: "web-security",
    name: "Web Security",
    shortDesc: "OWASP Top 10, browser security models, API testing, and defensive application architecture.",
    icon: "Globe",
    level: "Beginner",
    learnSummary:
      "Explore modern client-server architecture vulnerabilities. Learn how unsanitized input, misconfigurations, and broken access controls occur in web applications and how to patch them.",
    coreTopics: [
      "OWASP Top 10 Vulnerabilities",
      "SQL Injection & Parameterized Queries",
      "Cross-Site Scripting (XSS) & Mitigation",
      "Cross-Site Request Forgery (CSRF) & Tokens",
      "Broken Authentication & Session Management",
      "REST API Security & JWT Flaws"
    ],
    tools: ["Burp Suite Community", "OWASP ZAP", "Postman", "Browser DevTools", "SQLMap"],
    suggestedStartingPoint:
      "Work through the free PortSwigger Web Security Academy apprentices labs starting with SQL Injection and Cross-Site Scripting."
  },
  {
    id: "malware-analysis",
    name: "Malware Analysis",
    shortDesc: "Behavioral profiling, static code dissection, sandboxed execution, and reverse engineering.",
    icon: "Bug",
    level: "Advanced",
    learnSummary:
      "Study malicious binaries in safe, isolated virtual environments. Learn both static analysis (examining executable headers and strings without running) and dynamic behavioral monitoring.",
    coreTopics: [
      "Isolated Lab Setup & Virtual Machine Sandboxing",
      "PE/ELF Binary Structure & Headers",
      "Static Analysis & String Extraction",
      "Dynamic Analysis & API Monitoring",
      "Assembly (x86/x64) Fundamentals"
    ],
    tools: ["Ghidra", "x64dbg", "PE-bear", "Process Hacker", "FLOSS"],
    suggestedStartingPoint:
      "Set up an offline virtual machine sandbox and start with benign sample dissection using PE-bear and strings analysis before analyzing live malware."
  },
  {
    id: "digital-forensics",
    name: "Digital Forensics",
    shortDesc: "Memory analysis, disk artifact extraction, file recovery, and digital chain of custody.",
    icon: "Search",
    level: "Intermediate",
    learnSummary:
      "Learn how to reconstruct security incidents through evidence gathering. Analyze raw memory dumps, file system timestamps, event logs, and browser history while preserving evidence integrity.",
    coreTopics: [
      "Incident Response Fundamentals & Chain of Custody",
      "Memory Forensics & Volatile Data Capture",
      "Disk Imaging & File System Analysis (NTFS/ext4)",
      "Windows Event Logs & Prefetch Forensics",
      "Timeline Reconstruction"
    ],
    tools: ["Autopsy", "Volatility 3", "FTK Imager", "Eric Zimmerman Tools", "Sleuth Kit"],
    suggestedStartingPoint:
      "Try forensic capture challenges on CyberDefenders or National Cyber League practice dumps using Autopsy and Volatility."
  },
  {
    id: "ctf-competitions",
    name: "CTF & Competitions",
    shortDesc: "Capture The Flag mechanics across Jeopardy and Attack-Defense security challenges.",
    icon: "Flag",
    level: "Beginner",
    learnSummary:
      "Participate in gamified security challenges designed to test problem-solving across cryptography, web, forensics, reverse engineering, and binary exploitation under time constraints.",
    coreTopics: [
      "Jeopardy vs. Attack-Defense CTF Formats",
      "Classical & Modern Cryptography Basics",
      "Steganography & Hidden Data Discovery",
      "Source Code & Script Auditing",
      "Fast Problem Decomposition"
    ],
    tools: ["CyberChef", "GDB", "PWNTools", "Exiftool", "Hashcat"],
    suggestedStartingPoint:
      "Complete the OverTheWire: Bandit wargame levels 0 to 34 to build muscle memory with Linux CLI and creative problem solving."
  },
  {
    id: "security-awareness",
    name: "Security Awareness",
    shortDesc: "Social engineering defense, student hygiene, campus cyber clinics, and safe digital practices.",
    icon: "ShieldCheck",
    level: "Beginner",
    learnSummary:
      "Technical controls fail if the human element is overlooked. Focuses on educating the campus community about phishing tactics, multi-factor authentication, credential safety, and digital privacy.",
    coreTopics: [
      "Phishing, Vishing & Social Engineering Vectors",
      "Multi-Factor Authentication (MFA) Architecture",
      "Password Managers & Credential Hygiene",
      "Data Privacy & Public Wi-Fi Risks",
      "Institutional Defense & Policy Basics"
    ],
    tools: ["GoPhish (Simulations)", "HaveIBeenPwned API", "KeePassXC", "Bitwarden", "Security Checklists"],
    suggestedStartingPoint:
      "Audit your own digital footprint: enable FIDO2/app-based 2FA on primary accounts and learn to analyze raw email headers for sender spoofing."
  },
  {
    id: "career-guidance",
    name: "Career & Skill Development",
    shortDesc: "Certifications roadmap, ethical research portfolios, resume guidance, and industry pathways.",
    icon: "TrendingUp",
    level: "Beginner",
    learnSummary:
      "Demystify career paths in cybersecurity—from SOC Analyst, Security Engineer, and Penetration Tester to Incident Responder—along with honest guidance on certifications and project portfolios.",
    coreTopics: [
      "Cybersecurity Industry Roles & Specializations",
      "Certification Pathways (CompTIA Security+, eJPT, OSCP)",
      "Building a Technical Proof-of-Work Portfolio",
      "Writing Clean Bug Reports & Security Writeups",
      "Ethical Practice, Legality & Open Source Contribution"
    ],
    tools: ["Git/GitHub", "Medium/Substack for Writeups", "TryHackMe Profiles", "HackTheBox Badges"],
    suggestedStartingPoint:
      "Start documenting your lab exercises and CTF walk-throughs in private notes or GitHub markdown to build structured technical communication skills."
  }
];
