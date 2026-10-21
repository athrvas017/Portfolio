"use client";

import React, { useState } from "react";
import { PROFILE } from "@/data/profile";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const handleMailto = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject || "AI Systems Inquiry"
    )}&body=${encodeURIComponent(
      `From: ${senderName} (${senderEmail})\n\n${message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="bg-[#101113] text-[#F0EDE6] min-h-screen relative overflow-x-hidden">
      {/* Blueprint grid */}
      <div className="fixed inset-0 pointer-events-none bg-blueprint-grid opacity-30 z-0" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFB454]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header */}
      <SiteHeader />

      <main className="relative z-10 w-full pt-20 pb-16">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Banner */}
          <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FFB454] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#79C9B0] animate-pulse" />
              <span>07 · CONTACT_DISPATCH</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#F0EDE6] tracking-tight">
              Get in Touch
            </h1>
            <p className="text-xs sm:text-sm text-[#A5A8AC] max-w-xl mt-2 leading-relaxed">
              Open for multi-agent systems research collaborations, systems architecture discussions, machine learning
              engineering roles, and open-source contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Direct Verification Contacts (5 Cols) */}
            <div className="md:col-span-5 space-y-4 font-mono text-xs">
              <div className="p-5 rounded-xl bg-[#1B1E22] border border-[#383D43] space-y-4">
                <span className="text-[#FFB454] uppercase font-semibold block">
                  Verified Channels
                </span>

                <div className="space-y-3">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="p-3 rounded bg-[#15171A] border border-[#383D43]/60 hover:border-[#FFB454]/50 transition-colors flex items-center gap-3 group"
                  >
                    <Mail className="w-4 h-4 text-[#FFB454] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-[#6E737A] block">PRIMARY EMAIL</span>
                      <span className="text-[#F0EDE6] group-hover:text-[#FFB454] truncate block">
                        {PROFILE.email}
                      </span>
                    </div>
                  </a>

                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded bg-[#15171A] border border-[#383D43]/60 hover:border-[#79C9B0]/50 transition-colors flex items-center gap-3 group"
                  >
                    <Github className="w-4 h-4 text-[#79C9B0] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-[#6E737A] block">GITHUB PROFILE</span>
                      <span className="text-[#F0EDE6] group-hover:text-[#79C9B0] truncate block">
                        github.com/athrvas017
                      </span>
                    </div>
                  </a>

                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded bg-[#15171A] border border-[#383D43]/60 hover:border-[#85C2FF]/50 transition-colors flex items-center gap-3 group"
                  >
                    <Linkedin className="w-4 h-4 text-[#85C2FF] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-[#6E737A] block">LINKEDIN</span>
                      <span className="text-[#F0EDE6] group-hover:text-[#85C2FF] truncate block">
                        linkedin.com/in/athrva-sarade
                      </span>
                    </div>
                  </a>

                  <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#6E737A] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#6E737A] block">LOCATION</span>
                      <span className="text-[#F0EDE6]">{PROFILE.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Notice */}
              <div className="p-4 rounded-xl bg-[#15171A] border border-[#383D43]/60 space-y-1">
                <span className="text-[#79C9B0] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Available for Collaboration
                </span>
                <p className="text-[#6E737A] text-[11px] leading-relaxed">
                  Interested in systems engineering, LLM infrastructure, and graph algorithms.
                </p>
              </div>
            </div>

            {/* Email Dispatch Form (7 Cols) */}
            <div className="md:col-span-7 rounded-xl bg-[#1B1E22] border border-[#383D43] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#383D43] pb-3">
                <span className="font-mono text-xs text-[#F0EDE6] font-semibold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#FFB454]" />
                  Direct Email Dispatch
                </span>
                <span className="font-mono text-[10px] text-[#6E737A]">
                  Triggers native mail client
                </span>
              </div>

              <form onSubmit={handleMailto} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-[#6E737A] uppercase block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full p-2.5 rounded bg-[#15171A] border border-[#383D43] text-[#F0EDE6] placeholder-[#6E737A] outline-none focus:border-[#FFB454]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#6E737A] uppercase block mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full p-2.5 rounded bg-[#15171A] border border-[#383D43] text-[#F0EDE6] placeholder-[#6E737A] outline-none focus:border-[#FFB454]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#6E737A] uppercase block mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="AI Systems / Architecture / Project Collaboration"
                    className="w-full p-2.5 rounded bg-[#15171A] border border-[#383D43] text-[#F0EDE6] placeholder-[#6E737A] outline-none focus:border-[#FFB454]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#6E737A] uppercase block mb-1">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    className="w-full p-2.5 rounded bg-[#15171A] border border-[#383D43] text-[#F0EDE6] placeholder-[#6E737A] outline-none focus:border-[#FFB454] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded bg-[#FFB454] hover:bg-[#FFC477] text-[#101113] font-bold text-xs transition-all shadow-[0_0_15px_rgba(255,180,84,0.3)] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Compose Email via {PROFILE.email}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
