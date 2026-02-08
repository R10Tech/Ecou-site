import type { Metadata } from "next";
import AdminPanel from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Admin — Ecou",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return <AdminPanel />;
}
