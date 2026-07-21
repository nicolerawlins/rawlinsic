import type { Metadata } from "next";
import AutomationPage from "@/components/automation-page";

export const metadata: Metadata = {
  title: "Data Governance, Automation & AI",
  description:
    "Rawlins designs and implements digital solutions that help people work smarter. We reduce manual effort, streamline workflows, and establish effective data governance practices.",
};

export default function Page() {
  return <AutomationPage />;
}
