"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const INTRO_STORAGE_KEY = "ans_intro_seen";
const FADE_DURATION_MS = 600; // 500-700ms requirement
const MAX_SAFETY_TIMEOUT_MS = 15000; // Safety watchdog to prevent getting trapped

export const AnsIntroLoader: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "playing" | "fading">("idle");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear pending timers safely
  const clearTimers = useCallback(() => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
  }, []);

  // Complete and fade out
  const handleFinish = useCallback(
    (instant: boolean = false) => {
      clearTimers();

      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      } catch {
        // Handle private browsing or quota restrictions gracefully
      }

      // Restore body scrolling
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }

      if (instant) {
        setStatus("idle");
        return;
      }

      // Begin smooth fade-out over 600ms
      setStatus("fading");

      fadeTimeoutRef.current = setTimeout(() => {
        setStatus("idle");
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }, FADE_DURATION_MS);
    },
    [clearTimers]
  );

  // Start playback sequence
  const startIntro = useCallback(() => {
    clearTimers();
    setStatus("playing");

    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    // Safety watchdog: ensure user is never trapped even if video stalls indefinitely
    safetyTimeoutRef.current = setTimeout(() => {
      handleFinish(false);
    }, MAX_SAFETY_TIMEOUT_MS);
  }, [clearTimers, handleFinish]);

  // Initial check on mount
  useEffect(() => {
    // 1. Check reduced motion preference
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        try {
          sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
        } catch {
          // ignore
        }
        return;
      }

      // 2. Check session storage: play once per tab session
      try {
        const hasSeenIntro = sessionStorage.getItem(INTRO_STORAGE_KEY);
        if (hasSeenIntro) {
          return;
        }
      } catch {
        // ignore
      }

      // 3. Start intro sequence
      startIntro();
    }

    // 4. Custom event listener for replaying the intro at any time
    const handleReplayEvent = () => {
      startIntro();
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Fallback if autoplay is restricted
        });
      }
    };

    window.addEventListener("ans-replay-intro", handleReplayEvent);

    return () => {
      clearTimers();
      window.removeEventListener("ans-replay-intro", handleReplayEvent);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [clearTimers, startIntro]);

  // Handle keyboard shortcut (ESC to skip)
  useEffect(() => {
    if (status !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        handleFinish(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, handleFinish]);

  // Programmatically trigger play when video element is ready
  useEffect(() => {
    if (status === "playing" && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay policy or load failure: dismiss gracefully rather than trapping user
          console.warn("ANS Intro autoplay prevented or failed:", err);
          handleFinish(false);
        });
      }
    }
  }, [status, handleFinish]);

  // If idle, unmount completely from DOM
  if (status === "idle") {
    return null;
  }

  const isFading = status === "fading";

  return (
    <aside
      aria-label="ANS Startup Intro"
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[99999] w-full h-full bg-[#101113] overflow-hidden select-none flex items-center justify-center transition-opacity duration-[600ms] ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      style={{
        width: "100%",
        height: "100%",
        maxHeight: "100dvh",
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src="/videos/ans-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onEnded={() => handleFinish(false)}
        onError={(e) => {
          console.warn("ANS intro video load error:", e);
          handleFinish(true); // Exit instantly on video error
        }}
      />

      {/* Top subtle branding watermark */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 flex items-center gap-2 pointer-events-none opacity-60">
        <span className="w-2 h-2 rounded-full bg-[#FFB454] animate-ping" />
        <span className="font-mono text-[11px] tracking-widest text-[#F0EDE6] uppercase">
          AI Engineer OS · Boot Sequence
        </span>
      </div>

      {/* Discreet Skip Intro button */}
      <button
        type="button"
        onClick={() => handleFinish(false)}
        className="group absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#101113]/70 hover:bg-[#1B1E22]/90 border border-[#383D43]/70 hover:border-[#FFB454]/80 text-[#F0EDE6]/80 hover:text-[#FFB454] backdrop-blur-md transition-all duration-300 font-mono text-xs shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#FFB454]/50"
        aria-label="Skip intro sequence"
      >
        <span className="tracking-wider uppercase font-medium">Skip Intro</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#25292E] border border-[#383D43] text-[#A5A8AC] group-hover:text-[#FFB454] group-hover:border-[#FFB454]/40 transition-colors">
          ESC
        </span>
      </button>
    </aside>
  );
};
