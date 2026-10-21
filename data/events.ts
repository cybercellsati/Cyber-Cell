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

// Real club event created via admin portal:
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
    tags: ["Live Demo", "Try Hack Me"],
    capacity: "160",
    prerequisites: "None (Curiosity & Passion for Tech)",
    toolsRequired: "Laptop",
    agenda: "10:00 AM: Keynote | 11:15 AM: Live Cyber Range Attack/Defend Demo | 12:15 PM: Interactive CTF Mini-Wargame",
    speakers: [
      { name: "Yash Harfode", role: "Founder & Convenor", org: "Cyber Cell SATI" },
      { name: "Krishna Mishra", role: "Co-Convenor & Security Lead", org: "Cyber Cell SATI" }
    ],
    createdAt: "2026-10-20T19:22:18.107Z",
    updatedAt: "2026-10-21T05:30:00.000Z"
  }
];

// Real past event archive will be populated as events conclude
export const pastEvents: CyberEvent[] = [];
