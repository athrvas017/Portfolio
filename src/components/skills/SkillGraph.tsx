"use client";

import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  Server,
  Layout,
  Terminal,
  Sparkles,
  FolderGit2,
  BookOpen,
  Award,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Maximize2,
  Minimize2,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { ACHIEVEMENTS, CERTIFICATIONS } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { SKILL_TREES, SkillItem, SkillCategoryTree } from "./InteractiveSkillTree";

/* ─────────────────────────────────────────────────────────────────────────────
   Types & Geometry Constants
───────────────────────────────────────────────────────────────────────────── */

interface Point {
  x: number;
  y: number;
}

export interface NodeData {
  id: string;
  type: "root" | "category" | "skill";
  label: string;
  x: number;
  y: number;
  color: string;
  glowColor: string;
  bgColor?: string;
  borderColor?: string;
  category?: SkillCategoryTree;
  skill?: SkillItem;
}

interface EdgeData {
  id: string;
  from: Point;
  to: Point;
  color: string;
  edgeType: "root-cat" | "cat-skill";
}

interface HoverState {
  node: NodeData;
  sx: number;
  sy: number;
}

const ROOT_COLOR = "#c0c1ff";
const ROOT_GLOW = "rgba(192,193,255,0.35)";

// Canvas dimensions - fixed viewBox ensures clean, responsive scaling without zoom/pan
const SVG_W = 1000;
const SVG_H = 780;
const CX = SVG_W / 2; // 500
const CY = SVG_H / 2; // 390
const CAT_RADIUS = 210;
const SKILL_RADIUS = 118;

type IconName = "code" | "ai" | "server" | "frontend" | "tools";

const ICON_EL: Record<IconName, React.ReactNode> = {
  code: <Code2 style={{ width: 17, height: 17 }} />,
  ai: <BrainCircuit style={{ width: 17, height: 17 }} />,
  server: <Server style={{ width: 17, height: 17 }} />,
  frontend: <Layout style={{ width: 17, height: 17 }} />,
  tools: <Terminal style={{ width: 17, height: 17 }} />,
};

/* ─────────────────────────────────────────────────────────────────────────────
   Curved Edge Math & Layout Calculations
───────────────────────────────────────────────────────────────────────────── */

function bezierPath(from: Point, to: Point, curv = 0.16): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const nx = (-dy / dist) * dist * curv;
  const ny = (dx / dist) * dist * curv;
  return `M ${from.x} ${from.y} Q ${mx + nx} ${my + ny} ${to.x} ${to.y}`;
}

function computeLayout(expanded: Set<string>): { nodes: NodeData[]; edges: EdgeData[] } {
  const nodes: NodeData[] = [];
  const edges: EdgeData[] = [];
  const n = SKILL_TREES.length;

  // Root central node
  nodes.push({
    id: "root",
    type: "root",
    label: "SKILLS",
    x: CX,
    y: CY,
    color: ROOT_COLOR,
    glowColor: ROOT_GLOW,
  });

  SKILL_TREES.forEach((cat, ci) => {
    // Distribute 5 categories evenly in a circle starting from top (-PI/2)
    const catAngle = (2 * Math.PI * ci) / n - Math.PI / 2;
    const cx2 = CX + CAT_RADIUS * Math.cos(catAngle);
    const cy2 = CY + CAT_RADIUS * Math.sin(catAngle);

    nodes.push({
      id: cat.id,
      type: "category",
      label: cat.name,
      x: cx2,
      y: cy2,
      color: cat.color,
      glowColor: cat.glowColor,
      bgColor: cat.bgColor,
      borderColor: cat.borderColor,
      category: cat,
    });

    edges.push({
      id: `e-root-${cat.id}`,
      from: { x: CX, y: CY },
      to: { x: cx2, y: cy2 },
      color: cat.color,
      edgeType: "root-cat",
    });

    // Expand category branch skills if active
    if (expanded.has(cat.id)) {
      const sc = cat.skills.length;
      const spread = Math.min(Math.PI * 0.72, Math.max(0.42, (sc - 1) * 0.28));
      const startAngle = catAngle - spread / 2;

      cat.skills.forEach((skill, si) => {
        const skillAngle = sc === 1 ? catAngle : startAngle + (spread * si) / (sc - 1);
        const sx = cx2 + SKILL_RADIUS * Math.cos(skillAngle);
        const sy = cy2 + SKILL_RADIUS * Math.sin(skillAngle);

        nodes.push({
          id: `${cat.id}-${skill.id}`,
          type: "skill",
          label: skill.name,
          x: sx,
          y: sy,
          color: cat.color,
          glowColor: cat.glowColor,
          bgColor: cat.bgColor,
          borderColor: cat.borderColor,
          skill,
          category: cat,
        });

        edges.push({
          id: `e-${cat.id}-${skill.id}`,
          from: { x: cx2, y: cy2 },
          to: { x: sx, y: sy },
          color: cat.color,
          edgeType: "cat-skill",
        });
      });
    }
  });

  return { nodes, edges };
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hover Tooltip Pop-up Card (Shown on node hover)
───────────────────────────────────────────────────────────────────────────── */

const HoverCard: React.FC<{ hover: HoverState }> = ({ hover }) => {
  const { node, sx, sy } = hover;
  const cat = node.category;
  const skill = node.skill;
  const cardRef = useRef<HTMLDivElement>(null);

  // Compute safely-bounded screen coordinates
  const computePos = useCallback(
    (cardW: number, cardH: number) => {
      if (typeof window === "undefined") return { x: sx + 18, y: sy - 50 };

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const PADDING = 16;
      const TOP_NAV_OFFSET = 80; // Keep clear of fixed top navbar / HUD

      // Horizontal: Prefer right of node/cursor, flip left if it would cross viewport right edge
      let x = sx + 18;
      if (x + cardW > vw - PADDING) {
        x = sx - cardW - 18;
      }
      // Hard clamp within left & right viewport bounds
      x = Math.max(PADDING, Math.min(vw - cardW - PADDING, x));

      // Vertical: Center card vertically with respect to the node/cursor
      let y = sy - cardH / 2;
      // Hard clamp between top navbar and bottom of viewport
      y = Math.max(TOP_NAV_OFFSET, Math.min(vh - cardH - PADDING, y));

      return { x, y };
    },
    [sx, sy]
  );

  const initialEstimatedHeight = node.type === "category" ? 150 : 210;
  const [pos, setPos] = useState(() => computePos(280, initialEstimatedHeight));

  // Re-measure exact card dimensions after DOM render and adjust position
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const updated = computePos(rect.width || 280, rect.height || initialEstimatedHeight);
      setPos(updated);
    }
  }, [computePos, initialEstimatedHeight]);

  // Recalculate on window resize
  useEffect(() => {
    const handleRecalc = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setPos(computePos(rect.width || 280, rect.height || initialEstimatedHeight));
      }
    };
    window.addEventListener("resize", handleRecalc);
    return () => window.removeEventListener("resize", handleRecalc);
  }, [computePos, initialEstimatedHeight]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      ref={cardRef}
      className="fixed z-[9999] pointer-events-none select-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: 280,
        maxWidth: "calc(100vw - 32px)",
      }}
      initial={{ opacity: 0, scale: 0.94, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 4 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    >
      <div
        className="rounded-xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(14,16,21,0.98)",
          border: `1px solid ${node.color}50`,
          boxShadow: `0 12px 40px -8px rgba(0,0,0,0.85), 0 0 24px -6px ${node.glowColor}`,
          backdropFilter: "blur(18px)",
        }}
      >
        {/* Top accent stripe */}
        <div
          className="h-[2px]"
          style={{ background: `linear-gradient(90deg, ${node.color}, transparent)` }}
        />

        <div className="p-3.5">
          {/* Skill Node Tooltip */}
          {node.type === "skill" && skill && cat && (
            <>
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{
                    background: cat.bgColor,
                    border: `1px solid ${cat.borderColor}`,
                    color: cat.color,
                  }}
                >
                  {skill.tier}
                </span>
                <div className="flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: cat.color }}
                  />
                  <span className="text-[9px] font-mono font-bold" style={{ color: cat.color }}>
                    {skill.level.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-white font-bold text-[13px] mb-1.5 leading-tight">
                {skill.name}
              </div>

              <p className="text-[10px] text-[#A5A8AC] leading-relaxed mb-2.5 line-clamp-3">
                {skill.description}
              </p>

              <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                {skill.relatedProjectSlugs.length > 0 && (
                  <span className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#A5A8AC]">
                    <FolderGit2 style={{ width: 9, height: 9, color: cat.color }} />
                    {skill.relatedProjectSlugs.length} Proj
                  </span>
                )}
                {skill.relatedCertTitles.length > 0 && (
                  <span className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#A5A8AC]">
                    <BookOpen style={{ width: 9, height: 9 }} className="text-amber-300" />
                    {skill.relatedCertTitles.length} Cert
                  </span>
                )}
                {skill.relatedAchievementTitles.length > 0 && (
                  <span className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#A5A8AC]">
                    <Award style={{ width: 9, height: 9 }} className="text-emerald-400" />
                    {skill.relatedAchievementTitles.length} Hon
                  </span>
                )}
                <span className="ml-auto text-[9px] font-mono text-[#79C9B0]">
                  Click for side specs →
                </span>
              </div>
            </>
          )}

          {/* Category Node Tooltip */}
          {node.type === "category" && cat && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: cat.bgColor, border: `1px solid ${cat.borderColor}` }}
                >
                  <div style={{ color: cat.color, transform: "scale(0.85)" }}>
                    {ICON_EL[cat.iconName as IconName]}
                  </div>
                </div>
                <div>
                  <div
                    className="text-[9px] font-mono font-bold tracking-widest uppercase"
                    style={{ color: cat.color }}
                  >
                    {cat.code} · {cat.badge}
                  </div>
                  <div className="text-white font-bold text-[12px] leading-tight">{cat.name}</div>
                </div>
              </div>

              <p className="text-[10px] text-[#A5A8AC] leading-relaxed mb-2 line-clamp-2">
                {cat.summary}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span
                  className="text-[9px] font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    background: cat.bgColor,
                    border: `1px solid ${cat.borderColor}`,
                    color: cat.color,
                  }}
                >
                  {cat.skills.length} COMPETENCIES
                </span>
                <span className="text-[9px] font-mono text-[#79C9B0]">
                  Click to toggle &amp; inspect →
                </span>
              </div>
            </>
          )}

          {/* Central Root Tooltip */}
          {node.type === "root" && (
            <>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles style={{ width: 14, height: 14, color: ROOT_COLOR }} />
                <span className="text-white font-bold text-[12px]">System Capability Matrix</span>
              </div>
              <p className="text-[10px] text-[#A5A8AC] leading-relaxed mb-2">
                5 distinct architectural sectors · 26 competencies.
              </p>
              <div className="text-[9px] font-mono text-[#79C9B0]">
                Click any branch to inspect specs on side →
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Animated Edge Line
───────────────────────────────────────────────────────────────────────────── */

const AnimatedEdge: React.FC<{ edge: EdgeData; isHighlighted?: boolean }> = ({
  edge,
  isHighlighted = false,
}) => {
  const d = bezierPath(edge.from, edge.to, edge.edgeType === "root-cat" ? 0.14 : 0.18);
  const thick = edge.edgeType === "root-cat";

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={edge.color}
        strokeWidth={thick ? (isHighlighted ? 4 : 3) : isHighlighted ? 2.5 : 1.5}
        strokeOpacity={isHighlighted ? 0.35 : 0.08}
        strokeLinecap="round"
      />
      <motion.path
        d={d}
        fill="none"
        stroke={edge.color}
        strokeWidth={thick ? 1.5 : 1}
        strokeOpacity={isHighlighted ? 0.85 : thick ? 0.5 : 0.35}
        strokeLinecap="round"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </g>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Root Central Hub Node
───────────────────────────────────────────────────────────────────────────── */

const RootNode: React.FC<{
  x: number;
  y: number;
  isHovered: boolean;
  isSelected: boolean;
  onClick: () => void;
  onHoverEnter: (e?: React.MouseEvent) => void;
  onHoverLeave: () => void;
}> = ({ x, y, isHovered, isSelected, onClick, onHoverEnter, onHoverLeave }) => (
  <g
    transform={`translate(${x},${y})`}
    style={{ cursor: "pointer" }}
    onClick={onClick}
    onMouseEnter={onHoverEnter}
    onMouseLeave={onHoverLeave}
  >
    <motion.circle
      r={46}
      fill="none"
      stroke={ROOT_COLOR}
      strokeWidth={1}
      strokeOpacity={0.16}
      animate={{ r: [44, 52, 44] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      r={36}
      fill="none"
      stroke={ROOT_COLOR}
      strokeWidth={1}
      strokeOpacity={0.12}
      animate={{ r: [34, 42, 34] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
    <circle
      r={28}
      fill="#101217"
      stroke={ROOT_COLOR}
      strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.8}
      style={{
        filter: `drop-shadow(0 0 ${isSelected ? 24 : isHovered ? 18 : 10}px ${ROOT_GLOW})`,
        transition: "stroke-width 0.2s",
      }}
    />
    <circle r={24} fill="rgba(192,193,255,0.06)" style={{ pointerEvents: "none" }} />
    <text
      textAnchor="middle"
      dominantBaseline="central"
      fill={ROOT_COLOR}
      fontSize={9.5}
      fontWeight={700}
      fontFamily="monospace"
      letterSpacing={2}
      style={{ pointerEvents: "none" }}
    >
      SKILLS
    </text>
  </g>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Category Branch Hub Node
───────────────────────────────────────────────────────────────────────────── */

const CategoryNode: React.FC<{
  node: NodeData;
  isExpanded: boolean;
  isHovered: boolean;
  isSelected: boolean;
  onClick: () => void;
  onHoverEnter: (e?: React.MouseEvent) => void;
  onHoverLeave: () => void;
}> = ({ node, isExpanded, isHovered, isSelected, onClick, onHoverEnter, onHoverLeave }) => {
  const cat = node.category!;
  const r = 28;
  const active = isExpanded || isHovered || isSelected;

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
    >
      {active && (
        <circle
          r={r + 16}
          fill={node.glowColor}
          opacity={isSelected ? 0.55 : isHovered ? 0.45 : 0.25}
          style={{ filter: "blur(12px)" }}
        />
      )}

      {/* Orbiting dashed ring */}
      <motion.circle
        r={r + 6}
        fill="none"
        stroke={node.color}
        strokeWidth={1}
        strokeOpacity={isSelected ? 0.7 : active ? 0.45 : 0.18}
        strokeDasharray="4 5"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "0px 0px" }}
      />

      {/* Node circle */}
      <circle
        r={r}
        fill="#101217"
        stroke={node.color}
        strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.8}
        strokeOpacity={active ? 1 : 0.65}
        style={{
          filter: active
            ? `drop-shadow(0 0 ${isSelected ? 20 : isHovered ? 16 : 8}px ${node.glowColor})`
            : "none",
        }}
      />
      <circle r={r - 2} fill={node.color} fillOpacity={isHovered ? 0.16 : 0.08} />

      {/* Icon */}
      <foreignObject x={-8.5} y={-17} width={17} height={17} style={{ pointerEvents: "none" }}>
        <div
          style={{
            color: node.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 17,
            height: 17,
          }}
        >
          {ICON_EL[cat.iconName as IconName]}
        </div>
      </foreignObject>

      {/* Skills count */}
      <text
        y={8}
        textAnchor="middle"
        fill={node.color}
        fontSize={8.5}
        fontWeight={700}
        fontFamily="monospace"
        fillOpacity={0.9}
        style={{ pointerEvents: "none" }}
      >
        {cat.skills.length} nodes
      </text>

      {/* Name label */}
      <foreignObject x={-55} y={r + 4} width={110} height={34} style={{ pointerEvents: "none" }}>
        <div
          style={{
            color: isSelected ? "#ffffff" : active ? node.color : "#9da3ae",
            fontSize: 8.5,
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.25,
            transition: "color 0.2s",
          }}
        >
          {cat.name}
        </div>
      </foreignObject>

      {/* Toggle indicator */}
      <text
        y={r + 44}
        textAnchor="middle"
        fill={node.color}
        fontSize={7.5}
        fontFamily="monospace"
        fillOpacity={active ? 0.75 : 0.3}
        style={{ pointerEvents: "none" }}
      >
        {isExpanded ? "▲ collapse" : "▼ expand"}
      </text>
    </g>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Individual Skill Leaf Node
───────────────────────────────────────────────────────────────────────────── */

const SkillNode: React.FC<{
  node: NodeData;
  isHovered: boolean;
  isSelected: boolean;
  onClick: () => void;
  onHoverEnter: (e?: React.MouseEvent) => void;
  onHoverLeave: () => void;
}> = ({ node, isHovered, isSelected, onClick, onHoverEnter, onHoverLeave }) => {
  const skill = node.skill!;
  const r = 18;
  const tier =
    skill.tier === "Tier 1 · Core" ? "T1" : skill.tier === "Tier 2 · Applied" ? "T2" : "T3";

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      style={{ cursor: "pointer" }}
      onClick={onClick}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
    >
      <motion.g
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.2 }}
        transition={{ duration: 0.26, ease: "easeOut" }}
      >
        {/* Glow halo */}
        {(isHovered || isSelected) && (
          <circle
            r={r + 12}
            fill={node.glowColor}
            opacity={isSelected ? 0.6 : 0.4}
            style={{ filter: "blur(10px)" }}
          />
        )}

        {/* Selected pulse ring */}
        {isSelected && (
          <motion.circle
            r={r + 5}
            fill="none"
            stroke={node.color}
            strokeWidth={1.5}
            strokeDasharray="3 3"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0px 0px" }}
          />
        )}

        <circle
          r={r}
          fill="#101217"
          stroke={node.color}
          strokeWidth={isSelected ? 2.8 : isHovered ? 2.2 : 1.4}
          strokeOpacity={isSelected ? 1 : isHovered ? 0.9 : 0.6}
          style={{
            filter:
              isSelected || isHovered
                ? `drop-shadow(0 0 ${isSelected ? 14 : 10}px ${node.glowColor})`
                : "none",
            transformOrigin: "0px 0px",
          }}
        />
        <circle r={r - 2} fill={node.color} fillOpacity={isHovered ? 0.18 : 0.1} />

        {/* Tier text */}
        <text
          y={-3.5}
          textAnchor="middle"
          fill={node.color}
          fontSize={8}
          fontWeight={700}
          fontFamily="monospace"
          fillOpacity={0.95}
          style={{ pointerEvents: "none" }}
        >
          {tier}
        </text>

        {/* Level text */}
        <text
          y={6}
          textAnchor="middle"
          fill={node.color}
          fontSize={6.5}
          fontFamily="monospace"
          fillOpacity={0.65}
          style={{ pointerEvents: "none" }}
        >
          {skill.level.slice(0, 6)}
        </text>

        {/* Skill label */}
        <foreignObject x={-40} y={r + 3} width={80} height={32} style={{ pointerEvents: "none" }}>
          <div
            style={{
              color: isSelected ? "#ffffff" : isHovered ? node.color : "#c7c4d7",
              fontSize: 8,
              fontFamily: "monospace",
              fontWeight: isSelected ? 700 : 600,
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: 1.25,
              letterSpacing: "0.03em",
              transition: "color 0.18s",
            }}
          >
            {node.label}
          </div>
        </foreignObject>
      </motion.g>
    </g>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Side Description Inspector Panel (Updated on node click)
───────────────────────────────────────────────────────────────────────────── */

interface SideInspectorProps {
  selectedNode: NodeData;
  onSelectNodeById: (id: string) => void;
}

const SideInspector: React.FC<SideInspectorProps> = ({ selectedNode, onSelectNodeById }) => {
  const skill = selectedNode.skill;
  const category = selectedNode.category;

  // Linked projects
  const linkedProjects = useMemo(() => {
    if (!skill) return [];
    return PROJECTS.filter((p) => skill.relatedProjectSlugs.includes(p.slug));
  }, [skill]);

  // Linked certs
  const linkedCerts = useMemo(() => {
    if (!skill) return [];
    return CERTIFICATIONS.filter((c) =>
      skill.relatedCertTitles.some(
        (t) =>
          c.title.toLowerCase().includes(t.toLowerCase()) ||
          t.toLowerCase().includes(c.title.toLowerCase())
      )
    );
  }, [skill]);

  // Linked achievements
  const linkedAchievements = useMemo(() => {
    if (!skill) return [];
    return ACHIEVEMENTS.filter((a) =>
      skill.relatedAchievementTitles.some(
        (t) =>
          a.title.toLowerCase().includes(t.toLowerCase()) ||
          t.toLowerCase().includes(a.title.toLowerCase())
      )
    );
  }, [skill]);

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 min-h-[580px]"
      style={{
        background: "linear-gradient(180deg, #16181D 0%, #101215 100%)",
        border: `1px solid ${selectedNode.color}35`,
        boxShadow: `0 0 50px -15px ${selectedNode.glowColor}, 0 10px 30px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Top ambient color glow */}
      <div
        className="absolute -top-20 -right-20 w-52 h-52 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: selectedNode.color }}
      />

      <div className="flex flex-col gap-4 relative z-10">
        {/* Top telemetry tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-sm rotate-45"
              style={{
                background: selectedNode.color,
                boxShadow: `0 0 8px ${selectedNode.color}`,
              }}
            />
            <span
              className="font-mono text-[11px] font-bold tracking-wider uppercase"
              style={{ color: selectedNode.color }}
            >
              {category
                ? `${category.code} · ${category.badge}`
                : "SYSTEM_CORE · TELEMETRY"}
            </span>
          </div>

          <span className="font-mono text-[10px] text-[#A5A8AC]">
            {selectedNode.type === "skill"
              ? `NODE: ${skill?.id.toUpperCase()}`
              : selectedNode.type === "category"
              ? `SECTOR: ${category?.code}`
              : "ROOT"}
          </span>
        </div>

        {/* ── SKILL NODE INSPECTION ── */}
        {selectedNode.type === "skill" && skill && category && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                  style={{
                    background: category.bgColor,
                    border: `1px solid ${category.borderColor}`,
                    color: category.color,
                  }}
                >
                  {skill.tier}
                </span>

                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10"
                  style={{ color: category.color }}
                >
                  ● {skill.level.toUpperCase()}
                </span>

                <span className="text-[10px] font-mono text-[#A5A8AC]">
                  {category.name}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {skill.name}
              </h3>
            </div>

            {/* Description */}
            <div className="bg-[#1A1D23] p-4 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono text-[#A5A8AC] uppercase tracking-wider block mb-1.5">
                Applied Competency &amp; Architecture
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#F0EDE6] leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Dependencies */}
            {skill.dependsOn && skill.dependsOn.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                <span className="text-[#A5A8AC] text-[11px]">REQUIRES:</span>
                {skill.dependsOn.map((depId) => (
                  <button
                    key={depId}
                    onClick={() => onSelectNodeById(`${category.id}-${depId}`)}
                    className="px-2 py-0.5 rounded bg-[#25292E] border border-white/10 hover:border-[#FFB454] text-[#FFB454] text-[10px] transition-colors"
                  >
                    {depId.toUpperCase()} →
                  </button>
                ))}
              </div>
            )}

            {/* Linked Projects */}
            {linkedProjects.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#A5A8AC]">
                  <span className="flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5" style={{ color: category.color }} />
                    <span className="text-white font-semibold">
                      VERIFIED IMPLEMENTATIONS ({linkedProjects.length})
                    </span>
                  </span>
                  <Link
                    href="/projects"
                    className="hover:text-white transition-colors text-[10px]"
                  >
                    View Roster →
                  </Link>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {linkedProjects.map((proj) => (
                    <Link
                      key={proj.slug}
                      href={`/projects#${proj.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-lg bg-[#1A1D23] border border-white/5 hover:border-[#FFB454]/40 transition-all"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold text-white group-hover:text-[#FFB454] transition-colors truncate">
                          {proj.title}
                        </div>
                        <div className="text-[10px] text-[#A5A8AC] truncate">
                          {proj.oneLiner}
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#A5A8AC] group-hover:text-[#FFB454] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Linked Certifications */}
            {linkedCerts.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="flex items-center gap-1.5 text-xs font-mono text-[#A5A8AC]">
                  <BookOpen className="w-3.5 h-3.5 text-[#FFB454]" />
                  <span className="text-white font-semibold">
                    ACCREDITATIONS ({linkedCerts.length})
                  </span>
                </span>
                <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                  {linkedCerts.map((c) => (
                    <div
                      key={c.title}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#1A1D23] border border-white/5 text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-semibold text-white block text-[11px] truncate">
                          {c.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#79C9B0] block">
                          {c.issuer} · {c.date}
                        </span>
                      </div>
                      {c.pdfPath && (
                        <a
                          href={c.pdfPath}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 p-1.5 rounded bg-white/5 hover:bg-white/10 text-[#FFB454]"
                          title="View Certificate"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Linked Achievements */}
            {linkedAchievements.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="flex items-center gap-1.5 text-xs font-mono text-[#A5A8AC]">
                  <Award className="w-3.5 h-3.5 text-[#79C9B0]" />
                  <span className="text-white font-semibold">
                    HONORS &amp; HACKATHONS ({linkedAchievements.length})
                  </span>
                </span>
                <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                  {linkedAchievements.map((ach) => (
                    <div
                      key={ach.title}
                      className="p-2 rounded-lg bg-[#1A1D23] border border-white/5 text-xs"
                    >
                      <div className="flex items-center justify-between gap-1 text-[11px]">
                        <span className="font-bold text-white truncate">{ach.title}</span>
                        <span className="text-[9px] font-mono text-[#79C9B0] shrink-0">
                          {ach.date}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#A5A8AC] line-clamp-1 mt-0.5">
                        {ach.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── CATEGORY NODE INSPECTION ── */}
        {selectedNode.type === "category" && category && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: category.bgColor,
                    border: `1px solid ${category.borderColor}`,
                  }}
                >
                  <div style={{ color: category.color }}>
                    {ICON_EL[category.iconName as IconName]}
                  </div>
                </div>
                <div>
                  <span
                    className="label-caps font-mono text-[10px] font-bold block"
                    style={{ color: category.color }}
                  >
                    {category.code} · {category.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1D23] p-4 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono text-[#A5A8AC] uppercase tracking-wider block mb-1">
                Architectural Sector Overview
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#F0EDE6] leading-relaxed">
                {category.summary}
              </p>
            </div>

            {/* Skills List in Category */}
            <div>
              <span className="text-xs font-mono text-[#A5A8AC] uppercase tracking-wider block mb-2">
                Component Skills ({category.skills.length}) · Click to inspect:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {category.skills.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectNodeById(`${category.id}-${s.id}`)}
                    className="text-left p-2.5 rounded-lg bg-[#1A1D23] border border-white/5 hover:border-white/20 transition-all flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{s.name}</span>
                      <ChevronRight className="w-3 h-3 text-[#A5A8AC]" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono">
                      <span style={{ color: category.color }}>{s.tier}</span>
                      <span className="text-[#A5A8AC]">·</span>
                      <span className="text-[#79C9B0]">{s.level}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── ROOT NODE INSPECTION ── */}
        {selectedNode.type === "root" && (
          <>
            <div>
              <span className="text-[10px] font-mono text-[#FFB454] uppercase tracking-wider block mb-1">
                ENGINEERING CORE · ARCHITECTURE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                System Capability Matrix
              </h3>
            </div>

            <div className="bg-[#1A1D23] p-4 rounded-xl border border-white/5">
              <p className="font-sans text-xs sm:text-sm text-[#F0EDE6] leading-relaxed">
                Cross-domain capability matrix spanning deep learning and agentic workflows,
                high-throughput systems, asynchronous APIs, graph theory, and DevOps CI pipelines.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="bg-[#1A1D23] p-3 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-[#A5A8AC] block">CORE SECTORS</span>
                <span className="text-lg font-bold text-[#FFB454] font-mono">
                  {SKILL_TREES.length} Domains
                </span>
              </div>
              <div className="bg-[#1A1D23] p-3 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-[#A5A8AC] block">
                  EVALUATED COMPETENCIES
                </span>
                <span className="text-lg font-bold text-[#79C9B0] font-mono">
                  {SKILL_TREES.reduce((a, c) => a + c.skills.length, 0)} Nodes
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-mono text-[#A5A8AC] uppercase tracking-wider block">
                Select a Sector to Inspect:
              </span>
              <div className="flex flex-col gap-1.5">
                {SKILL_TREES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectNodeById(c.id)}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#1A1D23] border border-white/5 hover:border-white/20 text-xs text-left transition-all"
                  >
                    <span className="font-semibold text-white">{c.name}</span>
                    <span className="font-mono text-[10px]" style={{ color: c.color }}>
                      {c.skills.length} nodes →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer Navigation Strip */}
      <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs font-mono">
        <Link
          href="/projects"
          className="text-[#A5A8AC] hover:text-[#FFB454] transition-colors flex items-center gap-1"
        >
          <span>Projects Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/credentials"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFB454]/10 border border-[#FFB454]/30 text-[#FFB454] hover:bg-[#FFB454]/20 transition-all font-semibold"
        >
          <span>All Credentials</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Main SkillGraph Component
   - Fixed graph canvas with NO zoom in, NO zoom out, NO panning
   - On hover: pop-up preview tooltip
   - On click: updates the side description inspector (no modal popup)
───────────────────────────────────────────────────────────────────────────── */

interface SkillGraphProps {
  initialSelectedId?: string;
  className?: string;
}

export const SkillGraph: React.FC<SkillGraphProps> = ({
  initialSelectedId = "ai-ml-agentic-ai",
  className = "",
}) => {
  // Start with all 5 category branches extended so user sees complete tree immediately
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(SKILL_TREES.map((c) => c.id))
  );

  // SVG element ref for exact screen coordinate projection
  const svgRef = useRef<SVGSVGElement>(null);

  // Hover state (for floating tooltip card)
  const [hovered, setHovered] = useState<HoverState | null>(null);

  // Compute layout based on currently expanded branches
  const { nodes, edges } = useMemo(() => computeLayout(expanded), [expanded]);

  // Selected node state for the side inspector
  const [selectedNodeId, setSelectedNodeId] = useState<string>(initialSelectedId);

  // Fallback to first node if selected node isn't found
  const selectedNode = useMemo(() => {
    const found = nodes.find((n) => n.id === selectedNodeId);
    if (found) return found;
    // Fallback: look for a skill node or category node
    const firstSkill = nodes.find((n) => n.type === "skill");
    return firstSkill || nodes[0];
  }, [nodes, selectedNodeId]);

  // Toggle category expansion
  const toggleCat = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpanded(new Set(SKILL_TREES.map((c) => c.id)));
  }, []);

  const collapseAll = useCallback(() => {
    setExpanded(new Set());
  }, []);

  // Convert SVG coordinates to screen coordinates for tooltip positioning fallback
  const nodeToScreen = useCallback((nodeX: number, nodeY: number) => {
    const svgEl = svgRef.current;
    if (!svgEl) return { sx: 0, sy: 0 };
    const ctm = svgEl.getScreenCTM();
    if (!ctm) return { sx: 0, sy: 0 };
    const pt = svgEl.createSVGPoint();
    pt.x = nodeX;
    pt.y = nodeY;
    const screenPt = pt.matrixTransform(ctm);
    return { sx: screenPt.x, sy: screenPt.y };
  }, []);

  const handleHoverEnter = useCallback(
    (node: NodeData, e?: React.MouseEvent) => {
      let sx = 0;
      let sy = 0;
      if (e && typeof e.clientX === "number" && typeof e.clientY === "number" && (e.clientX > 0 || e.clientY > 0)) {
        sx = e.clientX;
        sy = e.clientY;
      } else {
        const coords = nodeToScreen(node.x, node.y);
        sx = coords.sx;
        sy = coords.sy;
      }
      setHovered({ node, sx, sy });
    },
    [nodeToScreen]
  );

  const handleHoverLeave = useCallback(() => {
    setHovered(null);
  }, []);

  // Dismiss tooltip preview cleanly if the user scrolls the page
  useEffect(() => {
    if (!hovered) return;
    const handleScroll = () => {
      setHovered(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hovered]);

  // Node click handler: selects node for side inspector (no modal popup)
  const handleNodeClick = useCallback(
    (node: NodeData) => {
      setSelectedNodeId(node.id);
      // If clicking a category, also toggle its branch expansion
      if (node.type === "category") {
        toggleCat(node.id);
      }
    },
    [toggleCat]
  );

  // Select node by ID handler (e.g. from side inspector prerequisites or category list)
  const handleSelectNodeById = useCallback(
    (id: string) => {
      // If it belongs to a category that is collapsed, expand that category
      const catMatch = SKILL_TREES.find((c) => id.startsWith(c.id));
      if (catMatch && !expanded.has(catMatch.id)) {
        setExpanded((prev) => new Set([...prev, catMatch.id]));
      }
      setSelectedNodeId(id);
    },
    [expanded]
  );

  const rootNode = nodes.find((n) => n.type === "root")!;
  const catNodes = nodes.filter((n) => n.type === "category");
  const skillNodes = nodes.filter((n) => n.type === "skill");
  const totalSkills = useMemo(
    () => SKILL_TREES.reduce((a, c) => a + c.skills.length, 0),
    []
  );

  return (
    <div className={`w-full ${className}`}>
      {/* ── Top HUD Control Bar ── */}
      <div
        className="mb-6 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, #16181D 0%, #101215 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center gap-3 flex-wrap text-xs font-mono">
          <div className="flex items-center gap-2 bg-[#20232A] px-2.5 py-1 rounded-md border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#79C9B0] animate-pulse" />
            <span className="text-[#F0EDE6] font-bold">GRAPH VIEW ONLINE</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-[#A5A8AC]">{SKILL_TREES.length} SECTORS</span>
          <span className="text-white/20">·</span>
          <span className="text-[#FFB454] font-semibold">{totalSkills} NODES</span>
          <span className="text-white/20">·</span>
          <span className="text-[#79C9B0]">{expanded.size} BRANCHES EXPANDED</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#20232A] hover:bg-[#2A2E37] text-white border border-white/10 transition-colors flex items-center gap-1.5"
            title="Extend all skill branches"
          >
            <Maximize2 className="w-3 h-3 text-[#FFB454]" />
            <span>EXTEND ALL</span>
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#20232A] hover:bg-[#2A2E37] text-[#A5A8AC] hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
            title="Collapse all skill branches"
          >
            <Minimize2 className="w-3 h-3" />
            <span>COLLAPSE</span>
          </button>
        </div>
      </div>

      {/* ── Two-Column Main Split View: Left Graph Canvas | Right Side Inspector ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Graph Canvas (7 cols on lg, 8 on xl) */}
        <div className="lg:col-span-7 xl:col-span-7 bg-[#131519] rounded-2xl border border-[#383D43] p-3 sm:p-4 relative overflow-hidden shadow-2xl flex flex-col">
          {/* Canvas Sub-header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#A5A8AC]">
              <span className="w-2 h-2 rounded-full bg-[#FFB454]" />
              <span className="text-white font-semibold">
                RADIAL KNOWLEDGE TOPOLOGY
              </span>
            </div>
            <span className="text-[11px] text-[#79C9B0] hidden sm:inline">
              HOVER = PREVIEW · CLICK = INSPECT ON SIDE
            </span>
          </div>

          {/* SVG Container: Fixed scale, non-zoomed, non-draggable, 100% responsive */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[10/8] flex items-center justify-center select-none overflow-hidden rounded-xl bg-[#0B0C0E]/95">
            {/* Ambient radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(192,193,255,0.06),transparent_70%)] pointer-events-none" />

            {/* Background grid */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]">
              <defs>
                <pattern id="sg-canvas-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                  <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#FFB454" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sg-canvas-grid)" />
            </svg>

            {/* Main Interactive Graph SVG */}
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full max-h-[640px]"
              role="img"
              aria-label="Interactive game skill tree and systems capability graph"
            >
              {/* Edges */}
              <g className="edges-layer">
                {edges.map((e) => (
                  <AnimatedEdge
                    key={e.id}
                    edge={e}
                    isHighlighted={
                      selectedNode.id === e.from.x.toString() ||
                      hovered?.node.id === e.from.x.toString()
                    }
                  />
                ))}
              </g>

              {/* Central Root Node */}
              {rootNode && (
                <RootNode
                  x={rootNode.x}
                  y={rootNode.y}
                  isHovered={hovered?.node.id === "root"}
                  isSelected={selectedNode.id === "root"}
                  onClick={() => handleNodeClick(rootNode)}
                  onHoverEnter={(e) => handleHoverEnter(rootNode, e)}
                  onHoverLeave={handleHoverLeave}
                />
              )}

              {/* Category Nodes */}
              {catNodes.map((catNode) => (
                <CategoryNode
                  key={catNode.id}
                  node={catNode}
                  isExpanded={expanded.has(catNode.id)}
                  isHovered={hovered?.node.id === catNode.id}
                  isSelected={selectedNode.id === catNode.id}
                  onClick={() => handleNodeClick(catNode)}
                  onHoverEnter={(e) => handleHoverEnter(catNode, e)}
                  onHoverLeave={handleHoverLeave}
                />
              ))}

              {/* Skill Leaf Nodes */}
              {skillNodes.map((skillNode) => (
                <SkillNode
                  key={skillNode.id}
                  node={skillNode}
                  isHovered={hovered?.node.id === skillNode.id}
                  isSelected={selectedNode.id === skillNode.id}
                  onClick={() => handleNodeClick(skillNode)}
                  onHoverEnter={(e) => handleHoverEnter(skillNode, e)}
                  onHoverLeave={handleHoverLeave}
                />
              ))}
            </svg>

            {/* Floating Hover Tooltip Card */}
            <AnimatePresence>{hovered && <HoverCard hover={hovered} />}</AnimatePresence>
          </div>
        </div>

        {/* Right: Side Description Inspector Panel (5 cols on lg, 4 on xl) */}
        <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24">
          <SideInspector
            selectedNode={selectedNode}
            onSelectNodeById={handleSelectNodeById}
          />
        </div>
      </div>
    </div>
  );
};
