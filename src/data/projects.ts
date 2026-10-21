import projectsData from "../../public/data/projects.json";

// ── Interface ─────────────────────────────────────────────────────────────────

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  status: "Shipped" | "In Progress" | "Code Coming Soon";
  role: string;
  collaborators?: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  tags: ("AI/ML" | "Systems/Backend" | "Web" | "Hackathon")[];
  featured: boolean;
  featuredOrder?: number;
  problem: string;
  approach: string;
  architectureDetails: string[];
  outcomes: string[];
}

// ── Export loaded from JSON ────────────────────────────────────────────────────
// To add / edit projects, update public/data/projects.json instead of this file.

export const PROJECTS: Project[] = projectsData as Project[];
