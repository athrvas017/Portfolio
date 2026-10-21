"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CREDENTIALS, Credential, CredentialCategory } from "@/data/credentials";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import {
  Search,
  Award,
  FileCheck,
  ExternalLink,
  FileText,
  Calendar,
  CheckCircle2,
  X,
  ShieldCheck,
  Building,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";

type FilterCategory = "All" | CredentialCategory;

export default function CredentialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All");
  const [activeModalCred, setActiveModalCred] = useState<Credential | null>(null);

  const categories: FilterCategory[] = [
    "All",
    "Agentic AI",
    "AI/ML",
    "Cloud",
    "Programming",
    "Other",
  ];

  // Combined search and filtering
  const filteredCredentials = useMemo(() => {
    return CREDENTIALS.filter((cred) => {
      // Category filter
      if (selectedCategory !== "All" && cred.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = cred.name.toLowerCase().includes(q);
        const matchIssuer = cred.issuer.toLowerCase().includes(q);
        const matchDesc = cred.description.toLowerCase().includes(q);
        const matchId = cred.credentialId?.toLowerCase().includes(q);
        const matchSkills = cred.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchIssuer && !matchDesc && !matchId && !matchSkills) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="bg-[#101113] text-[#F0EDE6] min-h-screen relative overflow-x-hidden">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 pointer-events-none bg-blueprint-grid opacity-30 z-0" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFB454]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#79C9B0]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header */}
      <SiteHeader />

      <main className="relative z-10 w-full pt-20 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Banner */}
          <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#FFB454] uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#79C9B0] animate-pulse" />
                  <span>05 · CREDENTIALS_REGISTRY</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-[#F0EDE6] tracking-tight">
                  Verified Certifications &amp; Credentials
                </h1>
                <p className="text-xs sm:text-sm text-[#A5A8AC] max-w-2xl mt-2 leading-relaxed">
                  Accredited professional certifications in Agentic AI architectures, generative AI,
                  vector retrieval pipelines, systems programming, and computer networking.
                </p>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-[#79C9B0]">
                  {CREDENTIALS.filter((c) => c.status === "Verified").length} Verified
                </div>
                <div className="px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-[#FFB454]">
                  {CREDENTIALS.length} Total Certificates
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
                    placeholder="Search by certification name, issuer, skill, or credential ID..."
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
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25292E] hover:bg-[#1F2329] border border-[#383D43] text-[#A5A8AC] hover:text-[#FFB454] font-mono text-xs transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs">
                <span className="text-[#6E737A] mr-1 text-[11px]">Category:</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#25292E] text-[#FFB454] border border-[#FFB454]/40 font-semibold shadow-[0_0_10px_rgba(255,180,84,0.1)]"
                        : "bg-[#15171A] text-[#A5A8AC] hover:text-[#F0EDE6] border border-[#383D43]/60"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Cards Grid ── */}
          {filteredCredentials.length === 0 ? (
            /* Empty state */
            <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/60 p-12 text-center space-y-3 font-mono">
              <Award className="w-10 h-10 text-[#6E737A] mx-auto" />
              <div className="text-[#F0EDE6] font-semibold text-sm">
                No credentials found
              </div>
              <p className="text-xs text-[#A5A8AC] max-w-md mx-auto">
                No verified certificates match your search query &ldquo;{searchQuery}&rdquo; under the selected category.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 px-4 py-2 rounded bg-[#25292E] border border-[#FFB454]/40 text-[#FFB454] text-xs hover:bg-[#1F2329]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCredentials.map((cred) => {
                return (
                  <div
                    key={cred.slug}
                    className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-5 flex flex-col justify-between hover:border-[#FFB454]/60 transition-all group shadow-lg"
                  >
                    <div className="space-y-3.5">
                      {/* Top strip */}
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="px-2 py-0.5 rounded border border-[#79C9B0]/30 bg-[#79C9B0]/15 text-[#79C9B0] text-[10px] font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#79C9B0]" />
                          {cred.status.toUpperCase()}
                        </span>
                        <span className="text-[#6E737A] text-[10px] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {cred.date}
                        </span>
                      </div>

                      {/* Header info */}
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-[#FFB454] uppercase tracking-wider">
                            {cred.category}
                          </span>
                          <span className="text-xs font-mono text-[#A5A8AC]">
                            {cred.issuer}
                          </span>
                        </div>
                        <h2 className="text-base font-bold text-[#F0EDE6] group-hover:text-[#FFB454] transition-colors leading-snug mt-1">
                          {cred.name}
                        </h2>
                      </div>

                      <p className="text-xs text-[#A5A8AC] leading-relaxed line-clamp-3">
                        {cred.description}
                      </p>

                      {/* Credential ID if present */}
                      {cred.credentialId && (
                        <div className="p-2 rounded bg-[#15171A] border border-[#383D43]/60 font-mono text-[10px] text-[#6E737A] flex items-center justify-between">
                          <span>CREDENTIAL ID:</span>
                          <span className="text-[#F0EDE6] font-mono truncate max-w-[170px]">
                            {cred.credentialId}
                          </span>
                        </div>
                      )}

                      {/* Skills covered */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono text-[#6E737A] uppercase block">
                          Skills Covered:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cred.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded bg-[#25292E] text-[10px] font-mono text-[#79C9B0]"
                            >
                              {skill}
                            </span>
                          ))}
                          {cred.skills.length > 3 && (
                            <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#6E737A]">
                              +{cred.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-[#383D43] mt-4 flex items-center justify-between font-mono text-xs">
                      <button
                        onClick={() => setActiveModalCred(cred)}
                        className="text-[#A5A8AC] hover:text-[#FFB454] transition-colors flex items-center gap-1 text-[11px]"
                      >
                        <span>Inspect Specs</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {cred.pdfUrl && (
                          <a
                            href={cred.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#25292E] hover:bg-[#1F2329] border border-[#383D43] hover:border-[#FFB454] text-[#F0EDE6] group-hover:text-[#FFB454] transition-all font-semibold"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#FFB454]" />
                            <span>Certificate PDF</span>
                            <ArrowUpRight className="w-3 h-3 text-[#6E737A]" />
                          </a>
                        )}
                        {cred.verificationUrl && (
                          <a
                            href={cred.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#79C9B0]/10 hover:bg-[#79C9B0]/20 border border-[#79C9B0]/30 text-[#79C9B0] transition-all font-semibold"
                          >
                            <span>Verify</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ── Detail Modal View ── */}
      {activeModalCred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-xl border border-[#383D43] bg-[#1B1E22] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#383D43] pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#79C9B0]">
                  <CheckCircle2 className="w-4 h-4 text-[#79C9B0]" />
                  <span>VERIFIED ACCREDITATION · {activeModalCred.category}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F0EDE6] mt-1">
                  {activeModalCred.name}
                </h3>
                <p className="font-mono text-xs text-[#FFB454] mt-0.5">
                  Issuer: {activeModalCred.issuer} · Year: {activeModalCred.date}
                </p>
              </div>

              <button
                onClick={() => setActiveModalCred(null)}
                className="p-1.5 rounded bg-[#25292E] border border-[#383D43] text-[#A5A8AC] hover:text-[#F0EDE6] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#6E737A] uppercase block">
                Curriculum &amp; Technical Scope
              </span>
              <p className="text-sm text-[#A5A8AC] leading-relaxed">
                {activeModalCred.description}
              </p>
            </div>

            {/* Metadata specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60">
                <span className="text-[#6E737A] text-[10px] block">ISSUING BODY</span>
                <span className="text-[#F0EDE6] font-semibold mt-0.5 block">
                  {activeModalCred.issuer}
                </span>
              </div>
              <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60">
                <span className="text-[#6E737A] text-[10px] block">STATUS</span>
                <span className="text-[#79C9B0] font-semibold mt-0.5 block">
                  {activeModalCred.status} Credential
                </span>
              </div>
              {activeModalCred.credentialId && (
                <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60 sm:col-span-2">
                  <span className="text-[#6E737A] text-[10px] block">CREDENTIAL ID</span>
                  <span className="text-[#FFB454] font-mono break-all mt-0.5 block">
                    {activeModalCred.credentialId}
                  </span>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#6E737A] uppercase block">
                Validated Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {activeModalCred.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded bg-[#25292E] border border-[#383D43] text-xs font-mono text-[#F0EDE6]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-[#383D43] flex flex-wrap items-center justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setActiveModalCred(null)}
                className="px-4 py-2 rounded bg-[#25292E] border border-[#383D43] text-[#A5A8AC] hover:text-[#F0EDE6] transition-colors"
              >
                Close
              </button>

              {activeModalCred.pdfUrl && (
                <a
                  href={activeModalCred.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#FFB454] hover:bg-[#FFC477] text-[#101113] font-bold transition-all shadow-[0_0_15px_rgba(255,180,84,0.3)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open Full Certificate PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
