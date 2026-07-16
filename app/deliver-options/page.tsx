import type { Metadata } from "next";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import DeliverInfographicOptions from "@/components/deliver-infographic-options";
import DeliverOptionsPreview from "@/components/deliver-options-preview";

/* DRAFT BRANCH ONLY — a scratch page for comparing three treatments of the
   "What we deliver" section. Lives on automation-page-draft, never merged.
   Kept out of the nav and out of sitemap.ts, and noindex. */
export const metadata: Metadata = {
  title: "Draft — What we deliver options",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <SiteNav />
      <DeliverInfographicOptions />
      {/* the first round, kept below for reference */}
      <DeliverOptionsPreview />
      <SiteFooter />
    </>
  );
}
