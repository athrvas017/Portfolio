"use client";

import React, { useState } from "react";
import {
  PROFILE,
  SKILL_CATEGORIES,
  ACHIEVEMENTS,
  EDUCATION,
} from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import {
  FileText,
  Github,
  Linkedin,
  MapPin,
  GraduationCap,
  Mail,
  ExternalLink,
  ChevronRight,
  Globe,
  ArrowRight,
  Sparkles,
  Zap,
  Code2,
} from "lucide-react";
import Link from "next/link";

type Tab = "card" | "projects" | "achievements";

const TABS: { id: Tab; label: string }[] = [
  { id: "card", label: "Model Card" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
];

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("card");

  const featuredProjects = PROJECTS.filter((p) => p.featured).sort(
    (a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)
  );

  const primaryEdu = EDUCATION[0];

  return (
    <section className="relative w-full overflow-hidden min-h-screen">
      {/* Atmospheric glows */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-ss-primary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-ss-secondary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-ss-tertiary/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-10">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-1.5 label-caps text-[10px] text-ss-on-surface-var mb-4">
          <span className="text-ss-secondary">athrvas017</span>
          <span className="text-ss-outline mx-0.5">/</span>
          <span className="text-ss-on-surface font-bold">portfolio</span>
          <span className="ml-2 px-2 py-0.5 rounded-full text-[9px] bg-ss-secondary/15 text-ss-secondary border border-ss-secondary/30">
            public
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] bg-ss-primary/10 text-ss-primary border border-ss-primary/25 ml-1">
            model card
          </span>
        </div>

        {/* ── MAIN MODEL CARD ── */}
        <div
          className="rounded-2xl overflow-hidden bg-ss-surface-low shadow-2xl"
          style={{ border: "1px solid rgba(255, 185, 95, 0.18)" }}
        >
          {/* HuggingFace-style gradient top stripe */}
          <div className="h-[3px] w-full bg-gradient-to-r from-ss-secondary via-ss-primary to-ss-tertiary" />

          {/* ── CARD HEADER ── */}
          <div
            className="p-5 md:p-6"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Name row */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-4">
                {/* Avatar block */}
                <div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-ss-primary/25 to-ss-secondary/20 flex items-center justify-center font-display font-bold text-2xl text-ss-primary shrink-0"
                  style={{
                    border: "1px solid rgba(192,193,255,0.22)",
                    boxShadow: "0 0 24px rgba(192,193,255,0.12)",
                  }}
                >
                  {PROFILE.name.charAt(0)}
                </div>
                <div>
                  <h1 className="font-display text-2xl md:text-[28px] font-bold text-ss-on-surface leading-tight">
                    {PROFILE.name}
                  </h1>
                  <p className="font-mono text-[12px] text-ss-on-surface-var mt-0.5">
                    {PROFILE.role}
                  </p>
                </div>
              </div>

              {/* Status badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ss-tertiary/12 text-ss-tertiary label-caps text-[10px] border border-ss-tertiary/25">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ss-tertiary opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-ss-tertiary" />
                  </span>
                  OPEN TO WORK
                </span>
                <span className="px-3 py-1.5 rounded-full bg-ss-surface-high label-caps text-[10px] text-ss-on-surface-var border border-ss-outline-var/40">
                  VJTI &apos;28
                </span>
              </div>
            </div>

            {/* One-liner quote */}
            <p
              className="text-ss-on-surface-var text-[13px] italic mb-4 font-sans leading-relaxed max-w-3xl pl-3"
              style={{ borderLeft: "2px solid rgba(255,185,95,0.5)" }}
            >
              {PROFILE.oneLiner}
            </p>

            {/* Tag pills — from skills.json (first 3 skills from each of first 3 categories) */}
            <div className="flex flex-wrap gap-2 mb-5">
              {SKILL_CATEGORIES.slice(0, 3)
                .flatMap((cat) => cat.skills.slice(0, 3))
                .map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full font-mono text-[11px] bg-ss-surface-high text-ss-primary border border-ss-primary/20 hover:border-ss-primary/40 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              <span className="px-2.5 py-1 rounded-full font-mono text-[11px] bg-ss-secondary/10 text-ss-secondary border border-ss-secondary/25">
                GSoC Interest
              </span>
            </div>

            {/* ── CTA Buttons — Primary Actions ── */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <a
                href={PROFILE.resumePath}
                download="Athrva_Sarade_Resume.pdf"
                className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-ss-secondary to-ss-secondary-cont hover:from-ss-secondary-cont hover:to-ss-secondary text-ss-on-secondary px-5 py-2.5 rounded-xl label-caps text-[11px] font-bold transition-all duration-300 active:scale-[0.97]"
                style={{
                  boxShadow: "0 0 24px rgba(255,185,95,0.3), 0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <FileText className="w-4 h-4" />
                Download Résumé
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-ss-primary to-ss-primary-cont hover:from-ss-primary-cont hover:to-ss-primary text-ss-on-primary px-5 py-2.5 rounded-xl label-caps text-[11px] font-bold transition-all duration-300 active:scale-[0.97]"
                style={{
                  boxShadow: "0 0 24px rgba(192,193,255,0.3), 0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <Sparkles className="w-4 h-4" />
                Hire Me / Collaborate
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* ── CTA Buttons — Secondary Actions ── */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg label-caps text-[11px] text-ss-on-surface hover:text-ss-primary bg-ss-surface-high border border-ss-outline-var/40 hover:border-ss-primary/40 hover:bg-ss-primary/8 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg label-caps text-[11px] text-ss-on-surface hover:text-ss-primary bg-ss-surface-high border border-ss-outline-var/40 hover:border-ss-primary/40 hover:bg-ss-primary/8 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <Link
                href="/skills"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg label-caps text-[11px] text-ss-on-surface hover:text-ss-tertiary bg-ss-surface-high border border-ss-outline-var/40 hover:border-ss-tertiary/40 hover:bg-ss-tertiary/8 transition-all duration-200"
              >
                <Zap className="w-4 h-4" />
                Explore Skills
                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg label-caps text-[11px] text-ss-on-surface hover:text-ss-secondary bg-ss-surface-high border border-ss-outline-var/40 hover:border-ss-secondary/40 hover:bg-ss-secondary/8 transition-all duration-200"
              >
                <Code2 className="w-4 h-4" />
                View Projects
                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* ── CARD BODY: Left Sidebar + Right Tabs ── */}
          <div className="flex flex-col xl:flex-row">

            {/* ── LEFT SIDEBAR ── */}
            <aside
              className="xl:w-[300px] shrink-0 p-5 flex flex-col gap-4 bg-ss-surface-lowest/30"
              style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Profile Metadata — from profile.json + education.json */}
              <div>
                <p className="label-caps text-[9px] text-ss-on-surface-var mb-2 tracking-widest">
                  PROFILE
                </p>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-[13px] text-ss-on-surface-var">
                    <MapPin className="w-3.5 h-3.5 text-ss-secondary shrink-0" />
                    {PROFILE.location}
                  </div>
                  <div className="flex items-start gap-2 text-[13px] text-ss-on-surface-var">
                    <GraduationCap className="w-3.5 h-3.5 text-ss-primary shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      {primaryEdu.degree} ·{" "}
                      {primaryEdu.institution.split(",")[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-ss-on-surface-var">
                    <Mail className="w-3.5 h-3.5 text-ss-tertiary shrink-0" />
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="hover:text-ss-tertiary transition-colors truncate"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-ss-on-surface-var">
                    <Globe className="w-3.5 h-3.5 text-ss-primary shrink-0" />
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ss-primary transition-colors truncate"
                    >
                      github.com/athrvas017
                    </a>
                  </div>
                </div>
              </div>

              <div className="h-px bg-ss-outline-var/20" />

              {/* Stats — from profile.json metrics[] */}
              <div>
                <p className="label-caps text-[9px] text-ss-on-surface-var mb-2 tracking-widest">
                  STATS
                </p>
                <div className="grid grid-cols-2 xl:grid-cols-1 gap-1.5">
                  {PROFILE.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                      style={{
                        background: "rgba(14,18,27,0.6)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span className="font-mono text-[10px] text-ss-on-surface-var leading-tight">
                        {m.label}
                      </span>
                      <span className="font-mono text-[11px] text-ss-primary font-bold">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-ss-outline-var/20" />

              {/* Skills — from skills.json */}
              <div className="flex-1">
                <p className="label-caps text-[9px] text-ss-on-surface-var mb-3 tracking-widest">
                  SKILLS
                </p>
                <div className="flex flex-col gap-3">
                  {SKILL_CATEGORIES.map((cat) => (
                    <div key={cat.category}>
                      <p className="font-mono text-[10px] text-ss-secondary mb-1.5">
                        {cat.category}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="px-1.5 py-0.5 rounded font-mono text-[9px] bg-ss-surface-highest text-ss-on-surface-var"
                          >
                            {skill}
                          </span>
                        ))}
                        {cat.skills.length > 5 && (
                          <span className="font-mono text-[9px] text-ss-outline px-1 py-0.5">
                            +{cat.skills.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explore Skills CTA */}
              <div
                className="pt-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <Link
                  href="/skills"
                  className="group flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg bg-ss-primary/6 border border-ss-primary/20 hover:border-ss-primary/40 hover:bg-ss-primary/10 transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-ss-primary" />
                    <span className="label-caps text-[10px] text-ss-primary">
                      View Full Skill Tree
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ss-primary transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </aside>

            {/* ── MAIN CONTENT + TABS ── */}
            <div className="flex-1 min-w-0 flex flex-col">

              {/* Tab bar */}
              <div
                className="flex"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-5 py-3.5 label-caps text-[11px] transition-colors ${
                      activeTab === tab.id
                        ? "text-ss-secondary"
                        : "text-ss-on-surface-var hover:text-ss-on-surface"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-ss-secondary rounded-t" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Panels */}
              <div className="p-5 md:p-6 flex-1">

                {/* ── MODEL CARD Tab ── */}
                {activeTab === "card" && (
                  <div className="space-y-5">
                    {/* About */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-ss-outline-var text-sm select-none">
                          ##
                        </span>
                        <h2 className="font-display text-lg font-bold text-ss-on-surface">
                          About
                        </h2>
                      </div>
                      <p className="text-ss-on-surface-var text-[14px] leading-relaxed font-sans">
                        {PROFILE.bio}
                      </p>
                    </div>

                    <div className="h-px bg-ss-outline-var/20" />

                    {/* Architecture Focus — from profile.json focusAreas[] */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-ss-outline-var text-sm select-none">
                          ###
                        </span>
                        <h3 className="font-display text-base font-semibold text-ss-on-surface">
                          Architecture Focus
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {PROFILE.focusAreas.map((area) => (
                          <span
                            key={area}
                            className="px-3 py-1.5 rounded-lg label-caps text-[10px] bg-ss-primary/8 text-ss-primary border border-ss-primary/20"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-ss-outline-var/20" />

                    {/* Current Status — from profile.json statusLine */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-ss-outline-var text-sm select-none">
                          ###
                        </span>
                        <h3 className="font-display text-base font-semibold text-ss-on-surface">
                          Current Status
                        </h3>
                      </div>
                      <div
                        className="font-mono text-[12px] text-ss-tertiary px-4 py-3 rounded-lg flex items-center gap-2"
                        style={{
                          background: "rgba(78,222,163,0.06)",
                          border: "1px solid rgba(78,222,163,0.2)",
                        }}
                      >
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ss-tertiary opacity-60" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-ss-tertiary" />
                        </span>
                        {PROFILE.statusLine}
                      </div>
                    </div>

                    <div className="h-px bg-ss-outline-var/20" />

                    {/* ── Quick Navigation CTA ── */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-mono text-ss-outline-var text-sm select-none">
                          ###
                        </span>
                        <h3 className="font-display text-base font-semibold text-ss-on-surface">
                          Quick Links
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <Link
                          href="/skills"
                          className="group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.01]"
                          style={{
                            background: "rgba(192,193,255,0.05)",
                            border: "1px solid rgba(192,193,255,0.15)",
                          }}
                        >
                          <div className="w-9 h-9 rounded-lg bg-ss-primary/12 flex items-center justify-center shrink-0">
                            <Zap className="w-4.5 h-4.5 text-ss-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="label-caps text-[10px] text-ss-primary block">
                              Skill Tree &amp; Matrix
                            </span>
                            <span className="text-[11px] text-ss-on-surface-var">
                              Interactive dependency graph
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-ss-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                          href="/projects"
                          className="group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.01]"
                          style={{
                            background: "rgba(255,185,95,0.05)",
                            border: "1px solid rgba(255,185,95,0.15)",
                          }}
                        >
                          <div className="w-9 h-9 rounded-lg bg-ss-secondary/12 flex items-center justify-center shrink-0">
                            <Code2 className="w-4.5 h-4.5 text-ss-secondary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="label-caps text-[10px] text-ss-secondary block">
                              Project Roster
                            </span>
                            <span className="text-[11px] text-ss-on-surface-var">
                              All engineering systems
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-ss-secondary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── PROJECTS Tab ── */}
                {activeTab === "projects" && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-mono text-ss-outline-var text-sm select-none">
                        ##
                      </span>
                      <h2 className="font-display text-lg font-bold text-ss-on-surface">
                        Featured Projects
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {featuredProjects.map((proj) => (
                        <div
                          key={proj.slug}
                          className="p-4 rounded-xl group hover:bg-ss-surface-high/40 transition-colors"
                          style={{
                            background: "rgba(14,18,27,0.5)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-display font-semibold text-ss-on-surface text-[15px]">
                                  {proj.title}
                                </span>
                                <span
                                  className={`label-caps text-[9px] px-1.5 py-0.5 rounded-full ${
                                    proj.status === "Shipped"
                                      ? "bg-ss-tertiary/15 text-ss-tertiary"
                                      : proj.status === "In Progress"
                                      ? "bg-ss-secondary/15 text-ss-secondary"
                                      : "bg-ss-surface-highest text-ss-on-surface-var"
                                  }`}
                                >
                                  {proj.status}
                                </span>
                              </div>
                              <p className="text-ss-on-surface-var text-[12px] leading-relaxed">
                                {proj.oneLiner}
                              </p>
                            </div>
                            {proj.repoUrl && (
                              <a
                                href={proj.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-ss-on-surface-var hover:text-ss-primary transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {proj.tags.map((tag) => (
                              <span
                                key={tag}
                                className="label-caps text-[9px] px-1.5 py-0.5 rounded bg-ss-surface-highest text-ss-on-surface-var"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* View All Projects CTA */}
                    <Link
                      href="/projects"
                      className="group flex items-center justify-between mt-4 px-4 py-3 rounded-xl bg-ss-secondary/6 border border-ss-secondary/20 hover:border-ss-secondary/40 hover:bg-ss-secondary/10 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <Code2 className="w-4 h-4 text-ss-secondary" />
                        <span className="label-caps text-[11px] text-ss-secondary font-bold">
                          View All Projects
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-ss-secondary transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}

                {/* ── ACHIEVEMENTS Tab ── */}
                {activeTab === "achievements" && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-mono text-ss-outline-var text-sm select-none">
                        ##
                      </span>
                      <h2 className="font-display text-lg font-bold text-ss-on-surface">
                        Achievements
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {ACHIEVEMENTS.map((ach) => (
                        <div
                          key={ach.title}
                          className="p-4 rounded-xl"
                          style={{
                            background: "rgba(14,18,27,0.5)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                            <span className="font-display font-semibold text-ss-on-surface text-[14px] leading-snug">
                              {ach.title}
                            </span>
                            <span className="font-mono text-[10px] text-ss-on-surface-var shrink-0">
                              {ach.date}
                            </span>
                          </div>
                          <div className="label-caps text-[9px] text-ss-secondary mb-2">
                            {ach.roleOrContext}
                          </div>
                          <p className="text-ss-on-surface-var text-[12px] leading-relaxed">
                            {ach.description}
                          </p>
                          {ach.links && (
                            <div className="flex flex-wrap gap-3 mt-2.5">
                              {ach.links.map((link) => (
                                <a
                                  key={link.label}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 label-caps text-[9px] text-ss-primary hover:text-ss-primary-fixed transition-colors"
                                >
                                  <ExternalLink className="w-2.5 h-2.5" />
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer strip ── */}
        <div className="mt-3 flex items-center justify-between gap-4 flex-wrap">
          <span className="font-mono text-[11px] text-ss-on-surface-var">
            Last updated ·{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2 font-mono text-[11px] text-ss-on-surface-var">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ss-tertiary opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-ss-tertiary" />
            </span>
            {PROFILE.statusLine}
          </span>
        </div>
      </div>
    </section>
  );
};
