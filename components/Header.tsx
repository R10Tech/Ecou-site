"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useTheme } from "@/lib/ThemeContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <Link href="/" className="font-heading text-sm tracking-[0.3em] uppercase text-text">
          Ecou
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works" className="text-[11px] uppercase tracking-[0.15em] text-muted hover:text-text transition-colors">
            How It Works
          </Link>
          <Link href="/#pricing" className="text-[11px] uppercase tracking-[0.15em] text-muted hover:text-text transition-colors">
            Pricing
          </Link>
          <Link href="/download" className="text-[11px] uppercase tracking-[0.15em] text-muted hover:text-text transition-colors">
            Download
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-muted hover:text-text transition-colors p-1"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Admin link */}
          {isAdmin && (
            <Link href="/admin" className="text-[11px] uppercase tracking-[0.15em] text-muted hover:text-text transition-colors">
              Admin
            </Link>
          )}

          {/* Auth link */}
          {user ? (
            <Link
              href="/account"
              className="text-[11px] uppercase tracking-[0.15em] bg-accent text-white px-5 py-2 hover:bg-accent-hover transition-colors"
            >
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-[11px] uppercase tracking-[0.15em] bg-accent text-white px-5 py-2 hover:bg-accent-hover transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path d="M3 6h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-bg border-t border-border px-6 py-6 flex flex-col gap-5">
          <Link href="/#how-it-works" className="text-[11px] uppercase tracking-[0.15em] text-muted" onClick={() => setMenuOpen(false)}>
            How It Works
          </Link>
          <Link href="/#pricing" className="text-[11px] uppercase tracking-[0.15em] text-muted" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/download" className="text-[11px] uppercase tracking-[0.15em] text-muted" onClick={() => setMenuOpen(false)}>
            Download
          </Link>
          <button
            onClick={() => { toggleTheme(); setMenuOpen(false); }}
            className="text-[11px] uppercase tracking-[0.15em] text-muted text-left"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          {isAdmin && (
            <Link href="/admin" className="text-[11px] uppercase tracking-[0.15em] text-muted" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          )}
          {user ? (
            <Link
              href="/account"
              className="text-[11px] uppercase tracking-[0.15em] bg-accent text-white px-5 py-2.5 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-[11px] uppercase tracking-[0.15em] bg-accent text-white px-5 py-2.5 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
