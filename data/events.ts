export interface CyberEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD or formatted date
  time: string; // e.g. "10:00 AM - 04:00 PM"
  venue: string;
  mode: "On-Campus" | "Online" | "Hybrid";
  description: string;
  longDescription?: string;
  image?: string; // Poster or banner URL
  organizer: string;
  registrationLink?: string;
  status: "Upcoming" | "Live" | "Completed" | "Tentative";
  category: "Workshop" | "CTF" | "Talk" | "Awareness" | "Orientation" | "Bootcamp" | "Seminar" | "Tech Talk" | "Hackathon";
  featured?: boolean;
  tags?: string[];
  capacity?: string;
  createdAt?: string;
  updatedAt?: string;
}

// In accordance with data integrity guidelines:
// Unconfirmed or hypothetical events are omitted. Real club announcements will be appended here.
export const upcomingEvents: CyberEvent[] = [
  // Empty until officially scheduled and verified by Cyber Cell, SATI Vidisha
];

export const pastEvents: CyberEvent[] = [
  // Past event archive will be maintained here
];
