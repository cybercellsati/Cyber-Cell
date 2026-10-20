export interface ResourceItem {
  id: string;
  title: string;
  category: "Learn" | "Practice" | "Tools" | "Cheatsheets" | "Community";
  topic: string;
  description: string;
  url: string;
  type: "Official" | "Community" | "External";
  badge?: string;
}

export const resourcesData: ResourceItem[] = [
  // --- LEARN ---
  {
    id: "learn-linux-journey",
    title: "Linux Journey",
    category: "Learn",
    topic: "Linux",
    description: "Free, beautifully structured interactive lessons covering Linux command line, text manipulation, permissions, processes, and network configuration.",
    url: "https://linuxjourney.com/",
    type: "Community",
    badge: "Essential"
  },
  {
    id: "learn-portswigger",
    title: "PortSwigger Web Security Academy",
    category: "Learn",
    topic: "Web Security",
    description: "The gold standard in free web security training created by the authors of Burp Suite. Covers SQLi, XSS, CSRF, SSRF, and authentication with real lab containers.",
    url: "https://portswigger.net/web-security",
    type: "Official",
    badge: "Industry Standard"
  },
  {
    id: "learn-prof-messer",
    title: "Professor Messer: Network+ Training",
    category: "Learn",
    topic: "Networking",
    description: "Comprehensive high-quality free video series breaking down IP addressing, OSI layers, routing protocols, wireless security, and network troubleshooting.",
    url: "https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/",
    type: "Community",
    badge: "Beginner Friendly"
  },
  {
    id: "learn-crypto101",
    title: "Crypto 101 Handbook",
    category: "Learn",
    topic: "Cryptography",
    description: "An introductory course on cryptography for programmers, teaching modern ciphers, hashing, public keys, and common real-world implementation pitfalls.",
    url: "https://www.crypto101.io/",
    type: "Community"
  },
  {
    id: "learn-forensics-wiki",
    title: "Forensics Wiki",
    category: "Learn",
    topic: "Digital Forensics",
    description: "Community-driven knowledge base documenting file formats, file systems, disk structure, memory acquisition, and incident response artifacts.",
    url: "https://forensics.wiki/",
    type: "Community"
  },

  // --- PRACTICE ---
  {
    id: "practice-tryhackme",
    topic: "Hands-on Labs",
    title: "TryHackMe",
    category: "Practice",
    description: "Browser-based hands-on cybersecurity training platform with guided virtual machines for beginners through intermediate security practitioners.",
    url: "https://tryhackme.com/",
    type: "External",
    badge: "Recommended Starting Point"
  },
  {
    id: "practice-htb",
    topic: "Penetration Testing",
    title: "Hack The Box",
    category: "Practice",
    description: "Gamified offensive cybersecurity platform offering live vulnerable machines, active directory labs, and competitive CTF arenas.",
    url: "https://www.hackthebox.com/",
    type: "External"
  },
  {
    id: "practice-overthewire",
    topic: "Linux & Wargames",
    title: "OverTheWire: Bandit",
    category: "Practice",
    description: "The classic command-line wargame aimed at teaching beginner Linux terminal commands, SSH keys, file permissions, and shell scripts through progressive challenges.",
    url: "https://overthewire.org/wargames/bandit/",
    type: "Community",
    badge: "Must Complete"
  },
  {
    id: "practice-picoctf",
    topic: "CTF Training",
    title: "PicoCTF",
    category: "Practice",
    description: "Free computer security education program with original cybersecurity challenges created by Carnegie Mellon University experts.",
    url: "https://picoctf.org/",
    type: "Official"
  },

  // --- TOOLS ---
  {
    id: "tool-burpsuite",
    topic: "Web Proxy",
    title: "Burp Suite Community Edition",
    category: "Tools",
    description: "The leading graphical tool for testing web application security. Acts as an intercepting proxy to inspect, modify, and repeat HTTP/S requests.",
    url: "https://portswigger.net/burp/communitydownload",
    type: "Official",
    badge: "Offensive Standard"
  },
  {
    id: "tool-wireshark",
    topic: "Packet Analysis",
    title: "Wireshark",
    category: "Tools",
    description: "The world's foremost and widely-used network protocol analyzer. Lets you capture and interactively browse the traffic running on a computer network.",
    url: "https://www.wireshark.org/",
    type: "Official",
    badge: "Defensive Standard"
  },
  {
    id: "tool-nmap",
    topic: "Network Scanner",
    title: "Nmap (Network Mapper)",
    category: "Tools",
    description: "Free and open source utility for network discovery and security auditing. Rapidly scans hosts, detects open ports, services, and OS fingerprints.",
    url: "https://nmap.org/",
    type: "Official"
  },
  {
    id: "tool-ghidra",
    topic: "Reverse Engineering",
    title: "Ghidra SRE Framework",
    category: "Tools",
    description: "Software reverse engineering (SRE) suite of tools developed by NSA Research Directorate. Features disassembly, assembly, decompilation, and graphing.",
    url: "https://ghidra-sre.org/",
    type: "Official"
  },

  // --- CHEATSHEETS ---
  {
    id: "cheat-linux",
    topic: "Linux CLI",
    title: "Linux Command Line Security Cheatsheet",
    category: "Cheatsheets",
    description: "Essential terminal commands for file searching, permission analysis, process tracking, network sockets (ss, lsof), and log auditing.",
    url: "https://cheatography.com/davechild/cheat-sheets/linux-command-line/",
    type: "Community"
  },
  {
    id: "cheat-nmap",
    topic: "Scanning",
    title: "Nmap Command & Flags Reference",
    category: "Cheatsheets",
    description: "Quick reference guide covering SYN scans, UDP probes, service detection (-sV), default scripts (-sC), and output formats.",
    url: "https://www.stationx.net/nmap-cheat-sheet/",
    type: "Community"
  },
  {
    id: "cheat-owasp",
    topic: "Web Application",
    title: "OWASP Cheat Sheet Series",
    category: "Cheatsheets",
    description: "Authoritative architectural guidance created by global experts detailing how to securely design, build, and defend software applications.",
    url: "https://cheatsheetseries.owasp.org/",
    type: "Official",
    badge: "Defensive Guide"
  },
  {
    id: "cheat-git",
    topic: "Version Control",
    title: "Git Security & Workflow Cheatsheet",
    category: "Cheatsheets",
    description: "Best practices for commit signing with GPG, preventing accidental secret leakage (.gitignore, git-secrets), and branch hygiene.",
    url: "https://training.github.com/downloads/github-git-cheat-sheet.pdf",
    type: "Community"
  },

  // --- COMMUNITY ---
  {
    id: "comm-cybercell-discord",
    topic: "Campus Network",
    title: "Cyber Cell SATI Discord & CTF Arena",
    category: "Community",
    description: "The official online clubhouse for SATI cybersecurity students. Team up for live weekend CTFs, ask questions, share tooling, and collaborate on projects.",
    url: "https://discord.gg",
    type: "Official",
    badge: "Official SATI Hub"
  },
  {
    id: "comm-owasp-global",
    topic: "AppSec Global",
    title: "OWASP Global Community & Chapter Network",
    category: "Community",
    description: "Connect with the world's leading open application security collective. Access local chapter meetups, vendor-neutral educational webinars, and project repos.",
    url: "https://owasp.org/",
    type: "Community",
    badge: "Global Network"
  },
  {
    id: "comm-netsec-reddit",
    topic: "Threat Intel",
    title: "r/netsec: Technical Information Security",
    category: "Community",
    description: "Peer-reviewed technical cybersecurity forum featuring real-time 0-day vulnerability analyses, whitepapers, exploits, and research publications.",
    url: "https://www.reddit.com/r/netsec/",
    type: "Community"
  },
  {
    id: "comm-thn",
    topic: "Cyber News",
    title: "The Hacker News (THN)",
    category: "Community",
    description: "Trusted global cybersecurity news platform covering breaking digital threats, malware campaigns, ransomware intelligence, and software vulnerabilities.",
    url: "https://thehackernews.com/",
    type: "External"
  },
  {
    id: "comm-defcon-groups",
    topic: "Hacker Culture",
    title: "DEF CON Groups (DCG)",
    category: "Community",
    description: "Grassroots local hacker communities spawned from DEF CON conferences, hosting lockpicking villages, hardware hacking demos, and security talks.",
    url: "https://defcongroups.org/",
    type: "Community"
  }
];
