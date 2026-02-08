"use client";

import { supabase } from "./supabase";

let sessionId: string | null = null;

function getSessionId(): string {
  if (sessionId) return sessionId;
  const stored = sessionStorage.getItem("ecou-sid");
  if (stored) {
    sessionId = stored;
    return stored;
  }
  const id = crypto.randomUUID();
  sessionStorage.setItem("ecou-sid", id);
  sessionId = id;
  return id;
}

export function trackEvent(
  event: string,
  meta?: Record<string, unknown>
) {
  const page = window.location.pathname;
  supabase
    .from("site_events")
    .insert({ event, page, meta: meta ?? {}, session_id: getSessionId() })
    .then(); // fire-and-forget
}

export function trackPageView() {
  trackEvent("page_view");
}

export function trackTierClick(tier: string) {
  trackEvent("tier_click", { tier });
}

export function trackDownloadClick(os: string) {
  trackEvent("download_click", { os });
}

export function trackSectionTime(section: string, seconds: number) {
  if (seconds < 2) return; // ignore trivial visits
  trackEvent("section_time", { section, seconds: Math.round(seconds) });
}
