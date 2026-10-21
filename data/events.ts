export interface EventSpeaker {
  name: string;
  role: string;
  org?: string;
  avatar?: string;
}

export interface CyberEvent {
  id: string;
  slug?: string;
  title: string;
  date: string; // YYYY-MM-DD or formatted date
  time: string; // e.g. "10:00 AM - 04:00 PM"
  venue: string;
  mode: "On-Campus" | "Online" | "Hybrid";
  description: string;
  longDescription?: string;
  image?: string; // Primary cover poster URL
  images?: string[]; // Up to 10 gallery photos/posters
  organizer: string;
  registrationLink?: string;
  status: "Upcoming" | "Live" | "Completed" | "Tentative";
  category: "Workshop" | "CTF" | "Talk" | "Awareness" | "Orientation" | "Bootcamp" | "Seminar" | "Tech Talk" | "Hackathon";
  featured?: boolean;
  tags?: string[];
  capacity?: string;
  prerequisites?: string;
  toolsRequired?: string;
  agenda?: string;
  speakers?: EventSpeaker[];
  createdAt?: string;
  updatedAt?: string;
}

export const upcomingEvents: CyberEvent[] = [
  {
    id: "evt_1792524138107",
    title: "EXPLOIT: Intro to the Cyber Range",
    date: "2026-10-25",
    time: "10:00 AM - 01:00 PM",
    venue: "Central Computer Center (CCC), SATI Campus",
    mode: "On-Campus",
    description: "Curious about cybersecurity and ethical hacking? EXPLOIT is a beginner-friendly, practical cybersecurity workshop organised by Cyber Cell, SATI Vidisha, exclusively for first-year students.",
    longDescription: "Phase 01: Explore Cybersecurity — Get introduced to cybersecurity and major domains. Phase 02: Think Like an Attacker — Experience practical demonstrations. Phase 03: Your First Cyber Challenge — Put your thinking skills to the test.",
    image: "/images/events/event_1792524059137_2swvdc.jpg",
    images: ["/images/events/event_1792524059137_2swvdc.jpg"],
    organizer: "Cyber Cell SATI",
    registrationLink: "https://luma.com/sph445ld",
    status: "Upcoming",
    category: "Workshop",
    featured: true,
    tags: ["Live Demo", "Try Hack Me", "Hands-On", "Freshers"],
    capacity: "160 Seats",
    prerequisites: "None (Curiosity & Passion for Tech)",
    toolsRequired: "Personal Laptop",
    agenda: "10:00 AM: Keynote | 11:15 AM: Live Cyber Range Attack/Defend Demo | 12:15 PM: Interactive CTF Mini-Wargame",
    speakers: [
      { name: "Yash Harfode", role: "Founder & Convenor", org: "Cyber Cell SATI" },
      { name: "Krishna Mishra", role: "Co-Convenor & Security Lead", org: "Cyber Cell SATI" }
    ],
    createdAt: "2026-10-20T19:22:18.107Z",
    updatedAt: "2026-10-21T05:30:00.000Z"
  }
];

export const pastEvents: CyberEvent[] = [
  {
    id: "evt_past_01",
    title: "Foundational Cyber Range & Ethical Hacking 101",
    date: "2024-09-18",
    time: "11:00 AM - 03:00 PM",
    venue: "Smart Classroom 204 & CSE Labs, SATI Vidisha",
    mode: "On-Campus",
    description: "An intensive hands-on orientation introducing networking essentials, Kali Linux fundamentals, vulnerability scanning, and real-time phishing mitigation labs.",
    longDescription: "Over 140 students joined this interactive session to set up virtual penetration testing environments, analyze packet captures with Wireshark, and simulate ethical web exploitation scenarios.",
    image: "/images/event-exploit-workshop.png",
    images: ["/images/event-exploit-workshop.png"],
    organizer: "Cyber Cell SATI",
    status: "Completed",
    category: "Workshop",
    featured: false,
    tags: ["Kali Linux", "Network Security", "Wireshark", "Lab"],
    capacity: "140",
    prerequisites: "Basic Computing Knowledge",
    toolsRequired: "Laptop with VirtualBox / Kali",
    agenda: "Intro to Offensive Security -> Hands-on Linux Shell -> Live Vulnerability Demo",
    speakers: [
      { name: "Anubhav Vishwkarma", role: "Technical Lead", org: "Cyber Cell SATI" }
    ],
    createdAt: "2024-09-18T10:00:00.000Z",
    updatedAt: "2024-09-18T18:00:00.000Z"
  },
  {
    id: "evt_past_02",
    title: "CyberAware Campus Drive: Digital Safety & OpSec",
    date: "2024-08-12",
    time: "02:00 PM - 05:00 PM",
    venue: "Main Auditorium, SATI Vidisha",
    mode: "On-Campus",
    description: "Campus-wide cybersecurity awareness drive covering two-factor authentication, social engineering defense, credential hygiene, and financial fraud prevention.",
    longDescription: "Organized in collaboration with the Department of Computer Science & Engineering, this session guided 250+ students and faculty members on securing personal identities, combating UPI scams, and safe online browsing.",
    image: "/images/event-attendees.png",
    images: ["/images/event-attendees.png"],
    organizer: "Cyber Cell SATI",
    status: "Completed",
    category: "Awareness",
    featured: false,
    tags: ["Digital Safety", "OpSec", "Social Engineering", "Campus"],
    capacity: "250",
    prerequisites: "Open to All Branches & Years",
    toolsRequired: "None",
    agenda: "Welcome & Faculty Address -> Threat Landscape 2024 -> Live Scam Breakdown -> Q&A",
    speakers: [
      { name: "Prof. Shivangi Jain", role: "Faculty Advisor & Mentor", org: "CSE Department, SATI" },
      { name: "Yash Harfode", role: "Convenor", org: "Cyber Cell SATI" }
    ],
    createdAt: "2024-08-12T10:00:00.000Z",
    updatedAt: "2024-08-12T18:00:00.000Z"
  },
  {
    id: "evt_past_03",
    title: "FlagSprint: Intra-College CTF Qualifier 2024",
    date: "2024-04-06",
    time: "10:00 AM - 06:00 PM",
    venue: "Central Computer Center & Online CTF Sandbox",
    mode: "Hybrid",
    description: "8-hour jeopardy-style Capture The Flag competition featuring web exploitation, cryptography, digital forensics, and binary reverse engineering challenges.",
    longDescription: "45 competitive teams battled across 25 custom challenges designed by our technical team. Top 3 teams were awarded cash bounties, verified certificates, and direct spots on the campus CTF roster.",
    image: "/images/ethical-hacking-featured.png",
    images: ["/images/ethical-hacking-featured.png"],
    organizer: "Cyber Cell SATI",
    status: "Completed",
    category: "CTF",
    featured: false,
    tags: ["CTF", "Reverse Engineering", "Cryptography", "Web Exploits"],
    capacity: "50 Teams",
    prerequisites: "Python / Linux Basics",
    toolsRequired: "Laptop with Burp Suite & Ghidra",
    agenda: "Challenge Briefing -> 8-Hour Wargame -> Scoreboard Reveal & Prize Distribution",
    speakers: [
      { name: "Anubhav Vishwkarma", role: "CTF Challenge Architect", org: "Cyber Cell SATI" },
      { name: "Krishna Mishra", role: "Security Lead", org: "Cyber Cell SATI" }
    ],
    createdAt: "2024-04-06T10:00:00.000Z",
    updatedAt: "2024-04-06T19:00:00.000Z"
  }
];
