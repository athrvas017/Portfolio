"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/data/profile";
import { FileText, User, Menu, X, Mail, Link as LinkIcon, Play } from "lucide-react";

export const SiteHeader: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState("14:28:09");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(" ")[0] || "14:28:09");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: "01 · Neural Landing", href: "/" },
    { label: "02 · Workspace", href: "/workspace" },
    { label: "03 · Projects Explorer", href: "/projects" },
    { label: "04 · Model Registry", href: "/models" },
    { label: "05 · Credentials", href: "/credentials" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#101113]/90 backdrop-blur-xl border-b border-[#383D43]">
      <div className="h-16 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Account Symbol + Name */}
        <div className="flex items-center gap-3">
          <Link href="/" prefetch={true} className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-[#25292E] border border-[#FFB454]/40 flex items-center justify-center text-[#FFB454] group-hover:border-[#FFB454] transition-colors shadow-[0_0_10px_rgba(255,180,84,0.15)]">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono text-xs sm:text-sm tracking-wider text-[#F0EDE6] font-semibold group-hover:text-[#FFB454] transition-colors uppercase">
              {PROFILE.name}
            </span>
            <span className="font-mono text-xs text-[#6E737A] hidden sm:inline">·</span>
            <span className="font-mono text-[11px] text-[#FFB454] tracking-wider uppercase hidden md:inline">
              AI &amp; SYSTEMS ENGINEER
            </span>
          </Link>
        </div>

        {/* Center navigation pills (desktop) */}
        <nav className="hidden xl:flex items-center gap-1 px-1.5 py-1 rounded-lg bg-[#15171A] border border-[#383D43]">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                  isActive
                    ? "bg-[#25292E] text-[#FFB454] border border-[#FFB454]/40 shadow-[0_0_12px_rgba(255,180,84,0.12)] font-semibold"
                    : "text-[#A5A8AC] hover:text-[#F0EDE6] hover:bg-[#22262C]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right metadata and action buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-[#6E737A]">UTC</span>
              <span className="font-mono text-xs text-[#F0EDE6] font-medium tracking-tight">
                {timeString}
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#6E737A]">LOCAL · SYNCED</span>
          </div>

          <div className="h-6 w-px bg-[#383D43] hidden lg:block" />

          {/* Resume link */}
          <a
            href={PROFILE.resumePath}
            download="Athrva_Sarade_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded bg-[#25292E] border border-[#FFB454]/40 text-[#FFB454] hover:bg-[#1F2329] hover:border-[#FFB454] shadow-[0_0_12px_rgba(255,180,84,0.15)] transition-all font-mono text-xs font-medium"
            title="Download verified resume"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume.pdf</span>
          </a>

          {/* Replay Intro Sequence */}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("ans-replay-intro"));
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1B1E22] border border-[#383D43] text-[#A5A8AC] hover:text-[#FFB454] hover:border-[#FFB454]/40 hover:bg-[#25292E] transition-all font-mono text-xs cursor-pointer"
            title="Replay cinematic startup sequence"
            aria-label="Replay intro video"
          >
            <Play className="w-3 h-3 text-[#FFB454]" />
            <span className="hidden xl:inline">Intro</span>
          </button>

          {/* Contact href symbol replacing github symbol */}
          <Link
            href="/contact"
            prefetch={true}
            aria-label="Contact Athrva Sarade"
            className="p-1.5 text-[#A5A8AC] hover:text-[#FFB454] transition-colors flex items-center justify-center rounded hover:bg-[#1F2329]"
            title="Contact Athrva Sarade"
          >
            <Mail className="w-4 h-4 text-[#FFB454]" />
          </Link>

          {/* Profile link */}
          <Link
            href="/about"
            prefetch={true}
            aria-label="About Athrva Sarade"
            className="w-8 h-8 rounded bg-[#FFB454] flex items-center justify-center text-[#101113] font-semibold hover:bg-[#FFC477] transition-colors"
            title="About Athrva Sarade"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded bg-[#1B1E22] border border-[#383D43] text-[#F0EDE6] hover:text-[#FFB454]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#383D43] bg-[#101113]/98 px-4 py-4 space-y-2 backdrop-blur-2xl">
          <div className="font-mono text-[10px] text-[#6E737A] tracking-wider uppercase px-2 mb-1">
            Navigation Modules
          </div>
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded font-mono text-xs transition-all ${
                  isActive
                    ? "bg-[#25292E] text-[#FFB454] border border-[#FFB454]/40 font-semibold"
                    : "text-[#A5A8AC] hover:text-[#F0EDE6] hover:bg-[#22262C]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#383D43] flex items-center justify-between text-xs font-mono px-2 text-[#A5A8AC]">
            <Link
              href="/about"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FFB454]"
            >
              06 · About
            </Link>
            <Link
              href="/contact"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FFB454]"
            >
              07 · Contact
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("ans-replay-intro"));
                }
              }}
              className="hover:text-[#FFB454] flex items-center gap-1 cursor-pointer"
            >
              <Play className="w-3 h-3 text-[#FFB454]" />
              Intro
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
