export interface CyberProject {
  id: string;
  name: string;
  description: string;
  category: "Security Tools" | "Web Security" | "CTF" | "Automation" | "Awareness" | "Research";
  status: "Planning" | "In Development" | "Active" | "Archived";
  team: string[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

// In accordance with data integrity guidelines:
// Do not invent completed projects. Real projects under development by club members are cataloged here.
export const projectsData: CyberProject[] = [];
