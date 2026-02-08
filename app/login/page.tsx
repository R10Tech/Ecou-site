import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — Ecou",
  description: "Sign in to your Ecou account to manage your subscription and billing.",
};

export default function LoginPage() {
  return <LoginForm />;
}
