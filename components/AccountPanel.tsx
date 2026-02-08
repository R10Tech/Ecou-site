"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { supabase, SUPABASE_FUNCTIONS_URL } from "@/lib/supabase";

interface UsageInfo {
  used_seconds: number;
  tier: string;
  trial_limit_seconds: number;
  can_transcribe: boolean;
  trial_remaining_seconds: number;
  daily_remaining_seconds: number;
}

interface Invoice {
  id: string;
  type: "invoice" | "payment";
  date: number;
  amount: number;
  currency: string;
  status: string;
  description: string;
  pdf_url: string | null;
  hosted_url: string | null;
}

const TIER_LABELS: Record<string, string> = {
  trial: "Free Trial",
  basic: "Basic",
  pro: "Pro",
  lifetime: "Lifetime",
};

const TIER_PRICES: Record<string, string> = {
  trial: "Free",
  basic: "$0.99/mo",
  pro: "$15/mo",
  lifetime: "$100 (one-time)",
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}m ${s}s`;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AccountPanel() {
  const { user, session, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loadingUsage, setLoadingUsage] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  // Fetch usage info
  useEffect(() => {
    if (!session) return;

    const fetchUsage = async () => {
      const { data, error } = await supabase.rpc("get_usage_info");
      if (!error && data) {
        setUsage(data as UsageInfo);
      }
      setLoadingUsage(false);
    };

    fetchUsage();
  }, [session]);

  // Fetch invoices
  useEffect(() => {
    if (!session) return;

    const fetchInvoices = async () => {
      try {
        const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/get-invoices`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.invoices) {
          setInvoices(data.invoices);
        }
      } catch {
        // Silently fail — invoices are non-critical
      }
      setLoadingInvoices(false);
    };

    fetchInvoices();
  }, [session]);

  const handleManageBilling = async () => {
    if (!session) return;
    setPortalLoading(true);
    setError("");

    try {
      const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/billing-portal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          return_url: `${window.location.origin}/account`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to open billing portal");
        setPortalLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (e) {
      setError(`Error: ${e}`);
      setPortalLoading(false);
    }
  };

  const handleCheckout = async (tier: string) => {
    if (!session) return;
    setError("");

    try {
      const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/create-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ tier }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create checkout");
        return;
      }

      window.location.href = data.url;
    } catch (e) {
      setError(`Error: ${e}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (authLoading || !user) {
    return (
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <p className="text-muted text-sm">Loading...</p>
        </div>
      </section>
    );
  }

  const tier = usage?.tier || "trial";
  const isPaid = tier === "basic" || tier === "pro" || tier === "lifetime";
  const isSubscription = tier === "basic" || tier === "pro";

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-border pb-6 mb-12">
          <h1 className="font-heading text-4xl md:text-5xl">Account</h1>
          <button
            onClick={handleSignOut}
            className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] hover:text-text transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="space-y-8">
          {/* Profile */}
          <div className="border border-border p-6 md:p-8">
            <span className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] block mb-4">
              Profile
            </span>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">{user.email}</p>
                <p className="font-mono text-[10px] text-muted mt-1">
                  Member since {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="border border-border p-6 md:p-8 relative">
            {isPaid && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
            )}
            <span className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] block mb-4">
              Subscription
            </span>

            {loadingUsage ? (
              <p className="text-sm text-muted">Loading...</p>
            ) : (
              <>
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="font-heading text-2xl">{TIER_LABELS[tier] || tier}</p>
                    <p className="text-sm text-muted mt-1">{TIER_PRICES[tier] || ""}</p>
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${
                    usage?.can_transcribe ? "text-green-500" : "text-accent"
                  }`}>
                    {usage?.can_transcribe ? "Active" : "Limit reached"}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {isSubscription && (
                    <button
                      onClick={handleManageBilling}
                      disabled={portalLoading}
                      className="bg-surface border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] hover:border-text/40 transition-colors disabled:opacity-50"
                    >
                      {portalLoading ? "Opening..." : "Manage Billing"}
                    </button>
                  )}
                  {tier === "trial" && (
                    <button
                      onClick={() => handleCheckout("pro")}
                      className="bg-accent text-white px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] hover:bg-accent-hover transition-colors"
                    >
                      Upgrade to Pro
                    </button>
                  )}
                  {tier === "basic" && (
                    <button
                      onClick={() => handleCheckout("pro")}
                      className="bg-accent text-white px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] hover:bg-accent-hover transition-colors"
                    >
                      Upgrade to Pro
                    </button>
                  )}
                  {(tier === "trial" || tier === "basic") && (
                    <button
                      onClick={() => handleCheckout("lifetime")}
                      className="border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] hover:border-text/40 transition-colors"
                    >
                      Get Lifetime
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Usage */}
          <div className="border border-border p-6 md:p-8">
            <span className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] block mb-4">
              Usage
            </span>

            {loadingUsage ? (
              <p className="text-sm text-muted">Loading...</p>
            ) : usage ? (
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-[10px] text-muted uppercase tracking-wider mb-1">
                    Total Used
                  </p>
                  <p className="font-heading text-xl">{formatTime(usage.used_seconds)}</p>
                </div>

                {tier === "trial" && (
                  <div>
                    <p className="font-mono text-[10px] text-muted uppercase tracking-wider mb-1">
                      Trial Remaining
                    </p>
                    <p className="font-heading text-xl">
                      {formatTime(usage.trial_remaining_seconds)}
                    </p>
                    <div className="mt-2 h-1 bg-border">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{
                          width: `${Math.max(0, (usage.trial_remaining_seconds / usage.trial_limit_seconds) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {tier === "basic" && (
                  <div>
                    <p className="font-mono text-[10px] text-muted uppercase tracking-wider mb-1">
                      Daily Remaining
                    </p>
                    <p className="font-heading text-xl">
                      {formatTime(Math.max(0, usage.daily_remaining_seconds))}
                    </p>
                    <div className="mt-2 h-1 bg-border">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{
                          width: `${Math.max(0, (usage.daily_remaining_seconds / 1800) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {(tier === "pro" || tier === "lifetime") && (
                  <div>
                    <p className="font-mono text-[10px] text-muted uppercase tracking-wider mb-1">
                      Limit
                    </p>
                    <p className="font-heading text-xl">Unlimited</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Payment History / Invoices */}
          <div className="border border-border p-6 md:p-8">
            <span className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] block mb-4">
              Payment History
            </span>

            {loadingInvoices ? (
              <p className="text-sm text-muted">Loading...</p>
            ) : invoices.length === 0 ? (
              <p className="text-sm text-muted">No payments yet.</p>
            ) : (
              <div className="divide-y divide-border">
                {invoices.map((inv) => (
                  <div key={inv.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{inv.description}</p>
                      <p className="font-mono text-[10px] text-muted mt-0.5">
                        {formatDate(inv.date)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatCurrency(inv.amount, inv.currency)}
                        </p>
                        <p className={`font-mono text-[9px] uppercase tracking-wider ${
                          inv.status === "paid" || inv.status === "succeeded"
                            ? "text-green-500"
                            : inv.status === "open"
                            ? "text-yellow-500"
                            : "text-muted"
                        }`}>
                          {inv.status}
                        </p>
                      </div>

                      {/* Download / View links */}
                      <div className="flex gap-2">
                        {inv.pdf_url && (
                          <a
                            href={inv.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-text transition-colors"
                            title="Download PDF"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                            </svg>
                          </a>
                        )}
                        {inv.hosted_url && (
                          <a
                            href={inv.hosted_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-text transition-colors"
                            title="View invoice"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cancellation info */}
          {isSubscription && (
            <div className="border border-border p-6 md:p-8">
              <span className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] block mb-4">
                Cancel Subscription
              </span>
              <p className="text-sm text-muted leading-relaxed">
                You can cancel your subscription at any time through the Stripe billing portal.
                Your plan will remain active until the end of your current billing period.
              </p>
              <button
                onClick={handleManageBilling}
                disabled={portalLoading}
                className="mt-4 border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] text-muted hover:text-accent hover:border-accent/40 transition-colors disabled:opacity-50"
              >
                {portalLoading ? "Opening..." : "Cancel Subscription"}
              </button>
            </div>
          )}

          {error && (
            <p className="text-xs text-accent">{error}</p>
          )}
        </div>
      </div>
    </section>
  );
}
