"use client";

import { trackTierClick } from "@/lib/tracking";

const plans = [
  {
    name: "Trial",
    price: "Free",
    period: "",
    limit: "15 min total",
    features: ["Local transcription", "All apps supported", "Custom hotkeys"],
    cta: "Start Trial",
    featured: false,
  },
  {
    name: "Basic",
    price: "$0.99",
    period: "/mo",
    limit: "30 min / day",
    features: ["Everything in Trial", "Daily limit resets", "Email support"],
    cta: "Get Basic",
    featured: false,
  },
  {
    name: "Pro",
    price: "$15",
    period: "/mo",
    limit: "Unlimited",
    features: ["Everything in Basic", "Unlimited transcription", "Priority support"],
    cta: "Get Pro",
    featured: true,
  },
  {
    name: "Lifetime",
    price: "$100",
    period: " once",
    limit: "Unlimited forever",
    features: ["Everything in Pro", "One-time payment", "All future updates"],
    cta: "Get Lifetime",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="flex items-baseline justify-between border-b border-border pb-6 mb-16">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl">Pricing</h2>
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider hidden md:block">
            Simple &amp; honest
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-border">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border-r border-b border-t border-border p-6 md:p-8 flex flex-col relative ${
                plan.featured ? "bg-text text-bg" : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
              )}

              <div className="flex items-baseline justify-between">
                <h3 className={`font-mono text-[11px] uppercase tracking-[0.15em] ${
                  plan.featured ? "text-bg/50" : "text-muted"
                }`}>
                  {plan.name}
                </h3>
                {plan.featured && (
                  <span className="font-mono text-[9px] text-accent uppercase tracking-wider">
                    Popular
                  </span>
                )}
              </div>

              <div className="mt-6">
                <span className="font-heading text-4xl md:text-5xl">{plan.price}</span>
                <span className={`text-sm ${plan.featured ? "text-bg/40" : "text-muted"}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`text-xs mt-2 ${plan.featured ? "text-bg/40" : "text-muted"}`}>
                {plan.limit}
              </p>

              <ul className="mt-8 space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className={`text-xs flex items-start gap-2 ${
                    plan.featured ? "text-bg/60" : "text-muted"
                  }`}>
                    <span className="text-accent mt-px">&mdash;</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/download"
                onClick={() => trackTierClick(plan.name.toLowerCase())}
                className={`mt-8 block text-center text-[11px] uppercase tracking-[0.1em] py-3 transition-colors ${
                  plan.featured
                    ? "bg-bg text-text hover:bg-accent hover:text-white"
                    : "border border-border text-text hover:border-text/40"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
