import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, Project } from "@/data/projects";
import { MODELS } from "@/data/models";
import { PROFILE } from "@/data/profile";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Code2,
  Layers,
  AlertTriangle,
  Lightbulb,
  Terminal,
} from "lucide-react";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const prevProject =
    PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];

  // Check if a model entry relates to this project
  const relatedModel = MODELS.find(
    (m) =>
      m.slug.toLowerCase().includes(project.slug.toLowerCase()) ||
      (project.slug === "netshield" && m.slug.includes("netshield")) ||
      (project.slug === "supplylens360" && m.slug.includes("supplylens")) ||
      (project.slug === "zenith" && m.slug.includes("zenith")) ||
      (project.slug === "medlearn" && m.slug.includes("medlearn"))
  );

  return (
    <div className="bg-[#101113] text-[#F0EDE6] min-h-screen relative overflow-x-hidden">
      {/* Blueprint grid */}
      <div className="fixed inset-0 pointer-events-none bg-blueprint-grid opacity-30 z-0" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFB454]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header */}
      <SiteHeader />

      <main className="relative z-10 w-full pt-20 pb-16">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb & Navigation Back */}
          <div className="flex items-center justify-between text-xs font-mono text-[#A5A8AC]">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 hover:text-[#FFB454] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects Explorer</span>
            </Link>

            <span className="text-[#6E737A]">
              SYSTEM · {project.slug.toUpperCase()}
            </span>
          </div>

          {/* ── Case Study Header Card ── */}
          <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#383D43] pb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-xs px-2.5 py-0.5 rounded border font-medium ${
                    project.status === "Shipped"
                      ? "bg-[#79C9B0]/15 border-[#79C9B0]/30 text-[#79C9B0]"
                      : project.status === "In Progress"
                      ? "bg-[#FFB454]/15 border-[#FFB454]/30 text-[#FFB454]"
                      : "bg-[#85C2FF]/15 border-[#85C2FF]/30 text-[#85C2FF]"
                  }`}
                >
                  {project.status.toUpperCase()}
                </span>
                <span className="font-mono text-xs text-[#6E737A]">
                  ROLE: {project.role.toUpperCase()}
                </span>
              </div>

              {/* External source actions */}
              <div className="flex items-center gap-3 font-mono text-xs">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-[#F0EDE6] hover:text-[#FFB454] hover:border-[#FFB454]/40 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3 h-3 text-[#6E737A]" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#79C9B0]/10 border border-[#79C9B0]/30 text-[#79C9B0] hover:bg-[#79C9B0]/20 transition-all font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Service</span>
                  </a>
                )}
              </div>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#F0EDE6] tracking-tight">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-[#FFB454] font-mono mt-2 leading-relaxed">
                {project.oneLiner}
              </p>
            </div>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60">
                <span className="text-[#6E737A] text-[10px] block uppercase">Domain Tags</span>
                <span className="text-[#79C9B0] font-medium mt-0.5 block">
                  {project.tags.join(" · ")}
                </span>
              </div>
              <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60">
                <span className="text-[#6E737A] text-[10px] block uppercase">Collaborators</span>
                <span className="text-[#F0EDE6] font-medium mt-0.5 block">
                  {project.collaborators || "Solo Architectural Build"}
                </span>
              </div>
              <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60">
                <span className="text-[#6E737A] text-[10px] block uppercase">Verification Status</span>
                <span className="text-[#FFB454] font-medium mt-0.5 block">
                  {project.status === "Shipped"
                    ? "Verified Implementation"
                    : "Active Engineering Phase"}
                </span>
              </div>
            </div>
          </div>

          {/* ── Case Study Body: 9 Systematic Sections ── */}
          <div className="space-y-6">
            {/* 1. Problem Statement */}
            <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#FFB454] uppercase tracking-wider">
                <span>01 · THE CHALLENGE &amp; PROBLEM STATEMENT</span>
              </div>
              <p className="text-sm sm:text-base text-[#A5A8AC] leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* 2. Approach & Solution */}
            <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#79C9B0] uppercase tracking-wider">
                <span>02 · ARCHITECTURAL APPROACH &amp; SOLUTION</span>
              </div>
              <p className="text-sm sm:text-base text-[#A5A8AC] leading-relaxed">
                {project.approach}
              </p>
            </div>

            {/* 3. Architecture Details */}
            <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#85C2FF] uppercase tracking-wider">
                <span>03 · ARCHITECTURE &amp; PIPELINE SPECIFICATION</span>
              </div>
              <div className="space-y-2.5">
                {project.architectureDetails.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#15171A] border border-[#383D43]/60 flex items-start gap-3"
                  >
                    <span className="font-mono text-xs text-[#FFB454] bg-[#25292E] px-2 py-0.5 rounded border border-[#383D43] shrink-0">
                      STEP {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-[#F0EDE6] leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Outcomes & Evaluation */}
            <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#79C9B0] uppercase tracking-wider">
                <span>04 · EVALUATION, MILESTONES &amp; OUTCOMES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#25292E] border border-[#383D43] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#79C9B0] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#F0EDE6] leading-relaxed">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Related Model Card (if available) */}
            {relatedModel && (
              <div className="rounded-xl border border-[#FFB454]/40 bg-[#1F2329] p-6 space-y-3 shadow-[0_0_20px_rgba(255,180,84,0.08)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#FFB454] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>RELATED MODEL / SYSTEM CARD</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#79C9B0] px-2 py-0.5 rounded bg-[#79C9B0]/10 border border-[#79C9B0]/30">
                    {relatedModel.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F0EDE6]">{relatedModel.name}</h3>
                  <p className="text-xs text-[#A5A8AC] mt-1">{relatedModel.summary}</p>
                </div>
                <div className="pt-2">
                  <Link
                    href={`/models/${relatedModel.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FFB454] text-[#101113] font-mono text-xs font-bold hover:bg-[#FFC477] transition-all"
                  >
                    <span>Inspect Model Card &amp; Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ── Case Study Pagination Footer ── */}
          <div className="pt-6 border-t border-[#383D43] flex items-center justify-between font-mono text-xs">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="inline-flex items-center gap-2 text-[#A5A8AC] hover:text-[#FFB454] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Prev: {prevProject.title}</span>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-[#A5A8AC] hover:text-[#FFB454] transition-colors"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
