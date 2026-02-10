import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-10 mt-0">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="font-heading text-3xl">
              <span>E C</span>
              <br />
              <span>O U</span>
            </div>
            <p className="text-xs text-muted mt-4 max-w-[200px] leading-relaxed">
              Voice to text. Locally. Privately. On your terms.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted uppercase tracking-[0.15em]">Product</span>
              <Link href="/download" className="text-xs text-text/60 hover:text-text transition-colors">
                Download
              </Link>
              <Link href="/#pricing" className="text-xs text-text/60 hover:text-text transition-colors">
                Pricing
              </Link>
              <Link href="/#how-it-works" className="text-xs text-text/60 hover:text-text transition-colors">
                How It Works
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted uppercase tracking-[0.15em]">Legal</span>
              <Link href="/privacy" className="text-xs text-text/60 hover:text-text transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-text/60 hover:text-text transition-colors">
                Terms of Service
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="font-mono text-[10px] text-muted">
            &copy; {new Date().getFullYear()} Ecou
          </span>
          <span className="font-mono text-[10px] text-muted">
            Built with local AI
          </span>
        </div>
      </div>
    </footer>
  );
}
