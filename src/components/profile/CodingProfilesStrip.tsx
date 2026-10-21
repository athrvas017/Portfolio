"use client";

import React from "react";
import { Code2, ExternalLink, Trophy } from "lucide-react";

export interface CodingProfile {
  name: string;
  url: string;
  badgeUrl: string;
  handle: string;
  platformColor: string;
}

export const CODING_PROFILES: CodingProfile[] = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/Athrvas017/",
    badgeUrl: "https://img.shields.io/badge/LeetCode-Athrvas017-orange?style=for-the-badge&logo=leetcode",
    handle: "Athrvas017",
    platformColor: "#FFA116",
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/profile/athrvas017",
    badgeUrl: "https://img.shields.io/badge/Codeforces-athrvas017-blue?style=for-the-badge&logo=codeforces",
    handle: "athrvas017",
    platformColor: "#1F8ACB",
  },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/user/athrvadmgv/",
    badgeUrl: "https://img.shields.io/badge/GFG-athrvadmgv-darkgreen?style=for-the-badge&logo=geeksforgeeks",
    handle: "athrvadmgv",
    platformColor: "#2F8D46",
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/athrvas017",
    badgeUrl: "https://img.shields.io/badge/HackerRank-athrvas017-brightgreen?style=for-the-badge&logo=hackerrank",
    handle: "athrvas017",
    platformColor: "#00EA64",
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/users/kettle_gale_65",
    badgeUrl: "https://img.shields.io/badge/CodeChef-kettle_gale_65-brown?style=for-the-badge&logo=codechef",
    handle: "kettle_gale_65",
    platformColor: "#5B4638",
  },
];

export const CodingProfilesStrip: React.FC<{ title?: string }> = ({
  title = "COMPETITIVE PROGRAMMING & PROBLEM SOLVING",
}) => {
  return (
    <div className="w-full rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-5 sm:p-6 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#383D43] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#FFB454]" />
          <span className="font-mono text-xs font-semibold text-[#F0EDE6] tracking-wider uppercase">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#79C9B0]">
          <Trophy className="w-3.5 h-3.5 text-[#FFB454]" />
          <span>ACTIVE BENCHMARKS &amp; RATINGS</span>
        </div>
      </div>

      {/* Badges Flex Grid */}
      <div className="flex flex-wrap items-center gap-3">
        {CODING_PROFILES.map((profile) => (
          <a
            key={profile.name}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 hover:opacity-95 transition-all shadow-sm rounded overflow-hidden"
            title={`${profile.name} Profile: ${profile.handle}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.badgeUrl}
              alt={`${profile.name} - ${profile.handle}`}
              className="h-8 sm:h-9 object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
};
