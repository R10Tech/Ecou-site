const features = [
  {
    title: "Works Everywhere",
    description: "Transcribe into any app that accepts text input. Email, chat, docs, code editors — anything.",
  },
  {
    title: "Real-time",
    description: "See your words as you speak. No waiting for processing. Instant feedback.",
  },
  {
    title: "Private by Design",
    description: "Local AI model. Zero cloud calls. Zero logging. Your voice never leaves your machine.",
  },
  {
    title: "Customizable",
    description: "Set your own hotkeys. Choose your microphone. Make it fit your workflow.",
  },
];

export default function Features() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="flex items-baseline justify-between border-b border-border pb-6 mb-16">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl">Features</h2>
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider hidden md:block">
            What you get
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-0 border-t border-l border-border">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="border-b border-r border-border p-8 md:p-10 group relative overflow-hidden"
            >
              {/* Large background number */}
              <span className="absolute -right-2 -top-4 font-heading text-[8rem] leading-none text-text/[0.04] select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="font-heading text-xl md:text-2xl relative">{feature.title}</h3>
              <p className="text-muted text-sm mt-4 leading-relaxed relative max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
