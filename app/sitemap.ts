import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/components/case-studies-data";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rawlinsic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/capabilities`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/capabilities/technology/advanced-air-mobility`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/capabilities/technology/automation-integration`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about/our-people`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about/areas-we-serve`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/insights/thought-leadership`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/insights/podcast`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/insights/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${SITE_URL}/insights/case-studies/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = THOUGHT_LEADERSHIP.map((a) => ({
    url: `${SITE_URL}/insights/thought-leadership/${a.slug}`,
    lastModified: new Date(a.date || now),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...articleRoutes];
}
