export interface CoreMember {
  id: string;
  name: string;
  role: string;
  tag: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
  github?: string;
}

export interface DomainLead {
  id: string;
  title: string;
  role: string;
  link: string;
}

export const teamData = {
  founder: {
    name: "Yash Harfode",
    tag: "LEADERSHIP",
    role: "Founder & Advisor",
    department: "Samrat Ashok Technological Institute (SATI), Vidisha",
    bio: "Founder and Advisor of Cyber Cell under the Central Coding Club at SATI Vidisha. Spearheaded the institution's cybersecurity initiative, establishing structured learning tracks in offensive security, network forensics, CTF training, and campus digital defense.",
    image: "/images/team/yash-harfode.jpg",
    email: "yash@cybercell.in",
    linkedin: "https://linkedin.com/in/yashharfode",
    github: "https://github.com/yashharfode",
  },
  // In Executive Committee, ONLY Co-Convenor is placed per user specification
  executive: [
    {
      id: "exec-co-convenor",
      name: "Krishna Mishra",
      tag: "EXECUTIVE ROLE",
      role: "Co-Convenor",
      bio: "Assists in overall club management, strategy, and coordination across all domains.",
      image: "/images/team/krishna-mishra.jpg",
      email: "krishna@cybercell.in",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  ],
  // Core Operations Team (Heads)
  core: [
    {
      id: "head-tech",
      name: "Anubhav Vishwkarma",
      tag: "TECHNICAL",
      role: "Tech Team Head",
      bio: "Handles technical operations, lab infrastructure, CTF environments, and developer resources.",
      image: "/images/team/anubhav-vishwkarma.jpg",
      email: "anubhav@cybercell.in",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      id: "head-media",
      name: "Abhishek Mahore",
      tag: "MEDIA",
      role: "Media & Photography Head",
      bio: "Captures and manages media production, photography, video coverage, and visual storytelling.",
      image: "/images/team/abhishek-mahore.jpg",
      email: "abhishek@cybercell.in",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      id: "head-design",
      name: "Arya Mishra",
      tag: "CREATIVE",
      role: "Graphic Designer Head",
      bio: "Directs visual identity, creative assets, UI/UX, and branding for Cyber Cell initiatives.",
      image: "/images/team/arya-mishra.jpg",
      email: "arya@cybercell.in",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      id: "head-management",
      name: "Ansh Kushwaha & Divyansh Chourey",
      tag: "MANAGEMENT",
      role: "Management & Volunteers Head",
      bio: "Coordinates event execution, volunteer mobilization, workshop logistics, and member management.",
      image: "/images/team/ansh-kushwaha.jpg",
      email: "ansh@cybercell.in",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      id: "head-outreach",
      name: "Medhavi Sharma",
      tag: "COMMUNICATIONS",
      role: "Documentation & Anchoring Head",
      bio: "Manages official club documentation, announcements, event anchoring, and student community outreach.",
      image: "/images/team/medhavi-sharma.jpg",
      email: "medhavi@cybercell.in",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  ],
  domains: [
    {
      id: "dom-web",
      title: "Web Security Lead",
      role: "Domain Lead",
      link: "/domains",
    },
    {
      id: "dom-network",
      title: "Network Security Lead",
      role: "Domain Lead",
      link: "/domains",
    },
    {
      id: "dom-forensics",
      title: "Digital Forensics Lead",
      role: "Domain Lead",
      link: "/domains",
    },
  ],
};

// Backwards compatibility export
export const teamStructure = {
  founders: [teamData.founder],
  executive: teamData.executive,
  core: teamData.core,
  domains: teamData.domains,
};
