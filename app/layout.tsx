import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import TrackPageView from "@/components/TrackPageView";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Ecou — Voice to Text. Instantly. Anywhere.",
  description:
    "Press a hotkey, speak, and Ecou transcribes your voice into any app. Powered by local AI. No cloud. No data leaves your device.",
  openGraph: {
    title: "Ecou — Voice to Text. Instantly. Anywhere.",
    description:
      "Press a hotkey, speak, and Ecou transcribes your voice into any app. Powered by local AI. No cloud. No data leaves your device.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
        <TrackPageView />
      </body>
    </html>
  );
}
