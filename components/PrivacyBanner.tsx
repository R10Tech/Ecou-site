export default function PrivacyBanner() {
  return (
    <section className="bg-surface py-20 md:py-28 relative overflow-hidden border-y border-border">
      {/* Large ghost letter */}
      <div className="absolute -right-10 -top-10 font-heading text-[30vw] leading-none text-text/[0.03] select-none pointer-events-none">
        E
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] text-muted uppercase tracking-[0.2em] block mb-8">
            Privacy
          </span>
          <p className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
            Everything happens on your device.
          </p>
          <p className="text-base md:text-lg text-text/40 mt-6 leading-relaxed">
            No cloud. No servers. No data leaves your computer.
            <br />
            Powered by Whisper AI running locally.
          </p>

          <a
            href="/privacy"
            className="inline-block mt-8 text-[11px] uppercase tracking-[0.15em] text-muted border-b border-border pb-1 hover:text-text hover:border-text/40 transition-colors"
          >
            Read our privacy policy &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
