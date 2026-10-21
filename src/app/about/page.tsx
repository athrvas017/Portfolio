"use client";

import React from "react";
import Link from "next/link";
import {
  PROFILE,
  SKILL_CATEGORIES,
  ACHIEVEMENTS,
  EDUCATION,
  CERTIFICATIONS,
} from "@/data/profile";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { CodingProfilesStrip } from "@/components/profile/CodingProfilesStrip";
import {
  User,
  GraduationCap,
  Trophy,
  Award,
  Layers,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#101113] text-[#F0EDE6] min-h-screen relative overflow-x-hidden">
      {/* Blueprint grid */}
      <div className="fixed inset-0 pointer-events-none bg-blueprint-grid opacity-30 z-0" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFB454]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header */}
      <SiteHeader />

      <main className="relative z-10 w-full pt-20 pb-16">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Banner */}
          <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#383D43] pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#25292E] border border-[#FFB454]/50 flex items-center justify-center text-[#FFB454] shadow-[0_0_20px_rgba(255,180,84,0.2)]">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#FFB454]">
                    <span className="w-2 h-2 rounded-full bg-[#79C9B0] animate-pulse" />
                    <span>06 · ENGINEER_PROFILE</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#F0EDE6] mt-0.5">
                    {PROFILE.name}
                  </h1>
                  <p className="font-mono text-xs text-[#A5A8AC] mt-0.5">
                    {PROFILE.role}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <a
                  href={PROFILE.resumePath}
                  download="Athrva_Sarade_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#FFB454] text-[#101113] font-bold hover:bg-[#FFC477] transition-all shadow-[0_0_15px_rgba(255,180,84,0.25)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#25292E] border border-[#383D43] text-[#F0EDE6] hover:text-[#FFB454] hover:border-[#FFB454]/40 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>

            {/* Bio summary */}
            <p className="text-sm sm:text-base text-[#A5A8AC] leading-relaxed">
              {PROFILE.bio}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
              {PROFILE.metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded bg-[#15171A] border border-[#383D43]/60"
                >
                  <span className="text-[10px] text-[#6E737A] block">{m.label}</span>
                  <span className="text-base font-bold text-[#FFB454] my-1 block">
                    {m.value}
                  </span>
                  <span className="text-[11px] text-[#A5A8AC] block truncate">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Rigor */}
          <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#79C9B0] uppercase tracking-wider border-b border-[#383D43] pb-3">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION &amp; ACADEMIC STANDING</span>
            </div>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-[#15171A] border border-[#383D43]/60 space-y-2 font-mono"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <span className="text-[#F0EDE6] font-bold text-sm">
                      {edu.institution}
                    </span>
                    <span className="text-[#FFB454]">{edu.period}</span>
                  </div>
                  <div className="text-xs text-[#79C9B0] font-sans">
                    {edu.degree}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#A5A8AC] pt-1">
                    <span>Standing: <span className="text-[#F0EDE6] font-semibold">{edu.grade}</span></span>
                    {edu.details && (
                      <>
                        <span className="text-[#383D43]">|</span>
                        <span>{edu.details}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Podiums */}
          <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FFB454] uppercase tracking-wider border-b border-[#383D43] pb-3">
              <Trophy className="w-4 h-4" />
              <span>HACKATHON PODIUMS &amp; OPEN SOURCE RECOGNITION</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-[#25292E] border border-[#383D43] flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-[#79C9B0] font-semibold">{ach.roleOrContext}</span>
                      <span className="text-[#6E737A] text-[10px]">{ach.date}</span>
                    </div>
                    <h2 className="text-sm font-bold text-[#F0EDE6]">{ach.title}</h2>
                    <p className="text-xs text-[#A5A8AC] mt-1.5 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                  {ach.links && ach.links.length > 0 && (
                    <div className="pt-2 border-t border-[#383D43]/60">
                      <a
                        href={ach.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#FFB454] hover:underline flex items-center gap-1"
                      >
                        <span>{ach.links[0].label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Programming & Coding Profiles */}
          <CodingProfilesStrip />

          {/* Skills Breakdown */}
          <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#85C2FF] uppercase tracking-wider border-b border-[#383D43] pb-3">
              <Layers className="w-4 h-4" />
              <span>TECHNICAL COMPETENCY MESH</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-[#15171A] border border-[#383D43]/60 space-y-2.5"
                >
                  <span className="text-[#FFB454] font-semibold block uppercase">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#25292E] border border-[#383D43]/60 text-[11px] text-[#F0EDE6]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
