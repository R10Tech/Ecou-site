import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Ecou",
  description: "Ecou privacy policy. Learn how Ecou handles your data with local-first voice transcription.",
};

export default function Privacy() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="font-heading text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="text-sm text-muted mt-2">Last updated: February 2026</p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-text/80">
          <div>
            <h2 className="font-medium text-base text-text mb-3">Our Commitment</h2>
            <p>
              Ecou is built with privacy as a core principle. Voice transcription happens entirely on
              your device using a local AI model (Whisper). Your audio is never sent to any server,
              cloud service, or third party. We cannot hear you, and we do not want to.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-base text-text mb-3">What Stays on Your Device</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Audio recordings</strong> — All microphone input is processed locally by the
                Whisper AI model running on your machine. Audio is never transmitted, stored
                remotely, or logged.
              </li>
              <li>
                <strong>Transcription text</strong> — The text generated from your speech stays in
                the app&apos;s memory during your session and is never sent to our servers.
              </li>
              <li>
                <strong>App settings</strong> — Hotkey configurations, microphone preferences, and
                window position are stored locally on your device.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-medium text-base text-text mb-3">What We Collect</h2>
            <p>
              To provide account management and usage-based billing, we collect a minimal amount of
              data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-3">
              <li>
                <strong>Email address</strong> — Used for authentication via magic link sign-in.
                Stored securely in our authentication provider (Supabase).
              </li>
              <li>
                <strong>Usage duration</strong> — We track the total seconds of transcription used
                per session to enforce trial limits and billing tiers. We do not track what you said
                — only how long you spoke.
              </li>
              <li>
                <strong>Subscription tier</strong> — Your current plan (Trial, Basic, Pro, or
                Lifetime) is stored in your account profile.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-medium text-base text-text mb-3">Third-Party Services</h2>
            <p>Ecou uses the following third-party services:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-3">
              <li>
                <strong>Supabase</strong> — For user authentication (email/magic link) and usage
                tracking. Supabase stores your email and usage data.{" "}
                <a
                  href="https://supabase.com/privacy"
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Supabase Privacy Policy
                </a>
              </li>
              <li>
                <strong>Stripe</strong> — For payment processing. When you upgrade to a paid plan,
                Stripe handles your payment information. We never see or store your credit card
                details.{" "}
                <a
                  href="https://stripe.com/privacy"
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stripe Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-medium text-base text-text mb-3">Cookies</h2>
            <p>
              The Ecou desktop application does not use cookies. This website may use essential
              cookies for basic functionality (such as remembering your preferences). We do not use
              tracking or advertising cookies.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-base text-text mb-3">Data Retention</h2>
            <p>
              Your account data (email, usage stats, subscription tier) is retained as long as you
              have an active account. If you request account deletion, all associated data will be
              permanently removed within 30 days.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-base text-text mb-3">Data Security</h2>
            <p>
              All communication between the Ecou app and our servers uses HTTPS encryption.
              Authentication tokens are securely managed and expire automatically. Your local audio
              data is never persisted to disk by the application.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-base text-text mb-3">Children&apos;s Privacy</h2>
            <p>
              Ecou is not intended for use by children under the age of 13. We do not knowingly
              collect personal information from children.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-base text-text mb-3">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify users of
              significant changes via the application or email. Continued use of Ecou after changes
              constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-base text-text mb-3">Contact</h2>
            <p>
              If you have questions about this privacy policy or your data, contact us at{" "}
              <a href="mailto:support@ecou.io" className="text-accent hover:underline">
                support@ecou.io
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
