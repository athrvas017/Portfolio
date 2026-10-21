"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { MODELS } from "@/data/models";
import { CREDENTIALS } from "@/data/credentials";
import {
  FolderCode,
  Network,
  Award,
  FileCheck,
  Terminal as TerminalIcon,
  User,
  FileText,
  Wifi,
  Volume2,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  Sliders,
  Layers,
  ArrowRight,
  ShieldCheck,
  PanelRightClose,
  PanelRightOpen,
  Menu,
  X,
  ExternalLink,
  ArrowUpRight,
  Search,
  Calendar,
} from "lucide-react";

type ActiveApp = "credentials" | "projects" | "models" | "about" | "terminal";

export const FutureOsWorkspace: React.FC<{ initialApp?: ActiveApp }> = ({
  initialApp = "credentials",
}) => {
  const [activeApp, setActiveApp] = useState<ActiveApp>(initialApp);
  const [timeString, setTimeString] = useState("14:28:09");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Credentials embedded state
  const [credSearch, setCredSearch] = useState("");
  const [credCategory, setCredCategory] = useState("All");

  // Terminal app state
  const [terminalHistory, setTerminalHistory] = useState<
    { command: string; output: string }[]
  >([
    {
      command: "nexus --version",
      output: "ATHRVA.OS Workstation v4.2.0 (x86_64-pc-none-elf) [Sandboxed Replay]",
    },
    {
      command: "sys:status",
      output:
        "All subsystems nominal. Replay session active. Credentials registry loaded (14 certifications).",
    },
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  // Keep live time updated
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(" ")[0] || "14:28:09");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Handle terminal command execution
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let reply = `command not recognized: '${cmd}'. Type 'help' for available commands.`;
    if (cmd === "help") {
      reply =
        "Available commands:\n  help        - Show this reference\n  credentials - List accredited certifications\n  projects    - List active projects & status\n  models      - List registered model checkpoints\n  status      - Display system health telemetry\n  whoami      - Print current engineer profile\n  clear       - Clear screen history";
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else if (cmd === "credentials") {
      reply = CREDENTIALS.map(
        (c) => `• [${c.category.padEnd(10)}] ${c.name} (${c.issuer}, ${c.date})`
      ).join("\n");
    } else if (cmd === "projects") {
      reply = PROJECTS.map(
        (p) => `• [${p.status.padEnd(9)}] ${p.title} - ${p.oneLiner}`
      ).join("\n");
    } else if (cmd === "models") {
      reply = MODELS.map(
        (m) => `• [${m.status.padEnd(9)}] ${m.name} (${m.kind}) - ${m.version}`
      ).join("\n");
    } else if (cmd === "status") {
      reply =
        "SYS:READY | DEMO RUNTIME [SANDBOXED] | PID: 9021 | CREDENTIALS VERIFIED";
    } else if (cmd === "whoami") {
      reply = `${PROFILE.name} - ${PROFILE.role}\nLocation: ${PROFILE.location}\nEmail: ${PROFILE.email}`;
    }

    setTerminalHistory((prev) => [...prev, { command: terminalInput, output: reply }]);
    setTerminalInput("");
  };

  const filteredCredentials = CREDENTIALS.filter((c) => {
    if (credCategory !== "All" && c.category !== credCategory) return false;
    if (credSearch.trim()) {
      const q = credSearch.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="bg-[#101113] font-sans text-[#F0EDE6] antialiased min-h-screen relative overflow-x-hidden selection:bg-[#FFB454]/20 selection:text-[#FFB454]">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 pointer-events-none bg-blueprint-grid opacity-30 z-0" />

      {/* ── Left Sidebar Navigation (Desktop) ── */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-[#15171A]/95 backdrop-blur-xl border-r border-[#383D43] z-50 flex-col justify-between">
        <div>
          {/* Workstation Header with Account Symbol + Athrva Sarade */}
          <div className="p-4 border-b border-[#383D43]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-6 h-6 rounded-md bg-[#25292E] border border-[#FFB454]/40 flex items-center justify-center text-[#FFB454]">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-xs tracking-wider text-[#F0EDE6] font-semibold group-hover:text-[#FFB454] transition-colors uppercase">
                {PROFILE.name}
              </span>
            </Link>
            <div className="font-mono text-[11px] text-[#6E737A] mt-1 pl-1">
              SYSTEM_WORKSTATION · v4.2
            </div>
          </div>

          {/* Navigation Modules */}
          <div className="p-3">
            <div className="px-2 py-1.5 font-mono text-[10px] text-[#6E737A] tracking-wider uppercase font-semibold">
              Navigation Modules
            </div>
            <nav className="flex flex-col gap-1 mt-1 font-mono text-xs">
              <Link
                href="/"
                className="px-3 py-2 rounded text-[#A5A8AC] hover:text-[#F0EDE6] hover:bg-[#25292E] transition-colors flex items-center justify-between"
              >
                <span>01 · Neural Landing</span>
              </Link>
              <button
                onClick={() => setActiveApp("credentials")}
                className={`px-3 py-2 rounded transition-colors text-left flex items-center justify-between ${
                  activeApp === "credentials"
                    ? "bg-[#25292E] text-[#FFB454] border border-[#FFB454]/30 shadow-[0_0_12px_rgba(255,180,84,0.08)] font-semibold"
                    : "text-[#A5A8AC] hover:text-[#F0EDE6] hover:bg-[#25292E]"
                }`}
              >
                <span>02 · Workspace</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB454] shadow-[0_0_6px_rgba(255,180,84,0.7)]" />
              </button>
              <Link
                href="/projects"
                className="px-3 py-2 rounded text-[#A5A8AC] hover:text-[#F0EDE6] hover:bg-[#25292E] transition-colors"
              >
                03 · Projects Explorer
              </Link>
              <Link
                href="/models"
                className="px-3 py-2 rounded text-[#A5A8AC] hover:text-[#F0EDE6] hover:bg-[#25292E] transition-colors"
              >
                04 · Model Registry
              </Link>
              <Link
                href="/credentials"
                className="px-3 py-2 rounded text-[#A5A8AC] hover:text-[#F0EDE6] hover:bg-[#25292E] transition-colors"
              >
                05 · Credentials
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded text-[#A5A8AC] hover:text-[#F0EDE6] hover:bg-[#25292E] transition-colors"
              >
                06 · About
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded text-[#A5A8AC] hover:text-[#F0EDE6] hover:bg-[#25292E] transition-colors"
              >
                07 · Contact
              </Link>
            </nav>

          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#383D43] bg-[#0D0E10]/80">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-[#79C9B0] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#79C9B0] animate-pulse" />
              SYS:READY
            </span>
            <span className="text-[#6E737A]">PID: 9021</span>
          </div>
        </div>
      </aside>

      {/* ── Main Workspace Wrapper ── */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-[#15171A]/90 backdrop-blur-xl border-b border-[#383D43] z-40 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded bg-[#1B1E22] border border-[#383D43] text-[#F0EDE6]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-[#FFB454]" />}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#25292E] border border-[#FFB454]/40 flex items-center justify-center text-[#FFB454]">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-xs sm:text-sm tracking-wide text-[#F0EDE6] truncate uppercase font-mono">
                {PROFILE.name} · WORKSTATION
              </span>
            </div>
            <div className="h-4 w-px bg-[#383D43] hidden sm:block" />
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-[#6E737A]">SESSION_ID:</span>
              <span className="font-mono text-[11px] text-[#F0EDE6] bg-[#25292E] px-2 py-0.5 rounded border border-[#383D43]">
                0x7F4A...B901
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] text-[#6E737A]">UTC</span>
                <span className="font-mono text-xs text-[#F0EDE6] font-semibold">
                  {timeString}
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#6E737A]">LOCAL · SYNCED</span>
            </div>

            <div className="h-6 w-px bg-[#383D43] hidden md:block" />

            <a
              href={PROFILE.resumePath}
              download="Athrva_Sarade_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] hover:border-[#FFB454]/40 text-[#F0EDE6] hover:text-[#FFB454] transition-all font-mono text-xs font-medium"
            >
              <FileText className="w-3.5 h-3.5 text-[#FFB454]" />
              <span className="hidden sm:inline">RESUME.PDF</span>
            </a>

            {/* Contact href symbol replacing github symbol */}
            <Link
              href="/contact"
              aria-label="Contact Athrva Sarade"
              className="p-1.5 rounded bg-[#25292E] border border-[#383D43] text-[#A5A8AC] hover:text-[#FFB454] transition-colors flex items-center justify-center"
              title="Contact Athrva Sarade"
            >
              <ExternalLink className="w-4 h-4 text-[#FFB454]" />
            </Link>

            <Link
              href="/about"
              className="w-8 h-8 rounded bg-[#25292E] border border-[#383D43] flex items-center justify-center text-[#F0EDE6] hover:border-[#FFB454]/50"
              title="About Athrva Sarade"
            >
              <User className="w-4 h-4 text-[#FFB454]" />
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-[#101113]/98 border-b border-[#383D43] p-4 font-mono text-xs space-y-2 backdrop-blur-xl shadow-2xl">
            <div className="text-[10px] text-[#6E737A] uppercase tracking-wider mb-2">
              Workspace Switcher
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveApp("credentials");
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded border text-left flex items-center gap-2 ${
                  activeApp === "credentials"
                    ? "bg-[#25292E] border-[#FFB454] text-[#FFB454]"
                    : "bg-[#1B1E22] border-[#383D43] text-[#A5A8AC]"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Credentials</span>
              </button>
              <button
                onClick={() => {
                  setActiveApp("projects");
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded border text-left flex items-center gap-2 ${
                  activeApp === "projects"
                    ? "bg-[#25292E] border-[#FFB454] text-[#FFB454]"
                    : "bg-[#1B1E22] border-[#383D43] text-[#A5A8AC]"
                }`}
              >
                <FolderCode className="w-3.5 h-3.5" />
                <span>Projects</span>
              </button>
              <button
                onClick={() => {
                  setActiveApp("models");
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded border text-left flex items-center gap-2 ${
                  activeApp === "models"
                    ? "bg-[#25292E] border-[#FFB454] text-[#FFB454]"
                    : "bg-[#1B1E22] border-[#383D43] text-[#A5A8AC]"
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Models</span>
              </button>
              <button
                onClick={() => {
                  setActiveApp("terminal");
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded border text-left flex items-center gap-2 ${
                  activeApp === "terminal"
                    ? "bg-[#25292E] border-[#FFB454] text-[#FFB454]"
                    : "bg-[#1B1E22] border-[#383D43] text-[#A5A8AC]"
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Terminal</span>
              </button>
            </div>
            <div className="pt-2 border-t border-[#383D43] flex items-center justify-between text-[#A5A8AC]">
              <Link href="/" className="hover:text-[#FFB454]">
                Neural Landing Page →
              </Link>
              <Link href="/credentials" className="hover:text-[#FFB454]">
                Credentials Page →
              </Link>
            </div>
          </div>
        )}

        {/* ── Main Workspace Content Area ── */}
        <main className="relative z-10 w-full pt-16 flex-1 flex flex-col justify-between">
          <div className="w-full px-3 sm:px-6 py-4 sm:py-5 flex-1 flex flex-col">
            {/* Outer Window Container with Border & Ambient Blur */}
            <div className="w-full rounded-xl border border-[#383D43] bg-[#1B1E22]/85 backdrop-blur-md shadow-2xl flex-1 flex flex-col justify-between p-3 sm:p-5 relative overflow-hidden">
              {/* Metadata Watermark Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#383D43]/50 text-[#6E737A] font-mono text-[11px]">
                <div className="flex items-center gap-3">
                  <span>WORKSPACE: DESKTOP_PRIMARY</span>
                  <span className="hidden sm:inline text-[#383D43]">|</span>
                  <span className="hidden sm:inline">REGISTRY: verified-accreditations-v4</span>
                  <span className="hidden md:inline text-[#383D43]">|</span>
                  <span className="hidden md:inline text-[#79C9B0] font-medium">
                    DAG VERIFICATION: STRICT
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#79C9B0] animate-pulse" />
                  <span className="text-[#A5A8AC] font-medium">
                    ACTIVE STATUS: VERIFIED CREDENTIALS
                  </span>
                </div>
              </div>

              {/* Main Desktop Layout Grid */}
              <div className="mt-4 grid grid-cols-12 gap-4 items-start flex-1">
                {/* ── Desktop Launcher Icons Column (XL: 2 Cols) ── */}
                <div className="col-span-12 xl:col-span-2 flex flex-row xl:flex-col gap-2 overflow-x-auto pb-1 xl:pb-0 select-none">
                  {/* App 1: Credentials.app (Active Foreground Default) */}
                  <button
                    onClick={() => setActiveApp("credentials")}
                    className={`group flex items-center xl:w-full gap-2.5 p-2 rounded-lg border transition-all text-left ${
                      activeApp === "credentials"
                        ? "bg-[#25292E] border-[#FFB454]/40 shadow-[0_0_12px_rgba(255,180,84,0.12)]"
                        : "bg-[#25292E]/40 hover:bg-[#25292E] border-transparent hover:border-[#383D43]"
                    }`}
                  >
                    <div className="w-9 h-9 rounded bg-[#FFB454]/10 border border-[#FFB454]/30 flex items-center justify-center text-[#FFB454] shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 pr-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs text-[#FFB454] font-semibold truncate">
                          Credentials.app
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB454] animate-pulse" />
                      </div>
                      <span className="font-mono text-[10px] text-[#A5A8AC] block truncate">
                        {CREDENTIALS.length} verified
                      </span>
                    </div>
                  </button>

                  {/* App 2: Projects.app */}
                  <button
                    onClick={() => setActiveApp("projects")}
                    className={`group flex items-center xl:w-full gap-2.5 p-2 rounded-lg border transition-all text-left ${
                      activeApp === "projects"
                        ? "bg-[#25292E] border-[#FFB454]/40 shadow-[0_0_12px_rgba(255,180,84,0.12)]"
                        : "bg-[#25292E]/40 hover:bg-[#25292E] border-transparent hover:border-[#383D43]"
                    }`}
                  >
                    <div className="w-9 h-9 rounded bg-[#1F2329] border border-[#383D43] flex items-center justify-center text-[#A5A8AC] group-hover:text-[#FFB454] transition-colors shrink-0">
                      <FolderCode className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 pr-1">
                      <div className="font-mono text-xs text-[#F0EDE6] font-medium truncate">
                        Projects.app
                      </div>
                      <span className="font-mono text-[10px] text-[#6E737A] block truncate">
                        {PROJECTS.length} systems
                      </span>
                    </div>
                  </button>

                  {/* App 3: ModelRegistry.app */}
                  <button
                    onClick={() => setActiveApp("models")}
                    className={`group flex items-center xl:w-full gap-2.5 p-2 rounded-lg border transition-all text-left ${
                      activeApp === "models"
                        ? "bg-[#25292E] border-[#FFB454]/40 shadow-[0_0_12px_rgba(255,180,84,0.12)]"
                        : "bg-[#25292E]/40 hover:bg-[#25292E] border-transparent hover:border-[#383D43]"
                    }`}
                  >
                    <div className="w-9 h-9 rounded bg-[#1F2329] border border-[#383D43] flex items-center justify-center text-[#79C9B0] group-hover:scale-105 transition-transform shrink-0">
                      <Network className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 pr-1">
                      <div className="font-mono text-xs text-[#F0EDE6] font-medium truncate">
                        ModelRegistry.app
                      </div>
                      <span className="font-mono text-[10px] text-[#6E737A] block truncate">
                        {MODELS.length} checkpoints
                      </span>
                    </div>
                  </button>

                  {/* App 4: AboutMe.app */}
                  <button
                    onClick={() => setActiveApp("about")}
                    className={`group flex items-center xl:w-full gap-2.5 p-2 rounded-lg border transition-all text-left ${
                      activeApp === "about"
                        ? "bg-[#25292E] border-[#FFB454]/40 shadow-[0_0_12px_rgba(255,180,84,0.12)]"
                        : "bg-[#25292E]/40 hover:bg-[#25292E] border-transparent hover:border-[#383D43]"
                    }`}
                  >
                    <div className="w-9 h-9 rounded bg-[#1F2329] border border-[#383D43] flex items-center justify-center text-[#A5A8AC] group-hover:text-[#F0EDE6] transition-colors shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 pr-1">
                      <div className="font-mono text-xs text-[#F0EDE6] font-medium truncate">
                        AboutMe.app
                      </div>
                      <span className="font-mono text-[10px] text-[#6E737A] block truncate">
                        VJTI Comp Eng
                      </span>
                    </div>
                  </button>

                  {/* App 5: Terminal.sh */}
                  <button
                    onClick={() => setActiveApp("terminal")}
                    className={`group flex items-center xl:w-full gap-2.5 p-2 rounded-lg border transition-all text-left ${
                      activeApp === "terminal"
                        ? "bg-[#25292E] border-[#FFB454]/40 shadow-[0_0_12px_rgba(255,180,84,0.12)]"
                        : "bg-[#25292E]/40 hover:bg-[#25292E] border-transparent hover:border-[#383D43]"
                    }`}
                  >
                    <div className="w-9 h-9 rounded bg-[#1F2329] border border-[#383D43] flex items-center justify-center text-[#79C9B0] shrink-0">
                      <TerminalIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 pr-1">
                      <div className="font-mono text-xs text-[#F0EDE6] font-medium truncate">
                        Terminal.sh
                      </div>
                      <span className="font-mono text-[10px] text-[#6E737A] block truncate">
                        zsh · interactive
                      </span>
                    </div>
                  </button>

                  {/* App 6: Resume.pdf */}
                  <a
                    href={PROFILE.resumePath}
                    download="Athrva_Sarade_Resume.pdf"
                    className="group flex items-center xl:w-full gap-2.5 p-2 rounded-lg bg-[#25292E]/40 hover:bg-[#25292E] border border-transparent hover:border-[#383D43] transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded bg-[#1F2329] border border-[#383D43] flex items-center justify-center text-[#A5A8AC] group-hover:text-[#FFB454] transition-colors shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 pr-1">
                      <div className="font-mono text-xs text-[#F0EDE6] font-medium truncate">
                        Resume.pdf
                      </div>
                      <span className="font-mono text-[10px] text-[#6E737A] block truncate">
                        Download PDF
                      </span>
                    </div>
                  </a>
                </div>

                {/* ── Central Window Container (XL: 10 Cols) ── */}
                <div className="col-span-12 xl:col-span-10 flex flex-col rounded-xl bg-[#1B1E22] border border-[#383D43] shadow-2xl overflow-hidden min-h-[580px]">
                  {/* Window Chrome Title Bar */}
                  <div className="w-full bg-[#25292E] px-4 py-2.5 border-b border-[#383D43] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Traffic lights */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#F08D8D]/80 border border-[#F08D8D]/30" />
                        <span className="w-3 h-3 rounded-full bg-[#FFB454]/80 border border-[#FFB454]/30" />
                        <span className="w-3 h-3 rounded-full bg-[#79C9B0]/80 border border-[#79C9B0]/30" />
                      </div>
                      <div className="h-4 w-px bg-[#383D43]" />
                      <div className="flex items-center gap-2">
                        {activeApp === "credentials" && (
                          <>
                            <Award className="w-4 h-4 text-[#FFB454]" />
                            <span className="font-mono text-xs text-[#F0EDE6] font-semibold truncate">
                              Credentials.app · Verified Certification Registry
                            </span>
                          </>
                        )}
                        {activeApp === "projects" && (
                          <>
                            <FolderCode className="w-4 h-4 text-[#FFB454]" />
                            <span className="font-mono text-xs text-[#F0EDE6] font-semibold">
                              Projects.app · Verified Systems Portfolio
                            </span>
                          </>
                        )}
                        {activeApp === "models" && (
                          <>
                            <Network className="w-4 h-4 text-[#79C9B0]" />
                            <span className="font-mono text-xs text-[#F0EDE6] font-semibold">
                              ModelRegistry.app · Model &amp; System Checkpoints
                            </span>
                          </>
                        )}
                        {activeApp === "about" && (
                          <>
                            <User className="w-4 h-4 text-[#FFB454]" />
                            <span className="font-mono text-xs text-[#F0EDE6] font-semibold">
                              AboutMe.app · Engineer Profile &amp; Achievements
                            </span>
                          </>
                        )}
                        {activeApp === "terminal" && (
                          <>
                            <TerminalIcon className="w-4 h-4 text-[#79C9B0]" />
                            <span className="font-mono text-xs text-[#F0EDE6] font-semibold">
                              Terminal.sh · Nexus Interactive Shell
                            </span>
                          </>
                        )}
                      </div>
                      <span className="hidden sm:inline font-mono text-[10px] px-2 py-0.5 rounded bg-[#1F2329] text-[#79C9B0] border border-[#79C9B0]/30">
                        VERIFIED STATUS
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1B1E22] border border-[#383D43] font-mono text-[11px] text-[#6E737A]">
                        <span>SESSION: verified_client</span>
                      </div>
                      {activeApp === "credentials" && (
                        <Link
                          href="/credentials"
                          className="px-2.5 py-1 rounded bg-[#25292E] hover:bg-[#1F2329] text-[#FFB454] border border-[#FFB454]/30 font-mono text-xs flex items-center gap-1 transition-colors"
                        >
                          <span>Full Page View</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* ── App View: Credentials (Embedded inside Workspace) ── */}
                  {activeApp === "credentials" && (
                    <div className="p-4 sm:p-6 flex-1 flex flex-col space-y-4">
                      {/* Search & Category Filter strip inside workspace window */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#383D43] pb-3">
                        <div className="relative flex-1 max-w-md">
                          <Search className="w-3.5 h-3.5 text-[#6E737A] absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={credSearch}
                            onChange={(e) => setCredSearch(e.target.value)}
                            placeholder="Filter credentials by name, issuer, or skills..."
                            className="w-full pl-8 pr-3 py-1.5 rounded bg-[#15171A] border border-[#383D43] text-xs font-mono text-[#F0EDE6] placeholder-[#6E737A] outline-none focus:border-[#FFB454]"
                          />
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs">
                          {["All", "Agentic AI", "AI/ML", "Programming", "Other"].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setCredCategory(cat)}
                              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                                credCategory === cat
                                  ? "bg-[#25292E] text-[#FFB454] border border-[#FFB454]/40 font-semibold"
                                  : "text-[#A5A8AC] hover:bg-[#25292E] border border-[#383D43]/60"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Credentials Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto max-h-[480px] pr-1">
                        {filteredCredentials.map((cred) => (
                          <div
                            key={cred.slug}
                            className="p-4 rounded-lg bg-[#25292E] border border-[#383D43] hover:border-[#FFB454]/50 transition-all flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-[#FFB454] text-[10px] font-semibold uppercase">
                                  {cred.category}
                                </span>
                                <span className="text-[#79C9B0] text-[10px] px-1.5 py-0.5 rounded bg-[#79C9B0]/10 border border-[#79C9B0]/30">
                                  {cred.status}
                                </span>
                              </div>

                              <h3 className="text-sm font-bold text-[#F0EDE6] leading-snug">
                                {cred.name}
                              </h3>
                              <div className="text-[11px] font-mono text-[#A5A8AC] flex items-center justify-between">
                                <span>{cred.issuer}</span>
                                <span>{cred.date}</span>
                              </div>
                              <p className="text-xs text-[#A5A8AC] line-clamp-2">
                                {cred.description}
                              </p>

                              {/* Skills chips */}
                              <div className="flex flex-wrap gap-1 pt-1">
                                {cred.skills.slice(0, 3).map((s) => (
                                  <span
                                    key={s}
                                    className="px-1.5 py-0.5 rounded bg-[#15171A] text-[10px] font-mono text-[#79C9B0]"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="pt-3 border-t border-[#383D43]/60 flex items-center justify-between text-xs font-mono mt-3">
                              <span className="text-[#6E737A] text-[10px]">
                                {cred.credentialId ? `ID: ${cred.credentialId.slice(0, 8)}...` : "Accredited"}
                              </span>
                              {cred.pdfUrl && (
                                <a
                                  href={cred.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#FFB454] hover:underline flex items-center gap-1 text-[11px]"
                                >
                                  <span>View Certificate</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── App View: Projects (Embedded) ── */}
                  {activeApp === "projects" && (
                    <div className="p-4 sm:p-6 flex-1 flex flex-col space-y-4">
                      <div className="flex items-center justify-between border-b border-[#383D43] pb-3">
                        <div>
                          <h2 className="text-lg font-bold text-[#F0EDE6]">
                            Projects.app · Verified Systems Portfolio
                          </h2>
                          <p className="text-xs text-[#A5A8AC] mt-0.5">
                            Real systems, graph traversal engines, ML classifiers, and state machines.
                          </p>
                        </div>
                        <Link
                          href="/projects"
                          className="px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-xs font-mono text-[#FFB454] hover:bg-[#1F2329]"
                        >
                          Open Full Page →
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto max-h-[500px]">
                        {PROJECTS.map((proj) => (
                          <div
                            key={proj.slug}
                            className="p-4 rounded-lg bg-[#25292E] border border-[#383D43] hover:border-[#FFB454]/60 transition-all flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-[#FFB454] font-semibold">{proj.title}</span>
                                <span className="text-[#79C9B0]">{proj.status}</span>
                              </div>
                              <p className="text-xs text-[#A5A8AC] line-clamp-2">
                                {proj.oneLiner}
                              </p>
                            </div>
                            <div className="pt-3 border-t border-[#383D43]/60 flex items-center justify-between text-xs font-mono mt-3">
                              <span className="text-[#6E737A]">{proj.tags.join(" · ")}</span>
                              <Link
                                href={`/projects/${proj.slug}`}
                                className="text-[#FFB454] hover:underline flex items-center gap-1"
                              >
                                Case Study →
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── App View: Models (Embedded) ── */}
                  {activeApp === "models" && (
                    <div className="p-4 sm:p-6 flex-1 flex flex-col space-y-4">
                      <div className="flex items-center justify-between border-b border-[#383D43] pb-3">
                        <div>
                          <h2 className="text-lg font-bold text-[#F0EDE6]">
                            ModelRegistry.app · Checkpoint Hub
                          </h2>
                          <p className="text-xs text-[#A5A8AC] mt-0.5">
                            Versioned checkpoints, threat classifiers, and agent pipelines.
                          </p>
                        </div>
                        <Link
                          href="/models"
                          className="px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-xs font-mono text-[#79C9B0] hover:bg-[#1F2329]"
                        >
                          Open Full Registry →
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto max-h-[500px]">
                        {MODELS.map((model) => (
                          <div
                            key={model.slug}
                            className="p-4 rounded-lg bg-[#25292E] border border-[#383D43] hover:border-[#79C9B0]/60 transition-all flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-[#F0EDE6] font-semibold">{model.name}</span>
                                <span className="text-[#79C9B0] px-1.5 py-0.5 rounded bg-[#79C9B0]/10 border border-[#79C9B0]/30 text-[10px]">
                                  {model.status}
                                </span>
                              </div>
                              <p className="text-xs text-[#A5A8AC] line-clamp-2">
                                {model.summary}
                              </p>
                              {model.metrics && model.metrics.length > 0 && (
                                <div className="p-2 rounded bg-[#1B1E22] font-mono text-[11px] text-[#A5A8AC] flex justify-between">
                                  <span>{model.metrics[0].name}:</span>
                                  <span className="text-[#79C9B0] font-semibold">
                                    {model.metrics[0].value} {model.metrics[0].unit || ""}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="pt-3 border-t border-[#383D43]/60 flex items-center justify-between text-xs font-mono mt-3">
                              <span className="text-[#6E737A]">{model.kind}</span>
                              <Link
                                href={`/models/${model.slug}`}
                                className="text-[#79C9B0] hover:underline"
                              >
                                View Model Card →
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── App View: About (Embedded) ── */}
                  {activeApp === "about" && (
                    <div className="p-4 sm:p-6 flex-1 flex flex-col space-y-4 font-sans">
                      <div className="flex items-center justify-between border-b border-[#383D43] pb-3">
                        <div>
                          <h2 className="text-lg font-bold text-[#F0EDE6]">
                            AboutMe.app · Engineer Profile
                          </h2>
                          <p className="text-xs text-[#A5A8AC] mt-0.5">
                            {PROFILE.name} · {PROFILE.role}
                          </p>
                        </div>
                        <Link
                          href="/about"
                          className="px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-xs font-mono text-[#FFB454] hover:bg-[#1F2329]"
                        >
                          Full Profile →
                        </Link>
                      </div>

                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                        <div className="p-4 rounded-lg bg-[#25292E] border border-[#383D43]">
                          <span className="font-mono text-xs text-[#FFB454] uppercase tracking-wider block mb-1">
                            Engineering Background
                          </span>
                          <p className="text-sm text-[#A5A8AC] leading-relaxed">
                            {PROFILE.bio}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {PROFILE.metrics.map((m, i) => (
                            <div
                              key={i}
                              className="p-3 rounded bg-[#25292E] border border-[#383D43] font-mono"
                            >
                              <div className="text-[10px] text-[#6E737A]">{m.label}</div>
                              <div className="text-sm font-bold text-[#FFB454] my-0.5">
                                {m.value}
                              </div>
                              <div className="text-[10px] text-[#A5A8AC] truncate">{m.sub}</div>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 rounded-lg bg-[#15171A] border border-[#383D43] font-mono text-xs space-y-2">
                          <span className="text-[#79C9B0] font-semibold block">FOCUS AREAS</span>
                          <div className="flex flex-wrap gap-2">
                            {PROFILE.focusAreas.map((area, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded bg-[#25292E] border border-[#383D43] text-[#F0EDE6]"
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── App View: Terminal (Embedded) ── */}
                  {activeApp === "terminal" && (
                    <div className="p-4 sm:p-6 flex-1 flex flex-col font-mono text-xs bg-[#0D0E10] text-[#F0EDE6] space-y-3">
                      <div className="flex items-center justify-between border-b border-[#383D43]/60 pb-2 text-[#6E737A]">
                        <span>ATHRVA WORKSTATION SHELL (zsh 5.9)</span>
                        <span>Type &apos;help&apos; for available commands</span>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-3 max-h-[460px]">
                        {terminalHistory.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center gap-2 text-[#FFB454]">
                              <span>athrva@vjti:~$</span>
                              <span>{item.command}</span>
                            </div>
                            <pre className="text-[#A5A8AC] whitespace-pre-wrap pl-4 border-l border-[#383D43]/60">
                              {item.output}
                            </pre>
                          </div>
                        ))}
                      </div>

                      <form
                        onSubmit={handleTerminalSubmit}
                        className="flex items-center gap-2 pt-2 border-t border-[#383D43]/60"
                      >
                        <span className="text-[#FFB454] font-bold">athrva@vjti:~$</span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          placeholder="type command (help, credentials, projects, models, status, clear)..."
                          className="flex-1 bg-transparent border-0 outline-none font-mono text-xs text-[#F0EDE6] placeholder-[#6E737A]"
                          autoFocus
                        />
                      </form>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Floating OS Workbench Bottom Dock ── */}
              <div className="relative z-20 mt-5 mx-auto w-full max-w-2xl flex items-center justify-between px-3 py-2 rounded-xl bg-[#1F2329]/95 backdrop-blur-2xl border border-[#383D43] shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
                {/* Dock App Launchers */}
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Credentials */}
                  <button
                    onClick={() => setActiveApp("credentials")}
                    className={`group flex flex-col items-center justify-center w-10 h-10 rounded-lg border transition-all ${
                      activeApp === "credentials"
                        ? "bg-[#25292E] border-[#FFB454]/40 -translate-y-0.5 shadow-[0_0_12px_rgba(255,180,84,0.3)]"
                        : "bg-[#25292E]/70 hover:bg-[#25292E] border-[#383D43]/60 hover:-translate-y-0.5"
                    }`}
                    title="Credentials [ACTIVE]"
                  >
                    <Award className="w-5 h-5 text-[#FFB454]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB454] shadow-[0_0_8px_rgba(255,180,84,0.9)] mt-0.5" />
                  </button>

                  {/* Projects */}
                  <button
                    onClick={() => setActiveApp("projects")}
                    className={`group flex flex-col items-center justify-center w-10 h-10 rounded-lg border transition-all ${
                      activeApp === "projects"
                        ? "bg-[#25292E] border-[#FFB454]/40 -translate-y-0.5 shadow-[0_0_12px_rgba(255,180,84,0.25)]"
                        : "bg-[#25292E]/70 hover:bg-[#25292E] border-[#383D43]/60 hover:-translate-y-0.5"
                    }`}
                    title="Projects"
                  >
                    <FolderCode
                      className={`w-5 h-5 ${
                        activeApp === "projects" ? "text-[#FFB454]" : "text-[#A5A8AC]"
                      }`}
                    />
                    <span
                      className={`w-1 h-1 rounded-full mt-0.5 ${
                        activeApp === "projects" ? "bg-[#FFB454]" : "bg-transparent"
                      }`}
                    />
                  </button>

                  {/* Model Registry */}
                  <button
                    onClick={() => setActiveApp("models")}
                    className={`group flex flex-col items-center justify-center w-10 h-10 rounded-lg border transition-all ${
                      activeApp === "models"
                        ? "bg-[#25292E] border-[#79C9B0]/40 -translate-y-0.5 shadow-[0_0_12px_rgba(121,201,176,0.25)]"
                        : "bg-[#25292E]/70 hover:bg-[#25292E] border-[#383D43]/60 hover:-translate-y-0.5"
                    }`}
                    title="Model Registry"
                  >
                    <Network className="w-5 h-5 text-[#79C9B0]" />
                    <span
                      className={`w-1 h-1 rounded-full mt-0.5 ${
                        activeApp === "models" ? "bg-[#79C9B0]" : "bg-transparent"
                      }`}
                    />
                  </button>

                  {/* About Me */}
                  <button
                    onClick={() => setActiveApp("about")}
                    className={`group flex flex-col items-center justify-center w-10 h-10 rounded-lg border transition-all ${
                      activeApp === "about"
                        ? "bg-[#25292E] border-[#FFB454]/40 -translate-y-0.5"
                        : "bg-[#25292E]/70 hover:bg-[#25292E] border-[#383D43]/60 hover:-translate-y-0.5"
                    }`}
                    title="About Me"
                  >
                    <User className="w-5 h-5 text-[#A5A8AC] group-hover:text-[#F0EDE6]" />
                    <span
                      className={`w-1 h-1 rounded-full mt-0.5 ${
                        activeApp === "about" ? "bg-[#FFB454]" : "bg-transparent"
                      }`}
                    />
                  </button>

                  {/* Terminal */}
                  <button
                    onClick={() => setActiveApp("terminal")}
                    className={`group flex flex-col items-center justify-center w-10 h-10 rounded-lg border transition-all ${
                      activeApp === "terminal"
                        ? "bg-[#25292E] border-[#79C9B0]/40 -translate-y-0.5"
                        : "bg-[#25292E]/70 hover:bg-[#25292E] border-[#383D43]/60 hover:-translate-y-0.5"
                    }`}
                    title="Terminal.sh"
                  >
                    <TerminalIcon className="w-5 h-5 text-[#79C9B0]" />
                    <span
                      className={`w-1 h-1 rounded-full mt-0.5 ${
                        activeApp === "terminal" ? "bg-[#79C9B0]" : "bg-transparent"
                      }`}
                    />
                  </button>

                  {/* Resume */}
                  <a
                    href={PROFILE.resumePath}
                    download="Athrva_Sarade_Resume.pdf"
                    className="group flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-[#25292E]/70 hover:bg-[#25292E] border border-[#383D43]/60 hover:-translate-y-0.5 transition-all"
                    title="Download Resume"
                  >
                    <FileText className="w-5 h-5 text-[#A5A8AC] group-hover:text-[#FFB454]" />
                    <span className="w-1 h-1 rounded-full bg-transparent mt-0.5" />
                  </a>
                </div>

                {/* Dock Divider */}
                <div className="h-6 w-px bg-[#383D43] mx-1" />

                {/* Dock Quick Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    className="p-1.5 rounded bg-[#1B1E22] hover:bg-[#25292E] text-[#6E737A] hover:text-[#F0EDE6] border border-[#383D43]/50 transition-colors"
                    title="Network Connected"
                  >
                    <Wifi className="w-4 h-4 text-[#79C9B0]" />
                  </button>
                  <button
                    className="p-1.5 rounded bg-[#1B1E22] hover:bg-[#25292E] text-[#6E737A] hover:text-[#F0EDE6] border border-[#383D43]/50 transition-colors"
                    title="Audio Normal"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="hidden sm:flex flex-col items-end pl-2 font-mono">
                    <span className="text-xs text-[#F0EDE6] font-semibold">{timeString}</span>
                    <span className="text-[9px] text-[#6E737A]">SECURE_DOCK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Truthful Footer */}
          <footer className="relative z-10 w-full bg-[#15171A]/80 border-t border-[#383D43] py-3 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-[#6E737A]">
              <div className="flex items-center gap-2">
                <span className="text-[#79C9B0] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#79C9B0]" />
                  DAEMON::DISPATCHER: STANDBY
                </span>
                <span>|</span>
                <span>DAG VERIFICATION: STRICT</span>
              </div>
              <div>
                <span>© {new Date().getFullYear()} {PROFILE.name.toUpperCase()} WORKSTATION SHELL</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
