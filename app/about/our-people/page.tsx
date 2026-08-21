import type { Metadata } from "next";
import TeamPage from "@/components/team-page";
import { TEAM_MEMBERS } from "@/lib/team-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rawlinsic.com";

export const metadata: Metadata = {
  title: "Our People",
  description:
    "Meet the 52 accomplished professionals at Rawlins — a global management consulting firm at the intersection of strategy, operations, and technology.",
  openGraph: {
    title: "Our People",
    description:
      "Meet the team driving strategic, operational, and technology transformation across the transportation industry.",
    images: [
      "/images/pages/rawlinslogo-blue-wordmark.png",
    ],
  },
};

/* Mirror of memberSlug() in team-page.tsx — kept in sync. */
function memberSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* Emit one schema.org Person per real team-data entry so Google can
   surface members in knowledge-panel / People-Also-Ask results. Skip
   placeholder ("Coming soon!") bios so we never claim something we
   haven't filled in. */
function buildPersonSchemas() {
  return TEAM_MEMBERS
    .filter((m) => m.background && m.background.trim() !== "Coming soon!")
    .map((m) => {
      const url = `${SITE_URL}/about/our-people#${memberSlug(m.name)}`;
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        ...(m.email ? { email: m.email } : {}),
        ...(m.phone ? { telephone: m.phone } : {}),
        ...(m.location ? { address: { "@type": "PostalAddress", addressLocality: m.location } } : {}),
        ...(m.photo ? { image: `${SITE_URL}${m.photo}` } : {}),
        ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
        ...(m.background ? { description: m.background } : {}),
        url,
        worksFor: {
          "@type": "Organization",
          name: "Rawlins Infra Consult",
          url: SITE_URL,
        },
      };
    });
}

export default function OurPeoplePage() {
  const personSchemas = buildPersonSchemas();
  return (
    <>
      {personSchemas.map((schema, i) => (
        <script
          key={`person-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TeamPage />
    </>
  );
}
