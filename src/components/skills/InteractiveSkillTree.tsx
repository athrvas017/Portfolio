"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  Server,
  Layout,
  Terminal,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  Award,
  BookOpen,
  FolderGit2,
  X,
  Search,
  Maximize2,
  Minimize2,
  Layers,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { ACHIEVEMENTS, CERTIFICATIONS } from "@/data/profile";
import { PROJECTS } from "@/data/projects";

/* ─────────────────────────────────────────────────────────────────────────────
   Data Structures & Types
───────────────────────────────────────────────────────────────────────────── */

export interface SkillItem {
  id: string;
  name: string;
  tier: "Tier 1 · Core" | "Tier 2 · Applied" | "Tier 3 · Advanced";
  level: string; // e.g. "Mastered", "Advanced", "Proficient"
  description: string;
  dependsOn?: string[]; // IDs of predecessor skills in the tree
  relatedProjectSlugs: string[];
  relatedCertTitles: string[];
  relatedAchievementTitles: string[];
}

export interface SkillCategoryTree {
  id: string;
  name: string;
  code: string;
  badge: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  iconName: "code" | "ai" | "server" | "frontend" | "tools";
  summary: string;
  skills: SkillItem[];
}

export const SKILL_TREES: SkillCategoryTree[] = [
  {
    id: "languages",
    name: "Languages & Core Syntax",
    code: "SEC-01",
    badge: "FOUNDATION LAYER",
    color: "#c0c1ff",
    bgColor: "rgba(192,193,255,0.06)",
    borderColor: "rgba(192,193,255,0.25)",
    glowColor: "rgba(192,193,255,0.18)",
    iconName: "code",
    summary:
      "Core programming languages used for systems-level algorithms, machine learning pipelines, and full-stack applications.",
    skills: [
      {
        id: "python",
        name: "Python",
        tier: "Tier 1 · Core",
        level: "Mastered",
        description:
          "Primary language for ML modeling, deep learning architectures, RAG systems, and agentic workflows with LangChain/LangGraph.",
        relatedProjectSlugs: ["netshield", "medlearn", "zentrix"],
        relatedCertTitles: [
          "Python Programming",
          "Python for Data Science, AI & Development",
        ],
        relatedAchievementTitles: ["Hacktoberfest 2025 Super Contributor"],
      },
      {
        id: "cpp",
        name: "C / C++",
        tier: "Tier 1 · Core",
        level: "Advanced",
        description:
          "Systems-level programming, memory management, custom graph data structures, and algorithmic network routing engines.",
        dependsOn: ["python"],
        relatedProjectSlugs: ["nextstop"],
        relatedCertTitles: ["C++ Programming"],
        relatedAchievementTitles: ["Routing Rush — 3rd Place"],
      },
      {
        id: "typescript",
        name: "TypeScript",
        tier: "Tier 2 · Applied",
        level: "Mastered",
        description:
          "Type-safe application engineering for modern Next.js and React full-stack platforms with strict compiler checks.",
        dependsOn: ["python"],
        relatedProjectSlugs: ["carechain", "supplylens360"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "javascript",
        name: "JavaScript (ES6+)",
        tier: "Tier 1 · Core",
        level: "Mastered",
        description:
          "Modern asynchronous JavaScript, browser APIs, EventLoop execution, and client-side reactive programming.",
        relatedProjectSlugs: ["carechain", "forum-website"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "sql",
        name: "SQL",
        tier: "Tier 2 · Applied",
        level: "Advanced",
        description:
          "Relational schema modeling, index optimization, complex joins, and transactional consistency in PostgreSQL & SQLite.",
        dependsOn: ["cpp"],
        relatedProjectSlugs: ["nextstop", "carechain"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "htmlcss",
        name: "HTML5 / CSS3",
        tier: "Tier 1 · Core",
        level: "Mastered",
        description:
          "Semantic layout architecture, accessibility standards, CSS Grid/Flexbox, and responsive design systems.",
        relatedProjectSlugs: ["forum-website", "carechain"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
    ],
  },
  {
    id: "ai-ml",
    name: "AI, ML & Agentic Systems",
    code: "SEC-02",
    badge: "INTELLIGENCE ENGINE",
    color: "#ffb95f",
    bgColor: "rgba(255,185,95,0.06)",
    borderColor: "rgba(255,185,95,0.25)",
    glowColor: "rgba(255,185,95,0.18)",
    iconName: "ai",
    summary:
      "Deep learning frameworks, agentic reasoning pipelines, vector retrieval (RAG), and discriminative security classifiers.",
    skills: [
      {
        id: "pytorch",
        name: "PyTorch",
        tier: "Tier 1 · Core",
        level: "Advanced",
        description:
          "Tensor computing, custom neural layers, loss formulations, and deep learning model pipelines for generative & discriminative tasks.",
        relatedProjectSlugs: ["zentrix", "medlearn", "netshield"],
        relatedCertTitles: [
          "TensorFlow Fundamentals",
          "Deep Learning and Reinforcement Learning",
        ],
        relatedAchievementTitles: [],
      },
      {
        id: "agentic-ai",
        name: "Agentic AI & LangGraph",
        tier: "Tier 3 · Advanced",
        level: "Mastered",
        description:
          "Autonomous agent graphs, multi-agent supervisory orchestrations, structured tool execution loops, and persistent state machines.",
        dependsOn: ["pytorch"],
        relatedProjectSlugs: ["zentrix", "medlearn"],
        relatedCertTitles: [
          "Agentic AI with LangChain and LangGraph",
          "Fundamentals of Building AI Agents",
          "Develop Generative AI Applications — Get Started",
        ],
        relatedAchievementTitles: [],
      },
      {
        id: "rag-systems",
        name: "RAG & Vector Search",
        tier: "Tier 3 · Advanced",
        level: "Mastered",
        description:
          "Retrieval-Augmented Generation architectures with semantic vector embeddings, hybrid dense/sparse search, chunking strategies, and grounded hallucination mitigation.",
        dependsOn: ["pytorch"],
        relatedProjectSlugs: ["medlearn"],
        relatedCertTitles: [
          "Advanced RAG with Vector Databases and Retrievers",
          "Vector Databases for RAG — Introduction",
          "Build RAG Applications — Get Started",
        ],
        relatedAchievementTitles: [],
      },
      {
        id: "xgboost",
        name: "XGBoost & Ensembles",
        tier: "Tier 2 · Applied",
        level: "Mastered",
        description:
          "Gradient boosted trees, Random Forests, and hyperparameter tuning for low false-positive URL phishing threat classification.",
        dependsOn: ["pytorch"],
        relatedProjectSlugs: ["netshield"],
        relatedCertTitles: ["Data Science Bootcamp"],
        relatedAchievementTitles: [],
      },
      {
        id: "sklearn",
        name: "Scikit-Learn",
        tier: "Tier 1 · Core",
        level: "Mastered",
        description:
          "Classical machine learning algorithms, feature scaling, cross-validation splits, ROC-AUC metric tuning, and dimensionality reduction.",
        relatedProjectSlugs: ["netshield"],
        relatedCertTitles: ["Python for Data Science, AI & Development"],
        relatedAchievementTitles: [],
      },
      {
        id: "d3-graphs",
        name: "D3.js Graph Traversal",
        tier: "Tier 2 · Applied",
        level: "Advanced",
        description:
          "Force-directed dependency simulations, multi-tier supply chain risk propagation, and topological node centrality visualizations.",
        dependsOn: ["sklearn"],
        relatedProjectSlugs: ["supplylens360"],
        relatedCertTitles: [],
        relatedAchievementTitles: ["SYN3RGY 3.0 Hackathon — 2nd Runner-Up"],
      },
    ],
  },
  {
    id: "systems-backend",
    name: "Systems & Backend Services",
    code: "SEC-03",
    badge: "BACKBONE ARCHITECTURE",
    color: "#4edea3",
    bgColor: "rgba(78,222,163,0.06)",
    borderColor: "rgba(78,222,163,0.25)",
    glowColor: "rgba(78,222,163,0.18)",
    iconName: "server",
    summary:
      "Asynchronous REST APIs, high-throughput network architectures, graph traversal algorithms, and transactional data persistence.",
    skills: [
      {
        id: "fastapi",
        name: "FastAPI",
        tier: "Tier 2 · Applied",
        level: "Mastered",
        description:
          "High-performance asynchronous Python REST APIs for ML inference endpoints, Pydantic validation, and OpenAPI documentation.",
        relatedProjectSlugs: ["netshield"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "nodejs",
        name: "Node.js & Express",
        tier: "Tier 1 · Core",
        level: "Mastered",
        description:
          "Server-side JavaScript runtime for transactional backend services, middleware pipelines, JWT authentication, and session handling.",
        relatedProjectSlugs: ["carechain", "forum-website"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "graph-algos",
        name: "Graph Algos (BFS/DFS/DAG)",
        tier: "Tier 3 · Advanced",
        level: "Mastered",
        description:
          "Complex graph algorithms including topological sorting, Dijkstra shortest path, BFS/DFS cycle detection, and bottleneck risk scoring.",
        dependsOn: ["fastapi"],
        relatedProjectSlugs: ["supplylens360", "nextstop"],
        relatedCertTitles: [],
        relatedAchievementTitles: [
          "SYN3RGY 3.0 Hackathon — 2nd Runner-Up",
          "Routing Rush — 3rd Place",
        ],
      },
      {
        id: "rest-apis",
        name: "RESTful API Architecture",
        tier: "Tier 1 · Core",
        level: "Mastered",
        description:
          "Robust API contracts, HTTP status code semantics, rate-limiting, CORS policies, and versioned service endpoints.",
        relatedProjectSlugs: ["netshield", "carechain", "forum-website"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "relational-db",
        name: "PostgreSQL & SQLite",
        tier: "Tier 2 · Applied",
        level: "Advanced",
        description:
          "Relational database schemas, ACID transactions, B-tree indexes, foreign key constraints, and connection pooling.",
        dependsOn: ["rest-apis"],
        relatedProjectSlugs: ["nextstop", "carechain"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
    ],
  },
  {
    id: "frontend",
    name: "Frontend & Reactive Interfaces",
    code: "SEC-04",
    badge: "INTERFACE ENGINE",
    color: "#a5b4fc",
    bgColor: "rgba(165,180,252,0.06)",
    borderColor: "rgba(165,180,252,0.25)",
    glowColor: "rgba(165,180,252,0.18)",
    iconName: "frontend",
    summary:
      "Modern component-driven web interfaces, reactive state management, micro-interactions, and high-performance server-side rendering.",
    skills: [
      {
        id: "react",
        name: "React 19",
        tier: "Tier 1 · Core",
        level: "Mastered",
        description:
          "Modern component architecture, hooks ecosystem, concurrent features, context state orchestration, and virtual DOM diffing.",
        relatedProjectSlugs: ["supplylens360", "carechain"],
        relatedCertTitles: [],
        relatedAchievementTitles: ["SYN3RGY 3.0 Hackathon — 2nd Runner-Up"],
      },
      {
        id: "nextjs",
        name: "Next.js (App Router)",
        tier: "Tier 2 · Applied",
        level: "Mastered",
        description:
          "Full-stack React framework with Server Components (RSC), hybrid SSR/SSG rendering, dynamic route handlers, and SEO optimization.",
        dependsOn: ["react"],
        relatedProjectSlugs: ["carechain", "forum-website"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        tier: "Tier 1 · Core",
        level: "Mastered",
        description:
          "Utility-first styling with custom design tokens, responsive breakpoints, dark mode integration, and custom CSS variables.",
        dependsOn: ["react"],
        relatedProjectSlugs: ["carechain", "forum-website"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "framer-motion",
        name: "Framer Motion",
        tier: "Tier 2 · Applied",
        level: "Advanced",
        description:
          "Physics-based spring animations, layout transitions, exit/enter animations, and custom interactive gesture mechanics.",
        dependsOn: ["react"],
        relatedProjectSlugs: [],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
    ],
  },
  {
    id: "tools-devops",
    name: "Tools, DevOps & Cloud",
    code: "SEC-05",
    badge: "OPERATIONAL RUNTIME",
    color: "#f59e0b",
    bgColor: "rgba(245,158,11,0.06)",
    borderColor: "rgba(245,158,11,0.25)",
    glowColor: "rgba(245,158,11,0.18)",
    iconName: "tools",
    summary:
      "Version control, collaborative open-source workflows, Unix systems administration, and production PaaS cloud deployments.",
    skills: [
      {
        id: "git-github",
        name: "Git & GitHub CI",
        tier: "Tier 1 · Core",
        level: "Mastered",
        description:
          "Distributed version control, atomic commits, interactive rebasing, merge conflict resolution, and open-source contribution PRs.",
        relatedProjectSlugs: ["netshield", "supplylens360", "carechain"],
        relatedCertTitles: [],
        relatedAchievementTitles: ["Hacktoberfest 2025 Super Contributor"],
      },
      {
        id: "linux-bash",
        name: "Linux / Bash Shell",
        tier: "Tier 1 · Core",
        level: "Advanced",
        description:
          "Unix terminal workflow, process inspection (htop/ps), shell automation scripts, SSH key management, and package management.",
        relatedProjectSlugs: ["netshield"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "render-cloud",
        name: "Render PaaS Deployment",
        tier: "Tier 2 · Applied",
        level: "Advanced",
        description:
          "Cloud web service hosting, environment secret injection, continuous build pipelines, and production health monitoring for NetShield.",
        dependsOn: ["git-github"],
        relatedProjectSlugs: ["netshield"],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "vercel-edge",
        name: "Vercel Edge Network",
        tier: "Tier 2 · Applied",
        level: "Mastered",
        description:
          "Zero-configuration Next.js edge deployments, preview branch generation, and automatic SSL termination.",
        dependsOn: ["git-github"],
        relatedProjectSlugs: [],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
      {
        id: "vscode-tooling",
        name: "VS Code & Dev Tooling",
        tier: "Tier 1 · Core",
        level: "Mastered",
        description:
          "Custom extension configs, ESLint/Prettier formatters, interactive debuggers, and terminal multiplexing.",
        relatedProjectSlugs: [],
        relatedCertTitles: [],
        relatedAchievementTitles: [],
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Category Icon Helper
───────────────────────────────────────────────────────────────────────────── */
const CategoryIcon: React.FC<{
  name: SkillCategoryTree["iconName"];
  className?: string;
}> = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case "code":
      return <Code2 className={className} />;
    case "ai":
      return <BrainCircuit className={className} />;
    case "server":
      return <Server className={className} />;
    case "frontend":
      return <Layout className={className} />;
    case "tools":
      return <Terminal className={className} />;
    default:
      return <Cpu className={className} />;
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   Holographic Skill Inspector Modal
───────────────────────────────────────────────────────────────────────────── */
interface SkillInspectorProps {
  skill: SkillItem;
  category: SkillCategoryTree;
  onClose: () => void;
}

const SkillInspectorModal: React.FC<SkillInspectorProps> = ({
  skill,
  category,
  onClose,
}) => {
  // Resolve linked projects
  const linkedProjects = useMemo(() => {
    return PROJECTS.filter((p) => skill.relatedProjectSlugs.includes(p.slug));
  }, [skill.relatedProjectSlugs]);

  // Resolve linked certs
  const linkedCerts = useMemo(() => {
    return CERTIFICATIONS.filter((c) =>
      skill.relatedCertTitles.some(
        (t) =>
          c.title.toLowerCase().includes(t.toLowerCase()) ||
          t.toLowerCase().includes(c.title.toLowerCase())
      )
    );
  }, [skill.relatedCertTitles]);

  // Resolve linked achievements
  const linkedAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter((a) =>
      skill.relatedAchievementTitles.some(
        (t) =>
          a.title.toLowerCase().includes(t.toLowerCase()) ||
          t.toLowerCase().includes(a.title.toLowerCase())
      )
    );
  }, [skill.relatedAchievementTitles]);

  // Keyboard escape listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col"
        style={{
          background: "#0c0e13",
          border: `1px solid ${category.borderColor}`,
          boxShadow: `0 0 60px -15px ${category.glowColor}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header telemetry stripe */}
        <div
          className="px-6 py-4 flex items-center justify-between border-b"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "rgba(17,19,24,0.8)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-sm rotate-45"
              style={{
                background: category.color,
                boxShadow: `0 0 10px ${category.color}`,
              }}
            />
            <span
              className="label-caps font-mono text-[11px] font-bold"
              style={{ color: category.color }}
            >
              {category.code} · {category.badge}
            </span>
            <span className="text-ss-on-surface-var text-xs font-mono">
              NODE_ID: {skill.id.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-ss-on-surface-var hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Skill Name & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="label-caps text-[10px] text-ss-on-surface-var">
                  NODE SPECIFICATION
                </span>
                <span
                  className="label-caps text-[9px] px-2 py-0.5 rounded"
                  style={{
                    background: category.bgColor,
                    border: `1px solid ${category.borderColor}`,
                    color: category.color,
                  }}
                >
                  {skill.tier}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {skill.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: category.color }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ background: category.color }}
                />
              </span>
              <span
                className="telemetry-code font-bold text-xs"
                style={{ color: category.color }}
              >
                STATUS: {skill.level.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Skill Description */}
          <div className="bg-[#111318] p-4 rounded-xl border border-white/5">
            <span className="label-caps text-[10px] text-ss-on-surface-var block mb-2">
              APPLIED COMPETENCY &amp; USAGE
            </span>
            <p className="font-sans text-sm text-ss-on-surface leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Related Projects */}
          {linkedProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FolderGit2
                  className="w-4 h-4"
                  style={{ color: category.color }}
                />
                <span className="label-caps text-xs font-bold text-ss-on-surface">
                  LINKED PROJECTS &amp; CODEBASES ({linkedProjects.length})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {linkedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects#${project.slug}`}
                    className="group block p-3.5 rounded-xl bg-[#111318] border border-white/5 hover:border-ss-primary/40 transition-all hover:shadow-[0_0_15px_rgba(192,193,255,0.1)]"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-display text-sm font-bold text-white group-hover:text-ss-primary transition-colors">
                        {project.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-ss-on-surface-var group-hover:text-ss-primary transition-colors" />
                    </div>
                    <p className="font-sans text-xs text-ss-on-surface-var line-clamp-2">
                      {project.oneLiner}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="label-caps text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-ss-on-surface-var"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Certifications */}
          {linkedCerts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-ss-secondary" />
                <span className="label-caps text-xs font-bold text-ss-on-surface">
                  VERIFIED CERTIFICATIONS ({linkedCerts.length})
                </span>
              </div>
              <div className="space-y-2">
                {linkedCerts.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-3.5 rounded-xl bg-[#111318] border border-white/5 flex items-start justify-between gap-3"
                  >
                    <div>
                      <span className="font-display text-sm font-semibold text-white block">
                        {cert.title}
                      </span>
                      <span className="font-mono text-xs text-ss-secondary mt-0.5 block">
                        {cert.issuer} · {cert.date}
                      </span>
                      <p className="font-sans text-xs text-ss-on-surface-var mt-1">
                        {cert.description}
                      </p>
                    </div>
                    {cert.pdfPath && (
                      <a
                        href={cert.pdfPath}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 p-2 rounded bg-white/5 hover:bg-white/10 text-ss-secondary transition-colors"
                        title="View Certificate PDF"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Achievements */}
          {linkedAchievements.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-ss-tertiary" />
                <span className="label-caps text-xs font-bold text-ss-on-surface">
                  RELEVANT ACHIEVEMENTS &amp; HONORS (
                  {linkedAchievements.length})
                </span>
              </div>
              <div className="space-y-2">
                {linkedAchievements.map((ach) => (
                  <div
                    key={ach.title}
                    className="p-3.5 rounded-xl bg-[#111318] border border-white/5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-bold text-white">
                        {ach.title}
                      </span>
                      <span className="telemetry-code text-[10px] text-ss-tertiary">
                        {ach.date}
                      </span>
                    </div>
                    <span className="label-caps text-[10px] text-ss-on-surface-var block mt-0.5">
                      {ach.roleOrContext}
                    </span>
                    <p className="font-sans text-xs text-ss-on-surface-var mt-1.5">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If no linked items */}
          {linkedProjects.length === 0 &&
            linkedCerts.length === 0 &&
            linkedAchievements.length === 0 && (
              <div className="p-4 rounded-xl bg-[#111318] border border-white/5 text-center">
                <p className="font-mono text-xs text-ss-on-surface-var">
                  Foundation toolchain asset used across all repositories and
                  infrastructure environments.
                </p>
              </div>
            )}
        </div>

        {/* Modal Footer */}
        <div
          className="px-6 py-3.5 flex items-center justify-between border-t text-xs font-mono text-ss-on-surface-var"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "rgba(17,19,24,0.9)",
          }}
        >
          <span>PRESS ESC OR CLICK OUTSIDE TO DISMISS</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded label-caps text-xs font-bold transition-colors"
            style={{
              background: category.bgColor,
              border: `1px solid ${category.borderColor}`,
              color: category.color,
            }}
          >
            CLOSE DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Main Interactive Skill Tree Component
───────────────────────────────────────────────────────────────────────────── */
interface InteractiveSkillTreeProps {
  initialExpandedId?: string | null; // e.g. "languages" or null for all collapsed
  showAllControls?: boolean;
}

export const InteractiveSkillTree: React.FC<InteractiveSkillTreeProps> = ({
  initialExpandedId = "languages",
  showAllControls = true,
}) => {
  // Set of expanded category IDs. Default: first category expanded, or set all
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(initialExpandedId ? [initialExpandedId] : [])
  );

  // Inspected skill state
  const [inspectedSkillData, setInspectedSkillData] = useState<{
    skill: SkillItem;
    category: SkillCategoryTree;
  } | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle single category
  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) {
        next.delete(catId);
      } else {
        next.add(catId);
      }
      return next;
    });
  };

  // Expand all categories
  const expandAll = () => {
    setExpandedCategories(new Set(SKILL_TREES.map((c) => c.id)));
  };

  // Collapse all categories
  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  // Total active skills count
  const totalSkillsCount = useMemo(() => {
    return SKILL_TREES.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  return (
    <div className="relative w-full">
      {/* ── Central Control HUD Bar ── */}
      {showAllControls && (
        <div
          className="mb-8 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{
            background: "linear-gradient(135deg, #111318 0%, #0c0e13 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 24px -6px rgba(0,0,0,0.5)",
          }}
        >
          {/* Left: Telemetry badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-[#1a1b21] px-3 py-1.5 rounded-lg border border-white/5">
              <span className="w-2 h-2 rounded-full bg-ss-primary animate-pulse" />
              <span className="label-caps text-[10px] text-ss-primary font-bold">
                SYSTEM CORE ONLINE
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-ss-on-surface-var">
              <span>{SKILL_TREES.length} SECTORS</span>
              <span>·</span>
              <span className="text-ss-secondary">{totalSkillsCount} NODES</span>
              <span>·</span>
              <span className="text-ss-tertiary">
                {expandedCategories.size} BRANCHES EXTENDED
              </span>
            </div>
          </div>

          {/* Right: Search & Expand Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-ss-on-surface-var absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search node / skill..."
                className="bg-[#1a1b21] text-xs font-mono text-white pl-8 pr-3 py-1.5 rounded-lg border border-white/10 focus:border-ss-primary focus:outline-none placeholder:text-ss-on-surface-var/60 w-44 sm:w-56"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-ss-on-surface-var hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 rounded-lg label-caps text-[10px] font-bold text-ss-on-surface bg-[#1a1b21] hover:bg-white/10 border border-white/5 transition-colors flex items-center gap-1.5"
                title="Extend all skill branches"
              >
                <Maximize2 className="w-3 h-3 text-ss-primary" />
                <span>EXTEND ALL</span>
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-lg label-caps text-[10px] font-bold text-ss-on-surface-var bg-[#1a1b21] hover:bg-white/10 border border-white/5 transition-colors flex items-center gap-1.5"
                title="Collapse all skill branches"
              >
                <Minimize2 className="w-3 h-3" />
                <span>COLLAPSE</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Tree Container ── */}
      <div className="space-y-6">
        {SKILL_TREES.map((category, catIdx) => {
          const isExpanded =
            searchQuery.trim().length > 0 || expandedCategories.has(category.id);

          // Filter skills if search active
          const filteredSkills = searchQuery.trim()
            ? category.skills.filter(
                (s) =>
                  s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  s.tier.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : category.skills;

          if (searchQuery.trim() && filteredSkills.length === 0) {
            return null; // Hide category if no match
          }

          return (
            <div
              key={category.id}
              className="relative rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, #111318 0%, #0c0e13 100%)`,
                border: `1px solid ${
                  isExpanded ? category.borderColor : "rgba(255,255,255,0.07)"
                }`,
                boxShadow: isExpanded
                  ? `0 0 50px -15px ${category.glowColor}, inset 0 0 40px -25px ${category.glowColor}`
                  : "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {/* ── Category Root Node Header (Click to Extend / Collapse) ── */}
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 group focus:outline-none cursor-pointer"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-4">
                  {/* Category Hex/Diamond Sigil Icon */}
                  <div
                    className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: category.bgColor,
                      border: `1px solid ${category.borderColor}`,
                      boxShadow: isExpanded
                        ? `0 0 20px ${category.glowColor}`
                        : "none",
                    }}
                  >
                    <div style={{ color: category.color }}>
                      <CategoryIcon name={category.iconName} className="w-5 h-5" />
                    </div>
                    {/* Small pulsing corner indicator */}
                    <span
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                      style={{
                        background: category.color,
                        boxShadow: `0 0 8px ${category.color}`,
                      }}
                    />
                  </div>

                  {/* Title and Telemetry */}
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="label-caps font-mono text-[10px] font-bold"
                        style={{ color: category.color }}
                      >
                        {category.code} · {category.badge}
                      </span>
                      <span className="text-white/20 text-xs hidden sm:inline">
                        ·
                      </span>
                      <span className="telemetry-code text-[11px] text-ss-on-surface-var">
                        {category.skills.length} NODES
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-ss-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Right: Expand / Collapse Toggle Badge */}
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className="hidden md:inline-flex items-center gap-1.5 label-caps text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all"
                    style={{
                      background: isExpanded
                        ? category.bgColor
                        : "rgba(255,255,255,0.04)",
                      border: `1px solid ${
                        isExpanded
                          ? category.borderColor
                          : "rgba(255,255,255,0.08)"
                      }`,
                      color: isExpanded ? category.color : "#9da3ae",
                    }}
                  >
                    {isExpanded ? (
                      <>
                        <span>BRANCH EXTENDED</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        <span>CLICK TO EXTEND TREE</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </span>

                  {/* Mobile toggle arrow */}
                  <div
                    className="md:hidden p-2 rounded-lg bg-white/5 text-ss-on-surface-var group-hover:text-white transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>

              {/* ── Extended Skill Tree Branch (Animated) ── */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-5 sm:px-6 pb-6 pt-2 border-t"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      {/* Branch summary & instruction strip */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 py-2.5 px-4 rounded-xl bg-[#090b0e] border border-white/5">
                        <p className="font-sans text-xs text-ss-on-surface-var">
                          {category.summary}
                        </p>
                        <span
                          className="label-caps font-mono text-[9px] shrink-0 self-start sm:self-auto"
                          style={{ color: category.color }}
                        >
                          ◆ CLICK ANY NODE TO INSPECT
                        </span>
                      </div>

                      {/* ── Game Skill Nodes Grid / Hierarchy ── */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSkills.map((skill, sIdx) => {
                          const hasProjects =
                            skill.relatedProjectSlugs.length > 0;
                          const hasCerts = skill.relatedCertTitles.length > 0;
                          const hasAchievements =
                            skill.relatedAchievementTitles.length > 0;

                          return (
                            <motion.div
                              key={skill.id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: sIdx * 0.04,
                                duration: 0.3,
                              }}
                              onClick={() =>
                                setInspectedSkillData({ skill, category })
                              }
                              className="group relative p-4 rounded-xl bg-[#14161d] border hover:bg-[#1a1c26] transition-all duration-200 cursor-pointer flex flex-col justify-between"
                              style={{
                                borderColor: "rgba(255,255,255,0.08)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor =
                                  category.color;
                                e.currentTarget.style.boxShadow = `0 0 20px -5px ${category.glowColor}`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor =
                                  "rgba(255,255,255,0.08)";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              {/* Top row: Tier badge & status indicator */}
                              <div className="flex items-center justify-between gap-2 mb-2.5">
                                <span
                                  className="label-caps font-mono text-[9px] px-2 py-0.5 rounded"
                                  style={{
                                    background: category.bgColor,
                                    border: `1px solid ${category.borderColor}`,
                                    color: category.color,
                                  }}
                                >
                                  {skill.tier}
                                </span>

                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ background: category.color }}
                                  />
                                  <span className="telemetry-code text-[10px] text-ss-on-surface-var">
                                    {skill.level}
                                  </span>
                                </div>
                              </div>

                              {/* Skill Name */}
                              <div className="mb-2">
                                <h4 className="font-display text-base font-bold text-white group-hover:text-ss-primary transition-colors flex items-center justify-between">
                                  <span>{skill.name}</span>
                                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-ss-primary shrink-0" />
                                </h4>
                                <p className="font-sans text-xs text-ss-on-surface-var line-clamp-2 mt-1 leading-relaxed">
                                  {skill.description}
                                </p>
                              </div>

                              {/* Bottom telemetry badges */}
                              <div
                                className="pt-3 mt-2 flex items-center justify-between gap-2 border-t"
                                style={{ borderColor: "rgba(255,255,255,0.05)" }}
                              >
                                <div className="flex items-center gap-2">
                                  {hasProjects && (
                                    <span
                                      className="label-caps text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-ss-on-surface-var flex items-center gap-1"
                                      title={`${skill.relatedProjectSlugs.length} related projects`}
                                    >
                                      <FolderGit2 className="w-2.5 h-2.5 text-ss-primary" />
                                      {skill.relatedProjectSlugs.length}P
                                    </span>
                                  )}
                                  {hasCerts && (
                                    <span
                                      className="label-caps text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-ss-on-surface-var flex items-center gap-1"
                                      title={`${skill.relatedCertTitles.length} verified certifications`}
                                    >
                                      <BookOpen className="w-2.5 h-2.5 text-ss-secondary" />
                                      {skill.relatedCertTitles.length}C
                                    </span>
                                  )}
                                  {hasAchievements && (
                                    <span
                                      className="label-caps text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-ss-on-surface-var flex items-center gap-1"
                                      title={`${skill.relatedAchievementTitles.length} related honors`}
                                    >
                                      <Award className="w-2.5 h-2.5 text-ss-tertiary" />
                                      {skill.relatedAchievementTitles.length}A
                                    </span>
                                  )}
                                </div>

                                <span
                                  className="label-caps text-[9px] font-bold group-hover:translate-x-0.5 transition-transform"
                                  style={{ color: category.color }}
                                >
                                  INSPECT →
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── Holographic Inspector Modal ── */}
      {inspectedSkillData && (
        <SkillInspectorModal
          skill={inspectedSkillData.skill}
          category={inspectedSkillData.category}
          onClose={() => setInspectedSkillData(null)}
        />
      )}
    </div>
  );
};
