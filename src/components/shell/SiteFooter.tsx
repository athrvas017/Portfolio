"use client";

import React from "react";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { Github, Linkedin, Mail, ExternalLink, ShieldCheck, Play } from "lucide-react";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="relative z-10 w-full bg-[#15171A]/95 border-t border-[#383D43] py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#A5A8AC]">
        {/* Left status flags */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[#79C9B0] flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#79C9B0] shadow-[0_0_8px_rgba(121,201,176,0.6)] animate-pulse" />
            SYS:READY
          </span>
          <span className="text-[#383D43]">|</span>
          <span className="text-[#F0EDE6] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFB454]" />
            DAG VERIFICATION: STRICT
          </span>
          <span className="text-[#383D43] hidden sm:inline">|</span>
          <span className="text-[#6E737A] hidden sm:inline">
            VJTI COMPUTER ENG &apos;28
          </span>
          <span className="text-[#383D43] hidden md:inline">|</span>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("ans-replay-intro"));
              }
            }}
            className="hidden md:flex text-[#6E737A] hover:text-[#FFB454] items-center gap-1 cursor-pointer transition-colors"
            title="Replay cinematic startup intro"
          >
            <Play className="w-3 h-3 text-[#FFB454]" />
            <span>REPLAY INTRO</span>
          </button>
        </div>

        {/* Center destination links */}
        <div className="flex items-center gap-4 text-[#A5A8AC]">
          <Link href="/workspace" prefetch={true} className="hover:text-[#FFB454] transition-colors">
            Workspace
          </Link>
          <Link href="/projects" prefetch={true} className="hover:text-[#FFB454] transition-colors">
            Projects
          </Link>
          <Link href="/models" prefetch={true} className="hover:text-[#FFB454] transition-colors">
            Models
          </Link>
          <Link href="/credentials" prefetch={true} className="hover:text-[#FFB454] transition-colors">
            Credentials
          </Link>
          <Link href="/about" prefetch={true} className="hover:text-[#FFB454] transition-colors">
            About
          </Link>
          <Link href="/contact" prefetch={true} className="hover:text-[#FFB454] transition-colors">
            Contact
          </Link>
        </div>

        {/* Right copyright & social */}
        <div className="flex items-center gap-3">
          <span>&copy; {new Date().getFullYear()} {PROFILE.name.toUpperCase()}</span>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#A5A8AC] hover:text-[#FFB454] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#A5A8AC] hover:text-[#FFB454] transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
