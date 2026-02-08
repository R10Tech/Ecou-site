"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { SUPABASE_FUNCTIONS_URL } from "@/lib/supabase";

interface Analytics {
  days: number;
  unique_sessions: number;
  total_page_views: number;
  page_views: Record<string, number>;
  tier_clicks: Record<string, number>;
  download_clicks: Record<string, number>;
  avg_section_seconds: Record<string, number>;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-border p-6">
      <p className="font-mono text-[10px] text-muted uppercase tracking-[0.15em]">{label}</p>
      <p className="font-heading text-3xl mt-2">{value}</p>
    </div>
  );
}

function BarChart({ data, label }: { data: Record<string, number>; label: string }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  if (entries.length === 0) {
    return (
      <div className="border border-border p-6">
        <p className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] mb-4">{label}</p>
        <p className="text-sm text-muted">No data yet</p>
      </div>
    );
  }

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] mb-4">{label}</p>
      <div className="space-y-3">
        {entries.map(([key, val]) => (
          <div key={key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text/70">{key}</span>
              <span className="font-mono text-muted">{val}</span>
            </div>
            <div className="h-2 bg-surface">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: `${(val / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { user, session, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState(7);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!session) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${SUPABASE_FUNCTIONS_URL}/get-site-analytics?days=${days}`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Failed to load analytics");
          setData(null);
        } else {
          setData(json);
        }
      } catch {
        setError("Failed to connect");
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, [session, days]);

  if (authLoading || !user) {
    return (
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10">
          <p className="text-muted text-sm">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-border pb-6 mb-12">
          <h1 className="font-heading text-4xl md:text-5xl">Analytics</h1>
          <div className="flex gap-2">
            {[7, 14, 30].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1 transition-colors ${
                  days === d
                    ? "bg-accent text-white"
                    : "text-muted border border-border hover:border-text/40"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="border border-accent/30 bg-accent/5 p-4 mb-8">
            <p className="text-xs text-accent">{error}</p>
          </div>
        )}

        {loading ? (
          <p className="text-sm text-muted">Loading analytics...</p>
        ) : data ? (
          <div className="space-y-8">
            {/* Overview cards */}
            <div className="grid sm:grid-cols-3 gap-0 border-l border-t border-border">
              <div className="border-r border-b border-border">
                <StatCard label="Unique Visitors" value={data.unique_sessions} />
              </div>
              <div className="border-r border-b border-border">
                <StatCard label="Page Views" value={data.total_page_views} />
              </div>
              <div className="border-r border-b border-border">
                <StatCard
                  label="Total Tier Clicks"
                  value={Object.values(data.tier_clicks).reduce((a, b) => a + b, 0)}
                />
              </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <BarChart data={data.page_views} label="Page Views" />
              <BarChart data={data.tier_clicks} label="Tier Clicks" />
              <BarChart data={data.download_clicks} label="Download Clicks" />
              <BarChart
                data={Object.fromEntries(
                  Object.entries(data.avg_section_seconds).map(([k, v]) => [k, v])
                )}
                label="Avg. Section Time (seconds)"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
