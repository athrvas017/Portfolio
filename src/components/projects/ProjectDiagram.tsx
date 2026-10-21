"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProjectDiagramProps {
  slug: string;
  className?: string;
}

export const ProjectDiagram: React.FC<ProjectDiagramProps> = ({ slug, className }) => {
  // Render specific animated SVG diagram based on project slug
  if (slug === "netshield") {
    return (
      <div className={cn("w-full h-36 bg-bg/80 rounded border border-hairline p-3 relative overflow-hidden flex flex-col justify-between font-mono text-[11px]", className)}>
        <div className="flex items-center justify-between text-text-secondary border-b border-hairline/60 pb-1.5">
          <span className="text-signal-verified font-bold">NETSHIELD · INSPECTION ENGINE</span>
          <span className="text-[10px] text-text-secondary/70">URL PIPELINE</span>
        </div>
        
        {/* Animated URL -> Lexical -> Classifier -> Output Flow */}
        <div className="grid grid-cols-4 gap-2 items-center text-center my-auto">
          {/* Step 1: Input URL */}
          <div className="p-2 bg-surface rounded border border-hairline">
            <span className="block text-text-primary text-[10px] truncate">http://phish...</span>
            <span className="block text-[9px] text-text-secondary">Input Payload</span>
          </div>

          {/* Step 2: Feature Extractor */}
          <div className="p-2 bg-surface rounded border border-hairline">
            <span className="block text-signal-verified font-semibold text-[10px]">Parser</span>
            <span className="block text-[9px] text-text-secondary">Path Entropy</span>
          </div>

          {/* Step 3: XGBoost / Random Forest */}
          <div className="p-2 bg-surface rounded border border-hairline">
            <span className="block text-text-primary text-[10px] font-semibold">Classifier</span>
            <span className="block text-[9px] text-text-secondary">Threat Matrix</span>
          </div>

          {/* Step 4: Output Status */}
          <div className="p-2 bg-signal-flagged/10 rounded border border-signal-flagged/40">
            <span className="block text-signal-flagged font-bold text-[10px]">FLAGGED</span>
            <span className="block text-[9px] text-signal-flagged/80">98.4% Confidence</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-text-secondary/60 pt-1 border-t border-hairline/40">
          <span>Rule: Malicious Token Detected</span>
          <span>Response: 14ms</span>
        </div>
      </div>
    );
  }

  if (slug === "supplylens360") {
    return (
      <div className={cn("w-full h-36 bg-bg/80 rounded border border-hairline p-3 relative overflow-hidden flex flex-col justify-between font-mono text-[11px]", className)}>
        <div className="flex items-center justify-between text-text-secondary border-b border-hairline/60 pb-1.5">
          <span className="text-signal-verified font-bold">SUPPLYLENS360 · DAG DEPENDENCY GRAPH</span>
          <span className="text-[10px] text-text-secondary/70">RISK TRAVERSAL</span>
        </div>

        {/* Multi-tier Graph Simulation */}
        <div className="relative h-20 w-full my-auto flex items-center justify-around">
          {/* Tier 3 Supplier */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-signal-flagged/20 border-2 border-signal-flagged flex items-center justify-center text-[10px] text-signal-flagged font-bold">
              T3
            </div>
            <span className="text-[9px] text-text-secondary">Raw Vendor</span>
          </div>

          <div className="w-8 h-0.5 bg-signal-flagged/60 relative">
            <span className="absolute -top-3 left-1 text-[8px] text-signal-flagged">Disrupt</span>
          </div>

          {/* Tier 2 Supplier */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-surface border border-hairline flex items-center justify-center text-[10px] text-text-primary">
              T2
            </div>
            <span className="text-[9px] text-text-secondary">Component</span>
          </div>

          <div className="w-8 h-0.5 bg-hairline" />

          {/* Tier 1 Assembly */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-signal-verified/20 border-2 border-signal-verified flex items-center justify-center text-[10px] text-signal-verified font-bold">
              T1
            </div>
            <span className="text-[9px] text-text-primary">Assembly</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-text-secondary/60 pt-1 border-t border-hairline/40">
          <span>BFS Risk propagation: Tier-3 Disruption flagged</span>
          <span>Nodes evaluated: 48</span>
        </div>
      </div>
    );
  }

  if (slug === "carechain") {
    return (
      <div className={cn("w-full h-36 bg-bg/80 rounded border border-hairline p-3 relative overflow-hidden flex flex-col justify-between font-mono text-[11px]", className)}>
        <div className="flex items-center justify-between text-text-secondary border-b border-hairline/60 pb-1.5">
          <span className="text-signal-verified font-bold">CARECHAIN · MATCHING ENGINE</span>
          <span className="text-[10px] text-text-secondary/70">PRIORITY QUEUE</span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center text-center my-auto">
          <div className="p-2 bg-surface rounded border border-hairline">
            <span className="block text-text-primary text-[10px]">Medical Request</span>
            <span className="block text-[9px] text-signal-flagged font-semibold">Priority 1 (Urgent)</span>
          </div>
          <div className="p-2 bg-signal-verified/10 rounded border border-signal-verified/40">
            <span className="block text-signal-verified font-bold text-[10px]">Matcher</span>
            <span className="block text-[9px] text-text-secondary">Distance + Stock</span>
          </div>
          <div className="p-2 bg-surface rounded border border-hairline">
            <span className="block text-text-primary text-[10px]">Verified Donor</span>
            <span className="block text-[9px] text-signal-verified font-semibold">Fulfilled</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-text-secondary/60 pt-1 border-t border-hairline/40">
          <span>Proximity algorithm: Active</span>
          <span>Status: Verified Claim</span>
        </div>
      </div>
    );
  }

  // Default Architecture Diagram fallback for NextStop, Zenith, MedLearn, Forum, JusticeGrid
  return (
    <div className={cn("w-full h-36 bg-bg/80 rounded border border-hairline p-3 relative overflow-hidden flex flex-col justify-between font-mono text-[11px]", className)}>
      <div className="flex items-center justify-between text-text-secondary border-b border-hairline/60 pb-1.5">
        <span className="text-signal-verified font-bold">{slug.toUpperCase()} · SYSTEM SCHEMATIC</span>
        <span className="text-[10px] text-text-secondary/70">ARCHITECTURE</span>
      </div>

      <div className="grid grid-cols-3 gap-3 items-center text-center my-auto">
        <div className="p-2 bg-surface rounded border border-hairline">
          <span className="block text-text-primary text-[10px]">Core State</span>
          <span className="block text-[9px] text-text-secondary">Inputs / Data</span>
        </div>
        <div className="p-2 bg-surface rounded border border-hairline">
          <span className="block text-signal-verified font-semibold text-[10px]">Logic Layer</span>
          <span className="block text-[9px] text-text-secondary">Processing</span>
        </div>
        <div className="p-2 bg-surface rounded border border-hairline">
          <span className="block text-text-primary text-[10px]">Output Target</span>
          <span className="block text-[9px] text-text-secondary">Result / API</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-text-secondary/60 pt-1 border-t border-hairline/40">
        <span>Architectural Pipeline verified</span>
        <span>Status: Nominal</span>
      </div>
    </div>
  );
};
