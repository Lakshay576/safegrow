import type { Metadata } from "next";
import SignupPage from "@/Components/Pages/AuthPages/SignupPage";

export const metadata: Metadata = {
  title: "Sign Up | SafeGroww",
};

export default function Page() {
  return <SignupPage />;
}