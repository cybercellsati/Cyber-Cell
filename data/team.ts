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
  // In Executive Committee, ONLY Co-Convenor is placed as requested
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
  core: [
    {
      id: "core-anubhav",
      name: "Anubhav Pandey",
      tag: "TECHNICAL",
      role: "Technical Head",
      bio: "Handles technical operations, labs, and learning resources.",
      image: "/images/team/anubhav-pandey.jpg",
      email: "anubhav@cybercell.in",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      id: "core-atharva",
      name: "Atharva Balpande",
      tag: "CREATIVE",
      role: "Design & Media Head",
      bio: "Manages design, branding and creative assets.",
      image: "/images/team/atharva-balpande.jpg",
      email: "atharva@cybercell.in",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      id: "core-pranav",
      name: "Pranav Dixit",
      tag: "EVENTS",
      role: "Management & Volunteer Head",
      bio: "Coordinates events, workshops and volunteer activities.",
      image: "/images/team/pranav-dixit.jpg",
      email: "pranav@cybercell.in",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      id: "core-shivangi",
      name: "Shivangi Jain",
      tag: "OUTREACH",
      role: "Communication & Anchoring",
      bio: "Manages public communication, announcements and event anchoring.",
      image: "/images/team/shivangi-jain.jpg",
      email: "shivangi@cybercell.in",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      id: "core-abhishek",
      name: "Abhishek Yadav",
      tag: "MEDIA",
      role: "Media & Photography Head",
      bio: "Captures and manages media, photography and visual content.",
      image: "/images/team/abhishek-yadav.jpg",
      email: "abhishek@cybercell.in",
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
