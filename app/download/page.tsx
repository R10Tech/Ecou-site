import type { Metadata } from "next";
import DownloadPage from "@/components/DownloadPage";

export const metadata: Metadata = {
  title: "Download Ecou — Voice to Text for Windows & macOS",
  description:
    "Download Ecou for Windows or macOS. Free trial with 15 minutes of local voice-to-text transcription.",
};

export default function Download() {
  return <DownloadPage />;
}
