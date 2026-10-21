"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/projects";
import { PROFILE } from "@/data/profile";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import {
  Search,
  SlidersHorizontal,
  FolderCode,
  Github,
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  X,
} from "lucide-react";

type TagFilter = "All" | "AI/ML" | "Systems/Backend" | "Web" | "Hackathon";
type StatusFilter = "All" | "Shipped" | "In Progress" | "Code Coming Soon";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagFilter>("All");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All");

  const tagOptions: TagFilter[] = [
    "All",
    "AI/ML",
    "Systems/Backend",
    "Web",
    "Hackathon",
  ];

  const statusOptions: StatusFilter[] = [
    "All",
    "Shipped",
    "In Progress",
    "Code Coming Soon",
  ];

  // Combined search and filtering logic
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      // Tag filter
      if (selectedTag !== "All" && !p.tags.includes(selectedTag as any)) {
        return false;
      }
      // Status filter
      if (selectedStatus !== "All" && p.status !== selectedStatus) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchOneLiner = p.oneLiner.toLowerCase().includes(q);
        const matchProblem = p.problem.toLowerCase().includes(q);
        const matchApproach = p.approach.toLowerCase().includes(q);
        const matchRole = p.role.toLowerCase().includes(q);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (
          !matchTitle &&
          !matchOneLiner &&
          !matchProblem &&
          !matchApproach &&
          !matchRole &&
          !matchTags
        ) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedTag, selectedStatus]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedTag !== "All" ||
    selectedStatus !== "All";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedTag("All");
    setSelectedStatus("All");
  };

  return (
    <div className="bg-[#101113] text-[#F0EDE6] min-h-screen relative overflow-x-hidden">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 pointer-events-none bg-blueprint-grid opacity-30 z-0" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFB454]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Shared Site Header */}
      <SiteHeader />

      <main className="relative z-10 w-full pt-20 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Title Banner */}
          <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#FFB454] uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFB454]" />
                  <span>03 · PROJECTS_EXPLORER</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-[#F0EDE6] tracking-tight">
                  Systems, Classifiers &amp; Graph Engines
                </h1>
                <p className="text-xs sm:text-sm text-[#A5A8AC] max-w-2xl mt-2 leading-relaxed">
                  Real engineering builds backed by machine learning models, graph traversal algorithms,
                  transactional state engines, and multi-agent pipelines.
                </p>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-[#79C9B0]">
                  {PROJECTS.filter((p) => p.status === "Shipped").length} Shipped Systems
                </div>
                <div className="px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-[#FFB454]">
                  {PROJECTS.length} Total Repositories
                </div>
              </div>
            </div>

            {/* ── Search & Filter Controls Bar ── */}
            <div className="mt-6 pt-6 border-t border-[#383D43] space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#6E737A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by system name, keyword, tag, or technology..."
                    className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#15171A] border border-[#383D43] text-[#F0EDE6] placeholder-[#6E737A] font-mono text-xs focus:outline-none focus:border-[#FFB454] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6E737A] hover:text-[#F0EDE6]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25292E] hover:bg-[#1F2329] border border-[#383D43] text-[#A5A8AC] hover:text-[#FFB454] font-mono text-xs transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>

              {/* Tag filters & Status filters */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
                {/* Tag Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[#6E737A] mr-1 text-[11px]">Domain:</span>
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        selectedTag === tag
                          ? "bg-[#25292E] text-[#FFB454] border border-[#FFB454]/40 font-semibold"
                          : "bg-[#15171A] text-[#A5A8AC] hover:text-[#F0EDE6] border border-[#383D43]/60"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Status Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[#6E737A] mr-1 text-[11px]">Status:</span>
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        selectedStatus === status
                          ? "bg-[#25292E] text-[#79C9B0] border border-[#79C9B0]/40 font-semibold"
                          : "bg-[#15171A] text-[#A5A8AC] hover:text-[#F0EDE6] border border-[#383D43]/60"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Project Cards Grid ── */}
          {filteredProjects.length === 0 ? (
            /* Empty state */
            <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/60 p-12 text-center space-y-3 font-mono">
              <FolderCode className="w-10 h-10 text-[#6E737A] mx-auto" />
              <div className="text-[#F0EDE6] font-semibold text-sm">
                No systems match your filter criteria
              </div>
              <p className="text-xs text-[#A5A8AC] max-w-md mx-auto">
                No active projects found for query &ldquo;{searchQuery}&rdquo; under the selected filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-2 px-4 py-2 rounded bg-[#25292E] border border-[#FFB454]/40 text-[#FFB454] text-xs hover:bg-[#1F2329] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => {
                const isShipped = project.status === "Shipped";
                const isInProgress = project.status === "In Progress";

                return (
                  <div
                    key={project.slug}
                    className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between hover:border-[#FFB454]/60 transition-all group shadow-lg"
                  >
                    <div className="space-y-4">
                      {/* Top card strip */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded border font-medium ${
                            isShipped
                              ? "bg-[#79C9B0]/15 border-[#79C9B0]/30 text-[#79C9B0]"
                              : isInProgress
                              ? "bg-[#FFB454]/15 border-[#FFB454]/30 text-[#FFB454]"
                              : "bg-[#85C2FF]/15 border-[#85C2FF]/30 text-[#85C2FF]"
                          }`}
                        >
                          {project.status.toUpperCase()}
                        </span>
                        <span className="font-mono text-[10px] text-[#6E737A]">
                          REF: {project.slug.toUpperCase()}
                        </span>
                      </div>

                      {/* Title & One-liner */}
                      <div>
                        <h2 className="text-xl font-bold text-[#F0EDE6] group-hover:text-[#FFB454] transition-colors">
                          {project.title}
                        </h2>
                        <p className="font-mono text-xs text-[#FFB454] mt-1">
                          {project.oneLiner}
                        </p>
                      </div>

                      {/* Problem & Approach */}
                      <p className="text-xs sm:text-sm text-[#A5A8AC] leading-relaxed line-clamp-3">
                        {project.problem}
                      </p>

                      {/* Architecture Highlights */}
                      <div className="space-y-1.5 bg-[#15171A] p-3 rounded border border-[#383D43]/60 font-mono text-[11px]">
                        <span className="text-[#6E737A] text-[10px] block uppercase">
                          Architecture Highlights
                        </span>
                        {project.architectureDetails.slice(0, 2).map((item, i) => (
                          <div key={i} className="text-[#F0EDE6] flex items-start gap-1.5">
                            <span className="text-[#FFB454]">•</span>
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Role & Tags */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#383D43]/50 font-mono text-xs">
                        <span className="text-[#6E737A] text-[11px]">
                          Role: <span className="text-[#F0EDE6]">{project.role}</span>
                        </span>
                        <div className="flex gap-1.5">
                          {project.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-[#25292E] text-[10px] text-[#79C9B0]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom actions */}
                    <div className="pt-4 border-t border-[#383D43] mt-4 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-3">
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#A5A8AC] hover:text-[#FFB454] flex items-center gap-1 text-[11px]"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#79C9B0] hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Service</span>
                          </a>
                        )}
                      </div>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#25292E] hover:bg-[#1F2329] border border-[#383D43] hover:border-[#FFB454] text-[#F0EDE6] group-hover:text-[#FFB454] transition-all font-semibold"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
