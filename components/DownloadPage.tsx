"use client";

import { useEffect, useState } from "react";
import { trackDownloadClick } from "@/lib/tracking";

type OS = "windows" | "mac" | "unknown";

function getOS(): OS {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "mac";
  return "unknown";
}

const downloads: Record<"windows" | "mac", { label: string; file: string; sub: string }> = {
  windows: {
    label: "Download for Windows",
    file: "#", // TODO: replace with actual download URL
    sub: "Windows 10 or later (64-bit)",
  },
  mac: {
    label: "Download for Mac",
    file: "#", // TODO: replace with actual download URL
    sub: "macOS 12 (Monterey) or later",
  },
};

export default function DownloadPage() {
  const [os, setOS] = useState<OS>("unknown");

  useEffect(() => {
    setOS(getOS());
  }, []);

  const primary = os === "mac" ? "mac" : "windows";
  const secondary = primary === "windows" ? "mac" : "windows";

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-border pb-6 mb-16">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl">Download</h1>
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider hidden md:block">
            v0.1.0
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-10">
          {/* Left — downloads */}
          <div className="md:col-span-7">
            {/* Primary */}
            <div className="border border-border p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
              <span className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] block mb-4">
                Detected: {primary === "windows" ? "Windows" : "macOS"}
              </span>
              <h2 className="font-heading text-2xl md:text-3xl">{downloads[primary].label}</h2>
              <p className="text-xs text-muted mt-2">{downloads[primary].sub}</p>
              <a
                href={downloads[primary].file}
                onClick={() => trackDownloadClick(primary)}
                className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-accent-hover transition-colors mt-6"
              >
                Download
                <span className="text-base leading-none">&darr;</span>
              </a>
            </div>

            {/* Secondary */}
            <div className="border border-t-0 border-border p-6 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-sm">{downloads[secondary].label}</h3>
                <p className="text-xs text-muted mt-1">{downloads[secondary].sub}</p>
              </div>
              <a
                href={downloads[secondary].file}
                onClick={() => trackDownloadClick(secondary)}
                className="border border-border text-text px-5 py-2 text-[11px] uppercase tracking-[0.1em] hover:border-text/40 transition-colors"
              >
                Download
              </a>
            </div>

            {/* Free trial note */}
            <p className="font-mono text-[10px] text-muted mt-6">
              Free trial — 15 minutes of transcription. No credit card required.
            </p>
          </div>

          {/* Right — system requirements */}
          <div className="md:col-span-5">
            <span className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] block mb-6">
              System Requirements
            </span>

            <div className="border border-border divide-y divide-border">
              <div className="p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] mb-3">Windows</h3>
                <ul className="text-xs text-muted space-y-1.5">
                  <li>Windows 10 or later (64-bit)</li>
                  <li>4 GB RAM minimum</li>
                  <li>500 MB disk space</li>
                  <li>Microphone</li>
                </ul>
              </div>
              <div className="p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] mb-3">macOS</h3>
                <ul className="text-xs text-muted space-y-1.5">
                  <li>macOS 12 (Monterey) or later</li>
                  <li>Apple Silicon or Intel</li>
                  <li>4 GB RAM minimum</li>
                  <li>500 MB disk space</li>
                  <li>Microphone</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
