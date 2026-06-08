import type { Metadata } from "next";
import TwoFactorPage from "@/Components/Pages/AuthPages/2FAPage";

export const metadata: Metadata = {
  title: "2 FA Setup | SafeGroww",
};

export default function Page() {
  return <TwoFactorPage />;
}