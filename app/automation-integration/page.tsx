import type { Metadata } from "next";
import AutomationIntegrationInteractive from "@/components/automation-integration-interactive";

export const metadata: Metadata = {
  title: "Automation & Integration",
  description:
    "One connected system. Full visibility. Smarter decisions. Explore how Rawlins connects reporting, capacity, single source of truth, handoffs and more.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AutomationIntegrationInteractive />;
}
