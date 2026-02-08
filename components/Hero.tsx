"use client";

import { useEffect, useState } from "react";

function getOS(): "windows" | "mac" | "unknown" {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "mac";
  return "unknown";
}

export default function Hero() {
  const [os, setOS] = useState<"windows" | "mac" | "unknown">("unknown");

  useEffect(() => {
    setOS(getOS());
  }, []);

  const downloadLabel =
    os === "mac" ? "Download for Mac" : os === "windows" ? "Download for Windows" : "Download";

  return (
    <section className="relative min-h-screen overflow-hidden pt-14">
      {/* Background grid of E C O U letters */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.04]">
        <div className="font-heading text-[40vw] leading-[0.8] tracking-tighter text-text">
          <div className="flex">
            <span>E</span><span>C</span>
          </div>
          <div className="flex">
            <span>O</span><span>U</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        {/* Top section with vertical text + number */}
        <div className="flex justify-between items-start pt-16 md:pt-20">
          <span className="font-mono text-[11px] text-muted tracking-wider">001</span>
          <span className="vertical-text font-mono text-[10px] text-muted tracking-[0.2em] uppercase">
            Voice to text — 2026
          </span>
        </div>

        {/* Main hero grid */}
        <div className="grid md:grid-cols-12 gap-6 mt-8 md:mt-12">
          {/* Left: Giant E C / O U */}
          <div className="md:col-span-5 relative">
            <div className="font-heading leading-[0.85] tracking-[-0.02em]">
              <div className="flex gap-3 md:gap-4">
                <span className="text-[clamp(6rem,15vw,12rem)]">E</span>
                <span className="text-[clamp(6rem,15vw,12rem)]">C</span>
              </div>
              <div className="flex gap-3 md:gap-4">
                <span className="text-[clamp(6rem,15vw,12rem)]">O</span>
                <span className="text-[clamp(6rem,15vw,12rem)]">U</span>
              </div>
            </div>

            {/* Accent block cutting across */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-16 md:w-20 h-32 md:h-40 bg-accent z-10" />
          </div>

          {/* Right: Screenshot placeholder + info */}
          <div className="md:col-span-7 flex flex-col justify-between">
            {/* Screenshot */}
            <div className="relative">
              <div className="border border-border bg-surface aspect-[16/10] flex items-center justify-center">
                <span className="text-xs text-muted text-center px-4">
                  [Screenshot: Ecou widget floating over VS Code / Notion / Slack]
                </span>
              </div>
              {/* Overlapping accent strip */}
              <div className="absolute -bottom-3 -left-3 w-full h-3 bg-accent/20" />
            </div>

            {/* Tagline + CTA below screenshot */}
            <div className="mt-10 md:mt-12">
              <p className="text-lg md:text-xl font-light text-text/70 max-w-md">
                Voice to text. Instantly. Anywhere.
              </p>

              <div className="mt-4 font-mono text-[11px] text-muted leading-relaxed">
                <p>
                  Press{" "}
                  <kbd className="border border-border bg-surface px-1.5 py-0.5 text-text text-[10px]">
                    Alt+Space
                  </kbd>{" "}
                  &mdash; Speak &mdash;{" "}
                  <kbd className="border border-border bg-surface px-1.5 py-0.5 text-text text-[10px]">
                    Alt+Enter
                  </kbd>
                </p>
                <p className="mt-1">Your words appear in any app.</p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/download"
                  className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-accent-hover transition-colors"
                >
                  {downloadLabel}
                  <span className="text-base leading-none">&rarr;</span>
                </a>
                <a
                  href="#how-it-works"
                  className="text-[11px] uppercase tracking-[0.15em] text-muted hover:text-text transition-colors"
                >
                  See it work &darr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom editorial details */}
        <div className="flex justify-between items-end mt-16 md:mt-20 pb-10 border-b border-border">
          <div className="font-mono text-[10px] text-muted uppercase tracking-wider">
            Local AI &mdash; No Cloud &mdash; Private
          </div>
          <div className="font-mono text-[10px] text-muted">
            Windows &amp; macOS
          </div>
        </div>
      </div>
    </section>
  );
}
