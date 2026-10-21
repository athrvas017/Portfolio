"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { CodingProfilesStrip } from "@/components/profile/CodingProfilesStrip";
import { PROJECTS } from "@/data/projects";
import { PROFILE } from "@/data/profile";

// Dynamically load the heavy SkillGraph to keep initial page load and route transitions instantaneous
const SkillGraph = dynamic(
  () => import("@/components/skills/SkillGraph").then((mod) => mod.SkillGraph),
  {
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center font-mono text-xs text-[#6E737A] bg-[#15171A]/40 rounded-xl border border-[#383D43]/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFB454] animate-ping" />
          <span>INITIALIZING NEURAL TOPOLOGY GRAPH...</span>
        </div>
      </div>
    ),
    ssr: false,
  }
);
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const NeuralLandingPage: React.FC = () => {
  // Get featured projects
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="bg-[#101113] text-[#F0EDE6] min-h-screen relative overflow-x-hidden">
      {/* Background Blueprint Grid & Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none bg-blueprint-grid opacity-30 z-0" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFB454]/5 rounded-full blur-[140px] pointer-events-none z-0 gpu-layer" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#79C9B0]/5 rounded-full blur-[140px] pointer-events-none z-0 gpu-layer" />

      {/* Top Navigation */}
      <SiteHeader />

      {/* Main Content Area */}
      <main className="relative z-10 w-full pt-20 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Central Container with Border & Backdrop */}
          <div className="w-full rounded-xl border border-[#383D43] bg-[#1B1E22]/85 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.55)] relative overflow-hidden flex flex-col">
            {/* Top Atmospheric Glows */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FFB454]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] bg-[#79C9B0]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* ── 1. Hero Section ── */}
            <section className="w-full px-4 sm:px-8 pt-8 sm:pt-10 pb-8 flex flex-col gap-6 relative z-10">
              {/* Top Eyebrow Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#383D43] pb-4">
                <div className="flex items-center gap-2 bg-[#25292E] px-3 py-1.5 rounded border border-[#383D43]">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#79C9B0] animate-pulse" />
                  <span className="font-mono text-[11px] text-[#F0EDE6] uppercase tracking-wider">
                    AI RESEARCHER &amp; SYSTEMS ARCHITECT · FOCUS: AGENTIC WORKFLOWS &amp; LLM RUNTIMES
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-4 font-mono text-xs text-[#A5A8AC]">
                  <span className="text-[#79C9B0] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#79C9B0]" />
                    AVAILABLE FOR COLLABORATION
                  </span>
                  <span className="text-[#383D43]">|</span>
                  <span className="text-[#FFB454] font-medium">OPEN S25</span>
                </div>
              </div>

              {/* Headline & Subhead */}
              <div className="max-w-4xl flex flex-col gap-4">
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#F0EDE6] tracking-tight leading-[1.15]">
                  Building systems that{" "}
                  <span className="text-[#FFB454]">think</span>,{" "}
                  <span className="text-[#79C9B0]">act</span>, and adapt.
                </h1>
                <p className="text-base sm:text-lg text-[#A5A8AC] max-w-2xl leading-relaxed">
                  Architecting autonomous multi-agent pipelines, specialized inference optimization,
                  and production foundation model architectures. Designed for determinism at scale.
                </p>

                {/* CTA Cluster */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/workspace"
                    prefetch={true}
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#25292E] text-[#F0EDE6] font-mono text-xs sm:text-sm border border-[#FFB454] shadow-[0_0_20px_rgba(255,180,84,0.22)] hover:bg-[#1F2329] hover:shadow-[0_0_30px_rgba(255,180,84,0.38)] transition-all font-semibold"
                  >
                    <span className="text-[#FFB454]">Enter Workspace</span>
                    <ArrowRight className="w-4 h-4 text-[#79C9B0] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/projects"
                    prefetch={true}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1B1E22] text-[#A5A8AC] hover:text-[#F0EDE6] font-mono text-xs sm:text-sm border border-[#383D43] hover:border-[#525963] hover:bg-[#25292E] transition-all"
                  >
                    <Terminal className="w-4 h-4 text-[#6E737A]" />
                    <span>Explore Model Registry &amp; Projects</span>
                  </Link>
                </div>
              </div>

              {/* ── 2. Interactive Skill Tree & Capability Matrix ── */}
              <div className="w-full pt-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#383D43] pb-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm text-[#FFB454] font-semibold tracking-wider">
                      02 · SYSTEM_CAPABILITY_MATRIX
                    </span>
                    <span className="font-mono text-xs text-[#A5A8AC] hidden sm:inline">
                      TALENT &amp; SKILL TREE GRAPH
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1.5 font-mono text-xs text-[#79C9B0]">
                      <span className="w-2 h-2 rounded-full bg-[#79C9B0] animate-pulse" />
                      <span>HOVER FOR PREVIEW · CLICK FOR SIDE INSPECTOR</span>
                    </div>
                    <Link
                      href="/skills"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25292E] border border-[#383D43] hover:border-[#FFB454]/40 text-[#FFB454] font-mono text-xs hover:bg-[#1F2329] transition-all"
                    >
                      <span>FULLSCREEN VIEW</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <SkillGraph />
              </div>
            </section>

            {/* ── Competitive Programming & Problem Solving Badges ── */}
            <div className="w-full px-4 sm:px-8 py-2 relative z-10">
              <CodingProfilesStrip />
            </div>

            {/* ── 3. Core Systems Portfolio Section ── */}
            <section className="w-full px-4 sm:px-8 pt-6 pb-10 relative z-10">
              {/* Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#383D43] pb-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm text-[#FFB454] font-semibold tracking-wider">
                    01 · CORE_SYSTEMS_PORTFOLIO
                  </span>
                  <span className="font-mono text-xs text-[#A5A8AC] hidden sm:inline">
                    SELECTED TECHNICAL WORK
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-[#79C9B0]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CODE &amp; BENCHMARKS AVAILABLE</span>
                </div>
              </div>

              {/* 3 Technical Project Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featured.map((proj, idx) => {
                  const statusColors = {
                    Shipped: {
                      badge: "bg-[#79C9B0]/15 border-[#79C9B0]/30 text-[#79C9B0]",
                      symbol: "● EVALUATED BENCHMARK",
                      borderHover: "hover:border-[#79C9B0]/60",
                      glow: "hover:shadow-[0_0_20px_rgba(121,201,176,0.12)]",
                    },
                    "In Progress": {
                      badge: "bg-[#FFB454]/15 border-[#FFB454]/30 text-[#FFB454]",
                      symbol: "▲ ACTIVE RESEARCH",
                      borderHover: "hover:border-[#FFB454]/60",
                      glow: "hover:shadow-[0_0_20px_rgba(255,180,84,0.12)]",
                    },
                    "Code Coming Soon": {
                      badge: "bg-[#85C2FF]/15 border-[#85C2FF]/30 text-[#85C2FF]",
                      symbol: "● PROTOTYPE ARCHITECTURE",
                      borderHover: "hover:border-[#85C2FF]/60",
                      glow: "hover:shadow-[0_0_20px_rgba(133,194,255,0.12)]",
                    },
                  };
                  const style = statusColors[proj.status] || statusColors["Shipped"];

                  return (
                    <div
                      key={proj.slug}
                      className={`bg-[#25292E] rounded-xl border border-[#383D43] p-5 sm:p-6 flex flex-col justify-between ${style.borderHover} ${style.glow} transition-all group shadow-md`}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded border font-mono text-[10px] font-medium ${style.badge}`}
                          >
                            {style.symbol}
                          </span>
                          <span className="font-mono text-[10px] text-[#6E737A]">
                            REF: {proj.slug.toUpperCase().slice(0, 7)}
                          </span>
                        </div>

                        <div className="pt-1">
                          <h3 className="text-base sm:text-lg font-semibold text-[#F0EDE6] group-hover:text-[#FFB454] transition-colors leading-snug">
                            {proj.title}: {proj.oneLiner}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#A5A8AC] mt-2 leading-relaxed line-clamp-3">
                            {proj.problem}
                          </p>
                        </div>

                        {/* Specs Strip */}
                        <div className="space-y-1.5 pt-3 border-t border-[#383D43]/60 font-mono text-[11px]">
                          <div className="text-[#A5A8AC] flex justify-between">
                            <span>Role:</span>
                            <span className="text-[#F0EDE6] truncate max-w-[180px] text-right">
                              {proj.role}
                            </span>
                          </div>
                          <div className="text-[#A5A8AC] flex justify-between">
                            <span>Tags:</span>
                            <span className="text-[#79C9B0]">{proj.tags.join(" · ")}</span>
                          </div>
                          {proj.repoUrl && (
                            <div className="text-[#A5A8AC] flex justify-between">
                              <span>Source:</span>
                              <span className="text-[#FFB454]">Verified Repository</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Bottom Link */}
                      <div className="pt-4 border-t border-[#383D43] mt-4 flex items-center justify-between font-mono text-xs">
                        <span className="text-[#A5A8AC]">TECHNICAL CASE STUDY</span>
                        <Link
                          href={`/projects/${proj.slug}`}
                          className="p-1.5 rounded hover:bg-[#1F2329] text-[#A5A8AC] group-hover:text-[#FFB454] transition-colors flex items-center gap-1"
                          aria-label={`View details for ${proj.title}`}
                        >
                          <span className="hidden group-hover:inline text-[11px]">Inspect</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View All Projects link */}
              <div className="mt-8 flex justify-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B1E22] border border-[#383D43] hover:border-[#FFB454] text-[#A5A8AC] hover:text-[#FFB454] font-mono text-xs transition-all shadow-sm"
                >
                  <span>Explore All {PROJECTS.length} Systems &amp; Case Studies</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
};
