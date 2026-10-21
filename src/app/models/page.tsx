"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MODELS, ModelEntry, ModelStatus } from "@/data/models";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import {
  Search,
  Network,
  SlidersHorizontal,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Github,
  ExternalLink,
  Layers,
  X,
  Cpu,
} from "lucide-react";

type KindFilter = "All" | "ML Model" | "LLM" | "Agent System";
type StatusFilter = "All" | ModelStatus;

export default function ModelRegistryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKind, setSelectedKind] = useState<KindFilter>("All");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All");

  const kindOptions: KindFilter[] = ["All", "ML Model", "LLM", "Agent System"];
  const statusOptions: StatusFilter[] = [
    "All",
    "Evaluated",
    "Prototype",
    "In Progress",
  ];

  const filteredModels = useMemo(() => {
    return MODELS.filter((m) => {
      if (selectedKind !== "All" && m.kind !== selectedKind) return false;
      if (selectedStatus !== "All" && m.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = m.name.toLowerCase().includes(q);
        const matchTask = m.task.toLowerCase().includes(q);
        const matchSummary = m.summary.toLowerCase().includes(q);
        const matchTags = m.tags.some((t) => t.toLowerCase().includes(q));
        const matchFramework = m.framework?.some((f) =>
          f.toLowerCase().includes(q)
        );
        if (
          !matchName &&
          !matchTask &&
          !matchSummary &&
          !matchTags &&
          !matchFramework
        ) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedKind, selectedStatus]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedKind !== "All" ||
    selectedStatus !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedKind("All");
    setSelectedStatus("All");
  };

  return (
    <div className="bg-[#101113] text-[#F0EDE6] min-h-screen relative overflow-x-hidden">
      {/* Blueprint grid */}
      <div className="fixed inset-0 pointer-events-none bg-blueprint-grid opacity-30 z-0" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#79C9B0]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header */}
      <SiteHeader />

      <main className="relative z-10 w-full pt-20 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Banner */}
          <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#79C9B0] uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#79C9B0] animate-pulse" />
                  <span>04 · MODEL_REGISTRY</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-[#F0EDE6] tracking-tight">
                  Checkpoints, Weights &amp; Agent Systems
                </h1>
                <p className="text-xs sm:text-sm text-[#A5A8AC] max-w-2xl mt-2 leading-relaxed">
                  Versioned machine learning classifiers, graph traversal DAGs, specialized instruction
                  models, and agent execution architectures with empirical evaluation metrics.
                </p>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-[#79C9B0]">
                  {MODELS.filter((m) => m.status === "Evaluated").length} Evaluated
                </div>
                <div className="px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-[#FFB454]">
                  {MODELS.length} Checkpoints Indexed
                </div>
              </div>
            </div>

            {/* Filter controls */}
            <div className="mt-6 pt-6 border-t border-[#383D43] space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#6E737A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by checkpoint name, task, framework, or tag..."
                    className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#15171A] border border-[#383D43] text-[#F0EDE6] placeholder-[#6E737A] font-mono text-xs focus:outline-none focus:border-[#79C9B0] transition-colors"
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
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25292E] hover:bg-[#1F2329] border border-[#383D43] text-[#A5A8AC] hover:text-[#FFB454] font-mono text-xs transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>

              {/* Filter pills */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[#6E737A] mr-1 text-[11px]">System Type:</span>
                  {kindOptions.map((kind) => (
                    <button
                      key={kind}
                      onClick={() => setSelectedKind(kind)}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        selectedKind === kind
                          ? "bg-[#25292E] text-[#FFB454] border border-[#FFB454]/40 font-semibold"
                          : "bg-[#15171A] text-[#A5A8AC] hover:text-[#F0EDE6] border border-[#383D43]/60"
                      }`}
                    >
                      {kind}
                    </button>
                  ))}
                </div>

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

          {/* ── Models Grid ── */}
          {filteredModels.length === 0 ? (
            <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/60 p-12 text-center space-y-3 font-mono">
              <Cpu className="w-10 h-10 text-[#6E737A] mx-auto" />
              <div className="text-[#F0EDE6] font-semibold text-sm">
                No model checkpoints match your search
              </div>
              <p className="text-xs text-[#A5A8AC] max-w-md mx-auto">
                No indexed models found for query &ldquo;{searchQuery}&rdquo; under the selected filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 px-4 py-2 rounded bg-[#25292E] border border-[#79C9B0]/40 text-[#79C9B0] text-xs hover:bg-[#1F2329]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model) => {
                const statusStyle = {
                  Evaluated: "bg-[#79C9B0]/15 border-[#79C9B0]/30 text-[#79C9B0]",
                  Prototype: "bg-[#FFB454]/15 border-[#FFB454]/30 text-[#FFB454]",
                  "In Progress": "bg-[#85C2FF]/15 border-[#85C2FF]/30 text-[#85C2FF]",
                  "Not Evaluated": "bg-[#6E737A]/15 border-[#6E737A]/30 text-[#6E737A]",
                }[model.status];

                return (
                  <div
                    key={model.slug}
                    className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-5 flex flex-col justify-between hover:border-[#79C9B0]/60 transition-all group shadow-lg"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span
                          className={`px-2 py-0.5 rounded border text-[10px] font-medium ${statusStyle}`}
                        >
                          {model.status.toUpperCase()}
                        </span>
                        <span className="text-[#6E737A] text-[10px]">
                          {model.version || "LATEST"}
                        </span>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] text-[#79C9B0] block uppercase tracking-wider">
                          {model.kind}
                        </span>
                        <h2 className="text-lg font-bold text-[#F0EDE6] group-hover:text-[#79C9B0] transition-colors leading-snug mt-0.5">
                          {model.name}
                        </h2>
                        <p className="font-mono text-[11px] text-[#FFB454] mt-0.5">
                          {model.task}
                        </p>
                      </div>

                      <p className="text-xs text-[#A5A8AC] leading-relaxed line-clamp-3">
                        {model.summary}
                      </p>

                      {/* Metrics Strip */}
                      {model.metrics && model.metrics.length > 0 && (
                        <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60 space-y-2 font-mono text-xs">
                          {model.metrics.slice(0, 2).map((metric, i) => (
                            <div key={i} className="flex justify-between items-center text-[11px]">
                              <span className="text-[#6E737A] truncate max-w-[140px]">
                                {metric.name}:
                              </span>
                              <span className="text-[#79C9B0] font-semibold">
                                {metric.value} {metric.unit || ""}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Framework & Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {model.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-[#25292E] text-[10px] font-mono text-[#A5A8AC]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom action */}
                    <div className="pt-4 border-t border-[#383D43] mt-4 flex items-center justify-between font-mono text-xs">
                      <span className="text-[#6E737A] text-[11px]">SPECIFICATION</span>
                      <Link
                        href={`/models/${model.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#25292E] hover:bg-[#1F2329] border border-[#383D43] hover:border-[#79C9B0] text-[#F0EDE6] group-hover:text-[#79C9B0] transition-all font-semibold"
                      >
                        <span>View Model Card</span>
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
