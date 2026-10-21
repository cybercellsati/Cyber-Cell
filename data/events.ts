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
    id: "evt_dummy_preview_01",
    title: "[DUMMY] Cyber Range CTF & Defense Drill 2026",
    date: "2026-11-28",
    time: "10:00 AM - 04:00 PM",
    venue: "Central Computer Center (CCC), SATI Campus [DUMMY VENUE]",
    mode: "On-Campus",
    description: "⚠️ DUMMY UPCOMING EVENT (SAMPLE DEMO PREVIEW ONLY)\nThis is a sample dummy event created strictly for demonstration and UI preview purposes. It is NOT an officially scheduled event. Official club events will be posted upon administrative confirmation.",
    longDescription: "⚠️ PLEASE NOTE: THIS IS A DUMMY UPCOMING EVENT\nThis event entry is a placeholder demo to showcase the countdown poster and event schedule UI. No actual session will be held on this date unless officially announced by Cyber Cell SATI.",
    image: "/images/event-exploit-workshop.png",
    images: [
      "/images/event-exploit-workshop.png"
    ],
    organizer: "Cyber Cell SATI (Demo)",
    registrationLink: "#dummy-event",
    status: "Upcoming",
    category: "CTF",
    featured: true,
    tags: [
      "DUMMY EVENT",
      "SAMPLE PREVIEW",
      "DEMO ONLY"
    ],
    capacity: "150 (Sample)",
    prerequisites: "None (Dummy Preview)",
    toolsRequired: "Laptop (Dummy)",
    agenda: "Demo Timeline & Sample Challenges",
    speakers: [
      {
        name: "Sample Instructor",
        role: "Security Specialist (Demo)",
        org: "Cyber Cell SATI"
      }
    ],
    createdAt: "2026-10-21T05:50:00.000Z",
    updatedAt: "2026-10-21T05:50:00.000Z"
  }
];

export const pastEvents: CyberEvent[] = [
  {
    id: "evt_1792524138107",
    title: "EXPLOIT: Intro to the Cyber Range",
    date: "2026-10-16",
    time: "10:30 AM - 01:30 PM",
    venue: "Central Computer Center (CCC), SATI Campus",
    mode: "On-Campus",
    description: "A beginner-friendly, practical cybersecurity workshop. Explore how cybersecurity works through live demonstrations and interactive activities. No prior experience is required — just curiosity and a willingness to learn.",
    longDescription: "This workshop is designed to give first-year students a practical introduction to cybersecurity. You will explore real-world concepts, see live demonstrations, and get hands-on experience through interactive activities in a guided and friendly environment.\n\nPhase 01 — Explore Cybersecurity\nGet introduced to cybersecurity, discover its major domains and career paths, and learn which foundational skills to develop as a first-year student.\n\nPhase 02 — Think Like an Attacker\nExperience cybersecurity through practical demonstrations and understand how security weaknesses can be identified, why they matter, and how systems can be better protected.\n\nPhase 03 — Your First Cyber Challenge\nPut your thinking skills to the test through beginner-friendly cybersecurity challenges. Learn by exploring, solving problems, and discovering new concepts.",
    image: "/images/events/event_1792524059137_2swvdc.jpg",
    images: [
      "/images/events/event_1792561669408_kvq6dp.jpg",
      "/images/events/event_1792524059137_2swvdc.jpg",
      "/images/events/event_1792561674432_ngg70j.jpg",
      "https://res.cloudinary.com/qtfezfsf/image/upload/v1792561677/cybercell/events/fgwnlhca7irmq6u6fgz5.jpg",
      "/images/events/event_1792561735498_z6d91j.jpg",
      "https://res.cloudinary.com/qtfezfsf/image/upload/v1792561715/cybercell/events/derxwlhfm0e9dn3jw5t2.png"
    ],
    organizer: "Cyber Cell SATI",
    registrationLink: "https://luma.com/sph445ld",
    status: "Completed",
    category: "Workshop",
    featured: true,
    tags: [
      "WORKSHOP",
      "BEGINNER FRIENDLY",
      "ON CAMPUS",
      "HANDS-ON"
    ],
    capacity: "50 - 80 (Open for all first-year students)",
    prerequisites: "None (Just curiosity & passion for tech)",
    toolsRequired: "Laptop (Windows / Linux / macOS)",
    agenda: "10:30 AM: Keynote & Core Concepts | 11:30 AM: Live Cyber Range Attack/Defend Demo | 12:30 PM: Interactive CTF Mini-Wargame",
    speakers: [
      {
        name: "Yash Harfode",
        role: "Founder & Convenor",
        org: "Cyber Cell SATI"
      },
      {
        name: "Krishna Mishra",
        role: "Co-Convenor & Security Lead",
        org: "Cyber Cell SATI"
      }
    ],
    createdAt: "2026-10-20T19:22:18.107Z",
    updatedAt: "2026-10-21T05:49:59.127Z"
  },
  {
    id: "evt_past_ctf_defense_02",
    title: "Cyber Range CTF & Defense Workshop",
    date: "2026-09-28",
    time: "11:00 AM - 03:00 PM",
    venue: "Central Computer Center (CCC), SATI Campus",
    mode: "On-Campus",
    description: "Hands-on jeopardy CTF drill tackling web exploitation, cryptography puzzles, network traffic forensics, and privilege escalation.",
    longDescription: "An intensive collegiate CTF tournament featuring 15 custom wargame challenges designed by SATI Cyber Cell core researchers. Teams engaged in real-time attack-defense simulations with a live dynamic scoreboard.",
    image: "/images/events/event_1792524059137_2swvdc.jpg",
    images: [
      "/images/events/event_1792524059137_2swvdc.jpg",
      "/images/events/event_1792561674432_ngg70j.jpg"
    ],
    organizer: "Cyber Cell SATI",
    registrationLink: "",
    status: "Completed",
    category: "CTF",
    featured: false,
    tags: [
      "CTF",
      "WARGAMES",
      "ON CAMPUS"
    ],
    capacity: "60 Teams",
    prerequisites: "Familiarity with Linux terminal and web basics",
    toolsRequired: "Laptop with Kali Linux or Wireshark",
    createdAt: "2026-09-28T10:00:00.000Z",
    updatedAt: "2026-09-28T16:00:00.000Z"
  },
  {
    id: "evt_past_htb_campus_03",
    title: "Hack The Box Campus Edition",
    date: "2026-08-15",
    time: "10:00 AM - 02:00 PM",
    venue: "Seminar Hall & Online Labs, SATI Campus",
    mode: "Hybrid",
    description: "Walkthrough of Hack The Box retired machines, active directory compromise techniques, and privilege escalation methodologies.",
    longDescription: "A comprehensive guided lab session dissecting Linux and Windows vulnerabilities on Hack The Box machines with live shell demonstrations and methodology breakdowns.",
    image: "/images/events/event_1792561674432_ngg70j.jpg",
    images: [
      "/images/events/event_1792561674432_ngg70j.jpg"
    ],
    organizer: "Cyber Cell SATI",
    registrationLink: "",
    status: "Completed",
    category: "Workshop",
    featured: false,
    tags: [
      "HACK THE BOX",
      "PENTESTING",
      "HANDS-ON"
    ],
    capacity: "100+ Participants",
    prerequisites: "Basic command line understanding",
    toolsRequired: "Laptop with OpenVPN support",
    createdAt: "2026-08-15T10:00:00.000Z",
    updatedAt: "2026-08-15T15:00:00.000Z"
  },
  {
    id: "evt_past_careers_cyber_04",
    title: "Careers in Cybersecurity",
    date: "2026-07-10",
    time: "02:00 PM - 04:30 PM",
    venue: "Auditorium, SATI Campus",
    mode: "On-Campus",
    description: "Interactive roadmap discussion on bug bounties, SOC analyst roles, certifications (OSCP, CEH), and cybersecurity career pathways.",
    longDescription: "Guidance talk featuring senior student researchers and alumni working in cybersecurity. Detailed breakdown of resume preparation, portfolio development via GitHub writeups, and finding your niche in defense or offensive security.",
    image: "/images/events/event_1792561735498_z6d91j.jpg",
    images: [
      "/images/events/event_1792561735498_z6d91j.jpg"
    ],
    organizer: "Cyber Cell SATI",
    registrationLink: "",
    status: "Completed",
    category: "Talk",
    featured: false,
    tags: [
      "CAREERS",
      "ROADMAP",
      "MENTORSHIP"
    ],
    capacity: "Open to all students",
    prerequisites: "None",
    toolsRequired: "None (Notebook recommended)",
    createdAt: "2026-07-10T14:00:00.000Z",
    updatedAt: "2026-07-10T17:00:00.000Z"
  },
  {
    id: "evt_past_awareness_05",
    title: "Cyber Awareness Session",
    date: "2026-06-22",
    time: "11:30 AM - 01:30 PM",
    venue: "Central Computer Center (CCC), SATI Campus",
    mode: "On-Campus",
    description: "Campus-wide security hygiene, digital footprints, phishing identification, two-factor authentication, and safe browsing practices.",
    longDescription: "A hands-on demonstration of common phishing vectors, password cracking speeds, public Wi-Fi risks, and actionable steps students can take to protect their personal data and social credentials.",
    image: "/images/events/event_1792561669408_kvq6dp.jpg",
    images: [
      "/images/events/event_1792561669408_kvq6dp.jpg"
    ],
    organizer: "Cyber Cell SATI",
    registrationLink: "",
    status: "Completed",
    category: "Awareness",
    featured: false,
    tags: [
      "AWARENESS",
      "SAFETY",
      "CAMPUS"
    ],
    capacity: "120 Attendees",
    prerequisites: "None",
    toolsRequired: "Smartphone or Laptop",
    createdAt: "2026-06-22T11:00:00.000Z",
    updatedAt: "2026-06-22T14:00:00.000Z"
  }
];
