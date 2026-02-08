"use client";

import { useEffect, useState } from "react";

function getOS(): "windows" | "mac" | "unknown" {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "mac";
  return "unknown";
}

export default function DownloadCTA() {
  const [os, setOS] = useState<"windows" | "mac" | "unknown">("unknown");

  useEffect(() => {
    setOS(getOS());
  }, []);

  const label =
    os === "mac" ? "Download for Mac" : os === "windows" ? "Download for Windows" : "Download Ecou";

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background ghost letters */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[50vw] leading-none text-text/[0.03] select-none pointer-events-none whitespace-nowrap">
        EC
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center relative">
        <span className="font-mono text-[10px] text-muted uppercase tracking-[0.2em] block mb-6">
          Get Started
        </span>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl">Ready?</h2>
        <p className="text-muted mt-4 text-sm max-w-md mx-auto">
          Free trial. No credit card. 15 minutes of local voice-to-text.
        </p>

        <div className="mt-10">
          <a
            href="/download"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-accent-hover transition-colors"
          >
            {label}
            <span className="text-base leading-none">&rarr;</span>
          </a>
        </div>

        <p className="font-mono text-[10px] text-muted mt-6">
          Available for Windows &amp; macOS
        </p>
      </div>
    </section>
  );
}
