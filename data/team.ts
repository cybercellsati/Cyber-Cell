export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Convenor" | "Club Secretary" | "Co-Convenor" | "Technical Head" | "Management & Media Head" | "Graphic & Public Speaking Head" | "Faculty Advisor";
  bio: string;
  image: string;
  department?: string;
  email?: string;
  linkedin?: string;
  github?: string;
}

export const convenor: TeamMember = {
  id: "convenor",
  name: "Yash Harfode",
  role: "Convenor",
  category: "Convenor",
  department: "Samrat Ashok Technological Institute, Vidisha",
  bio: "Founder and Convenor leading club vision, CTF training tracks, defensive security labs, and student community mentoring at SATI Vidisha.",
  image: "/images/team/yash-harfode.png",
  email: "yash@cybercell.in",
  linkedin: "https://linkedin.com/in/yashharfode",
  github: "https://github.com/yashharfode",
};

export const clubSecretary: TeamMember = {
  id: "secretary",
  name: "Ansh Kushwaha",
  role: "Club Secretary",
  category: "Club Secretary",
  department: "Samrat Ashok Technological Institute, Vidisha",
  bio: "Overseeing executive administration, member relations, official communications, and cross-team operational workflows.",
  image: "/images/team/ansh-kushwaha.png",
  email: "ansh@cybercell.in",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
};

export const coConvenors: TeamMember[] = [
  {
    id: "co-convenor-abhishek",
    name: "Abhishek Mahore",
    role: "Co-Convenor",
    category: "Co-Convenor",
    department: "Samrat Ashok Technological Institute, Vidisha",
    bio: "Assisting club leadership in strategic planning, event logistics, inter-college outreach, and team coordination.",
    image: "/images/team/abhishek-mahore.jpg",
    email: "abhishek@cybercell.in",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "co-convenor-krishna",
    name: "Krishna Mishra",
    role: "Co-Convenor",
    category: "Co-Convenor",
    department: "Samrat Ashok Technological Institute, Vidisha",
    bio: "Driving overall club strategy, workshop execution, member development, and campus cybersecurity awareness.",
    image: "/images/team/krishna-mishra.png",
    email: "krishna@cybercell.in",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
];

export const domainHeads: TeamMember[] = [
  {
    id: "head-tech",
    name: "Anubhav Vishwkarma",
    role: "Technical Head",
    category: "Technical Head",
    department: "Samrat Ashok Technological Institute, Vidisha",
    bio: "Leading technical infrastructure, CTF challenge design, offensive security tracks, and developer projects.",
    image: "/images/team/anubhav.png",
    email: "anubhav@cybercell.in",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "head-management-media",
    name: "Divyansh Chaurey",
    role: "Management & Media Head",
    category: "Management & Media Head",
    department: "Samrat Ashok Technological Institute, Vidisha",
    bio: "Heading on-ground event management, media coverage, photography, video production, and publicity campaigns.",
    image: "/images/team/divyansh-chaurey.png",
    email: "divyansh@cybercell.in",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "head-graphic-speaking",
    name: "Arya Mishra",
    role: "Graphic & Public Speaking Head",
    category: "Graphic & Public Speaking Head",
    department: "Samrat Ashok Technological Institute, Vidisha",
    bio: "Directing brand aesthetics, visual design assets, UI/UX, official announcements, and stage presentations.",
    image: "/images/team/arya-mishra.jpg",
    email: "arya@cybercell.in",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
];

export const facultyAdvisor: TeamMember = {
  id: "faculty-advisor",
  name: "Prof. Shivangi Jain",
  role: "Faculty Advisor & Mentor",
  category: "Faculty Advisor",
  department: "Department of Computer Science & Engineering, SATI Vidisha",
  bio: "Guiding institutional compliance, academic ethics, technical research, and student mentorship at SATI Vidisha.",
  image: "/images/team/shivangi-jain.jpg",
  email: "shivangijain@satiengg.in",
};

export const coreTeamMembers: TeamMember[] = [
  convenor,
  clubSecretary,
  coConvenors[0], // Abhishek Mahore
  coConvenors[1], // Krishna Mishra
  domainHeads[0], // Anubhav Vishwkarma
  domainHeads[1], // Divyansh Chaurey
  domainHeads[2], // Arya Mishra
];

export const allTeamMembers: TeamMember[] = [
  ...coreTeamMembers,
  facultyAdvisor,
];

// Backwards-compatible export
export const teamData = {
  founder: convenor,
  secretary: clubSecretary,
  coConvenors,
  heads: domainHeads,
  faculty: facultyAdvisor,
  coreTeam: coreTeamMembers,
  all: allTeamMembers,
  // legacy aliases
  executive: coConvenors,
  core: domainHeads,
};
