import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PrivacyBanner from "@/components/PrivacyBanner";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import DownloadCTA from "@/components/DownloadCTA";
import TrackSection from "@/components/TrackSection";

export default function Home() {
  return (
    <>
      <TrackSection name="hero"><Hero /></TrackSection>
      <TrackSection name="how-it-works"><HowItWorks /></TrackSection>
      <TrackSection name="privacy-banner"><PrivacyBanner /></TrackSection>
      <TrackSection name="features"><Features /></TrackSection>
      <TrackSection name="pricing"><Pricing /></TrackSection>
      <TrackSection name="download-cta"><DownloadCTA /></TrackSection>
    </>
  );
}
