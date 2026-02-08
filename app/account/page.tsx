import type { Metadata } from "next";
import AccountPanel from "@/components/AccountPanel";

export const metadata: Metadata = {
  title: "Account — Ecou",
  description: "Manage your Ecou subscription, billing, and account settings.",
};

export default function AccountPage() {
  return <AccountPanel />;
}
