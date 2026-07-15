import type { Metadata } from "next";
import AutomationIntegrationInteractive from "@/components/automation-integration-interactive";

/* Unlisted: reachable at /automation-ai-examples but deliberately kept out of
   the nav and out of sitemap.ts, and noindex so search engines skip it. */
export const metadata: Metadata = {
  title: "Automation & AI — Real Examples",
  description:
    "One connected system. Full visibility. Smarter decisions. Explore how Rawlins connects reporting, capacity, single source of truth, handoffs and more.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AutomationIntegrationInteractive />;
}
