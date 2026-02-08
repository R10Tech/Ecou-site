const steps = [
  {
    number: "01",
    title: "Press Alt+Space",
    description: "The Ecou widget appears, ready to listen.",
    placeholder: "[Screenshot: widget appears on screen]",
  },
  {
    number: "02",
    title: "Speak naturally",
    description: "Talk at your normal pace. No special commands needed.",
    placeholder: "[Waveform animation / recording indicator]",
  },
  {
    number: "03",
    title: "Watch it transcribe",
    description: "See your words appear in real-time as you speak.",
    placeholder: "[Screenshot: text appearing in the widget]",
  },
  {
    number: "04",
    title: "Press Alt+Enter",
    description: "Your transcribed text types into whatever app you're focused on.",
    placeholder: "[Screenshot: text injected into a chat / editor]",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header — editorial style */}
        <div className="flex items-baseline justify-between border-b border-border pb-6 mb-16 md:mb-24">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl">How It Works</h2>
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider hidden md:block">
            4 Steps
          </span>
        </div>

        <div className="space-y-20 md:space-y-32">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="grid md:grid-cols-12 gap-6 md:gap-10 items-start"
            >
              {/* Number column */}
              <div className={`md:col-span-1 ${i % 2 === 1 ? "md:order-3" : ""}`}>
                <span className="font-heading text-5xl md:text-6xl text-accent/40">
                  {step.number}
                </span>
              </div>

              {/* Text column */}
              <div className={`md:col-span-4 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <h3 className="font-heading text-2xl md:text-3xl">{step.title}</h3>
                <p className="text-muted text-sm mt-3 leading-relaxed">{step.description}</p>
                {i === 0 && (
                  <div className="mt-4 font-mono text-[10px] text-muted">
                    Works with any app — VS Code, Slack, Notion, Chrome, and more.
                  </div>
                )}
              </div>

              {/* Visual placeholder */}
              <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="relative">
                  <div className="border border-border bg-surface aspect-video flex items-center justify-center">
                    <span className="text-xs text-muted text-center px-4">{step.placeholder}</span>
                  </div>
                  {/* Decorative accent bar */}
                  {i % 2 === 0 && (
                    <div className="absolute -bottom-2 right-0 w-1/3 h-1 bg-accent" />
                  )}
                  {i % 2 === 1 && (
                    <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo video placeholder */}
        <div className="mt-24 md:mt-32">
          <div className="flex items-baseline justify-between mb-6">
            <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
              Full Demo
            </span>
            <span className="font-mono text-[10px] text-muted">10s loop</span>
          </div>
          <div className="border border-border bg-surface aspect-video max-w-4xl mx-auto flex items-center justify-center relative">
            <span className="text-xs text-muted text-center px-4">
              [10-second looping video: full flow from hotkey &rarr; speak &rarr; transcribe &rarr; inject]
            </span>
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-text/20 flex items-center justify-center">
                <span className="text-text/30 text-2xl ml-1">&#9654;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
