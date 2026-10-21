import profileData from "../../public/data/profile.json";
import skillsData from "../../public/data/skills.json";
import achievementsData from "../../public/data/achievements.json";
import certificationsData from "../../public/data/certifications.json";
import educationData from "../../public/data/education.json";

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  roleOrContext: string;
  date: string;
  description: string;
  links?: { label: string; url: string }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  details?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  category: "AI & ML" | "Data Science" | "Systems";
  date: string;
  pdfPath: string;
  description: string;
  issuerColor: string;
}

// ── Exports loaded from JSON ───────────────────────────────────────────────────
// To update your portfolio content, edit the files in public/data/ instead of here.

export const PROFILE = profileData;

export const SKILL_CATEGORIES: SkillCategory[] = skillsData as SkillCategory[];

export const ACHIEVEMENTS: Achievement[] = achievementsData as Achievement[];

export const CERTIFICATIONS: Certification[] = certificationsData as Certification[];

export const EDUCATION: EducationItem[] = educationData as EducationItem[];
