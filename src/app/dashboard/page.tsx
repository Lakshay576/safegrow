import DashboardSafegrow from "@/Components/Pages/Dashboard/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return <DashboardSafegrow />;
}