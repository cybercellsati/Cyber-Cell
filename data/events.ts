export interface CyberEvent {
  id: string;
  title: string;
  date: string; // ISO or formatted date
  time: string;
  venue: string;
  mode: "On-Campus" | "Online" | "Hybrid";
  description: string;
  organizer: string;
  registrationLink?: string;
  status: "Upcoming" | "Live" | "Completed" | "Tentative";
  category: "Workshop" | "CTF" | "Talk" | "Awareness" | "Orientation";
}

// In accordance with data integrity guidelines:
// Unconfirmed or hypothetical events are omitted. Real club announcements will be appended here.
export const upcomingEvents: CyberEvent[] = [
  // Empty until officially scheduled and verified by Cyber Cell & SATI Central Coding Club
];

export const pastEvents: CyberEvent[] = [
  // Past event archive will be maintained here
];
