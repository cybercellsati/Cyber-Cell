export interface RoadmapStage {
  step: string;
  title: string;
  subtitle: string;
  skills: string[];
  concepts: string[];
  recommendedResources: { name: string; type: string; url?: string }[];
  practiceSuggestion: string;
  nextStage: string;
}

export const learningRoadmap: RoadmapStage[] = [
  {
    step: "01",
    title: "Computer Fundamentals",
    subtitle: "Hardware architecture, OS internals, and process execution.",
    skills: ["Binary & Hexadecimal numbering", "CPU registers & memory hierarchy", "File system formats (ext4, NTFS)", "Operating system process lifecycle"],
    concepts: ["Von Neumann Architecture", "User space vs. Kernel space", "Virtual Memory & Paging", "BIOS/UEFI & Boot sequence"],
    recommendedResources: [
      { name: "Operating Systems: Three Easy Pieces (Arpaci-Dusseau)", type: "Free Book" },
      { name: "CrashCourse Computer Science", type: "Video Course" }
    ],
    practiceSuggestion: "Inspect running processes on your system using htop (Linux) or Task Manager / Process Hacker (Windows) and understand memory allocations.",
    nextStage: "02 — Networking Fundamentals"
  },
  {
    step: "02",
    title: "Networking",
    subtitle: "The backbone of modern cybersecurity and digital communications.",
    skills: ["Subnetting (IPv4 & IPv6 CIDR)", "Packet sniffing with Wireshark", "Port scanning comprehension", "Routing & NAT diagnostics"],
    concepts: ["OSI 7-Layer & TCP/IP 4-Layer Models", "TCP 3-Way Handshake & Teardown", "DNS resolution & record types", "ARP, DHCP, ICMP protocols"],
    recommendedResources: [
      { name: "Professor Messer's Network+ Study Series", type: "Free Course" },
      { name: "Computer Networking: A Top-Down Approach (Kurose & Ross)", type: "Book" }
    ],
    practiceSuggestion: "Use Wireshark to capture your web browser resolving an HTTPS domain and analyze the DNS query, TCP SYN/ACK, and TLS handshake packets.",
    nextStage: "03 — Linux Essentials"
  },
  {
    step: "03",
    title: "Linux",
    subtitle: "Command-line mastery and system administration for security operations.",
    skills: ["Bash CLI navigation & file manipulation", "File permissions (chmod, chown, SUID/SGID)", "Service control (systemd, journalctl)", "Shell pipelines (grep, awk, sed)"],
    concepts: ["Everything is a file in Unix", "Standard Streams (stdin, stdout, stderr)", "Environment variables & paths", "Cron scheduling & user groups"],
    recommendedResources: [
      { name: "OverTheWire: Bandit (Levels 0-20)", type: "Interactive Wargame" },
      { name: "Linux Journey (linuxjourney.com)", type: "Free Interactive Guide" }
    ],
    practiceSuggestion: "Install a Debian/Ubuntu or Fedora VM in VirtualBox. Complete the first 15 levels of OverTheWire Bandit exclusively using the terminal.",
    nextStage: "04 — Programming & Scripting"
  },
  {
    step: "04",
    title: "Programming Basics",
    subtitle: "Automate security tasks, write custom exploits, and parse raw data.",
    skills: ["Python for security automation (requests, socket)", "Bash scripting for fast one-liners", "Basic C memory models (pointers, buffers)", "Regular expressions (Regex)"],
    concepts: ["Data structures & algorithm complexity", "Socket programming & raw streams", "Memory allocation (Stack vs. Heap)", "API consumption & JSON parsing"],
    recommendedResources: [
      { name: "Automate the Boring Stuff with Python (Al Sweigart)", type: "Free Online Book" },
      { name: "Python for Cybersecurity (TryHackMe Module)", type: "Interactive Lab" }
    ],
    practiceSuggestion: "Write a 30-line Python script that connects to a list of ports on localhost and prints whether each port is open, closed, or filtered.",
    nextStage: "05 — Web Fundamentals"
  },
  {
    step: "05",
    title: "Web Fundamentals",
    subtitle: "Understand how web applications, browsers, and APIs talk.",
    skills: ["HTTP request/response structure & status codes", "Browser Developer Tools (Network & Console)", "Cookies, Session IDs, and JWTs", "RESTful API payloads"],
    concepts: ["Client-Server Architecture", "Same-Origin Policy (SOP) & CORS", "Stateful vs. Stateless authentication", "Document Object Model (DOM)"],
    recommendedResources: [
      { name: "MDN Web Docs (HTTP & Security Guides)", type: "Official Documentation" },
      { name: "PortSwigger Web Security Academy (Intro)", type: "Free Lab Platform" }
    ],
    practiceSuggestion: "Inspect network traffic on a login form via Chrome/Firefox DevTools. Observe the request payload, headers, Set-Cookie response, and storage.",
    nextStage: "06 — Cybersecurity Foundations"
  },
  {
    step: "06",
    title: "Cybersecurity Foundations",
    subtitle: "Core defense principles, governance, and threat landscapes.",
    skills: ["Threat modeling & attack surface mapping", "Symmetric vs. Asymmetric encryption basics", "Hashing vs. Encoding vs. Encryption", "Vulnerability management workflow"],
    concepts: ["CIA Triad (Confidentiality, Integrity, Availability)", "Defense-in-Depth & Least Privilege", "Public Key Infrastructure (PKI) & CAs", "Authentication vs. Authorization"],
    recommendedResources: [
      { name: "NIST Computer Security Resource Center", type: "Framework Standards" },
      { name: "TryHackMe: Pre-Security Path", type: "Guided Pathway" }
    ],
    practiceSuggestion: "Generate an RSA 2048-bit keypair using OpenSSL, sign a sample text file with your private key, and verify the signature with your public key.",
    nextStage: "07 — Practical Security & Assessment"
  },
  {
    step: "07",
    title: "Practical Security",
    subtitle: "Hands-on vulnerability testing in controlled lab environments.",
    skills: ["Interception proxies (Burp Suite / OWASP ZAP)", "Web attack vectors (SQLi, XSS, IDOR, CSRF)", "System reconnaissance with Nmap & Gobuster", "Responsible vulnerability reporting"],
    concepts: ["OWASP Top 10 Security Risks", "Input validation & output encoding", "Network access control lists", "Proof-of-Concept documentation"],
    recommendedResources: [
      { name: "PortSwigger Web Security Academy Labs", type: "Hands-on Practice" },
      { name: "OWASP Testing Guide (WSTG)", type: "Standard Reference" }
    ],
    practiceSuggestion: "Solve the Apprentice-level SQL Injection labs on PortSwigger Academy and write down a concise 1-page remediation guide.",
    nextStage: "08 — CTFs & Labs"
  },
  {
    step: "08",
    title: "CTFs & Labs",
    subtitle: "Competitive cybersecurity challenges and gamified skill application.",
    skills: ["Jeopardy-style challenge solving", "Binary inspection & disassembly with Ghidra", "Steganography & metadata extraction", "Forensic memory dumping with Volatility"],
    concepts: ["Time management under competition pressure", "Creative lateral thinking", "Team communication & challenge triage", "Writeup documentation"],
    recommendedResources: [
      { name: "TryHackMe (Junior Penetration Tester Path)", type: "Lab Platform" },
      { name: "Hack The Box: Starting Point", type: "Lab Platform" },
      { name: "PicoCTF Practice Archive", type: "Beginner Platform" }
    ],
    practiceSuggestion: "Join PicoCTF or solve 5 beginner machines on Hack The Box Starting Point. Publish a sanitized writeup on your personal GitHub.",
    nextStage: "09 — Specialization"
  },
  {
    step: "09",
    title: "Specialization",
    subtitle: "Choose your focused track for engineering or research mastery.",
    skills: ["Deep-dive in selected track", "Independent security research", "Contributing to open source security tooling", "Advanced certifications (OSCP, CISSP, BTL1)"],
    concepts: ["Red Team / Penetration Testing", "Blue Team / SOC Defense & Threat Hunting", "Application Security & DevSecOps", "Digital Forensics & Incident Response (DFIR)"],
    recommendedResources: [
      { name: "MITRE ATT&CK Framework", type: "Knowledge Base" },
      { name: "SANS Internet Storm Center", type: "Threat Intelligence" }
    ],
    practiceSuggestion: "Build a functioning open-source security tool (e.g. an automated sub-domain auditor or log monitor) or audit an open-source codebase for flaws.",
    nextStage: "Continuous Community Contribution"
  }
];
