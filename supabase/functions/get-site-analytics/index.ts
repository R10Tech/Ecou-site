import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ADMIN_EMAILS = (Deno.env.get("ADMIN_EMAILS") || "").split(",").map((e) => e.trim());

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify user is admin
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user || !ADMIN_EMAILS.includes(user.email || "")) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use service role to bypass RLS
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get("days") || "7");
    const since = new Date(Date.now() - days * 86400000).toISOString();

    // Page views by page
    const { data: pageViews } = await admin
      .from("site_events")
      .select("page")
      .eq("event", "page_view")
      .gte("created_at", since);

    // Tier clicks
    const { data: tierClicks } = await admin
      .from("site_events")
      .select("meta")
      .eq("event", "tier_click")
      .gte("created_at", since);

    // Download clicks
    const { data: downloadClicks } = await admin
      .from("site_events")
      .select("meta")
      .eq("event", "download_click")
      .gte("created_at", since);

    // Section times
    const { data: sectionTimes } = await admin
      .from("site_events")
      .select("meta")
      .eq("event", "section_time")
      .gte("created_at", since);

    // Unique sessions
    const { data: sessions } = await admin
      .from("site_events")
      .select("session_id")
      .gte("created_at", since);

    // Aggregate page views
    const pvCounts: Record<string, number> = {};
    (pageViews || []).forEach((r) => {
      pvCounts[r.page] = (pvCounts[r.page] || 0) + 1;
    });

    // Aggregate tier clicks
    const tcCounts: Record<string, number> = {};
    (tierClicks || []).forEach((r) => {
      const tier = (r.meta as { tier?: string })?.tier || "unknown";
      tcCounts[tier] = (tcCounts[tier] || 0) + 1;
    });

    // Aggregate download clicks
    const dlCounts: Record<string, number> = {};
    (downloadClicks || []).forEach((r) => {
      const os = (r.meta as { os?: string })?.os || "unknown";
      dlCounts[os] = (dlCounts[os] || 0) + 1;
    });

    // Aggregate section times (average seconds per section)
    const stTotals: Record<string, { sum: number; count: number }> = {};
    (sectionTimes || []).forEach((r) => {
      const m = r.meta as { section?: string; seconds?: number };
      if (!m.section) return;
      if (!stTotals[m.section]) stTotals[m.section] = { sum: 0, count: 0 };
      stTotals[m.section].sum += m.seconds || 0;
      stTotals[m.section].count += 1;
    });
    const stAvg: Record<string, number> = {};
    for (const [k, v] of Object.entries(stTotals)) {
      stAvg[k] = Math.round(v.sum / v.count);
    }

    // Unique sessions count
    const uniqueSessions = new Set((sessions || []).map((r) => r.session_id)).size;

    return new Response(
      JSON.stringify({
        days,
        unique_sessions: uniqueSessions,
        total_page_views: pageViews?.length || 0,
        page_views: pvCounts,
        tier_clicks: tcCounts,
        download_clicks: dlCounts,
        avg_section_seconds: stAvg,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Analytics error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
