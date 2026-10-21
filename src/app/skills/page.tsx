"use client";

import React from "react";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { ArrowLeft, ArrowRight, FileText, Sparkles, Code2, Home } from "lucide-react";
import { SkillGraph } from "@/components/skills/SkillGraph";

export default function SkillsPage() {

  return (
    <div className="min-h-screen pt-6 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">

      {/* ── Top Navigation Bar ── */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg text-ss-on-surface-var hover:text-ss-primary hover:bg-ss-primary/6 transition-all"
        >
          <Home className="w-4 h-4" />
          <span className="label-caps text-[10px]">Home</span>
        </Link>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg label-caps text-[10px] text-ss-on-surface hover:text-ss-secondary bg-ss-surface-high border border-ss-outline-var/40 hover:border-ss-secondary/40 hover:bg-ss-secondary/8 transition-all duration-200"
          >
            <Code2 className="w-3.5 h-3.5" />
            Projects
            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <a
            href={PROFILE.resumePath}
            download="Athrva_Sarade_Resume.pdf"
            className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg label-caps text-[10px] text-ss-on-surface hover:text-ss-primary bg-ss-surface-high border border-ss-outline-var/40 hover:border-ss-primary/40 hover:bg-ss-primary/8 transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5" />
            Résumé
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-ss-primary to-ss-primary-cont hover:from-ss-primary-cont hover:to-ss-primary text-ss-on-primary px-4 py-2 rounded-lg label-caps text-[10px] font-bold transition-all duration-300 active:scale-[0.97]"
            style={{
              boxShadow: "0 0 20px rgba(192,193,255,0.25), 0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Hire Me
          </a>
        </div>
      </div>

      {/* ── Breadcrumb / Telemetry Header ── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-ss-on-surface-var">
            <Link
              href="/"
              className="hover:text-ss-primary flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>OVERVIEW</span>
            </Link>
            <span>/</span>
            <span className="text-ss-secondary">SYSTEM CAPABILITY MATRIX</span>
            <span>/</span>
            <span className="text-ss-primary">TALENT TREE v2.0</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Game Skill Tree &amp; Capability Matrix
          </h1>
          <p className="font-sans text-sm sm:text-base text-ss-on-surface-var mt-2 max-w-3xl leading-relaxed">
            Interactive dependency graph: hover any node for preview tooltip, click any node to view technical specifications and linked artifacts on the side inspector.
          </p>
        </div>
      </div>

      {/* ── Graph View ── */}
      <SkillGraph />

      {/* ── Bottom Navigation CTA Strip ── */}
      <div className="mt-16 pt-8 border-t border-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <Link
            href="/"
            className="group flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 hover:scale-[1.01]"
            style={{
              background: "rgba(192,193,255,0.04)",
              border: "1px solid rgba(192,193,255,0.12)",
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-ss-primary/10 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5 text-ss-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="label-caps text-[10px] text-ss-primary block">Homepage</span>
              <span className="text-[11px] text-ss-on-surface-var">Back to model card overview</span>
            </div>
            <ArrowRight className="w-4 h-4 text-ss-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/projects"
            className="group flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 hover:scale-[1.01]"
            style={{
              background: "rgba(255,185,95,0.04)",
              border: "1px solid rgba(255,185,95,0.12)",
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-ss-secondary/10 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-ss-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="label-caps text-[10px] text-ss-secondary block">Project Roster</span>
              <span className="text-[11px] text-ss-on-surface-var">Explore all engineering systems</span>
            </div>
            <ArrowRight className="w-4 h-4 text-ss-secondary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-ss-on-surface-var">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-ss-secondary animate-pulse" />
            <span>GRAPH STATUS: FULL OPERATIONAL SYNC</span>
            <span>·</span>
            <span>VJTI COMP ENG &apos;28</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 hover:text-ss-primary transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              CONTACT ME
            </a>
            <span>·</span>
            <a
              href={PROFILE.resumePath}
              download="Athrva_Sarade_Resume.pdf"
              className="hover:text-ss-secondary transition-colors"
            >
              ↓ RÉSUMÉ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
