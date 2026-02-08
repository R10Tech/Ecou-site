"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export default function LoginForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  // Already logged in — redirect
  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user, router]);

  if (user) return null;

  const handleGoogleSignIn = async () => {
    // TODO: configure Google OAuth in Supabase dashboard first
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/account`,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setError("");
        // Supabase may require email confirmation depending on settings
        router.push("/account");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/account");
      }
    }

    setLoading(false);
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-[480px] mx-auto px-6">
        <div className="flex items-baseline justify-between border-b border-border pb-6 mb-12">
          <h1 className="font-heading text-4xl md:text-5xl">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h1>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border border-border py-3 text-sm hover:border-text/40 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Email + Password */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] block mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-surface border border-border px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] block mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder={mode === "signup" ? "Min 6 characters" : "Your password"}
              className="w-full bg-surface border border-border px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-accent">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-3 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        {/* Toggle sign in / sign up */}
        <div className="mt-6 text-center">
          {mode === "signin" ? (
            <p className="text-xs text-muted">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => { setMode("signup"); setError(""); }}
                className="text-text hover:text-accent transition-colors"
              >
                Create one
              </button>
            </p>
          ) : (
            <p className="text-xs text-muted">
              Already have an account?{" "}
              <button
                onClick={() => { setMode("signin"); setError(""); }}
                className="text-text hover:text-accent transition-colors"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        <p className="text-[10px] text-muted text-center mt-8">
          By signing in you agree to our{" "}
          <Link href="/terms" className="text-text hover:text-accent transition-colors">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-text hover:text-accent transition-colors">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
