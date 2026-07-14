import type { Metadata } from "next";
import AutomationIntegrationInteractive from "@/components/automation-integration-interactive";

export const metadata: Metadata = {
  title: "Automation & Integration — Interactive (Dev)",
  description:
    "Interactive prototype: the connected-system map. Click a capability to open its case study.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AutomationIntegrationInteractive />;
}
