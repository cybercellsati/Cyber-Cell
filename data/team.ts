export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Leadership" | "Faculty" | "Executive" | "Core Team" | "Domain Lead";
  department?: string;
  confirmed: boolean;
  avatarPlaceholder?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
}

export const teamStructure = {
  founders: [
    {
      id: "founder-1",
      name: "Yash Harfode",
      role: "Founder & Advisor",
      category: "Leadership" as const,
      department: "Samrat Ashok Technological Institute (SATI), Vidisha",
      confirmed: true,
      bio: "Founder and Advisor of Cyber Cell under the Central Coding Club at SATI Vidisha. Spearheaded the institution's dedicated student cybersecurity initiative, establishing structured learning tracks in offensive security, network forensics, CTF training, and campus digital defense."
    }
  ],
  faculty: [
    {
      id: "fac-1",
      name: "Faculty Coordinator",
      role: "Faculty Advisor & Mentor",
      category: "Faculty" as const,
      department: "Computer Science & Engineering, SATI Vidisha",
      confirmed: false,
      bio: "Official faculty mentoring for Cyber Cell under the Central Coding Club, guiding student initiatives in compliance with academic guidelines."
    }
  ],
  executive: [
    {
      id: "exec-1",
      name: "President",
      role: "Club President",
      category: "Executive" as const,
      department: "SATI Vidisha",
      confirmed: false,
      bio: "Leads organizational strategy, oversees campus cyber initiatives, and liaises with the Central Coding Club."
    },
    {
      id: "exec-2",
      name: "Vice President",
      role: "Vice President",
      category: "Executive" as const,
      department: "SATI Vidisha",
      confirmed: false,
      bio: "Assists with cross-domain operations, lab resources, and technical workshop execution."
    },
    {
      id: "exec-3",
      name: "Secretary",
      role: "General Secretary",
      category: "Executive" as const,
      department: "SATI Vidisha",
      confirmed: false,
      bio: "Manages club documentation, membership coordination, and official correspondence."
    }
  ],
  core: [
    { id: "core-1", name: "Technical Lead", role: "Technical Operations Lead", category: "Core Team" as const, confirmed: false },
    { id: "core-2", name: "CTF & Competitions Lead", role: "CTF Coordinator", category: "Core Team" as const, confirmed: false },
    { id: "core-3", name: "Research & Projects Lead", role: "Projects Lead", category: "Core Team" as const, confirmed: false },
    { id: "core-4", name: "Events & Operations Lead", role: "Event Logistics Lead", category: "Core Team" as const, confirmed: false },
    { id: "core-5", name: "Design & Media Lead", role: "Creative Lead", category: "Core Team" as const, confirmed: false },
    { id: "core-6", name: "PR & Outreach Lead", role: "Outreach & Community Lead", category: "Core Team" as const, confirmed: false }
  ],
  domains: [
    { id: "dom-1", name: "Web Security Lead", role: "Domain Lead", category: "Domain Lead" as const, confirmed: false },
    { id: "dom-2", name: "Network Security Lead", role: "Domain Lead", category: "Domain Lead" as const, confirmed: false },
    { id: "dom-3", name: "Digital Forensics Lead", role: "Domain Lead", category: "Domain Lead" as const, confirmed: false },
    { id: "dom-4", name: "CTF Lead", role: "Domain Lead", category: "Domain Lead" as const, confirmed: false },
    { id: "dom-5", name: "Security Awareness Lead", role: "Domain Lead", category: "Domain Lead" as const, confirmed: false }
  ]
};
